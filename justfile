# Obedience Corp static site generator

# List available commands
default:
    @just --list

# Generate index.html from YAML and markdown content
build:
    @echo "Generating index.html..."
    @go run cmd/generate/main.go


# Start local development server on port 8734
serve: build
    @go run cmd/serve/main.go

# Remove generated files
clean:
    @echo "Cleaning generated files..."
    @rm -f index.html

# Run build in watch mode (requires watchexec)
watch:
    @echo "Watching for changes..."
    @watchexec -w content -w templates -w static just build
