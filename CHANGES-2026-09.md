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

### 2026-09-22 — Follow-up: move the extracted section CSS into globals.css

Follow-up on the section-extraction below: after seeing the six new
components each carrying their own scoped `<style>` block, the user asked
that the CSS instead live in `src/styles/`. Reversed just that part —
removed the `<style>` tag from each of `Hero.astro`, `GithubActivity.astro`,
`ServicesGrid.astro`, `ProcessSteps.astro`, `SkillsGrid.astro`, and
`ContactSection.astro`, and appended the same rules verbatim to
`globals.css` (new section right after `.skills-section`, same comment
headers/order as the original `index.astro` style block had). The
component split itself (markup per section) was kept — only the CSS moved.

**Verification:** `pnpm astro check` → 0 errors. `pnpm astro build`
confirmed the same classes still render in `dist/index.html`, and spot-checked
the built CSS bundle (`_astro/_slug_.*.css`) to confirm `.contact-submit-btn`
etc. now compile without an `data-astro-cid-*` scoping attribute — i.e.
they're genuinely global now, not component-scoped. Removed the
verification `dist/` output afterward.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

### 2026-09-22 — Extract homepage sections out of index.astro's inline <style>

`index.astro` had accumulated a single ~250-line `<style>` block covering
the Hero stars, GitHub chart card, Services cards, Process steps, Skills
pills, and the Contact form — all CSS that had been added directly to the
page instead of following the project's existing pattern (seen in
`HeroButtons.astro`, `SectionDivider.astro`, `DiamondBackgroundImages.astro`,
`LatestProjects.astro`) of colocating a section's markup with its own
scoped `<style>` in a dedicated component.

**What and why:** User flagged the CSS-in-page-file drift and asked for a
cleanup following best practices. Given two options (move the CSS alone
into `globals.css`, or extract each section into its own component to
match the established pattern), the user chose full component extraction.

**Changes:**
- New `src/components/landingpage/` components, each with its markup +
  scoped `<style>` moved out of `index.astro`: `Hero.astro`,
  `GithubActivity.astro`, `ServicesGrid.astro`, `ProcessSteps.astro`,
  `SkillsGrid.astro`, `ContactSection.astro` (including both of its
  inline scripts — the Netlify reCAPTCHA interceptor and the form submit
  handler — since they're tightly coupled to that form).
- `index.astro`'s `<style>` block is now gone entirely. Following the
  same pattern already used for `LatestProjects`/Projects, the outer
  `<section class="section-py ...">` wrapper + `<h2>` for GitHub,
  Services, Process, and Skills stay in `index.astro`; only each
  section's inner content moved into its component.
- `.skills-section`'s padding-bottom override is the one rule that
  couldn't move into a child component (it's on the outer `<section
  id="skills">`, which stays in `index.astro`) — moved to
  `globals.css` instead, alongside the sibling `.section-py` rule it
  overrides.

**Key decisions:**
- Extracted Hero too (previously only `HeroButtons` was split out), for
  consistency with the rest of the page now being composed of section
  components.
- Preserved two pre-existing bugs verbatim rather than fixing them
  as a drive-by, since neither is CSS-related: the malformed
  `<p class=my-4">` (missing opening quote) in the Process section's
  first step, now inside `ProcessSteps.astro`; and the page's unclosed
  `<section id="home">` / trailing `<div>` before `</main>` (browsers
  tolerate both) — left in `index.astro` exactly as before so no DOM
  structure changed as a side effect of this refactor.
- Picked up the user's concurrent manual edits to the hero (two star
  position tweaks, reworded intro paragraph) mid-refactor by re-reading
  the file before finalizing `Hero.astro`, so nothing from that edit was
  lost.

**Verification:** `pnpm astro check` → 0 errors (only pre-existing
warnings/hints unrelated to this change). `pnpm astro build` completed
successfully; confirmed via the built `dist/index.html` that all
extracted classes (hero-stars, github-chart-card, service-card,
process-steps, skills-section, skill-pills, contact-submit-btn) render
the expected number of times. Removed the verification `dist/` output
afterward.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

### 2026-09-22 — Primary button restyle (pressable/tactile)

Replaced the color-only work in progress on the primary buttons — the
"Contact" header link, hero "See My Work", and the Contact form's "Send"
button — with a shared `.btn-primary` class that reads as clearly
clickable: a bottom-edge box-shadow that makes it look raised, and a
`:active` state that depresses it (translateY + compressed shadow).
Explicit instruction that this superseded any earlier button-color work,
so the contrast fixes I'd started on the previous focus-ring/box-shadow
issue were left as-is rather than continued — not relevant to which
class these three buttons now use.

- Added `.btn-primary` to `globals.css`, kept every property from the
  given spec exactly (background/color/border/border-radius/font-weight/
  box-shadow/transition/cursor, plus the `:hover`, `:active`/`.is-pressed`,
  and `:focus-visible` rules verbatim), and additionally folded in the
  layout/typography properties (padding, font-size, font-family, display,
  text-align, text-decoration) so the class is fully self-sufficient
  across three call sites that previously supplied those three different
  ways (a scoped `.hero-btn` class, ad-hoc Tailwind utility classes, and
  `.contact-submit-btn`). Also added `.btn-primary:disabled` to preserve
  the existing "Sending…" disabled state's cursor/opacity behavior.
