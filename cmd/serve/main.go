package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	port := "8080"

	// Serve current directory
	fs := http.FileServer(http.Dir("."))
	http.Handle("/", fs)

	fmt.Printf("Starting development server on http://localhost:%s\n", port)
	fmt.Println("Press Ctrl+C to stop")

	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
