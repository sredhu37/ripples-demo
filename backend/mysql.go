package main

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"
)

// OpenMySQL opens a connection pool for a DSN such as ripples:secret@tcp(localhost:3306)/ripples.
// It does not connect yet; the database may start later than this service.
func OpenMySQL(dsn string) (*sql.DB, error) {
	cfg, err := mysql.ParseDSN(dsn)
	if err != nil {
		return nil, err
	}
	// Always read utf8mb4 so German and Polish characters arrive intact.
	if cfg.Params == nil {
		cfg.Params = map[string]string{}
	}
	cfg.Params["charset"] = "utf8mb4"
	db, err := sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		return nil, err
	}
	db.SetConnMaxLifetime(3 * time.Minute)
	return db, nil
}

// MySQLStore reads the tables created by db/schema.sql.
type MySQLStore struct {
	db *sql.DB
}

func (s *MySQLStore) Ping(ctx context.Context) error {
	return s.db.PingContext(ctx)
}

func (s *MySQLStore) Groups(ctx context.Context) ([]Group, error) {
	rows, err := s.db.QueryContext(ctx, `
		SELECT g.id, g.title_en, g.title_de, g.title_pl,
		       l.id, l.position, l.title_en, l.title_de, l.title_pl, m.lesson_id IS NOT NULL
		FROM curriculum_groups g
		JOIN lessons l ON l.group_id = g.id
		LEFT JOIN meanwhile m ON m.lesson_id = l.id
		ORDER BY g.position, l.group_position`)
	if err != nil {
		return nil, fmt.Errorf("query groups: %w", err)
	}
	defer rows.Close()
	groups := []Group{}
	for rows.Next() {
		var g Group
		var l Lesson
		if err := rows.Scan(&g.ID, &g.Title.En, &g.Title.De, &g.Title.Pl,
			&l.ID, &l.Position, &l.Title.En, &l.Title.De, &l.Title.Pl, &l.HasMeanwhile); err != nil {
			return nil, fmt.Errorf("scan group: %w", err)
		}
		if n := len(groups); n == 0 || groups[n-1].ID != g.ID {
			groups = append(groups, g)
		}
		last := &groups[len(groups)-1]
		last.Lessons = append(last.Lessons, l)
	}
	return groups, rows.Err()
}

// Facts returns every lesson's fact card in lesson order.
func (s *MySQLStore) Facts(ctx context.Context) ([]FactCard, error) {
	return s.facts(ctx, "")
}

func (s *MySQLStore) LessonFacts(ctx context.Context, lessonID string) (FactCard, error) {
	cards, err := s.facts(ctx, lessonID)
	if err != nil {
		return FactCard{}, err
	}
	if len(cards) == 0 {
		return FactCard{}, ErrNotFound
	}
	return cards[0], nil
}

// facts loads the cards for one lesson, or for all lessons when lessonID is empty.
func (s *MySQLStore) facts(ctx context.Context, lessonID string) ([]FactCard, error) {
	where, args := "", []any{}
	if lessonID != "" {
		where, args = "WHERE l.id = ?", []any{lessonID}
	}
	lessons, err := s.db.QueryContext(ctx, "SELECT l.id FROM lessons l "+where+" ORDER BY l.position", args...)
	if err != nil {
		return nil, fmt.Errorf("query lessons: %w", err)
	}
	defer lessons.Close()
	cards := []FactCard{}
	index := map[string]int{}
	for lessons.Next() {
		var id string
		if err := lessons.Scan(&id); err != nil {
			return nil, fmt.Errorf("scan lesson: %w", err)
		}
		index[id] = len(cards)
		cards = append(cards, FactCard{LessonID: id, Claims: []Claim{}, Simplified: []Text{}})
	}
	if err := lessons.Err(); err != nil {
		return nil, err
	}

	claims, err := s.db.QueryContext(ctx, `
		SELECT c.lesson_id, c.text_en, c.text_de, c.text_pl, c.source
		FROM fact_claims c JOIN lessons l ON l.id = c.lesson_id `+where+`
		ORDER BY c.lesson_id, c.position`, args...)
	if err != nil {
		return nil, fmt.Errorf("query claims: %w", err)
	}
	defer claims.Close()
	for claims.Next() {
		var id string
		var c Claim
		if err := claims.Scan(&id, &c.Text.En, &c.Text.De, &c.Text.Pl, &c.Source); err != nil {
			return nil, fmt.Errorf("scan claim: %w", err)
		}
		card := &cards[index[id]]
		card.Claims = append(card.Claims, c)
	}
	if err := claims.Err(); err != nil {
		return nil, err
	}

	simplified, err := s.db.QueryContext(ctx, `
		SELECT f.lesson_id, f.text_en, f.text_de, f.text_pl
		FROM fact_simplified f JOIN lessons l ON l.id = f.lesson_id `+where+`
		ORDER BY f.lesson_id, f.position`, args...)
	if err != nil {
		return nil, fmt.Errorf("query simplified: %w", err)
	}
	defer simplified.Close()
	for simplified.Next() {
		var id string
		var t Text
		if err := simplified.Scan(&id, &t.En, &t.De, &t.Pl); err != nil {
			return nil, fmt.Errorf("scan simplified: %w", err)
		}
		card := &cards[index[id]]
		card.Simplified = append(card.Simplified, t)
	}
	return cards, simplified.Err()
}

