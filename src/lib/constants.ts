// ---------------------------------------------------------------------------
// Scroll phase timing (normalized 0-1 within the cycle)
// From codex: phases object inside ScrollTrigger setup
// ---------------------------------------------------------------------------
export const PHASES = {
  statement: {
    in: 0.0,
    introEnd: 0.0,
    holdEnd: 0.06,
    outroStart: 0.06,
    out: 0.08,
  },
  handoff: {
    in: 0.06,
    introEnd: 0.09,
    holdEnd: 0.13,
    outroStart: 0.13,
    out: 0.17,
  },
  coffee: {
    in: 0.15,
    introEnd: 0.18,
    holdEnd: 0.22,
    outroStart: 0.22,
    out: 0.25,
  },
  logIntro: {
    in: 0.23,
    introEnd: 0.26,
    holdEnd: 0.30,
    outroStart: 0.30,
    out: 0.33,
  },
  phone: {
    in: 0.30,
    introEnd: 0.36,
    holdEnd: 0.46,
    outroStart: 0.47,
    out: 0.52,
  },
  clock: {
    in: 0.48,
    introEnd: 0.52,
    holdEnd: 0.6,
    outroStart: 0.6,
    out: 0.64,
  },
  laptop: {
    in: 0.62,
    introEnd: 0.67,
    holdEnd: 0.84,
    outroStart: 0.88,
    out: 0.96,
  },
  workTransition: {
    in: 0.96,
    introEnd: 0.97,
    holdEnd: 0.98,
    outroStart: 0.98,
    out: 1.0,
  },
} as const;

export type PhaseName = keyof typeof PHASES;
export const PHASE_ORDER = Object.keys(PHASES) as PhaseName[];

// ---------------------------------------------------------------------------
// Background color keyframes for the cycle section
// night -> dawn -> morning -> fade back to dark
// ---------------------------------------------------------------------------
export const BG_COLORS = [
  { pos: 0.00, color: '#0a0b0e' },
  { pos: 0.06, color: '#0c0e12' },
  { pos: 0.17, color: '#12100d' },
  { pos: 0.25, color: '#1a1410' },
  { pos: 0.33, color: '#2a1712' },
  { pos: 0.46, color: '#52201a' },
  { pos: 0.58, color: '#865040' },
  { pos: 0.66, color: '#c8ab8d' },
  { pos: 0.78, color: '#f1e7d8' },
  { pos: 0.86, color: '#f6efe3' },
  { pos: 0.94, color: '#18130f' },
  { pos: 1.00, color: '#050506' },
] as const;

// ---------------------------------------------------------------------------
// Phase fade timing (normalized durations within 0-1 range)
// From codex: fadeIn = 0.07, fadeOut = 0.06
// ---------------------------------------------------------------------------
export const FADE_IN_DURATION = 0.07;
export const FADE_OUT_DURATION = 0.06;

// ---------------------------------------------------------------------------
// Laptop beat timing (within laptop phase 0-1)
// From codex: updateLaptop3D function beat comments
// ---------------------------------------------------------------------------
export const LAPTOP_BEATS = {
  beat1: { start: 0, end: 0.25 },
  beat2: { start: 0.25, end: 0.50 },
  beat3: { start: 0.50, end: 0.75 },
  beat4: { start: 0.75, end: 1.00 },
} as const;

// ---------------------------------------------------------------------------
// Laptop camera positions per beat (from updateLaptop3D)
// Each beat: { cy, cz, ly, lz } -- cx, lx are always 0
// ---------------------------------------------------------------------------
export const LAPTOP_CAMERA = {
  beat1: {
    start: { cy: 4.45, cz: 1.85, ly: 0.34, lz: 0.02 },
    end:   { cy: 3.55, cz: 2.35, ly: 0.18, lz: 0.03 },
  },
  beat2: {
    start: { cy: 3.55, cz: 2.35, ly: 0.18, lz: 0.03 },
    end:   { cy: 1.48, cz: 5.08, ly: 0.82, lz: 0.02 },
  },
  beat3: {
    start: { cy: 1.48, cz: 5.08, ly: 0.82, lz: 0.02 },
    end:   { cy: 1.78, cz: 4.42, ly: 0.92, lz: 0.00 },
  },
  beat4: {
    start: { cy: 1.78, cz: 4.42, ly: 0.92, lz: 0.00 },
    end:   { cy: 0.92, cz: 0.44, ly: 0.84, lz: 0.02 },
  },
} as const;

