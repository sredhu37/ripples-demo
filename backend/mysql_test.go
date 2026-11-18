package main

import (
	"context"
	"os"
	"regexp"
	"strings"
	"testing"
)

// TestMySQLContent runs against a real database loaded from db/schema.sql and db/seed.sql.
// It only runs when MYSQL_DSN is set, and it only reads.
// These are the content rules the TypeScript tests checked before the data moved to MySQL.
func TestMySQLContent(t *testing.T) {
	dsn := os.Getenv("MYSQL_DSN")
	if dsn == "" {
		t.Skip("MYSQL_DSN not set")
	}
	db, err := OpenMySQL(dsn)
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	s := &MySQLStore{db: db}
	ctx := context.Background()

	groups, err := s.Groups(ctx)
	if err != nil {
		t.Fatal(err)
	}
	cards, err := s.Facts(ctx)
	if err != nil {
		t.Fatal(err)
	}
	tl, err := s.Timeline(ctx)
	if err != nil {
		t.Fatal(err)
	}

	lessons := map[string]bool{}
	positions := map[int]bool{}
	var texts []Text
	for _, g := range groups {
		texts = append(texts, g.Title)
		for _, l := range g.Lessons {
			if lessons[l.ID] {
				t.Errorf("lesson %s is in more than one group", l.ID)
			}
			lessons[l.ID] = true
			positions[l.Position] = true
			texts = append(texts, l.Title)
		}
	}
	if len(groups) != 6 || len(lessons) != 54 {
		t.Errorf("got %d groups and %d lessons, want 6 and 54", len(groups), len(lessons))
	}
	for i := range len(lessons) {
		if !positions[i] {
			t.Errorf("lesson order has a gap at %d", i)
		}
	}

	if len(cards) != len(lessons) {
		t.Errorf("%d fact cards for %d lessons", len(cards), len(lessons))
	}
	url := regexp.MustCompile(`^https?://\S+$`)
	for _, c := range cards {
		if len(c.Claims) < 5 {
			t.Errorf("%s has %d claims, want at least 5", c.LessonID, len(c.Claims))
		}
		if len(c.Simplified) < 1 {
			t.Errorf("%s has no simplified lines", c.LessonID)
		}
		for _, cl := range c.Claims {
			if !url.MatchString(cl.Source) {
				t.Errorf("%s claim source %q is not a URL", c.LessonID, cl.Source)
			}
			texts = append(texts, cl.Text)
		}
		texts = append(texts, c.Simplified...)
	}
	card, err := s.LessonFacts(ctx, "money")
	if err != nil || card.LessonID != "money" {
		t.Errorf("LessonFacts(money) = %+v, %v", card, err)
	}
	if _, err := s.LessonFacts(ctx, "no-such-lesson"); err != ErrNotFound {
		t.Errorf("LessonFacts(unknown) err = %v, want ErrNotFound", err)
	}

	if len(tl.Eras) != 7 || len(tl.Regions) != 6 || len(tl.Events) != 55 || len(tl.Meanwhile) != 8 {
		t.Errorf("timeline: %d eras, %d regions, %d events, %d meanwhile",
			len(tl.Eras), len(tl.Regions), len(tl.Events), len(tl.Meanwhile))
	}
	events := map[string]bool{}
	for _, e := range tl.Events {
		if events[e.ID] {
			t.Errorf("duplicate event id %s", e.ID)
		}
		events[e.ID] = true
		if e.LessonID != "" && !lessons[e.LessonID] {
			t.Errorf("event %s links to unknown lesson %s", e.ID, e.LessonID)
		}
		texts = append(texts, e.Title, e.Summary, e.Year)
	}
	for id, m := range tl.Meanwhile {
		if !lessons[id] {
			t.Errorf("meanwhile for unknown lesson %s", id)
		}
		if m.From >= m.To {
			t.Errorf("meanwhile %s: from %d is not before to %d", id, m.From, m.To)
		}
		texts = append(texts, m.Text)
	}

	for _, tx := range texts {
		for lang, s := range map[string]string{"en": tx.En, "de": tx.De, "pl": tx.Pl} {
			if strings.TrimSpace(s) == "" {
				t.Errorf("empty %s text next to %q", lang, tx.En)
			}
			if strings.ContainsAny(s, "\u2013\u2014") {
				t.Errorf("en or em dash in %s text %q", lang, s)
			}
		}
	}
}
