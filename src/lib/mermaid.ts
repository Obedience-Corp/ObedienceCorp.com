export async function mountMermaid() {
  const blocks = document.querySelectorAll("pre > code.language-mermaid");
  if (blocks.length === 0) return;

  const mermaid = (await import("mermaid")).default;
  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif",
    themeVariables: {
      background: "#000000",
      primaryColor: "#161616",
      primaryTextColor: "#f4f4f4",
      primaryBorderColor: "#8a8a8a",
      lineColor: "#c8c8c8",
      secondaryColor: "#1c1c1c",
      tertiaryColor: "#000000",
      textColor: "#f4f4f4",
      nodeTextColor: "#f4f4f4",
      mainBkg: "#161616",
      fontSize: "16px",
    },
    flowchart: {
      htmlLabels: true,
      useMaxWidth: false,
      padding: 12,
    },
  });

  let n = 0;
  for (const code of blocks) {
    const pre = code.parentElement;
    if (!(pre instanceof HTMLElement)) continue;
    const src = code.textContent ?? "";
    const host = document.createElement("div");
    host.className = "diagram";
    pre.replaceWith(host);
    try {
      const id = `diagram-${n++}`;
      const { svg } = await mermaid.render(id, src);
      host.innerHTML = svg;
      const drawn = host.querySelector("svg");
      if (drawn instanceof SVGElement) {
        drawn.removeAttribute("width");
        drawn.removeAttribute("height");
        drawn.style.maxWidth = "100%";
        drawn.style.height = "auto";
      }
    } catch (err) {
      host.textContent = src;
      host.classList.add("diagram-error");
      console.error(err);
    }
  }
}
