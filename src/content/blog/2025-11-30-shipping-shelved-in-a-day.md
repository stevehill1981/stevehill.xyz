---
title: "Shipping a Rails 8 Book Tracker in a Day (With Claude Code Doing the Heavy Lifting)"
pubDate: 2025-11-30
excerpt: "AI-assisted development is fast. Surprisingly fast. But 'fast' hides decisions that AI can't make for you - scope, taste, and the stuff that only matters when you're the one who has to use it."
tags:
  - development
  - rails
  - ai
  - software-engineering
  - project-showcase
---

I'm a software engineer who was tracking his book collection in a spreadsheet. The irony wasn't lost on me.

Goodreads exists, of course. LibraryThing too. But they solve a different problem: tracking what you've *read*. I wanted to track what I *own* and where it physically lives. "Which shelf is this book on?" isn't a feature social reading platforms care about. Neither is "Who did I lend this to three months ago?"

So I decided to build it. The question was: with AI-assisted development now genuinely useful, how fast could I actually ship something?

## What I Built

Shelved is a book collection tracker with the features I actually wanted:

- **Barcode scanning** - Point your phone at an ISBN, add the book
- **Open Library API integration** - Auto-populate title, author, cover from the scan
- **Physical locations** - Define your shelves, track where books actually are
- **Loan tracking** - Record who borrowed what and when
- **Multi-user households** - My partner and I share a collection but have separate reading lists
- **Reading progress** - Track sessions through longer books

The tech stack was deliberately boring: Rails 8.1.1, PostgreSQL, Hotwire/Turbo. No JavaScript framework. No microservices. Just Rails doing what Rails does well - shipping web applications quickly.

I deployed to Fly.io. The whole thing went from "I want this" to live in production in roughly a day.

## The Claude Code Experience

Here's what AI-assisted development actually looks like in practice.

The 90% that "just works" is genuinely impressive. Need a Book model with associations to Authors through a join table? Ask for it. Want a service object to handle Open Library API lookups with proper error handling? Done in seconds. Controllers, views, test scaffolds - all the boilerplate that used to eat hours just appears.

The speed is real. I wasn't writing CRUD operations or debugging typos in migration files. I described what I wanted, Claude Code generated it, I reviewed and adjusted. The feedback loop was tight: describe → generate → test → refine.

By the end of the day I had thirteen models (Account, Author, Book, BookAuthor, BookTag, Invitation, Loan, Location, Membership, ReadingSession, Session, Tag, User), working API integration, barcode scanning via the device camera, and a deployed application.

That's the good news.

## The "But..."

The less-discussed reality is that AI-assisted development changes *what* takes time, not *whether* things take time.

### Scope is entirely on you

Claude Code will happily build anything you ask for. Ask for user authentication with email confirmation, password reset, OAuth, and two-factor auth? You'll get it. Ask for a recommendation engine? Sure. Social features? Absolutely.

It has no sense of "this is enough for v1."

The discipline of scope - deciding what *not* to build - is entirely human work. Every feature I didn't add was a decision I had to make, often pushing back against perfectly reasonable suggestions. "Let's add Goodreads import" sounds useful. It would also have delayed shipping by days.

Shipping fast meant saying "no" constantly. The AI didn't help with that. If anything, it made it harder - when building is cheap, the temptation to build more is stronger.

### The corpus problem

AI suggestions are shaped by what's common in training data. For Rails, that means a lot of pattern suggestions that are popular but not necessarily right for a tight MVP.

"You should use Devise for authentication" is a reasonable suggestion if you're building a complex app with OAuth requirements. For a personal tool where I control who has accounts? Simple session-based auth with `has_secure_password` was plenty. But I had to know that. The AI's suggestion wasn't *wrong*, just not right for my context.

This is the "corpus problem" - the weight of common practice pushes in certain directions. Tutorials and blog posts that dominate the training data emphasise particular patterns. Those patterns become the default suggestions. But "most common" isn't the same as "best for your situation."

AIs don't have taste. They have statistics.

### Taste can't be delegated

Some decisions only make sense when you're the person who'll use the thing daily.

What should the default view show? How many clicks to add a book? Should locations be hierarchical or flat? What fields matter on the book detail page?

Claude Code can generate any UI you describe. It can't tell you which UI is right. That's taste - the accumulated sense of what works that comes from actually using software, not just building it.

I found myself adjusting things that "worked" but didn't feel right. Button placement. Label wording. The flow from scan to shelved. These micro-decisions don't have correct answers that an AI can derive from training data. They have *my* answers, shaped by how I think about my books.

### The stuff you find when you actually use it

Then there's integration reality - the problems that only surface when the code meets the real world.

Barcode scanning doesn't work in Safari by default. The camera API requires HTTPS, which I had. But Safari also requires a specific user gesture to trigger the camera permission prompt. The code Claude generated worked perfectly in Chrome. In Safari on my iPhone, nothing. I had to add a polyfill and restructure the camera activation flow.

Series handling wasn't in v1. Open Library returns series information, but I hadn't asked for it. It wasn't until I was adding my Discworld collection that I realised I had no way to see "all Terry Pratchett books in reading order." An obvious feature - once I actually needed it.

There's more to find. Every real usage session surfaces something. "Shipped to production" is the starting line, not the finish.

## What I Learned

AI-assisted development is genuinely useful. I built and shipped something real in a day, something that would have taken a week or more without it. The productivity gain is substantial.

But the nature of the work changes, it doesn't disappear.

Less time: writing boilerplate, debugging syntax errors, looking up API details, writing standard CRUD operations.

Same time (or more): deciding what to build, choosing appropriate patterns over popular ones, making taste calls on UX, testing in real conditions, handling edge cases that only appear in production.

The coding is fast. The decisions are still yours.

Shelved is live and I'm using it daily. My books are finally tracked. The spreadsheet is gone.

Would I build this way again? Absolutely. But I'd go in knowing that "AI makes it fast" really means "AI makes the typing fast." The thinking still takes exactly as long as it needs to.

And I only had to tell Claude "no" about fifty times to get here.

---

*Shelved is a Rails 8 book collection tracker. It's currently live at [shelved.fly.dev](https://shelved.fly.dev) with a proper domain coming soon.*
