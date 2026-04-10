import { CLOCK_CANVAS } from '@/lib/constants';
import {
  getClockFaceRenderState,
  type ClockFaceCardRenderState,
  type ClockFaceRenderState,
} from '@/lib/clockFaceState';
import type { ClockSequenceState } from '@/lib/cycleScreenState';
import { drawFlipClockDigit, type FlipClockDigit } from '@/lib/flipClockGlyphs';

export const CLOCK_TIME_START = '7:59';
export const CLOCK_TIME_END = '8:00';

interface CardLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DigitArt {
  top: HTMLCanvasElement;
  bottom: HTMLCanvasElement;
  topOverlap: number;
  bottomOverlap: number;
}

const DIGIT_ART_WIDTH = 360;
const DIGIT_ART_HEIGHT = 560;
const DIGIT_OVERLAP = 28;
const REST_SEAM_CLIP_PAD = 3;
const ACTIVE_SEAM_CLIP_PAD = 6;
const FACE_SURFACE_PATTERN_SIZE = 160;
const FACE_BLACK = '#14070b';
const FACE_BLACK_SOFT = '#12060a';
const FACE_BLACK_MID = '#16080d';
const FACE_BLACK_HIGHLIGHT = '#1a0a10';
const digitArtCache = new Map<FlipClockDigit, DigitArt>();
let faceSurfacePatternCanvas: HTMLCanvasElement | null = null;
const DIGIT_LAYOUT = {
  x: 0.06,
  y: -0.012,
  width: 0.87,
  height: 1.04,
} as const;
const FACE_LAYOUT = {
  cardY: 0.15,
  cardHeight: 0.7,
  carrierWidth: 0.88,
  digitWidth: 0.175,
  colonGap: 0.06,
  pairGap: 0.018,
  carrierOffsetX: 20,
  carrierOffsetY: 18,
  carrierRadius: 14,
  cardRadius: 9,
} as const;

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width * 0.5, height * 0.5);

  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function createWorkingCanvas(width: number, height: number) {
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function createSeededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 0x100000000;
  };
}

function getFaceSurfacePattern(
  ctx: CanvasRenderingContext2D,
): CanvasPattern | null {
  if (typeof document === 'undefined') return null;

  if (!faceSurfacePatternCanvas) {
    const canvas = document.createElement('canvas');
    canvas.width = FACE_SURFACE_PATTERN_SIZE;
    canvas.height = FACE_SURFACE_PATTERN_SIZE;
    const patternCtx = canvas.getContext('2d');
    if (!patternCtx) return null;

    const random = createSeededRandom(0xc10cface);

    for (let y = 0; y < FACE_SURFACE_PATTERN_SIZE; y += 4) {
      patternCtx.fillStyle = `rgba(255,255,255,${0.008 + random() * 0.008})`;
      patternCtx.fillRect(0, y, FACE_SURFACE_PATTERN_SIZE, 1);
    }

    for (let y = 2; y < FACE_SURFACE_PATTERN_SIZE; y += 7) {
      patternCtx.fillStyle = `rgba(0,0,0,${0.008 + random() * 0.01})`;
      patternCtx.fillRect(0, y, FACE_SURFACE_PATTERN_SIZE, 1);
    }

    for (let x = 0; x < FACE_SURFACE_PATTERN_SIZE; x += 22) {
      patternCtx.fillStyle = `rgba(255,255,255,${0.004 + random() * 0.004})`;
      patternCtx.fillRect(x, 0, 1, FACE_SURFACE_PATTERN_SIZE);
    }

    for (let index = 0; index < 900; index += 1) {
      const x = Math.floor(random() * FACE_SURFACE_PATTERN_SIZE);
      const y = Math.floor(random() * FACE_SURFACE_PATTERN_SIZE);
      const alpha = 0.012 + random() * 0.02;
      const tone = random() > 0.45 ? 255 : 0;
      patternCtx.fillStyle = `rgba(${tone},${tone},${tone},${alpha})`;
      patternCtx.fillRect(x, y, 1, 1);
    }

    faceSurfacePatternCanvas = canvas;
  }

  return ctx.createPattern(faceSurfacePatternCanvas, 'repeat');
}

