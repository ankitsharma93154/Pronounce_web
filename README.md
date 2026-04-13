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

## Project Updates (2026-04-13)

### Home Ad Placement Updates

- Added a query-gated top leaderboard on Home that appears below the header only after a successful pronunciation query.
- Added an always-visible leaderboard above the Word of the Day section.
- Replaced the larger-screen rectangle slot below the "Get the Most Out of QuickPronounce" tips block with a desktop leaderboard.
- Kept the mobile results rectangle placement after results for small screens.

### Support CTA Update

- Removed the previous popup/cooldown support-banner behavior from Home.
- Moved support messaging into the results flow below meanings in the phonetic/results area.
- Converted support messaging to a single inline CTA line with a heart icon and a compact "Support" button.
- Updated responsive styling to avoid small-screen line-break/layout issues.

### Verification

- JSX/CSS diagnostics report no errors in updated Home and support CTA files.

### Ad Performance Optimization Update

- Added near-viewport lazy activation for ad slots using IntersectionObserver to reduce initial render pressure.
- Deferred ad banner execution until browser idle (with fallback timeout) and after page load to improve early interactivity.
- Improved layout-shift prevention by reserving slot dimensions and strengthening leaderboard/mobile rectangle min-heights.
- Reduced ad rerender churn on Home by memoizing ad node creation with dependency-safe `useMemo` blocks.
- Added Web Vitals tagging by ad state (`ads-active` vs `ads-inactive`) and ad slot count for performance analysis.
- Added local budget warnings for key vitals (CLS, FID, LCP) to surface regressions quickly.

### Verification

- `npm run build` completed successfully after the ad performance optimization pass.

### Static SEO Keyword Optimization Update (latest)

- Kept homepage SEO broad and static (no query-driven dynamic SEO blocks).
- Upgraded weak phrasing to higher-intent wording in crawlable blog pages and blog hub cards.
- Preserved existing ranking intent around pronunciation, IPA, audio, accents, and word-level practice.

Primary keyword themes added/upgraded:

- how to pronounce words
- how to pronounce words correctly in English
- word pronunciation audio
- pronunciation in English
- correct pronunciation
- how to read IPA for English pronunciation
- American vs British pronunciation audio
- silent letters pronunciation rules
- IELTS speaking pronunciation
- connected speech pronunciation
- English word stress rules
- minimal pairs pronunciation training
- schwa sound pronunciation
- /ðə/ vs /ðiː/ pronunciation rule
- -ed endings pronunciation (/t/, /d/, /id/)

Pages updated in this SEO rollout:

- Home (`src/pages/Home.js`) with static broad metadata and refined on-page intent copy
- Blog hub (`src/pages/blog/Blogposts.js`) for title/description consistency
- Dedicated blog pages for pronunciation guide, pronunciation tips, American vs British, IPA guide, IELTS, connected speech, -ed endings, minimal pairs, schwa, word stress, the vs thee, and silent letters

### Verification

- `npm run build` completed successfully after the static SEO optimization pass.

## Project Updates (2026-04-13 - current)

### Homepage UI Polish

- Refined the main pronunciation input with cleaner spacing, a clearer primary action, and a more polished card treatment.
- Kept the existing ad placements intact while making the homepage feel less cramped on desktop and mobile.
- Fixed the mobile layout so the empty-state pronunciation prompt no longer gets clipped on small screens.

### Console Error Fix

- Updated the web-vitals integration to the current API so the `getCLS is not a function` runtime error no longer appears.

### Verification

- Updated the relevant source files and validated the edited files with no reported errors.

## Notes on Documentation

Documenting in README is good for:

- quick setup
- architecture overview
- recent notable changes

For long-term maintainability, keep README concise and move deep details to docs files, for example:

- docs/architecture.md
- docs/changelog.md
- docs/analytics.md

## Project Updates (2026-04-13 - ad presentation polish)

### Ad Container Integration Pass

- Added a reusable ad presentation wrapper component to standardize ad UI treatment across Home and blog placements.
- Added a dedicated ad stylesheet and moved ad-specific presentational rules out of the global stylesheet.
- Kept existing ad rendering logic and zone behavior unchanged while improving visual consistency.

### Label and Spacing Refinement

- Updated ad disclosure text from "Sponsored" to "Ad" for a cleaner, lower-friction label.
- Tightened ad wrapper spacing and internal padding to better match the card rhythm of the main UI.
- Reduced desktop top margin for the top post-query Home ad block so it sits more naturally within the flow.
- Adjusted label spacing so the label remains visible without covering ad content.

### Verification

- Updated files were checked with JSX/CSS diagnostics and reported no errors.
