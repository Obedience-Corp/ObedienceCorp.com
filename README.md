# Obedience Corp Website

The marketing site for [Obedience Corp](https://obediencecorp.com), built with
[Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com) and
deployed to GitHub Pages.

> _"Obedience Corp builds AI that does what you want, the way you want it done."_

## About Obedience Corp

Obedience Corp is researching **organized diffusion**: systems that turn vague
user intent into expected results with minimal intervention between input and
outcome. LLMs model language and diffusion models resolve visual noise.
Organized diffusion models execution, turning ambiguous intent into structured
work across agents, tools, context, workflows, and artifacts.

The site presents the company thesis and the products built on the stack:

| Product | Status | Summary |
| :-------------------- | :--------- | :-------------------------------------------------------------------- |
| **Festival** | Active | Methodology and CLI toolchain (`fest` + `camp`) for structured agent development. Flagship. |
| **Obey** | Internal | The agent runtime that executes intent, structured by Festival. |
| **Obedience** | Coming soon | The application layer for managing the information you consume and create. |
| **Obey Agent Economy** | Active | Five autonomous agents across Hedera, 0G, and Base. Chainlink hackathon winner. Built on the stack. |

## Tech Stack

- **Astro 6** — static site generator
- **Tailwind CSS 4** — styling via the `@tailwindcss/vite` plugin
- **@astrojs/sitemap** — automatic sitemap generation
- Self-hosted fonts via `@fontsource` (Inter, JetBrains Mono, Source Serif 4)
- Node `>=22.12.0`

## Project Structure

```text
/
├── public/                 # Static assets served as-is
├── src/
│   ├── pages/              # Routes (index.astro, work.astro, blog/)
│   ├── layouts/           # BaseLayout.astro
│   ├── components/        # Nav, Footer
│   ├── content/
│   │   ├── blog/          # Company essays (Markdown content collection)
│   │   └── products/      # Product entries (Markdown content collection)
│   ├── styles/            # global.css
│   └── content.config.ts  # Content collection schema
├── astro.config.mjs        # Site config, redirects, integrations
├── justfile                # Task runner entry point
└── justfiles/dev.just      # Development recipes
```

Pages live in `src/pages/` and are routed by file name. Product cards on the
`/work` page are driven by the Markdown files in `src/content/products/`, each
with frontmatter (`name`, `tagline`, `status`, `description`, links, ordering).

## Commands

This project uses [`just`](https://github.com/casey/just) as its command runner.
Run `just` with no arguments to list available recipes.

| Command         | Action                                       |
| :-------------- | :------------------------------------------- |
| `just install`  | Install dependencies                         |
| `just dev`      | Start the local dev server                   |
| `just build`    | Build the static site to `./dist/`           |
| `just test`     | Production build plus blog list/RSS checks   |
| `just preview`  | Preview the production build locally          |
| `just fmt`      | Format with Prettier                         |
| `just fmt-check`| Check formatting without writing             |
| `just clean`    | Remove build artifacts                       |

The underlying `npm run dev`, `npm run build`, and `npm run preview` scripts are
also available if you prefer running Astro directly.

## Deployment

Pushes to `main` trigger the **Deploy to GitHub Pages** workflow
(`.github/workflows/deploy.yml`), which builds the site with `npx astro build`
and publishes the `dist/` artifact. The production site is served at
[obediencecorp.com](https://obediencecorp.com).