- All three targets were already real `<a>`/`<button>` elements, so no
  conversion from a `<div>` was needed.
- Removed the now-dead `.hero-btn--primary` rule (HeroButtons.astro) and
  `.contact-submit-btn` rule (globals.css) — both fully superseded by
  `.btn-primary`, no longer referenced anywhere. Left `.hero-btn` and
  `.hero-btn--secondary` untouched, since "Free Consultation" explicitly
  stays the outlined secondary style.
- Codebase context: since the last turn, `index.astro` was refactored
  (apparently outside this session, given a new commit `3e6480b` appeared
  on this branch) from one large file into separate components
  (`Hero.astro`, `GithubActivity.astro`, `ServicesGrid.astro`,
  `ProcessSteps.astro`, `SkillsGrid.astro`, `ContactSection.astro`) with
  the page-scoped `<style>` block moved into `globals.css`. Content is
  otherwise unchanged (one exception noticed in passing: `Hero.astro`'s
  body paragraph reverted to older copy — flagging this, not fixing it,
  since it's unrelated to the button task actually asked for here).

**Verification:** `pnpm astro check` → 0 errors. Confirmed via rendered
CSS that all `.btn-primary` states (base box-shadow, `:hover` background,
`:active` transform/box-shadow, `:focus-visible` outline, `:disabled`)
are present with the exact spec values, and that all three target
elements carry the class. Confirmed the given 11.2:1 contrast claim
(`#141B4D` on `#D6D3F7`) independently.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

### 2026-09-22 — Fix hero button vertical misalignment

User caught "See My Work" looking slightly off relative to "Free
Consultation" next to it and asked whether it was a real issue or an
optical illusion — it was real. The wrapping flex row
(`HeroButtons.astro`) never set `align-items`, so it defaulted to
`stretch`: since `.btn-primary` has `border: none` while
`.hero-btn--secondary` has a 2px border (4px taller total), the shorter
borderless button was getting stretched to match, and the extra height
landed entirely below its single line of text rather than split evenly
above and below — shifting the text up within its own box relative to
its neighbor. Fixed by adding `items-center` to the flex container: each
button now keeps its own natural height and is centered on the line, so
the small (4px) height difference from the border shows as even
symmetric spacing rather than an internal text shift.

**Verification:** `pnpm astro check` → 0 errors; confirmed `items-center`
present in rendered markup.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

## 2026-09-22 — Copy fixes, homepage reorder, and project card outcomes

Content/copy cleanup requested independently of the visual redesign in
progress on this same branch — kept scoped to text and two component
changes only, no styling/layout changes beyond what's described below.

- **Typo sweep across the whole site**, not just the homepage: "provie" →
  "provide" and "misison" → "mission" (both in `LatestProjects.astro`,
  fixed as part of the project-card copy rewrite below), "Disquis" →
  "Disqus" (`SkillsGrid.astro`, plus `gatsby-plugin-disquis` →
  `gatsby-plugin-disqus`, a real npm package name, in
  `LatestProjects.astro`), "mySQL turner" → "MySQL tuner" and "Independent
  Analyics" → "Independent Analytics" (`LatestProjects.astro`, same tech
  tag string), "theres" → "there's" (`OlderProjects.astro`), and
  "Wordpress" → "WordPress" case fixes in `LatestProjects.astro`,
  `ProcessSteps.astro`, `need-a-website.mdx`, and `notes.jsx`'s Mermaid
  diagram label. The "Accessiblity" heading, "frustration.." double
  period, and "everyone.I" missing-space items were already fixed in an
  earlier session (`ServicesGrid.astro`, see 2026-09-21 entry above) —
  re-verified still fixed, no action needed.

- **Homepage section reorder**: swapped the GitHub contribution-graph
  section and the Projects section in `index.astro` so real project work
  now appears right after the hero, with the GitHub graph after it —
  actual work is a stronger first impression than a contribution graph.
  Confirmed via rendered HTML byte-offset check that the new order is
  Hero → Projects → GitHub → Services → Process → Skills → Contact, and
  that all nav/hero anchor links (`#projects`, `#services`, `#process`,
  `#skills`, `#contact`) still resolve correctly — none of them depend on
  DOM order, only on the `id` attributes, which moved with their
  sections. There is no `#github` anchor anywhere in the codebase, so
  nothing pointed at that section by id to begin with.

