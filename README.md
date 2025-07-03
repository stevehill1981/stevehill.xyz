# stevehill.xyz

The source code for my personal website, built with [Astro](https://astro.build/). A consolidated site featuring my blog, projects showcase, and personal landing page.

## Features

### Content
- **Blog**: 20+ posts on software engineering, technology, and more
- **Projects**: Showcase of my software projects with GitHub integration
- **About page**: Personal information and background

### Technical Features  
- **RSS feed** for blog subscriptions (`/rss.xml`)
- **Sitemap generation** for SEO
- **Open Graph & Twitter meta tags** for social sharing
- **Reading time estimates** on blog posts
- **Code syntax highlighting** with Shiki
- **Responsive design** with consistent navigation
- **Content collections** for structured blog and project content

### Built With
- [Astro](https://astro.build/) v5.10.2 - Static site generator
- Content collections for blog posts and projects
- Astro integrations: RSS, Sitemap
- GitHub Pages deployment

## Development

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Content Structure

- `src/content/blog/` - Blog posts in Markdown with frontmatter
- `src/content/projects/` - Project descriptions with metadata
- `src/pages/blog/` - Blog listing and individual post pages
- `src/pages/projects/` - Projects listing and individual project pages
- `src/layouts/BaseLayout.astro` - Shared layout with SEO meta tags
- `src/components/SiteHeader.astro` - Navigation component

## Deployment

Deployed to GitHub Pages. Build and deploy with:

```bash
npm run build
npm run deploy
```

The site is available at [stevehill.xyz](https://stevehill.xyz).
