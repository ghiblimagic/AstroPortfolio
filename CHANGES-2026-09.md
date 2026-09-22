# Changes — September 2026

## 2026-09-21 — Hero redesign

Redesigned the homepage hero and added a reusable decorative section-divider
component, on branch `hero-redesign`.

**What and why:** Refreshed the hero to read as more professional/available
for work (new "open to roles" badge, tighter copy, clearer CTAs) and
introduced a "Midnight" color palette for the hero + GitHub sections. Added
`src/components/SectionDivider.astro` (clouds/hills SVG dividers, optional
sparkle stars) to create a sky-to-ground visual progression: Hero → GitHub
(clouds+stars) and Projects → Services (hills). All other section boundaries
left plain per the request.

**Key decisions:**
- Palette colors stored as CSS custom properties in `src/styles/globals.css`
  (`--color-hero-bg`, `--color-hero-heading`, `--color-hero-subhead`,
  `--color-hero-body`, `--color-cta-primary-bg/text`,
  `--color-cta-secondary-border/text`, `--color-github-bg`,
  `--color-lavender`, `--color-divider-mid`) so the palette can be swapped
  later without touching markup.
- Followed the spec's explicit palette hex values (Section 3) over its
  earlier prose description (Section 1: "softer navy/blue" subhead, "filled
  navy" primary CTA) — navy text/subhead on the new navy hero background
  would fail contrast, so the lavender subhead (`#D4B8EA`) and lavender-fill
  primary CTA with navy text were used instead. Verified all resulting
  text/background pairs against WCAG AA (all ≥7.8:1, well above the 4.5:1
  minimum).
- Hero CTAs styled locally in `HeroButtons.astro` (new `.hero-btn` classes)
  rather than adding a variant to the shared `GradientButton.astro`, since
  that component is reused on other pages/sections outside the hero's scope.
- Discovered the existing `<section id="home">` wrapping the hero was never
  explicitly closed in the original markup (browsers tolerate it, and it's
  why the contact form already has a `text-left` override to fight the
  inherited `text-center`). Left that pre-existing structural quirk alone to
  avoid changing text alignment on out-of-scope sections; instead added a
  new, properly self-closed `<div class="w-full bg-[var(--color-hero-bg)]">`
  wrapper around just the hero content for the full-bleed navy background.

**Deviations from plan:** None beyond the discovery above.

**Verification:** `pnpm astro check` → 0 errors (only pre-existing warnings
unrelated to this change). Dev server started and homepage HTML fetched via
curl to confirm the new markup renders. Could not get real browser
screenshots at desktop/mobile widths — no `chromium-cli`/Playwright and no
network access to install one in this sandbox — so visual QA (no seam
lines, no horizontal overflow, "puffy" clouds on mobile) was done via CSS/
layout reasoning instead of a rendered screenshot; recommend a manual check
in a browser before merging.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

## 2026-09-21 — Midnight palette expansion (sitewide restyle)

Follow-up on the same `hero-redesign` branch: expanded the Midnight palette
from just the hero/GitHub into a full top-to-bottom restyle of the homepage
(sidebar, GitHub, Projects, Services, Process, Skills, Contact, footer),
per instruction that this request wins over the prior one wherever they
conflict.

**What and why:** Applies the "Midnight" palette consistently down the page
(navy hero/Contact/footer bookends, alternating white/pale-lavender middle
sections), restyles Projects/Services/Process/Skills into card-based layouts
with navy/lavender accents, moves the hills divider from Projects→Services
to Skills→Contact (clouds+stars divider stays Hero→GitHub), adds a twinkle
animation for sparkle stars (hero, clouds divider, Contact corners), and
hardens the Contact form's honeypot field for accessibility and against
unsophisticated spam bots, while preserving all existing submit/reCAPTCHA
behavior.

**Key decisions:**
- New palette vars are namespaced `--midnight-*` (e.g. `--midnight-navy`)
  rather than overwriting the existing `--navy`/`--navy-deep` in
  `globals.css`, which are still used site-wide by `.gradient-line`, button
  hovers, and the global focus-ring box-shadow — confirmed with the user
  before proceeding. The old ad-hoc `--color-hero-*`/`--color-cta-*`/
  `--color-github-bg`/`--color-lavender`/`--color-divider-mid` vars from the
  first hero pass were removed and fully migrated to the new names.
- The "top-right Contact button" from the spec already existed —
  `SocialLinksNav.jsx` had a desktop-only (`hidden md:block`) Contact
  `GradientButton` in the header. Initially missed this and added a
  duplicate in `Layout.astro`; caught it on a second pass, reverted the
  duplicate, and restyled the existing button in place instead (lavender
  fill / navy text, per spec) — confirmed with the user that the header
  (sitewide) was the right place for it.
- `.heading-styling` (globals.css) recolored to navy — confirmed via grep
  that it's only consumed on the homepage, so no cross-page impact.
- Card/border/shadow specs differ per section (Projects: 20px radius/
  `#E6E8F2` border; GitHub/Services: 18px radius/lavender border), so
  overrides were scoped per-component/section rather than changed on the
  shared global `.portfolio-card` class, which is reused across sections
  with different specs (and other pages).
- Project card titles switched from a local Fraunces override back to the
  site's whimsical heading font (AkayaKanadaka), per "title in the heading
  font" — this was the one place the new spec asked for a font used where
  a different one currently rendered.
- Process's connecting line and 4-column grid both collapse below 1024px
  (not just at the mobile breakpoint) since a horizontal line/4-col row
  doesn't make sense across a wrapping 2×2 tablet layout.
- Honeypot field switched from `class="hidden"` (display:none — already
  screen-reader-invisible, but a heuristic some scraper bots explicitly
  check for and skip) to a `.visually-hidden` clip-based technique plus
  `aria-hidden="true"`, `tabindex="-1"`, `autocomplete="off"` — a real,
  legitimate anti-spam pattern, not detection evasion of anything
  legitimate. Netlify's honeypot field name/attributes, form handling JS,
  and reCAPTCHA integration are all untouched.
- Contact section's white card wrapper was removed (per the new spec, the
  form sits directly on navy with dark `navy-input` fields) — the old
  wrapper would have made the light-colored helper text illegible against
  a white card.