function applySurfaceTexture(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  opacity: number,
) {
  const pattern = getFaceSurfacePattern(ctx);
  if (!pattern) return;

  ctx.save();
  roundRect(ctx, x, y, width, height, radius);
  ctx.clip();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = pattern;
  ctx.fillRect(x, y, width, height);
  ctx.restore();
}

function getDigitHalfOverlap(
  digit: FlipClockDigit,
  half: 'top' | 'bottom',
) {
  if (digit === '7') {
    return half === 'top'
      ? Math.round(DIGIT_OVERLAP * 0.68)
      : Math.round(DIGIT_OVERLAP * 0.34);
  }

  return DIGIT_OVERLAP;
}

function getDigitArt(digit: FlipClockDigit): DigitArt | null {
  const cached = digitArtCache.get(digit);
  if (cached) return cached;

  const topOverlap = getDigitHalfOverlap(digit, 'top');
  const bottomOverlap = getDigitHalfOverlap(digit, 'bottom');
  const full = createWorkingCanvas(DIGIT_ART_WIDTH, DIGIT_ART_HEIGHT);
  const top = createWorkingCanvas(
    DIGIT_ART_WIDTH,
    DIGIT_ART_HEIGHT * 0.5 + topOverlap,
  );
  const bottom = createWorkingCanvas(
    DIGIT_ART_WIDTH,
    DIGIT_ART_HEIGHT * 0.5 + bottomOverlap,
  );

  if (!full || !top || !bottom) return null;

  const fullCtx = full.getContext('2d');
  const topCtx = top.getContext('2d');
  const bottomCtx = bottom.getContext('2d');

  if (!fullCtx || !topCtx || !bottomCtx) return null;

  fullCtx.clearRect(0, 0, full.width, full.height);
  drawFlipClockDigit(
    fullCtx,
    digit,
    full.width * DIGIT_LAYOUT.x,
    full.height * DIGIT_LAYOUT.y,
    full.width * DIGIT_LAYOUT.width,
    full.height * DIGIT_LAYOUT.height,
    '#ffffff',
    0.95,
  );

  topCtx.clearRect(0, 0, top.width, top.height);
  topCtx.drawImage(
    full,
    0,
    0,
    full.width,
    full.height * 0.5 + topOverlap,
    0,
    0,
    top.width,
    top.height,
  );

  bottomCtx.clearRect(0, 0, bottom.width, bottom.height);
  bottomCtx.drawImage(
    full,
    0,
    full.height * 0.5 - bottomOverlap,
    full.width,
    full.height * 0.5 + bottomOverlap,
    0,
    0,
    bottom.width,
    bottom.height,
  );

  const art = { top, bottom, topOverlap, bottomOverlap };
  digitArtCache.set(digit, art);
  return art;
}

function getDigitBounds(card: CardLayout, digit: FlipClockDigit) {
  const x = card.x + card.width * DIGIT_LAYOUT.x;
  const y = card.y + card.height * DIGIT_LAYOUT.y;
  const width = card.width * DIGIT_LAYOUT.width;
  const height = card.height * DIGIT_LAYOUT.height;
  const topOverlap = height * (digit === '7' ? 0.05 : 0.08);
  const bottomOverlap = height * (digit === '7' ? 0.03 : 0.08);

  return {
    top: {
      x,
      y,
      width,
      height: height * 0.5 + topOverlap,
    },
    bottom: {
      x,
      y: y + height * 0.5 - bottomOverlap,
      width,
      height: height * 0.5 + bottomOverlap,
    },
  };
}

