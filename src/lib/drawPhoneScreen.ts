import { FONTS, PHONE_CANVAS } from '@/lib/constants';
import type { PhoneSequenceState } from '@/lib/cycleScreenState';
import type { LogEntry } from '@/types';

function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
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

function splitEntryText(entry: LogEntry): [string, string, string] {
  if (!entry.bold) {
    return [entry.text, '', ''];
  }

  const [lead = '', tail = ''] = entry.text.split(entry.bold);
  return [lead, entry.bold, tail];
}

type RichToken = {
  text: string;
  strong: boolean;
};

function createRichTokens(
  lead: string,
  bold: string,
  tail: string,
): RichToken[] {
  const tokens: RichToken[] = [];

  const pushWords = (text: string, strong: boolean) => {
    text
      .split(/\s+/)
      .map((word) => word.trim())
      .filter(Boolean)
      .forEach((word) => {
        tokens.push({ text: word, strong });
      });
  };

  pushWords(lead, false);
  pushWords(bold, true);
  pushWords(tail, false);
  return tokens;
}

function measureRichLine(
  ctx: CanvasRenderingContext2D,
  tokens: RichToken[],
  regularFont: string,
  strongFont: string,
) {
  let width = 0;
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    ctx.font = token.strong ? strongFont : regularFont;
    const prefix = index > 0 ? ' ' : '';
    width += ctx.measureText(prefix + token.text).width;
  }
  return width;
}

function wrapRichText(
  ctx: CanvasRenderingContext2D,
  tokens: RichToken[],
  maxWidth: number,
  regularFont: string,
  strongFont: string,
  maxLines = 2,
): RichToken[][] {
  const lines: RichToken[][] = [];
  let currentLine: RichToken[] = [];

  for (const token of tokens) {
    const candidate = [...currentLine, token];
    const candidateWidth = measureRichLine(
      ctx,
      candidate,
      regularFont,
      strongFont,
    );

    if (candidateWidth <= maxWidth || currentLine.length === 0) {
      currentLine = candidate;
      continue;
    }

    lines.push(currentLine);
    currentLine = [token];
    if (lines.length === maxLines - 1) {
      break;
    }
  }

  if (currentLine.length > 0) {
    if (lines.length === maxLines - 1) {
      const consumedCount = lines.reduce((sum, line) => sum + line.length, 0);
      lines.push(tokens.slice(consumedCount));
    } else {
      lines.push(currentLine);
    }
  }

  return lines.slice(0, maxLines);
}

function drawRichLine(
  ctx: CanvasRenderingContext2D,
  tokens: RichToken[],
  x: number,
  y: number,
  regularFont: string,
  strongFont: string,
  regularColor: string,
  strongColor: string,
) {
  let cursorX = x;
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    const prefix = index > 0 ? ' ' : '';
    const text = prefix + token.text;
    ctx.font = token.strong ? strongFont : regularFont;
    ctx.fillStyle = token.strong ? strongColor : regularColor;
    ctx.fillText(text, cursorX, y);
    cursorX += ctx.measureText(text).width;
  }
}

function wrapPlainText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth || current.length === 0) {
      current = test;
      continue;
    }

    lines.push(current);
    current = word;
    if (lines.length === 1) break;
  }

  if (current) {
    lines.push(current);
  }

  return lines.slice(0, 2);
}

export type PhoneScreenState = PhoneSequenceState;