// Laptop group rotation/position per beat
export const LAPTOP_GROUP = {
  beat1: {
    start: { rotX: 0.02, groupY: -0.01 },
    end:   { rotX: 0.00, groupY: 0.00 },
  },
  beat2: {
    start: { rotX: 0.00, groupY: 0.00 },
    end:   { rotX: -0.03, groupY: 0.03 },
  },
  beat3: {
    start: { rotX: -0.03, groupY: 0.03 },
    end:   { rotX: 0.00, groupY: 0.03 },
  },
  beat4: {
    start: { rotX: 0.00, groupY: 0.03 },
    end:   { rotX: 0.00, groupY: 0.00 },
  },
} as const;

// Laptop lid angle
export const LAPTOP_CLOSED_LID_ANGLE = 1.46;

// ---------------------------------------------------------------------------
// Colors (from CSS custom properties in codex)
// ---------------------------------------------------------------------------
export const COLORS = {
  accent: '#E04458',
  accentSecondary: '#DEB42E',
  accentTertiary: '#1E90CF',
  accentDim: 'rgba(224,68,88,0.12)',
  accentGlow: 'rgba(224,68,88,0.25)',
  accentSecondaryGlow: 'rgba(222,180,46,0.15)',
  accentTertiaryGlow: 'rgba(30,144,207,0.12)',

  bgDeep: '#0E0C0A',
  bgBase: '#0E0C0A',
  bgElevated: '#242119',
  bgSurface: 'rgba(245,240,230,0.03)',
  bgCard: '#1A1815',

  textPrimary: '#F5F0E6',
  // NOTE: Canvas text colors below are intentionally darker than CSS custom properties
  // (globals.css: --text-secondary: #C4BAA9, --text-tertiary: #A39A8F, --text-faint: #8A847C)
  // to maintain readability on 3D model surfaces (phone, laptop, clock screen textures).
  textSecondary: '#9A938A',
  textTertiary: '#706A62',
  textFaint: '#736D65',

  border: 'rgba(245,240,230,0.06)',
  borderAccent: 'rgba(224,68,88,0.12)',

  cream: '#F5F0E6',
  stone: '#9A938A',
  ink: '#0E0C0A',
  inkLight: '#706A62',
  inkFaint: '#9A938A',
} as const;

// ---------------------------------------------------------------------------
// Fonts (from CSS custom properties)
// ---------------------------------------------------------------------------
export const FONTS = {
  heading: "'Archivo', sans-serif",
  body: "'Geist', sans-serif",
  mono: "'Geist Mono', monospace",
} as const;

// ---------------------------------------------------------------------------
// Laptop material configs (from buildLaptopMaterial in codex)
// ---------------------------------------------------------------------------
export const LAPTOP_MATERIALS: Record<
  string,
  {
    color: number;
    metalness: number;
    roughness: number;
    transparent?: boolean;
    opacity?: number;
    emissive?: number;
    emissiveIntensity?: number;
  }
