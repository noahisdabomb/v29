# noahisdabomb v28 — Expert Panel Review

> 6-expert review conducted April 7, 2026. Synthesized findings from: Senior UX/UI Lead, Senior WebGL Engineer, Senior Motion Designer, Dooley Tombras (Advertising), Rodd Chant (Creative Direction), Senior Developer.

---

## Executive Summary

The site is a genuinely impressive piece of creative engineering — the 3D work, scroll choreography, and design system are best-in-class for a freelance portfolio. But the site is built as an experience first and a conversion funnel second. The CycleSection (780vh of scroll narrative) buries the proof section (case studies) behind ~40 scroll gestures. Enterprise buyers scanning between meetings won't get there.

**Top 3 structural issues:**
1. No CTA in persistent navigation (every competitor has this)
2. CycleSection length delays proof by 780vh of scroll
3. Concierge API has zero rate limiting (cost/security vulnerability)

**Findings:** 8 P0, 14 P1, 18 P2, 12 P3

---

## P0 — Ship Blockers

These must be fixed before any public launch.

### P0-1. No Rate Limiting on Concierge API
**Reviewers:** Dev, UX
**File:** `src/app/api/concierge/route.ts`
**Issue:** The `/api/concierge` endpoint has zero rate limiting, no authentication, and no session validation. Any visitor (or bot) can POST unlimited requests, consuming OpenAI API credits. The system prompt also contains full case study data, trust brand lists, and site settings — prompt injection could exfiltrate business intelligence.
**Impact:** Financial (unbounded API costs), security (data exfiltration), operational (API abuse)
**Fix:**
- Add IP-based rate limiting (e.g., Vercel KV + sliding window: 10 req/min per IP)
- Strip business-sensitive data from the system prompt or move it to a retrieval layer
- Add CSRF token validation
- Consider requiring a session cookie or lightweight proof-of-engagement
**Effort:** Medium

### P0-2. No CTA in Persistent Navigation
**Reviewers:** Dooley Tombras, UX
**File:** `src/components/layout/Nav.tsx`
**Issue:** The nav shows Logo (left) and MENU (right). No "Book a Call" button anywhere in persistent navigation. This is the single most reliable conversion mechanism on any service website — its absence means visitors at peak interest must scroll to the bottom or navigate to Contact.
**Impact:** Conversion rate reduction across all paths
**Fix:** Add a persistent "Book a Call" magenta button to the right side of the nav bar, visible on all pages at all scroll depths. On mobile, it can be a smaller icon-button or appear in the mobile menu.
**Effort:** Small

### P0-3. CycleSection Length Is a Conversion Killer
**Reviewers:** Dooley Tombras, Rodd Chant, UX, Animation
**File:** `src/components/sections/CycleSection.tsx:697` (`cycleScrollDistance: 7.8`)
**Issue:** 780vh of scroll-driven narrative before case studies appear. Enterprise marketing directors evaluating 20+ vendor portfolios quarterly won't scroll through 40+ gestures of timezone storytelling before seeing work. The irony: a site promising "your work gets done while you sleep" asks visitors to stay awake through 40 scroll gestures before showing them the work.
**Impact:** Estimated 60-80% drop-off before reaching WorkSection
**Fix (three options, increasing boldness):**
1. Compress to ~300vh max — cut log intro, simplify handoff, collapse laptop sequence
2. Make it skippable — add a persistent "Skip to Work" affordance after 2s of scrolling
3. Move WorkSection directly after CredibilityGrid; relocate CycleSection below as "how it works"
Option 3 is the enterprise-correct AIDA order: Attention → Interest (trust+proof) → Desire (model+testimonials) → Action
**Effort:** Large

### P0-4. Hero StatusDot References Undefined Keyframe
**Reviewers:** Animation, Dev
**File:** `src/components/sections/Hero.tsx:50`
**Issue:** StatusDot uses `@keyframes ping` but only `@keyframes ping-limited` is defined in `globals.css`. The animation silently fails — the availability indicator doesn't pulse.
**Impact:** Broken visual indicator (minor visual, but signals lack of polish)
**Fix:** Change animation reference from `ping` to `ping-limited`, or define `@keyframes ping`
**Effort:** Small