- **Project cards lead with a bolded outcome line**: added optional
  `outcomeLine` and `descriptionBullets` props to `Project.astro`,
  rendered as `<p class="project-outcome"><strong>` under the title and a
  real `<ul>` list (previously the description was always a single `<p>`
  with no dedicated CSS, so blank-line-separated "bullet" content in the
  template literal was collapsing into one dense block of text in the
  browser — the bug behind the "wall of text" look). Applied to the three
  requested cards (Be BiteSmart, Wipe Right, Homeward Tails) only; the
  other three cards keep the original single-paragraph rendering
  unchanged via a fallback branch. Outcome-line content sourced from the
  resume: **Be BiteSmart** and the resume disagreed with the site's
  existing copy on two numbers (cost savings and Playwright test count);
  user confirmed using the resume's numbers ($207/yr, 129 tests) and the
  card body was rewritten to match, so nothing on the page contradicts
  itself. **Wipe Right**: the site said "6 team members," the resume says
  "7-member team" — left the specific number out of the trimmed bullets
  entirely rather than guessing, since it wasn't the headline metric.

- **Contact form honeypot field — audited, no change made.**
  `ContactSection.astro`'s `bot-field` input already follows accessible
  honeypot practice: `aria-hidden="true"` on the wrapping element, class
  `.visually-hidden` (a clip-rect technique, not `display:none`),
  `tabindex="-1"` and `autocomplete="off"` on the input itself, and
  `netlify-honeypot="bot-field"` on the `<form>` so Netlify's backend
  rejects any submission where it's non-empty — no custom JS reads the
  field. Confirmed via rendered HTML that the markup matches this
  description exactly.

**Verification:** `pnpm exec astro check` → 0 errors (pre-existing
warnings/hints only, none from these changes). Ran `pnpm dev`, fetched the
rendered homepage HTML, and confirmed by byte-offset comparison that
Projects now precedes GitHub in the DOM; confirmed all three outcome
lines and their bullet text render; confirmed the honeypot markup is
present and unchanged. Re-grepped the whole `src/` tree for every typo
string post-fix — zero remaining hits. Dev server stopped after
verification.

Diff: uncommitted on `hero-redesign` branch (not yet committed) —
alongside pre-existing unrelated uncommitted redesign work already on
this branch; not committed here to avoid bundling unrelated changes.

### 2026-09-22 — Process step circle centering + gradient

Two small follow-ups on the Process section's numbered circles
(`globals.css`, `.process-step__circle`):

- **Centering on wrap:** the circle is a fixed 56px block with no
  auto-centering, so it sits left-aligned within its grid cell by
  default — not obvious in the single-row 4-column desktop layout, but
  visible once the grid wraps to 2 columns (tablet) or 1 (mobile) and
  each cell gets much wider. Added `margin-left/right: auto` inside the
  existing `@media (max-width: 1023px)` block (which already handles
  both the tablet and mobile wrap breakpoints), rather than touching the
  desktop layout at all.
- **Gradient to match the Services diamonds:** background changed from
  solid `--midnight-navy` to `var(--diamond-gradient)` (the same
  135°-diagonal navy→periwinkle gradient used on the Services section's
  diamond icons), per request. Flagging a real contrast risk this
  introduces: white digit text on the gradient's brightest stop
  (`#8FA7EA`) computes to only 2.36:1 — the diamonds don't hit this
  problem since they show a small icon glyph, not a bold centered digit
  that can visually land on the bright corner. Added a text-shadow
  (`0 1px 3px rgba(0,0,0,0.6)`) for practical legibility, but a
  text-shadow isn't something a WCAG contrast checker credits, so this
  is a real, known trade-off rather than a fix — worth a manual look at
  all four circles before treating this as done.

**Verification:** `pnpm astro check` → 0 errors. Confirmed both the
centering rule and the gradient/text-shadow are present in rendered CSS.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

### 2026-09-22 — Fix inconsistent sidebar focus outline size

User noticed the focus outline while tabbing through the sidebar was a
different size for different items — a pre-existing structural
inconsistency in `DesktopNav.astro`, not something introduced this
session. Path-based routes (Home, About, Blog, Torc) already had
`class:list={['block rounded-lg px-3 py-1', {...}]}` on their `<a>` for
the active-state background pill, making them a padded block element.
The hash-link items (Projects, Services, The Process, Skills, Contact)
were plain `<a href="...">` with no such class, so the browser's focus
outline hugged just the bare inline text instead of a padded box — this
is what made some outlines look "smaller."

Fixed by adding the same `block rounded-lg px-3 py-1` class to all five
hash-link anchors, so every sidebar item now presents the same size/
shape focus target and hover/active area, regardless of whether it also
carries active-route logic.

**Verification:** `pnpm astro check` → 0 errors. Confirmed via rendered
HTML that all 9 desktop sidebar links (previously only 4 of 9) now carry
the padded class.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

### 2026-09-22 — Sidebar link text back to plain white

User noticed inactive sidebar links looked "slightly faded" rather than
white — that was the intentional muted-inactive/bright-active design
from earlier in this project (`--midnight-text-light` for inactive,
white + background pill for active). Asked whether to keep that
distinction (lightened) or simplify to all-white; user chose all-white,
reasoning that the active pill's background already signals "current
page" on its own, so the dimmed text was redundant with it.

Changed `#sidebar ul a` in `DesktopNav.astro` from
`color: var(--midnight-text-light)` to `color: var(--midnight-white)`.
The active-item rule is unchanged (still sets white explicitly plus the
background pill), so no visual regression there — just no more
brightness gap between active and inactive text.

