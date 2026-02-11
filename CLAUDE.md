# SteveHillXYZ

Personal Astro site. Blog + projects showcase. Deployed to GitHub Pages.

## Commands
```bash
npm run dev      # Dev server (port 4321)
npm run build    # Production build
```

## Rules
- **Never run `npm run deploy`** — CI handles deployment on push to main
- Blog posts go in `src/content/blog/` (markdown + frontmatter)
- Projects go in `src/content/projects/`

## Content Frontmatter

```yaml
# Blog post
title: "Post Title"
description: "Brief description"
pubDate: 2026-01-29
tags: ["tag1", "tag2"]

# Project
title: "Project Name"
description: "What it does"
github: "username/repo"  # Optional
url: "https://..."       # Optional
```

## Astro Patterns
- Layouts: `src/layouts/BaseLayout.astro` (has SEO meta)
- Dynamic routes: `[slug].astro` files use `getStaticPaths()`
- Images: Put in `public/` or use Astro's image optimization