function lerpValue(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function getFlapInset(
  card: CardLayout,
  digit: FlipClockDigit,
  progress: number,
  phase: 'close' | 'open',
) {
  const maxInset =
    digit === '7'
      ? card.width * (phase === 'close' ? 0.022 : 0.014)
      : card.width * 0.048;

  return phase === 'close'
    ? lerpValue(0, maxInset, progress)
    : lerpValue(maxInset, 0, progress);
}

function drawDigitImage(
  ctx: CanvasRenderingContext2D,
  digit: FlipClockDigit,
  card: CardLayout,
  half: 'top' | 'bottom',
  alpha = 1,
  clipPad = 0,
) {
  const art = getDigitArt(digit);
  if (!art) return;

  const bounds = getDigitBounds(card, digit)[half];
  const image = half === 'top' ? art.top : art.bottom;
  const seamY = card.y + card.height * 0.5;

  ctx.save();
  ctx.globalAlpha = alpha;
  if (clipPad > 0) {
    ctx.beginPath();
    if (half === 'top') {
      ctx.rect(card.x, card.y - 2, card.width, card.height * 0.5 + clipPad + 4);
    } else {
      ctx.rect(
        card.x,
        seamY - clipPad - 2,
        card.width,
        card.height * 0.5 + clipPad + 4,
      );
    }
    ctx.clip();
  }
  ctx.drawImage(image, bounds.x, bounds.y, bounds.width, bounds.height);
  ctx.restore();
}

function drawCarrier(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  ctx.save();
  ctx.fillStyle = FACE_BLACK_HIGHLIGHT;
  roundRect(ctx, x, y, width, height, FACE_LAYOUT.carrierRadius);
  ctx.fill();
  applySurfaceTexture(ctx, x, y, width, height, FACE_LAYOUT.carrierRadius, 0.58);
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1.2;
  roundRect(ctx, x, y, width, height, FACE_LAYOUT.carrierRadius);
  ctx.stroke();
  ctx.restore();
}

function drawCardShell(ctx: CanvasRenderingContext2D, card: CardLayout) {
  const seamY = card.y + card.height * 0.5;

  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.34)';
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 7;
  ctx.fillStyle = FACE_BLACK_HIGHLIGHT;
  roundRect(ctx, card.x, card.y, card.width, card.height, FACE_LAYOUT.cardRadius);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = FACE_BLACK_HIGHLIGHT;
  ctx.fillRect(card.x, card.y, card.width, card.height);
  applySurfaceTexture(
    ctx,
    card.x,
    card.y,
    card.width,
    card.height,
    FACE_LAYOUT.cardRadius,
    0.54,
  );

  ctx.fillStyle = 'rgba(255,255,255,0.03)';
  ctx.fillRect(card.x + 12, card.y + 10, card.width - 24, 3);

  ctx.fillStyle = 'rgba(228,222,198,0.07)';
  ctx.fillRect(card.x + 12, seamY - 5, card.width - 24, 1.5);

  ctx.fillStyle = 'rgba(3,3,2,0.34)';
  ctx.fillRect(card.x + 10, seamY - 1.75, card.width - 20, 4.5);

  ctx.fillStyle = 'rgba(0,0,0,0.28)';
  ctx.fillRect(card.x + 12, seamY + 3, card.width - 24, 8);

  ctx.strokeStyle = 'rgba(255,255,255,0.042)';
  ctx.lineWidth = 1.15;
  roundRect(ctx, card.x, card.y, card.width, card.height, FACE_LAYOUT.cardRadius);
  ctx.stroke();
}

function drawRestingDigit(
  ctx: CanvasRenderingContext2D,
  card: CardLayout,
  digit: FlipClockDigit,
  alpha = 1,
) {
  drawDigitImage(ctx, digit, card, 'top', alpha, REST_SEAM_CLIP_PAD);
  drawDigitImage(ctx, digit, card, 'bottom', alpha, REST_SEAM_CLIP_PAD);
  drawSeamOcclusion(ctx, card, 0.12, 0.1);
}

