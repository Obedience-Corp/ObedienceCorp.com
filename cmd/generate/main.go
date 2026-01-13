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

// PageDef defines a page to generate
type PageDef struct {
	Dir        string // Directory name under content/pages/
	Output     string // Output filename (without .html)
	ConfigFile string // Config filename within the directory
}

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
	CTA  config.CTAConfig

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

	// Load navigation configuration (site-wide)
	navConfig, err := config.LoadNavigationConfig("content/navigation.yml")
	if err != nil {
		log.Fatalf("Failed to load navigation config: %v", err)
	}

	// Parse template
	tmpl, err := template.ParseFiles("templates/index.html")
	if err != nil {
		log.Fatalf("Failed to parse template: %v", err)
	}

	// Pages to generate: directory -> output file mapping
	pages := []PageDef{
		{Dir: "landing", Output: "index", ConfigFile: "index.yml"},
		{Dir: "guild", Output: "guild", ConfigFile: "guild.yml"},
		{Dir: "fest", Output: "fest", ConfigFile: "fest.yml"},
	}

	for _, page := range pages {
		pageDir := filepath.Join("content", "pages", page.Dir)

		// Load page-specific config
		pageConfig, ctaConfig, err := config.LoadPageConfig(filepath.Join(pageDir, page.ConfigFile))
		if err != nil {
			log.Fatalf("Failed to load page config for %s: %v", page.Dir, err)
		}

		// Load page-specific articles
		articlesConfig, err := config.LoadArticlesConfig(filepath.Join(pageDir, "articles.yml"))
		if err != nil {
			log.Fatalf("Failed to load articles config for %s: %v", page.Dir, err)
		}

		// Load page-specific bulletins (left drawer)
		bulletinConfig, err := config.LoadBulletinConfig(filepath.Join(pageDir, "bulletin-left.yml"))
		if err != nil {
			log.Fatalf("Failed to load bulletin config for %s: %v", page.Dir, err)
		}

		// Load page-specific dispatches (right drawer)
		dispatchConfig, err := config.LoadDispatchConfig(filepath.Join(pageDir, "bulletin-right.yml"))
		if err != nil {
			log.Fatalf("Failed to load dispatch config for %s: %v", page.Dir, err)
		}

		// Load markdown content for each article
		enrichedArticles := make([]EnrichedArticle, len(articlesConfig.Articles))
		for i := range articlesConfig.Articles {
			article := &articlesConfig.Articles[i]
			contentPath := filepath.Join(pageDir, "articles", article.ContentFile)

			content, err := markdown.ProcessFile(contentPath)
			if err != nil {
				log.Fatalf("Failed to load article %s for page %s: %v", article.ID, page.Dir, err)
			}

			var modalContent template.HTML
			hasModal := article.ModalContentFile != ""
			if hasModal {
				modalPath := filepath.Join(pageDir, "articles", article.ModalContentFile)
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

		// Build page data
		data := PageData{
			Page:       *pageConfig,
			CTA:        *ctaConfig,
			Site:       siteConfig.Site,
			Hero:       siteConfig.Hero,
			Branding:   siteConfig.Branding,
			Articles:   enrichedArticles,
			Bulletins:  bulletinConfig.Bulletins,
			Dispatches: dispatchConfig.Dispatches,
			Navigation: navConfig.Items,
		}

		// Create output file in dist/
		outPath := filepath.Join("dist", page.Output+".html")
		outFile, err := os.Create(outPath)
		if err != nil {
			log.Fatalf("Failed to create output file %s: %v", outPath, err)
		}

		if err := tmpl.Execute(outFile, data); err != nil {
			outFile.Close()
			log.Fatalf("Failed to execute template for %s: %v", page.Dir, err)
		}
		outFile.Close()

		fmt.Printf("✓ Generated dist/%s.html\n", page.Output)
	}

	fmt.Println("✓ Build complete")
}