- Added a scoped `#contact input:focus` etc. rule for the lavender outline
  rather than changing the sitewide focus style, so other pages' focus
  rings are untouched; the global rule's box-shadow ring still layers
  underneath it.

**Deviations / notes for follow-up:**
- Mobile horizontal section padding left at the existing `px-4` (16px)
  convention rather than introducing a one-off 20px value for a ~4px
  difference from the spec's "~20px."
- Could not get real browser screenshots (no `chromium-cli`/Playwright,
  no network access to install one in this sandbox); verified via
  `pnpm astro check` (0 errors), rendered-HTML inspection via curl to
  confirm all new elements/classes appear the expected number of times,
  and WCAG contrast math for every new color pairing (all ≥6.9:1, most
  ≥9:1). Recommend a manual look at ~1440px and ~390px before merging,
  and a manual Tab-through of the Contact form to confirm the honeypot is
  truly unreachable and the lavender focus ring is visible.
- Found and cleaned up a leftover `astro dev` process from the previous
  session (still running on port 4321) that hadn't been stopped properly.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

### 2026-09-21 — Follow-up: remove hero badge, cooler palette

Small follow-up on the same branch, superseding conflicting parts of the
above per the user's explicit "where they conflict, these win."

- Removed the hero status pill entirely (including its now-dead
  `.hero-badge`/`.hero-badge__dot` CSS) — hero now opens straight into the
  headline.
- Palette: `--midnight-lavender`, `-pale`, `-mid`, `-border` moved to a
  cooler blue-violet set (`#B3AEEA`/`#E9EEFA`/`#D3DCF3`/`#D5DDF2`) since the
  old lavender read as pink on some screens. Since these were already
  CSS-var-driven everywhere, only the var definitions needed to change.
  Hard-coded literals that weren't tied to a var (hero subhead, Contact
  corner stars, sidebar active-nav background, GitHub chart color) were
  updated individually; grepped the whole `src/` tree afterward for the
  old hex values to confirm nothing pinkish was left.
- GitHub contribution chart: the `ghchart.rshah.org` API only takes a
  single base hex (it auto-generates its own shade scale from one color —
  confirmed by the fact the existing single-hex setup already rendered a
  multi-shade chart). Used `#8E8FD8` (one stop from the requested 4-color
  scale) as the closest available match, since the API has no way to pass
  an explicit 4-stop scale. Flagged to the user as a deviation.