function drawTopFlap(
  ctx: CanvasRenderingContext2D,
  card: CardLayout,
  digit: FlipClockDigit,
  progress: number,
) {
  const art = getDigitArt(digit);
  if (!art) return;

  const halfHeight = card.height * 0.5;
  const flapHeight = Math.max(
    halfHeight * (1 - progress * 0.92),
    halfHeight * 0.1,
  );
  const inset = getFlapInset(card, digit, progress, 'close');
  const travelY = lerpValue(0, halfHeight * 0.12, progress);
  const flapX = card.x + inset;
  const flapWidth = card.width - inset * 2;
  const flapY = card.y + travelY;

  ctx.save();
  ctx.beginPath();
  ctx.rect(card.x, card.y - 2, card.width, card.height * 0.5 + halfHeight * 0.16);
  ctx.clip();

  ctx.fillStyle = FACE_BLACK_HIGHLIGHT;
  roundRect(
    ctx,
    flapX,
    flapY,
    flapWidth,
    flapHeight + 4,
    Math.max(4, FACE_LAYOUT.cardRadius - progress * 4),
  );
  ctx.fill();
  applySurfaceTexture(
    ctx,
    flapX,
    flapY,
    flapWidth,
    flapHeight + 4,
    Math.max(4, FACE_LAYOUT.cardRadius - progress * 4),
    0.46,
  );

  ctx.drawImage(
    art.top,
    flapX,
    flapY + travelY * 0.12,
    flapWidth,
    flapHeight + art.topOverlap * 0.32,
  );

  const shadowGradient = ctx.createLinearGradient(
    flapX,
    flapY,
    flapX,
    flapY + flapHeight + 8,
  );
  shadowGradient.addColorStop(0, 'rgba(0,0,0,0)');
  shadowGradient.addColorStop(1, `rgba(0,0,0,${0.14 + progress * 0.26})`);
  ctx.fillStyle = shadowGradient;
  ctx.fillRect(flapX, flapY, flapWidth, flapHeight + 8);

  ctx.fillStyle = `rgba(255,255,255,${Math.max(0.02, 0.05 - progress * 0.03)})`;
  ctx.fillRect(flapX + 12, flapY + 9, Math.max(0, flapWidth - 24), 2);
  ctx.fillStyle = `rgba(0,0,0,${0.18 + progress * 0.28})`;
  ctx.fillRect(flapX + 10, flapY + flapHeight - 2, Math.max(0, flapWidth - 20), 7);
  ctx.restore();
}

function drawBottomFlap(
  ctx: CanvasRenderingContext2D,
  card: CardLayout,
  digit: FlipClockDigit,
  progress: number,
) {
  const art = getDigitArt(digit);
  if (!art) return;

  const halfHeight = card.height * 0.5;
  const flapHeight = Math.max(halfHeight * progress, halfHeight * 0.1);
  const inset = getFlapInset(card, digit, progress, 'open');
  const flapX = card.x + inset;
  const flapWidth = card.width - inset * 2;
  const seamY = card.y + card.height * 0.5;

  ctx.save();
  ctx.beginPath();
  ctx.rect(card.x, seamY - 6, card.width, card.height * 0.5 + 12);
  ctx.clip();

  ctx.fillStyle = FACE_BLACK_HIGHLIGHT;
  roundRect(
    ctx,
    flapX,
    seamY - 2,
    flapWidth,
    flapHeight + 6,
    Math.max(4, FACE_LAYOUT.cardRadius - (1 - progress) * 4),
  );
  ctx.fill();
  applySurfaceTexture(
    ctx,
    flapX,
    seamY - 2,
    flapWidth,
    flapHeight + 6,
    Math.max(4, FACE_LAYOUT.cardRadius - (1 - progress) * 4),
    0.42,
  );

  ctx.drawImage(
    art.bottom,
    flapX,
    seamY - art.bottomOverlap * 0.08,
    flapWidth,
    flapHeight + art.bottomOverlap * 0.28,
  );

  const highlightGradient = ctx.createLinearGradient(
    flapX,
    seamY - 2,
    flapX,
    seamY + flapHeight,
  );
  highlightGradient.addColorStop(0, `rgba(255,255,255,${0.05 + progress * 0.06})`);
  highlightGradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = highlightGradient;
  ctx.fillRect(flapX, seamY - 2, flapWidth, flapHeight + 8);

  ctx.fillStyle = `rgba(0,0,0,${0.08 + (1 - progress) * 0.14})`;
  ctx.fillRect(flapX + 10, seamY - 1, Math.max(0, flapWidth - 20), 5);
  ctx.restore();
}

