import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const dist = new URL("../dist/", import.meta.url);
const read = (path) => readFileSync(new URL(path, dist), "utf8");
const imports = [
  ["a-year-of-festival-measuring-ai-development", "2026-10-21"],
  ["run-github-actions-on-your-own-machine", "2026-10-20"],
  ["using-humanizer-to-improve-blog-readability", "2026-10-07"],
];

test("syndicated articles preserve source attribution, canonical identity, and publication dates", () => {
  for (const [slug, date] of imports) {
    const html = read(`blog/${slug}/index.html`);
    const source = `https://blockhead.consulting/blog/${slug}`;
    assert(html.includes(`rel="canonical" href="${source}"`));
    assert(html.includes(`property="og:url" content="${source}"`));
    assert.match(html, /Originally published at/);
    assert(html.includes(`href="${source}">Blockhead Consulting</a>`));
    assert(html.includes(date));
    assert.match(html, /Lance Rogers/);
    assert.match(read("blog/index.html"), new RegExp(`href="/blog/${slug}/?"`));
    assert(read("index.html").includes(`/blog/${slug}/`));
    assert(read("rss.xml").includes(`/blog/${slug}/`));
    assert(read("rss.xml").includes(new Date(date).toUTCString()));
    assert.doesNotMatch(html, /name="robots"/);
  }
  // An original article still gets its own URL when there is no override.
  assert.match(
    read("blog/loop-engineering/index.html"),
    /rel="canonical" href="https:\/\/obediencecorp.com\/blog\/loop-engineering\/"/,
  );
});

test("retrospective evidence remains readable and downloadable without autoplay", () => {
  const html = read(`blog/${imports[0][0]}/index.html`);
  assert.match(
    html,
    /<source media="\(max-width: 600px\)" srcset="\/media\/blog\/festival-year\/parallel-work-mobile.svg"/,
  );
  assert.match(
    html,
    /class="article-table" role="region" aria-label="Repository inventory" tabindex="0"/,
  );
  assert.match(html, /<video controls muted playsinline/);
  assert.doesNotMatch(html.match(/<video[^>]*>/)?.[0] ?? "", /autoplay/);
  for (const [, path] of html.matchAll(
    /(?:src|srcset|poster|href)="(\/(?:media\/blog\/|data\/)[^"]+)"/g,
  )) {
    assert(
      existsSync(new URL(path.slice(1), dist)),
      `Missing evidence asset: ${path}`,
    );
  }
  assert.doesNotThrow(() =>
    JSON.parse(read("data/coding-agent-retrospective.json")),
  );
  assert.match(html, /not revenue|not a valuation/);
  assert.doesNotMatch(html, /&lt;picture|&lt;video|&lt;table/);
});
