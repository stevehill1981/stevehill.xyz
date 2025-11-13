---
title: "Building Shiki Highlight API: How Development Workflow Saved My Syntax Highlighting"
pubDate: 2025-11-13
excerpt: "From 389 console errors to zero: building a high-performance syntax highlighter with CSS Custom Highlights API, Shiki, and Claude Code—and learning that workflow matters more than I thought."
tags:
  - development
  - tooling
  - performance
  - css
  - software-engineering
  - project-showcase
---

My retro computing learning platform, [Code Like It's 198x](https://code198x.stevehill.xyz), has a problem: pages with thousands of lines of Z80 assembly or Sinclair BASIC code. Traditional syntax highlighting wraps every token in a `<span>` element—that's tens of thousands of DOM nodes per page. The browser struggles.

Then I read [pavi2410's blog post](https://pavi2410.com/blog/high-performance-syntax-highlighting-with-css-highlights-api/) about CSS Custom Highlights API. The performance claims were compelling: 87% fewer DOM nodes, single text nodes, browser-optimized rendering. They'd left the tokenization step open: "use your lexer of choice."

I wondered: could this work with Shiki? And could Claude Code build it for me?

Spoiler: yes, but not before teaching me that 'vibe coding' without a proper development workflow will absolutely bite you.

## What is CSS Custom Highlights API?

Before we get into the chaos, let's establish what we're actually building.

Traditional syntax highlighting looks like this:

```html
<pre><code>
  <span class="keyword">const</span>
  <span class="variable">x</span>
  <span class="operator">=</span>
  <span class="number">42</span>
  <span class="punctuation">;</span>
</code></pre>
```

Every single token wrapped in a DOM element. For a 50-line code block with hundreds of tokens, that's hundreds of `<span>` elements. Each one has memory overhead, layout cost, and rendering complexity.

CSS Custom Highlights API works differently:

```html
<pre><code>const x = 42;</code></pre>
```

Just a single text node. The browser maintains Range objects internally to mark which characters get which colors:

```javascript
// Create ranges for each token type
const keywordRange = new Range();
keywordRange.setStart(textNode, 0);  // "const"
keywordRange.setEnd(textNode, 5);

// Register the highlight
const highlight = new Highlight(keywordRange);
CSS.highlights.set('keyword', highlight);
```

Then style them with CSS:

```css
::highlight(keyword) {
  color: #569cd6;
}
```

The performance difference is dramatic. One text node instead of hundreds of elements. No DOM manipulation overhead. Browser-optimized rendering paths. This is exactly what Code Like It's 198x needs.

## The Build: Two Packages

Working with Claude Code, we (that's me directing, Claude Code implementing) built two packages.

**First: `shiki-highlight-api`** — the core library that takes Shiki's tokens and generates:
- Clean HTML with single text nodes per line
- CSS with `::highlight()` pseudo-element rules
- Client-side JavaScript to register Range objects with the browser

**Second: `remark-shiki-highlight-api`** — a remark plugin that integrates it into markdown processing pipelines, perfect for static site generators like Astro.

The initial versions worked. Tests passed. The browser rendered highlighted code. I published to npm, integrated it into my personal website (this one, stevehill.xyz), and felt good about the progress.

But I hadn't actually tested properly. I'd looked at a page, seen colored code, and assumed it worked. That assumption was about to cost me several frustrating hours.

## The Crash: 389 Errors

Version 0.3.0 had language loading failures. Version 0.3.1 had the same issues. Version 0.3.2 finally fixed the duplicate code blocks—a major win—but introduced a catastrophic new problem.

When I actually opened the browser console (which, let's be honest, I should have done earlier), I saw 389 errors:

```
Range creation failed for line 7, range 0-0: IndexSizeError
Range creation failed for line 15, range 0-0: IndexSizeError
Range creation failed for line 23, range 5-12: IndexSizeError
... (386 more errors)
```

And the code blocks? Completely unstyled. No syntax highlighting at all, despite having the `.shiki` class and all the generated CSS. The CSS Custom Highlights API was rejecting every Range object I tried to create.

At this point, I realized the real problem: my workflow. I'd been publishing to npm, installing on my site, discovering issues, then repeating the cycle. Vibe coding with Claude Code worked fine—I just needed a better feedback loop to ask the right questions in the right way.

## The Fix: Local Development Loop

The solution wasn't fixing the code immediately—it was fixing how I worked with the code. I needed to test changes instantly without the publish-install-test cycle.

Enter `npm link`: a local development workflow that creates symlinks between packages. Here's what we set up:

```bash
# In shiki-highlight-api
npm link
npm run dev  # tsup watch mode - rebuilds on every change

# In remark-shiki-highlight-api
npm link shiki-highlight-api
npm link

# In website project
npm link remark-shiki-highlight-api
```

Now the chain worked: edit files in `shiki-highlight-api/src/`, tsup auto-rebuilds, Astro dev server auto-reloads. Instant feedback loop.

![npm link workflow diagram](/images/blog/npm-link-flow.svg)

With this setup, we could actually debug the Range API errors. Add a console.log, save the file, see the result in the browser within seconds. No publishing, no version bumping, no waiting.

This is the lesson: when working with AI to build software, the speed of your feedback loop determines the quality of your questions. Fast iteration meant I could quickly validate hypotheses with Claude Code and see if the fixes actually worked.

## The Fix: The Technical Solution

With the fast feedback loop in place, we could actually investigate the errors. The problem became clear: empty lines.

Traditional syntax highlighting wraps every token in a `<span>`, so even empty lines have DOM structure. But our approach generated clean HTML with `.line-content` elements containing text nodes. Empty lines had the elements, but no text nodes inside them.

The Range API doesn't care about your feelings. Try to create a Range pointing to a text node that doesn't exist? `IndexSizeError`. Try to create a Range with offsets that exceed the text length? `IndexSizeError`.

Here's what the fix looked like in `shiki-highlight-api/src/index.ts`:

```javascript
// Before: Assumed text nodes always exist
const range = new Range();
range.setStart(textNode, r.start);
range.setEnd(textNode, r.end);
```

This code had no validation. It trusted that:
1. A text node existed
2. The text node was long enough for the specified range

Both assumptions were wrong for empty lines.

```javascript
// After: Validate everything
const textNode = lineContentElement.firstChild;

// Check text node exists and is actually a text node
if (!textNode || textNode.nodeType !== 3) {
  console.warn(`Line ${r.line}: No text node found`);
  return null;
}

// Validate range offsets don't exceed text length
const textLength = textNode.nodeValue ? textNode.nodeValue.length : 0;
if (r.start > textLength || r.end > textLength) {
  console.error(`Line ${r.line}: Range overflow - text length: ${textLength}, range: ${r.start}-${r.end}`);
  return null;
}

// Now safe to create the range
const range = new Range();
try {
  range.setStart(textNode, r.start);
  range.setEnd(textNode, r.end);
  return range;
} catch (e) {
  console.error(`Range creation failed for line ${r.line}, range ${r.start}-${r.end}:`, e);
  return null;
}
```

The fix adds three layers of validation:
1. **Text node existence check**: `nodeType !== 3` ensures we have an actual text node, not an element or comment
2. **Length validation**: Verify the range offsets don't exceed the available text
3. **Try-catch safety net**: Catch any remaining edge cases with proper error logging

The result? Zero errors. Six code blocks on the test page, all properly highlighted.

## The Result: Published and Working

Published as `shiki-highlight-api` v1.0.2 and `remark-shiki-highlight-api` v0.3.4, these packages now work exactly as intended. This site you're reading uses them. Code Like It's 198x will use them soon. The performance gains are real: 87% fewer DOM nodes, cleaner HTML, faster rendering.

But the real story isn't about CSS Custom Highlights API or Shiki integration. It's about workflow.

'Vibe coding' with Claude Code got me 90% of the way there—the packages were conceptually correct, the architecture sound, the implementation mostly right. But that last 10% required a tight feedback loop. Publishing to npm, installing, and testing is fine for stable code. It's terrible for debugging cutting-edge browser APIs with subtle edge cases.

The `npm link` setup wasn't glamorous. It didn't feel like progress. But it was the difference between frustrating hours of blind iteration and quick, confident debugging. Fast feedback meant I could ask Claude Code better questions: "Why would Range creation fail on empty lines?" instead of "Why doesn't this work?"

If you're working with AI to build software—or honestly, building anything complex—invest in your development workflow first. The faster you can test hypotheses, the better your results will be.

## Try It Yourself

The packages are open source and available on npm:

- **[shiki-highlight-api](https://github.com/shiki-highlights/shiki-highlight-api)** — Core library for CSS Custom Highlights API + Shiki
- **[remark-shiki-highlight-api](https://github.com/shiki-highlights/remark-shiki-highlight-api)** — Remark plugin for markdown pipelines

Installation:

```bash
npm install remark-shiki-highlight-api
```

Usage with Astro:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import remarkShikiHighlightApi from 'remark-shiki-highlight-api';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkShikiHighlightApi],
  },
});
```

Use them, break them, send issues. And remember: your development workflow matters more than you think.
