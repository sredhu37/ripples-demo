// Command backend serves the Ripples curriculum from MySQL as a read-only JSON API.
//
// Environment:
//
//	MYSQL_DSN  required, e.g. ripples:secret@tcp(localhost:3306)/ripples
//	PORT       optional, default 8080
package main

import (
	"log"
	"net/http"
	"os"
	"time"
)

func main() {
	dsn := os.Getenv("MYSQL_DSN")
	if dsn == "" {
		log.Fatal("MYSQL_DSN is not set, e.g. ripples:secret@tcp(localhost:3306)/ripples")
	}
	db, err := OpenMySQL(dsn)
	if err != nil {
		log.Fatalf("MYSQL_DSN: %v", err)
	}
	defer db.Close()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	srv := &http.Server{
		Addr:              ":" + port,
		Handler:           NewHandler(&MySQLStore{db: db}),
		ReadHeaderTimeout: 5 * time.Second,
	}
	// The database may start later than this service; /api/healthz reports when it is reachable.
	log.Printf("listening on :%s", port)
	log.Fatal(srv.ListenAndServe())
}