> = {
  bod:       { color: 0x3a3d46, metalness: 0.98, roughness: 0.26 },
  gryl:      { color: 0x4c515b, metalness: 0.44, roughness: 0.54 },
  bezel:     { color: 0x060709, metalness: 0.05, roughness: 0.14 },
  glass:     { color: 0x0d1117, metalness: 0.0,  roughness: 0.02, transparent: true, opacity: 0.12 },
  rubba:     { color: 0x0c0d10, metalness: 0.0,  roughness: 0.92 },
  keys:      { color: 0x17191f, metalness: 0.05, roughness: 0.78 },
  black:     { color: 0x0f1014, metalness: 0.0,  roughness: 0.56 },
  mlack:     { color: 0x07080a, metalness: 0.0,  roughness: 0.98 },
  metal:     { color: 0x626874, metalness: 1.0,  roughness: 0.24 },
  chrome:    { color: 0x717886, metalness: 1.0,  roughness: 0.18 },
  gold:      { color: 0xb7c04b, metalness: 0.75, roughness: 0.28 },
  light:     { color: 0x2a2b31, metalness: 0.0,  roughness: 0.45, emissive: 0x111317, emissiveIntensity: 0.2 },
  cam:       { color: 0x121318, metalness: 0.0,  roughness: 0.06 },
  'cam-mat': { color: 0x07080a, metalness: 0.0,  roughness: 0.2 },
  disp:      { color: 0x000000, metalness: 0.0,  roughness: 1.0 },
  backlight: { color: 0x111215, metalness: 0.0,  roughness: 0.55 },
} as const;

// Default fallback for unmatched laptop material names
export const LAPTOP_MATERIAL_DEFAULT = {
  color: 0x52555d,
  metalness: 0.35,
  roughness: 0.45,
} as const;

// ---------------------------------------------------------------------------
// Phone material configs (from materialMap in codex initPhoneScene)
// ---------------------------------------------------------------------------
export const PHONE_MATERIALS: Record<
  string,
  {
    color: number;
    metalness: number;
    roughness: number;
    transparent?: boolean;
    opacity?: number;
  }
> = {
  'basecolor.001':    { color: 0x3a3a3c, metalness: 0.85, roughness: 0.25 },
  'backpanel.001':    { color: 0x3a3a3c, metalness: 0.85, roughness: 0.25 },
  'metalframe.002':   { color: 0x48484a, metalness: 0.95, roughness: 0.15 },
  'metalframe.003':   { color: 0x48484a, metalness: 0.95, roughness: 0.15 },
  'apple logo.001':   { color: 0x8e8e93, metalness: 0.90, roughness: 0.10 },
  'material.005':     { color: 0x3a3a3c, metalness: 0.80, roughness: 0.30 },
  'material.006':     { color: 0x2c2c2e, metalness: 0.80, roughness: 0.30 },
  'material.007':     { color: 0x999999, metalness: 0.50, roughness: 0.40 },
  'material.008':     { color: 0x999999, metalness: 0.50, roughness: 0.40 },
  'black.002':        { color: 0x0a0a0a, metalness: 0.20, roughness: 0.80 },
  'black.003':        { color: 0x0a0a0a, metalness: 0.20, roughness: 0.80 },
  'gray.001':         { color: 0x231f1b, metalness: 0.60, roughness: 0.40 },
  'metal.001':        { color: 0x393939, metalness: 0.95, roughness: 0.15 },
  'glass.002':        { color: 0x222222, metalness: 0.10, roughness: 0.05, transparent: true, opacity: 0.4 },
  'glass.003':        { color: 0x222222, metalness: 0.10, roughness: 0.05, transparent: true, opacity: 0.4 },
  'lens.001':         { color: 0x111111, metalness: 0.80, roughness: 0.10 },
  'lensinglass':      { color: 0x0c0c0c, metalness: 0.10, roughness: 0.05, transparent: true, opacity: 0.3 },
  'svgmat.002':       { color: 0x000000, metalness: 0.00, roughness: 1.00 },
  'screen.001':       { color: 0x0a0a0a, metalness: 0.10, roughness: 0.90 },
} as const;

// ---------------------------------------------------------------------------
// Phone animation timing (from updatePhone3D in codex)
// ---------------------------------------------------------------------------
export const PHONE_ANIMATION = {
  rotateIn:   { start: 0, end: 0.25 },
  itemReveal: { start: 0.15, end: 0.55 },
  hold:       { start: 0.55, end: 0.80 },
  rotateOut:  { start: 0.80, end: 1.00 },
  itemCount: 5,
} as const;

