# OBEDIENCE CORP

**AI that does what you want. The way you want it done.**

Building infrastructure for autonomous companies.

Command AI like you command human organizations. Executive decisions at the top. Specialized teams below. Hierarchical execution that scales.

**Deterministic workflows. Shared domain knowledge. Hierarchical orchestration.**

Systems that do exactly what you want them to do, every time.

---

## Contact

contact@obediencecorp.com

---

<details>
<summary>Development</summary>

## Overview

This is a YAML-driven static site with Go-based generation. Content is managed through YAML configuration files and markdown articles, making it easy to update without touching HTML/CSS/JS code.

## Project Structure

```
obediencecorp.com/
├── content/               # Content configuration
│   ├── site.yml          # Site metadata (hero, branding)
│   ├── articles.yml      # Article box configuration
│   └── articles/         # Markdown content for each article
├── templates/            # Go HTML templates
│   └── index.html       # Main template
├── static/              # Frontend assets
│   ├── css/
│   │   └── styles.css   # Extracted, modular CSS
│   └── js/
│       └── main.js      # Typing animation script
├── cmd/generate/        # Static site generator
│   └── main.go         # Generator entry point
├── internal/            # Internal packages
│   ├── config/         # YAML config loader
│   └── markdown/       # Markdown processor
├── justfile            # Build commands (preferred over Makefile)
├── go.mod              # Go dependencies
├── .gitignore          # Ignore generated index.html
└── README.md           # This file
```

## Content Management

### Adding/Editing Articles

1. **Edit article content** in `content/articles/*.md`
2. **Update metadata** in `content/articles.yml` (title, grid position)
3. **Rebuild**: `just build`

### Updating Hero Section

Edit `content/site.yml`:

```yaml
hero:
  brand: OBEDIENCE CORP
  title: OBEDIENCE CORP
  tagline_line1: AI that does what you want
  tagline_line2: The way you want it done
  contact_email: contact@obediencecorp.com
```

### Adjusting Grid Layout

Edit grid positioning in `content/articles.yml`:

```yaml
- id: "guild-control-layer"
  title: "Guild Is a Control Layer for AI"
  grid_column: "2 / 4"  # Span columns 2-4
  grid_row: "1"         # Row 1
  content_file: "guild-control-layer.md"
```

## Build Commands

Using `just` (self-documenting command runner):

```bash
# List available commands
just

# Generate index.html from content
just build

# Build and open in browser
just dev

# Clean generated files
just clean

# Watch for changes and rebuild (requires watchexec)
just watch
```

## Tech Stack

- **Go** - Static site generator
- **YAML** - Content configuration
- **Markdown** - Article content
- **Go Templates** - HTML templating
- **CSS** - Modular, extracted stylesheets
- **Vanilla JS** - Minimal, no frameworks

### Dependencies

```
gopkg.in/yaml.v3              # YAML parsing
github.com/gomarkdown/markdown # Markdown processing
```

## Development Workflow

### Local Development

```bash
# Install dependencies
go mod download

# Generate site
just build

# Open in browser
just dev

# Make changes to content/...
# Rebuild
just build
```

### Adding New Article

1. Create markdown file:

```bash
vim content/articles/new-article.md
```

2. Add to `content/articles.yml`:

```yaml
- id: "new-article"
  title: "New Article Title"
  grid_column: "1"
  grid_row: "9"
  content_file: "new-article.md"
```

3. Rebuild:

```bash
just build
```

## Deployment

### GitHub Pages

1. Generate site: `just build`
2. Commit `index.html` (normally gitignored for dev)
3. Push to GitHub
4. Configure Pages to serve from root

### Custom Domain

Add `CNAME` file:

```
obediencecorp.com
```

Configure DNS A records:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

## Design Philosophy

- **YAML as CMS**: All content in version-controlled YAML/markdown
- **Modular assets**: Separate CSS/JS for maintainability
- **Static generation**: Fast, secure, GitHub Pages compatible
- **No build complexity**: Simple Go generator, no npm/webpack
- **Self-documenting**: Justfile replaces README for commands

## Aesthetic

- Corporate dystopian (Mr. Robot E-Corp style)
- Pure black background (#000000)
- IBM Plex Mono typography
- Terminal-inspired article boxes
- Green accent (#00ff7f)
- Newspaper-style asymmetric grid

## Future Enhancements

When ready for Go backend:

1. Keep same content structure
2. Replace static generator with HTTP server
3. Add HTMX for dynamic interactions
4. Enable live content updates

## Notes

- `index.html` is **generated** - edit `content/` and `templates/` instead
- Use `just` not `make` (simpler, self-documenting)
- Grid positioning uses CSS Grid with explicit placement
- Markdown is processed to HTML with syntax highlighting support

</details>
