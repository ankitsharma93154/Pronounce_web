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

## Notes on Documentation

Documenting in README is good for:

- quick setup
- architecture overview
- recent notable changes

For long-term maintainability, keep README concise and move deep details to docs files, for example:

- docs/architecture.md
- docs/changelog.md
- docs/analytics.md
