# stevehill.xyz

The source code for my personal website, built with [Astro](https://astro.build/). A consolidated site featuring my blog, projects showcase, and personal landing page.

## What I want the site to show

I want visitors to be able to explore the work without already knowing its tools or terminology. Useful explanations should make the choices and constraints easier to understand. Accessibility, fast pages and a maintainable site are part of that work.

I use AI in my projects, and I remain responsible for what I choose to publish. Claims should point to code, sources, tests or observed results, with their limits made clear. I would rather revise or remove weak work than dress it up as finished. The [site quality epic](https://github.com/stevehill1981/stevehill.xyz/issues/78) tracks that standard; it is an ambition to verify, not a claim that every project has been independently audited.

## Development runtime

Use Node.js 24 or newer. The project uses mise to select Node.js 24.22.0 locally; run `mise install` before installing dependencies. CI uses the same Node.js version.

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
- [Astro](https://astro.build/) v7 - Static site generator
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

GitHub Actions builds and deploys the site to GitHub Pages when changes are pushed to `main`. Run `npm run build` locally to verify changes before pushing.

The site is available at [stevehill.xyz](https://stevehill.xyz).
