#!/usr/bin/env node
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const dist = path.join(process.cwd(), "dist");
const failures = [];

function mustExist(rel) {
  const full = path.join(dist, rel);
  if (!existsSync(full)) failures.push(`missing ${rel}`);
}

function mustNotExist(rel) {
  const full = path.join(dist, rel);
  if (existsSync(full)) failures.push(`draft leaked at ${rel}`);
}

function read(rel) {
  return readFileSync(path.join(dist, rel), "utf8");
}

mustExist("blog/index.html");
mustExist("blog/organized-diffusion/index.html");
mustExist("rss.xml");
mustNotExist("blog/draft-workflow/index.html");

if (existsSync(path.join(dist, "blog/organized-diffusion/index.html"))) {
  const html = read("blog/organized-diffusion/index.html");
  for (const needle of [
    "Organized diffusion",
    "By Lance Rogers",
    'rel="canonical"',
    "https://obediencecorp.com/blog/organized-diffusion/",
  ]) {
    if (!html.includes(needle)) failures.push(`post html missing ${needle}`);
  }
  if (!html.includes("og:type") || !html.includes("article")) {
    failures.push("post html missing og:type article");
  }
}

if (existsSync(path.join(dist, "rss.xml"))) {
  const xml = read("rss.xml");
  if (!xml.includes("Organized diffusion")) {
    failures.push("rss missing published post");
  }
  if (xml.includes("Draft workflow example")) {
    failures.push("rss includes draft post");
  }
}

if (existsSync(path.join(dist, "blog/index.html"))) {
  const list = read("blog/index.html");
  if (list.includes("Draft workflow example")) {
    failures.push("index lists draft post");
  }
  if (!list.includes("Organized diffusion")) {
    failures.push("index missing published post");
  }
}

if (failures.length) {
  console.error(failures.map((f) => `FAIL: ${f}`).join("\n"));
  process.exit(1);
}

console.log("blog check passed");
