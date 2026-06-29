# Jacob Morales — Wedding Photography Site

A self-contained static website for a documentary wedding photographer,
implemented from the Claude Design handoff (`Jacob Morales - Site.dc.html`).

The original design was a single-page prototype built on Claude Design's
canvas runtime (`x-dc` / `sc-if` / `DCLogic`). This implementation recreates
it pixel-for-pixel as a plain **HTML + CSS + vanilla JS** site with no build
step and no framework.

## Run it

It's static — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Pages

A hash router (`app.js`) swaps between six views; links are deep-linkable and
the browser back/forward buttons work:

| Route        | View                                            |
|--------------|-------------------------------------------------|
| `#/home`     | Hero, selected stories, manifesto, services, testimonial |
| `#/work`     | Filterable portfolio gallery                     |
| `#/story`    | A single wedding story (Lena & Theo)             |
| `#/about`    | Bio, stats, and the booking process              |
| `#/pricing`  | Three collections + add-ons                      |
| `#/contact`  | Inquiry form with a confirmation state           |

## Files

- **`index.html`** — all markup and styling (styles are inline, matching the
  design source, with a small responsive layer the desktop mockup lacked).
- **`app.js`** — the router that replaces the design's `DCLogic` state machine:
  page state via the URL hash, nav active-state, contact form → confirmation,
  scroll-to-top on navigate.
- **`image-slot.js`** — the `<image-slot>` web component from the design bundle.
  Photo placeholders render as captioned drop-zones; in an editing runtime you
  can drag a photo onto any slot to fill it.

## Filling in photos

Every photo position is an `<image-slot>` with a unique `id`. To use real
images, give a slot a `src` (e.g. `<image-slot id="home-hero" src="photos/hero.jpg" ...>`)
or drop a file onto it where the editing runtime is available.

## Type & color

- **Display:** Syne · **Body:** Hanken Grotesk · **Mono/labels:** Space Mono (Google Fonts)
- **Palette:** bone `#ECEAE3`, stone `#E4E6E1`, ink `#17191E`, teal `#2E5E6E`, clay `#C0693F`
