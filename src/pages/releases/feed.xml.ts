import rss from "@astrojs/rss";
import { releases } from "../../lib/release-data";
import {
  releaseHref,
  releaseTitle,
  releaseSummary,
} from "../../lib/releases.mjs";
export function GET() {
  return rss({
    title: "Obedience Corp releases",
    description:
      "Published releases from every public Obedience Corp repository.",
    site: "https://obediencecorp.com",
    items: releases.map((release) => ({
      title: `${releaseTitle(release)}${release.prerelease ? " (Prerelease)" : ""}`,
      pubDate: new Date(release.publishedAt),
      description: releaseSummary(release),
      link: releaseHref(release),
      customData: `<guid isPermaLink="false">github-release:${release.id}</guid>`,
    })),
  });
}
