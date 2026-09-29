import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import {
  normalizeRepository,
  normalizeRelease,
  releaseHref,
  isFestivalRelease,
  versionSlug,
  releaseSummary,
} from "../src/lib/releases.mjs";
import { renderReleaseNotes } from "../src/lib/release-markdown.mjs";
import { fetchPages } from "../scripts/sync-releases.mjs";
import { rawRepo, rawRelease, response } from "../scripts/release-fixtures.mjs";
const repository = normalizeRepository(rawRepo());

test("public source boundary excludes private repos and validates organization ownership", () => {
  assert.equal(normalizeRepository(rawRepo({ private: true })), null);
  assert.equal(normalizeRepository(rawRepo({ visibility: "internal" })), null);
  assert.throws(() =>
    normalizeRepository(rawRepo({ owner: { login: "another-org" } })),
  );
  assert.throws(() => normalizeRepository(rawRepo({ private: undefined })));
  assert.equal(
    normalizeRepository(rawRepo({ fork: true, archived: true })).archived,
    true,
  );
});

test("drafts are excluded, prereleases retained, malformed releases rejected", () => {
  assert.equal(
    normalizeRelease(
      rawRelease({ draft: true, published_at: null }),
      repository,
    ),
    null,
  );
  assert.equal(
    normalizeRelease(rawRelease({ prerelease: true }), repository).prerelease,
    true,
  );
  assert.throws(() =>
    normalizeRelease(rawRelease({ published_at: null }), repository),
  );
  assert.throws(() => normalizeRelease(rawRelease({ body: {} }), repository));
  assert.match(
    normalizeRelease(rawRelease({ html_url: "javascript:bad" }), repository)
      .sourceUrl,
    /^https:\/\/github.com/,
  );
});

test("all repository and release API pages are fetched, including exact page boundaries", async () => {
  const urls = [];
  const rows = await fetchPages("orgs/Obedience-Corp/repos?type=public", {
    fetchImpl: async (url) => {
      urls.push(url);
      return response(
        urls.length === 1
          ? Array.from({ length: 100 }, (_, id) => ({ id }))
          : [{ id: 100 }],
      );
    },
  });
  assert.equal(rows.length, 101);
  assert.match(urls[1], /type=public&per_page=100&page=2$/);
  let calls = 0;
  const releases = await fetchPages("repos/Obedience-Corp/example/releases", {
    fetchImpl: async () =>
      ++calls === 1
        ? response([rawRelease()], { link: '<next>; rel="next"' })
        : response([rawRelease({ id: 11, prerelease: true })]),
  });
  assert.equal(releases.length, 2);
});

test("transient errors retry; authorization and malformed payloads fail closed; cancellation stops work", async () => {
  let calls = 0;
  await fetchPages("example", {
    sleep: async () => {},
    fetchImpl: async () =>
      ++calls === 1 ? new Response("", { status: 503 }) : response([]),
  });
  assert.equal(calls, 2);
  calls = 0;
  await assert.rejects(
    fetchPages("example", {
      sleep: async () => {},
      fetchImpl: async () => {
        calls++;
        throw new Error("offline");
      },
    }),
    /offline/,
  );
  assert.equal(calls, 3);
  await assert.rejects(
    fetchPages("example", {
      fetchImpl: async () => new Response("", { status: 403 }),
    }),
    /HTTP 403/,
  );
  await assert.rejects(
    fetchPages("example", {
      fetchImpl: async () => response({ message: "bad" }),
    }),
    /Invalid GitHub response/,
  );
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(
    fetchPages("example", {
      signal: controller.signal,
      fetchImpl: async () => {
        throw new Error("should not fetch");
      },
    }),
    { name: "AbortError" },
  );
});

