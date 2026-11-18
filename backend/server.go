package main

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"time"
)

// ErrNotFound is returned by a Store when the requested item does not exist.
var ErrNotFound = errors.New("not found")

// Store reads curriculum data. MySQLStore is the real one; tests use a fake.
type Store interface {
	Ping(ctx context.Context) error
	Groups(ctx context.Context) ([]Group, error)
	Facts(ctx context.Context) ([]FactCard, error)
	LessonFacts(ctx context.Context, lessonID string) (FactCard, error)
	Timeline(ctx context.Context) (Timeline, error)
}

// NewHandler returns the read-only API. Every route is GET only.
func NewHandler(s Store) http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/healthz", func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)
		defer cancel()
		if err := s.Ping(ctx); err != nil {
			log.Printf("healthz: %v", err)
			http.Error(w, "database unavailable", http.StatusServiceUnavailable)
			return
		}
		w.Write([]byte("ok"))
	})
	mux.HandleFunc("GET /api/groups", func(w http.ResponseWriter, r *http.Request) {
		v, err := s.Groups(r.Context())
		respond(w, r, v, err)
	})
	mux.HandleFunc("GET /api/facts", func(w http.ResponseWriter, r *http.Request) {
		v, err := s.Facts(r.Context())
		respond(w, r, v, err)
	})
	mux.HandleFunc("GET /api/lessons/{id}/facts", func(w http.ResponseWriter, r *http.Request) {
		v, err := s.LessonFacts(r.Context(), r.PathValue("id"))
		respond(w, r, v, err)
	})
	mux.HandleFunc("GET /api/timeline", func(w http.ResponseWriter, r *http.Request) {
		v, err := s.Timeline(r.Context())
		respond(w, r, v, err)
	})
	return mux
}

func respond(w http.ResponseWriter, r *http.Request, v any, err error) {
	if errors.Is(err, ErrNotFound) {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}
	if err != nil {
		log.Printf("%s %s: %v", r.Method, r.URL.Path, err)
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	if err := json.NewEncoder(w).Encode(v); err != nil {
		log.Printf("%s %s: encode: %v", r.Method, r.URL.Path, err)
	}
}
