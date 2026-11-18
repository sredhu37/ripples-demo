package main

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"testing"
)

type fakeStore struct {
	pingErr error
	groups  []Group
	facts   []FactCard
	tl      Timeline
}

func (f *fakeStore) Ping(context.Context) error                 { return f.pingErr }
func (f *fakeStore) Groups(context.Context) ([]Group, error)    { return f.groups, nil }
func (f *fakeStore) Facts(context.Context) ([]FactCard, error)  { return f.facts, nil }
func (f *fakeStore) Timeline(context.Context) (Timeline, error) { return f.tl, nil }
func (f *fakeStore) LessonFacts(_ context.Context, id string) (FactCard, error) {
	for _, c := range f.facts {
		if c.LessonID == id {
			return c, nil
		}
	}
	return FactCard{}, ErrNotFound
}

func newFake() *fakeStore {
	money := Text{En: "What is money?", De: "Was ist Geld?", Pl: "Czym są pieniądze?"}
	return &fakeStore{
		groups: []Group{{
			ID:      "group1",
			Title:   Text{En: "Group 1", De: "Gruppe 1", Pl: "Grupa 1"},
			Lessons: []Lesson{{ID: "money", Position: 0, Title: money}},
		}},
		facts: []FactCard{{
			LessonID:   "money",
			Claims:     []Claim{{Text: money, Source: "https://example.org"}},
			Simplified: []Text{money},
		}},
		tl: Timeline{
			Eras:      []Era{{ID: "ancient"}},
			Regions:   []string{"india"},
			Events:    []Event{{ID: "indus", Era: "ancient", Region: "india"}},
			Meanwhile: map[string]Meanwhile{"mughals": {From: 1500, To: 1700}},
		},
	}
}

func get(t *testing.T, s Store, method, path string) *httptest.ResponseRecorder {
	t.Helper()
	rec := httptest.NewRecorder()
	NewHandler(s).ServeHTTP(rec, httptest.NewRequest(method, path, nil))
	return rec
}

func decode[T any](t *testing.T, rec *httptest.ResponseRecorder) T {
	t.Helper()
	if ct := rec.Header().Get("Content-Type"); ct != "application/json; charset=utf-8" {
		t.Fatalf("Content-Type = %q", ct)
	}
	var v T
	if err := json.Unmarshal(rec.Body.Bytes(), &v); err != nil {
		t.Fatalf("decode %s: %v", rec.Body.String(), err)
	}
	return v
}

func TestGroups(t *testing.T) {
	rec := get(t, newFake(), "GET", "/api/groups")
	if rec.Code != http.StatusOK {
		t.Fatalf("status %d", rec.Code)
	}
	groups := decode[[]Group](t, rec)
	if len(groups) != 1 || groups[0].Lessons[0].Title.Pl != "Czym są pieniądze?" {
		t.Fatalf("got %+v", groups)
	}
}

func TestFacts(t *testing.T) {
	cards := decode[[]FactCard](t, get(t, newFake(), "GET", "/api/facts"))
	if len(cards) != 1 || cards[0].LessonID != "money" || len(cards[0].Claims) != 1 {
		t.Fatalf("got %+v", cards)
	}
}

func TestLessonFacts(t *testing.T) {
	card := decode[FactCard](t, get(t, newFake(), "GET", "/api/lessons/money/facts"))
	if card.Claims[0].Source != "https://example.org" || card.Simplified[0].De != "Was ist Geld?" {
		t.Fatalf("got %+v", card)
	}
	if rec := get(t, newFake(), "GET", "/api/lessons/nope/facts"); rec.Code != http.StatusNotFound {
		t.Fatalf("unknown lesson: status %d, want 404", rec.Code)
	}
}

func TestTimeline(t *testing.T) {
	tl := decode[Timeline](t, get(t, newFake(), "GET", "/api/timeline"))
	if len(tl.Eras) != 1 || tl.Regions[0] != "india" || tl.Events[0].ID != "indus" || tl.Meanwhile["mughals"].To != 1700 {
		t.Fatalf("got %+v", tl)
	}
}

func TestEventOmitsEmptyOptionalFields(t *testing.T) {
	rec := get(t, newFake(), "GET", "/api/timeline")
	var raw struct {
		Events []map[string]any `json:"events"`
	}
	if err := json.Unmarshal(rec.Body.Bytes(), &raw); err != nil {
		t.Fatal(err)
	}
	for _, k := range []string{"lessonId", "keyFigure", "source"} {
		if _, ok := raw.Events[0][k]; ok {
			t.Errorf("event has empty %q", k)
		}
	}
}

func TestHealthz(t *testing.T) {
	if rec := get(t, newFake(), "GET", "/api/healthz"); rec.Code != http.StatusOK || rec.Body.String() != "ok" {
		t.Fatalf("healthy: %d %q", rec.Code, rec.Body.String())
	}
	down := newFake()
	down.pingErr = errors.New("connection refused")
	if rec := get(t, down, "GET", "/api/healthz"); rec.Code != http.StatusServiceUnavailable {
		t.Fatalf("db down: status %d, want 503", rec.Code)
	}
}

func TestReadOnly(t *testing.T) {
	if rec := get(t, newFake(), "POST", "/api/groups"); rec.Code != http.StatusMethodNotAllowed {
		t.Fatalf("POST: status %d, want 405", rec.Code)
	}
}

type failingStore struct{ fakeStore }

func (failingStore) Groups(context.Context) ([]Group, error) { return nil, errors.New("boom") }

func TestStoreErrorIs500(t *testing.T) {
	rec := get(t, &failingStore{}, "GET", "/api/groups")
	if rec.Code != http.StatusInternalServerError || rec.Body.String() != "internal error\n" {
		t.Fatalf("got %d %q", rec.Code, rec.Body.String())
	}
}
