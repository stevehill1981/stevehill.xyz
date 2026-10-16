---
name: Steve Hill — Open Table
description: Warm cream, dark ink and brick for a personal engineering website.
colors:
  brick: '#9c422c'
  brick-hover: '#78301f'
  brick-wash: '#f0dfce'
  cream: '#fbf4e8'
  surface: '#f4eadb'
  surface-hover: '#f0e5d5'
  ink: '#292720'
  text-secondary: '#554c40'
  text-muted: '#6a5948'
  rule: '#cfc5b5'
  code-bg: '#18202b'
  code-text: '#e2e8f0'
  image-bed: '#191a17'
typography:
  display:
    fontFamily: Source Sans 3, sans-serif
    fontSize: clamp(3rem, 5.6vw, 5rem)
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: -.035em
  headline:
    fontFamily: Source Sans 3, sans-serif
    fontSize: clamp(2.5rem, 5vw, 4.125rem)
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -.035em
  section:
    fontFamily: Source Sans 3, sans-serif
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -.02em
  body:
    fontFamily: Source Sans 3, sans-serif
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.65
  prose:
    fontFamily: Source Sans 3, sans-serif
    fontSize: 1.3125rem
    fontWeight: 400
    lineHeight: 1.65
  note:
    fontFamily: Bitter, Georgia, serif
    fontSize: 1.4rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Source Sans 3, sans-serif
    fontSize: .9375rem
    fontWeight: 400
  display-compact:
    fontFamily: Source Sans 3, sans-serif
    fontSize: 52px
    fontWeight: 600
    lineHeight: 1.06
  display-narrow:
    fontFamily: Source Sans 3, sans-serif
    fontSize: 44px
    fontWeight: 600
    lineHeight: 1.06
  wordmark:
    fontFamily: Source Sans 3, sans-serif
    fontSize: 27px
    fontWeight: 700
  home-section:
    fontFamily: Source Sans 3, sans-serif
    fontSize: 25px
    fontWeight: 600
    lineHeight: 1.2
  home-lead:
    fontFamily: Source Sans 3, sans-serif
    fontSize: 23px
    fontWeight: 400
    lineHeight: 1.45
  title:
    fontFamily: Source Sans 3, sans-serif
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.2
  subsection:
    fontFamily: Source Sans 3, sans-serif
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.2
  lead:
    fontFamily: Source Sans 3, sans-serif
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.65
  small-heading:
    fontFamily: Source Sans 3, sans-serif
    fontSize: 19px
    fontWeight: 600
    lineHeight: 1.2
  interface:
    fontFamily: Source Sans 3, sans-serif
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.4
  secondary:
    fontFamily: Source Sans 3, sans-serif
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: Source Sans 3, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
  code:
    fontFamily: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace
    fontSize: .875rem
    lineHeight: 1.65
rounded:
  sm: 3px
  md: 4px
  dialog: 12px
spacing:
  xs: .5rem
  sm: .75rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  2xl: 3rem
components:
  button-outline:
    backgroundColor: transparent
    textColor: '{colors.ink}'
    rounded: '{rounded.md}'
    padding: 10px 16px
  button-primary:
    backgroundColor: '{colors.brick}'
    textColor: '#fff'
    rounded: '{rounded.md}'
    padding: 10px 16px
  button-primary-hover:
    backgroundColor: '{colors.brick-hover}'
    textColor: '#fff'
  search-input:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    rounded: '{rounded.md}'
    padding: 1rem 1rem 1rem 3rem
  nav-link:
    textColor: '{colors.ink}'
  tag:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text-secondary}'
    rounded: '{rounded.sm}'
    padding: 2px 8px
  article-card:
    backgroundColor: transparent
    padding: 28px 0
  search-modal:
    backgroundColor: '{colors.cream}'
    rounded: '{rounded.dialog}'
    width: 90%
    padding: 32px 0 0
---

# Design System: Steve Hill

## Overview

**Creative North Star: "Open Table"**

Open Table is a warm, personal visual system built from cream, dark ink and brick. Source Sans 3 carries the interface and long-form reading; Bitter gives personal notes and quotations a distinct voice.

The material is mostly flat: open space, quiet rules and restrained surface tones organize content. Images retain the visual identity of the real projects they show. The homepage composition and audience strategy remain in PRODUCT.md and the surface brief; they are not universal layout requirements.

**Key Characteristics:**
- Warm cream canvas with dark, readable text.
- Brick for links, emphasis and interaction states.
- Open layouts divided by quiet rules.
- Real, uncropped project images and comfortable prose.

## Colors

Brick is the primary accent against a warm neutral canvas. The frontmatter records the reused values; source aliases in `src/styles/site.css` resolve to these roles.

