package markdown

import (
	"html/template"
	"os"

	"github.com/gomarkdown/markdown"
	"github.com/gomarkdown/markdown/html"
	"github.com/gomarkdown/markdown/parser"
)

// ProcessFile reads a markdown file and converts it to HTML
func ProcessFile(path string) (template.HTML, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return "", err
	}

	return ProcessMarkdown(data), nil
}

// ProcessMarkdown converts markdown bytes to HTML
func ProcessMarkdown(md []byte) template.HTML {
	// Create markdown parser with extensions
	extensions := parser.CommonExtensions | parser.AutoHeadingIDs
	p := parser.NewWithExtensions(extensions)

	// Create HTML renderer
	opts := html.RendererOptions{
		Flags: html.CommonFlags,
	}
	renderer := html.NewRenderer(opts)

	// Parse and render
	htmlBytes := markdown.ToHTML(md, p, renderer)

	return template.HTML(htmlBytes)
}
