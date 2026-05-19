# Site Overview

stevehill.xyz -- personal portfolio and blog. Astro 5.17.3 static site deployed to GitHub Pages.

## Deployment

Deployed via `gh-pages` CI workflow on push to the default branch. **Never run `npm run deploy` manually** -- the CI handles it.

## Content

- **Blog**: 32 posts (2014--2025) in `src/content/blog/` with YAML frontmatter
- **Projects**: 16 showcases in `src/content/projects/` with YAML frontmatter

## Stack

| Concern | Tool |
|---------|------|
| Framework | Astro 5.17.3 (static output) |
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
