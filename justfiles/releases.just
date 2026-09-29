# Import every published release from the public organization repositories.
sync:
    npm run releases:sync

# Filesystem mutation tests run only inside an isolated container.
test:
    docker run --rm -v "{{justfile_directory()}}":/src:ro node:24-bookworm bash -lc 'mkdir -p /tmp/app && cp -R /src/scripts /src/src /tmp/app/ && cd /tmp/app && node --test scripts/sync-releases.integration.test.mjs'
