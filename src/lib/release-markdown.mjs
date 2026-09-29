import {
  createSatteriMarkdownProcessor,
  satteriHeadingIdsPlugin,
} from "@astrojs/markdown-satteri";

export async function renderReleaseNotes(release) {
  const base = `https://github.com/Obedience-Corp/${release.repo}/blob/${encodeURIComponent(release.tag)}/`;
  const processor = await createSatteriMarkdownProcessor({
    syntaxHighlight: false,
    smartypants: false,
    hastPlugins: [
      satteriHeadingIdsPlugin(),
      {
        name: "safe-release-notes",
        raw(node, ctx) {
          ctx.replaceNode(node, { type: "text", value: node.value });
        },
        element: {
          filter: [],
          visit(node, ctx) {
            if (/^h[1-6]$/.test(node.tagName)) {
              ctx.replaceNode(node, {
                ...node,
                tagName: node.tagName === "h1" ? "h2" : node.tagName,
                properties: {
                  ...node.properties,
                  id: `note-${node.properties.id}`,
                },
              });
            }
            for (const key of ["href", "src"]) {
              const value = node.properties?.[key];
              if (typeof value !== "string") continue;
              if (key === "href" && value.startsWith("#")) {
                ctx.setProperty(node, key, `#note-${value.slice(1)}`);
                continue;
              }
              let url;
              try {
                url = new URL(value, base);
              } catch {
                /* Remove malformed URLs below. */
              }
              ctx.setProperty(
                node,
                key,
                url && ["https:", "http:"].includes(url.protocol)
                  ? url.href
                  : null,
              );
            }
          },
        },
      },
    ],
  });
  return (await processor.render(release.body)).code;
}
