# Cycle Section Scroll Timing & 3D Animation Fixes

## Context

The cycle section (`src/components/sections/CycleSection.tsx`) is a scroll-driven sequence of 8 phases (statement, handoff, logIntro, phone, clock, laptopReveal, laptopInbox, workTransition) each with 3D animations. Currently:

- Phases don't get enough scroll distance for animations to play out and be readable
- The clock starts flipping before it's fully visible — impossible to read
- The phone needs more dramatic rotation and less overlay copy
- The laptop needs a green-screen-to-campaign-ready-to-push-in-to-emails sequence
- The work transition needs better choreography with more reading time

The cycle section height is controlled by `cycleScrollDistance` (currently 5.2vh) in `src/lib/constants.ts`. Scroll progress (0-1) is distributed across phases via the `PHASES` object.

---

## Critical Files

| File | Role |
|------|------|
| `src/lib/constants.ts` | Phase timing (PHASES), scroll distance, PHONE_ROTATION, BG_COLORS |
| `src/lib/cycleScreenState.ts` | getPhoneSequenceState, getClockSequenceState, getLaptopSequenceState |
| `src/stores/scrollStore.ts` | Zustand store: setCycleProgress, per-phase progress/opacity/transform |
| `src/components/sections/CycleSection.tsx` | PhaseLayer, PhoneContent, ClockContent, LaptopSequenceLayer, WorkTransitionContent |
| `src/components/three/PhoneModel.tsx` | Phone 3D rotation interpolation using PHONE_ROTATION |
| `src/components/three/LaptopModel.tsx` | Laptop lid opening, camera beats, glow lights |
| `src/lib/drawLaptopScreen.ts` | Canvas rendering for laptop screen content |
| `src/lib/content.ts` | CYCLE_CLOCK, CYCLE_LAPTOP text constants |
| `src/components/sections/PhoneStage.tsx` | CSS fallback phone rotation (getPhoneTransform) |

---

## Current State of Key Code

### PHASES (src/lib/constants.ts)
```typescript
export const PHASES = {
  statement:      { in: 0.00, out: 0.12 },
  handoff:        { in: 0.10, out: 0.24 },
  logIntro:       { in: 0.22, out: 0.36 },
  phone:          { in: 0.34, out: 0.58 },
  clock:          { in: 0.56, out: 0.70 },
  laptopReveal:   { in: 0.68, out: 0.82 },
  laptopInbox:    { in: 0.80, out: 0.94 },
  workTransition: { in: 0.92, out: 1.00 },
} as const;
```

### Scroll Distance (src/lib/constants.ts)
```typescript
export const SCROLL_TRIGGER_DEFAULTS = {
  scrub: 0.3,
  cycleScrollDistance: 5.2, // in viewport heights
} as const;
```

### PHONE_ROTATION (src/lib/constants.ts)
```typescript
export const PHONE_ROTATION = {
  entry: { rotY: -0.58, rotX: 0.16, scale: 0.96, posX: 0.07, posY: -0.03, posZ: -0.025 },
  rest:  { rotY: 0, rotX: 0, scale: 1.16, posX: 0, posY: -0.01, posZ: 0 },
  exit:  { rotY: 0.42, rotX: -0.12, scale: 1.04, posX: -0.07, posY: 0.004, posZ: -0.018 },
} as const;
```

### Clock Sequence Timing (src/lib/cycleScreenState.ts)
```typescript
export function getClockSequenceState(progress, reducedMotion = false) {
  const displayProgress = reveal(progress, 0.04, reducedMotion ? 0.1 : 0.14);
  const hold0659 = reveal(progress, 0.18, reducedMotion ? 0.05 : 0.08);
  const flipMinuteOnes = reveal(progress, reducedMotion ? 0.42 : 0.46, reducedMotion ? 0.05 : 0.09);
  const flipMinuteTens = reveal(progress, reducedMotion ? 0.52 : 0.56, reducedMotion ? 0.05 : 0.09);
  const flipHourOnes = reveal(progress, reducedMotion ? 0.62 : 0.67, reducedMotion ? 0.06 : 0.1);
  const settle0700 = reveal(progress, reducedMotion ? 0.74 : 0.8, reducedMotion ? 0.08 : 0.12);
  const ringLift = reveal(progress, 0.4, reducedMotion ? 0.12 : 0.15);
  const flashAmount = reveal(progress, 0.48, ...) * ...;
}
```

