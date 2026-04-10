import { FONTS, LAPTOP_CANVAS } from '@/lib/constants';
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
    composeProgress,
  } = state;
  const w = LAPTOP_CANVAS.width;
  const h = LAPTOP_CANVAS.height;
  const tintField = greenScreenAmount;

  ctx.clearRect(0, 0, w, h);

  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(
    0,
    rgb(
      mix(238, 210, tintField),
      mix(218, 48, tintField),
      mix(216, 68, tintField),
    ),
  );
  bg.addColorStop(
    0.48,
    rgb(
      mix(230, 185, tintField),
      mix(206, 55, tintField),
      mix(204, 75, tintField),
    ),
  );
  bg.addColorStop(
    1,
    rgb(
      mix(218, 160, tintField),
      mix(192, 40, tintField),
      mix(190, 58, tintField),
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
    `rgba(255,190,200,${0.08 + glowAmount * 0.22 + tintField * 0.12})`,
  );
  wakeGlow.addColorStop(0.22, `rgba(224,58,78,${0.22 + glowAmount * 0.26 + tintField * 0.2})`);
  wakeGlow.addColorStop(0.58, `rgba(170,40,58,${0.1 + tintField * 0.2})`);
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

  // Email composition — typing animation
  if (composeProgress > 0.01 && composeProgress < 0.90) {
    ctx.save();
    const composeAlpha =
      Math.min(composeProgress / 0.06, 1) *
      (1 - Math.max(0, (composeProgress - 0.78) / 0.12));
    ctx.globalAlpha = composeAlpha;

    // Compose window frame — centered and larger
    const cmpW = w - 140;
    const cmpH = h - 100;
    const cmpX = (w - cmpW) / 2;
    const cmpY = (h - cmpH) / 2;

    // Window background with subtle scale-in
    const scaleT = 1 - Math.pow(1 - Math.min(composeProgress / 0.08, 1), 3);
    const scale = 0.96 + 0.04 * scaleT;
    const cx = w / 2;
    const cy = h / 2;
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.translate(-cx, -cy);

    ctx.fillStyle = 'rgba(18,10,12,0.92)';
    roundRect(ctx, cmpX, cmpY, cmpW, cmpH, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(224,68,88,0.12)';
    ctx.lineWidth = 1;
    roundRect(ctx, cmpX, cmpY, cmpW, cmpH, 16);
    ctx.stroke();

    // Top bar with window controls
    const barH = 38;
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    roundRect(ctx, cmpX, cmpY, cmpW, barH, [16, 16, 0, 0]);
    ctx.fill();

    // Window dots
    const dotY = cmpY + barH / 2;
    const dotColors = ['rgba(255,95,87,0.7)', 'rgba(255,189,46,0.7)', 'rgba(39,201,63,0.7)'];
    for (let d = 0; d < 3; d++) {
      ctx.beginPath();
      ctx.arc(cmpX + 22 + d * 16, dotY, 5, 0, Math.PI * 2);
      ctx.fillStyle = dotColors[d];
      ctx.fill();
    }

    // "New Message" title
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = `500 13px ${FONTS.body}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('New Message', w / 2, dotY + 4);

    // Content area
    const contentY = cmpY + barH + 16;

    // "To:" field
    ctx.textAlign = 'left';
    ctx.font = `400 16px ${FONTS.body}`;
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fillText('To:', cmpX + 24, contentY + 4);

    const toText = 'team@client.com';
    const toChars = Math.floor(toText.length * Math.min(composeProgress / 0.06, 1));
    ctx.fillStyle = 'rgba(255,255,255,0.82)';
    ctx.fillText(toText.slice(0, toChars), cmpX + 56, contentY + 4);

    // Divider
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fillRect(cmpX + 20, contentY + 20, cmpW - 40, 1);

    // "Subject:" field
    const subjY = contentY + 40;
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = `400 16px ${FONTS.body}`;
    ctx.fillText('Subject:', cmpX + 24, subjY);

    const subjText = 'Campaign concepts \u2014 Q3 launch';
    const subjProgress = Math.max(0, (composeProgress - 0.06) / 0.10);
    const subjChars = Math.floor(subjText.length * Math.min(subjProgress, 1));
    ctx.fillStyle = 'rgba(255,255,255,0.82)';
    ctx.font = `500 16px ${FONTS.body}`;
    ctx.fillText(subjText.slice(0, subjChars), cmpX + 92, subjY);

    // Divider
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fillRect(cmpX + 20, subjY + 16, cmpW - 40, 1);

    // Body text — typed line by line
    const bodyLines = [
      'Hey team,',
      '',
      '3 directions attached with positioning,',
      'hooks, and rollout logic for each.',
      '',
      'Hero film cut is in v2 \u2014 :60 and :30',
      'versions graded and sound designed.',
      '',
      'Social suite (12 assets) ready to schedule.',
      '',
      'Let me know if you want to jump on a call',
      'to walk through the thinking.',
    ];

    const bodyStartProgress = 0.18;
    const bodyEndProgress = 0.58;
    const bodyProgress = Math.max(
      0,
      (composeProgress - bodyStartProgress) / (bodyEndProgress - bodyStartProgress),
    );
    const totalBodyChars = bodyLines.join('\n').length;
    const visibleBodyChars = Math.floor(totalBodyChars * Math.min(bodyProgress, 1));

    ctx.font = `400 15px ${FONTS.body}`;
    ctx.fillStyle = 'rgba(255,255,255,0.72)';
    let charCount = 0;
    const bodyBaseY = subjY + 44;
    const lineHeight = 22;

    for (let li = 0; li < bodyLines.length; li++) {
      const line = bodyLines[li];
      const lineStart = charCount;
      charCount += line.length + 1;

      if (lineStart >= visibleBodyChars) break;

      const lineChars = Math.min(line.length, visibleBodyChars - lineStart);
      const displayLine = line.slice(0, lineChars);
      ctx.fillText(displayLine, cmpX + 24, bodyBaseY + li * lineHeight);
    }

    // Blinking cursor
    const cursorBlink = Math.sin(composeProgress * 40) > 0 ? 1 : 0;
    if (bodyProgress > 0 && bodyProgress < 1) {
      let cursorLine = 0;
      let cursorX = cmpX + 24;
      let cc = 0;
      for (let li = 0; li < bodyLines.length; li++) {
        if (cc + bodyLines[li].length + 1 > visibleBodyChars) {
          cursorLine = li;
          const lineVisible = visibleBodyChars - cc;
          ctx.font = `400 15px ${FONTS.body}`;
          cursorX =
            cmpX + 24 + ctx.measureText(bodyLines[li].slice(0, lineVisible)).width + 2;
          break;
        }
        cc += bodyLines[li].length + 1;
      }

      ctx.globalAlpha = composeAlpha * cursorBlink * 0.7;
      ctx.fillStyle = '#E04458';
      ctx.fillRect(cursorX, bodyBaseY + cursorLine * lineHeight - 14, 2, 18);
    }

    // Signature area (appears after body is done)
    if (bodyProgress >= 1) {
      const sigT = Math.min((composeProgress - bodyEndProgress) / 0.08, 1);
      ctx.globalAlpha = composeAlpha * sigT * 0.6;
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fillRect(cmpX + 24, bodyBaseY + bodyLines.length * lineHeight + 8, cmpW - 48, 1);
      ctx.globalAlpha = composeAlpha * sigT * 0.5;
      ctx.font = `400 13px ${FONTS.body}`;
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.fillText('Noah Williams', cmpX + 24, bodyBaseY + bodyLines.length * lineHeight + 28);
      ctx.fillText('Creative Director', cmpX + 24, bodyBaseY + bodyLines.length * lineHeight + 44);
    }

    // Send animation (0.62-0.82)
    if (composeProgress > 0.62) {
      const sendT = Math.min((composeProgress - 0.62) / 0.16, 1);
      const sendEase = 1 - Math.pow(1 - sendT, 3);

      // Compose window slides up and shrinks
      if (sendT > 0.15) {
        const slideProgress = Math.min((sendT - 0.15) / 0.35, 1);
        const slideEase = 1 - Math.pow(1 - slideProgress, 2);
        ctx.globalAlpha = composeAlpha * (1 - slideEase * 0.9);
      }

      // "Sent" indicator with checkmark
      if (sendT > 0.4) {
        const sentAlpha = Math.min((sendT - 0.4) / 0.2, 1) * (1 - Math.max(0, (sendT - 0.8) / 0.2));
        ctx.globalAlpha = sentAlpha * composeAlpha;
        ctx.textAlign = 'center';
        ctx.font = `600 28px ${FONTS.heading}`;
        ctx.fillStyle = '#E04458';
        // Checkmark scales in
        const checkScale = 0.8 + sentAlpha * 0.2;
        ctx.save();
        ctx.translate(w / 2, h / 2);
        ctx.scale(checkScale, checkScale);
        ctx.fillText('\u2713 Sent', 0, 0);
        ctx.restore();
      }
    }

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