### Primary

- **Brick:** links, the personal welcome’s note, selected navigation and primary actions.
- **Deep brick:** hover states.
- **Brick wash:** Pagefind’s tag tone.

### Neutral

- **Cream:** page, masthead, footer and dialog canvas.
- **Warm surface / deeper surface:** tags, search fields, result hover and inline code.
- **Ink:** primary reading and interface text.
- **Secondary text / muted text:** descriptions, captions, dates and supporting navigation.
- **Quiet rule:** borders and separators.
- **Code background / code text:** dark technical examples, independent of the light reading canvas. Syntax colors remain defined in the stylesheet rather than being promoted to brand accents.
- **Image bed:** the near-black ground behind contained project screenshots on Projects, About and project pages. The homepage omits it (see Project images). The share buttons' X and LinkedIn hover colours are third-party brand values, not palette tokens.

## Typography

**Display and body font:** Source Sans 3, with sans-serif fallback. **Note font:** Bitter, with Georgia and serif fallback. Both are locally hosted variable WOFF2 faces with swap loading and weights from 400 to 700. Code uses the system monospace stack.

The principal hierarchy is recorded above. Normal reading uses the body role; article and About prose use the larger prose role. Headings use semibold weight, tight leading and slight negative tracking.

The supporting roles are each tied to a place:
- **Display compact and narrow** carry the homepage welcome at 800px and 360px and below.
- **Wordmark** is the masthead name.
- **Home section and home lead** are the homepage's section headings and introduction. The homepage project titles use the home lead size at semibold.
- **Title** is for card and project titles in indexes.
- **Subsection** is for third-level headings, Start here essays and Writing's year headings.
- **Lead** is for page introductions, fourth-level headings and the homepage writing titles.
- **Small heading** heads sidebars, contents and article navigation.
- **Interface** is for navigation links, article metadata, contents links and project summaries.
- **Secondary** is for sidebars, project statuses, actions and related-post excerpts.
- **Label** is for dates, captions under titles and supporting links.
- **Caption** is for figure captions.

**The Reuse-a-Role Rule.** The scale already has more steps than it needs. New interface takes the role of the nearest existing element instead of adding a size.

**The Sentence Case Rule.** Interface labels, navigation, section headings and buttons use sentence case ("Related posts", "Copy link"). Headings inside published posts and project write-ups keep the case they were written in.

The large mixed-family welcome is a homepage expression: its second line uses Bitter at weight 500. It is not the default heading style for secondary pages. Quotations use the note role between horizontal rules.

**The Reading Measure Rule.** Keep long-form prose within the established 70ch measure; use the wider shell for navigation, images and supporting material.

## Layout

The shared shell has a maximum outer width of 1408px, with 64px horizontal padding and 64px bottom padding. At 800px and below, horizontal padding becomes 24px and bottom padding becomes 40px. The header and footer align to the same inner edges.

The project catalogue and topic pages use two-column open grids on wider screens, with 64px column gaps. About and project detail pages place supporting material beside a main column, while articles pair the prose with a 220px sidebar and an 80px gap. At 1000px, sidebar gaps reduce to 40px; About and project detail sidebars narrow from 240px to 210px, while the article sidebar stays 220px. At 800px, these layouts stack. The About sidebar retains two columns until 480px.

The homepage has its own responsive arrangement: its introduction stacks at 1000px; selected projects become image-and-text rows from 601px to 1000px, and stack image above text at 600px and below. Recent writing shares the project grid's three columns, with dates beneath each title, and stacks at 800px. A closing note in the Bitter note role follows it and points to About and email; Steve approved it on 16 October 2026. This keeps tablet screenshots from pushing the writing far down the page. This composition belongs to its surface brief. The shared spacing scale supports controls and supporting groups; editorial sections also use observed 20px, 24px, 28px, 36px and 40px offsets rather than a rigid single grid.

The Projects index leads with Rachel, Code Like It's 198x and Chaotic Tanx as image-and-text rows, with each status beside its title and direct destinations. At 600px and below, each image sits above its description. Remaining projects retain the open two-column catalogue. About repeats the same selected projects and statuses rather than claiming they are the most recent.

Writing opens with three selected essays and their existing excerpts. On desktop, the Start here heading sits beside the list; on mobile it precedes it. The complete index follows in the same arrangement, grouped by year: each year heading sits beside a single-column list of title, date, reading time, series part and excerpt, with no tags. Excerpts cap at 60ch, which keeps rendered lines at 80 characters or fewer. A direct Latest writing anchor sits above the selection. Writing, Series and Topics use the same names across the navigation and return links. Series part numbers sit above their article at 480px and below to leave more room for titles and excerpts.

