# remark-shiki-highlight-api Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Integrate remark-shiki-highlight-api v0.2.1 to replace Astro's built-in Shiki highlighting

**Architecture:** Add remark-shiki-highlight-api as a remark plugin in Astro's markdown processing pipeline, disable built-in Shiki, maintain dark-plus theme for visual consistency

**Tech Stack:** Astro 5.10.2, remark-shiki-highlight-api 0.2.1, Shiki v3

---

## Task 1: Install Package

**Files:**
- Modify: `package.json` (dependencies)
- Modify: `package-lock.json` (auto-generated)

**Step 1: Install remark-shiki-highlight-api**

Run:
```bash
npm install remark-shiki-highlight-api@0.2.1
```

Expected output:
```
added [N] packages, and audited [M] packages in [X]s
```

**Step 2: Verify installation**

Run:
```bash
npm list remark-shiki-highlight-api
```

Expected output:
```
stevehill.xyz@1.0.0 /Users/stevehill/Projects/SteveHillXYZ
└── remark-shiki-highlight-api@0.2.1
```

**Step 3: Commit package changes**

Run:
```bash
git add package.json package-lock.json
git commit -m "build: add remark-shiki-highlight-api@0.2.1

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

Expected: Clean commit with 2 files changed

---

## Task 2: Update Astro Configuration

**Files:**
- Modify: `astro.config.mjs` (entire file)

**Step 1: Read current configuration**

Run:
```bash
cat astro.config.mjs
```

Current content:
```js
// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://stevehill.xyz',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'dark-plus'
    }
  }
});
```

**Step 2: Update configuration file**

Replace entire file with:
```js
// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkShikiHighlightApi from 'remark-shiki-highlight-api';

// https://astro.build/config
export default defineConfig({
  site: 'https://stevehill.xyz',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      [remarkShikiHighlightApi, {
        theme: 'dark-plus'
      }]
    ]
  }
});
```

**Changes made:**
1. Added import: `import remarkShikiHighlightApi from 'remark-shiki-highlight-api';`
2. Removed: `shikiConfig: { theme: 'dark-plus' }`
3. Added: `syntaxHighlight: false`
4. Added: `remarkPlugins` array with plugin configuration

**Step 3: Verify syntax**

Run:
```bash
node -c astro.config.mjs
```

Expected: No output (syntax is valid)

**Step 4: Commit configuration changes**

Run:
```bash
git add astro.config.mjs
git commit -m "feat: integrate remark-shiki-highlight-api

Replace Astro's built-in Shiki with remark-shiki-highlight-api v0.2.1.
Maintains dark-plus theme for consistent visual appearance.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

Expected: Clean commit with 1 file changed

---

## Task 3: Test Development Server

**Files:**
- None (verification task)

**Step 1: Start development server**

Run:
```bash
npm run dev
```

Expected output:
```
  🚀  astro  v5.10.2 started in [X]ms

  ┃ Local    http://localhost:4321/
  ┃ Network  use --host to expose
```

**Step 2: Verify server is running**

Expected: Server starts without errors, no warnings about Shiki or syntax highlighting

**Step 3: Test blog post with code blocks**

Open browser to: `http://localhost:4321/blog/2017-05-03-spectrum-development-environment/`

**Verification checklist:**
- [ ] Page loads without errors
- [ ] Code blocks display with syntax highlighting
- [ ] Bash code blocks have correct syntax colors
- [ ] Assembly code blocks have correct syntax colors
- [ ] Colors match dark-plus theme (dark background)
- [ ] No console errors in browser DevTools

**Step 4: Check browser console**

Open DevTools → Console tab

Expected: No errors, no warnings related to Shiki or highlighting

**Step 5: Stop development server**

Press: `Ctrl+C`

Expected: Server stops cleanly

---

## Task 4: Test Production Build

**Files:**
- None (verification task)

**Step 1: Build for production**

Run:
```bash
npm run build
```

Expected output:
```
[build output with no errors]
✓ Built in [X]ms
```

**Verification:**
- Build completes successfully
- No errors about Shiki or remark plugins
- No warnings about missing dependencies
- `dist/` directory created

**Step 2: Preview production build**

Run:
```bash
npm run preview
```

Expected output:
```
  astro  v5.10.2 started preview server

  ┃ Local    http://localhost:4321/
```

**Step 3: Test production build in browser**

Open browser to: `http://localhost:4321/blog/2017-05-03-spectrum-development-environment/`

**Verification checklist:**
- [ ] Page loads without errors
- [ ] Code blocks display with syntax highlighting
- [ ] Syntax highlighting identical to dev server
- [ ] No console errors in browser DevTools
- [ ] Page load time is acceptable

**Step 4: Stop preview server**

Press: `Ctrl+C`

Expected: Server stops cleanly

---

## Task 5: Final Verification

**Files:**
- None (verification task)

**Step 1: Check git status**

Run:
```bash
git status
```

Expected output:
```
On branch main
nothing to commit, working tree clean
```

**Step 2: View commit history**

Run:
```bash
git log --oneline -3
```

Expected: See both commits from Task 1 and Task 2

**Step 3: Verify package is in dependencies**

Run:
```bash
jq '.dependencies["remark-shiki-highlight-api"]' package.json
```

Expected output:
```
"0.2.1"
```

---

## Rollback Plan

If any issues occur during testing:

**Step 1: Revert configuration commit**

Run:
```bash
git log --oneline | grep "remark-shiki-highlight-api"
git revert <commit-hash>
```

**Step 2: Uninstall package**

Run:
```bash
npm uninstall remark-shiki-highlight-api
```

**Step 3: Commit rollback**

Run:
```bash
git add package.json package-lock.json
git commit -m "revert: remove remark-shiki-highlight-api integration

Rolled back due to [specific issue]

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Troubleshooting

### Issue: Theme not recognized

**Symptom:** Code blocks render without highlighting or with wrong theme

**Solution:**
1. Check Shiki v3 theme names: `npx shiki themes`
2. Try alternative theme names: `'Dark Plus'` or `'dark-plus'`
3. Update `astro.config.mjs` with correct theme name

### Issue: Build fails with module error

**Symptom:** Error about missing module or import failure

**Solution:**
1. Clear node_modules: `rm -rf node_modules`
2. Clear package lock: `rm package-lock.json`
3. Reinstall: `npm install`
4. Try build again: `npm run build`

### Issue: Code blocks not highlighted

**Symptom:** Code blocks render as plain text

**Solution:**
1. Verify plugin is loaded: Check browser DevTools for any plugin errors
2. Check markdown code block syntax: Must have language identifier (```js, ```bash, etc.)
3. Test with simple example: Create test page with basic code block

---

## Success Criteria

- ✅ Package installed at version 0.2.1
- ✅ Astro config updated correctly
- ✅ Dev server runs without errors
- ✅ Code blocks display with dark-plus theme
- ✅ Production build completes successfully
- ✅ Preview build matches dev appearance
- ✅ All commits are clean
- ✅ No regressions in site functionality