### Laptop Sequence State (src/lib/cycleScreenState.ts)
```typescript
export interface LaptopSequenceState {
  screenReveal: number;
  glowAmount: number;
  notificationOpacity: number;
  notificationScale: number;
  notificationLift: number;
  notificationDetailOpacity: number;
  inboxOpacity: number;
  emailOpacities: number[];
  emailOffsets: number[];
  rowScales: number[];
  activeIndex: number;
}
```

### PhoneStage CSS Rotation (src/components/sections/PhoneStage.tsx)
```typescript
function getPhoneTransform(progress, reducedMotion) {
  if (progress <= 0.15) {
    // Entry
    return { rotateY: (1 - t) * -25, rotateX: (1 - t) * 8, ... };
  }
  if (progress <= 0.8) {
    // Rest
    return { rotateY: 0, ... };
  }
  // Exit
  return { rotateY: t * 20, rotateX: t * -6, ... };
}
```

### LaptopModel Camera (src/components/three/LaptopModel.tsx)
Current 3-beat camera system at lines 349-367:
```typescript
if (sequenceProgress < 0.24) {
  // Beat 1: bird's eye, lid opens
  cy = lerp(1.65, 1.2, t); cz = lerp(6.8, 5.65, t);
} else if (sequenceProgress < 0.66) {
  // Beat 2: move closer
  cy = lerp(1.2, 0.98, t); cz = lerp(5.65, 4.88, t);
} else {
  // Beat 3: settle
  cy = lerp(0.98, 0.94, t); cz = lerp(4.88, 4.6, t);
}
```

### LaptopModel Sequence Progress (src/components/three/LaptopModel.tsx)
Currently spans laptopReveal.in to laptopInbox.out:
```typescript
function getLaptopSequenceProgress(cycleProgress) {
  return clamp(
    (cycleProgress - PHASES.laptopReveal.in) /
      (PHASES.laptopInbox.out - PHASES.laptopReveal.in),
    0, 1,
  );
}
```

### PhaseLayer 3D Check (src/components/sections/CycleSection.tsx)
Lines 102-104:
```typescript
const is3DPhase =
  phase === 'phone' ||
  phase === 'clock' ||
  phase === 'laptopReveal' ||
  phase === 'laptopInbox';
```

### LaptopSequenceLayer (src/components/sections/CycleSection.tsx)
Lines 494-543 — reads both `laptopRevealTransform` and `laptopInboxTransform`:
```typescript
const revealTransform = useScrollStore((state) => state.laptopRevealTransform);
const inboxTransform = useScrollStore((state) => state.laptopInboxTransform);
const sequenceOpacity = Math.max(revealTransform.opacity, inboxTransform.opacity);
```

### PhoneContent (src/components/sections/CycleSection.tsx)
Lines 438-464 — contains "Overnight Activity" badge and "Strategy. Cuts. Files." copy to remove.

### ClockContent (src/components/sections/CycleSection.tsx)
Lines 466-492 — contains `CYCLE_CLOCK.headline` text at bottom to remove.

### WorkTransitionContent (src/components/sections/CycleSection.tsx)
Lines 545-636:
```typescript
const titleFade = ease(clamp((progress - 0.44) / 0.34, 0, 1));
const cardMorph = ease(clamp((progress - 0.14) / 0.68, 0, 1));
const contentSwap = ease(clamp((progress - 0.24) / 0.42, 0, 1));
```

### CYCLE_CLOCK content (src/lib/content.ts)
```typescript
export const CYCLE_CLOCK = {
  lead: '7:00 AM',
  headline: 'Alarm goes off. Progress is already waiting.',
  subline: 'Vintage flip clock. Brand-green pulse. Morning starts with momentum.',
} as const;
```

### Fade Timing Constants (src/lib/constants.ts)
```typescript
export const FADE_IN_DURATION = 0.07;
export const FADE_OUT_DURATION = 0.06;
```

### Phase Overlap Validation (src/lib/constants.ts)
Dev-only validation at bottom of file checks that adjacent phase overlaps don't exceed `FADE_IN + FADE_OUT + 0.02 = 0.15`.

### ScrollStore (src/stores/scrollStore.ts)
The store auto-derives `${phase}Progress`, `${phase}Opacity`, and `${phase}Transform` keys for every key in PHASES. PhaseName is typed as `keyof typeof PHASES`. Changing PHASES keys automatically changes the store shape.

---

## Step 1: Increase Scroll Distance & Redistribute Phase Timing

**File: `src/lib/constants.ts`**

Increase `cycleScrollDistance` from **5.2 to 7.8** viewport heights (+50%). Redistribute phases and merge `laptopReveal` + `laptopInbox` into a single `laptop` phase:

```
Current                              New
---------------------------------    ---------------------------------
statement:      0.00 - 0.12 (12%)   statement:      0.00 - 0.10 (10%)
handoff:        0.10 - 0.24 (14%)   handoff:        0.08 - 0.20 (12%)
logIntro:       0.22 - 0.36 (14%)   logIntro:       0.18 - 0.30 (12%)
phone:          0.34 - 0.58 (24%)   phone:          0.28 - 0.50 (22%)
clock:          0.56 - 0.70 (14%)   clock:          0.48 - 0.64 (16%)
laptopReveal:   0.68 - 0.82 (14%)   laptop:         0.62 - 0.86 (24%)  <- MERGED
laptopInbox:    0.80 - 0.94 (14%)
workTransition: 0.92 - 1.00  (8%)   workTransition: 0.84 - 1.00 (16%)
```

All adjacent overlaps are 0.02 which is within the 0.15 max.

**Absolute scroll distances at 7.8vh:**
- phone: 171vh (was 125vh) -- +37%
- clock: 125vh (was 73vh) -- +71%
- laptop: 187vh (was 135vh combined) -- +39%
- workTransition: 125vh (was 42vh) -- +198%

**Also update `BG_COLORS` keyframes** to match new phase boundaries (night -> dawn -> morning -> dark). The dawn/morning transitions should align with the new clock and laptop phases.

---

## Step 2: Merge Laptop Phases (Type & Store Refactor)

Merging `laptopReveal` + `laptopInbox` into `laptop` affects several files:

**File: `src/lib/constants.ts`**
- Remove `laptopReveal` and `laptopInbox` from PHASES
- Add `laptop: { in: 0.62, out: 0.86 }`
- `PhaseName` type auto-derives from PHASES keys (no manual change needed)

**File: `src/stores/scrollStore.ts`**
- The store auto-generates keys from PHASES. After renaming, the old keys (`laptopRevealProgress`, `laptopRevealOpacity`, `laptopRevealTransform`, `laptopInboxProgress`, `laptopInboxOpacity`, `laptopInboxTransform`) will automatically be replaced by `laptopProgress`, `laptopOpacity`, `laptopTransform`.
- No manual store changes needed beyond the PHASES rename.

**File: `src/components/sections/CycleSection.tsx`**
- `PhaseLayer` has an `is3DPhase` check that references `'laptopReveal'` and `'laptopInbox'` -- update to `'laptop'`
- `LaptopSequenceLayer`: change to read single `laptopTransform` instead of `max(revealTransform, inboxTransform)`. Use `laptopProgress` for sequenceProgress.
- Replace the standalone `<LaptopSequenceLayer>` with a `<PhaseLayer phase="laptop">` wrapping the laptop content.

**File: `src/components/three/LaptopModel.tsx`**
- Update `getLaptopSequenceProgress()` to use `PHASES.laptop.in` and `PHASES.laptop.out` instead of `PHASES.laptopReveal.in` / `PHASES.laptopInbox.out`

---

## Step 3: Phone -- More Rotation & Remove Overlay Copy

### 3a. Increase Rotation

**File: `src/lib/constants.ts`** -- Update `PHONE_ROTATION`:
```
entry.rotY: -0.58 -> -1.2   (nearly sideways on entry)
exit.rotY:   0.42 ->  0.8   (more dramatic exit swing)
```

**File: `src/components/sections/PhoneStage.tsx`** -- Update CSS fallback:
- Entry: `rotateY: (1-t) * -25` -> `(1-t) * -55`
- Exit: `rotateY: t * 20` -> `t * 38`

### 3b. Remove Phone Overlay Copy

**File: `src/components/sections/CycleSection.tsx`** -- In `PhoneContent()`:
- **Remove** the "Overnight Activity" badge div (lines 446-453):
  ```html
  <div class="...pointer-events-none absolute left-1/2 top-16...">
    <span>Overnight Activity</span>
  </div>
  ```
- **Remove** the "Strategy. Cuts. Files." text div (lines 454-461):
  ```html
  <div class="...pointer-events-none absolute bottom-14...">
    <p>Strategy. Cuts. Files. Before your first reply.</p>
  </div>
  ```
- Keep only the radial gradient glow div (the first child)

---

## Step 4: Remove Clock Headline

**File: `src/components/sections/CycleSection.tsx`** -- In `ClockContent()`:
- **Remove** the bottom div (lines 482-489) that renders `CYCLE_CLOCK.headline`:
  ```html
  <div class="...pointer-events-none absolute bottom-16...">
    <p>Alarm goes off. Progress is already waiting.</p>
  </div>
  ```
