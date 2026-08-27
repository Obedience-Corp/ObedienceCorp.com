import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = (
    await getCollection("blog", ({ data }) => data.draft !== true)
  ).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: "Obedience Corp",
    description:
      "Company essays from Obedience Corp. Canonical home for organized diffusion and related writing.",
    site: context.site ?? "https://obediencecorp.com",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      author: post.data.author,
    })),
  });
}