function drawSeamOcclusion(
  ctx: CanvasRenderingContext2D,
  card: CardLayout,
  strength: number,
  compression: number,
) {
  const seamY = card.y + card.height * 0.5;
  const bandHeight = lerpValue(
    card.height * 0.025,
    card.height * 0.085,
    compression,
  );
  const innerX = card.x + 10;
  const innerWidth = Math.max(0, card.width - 20);
  const gapHeight = lerpValue(card.height * 0.012, card.height * 0.028, compression);

  ctx.save();
  const seamGradient = ctx.createLinearGradient(
    innerX,
    seamY - bandHeight,
    innerX,
    seamY + bandHeight,
  );
  seamGradient.addColorStop(0, 'rgba(0,0,0,0)');
  seamGradient.addColorStop(0.35, `rgba(0,0,0,${0.08 + strength * 0.18})`);
  seamGradient.addColorStop(0.5, `rgba(0,0,0,${0.2 + strength * 0.34})`);
  seamGradient.addColorStop(0.65, `rgba(0,0,0,${0.08 + strength * 0.18})`);
  seamGradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = seamGradient;
  ctx.fillRect(innerX, seamY - bandHeight, innerWidth, bandHeight * 2);

  ctx.fillStyle = `rgba(4,4,3,${0.22 + strength * 0.3})`;
  ctx.fillRect(
    innerX + 4,
    seamY - gapHeight * 0.5,
    Math.max(0, innerWidth - 8),
    gapHeight,
  );

  ctx.fillStyle = `rgba(255,255,255,${0.01 + (1 - compression) * 0.035})`;
  ctx.fillRect(
    innerX + 12,
    seamY - bandHeight * 0.6,
    Math.max(0, innerWidth - 24),
    1.2,
  );
  ctx.restore();
}

function drawSettleLighting(
  ctx: CanvasRenderingContext2D,
  card: CardLayout,
  progress: number,
) {
  const fade = 1 - progress;
  if (fade <= 0) return;

  ctx.save();
  const settleGradient = ctx.createLinearGradient(
    card.x,
    card.y,
    card.x,
    card.y + card.height,
  );
  settleGradient.addColorStop(0, `rgba(255,255,255,${fade * 0.03})`);
  settleGradient.addColorStop(0.5, 'rgba(255,255,255,0)');
  settleGradient.addColorStop(1, `rgba(0,0,0,${fade * 0.08})`);
  ctx.fillStyle = settleGradient;
  roundRect(ctx, card.x, card.y, card.width, card.height, FACE_LAYOUT.cardRadius);
  ctx.fill();
  ctx.restore();
}

function drawDigitCard(
  ctx: CanvasRenderingContext2D,
  card: CardLayout,
  cardState: ClockFaceCardRenderState,
) {
  drawCardShell(ctx, card);

  switch (cardState.phase) {
    case 'static':
      drawRestingDigit(ctx, card, cardState.fromDigit);
      return;

    case 'settled':
      drawRestingDigit(ctx, card, cardState.toDigit);
      return;

    case 'topClose':
      drawDigitImage(
        ctx,
        cardState.toDigit,
        card,
        'top',
        1,
        ACTIVE_SEAM_CLIP_PAD,
      );
      drawDigitImage(
        ctx,
        cardState.fromDigit,
        card,
        'bottom',
        1,
        ACTIVE_SEAM_CLIP_PAD,
      );
      drawTopFlap(ctx, card, cardState.fromDigit, cardState.phaseProgress);
      drawSeamOcclusion(ctx, card, 0.24 + cardState.phaseProgress * 0.42, cardState.phaseProgress * 0.72);
      break;

    case 'seamCross':
      {
        const outgoingBottomAlpha = Math.max(
          0,
          1 - cardState.phaseProgress * 1.05,
        );
        const incomingBottomAlpha =
          Math.max(0, (cardState.phaseProgress - 0.72) / 0.28) * 0.42;

      drawDigitImage(
        ctx,
        cardState.toDigit,
        card,
        'top',
        1,
        ACTIVE_SEAM_CLIP_PAD,
      );
      drawDigitImage(
        ctx,
        cardState.fromDigit,
        card,
        'bottom',
        outgoingBottomAlpha,
        ACTIVE_SEAM_CLIP_PAD,
      );
      drawDigitImage(
        ctx,
        cardState.toDigit,
        card,
        'bottom',
        incomingBottomAlpha,
        ACTIVE_SEAM_CLIP_PAD,
      );
      drawSeamOcclusion(ctx, card, 0.66, 1);
      break;
      }

    case 'bottomOpen':
      drawDigitImage(
        ctx,
        cardState.toDigit,
        card,
        'top',
        1,
        ACTIVE_SEAM_CLIP_PAD,
      );
      drawDigitImage(
        ctx,
        cardState.toDigit,
        card,
        'bottom',
        0.05 + cardState.phaseProgress * 0.12,
        ACTIVE_SEAM_CLIP_PAD,
      );
      drawBottomFlap(ctx, card, cardState.toDigit, cardState.phaseProgress);
      drawSeamOcclusion(
        ctx,
        card,
        0.16 + (1 - cardState.phaseProgress) * 0.28,
        0.9 - cardState.phaseProgress * 0.55,
      );
      break;

    case 'settle':
      drawRestingDigit(ctx, card, cardState.toDigit);
      drawSeamOcclusion(ctx, card, (1 - cardState.phaseProgress) * 0.14, 0.2);
      drawSettleLighting(ctx, card, cardState.phaseProgress);
      break;
  }
}

