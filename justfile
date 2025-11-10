# Obedience Corp static site generator

# List available commands
default:
    @just --list

# Generate index.html from YAML and markdown content
build:
    @echo "Generating index.html..."
    @go run cmd/generate/main.go

# Build and open in browser
dev: build
    @echo "Opening index.html in browser..."
    @open index.html

# Remove generated files
clean:
    @echo "Cleaning generated files..."
    @rm -f index.html

# Run build in watch mode (requires watchexec)
watch:
    @echo "Watching for changes..."
    @watchexec -w content -w templates -w static just build
