import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = (
    await getCollection("blog", ({ data }) => data.draft !== true)
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: "Obedience Corp",
    description:
      "Field notes from Obedience Corp. Forward deployed engineering: we embed with your team and remove the work that is eating it.",
    site: context.site ?? "https://obediencecorp.com",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
      link: `/blog/${post.id}/`,
      author: post.data.author,
    })),
  });
}