- Keep the top badge showing "7:00 AM" and the background glow

**File: `src/lib/content.ts`** -- Set `CYCLE_CLOCK.headline` to empty string `''`.

---

## Step 5: Delay Clock Flip Animations

**File: `src/lib/cycleScreenState.ts`** -- In `getClockSequenceState()`:

The clock face starts flipping while still fading in. Push flips later and extend the 6:59 hold so the user can read the time:

```
Current                              New
---------------------------------    ---------------------------------
displayProgress: 0.04, dur 0.14     displayProgress: 0.02, dur 0.12
hold0659:        0.18, dur 0.08     hold0659:        0.14, dur 0.10
                                    GAP: 0.24 -> 0.54 is pure hold at 6:59
flipMinuteOnes:  0.46, dur 0.09     flipMinuteOnes:  0.54, dur 0.08
flipMinuteTens:  0.56, dur 0.09     flipMinuteTens:  0.63, dur 0.08
flipHourOnes:    0.67, dur 0.10     flipHourOnes:    0.72, dur 0.09
settle0700:      0.80, dur 0.12     settle0700:      0.84, dur 0.10
```

Also adjust `ringAmount` and `flashAmount` timing to match:
- `ringLift` start: 0.40 -> 0.50
- `flashAmount` start: 0.48 -> 0.56

Update `reducedMotion` values proportionally.

---

## Step 6: Laptop Green Screen -> Campaign Ready -> Push-In -> Emails

This is the largest change. Replace the current notification popup sequence with a four-beat sequence within the merged `laptop` phase:

| Beat | Progress | What Happens |
|------|----------|-------------|
| **1: Green Glow Open** | 0.00-0.28 | Lid opens, screen is solid green (#C7F042), green glow emanates |
| **2: Campaign Ready** | 0.24-0.48 | "Campaign Ready" text appears centered on green screen |
| **3: Push Into Screen** | 0.44-0.68 | Camera pushes INTO screen, green fills viewport via HTML overlay |
| **4: Email Reveal** | 0.64-1.00 | Green recedes, inbox with staggered email rows appears |

### 6a. Update LaptopSequenceState and getLaptopSequenceState() in cycleScreenState.ts

Replace the current interface fields with:
```typescript
export interface LaptopSequenceState {
  screenReveal: number;          // keep
  glowAmount: number;            // keep
  greenScreenAmount: number;     // NEW: 1 -> 0 as green fades
  campaignReadyOpacity: number;  // NEW: fade in then out
  pushIntoProgress: number;      // NEW: 0 -> 1 camera push
  greenOverlayOpacity: number;   // NEW: HTML viewport-fill green
  inboxOpacity: number;          // keep
  emailOpacities: number[];      // keep
  emailOffsets: number[];        // keep
  rowScales: number[];           // keep
  activeIndex: number;           // keep
}
```

Remove: `notificationOpacity`, `notificationScale`, `notificationLift`, `notificationDetailOpacity`

Implement the new fields:
- `greenScreenAmount`: starts at 1, reveals down during beat 1 (0.00-0.28), holds at ~0.8 during beat 2, fades to 0 during beat 4
- `campaignReadyOpacity`: fade in 0.24-0.36, hold, fade out 0.44-0.52
- `pushIntoProgress`: 0 at 0.44, 1 at 0.68 (drives camera push)
- `greenOverlayOpacity`: 0 at 0.50, peaks at 1.0 around 0.60, back to 0 at 0.72

### 6b. Update drawLaptopScreen.ts

- **Early sequence**: Fill screen with green (#C7F042) instead of warm gradient. Lerp to warm-white as `greenScreenAmount` goes from 1 to 0.
- **Campaign Ready**: Draw centered heading "Campaign Ready" in dark text over the green background when `campaignReadyOpacity > 0`. Also draw a small subtitle below.
- **Remove all notification popup rendering** (the white popup card at lines 88-143)
- **Keep email row rendering** for beat 4 (lines 145-211)

### 6c. Update LaptopModel.tsx camera beats

Rewrite the 3-beat camera system (lines 320-367) to 4 beats:

```
Beat 1 (0.00-0.28): Bird's eye, lid opens
  cy: 1.65 -> 1.2,  cz: 6.8 -> 5.65  (same as current beat 1)

Beat 2 (0.28-0.48): Move closer to screen
  cy: 1.2 -> 0.98,  cz: 5.65 -> 4.88

Beat 3 (0.48-0.68): PUSH INTO screen
  cy: 0.98 -> 0.4,  cz: 4.88 -> 1.2   (dramatic push toward screen)

Beat 4 (0.68-1.00): Camera at screen level, viewing email content
  cy: 0.4 -> 0.94,  cz: 1.2 -> 4.6    (pull back to reveal emails)
```

### 6d. Add green viewport overlay in CycleSection.tsx

In `LaptopSequenceLayer`, add a full-viewport `<div>` with:
- `background: #C7F042` (accent green)
- `opacity` driven by `greenOverlayOpacity` from the laptop sequence state
- `position: fixed; inset: 0; z-index: 50` to cover viewport during push-in
- This covers visual artifacts as the camera pushes through the laptop geometry

---

## Step 7: Work Transition -- More Time, Better Choreography

**File: `src/components/sections/CycleSection.tsx`** -- In `WorkTransitionContent()`:

With 16% of 7.8vh (125vh of scroll), redistribute the animation timing:

```
Current                              New
---------------------------------    ---------------------------------
cardMorph:   0.14, range 0.68       cardMorph:   0.06, range 0.38
contentSwap: 0.24, range 0.42       contentSwap: 0.32, range 0.28
titleFade:   0.44, range 0.34       titleFade:   0.56, range 0.24
                                    Hold to read: 0.80 - 1.00
```

New code:
```typescript
const cardMorph = reducedMotion ? 1 : ease(clamp((progress - 0.06) / 0.38, 0, 1));
const contentSwap = reducedMotion ? 1 : ease(clamp((progress - 0.32) / 0.28, 0, 1));
const titleFade = reducedMotion ? 1 : ease(clamp((progress - 0.56) / 0.24, 0, 1));
```

Three-act choreography:
1. Email cards morph into case study cards (0.06-0.44)
2. Content text swaps from email to case study (0.32-0.60)
3. "Selected Work" title fades in (0.56-0.80)
4. Hold to read before next section (0.80-1.00)

---

## Implementation Order

Execute in this exact sequence to minimize broken intermediate states:

1. **constants.ts** -- Update cycleScrollDistance (5.2 -> 7.8), PHASES (merge laptop), BG_COLORS, PHONE_ROTATION
2. **scrollStore.ts** -- Verify derived keys update automatically (they should since PhaseName derives from PHASES keys)
3. **cycleScreenState.ts** -- Rewrite getLaptopSequenceState (new interface + green screen fields), update getClockSequenceState timing
4. **content.ts** -- Set `CYCLE_CLOCK.headline` to `''`
5. **CycleSection.tsx** -- Remove phone/clock copy, update LaptopSequenceLayer (single phase + green overlay), update is3DPhase check, update work transition timing
6. **PhoneStage.tsx** -- Update CSS rotation values (-25 -> -55, 20 -> 38)
7. **LaptopModel.tsx** -- Update getLaptopSequenceProgress for merged phase, rewrite camera beats for 4-beat push-in, remove notification stateKey fields
8. **drawLaptopScreen.ts** -- Green screen rendering, campaign ready text, remove notification popup rendering

---

## Verification

1. `npm run build` passes clean (zero TypeScript errors)
2. Dev server at localhost:3000 -- scroll through entire cycle section
3. Visual checks at key scroll positions:
   - Phone entry/exit: verify dramatic rotation, no overlay copy
   - Clock at 6:59: verify digits are visible and static before flips begin
   - Laptop green screen: verify solid green glow + "Campaign Ready" text appears on screen
   - Laptop push-in: verify green fills viewport smoothly via HTML overlay
   - Email reveal: verify emails appear after green recedes
   - Work transition: verify clear 3-act morph with sufficient reading time
4. Verify `reducedMotion` paths still work (all new state fields need reduced-motion defaults in the `if (reducedMotion)` early return)
5. Phase timing validation passes in dev mode (no overlap warnings in console)

---

## Risks & Notes

- **Merging laptop phases** is the riskiest refactor -- it touches types, the Zustand store, components, and the 3D model. Do it first (steps 1-2) so everything builds on the final structure.
- **Camera push-in** (step 6c beat 3) may clip through laptop geometry. The green HTML overlay (step 6d) covers visual artifacts during the transition.
- **BG_COLORS** positions will likely need visual tuning after phase redistribution. Start with proportionally shifted positions and adjust based on visual testing.
- The `reveal()` helper in cycleScreenState.ts computes `ease(clamp((progress - start) / duration, 0, 1))`. All timing values in step 5 and 6a use this pattern.
- The `LAPTOP_BEATS` and `LAPTOP_CAMERA` constants in constants.ts are currently unused by LaptopModel.tsx (it has inline lerps). You can either update the constants or keep using inline values -- either approach works.