### P0-5. Per-Frame `filter: blur()` Causes Scroll Jank
**Reviewers:** Animation, WebGL
**Files:** `src/stores/scrollStore.ts:135-139`, `src/components/sections/CycleSection.tsx:89-91`
**Issue:** `phaseTransform` applies `filter: blur(Npx)` that is scrubbed per-frame during phase transitions. `filter: blur()` forces a compositor repaint on every scroll frame — it cannot be GPU-composited like `transform` and `opacity`. The blur values (7px enter, 3.5px exit) are imperceptible at scroll speed.
**Impact:** Scroll jank on mid-range GPUs, dropped frames during CycleSection
**Fix:** Remove `filter: blur()` from the scroll-driven pipeline entirely. If blur is needed, apply it as a discrete CSS transition at phase boundaries (not per-frame scrub).
**Effort:** Small

### P0-6. Vector3/Color Allocations Inside useFrame
**Reviewers:** WebGL, Dev
**File:** `src/components/three/OvernightScene.tsx:36-42`
**Issue:** `new THREE.Vector3()` and `new THREE.Color()` are allocated inside `useFrame` callbacks, creating garbage collection pressure at 60fps. These should be allocated once and reused.
**Impact:** GC pauses causing frame drops, especially on mobile
**Fix:** Move allocations to module scope or `useMemo`. Use `.set()` methods to update existing instances in the render loop.
**Effort:** Small

### P0-7. Concierge Model ID May Be Invalid
**Reviewers:** Dev
**File:** `src/app/api/concierge/route.ts` (model reference)
**Issue:** The route references `gpt-5.4-mini` as the OpenAI model. This model ID needs verification — if invalid, the concierge is completely broken in production.
**Impact:** Concierge non-functional if model ID is wrong
**Fix:** Verify model ID against OpenAI API. If invalid, use `gpt-4o-mini` or current equivalent.
**Effort:** Small

### P0-8. Highest-Intent Visitors Hit Most Friction
**Reviewers:** Dooley Tombras, UX
**File:** `src/app/(site)/page.tsx` (homepage composition order)
**Issue:** The proof-driven path (Hero → Work → Case Study → Contact) is the most valuable conversion path, but visitors who click "See the Work" bypass the CredibilityGrid entirely. Those who scroll must traverse 780vh before seeing work. No intermediate CTAs exist between hero and contact section.
**Impact:** Most qualified prospects face the most friction
**Fix:** Add contextual CTAs after WorkSection, after each case study, and at end of CycleSection. Case study data already has `cta` fields defined — verify they render prominently.
**Effort:** Small-Medium

---

## P1 — Critical

Significantly degrades experience or effectiveness. Fix in current sprint.

### P1-1. LaptopModel FBX Processing Lacks Material/Geometry Disposal
**Reviewers:** WebGL, Dev
**File:** `src/components/three/LaptopModel.tsx:128-279`
**Issue:** The FBX processing `useEffect` has `[fbx]` dependency. When it runs, it clones models and converts materials via `buildLaptopMaterial()`, but the cleanup function does NOT dispose the cloned model's geometries or materials. Canvas/texture cleanup exists separately, but the FBX resource chain leaks.
**Impact:** Memory leak on component remount, grows with route navigation
**Fix:** Add comprehensive disposal in the useEffect cleanup: iterate all meshes, dispose geometries, dispose materials, dispose textures.
**Effort:** Medium

### P1-2. 60MB+ 3D Texture Payload (Clock Model)
**Reviewers:** WebGL
**File:** `public/models/flip-clock/textures/`
**Issue:** ClockModelPolish loads 5x 4K textures totaling ~60MB, including a 47MB normal map. This is the single largest payload on the homepage and will cause multi-second load delays on typical connections.
**Impact:** LCP degradation, data usage on mobile, slow initial load
**Fix:** Compress textures to 2K resolution, use KTX2/Basis Universal format (lossy, ~90% size reduction). The 47MB normal map should be max 2-3MB compressed.
**Effort:** Medium