**Verification:** `pnpm astro check` → 0 errors. Confirmed via rendered
CSS that the base sidebar link rule now resolves to
`var(--midnight-white)`.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

### 2026-09-22 — Center process step circles on desktop too

Follow-up: the previous centering fix for `.process-step__circle` was
scoped to the `@media (max-width: 1023px)` wrap breakpoint only. User
wanted it centered on full desktop screens (the single-row 4-column
layout) as well, not just once it wraps. Moved `margin-left/right: auto`
into the base (unconditional) rule and removed the now-redundant
media-query duplicate — the circle centers at every width now, one rule
instead of two.

**Verification:** `pnpm astro check` → 0 errors. Confirmed via rendered
CSS that the base rule carries the centering margins.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

### 2026-09-22 — Process connecting line inset, text-light cleanup, other-page body bg

Three more small fixes:

- **Process connecting line:** it spanned the full grid width (`left:0;
  right:0`), so it stuck out past circle 1 on the left and past circle 4
  on the right instead of just connecting them. Inset both sides by
  `calc((100% - 3 * 24px) / 8)` — half a column's width, accounting for
  the grid's 3 gaps of 24px — so it now starts and ends at the first and
  last circles' centers.
- **Text-light → white (Hero body text, Contact subtitle/required-note/
  phone-hint/labels):** asked to "update the other pages to just use
  white by itself" — initially guessed this meant the remaining
  `--midnight-text-light` spots on the homepage (Hero.astro's body
  paragraph, and four spots in ContactSection.astro/`.contact-label`),
  since literal other pages (About, Torc) have zero navy-background text
  to begin with, confirmed via grep. Flagged this guess to the user
  rather than assuming silently. Implemented it regardless since it's a
  harmless, reasonable change either way (matches the sidebar's
  all-white decision from two turns ago) — user can ask for a revert if
  it wasn't wanted. `--midnight-text-light` is now fully unused (still
  defined in `:root` in case it's wanted again later; not deleted since
  removing it wasn't asked for).
- **Other pages' body background:** user clarified the actual ask —
  About/Torc (and likely Blog) still alternate `bg-white` sections with
  plain sections that fall through to the global `body` background,
  which was `#e1f5ff` (pale blue) — the same light-blue/white pattern
  the homepage used before the Midnight redesign. Since every homepage
  section now has an explicit opaque background covering it edge-to-edge
  (confirmed no visible body-bg gaps remain there), changing the global
  `body { background-color }` to `#ffffff` fixes the other pages without
  touching the homepage's appearance at all — one change instead of
  editing About/Torc/Blog individually. Grepped for `e1f5ff` afterward;
  no other references existed to clean up.

**Verification:** `pnpm astro check` → 0 errors. Confirmed via rendered
HTML that body background is `#ffffff` on both `/` and `/about`.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

### 2026-09-22 — Restore Project card border/shadow visibility

User noticed the Project cards had lost their "card" look. Root cause:
the border color (`#E6E8F2`, from the user's own original spec several
turns back) computes to only 1.22:1 contrast against the Projects
section's white background — essentially invisible — and the box-shadow
was a subtle single 8%-opacity shadow. GitHub and Services cards get
away with a similarly faint border (`--midnight-lavender-border`,
~1.2–1.4:1 either way) because they sit on a tinted lavender-pale
section (some hue distinction) and each has a strong visual anchor of
its own (the chart image; the diamond badge overlapping the top edge) —
neither of which Project cards have, since their thumbnail fills flush
to the card edge with no gap and nothing overlaps the boundary.

First pass: darkened the border to `#A6B2DE` and added a dual shadow.
User then asked to use the GitHub/Services cards' border and shadow as
the guide instead of a one-off value, so reverted to
`border: 1px solid var(--midnight-lavender-border)` and the same single
`box-shadow: 0 12px 32px rgba(20,27,77,0.08)` they use — kept the 20px
border-radius, since that was the user's own original Projects-specific
choice (18px for GitHub/Services) and only border/shadow were named as
the guide. Flagging: this reintroduces a similarly faint border in
absolute terms, just now consistent with the other two card types
rather than uniquely weak — worth a visual check since Projects' white-
on-white section is the one case without a hue difference or content
anchor to help compensate.

Also noticed in passing (not fixed, not asked about): the Projects and
GitHub sections' order was swapped at some point outside this session's
edits, so the clouds divider's `toColor="var(--midnight-lavender-pale)"`
now lands on the white Projects section instead of GitHub, which could
produce a visible seam. Flagging only.

**Verification:** `pnpm astro check` → 0 errors both times. Confirmed
via rendered CSS that `.project-card` now matches the exact border/
shadow values used by `.github-chart-card`/`.service-card`.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

### 2026-09-22 — Fix Project card shadow being clipped invisible

