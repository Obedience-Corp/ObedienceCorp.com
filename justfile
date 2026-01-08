# Obedience Corp static site generator

pid_file := ".dev.pid"

# List available commands
default:
    @just --list

# Generate HTML files to dist/
build:
    @go run cmd/generate/main.go

# Start local development server on port 8734 (foreground)
serve: build
    @go run cmd/serve/main.go

# Start dev server with file watcher in background
dev: build stop
    #!/usr/bin/env bash
    set -e
    # Start watcher in background
    (while true; do
        find content templates static -type f -newer dist/index.html 2>/dev/null | grep -q . && go run cmd/generate/main.go
        sleep 1
    done) &
    WATCH_PID=$!
    # Start server in background
    go run cmd/serve/main.go &
    SERVER_PID=$!
    # Save PIDs
    echo "$SERVER_PID $WATCH_PID" > {{pid_file}}
    echo "Dev server running at http://localhost:8734"
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
    lsof -ti:8734 | xargs kill -9 2>/dev/null || true
    echo "Server stopped"

# Show dev server status
status:
    @if [ -f {{pid_file}} ]; then \
        echo "Dev server running at http://localhost:8734"; \
        curl -s -o /dev/null -w "Health: %{http_code}\n" http://localhost:8734/ || echo "Health: not responding"; \
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

# Remove generated files
clean:
    @echo "Cleaning generated files..."
    @rm -rf dist/
