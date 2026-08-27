// @ts-check
import { defineConfig } from "astro/config";
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

export default defineConfig({
  site: "https://obediencecorp.com",
  integrations: [sitemap()],
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