### P1-3. `will-change` Permanently Applied to All Phase Layers
**Reviewers:** Animation
**File:** `src/components/sections/CycleSection.tsx:93-94`
**Issue:** `will-change: 'opacity, transform, filter'` is permanently applied to all PhaseLayer elements while visible, creating 7+ promoted compositor layers simultaneously. This consumes GPU memory and can cause compositing overhead.
**Impact:** GPU memory pressure, especially on mobile
**Fix:** Make `will-change` conditional: only apply when `opacity > 0.01 && opacity < 0.99` (actively transitioning). Remove it when fully visible or hidden.
**Effort:** Small

### P1-4. Triple Positioning Creates Identity Confusion
**Reviewers:** Dooley Tombras, Rodd Chant
**File:** `src/lib/content.ts` (hero, advantage, scale sections)
**Issue:** The site simultaneously pitches four identities: boutique strategist ("one creative director"), full-service executor ("strategy to final files"), overnight production house ("campaign by morning"), and scalable team ("one person is the default, not the limit"). Enterprise CMOs need to classify vendors quickly.
**Impact:** Buyers unable to categorize = tabled decisions; risk of being classified as production vendor rather than strategic partner
**Fix:** Lead with one identity: "senior creative director, strategy through delivery." Position overnight advantage and team scaling as supporting evidence, not co-equal claims. The line "I didn't leave agencies because I was tired of the work. I left to do more of it." is the strongest positioning statement on the site — work it harder, earlier.
**Effort:** Medium (copy rewrite)

### P1-5. "Start a Project" CTA Is Over-Committed
**Reviewers:** Dooley Tombras
**File:** `src/components/sections/Hero.tsx` (CTA button)
**Issue:** "Start a Project" implies the visitor has already decided to hire. On first visits (majority of traffic), this is premature. The contact section uses better language: "Schedule a Conversation." The mismatch creates cognitive friction.
**Impact:** Lower click-through on primary CTA
**Fix:** Change hero CTA to "Book a Strategy Call" or "Let's Talk." Reserve "Start a Project" for deep funnel pages.
**Effort:** Small

### P1-6. One Testimonial Is Insufficient for Enterprise
**Reviewers:** Dooley Tombras, UX
**File:** `src/lib/content.ts`
**Issue:** Three testimonials total across the entire site, one anonymized under NDA ("National brand (NDA)"). Enterprise procurement expects 3-5 on the homepage alone. The Dooley Tombras quote ($3.75B impressions) is the strongest but is used as a "closing" testimonial, not a lead trust signal.
**Impact:** Insufficient social proof for six-figure engagement decisions
**Fix:**
- Move Dooley Tombras quote to appear within or right after CredibilityGrid
- Add 3-5 more testimonials from client-side marketing leaders (not just agency partners)
- Replace "National brand (NDA)" with "Marketing Director, Fortune 100 CPG brand"
**Effort:** Medium (content sourcing)

