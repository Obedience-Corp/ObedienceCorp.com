# Obedience Corp website

The Astro site at [obediencecorp.com](https://obediencecorp.com), deployed to GitHub Pages from `main`.

## Development

```sh
just install
just dev
```

Open http://127.0.0.1:4321. The development server runs in the background; use `just status`, `just logs`, and `just stop` to manage it. Local contact forms simulate submission and do not send messages.

```sh
just test          # Production build and output checks
just releases test # Importer integration tests in Docker
```

The integration tests create and replace fixture snapshots, so they run in a disposable container. Docker must be running. CI runs the same tests inside a Node container.

## Automated release archive

`/releases/` lists the complete published release history of every public repository in the [Obedience-Corp organization](https://github.com/Obedience-Corp). It includes repository archives, search, a stable-only filter, and `/releases/feed.xml`. Recent stable releases from three different repositories also appear on the homepage.

The importer discovers repositories on every run and follows every repository and release API page. New public projects appear automatically once they have a release. Drafts and private repositories are excluded; prereleases are labeled. Public forks and archived repositories retain their published history. Edits, deletions, and repositories made private are reflected on the next successful sync.

Festival, Fest, Camp, and Festival Installer entries link to their release pages on fest.build. Other projects have individual release pages here, with canonical URLs and sitemap modification dates. GitHub remains the source for release notes and downloads. Imported Markdown supports tables, code, and links; embedded HTML is escaped and unsafe URL protocols are disabled.

### How publishing works

`.github/workflows/releases.yml` runs hourly, on importer changes merged to `main`, and through **Actions → Sync public releases → Run workflow**. It uses the built-in `GITHUB_TOKEN`; no additional secret or repository list is needed.

1. Discover all public repositories and fetch their published releases.
2. Replace `src/data/releases.json` only after every request succeeds. Network failures preserve the previous snapshot.
3. If content changed, build and test it, then commit only the validated snapshot to `main`.
4. Call the existing Pages deployment workflow with that exact commit. This explicit call is necessary because pushes made by `GITHUB_TOKEN` do not trigger another push workflow.

Unchanged content produces no commit or deployment. Concurrent pushes are never overwritten: a rejected push fails the run, and the next scheduled run starts from the latest `main`. If deployment fails after publishing a snapshot, rerun the failed workflow from Actions. GitHub controls scheduled execution timing, so updates may arrive later than the scheduled minute.

The checked-in snapshot supplies the initial historic archive immediately after deployment. Builds and visitors do not depend on live GitHub API requests. The hourly workflow starts when merged to `main`.

For a manual authenticated import:

```sh
GITHUB_TOKEN="$(gh auth token)" just releases sync
just test
just releases test
```

Commit the resulting snapshot with the project's normal workflow. Tokens are read from the environment and never stored in the snapshot.