function drawColon(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.beginPath();
  ctx.roundRect(centerX - 5, centerY - 38, 10, 14, 4);
  ctx.fill();
  ctx.beginPath();
  ctx.roundRect(centerX - 5, centerY + 24, 10, 14, 4);
  ctx.fill();
  ctx.restore();
}

function drawPeriodLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
) {
  ctx.save();
  ctx.fillStyle = 'rgba(226,226,216,0.36)';
  ctx.font = '500 24px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
  ctx.restore();
}

export function drawClockFaceFromState(
  ctx: CanvasRenderingContext2D,
  renderState: ClockFaceRenderState,
) {
  const { width, height } = CLOCK_CANVAS;

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.globalAlpha = renderState.faceOpacity;

  // Background left transparent — 3D model face shows through

  const cardY = height * FACE_LAYOUT.cardY;
  const cardHeight = height * FACE_LAYOUT.cardHeight;
  const carrierWidth = width * FACE_LAYOUT.carrierWidth;
  const digitWidth = carrierWidth * FACE_LAYOUT.digitWidth;
  const colonGap = carrierWidth * FACE_LAYOUT.colonGap;
  const pairGap = carrierWidth * FACE_LAYOUT.pairGap;
  const usedWidth = digitWidth * 4 + pairGap * 2 + colonGap;
  const startX = (width - usedWidth) * 0.5;
  const hourTensX = startX;
  const hourOnesX = hourTensX + digitWidth + pairGap;
  const minuteTensX = hourOnesX + digitWidth + colonGap;
  const minuteOnesX = minuteTensX + digitWidth + pairGap;

  const cards: CardLayout[] = [
    { x: hourTensX, y: cardY, width: digitWidth, height: cardHeight },
    { x: hourOnesX, y: cardY, width: digitWidth, height: cardHeight },
    { x: minuteTensX, y: cardY, width: digitWidth, height: cardHeight },
    { x: minuteOnesX, y: cardY, width: digitWidth, height: cardHeight },
  ];

  // Shine indicators on each card
  ctx.fillStyle = 'rgba(232,227,207,0.18)';
  cards.forEach((card) => {
    [card.x + card.width * 0.24, card.x + card.width * 0.76].forEach((x) => {
      roundRect(ctx, x - 7, cardY - 18, 14, 16, 4);
      ctx.fill();
    });
  });

  cards.forEach((card, index) => {
    drawDigitCard(ctx, card, renderState.cards[index]);
  });

  drawColon(ctx, hourOnesX + digitWidth + colonGap * 0.5, cardY + cardHeight * 0.5);

  ctx.restore();
}

export function drawClockFace(
  ctx: CanvasRenderingContext2D,
  state: ClockSequenceState,
) {
  drawClockFaceFromState(ctx, getClockFaceRenderState(state));
}