### P1-7. Color Contrast Failures (WCAG AA)
**Reviewers:** UX
**File:** `src/app/globals.css` (CSS custom properties)
**Issue:**
- `--text-secondary: #9A938A` on `--bg-deep: #0E0C0A` — contrast ratio ~4.2:1, FAILS AA for normal text (requires 4.5:1)
- `--text-tertiary: #706A62` on `--bg-deep: #0E0C0A` — contrast ratio ~3.1:1, FAILS AA
- `--text-faint: #8A847C` or `#555` — FAILS AA
- Text during CycleSection dawn phase (#52201a background) — cream text contrast may dip below AA
**Impact:** Users with low vision, all users in bright ambient light
**WCAG:** 1.4.3 Contrast (Minimum)
**Fix:** Bump `--text-secondary` to `#A8A19A` or lighter. Bump `--text-tertiary` to `#8A847C` minimum. Test all text/background combinations during CycleSection color transitions.
**Effort:** Small

### P1-8. PhoneModel Material Cloning Duplication
**Reviewers:** WebGL
**File:** `src/components/three/PhoneModel.tsx`
**Issue:** Materials are cloned per-mesh, creating duplicate material instances. Partial disposal on unmount — screen geometry and glass geometry are cleaned up, but cloned model materials may not be.
**Impact:** GPU memory waste, potential leak
**Fix:** Share materials across meshes where possible. Ensure all cloned materials are tracked and disposed on unmount.
**Effort:** Medium

### P1-9. 780vh Scroll Persists Under Reduced Motion
**Reviewers:** Animation, UX
**File:** `src/hooks/useLenis.ts:22-23`
**Issue:** When Lenis is disabled for reduced motion users, the 780vh scroll distance remains unchanged but without momentum smoothing. This requires 40+ raw scroll gestures with no smooth inertia — an exhausting experience for users who need reduced motion.
**Impact:** Accessibility users, users with motor impairments
**WCAG:** 2.3.3 Animation from Interactions
**Fix:** Under reduced motion, collapse the CycleSection to a condensed layout (stacked phases, no scroll orchestration) or reduce scroll distance to ~200vh.
**Effort:** Medium

### P1-10. Dead Test Page in Production
**Reviewers:** Dev
**File:** `src/app/clock-test/page.tsx`
**Issue:** A development test page is deployed to production, accessible at `/clock-test`.
**Impact:** Unprofessional if discovered, potential information disclosure
**Fix:** Delete the page or add it to a route group excluded from production builds.
**Effort:** Small

### P1-11. Case Studies Have Inconsistent Outcome Metrics
**Reviewers:** Dooley Tombras
**File:** `src/lib/content.ts` (case study data)
**Issue:** Three case studies have strong outcome metrics (Orangetheory: 3.75B impressions, Delta: 98% sentiment, Visit Lauderdale: 152% visitation lift). Three have only activity/scale metrics (Coca-Cola: 5 platforms, Toyota: 3 vehicle lines, Visit the USA: 100+ assets). Enterprise buyers weight outcomes heavily.
**Impact:** Weakens the strong case studies by association
**Fix:** For studies without outcome metrics, add qualitative outcome statements. Frame strategic thinking as the outcome if numbers don't exist.
**Effort:** Medium (content)

### P1-12. The Subline Undermines the Headline
**Reviewers:** Dooley Tombras, Rodd Chant
**File:** `src/lib/content.ts` (hero subline)
**Issue:** Hero headline is genuinely arresting: "IT'S TOMORROW HERE. YOUR WORK IS ALREADY STARTED." But the subline tries to do three jobs: establish model, promise speed, claim scope. "Campaign by morning" risks commoditizing strategic judgment. Speed sounds like Fiverr; judgment sounds like a partner.
**Impact:** Undermines premium positioning
**Fix:** Rewrite subline to lead with quality of thinking. Let speed be discovered through the CycleSection. Example: *"One creative director. The strategy, the vision, the final files — all held by one person, 12 hours ahead of you."*
**Effort:** Small (copy)

### P1-13. FBX Format for MacBook Model
**Reviewers:** WebGL
**File:** `public/models/macbook_m3_14/`
**Issue:** The MacBook uses FBX format, requiring the Three.js `FBXLoader` (additional ~50KB). FBX is a poor web format — larger files, slower parsing, less compression than GLB. All other models use GLB.
**Impact:** Extra bundle size, slower model loading
**Fix:** Convert to GLB using Blender or gltf-pipeline. Remove FBXLoader dependency.
**Effort:** Medium

### P1-14. Loader Only Renders on Vercel Production
**Reviewers:** Dev, Animation
**File:** `src/components/layout/Loader.tsx`
**Issue:** The CMYK glitch loader checks `process.env.VERCEL === '1'` and only renders in Vercel deployments. Non-Vercel deployments (preview, staging, local) show no loading state. The loader also has 10 infinite CSS animations — verify it fully unmounts after load.
**Impact:** Inconsistent experience across environments; potential animation leak if not unmounted
**Fix:** Use a more universal loading detection. Verify the loader component unmounts completely (remove from DOM, not just opacity:0).
**Effort:** Small

---

## P2 — Important

Noticeable quality gap. Plan for next sprint.

### P2-1. Concierge Personality Too Aggressive for Enterprise
**Reviewers:** Dooley Tombras, Rodd Chant
**File:** `src/app/api/concierge/route.ts` (system prompt, idle messages)
**Issue:** Idle messages include: "Every second you wait, a brief dies alone in someone's inbox" and "Your competitors already booked the call." The urgency/pressure language is off-putting for enterprise buyers. The helpful guidance is excellent but undermined by the personality wrapper.
**Impact:** Brand perception risk with enterprise audiences
**Fix:** Keep dry self-awareness, remove urgency/pressure idle messages. The humor should be confident, not needy.
**Effort:** Small

### P2-2. Strategic Depth Buried in Case Study Detail Pages
**Reviewers:** Dooley Tombras, Rodd Chant
**File:** `src/lib/content.ts` (case study copy)
**Issue:** The best strategic thinking (Orangetheory "permission" insight, Gila River "out-casino" reframe) only appears on case study detail pages requiring multiple clicks. The homepage scroll presents Noah as a production machine rather than a strategic thinker.
**Impact:** Visitors who don't click into case studies miss the strongest selling point
**Fix:** Surface 1-2 strategic pull quotes earlier in homepage scroll, before or alongside the CycleSection.
**Effort:** Small

### P2-3. 15-Year Tenure Underleveraged
**Reviewers:** Dooley Tombras
**File:** `src/lib/content.ts`
**Issue:** "15 years" appears in meta description, Advantage section, footer, CredibilityGrid stats, and marquee — but never in the hero. This is the most reassuring fact for enterprise buyers evaluating a freelancer.
**Impact:** Missing trust signal at highest-attention moment
**Fix:** Work tenure into hero orbit. The status bar could show agency lineage: "15 years at Tombras, Digitas, SPARK."
**Effort:** Small

### P2-4. Cal.com External Redirect Drop-Off
**Reviewers:** Dooley Tombras, UX
**File:** All CTA links
**Issue:** All primary CTAs open Cal.com in a new tab, breaking immersion and adding a step. No on-site contact form exists as fallback. Enterprise browsers may block popups.
**Impact:** Conversion drop-off at the final step
**Fix:** Embed Cal.com widget inline on contact page using their embed SDK. Add a simple on-site contact form as fallback.
**Effort:** Medium

### P2-5. OvernightFallback Lacks Screen Reader Content
**Reviewers:** UX
**File:** `src/components/ui/SceneLoader.tsx:410-471`
**Issue:** The fallback component shown when 3D is disabled doesn't provide equivalent content for screen reader users. The 3D narrative (phone activity, clock, laptop inbox) conveys information that is lost.
**Impact:** Accessibility users miss core narrative content
**WCAG:** 1.1.1 Non-text Content
**Fix:** Add descriptive text summarizing the overnight narrative for SR users, hidden visually but available to assistive tech.
**Effort:** Small

### P2-6. Concierge Missing `aria-live` Region
**Reviewers:** UX
**File:** `src/components/layout/Concierge.tsx:1366`
**Issue:** New chat messages are not announced to screen readers. The message container needs `aria-live="polite"` so incoming messages are announced.
**Impact:** Screen reader users cannot follow conversation
**WCAG:** 4.1.3 Status Messages
**Fix:** Add `aria-live="polite"` to the message list container.
**Effort:** Small

### P2-7. AdvantageSection Heading Hierarchy Gap
**Reviewers:** UX
**File:** `src/components/sections/AdvantageSection.tsx:250`
**Issue:** Heading levels skip from h2 to h4, violating heading hierarchy.
**Impact:** Screen reader navigation, SEO
**WCAG:** 1.3.1 Info and Relationships
**Fix:** Correct heading hierarchy to sequential levels.
**Effort:** Small

### P2-8. Overnight Deliverables Strain Credibility
**Reviewers:** Dooley Tombras
**File:** `src/lib/content.ts` (phone log entries)
**Issue:** "Hero film cut, graded, sound designed" in a single overnight session strains credibility for anyone in film production. A rough cut, yes. Graded and sound designed in 5 hours? The log entries are strongest on strategic work, weakest on production claims.
**Impact:** Experienced production people may question credibility
**Fix:** Soften: "Hero film rough cut, first color pass, temp sound" is still impressive and more believable.
**Effort:** Small

### P2-9. Clock Flip Sequence May Be Too Compressed
**Reviewers:** Animation
**File:** `src/lib/getCycleStoryState.ts:729`
**Issue:** Clock flip sequence occupies only 18% of the clock phase scroll. Users may not register the satisfying 6:59→7:00 flip. The "hold" period where 6:59 is visible may be too long relative to the payoff.
**Impact:** Key narrative moment may be missed
**Fix:** Consider starting flips at 70% instead of 82%, giving more scroll distance to appreciate the animation.
**Effort:** Small

### P2-10. Phone holdDrift Amplitudes Imperceptible
**Reviewers:** Animation
**File:** `src/lib/constants.ts:277-283`
**Issue:** Phone hold drift sinusoidal wobble has amplitude of 0.012 radians (~0.7 degrees) and 0.0008 units translation. This is imperceptible — the phone appears static during hold phase.
**Impact:** Missed opportunity for life/polish in the 3D scene
**Fix:** Increase amplitudes 3x, or remove entirely to save computation.
**Effort:** Small

### P2-11. 5 Dead CSS Keyframe Definitions
**Reviewers:** Animation
**File:** `src/app/globals.css:197-229`
**Issue:** `gradientShift`, `wiggle`, `clippyBob`, `clippyWave`, `talkMouth` are defined but never referenced in any component.
**Impact:** Dead code, minor CSS bloat
**Fix:** Remove unused keyframes.
**Effort:** Small

### P2-12. "greenGlow" / "greenOverlayOpacity" Naming Mismatch
**Reviewers:** Animation
**File:** `src/lib/cycleScreenState.ts`, `src/components/three/LaptopModel.tsx:263`
**Issue:** Variables named "greenGlow" and "greenOverlayOpacity" actually control a magenta (#E04458) overlay. Misleading for maintainability.
**Impact:** Developer confusion
**Fix:** Rename to `accentOverlayOpacity` or `magentaOverlayOpacity`.
**Effort:** Small

### P2-13. SpotlightLayer Uses setInterval Instead of rAF
**Reviewers:** Animation
**File:** `src/components/layout/SpotlightLayer.tsx:37-41`
**Issue:** Velocity decay uses `setInterval(50ms)` which continues ticking in background tabs. Should use `requestAnimationFrame` for proper frame alignment and background tab pausing.
**Impact:** Unnecessary CPU in background tabs
**Fix:** Replace setInterval with rAF loop.
**Effort:** Small

### P2-14. Coca-Cola and Toyota Case Study Taglines Need Strengthening
**Reviewers:** Rodd Chant
**File:** `src/lib/content.ts` (case study taglines)
**Issue:** Some case study taglines describe process rather than insight. Orangetheory ("Permission to take one hour back") and Gila River ("We stopped trying to out-casino the category") are excellent. Coca-Cola and Toyota taglines may be more descriptive than provocative.
**Impact:** Inconsistent quality of creative impression across portfolio
**Fix:** Rewrite to lead with the strategic insight or tension, not the deliverable.
**Effort:** Small (copy)

### P2-15. Dead Clock Model Variants
**Reviewers:** Dev
**Files:** `src/components/three/ClockModel.tsx`, `ClockModelRefined.tsx`, `ClockModelStable.tsx`, `clockVariants.ts`
**Issue:** Multiple unused clock model components exist alongside the active `ClockModelPolish.tsx`. Dead code bloating the repository.
**Impact:** Repository clarity, potential import confusion
**Fix:** Delete unused variants and `clockVariants.ts` if not referenced.
**Effort:** Small

### P2-16. PageTransition Enter Tween Not Killed on Rapid Navigation
**Reviewers:** Animation
**File:** `src/components/layout/PageTransition.tsx:48-59`
**Issue:** If a user navigates rapidly, the enter tween from the previous transition may stack with the new one. The tween should be killed on re-entry.
**Impact:** Visual glitch on rapid navigation
**Fix:** Store tween ref and kill it at the start of each transition.
**Effort:** Small

### P2-17. `motion.ts` Presets Defined but Unused
**Reviewers:** Animation
**File:** `src/lib/motion.ts`
**Issue:** MOTION presets are defined but most components use inline GSAP easing strings directly. The presets provide no value.
**Impact:** Dead code
**Fix:** Either adopt the presets consistently across components or delete the file.
**Effort:** Small

### P2-18. 404 Page Needs Personality
**Reviewers:** Rodd Chant
**File:** `src/app/not-found.tsx`
**Issue:** The 404 page is likely generic and doesn't match the "Analog Vivid" aesthetic or the brand voice. For a creative director's portfolio, the 404 is an opportunity to demonstrate personality.
**Impact:** Missed brand moment
**Fix:** Design a custom 404 that's consistent with the site's dark aesthetic and brand voice.
**Effort:** Small-Medium

---

## P3 — Polish

Would improve but not urgent. Backlog with context.

### P3-1. Nav "MENU" Label Discoverability
**File:** `src/components/layout/Nav.tsx:119`
10px uppercase mono text may not be immediately discoverable. Consider slightly larger text or a more conventional hamburger icon with label.

### P3-2. `useMagnetic` Missing Transform/Transition Reset on Cleanup
**File:** `src/hooks/useMagnetic.ts:26-29`
When the component unmounts, transform and transition CSS properties may not be reset. Add cleanup.

### P3-3. `useProximityHeat` Scroll Listener Fires getBoundingClientRect at 60fps
**File:** `src/hooks/useProximityHeat.ts:49`
Debounce the bounding rect calculation with rAF to avoid layout thrashing.

### P3-4. `useMagnetic` Return Easing Diverges from Site's CSS Custom Property
**File:** `src/hooks/useMagnetic.ts:22`
Uses `cubic-bezier(0.33, 1, 0.68, 1)` while the site defines `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`. Consolidate for consistency.

### P3-5. `will-change: background-color` on Sticky Container
**File:** `src/components/sections/CycleSection.tsx:697`
Redundant — background-color repaints are cheap and don't benefit from will-change promotion.

### P3-6. Clippy Model Loaded Regardless of Concierge State
**File:** `src/components/three/ClippyModel.tsx`
Consider lazy-loading the Clippy GLB only when the Concierge is first opened.

### P3-7. Separate WebGL Context for Clippy
**File:** `src/components/three/ClippyModel.tsx`
If Clippy uses its own R3F Canvas, that's a second WebGL context. Mobile Safari limits to ~8 concurrent contexts. Consider sharing the main Canvas or using CSS 3D transforms.

### P3-8. Canvas Antialias at DPR 2
**File:** `src/components/three/SceneContainer.tsx`
`antialias: true` at DPR [1,2] means MSAA at 2x resolution. On retina displays, the pixels are already sub-perceptual — antialias may be unnecessary overhead. Test with `antialias: false` at DPR 2.

### P3-9. Redundant Flip Clock Model Files in public/
**File:** `public/models/flip-clock/`
Multiple GLB variants (retro-flip-clock.glb, -shell.glb, -refined.glb, -source-v4.glb) that appear unused. Clean up to reduce deploy size.

### P3-10. Font Loading FOUT Risk
**File:** `src/app/layout.tsx`
5 fonts loaded (2 Google, 2 local, 1 Google Mono). Local fonts use `display: swap` which can cause FOUT. Consider `font-display: optional` for non-critical fonts or preloading the hero display font.

### P3-11. Easing System Fragmentation
**Files:** `src/lib/easing.ts`, `src/hooks/useLenis.ts`, Hero.tsx
Three different easing systems coexist: custom Hermite smoothstep, GSAP power curves, and Lenis exponential. While contextually appropriate, document the rationale for which system is used where.

### P3-12. Brand List Missing Category Diversity
**File:** `src/lib/content.ts`
Brand list skews tourism/gaming/regional after the top 3 (Coca-Cola, Toyota, Delta). If tech, healthcare, or financial brands exist in Noah's history, add them.

---

## Cross-Reviewer Synthesis Notes

### Agreements Across Reviewers
- **All 6 reviewers** flagged the CycleSection length as a concern (from different angles: conversion, pacing, accessibility, performance)
- **Dev + WebGL** both flagged Three.js memory disposal gaps in LaptopModel
- **Dooley + Rodd** both flagged the positioning tension (speed vs strategy)
- **UX + Animation** both flagged reduced motion creating a worse experience than no animation
- **Dooley + UX** both flagged missing nav CTA and conversion funnel friction

### Conflicting Recommendations (Resolved)
- **CycleSection:** Rodd sees it as the creative centerpiece; Dooley sees it as a conversion obstacle. **Resolution:** Compress rather than remove. The creative quality is real; the length is the problem, not the concept.
- **Clippy personality:** Rodd finds it charming but risky; Dooley finds it undermining. **Resolution:** Dial back 30% — keep the dry self-awareness, remove the pressure/urgency.

---

## Implementation Priority Sequence

### Sprint 1 — Ship Blockers (P0)
1. Add rate limiting to Concierge API (P0-1)
2. Fix StatusDot keyframe reference (P0-4)
3. Remove `filter: blur()` from scroll pipeline (P0-5)
4. Fix Vector3/Color allocations in useFrame (P0-6)
5. Verify/fix Concierge model ID (P0-7)
6. Add persistent nav CTA (P0-2)
7. Add intermediate CTAs after WorkSection and case studies (P0-8)

### Sprint 2 — Critical (P1, Quick Wins)
8. Fix color contrast for --text-secondary and --text-tertiary (P1-7)
9. Change hero CTA copy: "Start a Project" → "Book a Strategy Call" (P1-5)
10. Delete clock-test page (P1-10)
11. Remove dead clock model variants (P2-15)
12. Fix will-change to be conditional (P1-3)
13. Fix Loader to render outside Vercel (P1-14)

### Sprint 3 — Critical (P1, Medium Effort)
14. Add LaptopModel disposal cleanup (P1-1)
15. Compress clock textures (60MB → ~5MB) (P1-2)
16. Convert MacBook FBX → GLB (P1-13)
17. Fix PhoneModel material disposal (P1-8)
18. Collapse CycleSection under reduced motion (P1-9)
19. Add 3-5 more testimonials (P1-6)

### Sprint 4 — Content & Positioning (P1-P2)
20. Rewrite hero subline (P1-12)
21. Clarify positioning hierarchy (P1-4)
22. Add case study outcome metrics (P1-11)
23. Surface strategic insights earlier in scroll (P2-2)
24. Work 15-year tenure into hero (P2-3)

### Sprint 5 — Polish (P2-P3)
25. Embed Cal.com on contact page (P2-4)
26. Dial back Concierge urgency language (P2-1)
27. Add OvernightFallback SR content (P2-5)
28. Add aria-live to Concierge (P2-6)
29. Fix heading hierarchy (P2-7)
30. Remaining P2 and P3 items

---

## Verification Checklist (Post-Implementation)

- [ ] `npm run build` passes with zero errors
- [ ] Lighthouse: Performance > 90, Accessibility > 95, SEO > 95
- [ ] axe DevTools: zero critical/serious violations
- [ ] Chrome DevTools Memory: no unbounded growth over 5-min browse
- [ ] Console: zero errors/warnings across all pages
- [ ] Full scroll-through at 0.25x speed: no jank, no blank frames
- [ ] `prefers-reduced-motion: reduce`: all content accessible, no broken layouts
- [ ] Mobile (375px): complete experience without 3D, all CTAs functional
- [ ] Concierge API: rate limiting active, prompt injection mitigated
- [ ] All text/background combinations pass WCAG AA contrast (4.5:1)

---

*Review completed April 7, 2026. Panel: Senior UX/UI Lead, Senior WebGL Engineer, Senior Motion Designer, Dooley Tombras (Advertising Strategy), Rodd Chant (Creative Direction), Senior Developer.*
