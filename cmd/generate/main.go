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
	Site       config.Site
	Hero       config.Hero
	Branding   config.Branding
	Articles   []EnrichedArticle
	Bulletins  []config.Bulletin
	Dispatches []config.Dispatch
	Navigation []config.NavItem
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

	// Load bulletin board configuration (left side - external signals)
	bulletinConfig, err := config.LoadBulletinConfig("content/bulletin-left.yml")
	if err != nil {
		log.Fatalf("Failed to load bulletin config: %v", err)
	}

	// Load dispatch configuration (right side - internal dispatches)
	dispatchConfig, err := config.LoadDispatchConfig("content/bulletin-right.yml")
	if err != nil {
		log.Fatalf("Failed to load dispatch config: %v", err)
	}

	// Load navigation configuration
	navConfig, err := config.LoadNavigationConfig("content/navigation.yml")
	if err != nil {
		log.Fatalf("Failed to load navigation config: %v", err)
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
		Site:       siteConfig.Site,
		Hero:       siteConfig.Hero,
		Branding:   siteConfig.Branding,
		Articles:   enrichedArticles,
		Bulletins:  bulletinConfig.Bulletins,
		Dispatches: dispatchConfig.Dispatches,
		Navigation: navConfig.Items,
	}

	// Parse template
	tmpl, err := template.ParseFiles("templates/index.html")
	if err != nil {
		log.Fatalf("Failed to parse template: %v", err)
	}

	// Pages to generate (all use same template and data for now)
	pages := []string{"index.html", "guild.html", "fest.html"}

	for _, pageName := range pages {
		outFile, err := os.Create(pageName)
		if err != nil {
			log.Fatalf("Failed to create output file %s: %v", pageName, err)
		}

		if err := tmpl.Execute(outFile, data); err != nil {
			outFile.Close()
			log.Fatalf("Failed to execute template for %s: %v", pageName, err)
		}
		outFile.Close()

		fmt.Printf("✓ Successfully generated %s\n", pageName)
	}
}