// Phone 3D rollout stays disabled until the replacement model is approved.
export const PHONE_3D_APPROVED = true as const;

// Phone rotation values shared by the 3D and HTML phone renders.
export const PHONE_ROTATION = {
  entry: { rotY: -1.32, rotX: 0.28, scale: 0.96, posX: 0.18, posY: -0.062, posZ: -0.054 },
  hold: { rotY: -0.64, rotX: 0.106, scale: 1.28, posX: 0.16, posY: -0.038, posZ: 0.014 },
  holdDrift: {
    rotYAmplitude: 0.012,
    rotXAmplitude: 0.007,
    posYAmplitude: 0.0008,
    posZAmplitude: 0.0011,
    cycles: 0.5,
  },
  exit: { rotY: 0.76, rotX: -0.1, scale: 1.06, posX: -0.04, posY: -0.004, posZ: -0.028 },
} as const;

export const CYCLE_MOTION = {
  phone: {
    entryEnd: 0.20,
    contentRevealStart: 0.24,
    contentRevealEnd: 0.52,
    holdEnd: 0.78,
    exitStart: 0.82,
    glowYieldStart: 0.80,
  },
  clock: {
    introEnd: 0.16,
    receiveInEnd: 0.18,
    pillInStart: 0.04,
    pillInEnd: 0.12,
    holdEnd: 0.78,
    yieldStart: 0.82,
    yieldEnd: 0.96,
  },
  laptop: {
    openEnd: 0.28,
    glowOpenEnd: 0.28,
    headlineHoldEnd: 0.40,
    screenPushStart: 0.32,
    screenPushEnd: 0.60,
    redTakeoverStart: 0.64,
    redTakeoverEnd: 1.0,
    briefingRevealStart: 0.64,
    briefingRevealEnd: 1.0,
    workMorphStart: 0.64,
    workMorphEnd: 1.0,
    holdEnd: 0.48,
    labelInStart: 0.03,
    labelInEnd: 0.12,
  },
  workTransition: {
    stackAlignStart: 0.04,
    stackAlignEnd: 0.18,
    cardMorphStart: 0.06,
    cardMorphEnd: 0.44,
    contentSwapStart: 0.32,
    contentSwapEnd: 0.60,
    titleFadeStart: 0.56,
    titleFadeEnd: 0.80,
  },
} as const;

export const PHONE_MODEL_LAYOUT = {
  targetHeight: 0.28,
  normalization: {
    rotation: { x: 0, y: 0, z: Math.PI },
    position: { x: 0, y: 0, z: 0 },
  },
  bodyFrame: {
    centerOffset: { x: 0.008, y: -0.01, z: 0 },
  },
  screenFrame: {
    widthRatio: 0.825,
    heightRatio: 0.958,
    centerOffsetRatio: { x: 0, y: 0 },
    cornerRadiusRatio: 0.165,
    face: 'max' as const,
    depthOffset: 0.0018,
    glassOffset: 0.0006,
    rotation: { x: 0, y: 0, z: 0 },
  },
} as const;

// Phone canvas dimensions
export const PHONE_CANVAS = { width: 640, height: 1280 } as const;

// Laptop screen canvas dimensions
export const LAPTOP_CANVAS = { width: 1024, height: 700 } as const;

// Clock face canvas dimensions
export const CLOCK_CANVAS = { width: 1600, height: 720 } as const;

// Shared model asset paths
export const MODEL_ASSETS = {
  phone: {
    glb: '/models/iphone17/iphone17pro.glb?v=5',
  },
  laptop: {
    fbx: '/models/macbook_m3_14/source/Lowpoly.fbx',
  },
} as const;

// ---------------------------------------------------------------------------
// Phase class thresholds (from updatePhaseClasses in codex)
// ---------------------------------------------------------------------------
export const PHASE_CLASS_THRESHOLDS = {
  dawn:    { start: 0.48, end: 0.86 },
  morning: { start: 0.62 },
} as const;

