import { FONTS, LAPTOP_CANVAS } from '@/lib/constants';
import { CYCLE_LAPTOP } from '@/lib/content';
import type { LaptopSequenceState } from '@/lib/cycleScreenState';
import type { EmailEntry } from '@/types';

export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number | [number, number, number, number],
): void {
  const radii: [number, number, number, number] =
    typeof r === 'number' ? [r, r, r, r] : r;

  ctx.beginPath();
  ctx.moveTo(x + radii[0], y);
  ctx.lineTo(x + w - radii[1], y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radii[1]);
  ctx.lineTo(x + w, y + h - radii[2]);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radii[2], y + h);
  ctx.lineTo(x + radii[3], y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radii[3]);
  ctx.lineTo(x, y + radii[0]);
  ctx.quadraticCurveTo(x, y, x + radii[0], y);
  ctx.closePath();
}

function mix(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function rgb(r: number, g: number, b: number) {
  return `rgb(${r}, ${g}, ${b})`;
}

function rgba(r: number, g: number, b: number, a: number) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function drawGrain(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  opacity: number,
): void {
  if (opacity <= 0.001) return;

  ctx.save();
  ctx.globalAlpha = opacity;
  for (let index = 0; index < 1600; index += 1) {
    const x = (index * 73) % width;
    const y = (index * 41) % height;
    const alpha = ((index % 5) / 5) * 0.08;
    ctx.fillStyle = rgba(255, 244, 230, alpha);
    ctx.fillRect(x, y, 1, 1);
  }
  ctx.restore();
}

export function drawLaptopScreen(
  ctx: CanvasRenderingContext2D,
  state: LaptopSequenceState,
  emails: EmailEntry[],
): void {
  const {
    screenReveal,
    glowAmount,
    greenScreenAmount,
    campaignReadyOpacity,
    pushIntoProgress,
    inboxOpacity,
    emailOpacities,
    emailOffsets,
    rowScales,
    activeIndex,
    redFlood,
  } = state;
  const w = LAPTOP_CANVAS.width;
  const h = LAPTOP_CANVAS.height;
  const tintField = greenScreenAmount;

  ctx.clearRect(0, 0, w, h);

  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(
    0,
    rgb(
      mix(245, 224, tintField),
      mix(241, 68, tintField),
      mix(232, 88, tintField),
    ),
  );
  bg.addColorStop(
    0.48,
    rgb(
      mix(239, 200, tintField),
      mix(234, 80, tintField),
      mix(223, 100, tintField),
    ),
  );
  bg.addColorStop(
    1,
    rgb(
      mix(228, 180, tintField),
      mix(222, 60, tintField),
      mix(214, 76, tintField),
    ),
  );
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const wakeGlow = ctx.createRadialGradient(
    w * 0.5,
    h * 0.22,
    0,
    w * 0.5,
    h * 0.24,
    h * 0.76,
  );
  wakeGlow.addColorStop(
    0,
    `rgba(255,214,220,${0.06 + glowAmount * 0.18 + tintField * 0.1})`,
  );
  wakeGlow.addColorStop(0.22, `rgba(224,68,88,${0.18 + glowAmount * 0.22 + tintField * 0.18})`);
  wakeGlow.addColorStop(0.58, `rgba(180,50,68,${0.08 + tintField * 0.18})`);
  wakeGlow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = wakeGlow;
  ctx.fillRect(0, 0, w, h);

  const lidBeam = ctx.createLinearGradient(0, 0, 0, h * 0.42);
  lidBeam.addColorStop(0, `rgba(255,220,226,${0.02 + glowAmount * 0.08 + tintField * 0.08})`);
  lidBeam.addColorStop(0.2, `rgba(224,68,88,${0.03 + glowAmount * 0.1 + tintField * 0.08})`);
  lidBeam.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = lidBeam;
  ctx.fillRect(0, 0, w, h * 0.42);

  const vignette = ctx.createLinearGradient(0, 0, 0, h);
  vignette.addColorStop(0, 'rgba(255,255,255,0.02)');
  vignette.addColorStop(0.45, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, `rgba(18,10,12,${0.14 + tintField * 0.12})`);
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);

  drawGrain(ctx, w, h, 0.04 + glowAmount * 0.04);

  ctx.save();
  ctx.globalAlpha = Math.max(0.1, screenReveal * 0.16);
  ctx.strokeStyle = `rgba(120,34,44,${0.08 + tintField * 0.08})`;
  ctx.lineWidth = 1;
  roundRect(ctx, 96, 60, w - 192, h - 120, 34);
  ctx.stroke();
  ctx.restore();

  if (campaignReadyOpacity > 0.01) {
    ctx.save();
    ctx.globalAlpha = campaignReadyOpacity;
    ctx.translate(0, (1 - campaignReadyOpacity) * 18 - pushIntoProgress * 8);

    roundRect(ctx, w / 2 - 112, 112, 224, 34, 17);
    ctx.fillStyle = 'rgba(88,20,30,0.08)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(88,20,30,0.14)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#5C1420';
    ctx.font = `500 12px ${FONTS.mono}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(CYCLE_LAPTOP.popupEyebrow.toUpperCase(), w / 2, 129);

    ctx.fillStyle = '#4A1018';
    ctx.font = `700 64px ${FONTS.heading}`;
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(CYCLE_LAPTOP.popupTitle, w / 2, 312);

    ctx.fillStyle = 'rgba(90,20,30,0.78)';
    ctx.font = `500 18px ${FONTS.body}`;
    ctx.fillText(CYCLE_LAPTOP.popupSubtitle, w / 2, 354);

    ctx.strokeStyle = 'rgba(90,20,30,0.18)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 104, 378);
    ctx.lineTo(w / 2 + 104, 378);
    ctx.stroke();
    ctx.restore();
  }

  if (redFlood > 0.01) {
    ctx.save();
    ctx.globalAlpha = redFlood;
    ctx.fillStyle = '#E04458';
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }
}
