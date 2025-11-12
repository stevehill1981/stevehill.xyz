# remark-shiki-highlight-api Integration Design

**Date:** 2025-11-12
**Version:** 0.2.1
**Purpose:** Integrate remark-shiki-highlight-api to test the package on production site

## Overview

Replace Astro's built-in Shiki configuration with remark-shiki-highlight-api v0.2.1. This validates the package works with Shiki v3 and Astro 5 in production.

## Requirements

- Test remark-shiki-highlight-api v0.2.1 in production
- Maintain current visual appearance (dark-plus theme)
- No user-visible changes
- Preserve existing code block functionality

## Architecture

### Current State
Astro processes markdown through its remark pipeline and applies Shiki highlighting via built-in `shikiConfig`:

```js
markdown: {
  shikiConfig: {
    theme: 'dark-plus'
  }
}
```

### Proposed State
The remark plugin intercepts code blocks before Astro's built-in highlighting and transforms them using Shiki's Highlight API:

```js
import remarkShikiHighlightApi from 'remark-shiki-highlight-api';

export default defineConfig({
  markdown: {
    syntaxHighlight: false,  // Disable built-in
    remarkPlugins: [
      [remarkShikiHighlightApi, { theme: 'dark-plus' }]
    ]
  }
});
```

## Implementation

### 1. Install Package
```bash
npm install remark-shiki-highlight-api@0.2.1
```

### 2. Update Configuration
File: `astro.config.mjs`

- Add import for `remark-shiki-highlight-api`
- Set `syntaxHighlight: false`
- Remove `shikiConfig` section
- Add plugin to `remarkPlugins` array with theme configuration

### 3. Test Locally
```bash
npm run dev
```

Visit blog posts containing code blocks (e.g., `/blog/2017-05-03-spectrum-development-environment/`) and verify:
- Syntax highlighting works
- Theme matches current dark-plus
- No console errors

### 4. Test Production Build
```bash
npm run build
npm run preview
```

Verify build completes and preview works correctly.

## Testing

### Success Criteria
- Code blocks display syntax highlighting
- Visual appearance matches current site
- Build completes without errors
- No performance regression

### Test Cases
- Blog post with multiple languages (bash, asm, etc.)
- Dev server hot reload with code changes
- Production build
- Preview of production build

### Rollback Plan
If issues occur:

1. `npm uninstall remark-shiki-highlight-api`
2. Restore original `astro.config.mjs`
3. Commit revert

## Potential Issues

### Theme Name
If 'dark-plus' fails, try:
- 'Dark Plus'
- Check Shiki v3 theme names

### CSS Classes
Plugin generates Shiki-standard classes. Astro should handle styles automatically.

### ESM Compatibility
Modern Astro handles ESM imports. No issues expected.

## Timeline

- Installation: 1 minute
- Configuration: 2 minutes
- Local testing: 3 minutes
- Production build test: 3 minutes
- Total: ~10 minutes
