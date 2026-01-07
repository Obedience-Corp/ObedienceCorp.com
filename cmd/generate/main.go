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
	// Page-specific data
	Page config.PageConfig

	// Shared site data
	Site       config.Site
	Hero       config.Hero // For brand, contact_email
	Branding   config.Branding
	Articles   []EnrichedArticle
	Bulletins  []config.Bulletin
	Dispatches []config.Dispatch
	Navigation []config.NavItem
}

func main() {
	// Ensure dist directory exists
	if err := os.MkdirAll("dist", 0755); err != nil {
		log.Fatalf("Failed to create dist directory: %v", err)
	}

	// Load shared site configuration
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

	// Load markdown content for each article
	enrichedArticles := make([]EnrichedArticle, len(articlesConfig.Articles))
	for i := range articlesConfig.Articles {
		article := &articlesConfig.Articles[i]
		contentPath := filepath.Join("content", "articles", article.ContentFile)

		content, err := markdown.ProcessFile(contentPath)
		if err != nil {
			log.Fatalf("Failed to load article %s: %v", article.ID, err)
		}

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

	// Parse template
	tmpl, err := template.ParseFiles("templates/index.html")
	if err != nil {
		log.Fatalf("Failed to parse template: %v", err)
	}

	// Pages to generate
	pageConfigs := []string{"index", "guild", "fest"}

	for _, pageName := range pageConfigs {
		// Load page-specific config
		pageConfig, err := config.LoadPageConfig(filepath.Join("content", "pages", pageName+".yml"))
		if err != nil {
			log.Fatalf("Failed to load page config for %s: %v", pageName, err)
		}

		// Build page data with page-specific overrides
		data := PageData{
			Page:       *pageConfig,
			Site:       siteConfig.Site,
			Hero:       siteConfig.Hero,
			Branding:   siteConfig.Branding,
			Articles:   enrichedArticles,
			Bulletins:  bulletinConfig.Bulletins,
			Dispatches: dispatchConfig.Dispatches,
			Navigation: navConfig.Items,
		}

		// Create output file in dist/
		outPath := filepath.Join("dist", pageName+".html")
		outFile, err := os.Create(outPath)
		if err != nil {
			log.Fatalf("Failed to create output file %s: %v", outPath, err)
		}

		if err := tmpl.Execute(outFile, data); err != nil {
			outFile.Close()
			log.Fatalf("Failed to execute template for %s: %v", pageName, err)
		}
		outFile.Close()

		fmt.Printf("✓ Generated dist/%s.html\n", pageName)
	}

	// Copy static directory to dist
	fmt.Println("✓ Build complete")
}