func (s *MySQLStore) Timeline(ctx context.Context) (Timeline, error) {
	t := Timeline{Eras: []Era{}, Regions: []string{}, Events: []Event{}, Meanwhile: map[string]Meanwhile{}}

	eras, err := s.db.QueryContext(ctx, `
		SELECT id, label_en, label_de, label_pl, date_range_en, date_range_de, date_range_pl,
		       description_en, description_de, description_pl
		FROM timeline_eras ORDER BY position`)
	if err != nil {
		return t, fmt.Errorf("query eras: %w", err)
	}
	defer eras.Close()
	for eras.Next() {
		var e Era
		if err := eras.Scan(&e.ID, &e.Label.En, &e.Label.De, &e.Label.Pl,
			&e.DateRange.En, &e.DateRange.De, &e.DateRange.Pl,
			&e.Description.En, &e.Description.De, &e.Description.Pl); err != nil {
			return t, fmt.Errorf("scan era: %w", err)
		}
		t.Eras = append(t.Eras, e)
	}
	if err := eras.Err(); err != nil {
		return t, err
	}

	regions, err := s.db.QueryContext(ctx, `SELECT id FROM timeline_regions ORDER BY position`)
	if err != nil {
		return t, fmt.Errorf("query regions: %w", err)
	}
	defer regions.Close()
	for regions.Next() {
		var id string
		if err := regions.Scan(&id); err != nil {
			return t, fmt.Errorf("scan region: %w", err)
		}
		t.Regions = append(t.Regions, id)
	}
	if err := regions.Err(); err != nil {
		return t, err
	}

	events, err := s.db.QueryContext(ctx, `
		SELECT id, era_id, region_id, year_en, year_de, year_pl, title_en, title_de, title_pl,
		       summary_en, summary_de, summary_pl, lesson_id, key_figure, source
		FROM timeline_events ORDER BY position`)
	if err != nil {
		return t, fmt.Errorf("query events: %w", err)
	}
	defer events.Close()
	for events.Next() {
		var e Event
		var lessonID, keyFigure, source sql.NullString
		if err := events.Scan(&e.ID, &e.Era, &e.Region, &e.Year.En, &e.Year.De, &e.Year.Pl,
			&e.Title.En, &e.Title.De, &e.Title.Pl, &e.Summary.En, &e.Summary.De, &e.Summary.Pl,
			&lessonID, &keyFigure, &source); err != nil {
			return t, fmt.Errorf("scan event: %w", err)
		}
		e.LessonID, e.KeyFigure, e.Source = lessonID.String, keyFigure.String, source.String
		t.Events = append(t.Events, e)
	}
	if err := events.Err(); err != nil {
		return t, err
	}

	meanwhile, err := s.db.QueryContext(ctx, `
		SELECT lesson_id, year_from, year_to, text_en, text_de, text_pl FROM meanwhile`)
	if err != nil {
		return t, fmt.Errorf("query meanwhile: %w", err)
	}
	defer meanwhile.Close()
	for meanwhile.Next() {
		var id string
		var m Meanwhile
		if err := meanwhile.Scan(&id, &m.From, &m.To, &m.Text.En, &m.Text.De, &m.Text.Pl); err != nil {
			return t, fmt.Errorf("scan meanwhile: %w", err)
		}
		t.Meanwhile[id] = m
	}
	return t, meanwhile.Err()
}
