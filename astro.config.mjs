// @ts-check
import { defineConfig } from "astro/config";
import { readFileSync } from "node:fs";
import { releaseHref, isFestivalRelease } from "./src/lib/releases.mjs";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";

const stripHtmlComments = {
  name: "strip-html-comments",
  comment(node, context) {
    context.removeNode(node);
  },
  raw(node, context) {
    if (/^<!--[\s\S]*-->$/.test(node.value.trim())) {
      context.removeNode(node);
    }
  },
};

const snapshot = JSON.parse(
  readFileSync(new URL("./src/data/releases.json", import.meta.url), "utf8"),
);
const releaseDates = new Map();
for (const release of snapshot.releases) {
  if (!isFestivalRelease(release))
    releaseDates.set(releaseHref(release), release.updatedAt);
  for (const path of ["/releases/", `/releases/${release.repo}/`]) {
    if (!releaseDates.has(path) || releaseDates.get(path) < release.updatedAt)
      releaseDates.set(path, release.updatedAt);
  }
}

export default defineConfig({
  site: "https://obediencecorp.com",
  integrations: [
    sitemap({
      serialize(item) {
        const updated = releaseDates.get(new URL(item.url).pathname);
        return updated ? { ...item, lastmod: updated } : item;
      },
      // The Festival Activity success page is reached with a checkout session
      // id in its query string, which reads a license key for 24 hours. Listing
      // it invites a crawler onto the delivery page. The page also carries a
      // noindex, set through the noindex prop on Base.astro.
      filter: (page) => !page.endsWith("/festival-activity/thanks/"),
    }),
  ],
  // Inbound links from the previous obediencecorp.com. /thesis is deliberately
  // absent: it is a real route here, and the old /thesis -> /#thesis redirect
  // would shadow it.
  redirects: {
    "/products": "/work",
    "/contact": "/#contact",
  },
  markdown: {
    processor: satteri({ hastPlugins: [stripHtmlComments] }),
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["mermaid"],
    },
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
});
