# Development recipes for corp-site

# Install dependencies
install:
    npm install

# Start Astro dev server
dev:
    npx astro dev

# Build static site
build:
    npx astro build

# Preview built site locally
preview:
    npx astro preview

# Clean build artifacts
clean:
    rm -rf dist node_modules/.astro

# Format code with Prettier
fmt:
    npx prettier --write .

# Check formatting without writing
fmt-check:
    npx prettier --check .

# Build for production deployment
deploy: build
    @echo "Build complete. Push to main to trigger GitHub Pages deployment."
