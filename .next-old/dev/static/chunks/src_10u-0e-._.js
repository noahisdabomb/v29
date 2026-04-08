(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/src/lib/drawLaptopScreen.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "drawLaptopScreen",
    ()=>drawLaptopScreen,
    "roundRect",
    ()=>roundRect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/content.ts [app-client] (ecmascript)");
;
;
function roundRect(ctx, x, y, w, h, r) {
    const radii = typeof r === 'number' ? [
        r,
        r,
        r,
        r
    ] : r;
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
function mix(a, b, t) {
    return Math.round(a + (b - a) * t);
}
function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
}
function rgba(r, g, b, a) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
function drawGrain(ctx, width, height, opacity) {
    if (opacity <= 0.001) return;
    ctx.save();
    ctx.globalAlpha = opacity;
    for(let index = 0; index < 1600; index += 1){
        const x = index * 73 % width;
        const y = index * 41 % height;
        const alpha = index % 5 / 5 * 0.08;
        ctx.fillStyle = rgba(255, 244, 230, alpha);
        ctx.fillRect(x, y, 1, 1);
    }
    ctx.restore();
}
function drawLaptopScreen(ctx, state, _emails) {
    void _emails;
    const { screenReveal, screenWake, glowAmount, screenMessageOpacity, screenMessageHold, planeMatchProgress, takeoverOpacity, screenRedAmount } = state;
    const w = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAPTOP_CANVAS"].width;
    const h = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAPTOP_CANVAS"].height;
    const redField = screenRedAmount;
    ctx.clearRect(0, 0, w, h);
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, rgb(mix(14, 108, redField), mix(8, 13, redField), mix(10, 22, redField)));
    bg.addColorStop(0.52, rgb(mix(18, 168, redField), mix(8, 16, redField), mix(10, 36, redField)));
    bg.addColorStop(1, rgb(mix(12, 132, redField), mix(6, 9, redField), mix(8, 24, redField)));
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    const wakeGlow = ctx.createRadialGradient(w * 0.5, h * 0.22, 0, w * 0.5, h * 0.24, h * 0.76);
    wakeGlow.addColorStop(0, `rgba(255,243,226,${0.02 + screenWake * 0.18 + glowAmount * 0.16 + redField * 0.08})`);
    wakeGlow.addColorStop(0.22, `rgba(255,102,120,${0.06 + screenWake * 0.14 + glowAmount * 0.1 + redField * 0.14})`);
    wakeGlow.addColorStop(0.58, `rgba(124,20,34,${0.16 + redField * 0.26})`);
    wakeGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = wakeGlow;
    ctx.fillRect(0, 0, w, h);
    const lidBeam = ctx.createLinearGradient(0, 0, 0, h * 0.42);
    lidBeam.addColorStop(0, `rgba(255,246,236,${0.008 + screenWake * 0.08 + glowAmount * 0.08})`);
    lidBeam.addColorStop(0.2, `rgba(255,170,185,${0.014 + screenWake * 0.06 + glowAmount * 0.08})`);
    lidBeam.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = lidBeam;
    ctx.fillRect(0, 0, w, h * 0.42);
    const vignette = ctx.createLinearGradient(0, 0, 0, h);
    vignette.addColorStop(0, 'rgba(255,255,255,0.02)');
    vignette.addColorStop(0.45, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, `rgba(20,4,8,${0.34 + redField * 0.2})`);
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);
    drawGrain(ctx, w, h, 0.06 + redField * 0.05);
    ctx.save();
    ctx.globalAlpha = Math.max(0.1, screenReveal * 0.16);
    ctx.strokeStyle = `rgba(255,239,222,${0.05 + redField * 0.06})`;
    ctx.lineWidth = 1;
    roundRect(ctx, 96, 60, w - 192, h - 120, 34);
    ctx.stroke();
    ctx.restore();
    if (screenMessageOpacity > 0.01) {
        ctx.save();
        ctx.globalAlpha = screenMessageOpacity;
        ctx.translate(0, (1 - screenMessageOpacity) * 18 - screenMessageHold * 4);
        roundRect(ctx, w / 2 - 80, 118, 160, 34, 17);
        ctx.fillStyle = `rgba(255,241,225,${0.07 + screenMessageHold * 0.06})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255,242,226,${0.12 + screenMessageHold * 0.09})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = '#fff2e2';
        ctx.font = `500 12px ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FONTS"].mono}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_LAPTOP"].alertTime.toUpperCase(), w / 2, 135);
        ctx.fillStyle = '#fff4e8';
        ctx.font = `700 68px ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FONTS"].heading}`;
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_LAPTOP"].alertTitle, w / 2, 292);
        const subtitleAlpha = (0.18 + screenMessageHold * 0.58) * (1 - planeMatchProgress * 0.7);
        if (subtitleAlpha > 0.01) {
            ctx.fillStyle = `rgba(255,239,222,${subtitleAlpha})`;
            ctx.font = `500 16px ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FONTS"].body}`;
            ctx.fillText(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_LAPTOP"].popupSubtitle, w / 2, 332);
        }
        ctx.strokeStyle = 'rgba(255,228,197,0.22)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(w / 2 - 98, 352);
        ctx.lineTo(w / 2 + 98, 352);
        ctx.stroke();
        ctx.restore();
    }
    if (takeoverOpacity > 0.01) {
        ctx.save();
        ctx.globalAlpha = 0.18 + takeoverOpacity * 0.28;
        const takeoverGradient = ctx.createRadialGradient(w * 0.5, h * 0.5, h * 0.08, w * 0.5, h * 0.5, h * 0.78);
        takeoverGradient.addColorStop(0, 'rgba(255,108,126,0.36)');
        takeoverGradient.addColorStop(0.5, 'rgba(203,28,52,0.28)');
        takeoverGradient.addColorStop(1, 'rgba(94,9,20,0)');
        ctx.fillStyle = takeoverGradient;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/three/LaptopModel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LaptopModel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__G__as__useLoader$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export G as useLoader>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$FBXLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/loaders/FBXLoader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/scrollStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$drawLaptopScreen$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/drawLaptopScreen.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycleScreenState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cycleScreenState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/easing.ts [app-client] (ecmascript)");
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
;
const MODEL_SCALE = 6.5;
function buildLaptopMaterial(mat) {
    const name = (mat?.name ?? '').toLowerCase();
    const preset = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAPTOP_MATERIALS"][name] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAPTOP_MATERIAL_DEFAULT"];
    const src = mat;
    const next = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: preset.color,
        metalness: preset.metalness,
        roughness: preset.roughness,
        envMapIntensity: name === 'glass' ? 0.02 : 1.28,
        map: src?.map ?? null,
        normalMap: src?.normalMap ?? null,
        transparent: !!preset.transparent,
        opacity: name === 'glass' ? 0.035 : preset.opacity ?? 1
    });
    if (name === 'glass') {
        next.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0x09090c);
        next.roughness = 0.22;
        next.metalness = 0;
    }
    if (preset.emissive !== undefined) {
        next.emissive = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](preset.emissive);
    }
    if (preset.emissiveIntensity !== undefined) {
        next.emissiveIntensity = preset.emissiveIntensity;
    }
    return next;
}
function getLaptopSequenceProgress(cycleProgress) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((cycleProgress - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].laptop.in) / (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].laptop.out - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].laptop.in), 0, 1);
}
function LaptopModel({ emails, reducedMotion = false }) {
    _s();
    const macbookGroupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const laptopModelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const baseGroupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lidGroupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lidPivotGroupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const greenGlowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hingeGlowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const screenGlowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const screenOverlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const boundsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]());
    const sizeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textureRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const screenMaterialRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastStateKeyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('');
    const processedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const fbx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__G__as__useLoader$3e$__["useLoader"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$FBXLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FBXLoader"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MODEL_ASSETS"].laptop.fbx);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LaptopModel.useEffect": ()=>{
            const canvas = document.createElement('canvas');
            canvas.width = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAPTOP_CANVAS"].width;
            canvas.height = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAPTOP_CANVAS"].height;
            canvasRef.current = canvas;
            const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
            texture.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            texture.anisotropy = 4;
            textureRef.current = texture;
            return ({
                "LaptopModel.useEffect": ()=>{
                    texture.dispose();
                    textureRef.current = null;
                    canvasRef.current = null;
                }
            })["LaptopModel.useEffect"];
        }
    }["LaptopModel.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LaptopModel.useEffect": ()=>{
            if (processedRef.current || !fbx || !macbookGroupRef.current) return;
            processedRef.current = true;
            const group = macbookGroupRef.current;
            const baseGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            const lidGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            const lidPivotGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            lidPivotGroupRef.current = lidPivotGroup;
            let screenMesh = null;
            const lidMeshes = [];
            const baseMeshes = [];
            fbx.traverse({
                "LaptopModel.useEffect": (child)=>{
                    if (!(child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"])) return;
                    const nodeName = child.name.toLowerCase();
                    if (nodeName.startsWith('lid_low')) {
                        lidMeshes.push(child);
                    } else {
                        baseMeshes.push(child);
                    }
                    const matName = (Array.isArray(child.material) ? child.material[0]?.name : child.material?.name) ?? '';
                    if (nodeName === 'lid_low010' || matName.toLowerCase().includes('disp')) {
                        screenMesh = child;
                    }
                }
            }["LaptopModel.useEffect"]);
            const convertMeshMaterial = {
                "LaptopModel.useEffect.convertMeshMaterial": (mesh)=>{
                    if (Array.isArray(mesh.material)) {
                        mesh.material = mesh.material.map({
                            "LaptopModel.useEffect.convertMeshMaterial": (material)=>{
                                const next = buildLaptopMaterial(material);
                                material.dispose();
                                return next;
                            }
                        }["LaptopModel.useEffect.convertMeshMaterial"]);
                    } else {
                        const oldMaterial = mesh.material;
                        mesh.material = buildLaptopMaterial(oldMaterial);
                        oldMaterial.dispose();
                    }
                }
            }["LaptopModel.useEffect.convertMeshMaterial"];
            baseMeshes.forEach(convertMeshMaterial);
            lidMeshes.forEach(convertMeshMaterial);
            const laptopModel = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            laptopModelRef.current = laptopModel;
            baseGroupRef.current = baseGroup;
            lidGroupRef.current = lidGroup;
            for (const mesh of baseMeshes){
                mesh.removeFromParent();
                baseGroup.add(mesh);
            }
            for (const mesh of lidMeshes){
                mesh.removeFromParent();
                lidGroup.add(mesh);
            }
            laptopModel.add(baseGroup);
            baseGroup.updateMatrixWorld(true);
            lidGroup.updateMatrixWorld(true);
            const baseBox = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(baseGroup);
            const lidBox = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(lidGroup);
            const lidPivot = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, baseBox.max.y, lidBox.min.z);
            lidPivotGroup.position.copy(lidPivot);
            lidGroup.position.copy(lidPivot).multiplyScalar(-1);
            lidPivotGroup.add(lidGroup);
            laptopModel.add(lidPivotGroup);
            laptopModel.rotation.x = -Math.PI / 2;
            laptopModel.scale.setScalar(MODEL_SCALE);
            laptopModel.updateMatrixWorld(true);
            const box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(laptopModel);
            const center = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            box.getCenter(center);
            laptopModel.position.sub(center);
            laptopModel.updateMatrixWorld(true);
            const settled = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(laptopModel);
            laptopModel.position.y -= settled.min.y;
            laptopModel.updateMatrixWorld(true);
            const finalBounds = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(laptopModel);
            boundsRef.current.copy(finalBounds);
            const finalSize = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            finalBounds.getSize(finalSize);
            sizeRef.current.copy(finalSize);
            if (screenMesh && textureRef.current) {
                const displayMesh = screenMesh;
                displayMesh.visible = false;
                const screenMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                    map: textureRef.current,
                    toneMapped: false,
                    side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                    depthTest: false,
                    depthWrite: false,
                    polygonOffset: true,
                    polygonOffsetFactor: -4,
                    polygonOffsetUnits: -4
                });
                screenMaterialRef.current = screenMaterial;
                const screenOverlay = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](displayMesh.geometry.clone(), screenMaterial);
                screenOverlay.position.copy(displayMesh.position);
                screenOverlay.quaternion.copy(displayMesh.quaternion);
                screenOverlay.scale.copy(displayMesh.scale);
                screenOverlay.renderOrder = 20;
                screenOverlay.frustumCulled = false;
                screenOverlayRef.current = screenOverlay;
                lidGroup.add(screenOverlay);
            }
            group.add(laptopModel);
            const minY = finalBounds.min.y;
            const minZ = finalBounds.min.z;
            const sizeY = finalSize.y;
            const sizeZ = finalSize.z;
            const greenGlow = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointLight"](0xffd8c3, 0, 7.6, 2);
            greenGlow.position.set(0, minY + sizeY * 0.08, minZ + sizeZ * 0.015);
            greenGlowRef.current = greenGlow;
            group.add(greenGlow);
            const hingeGlow = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointLight"](0xffd6c7, 0, 5.6, 2.2);
            hingeGlow.position.set(0, minY + sizeY * 0.08, minZ + sizeZ * 0.02);
            hingeGlowRef.current = hingeGlow;
            group.add(hingeGlow);
            const screenGlow = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointLight"](0xff8ea0, 0, 9.6, 1.85);
            screenGlow.position.set(0, minY + sizeY * 0.16, minZ + sizeZ * 0.05);
            screenGlowRef.current = screenGlow;
            group.add(screenGlow);
            lidPivotGroup.rotation.set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAPTOP_CLOSED_LID_ANGLE"], 0, 0);
        }
    }["LaptopModel.useEffect"], [
        fbx
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "LaptopModel.useFrame": ({ camera })=>{
            const cycleProgress = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"].getState().cycleProgress;
            const sequenceProgress = reducedMotion ? 1 : getLaptopSequenceProgress(cycleProgress);
            const lidPivot = lidPivotGroupRef.current;
            const groupNode = macbookGroupRef.current;
            const baseGroup = baseGroupRef.current;
            const lidGroup = lidGroupRef.current;
            const greenGlow = greenGlowRef.current;
            const hingeGlow = hingeGlowRef.current;
            const screenGlow = screenGlowRef.current;
            const screenOverlay = screenOverlayRef.current;
            if (!lidPivot || !groupNode || !baseGroup || !lidGroup) return;
            const laptopState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycleScreenState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLaptopSequenceState"])(sequenceProgress, emails.length, reducedMotion);
            const openStart = 0.0;
            const openEnd = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].laptop.openEnd;
            const headlineHoldEnd = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].laptop.headlineHoldEnd;
            const redTakeoverStart = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].laptop.redTakeoverStart;
            const redTakeoverEnd = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].laptop.redTakeoverEnd;
            const openT = reducedMotion ? 1 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((sequenceProgress - openStart) / (openEnd - openStart), 0, 1);
            const lidSettleAngle = reducedMotion ? -0.02 : sequenceProgress < openEnd ? -0.05 : sequenceProgress < headlineHoldEnd ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(-0.05, -0.022, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((sequenceProgress - openEnd) / Math.max(headlineHoldEnd - openEnd, 0.001))) : -0.018;
            const lidAngle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAPTOP_CLOSED_LID_ANGLE"], lidSettleAngle, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])(openT));
            lidPivot.rotation.set(lidAngle, 0, 0);
            const hardwareFade = reducedMotion ? 1 : laptopState.hardwareFade;
            if (greenGlow && hingeGlow && screenGlow) {
                const glow = laptopState.glowAmount;
                const wake = laptopState.screenWake;
                const redBoost = laptopState.screenRedAmount;
                greenGlow.intensity = 0.008 + glow * 0.06 + wake * 0.04;
                hingeGlow.intensity = 0.006 + glow * 0.04 + wake * 0.02;
                screenGlow.intensity = 0.12 + glow * 1.2 + wake * 0.8 + laptopState.screenMessageOpacity * 0.28 + redBoost * 0.4;
                const bounds = boundsRef.current;
                const size = sizeRef.current;
                const minY = bounds.min.y;
                const minZ = bounds.min.z;
                const sizeY = size.y;
                const sizeZ = size.z;
                const openRatio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(1 - lidAngle / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAPTOP_CLOSED_LID_ANGLE"], 0, 1);
                greenGlow.position.set(0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(minY + sizeY * 0.07, minY + sizeY * 0.17, openRatio), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(minZ + sizeZ * 0.025, minZ + sizeZ * 0.05, openRatio));
                hingeGlow.position.set(0, minY + sizeY * 0.08, minZ + sizeZ * 0.02);
                screenGlow.position.set(0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(minY + sizeY * 0.12, minY + sizeY * 0.46, openRatio), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(minZ + sizeZ * 0.035, minZ + sizeZ * 0.11, openRatio));
            }
            baseGroup.visible = hardwareFade > 0.03;
            lidGroup.visible = true;
            lidGroup.traverse({
                "LaptopModel.useFrame": (child)=>{
                    if (!(child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"]) || child === screenOverlay) return;
                    const materials = Array.isArray(child.material) ? child.material : [
                        child.material
                    ];
                    materials.forEach({
                        "LaptopModel.useFrame": (material)=>{
                            const meshMaterial = material;
                            meshMaterial.transparent = hardwareFade < 0.999;
                            meshMaterial.opacity = hardwareFade;
                            meshMaterial.needsUpdate = true;
                        }
                    }["LaptopModel.useFrame"]);
                }
            }["LaptopModel.useFrame"]);
            if (screenOverlay && screenMaterialRef.current) {
                const screenMaterial = screenMaterialRef.current;
                screenMaterial.opacity = 1;
                screenMaterial.transparent = false;
                screenMaterial.needsUpdate = true;
            }
            let rotX;
            let rotY;
            let groupX;
            let groupY;
            let groupZ;
            const holdSettle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((sequenceProgress - openEnd) / 0.12, 0, 1);
            const planeMatch = reducedMotion ? 0 : laptopState.planeMatchProgress;
            if (reducedMotion) {
                rotX = 0;
                rotY = 0.02;
                groupX = -0.012;
                groupY = 0.014;
                groupZ = 0.026;
            } else if (sequenceProgress < openEnd) {
                const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])(sequenceProgress / openEnd);
                rotX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(-0.2, -0.062, t);
                rotY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.46, 0.18, t);
                groupX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(-0.14, -0.06, t);
                groupY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(-0.09, -0.01, t);
                groupZ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(-0.08, 0.012, t);
            } else if (sequenceProgress < headlineHoldEnd) {
                const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])(holdSettle);
                rotX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(-0.062, -0.034, t);
                rotY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.18, 0.044, t);
                groupX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(-0.06, -0.014, t);
                groupY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(-0.01, 0.012, t);
                groupZ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.012, 0.028, t);
            } else if (sequenceProgress < redTakeoverStart) {
                rotX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(-0.034, -0.02, planeMatch);
                rotY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.044, 0.012, planeMatch);
                groupX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(-0.014, 0, planeMatch);
                groupY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.012, 0.014, planeMatch);
                groupZ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.028, 0.014, planeMatch);
            } else if (sequenceProgress < redTakeoverEnd) {
                const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((sequenceProgress - redTakeoverStart) / Math.max(redTakeoverEnd - redTakeoverStart, 0.001));
                rotX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(-0.02, -0.014, t);
                rotY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.012, 0.006, t);
                groupX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0, -0.002, t);
                groupY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.016, 0.014, t);
                groupZ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.014, 0.006, t);
            } else {
                rotX = -0.014;
                rotY = 0.006;
                groupX = -0.002;
                groupY = 0.014;
                groupZ = 0.006;
            }
            groupNode.rotation.set(rotX, rotY, 0);
            groupNode.position.x = groupX;
            groupNode.position.y = groupY;
            groupNode.position.z = groupZ;
            let cx;
            let cy;
            let cz;
            let lx;
            let ly;
            let lz;
            if (reducedMotion) {
                cx = 0.14;
                cy = 0.98;
                cz = 5.28;
                lx = -0.03;
                ly = 0.93;
                lz = 0.04;
            } else if (sequenceProgress < openEnd) {
                const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])(sequenceProgress / openEnd);
                cx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.82, 0.4, t);
                cy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(2.34, 1.14, t);
                cz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(9.1, 5.92, t);
                lx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(-0.34, -0.11, t);
                ly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.02, 0.88, t);
                lz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.36, 0.08, t);
            } else if (sequenceProgress < headlineHoldEnd) {
                const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])(holdSettle);
                cx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.4, 0.18, t);
                cy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(1.14, 0.99, t);
                cz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(5.92, 5.4, t);
                lx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(-0.11, -0.04, t);
                ly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.88, 0.93, t);
                lz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.08, 0.05, t);
            } else if (sequenceProgress < redTakeoverStart) {
                cx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.18, 0.02, planeMatch);
                cy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.99, 0.94, planeMatch);
                cz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(5.4, 5.08, planeMatch);
                lx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(-0.04, 0, planeMatch);
                ly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.93, 0.95, planeMatch);
                lz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.05, 0.03, planeMatch);
            } else if (sequenceProgress < redTakeoverEnd) {
                const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((sequenceProgress - redTakeoverStart) / Math.max(redTakeoverEnd - redTakeoverStart, 0.001));
                cx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.02, 0, t);
                cy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.94, 0.86, t);
                cz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(5.08, 4.46, t);
                lx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0, 0, t);
                ly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.95, 0.96, t);
                lz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(0.03, 0.02, t);
            } else {
                cx = 0;
                cy = 0.86;
                cz = 4.46;
                lx = 0;
                ly = 0.96;
                lz = 0.02;
            }
            camera.position.set(cx, cy, cz);
            camera.lookAt(lx, ly, lz);
            const ctx = canvasRef.current?.getContext('2d');
            const texture = textureRef.current;
            const screenMaterial = screenMaterialRef.current;
            if (screenMaterial && screenMaterial.map !== texture && texture) {
                screenMaterial.map = texture;
                screenMaterial.needsUpdate = true;
            }
            if (!ctx || !texture) return;
            const stateKey = [
                laptopState.screenReveal.toFixed(2),
                laptopState.screenWake.toFixed(2),
                laptopState.glowAmount.toFixed(2),
                laptopState.screenMessageOpacity.toFixed(2),
                laptopState.screenMessageHold.toFixed(2),
                laptopState.planeMatchProgress.toFixed(2),
                laptopState.takeoverOpacity.toFixed(2),
                laptopState.screenRedAmount.toFixed(2),
                laptopState.hardwareFade.toFixed(2),
                emails.map({
                    "LaptopModel.useFrame.stateKey": (entry)=>entry.time
                }["LaptopModel.useFrame.stateKey"]).join(',')
            ].join('|');
            if (stateKey !== lastStateKeyRef.current) {
                lastStateKeyRef.current = stateKey;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$drawLaptopScreen$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawLaptopScreen"])(ctx, laptopState, emails);
                texture.needsUpdate = true;
            }
        }
    }["LaptopModel.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: macbookGroupRef
    }, void 0, false, {
        fileName: "[project]/src/components/three/LaptopModel.tsx",
        lineNumber: 531,
        columnNumber: 5
    }, this);
}
_s(LaptopModel, "E+amrdOFfrJf4anwhT1fSxerShE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__G__as__useLoader$3e$__["useLoader"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = LaptopModel;
var _c;
__turbopack_context__.k.register(_c, "LaptopModel");
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
"[project]/src/components/three/LaptopScene.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LaptopScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__G__as__useLoader$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export G as useLoader>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$FBXLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/loaders/FBXLoader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$SceneContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/three/SceneContainer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$LaptopModel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/three/LaptopModel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$createEnvMap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/createEnvMap.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
// Start downloading the FBX model early (before component mounts)
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__G__as__useLoader$3e$__["useLoader"].preload(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$FBXLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FBXLoader"], '/models/macbook_m3_14/source/Lowpoly.fbx');
function LaptopScene({ emails, reducedMotion = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$SceneContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        camera: {
            fov: 24.5,
            near: 0.01,
            far: 50,
            position: [
                0.18,
                1.06,
                5.2
            ]
        },
        toneMappingExposure: 1.04,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                color: 0xf7f4ec,
                intensity: 0.12
            }, void 0, false, {
                fileName: "[project]/src/components/three/LaptopScene.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    2.6,
                    5.8,
                    4.6
                ],
                intensity: 1.02,
                color: 0xfdf8ef
            }, void 0, false, {
                fileName: "[project]/src/components/three/LaptopScene.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    -4.2,
                    1.7,
                    -3.1
                ],
                intensity: 0.08,
                color: 0xd7ddea
            }, void 0, false, {
                fileName: "[project]/src/components/three/LaptopScene.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    -1.4,
                    3.4,
                    -4.6
                ],
                intensity: 0.16,
                color: 0xf4f7ff
            }, void 0, false, {
                fileName: "[project]/src/components/three/LaptopScene.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    0.7,
                    6.2,
                    0.5
                ],
                intensity: 0.26,
                color: 0xfffcf4
            }, void 0, false, {
                fileName: "[project]/src/components/three/LaptopScene.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                position: [
                    2.24,
                    0.48,
                    1.86
                ],
                intensity: 0.038,
                color: 0xffd9c8,
                distance: 5.3
            }, void 0, false, {
                fileName: "[project]/src/components/three/LaptopScene.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$createEnvMap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudioEnvironment"], {}, void 0, false, {
                fileName: "[project]/src/components/three/LaptopScene.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$LaptopModel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    emails: emails,
                    reducedMotion: reducedMotion
                }, void 0, false, {
                    fileName: "[project]/src/components/three/LaptopScene.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/three/LaptopScene.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/three/LaptopScene.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = LaptopScene;
var _c;
__turbopack_context__.k.register(_c, "LaptopScene");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/three/LaptopScene.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/three/LaptopScene.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_10u-0e-._.js.map