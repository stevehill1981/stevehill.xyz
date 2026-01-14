# SteveHillXYZ

Personal Astro website with blog and projects showcase.

## Tech Stack
- Astro 4+ static site generator
- TypeScript/JavaScript
- Tailwind CSS
- Content collections for blog + projects

## Quick Commands
```bash
npm run dev                 # Dev server (port 4321)
npm run build               # Build for production
npm run preview             # Preview production build
```

## Deployment
Publishing is automatic via GitHub Actions CI when pushing to main. Do not run `npm run deploy` manually.

## Content Structure
- `src/content/blog/` - Blog posts (markdown with frontmatter)
- `src/content/projects/` - Project descriptions with metadata
- `src/components/` - Reusable Astro components
- `src/layouts/BaseLayout.astro` - Main layout with SEO

## Features
- Blog with tags, reading time estimates, chronological sorting
- Projects showcase with GitHub integration
- RSS feed, sitemap, Open Graph meta tags
- Code syntax highlighting with Shiki
- Deployed to GitHub Pages