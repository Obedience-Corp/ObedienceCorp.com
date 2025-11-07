# Obedience Corp

Official landing page for Obedience Corp - AI orchestration and tooling company.

## Overview

Obedience Corp is the parent company for Guild, a multi-agent AI orchestration platform, and other AI-related projects. The name plays on dystopian sci-fi themes while representing a serious AI tooling and consulting business.

## Site Features

- **Corporate Dystopian Aesthetic**: Dark, terminal-inspired design evoking nameless megacorps from Mr. Robot
- **Progressive Reveal**: Subtle system initialization sequence
- **Minimal & Impactful**: Say everything by saying very little
- **Single-Page Application**: Zero build process, GitHub Pages ready
- **Fully Responsive**: Mobile-first design

## Tech Stack

- HTML5
- Tailwind CSS (CDN)
- HTMX (CDN)
- Custom CSS for cyberpunk effects (grid, scanlines, glows)

## Local Development

Simply open `index.html` in a browser. No build process required.

```bash
# Option 1: Open directly
open index.html

# Option 2: Serve locally (Python)
python3 -m http.server 8000
# Then visit http://localhost:8000

# Option 3: Serve locally (Node)
npx http-server
```

## Deployment to GitHub Pages

### Initial Setup

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Under "Source", select "Deploy from a branch"
4. Select `main` branch and `/ (root)` folder
5. Click Save

### Custom Domain (optional)

1. Add `CNAME` file with your domain:
   ```
   obediencecorp.com
   ```

2. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153

   Type: CNAME
   Name: www
   Value: yourusername.github.io
   ```

3. Update Settings → Pages → Custom domain field

### Updates

```bash
# Make changes to index.html
git add index.html
git commit -m "Update landing page"
git push origin main
```

GitHub Pages will automatically deploy within 1-2 minutes.

## Brand Guidelines

- **Company Name**: Obedience Corp
- **Tagline**: "AI that does what you want. The way you want it done."
- **Product**: Guild by Obedience Corp
- **Product Tagline**: "One person. A thousand agents. Perfect coordination."
- **Location**: Denver, Colorado
- **Contact**: contact@obediencecorp.com

## Design Philosophy

The design intentionally evokes:
- Mr. Robot's fsociety and E-Corp aesthetic
- Blade Runner 2049's corporate brutalism
- Nameless megacorps from sci-fi dystopias
- Professional yet unsettling

This creates intrigue and memorability while maintaining corporate professionalism.

## Archive

Previous design iterations are stored in `archive/`:
- `site.html` - Card-based layout with panels
- `site2.html` - Similar to site.html with refined copy
- `site3.html` - Simplified centered layout
- `site4.html` - Left-aligned minimal design (basis for current version)
