(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/three/ClockModelPolish.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClockModelPolish
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Gltf.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Texture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Texture.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycleScreenState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cycleScreenState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$drawClockFace$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/drawClockFace.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/scrollStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
const CLOCK_MODEL_URL = '/models/flip-clock/retro-flip-clock-refined.glb?v=polish-1';
const CLOCK_TEXTURE_ROOT = '/models/flip-clock/textures';
const FACE_MASK = {
    width: 0.9,
    height: 0.84,
    radius: 0.13
};
const FACE_SURFACE_PATTERN_SIZE = 192;
const RENDER_ORDERS = {
    ClockBody: 1,
    ClockFrontBlack: 2,
    ClockCavityBacker: 3,
    ClockShadowRailTop: 3,
    ClockShadowRailBottom: 3,
    ClockGlass: 5
};
let faceSurfacePatternCanvas = null;
function createRoundedRectShape(width, height, radius) {
    const halfWidth = width * 0.5;
    const halfHeight = height * 0.5;
    const r = Math.min(radius, halfWidth, halfHeight);
    const shape = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Shape"]();
    shape.moveTo(-halfWidth + r, -halfHeight);
    shape.lineTo(halfWidth - r, -halfHeight);
    shape.absarc(halfWidth - r, -halfHeight + r, r, -Math.PI / 2, 0, false);
    shape.lineTo(halfWidth, halfHeight - r);
    shape.absarc(halfWidth - r, halfHeight - r, r, 0, Math.PI / 2, false);
    shape.lineTo(-halfWidth + r, halfHeight);
    shape.absarc(-halfWidth + r, halfHeight - r, r, Math.PI / 2, Math.PI, false);
    shape.lineTo(-halfWidth, -halfHeight + r);
    shape.absarc(-halfWidth + r, -halfHeight + r, r, Math.PI, Math.PI * 1.5, false);
    return shape;
}
function roundRect(ctx, x, y, width, height, radius) {
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
function createSeededRandom(seed) {
    let value = seed >>> 0;
    return ()=>{
        value = value * 1664525 + 1013904223 >>> 0;
        return value / 0x100000000;
    };
}
function getFaceSurfacePattern(ctx) {
    if (typeof document === 'undefined') return null;
    if (!faceSurfacePatternCanvas) {
        const canvas = document.createElement('canvas');
        canvas.width = FACE_SURFACE_PATTERN_SIZE;
        canvas.height = FACE_SURFACE_PATTERN_SIZE;
        const patternCtx = canvas.getContext('2d');
        if (!patternCtx) return null;
        const random = createSeededRandom(0xc10cfa1e);
        patternCtx.fillStyle = '#0a0a09';
        patternCtx.fillRect(0, 0, canvas.width, canvas.height);
        for(let y = 0; y < FACE_SURFACE_PATTERN_SIZE; y += 4){
            patternCtx.fillStyle = `rgba(255,255,255,${0.003 + random() * 0.002})`;
            patternCtx.fillRect(0, y, FACE_SURFACE_PATTERN_SIZE, 1);
        }
        for(let y = 2; y < FACE_SURFACE_PATTERN_SIZE; y += 8){
            patternCtx.fillStyle = `rgba(0,0,0,${0.003 + random() * 0.003})`;
            patternCtx.fillRect(0, y, FACE_SURFACE_PATTERN_SIZE, 1);
        }
        for(let x = 0; x < FACE_SURFACE_PATTERN_SIZE; x += 28){
            patternCtx.fillStyle = `rgba(255,255,255,${0.0015 + random() * 0.0015})`;
            patternCtx.fillRect(x, 0, 1, FACE_SURFACE_PATTERN_SIZE);
        }
        for(let x = 12; x < FACE_SURFACE_PATTERN_SIZE; x += 36){
            patternCtx.fillStyle = `rgba(0,0,0,${0.0015 + random() * 0.0015})`;
            patternCtx.fillRect(x, 0, 1, FACE_SURFACE_PATTERN_SIZE);
        }
        for(let index = 0; index < 220; index += 1){
            const x = Math.floor(random() * FACE_SURFACE_PATTERN_SIZE);
            const y = Math.floor(random() * FACE_SURFACE_PATTERN_SIZE);
            const tone = random() > 0.62 ? 255 : 0;
            const alpha = 0.003 + random() * 0.006;
            patternCtx.fillStyle = `rgba(${tone},${tone},${tone},${alpha})`;
            patternCtx.fillRect(x, y, 1, 1);
        }
        const satinSweep = patternCtx.createLinearGradient(0, FACE_SURFACE_PATTERN_SIZE * 0.08, FACE_SURFACE_PATTERN_SIZE, FACE_SURFACE_PATTERN_SIZE * 0.88);
        satinSweep.addColorStop(0, 'rgba(255,255,255,0)');
        satinSweep.addColorStop(0.38, 'rgba(255,255,255,0.02)');
        satinSweep.addColorStop(0.56, 'rgba(255,255,255,0.035)');
        satinSweep.addColorStop(0.74, 'rgba(255,255,255,0.012)');
        satinSweep.addColorStop(1, 'rgba(255,255,255,0)');
        patternCtx.globalCompositeOperation = 'screen';
        patternCtx.fillStyle = satinSweep;
        patternCtx.fillRect(0, 0, canvas.width, canvas.height);
        patternCtx.globalCompositeOperation = 'source-over';
        faceSurfacePatternCanvas = canvas;
    }
    return ctx.createPattern(faceSurfacePatternCanvas, 'repeat');
}
function applyClockFacePolish(ctx) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const radius = 28;
    const pattern = getFaceSurfacePattern(ctx);
    ctx.save();
    roundRect(ctx, 0, 0, width, height, radius);
    ctx.clip();
    const centerLift = ctx.createRadialGradient(width * 0.5, height * 0.48, width * 0.08, width * 0.5, height * 0.5, width * 0.72);
    centerLift.addColorStop(0, 'rgba(255,255,255,0.028)');
    centerLift.addColorStop(0.4, 'rgba(255,255,255,0.011)');
    centerLift.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = centerLift;
    ctx.fillRect(0, 0, width, height);
    const innerShade = ctx.createLinearGradient(0, 0, 0, height);
    innerShade.addColorStop(0, 'rgba(0,0,0,0.2)');
    innerShade.addColorStop(0.16, 'rgba(0,0,0,0.045)');
    innerShade.addColorStop(0.5, 'rgba(0,0,0,0)');
    innerShade.addColorStop(0.84, 'rgba(0,0,0,0.04)');
    innerShade.addColorStop(1, 'rgba(0,0,0,0.16)');
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = innerShade;
    ctx.fillRect(0, 0, width, height);
    const sideFalloff = ctx.createLinearGradient(0, 0, width, 0);
    sideFalloff.addColorStop(0, 'rgba(0,0,0,0.16)');
    sideFalloff.addColorStop(0.14, 'rgba(0,0,0,0.025)');
    sideFalloff.addColorStop(0.5, 'rgba(0,0,0,0)');
    sideFalloff.addColorStop(0.86, 'rgba(0,0,0,0.025)');
    sideFalloff.addColorStop(1, 'rgba(0,0,0,0.14)');
    ctx.fillStyle = sideFalloff;
    ctx.fillRect(0, 0, width, height);
    const edgeVignette = ctx.createRadialGradient(width * 0.5, height * 0.5, width * 0.34, width * 0.5, height * 0.5, width * 0.72);
    edgeVignette.addColorStop(0, 'rgba(0,0,0,0)');
    edgeVignette.addColorStop(0.72, 'rgba(0,0,0,0.055)');
    edgeVignette.addColorStop(1, 'rgba(0,0,0,0.2)');
    ctx.fillStyle = edgeVignette;
    ctx.fillRect(0, 0, width, height);
    const topSheen = ctx.createLinearGradient(0, 0, 0, height * 0.34);
    topSheen.addColorStop(0, 'rgba(255,255,255,0.024)');
    topSheen.addColorStop(0.55, 'rgba(255,255,255,0.007)');
    topSheen.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = topSheen;
    ctx.fillRect(0, 0, width, height * 0.34);
    const glassSweep = ctx.createLinearGradient(width * 0.04, height * 0.06, width * 0.82, height * 0.48);
    glassSweep.addColorStop(0, 'rgba(255,255,255,0)');
    glassSweep.addColorStop(0.34, 'rgba(255,255,255,0.012)');
    glassSweep.addColorStop(0.52, 'rgba(255,255,255,0.03)');
    glassSweep.addColorStop(0.7, 'rgba(255,255,255,0.01)');
    glassSweep.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = glassSweep;
    ctx.fillRect(0, 0, width, height * 0.7);
    const lowerDensity = ctx.createLinearGradient(0, height * 0.54, 0, height);
    lowerDensity.addColorStop(0, 'rgba(0,0,0,0)');
    lowerDensity.addColorStop(0.6, 'rgba(0,0,0,0.03)');
    lowerDensity.addColorStop(1, 'rgba(0,0,0,0.08)');
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = lowerDensity;
    ctx.fillRect(0, 0, width, height);
    if (pattern) {
        ctx.globalCompositeOperation = 'soft-light';
        ctx.globalAlpha = 0.16;
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1;
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = 'rgba(0,0,0,0.22)';
    ctx.lineWidth = 1.2;
    roundRect(ctx, 0.75, 0.75, width - 1.5, height - 1.5, radius);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.018)';
    ctx.lineWidth = 1.2;
    roundRect(ctx, 1.5, 1.5, width - 3, height - 3, radius - 1);
    ctx.stroke();
    ctx.restore();
}
function configureTexture(texture, { colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NoColorSpace"] } = {}) {
    texture.flipY = false;
    texture.colorSpace = colorSpace;
    texture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"];
    texture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"];
    texture.anisotropy = 8;
    texture.needsUpdate = true;
}
function prepareMaterial(material, textures) {
    const base = material.clone();
    const materialName = base.name.toLowerCase();
    if (base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"] || base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]) {
        if (base.map) {
            base.map.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            base.map.needsUpdate = true;
        }
        if (materialName === 'clockplastic') {
            base.map = null;
            base.normalMap = textures.normal;
            base.roughnessMap = textures.roughness;
            base.metalnessMap = null;
            base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#f0e6cf');
            base.roughness = 0.74;
            base.metalness = 0.02;
            base.envMapIntensity = 0.3;
            base.normalScale.set(0.09, 0.09);
            if (base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]) {
                base.clearcoat = 0.22;
                base.clearcoatRoughness = 0.38;
            }
        }
        if (materialName === 'clockblack') {
            base.map = null;
            base.normalMap = null;
            base.roughnessMap = null;
            base.metalnessMap = null;
            base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#070806');
            base.roughness = 0.84;
            base.metalness = 0;
            base.envMapIntensity = 0.09;
            if (base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]) {
                base.clearcoat = 0.1;
                base.clearcoatRoughness = 0.44;
            }
        }
        if (materialName === 'deskclockglass') {
            base.transparent = true;
            base.opacity = 0.04;
            base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#121210');
            base.roughnessMap = null;
            base.normalMap = null;
            base.roughness = 0.08;
            base.metalness = 0;
            base.depthWrite = false;
            if (base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]) {
                base.transmissionMap = null;
                base.transmission = 0.16;
                base.ior = 1.45;
                base.thickness = 0.016;
                base.envMapIntensity = 0.18;
                base.clearcoat = 0.18;
                base.clearcoatRoughness = 0.12;
            }
        }
        if (materialName === 'clockbackpanelmat') {
            base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#090a08');
            base.roughness = 0.9;
            base.metalness = 0;
        }
        if (materialName === 'clockinnershadowmat') {
            base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#020302');
            base.roughness = 1;
            base.metalness = 0;
        }
        if (materialName === 'clocknumbers') {
            base.transparent = true;
            base.opacity = 0;
            base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#000000');
            if (base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]) {
                base.transmission = 0;
                base.thickness = 0;
            }
        }
    }
    base.needsUpdate = true;
    return base;
}
function prepareClockModel(scene, textures) {
    const clone = scene.clone(true);
    clone.traverse((child)=>{
        if (!(child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"])) return;
        child.castShadow = child.name !== 'ClockGlass';
        child.receiveShadow = true;
        child.frustumCulled = false;
        child.renderOrder = RENDER_ORDERS[child.name] ?? child.renderOrder;
        if (Array.isArray(child.material)) {
            child.material = child.material.map((material)=>prepareMaterial(material, textures));
        } else {
            child.material = prepareMaterial(child.material, textures);
        }
    });
    clone.rotation.y = -Math.PI / 2;
    let box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(clone);
    const rawSize = box.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    const maxDimension = Math.max(rawSize.x, rawSize.y, rawSize.z) || 1;
    const scale = 2.58 / maxDimension;
    clone.scale.setScalar(scale);
    box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(clone);
    const center = box.getCenter(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    const size = box.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    clone.position.x -= center.x;
    clone.position.y -= center.y - size.y * 0.02;
    clone.position.z -= center.z;
    box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(clone);
    return {
        object: clone,
        box,
        size: box.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]())
    };
}
function ClockModelPolish({ reducedMotion = false, sequenceOverride }) {
    _s();
    const gltf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"])(CLOCK_MODEL_URL);
    const [diffuseMap, normalMap, roughnessMap, metalnessMap, transmissionMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Texture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTexture"])([
        `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Diffuse.png`,
        `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Normal.png`,
        `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Roughness.png`,
        `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Metalness.png`,
        `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Transmission.png`
    ]);
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pulseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const faceMaterialRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ctxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textureRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastStateKeyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('');
    const shellTextures = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClockModelPolish.useMemo[shellTextures]": ()=>{
            configureTexture(diffuseMap, {
                colorSpace: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"]
            });
            configureTexture(normalMap);
            configureTexture(roughnessMap);
            configureTexture(metalnessMap);
            configureTexture(transmissionMap);
            return {
                diffuse: diffuseMap,
                normal: normalMap,
                roughness: roughnessMap,
                metalness: metalnessMap,
                transmission: transmissionMap
            };
        }
    }["ClockModelPolish.useMemo[shellTextures]"], [
        diffuseMap,
        metalnessMap,
        normalMap,
        roughnessMap,
        transmissionMap
    ]);
    const preparedModel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClockModelPolish.useMemo[preparedModel]": ()=>prepareClockModel(gltf.scene, shellTextures)
    }["ClockModelPolish.useMemo[preparedModel]"], [
        gltf.scene,
        shellTextures
    ]);
    const clockProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"])({
        "ClockModelPolish.useScrollStore[clockProgress]": (state)=>state.clockProgress
    }["ClockModelPolish.useScrollStore[clockProgress]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClockModelPolish.useEffect": ()=>{
            const canvas = document.createElement('canvas');
            canvas.width = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLOCK_CANVAS"].width;
            canvas.height = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLOCK_CANVAS"].height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
            texture.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            texture.anisotropy = 4;
            texture.needsUpdate = true;
            ctxRef.current = ctx;
            textureRef.current = texture;
            lastStateKeyRef.current = '';
            if (faceMaterialRef.current) {
                faceMaterialRef.current.map = texture;
                faceMaterialRef.current.needsUpdate = true;
            }
            return ({
                "ClockModelPolish.useEffect": ()=>{
                    texture.dispose();
                    ctxRef.current = null;
                    textureRef.current = null;
                    lastStateKeyRef.current = '';
                }
            })["ClockModelPolish.useEffect"];
        }
    }["ClockModelPolish.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "ClockModelPolish.useFrame": (state)=>{
            const node = groupRef.current;
            if (!node) return;
            const liveClockState = sequenceOverride ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycleScreenState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClockSequenceState"])(clockProgress, reducedMotion);
            const ctx = ctxRef.current;
            const texture = textureRef.current;
            const elapsed = state.clock.elapsedTime;
            const ring = liveClockState.ringAmount;
            const appear = 0.92 + liveClockState.displayProgress * 0.08;
            const faceKey = [
                liveClockState.displayProgress.toFixed(3),
                liveClockState.faceIn.toFixed(3),
                liveClockState.hold0659.toFixed(3),
                liveClockState.flipMinuteOnes.toFixed(3),
                liveClockState.flipMinuteTens.toFixed(3),
                liveClockState.flipHourOnes.toFixed(3),
                liveClockState.settle0700.toFixed(3),
                liveClockState.flashAmount.toFixed(3)
            ].join('|');
            if (ctx && texture && faceKey !== lastStateKeyRef.current) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$drawClockFace$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawClockFace"])(ctx, liveClockState);
                applyClockFacePolish(ctx);
                texture.needsUpdate = true;
                lastStateKeyRef.current = faceKey;
            }
            node.scale.setScalar(appear);
            node.rotation.y = reducedMotion ? 0.04 : 0.08 + Math.sin(elapsed * 0.45) * 0.026;
            node.rotation.x = reducedMotion ? -0.03 : -0.055 + Math.sin(elapsed * 0.22) * 0.012;
            node.rotation.z = ring * Math.sin(elapsed * 18) * (reducedMotion ? 0.003 : 0.009);
            node.position.y = -0.14 + (1 - liveClockState.displayProgress) * 0.08 + ring * Math.sin(elapsed * 14) * (reducedMotion ? 0.003 : 0.012);
            node.position.x = ring * Math.sin(elapsed * 16) * (reducedMotion ? 0.002 : 0.008);
            if (pulseRef.current) {
                pulseRef.current.intensity = 0.07 + liveClockState.flashAmount * 0.26 + liveClockState.settle0700 * 0.05;
            }
        }
    }["ClockModelPolish.useFrame"]);
    const faceWidth = preparedModel.size.x * 0.805;
    const faceHeight = preparedModel.size.y * 0.432;
    const faceY = preparedModel.box.min.y + preparedModel.size.y * 0.56;
    const faceZ = preparedModel.box.max.z - preparedModel.size.z * 0.056;
    const maskWidth = faceWidth * FACE_MASK.width;
    const maskHeight = faceHeight * FACE_MASK.height;
    const maskRadius = maskHeight * FACE_MASK.radius;
    const maskShape = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClockModelPolish.useMemo[maskShape]": ()=>createRoundedRectShape(maskWidth, maskHeight, maskRadius)
    }["ClockModelPolish.useMemo[maskShape]"], [
        maskHeight,
        maskRadius,
        maskWidth
    ]);
    const maskZ = faceZ + preparedModel.size.z * 0.0016;
    const faceGlassZ = faceZ + preparedModel.size.z * 0.0046;
    const lightY = preparedModel.box.min.y + preparedModel.size.y * 0.56;
    const lightZ = preparedModel.box.max.z + 0.72;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        position: [
            0,
            -0.14,
            0
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
                object: preparedModel.object
            }, void 0, false, {
                fileName: "[project]/src/components/three/ClockModelPolish.tsx",
                lineNumber: 576,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    faceY,
                    maskZ
                ],
                renderOrder: 3.5,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shapeGeometry", {
                        args: [
                            maskShape
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModelPolish.tsx",
                        lineNumber: 579,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        colorWrite: false,
                        depthWrite: false,
                        depthTest: false,
                        transparent: true,
                        opacity: 0,
                        stencilWrite: true,
                        stencilRef: 1,
                        stencilFunc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlwaysStencilFunc"],
                        stencilFail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReplaceStencilOp"],
                        stencilZFail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReplaceStencilOp"],
                        stencilZPass: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReplaceStencilOp"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModelPolish.tsx",
                        lineNumber: 580,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/three/ClockModelPolish.tsx",
                lineNumber: 578,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    faceY,
                    faceZ
                ],
                renderOrder: 4,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            faceWidth,
                            faceHeight
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModelPolish.tsx",
                        lineNumber: 596,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        ref: faceMaterialRef,
                        toneMapped: false,
                        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                        transparent: true,
                        depthWrite: false,
                        depthTest: false,
                        polygonOffset: true,
                        polygonOffsetFactor: -2,
                        polygonOffsetUnits: -2,
                        stencilWrite: true,
                        stencilRef: 1,
                        stencilFunc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EqualStencilFunc"],
                        stencilFail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeepStencilOp"],
                        stencilZFail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeepStencilOp"],
                        stencilZPass: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeepStencilOp"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModelPolish.tsx",
                        lineNumber: 597,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/three/ClockModelPolish.tsx",
                lineNumber: 595,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    faceY,
                    faceGlassZ
                ],
                renderOrder: 4.5,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shapeGeometry", {
                        args: [
                            maskShape
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModelPolish.tsx",
                        lineNumber: 617,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: "#10110f",
                        transparent: true,
                        opacity: 0.042,
                        roughness: 0.08,
                        metalness: 0,
                        transmission: 0.16,
                        ior: 1.22,
                        thickness: 0.016,
                        envMapIntensity: 0.24,
                        clearcoat: 0.58,
                        clearcoatRoughness: 0.1,
                        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                        depthWrite: false,
                        depthTest: false,
                        stencilWrite: true,
                        stencilRef: 1,
                        stencilFunc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EqualStencilFunc"],
                        stencilFail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeepStencilOp"],
                        stencilZFail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeepStencilOp"],
                        stencilZPass: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeepStencilOp"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModelPolish.tsx",
                        lineNumber: 618,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/three/ClockModelPolish.tsx",
                lineNumber: 616,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                ref: pulseRef,
                position: [
                    0,
                    lightY,
                    lightZ
                ],
                color: "#f2ddad",
                intensity: 0.068,
                distance: 3
            }, void 0, false, {
                fileName: "[project]/src/components/three/ClockModelPolish.tsx",
                lineNumber: 642,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("spotLight", {
                position: [
                    1.56,
                    1.42,
                    2.24
                ],
                angle: 0.34,
                penumbra: 0.88,
                intensity: 0.18,
                distance: 6.8,
                color: "#ffe8bf"
            }, void 0, false, {
                fileName: "[project]/src/components/three/ClockModelPolish.tsx",
                lineNumber: 650,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("spotLight", {
                position: [
                    -0.48,
                    1.88,
                    2.02
                ],
                angle: 0.26,
                penumbra: 0.9,
                intensity: 0.09,
                distance: 6.2,
                color: "#fff2d8"
            }, void 0, false, {
                fileName: "[project]/src/components/three/ClockModelPolish.tsx",
                lineNumber: 659,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/three/ClockModelPolish.tsx",
        lineNumber: 575,
        columnNumber: 5
    }, this);
}
_s(ClockModelPolish, "YxNSMzxuaGgpmlSag06po0nRYr4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Texture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTexture"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = ClockModelPolish;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"].preload(CLOCK_MODEL_URL);
var _c;
__turbopack_context__.k.register(_c, "ClockModelPolish");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/three/SceneContainer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SceneContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function SceneContainer({ camera, children, toneMappingExposure = 1.4 }) {
    _s();
    const wrapperRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [size, setSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SceneContainer.useEffect": ()=>{
            const el = wrapperRef.current;
            if (!el) return;
            const measure = {
                "SceneContainer.useEffect.measure": ()=>{
                    const { width, height } = el.getBoundingClientRect();
                    if (width > 0 && height > 0) {
                        setSize({
                            width,
                            height
                        });
                    }
                }
            }["SceneContainer.useEffect.measure"];
            // Measure immediately
            measure();
            // Watch for resizes
            const ro = new ResizeObserver(measure);
            ro.observe(el);
            return ({
                "SceneContainer.useEffect": ()=>ro.disconnect()
            })["SceneContainer.useEffect"];
        }
    }["SceneContainer.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: wrapperRef,
        style: {
            position: 'absolute',
            inset: 0
        },
        children: size && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
            gl: {
                antialias: true,
                alpha: true,
                toneMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACESFilmicToneMapping"],
                toneMappingExposure
            },
            dpr: [
                1,
                2
            ],
            camera: camera,
            style: {
                width: size.width,
                height: size.height
            },
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/three/SceneContainer.tsx",
            lineNumber: 63,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/three/SceneContainer.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(SceneContainer, "3MTNF1Ykjf+kK1y5MHlyMDVsxJ0=");
_c = SceneContainer;
var _c;
__turbopack_context__.k.register(_c, "SceneContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/three/ClockModelRefined.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClockModelRefined
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Gltf.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Texture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Texture.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycleScreenState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cycleScreenState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$drawClockFace$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/drawClockFace.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/scrollStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
const CLOCK_MODEL_URL = '/models/flip-clock/retro-flip-clock-refined.glb?v=refined-front-1';
const CLOCK_TEXTURE_ROOT = '/models/flip-clock/textures';
const FACE_MASK = {
    width: 0.9,
    height: 0.84,
    radius: 0.13
};
const RENDER_ORDERS = {
    ClockBody: 1,
    ClockFrontBlack: 2,
    ClockCavityBacker: 3,
    ClockShadowRailTop: 3,
    ClockShadowRailBottom: 3,
    ClockGlass: 5
};
function createRoundedRectShape(width, height, radius) {
    const halfWidth = width * 0.5;
    const halfHeight = height * 0.5;
    const r = Math.min(radius, halfWidth, halfHeight);
    const shape = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Shape"]();
    shape.moveTo(-halfWidth + r, -halfHeight);
    shape.lineTo(halfWidth - r, -halfHeight);
    shape.absarc(halfWidth - r, -halfHeight + r, r, -Math.PI / 2, 0, false);
    shape.lineTo(halfWidth, halfHeight - r);
    shape.absarc(halfWidth - r, halfHeight - r, r, 0, Math.PI / 2, false);
    shape.lineTo(-halfWidth + r, halfHeight);
    shape.absarc(-halfWidth + r, halfHeight - r, r, Math.PI / 2, Math.PI, false);
    shape.lineTo(-halfWidth, -halfHeight + r);
    shape.absarc(-halfWidth + r, -halfHeight + r, r, Math.PI, Math.PI * 1.5, false);
    return shape;
}
function configureTexture(texture, { colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NoColorSpace"] } = {}) {
    texture.flipY = false;
    texture.colorSpace = colorSpace;
    texture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"];
    texture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"];
    texture.anisotropy = 8;
    texture.needsUpdate = true;
}
function prepareMaterial(material, textures) {
    const base = material.clone();
    const materialName = base.name.toLowerCase();
    if (base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"] || base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]) {
        if (base.map) {
            base.map.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            base.map.needsUpdate = true;
        }
        if (materialName === 'clockplastic') {
            base.map = null;
            base.normalMap = textures.normal;
            base.roughnessMap = textures.roughness;
            base.metalnessMap = null;
            base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#f0e6cf');
            base.roughness = 0.78;
            base.metalness = 0.02;
            base.envMapIntensity = 0.26;
            base.normalScale.set(0.11, 0.11);
            if (base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]) {
                base.clearcoat = 0.18;
                base.clearcoatRoughness = 0.42;
            }
        }
        if (materialName === 'clockblack') {
            base.map = null;
            base.normalMap = null;
            base.roughnessMap = null;
            base.metalnessMap = null;
            base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#040503');
            base.roughness = 0.98;
            base.metalness = 0;
            base.envMapIntensity = 0.02;
        }
        if (materialName === 'deskclockglass') {
            base.transparent = true;
            base.opacity = 0.06;
            base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#111110');
            base.roughnessMap = null;
            base.normalMap = null;
            base.roughness = 0.14;
            base.metalness = 0;
            base.depthWrite = false;
            if (base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]) {
                base.transmissionMap = null;
                base.transmission = 0.1;
                base.ior = 1.45;
                base.thickness = 0.014;
                base.envMapIntensity = 0.08;
                base.clearcoat = 0.08;
                base.clearcoatRoughness = 0.24;
            }
        }
        if (materialName === 'clockbackpanelmat') {
            base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#0f100c');
            base.roughness = 0.92;
            base.metalness = 0;
        }
        if (materialName === 'clockinnershadowmat') {
            base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#060704');
            base.roughness = 1;
            base.metalness = 0;
        }
        if (materialName === 'clocknumbers') {
            base.transparent = true;
            base.opacity = 0;
            base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#000000');
            if (base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]) {
                base.transmission = 0;
                base.thickness = 0;
            }
        }
    }
    base.needsUpdate = true;
    return base;
}
function prepareClockModel(scene, textures) {
    const clone = scene.clone(true);
    clone.traverse((child)=>{
        if (!(child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"])) return;
        child.castShadow = child.name !== 'ClockGlass';
        child.receiveShadow = true;
        child.frustumCulled = false;
        child.renderOrder = RENDER_ORDERS[child.name] ?? child.renderOrder;
        if (Array.isArray(child.material)) {
            child.material = child.material.map((material)=>prepareMaterial(material, textures));
        } else {
            child.material = prepareMaterial(child.material, textures);
        }
    });
    clone.rotation.y = -Math.PI / 2;
    let box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(clone);
    const rawSize = box.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    const maxDimension = Math.max(rawSize.x, rawSize.y, rawSize.z) || 1;
    const scale = 2.58 / maxDimension;
    clone.scale.setScalar(scale);
    box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(clone);
    const center = box.getCenter(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    const size = box.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    clone.position.x -= center.x;
    clone.position.y -= center.y - size.y * 0.02;
    clone.position.z -= center.z;
    box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(clone);
    return {
        object: clone,
        box,
        size: box.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]())
    };
}
function ClockModelRefined({ reducedMotion = false, sequenceOverride }) {
    _s();
    const gltf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"])(CLOCK_MODEL_URL);
    const [diffuseMap, normalMap, roughnessMap, metalnessMap, transmissionMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Texture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTexture"])([
        `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Diffuse.png`,
        `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Normal.png`,
        `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Roughness.png`,
        `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Metalness.png`,
        `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Transmission.png`
    ]);
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pulseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const faceMaterialRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ctxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textureRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastStateKeyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('');
    const shellTextures = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClockModelRefined.useMemo[shellTextures]": ()=>{
            configureTexture(diffuseMap, {
                colorSpace: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"]
            });
            configureTexture(normalMap);
            configureTexture(roughnessMap);
            configureTexture(metalnessMap);
            configureTexture(transmissionMap);
            return {
                diffuse: diffuseMap,
                normal: normalMap,
                roughness: roughnessMap,
                metalness: metalnessMap,
                transmission: transmissionMap
            };
        }
    }["ClockModelRefined.useMemo[shellTextures]"], [
        diffuseMap,
        metalnessMap,
        normalMap,
        roughnessMap,
        transmissionMap
    ]);
    const preparedModel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClockModelRefined.useMemo[preparedModel]": ()=>prepareClockModel(gltf.scene, shellTextures)
    }["ClockModelRefined.useMemo[preparedModel]"], [
        gltf.scene,
        shellTextures
    ]);
    const clockProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"])({
        "ClockModelRefined.useScrollStore[clockProgress]": (state)=>state.clockProgress
    }["ClockModelRefined.useScrollStore[clockProgress]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClockModelRefined.useEffect": ()=>{
            const canvas = document.createElement('canvas');
            canvas.width = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLOCK_CANVAS"].width;
            canvas.height = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLOCK_CANVAS"].height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
            texture.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            texture.anisotropy = 4;
            texture.needsUpdate = true;
            ctxRef.current = ctx;
            textureRef.current = texture;
            lastStateKeyRef.current = '';
            if (faceMaterialRef.current) {
                faceMaterialRef.current.map = texture;
                faceMaterialRef.current.needsUpdate = true;
            }
            return ({
                "ClockModelRefined.useEffect": ()=>{
                    texture.dispose();
                    ctxRef.current = null;
                    textureRef.current = null;
                    lastStateKeyRef.current = '';
                }
            })["ClockModelRefined.useEffect"];
        }
    }["ClockModelRefined.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "ClockModelRefined.useFrame": (state)=>{
            const node = groupRef.current;
            if (!node) return;
            const liveClockState = sequenceOverride ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycleScreenState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClockSequenceState"])(clockProgress, reducedMotion);
            const ctx = ctxRef.current;
            const texture = textureRef.current;
            const elapsed = state.clock.elapsedTime;
            const ring = liveClockState.ringAmount;
            const appear = 0.92 + liveClockState.displayProgress * 0.08;
            const faceKey = [
                liveClockState.displayProgress.toFixed(3),
                liveClockState.faceIn.toFixed(3),
                liveClockState.hold0659.toFixed(3),
                liveClockState.flipMinuteOnes.toFixed(3),
                liveClockState.flipMinuteTens.toFixed(3),
                liveClockState.flipHourOnes.toFixed(3),
                liveClockState.settle0700.toFixed(3),
                liveClockState.flashAmount.toFixed(3)
            ].join('|');
            if (ctx && texture && faceKey !== lastStateKeyRef.current) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$drawClockFace$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawClockFace"])(ctx, liveClockState);
                texture.needsUpdate = true;
                lastStateKeyRef.current = faceKey;
            }
            node.scale.setScalar(appear);
            node.rotation.y = reducedMotion ? 0.04 : 0.08 + Math.sin(elapsed * 0.45) * 0.026;
            node.rotation.x = reducedMotion ? -0.03 : -0.055 + Math.sin(elapsed * 0.22) * 0.012;
            node.rotation.z = ring * Math.sin(elapsed * 18) * (reducedMotion ? 0.003 : 0.009);
            node.position.y = -0.14 + (1 - liveClockState.displayProgress) * 0.08 + ring * Math.sin(elapsed * 14) * (reducedMotion ? 0.003 : 0.012);
            node.position.x = ring * Math.sin(elapsed * 16) * (reducedMotion ? 0.002 : 0.008);
            if (pulseRef.current) {
                pulseRef.current.intensity = 0.08 + liveClockState.flashAmount * 0.32 + liveClockState.settle0700 * 0.06;
            }
        }
    }["ClockModelRefined.useFrame"]);
    const faceWidth = preparedModel.size.x * 0.82;
    const faceHeight = preparedModel.size.y * 0.44;
    const faceY = preparedModel.box.min.y + preparedModel.size.y * 0.56;
    const faceZ = preparedModel.box.max.z - preparedModel.size.z * 0.0415;
    const maskWidth = faceWidth * FACE_MASK.width;
    const maskHeight = faceHeight * FACE_MASK.height;
    const maskRadius = maskHeight * FACE_MASK.radius;
    const maskShape = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClockModelRefined.useMemo[maskShape]": ()=>createRoundedRectShape(maskWidth, maskHeight, maskRadius)
    }["ClockModelRefined.useMemo[maskShape]"], [
        maskHeight,
        maskRadius,
        maskWidth
    ]);
    const maskZ = faceZ + preparedModel.size.z * 0.0025;
    const faceGlassZ = faceZ + preparedModel.size.z * 0.0048;
    const lightY = preparedModel.box.min.y + preparedModel.size.y * 0.56;
    const lightZ = preparedModel.box.max.z + 0.76;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        position: [
            0,
            -0.14,
            0
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
                object: preparedModel.object
            }, void 0, false, {
                fileName: "[project]/src/components/three/ClockModelRefined.tsx",
                lineNumber: 357,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    faceY,
                    maskZ
                ],
                renderOrder: 3.5,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shapeGeometry", {
                        args: [
                            maskShape
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModelRefined.tsx",
                        lineNumber: 360,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        colorWrite: false,
                        depthWrite: false,
                        depthTest: false,
                        transparent: true,
                        opacity: 0,
                        stencilWrite: true,
                        stencilRef: 1,
                        stencilFunc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlwaysStencilFunc"],
                        stencilFail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReplaceStencilOp"],
                        stencilZFail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReplaceStencilOp"],
                        stencilZPass: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReplaceStencilOp"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModelRefined.tsx",
                        lineNumber: 361,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/three/ClockModelRefined.tsx",
                lineNumber: 359,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    faceY,
                    faceZ
                ],
                renderOrder: 4,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            faceWidth,
                            faceHeight
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModelRefined.tsx",
                        lineNumber: 377,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        ref: faceMaterialRef,
                        toneMapped: false,
                        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                        transparent: true,
                        depthWrite: false,
                        depthTest: false,
                        polygonOffset: true,
                        polygonOffsetFactor: -2,
                        polygonOffsetUnits: -2,
                        stencilWrite: true,
                        stencilRef: 1,
                        stencilFunc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EqualStencilFunc"],
                        stencilFail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeepStencilOp"],
                        stencilZFail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeepStencilOp"],
                        stencilZPass: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeepStencilOp"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModelRefined.tsx",
                        lineNumber: 378,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/three/ClockModelRefined.tsx",
                lineNumber: 376,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    faceY,
                    faceGlassZ
                ],
                renderOrder: 4.5,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shapeGeometry", {
                        args: [
                            maskShape
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModelRefined.tsx",
                        lineNumber: 398,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: "#101111",
                        transparent: true,
                        opacity: 0.08,
                        roughness: 0.18,
                        metalness: 0,
                        transmission: 0.18,
                        ior: 1.1,
                        thickness: 0.012,
                        envMapIntensity: 0.16,
                        clearcoat: 0.34,
                        clearcoatRoughness: 0.18,
                        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                        depthWrite: false,
                        depthTest: false,
                        stencilWrite: true,
                        stencilRef: 1,
                        stencilFunc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EqualStencilFunc"],
                        stencilFail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeepStencilOp"],
                        stencilZFail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeepStencilOp"],
                        stencilZPass: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeepStencilOp"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModelRefined.tsx",
                        lineNumber: 399,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/three/ClockModelRefined.tsx",
                lineNumber: 397,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                ref: pulseRef,
                position: [
                    0,
                    lightY,
                    lightZ
                ],
                color: "#f2ddad",
                intensity: 0.09,
                distance: 3.3
            }, void 0, false, {
                fileName: "[project]/src/components/three/ClockModelRefined.tsx",
                lineNumber: 423,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("spotLight", {
                position: [
                    1.8,
                    1.3,
                    2.4
                ],
                angle: 0.42,
                penumbra: 0.8,
                intensity: 0.24,
                distance: 7,
                color: "#ffe8bf"
            }, void 0, false, {
                fileName: "[project]/src/components/three/ClockModelRefined.tsx",
                lineNumber: 431,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/three/ClockModelRefined.tsx",
        lineNumber: 356,
        columnNumber: 5
    }, this);
}
_s(ClockModelRefined, "YxNSMzxuaGgpmlSag06po0nRYr4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Texture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTexture"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = ClockModelRefined;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"].preload(CLOCK_MODEL_URL);
var _c;
__turbopack_context__.k.register(_c, "ClockModelRefined");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/three/ClockModel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClockModel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Gltf.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Texture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Texture.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycleScreenState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cycleScreenState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$drawClockFace$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/drawClockFace.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/scrollStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
const CLOCK_MODEL_URL = '/models/flip-clock/retro-flip-clock-download-original.glb?v=canonical-face-2';
const CLOCK_TEXTURE_ROOT = '/models/flip-clock/textures';
const FACE_MASK = {
    width: 0.9,
    height: 0.84,
    radius: 0.13
};
const CAVITY_PANEL = {
    width: 0.965,
    height: 0.62,
    radius: 0.17
};
const WINDOW_BACKING = {
    width: 0.965,
    height: 0.8,
    radius: 0.16
};
function createRoundedRectShape(width, height, radius) {
    const halfWidth = width * 0.5;
    const halfHeight = height * 0.5;
    const r = Math.min(radius, halfWidth, halfHeight);
    const shape = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Shape"]();
    shape.moveTo(-halfWidth + r, -halfHeight);
    shape.lineTo(halfWidth - r, -halfHeight);
    shape.absarc(halfWidth - r, -halfHeight + r, r, -Math.PI / 2, 0, false);
    shape.lineTo(halfWidth, halfHeight - r);
    shape.absarc(halfWidth - r, halfHeight - r, r, 0, Math.PI / 2, false);
    shape.lineTo(-halfWidth + r, halfHeight);
    shape.absarc(-halfWidth + r, halfHeight - r, r, Math.PI / 2, Math.PI, false);
    shape.lineTo(-halfWidth, -halfHeight + r);
    shape.absarc(-halfWidth + r, -halfHeight + r, r, Math.PI, Math.PI * 1.5, false);
    return shape;
}
function configureTexture(texture, { colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NoColorSpace"] } = {}) {
    texture.flipY = false;
    texture.colorSpace = colorSpace;
    texture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"];
    texture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"];
    texture.anisotropy = 8;
    texture.needsUpdate = true;
}
function prepareMaterial(material, textures) {
    const base = material.clone();
    const materialName = base.name.toLowerCase();
    if (base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"] || base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]) {
        if (base.map) {
            base.map.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            base.map.needsUpdate = true;
        }
        if (base.emissiveMap) {
            base.emissiveMap.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            base.emissiveMap.needsUpdate = true;
        }
        if (materialName === 'clockplastic') {
            base.map = null;
            base.normalMap = textures.normal;
            base.roughnessMap = textures.roughness;
            base.metalnessMap = null;
            base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#f0e6cf');
            base.roughness = 0.78;
            base.metalness = 0.02;
            base.envMapIntensity = 0.26;
            base.normalScale.set(0.11, 0.11);
            if (base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]) {
                base.clearcoat = 0.18;
                base.clearcoatRoughness = 0.42;
            }
        }
        if (materialName === 'clockblack') {
            base.map = null;
            base.normalMap = textures.normal;
            base.roughnessMap = textures.roughness;
            base.metalnessMap = null;
            base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#050604');
            base.roughness = 0.96;
            base.metalness = 0.0;
            base.envMapIntensity = 0.04;
            base.normalScale.set(0.012, 0.012);
        }
        if (materialName === 'deskclockglass') {
            base.transparent = true;
            base.opacity = 0.12;
            base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#1a1a18');
            base.roughnessMap = textures.roughness;
            base.normalMap = textures.normal;
            base.roughness = 0.06;
            base.metalness = 0;
            if (base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]) {
                base.transmissionMap = null;
                base.transmission = 0.18;
                base.ior = 1.45;
                base.thickness = 0.014;
                base.envMapIntensity = 0.22;
                base.clearcoat = 0.12;
                base.clearcoatRoughness = 0.18;
            }
            base.normalScale.set(0.008, 0.008);
        }
        if (materialName === 'clockbackpanelmat') {
            base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#0f100c');
            base.roughness = 0.92;
            base.metalness = 0;
        }
        if (materialName === 'clockinnershadowmat') {
            base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#060704');
            base.roughness = 1;
            base.metalness = 0;
        }
        if (materialName === 'clocknumbers') {
            base.transparent = true;
            base.opacity = 0;
            base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#000000');
            base.roughness = 1;
            base.metalness = 0;
            base.envMapIntensity = 0;
            if (base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]) {
                base.transmission = 0;
                base.thickness = 0;
            }
        }
    }
    base.needsUpdate = true;
    return base;
}
function prepareClockModel(scene, textures) {
    const clone = scene.clone(true);
    clone.traverse((child)=>{
        if (!(child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"])) return;
        child.castShadow = true;
        child.receiveShadow = true;
        child.frustumCulled = false;
        if (Array.isArray(child.material)) {
            child.material = child.material.map((material)=>prepareMaterial(material, textures));
        } else {
            child.material = prepareMaterial(child.material, textures);
        }
    });
    clone.rotation.y = -Math.PI / 2;
    let box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(clone);
    const rawSize = box.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    const maxDimension = Math.max(rawSize.x, rawSize.y, rawSize.z) || 1;
    const scale = 2.58 / maxDimension;
    clone.scale.setScalar(scale);
    box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(clone);
    const center = box.getCenter(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    const size = box.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    clone.position.x -= center.x;
    clone.position.y -= center.y - size.y * 0.02;
    clone.position.z -= center.z;
    box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(clone);
    return {
        object: clone,
        box,
        size: box.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]())
    };
}
function ClockModel({ reducedMotion = false, sequenceOverride }) {
    _s();
    const gltf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"])(CLOCK_MODEL_URL);
    const [diffuseMap, normalMap, roughnessMap, metalnessMap, transmissionMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Texture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTexture"])([
        `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Diffuse.png`,
        `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Normal.png`,
        `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Roughness.png`,
        `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Metalness.png`,
        `${CLOCK_TEXTURE_ROOT}/FlipClock_Bake1_PBR_Transmission.png`
    ]);
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pulseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const faceMaterialRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ctxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textureRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastStateKeyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('');
    const shellTextures = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClockModel.useMemo[shellTextures]": ()=>{
            configureTexture(diffuseMap, {
                colorSpace: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"]
            });
            configureTexture(normalMap);
            configureTexture(roughnessMap);
            configureTexture(metalnessMap);
            configureTexture(transmissionMap);
            return {
                diffuse: diffuseMap,
                normal: normalMap,
                roughness: roughnessMap,
                metalness: metalnessMap,
                transmission: transmissionMap
            };
        }
    }["ClockModel.useMemo[shellTextures]"], [
        diffuseMap,
        metalnessMap,
        normalMap,
        roughnessMap,
        transmissionMap
    ]);
    const preparedModel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClockModel.useMemo[preparedModel]": ()=>prepareClockModel(gltf.scene, shellTextures)
    }["ClockModel.useMemo[preparedModel]"], [
        gltf.scene,
        shellTextures
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClockModel.useEffect": ()=>{
            const canvas = document.createElement('canvas');
            canvas.width = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLOCK_CANVAS"].width;
            canvas.height = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLOCK_CANVAS"].height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
            texture.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            texture.anisotropy = 4;
            texture.needsUpdate = true;
            ctxRef.current = ctx;
            textureRef.current = texture;
            lastStateKeyRef.current = '';
            if (faceMaterialRef.current) {
                faceMaterialRef.current.map = texture;
                faceMaterialRef.current.needsUpdate = true;
            }
            return ({
                "ClockModel.useEffect": ()=>{
                    texture.dispose();
                    ctxRef.current = null;
                    textureRef.current = null;
                    lastStateKeyRef.current = '';
                }
            })["ClockModel.useEffect"];
        }
    }["ClockModel.useEffect"], []);
    const clockProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"])({
        "ClockModel.useScrollStore[clockProgress]": (state)=>state.clockProgress
    }["ClockModel.useScrollStore[clockProgress]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "ClockModel.useFrame": (state)=>{
            const node = groupRef.current;
            if (!node) return;
            const liveClockState = sequenceOverride ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycleScreenState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClockSequenceState"])(clockProgress, reducedMotion);
            const ctx = ctxRef.current;
            const texture = textureRef.current;
            const elapsed = state.clock.elapsedTime;
            const ring = liveClockState.ringAmount;
            const appear = 0.92 + liveClockState.displayProgress * 0.08;
            const faceKey = [
                liveClockState.displayProgress.toFixed(3),
                liveClockState.faceIn.toFixed(3),
                liveClockState.hold0659.toFixed(3),
                liveClockState.flipMinuteOnes.toFixed(3),
                liveClockState.flipMinuteTens.toFixed(3),
                liveClockState.flipHourOnes.toFixed(3),
                liveClockState.settle0700.toFixed(3),
                liveClockState.flashAmount.toFixed(3)
            ].join('|');
            if (ctx && texture && faceKey !== lastStateKeyRef.current) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$drawClockFace$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawClockFace"])(ctx, liveClockState);
                texture.needsUpdate = true;
                lastStateKeyRef.current = faceKey;
            }
            node.scale.setScalar(appear);
            node.rotation.y = reducedMotion ? 0.04 : 0.08 + Math.sin(elapsed * 0.45) * 0.026;
            node.rotation.x = reducedMotion ? -0.03 : -0.055 + Math.sin(elapsed * 0.22) * 0.012;
            node.rotation.z = ring * Math.sin(elapsed * 18) * (reducedMotion ? 0.003 : 0.009);
            node.position.y = -0.14 + (1 - liveClockState.displayProgress) * 0.08 + ring * Math.sin(elapsed * 14) * (reducedMotion ? 0.003 : 0.012);
            node.position.x = ring * Math.sin(elapsed * 16) * (reducedMotion ? 0.002 : 0.008);
            if (pulseRef.current) {
                pulseRef.current.intensity = 0.08 + liveClockState.flashAmount * 0.32 + liveClockState.settle0700 * 0.06;
            }
        }
    }["ClockModel.useFrame"]);
    const faceWidth = preparedModel.size.x * 0.82;
    const faceHeight = preparedModel.size.y * 0.44;
    const faceY = preparedModel.box.min.y + preparedModel.size.y * 0.56;
    const faceZ = preparedModel.box.max.z - preparedModel.size.z * 0.038;
    const windowWidth = preparedModel.size.x * 0.93;
    const windowHeight = preparedModel.size.y * 0.74;
    const windowRadius = windowHeight * WINDOW_BACKING.radius;
    const cavityWidth = preparedModel.size.x * 0.9;
    const cavityHeight = preparedModel.size.y * 0.52;
    const cavityRadius = cavityHeight * CAVITY_PANEL.radius;
    const windowShape = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClockModel.useMemo[windowShape]": ()=>createRoundedRectShape(windowWidth, windowHeight, windowRadius)
    }["ClockModel.useMemo[windowShape]"], [
        windowHeight,
        windowRadius,
        windowWidth
    ]);
    const maskWidth = faceWidth * FACE_MASK.width;
    const maskHeight = faceHeight * FACE_MASK.height;
    const maskRadius = maskHeight * FACE_MASK.radius;
    const cavityShape = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClockModel.useMemo[cavityShape]": ()=>createRoundedRectShape(cavityWidth, cavityHeight, cavityRadius)
    }["ClockModel.useMemo[cavityShape]"], [
        cavityHeight,
        cavityRadius,
        cavityWidth
    ]);
    const maskShape = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClockModel.useMemo[maskShape]": ()=>createRoundedRectShape(maskWidth, maskHeight, maskRadius)
    }["ClockModel.useMemo[maskShape]"], [
        maskHeight,
        maskRadius,
        maskWidth
    ]);
    const windowZ = faceZ - preparedModel.size.z * 0.03;
    const cavityZ = faceZ - preparedModel.size.z * 0.024;
    const maskZ = faceZ + preparedModel.size.z * 0.0025;
    const lightY = preparedModel.box.min.y + preparedModel.size.y * 0.56;
    const lightZ = preparedModel.box.max.z + 0.76;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        position: [
            0,
            -0.14,
            0
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
                object: preparedModel.object
            }, void 0, false, {
                fileName: "[project]/src/components/three/ClockModel.tsx",
                lineNumber: 393,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    faceY,
                    windowZ
                ],
                renderOrder: 2,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shapeGeometry", {
                        args: [
                            windowShape
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModel.tsx",
                        lineNumber: 395,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshPhysicalMaterial", {
                        color: "#050604",
                        transparent: true,
                        opacity: 0.26,
                        roughness: 0.18,
                        metalness: 0,
                        transmission: 0.12,
                        ior: 1.22,
                        thickness: 0.01,
                        envMapIntensity: 0.08,
                        toneMapped: false,
                        depthWrite: false,
                        depthTest: false
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModel.tsx",
                        lineNumber: 396,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/three/ClockModel.tsx",
                lineNumber: 394,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    faceY,
                    maskZ
                ],
                renderOrder: 3,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shapeGeometry", {
                        args: [
                            maskShape
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModel.tsx",
                        lineNumber: 413,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        colorWrite: false,
                        depthWrite: false,
                        depthTest: false,
                        transparent: true,
                        opacity: 0,
                        stencilWrite: true,
                        stencilRef: 1,
                        stencilFunc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlwaysStencilFunc"],
                        stencilFail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReplaceStencilOp"],
                        stencilZFail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReplaceStencilOp"],
                        stencilZPass: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReplaceStencilOp"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModel.tsx",
                        lineNumber: 414,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/three/ClockModel.tsx",
                lineNumber: 412,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    faceY,
                    cavityZ
                ],
                renderOrder: 4,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shapeGeometry", {
                        args: [
                            cavityShape
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModel.tsx",
                        lineNumber: 430,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: "#060704",
                        toneMapped: false,
                        depthWrite: false,
                        depthTest: false,
                        polygonOffset: true,
                        polygonOffsetFactor: -1,
                        polygonOffsetUnits: -1,
                        stencilWrite: true,
                        stencilRef: 1,
                        stencilFunc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EqualStencilFunc"],
                        stencilFail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeepStencilOp"],
                        stencilZFail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeepStencilOp"],
                        stencilZPass: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeepStencilOp"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModel.tsx",
                        lineNumber: 431,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/three/ClockModel.tsx",
                lineNumber: 429,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    faceY,
                    faceZ
                ],
                renderOrder: 5,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            faceWidth,
                            faceHeight
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModel.tsx",
                        lineNumber: 449,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        ref: faceMaterialRef,
                        toneMapped: false,
                        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                        transparent: true,
                        depthWrite: false,
                        depthTest: false,
                        polygonOffset: true,
                        polygonOffsetFactor: -2,
                        polygonOffsetUnits: -2,
                        stencilWrite: true,
                        stencilRef: 1,
                        stencilFunc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EqualStencilFunc"],
                        stencilFail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeepStencilOp"],
                        stencilZFail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeepStencilOp"],
                        stencilZPass: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeepStencilOp"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockModel.tsx",
                        lineNumber: 450,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/three/ClockModel.tsx",
                lineNumber: 448,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                ref: pulseRef,
                position: [
                    0,
                    lightY,
                    lightZ
                ],
                color: "#f2ddad",
                intensity: 0.09,
                distance: 3.3
            }, void 0, false, {
                fileName: "[project]/src/components/three/ClockModel.tsx",
                lineNumber: 469,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("spotLight", {
                position: [
                    1.8,
                    1.3,
                    2.4
                ],
                angle: 0.42,
                penumbra: 0.8,
                intensity: 0.24,
                distance: 7,
                color: "#ffe8bf"
            }, void 0, false, {
                fileName: "[project]/src/components/three/ClockModel.tsx",
                lineNumber: 477,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/three/ClockModel.tsx",
        lineNumber: 392,
        columnNumber: 5
    }, this);
}
_s(ClockModel, "vztNjt/cSlHmZlNavWwNEslJehE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Texture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTexture"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = ClockModel;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"].preload(CLOCK_MODEL_URL);
var _c;
__turbopack_context__.k.register(_c, "ClockModel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/three/ClockModelStable.tsx [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$ClockModel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/three/ClockModel.tsx [app-client] (ecmascript)");
'use client';
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/three/clockVariants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACTIVE_CLOCK_VARIANT",
    ()=>ACTIVE_CLOCK_VARIANT
]);
const ACTIVE_CLOCK_VARIANT = 'polish';
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/createEnvMap.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StudioEnvironment",
    ()=>StudioEnvironment,
    "createEnvMap",
    ()=>createEnvMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export C as useThree>");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function createEnvMap(renderer) {
    const pmremGenerator = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PMREMGenerator"](renderer);
    pmremGenerator.compileEquirectangularShader();
    const envScene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
    // Backdrop sphere (BackSide)
    const backdropGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](50, 32, 32);
    const backdropMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
        color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0.35, 0.35, 0.38),
        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackSide"]
    });
    envScene.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](backdropGeometry, backdropMaterial));
    // Key light — bright white plane
    const light1Geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](20, 20);
    const light1Material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
        color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](1, 1, 1)
    });
    const light1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](light1Geometry, light1Material);
    light1.position.set(0, 15, 10);
    light1.lookAt(0, 0, 0);
    envScene.add(light1);
    // Fill light — softer gray plane
    const light2Geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](10, 10);
    const light2Material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
        color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0.6, 0.6, 0.65)
    });
    const light2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](light2Geometry, light2Material);
    light2.position.set(-15, 5, -5);
    light2.lookAt(0, 0, 0);
    envScene.add(light2);
    const envTexture = pmremGenerator.fromScene(envScene, 0.04).texture;
    // Cleanup intermediate resources
    pmremGenerator.dispose();
    backdropGeometry.dispose();
    backdropMaterial.dispose();
    light1Geometry.dispose();
    light1Material.dispose();
    light2Geometry.dispose();
    light2Material.dispose();
    return envTexture;
}
function StudioEnvironment() {
    _s();
    const { gl, scene } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudioEnvironment.useEffect": ()=>{
            const envTexture = createEnvMap(gl);
            scene.environment = envTexture;
            return ({
                "StudioEnvironment.useEffect": ()=>{
                    scene.environment = null;
                    envTexture.dispose();
                }
            })["StudioEnvironment.useEffect"];
        }
    }["StudioEnvironment.useEffect"], [
        gl,
        scene
    ]);
    return null;
}
_s(StudioEnvironment, "CH6Rb0O5/yu3K/DPvvbDC8OYnGs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"]
    ];
});
_c = StudioEnvironment;
var _c;
__turbopack_context__.k.register(_c, "StudioEnvironment");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/three/ClockScene.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClockScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$ClockModelPolish$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/three/ClockModelPolish.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$SceneContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/three/SceneContainer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$ClockModelRefined$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/three/ClockModelRefined.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$ClockModelStable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/three/ClockModelStable.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$ClockModel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/three/ClockModel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$clockVariants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/three/clockVariants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$createEnvMap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/createEnvMap.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const DEFAULT_CLOCK_DISPLAY_SCALE = 0.5;
function ClockScene({ reducedMotion = false, variant = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$clockVariants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACTIVE_CLOCK_VARIANT"], sequenceOverride, modelYawOffset = 0, clockScale = DEFAULT_CLOCK_DISPLAY_SCALE }) {
    const isPolish = variant === 'polish';
    const Model = variant === 'stable' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$ClockModel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] : variant === 'polish' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$ClockModelPolish$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$ClockModelRefined$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$SceneContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        camera: {
            fov: 30,
            near: 0.01,
            far: 40,
            position: [
                0,
                0.12,
                5.05
            ]
        },
        toneMappingExposure: 0.98,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: isPolish ? 0.14 : 0.18,
                color: isPolish ? '#ead8bc' : '#eadcc1'
            }, void 0, false, {
                fileName: "[project]/src/components/three/ClockScene.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: isPolish ? [
                    2.22,
                    2.84,
                    5.16
                ] : [
                    2.4,
                    2.9,
                    5.4
                ],
                intensity: isPolish ? 1.04 : 1.18,
                color: isPolish ? '#fff1d5' : '#fff1d7'
            }, void 0, false, {
                fileName: "[project]/src/components/three/ClockScene.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: isPolish ? [
                    -1.28,
                    1.08,
                    4.28
                ] : [
                    -1.65,
                    0.95,
                    4.65
                ],
                intensity: isPolish ? 0.24 : 0.17,
                color: isPolish ? '#fff6df' : '#fff7e3'
            }, void 0, false, {
                fileName: "[project]/src/components/three/ClockScene.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    -3.4,
                    1.1,
                    2.1
                ],
                intensity: isPolish ? 0.05 : 0.08,
                color: isPolish ? '#c7b27f' : '#d2bd90'
            }, void 0, false, {
                fileName: "[project]/src/components/three/ClockScene.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    1.2,
                    2.6,
                    -4.8
                ],
                intensity: isPolish ? 0.08 : 0.12,
                color: "#fff9eb"
            }, void 0, false, {
                fileName: "[project]/src/components/three/ClockScene.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            isPolish ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    0.3,
                    2.28,
                    3.18
                ],
                intensity: 0.14,
                color: "#fff0ca"
            }, void 0, false, {
                fileName: "[project]/src/components/three/ClockScene.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                position: isPolish ? [
                    0.06,
                    0.46,
                    2.04
                ] : [
                    0.08,
                    0.5,
                    2.2
                ],
                intensity: isPolish ? 0.018 : 0.03,
                color: "#e9d19a",
                distance: 6.8
            }, void 0, false, {
                fileName: "[project]/src/components/three/ClockScene.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$createEnvMap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudioEnvironment"], {}, void 0, false, {
                fileName: "[project]/src/components/three/ClockScene.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                    rotation: [
                        0,
                        modelYawOffset,
                        0
                    ],
                    scale: [
                        clockScale,
                        clockScale,
                        clockScale
                    ],
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Model, {
                        reducedMotion: reducedMotion,
                        sequenceOverride: sequenceOverride
                    }, void 0, false, {
                        fileName: "[project]/src/components/three/ClockScene.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/three/ClockScene.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/three/ClockScene.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/three/ClockScene.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_c = ClockScene;
var _c;
__turbopack_context__.k.register(_c, "ClockScene");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/three/ClockScene.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/three/ClockScene.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_0i3at2o._.js.map