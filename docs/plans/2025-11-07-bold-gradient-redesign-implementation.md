# Bold Gradient Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the site into a distinctive dark-only theme with bold vibrant gradients throughout, creating a memorable visual identity that stands out from typical tech portfolios.

**Architecture:** Remove all light mode support and commit to dark-only theme. Implement gradient system using CSS custom properties. Add text masking for hero name with generative pattern background. Apply gradient borders, backgrounds, and interactive states systematically across all components.

**Tech Stack:** Astro 4+, vanilla CSS with custom properties, CSS animations, CSS text masking

---

## Task 1: Remove Light Mode Support

**Goal:** Eliminate light theme completely - remove theme toggle, localStorage code, and light theme CSS variables.

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/SiteHeader.astro`

**Step 1: Remove theme toggle from header**

In `src/components/SiteHeader.astro`, delete lines 24-39 (the entire theme toggle button including both sun and moon SVG icons).

Also remove the theme toggle from `.social-links` section - it should only contain email and GitHub links.

**Step 2: Remove theme toggle script**

In `src/components/SiteHeader.astro`, delete lines 74-87 (the entire theme toggle functionality script).

Keep the mobile menu script (lines 56-72).

**Step 3: Remove theme toggle styles**

In `src/components/SiteHeader.astro` styles section, delete lines 190-235 (all `.theme-toggle`, `.sun-icon`, `.moon-icon` styles and data-theme selectors).

**Step 4: Remove theme persistence from BaseLayout**

In `src/layouts/BaseLayout.astro`, delete lines 54-58 (the script that checks localStorage and sets theme).

**Step 5: Hardcode dark theme**

In `src/layouts/BaseLayout.astro`, find the `<html lang="en">` tag (line 23).

Change it to:
```html
<html lang="en" data-theme="dark">
```

**Step 6: Remove light theme CSS variables**

In `src/layouts/BaseLayout.astro` global styles (starting line 118), delete the entire `:root` block (lines 119-201) which contains all the light theme color variables.

Keep ONLY the dark theme block `[data-theme="dark"]` (lines 204-232) and all the other variables (typography, spacing, etc.).

**Step 7: Build and verify**

Run: `npm run build`

Expected: Build succeeds with no errors. Check that no theme toggle appears in header.

**Step 8: Commit**

```bash
git add src/layouts/BaseLayout.astro src/components/SiteHeader.astro
git commit -m "Remove light mode support - commit to dark theme only"
```

---

## Task 2: Update Color System for Dark-Only Theme

**Goal:** Replace existing dark theme colors with optimized dark-only palette from design doc.

**Files:**
- Modify: `src/layouts/BaseLayout.astro` (global styles section)

**Step 1: Update background colors**

In `src/layouts/BaseLayout.astro`, find the `[data-theme="dark"]` block (should now start around line 119 after previous changes).

Replace the background color variables (lines 205-210) with:

```css
--color-bg: #0a0a0a;
--color-bg-secondary: #0f0f0f;
--color-bg-tertiary: #1a1a1a;
--color-surface: #1a1a1a;
--color-surface-hover: #262626;
--color-border: #404040;
--color-border-hover: #525252;
```

**Step 2: Update text colors**

Replace text color variables with:

```css
--color-text-primary: #f3f4f6;
--color-text-secondary: #d1d5db;
--color-text-tertiary: #9ca3af;
--color-text-muted: #6b7280;
```

**Step 3: Update primary colors**

Replace primary color variables with:

```css
--color-primary: #60a5fa;
--color-primary-hover: #93bbfc;
--color-primary-light: #1e3a5f;
--color-primary-dark: #93bbfc;
```

**Step 4: Update accent colors**

Replace accent color variables with:

```css
--color-accent: #a78bfa;
--color-accent-hover: #c4b5fd;
--color-accent-light: #2e1065;
```

**Step 5: Update shadow values**

Replace shadow variables with:

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
```

**Step 6: Build and verify colors**

Run: `npm run build && npm run preview`