User reloaded and the shadow still wasn't showing — a real rendering
bug my earlier CSS-text verification couldn't catch. `.project-card`
had `overflow: hidden` (needed so the thumbnail image/video's square
corners get clipped to match the card's rounded shape), but
`overflow: hidden` also clips a `box-shadow`, since a shadow paints
outside the border box by definition. The shadow property was correctly
set and winning the cascade (as verified), it was just being rendered
and then immediately clipped away by the same element's own overflow
rule. Neither `.service-card` nor `.github-chart-card` have this
problem since neither needs `overflow: hidden` at all.

Fixed by moving the corner-clipping responsibility down to
`.project-thumbnail` (which already had its own `overflow: hidden` for
the image/video's `object-fit: cover`) — added `border-radius: 20px
20px 0 0` there to match the card's top corners, and removed
`overflow: hidden` from `.project-card` entirely so its shadow can now
render outside the card unclipped.

**Verification:** `pnpm astro check` → 0 errors. Confirmed via rendered
CSS that `.project-card` no longer has `overflow: hidden` and
`.project-thumbnail` now carries it plus the matching top radius.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

## 2026-09-22 — Homepage section spacing and dark button styling

Two small visual-consistency passes on the landing page.

**Section spacing.** The homepage sections felt too airy, so `.section-py`
dropped from 100px to 72px top/bottom on desktop and 64px to 48px on
mobile — a more standard 4.5rem/3rem rhythm. `.skills-section`'s extra
bottom padding (which stacks on top of `.section-py` for clearance above
the hills divider) was scaled down proportionally, 230px to 180px desktop
and 140px to 110px mobile, so the divider keeps the same relative breathing
room rather than suddenly sitting closer to the skills grid.

**Dark button.** `.portfolio-button--view` was using a one-off flat navy
(`oklch(0.3 0.09 258)`) that predated the midnight palette and belonged to
no token, which is why it read as a slightly different theme from the
light `--code` button beside it. Repointed to `var(--midnight-navy)` and
added a 1.5px `--midnight-lavender` border. Initially bottom-only, then
widened to all four sides so the two buttons are now geometrically
identical — same 1.5px border box, padding, radius and font — and differ
only in color.

Considered and rejected: giving the dark button `--diamond-gradient` to
match the diamonds and process-step circles. The gradient's pale
`#8fa7ea` end would push white label text below AA contrast on an element
that small, and using the site's signature gradient on ordinary buttons
dilutes its role as the diamonds' distinguishing treatment. User chose
flat.

Also still outstanding from before: `.portfolio-button--view:hover` uses
`var(--navy-mid)` from the older pre-midnight palette rather than a
`--midnight-*` token. Left alone as out of scope.

**Bottom edge.** The 1.5px lavender border was applied and confirmed live
via devtools computed styles, but browsers round a 1.5px border down to a
1px hairline, so it read as no change at all. What the user actually
wanted was the raised bottom edge the hero's "See My Work" button has,
which is not a border but `.btn-primary`'s hard drop shadow
(`0 4px 0 #8f89ce`). Gave `.portfolio-button--view` the same lip plus a
matching `:active` press (`translateY(3px)` with the lip collapsed to
1px), so the 3D affordance actually responds when clicked rather than
being decorative. Softened the ambient shadow relative to
`.btn-primary`'s (`0 6px 14px rgba(20, 27, 77, 0.22)` vs
`0 8px 18px rgba(0,0,0,0.3)`) because this button sits on the pale
lavender section rather than the dark hero, where the heavier black
shadow would look muddy.

Note: this breaks the geometric parity with `.portfolio-button--code`
established above, since the dark button now carries a shadow lip the
light one does not. Flagged to the user as a tradeoff of matching the
hero button instead.

Debugging note for future reference: when a CSS change "doesn't show up",
check the computed border width before assuming a stale cache. Verified
source, dev-server response, rendered HTML class and production build all
carried the rule correctly — the change was live the whole time and the
sub-pixel rounding was the actual cause.

**Skills chips.** Added `justify-content: center` to `.skill-pills`. The
card headings already appeared centered because `#home` carries Tailwind's
`text-center` and `.heading-styling` is an inline-block that inherits it,
but `text-align` has no effect on flex item placement, so the chip rows
stayed left-aligned under centered headings. Setting `justify-content`
brings them in line with the rest of the card.

**Skills card cloud silhouette.** `CloudCap` only capped the top of each
skill card; the body below was a plain rounded rectangle. Continued the
cloud silhouette down both sides and around the bottom so the whole card
reads as one cloud.

Implemented as a CSS `mask` of three repeating radial-gradients (one per
scalloped edge) unioned with a linear-gradient covering the card's
interior, rather than as more SVG. The cap's SVG uses
`preserveAspectRatio="none"` and stretches with the card, which is fine
for a fixed-height strip but would distort circles into ellipses down a
variable-height side. Gradient bumps stay circular at any card height.

Geometry is derived from the cap's front white layer at desktop width so
the two read as the same cloud: a 45px circle sunk 33px behind the edge
clears a 61px-wide, 12px-deep roll. Bumps cut inward from the card box
instead of protruding outward, so the roll crests stay flush with the
cap's full-width edge above rather than the card growing 12px wider than
its own cap. The side masks are offset by `--cloud-span / -2` to put a
crest exactly at y=0, otherwise the card pinched inward immediately under
the cap and left a visible step at the junction.

Consequences handled: the `--capped` border was removed (a mask clips the
border into a broken partial outline), and `.portfolio-card`'s
`box-shadow` was swapped for equivalent `drop-shadow()` filters, since
box-shadow is drawn on the unmasked box and gets clipped while
`drop-shadow` follows the masked silhouette. Padding grew to
`28px 34px 32px` (and a mobile override at =<480px) because the bumps eat
12px off each scalloped edge and the previous 26px/24px would have left
text almost touching them.

Not done: the cap's two-tone effect (a `--midnight-lavender-mid` layer
peeking out behind the white one) stops at the top edge, so the sides and
bottom are white-only. Extending it would need a second masked layer
behind the card; flagged to the user rather than assumed.

