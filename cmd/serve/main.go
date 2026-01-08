package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8734"
	}

	// Serve static files from /static/
	staticFS := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", staticFS))

	// Page routes - serve from dist/
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path

		// Map routes to HTML files in dist/
		var htmlFile string
		switch path {
		case "/":
			htmlFile = "dist/index.html"
		case "/guild":
			htmlFile = "dist/guild.html"
		case "/fest":
			htmlFile = "dist/fest.html"
		default:
			// Try to serve as a file from dist/
			filePath := filepath.Join("dist", path)
			if _, err := os.Stat(filePath); err == nil {
				http.ServeFile(w, r, filePath)
				return
			}
			http.NotFound(w, r)
			return
		}

		http.ServeFile(w, r, htmlFile)
	})

	fmt.Printf("Starting development server on http://localhost:%s\n", port)
	fmt.Println("Press Ctrl+C to stop")

	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