// ---------------------------------------------------------------------------
// Split phase time sequences (from codex flip clock animation)
// ---------------------------------------------------------------------------
export const BKK_TIME_SEQUENCE = [
  { h: 8,  m: 0,  ampm: 'PM' as const },
  { h: 9,  m: 15, ampm: 'PM' as const },
  { h: 10, m: 30, ampm: 'PM' as const },
  { h: 11, m: 45, ampm: 'PM' as const },
  { h: 1,  m: 15, ampm: 'AM' as const },
  { h: 3,  m: 30, ampm: 'AM' as const },
];

export const OVERNIGHT_BKK_TIME_SEQUENCE = [
  ...BKK_TIME_SEQUENCE,
  { h: 8, m: 0, ampm: 'PM' as const },
] as const;

// Split phase flip clock timing
export const SPLIT_FLIP = {
  flipStart: 0.20,
  flipEnd: 0.80,
  flipWindow: 0.4,
  exitStart: 0.82,
} as const;

export const CYCLE_TIME_MARKERS = [
  { id: 'handoff', label: 'Handoff', position: 0.08 },
  { id: 'work', label: 'Overnight work', position: 0.30 },
  { id: 'alarm', label: 'Alarm', position: 0.58 },
  { id: 'delivered', label: 'Delivered', position: 0.88 },
] as const;

// ---------------------------------------------------------------------------
// Scroll trigger config defaults
// ---------------------------------------------------------------------------
export const SCROLL_TRIGGER_DEFAULTS = {
  scrub: 0.1,
  cycleScrollDistance: 8.4, // in viewport heights
} as const;

// ---------------------------------------------------------------------------
// Page transition timing
// ---------------------------------------------------------------------------
export const PAGE_TRANSITION = {
  exitDuration: 0.3,
  enterDuration: 0.4,
  exitEase: 'power2.in',
  enterEase: 'power2.out',
} as const;

// ---------------------------------------------------------------------------
// Dev-only phase timing validation
// ---------------------------------------------------------------------------
if (process.env.NODE_ENV === 'development') {
  const phaseEntries = Object.entries(PHASES) as [string, { in: number; introEnd: number; holdEnd: number; outroStart: number; out: number }][];

  for (const [name, range] of phaseEntries) {
    if (range.in >= range.out) {
      console.error(`[Phase Timing] "${name}" has invalid range: in(${range.in}) >= out(${range.out})`);
    }
    if (!(range.in <= range.introEnd && range.introEnd <= range.holdEnd && range.holdEnd <= range.outroStart && range.outroStart <= range.out)) {
      console.error(
        `[Phase Timing] "${name}" has invalid chapter ordering: ` +
          `in(${range.in}) introEnd(${range.introEnd}) holdEnd(${range.holdEnd}) ` +
          `outroStart(${range.outroStart}) out(${range.out})`
      );
    }
  }

  for (let i = 0; i < phaseEntries.length - 1; i++) {
    const [nameA, rangeA] = phaseEntries[i];
    const [nameB, rangeB] = phaseEntries[i + 1];
    const overlap = rangeA.out - rangeB.in;
    if (overlap > FADE_IN_DURATION + FADE_OUT_DURATION + 0.02) {
      console.warn(
        `[Phase Timing] "${nameA}" and "${nameB}" have large overlap (${overlap.toFixed(3)}). ` +
        `Max safe overlap: ${(FADE_IN_DURATION + FADE_OUT_DURATION + 0.02).toFixed(3)}`
      );
    }
    if (rangeB.in >= rangeA.out) {
      console.warn(
        `[Phase Timing] Gap between "${nameA}" and "${nameB}": ` +
        `${nameA}.out(${rangeA.out}) <= ${nameB}.in(${rangeB.in}). User may see empty frame.`
      );
    }
  }
}
