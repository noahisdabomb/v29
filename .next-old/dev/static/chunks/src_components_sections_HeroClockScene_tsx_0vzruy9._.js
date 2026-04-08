(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/sections/HeroClockScene.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroClockScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Gltf.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$drawClockFace$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/drawClockFace.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clockFaceState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/clockFaceState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
const CLOCK_MODEL_URL = '/models/flip-clock/retro-flip-clock-shell.glb';
// Flip animation timing
const FLIP_DURATION_MS = 340;
const FLIP_STAGGER_MS = 260;
function timeToDigits(hour24, minute) {
    let h12 = hour24 % 12;
    if (h12 === 0) h12 = 12;
    return {
        hourTens: String(Math.floor(h12 / 10)),
        hour: String(h12 % 10),
        minuteTens: String(Math.floor(minute / 10)),
        minuteOnes: String(minute % 10)
    };
}
function buildHeroRenderState(digits, flip, now) {
    if (!flip) {
        // Settled — all cards show current digit
        return {
            faceOpacity: 1,
            periodLabel: 'AM',
            cards: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clockFaceState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveCardState"])(1, 'hourTens', digits.hourTens, digits.hourTens),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clockFaceState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveCardState"])(1, 'hour', digits.hour, digits.hour),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clockFaceState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveCardState"])(1, 'minuteTens', digits.minuteTens, digits.minuteTens),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clockFaceState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveCardState"])(1, 'minuteOnes', digits.minuteOnes, digits.minuteOnes)
            ]
        };
    }
    const elapsed = now - flip.startTime;
    const { fromDigits, toDigits } = flip;
    // Cards flip in order: minuteOnes (0ms), minuteTens (1×), hourOnes (2×), hourTens (3×)
    const cardDefs = [
        {
            key: 'hourTens',
            from: fromDigits.hourTens,
            to: toDigits.hourTens,
            delay: FLIP_STAGGER_MS * 3
        },
        {
            key: 'hour',
            from: fromDigits.hour,
            to: toDigits.hour,
            delay: FLIP_STAGGER_MS * 2
        },
        {
            key: 'minuteTens',
            from: fromDigits.minuteTens,
            to: toDigits.minuteTens,
            delay: FLIP_STAGGER_MS
        },
        {
            key: 'minuteOnes',
            from: fromDigits.minuteOnes,
            to: toDigits.minuteOnes,
            delay: 0
        }
    ];
    return {
        faceOpacity: 1,
        periodLabel: 'AM',
        cards: cardDefs.map(({ key, from, to, delay })=>{
            if (from === to) {
                // This card didn't change — show settled
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clockFaceState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveCardState"])(1, key, to, to);
            }
            const cardElapsed = elapsed - delay;
            if (cardElapsed <= 0) {
                // Not started yet — show old digit
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clockFaceState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveCardState"])(0, key, from, to);
            }
            const progress = Math.min(cardElapsed / FLIP_DURATION_MS, 1);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clockFaceState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveCardState"])(progress, key, from, to);
        })
    };
}
// ---------------------------------------------------------------------------
// HeroEnvironment — warm PMREM with magenta rim, cream key, plum backdrop
// ---------------------------------------------------------------------------
function HeroEnvironment() {
    _s();
    const { gl, scene, invalidate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroEnvironment.useEffect": ()=>{
            const pmrem = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PMREMGenerator"](gl);
            pmrem.compileEquirectangularShader();
            const envScene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
            // Warm black backdrop (Analog Vivid #0E0C0A)
            const backdropGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](50, 32, 32);
            const backdropMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0.055, 0.047, 0.039),
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackSide"]
            });
            envScene.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](backdropGeo, backdropMat));
            // Warm key light (dimmed to avoid hot reflections on plastic)
            const keyGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](20, 20);
            const keyMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0.35, 0.33, 0.30)
            });
            const key = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](keyGeo, keyMat);
            key.position.set(0, 15, 10);
            key.lookAt(0, 0, 0);
            envScene.add(key);
            // Magenta rim highlight
            const rimGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](8, 8);
            const rimMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0.88, 0.27, 0.35)
            });
            const rim = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](rimGeo, rimMat);
            rim.position.set(12, 3, -8);
            rim.lookAt(0, 0, 0);
            envScene.add(rim);
            // Cool fill
            const fillGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](10, 10);
            const fillMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0.4, 0.42, 0.48)
            });
            const fill = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](fillGeo, fillMat);
            fill.position.set(-15, 5, -5);
            fill.lookAt(0, 0, 0);
            envScene.add(fill);
            // Floor bounce (warm)
            const floorGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](30, 30);
            const floorMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0.15, 0.1, 0.08)
            });
            const floor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](floorGeo, floorMat);
            floor.position.set(0, -15, 0);
            floor.rotation.x = -Math.PI / 2;
            envScene.add(floor);
            const envTexture = pmrem.fromScene(envScene, 0.04).texture;
            scene.environment = envTexture;
            invalidate();
            // Cleanup intermediate resources
            pmrem.dispose();
            [
                backdropGeo,
                keyGeo,
                rimGeo,
                fillGeo,
                floorGeo
            ].forEach({
                "HeroEnvironment.useEffect": (g)=>g.dispose()
            }["HeroEnvironment.useEffect"]);
            [
                backdropMat,
                keyMat,
                rimMat,
                fillMat,
                floorMat
            ].forEach({
                "HeroEnvironment.useEffect": (m)=>m.dispose()
            }["HeroEnvironment.useEffect"]);
            return ({
                "HeroEnvironment.useEffect": ()=>{
                    scene.environment = null;
                    envTexture.dispose();
                }
            })["HeroEnvironment.useEffect"];
        }
    }["HeroEnvironment.useEffect"], [
        gl,
        invalidate,
        scene
    ]);
    return null;
}
_s(HeroEnvironment, "XfNXh2CJxxm67b+sgKItT+k86Ds=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"]
    ];
});
_c = HeroEnvironment;
// ---------------------------------------------------------------------------
// Material preparation
// ---------------------------------------------------------------------------
function prepareMaterial(material) {
    const base = material.clone();
    if (base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"] || base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]) {
        if (base.map) {
            base.map.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            base.map.needsUpdate = true;
        }
        if (base.emissiveMap) {
            base.emissiveMap.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            base.emissiveMap.needsUpdate = true;
        }
    }
    base.needsUpdate = true;
    return base;
}
function prepareHeroClockModel(scene) {
    const clone = scene.clone(true);
    // Comp-matched material overrides by name
    const matOverrides = {
        ClockPlastic: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0xc83a50),
            roughness: 0.55,
            metalness: 0.05,
            envMapIntensity: 0.25
        }),
        ClockBlack: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0x3d1225),
            roughness: 0.5,
            metalness: 0.05,
            envMapIntensity: 0.3
        }),
        Gold: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0xdeb42e),
            roughness: 0.3,
            metalness: 0.7,
            envMapIntensity: 0.8
        }),
        DeskClockGlass: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]({
            color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#060704'),
            transparent: true,
            opacity: 0.1,
            roughness: 0.05,
            metalness: 0,
            envMapIntensity: 0.25,
            clearcoat: 0.15,
            clearcoatRoughness: 0.12,
            depthWrite: false
        }),
        ClockInnerShadowMat: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0x1a0a10),
            roughness: 0.8,
            metalness: 0.0,
            envMapIntensity: 0.1
        })
    };
    clone.traverse((child)=>{
        if (!(child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"])) return;
        child.castShadow = true;
        child.receiveShadow = true;
        child.frustumCulled = false;
        // Hide back panel box — we use a separate face plane instead
        if (child.name === 'ClockBackPanel') {
            child.visible = false;
            return;
        }
        // Replace materials — handle multi-material meshes (e.g. FlipClockShell has 4 primitives)
        if (Array.isArray(child.material)) {
            child.material = child.material.map((mat)=>{
                return matOverrides[mat.name] ?? prepareMaterial(mat);
            });
        } else {
            const name = child.material?.name ?? '';
            child.material = matOverrides[name] ?? prepareMaterial(child.material);
        }
    });
    clone.rotation.y = -Math.PI / 2;
    const box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(clone);
    const rawSize = box.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    const maxDimension = Math.max(rawSize.x, rawSize.y, rawSize.z) || 1;
    const scale = 2.58 / maxDimension;
    clone.scale.setScalar(scale);
    const box2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(clone);
    const center = box2.getCenter(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    const size = box2.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    clone.position.x -= center.x;
    clone.position.y -= center.y - size.y * 0.02;
    clone.position.z -= center.z;
    // Recompute box after centering
    const finalBox = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(clone);
    const finalSize = finalBox.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    return {
        object: clone,
        box: finalBox,
        size: finalSize
    };
}
function HeroClockModel({ bkkHour, bkkMinute }) {
    _s1();
    const gltf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"])(CLOCK_MODEL_URL);
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ctxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastKeyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('');
    const flipRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const prevTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        hour: bkkHour,
        minute: bkkMinute
    });
    const prepared = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HeroClockModel.useMemo[prepared]": ()=>prepareHeroClockModel(gltf.scene)
    }["HeroClockModel.useMemo[prepared]"], [
        gltf.scene
    ]);
    // Face plane dimensions (mirroring production ClockModel)
    const faceWidth = prepared.size.x * 0.82;
    const faceHeight = prepared.size.y * 0.44;
    const faceY = prepared.box.min.y + prepared.size.y * 0.56;
    const faceZ = prepared.box.max.z - prepared.size.z * 0.038;
    const sizeZ = prepared.size.z;
    const bezelWidth = faceWidth * 1.04;
    const bezelHeight = faceHeight * 1.08;
    // Create canvas + texture once (stable across renders)
    const { ctx, tex } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HeroClockModel.useMemo": ()=>{
            const canvas = document.createElement('canvas');
            canvas.width = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLOCK_CANVAS"].width;
            canvas.height = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLOCK_CANVAS"].height;
            const _ctx = canvas.getContext('2d');
            const _tex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
            _tex.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            _tex.anisotropy = 4;
            // Draw initial face
            const digits = timeToDigits(bkkHour, bkkMinute);
            const renderState = buildHeroRenderState(digits, null, 0);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$drawClockFace$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawClockFaceFromState"])(_ctx, renderState);
            _tex.needsUpdate = true;
            return {
                ctx: _ctx,
                tex: _tex
            };
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["HeroClockModel.useMemo"], []);
    // Store ctx ref for useFrame access
    ctxRef.current = ctx;
    // Detect minute change → start flip animation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroClockModel.useEffect": ()=>{
            const prev = prevTimeRef.current;
            if (prev.hour === bkkHour && prev.minute === bkkMinute) return;
            const fromDigits = timeToDigits(prev.hour, prev.minute);
            const toDigits = timeToDigits(bkkHour, bkkMinute);
            flipRef.current = {
                startTime: performance.now(),
                fromDigits,
                toDigits
            };
            prevTimeRef.current = {
                hour: bkkHour,
                minute: bkkMinute
            };
        }
    }["HeroClockModel.useEffect"], [
        bkkHour,
        bkkMinute
    ]);
    // Animation loop: breathing + live face redraw
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "HeroClockModel.useFrame": (state)=>{
            const node = groupRef.current;
            if (!node) return;
            const t = state.clock.elapsedTime;
            // Keep the hero scene repainting so post-mount env/material updates
            // and the subtle breathing motion don't get stuck on the first frame.
            state.invalidate();
            // Breathing rotation + gentle idle rock
            const breathe = Math.sin(t * 0.35);
            const drift = Math.sin(t * 0.18);
            const bob = Math.sin(t * 0.25);
            node.rotation.y = -0.18 + breathe * 0.035 + drift * 0.012;
            node.rotation.x = -0.03 + bob * 0.018;
            node.position.y = -0.14 + bob * 0.014;
            // Update clock face texture
            const fCtx = ctxRef.current;
            if (!fCtx) return;
            const now = performance.now();
            const digits = timeToDigits(bkkHour, bkkMinute);
            const flip = flipRef.current;
            // Check if flip animation is complete
            if (flip) {
                const totalDuration = FLIP_STAGGER_MS * 3 + FLIP_DURATION_MS;
                if (now - flip.startTime > totalDuration) {
                    flipRef.current = null;
                }
            }
            const renderState = buildHeroRenderState(digits, flipRef.current, now);
            // Build dedup key from card states
            const faceKey = renderState.cards.map({
                "HeroClockModel.useFrame.faceKey": (c)=>`${c.fromDigit}${c.toDigit}${c.rawProgress.toFixed(3)}`
            }["HeroClockModel.useFrame.faceKey"]).join('|');
            if (faceKey !== lastKeyRef.current) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$drawClockFace$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawClockFaceFromState"])(fCtx, renderState);
                tex.needsUpdate = true;
                lastKeyRef.current = faceKey;
            }
        }
    }["HeroClockModel.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        position: [
            0,
            -0.14,
            0
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
                object: prepared.object
            }, void 0, false, {
                fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                lineNumber: 415,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    faceY,
                    faceZ - sizeZ * 0.013
                ],
                renderOrder: 1.5,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            bezelWidth,
                            bezelHeight
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                        lineNumber: 419,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#2a0812",
                        roughness: 0.9,
                        metalness: 0.02,
                        envMapIntensity: 0.08,
                        toneMapped: false
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                        lineNumber: 420,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                lineNumber: 418,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    faceY,
                    faceZ - sizeZ * 0.025
                ],
                renderOrder: 2,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            faceWidth,
                            faceHeight
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                        lineNumber: 431,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: "#13060a",
                        toneMapped: false,
                        depthWrite: false
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                        lineNumber: 432,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                lineNumber: 430,
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
                        fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                        lineNumber: 441,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        map: tex,
                        toneMapped: false,
                        transparent: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                        lineNumber: 442,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                lineNumber: 440,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("spotLight", {
                position: [
                    1.8,
                    1.3,
                    2.4
                ],
                angle: 0.46,
                penumbra: 0.8,
                intensity: 0.56,
                distance: 7,
                color: "#fff8e6"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                lineNumber: 445,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/HeroClockScene.tsx",
        lineNumber: 414,
        columnNumber: 5
    }, this);
}
_s1(HeroClockModel, "sf8PtL8VJgiFjoHcPuDPodEV0AU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = HeroClockModel;
// ---------------------------------------------------------------------------
// AmbientParticles — lightweight instanced dust motes
// Single draw call via InstancedMesh.
// ---------------------------------------------------------------------------
const PARTICLE_COUNT = 20;
function AmbientParticles() {
    _s2();
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dataRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dummy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Object3D"]());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AmbientParticles.useEffect": ()=>{
            const mesh = meshRef.current;
            if (!mesh) return;
            // Initialize random positions, speeds, and phases
            // Per particle: [x, y, z, speedX, speedY, speedZ, phaseX, phaseY, phaseZ, scale]
            const data = new Float32Array(PARTICLE_COUNT * 10);
            for(let i = 0; i < PARTICLE_COUNT; i++){
                const idx = i * 10;
                data[idx + 0] = (Math.random() - 0.5) * 4; // x spread
                data[idx + 1] = (Math.random() - 0.5) * 3; // y spread
                data[idx + 2] = (Math.random() - 0.5) * 3; // z spread
                data[idx + 3] = 0.1 + Math.random() * 0.2; // speedX
                data[idx + 4] = 0.08 + Math.random() * 0.15; // speedY
                data[idx + 5] = 0.06 + Math.random() * 0.12; // speedZ
                data[idx + 6] = Math.random() * Math.PI * 2; // phaseX
                data[idx + 7] = Math.random() * Math.PI * 2; // phaseY
                data[idx + 8] = Math.random() * Math.PI * 2; // phaseZ
                data[idx + 9] = 0.003 + Math.random() * 0.005; // scale
            }
            dataRef.current = data;
            // Set initial transforms
            for(let i = 0; i < PARTICLE_COUNT; i++){
                const idx = i * 10;
                dummy.current.position.set(data[idx], data[idx + 1], data[idx + 2]);
                dummy.current.scale.setScalar(data[idx + 9]);
                dummy.current.updateMatrix();
                mesh.setMatrixAt(i, dummy.current.matrix);
            }
            mesh.instanceMatrix.needsUpdate = true;
        }
    }["AmbientParticles.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "AmbientParticles.useFrame": (state)=>{
            const mesh = meshRef.current;
            const data = dataRef.current;
            if (!mesh || !data) return;
            const t = state.clock.elapsedTime;
            for(let i = 0; i < PARTICLE_COUNT; i++){
                const idx = i * 10;
                const baseX = data[idx + 0];
                const baseY = data[idx + 1];
                const baseZ = data[idx + 2];
                const sx = data[idx + 3];
                const sy = data[idx + 4];
                const sz = data[idx + 5];
                const px = data[idx + 6];
                const py = data[idx + 7];
                const pz = data[idx + 8];
                const sc = data[idx + 9];
                dummy.current.position.set(baseX + Math.sin(t * sx + px) * 0.3, baseY + Math.sin(t * sy + py) * 0.25, baseZ + Math.sin(t * sz + pz) * 0.2);
                dummy.current.scale.setScalar(sc);
                dummy.current.updateMatrix();
                mesh.setMatrixAt(i, dummy.current.matrix);
            }
            mesh.instanceMatrix.needsUpdate = true;
        }
    }["AmbientParticles.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("instancedMesh", {
        ref: meshRef,
        args: [
            undefined,
            undefined,
            PARTICLE_COUNT
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                args: [
                    1,
                    6,
                    6
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                lineNumber: 535,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                color: "#f5f0e6",
                transparent: true,
                opacity: 0.2,
                depthWrite: false
            }, void 0, false, {
                fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                lineNumber: 536,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/HeroClockScene.tsx",
        lineNumber: 534,
        columnNumber: 5
    }, this);
}
_s2(AmbientParticles, "eWjc3LjhAKuAicYbYo+91VJwa/o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c2 = AmbientParticles;
function HeroClockScene({ bkkHour, bkkMinute }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'absolute',
            inset: 0
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
            gl: {
                antialias: true,
                alpha: true,
                toneMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACESFilmicToneMapping"],
                toneMappingExposure: 1.1,
                powerPreference: 'low-power'
            },
            frameloop: "demand",
            dpr: [
                1,
                1.5
            ],
            camera: {
                fov: 28,
                near: 0.01,
                far: 40,
                position: [
                    1.15,
                    0.28,
                    5.0
                ]
            },
            onCreated: ({ camera })=>camera.lookAt(0, -0.04, 0),
            style: {
                width: '100%',
                height: '100%'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                    intensity: 0.5,
                    color: "#f4efe2"
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                    lineNumber: 572,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                    position: [
                        2.4,
                        3.1,
                        5.6
                    ],
                    intensity: 1.2,
                    color: "#fff5f0"
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                    lineNumber: 573,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                    position: [
                        -2.8,
                        1.1,
                        2.8
                    ],
                    intensity: 0.28,
                    color: "#d6c58f"
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                    lineNumber: 574,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                    position: [
                        0.4,
                        2.2,
                        -3.8
                    ],
                    intensity: 0.1,
                    color: "#ffffff"
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                    lineNumber: 575,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                    color: 0xf0c0b0,
                    intensity: 0.22,
                    distance: 8,
                    position: [
                        1.5,
                        1.2,
                        3.5
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                    lineNumber: 576,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                    color: 0xe04458,
                    intensity: 0.12,
                    distance: 6,
                    position: [
                        -2,
                        0.3,
                        2
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                    lineNumber: 577,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeroEnvironment, {}, void 0, false, {
                    fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                    lineNumber: 579,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                    fallback: null,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeroClockModel, {
                        bkkHour: bkkHour,
                        bkkMinute: bkkMinute
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                        lineNumber: 582,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                    lineNumber: 581,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AmbientParticles, {}, void 0, false, {
                    fileName: "[project]/src/components/sections/HeroClockScene.tsx",
                    lineNumber: 585,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/sections/HeroClockScene.tsx",
            lineNumber: 557,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/HeroClockScene.tsx",
        lineNumber: 556,
        columnNumber: 5
    }, this);
}
_c3 = HeroClockScene;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"].preload(CLOCK_MODEL_URL);
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "HeroEnvironment");
__turbopack_context__.k.register(_c1, "HeroClockModel");
__turbopack_context__.k.register(_c2, "AmbientParticles");
__turbopack_context__.k.register(_c3, "HeroClockScene");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/HeroClockScene.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/sections/HeroClockScene.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_sections_HeroClockScene_tsx_0vzruy9._.js.map