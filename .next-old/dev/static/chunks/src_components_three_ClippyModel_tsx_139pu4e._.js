(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/three/ClippyModel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClippyScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Gltf.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$environments$2f$RoomEnvironment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/environments/RoomEnvironment.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const CLIPPY_MODEL_URL = '/models/clippy-user-zip/source/Clippy.glb';
function getMaterialTuning(materialName) {
    if (materialName.includes('clippy')) {
        return {
            color: '#88727c',
            metalness: 0.9,
            roughness: 0.24,
            envMapIntensity: 1.24,
            clearcoat: 0.52,
            clearcoatRoughness: 0.18
        };
    }
    if (materialName.includes('eyes')) {
        return {
            color: '#d7b8ad',
            metalness: 0.1,
            roughness: 0.3,
            envMapIntensity: 0.84,
            clearcoat: 0.22,
            clearcoatRoughness: 0.2
        };
    }
    if (materialName.includes('iris')) {
        return {
            color: '#504743',
            metalness: 0.12,
            roughness: 0.46,
            envMapIntensity: 0.46,
            clearcoat: 0.06,
            clearcoatRoughness: 0.3
        };
    }
    if (materialName.includes('brows')) {
        return {
            color: '#373130',
            metalness: 0.28,
            roughness: 0.32,
            envMapIntensity: 0.78,
            clearcoat: 0.14,
            clearcoatRoughness: 0.22
        };
    }
    return null;
}
function isPaperPart(child) {
    const name = child.name.toLowerCase();
    const materials = Array.isArray(child.material) ? child.material : [
        child.material
    ];
    return name.includes('paper') || materials.some((material)=>material.name.toLowerCase().includes('paper'));
}
function prepareMaterial(material, envMap) {
    const base = material.clone();
    if (base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"] || base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]) {
        const tuning = getMaterialTuning(base.name.toLowerCase());
        base.envMap = envMap;
        base.envMapIntensity = tuning?.envMapIntensity ?? Math.max(base.envMapIntensity ?? 0, 1.65);
        base.needsUpdate = true;
        if (tuning) {
            if (tuning.color) {
                base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](tuning.color);
            }
            if (typeof tuning.metalness === 'number') {
                base.metalness = tuning.metalness;
            }
            if (typeof tuning.roughness === 'number') {
                base.roughness = tuning.roughness;
            }
            if (base instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]) {
                if (typeof tuning.clearcoat === 'number') {
                    base.clearcoat = tuning.clearcoat;
                }
                if (typeof tuning.clearcoatRoughness === 'number') {
                    base.clearcoatRoughness = tuning.clearcoatRoughness;
                }
            }
        } else if (!base.map) {
            base.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#d5dbe2');
            base.metalness = Math.max(base.metalness ?? 0, 0.8);
            base.roughness = Math.min(base.roughness ?? 1, 0.3);
        }
        return base;
    }
    const fallback = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]({
        color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#d5dbe2'),
        metalness: 0.88,
        roughness: 0.24,
        clearcoat: 0.85,
        clearcoatRoughness: 0.14,
        envMap,
        envMapIntensity: 1.8
    });
    return fallback;
}
function normalizeObject(object) {
    const box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(object);
    const size = box.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 1.26 / maxDim;
    object.scale.setScalar(scale);
    const scaledBox = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(object);
    const scaledCenter = scaledBox.getCenter(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    const scaledSize = scaledBox.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    object.position.x -= scaledCenter.x;
    object.position.y -= scaledCenter.y;
    object.position.z -= scaledCenter.z;
    object.position.y -= scaledSize.y * 0.04;
    object.position.x += scaledSize.x * 0.12;
    return scaledSize;
}
function ClippyInner({ talking, waving, variant }) {
    _s();
    const { scene } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"])(CLIPPY_MODEL_URL);
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { camera, gl } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const envMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClippyInner.useMemo[envMap]": ()=>{
            const pmrem = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PMREMGenerator"](gl);
            const environment = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$environments$2f$RoomEnvironment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoomEnvironment"]();
            const texture = pmrem.fromScene(environment, 0.05).texture;
            pmrem.dispose();
            return texture;
        }
    }["ClippyInner.useMemo[envMap]"], [
        gl
    ]);
    const model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClippyInner.useMemo[model]": ()=>{
            const clone = scene.clone(true);
            clone.traverse({
                "ClippyInner.useMemo[model]": (child)=>{
                    if (!(child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"])) return;
                    if (isPaperPart(child)) {
                        child.visible = false;
                        return;
                    }
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.frustumCulled = false;
                    if (Array.isArray(child.material)) {
                        child.material = child.material.map({
                            "ClippyInner.useMemo[model]": (material)=>prepareMaterial(material, envMap)
                        }["ClippyInner.useMemo[model]"]);
                    } else {
                        child.material = prepareMaterial(child.material, envMap);
                    }
                }
            }["ClippyInner.useMemo[model]"]);
            return clone;
        }
    }["ClippyInner.useMemo[model]"], [
        envMap,
        scene
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClippyInner.useEffect": ()=>{
            const size = normalizeObject(model);
            if (variant === 'panel') {
                // The expanded assistant should feel more like a portrait than a launcher icon.
                model.rotation.set(0.016, 0.18, 0.012);
                camera.position.set(0.28, 0.78, 4.32);
                camera.lookAt(0.04, size.y * 0.23, 0.04);
            } else {
                // Hold Clippy in a clearer three-quarter pose so he reads at concierge size.
                model.rotation.set(0.08, 0.24, 0.02);
                camera.position.set(0.42, 0.38, 4.36);
                camera.lookAt(0.14, size.y * 0.24, 0.06);
            }
            camera.updateProjectionMatrix();
            return ({
                "ClippyInner.useEffect": ()=>{
                    envMap.dispose();
                }
            })["ClippyInner.useEffect"];
        }
    }["ClippyInner.useEffect"], [
        camera,
        envMap,
        model,
        variant
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "ClippyInner.useFrame": (state)=>{
            if (!rootRef.current) return;
            const t = state.clock.elapsedTime;
            const root = rootRef.current;
            const baseY = variant === 'panel' ? 0.31 : 0.5;
            const baseX = variant === 'panel' ? 0.05 : 0.16;
            const hoverAmount = hovered ? 0.025 : 0;
            root.position.y = baseY + Math.sin(t * 1.05) * (variant === 'panel' ? 0.009 : 0.02);
            root.position.x = baseX + Math.sin(t * 0.45) * (variant === 'panel' ? 0.005 : 0.01);
            const targetRotY = (variant === 'panel' ? 0.045 : 0.06) + Math.sin(t * (variant === 'panel' ? 0.52 : 0.8)) * (variant === 'panel' ? 0.008 : 0.025) + hoverAmount;
            const targetRotX = (variant === 'panel' ? 0.016 : 0.04) + (talking ? variant === 'panel' ? 0.026 : 0.06 : 0);
            const targetRotZ = (variant === 'panel' ? 0.002 : 0.01) + (waving ? Math.sin(t * 5.2) * (variant === 'panel' ? 0.032 : 0.08) : Math.sin(t * 0.9) * 0.006);
            root.rotation.y += (targetRotY - root.rotation.y) * 0.08;
            root.rotation.x += (targetRotX - root.rotation.x) * 0.08;
            root.rotation.z += (targetRotZ - root.rotation.z) * 0.08;
            const baseScale = variant === 'panel' ? 0.76 : 0.92;
            const targetScale = hovered ? baseScale * 1.04 : baseScale;
            const currentScale = root.scale.x;
            root.scale.setScalar(currentScale + (targetScale - currentScale) * 0.08);
        }
    }["ClippyInner.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: rootRef,
        onPointerOver: ()=>setHovered(true),
        onPointerOut: ()=>setHovered(false),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
            object: model
        }, void 0, false, {
            fileName: "[project]/src/components/three/ClippyModel.tsx",
            lineNumber: 259,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/three/ClippyModel.tsx",
        lineNumber: 254,
        columnNumber: 5
    }, this);
}
_s(ClippyInner, "8u6TheVtDn8wcvFjBAljqR7D6/k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = ClippyInner;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"].preload(CLIPPY_MODEL_URL);
function ClippyScene({ talking = false, waving = false, className, variant = 'launcher' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
            dpr: [
                1.25,
                2
            ],
            shadows: true,
            camera: {
                position: variant === 'panel' ? [
                    0.26,
                    0.68,
                    4.02
                ] : [
                    0.5,
                    0.18,
                    4.1
                ],
                fov: variant === 'panel' ? 24 : 24,
                near: 0.1,
                far: 100
            },
            gl: {
                alpha: true,
                antialias: true,
                premultipliedAlpha: true,
                powerPreference: 'high-performance'
            },
            style: {
                background: 'transparent'
            },
            onCreated: ({ gl })=>{
                gl.setClearColor(0x000000, 0);
                gl.toneMappingExposure = 1.02;
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                    intensity: variant === 'panel' ? 0.22 : 0.22
                }, void 0, false, {
                    fileName: "[project]/src/components/three/ClippyModel.tsx",
                    lineNumber: 300,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hemisphereLight", {
                    intensity: variant === 'panel' ? 0.82 : 0.8,
                    color: "#fff4eb",
                    groundColor: "#1a1d24"
                }, void 0, false, {
                    fileName: "[project]/src/components/three/ClippyModel.tsx",
                    lineNumber: 301,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                    position: variant === 'panel' ? [
                        2.1,
                        4.4,
                        3.8
                    ] : [
                        2.6,
                        4.1,
                        3.4
                    ],
                    intensity: variant === 'panel' ? 1.55 : 1.7,
                    color: "#fff1e5",
                    castShadow: true
                }, void 0, false, {
                    fileName: "[project]/src/components/three/ClippyModel.tsx",
                    lineNumber: 306,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                    position: variant === 'panel' ? [
                        -2.4,
                        2.4,
                        3.1
                    ] : [
                        -2.4,
                        2.2,
                        2.6
                    ],
                    intensity: variant === 'panel' ? 0.48 : 0.58,
                    color: "#d9e2ff"
                }, void 0, false, {
                    fileName: "[project]/src/components/three/ClippyModel.tsx",
                    lineNumber: 312,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                    position: variant === 'panel' ? [
                        0.85,
                        1.4,
                        2.1
                    ] : [
                        0.8,
                        1.3,
                        1.4
                    ],
                    intensity: variant === 'panel' ? 0.38 : 0.45,
                    color: "#fff0da"
                }, void 0, false, {
                    fileName: "[project]/src/components/three/ClippyModel.tsx",
                    lineNumber: 317,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                    position: variant === 'panel' ? [
                        -1.1,
                        0.5,
                        2.2
                    ] : [
                        -1.1,
                        0.3,
                        1.8
                    ],
                    intensity: variant === 'panel' ? 0.16 : 0.2,
                    color: "#c1d2ff"
                }, void 0, false, {
                    fileName: "[project]/src/components/three/ClippyModel.tsx",
                    lineNumber: 322,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClippyInner, {
                    talking: talking,
                    waving: waving,
                    variant: variant
                }, void 0, false, {
                    fileName: "[project]/src/components/three/ClippyModel.tsx",
                    lineNumber: 327,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/three/ClippyModel.tsx",
            lineNumber: 279,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/three/ClippyModel.tsx",
        lineNumber: 278,
        columnNumber: 5
    }, this);
}
_c1 = ClippyScene;
var _c, _c1;
__turbopack_context__.k.register(_c, "ClippyInner");
__turbopack_context__.k.register(_c1, "ClippyScene");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/three/ClippyModel.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/three/ClippyModel.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_three_ClippyModel_tsx_139pu4e._.js.map