Expected: Build succeeds. Site shows darker, higher-contrast colors. Open preview and visually verify backgrounds are very dark (#0a0a0a).

**Step 7: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "Update color system for dark-only theme optimization"
```

---

## Task 3: Add Gradient System

**Goal:** Add CSS custom properties for four gradient palettes (Sunrise, Ocean, Sunset, Forest).

**Files:**
- Modify: `src/layouts/BaseLayout.astro` (global styles section)

**Step 1: Add gradient variables after color variables**

In `src/layouts/BaseLayout.astro`, after the `[data-theme="dark"]` color variables (should be around line 150 after previous changes), add:

```css
/* Gradient System */
--gradient-sunrise: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
--gradient-sunrise-extended: linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f59e0b 100%);
--gradient-ocean: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
--gradient-sunset: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
--gradient-forest: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);

/* Gradient palette colors for generative patterns */
--color-sunrise-start: #8b5cf6;
--color-sunrise-mid: #ec4899;
--color-sunrise-end: #f59e0b;
--color-ocean-start: #3b82f6;
--color-ocean-end: #06b6d4;
--color-sunset-start: #f59e0b;
--color-sunset-end: #ef4444;
--color-forest-start: #10b981;
--color-forest-end: #14b8a6;
```

**Step 2: Build and verify**

Run: `npm run build`

Expected: Build succeeds with no errors. Gradients are now available as CSS variables.

**Step 3: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "Add gradient system CSS custom properties"
```

---

## Task 4: Implement Hero Gradient Background

**Goal:** Add large animated gradient background to hero section.

**Files:**
- Modify: `src/pages/index.astro` (hero styles section)

**Step 1: Add gradient background to hero**

In `src/pages/index.astro`, find the `.hero` style block (starts line 127).

Add after the existing styles (before the closing brace):

```css
background: var(--gradient-sunrise-extended);
background-size: 200% 200%;
animation: gradientShift 20s ease infinite;
position: relative;
```

**Step 2: Add gradient animation keyframes**

At the end of the style block in `src/pages/index.astro` (after line 471, before `</style>`), add:

```css
@keyframes gradientShift {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
```

**Step 3: Build and preview**

Run: `npm run build && npm run preview`

Expected: Build succeeds. Hero section has animated purple-pink-orange gradient background.

**Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "Add animated gradient background to hero section"
```

---

## Task 5: Implement Text Mask for Hero Name

**Goal:** Add text masking to "Steve Hill" with generative pattern background.

**Files:**
- Modify: `src/pages/index.astro` (hero styles section)

**Step 1: Create generative pattern background**

In `src/pages/index.astro`, after the `@keyframes gradientShift` block, add:

```css
@keyframes patternShift1 {
	0%, 100% {
		transform: translate(0%, 0%) scale(1);
	}
	50% {
		transform: translate(30%, 20%) scale(1.2);
	}
}

@keyframes patternShift2 {
	0%, 100% {
		transform: translate(0%, 0%) scale(1);
	}
	50% {
		transform: translate(-20%, 30%) scale(1.1);
	}
}

@keyframes patternShift3 {
	0%, 100% {
		transform: translate(0%, 0%) scale(1);
	}
	50% {
		transform: translate(25%, -25%) scale(1.15);
	}
}
```

**Step 2: Add pattern container**

Before the `.hero-title` style block, add:

```css
.hero-title-wrapper {
	position: relative;
	display: inline-block;
}

.hero-title-pattern {
	position: absolute;
	top: -50%;
	left: -50%;
	width: 200%;
	height: 200%;
	z-index: 0;
	overflow: hidden;
}

.pattern-layer {
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	opacity: 0.8;
	filter: blur(40px);
}

.pattern-layer-1 {
	background: radial-gradient(circle, var(--color-sunrise-start) 0%, transparent 70%);
	top: 20%;
	left: 10%;
	animation: patternShift1 45s ease-in-out infinite;
}

.pattern-layer-2 {
	background: radial-gradient(circle, var(--color-sunrise-mid) 0%, transparent 70%);
	top: 30%;
	left: 50%;
	animation: patternShift2 50s ease-in-out infinite;
}

.pattern-layer-3 {
	background: radial-gradient(circle, var(--color-ocean-start) 0%, transparent 70%);
	top: 10%;
	left: 70%;
	animation: patternShift3 55s ease-in-out infinite;
}

