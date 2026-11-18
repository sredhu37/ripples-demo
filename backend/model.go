package main

// Text is one piece of curriculum text in all three app languages.
type Text struct {
	En string `json:"en"`
	De string `json:"de"`
	Pl string `json:"pl"`
}

// Lesson is the metadata the map, parent panel and save code need.
// Position is the global lesson order; the save code depends on it.
type Lesson struct {
	ID       string `json:"id"`
	Position int    `json:"position"`
	Title    Text   `json:"title"`
}

// Group lists its lessons in group order.
type Group struct {
	ID      string   `json:"id"`
	Title   Text     `json:"title"`
	Lessons []Lesson `json:"lessons"`
}

type Claim struct {
	Text   Text   `json:"text"`
	Source string `json:"source"`
}

// FactCard is the parent-facing list of a lesson's claims and simplifications.
type FactCard struct {
	LessonID   string  `json:"lessonId"`
	Claims     []Claim `json:"claims"`
	Simplified []Text  `json:"simplified"`
}

type Era struct {
	ID          string `json:"id"`
	Label       Text   `json:"label"`
	DateRange   Text   `json:"dateRange"`
	Description Text   `json:"description"`
}

type Event struct {
	ID        string `json:"id"`
	Era       string `json:"era"`
	Year      Text   `json:"year"`
	Region    string `json:"region"`
	Title     Text   `json:"title"`
	Summary   Text   `json:"summary"`
	LessonID  string `json:"lessonId,omitempty"`
	KeyFigure string `json:"keyFigure,omitempty"`
	Source    string `json:"source,omitempty"`
}

type Meanwhile struct {
	From int  `json:"from"`
	To   int  `json:"to"`
	Text Text `json:"text"`
}

// Timeline holds everything the timeline screen and the meanwhile cards show.
type Timeline struct {
	Eras      []Era                `json:"eras"`
	Regions   []string             `json:"regions"`
	Events    []Event              `json:"events"`
	Meanwhile map[string]Meanwhile `json:"meanwhile"`
}
