package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	port := "8734"

	// Serve static files
	staticFS := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", staticFS))

	// Route handlers for pages
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			http.ServeFile(w, r, "index.html")
			return
		}
		// Let other paths fall through to file server
		http.ServeFile(w, r, r.URL.Path[1:])
	})

	http.HandleFunc("/guild", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "guild.html")
	})

	http.HandleFunc("/fest", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "fest.html")
	})

	fmt.Printf("Starting development server on http://localhost:%s\n", port)
	fmt.Println("Press Ctrl+C to stop")

	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
