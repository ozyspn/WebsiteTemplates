# SIRM Tech — Software Company Landing Page

A self-contained, single-page marketing site for SIRM Tech, a fictional
enterprise software engineering company. Built with the `design-taste-frontend`
skill: plain **HTML + CSS + vanilla JS**, no build step, no framework, matching
this repo's existing template convention.

**Design read:** B2B SaaS landing page for enterprise technical buyers (CTOs,
VPs of Engineering), dark-tech premium language, native CSS with restrained
motion. Dials: `VARIANCE 7 / MOTION 6 / DENSITY 4`.

## Run it

It's static — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

One page, eight content sections, each a distinct layout family (no two
sections share a layout pattern): asymmetric-split hero, integration logo
row, an asymmetric bento grid of capabilities, a full-width case study, a
numbered process timeline, a metrics strip, a centered testimonial, and a
closing CTA band with a working email-capture form (client-side only, no
backend).

- **`index.html`** — all markup.
- **`styles.css`** — design tokens (light/dark, both implemented and tested)
  and components. Corner-radius system: pill buttons, 20px cards, 12px
  inputs. Single accent color used identically across the whole page.
- **`app.js`** — theme toggle (persisted, respects `prefers-color-scheme`),
  mobile nav drawer, scroll-reveal via `IntersectionObserver` (no scroll
  listeners), and the contact form's submit → confirmation cycle. All
  `.reveal` animation is scoped under a `.js` class added at runtime, so the
  page degrades to fully visible, unanimated content with JS disabled.
- **`image-slot.js`** — the `<image-slot>` placeholder component (copied
  from the repo root) for drop-in client photography.

## Filling in photos

No image-generation tool was available in this environment, and stock photo
seeds (Picsum) can't be targeted by subject, so real photography was left as
labeled `<image-slot>` placeholders rather than shipping mismatched stock
images:

- **Case study image** (`#case-study-hero`) — a real photo of the
  engineering/incident-response work described in the case study.
- **Testimonial portrait** (`#testimonial-portrait`) — a photo of the
  quoted person (Priya Raman).

Give a slot a `src` attribute (e.g. `<image-slot id="case-study-hero" src="photos/case-study.jpg">`)
or drop a file onto it where the editing runtime is available.

Everything else — the integration logos (Kubernetes, Terraform, PostgreSQL,
GitHub, Docker, Datadog) and the hero's abstract signal/topology graphic —
is real, already-shipped SVG (Simple Icons brand marks and a hand-built
abstract diagram respectively), not placeholders.

## Type & color

- **Display:** Space Grotesk · **Body:** Plus Jakarta Sans · **Mono:** JetBrains Mono
  (all self-hosted as variable `woff2` files under `fonts/`, no Google Fonts
  runtime requests)
- **Dark (default):** ink `#0B0C0E`, surface `#131519`, text `#F2F1ED`, accent `#FF6A39`
- **Light:** paper `#F5F4F1`, surface `#FDFCFA`, text `#16181C`, accent `#C2410C`
- Icons: Phosphor (regular weight), self-hosted under `icons/`, inlined as SVG.