**Process step badges.** The numbered circles carried
`--diamond-gradient` but not the offset lavender companion shape the
services diamonds have, so the two badge treatments didn't match. Added
`.process-step::after` reusing `.diamond-shadow-shape`'s exact values
(56px, 8px down-right offset, `--midnight-lavender`), differing only in
`border-radius: 999px` instead of the diamond's rotated square.

Put on `.process-step` rather than as a `::before` on the badge itself:
`.process-step__circle` is absolutely positioned with `z-index: 1`, which
makes it a stacking context, so a pseudo-element inside it could not paint
behind its own gradient background no matter the z-index. As a sibling
under the step's stacking context it sits cleanly between the white card
surface and the badge. Did not extract a shared class — the services
version lives in `DiamondBackgroundImages.astro`'s scoped styles and the
two differ in shape and positioning context, so a shared abstraction would
have been mostly overrides.

**Verification:** `pnpm astro check` → 0 errors. Confirmed the dev server
at :4321 serves the updated rule and that the rendered button carries
`portfolio-button--view`.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

## 2026-09-22 — Accessibility audit and high-severity fixes

Audited markup, ARIA, keyboard/focus, contrast and motion across the site,
then fixed the five high-severity findings. Medium and low findings were
reported but deliberately left for a follow-up.

**Duplicate `id="sidebar"`.** The id appeared three times on every page —
the mobile menu wrapper, the mobile nav inside it, and the desktop
sidebar. Invalid HTML, and `getElementById('sidebar')` in the toggle
script only resolved to the right element because that one happened to
come first in document order. Renamed to `mobile-menu` and `desktop-nav`,
dropped the unreferenced id on `MobileNav`, and added `aria-controls` to
the toggle button now that its target has a stable id.

**Broken skip link.** It pointed at `#home`, which only exists on the
homepage, so the skip link went nowhere on all six other pages (WCAG
2.4.1). Added `id="main-content" tabindex="-1"` to every page's `<main>`
and retargeted the link. The `tabindex` matters: without it browsers vary
in whether focus actually moves to the fragment target, so the link can
appear to do nothing for keyboard users even when the target exists.
Suppressed the global focus ring on that target since it is only ever
focused programmatically, never tabbed to.

**Missing nav landmark.** The primary sidebar navigation was a plain
`<div>`, while the only `<nav aria-label="Main">` on the page was the
social links bar — Radix's `NavigationMenu.Root` supplies that label by
default. So screen-reader users navigating by landmark were sent to the
social icons instead of the site nav. Made both `DesktopNav` and
`MobileNav` `<nav aria-label="Main">` and gave the social bar its own
label. Both main navs share the label, which is correct here: each is
`display: none` at the other's breakpoint, so only one is ever in the
accessibility tree. Also closed the Contact `<li>` in `DesktopNav`, which
was unterminated and left Blog and Torc nested inside it.

**Page blank without JS.** `.fade-in` and `.prose > *` defaulted to
`opacity: 0` and relied on an IntersectionObserver to add `.visible`, so a
blocked or failed script left every page visually empty. Gated both rules
behind a `.js` class set by an inline `<head>` script, so the hidden state
only ever applies when JS is running. Chose this over a `<noscript>`
style block because `<noscript>` does not help when JS is enabled but the
script errors or fails to load, which is the more common failure. Rule
order matters and was verified: `.js .fade-in` and `.fade-in.visible` have
equal specificity, so `.visible` must stay later in the file to win.

**Missing `<h1>`.** `/otherprojects` and `/torc` both started at `<h2>`.
Promoted each page's title to `<h1>`. On `/torc` the whole tree shifted up
one level (h2/h3/h4 to h1/h2/h3) so promoting the title did not leave a
gap. On `/otherprojects` the project card headings come from the shared
`Project.astro`, which is correctly `<h3>` under the homepage's "Latest
Projects" `<h2>`; parameterizing the level for one call site was more
churn than the benefit, so that page now skips h1 to h3. Noted as a
remaining low-severity item.

Medium findings were fixed in a follow-up pass, below.

