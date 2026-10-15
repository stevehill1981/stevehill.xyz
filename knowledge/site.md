# Site Overview

stevehill.xyz -- personal portfolio and blog. Astro 7.3.8 static site deployed to GitHub Pages.

## Deployment

Deployed via `.github/workflows/deploy.yml` using GitHub Pages actions on push to `main`. CI handles deployment; there is no manual deploy command.

## Content

- **Blog**: 32 posts (2014--2025) in `src/content/blog/` with YAML frontmatter
- **Projects**: 16 showcases in `src/content/projects/` with YAML frontmatter

## Stack

| Concern | Tool |
|---------|------|
| Framework | Astro 7.3.8 (static output) |
| Hosting | GitHub Pages |
| Search | Pagefind (static indexing, built at deploy time) |
| RSS | @astrojs/rss |
| Sitemap | @astrojs/sitemap |
| Syntax highlighting | Remark + Shiki (dark-plus theme) |
| Image optimization | Sharp + custom lazy-image rehype plugin |

## Pages and Routes

Key standalone pages: about, now, principles, archive, series, tags.

Dynamic routes:
- `/blog/[slug]`
- `/projects/[slug]`
- `/tags/[tag]`

## Components

`SiteHeader`, `Footer`, `SearchModal`, `TableOfContents`, `Breadcrumb`, `CodeBlock`, `ShareButtons`.

## Development

```sh
npm run dev    # local server, likely port 4321
```