test("Festival notes use their existing destination; other repositories get unique local URLs", () => {
  const release = normalizeRelease(rawRelease(), repository);
  assert.equal(releaseHref(release), "/releases/example/v1.0.0/");
  for (const [repo, product] of [
    ["festival", "festival"],
    ["fest", "fest"],
    ["camp", "camp"],
    ["festival-installer", "installer"],
  ]) {
    assert.equal(
      releaseHref({ ...release, repo }),
      `https://fest.build/releases/${product}/v1.0.0`,
    );
  }
  for (const tag of ["../escape", "tag/one", "~collision", "space here"]) {
    assert.match(versionSlug(tag), /^~[A-Za-z0-9_-]+$/);
    assert.equal(
      Buffer.from(versionSlug(tag).slice(1), "base64url").toString(),
      tag,
    );
  }
  assert.equal(releaseSummary(release), "A real improvement");
  assert.equal(
    releaseSummary({
      ...release,
      body: "* 44f8fc5002af0b3d23b69a64d04da9f9356d69b9 [obey-campaign:8deed8b4] fix: report module version",
    }),
    "fix: report module version",
  );
});

test("GitHub markdown renders tables and code, resolves relative links, and disables unsafe HTML and URLs", async () => {
  const body =
    '# Notes\n\n<script>alert(1)</script>\n\n[x](javascript:alert(1)) [encoded](java&#x73;cript:alert(1)) [data](data:text/html,bad)\n\n[Guide](docs/setup.md)\n\n| A | B |\n| --- | --- |\n| text | `code` |\n\n```sh\n# Comment\necho "<script>"\n```\n\nhttps://github.com/Obedience-Corp/example/pull/1';
  const html = await renderReleaseNotes(
    normalizeRelease(rawRelease({ body }), repository),
  );
  assert.match(html, /<h2/);
  assert.doesNotMatch(html, /<h1|<script>|href="(?:javascript|data):/i);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /<table>/);
  assert.match(html, /# Comment/);
  assert.match(
    html,
    /https:\/\/github.com\/Obedience-Corp\/example\/blob\/v1.0.0\/docs\/setup.md/,
  );
  assert.match(
    html,
    /href="https:\/\/github.com\/Obedience-Corp\/example\/pull\/1"/,
  );
});

test("duplicate headings retain GitHub-compatible fragment links without colliding with page IDs", async () => {
  const html = await renderReleaseNotes(
    normalizeRelease(
      rawRelease({
        body: "# Notes!\n\n# Notes!\n\n[Second](#notes-1)",
      }),
      repository,
    ),
  );
  assert.match(html, /id="note-notes"/);
  assert.match(html, /id="note-notes-1"/);
  assert.match(html, /href="#note-notes-1"/);
});

test("every imported release appears in exported HTML and RSS; local pages have canonical metadata and sitemap entries", () => {
  const { releases, repositories } = JSON.parse(
    readFileSync(new URL("../src/data/releases.json", import.meta.url)),
  );
  const dist = new URL("../dist/", import.meta.url);
  const index = readFileSync(new URL("releases/index.html", dist), "utf8");
  const feed = readFileSync(new URL("releases/feed.xml", dist), "utf8");
  const sitemap = readFileSync(new URL("sitemap-0.xml", dist), "utf8");
  assert.equal((feed.match(/<item>/g) ?? []).length, releases.length);
  assert.equal((feed.match(/<guid /g) ?? []).length, releases.length);
  for (const release of releases) {
    const href = releaseHref(release);
    assert(index.includes(`href="${href}"`), href);
    assert(feed.includes(`github-release:${release.id}`), href);
    if (isFestivalRelease(release)) {
      assert(
        !existsSync(
          new URL(`releases/${release.repo}/${release.slug}/index.html`, dist),
        ),
      );
      continue;
    }
    const page = readFileSync(
      new URL(`${href.slice(1)}index.html`, dist),
      "utf8",
    );
    assert(
      page.includes(`rel="canonical" href="https://obediencecorp.com${href}"`),
    );
    assert.equal((page.match(/<h1\b/g) ?? []).length, 1);
    assert(sitemap.includes(`<loc>https://obediencecorp.com${href}</loc>`));
    assert(sitemap.includes(`<lastmod>${release.updatedAt}</lastmod>`));
  }
  for (const repo of repositories)
    assert.equal(
      existsSync(new URL(`releases/${repo.slug}/index.html`, dist)),
      releases.some((release) => release.repo === repo.slug),
    );
});
