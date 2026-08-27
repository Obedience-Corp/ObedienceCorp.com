@dev-list:
    just --list --justfile {{ source_file() }}

install:
    npm install

dev:
    npm run dev -- --background --host 127.0.0.1 --port 4321

stop:
    npx astro dev stop

status:
    npx astro dev status

logs *ARGS:
    npx astro dev logs {{ ARGS }}

build:
    npx astro build

preview:
    npx astro preview --host 127.0.0.1 --port 4321

fmt:
    npx prettier --write .

clean:
    rm -rf dist node_modules/.astro
