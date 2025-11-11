package main

import (
	"fmt"
	"html/template"
	"log"
	"os"
	"path/filepath"

	"obediencecorp.com/internal/config"
	"obediencecorp.com/internal/markdown"
)

type EnrichedArticle struct {
	ID           string
	Title        string
	Style        template.CSS
	Content      template.HTML
	ModalContent template.HTML
	HasModal     bool
}

type PageData struct {
	Site         config.Site
	Hero         config.Hero
	Branding     config.Branding
	Articles     []EnrichedArticle
	BulletinLeft []config.Bulletin
	BulletinRight []config.Bulletin
}

func main() {
	// Load site configuration
	siteConfig, err := config.LoadSiteConfig("content/site.yml")
	if err != nil {
		log.Fatalf("Failed to load site config: %v", err)
	}

	// Load articles configuration
	articlesConfig, err := config.LoadArticlesConfig("content/articles.yml")
	if err != nil {
		log.Fatalf("Failed to load articles config: %v", err)
	}

	// Load bulletin board configurations
	bulletinLeftConfig, err := config.LoadBulletinConfig("content/bulletin-left.yml")
	if err != nil {
		log.Fatalf("Failed to load left bulletin config: %v", err)
	}

	bulletinRightConfig, err := config.LoadBulletinConfig("content/bulletin-right.yml")
	if err != nil {
		log.Fatalf("Failed to load right bulletin config: %v", err)
	}

	// Load markdown content for each article and create enriched article data
	enrichedArticles := make([]EnrichedArticle, len(articlesConfig.Articles))
	for i := range articlesConfig.Articles {
		article := &articlesConfig.Articles[i]
		contentPath := filepath.Join("content", "articles", article.ContentFile)

		content, err := markdown.ProcessFile(contentPath)
		if err != nil {
			log.Fatalf("Failed to load article %s: %v", article.ID, err)
		}

		// Load modal content if specified
		var modalContent template.HTML
		hasModal := article.ModalContentFile != ""
		if hasModal {
			modalPath := filepath.Join("content", "articles", article.ModalContentFile)
			modalContent, err = markdown.ProcessFile(modalPath)
			if err != nil {
				log.Printf("Warning: Failed to load modal content for %s: %v", article.ID, err)
				hasModal = false
			}
		}

		// Build complete style attribute
		styleAttr := fmt.Sprintf("grid-column: %s; grid-row: %s;", article.GridColumn, article.GridRow)

		enrichedArticles[i] = EnrichedArticle{
			ID:           article.ID,
			Title:        article.Title,
			Style:        template.CSS(styleAttr),
			Content:      content,
			ModalContent: modalContent,
			HasModal:     hasModal,
		}
	}

	// Prepare template data
	data := PageData{
		Site:          siteConfig.Site,
		Hero:          siteConfig.Hero,
		Branding:      siteConfig.Branding,
		Articles:      enrichedArticles,
		BulletinLeft:  bulletinLeftConfig.Bulletins,
		BulletinRight: bulletinRightConfig.Bulletins,
	}

	// Parse template
	tmpl, err := template.ParseFiles("templates/index.html")
	if err != nil {
		log.Fatalf("Failed to parse template: %v", err)
	}

	// Create output file
	outFile, err := os.Create("index.html")
	if err != nil {
		log.Fatalf("Failed to create output file: %v", err)
	}
	defer outFile.Close()

	// Execute template
	if err := tmpl.Execute(outFile, data); err != nil {
		log.Fatalf("Failed to execute template: %v", err)
	}

	fmt.Println("✓ Successfully generated index.html")
}