**Alt text and input types.** Added the missing `alt` to `about.astro`'s
photo (matching the hero's "Janet Spellman") and a missing space before
its `src`. Contact email input was `type="text"`; now `type="email"`, so
mobile keyboards and native validation behave.

**Button border contrast.** `.portfolio-button--code`'s border was
`oklch(0.85 0.01 260)` — 1.58:1 against white, well under WCAG 1.4.11's
3:1 for UI boundaries, and it is the only thing defining that button's
shape. Solved for the lightest lightness that clears 3:1 and landed on
`oklch(0.65 0.01 260)` (~3.24:1), keeping the border as unobtrusive as the
requirement allows rather than reaching for a darker gray.

**Phone field description.** The visible "Format: 111-222-3333" hint was
not programmatically associated with the input, so a screen-reader user
hitting the `pattern` validation got a generic browser message with no
format given. Added `id`/`aria-describedby` and a `title` on the input.

**Form status and focus.** Submission errors used `alert()` and the
"Sending..." state was never announced. Added a `role="status"`
`aria-live="polite"` region; errors now write there and also take focus,
so the message is reachable however the live region is handled. Switched
the submit button from `disabled` to `aria-disabled` with a `submitting`
guard doing the actual double-submit prevention: disabling a focused
button moves focus to `<body>`, so a keyboard user loses their place
mid-submit. Styled `[aria-disabled="true"]` to match the existing
`:disabled` rule.

**Active nav state.** `.nav-link-active` conveyed the current page by
background color alone. Added `aria-current="page"` alongside it in both
`DesktopNav` and `MobileNav`.

**Video motion.** Project videos carried `autoplay loop` as markup
attributes, which take effect before any script can intervene — so a
reduced-motion user would see a flash of motion regardless. Moved both to
a script that sets them only when `prefers-reduced-motion` is not
`reduce`, and that re-applies on preference change. Dropped `autoplay`
from the markup entirely: if the script fails, the videos simply do not
autoplay, which is the safe direction. Also gave each `<video>` an
`aria-label` (a low-severity finding, folded in since the element was
being rewritten) — the `title` on `<source>` never surfaced anywhere.

Low findings were then cleared in a third pass.

**Nav toggle keyboard handling.** Added Escape-to-close that also returns
focus to the trigger, so a keyboard user is not stranded at the position
of a menu that no longer exists. Set the icon's `alt=""`: the button
already carries an `aria-label` that the script keeps in sync, so the
icon is decorative, and its own alt was both redundant and being swapped
to inconsistent casing ("Close SideBar" / "open menu") on every toggle.

**Honeypot.** `aria-hidden="true"` wrapped a focusable input, which ARIA
forbids. Removed it and kept the `visually-hidden` class and
`tabindex="-1"`. Chose this over `display: none`, which would also have
resolved the violation but defeats the honeypot's purpose, since the
naive bots it targets skip fields hidden that way. The label text is
self-explanatory when read aloud.

**Required asterisks.** Marked the three per-label `*` spans
`aria-hidden="true"` — `required` already conveys the state
programmatically, so they were duplicate announcements at every field.
Deliberately left the legend's asterisk readable: that sentence explains
the visual convention and is the one place the symbol carries meaning.

**Heading level on /otherprojects.** Rather than leave the h1-to-h3 skip,
gave `Project.astro` a `headingLevel` prop (default 3) rendered via a
dynamic tag, and passed 2 from `OlderProjects`, which is only used on that
page. The card titles sit under the homepage's "Latest Projects" `<h2>`
but under the page `<h1>` on /otherprojects, so the level genuinely
depends on context and could not be fixed in the component alone.
/otherprojects is now h1 + 7 h2s; the homepage is unchanged.

**Twinkle reduced-motion check.** Asked to make the star twinkle respect
`prefers-reduced-motion`; on inspection it already did, via a
`@media (prefers-reduced-motion: reduce) { .twinkle { animation: none } }`
that correctly wins the cascade. The stars set `animation-delay` and
`animation-duration` inline, but not `animation-name`, so the shorthand
reset in the media query still takes effect. Verified the override ships
in the served CSS and that no scoped style in `SectionDivider`, `Hero` or
`ContactSection` redefines it. Added `!important` anyway to match how the
`.fade-in` override is written: at equal specificity with inline longhands
already in play, any future inline or scoped `animation` would silently
restore the twinkle for users who asked for no motion.

**Verification:** `pnpm astro check` → 0 errors; `pnpm build` succeeds.
Confirmed against the running dev server that no page has duplicate ids,
that `id="main-content"` resolves on all seven pages, that the three nav
landmarks carry distinct and correct labels, that both previously
headless pages now expose exactly one `<h1>`, and that the `.js` flag
ships in the document head. After the low-severity pass, re-confirmed
heading counts on both project pages, the asterisk and honeypot markup,
and a clean `pnpm build`.

Diff: uncommitted on `hero-redesign` branch (not yet committed).

## 2026-09-23 — Contact section cat constellation

Added `src/components/landingpage/CatConstellation.astro`, a decorative
star-and-line constellation of a sitting cat with a curled tail, placed in the
empty space right of the contact form. Branch `contact-cat-constellation`.

**Key decisions:**
- Each star's position/size is on a wrapping `<g transform>`; the inner
  `<path>` only carries `.twinkle`. The keyframes animate CSS `transform`,
  which would otherwise replace the SVG transform attribute and throw stars
  off their vertices. `.cstar` sets `transform-box: fill-box` so each star
  scales about its own centre. Verified in Chromium: 0.000 viewBox-unit drift
  across animation samples.
- Reused the global `.twinkle` keyframes and its reduced-motion override
  (`animation: none !important`), so no new motion rule was needed.
- Sized against the Contact section with a container query
  (`container-type: inline-size` added to `.contact-section`) instead of
  `vw` media queries. The first version used `50vw`, but the desktop sidebar
  makes the section ~250px narrower than the viewport, so the SVG box
  overlapped the textarea by 19px at 1440px. Width formula:
  `clamp(160px, 50cqw - 320px, 270px)`, which keeps a 24px gap from the
  620px form column.
- Per review feedback, the cat shrinks (270px -> 160px) to stay beside the
  form rather than dropping below it as soon as full size stops fitting.
  Under a 960px section content width (about a 1420px viewport with the
  sidebar) it sits centred below the Send button at 144x180px.
- Existing contact sparkles left in place; nearest is >= 74px from the cat at
  every tested width (375-1920px).

**Noted, not fixed:** the homepage already has a 1px horizontal overflow at
375px wide (present with the cat hidden too).

**Follow-ups (same day):**
- Beside-form placement now centres the cat vertically in the section
  (`top: 50%` + `translateY(-50%)`) instead of pinning it 48px from the
  bottom.
- Clicking the cat shows "Meow!" beside its head for 1.8s. This deviates from
  the original spec's `aria-hidden` / `pointer-events: none`: a click target
  has to be reachable by keyboard, so the SVG is wrapped in a real `<button>`
  ("Pet the constellation cat"). The SVG itself stays `aria-hidden`, and
  "Meow!" is written into a `role="status"` live region so screen readers
  announce it; it is emptied again once it fades. The label sits in empty
  space inside the cat's own box, so it can't reach the form. With reduced
  motion it simply appears, with no pop/fade.
- The focus ring shows for keyboard focus only (`:focus:not(:focus-visible)`
  override for `.cat-button`). The shared `#contact button:focus` rule still
  shows the ring on mouse click for the Send button; left as is.

## 2026-09-23 — Constellation sidebar nav and hero fixes

Restyled the sidebar nav as a "constellation" (star nodes joined by a faint
dotted line) and fixed three hero/top-bar issues, on branch
`sidebar-constellation`.

**What and why:** Nav items are now left-aligned four-point stars (same path
as the hero sparkles) on a single dotted vertical line. The current page gets
a larger twinkling star plus a soft pill and `aria-current="page"`. "Join Torc"
is two lines ("Free tech community" caption). Desktop has 4 decorative
background sparkles; the mobile drawer uses the same layout without them.
Hero fixes: sparkles no longer touch text, the last social icon is no longer
clipped, and the top bar has breathing room above the Contact button.

**Key decisions:**
- New shared `navigation/ConstellationNav.astro` used by both DesktopNav and
  MobileNav. The two lists had drifted (different labels, and MobileNav used
  a misspelled `font-Ayaka` class); the drawer now uses the Akaya script font
  as chosen.
- Line geometry is CSS custom properties (`--pitch`, `--line-x`, `--count`),
  so the `::before` line starts and ends exactly at the first and last star
  centers with no JS. Verified in a browser: all star centers at x=35, line
  ends at first/last star centers.
- Stars are positioned with top/left offsets, not `translate`, because the
  `.twinkle` keyframes overwrite `transform`. Hover scale is excluded from the
  active star for the same reason.
- Font sizes stay on the wrappers (`text-xl xl:text-2xl` desktop, `text-lg`
  mobile) so the existing nav font is unchanged.
- Hero sparkles moved into the empty corners around the portrait; the one
  above the headline moved up to -52px.
- Header gets `relative pt-5 pr-8`; social list wraps (`flex-wrap`) with
  tighter icon margins on narrow screens. Mobile drawer now uses `top-full`
  so it follows the taller header.

**Verified:** `astro check` clean (0 errors; existing hints only). Headless
Chromium at 375/768/1440px: no horizontal scroll, all 6 icons fully visible
(32px from the right edge), Contact top at 29px. Not verified: hover/focus
ring visuals and prefers-reduced-motion in a live browser (reduced-motion
relies on the existing `.twinkle` rule in globals.css).

**Left alone:** `#mobile-menu` still has a stray `bg-yellow-300` class (hidden
behind the nav background); unrelated uncommitted `ContactSection.astro`,
`CatConstellation.astro` and a `globals.css` container-type line were not
touched or committed.

**Follow-up (same day): homepage scroll-spy.** Clicking Services/Process/etc.
kept "Home" highlighted because the active state was decided server-side from
the pathname, and every homepage section shares `/`. `ConstellationNav.astro`
now has a small scroll listener (homepage only) that marks the section
nearest the top 35% of the viewport as current (Home above Projects, Contact
at page bottom) and toggles `aria-current`, the big star and the pill. Chose a
scroll-position check over IntersectionObserver because `#home` wraps the
whole page and the sections are uneven heights. Verified in Chromium by
clicking each link.
