# Hero video

The homepage hero (`src/components/home/ScrollVideoHero.tsx`) scroll-scrubs a
video: as you scroll past the hero, the video's playback position tracks your
scroll (Apple-style).

## To activate it

Drop a file named **`hero.mp4`** into this `public/` folder.

- Recommended: 5–10 seconds, 1920×1080 or smaller, H.264, **no audio track**
  (the video is muted anyway), heavily compressed. Short clips scrub smoothly;
  long/large files feel laggy.
- Optional: replace `hero-poster.svg` with a `hero-poster.jpg` first frame and
  update the `poster` prop in `ScrollVideoHero.tsx`.

## Fallbacks (no action needed)

- **No `hero.mp4` present** → the hero renders as a static navy hero with the
  poster background. Everything still works.
- **`prefers-reduced-motion`** → scrubbing is disabled; the hero stays static.
