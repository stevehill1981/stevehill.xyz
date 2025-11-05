---
title: "shiki-highlight-api"
description: "High-performance syntax highlighting using the CSS Highlights API instead of span elements, dramatically improving rendering performance"
tags:
  - typescript
  - npm
  - syntax-highlighting
  - performance
  - web-standards
github: "https://github.com/stevehill1981/shiki-highlight-api"
demo: "https://www.npmjs.com/package/shiki-highlight-api"
featured: true
technologies:
  - typescript
  - shiki
  - css-highlights-api
status: "Published"
year: 2025
---

A modern approach to syntax highlighting that leverages the CSS Highlights API to achieve dramatically better performance than traditional span-based highlighting. Created for [Code Like It's 198x](https://code198x.stevehill.xyz) to handle large code examples efficiently.

## 🚀 The Problem

Traditional syntax highlighting creates hundreds or thousands of `<span>` elements for styling code:

```html
<!-- Traditional approach -->
<span class="keyword">const</span>
<span class="variable">foo</span>
<span class="operator">=</span>
<span class="string">"bar"</span>
```

This has significant performance implications:
- **DOM bloat** - Massive element trees for large code blocks
- **Layout thrashing** - Every span triggers layout calculations
- **Memory overhead** - Each element consumes significant memory
- **Slow initial render** - Browser must process thousands of elements

## ✨ The Solution

The CSS Highlights API lets you style text ranges without creating DOM elements:

```typescript
import { highlightCode } from 'shiki-highlight-api';

const highlighted = await highlightCode(code, {
  lang: 'javascript',
  theme: 'github-dark'
});

// Apply highlights using the CSS Highlights API
// Zero additional DOM elements created!
```

Instead of spans, the browser natively highlights text ranges using the `::highlight()` pseudo-element:

```css
::highlight(token-keyword) {
  color: #ff79c6;
}

::highlight(token-string) {
  color: #f1fa8c;
}
```

## 📊 Performance Benefits

Inspired by [Pavi's blog post](https://pavi2410.com/blog/high-performance-syntax-highlighting-with-css-highlights-api/), the CSS Highlights API approach delivers:

- **90%+ fewer DOM nodes** - No span elements means dramatically smaller trees
- **Faster initial render** - Browser doesn't construct thousands of elements
- **Lower memory usage** - Text ranges are lighter than DOM elements
- **Better responsiveness** - Layout calculations happen on native ranges
- **Instant theme switching** - Just update CSS custom properties

## 🎯 Key Features

### Shiki-Powered Tokenization
- Uses Shiki's industry-standard tokenization
- Support for 100+ languages out of the box
- Compatible with all Shiki themes
- TextMate grammar support for accuracy

### CSS Highlights API Integration
- Automatic highlight range creation
- CSS custom properties for theming
- No JavaScript required for styling
- Works with `::highlight()` pseudo-element

### TypeScript Support
- Full type definitions included
- IDE autocomplete for all options
- Type-safe theme and language selection

### Framework Agnostic
- Works with any JavaScript framework
- Also available as a Remark plugin (see remark-shiki-highlight-api)
- Can be used standalone or integrated

## 📦 Installation

```bash
npm install shiki-highlight-api
```

## 🔧 Basic Usage

```typescript
import { highlightCode } from 'shiki-highlight-api';

// Highlight code and get range data
const result = await highlightCode('const x = 42;', {
  lang: 'javascript',
  theme: 'github-dark'
});

// Apply highlights to your code element
const codeElement = document.querySelector('code');
result.applyHighlights(codeElement);
```

## 🎨 Styling

Define styles for your token types using CSS custom properties:

```css
::highlight(token-keyword) {
  color: var(--shiki-keyword);
  font-weight: 600;
}

::highlight(token-string) {
  color: var(--shiki-string);
}

::highlight(token-function) {
  color: var(--shiki-function);
}

::highlight(token-comment) {
  color: var(--shiki-comment);
  font-style: italic;
}
```

## 🔗 Remark Plugin

For Markdown/MDX workflows, use the companion plugin:

```typescript
import remarkShikiHighlight from 'remark-shiki-highlight-api';

// In your Remark/Astro config
{
  markdown: {
    remarkPlugins: [
      [remarkShikiHighlight, {
        theme: 'github-dark',
        langs: ['javascript', 'typescript', 'rust']
      }]
    ]
  }
}
```

See [remark-shiki-highlight-api](/projects/remark-shiki-highlight-api) for details.

## 🌐 Browser Support

The CSS Highlights API is supported in:
- Chrome/Edge 105+
- Safari 17.2+
- Firefox 134+ (behind flag, full support coming soon)

For unsupported browsers, the library gracefully degrades to displaying unstyled code (still readable, just without syntax highlighting).

## 🎓 Inspiration

This project was directly inspired by [Pavi's excellent blog post](https://pavi2410.com/blog/high-performance-syntax-highlighting-with-css-highlights-api/) demonstrating the performance benefits of the CSS Highlights API for syntax highlighting.

## 🔮 Future Development

Potential enhancements:
- Line number integration
- Copy-to-clipboard handling
- Diff highlighting support
- Inline annotations
- Performance benchmarking suite

## 📚 Use Cases

Perfect for:
- **Technical documentation** sites with lots of code examples
- **Tutorial platforms** like Code Like It's 198x
- **Code blogs** with syntax highlighting needs
- **MDX-based sites** using Astro, Next.js, or similar
- Any project where **performance matters** more than IE11 support

## 🛠️ Technical Details

Built with modern web standards:
- TypeScript for type safety
- Shiki for tokenization
- CSS Highlights API for rendering
- ES modules for tree-shaking

The library is intentionally minimal - it does one thing (syntax highlighting) exceptionally well, with zero runtime dependencies beyond Shiki.

## 📖 Documentation

Full API documentation and examples available on [GitHub](https://github.com/stevehill1981/shiki-highlight-api) and [npm](https://www.npmjs.com/package/shiki-highlight-api).