.pattern-layer-4 {
	background: radial-gradient(circle, var(--color-sunset-start) 0%, transparent 70%);
	top: 60%;
	left: 30%;
	animation: patternShift1 60s ease-in-out infinite reverse;
}
```

**Step 3: Apply text mask to hero title**

In the `.hero-title` style block (starts around line 136), replace with:

```css
.hero-title {
	font-family: 'Montserrat', system-ui, sans-serif;
	font-size: var(--font-size-5xl);
	font-weight: var(--font-weight-bold);
	margin: 0 0 var(--spacing-md) 0;
	letter-spacing: -0.02em;
	position: relative;
	z-index: 1;
	background: linear-gradient(135deg, var(--color-sunrise-start), var(--color-sunrise-mid), var(--color-ocean-start), var(--color-sunset-start));
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-size: 200% 200%;
	animation: gradientShift 30s ease infinite;
}

/* Fallback for older browsers */
@supports not (background-clip: text) {
	.hero-title {
		color: var(--color-text-primary);
	}
}
```

**Step 4: Update hero HTML structure**

In `src/pages/index.astro`, find the hero section (starts line 36). Replace the h1 (line 38) with:

```html
<div class="hero-title-wrapper">
	<div class="hero-title-pattern" aria-hidden="true">
		<div class="pattern-layer pattern-layer-1"></div>
		<div class="pattern-layer pattern-layer-2"></div>
		<div class="pattern-layer pattern-layer-3"></div>
		<div class="pattern-layer pattern-layer-4"></div>
	</div>
	<h1 class="hero-title">Steve Hill</h1>
