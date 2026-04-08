export type FlipClockDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

function rrect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  ccw = false,
) {
  const r = Math.min(radius, width * 0.5, height * 0.5);

  if (ccw) {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x, y);
    ctx.quadraticCurveTo(x, y, x, y + r);
    ctx.lineTo(x, y + height - r);
    ctx.quadraticCurveTo(x, y + height, x + r, y + height);
    ctx.lineTo(x + width - r, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - r);
    ctx.lineTo(x + width, y + r);
    ctx.quadraticCurveTo(x + width, y, x + width - r, y);
    ctx.closePath();
    return;
  }

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

function roundedPolygon(
  ctx: CanvasRenderingContext2D,
  vertices: Array<[number, number]>,
  radius: number,
) {
  const count = vertices.length;

  for (let index = 0; index < count; index += 1) {
    const previous = vertices[(index - 1 + count) % count];
    const current = vertices[index];
    const next = vertices[(index + 1) % count];

    const dx1 = previous[0] - current[0];
    const dy1 = previous[1] - current[1];
    const dx2 = next[0] - current[0];
    const dy2 = next[1] - current[1];
    const length1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    const length2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
    const r = Math.min(radius, length1 * 0.45, length2 * 0.45);

    const p1x = current[0] + (dx1 / length1) * r;
    const p1y = current[1] + (dy1 / length1) * r;
    const p2x = current[0] + (dx2 / length2) * r;
    const p2y = current[1] + (dy2 / length2) * r;

    if (index === 0) ctx.moveTo(p1x, p1y);
    else ctx.lineTo(p1x, p1y);

    ctx.quadraticCurveTo(current[0], current[1], p2x, p2y);
  }

  ctx.closePath();
}

export function drawFlipClockDigit(
  ctx: CanvasRenderingContext2D,
  digit: FlipClockDigit,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  alpha = 1,
) {
  const sw = width * 0.23;
  const cr = width * 0.2;
  const icr = cr * 0.55;
  const mid = y + height * 0.5;
  const bottom = y + height;

  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;

  switch (digit) {
    case '0':
      ctx.beginPath();
      rrect(ctx, x, y, width, height, cr);
      rrect(ctx, x + sw, y + sw, width - sw * 2, height - sw * 2, icr, true);
      ctx.fill('evenodd');
      break;

    case '1': {
      const barW = sw * 1.1;
      const flagW = sw * 1.3;
      const cx = x + width * 0.5;
      ctx.beginPath();
      roundedPolygon(
        ctx,
        [
          [cx - barW * 0.5 - flagW, y + sw * 0.9],
          [cx - barW * 0.5, y],
          [cx + barW * 0.5, y],
          [cx + barW * 0.5, bottom],
          [cx - barW * 0.5, bottom],
          [cx - barW * 0.5, y + sw * 1.6],
        ],
        cr * 0.5,
      );
      ctx.fill();
      break;
    }

    case '2': {
      const midTop = mid - sw * 0.5;
      const midBottom = mid + sw * 0.5;
      ctx.beginPath();
      roundedPolygon(
        ctx,
        [
          [x, y],
          [x + width, y],
          [x + width, midBottom],
          [x + sw, midBottom],
          [x + sw, bottom - sw],
          [x + width, bottom - sw],
          [x + width, bottom],
          [x, bottom],
          [x, midTop],
          [x + width - sw, midTop],
          [x + width - sw, y + sw],
          [x, y + sw],
        ],
        cr * 0.65,
      );
      ctx.fill();
      break;
    }

    case '3': {
      const midTop = mid - sw * 0.5;
      const midBottom = mid + sw * 0.5;
      ctx.beginPath();
      roundedPolygon(
        ctx,
        [
          [x, y],
          [x + width, y],
          [x + width, bottom],
          [x, bottom],
          [x, bottom - sw],
          [x + width - sw, bottom - sw],
          [x + width - sw, midBottom],
          [x + sw, midBottom],
          [x + sw, midTop],
          [x + width - sw, midTop],
          [x + width - sw, y + sw],
          [x, y + sw],
        ],
        cr * 0.65,
      );
      ctx.fill();
      break;
    }

    case '4': {
      const midTop = mid - sw * 0.5;
      const midBottom = mid + sw * 0.5;
      ctx.beginPath();
      roundedPolygon(
        ctx,
        [
          [x, y],
          [x + sw, y],
          [x + sw, midTop],
          [x + width - sw, midTop],
          [x + width - sw, y],
          [x + width, y],
          [x + width, bottom],
          [x + width - sw, bottom],
          [x + width - sw, midBottom],
          [x, midBottom],
        ],
        cr * 0.5,
      );
      ctx.fill();
      break;
    }

    case '5': {
      const midTop = mid - sw * 0.5;
      const midBottom = mid + sw * 0.5;
      ctx.beginPath();
      roundedPolygon(
        ctx,
        [
          [x, y],
          [x + width, y],
          [x + width, y + sw],
          [x + sw, y + sw],
          [x + sw, midTop],
          [x + width, midTop],
          [x + width, bottom],
          [x, bottom],
          [x, bottom - sw],
          [x + width - sw, bottom - sw],
          [x + width - sw, midBottom],
          [x, midBottom],
        ],
        cr * 0.65,
      );
      ctx.fill();
      break;
    }

    case '6': {
      const midTop = mid - sw * 0.5;
      const midBottom = mid + sw * 0.5;
      const counterHeight = bottom - sw - midBottom;
      ctx.beginPath();
      roundedPolygon(
        ctx,
        [
          [x, y],
          [x + width, y],
          [x + width, y + sw],
          [x + sw, y + sw],
          [x + sw, midTop],
          [x + width, midTop],
          [x + width, bottom],
          [x, bottom],
        ],
        cr * 0.7,
      );
      rrect(
        ctx,
        x + sw,
        midBottom,
        width - sw * 2,
        counterHeight,
        icr,
        true,
      );
      ctx.fill('evenodd');
      break;
    }

    case '7':
      ctx.beginPath();
      roundedPolygon(
        ctx,
        [
          [x, y],
          [x + width, y],
          [x + width, bottom],
          [x + width - sw, bottom],
          [x + width - sw, y + sw],
          [x, y + sw],
        ],
        cr * 0.85,
      );
      ctx.fill();
      break;

    case '8': {
      const midTop = mid - sw * 0.5;
      const midBottom = mid + sw * 0.5;
      const topCounterH = midTop - (y + sw);
      const botCounterH = (bottom - sw) - midBottom;
      ctx.beginPath();
      rrect(ctx, x, y, width, height, cr);
      rrect(ctx, x + sw, y + sw, width - sw * 2, topCounterH, icr, true);
      rrect(ctx, x + sw, midBottom, width - sw * 2, botCounterH, icr, true);
      ctx.fill('evenodd');
      break;
    }

    case '9': {
      const midTop = mid - sw * 0.5;
      const midBottom = mid + sw * 0.5;
      const counterHeight = midTop - (y + sw);
      ctx.beginPath();
      roundedPolygon(
        ctx,
        [
          [x, y],
          [x + width, y],
          [x + width, bottom],
          [x, bottom],
          [x, bottom - sw],
          [x + width - sw, bottom - sw],
          [x + width - sw, midBottom],
          [x, midBottom],
        ],
        cr * 0.7,
      );
      rrect(
        ctx,
        x + sw,
        y + sw,
        width - sw * 2,
        counterHeight,
        icr,
        true,
      );
      ctx.fill('evenodd');
      break;
    }
  }

  ctx.restore();
}
