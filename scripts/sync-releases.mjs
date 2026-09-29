import { readFile, writeFile, rename, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { setTimeout as delay } from "node:timers/promises";
import {
  ORGANIZATION,
  normalizeRepository,
  normalizeRelease,
  sortReleases,
} from "../src/lib/releases.mjs";

const DEFAULT_OUTPUT = new URL("../src/data/releases.json", import.meta.url);

export async function fetchPages(
  endpoint,
  { fetchImpl = fetch, token, signal, sleep = delay } = {},
) {
  const records = [];
  // Request every page, including prereleases. Never truncate the historic archive.
  for (let page = 1; ; page++) {
    const url = `https://api.github.com/${endpoint}${endpoint.includes("?") ? "&" : "?"}per_page=100&page=${page}`;
    let response;
    for (let attempt = 0; attempt < 3; attempt++) {
      signal?.throwIfAborted();
      try {
        response = await fetchImpl(url, {
          headers: {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2026-03-10",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: signal
            ? AbortSignal.any([signal, AbortSignal.timeout(30_000)])
            : AbortSignal.timeout(30_000),
          redirect: "error",
        });
      } catch (error) {
        if (signal?.aborted || attempt === 2) throw error;
        await sleep(1000 * 2 ** attempt, undefined, { signal });
        continue;
      }
      if (response.ok) break;
      if (
        !(response.status === 429 || response.status >= 500) ||
        attempt === 2
      ) {
        throw new Error(
          `GitHub ${endpoint} page ${page}: HTTP ${response.status}; existing snapshot retained`,
        );
      }
      const retryAfter = Number(response.headers.get("retry-after"));
      await sleep(
        Math.min(30_000, Math.max(1000 * 2 ** attempt, retryAfter * 1000 || 0)),
        undefined,
        { signal },
      );
    }
    const rows = await response.json();
    if (!Array.isArray(rows))
      throw new Error(`Invalid GitHub response for ${endpoint}`);
    records.push(...rows);
    const more = /rel="next"/.test(response.headers.get("link") ?? "");
    if (!more && rows.length < 100) break;
    if (page >= 1000)
      throw new Error(
        `Pagination limit reached for ${endpoint}; refusing a partial archive`,
      );
  }
  return records;
}

export async function syncReleases({
  output = DEFAULT_OUTPUT,
  ...options
} = {}) {
  // All sources must succeed before touching the last good snapshot.
  const rawRepos = await fetchPages(
    `orgs/${ORGANIZATION}/repos?type=public`,
    options,
  );
  const repositories = [
    ...new Map(
      rawRepos
        .map(normalizeRepository)
        .filter(Boolean)
        .map((repo) => [repo.id, repo]),
    ).values(),
  ].sort((a, b) => a.slug.localeCompare(b.slug));
  const groups = [];
  for (const repo of repositories) {
    const rows = await fetchPages(
      `repos/${ORGANIZATION}/${repo.name}/releases`,
      options,
    );
    const entries = rows
      .map((raw) => normalizeRelease(raw, repo))
      .filter(Boolean);
    groups.push([
      ...new Map(entries.map((release) => [release.id, release])).values(),
    ]);
  }
  const releases = sortReleases(groups.flat());
  const paths = new Set();
  for (const release of releases) {
    const key = `${release.repo}/${release.slug}`;
    if (paths.has(key)) throw new Error(`Duplicate release path: ${key}`);
    paths.add(key);
  }
  const serialized =
    JSON.stringify({ schemaVersion: 1, repositories, releases }, null, 2) +
    "\n";
  let existing;
  try {
    existing = await readFile(output, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (existing === serialized)
    return {
      changed: false,
      count: releases.length,
      repositories: repositories.length,
    };
  options.signal?.throwIfAborted();
  const filename =
    output instanceof URL ? output : pathToFileURL(resolve(output));
  const temp = new URL(`${filename.href}.${process.pid}.tmp`);
  await mkdir(dirname(fileURLToPath(filename)), { recursive: true });
  try {
    await writeFile(temp, serialized, { flag: "wx" });
    options.signal?.throwIfAborted();
    await rename(temp, filename);
  } finally {
    await rm(temp, { force: true });
  }
  return {
    changed: true,
    count: releases.length,
    repositories: repositories.length,
  };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const controller = new AbortController();
  process.once("SIGINT", () => controller.abort());
  process.once("SIGTERM", () => controller.abort());
  try {
    const result = await syncReleases({
      token: process.env.GITHUB_TOKEN,
      signal: controller.signal,
    });
    console.log(
      `${result.changed ? "Updated" : "Unchanged"}: ${result.count} published releases across ${result.repositories} public repositories`,
    );
  } catch (error) {
    console.error(`Release sync failed: ${error.message}`);
    process.exitCode = 1;
  }
}