</div>
```

**Step 5: Build and preview**

Run: `npm run build && npm run preview`

Expected: Build succeeds. "Steve Hill" text shows vibrant animated gradient with generative pattern visible through the text.

**Step 6: Commit**

```bash
git add src/pages/index.astro
git commit -m "Add text mask with generative pattern to hero name"
```

---

## Task 6: Add Gradient Text to Hero Subtitle

**Goal:** Apply Ocean gradient to "Software Engineer. Storyteller. Explorer."

**Files:**
- Modify: `src/pages/index.astro` (hero styles section)

**Step 1: Apply gradient to subtitle**

In the `.hero-subtitle` style block (starts around line 145), replace with:

```css
.hero-subtitle {
	font-family: 'Inter', system-ui, sans-serif;
	font-size: var(--font-size-xl);
	font-weight: var(--font-weight-semibold);
	margin: 0 0 var(--spacing-2xl) 0;
	background: var(--gradient-ocean);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

/* Fallback for older browsers */
@supports not (background-clip: text) {
	.hero-subtitle {
		color: var(--color-text-secondary);
	}
}
```

**Step 2: Build and preview**

Run: `npm run build && npm run preview`

Expected: Build succeeds. Subtitle shows blue-to-cyan gradient.

**Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "Add Ocean gradient to hero subtitle"
```

---

## Task 7: Add Gradient Borders to Navigation

**Goal:** Add animated gradient border to bottom of sticky header.

**Files:**
- Modify: `src/components/SiteHeader.astro`

**Step 1: Add gradient border using pseudo-element**

In `src/components/SiteHeader.astro`, find the `header` style block (starts line 91). Replace with:

```css
header {
	border-bottom: none;
	background: var(--color-bg);
	position: sticky;
	top: 0;
	z-index: 100;
	position: relative;
}

header::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 3px;
	background: linear-gradient(
		90deg,
		var(--color-sunrise-start),
		var(--color-sunrise-mid),
		var(--color-ocean-start),
		var(--color-ocean-end),
		var(--color-sunset-start),
		var(--color-forest-start),
		var(--color-forest-end),
		var(--color-sunrise-start)
	);
	background-size: 200% 100%;
	animation: gradientFlow 15s linear infinite;
}

@keyframes gradientFlow {
	0% {
		background-position: 0% 50%;
	}
	100% {
		background-position: 200% 50%;
	}
}
```

**Step 2: Build and preview**

Run: `npm run build && npm run preview`

Expected: Build succeeds. Header has animated gradient border flowing through all palette colors.

**Step 3: Commit**

```bash
git add src/components/SiteHeader.astro
git commit -m "Add animated gradient border to navigation header"
```

---

## Task 8: Add Gradient Hover Effects to Nav Links

**Goal:** Each nav link gets unique gradient underline on hover.

**Files:**
- Modify: `src/components/SiteHeader.astro`

**Step 1: Update nav link hover styles**

In `src/components/SiteHeader.astro`, find `.nav-links a` hover style (around line 159). Replace the hover and active blocks with:

```css
.nav-links a {
	color: var(--color-text-secondary);
	text-decoration: none;
	font-weight: var(--font-weight-medium);
	padding: 0.5rem 0.75rem;
	border-radius: var(--radius-md);
	transition: all 0.2s;
	font-size: 0.95rem;
	position: relative;
}

.nav-links a::after {
	content: '';
	position: absolute;
	bottom: 0.25rem;
	left: 0.75rem;
	right: 0.75rem;
	height: 2px;
	background: var(--gradient-ocean);
	transform: scaleX(0);
	transition: transform 0.2s ease;
}

.nav-links a:nth-child(1)::after {
	background: var(--gradient-sunrise);
}

.nav-links a:nth-child(2)::after {
	background: var(--gradient-ocean);
}

.nav-links a:nth-child(3)::after {
	background: var(--gradient-sunset);
}

.nav-links a:nth-child(4)::after {
	background: var(--gradient-forest);
}

.nav-links a:nth-child(5)::after {
	background: var(--gradient-sunrise);
}

.nav-links a:nth-child(6)::after {
	background: var(--gradient-ocean);
}

.nav-links a:hover {
	color: var(--color-text-primary);
	background: transparent;
}

.nav-links a:hover::after {
	transform: scaleX(1);
}

.nav-links .active {
	color: var(--color-text-primary);
	background: transparent;
}

.nav-links .active::after {
	transform: scaleX(1);
}
```

**Step 2: Build and preview**

Run: `npm run build && npm run preview`

Expected: Build succeeds. Each nav link shows unique colored gradient underline on hover. Active page has persistent underline.

**Step 3: Commit**

```bash
git add src/components/SiteHeader.astro
git commit -m "Add gradient underline hover effects to nav links"
```

---

## Task 9: Fix Recent Posts Full Width

**Goal:** Make post cards stretch full width of container instead of stacking in flex column.

**Files:**
- Modify: `src/pages/index.astro` (recent posts styles section)

**Step 1: Update recent posts container**

In `src/pages/index.astro`, find the `.recent-posts` style block (starts around line 247). Replace with:

```css
.recent-posts {
	display: block;
}
```

**Step 2: Make post cards full width**

Update the `.post-card` style block (starts around line 254) to add:

```css
.post-card {
	padding: var(--spacing-lg);
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-lg);
	transition: all var(--transition-base);
	width: 100%;
	margin-bottom: var(--spacing-lg);
}

.post-card:last-child {
	margin-bottom: 0;
}
```

**Step 3: Build and preview**

Run: `npm run build && npm run preview`

Expected: Build succeeds. Post cards now span full width of their container.

**Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "Fix recent posts to display full width"
```

---

## Task 10: Add Gradient Borders to Post Cards

**Goal:** Each post card gets bold gradient left border that rotates through palette colors.

**Files:**
- Modify: `src/pages/index.astro` (recent posts styles section)

**Step 1: Add gradient left borders**

In the `.post-card` style block, add:

```css
border-left: 6px solid transparent;
border-image: var(--gradient-sunrise) 1;
border-image-slice: 1;
```

**Step 2: Add nth-child selectors for rotating gradients**

After the `.post-card` block, add:

```css
.post-card:nth-child(1) {
	border-image: var(--gradient-sunrise) 1;
}

.post-card:nth-child(2) {
	border-image: var(--gradient-ocean) 1;
}

.post-card:nth-child(3) {
	border-image: var(--gradient-sunset) 1;
}
```

**Step 3: Add hover effect with full border**

Update the `.post-card:hover` block (around line 262):

```css
.post-card:hover {
	transform: translateY(-2px);
	box-shadow: var(--shadow-md);
	border-color: var(--color-border-hover);
	border-image: none;
	border-left-width: 6px;
	position: relative;
}

.post-card:nth-child(1):hover {
	border-left-color: var(--color-sunrise-mid);
	box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3), var(--shadow-md);
}

