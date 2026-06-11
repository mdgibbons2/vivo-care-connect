# Demo App Design System

A **clean, professional starter design system** for new internal tools and SaaS apps. Stripe-Dashboard-inspired aesthetic, built on Bootstrap 5 conventions, with a muted neutral palette, system font stack, and a small but complete set of components: cards, buttons, forms, tables, badges, toasts, modals, popovers, and dashboard chrome (fixed sidebar + topbar).

The system is **derived from the Fitness360 app** ([github.com/mdgibbons2/Fitness360](https://github.com/mdgibbons2/Fitness360) — private), and is intended to be **re-skinned per product** by changing a handful of `--theme-*` variables.

> **For readers exploring the source**
> The original implementation lives in `Fitness360.Web/wwwroot/css/app_custom.css` (~3,400 lines) and is fully documented in `docs/UI-ARCHITECTURE.md` of that repo. If you have access, read that doc — it covers every override, layout, and JS utility in this system at full detail. This project is a **distilled, framework-agnostic** version intended for prototyping and quick mockups.

---

## Index

```
.
├── README.md                  ← you are here
├── SKILL.md                   ← agent skill definition
├── colors_and_type.css        ← all design tokens (colors, type, spacing, radii, shadows)
├── assets/                    ← logos, favicon, brand SVGs (placeholders)
├── fonts/                     ← (empty — system fonts only; see "Typography")
├── preview/                   ← Design System tab cards
│   ├── 01-colors-app.html
│   ├── 02-colors-theme.html
│   ├── 03-colors-palette.html
│   ├── 04-type-scale.html
│   ├── 05-type-field-label.html
│   ├── 06-spacing.html
│   ├── 07-radii.html
│   ├── 08-shadows.html
│   ├── 09-buttons.html
│   ├── 10-buttons-icon.html
│   ├── 11-forms.html
│   ├── 12-cards.html
│   ├── 13-badges.html
│   ├── 14-alerts.html
│   ├── 15-toast.html
│   ├── 16-page-header.html
│   ├── 17-table.html
│   └── 18-icons.html
└── ui_kits/
    └── demo-app/              ← full clickable dashboard prototype
        ├── README.md
        ├── index.html
        ├── tokens.css
        ├── Sidebar.jsx
        ├── TopBar.jsx
        ├── PageHeader.jsx
        ├── Card.jsx
        ├── Button.jsx
        ├── Badge.jsx
        ├── DataTable.jsx
        ├── Toast.jsx
        ├── Modal.jsx
        └── screens/
            ├── Dashboard.jsx
            ├── Members.jsx
            ├── MemberDetail.jsx
            ├── Settings.jsx
            └── Login.jsx
```

---

## Product context

**Demo App** is a generic "starter SaaS" — an admin dashboard for managing records (members, items, transactions, etc.), with a left sidebar, a top bar with a user menu, and content pages built from cards, tables, forms, and metric tiles. The reference implementation is multi-tenant (each company is its own workspace), but the components themselves are workspace-agnostic.

**Source repository** *(private — listed for reference)*
- `mdgibbons2/Fitness360` — class & membership management SaaS in ASP.NET Core 9.0 + Bootstrap 5 + Dapper. **Explore the original repo to do a more faithful job** of building designs based on the live product. Particularly useful files:
  - `docs/UI-ARCHITECTURE.md` — exhaustive system documentation
  - `Fitness360.Web/wwwroot/css/app_custom.css` — full CSS source
  - `Fitness360.Web/Areas/Company/Views/` — example dashboard pages
  - `.claude/skills/ui-design.md` — agent guidance

---

## Content fundamentals

### Voice & tone

- **Direct, neutral, third-person about the system; second-person ("you") to the user.** Example: "You don't have any members yet." / "We sent you a confirmation email."
- **No exclamation points in chrome.** Reserve them for empty-state celebrations or transactional success copy ("Welcome back, Sam!"). Default tone is calm.
- **Plain language, no jargon.** "Sign in" not "Authenticate." "Add member" not "Provision new user."
- **Action-first labels.** Buttons are verbs ("Save changes", "Add member", "Cancel subscription"), not nouns ("Submission").

### Casing

- **Sentence case everywhere.** Page titles, button labels, card titles, menu items. Never Title Case.
  - ✅ "Class schedule" — ❌ "Class Schedule"
  - ✅ "Add member" — ❌ "Add Member"
- **UPPERCASE with letter-spacing** is reserved for **micro-labels**: table column headers, field labels above values in detail views, section dividers. Always `font-size: 0.8em; letter-spacing: 0.5px;`.
- **Code identifiers, slugs, and IDs** are shown in `<code>` with monospace.

### Required field marker

Required form fields are marked with an asterisk **inside the placeholder**, not via a separate `*` next to a `<label>`:

```html
<input type="text" class="form-control" placeholder="Email *" required>
```

(See "Form design rule" below — labels are omitted entirely in favor of placeholders.)

### Empty states

Short, friendly, with an action where appropriate:

- "No members yet. Add your first member to get started."
- "No classes scheduled for the next 7 days."
- "Nothing to show here."

Never apologize ("Sorry, we couldn't find anything"). Never blame ("Your query returned no results").

### Errors

- **Validation:** "Email is required." / "Please enter a valid email." — placed in `.invalid-feedback` immediately below the field.
- **Server errors to users:** "Unable to save changes. Please try again or contact support." — never expose stack traces, SQL errors, or internal IDs.
- **Toasts** for transient errors ("Unable to delete item"); **Bootstrap alerts** for persistent or contextual errors at the top of a page or card.

### Confirmations

- **Destructive actions** get a `data-confirm` popover, not a modal: "Are you sure you want to delete this?" / "Cancel this subscription?"
- **Success messages** are toasts: "Member saved." / "Subscription cancelled."
- Never use `window.alert()`, `window.confirm()`, or `window.prompt()`.

### Emoji & decoration

- **No emoji in product chrome.** Buttons, nav, table cells, badges, headings — all icon-only or text-only.
- **Emoji are acceptable in user-generated content** (member names, class descriptions, notes) and in optional copy where the user explicitly chose it.
- **No unicode characters as icons.** Use Remix Icons (`<i class="ri-...">`).

### Vibe

Clean, scannable, information-dense without being cramped. Calm grays, generous whitespace within cards, dense type in tables. The dashboard should feel like Stripe — competent, modern, almost entirely grayscale, with a single muted slate accent doing the heavy lifting for primary CTAs.

---

## Visual foundations

### Colors

**Three layers** of color, intentionally separate:

1. **App colors** (`--app-*`) — the neutral foundation. Text hierarchy (`#0f172a` → `#475569` → `#64748b` → `#94a3b8`), backgrounds (`#ffffff` card / `#f8fafc` page / `#f1f5f9` hover), borders (`#e2e8f0`), and a single accent slate (`#475569`) for focus rings and interactive states. **These do not change per brand.**
2. **Theme colors** (`--theme-*`) — Bootstrap-aligned semantic slots: `primary`, `secondary`, `success`, `info`, `warning`, `danger`. **Re-skin per product** by overriding just these. Defaults are a **grayscale palette with a single muted slate accent** (`#475569` primary, `#1f2937` near-black secondary) plus muted semantic colors for success/info/warning/danger.
3. **Custom palette** (`--cc-1` through `--cc-20`) — a curated 20-color grid of muted, professional colors for tags, role badges, category indicators, and user-selectable color pickers. Organized into warm / green / blue / purple / brown / neutral families.

**Hierarchy in practice:**
- Primary CTA (`btn-primary`): theme primary (muted slate by default).
- Secondary actions: `btn-outline-secondary` with a neutral gray border.
- Status badges: `bg-success`, `bg-danger`, `bg-warning` mapped to theme semantics.
- Focus rings: app slate accent (`--app-accent`).
- Page text: app neutrals; the only color in body copy is on links (slate).

### Typography

- **System font stack** — `-apple-system, BlinkMacSystemFont, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif`. No webfonts. This is deliberate: speed, platform familiarity, no FOIT.
- **Scale (responsive):** root is 14px on mobile, 16px from 768px up. Heading scale is 32 / 26 / 22 / 18 / 16 / 12 (h1–h6), all 600–700 weight with mild negative tracking on large sizes.
- **Body** is 14px, line-height 1.5, color `--app-text-primary`.
- **Field labels** are 0.8em, 600 weight, UPPERCASE, 0.5px letter-spacing, tertiary color.
- **Monospace** uses the platform mono stack (`ui-monospace, SFMono-Regular, ...`) — for IDs, slugs, code, technical values.

> **Font caveat:** No custom webfonts are shipped. If a brand needs one (e.g. Inter, IBM Plex), import it via `@import` or `<link>` and swap `--font-sans`. The system tolerates substitution; metrics will reflow slightly but layouts hold.

### Spacing

- **4px base scale:** 4, 8, 12, 16, 20, 24, 32, 40, 48. Exposed as `--space-1` through `--space-12`.
- **Content padding:** 24px in cards (`.card-body`), 24px around page content (`.app-content`), 20px in card headers.
- **Form rows:** 16px gap between fields, 24px between sections.
- **Card stacks:** 16px (`mb-4` in Bootstrap-speak) between sibling cards.

### Layout chrome

- **Sidebar:** 240px fixed left, white, 1px right border. Nav items 10px × 12px padding, 6px radius pills, 20px icon + 16px right margin.
- **Top bar:** 56px fixed top, white, 1px bottom border, 24px right padding.
- **Content area:** offset by sidebar + topbar; page background `--app-bg-secondary` (cool off-white).
- **Mobile (< 768px):** sidebar collapses behind a hamburger; content goes full-width; padding compresses to 8px.

### Backgrounds

- **No imagery in app chrome.** Pages are plain white cards on a cool off-white background. No gradients in production UI. No textures, no patterns.
- **Onboarding / landing exceptions:** marketing-style pages may use single hero images or muted tinted backgrounds (rgba theme-color at ~8% opacity for alert backgrounds), but the dashboard itself stays clean.
- **No full-bleed photography** in the design system. If imagery is needed, use it inside a card with `border-radius: 6px` and natural object-fit.

### Borders

- **Default `1px solid var(--app-border)` (#e2e8f0)** — hairline, calm. Used on cards, inputs, table cells.
- **Lighter dividers** (`#f1f5f9`) for nested separations (between rows in a list, between sections in a card body).
- **No double borders.** Adjacent cards are spaced, not stacked seamlessly. Table cells don't double-up borders.

### Corner radii

- **6px is the default** — buttons, cards, inputs, dropdowns, popovers.
- **4px** for badges, chips, small inline elements.
- **8px** for modals and the confirmation popover — slightly more generous to feel "lifted."
- **No pill shapes.** Never `border-radius: 999px` or `50%` (except avatars).

### Shadows

- **`--app-shadow-sm` (`0 1px 3px rgba(0,0,0,0.05)`)** — cards, tables. Barely perceptible.
- **`--app-shadow-md` (`0 4px 6px rgba(0,0,0,0.05)`)** — elevated surfaces, dropdowns.
- **`--app-shadow-lg` (`0 10px 15px rgba(0,0,0,0.1)`)** — modals, the confirmation popover, raised tooltips.
- **No inner shadows.** No glow effects.
- **Focus rings** are a 3px halo at 10% opacity of the accent purple — not a shadow.

### Hover & press states

- **Buttons:** background shifts to `--theme-*-hover` (about 10% darker). No scale, no shadow change.
- **Cards:** **no hover effect.** Cards do not lift, glow, or change background. They are content containers, not affordances.
- **Table rows:** background shifts to `--app-bg-secondary` on hover; cursor is `default` unless `.clickable-row`.
- **Links:** color shifts from `--app-accent` to `--app-accent-hover` and gains an underline.
- **Sidebar nav items:** active item gets `--app-bg-tertiary` background and `--app-text-primary` color + 600 weight.
- **Press states:** no shrink, no transform. Most browsers' default `:active` styling is fine.

### Transitions

- **One global rule:** `*, *::before, *::after { transition: all 0.15s ease; }`
- Used for hovers, focus rings, color changes, opacity. No keyframes, no bounces, no springs.
- **Tooltips** are configured with `animation: false` for instant feedback.
- **Toasts** slide in from the top-center with a 0.3s ease transition.
- **Modals** use Bootstrap's default fade.

### Transparency & blur

- **Alerts** use ~8% opacity theme color as background (`rgba(var(--theme-danger-rgb), 0.08)`), with a 25% opacity border, and full-saturation foreground. This is the only place tinted-transparent backgrounds appear.
- **No backdrop blur** anywhere. No glass-morphism. No frosted overlays. Modals use a solid `rgba(0,0,0,0.5)` backdrop.

### Cards

- White background.
- 1px solid `--app-border`.
- 6px radius.
- `--app-shadow-sm` — barely visible.
- No hover.
- Header: 56px min-height, 10px 20px padding, 1px bottom border, 16px / 600 title.
- Body: 20px padding.
- **Button rule:** generally one primary button per card; additional actions are outlined.

### Iconography summary

- **Remix Icons 4.5.0** via CDN (`https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css`) — line style, used everywhere.
- **Font Awesome 6** via CDN — only for brand marks (`fa-brands fa-cc-stripe`, etc.) that Remix lacks.
- **No SVG icon set is shipped in this system** — the original repo uses Remix's icon font and we follow suit. If offline use is required, swap to Lucide or Heroicons (both have CDN + SDK variants). See "Iconography" section.

### Scrollbar

- Thin (6px) on webkit, neutral `--app-border` thumb on `--app-bg-tertiary` track.

---

## Iconography

### Primary: Remix Icons (CDN font)

The system uses **Remix Icons 4.5.0** — a free, modern, line-style icon set with ~2,800 glyphs. Loaded via CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css">
```

Usage:

```html
<i class="ri-dashboard-line"></i>     <!-- Navigation -->
<i class="ri-user-line"></i>          <!-- Users / members -->
<i class="ri-settings-3-line"></i>    <!-- Settings -->
<i class="ri-add-line"></i>           <!-- Add / create -->
<i class="ri-delete-bin-line"></i>    <!-- Delete -->
<i class="ri-edit-line"></i>          <!-- Edit -->
<i class="ri-check-circle-line"></i>  <!-- Success / confirm -->
<i class="ri-error-warning-line"></i> <!-- Error / warning -->
<i class="ri-filter-line"></i>        <!-- Filter -->
<i class="ri-arrow-left-s-line"></i>  <!-- Pagination prev -->
<i class="ri-arrow-right-s-line"></i> <!-- Pagination next -->
```

**Style rule:** always use the `-line` variants (outline), never `-fill`. This is consistent across the entire dashboard. Filled variants may be used only for status indicators where outline reads as ambiguous (e.g. a solid red circle for "offline").

### Sizing convention

- **Standard button:** 18px (inherited via `.btn i[class*="ri-"]`)
- **Small button** (`.btn-sm`): 16px
- **Large button** (`.btn-lg`): 20px
- **Sidebar nav:** 20px (with 16px right margin to text)
- **Inline in text:** inherit current font-size

### Secondary: Font Awesome 6 Pro — solid / regular / light / brands

The full Font Awesome 6 **Pro** set is available from the team's hosted storage container — usable for any glyph Remix doesn't cover, or anywhere you need a **filled** alternative to the default outline style.

```html
<link rel="stylesheet" href="https://showbizjobswebsite.blob.core.windows.net/siteassets/lib/fontawesome-pro-6/css/all.css">
```

Use the standard Font Awesome family prefixes:

```html
<i class="fa-solid fa-gauge-high"></i>    <!-- filled / heavier weight -->
<i class="fa-regular fa-user-group"></i>  <!-- medium weight -->
<i class="fa-light fa-calendar-days"></i> <!-- lightest -->
<i class="fa-brands fa-cc-stripe"></i>    <!-- brand marks -->
```

**When to reach for FA Pro instead of Remix:**
- You need a **filled / solid** variant of an icon for emphasis (e.g. a status indicator, a selected nav state).
- You need a **lighter** stroke weight than Remix's default line.
- You need a glyph Remix doesn't have (FA's library is ~10× larger).
- You need brand marks like Stripe, Google, GitHub, Slack, Microsoft.

**SVG variant** — if you need standalone SVG files (e.g. for use in `<img>` or inline SVG without loading the full font CSS), individual icons are available at:

```
https://showbizjobswebsite.blob.core.windows.net/siteassets/lib/fontawesome-pro-6/svgs/<family>/<name>.svg
```

Example: `https://showbizjobswebsite.blob.core.windows.net/siteassets/lib/fontawesome-pro-6/svgs/solid/abacus.svg`

**Mixing rule of thumb:** default to Remix `-line` icons for app chrome (nav, buttons, table actions). Use FA Pro **solid** for status pills and selected/active states; **regular/light** when you want a slightly more refined feel than Remix; **brands** for any third-party logos.

### Emoji & unicode

- **Not used as icons.** Remix has everything we need.
- Emoji are user-content only, never system chrome.

### Logos & brand marks

The `assets/` directory contains:
- `logo.svg` — a generic placeholder mark ("Demo" wordmark in the theme primary color). **Replace per product.**
- `logo-icon.svg` — square mark for favicons / small displays.
- `favicon.svg` — 32×32 simplified version of the icon.

> **Logo caveat:** the included logo is a generic placeholder, not a real brand asset. When using this system for a real product, replace the logo files and update the `--theme-primary` color to match the brand.

### Inline custom icons

For domain-specific glyphs Remix doesn't cover (e.g. a specific business metric chart, a custom badge), inline SVG is acceptable. Keep them single-color, 24×24 viewBox, 1.5–2px strokes to match Remix's weight.

---

## Skill manifest

This directory is also a **Claude Code Agent Skill** — see `SKILL.md`. Drop the whole folder into `~/.claude/skills/demo-app-design/` to use it in Claude Code as `demo-app-design`.

---

## Caveats

- **System fonts only.** No webfonts are shipped. If you need a specific brand face (e.g. Inter), swap `--font-sans` in `colors_and_type.css`.
- **The included logo is a placeholder**, not a real brand. Replace `assets/logo.svg` and `assets/logo-icon.svg` for production use.
- **Icons come from a CDN font (Remix Icons).** If you need offline-capable SVG icons, substitute Lucide or Heroicons with matching stroke weights.
- **JS is minimal.** The system documents JS patterns (toast helpers, `data-confirm` popovers, DataTables config) but doesn't ship a runtime library. The UI kit demonstrates them with vanilla React.