export function drawPhoneScreen(
  ctx: CanvasRenderingContext2D,
  state: PhoneScreenState,
  items: readonly LogEntry[],
  motionPhase = 0,
): void {
  const {
    standbyOpacity,
    standbyGlow,
    statusOpacity,
    headerOpacity,
    headerOffset,
    headerRuleProgress,
    headerGlow,
    lineGlow,
    entryOpacities,
    entryOffsets,
    entryXOffsets,
    rowScales,
    entryStates,
    activeIndex,
    activePulse,
    lineProgress,
  } = state;
  const w = PHONE_CANVAS.width;
  const h = PHONE_CANVAS.height;

  ctx.clearRect(0, 0, w, h);

  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#030408');
  bg.addColorStop(0.58, '#07080c');
  bg.addColorStop(1, '#090b10');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const standbyBase = ctx.createLinearGradient(0, 0, 0, h);
  standbyBase.addColorStop(0, `rgba(58,24,36,${0.22 * standbyOpacity})`);
  standbyBase.addColorStop(0.38, `rgba(34,16,25,${0.16 * standbyOpacity})`);
  standbyBase.addColorStop(1, `rgba(14,10,16,${0.1 * standbyOpacity})`);
  ctx.fillStyle = standbyBase;
  ctx.fillRect(0, 0, w, h);

  const topGlow = ctx.createRadialGradient(w * 0.5, 0, 0, w * 0.5, 0, h * 0.36);
  topGlow.addColorStop(0, `rgba(255,255,255,${0.04 + standbyGlow * 0.08})`);
  topGlow.addColorStop(0.32, 'rgba(255,255,255,0)');
  ctx.fillStyle = topGlow;
  ctx.fillRect(0, 0, w, h);

  const accentGlow = ctx.createRadialGradient(
    w * 0.5,
    h * 0.18,
    0,
    w * 0.5,
    h * 0.18,
    h * 0.3,
  );
  accentGlow.addColorStop(0, `rgba(224,68,88,${0.07 + standbyGlow * 0.16})`);
  accentGlow.addColorStop(0.4, `rgba(224,68,88,${0.02 + standbyGlow * 0.06})`);
  accentGlow.addColorStop(1, 'rgba(224,68,88,0)');
  ctx.fillStyle = accentGlow;
  ctx.fillRect(0, 0, w, h);

  const pulseY = h * (0.2 + motionPhase * 0.55);
  const movingGlow = ctx.createRadialGradient(
    w * (0.44 + motionPhase * 0.1),
    pulseY,
    0,
    w * 0.48,
    pulseY,
    h * 0.28,
  );
  movingGlow.addColorStop(0, `rgba(224,68,88,${0.03 + standbyGlow * 0.1 + headerGlow * 0.05 + lineGlow * 0.04})`);
  movingGlow.addColorStop(0.45, `rgba(224,68,88,${0.012 + standbyGlow * 0.03 + lineGlow * 0.024})`);
  movingGlow.addColorStop(1, 'rgba(224,68,88,0)');
  ctx.fillStyle = movingGlow;
  ctx.fillRect(0, 0, w, h);

  const sweepX = (-0.22 + motionPhase * 1.45) * w;
  const cinematicSweep = ctx.createLinearGradient(sweepX, 0, sweepX + w * 0.34, h);
  cinematicSweep.addColorStop(0, 'rgba(255,255,255,0)');
  cinematicSweep.addColorStop(0.45, `rgba(255,255,255,${0.022 + headerGlow * 0.018 + activePulse * 0.03})`);
  cinematicSweep.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = cinematicSweep;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.strokeStyle = `rgba(255,255,255,${0.02 + standbyGlow * 0.02})`;
  ctx.lineWidth = 1;
  for (let x = 30; x < w - 30; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 24);
    ctx.lineTo(x, h - 24);
    ctx.stroke();
  }
  for (let y = 28; y < h - 28; y += 40) {
    ctx.beginPath();
    ctx.moveTo(24, y);
    ctx.lineTo(w - 24, y);
    ctx.stroke();
  }
  ctx.restore();

  const vignette = ctx.createRadialGradient(w * 0.5, h * 0.42, h * 0.12, w * 0.5, h * 0.42, h * 0.78);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.24)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.strokeStyle = `rgba(255,255,255,${0.028 + standbyGlow * 0.05})`;
  ctx.lineWidth = 1;
  roundedRectPath(ctx, 22, 20, w - 44, h - 40, 46);
  ctx.stroke();
  ctx.restore();

  if (statusOpacity > 0.01) {
    ctx.save();
    ctx.globalAlpha = statusOpacity;
    ctx.fillStyle = `rgba(255,255,255,${0.36 + activePulse * 0.08})`;
    ctx.font = `400 16px ${FONTS.mono}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('5:58 AM', 36, 40 + motionPhase * 1.4);
    ctx.textAlign = 'right';
    ctx.fillText('BKK  •  GMT+7', w - 36, 40 + motionPhase * 1.4);
    ctx.restore();
  }

  if (headerOpacity > 0.01) {
    ctx.save();
    ctx.globalAlpha = headerOpacity;

    const dotX = 46;
    const dotY = 112 + headerOffset;
    ctx.fillStyle = `rgba(224,68,88,${0.78 + headerGlow * 0.12})`;
    ctx.shadowColor = `rgba(224,68,88,${0.16 + headerGlow * 0.2})`;
    ctx.shadowBlur = 16 + headerGlow * 12;
    ctx.beginPath();
    ctx.arc(dotX, dotY, 7.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    ctx.fillStyle = `rgba(224,68,88,${0.84 + headerGlow * 0.08})`;
    ctx.font = `400 18px ${FONTS.mono}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    if ('letterSpacing' in ctx) {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '4px';
    }
    ctx.fillText('ACTIVITY LOG', 72, dotY);
    if ('letterSpacing' in ctx) {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '0px';
    }

    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(36, 146 + headerOffset);
    ctx.lineTo(w - 36, 146 + headerOffset);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(224,68,88,0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(36, 146 + headerOffset);
    ctx.lineTo(36 + (w - 72) * headerRuleProgress, 146 + headerOffset);
    ctx.stroke();

    const sweepWidth = Math.max(46, w * 0.14);
    const sweepLead = 36 + (w - 72 + sweepWidth) * motionPhase - sweepWidth;
    const ruleSweep = ctx.createLinearGradient(sweepLead, 0, sweepLead + sweepWidth, 0);
    ruleSweep.addColorStop(0, 'rgba(255,255,255,0)');
    ruleSweep.addColorStop(0.5, `rgba(255,244,247,${headerGlow * 0.28})`);
    ruleSweep.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.strokeStyle = ruleSweep;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(36, 146 + headerOffset);
    ctx.lineTo(36 + (w - 72) * headerRuleProgress, 146 + headerOffset);
    ctx.stroke();
    ctx.restore();
  }

  const rowStartY = 168;
  const rowBottom = h - 74;
  const rowGap = 14;
  const cardX = 58;
  const cardWidth = w - cardX - 20;
  const cardHeight = (rowBottom - rowStartY - rowGap * (items.length - 1)) / items.length;
  const cardRadius = 24;
  const timeX = cardX + 18;
  const copyX = cardX + 92;
  const regularFont = `400 25px ${FONTS.body}`;
  const strongFont = `600 25px ${FONTS.body}`;
  const metaFont = `400 12px ${FONTS.mono}`;
  const lineX = 42;
  const lineTop = rowStartY + 10;
  const lineBottom = rowBottom - 8;
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(lineX, lineTop);
  ctx.lineTo(lineX, lineBottom);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(224,68,88,0.9)';
  ctx.shadowColor = `rgba(224,68,88,${0.24 + lineGlow * 0.28})`;
  ctx.shadowBlur = 12 + lineGlow * 10;
  ctx.beginPath();
  ctx.moveTo(lineX, lineTop);
  ctx.lineTo(lineX, lineTop + (lineBottom - lineTop) * lineProgress);
  ctx.stroke();
  const lineNodeY = lineTop + (lineBottom - lineTop) * Math.min(lineProgress + motionPhase * 0.08, 1);
  ctx.fillStyle = `rgba(255,245,247,${0.3 + lineGlow * 0.38})`;
  ctx.beginPath();
  ctx.arc(lineX, lineNodeY, 4.2 + lineGlow * 1.8, 0, Math.PI * 2);
  ctx.fill();
  const lineSweep = ctx.createLinearGradient(lineX - 8, lineNodeY - 28, lineX + 8, lineNodeY + 28);
  lineSweep.addColorStop(0, 'rgba(255,255,255,0)');
  lineSweep.addColorStop(0.5, `rgba(255,247,249,${0.12 + lineGlow * 0.18})`);
  lineSweep.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.strokeStyle = lineSweep;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(lineX, Math.max(lineTop, lineNodeY - 28));
  ctx.lineTo(lineX, Math.min(lineBottom, lineNodeY + 28));
  ctx.stroke();
  ctx.restore();

  for (let index = 0; index < items.length; index += 1) {
    if (entryOpacities[index] < 0.01) continue;

    const entry = items[index];
    const rowState = entryStates[index];
    const isActive = index === activeIndex;
    const isPast = rowState === 'past';
    const y = rowStartY + index * (cardHeight + rowGap) + entryOffsets[index];
    const [lead, bold, tail] = splitEntryText(entry);
    const richTokens = createRichTokens(lead, bold, tail);

    ctx.save();
    ctx.globalAlpha = entryOpacities[index];
    ctx.translate(cardX + cardWidth / 2 + entryXOffsets[index], y + cardHeight / 2);
    ctx.scale(rowScales[index], rowScales[index]);
    ctx.translate(-(cardX + cardWidth / 2), -(y + cardHeight / 2));

    if (isActive) {
      const fill = ctx.createLinearGradient(cardX, y, cardX, y + cardHeight);
      fill.addColorStop(0, `rgba(224,68,88,${0.15 + activePulse * 0.05})`);
      fill.addColorStop(1, `rgba(224,68,88,${0.08 + activePulse * 0.04})`);
      ctx.fillStyle = fill;
      roundedRectPath(ctx, cardX, y, cardWidth, cardHeight, cardRadius);
      ctx.fill();

      const sheenWidth = cardWidth * 0.34;
      const sheenX = cardX - sheenWidth * 0.4 + motionPhase * (cardWidth + sheenWidth);
      const sheen = ctx.createLinearGradient(sheenX, y, sheenX + sheenWidth, y);
      sheen.addColorStop(0, 'rgba(255,255,255,0)');
      sheen.addColorStop(0.5, `rgba(255,240,245,${0.06 + activePulse * 0.06})`);
      sheen.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = sheen;
      roundedRectPath(ctx, cardX, y, cardWidth, cardHeight, cardRadius);
      ctx.fill();

      ctx.shadowColor = 'rgba(0,0,0,0.18)';
      ctx.shadowBlur = 26 + activePulse * 10;
      ctx.shadowOffsetY = 8;
      roundedRectPath(ctx, cardX, y, cardWidth, cardHeight, cardRadius);
      ctx.strokeStyle = `rgba(224,68,88,${0.12 + activePulse * 0.07})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
    } else {
      ctx.fillStyle = `rgba(255,255,255,${0.018 + lineGlow * 0.01})`;
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 1;
      roundedRectPath(ctx, cardX, y, cardWidth, cardHeight, 20);
      ctx.fill();
      roundedRectPath(ctx, cardX, y, cardWidth, cardHeight, 20);
      ctx.stroke();

      const passiveSheenX = cardX - cardWidth * 0.2 + motionPhase * (cardWidth * 1.2);
      const passiveSheen = ctx.createLinearGradient(
        passiveSheenX,
        y,
        passiveSheenX + cardWidth * 0.22,
        y,
      );
      passiveSheen.addColorStop(0, 'rgba(255,255,255,0)');
      passiveSheen.addColorStop(0.5, `rgba(255,255,255,${0.022 + lineGlow * 0.016})`);
      passiveSheen.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = passiveSheen;
      roundedRectPath(ctx, cardX, y, cardWidth, cardHeight, 20);
      ctx.fill();
    }

    ctx.fillStyle = isActive
      ? '#E04458'
      : isPast
        ? 'rgba(224,68,88,0.55)'
        : 'rgba(224,68,88,0.38)';
    ctx.font = `400 21px ${FONTS.mono}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(entry.time, timeX, y + 18);

    if (isActive) {
      ctx.fillStyle = `rgba(224,68,88,${0.82 + activePulse * 0.06})`;
      ctx.font = metaFont;
      if ('letterSpacing' in ctx) {
        (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '2px';
      }
      ctx.textAlign = 'right';
      ctx.fillText('HANDOFF READY', cardX + cardWidth - 18, y + 18);
      if ('letterSpacing' in ctx) {
        (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '0px';
      }
    }

    ctx.textAlign = 'left';
    ctx.fillStyle = isActive
      ? '#E04458'
      : isPast
        ? 'rgba(224,68,88,0.55)'
        : 'rgba(255,255,255,0.22)';
    ctx.beginPath();
    ctx.arc(copyX - 14, y + 20, 3.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = isActive
      ? '#ffffff'
      : isPast
        ? 'rgba(255,255,255,0.68)'
        : 'rgba(255,255,255,0.46)';
    ctx.font = regularFont;

    const maxWidth = cardX + cardWidth - copyX - 18;
    const lineHeight = 32;
    const regularColor = isActive
      ? '#ffffff'
      : isPast
        ? 'rgba(255,255,255,0.64)'
        : 'rgba(255,255,255,0.5)';
    const strongColor = isActive ? '#ffffff' : 'rgba(255,255,255,0.86)';
    const bodyTop = y + Math.max(54, cardHeight * 0.43);

    if (!bold) {
      const wrapped = wrapPlainText(ctx, lead, maxWidth);
      wrapped.forEach((line, lineIndex) => {
        ctx.fillText(line, copyX, bodyTop + lineIndex * lineHeight);
      });
    } else {
      const wrappedLines = wrapRichText(
        ctx,
        richTokens,
        maxWidth,
        regularFont,
        strongFont,
      );
      wrappedLines.forEach((line, lineIndex) => {
        drawRichLine(
          ctx,
          line,
          copyX,
          bodyTop + lineIndex * lineHeight,
          regularFont,
          strongFont,
          regularColor,
          strongColor,
        );
      });
    }

    if (isActive) {
      ctx.strokeStyle = `rgba(255,245,247,${0.07 + activePulse * 0.08})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(copyX, y + 12);
      ctx.lineTo(cardX + cardWidth - 18, y + 12);
      ctx.stroke();
    }

    ctx.restore();
  }
}
