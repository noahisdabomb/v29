/**
 * Widen the flip clock's glass window opening.
 *
 * Key insight: only widen the FRAME (plastic + glass + black cavity),
 * NOT the back panel. This way the canvas overlay stays the same size
 * but more of it is visible through the wider opening.
 */

import fs from 'fs';

const INPUT = 'public/models/flip-clock/retro-flip-clock-shell.glb';
const OUTPUT = INPUT;
const SCALE_FACTOR = 1.22; // widen frame opening by 22%

// ── Parse GLB ──────────────────────────────────────────────────────────────
const buf = fs.readFileSync(INPUT);
const jsonLen = buf.readUInt32LE(12);
const gltf = JSON.parse(buf.slice(20, 20 + jsonLen).toString('utf8'));
const binOffset = 20 + jsonLen + 8;
const binLen = buf.readUInt32LE(20 + jsonLen);
const binData = Buffer.from(buf.slice(binOffset, binOffset + binLen));

function getFloatArray(accIdx) {
  const acc = gltf.accessors[accIdx];
  const bv = gltf.bufferViews[acc.bufferView];
  const off = (bv.byteOffset || 0) + (acc.byteOffset || 0);
  const components = acc.type === 'VEC3' ? 3 : acc.type === 'VEC2' ? 2 : acc.type === 'VEC4' ? 4 : 1;
  return new Float32Array(binData.buffer, binData.byteOffset + off, acc.count * components);
}

const mesh0 = gltf.meshes[0];
const matMap = {};
mesh0.primitives.forEach((p, i) => {
  matMap[gltf.materials[p.material].name] = i;
});
console.log('Material→primitive mapping:', matMap);

// ── 1. Scale DeskClockGlass Z ──────────────────────────────────────────────
const glassVerts = getFloatArray(mesh0.primitives[matMap.DeskClockGlass].attributes.POSITION);
for (let i = 0; i < glassVerts.length; i += 3) {
  glassVerts[i + 2] *= SCALE_FACTOR;
}
console.log(`Glass: scaled ${glassVerts.length / 3} vertices Z by ${SCALE_FACTOR}`);

// ── 2. Scale ClockBlack (cavity) Z ─────────────────────────────────────────
const blackVerts = getFloatArray(mesh0.primitives[matMap.ClockBlack].attributes.POSITION);
for (let i = 0; i < blackVerts.length; i += 3) {
  blackVerts[i + 2] *= SCALE_FACTOR;
}
console.log(`Black cavity: scaled ${blackVerts.length / 3} vertices Z by ${SCALE_FACTOR}`);

// ── 3. Scale ClockPlastic inner frame ──────────────────────────────────────
// For front-face vertices (X > 0.5), scale Z outward with graduated falloff.
// Vertices near center Z stay put; vertices near the glass boundary get full scale.
const plasticVerts = getFloatArray(mesh0.primitives[matMap.ClockPlastic].attributes.POSITION);
const FRONT_X = 0.5;
const FADE_START = 0.6; // |Z| below this: no scale
const FADE_END = 2.1;   // |Z| at or above: full scale
let plasticModified = 0;

for (let i = 0; i < plasticVerts.length; i += 3) {
  const x = plasticVerts[i];
  const z = plasticVerts[i + 2];
  const absZ = Math.abs(z);

  if (x < FRONT_X) continue;
  if (absZ < FADE_START) continue;

  const t = Math.min(1, (absZ - FADE_START) / (FADE_END - FADE_START));
  const factor = 1 + t * (SCALE_FACTOR - 1);
  plasticVerts[i + 2] = z * factor;
  plasticModified++;
}
console.log(`Plastic frame: scaled ${plasticModified} inner-edge vertices`);

// ── 4. DO NOT scale back panel or rails ────────────────────────────────────
// The canvas overlay plane is sized relative to the back panel.
// By keeping the panel the same size, the canvas stays the same size,
// but the wider frame opening reveals more of it.
console.log('Back panel + rails: unchanged (canvas stays same size)');

// ── 5. Update accessor bounds ──────────────────────────────────────────────
function updateBounds(accIdx) {
  const verts = getFloatArray(accIdx);
  const acc = gltf.accessors[accIdx];
  const components = acc.type === 'VEC3' ? 3 : acc.type === 'VEC2' ? 2 : 1;
  if (components < 3) return;
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < verts.length; i += components) {
    for (let c = 0; c < 3; c++) {
      min[c] = Math.min(min[c], verts[i + c]);
      max[c] = Math.max(max[c], verts[i + c]);
    }
  }
  acc.min = min;
  acc.max = max;
}

[matMap.DeskClockGlass, matMap.ClockBlack, matMap.ClockPlastic].forEach(primIdx => {
  updateBounds(mesh0.primitives[primIdx].attributes.POSITION);
});

// ── 6. Write modified GLB ──────────────────────────────────────────────────
const newJsonStr = JSON.stringify(gltf);
const jsonPad = (4 - (newJsonStr.length % 4)) % 4;
const jsonBuf = Buffer.from(newJsonStr + ' '.repeat(jsonPad), 'utf8');
const binPad = (4 - (binData.length % 4)) % 4;
const paddedBin = Buffer.concat([binData, Buffer.alloc(binPad)]);

const totalLen = 12 + 8 + jsonBuf.length + 8 + paddedBin.length;
const out = Buffer.alloc(totalLen);
out.writeUInt32LE(0x46546C67, 0);
out.writeUInt32LE(2, 4);
out.writeUInt32LE(totalLen, 8);
out.writeUInt32LE(jsonBuf.length, 12);
out.writeUInt32LE(0x4E4F534A, 16);
jsonBuf.copy(out, 20);
const binOff = 20 + jsonBuf.length;
out.writeUInt32LE(paddedBin.length, binOff);
out.writeUInt32LE(0x004E4942, binOff + 4);
paddedBin.copy(out, binOff + 8);

fs.writeFileSync(OUTPUT, out);
console.log(`\nWrote ${OUTPUT} (${out.length} bytes)`);
