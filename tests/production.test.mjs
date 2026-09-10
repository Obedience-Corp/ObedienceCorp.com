import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { runInNewContext } from "node:vm";

const dist = new URL("../dist/", import.meta.url);
assert(
  existsSync(dist),
  "Run npm run build before npm test (or use just test).",
);
const read = (path) => readFileSync(new URL(path, dist), "utf8");
const home = read("index.html");
const scripts = (html) =>
  [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const analytics = (html) =>
  scripts(html).filter((s) => s.includes("G-MEXG0YQYHQ"));
const htmlFiles = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory()
      ? htmlFiles(path)
      : path.endsWith(".html")
        ? [path]
        : [];
  });

test("homepage preserves the approved buyer journey and production identity", () => {
  assert.equal((home.match(/<h1\b/g) ?? []).length, 1);
  assert.match(home, /The problem stops/);
  assert.match(home, /your problem\./);
  assert.match(
    home,
    /<title>Obedience Corp \| Forward Deployed Engineering<\/title>/,
  );
  assert.match(home, /rel="canonical" href="https:\/\/obediencecorp.com\/"/);
  assert.match(
    home,
    /property="og:image" content="https:\/\/obediencecorp.com\/og.png"/,
  );
  assert.match(home, /name="twitter:card" content="summary_large_image"/);
  assert.doesNotMatch(
    home,
    /name="robots"|Local preview|preventLocalSubmission|Content-Security-Policy|\/prototypes\//,
  );
  for (const id of [
    "engagements",
    "proof",
    "questions",
    "contact",
    "products",
    "writing",
  ]) {
    assert.match(home, new RegExp(`id="${id}"`));
  }
  const ids = [...home.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, ids.length, "IDs are unique");
  for (const [, hash] of home.matchAll(/href="#([^"]+)"/g)) {
    assert(ids.includes(hash), `Missing homepage anchor: ${hash}`);
  }
});

test("homepage contains the existing accessible contact form and endpoint", () => {
  assert.equal((home.match(/id="contact-form"/g) ?? []).length, 1);
  assert.match(home, /action="https:\/\/formspree.io\/f\/xgopdrej"/);
  assert.match(home, /method="POST"/);
  assert.match(home, /name="_gotcha"[^>]*tabindex="-1"/);
  for (const field of ["name", "email", "message"]) {
    assert.match(
      home,
      new RegExp(`<(?:input|textarea)[^>]*id="contact-${field}"[^>]*required`),
    );
    assert.match(home, new RegExp(`<label for="contact-${field}"`));
  }
  assert.match(
    home,
    /id="form-status"[^>]*role="status"[^>]*aria-live="polite"/,
  );
});

test("built analytics initializes the existing property only on production hosts", () => {
  const code = analytics(home);
  assert.equal(code.length, 1, "Exactly one analytics initializer");
  for (const host of [
    "obediencecorp.com",
    "www.obediencecorp.com",
    "localhost",
    "127.0.0.1",
    "preview.obediencecorp.com",
  ]) {
    const appended = [];
    const window = { location: { hostname: host } };
    const document = {
      createElement: (name) => ({ name }),
      head: { appendChild: (node) => appended.push(node) },
    };
    runInNewContext(code[0], { window, document });
    const production =
      host === "obediencecorp.com" || host === "www.obediencecorp.com";
    assert.equal(appended.length, production ? 1 : 0, host);
    if (production) {
      assert.equal(window.dataLayer.length, 2);
      assert.equal(window.dataLayer[0][0], "js");
      assert.deepEqual(Array.from(window.dataLayer[1]), [
        "config",
        "G-MEXG0YQYHQ",
      ]);
      assert.equal(appended[0].async, true);
      assert.equal(
        appended[0].src,
        "https://www.googletagmanager.com/gtag/js?id=G-MEXG0YQYHQ",
      );
    } else {
      assert.equal(window.dataLayer, undefined);
      assert.equal(window.gtag, undefined);
    }
  }
});

test("license delivery stays private and excluded from the sitemap", () => {
  const thanks = read("festival-activity/thanks/index.html");
  assert.match(thanks, /name="robots" content="noindex, nofollow"/);
  assert.match(thanks, /name="referrer" content="no-referrer"/);
  assert.match(
    thanks,
    /rel="canonical" href="https:\/\/obediencecorp.com\/festival-activity\/thanks\/"/,
  );
  assert.doesNotMatch(thanks, /googletagmanager|G-MEXG0YQYHQ|gtag\(/);
  for (const file of readdirSync(dist).filter((f) =>
    /^sitemap.*\.xml$/.test(f),
  )) {
    assert.doesNotMatch(read(file), /festival-activity\/thanks/);
  }
});

test("published routes, article metadata, feeds and local links remain available", () => {
  for (const path of [
    "work",
    "about",
    "thesis",
    "blog",
    "festival-activity",
    "festival-activity/terms",
    "blog/nine-months-of-festival",
    "blog/gates-are-decisions",
    "blog/loop-engineering",
  ]) {
    const html = read(`${path}/index.html`);
    assert.equal(analytics(html).length, 1, `${path}: production analytics`);
    assert.match(
      html,
      new RegExp(`rel="canonical" href="https://obediencecorp.com/${path}/"`),
    );
    assert.doesNotMatch(
      html,
      /Local preview|preventLocalSubmission|Content-Security-Policy/,
    );
    assert.match(html, /property="og:title" content="[^"]+"/);
    assert.match(
      html,
      /property="og:image" content="https:\/\/obediencecorp.com\//,
    );
    assert.doesNotMatch(html, /class="home-page"/);
  }
  assert.match(read("rss.xml"), /<rss/);
  assert.match(read("contact/index.html"), /\/#contact/);
  assert.match(read("products/index.html"), /\/work/);
  for (const file of htmlFiles(dist.pathname)) {
    const html = readFileSync(file, "utf8");
    for (const [, path] of html.matchAll(
      /(?:href|src|poster)="(\/(?!\/)[^"?#]*)(?:[?#][^"]*)?"/g,
    )) {
      const asset = new URL(decodeURIComponent(path.slice(1)), dist);
      assert(existsSync(asset), `${file}: missing local target ${path}`);
    }
  }
});

test("proof media is the original replay, with attribution and accessible controls", () => {
  const sources = {
    "media/camp-hardening-replay.mp4":
      "56bf9f534ec2167ca2441f7fb17c204e103612924e8e4f3797d28a0b344e489e",
    "media/camp-hardening-poster.png":
      "d0aead857f47ef50402a900c7f5bad83880691092a815bb499fdd9df26c81a69",
  };
  for (const [path, hash] of Object.entries(sources)) {
    assert.equal(
      createHash("sha256")
        .update(readFileSync(new URL(path, dist)))
        .digest("hex"),
      hash,
    );
  }
  const video = home.match(/<video\b[^>]*>/)?.[0];
  assert(video, "Replay video is present");
  for (const attribute of ["controls", "muted", "loop", "playsinline"]) {
    assert.match(video, new RegExp(`\\b${attribute}\\b`));
  }
  assert.match(home, /Drafted by Fathom/);
  assert.match(home, /Execution started with Grok, finished with Codex/);
  assert.match(home, /Historical plan replay/);
});