## Elevation & Depth

Ordinary content remains flat. Thin rules, warm surface fills and white space convey grouping. The mobile navigation uses the medium shadow from the stylesheet; the search dialog uses a stronger shadow and a translucent ink backdrop. The source defines additional shadow tokens, but they are not a requirement for content cards.

**The Quiet Separation Rule.** Use rules and space for ordinary content separation; reserve pronounced depth for overlays.

Search fades over 200ms and icon controls use the shared 200ms ease-out color transition. Search transitions are disabled for reduced motion. Smooth scrolling is enabled only when reduced motion is not requested, and root view-transition animations are disabled when it is requested. The dynamically created update notification uses explicitly global component styles so it receives the same fixed overlay treatment in the built site; its entrance animation is disabled for reduced motion.

## Shapes

Controls use small, practical corners: the small radius for tags and inline code, medium for outlined actions and code containers, and the larger dialog radius for search. Content rows and project images remain unboxed. Borders are generally one pixel. Avoid interpreting the dialog’s corners as a universal card treatment.

## Components

### Buttons

Outlined actions use a transparent background, quiet border, medium corners and inline icon/text alignment. Primary actions use brick with white text and deepen on hover. Shared keyboard focus is a brick outline (2px, offset 4px); search trigger and close controls use their own stronger outline (3px, offset 2px). Copy controls use a compact outline and replace their label after success. A project page's destination, such as "View on the App Store", is its one primary action.

### Tags

Small warm surface labels carry secondary text and small corners. Linked tags inherit the site’s brick hover treatment. The topic cloud uses larger outlined links with counts instead of the compact filled treatment.

### Cards / Containers

Article, project, series and sidebar groups are open content blocks divided by rules. Article cards on topic pages have vertical padding and no filled panel or shadow. The Writing index uses its year-grouped list instead of cards. Titles remain ink at rest and become brick and underlined on hover. There is no shared elevated-card shell.

### Inputs / Fields

The implemented field is Pagefind search: a warm surface, ink text, muted placeholder, medium corners and left space for the search icon. It inherits the site typography and visible focus. No general error or disabled field system has been established.

### Navigation

The masthead pairs a bold personal wordmark with sentence-case links. Current and hovered links turn brick and underline. At 800px and below, a menu button opens a cream, bordered list beneath the masthead; Escape and outside clicks close it. The footer wraps small supporting links below a quiet rule. Small text links (footer, "All writing →", sidebar links) carry 4px of block padding so each target is at least 24px tall.

### Search dialog

A cream dialog sits over a translucent ink overlay, with a quiet border, large dialog corners, a maximum width of 600px and maximum height of 80vh. Results scroll within a 50vh area. Opening search moves focus inside and makes the main page inert; Escape closes it and focus returns to the opener. A search with no matches suggests a shorter word, and a muted line beneath the results always offers topics, series and the archive.

### Status labels

Status is the site's honest-availability signal, so it always sits beside its project's title, or directly beneath it when the title wraps. It uses the label or secondary role in muted text. There are five statuses: Released (apps and games), Live (websites), Published (libraries and scripts), In progress and Paused. The content schema rejects anything else. Project pages repeat the status in the sidebar's Project info.

### Project images

The shared project figure uses a dark image bed with a 3:2 ratio and contain sizing, followed by a muted caption. Pixel art uses pixelated rendering. The homepage drops the dark bed: its image boxes use the 1.44:1 ratio that the Rachel and Chaotic Tanx captures share, so those fill the box, and the near-square NES frame sits at its own shape against the cream, aligned left and bottom. Approved by Steve on 16 October 2026 after the critique found the letterboxed 202px images read as dark slabs. Captions explain the actual artifact; image treatment does not merge the projects’ independent identities.

### Contents and code

Article contents use a quiet top rule, muted links and indented third-level headings; the active link turns brick and underlines. At 800px and below, native disclosure moves contents above the prose. Code blocks use the dark technical palette, horizontal overflow, a compact toolbar and outlined copy control; inline code uses a warm surface instead.

## Do's and Don'ts

### Do:

- Do use Source Sans 3 for the main interface and Bitter for the established note and quotation roles.
- Do keep prose near the implemented 70ch measure and let layouts stack when space narrows.
- Do retain visible keyboard focus and reduced-motion behavior.
- Do preserve project screenshots with contain sizing and pixelated rendering where the source is pixel art.
- Do keep each project's status beside its title, using one of the five statuses.
- Do write interface labels in sentence case.

### Don't:

- Don't add decorative glows or card stripes to the Open Table world.
- Don't turn open article and project rows into elevated cards.
- Don't apply the homepage’s three-project composition to every surface.
- Don't add a new font size when an existing role fits.
