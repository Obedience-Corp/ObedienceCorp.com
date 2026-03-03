# Obedience Corp static site generator

set dotenv-load

pid_file := ".dev.pid"
port := env_var_or_default("PORT", "8734")

# List available commands
default:
    @just --list

# Compile binaries to bin/
compile:
    @mkdir -p bin
    @go build -o bin/generate ./cmd/generate
    @go build -o bin/serve ./cmd/serve

# Generate HTML files to docs/
build: compile
    @./bin/generate
    @cp -r static docs/
    @echo "obediencecorp.com" > docs/CNAME

# Start local development server (foreground)
serve: build
    @PORT={{port}} ./bin/serve

# Start dev server with file watcher in background
dev: build stop
    #!/usr/bin/env bash
    set -e
    # Start watcher in background
    (while true; do
        find content templates static -type f -newer docs/index.html 2>/dev/null | grep -q . && ./bin/generate
        sleep 1
    done) &
    WATCH_PID=$!
    # Start server in background
    PORT={{port}} ./bin/serve &
    SERVER_PID=$!
    # Save PIDs
    echo "$SERVER_PID $WATCH_PID" > {{pid_file}}
    echo "Dev server running at http://localhost:{{port}}"
    echo "File watcher active (content/, templates/, static/)"
    echo "Run 'just stop' to stop"

# Stop the development server and watcher
stop:
    #!/usr/bin/env bash
    if [ -f {{pid_file}} ]; then
        read SERVER_PID WATCH_PID < {{pid_file}}
        kill $SERVER_PID $WATCH_PID 2>/dev/null || true
        rm -f {{pid_file}}
    fi
    lsof -ti:{{port}} | xargs kill -9 2>/dev/null || true
    echo "Server stopped"

# Show dev server status
status:
    @if [ -f {{pid_file}} ]; then \
        echo "Dev server running at http://localhost:{{port}}"; \
        curl -s -o /dev/null -w "Health: %{http_code}\n" http://localhost:{{port}}/ || echo "Health: not responding"; \
    else \
        echo "Dev server not running"; \
    fi

# Format Go code
fmt:
    @go fmt ./...

# Run static analysis
vet:
    @go vet ./...

# Format and vet
lint: fmt vet

# Build festival docs into dist/docs/ (requires ../festival sibling repo)
docs:
    #!/usr/bin/env bash
    set -euo pipefail
    festival_dir="$(cd ../festival && pwd)"
    if [ ! -d "$festival_dir" ]; then
        echo "Error: festival repo not found at ../festival"
        echo "Expected sibling directory in the campaign workspace"
        exit 1
    fi
    cd "$festival_dir"
    HUGO_BASEURL="https://obediencecorp.com/festival/" just docs build
    cd - > /dev/null
    rm -rf dist/festival
    cp -r "$festival_dir/public" dist/festival
    echo "Festival docs built to dist/festival/"

# Build everything (site + docs) and stage festival docs for GitHub Pages
build-all: build docs
    @rm -rf docs/festival && cp -r dist/festival docs/festival
    @echo "Festival docs staged to docs/festival/"

# Rebuild everything from scratch (site + festival docs)
refresh: clean build-all

# Remove generated files and binaries
clean:
    @echo "Cleaning..."
    @rm -rf docs/ bin/