- Reviewed the attached reference mockups: layout/spacing matched the
  current implementation closely. One mockup detail — a
  "github.com/ghiblimagic" caption under the GitHub heading — isn't in any
  written instruction, so it was deliberately left out rather than added
  as an inferred requirement; flagged to the user as an option rather than
  implemented unasked. The "mobile" mockup turned out to be a scaled-down
  capture of the 1440px desktop layout (per its own dimensions note), not
  an actual narrow-viewport render, so it wasn't used as evidence for any
  mobile-specific layout decisions (e.g. the header Contact button's
  existing `hidden md:block` was left unchanged).

**Verification:** `pnpm astro check` → 0 errors. Rendered HTML confirmed
via curl: badge markup gone, new hex values served, all 3 Contact stars
updated. Computed hex channel values for the new lavender set to confirm
they read cool (blue-dominant) rather than pink.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

### 2026-09-21 — Fix hero/divider seam, recolor navbar + sidebar

Two more fixes on the same branch:

- **Seam bug:** the inner hero row kept a pre-existing `sm:my-10 xl:my-24`
  margin. Since the new navy background `<div>` wrapping it had no
  padding/border, that margin collapsed straight through the div (a
  child's margin escapes a padding-less, border-less parent) — the page's
  pale body color showed through as a gap between the hero and the
  clouds divider. Fixed by adding `flow-root` to the wrapper, which
  establishes a block-formatting context and contains the margin inside
  the painted box. No other visual effect.
- **Navbar/sidebar recolor:** the site header (`Layout.astro`) and the
  desktop sidebar (`DesktopNav.astro`, `bg-[#1334a0]`) were still on the
  old solid blue. Both now use `var(--midnight-navy)`. Since these are
  global chrome (`Layout.astro`'s header and the sidebar wrapper render on
  every page via `SpaceForDesktopSidebar`), this applies site-wide, not
  just the homepage.
  - The header's social icons and the mobile hamburger icon are Font
    Awesome SVGs colored with the *old* navy/blue gradient
    (`#1334a0`/`#1b2f70`/`#6b8edb`/`#3459a5`/`#0d1738` — literally the old
    palette). Against the new dark header they'd have gone low-contrast
    or near-invisible in places, so both got a `filter: brightness(0)
    invert(1)` to render solid white instead of editing the shared SVG
    files. Also updated `#nav-toggle:hover`'s background from a light
    blue (`#dbeafe`) to a translucent white, since it would have clashed.
  - One side effect: the hamburger icon's hover state used to swap to a
    different-colored SVG variant for a subtle color-change effect; with
    both variants now forced white by the filter, that color swap is no
    longer visible (the open/close icon shape change itself still works).
  - Also recolored `MobileNav.astro`'s wrapper (`bg-mainColor`, i.e. the
    same old blue) to navy, since it's the mobile equivalent of the same
    sidebar.