.post-card:nth-child(2):hover {
	border-left-color: var(--color-ocean-end);
	box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3), var(--shadow-md);
}

.post-card:nth-child(3):hover {
	border-left-color: var(--color-sunset-end);
	box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3), var(--shadow-md);
}
```

**Step 4: Build and preview**

Run: `npm run build && npm run preview`

Expected: Build succeeds. Each post card has different colored gradient left border. Hover adds colored glow.

**Step 5: Commit**

```bash
git add src/pages/index.astro
git commit -m "Add gradient borders and glow effects to post cards"
```

---

## Task 11: Filter Projects to Featured Only

**Goal:** Show only projects with `featured: true` on homepage.

**Files:**
- Modify: `src/pages/index.astro` (projects section)

**Step 1: Add filter to projects query**

In `src/pages/index.astro`, find line 100 where projects are mapped. Replace the line:

```javascript
{allProjects.map((project) => (
```

with:

```javascript
{allProjects.filter(project => project.data.featured).map((project) => (
```

**Step 2: Build and verify**

Run: `npm run build && npm run preview`

Expected: Build succeeds. Only featured projects appear on homepage. Check that non-featured projects are hidden.

**Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "Filter homepage to show only featured projects"
```

---

## Task 12: Increase Project Gradient Saturation

**Goal:** Make project header gradients more vibrant by increasing saturation 25%.

**Files:**
- Modify: `src/pages/index.astro` (project gradients section)

**Step 1: Update featured project gradients**

In `src/pages/index.astro`, find the project gradient definitions (starts around line 430). Replace with more saturated versions:

```css
/* Project gradients - increased saturation for dark theme */
.project-gradient[data-project="Rachel - Strategic Card Game"] {
	background: linear-gradient(135deg, #f456ff 0%, #ff3366 100%);
}

.project-gradient[data-project="shiki-highlight-api"] {
	background: linear-gradient(135deg, #2563eb 0%, #00d4ff 100%);
}

.project-gradient[data-project="remark-shiki-highlight-api"] {
	background: linear-gradient(135deg, #9333ea 0%, #3b82f6 100%);
}

.project-gradient[data-project="PuTTY Themer"] {
	background: linear-gradient(135deg, #7c5ae8 0%, #9d59c5 100%);
}

/* Non-featured projects - lighter gradient for contrast */
.project-gradient:not([data-project="Rachel - Strategic Card Game"]):not([data-project="shiki-highlight-api"]):not([data-project="remark-shiki-highlight-api"]):not([data-project="PuTTY Themer"]) {
	background: linear-gradient(135deg, #64748b 0%, #475569 100%);
}
```

**Step 2: Remove dark mode specific gradients**

Delete the dark mode gradient overrides (lines 452-470 with `[data-theme="dark"]` selectors) since we're dark-only now.

**Step 3: Build and preview**

Run: `npm run build && npm run preview`

Expected: Build succeeds. Project headers show more vibrant, saturated gradients.

**Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "Increase saturation of project header gradients"
```

---

## Task 13: Add Gradient Glow to Project Cards

**Goal:** Add glowing shadow effect on project card hover using gradient colors.

**Files:**
- Modify: `src/pages/index.astro` (project card styles section)

**Step 1: Add gradient glow on hover**

Find `.project-card-home:hover` style (around line 317). Update to:

```css
.project-card-home:hover {
	transform: translateY(-4px);
	box-shadow: var(--shadow-lg);
	filter: drop-shadow(0 8px 16px rgba(236, 72, 153, 0.3));
}

.project-card-home[data-project="Rachel - Strategic Card Game"]:hover {
	filter: drop-shadow(0 8px 16px rgba(244, 86, 255, 0.4));
}

.project-card-home[data-project="shiki-highlight-api"]:hover {
	filter: drop-shadow(0 8px 16px rgba(0, 212, 255, 0.4));
}

.project-card-home[data-project="remark-shiki-highlight-api"]:hover {
	filter: drop-shadow(0 8px 16px rgba(147, 51, 234, 0.4));
}

.project-card-home[data-project="PuTTY Themer"]:hover {
	filter: drop-shadow(0 8px 16px rgba(124, 90, 232, 0.4));
}
```

**Step 2: Update featured card hover**

Find `.project-card-home.featured:hover` (around line 355) and update:

```css
.project-card-home.featured:hover {
	box-shadow: var(--shadow-xl);
	transform: translateY(-6px);
}
```

**Step 3: Build and preview**

Run: `npm run build && npm run preview`

Expected: Build succeeds. Project cards glow with their gradient color on hover.

**Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "Add gradient glow effects to project card hovers"
```

---

## Task 14: Add Section Heading Gradients

**Goal:** Apply gradient text to "Recent Posts" and "Projects" headings.

**Files:**
- Modify: `src/pages/index.astro` (section header styles)

**Step 1: Update section heading styles**

Find `.section-header h2` style (around line 230). Replace with:

```css
.section-header h2 {
	font-size: var(--font-size-2xl);
	margin: 0;
	background: var(--gradient-ocean);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	font-weight: var(--font-weight-bold);
}

/* Fallback for older browsers */
@supports not (background-clip: text) {
	.section-header h2 {
		color: var(--color-text-primary);
	}
}
```

**Step 2: Different gradient for Projects heading**

After the above block, add:

```css
.home-section:nth-of-type(2) .section-header h2 {
	background: var(--gradient-sunset);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
```

**Step 3: Build and preview**

Run: `npm run build && npm run preview`

Expected: Build succeeds. "Recent Posts" heading shows Ocean gradient (blue-cyan), "Projects" heading shows Sunset gradient (orange-red).

**Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "Add gradient text to section headings"
```

---

## Task 15: Update Footer with Gradient Border

**Goal:** Add animated gradient border to top of footer matching header.

**Files:**
- Modify: `src/components/SiteFooter.astro`

**Step 1: Add gradient border using pseudo-element**

In `src/components/SiteFooter.astro`, find the `footer` style block (starts line 41). Replace with:

```css
footer {
	background: var(--color-bg);
	border-top: none;
	margin-top: var(--spacing-2xl);
	animation: fadeIn var(--transition-slow) ease-out;
	position: relative;
}

footer::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 3px;
	background: linear-gradient(
		90deg,
		var(--color-sunrise-start),
		var(--color-sunrise-mid),
		var(--color-ocean-start),
		var(--color-ocean-end),
		var(--color-sunset-start),
		var(--color-forest-start),
		var(--color-forest-end),
		var(--color-sunrise-start)
	);
	background-size: 200% 100%;
	animation: gradientFlow 15s linear infinite;
}

@keyframes gradientFlow {
	0% {
		background-position: 0% 50%;
	}
	100% {
		background-position: 200% 50%;
	}
}
```

**Step 2: Build and preview**

Run: `npm run build && npm run preview`

Expected: Build succeeds. Footer has animated gradient border on top matching header.

**Step 3: Commit**

```bash
git add src/components/SiteFooter.astro
git commit -m "Add animated gradient border to footer"
```

---

## Task 16: Add Gradient Hover to Footer Links

**Goal:** Footer links get gradient underline and text color on hover.

**Files:**
- Modify: `src/components/SiteFooter.astro`

**Step 1: Update footer link styles**

Find `.footer-nav a` block (starts around line 78). Replace with:

```css
.footer-nav a {
	color: var(--color-text-secondary);
	text-decoration: none;
	font-size: var(--font-size-base);
	padding: 0.25rem 0;
	transition: all var(--transition-fast);
	position: relative;
	display: inline-block;
}

.footer-nav a::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 2px;
	background: var(--gradient-ocean);
	transform: scaleX(0);
	transform-origin: left;
	transition: transform 0.2s ease;
}

.footer-nav a:nth-child(1)::after {
	background: var(--gradient-ocean);
}

.footer-nav a:nth-child(2)::after {
	background: var(--gradient-sunset);
}

.footer-nav a:nth-child(3)::after {
	background: var(--gradient-forest);
}

.footer-nav a:nth-child(4)::after {
	background: var(--gradient-sunrise);
}

.footer-nav a:nth-child(5)::after {
	background: var(--gradient-ocean);
}

.footer-nav a:nth-child(6)::after {
	background: var(--gradient-sunset);
}

.footer-nav a:nth-child(7)::after {
	background: var(--gradient-forest);
}

.footer-nav a:hover {
	color: var(--color-text-primary);
}

.footer-nav a:hover::after {
	transform: scaleX(1);
}
```

**Step 2: Build and preview**

Run: `npm run build && npm run preview`

Expected: Build succeeds. Footer links show gradient underlines on hover, each with different color.

**Step 3: Commit**

```bash
git add src/components/SiteFooter.astro
git commit -m "Add gradient hover effects to footer links"
```

---

## Task 17: Add Reduced Motion Support

**Goal:** Respect user's motion preferences by disabling animations when requested.

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/components/SiteHeader.astro`
- Modify: `src/components/SiteFooter.astro`

**Step 1: Add motion preference media query to BaseLayout**

In `src/layouts/BaseLayout.astro`, at the end of the global styles (before the closing `</style>` tag around line 631), add:

```css
/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
}
```

**Step 2: Build and verify**

Run: `npm run build`

Expected: Build succeeds. Animations will be disabled when user has motion reduction preference.

**Step 3: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "Add reduced motion support for accessibility"
```

---

## Task 18: Final Build and Visual Verification

**Goal:** Build the complete site and verify all gradient features work correctly.

**Step 1: Clean build**

Run: `npm run build`

Expected: Build completes successfully with no errors or warnings.

**Step 2: Start preview server**

Run: `npm run preview`

Expected: Preview server starts. Open http://localhost:4321

**Step 3: Visual verification checklist**

Verify the following on homepage:

- [ ] Hero has animated purple-pink-orange gradient background
- [ ] "Steve Hill" text shows animated gradient with generative pattern
- [ ] Subtitle shows blue-cyan gradient
- [ ] Header has animated rainbow gradient border on bottom
- [ ] Nav links show unique gradient underlines on hover
- [ ] Recent Posts heading shows Ocean gradient
- [ ] Post cards are full width with gradient left borders (each different color)
- [ ] Post cards glow on hover
- [ ] Only featured projects shown
- [ ] Projects heading shows Sunset gradient
- [ ] Project headers have vibrant gradients
- [ ] Project cards glow with their color on hover
- [ ] Footer has animated gradient border on top
- [ ] Footer links have gradient underlines on hover

**Step 4: Check dark backgrounds**

Verify backgrounds are very dark (#0a0a0a or #0f0f0f). Gradients should pop with high contrast.

**Step 5: Check mobile responsiveness**

Resize browser to mobile width. Verify:
- Gradients still visible and performant
- Text remains readable
- Animations don't cause janky scrolling

**Step 6: Test reduced motion**

In browser dev tools, enable "Prefers reduced motion" setting. Verify animations stop or become minimal.

**Step 7: Final commit**

If any small adjustments needed, make them and commit:

```bash
git add .
git commit -m "Final visual adjustments and verification"
```

---

## Task 19: Update Design Document Status

**Goal:** Mark design document as implemented.

**Files:**
- Modify: `docs/plans/2025-11-07-bold-gradient-redesign.md`

**Step 1: Update status**

Change the status line at top of document from:

```markdown
**Status:** Approved for Implementation
```

to:

```markdown
**Status:** Implemented
```

**Step 2: Commit**

```bash
git add docs/plans/2025-11-07-bold-gradient-redesign.md
git commit -m "Mark bold gradient redesign as implemented"
```

---

## Completion

All tasks complete! The bold gradient redesign is fully implemented with:

✅ Dark-only theme (light mode removed)
✅ Four gradient palettes (Sunrise, Ocean, Sunset, Forest)
✅ Hero with animated gradient background
✅ Text mask on name with generative pattern
✅ Animated gradient borders on header and footer
✅ Gradient hover effects throughout
✅ Full-width post cards with gradient borders
✅ Featured-only projects with vibrant gradients
✅ Accessibility (reduced motion support)

Next step: Create pull request to merge `feature/bold-gradient-redesign` into `main`.
