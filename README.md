# QuickPronounce

QuickPronounce is a React-based pronunciation tool where users can search words, listen to audio pronunciation, view IPA and meanings, compare accents, and practice with related features like Word of the Day and common mispronunciations.

## Run Locally

Prerequisites

- Node.js 18 or newer
- npm

Commands

- npm install
- npm start
- npm run build

Development app URL

- http://localhost:3000

## Production

- Hosted on Vercel
- Frontend serves static assets and calls backend pronunciation API

## Project Updates (2026-04-01)

### New Feature

- Added Support page and support banner flow.

### Performance and Request Optimization

- Added reusable debounce hook for controlled request triggering.
- Added in-flight request cancellation via AbortController.
- Added persistent client cache using localStorage-backed cache hook.
- Added normalized duplicate-query guard to skip redundant requests.
- Added lightweight client-side rate limiting for burst protection.
- Improved repeated Pronounce behavior to replay cached results and audio.
- Limited suggestion dropdown to 3 results.
- Added Umami event pronunciation_cache_lookup for cache hit tracking.

### Cache and Analytics Tuning (latest)

- Increased pronunciation cache capacity from 40 to 100 entries to improve repeat-query hit retention.
- Extended pronunciation_cache_lookup analytics with gender dimension (male/female) for better behavior segmentation.
- Evaluated lazy preload list strategy and intentionally did not keep it to avoid extra background edge/API requests.

### Verification

- Production build completed successfully.

## Project Updates (2026-04-12)

### Ad Strategy Refactor

- Standardized ad rendering through a single slot renderer component.
- Kept desktop side rails as 120x600 only for wide screens (>=1300px).
- Preserved footer-intersection logic so side rails hide before footer overlap.

### Format and Breakpoint Changes

- Removed low-performing formats from usage: 468x60 and 250x250.
- Top banner policy is now:
  - Desktop: 728x90
  - Tablet: hidden
  - Mobile: 300x100
- Rectangle policy is now:
  - Primary: 300x250
  - Optional large desktop: 336x280

### Placement Updates

- Home page:
  - Mobile 300x100 moved before phonetics/results section.
  - Added mobile 300x250 after results/phonetics section.
  - Kept desktop/tablet 728x90 before examples section (tablet hidden by new policy).
- Blog pages (American vs British, IPA Guide):
  - Added mobile 300x250 after the first major content block.
  - Kept in-content rectangle slot for >=768 with 300x250 primary and 336x280 on large desktop.

### Footer Ad Change

- Disabled global footer ad placement in app shell for cleaner layout and stronger in-content visibility.

### UI/Layout Consistency

- Features section content container now uses max-width 64rem.
- Features title was updated to two lines using a single heading element with tight line spacing.

### Verification

- `npm run build` completed successfully after the full ad refactor.

## Notes on Documentation

Documenting in README is good for:

- quick setup
- architecture overview
- recent notable changes

For long-term maintainability, keep README concise and move deep details to docs files, for example:

- docs/architecture.md
- docs/changelog.md
- docs/analytics.md