- **Flagged, not touched:** found two more old-color elements not
  explicitly asked about: the mobile menu's outer flyout wrapper in
  `NavToggleButton.astro` uses `bg-yellow-300` (a stray placeholder color,
  not "old blue" — and confirmed to be fully covered by its own child's
  background in practice, so it isn't actually visible) and the
  `.skip-link` accessibility utility (`bg-mainColor`) which only appears
  on keyboard focus. Left both alone pending explicit direction. Also
  noticed `NavToggleButton.astro` and `MobileNav.astro` both render an
  element with `id="sidebar"` alongside `DesktopNav.astro`'s own
  `id="sidebar"` — a pre-existing duplicate-ID bug across the page,
  harmless in practice (Astro's per-component style scoping and
  `getElementById`'s first-match behavior both happen to sidestep it) but
  worth knowing about if it ever needs debugging.

**Verification:** `pnpm astro check` → 0 errors. Rendered HTML confirmed
the new header/sidebar backgrounds and icon filters are present.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

### 2026-09-21 — Social icon gradient

Restyled the header's 6 social icons (LinkedIn, GitHub, Bluesky, X,
YouTube, Twitch) with a shared lavender→periwinkle gradient.

- Confirmed with the user first that the footer has no social icons
  today (only copyright text) — they chose to leave the footer alone and
  scope this to the header/hero only.
- Added `src/data/socialIcons.js`: the real Font Awesome path data and
  viewBoxes extracted directly from the existing `public/images/*.svg`
  files (not reconstructed from memory), so the new inline SVGs are
  pixel-identical to the originals, just recolored. Each icon turned out
  to be a single `<path>` — the "letters/triangle/etc. cutouts" mentioned
  in the request are negative space baked into that one path's geometry,
  not separate colored layers, so they already show the navy background
  through them with no extra fix needed.
  - This is a Font Awesome Free set (per each SVG's own license comment,
    CC BY 4.0), the same one already vendored in `public/images/`.
- Added one shared gradient (`#social-gradient` / `#social-gradient-hover`)
  in a hidden SVG in `Layout.astro`, before the header — confirmed exactly
  one `<linearGradient>` def of each in the rendered page (no per-icon
  duplicates).
- `SocialLinksNav.jsx` rewritten to map over the shared data and render
  inline `<svg>`s with a `.social-icon-svg` class (`fill:
  url(#social-gradient)`, swapping to the hover gradient via a CSS class
  swap on hover/focus — not a transition on `fill` itself, since gradient
  fills can't animate smoothly). Each link is `.social-icon-link` (44×44px
  flex box, `aria-label="Janet on <Platform>"` instead of `title`), inner
  SVG `aria-hidden="true"`, focus-visible outline in `--midnight-lavender`.
  Kept the same 6 links in the same order.
- Left the separate GitHub icon next to the "GitHub" section heading in
  `index.astro` untouched, per instruction — worth noting it's not
  actually solid navy today (it still renders its own old blue Font
  Awesome gradient), so "stays --navy" is descriptive of intent rather
  than current fact; flagging rather than silently fixing since changing
  it wasn't asked for here.

**Verification:** `pnpm astro check` → 0 errors. Rendered HTML confirms
all 6 icons, their aria-labels, and exactly one definition of each
gradient (no duplicate IDs). Computed contrast for both gradient stops
against `--midnight-navy` and `--midnight-navy-deep`: 6.87–12.35, all
above the 3:1 minimum for non-text/icon contrast. Could not test actual
rendering across Chrome/Firefox/Safari (no browser automation available
in this sandbox) — the single-shared-`<defs>` + `fill: url(#id)` pattern
used here is standard, broadly-supported SVG, but a manual cross-browser
look is still worth doing before shipping.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

### 2026-09-22 — Social icons in footer, Services diamond-badge rework

Two more updates on the same branch, superseding conflicting parts of
earlier turns per "where they conflict, these win."

- **Social icons now also in the footer**, not just the header — reversing
  the earlier "skip footer" answer per this turn's explicit instruction.
  Reused the same `socialIcons.js` data and `.social-icon-link`/
  `.social-icon-svg` CSS classes already built for the header; added a
  plain Astro-native icon row to `Layout.astro`'s footer (no need to
  reuse `SocialLinksNav.jsx` itself, since that component's structure is
  tied to a Radix/React `NavigationMenu` that doesn't apply to the
  footer's simpler flat list). Verified via rendered HTML: still exactly
  one `<linearGradient>` definition of each (no duplicates) even with 12
  total icon instances (6 header + 6 footer) now sharing it.
- **Services section reworked** from the "icon tile" grid to a 2×2
  badge-diamond layout per the new spec: `DiamondBackgroundImages.astro`
  rewritten so the lavender offset shape and the gradient diamond are
  separate sibling layers (not a `::before`, per explicit instruction,
  so the hover drop-shadow filter only ever applies to the gradient
  diamond) — both anchored at the same point via a zero-size positioning
  div, with the lavender one offset 8px via its own top/left. Updated
  `.shadow-transition-effect` in `globals.css` to move `transition` onto
  the base rule (not just `:hover`) so the drop-shadow fades in AND out
  smoothly, exactly as specified. Added `--diamond-gradient` custom
  property. Fixed the "Accessiblity"/"frustration.."/"everyone.I" copy
  typos along the way, as instructed.
- **Bug found via the user's own DevTools inspection** (not caching, a
  real bug): the icon `<img>` inside the new diamond badge rendered at
  `0×28` — width collapsing to zero while height stayed correct. Root
  cause: Tailwind's preflight sets `img { max-width: 100%; height: auto;
  }` globally; the icon's positioning parent (`.diamond-anchor`) is
  deliberately `width: 0` (just an anchor point for the layered
  transforms), so `max-width: 100%` resolved to `max-width: 0`, which
  clamps `width` regardless of the explicit `width: 28px` also set (they
  are different properties — mine set the preferred width, but couldn't
  override the separate max-width constraint). Height escaped this
  because `height: 28px` directly overrides preflight's `height: auto`
  via higher specificity, whereas `width` had no competing declaration
  to win against — only the max-width clamp. Fixed by adding
  `max-width: none` to `.diamond-icon`. Confirmed the actual icon files
  (`service-palette.svg`, `responsive.svg`, `accessiblity.svg`,
  `diamond.svg`) were never removed at any point — verified their `src`
  attributes were present in rendered HTML even before this fix; the
  images were just invisible due to the zero-width clamp, not missing.

**Verification:** `pnpm astro check` → 0 errors both times. Rendered
HTML confirmed all 4 diamond icons, the footer's 6 new icon links with
correct aria-labels, and the `max-width:none` fix present in the served
CSS.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

### 2026-09-22 — Restore diamond circle-morph hover

The pre-redesign markup had `.icon:hover { border-radius: 8rem; }` on
the diamond wrapper, morphing it into a circle on hover. That got lost
when `DiamondBackgroundImages.astro` was split into three separate
layered elements (lavender shadow, gradient diamond, icon) for the
badge-overlap rework — the `icon` class carrying that behavior was
dropped along with the old single-div structure. Re-added it:

- Both the gradient diamond and its lavender shadow now transition
  `border-radius` from 8px to 50% together, so they morph into a circle
  in sync rather than the gradient diamond going round while its shadow
  stays a diamond.
- Since hovering is driven by the gradient diamond specifically (`.diamond-
  gradient-shape:hover`) but needs to affect its *sibling* the shadow
  shape too — plain CSS has no "previous sibling" selector — used
  `.diamond-anchor:has(.diamond-gradient-shape:hover)` to reach both from
  a shared ancestor. This needs `:has()` support (Chrome/Firefox/Safari
  2023+); no fallback was added since the project doesn't otherwise
  target older browsers.
- Added `pointer-events: none` to the icon `<img>` itself — without it,
  hovering the center of the diamond (where the 28px icon sits, layered
  on top) would hit the icon instead of the gradient diamond beneath it,
  and the morph would only trigger on the outer ring, not the center.
- Kept the existing drop-shadow hover effect from the last turn running
  alongside this (both fire together on hover), since the request was to
  restore the circle morph in addition to it, not replace it.

**Verification:** `pnpm astro check` → 0 errors. Confirmed via rendered
CSS that the `:has()` rule and `pointer-events:none` are both present
and wired to the right selectors.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

### 2026-09-22 — Fix a real contrast failure in the Contact form

Ran a full pass over every text/background color pairing currently in
use on the homepage (computed WCAG contrast ratios rather than eyeballing
them, converting the couple of OKLCH colors in `globals.css` to sRGB
properly rather than guessing).

Found one real failure: the required-field asterisks in the Contact
form (`text-red-800`, Tailwind's `#991B1B`) — **1.95:1** against the new
navy Contact background, nowhere close to the 4.5:1 minimum. This is
leftover from when Contact had a white card behind the form (dark red
read fine on white); once the white card was removed a few turns back so
the form sits directly on navy, the asterisks were never re-colored for
that background. Changed to `text-red-300` (`#FCA5A5`) — **8.55:1**,
still unambiguously "red" as a required-field convention, comfortably
above AA (and close to AAA).

Everything else checked out already: the "Other Projects" button and
the (currently blog-only) `.portfolio-button--code`/`--link` OKLCH
colors all land at 6:1–13.8:1; sidebar, footer, service/skill cards,
process steps, and hero/contact text all confirmed at 6.9:1+ in earlier
turns and unchanged since.

**Verification:** `pnpm astro check` → 0 errors. Contrast recomputed for
the new color: 8.55:1.

Diff: uncommitted on `hero-redesign` branch (not yet committed).
