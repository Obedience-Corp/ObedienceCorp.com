// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://obediencecorp.com",
  integrations: [
    sitemap({
      // Keep the unlinked preview routes out of the sitemap.
      filter: (page) =>
        !page.includes("/preview/") && !page.endsWith("/rss.xml"),
    }),
  ],
  redirects: {
    "/products": "/work",
    "/thesis": "/#thesis",
    "/contact": "/#contact",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
