(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/layout/ScrollProgress.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScrollProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function ScrollProgress() {
    _s();
    const barRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const progressRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrollProgress.useEffect": ()=>{
            function handleScroll() {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                if (docHeight > 0) {
                    const pct = scrollTop / docHeight * 100;
                    progressRef.current = pct;
                    if (barRef.current) {
                        barRef.current.style.transform = `scaleX(${pct / 100})`;
                        barRef.current.setAttribute('aria-valuenow', String(Math.round(pct)));
                    }
                }
            }
            window.addEventListener('scroll', handleScroll, {
                passive: true
            });
            handleScroll(); // Initialize on mount
            return ({
                "ScrollProgress.useEffect": ()=>window.removeEventListener('scroll', handleScroll)
            })["ScrollProgress.useEffect"];
        }
    }["ScrollProgress.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: barRef,
        className: "fixed top-0 left-0 z-20 h-0.5 w-full bg-accent",
        style: {
            transformOrigin: '0 0',
            transform: 'scaleX(0)'
        },
        role: "progressbar",
        "aria-valuenow": 0,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-label": "Page scroll progress"
    }, void 0, false, {
        fileName: "[project]/src/components/layout/ScrollProgress.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(ScrollProgress, "RvZaRmkmm9+G36heKiEX2G0i0ZU=");
_c = ScrollProgress;
var _c;
__turbopack_context__.k.register(_c, "ScrollProgress");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useGPUCapability.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGPUCapability",
    ()=>useGPUCapability
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
/** SSR-safe default — always assume 3D is unavailable on the server. */ const SSR_DEFAULT = {
    canRender3D: false,
    reason: 'ssr'
};
function useGPUCapability() {
    _s();
    const [capability, setCapability] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(SSR_DEFAULT);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useGPUCapability.useEffect": ()=>{
            function probe() {
                // Check viewport width
                if (window.innerWidth <= 768) {
                    return {
                        canRender3D: false,
                        reason: 'narrow-viewport'
                    };
                }
                // Check prefers-reduced-motion
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    return {
                        canRender3D: false,
                        reason: 'prefers-reduced-motion'
                    };
                }
                // Check WebGL2 support via offscreen canvas
                let gl = null;
                try {
                    const canvas = document.createElement('canvas');
                    gl = canvas.getContext('webgl2');
                    if (!gl) {
                        return {
                            canRender3D: false,
                            reason: 'no-webgl2'
                        };
                    }
                    // Clean up the context
                    const ext = gl.getExtension('WEBGL_lose_context');
                    if (ext) ext.loseContext();
                } catch  {
                    return {
                        canRender3D: false,
                        reason: 'webgl2-probe-error'
                    };
                }
                return {
                    canRender3D: true
                };
            }
            setCapability(probe());
            // Re-evaluate on resize (viewport may cross 768px boundary)
            const handleResize = {
                "useGPUCapability.useEffect.handleResize": ()=>{
                    setCapability(probe());
                }
            }["useGPUCapability.useEffect.handleResize"];
            // Also listen for reduced-motion preference changes
            const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)');
            const handleMotionChange = {
                "useGPUCapability.useEffect.handleMotionChange": ()=>{
                    setCapability(probe());
                }
            }["useGPUCapability.useEffect.handleMotionChange"];
            window.addEventListener('resize', handleResize);
            motionMql.addEventListener('change', handleMotionChange);
            return ({
                "useGPUCapability.useEffect": ()=>{
                    window.removeEventListener('resize', handleResize);
                    motionMql.removeEventListener('change', handleMotionChange);
                }
            })["useGPUCapability.useEffect"];
        }
    }["useGPUCapability.useEffect"], []);
    return capability;
}
_s(useGPUCapability, "F7TBu54AXLuqkmky1UDIFTY2wDQ=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useProximityHeat.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProximityHeat",
    ()=>useProximityHeat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function useProximityHeat(containerRef, selector) {
    _s();
    const rectsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const elementsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const mouseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: -9999,
        y: -9999
    });
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useProximityHeat.useEffect": ()=>{
            const container = containerRef.current;
            if (!container) return;
            // Bail on touch devices
            if (window.matchMedia('(pointer: coarse)').matches) return;
            // Bail on reduced motion
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            const elements = Array.from(container.querySelectorAll(selector));
            elementsRef.current = elements;
            if (elements.length === 0) return;
            // Cache element rects
            function cacheRects() {
                rectsRef.current = elementsRef.current.map({
                    "useProximityHeat.useEffect.cacheRects": (el)=>el.getBoundingClientRect()
                }["useProximityHeat.useEffect.cacheRects"]);
            }
            cacheRects();
            // Update rects on resize/scroll
            const ro = new ResizeObserver(cacheRects);
            ro.observe(container);
            window.addEventListener('scroll', cacheRects, {
                passive: true
            });
            // Track mouse
            function onMouseMove(e) {
                mouseRef.current.x = e.clientX;
                mouseRef.current.y = e.clientY;
            }
            window.addEventListener('mousemove', onMouseMove, {
                passive: true
            });
            // rAF loop
            function tick() {
                const { x: mx, y: my } = mouseRef.current;
                const rects = rectsRef.current;
                const els = elementsRef.current;
                // Viewport-scaled radius
                const radius = Math.min(window.innerWidth * 0.12, 220);
                const radiusSq = radius * radius;
                // Bounding box early exit — check if mouse is near container at all
                const cRect = container.getBoundingClientRect();
                const pad = radius;
                if (mx < cRect.left - pad || mx > cRect.right + pad || my < cRect.top - pad || my > cRect.bottom + pad) {
                    for(let i = 0; i < els.length; i++){
                        els[i].style.setProperty('--heat', '0');
                        els[i].style.transform = '';
                        els[i].style.textShadow = '';
                        els[i].style.color = '';
                    }
                    rafRef.current = requestAnimationFrame(tick);
                    return;
                }
                for(let i = 0; i < rects.length; i++){
                    const rect = rects[i];
                    const cx = rect.left + rect.width * 0.5;
                    const cy = rect.top + rect.height * 0.5;
                    const dx = mx - cx;
                    const dy = my - cy;
                    const distSq = dx * dx + dy * dy;
                    if (distSq > radiusSq) {
                        els[i].style.setProperty('--heat', '0');
                        els[i].style.transform = '';
                        els[i].style.textShadow = '';
                        els[i].style.color = '';
                        continue;
                    }
                    const dist = Math.sqrt(distSq);
                    const t = 1 - dist / radius;
                    // Quadratic falloff for color
                    const heat = t * t;
                    // Cubic falloff for lift (more subtle)
                    const lift = t * t * t * 3;
                    els[i].style.setProperty('--heat', heat.toFixed(3));
                    els[i].style.transform = `translateY(${-lift}px)`;
                    // Progressive magenta glow
                    if (heat > 0.15) {
                        const glowOpacity = (heat * 0.6).toFixed(2);
                        const glowSpread = Math.round(heat * 20);
                        els[i].style.textShadow = `0 0 ${glowSpread}px rgba(224,68,88,${glowOpacity})`;
                    } else {
                        els[i].style.textShadow = '';
                    }
                    // Color via color-mix (cream → magenta)
                    if (heat > 0.01) {
                        const creamPct = Math.round((1 - heat) * 100);
                        const magentaPct = Math.round(heat * 100);
                        els[i].style.color = `color-mix(in srgb, var(--hero-cream) ${creamPct}%, var(--hero-magenta) ${magentaPct}%)`;
                    } else {
                        els[i].style.color = '';
                    }
                }
                rafRef.current = requestAnimationFrame(tick);
            }
            rafRef.current = requestAnimationFrame(tick);
            return ({
                "useProximityHeat.useEffect": ()=>{
                    cancelAnimationFrame(rafRef.current);
                    window.removeEventListener('mousemove', onMouseMove);
                    window.removeEventListener('scroll', cacheRects);
                    ro.disconnect();
                    // Reset styles
                    for (const el of elementsRef.current){
                        el.style.setProperty('--heat', '0');
                        el.style.transform = '';
                        el.style.textShadow = '';
                        el.style.color = '';
                    }
                }
            })["useProximityHeat.useEffect"];
        }
    }["useProximityHeat.useEffect"], [
        containerRef,
        selector
    ]);
}
_s(useProximityHeat, "Dvto4AMK+nSOMDk5oal/DcTft7Y=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/Hero.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Hero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLiveClock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useLiveClock.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useGPUCapability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useGPUCapability.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useProximityHeat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useProximityHeat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/content.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$MagneticButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/MagneticButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$TransitionLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/TransitionLink.tsx [app-client] (ecmascript)");
;
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
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
// Gate hero 3D scene — flip to true when ready to test WebGL
const HERO_3D_ENABLED = true;
const HeroClockScene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/src/components/sections/HeroClockScene.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/sections/HeroClockScene.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = HeroClockScene;
// ---------------------------------------------------------------------------
// Typography wall lines — "IT'S TOMORROW HERE. YOUR WORK IS ALREADY STARTED."
// ---------------------------------------------------------------------------
const WALL_LINES = [
    [
        "IT'S"
    ],
    [
        'TOMORROW',
        'HERE.'
    ],
    [
        'YOUR',
        'WORK'
    ],
    [
        'IS',
        'ALREADY'
    ],
    [
        'STARTED.'
    ]
];
// ---------------------------------------------------------------------------
// StatusDot
// ---------------------------------------------------------------------------
function StatusDot({ status }) {
    const colors = {
        available: 'bg-hero-gold',
        focused: 'bg-hero-gold',
        offline: 'bg-hero-stone'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "relative flex size-2",
        children: [
            (status === 'available' || status === 'focused') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute inline-flex size-full rounded-full bg-hero-gold opacity-75",
                style: {
                    animation: 'ping 1.8s ease-in-out infinite'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/sections/Hero.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `relative inline-flex size-2 rounded-full ${colors[status]}`
            }, void 0, false, {
                fileName: "[project]/src/components/sections/Hero.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/Hero.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_c1 = StatusDot;
function Hero() {
    _s();
    const clock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLiveClock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveClock"])();
    const gpu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useGPUCapability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGPUCapability"])();
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const typeColRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [heroVisible, setHeroVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showingBkk, setShowingBkk] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Cursor proximity heat on typography wall words
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useProximityHeat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProximityHeat"])(typeColRef, '.hl-word');
    // Dispose 3D scene when hero scrolls out of view
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Hero.useEffect": ()=>{
            const el = sectionRef.current;
            if (!el) return;
            const observer = new IntersectionObserver({
                "Hero.useEffect": ([entry])=>setHeroVisible(entry.isIntersecting)
            }["Hero.useEffect"], {
                threshold: 0
            });
            observer.observe(el);
            return ({
                "Hero.useEffect": ()=>observer.disconnect()
            })["Hero.useEffect"];
        }
    }["Hero.useEffect"], []);
    // GSAP entrance choreography
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Hero.useEffect": ()=>{
            const el = sectionRef.current;
            if (!el) return;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const statusBar = el.querySelector('[data-hero="status"]');
            const wallLines = el.querySelectorAll('.hl-line');
            const ctaBlock = el.querySelector('[data-hero="cta"]');
            const clockCol = el.querySelector('[data-hero="clock-col"]');
            const allTargets = [
                statusBar,
                ...Array.from(wallLines),
                ctaBlock,
                clockCol
            ].filter(Boolean);
            if (prefersReducedMotion) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(allTargets, {
                    opacity: 1,
                    y: 0
                });
                return;
            }
            // Set initial hidden state
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(allTargets, {
                opacity: 0,
                y: 30
            });
            const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].timeline({
                delay: 0.15
            });
            // Status bar fades down from above
            tl.to(statusBar, {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: 'power3.out'
            });
            // Typography wall — staggered word slam (60ms between lines)
            tl.to(wallLines, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.06,
                ease: 'cubicBezier(0.16, 1, 0.3, 1)'
            }, '-=0.15');
            // 3D clock rises in
            tl.to(clockCol, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power4.out'
            }, '-=0.25');
            // CTAs fade up
            tl.to(ctaBlock, {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: 'power3.out'
            }, '-=0.2');
            // Push-scroll parallax exit
            const heroContent = el.querySelector('[data-hero-content]');
            const pushTween = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(heroContent, {
                y: '-8vh',
                opacity: 0,
                scale: 0.95,
                scrollTrigger: {
                    trigger: el,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
            return ({
                "Hero.useEffect": ()=>{
                    tl.kill();
                    pushTween.kill();
                    pushTween.scrollTrigger?.kill();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(allTargets, {
                        opacity: 1,
                        y: 0
                    });
                }
            })["Hero.useEffect"];
        }
    }["Hero.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        className: "sticky top-0 z-0 min-h-[100svh] overflow-hidden supports-[height:100dvh]:h-dvh",
        style: {
            background: 'var(--hero-bg)'
        },
        "aria-label": "Hero",
        "data-concierge-section": "hero",
        "data-concierge-label": "Hero",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0",
                style: {
                    background: 'radial-gradient(ellipse at 50% 92%, rgba(224,68,88,0.11) 0%, rgba(140,30,55,0.06) 40%, transparent 70%)',
                    filter: 'blur(80px)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/sections/Hero.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0 z-[1]",
                style: {
                    background: `linear-gradient(180deg, rgba(22,9,16,0.7) 0%, transparent 22%, transparent 75%, rgba(22,9,16,0.65) 100%), radial-gradient(ellipse 75% 70% at 50% 50%, transparent 45%, rgba(22,9,16,0.4) 100%)`
                }
            }, void 0, false, {
                fileName: "[project]/src/components/sections/Hero.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0 opacity-[0.03]",
                style: {
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                    backgroundSize: '128px 128px'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/sections/Hero.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-hero-content": true,
                className: "relative z-10 flex h-full flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-[clamp(32px,5vw,72px)] pt-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "data-hero": "status",
                            className: "flex items-center gap-2.5 opacity-0",
                            style: {
                                fontFamily: 'var(--font-ui)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusDot, {
                                    status: clock.status
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/Hero.tsx",
                                    lineNumber: 225,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-medium uppercase tracking-[0.2em]",
                                    style: {
                                        color: 'var(--hero-stone)'
                                    },
                                    children: clock.bkkTime ? `Bangkok ${clock.bkkTime} — ${clock.statusText}` : 'Bangkok — Available'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/Hero.tsx",
                                    lineNumber: 226,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/Hero.tsx",
                            lineNumber: 220,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/Hero.tsx",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex flex-1 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: typeColRef,
                                className: "absolute left-[clamp(28px,5vw,72px)] right-[clamp(28px,5vw,72px)] top-1/2 z-[3] -translate-y-1/2",
                                children: [
                                    WALL_LINES.map((words, lineIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hl-line block overflow-visible opacity-0",
                                            style: {
                                                transform: 'translateY(30px)'
                                            },
                                            children: words.map((word, wordIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "hl-word inline-block cursor-default transition-[color,transform,text-shadow] duration-200",
                                                            style: {
                                                                fontFamily: 'var(--font-display)',
                                                                fontWeight: 800,
                                                                fontSize: 'clamp(40px, 6.5vw, 96px)',
                                                                lineHeight: 0.92,
                                                                letterSpacing: '-0.015em',
                                                                textTransform: 'uppercase',
                                                                color: 'var(--hero-cream)',
                                                                textShadow: '0 2px 20px rgba(14,12,10,0.95), 0 6px 40px rgba(14,12,10,0.8), 0 0 80px rgba(224,68,88,0.04)',
                                                                ['--heat']: '0'
                                                            },
                                                            children: word
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/Hero.tsx",
                                                            lineNumber: 253,
                                                            columnNumber: 21
                                                        }, this),
                                                        wordIdx < words.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "inline-block",
                                                            style: {
                                                                width: 'clamp(12px, 2vw, 28px)'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/Hero.tsx",
                                                            lineNumber: 271,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, wordIdx, true, {
                                                    fileName: "[project]/src/components/sections/Hero.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 19
                                                }, this))
                                        }, lineIdx, false, {
                                            fileName: "[project]/src/components/sections/Hero.tsx",
                                            lineNumber: 246,
                                            columnNumber: 15
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        "data-hero": "cta",
                                        className: "mt-8 flex gap-4 opacity-0",
                                        style: {
                                            transform: 'translateY(30px)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$MagneticButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$TransitionLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/work",
                                                    className: "inline-flex items-center gap-2 rounded-full border border-[rgba(245,240,230,0.12)] bg-transparent px-7 py-3.5 font-heading text-sm font-semibold transition-all duration-300 hover:border-[rgba(245,240,230,0.25)] hover:bg-[rgba(245,240,230,0.04)]",
                                                    style: {
                                                        color: 'var(--hero-cream)'
                                                    },
                                                    children: "See the Work"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/Hero.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/Hero.tsx",
                                                lineNumber: 287,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$MagneticButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAL_COM_URL"],
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className: "inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-heading text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(224,68,88,0.25)] hover:scale-[1.02] active:scale-[0.98] active:duration-100",
                                                    style: {
                                                        background: 'var(--hero-magenta)',
                                                        color: 'var(--hero-cream)'
                                                    },
                                                    children: "Start a Project"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/Hero.tsx",
                                                    lineNumber: 297,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/Hero.tsx",
                                                lineNumber: 296,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/Hero.tsx",
                                        lineNumber: 282,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/Hero.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-hero": "clock-col",
                                className: "absolute right-[clamp(20px,4vw,80px)] bottom-[clamp(40px,8vh,100px)] z-10 flex flex-col items-center opacity-0",
                                style: {
                                    transform: 'translateY(30px)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                                        style: {
                                            width: '80%',
                                            height: '70%',
                                            borderRadius: '50%',
                                            background: 'radial-gradient(circle, rgba(224,68,88,0.06) 0%, transparent 55%)',
                                            filter: 'blur(60px)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/Hero.tsx",
                                        lineNumber: 320,
                                        columnNumber: 13
                                    }, this),
                                    HERO_3D_ENABLED && heroVisible && gpu.canRender3D ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-[2]",
                                        style: {
                                            width: 'min(52vw, 560px)',
                                            height: 'min(44vh, 400px)',
                                            filter: 'drop-shadow(0 8px 32px rgba(22,9,16,0.6))'
                                        },
                                        "aria-hidden": "true",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeroClockScene, {
                                            bkkHour: clock.bkkHour,
                                            bkkMinute: clock.bkkMinute
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/Hero.tsx",
                                            lineNumber: 343,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/Hero.tsx",
                                        lineNumber: 334,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-[2] overflow-hidden rounded-2xl",
                                        style: {
                                            width: 'min(36vw, 380px)',
                                            height: 'min(30vh, 280px)',
                                            background: 'rgba(14,12,10,0.55)',
                                            backdropFilter: 'blur(24px)',
                                            border: '1px solid rgba(245,240,230,0.06)'
                                        },
                                        "aria-hidden": "true",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-full w-full flex-col items-center justify-center gap-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    (showingBkk ? clock.bkkTime : clock.visitorTime)?.split(' ')[0]?.split('').map((char, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "inline-flex items-center justify-center tabular-nums",
                                                            style: {
                                                                fontFamily: 'var(--font-display)',
                                                                fontSize: 'clamp(36px, 6vw, 72px)',
                                                                fontWeight: 800,
                                                                color: 'var(--hero-cream)',
                                                                ...char !== ':' ? {
                                                                    background: 'rgba(245,240,230,0.04)',
                                                                    borderRadius: '8px',
                                                                    padding: '4px 10px',
                                                                    border: '1px solid rgba(245,240,230,0.06)'
                                                                } : {
                                                                    opacity: 0.4,
                                                                    padding: '0 2px'
                                                                }
                                                            },
                                                            children: char
                                                        }, i, false, {
                                                            fileName: "[project]/src/components/sections/Hero.tsx",
                                                            lineNumber: 363,
                                                            columnNumber: 25
                                                        }, this)) ?? null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-1 text-sm font-medium uppercase",
                                                        style: {
                                                            fontFamily: 'var(--font-ui)',
                                                            color: 'var(--hero-stone)',
                                                            opacity: 0.6
                                                        },
                                                        children: (showingBkk ? clock.bkkTime : clock.visitorTime)?.split(' ')[1] ?? ''
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/Hero.tsx",
                                                        lineNumber: 384,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sections/Hero.tsx",
                                                lineNumber: 358,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/Hero.tsx",
                                            lineNumber: 357,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/Hero.tsx",
                                        lineNumber: 346,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pointer-events-none absolute bottom-[6%] left-1/2 -translate-x-1/2",
                                        style: {
                                            width: '65%',
                                            height: '16%',
                                            borderRadius: '50%',
                                            background: 'radial-gradient(ellipse, rgba(22,9,16,0.7) 0%, transparent 70%)',
                                            filter: 'blur(28px)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/Hero.tsx",
                                        lineNumber: 401,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "sr-only",
                                        children: [
                                            "Animated 3D flip clock showing Bangkok time: ",
                                            clock.bkkTime
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/Hero.tsx",
                                        lineNumber: 413,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-[6] -mt-1 flex items-stretch overflow-hidden rounded-full border backdrop-blur-[16px]",
                                        style: {
                                            borderColor: 'rgba(245,240,230,0.06)',
                                            background: 'rgba(14,12,10,0.65)',
                                            fontFamily: 'var(--font-ui)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowingBkk(true),
                                                className: "inline-flex min-h-11 items-center gap-2 border-none bg-transparent px-5 py-3 text-xs font-medium uppercase tracking-[0.07em] transition-all duration-300 hover:bg-[rgba(245,240,230,0.04)]",
                                                style: {
                                                    color: showingBkk ? 'var(--hero-cream)' : 'var(--hero-stone)',
                                                    background: showingBkk ? 'rgba(224,68,88,0.12)' : 'transparent'
                                                },
                                                "aria-pressed": showingBkk,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-block size-1.5 rounded-full",
                                                        style: {
                                                            background: 'var(--hero-gold)'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/Hero.tsx",
                                                        lineNumber: 435,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Bangkok",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] font-extralight tabular-nums opacity-55",
                                                        children: clock.bkkTime || ''
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/Hero.tsx",
                                                        lineNumber: 440,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sections/Hero.tsx",
                                                lineNumber: 426,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-px self-stretch",
                                                style: {
                                                    background: 'rgba(245,240,230,0.06)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/Hero.tsx",
                                                lineNumber: 445,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center px-2.5 text-[10px] font-extralight tracking-[0.12em]",
                                                style: {
                                                    color: 'var(--hero-cerulean)',
                                                    fontFamily: 'var(--font-ui)'
                                                },
                                                children: clock.visitorCity && !clock.isSameZone ? `${clock.hourOffset >= 0 ? '+' : ''}${clock.hourOffset}h` : ''
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/Hero.tsx",
                                                lineNumber: 447,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-px self-stretch",
                                                style: {
                                                    background: 'rgba(245,240,230,0.06)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/Hero.tsx",
                                                lineNumber: 456,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowingBkk(false),
                                                className: "inline-flex min-h-11 items-center gap-2 border-none bg-transparent px-5 py-3 text-xs font-medium uppercase tracking-[0.07em] transition-all duration-300 hover:bg-[rgba(245,240,230,0.04)]",
                                                style: {
                                                    color: !showingBkk ? 'var(--hero-cream)' : 'var(--hero-stone)',
                                                    background: !showingBkk ? 'rgba(30,144,207,0.12)' : 'transparent'
                                                },
                                                "aria-pressed": !showingBkk,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-block size-1.5 rounded-full",
                                                        style: {
                                                            background: 'var(--hero-cerulean)'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/Hero.tsx",
                                                        lineNumber: 467,
                                                        columnNumber: 17
                                                    }, this),
                                                    clock.isSameZone ? 'You' : clock.visitorCity || 'Your City',
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] font-extralight tabular-nums opacity-55",
                                                        children: clock.visitorTime || ''
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/Hero.tsx",
                                                        lineNumber: 472,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sections/Hero.tsx",
                                                lineNumber: 458,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/Hero.tsx",
                                        lineNumber: 418,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/Hero.tsx",
                                lineNumber: 314,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/Hero.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/Hero.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/Hero.tsx",
        lineNumber: 185,
        columnNumber: 5
    }, this);
}
_s(Hero, "qiCBUK5nqqg7aX5OSGVGXHQ2xik=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLiveClock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveClock"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useGPUCapability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGPUCapability"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useProximityHeat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProximityHeat"]
    ];
});
_c2 = Hero;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "HeroClockScene");
__turbopack_context__.k.register(_c1, "StatusDot");
__turbopack_context__.k.register(_c2, "Hero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/CredibilityGrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CredibilityGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/content.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
/* ── Accent color mapping ─────────────────────────────────── */ const ACCENT_BORDER = {
    magenta: 'var(--accent)',
    gold: 'var(--accent-secondary)',
    cerulean: 'var(--accent-tertiary)'
};
/* ── Inline SVG trophy icon ───────────────────────────────── */ function TrophyIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 22h16"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M18 2H6v7a6 6 0 0 0 12 0V2Z"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = TrophyIcon;
/* ── Brand Logo ───────────────────────────────────────────── */ function BrandLogo({ brand }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "cred-card group flex items-center justify-center rounded-lg px-6 py-5 transition-all duration-300",
        style: {
            borderBottom: `2px solid ${ACCENT_BORDER[brand.accent]}`
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: brand.logo,
            alt: brand.name,
            className: "h-8 w-auto max-w-full object-contain opacity-60 transition-opacity duration-300 group-hover:opacity-100 md:h-9",
            loading: "lazy"
        }, void 0, false, {
            fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_c1 = BrandLogo;
/* ── Stat Block ───────────────────────────────────────────── */ function StatBlock({ value, label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "cred-stat flex flex-col items-center text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-heading text-2xl font-bold text-text-primary md:text-3xl",
                children: value
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-text-tertiary",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_c2 = StatBlock;
function CredibilityGrid() {
    _s();
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CredibilityGrid.useEffect": ()=>{
            const el = sectionRef.current;
            if (!el) return;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(el.querySelectorAll('.cred-header, .cred-rule, .cred-card, .cred-stat, .cred-award, .cred-press-logo'), {
                    opacity: 1,
                    y: 0,
                    x: 0
                });
                return;
            }
            const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].context({
                "CredibilityGrid.useEffect.ctx": ()=>{
                    // Header + rule slide in from left
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(el.querySelectorAll('.cred-header, .cred-rule'), {
                        opacity: 0,
                        x: -24
                    }, {
                        opacity: 1,
                        x: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                        stagger: 0.08,
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 88%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                    // Brand logos staggered fade-up
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(el.querySelectorAll('.cred-card'), {
                        opacity: 0,
                        y: 20
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power3.out',
                        stagger: 0.06,
                        scrollTrigger: {
                            trigger: el.querySelector('.cred-grid'),
                            start: 'top 90%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                    // Stats fade up
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(el.querySelectorAll('.cred-stat'), {
                        opacity: 0,
                        y: 16
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power3.out',
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: el.querySelector('.cred-stats'),
                            start: 'top 92%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                    // Awards + press logos fade in
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(el.querySelectorAll('.cred-award, .cred-press-logo'), {
                        opacity: 0,
                        y: 10
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.45,
                        ease: 'power3.out',
                        stagger: 0.08,
                        scrollTrigger: {
                            trigger: el.querySelector('.cred-bottom'),
                            start: 'top 94%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                }
            }["CredibilityGrid.useEffect.ctx"], el);
            return ({
                "CredibilityGrid.useEffect": ()=>{
                    ctx.revert();
                }
            })["CredibilityGrid.useEffect"];
        }
    }["CredibilityGrid.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        "aria-label": "Credentials and clients",
        className: "border-y border-border-subtle bg-bg-deep py-16 md:py-24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-[1200px] px-6 md:px-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-10 flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "cred-header shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary",
                            children: "Trusted by"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                            lineNumber: 189,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "cred-rule h-px flex-1",
                            style: {
                                background: 'var(--border-subtle)'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                    lineNumber: 188,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "cred-grid grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CREDIBILITY_BRANDS"].map((brand)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandLogo, {
                            brand: brand
                        }, brand.name, false, {
                            fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                            lineNumber: 201,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                    lineNumber: 199,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "cred-stats mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 border-y border-border-subtle py-8 md:gap-x-16",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CREDIBILITY_STATS"].map((stat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden text-text-tertiary/30 md:inline",
                                    "aria-hidden": "true",
                                    children: "·"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                                    lineNumber: 210,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatBlock, {
                                    value: stat.value,
                                    label: stat.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                                    lineNumber: 217,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, stat.label, true, {
                            fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                            lineNumber: 208,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                    lineNumber: 206,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "cred-bottom mt-10 grid gap-8 md:grid-cols-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary",
                                    children: "Recognition"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                                    lineNumber: 226,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-x-5 gap-y-3",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CREDIBILITY_AWARDS"].map((award)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "cred-award inline-flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TrophyIcon, {
                                                    className: "text-accent-secondary"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-heading text-sm font-medium text-text-primary",
                                                    children: award.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                                                    lineNumber: 236,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono text-[10px] uppercase tracking-wider text-text-tertiary",
                                                    children: award.detail
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, award.name, true, {
                                            fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                                            lineNumber: 231,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                                    lineNumber: 229,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                            lineNumber: 225,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary",
                                    children: "Featured in"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                                    lineNumber: 249,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-x-6 gap-y-3",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CREDIBILITY_PRESS"].map((pub)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: pub.logo,
                                            alt: pub.name,
                                            className: "cred-press-logo h-5 w-auto object-contain md:h-6",
                                            loading: "lazy"
                                        }, pub.name, false, {
                                            fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                                            lineNumber: 254,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                                    lineNumber: 252,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                            lineNumber: 248,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
                    lineNumber: 223,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
            lineNumber: 186,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/CredibilityGrid.tsx",
        lineNumber: 181,
        columnNumber: 5
    }, this);
}
_s(CredibilityGrid, "O9MYfDkQexHh+zrn37J6HLSAdf8=");
_c3 = CredibilityGrid;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "TrophyIcon");
__turbopack_context__.k.register(_c1, "BrandLogo");
__turbopack_context__.k.register(_c2, "StatBlock");
__turbopack_context__.k.register(_c3, "CredibilityGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/easing.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Hermite smoothstep -- the `ease()` function used throughout the site.
 * Maps 0-1 input to a smooth 0-1 curve with zero velocity at endpoints.
 */ __turbopack_context__.s([
    "clamp",
    ()=>clamp,
    "ease",
    ()=>ease,
    "lerp",
    ()=>lerp,
    "lerpColor",
    ()=>lerpColor,
    "normalize",
    ()=>normalize
]);
function ease(t) {
    const c = Math.max(0, Math.min(1, t));
    return c * c * (3 - 2 * c);
}
function lerp(a, b, t) {
    return a + (b - a) * t;
}
function lerpColor(a, b, t) {
    const ah = parseInt(a.slice(1), 16);
    const bh = parseInt(b.slice(1), 16);
    const ar = ah >> 16;
    const ag = ah >> 8 & 0xff;
    const ab = ah & 0xff;
    const br = bh >> 16;
    const bg = bh >> 8 & 0xff;
    const bb = bh & 0xff;
    const r = Math.round(ar + (br - ar) * t);
    const g = Math.round(ag + (bg - ag) * t);
    const b2 = Math.round(ab + (bb - ab) * t);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b2).toString(16).slice(1);
}
function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}
function normalize(val, min, max) {
    if (max === min) return 0;
    return clamp((val - min) / (max - min), 0, 1);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/stores/scrollStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useScrollStore",
    ()=>useScrollStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/easing.ts [app-client] (ecmascript)");
;
;
;
const EPSILON = 0.001;
function nearEqual(a, b) {
    return Math.abs(a - b) < EPSILON;
}
const IDENTITY_TRANSFORM = {
    opacity: 0,
    yShift: 0,
    blur: 0,
    scale: 1,
    enterT: 0,
    exitT: 0
};
function progressKey(phase) {
    return `${phase}Progress`;
}
function opacityKey(phase) {
    return `${phase}Opacity`;
}
function transformKey(phase) {
    return `${phase}Transform`;
}
function transformEqual(a, b) {
    return nearEqual(a.opacity, b.opacity) && nearEqual(a.yShift, b.yShift) && nearEqual(a.blur, b.blur) && nearEqual(a.scale, b.scale) && nearEqual(a.enterT, b.enterT) && nearEqual(a.exitT, b.exitT);
}
function phaseTransform(progress, range) {
    const phaseIn = range.in;
    const phaseOut = range.out;
    if (progress < phaseIn || progress > phaseOut) {
        return IDENTITY_TRANSFORM;
    }
    const introEnd = Math.max(phaseIn, Math.min(range.introEnd, phaseOut));
    const holdEnd = Math.max(introEnd, Math.min(range.holdEnd, phaseOut));
    const outroStart = Math.max(holdEnd, Math.min(range.outroStart ?? range.holdEnd, phaseOut));
    let opacity = 0;
    let enterT = 0;
    let exitT = 0;
    if (phaseIn === 0 && progress <= introEnd) {
        enterT = introEnd === phaseIn ? 1 : (progress - phaseIn) / (introEnd - phaseIn);
        opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])(enterT);
    } else if (progress <= introEnd) {
        enterT = introEnd === phaseIn ? 1 : (progress - phaseIn) / (introEnd - phaseIn);
        opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])(enterT);
    } else if (progress < outroStart) {
        enterT = 1;
        opacity = 1;
    } else if (progress <= phaseOut) {
        enterT = 1;
        exitT = phaseOut === outroStart ? 1 : (progress - outroStart) / (phaseOut - outroStart);
        opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])(1 - exitT);
    } else {
        enterT = 1;
        opacity = 1;
    }
    opacity = Math.max(0, Math.min(1, opacity));
    let yShift = 0;
    let blur = 0;
    let scale = 1;
    if (opacity > 0 && opacity < 1) {
        if (enterT < 1 && exitT === 0) {
            const inv = 1 - enterT;
            yShift = inv * 42;
            blur = inv * 7;
            scale = 0.952 + enterT * 0.048;
        } else {
            yShift = exitT * -20;
            blur = exitT * 3.5;
            scale = 1 - exitT * 0.018;
        }
    }
    return {
        opacity,
        yShift,
        blur,
        scale,
        enterT,
        exitT
    };
}
function phaseProgress(progress, phaseIn, phaseOut) {
    if (progress < phaseIn || progress > phaseOut) return 0;
    const range = phaseOut - phaseIn;
    if (range === 0) return 0;
    return (progress - phaseIn) / range;
}
function getBgColor(progress) {
    for(let index = 0; index < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BG_COLORS"].length - 1; index += 1){
        const current = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BG_COLORS"][index];
        const next = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BG_COLORS"][index + 1];
        if (progress >= current.pos && progress <= next.pos) {
            const localT = (progress - current.pos) / (next.pos - current.pos);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerpColor"])(current.color, next.color, localT);
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BG_COLORS"][__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BG_COLORS"].length - 1].color;
}
function createPhaseNumberState() {
    const state = {};
    for (const phase of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASE_ORDER"]){
        state[progressKey(phase)] = 0;
        state[opacityKey(phase)] = 0;
    }
    return state;
}
function createPhaseTransformState() {
    const state = {};
    for (const phase of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASE_ORDER"]){
        state[transformKey(phase)] = IDENTITY_TRANSFORM;
    }
    return state;
}
const useScrollStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        cycleProgress: 0,
        cycleBgColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BG_COLORS"][0].color,
        isDawn: false,
        isMorning: false,
        ...createPhaseNumberState(),
        ...createPhaseTransformState(),
        setCycleProgress: (progress)=>{
            const cycleProgress = Math.max(0, Math.min(1, progress));
            const previous = get();
            const patch = {};
            if (!nearEqual(previous.cycleProgress, cycleProgress)) {
                patch.cycleProgress = cycleProgress;
            }
            for (const phase of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASE_ORDER"]){
                const range = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"][phase];
                const phaseP = phaseProgress(cycleProgress, range.in, range.out);
                const phaseT = phaseTransform(cycleProgress, range);
                const phaseProgressKey = progressKey(phase);
                const phaseOpacityKey = opacityKey(phase);
                const phaseTransformStateKey = transformKey(phase);
                if (!nearEqual(previous[phaseProgressKey], phaseP)) {
                    patch[phaseProgressKey] = phaseP;
                }
                if (!nearEqual(previous[phaseOpacityKey], phaseT.opacity)) {
                    patch[phaseOpacityKey] = phaseT.opacity;
                }
                if (!transformEqual(previous[phaseTransformStateKey], phaseT)) {
                    patch[phaseTransformStateKey] = phaseT;
                }
            }
            const bgColor = getBgColor(cycleProgress);
            if (previous.cycleBgColor !== bgColor) {
                patch.cycleBgColor = bgColor;
            }
            const dawn = cycleProgress > __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASE_CLASS_THRESHOLDS"].dawn.start && cycleProgress < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASE_CLASS_THRESHOLDS"].dawn.end;
            const morning = cycleProgress >= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASE_CLASS_THRESHOLDS"].morning.start;
            if (previous.isDawn !== dawn) {
                patch.isDawn = dawn;
            }
            if (previous.isMorning !== morning) {
                patch.isMorning = morning;
            }
            if (Object.keys(patch).length > 0) {
                set(patch);
            }
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/cycleScreenState.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getClockSequenceState",
    ()=>getClockSequenceState,
    "getLaptopSequenceState",
    ()=>getLaptopSequenceState,
    "getPhoneSequenceState",
    ()=>getPhoneSequenceState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/easing.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
;
;
function reveal(progress, start, duration) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((progress - start) / duration, 0, 1));
}
function mixValue(a, b, t) {
    return a + (b - a) * t;
}
function getPhoneSequenceState(progress, itemCount, reducedMotion = false) {
    if (reducedMotion) {
        return {
            statusOpacity: 1,
            headerOpacity: 1,
            headerOffset: 0,
            headerRuleProgress: 1,
            entryOpacities: Array.from({
                length: itemCount
            }, ()=>1),
            entryOffsets: Array.from({
                length: itemCount
            }, ()=>0),
            rowScales: Array.from({
                length: itemCount
            }, ()=>1),
            iconScales: Array.from({
                length: itemCount
            }, ()=>1),
            entryStates: Array.from({
                length: itemCount
            }, (_, index)=>index === itemCount - 1 ? 'active' : 'past'),
            activeIndex: itemCount - 1,
            lineProgress: 1
        };
    }
    const statusOpacity = reveal(progress, 0.16, 0.07);
    const headerOpacity = reveal(progress, 0.24, 0.08);
    const headerOffset = (1 - headerOpacity) * 16;
    const revealStart = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].phone.contentRevealStart;
    const revealEnd = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].phone.contentRevealEnd;
    const revealRange = revealEnd - revealStart;
    const headerRuleProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((progress - revealStart) / revealRange, 0, 1);
    const entryOpacities = [];
    const entryOffsets = [];
    const rowScales = [];
    const iconScales = [];
    let activeIndex = -1;
    for(let index = 0; index < itemCount; index += 1){
        const rowStart = revealStart + index / itemCount * revealRange;
        const opacity = reveal(progress, rowStart, 0.065);
        entryOpacities.push(opacity);
        entryOffsets.push((1 - opacity) * 18);
        rowScales.push(0.92 + opacity * 0.08);
        iconScales.push(0.7 + opacity * 0.3);
        if (opacity >= 0.94) {
            const nextStart = revealStart + (index + 1) / itemCount * revealRange;
            const nextOpacity = index < itemCount - 1 ? reveal(progress, nextStart, 0.065) : 0;
            if (nextOpacity < 0.42 || index === itemCount - 1) {
                activeIndex = index;
            }
        }
    }
    const entryStates = entryOpacities.map((opacity, index)=>{
        if (index === activeIndex) return 'active';
        if (activeIndex > index || opacity >= 0.92) return 'past';
        return 'upcoming';
    });
    return {
        statusOpacity,
        headerOpacity,
        headerOffset,
        headerRuleProgress,
        entryOpacities,
        entryOffsets,
        rowScales,
        iconScales,
        entryStates,
        activeIndex,
        lineProgress: headerRuleProgress
    };
}
function getClockSequenceState(progress, reducedMotion = false) {
    const displayProgress = reveal(progress, 0.02, reducedMotion ? 0.07 : 0.1);
    const faceIn = displayProgress;
    const hold0659 = reveal(progress, 0.14, reducedMotion ? 0.05 : 0.08);
    const flipMinuteOnes = reveal(progress, reducedMotion ? 0.48 : 0.52, reducedMotion ? 0.05 : 0.08);
    const flipMinuteTens = reveal(progress, reducedMotion ? 0.62 : 0.66, reducedMotion ? 0.05 : 0.07);
    const flipHourOnes = reveal(progress, reducedMotion ? 0.74 : 0.78, reducedMotion ? 0.06 : 0.075);
    const settle0700 = reveal(progress, reducedMotion ? 0.84 : 0.88, reducedMotion ? 0.08 : 0.08);
    const ringLift = reveal(progress, 0.5, reducedMotion ? 0.08 : 0.1);
    const ringTail = 1 - reveal(progress, 0.94, reducedMotion ? 0.05 : 0.07);
    const ringAmount = ringLift * ringTail * (reducedMotion ? 0.28 : 1);
    const flashAmount = reveal(progress, 0.56, reducedMotion ? 0.06 : 0.075) * (1 - reveal(progress, 0.94, reducedMotion ? 0.05 : 0.07)) * (reducedMotion ? 0.5 : 1);
    return {
        displayProgress,
        ringAmount,
        flashAmount,
        faceIn,
        hold0659,
        flipMinuteOnes,
        flipMinuteTens,
        flipHourOnes,
        settle0700
    };
}
function getLaptopSequenceState(progress, _rowCount, reducedMotion = false) {
    void _rowCount;
    if (reducedMotion) {
        return {
            screenReveal: 1,
            screenWake: 0.78,
            glowAmount: 0.3,
            screenMessageOpacity: 1,
            screenMessageHold: 1,
            planeMatchProgress: 0,
            takeoverOpacity: 0,
            screenRedAmount: 0.36,
            hardwareFade: 1
        };
    }
    const glowOpenEnd = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].laptop.glowOpenEnd;
    const headlineHoldEnd = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].laptop.headlineHoldEnd;
    const screenPushStart = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].laptop.screenPushStart;
    const redTakeoverStart = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].laptop.redTakeoverStart;
    const redTakeoverEnd = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].laptop.redTakeoverEnd;
    const screenReveal = reveal(progress, 0.02, 0.12);
    const screenWake = mixValue(0.12, 1, reveal(progress, 0.02, glowOpenEnd - 0.02));
    const glowLift = reveal(progress, 0.04, 0.2);
    const glowTail = 1 - reveal(progress, headlineHoldEnd, 0.18);
    const glowAmount = glowLift * mixValue(1, 0.28, reveal(progress, headlineHoldEnd, 0.18)) * glowTail;
    const screenMessageOpacity = reveal(progress, glowOpenEnd, 0.08) * (1 - reveal(progress, screenPushStart, redTakeoverStart - screenPushStart));
    const screenMessageHold = reveal(progress, glowOpenEnd + 0.04, 0.08) * (1 - reveal(progress, screenPushStart, 0.06));
    const planeMatchProgress = reveal(progress, screenPushStart, Math.max(redTakeoverStart - screenPushStart, 0.001));
    let screenRedAmount;
    if (progress < glowOpenEnd) {
        screenRedAmount = mixValue(0.06, 0.24, reveal(progress, 0.02, glowOpenEnd - 0.02));
    } else if (progress < headlineHoldEnd) {
        screenRedAmount = mixValue(0.24, 0.38, reveal(progress, glowOpenEnd, headlineHoldEnd - glowOpenEnd));
    } else if (progress < redTakeoverStart) {
        screenRedAmount = mixValue(0.38, 0.68, reveal(progress, screenPushStart, redTakeoverStart - screenPushStart));
    } else {
        screenRedAmount = mixValue(0.68, 1, reveal(progress, redTakeoverStart, redTakeoverEnd - redTakeoverStart));
    }
    const takeoverOpacity = reveal(progress, redTakeoverStart, Math.max(redTakeoverEnd - redTakeoverStart, 0.001));
    const hardwareFade = 1 - takeoverOpacity;
    return {
        screenReveal,
        screenWake,
        glowAmount,
        screenMessageOpacity,
        screenMessageHold,
        planeMatchProgress,
        takeoverOpacity,
        screenRedAmount,
        hardwareFade
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/phoneMotion.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPhoneMotionTransform",
    ()=>getPhoneMotionTransform
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/easing.ts [app-client] (ecmascript)");
;
;
function getPhoneMotionTransform(progress, reducedMotion = false) {
    const { entry, hold, holdDrift, exit } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHONE_ROTATION"];
    const { entryEnd, exitStart, holdEnd } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].phone;
    if (reducedMotion) {
        return {
            ...hold,
            phase: 'rest',
            phaseT: 1
        };
    }
    if (progress <= entryEnd) {
        const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(progress / entryEnd, 0, 1));
        return {
            phase: 'entry',
            phaseT: t,
            rotY: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(entry.rotY, hold.rotY, t),
            rotX: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(entry.rotX, hold.rotX, t),
            scale: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(entry.scale, hold.scale, t),
            posX: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(entry.posX, hold.posX, t),
            posY: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(entry.posY, hold.posY, t),
            posZ: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(entry.posZ, hold.posZ, t)
        };
    }
    if (progress <= exitStart) {
        const holdWindow = Math.max(holdEnd - entryEnd, 0.0001);
        const holdT = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((Math.min(progress, holdEnd) - entryEnd) / holdWindow, 0, 1);
        const driftTheta = holdT * holdDrift.cycles * Math.PI * 2;
        const yawDrift = Math.sin(driftTheta) * holdDrift.rotYAmplitude;
        const pitchDrift = Math.sin(driftTheta * 0.85 + Math.PI / 5) * holdDrift.rotXAmplitude;
        return {
            phase: 'rest',
            phaseT: holdT,
            rotY: hold.rotY + yawDrift,
            rotX: hold.rotX + pitchDrift,
            scale: hold.scale,
            posX: hold.posX,
            posY: hold.posY + Math.sin(driftTheta * 0.9) * holdDrift.posYAmplitude,
            posZ: hold.posZ + Math.cos(driftTheta) * holdDrift.posZAmplitude
        };
    }
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((progress - exitStart) / (1 - exitStart), 0, 1));
    return {
        phase: 'exit',
        phaseT: t,
        rotY: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(hold.rotY, exit.rotY, t),
        rotX: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(hold.rotX, exit.rotX, t),
        scale: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(hold.scale, exit.scale, t),
        posX: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(hold.posX, exit.posX, t),
        posY: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(hold.posY, exit.posY, t),
        posZ: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lerp"])(hold.posZ, exit.posZ, t)
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/PhoneStage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PhoneStage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/scrollStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycleScreenState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cycleScreenState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/content.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$phoneMotion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/phoneMotion.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function toDegrees(radians) {
    return radians * 180 / Math.PI;
}
function getPhoneTransform(progress, reducedMotion) {
    const motion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$phoneMotion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPhoneMotionTransform"])(progress, reducedMotion);
    const baseScale = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHONE_ROTATION"].hold.scale;
    return {
        x: motion.posX * 420,
        y: motion.posY * 250,
        rotateY: toDegrees(motion.rotY),
        rotateX: toDegrees(motion.rotX),
        scale: motion.scale / baseScale
    };
}
function PhoneStage({ reducedMotion = false }) {
    _s();
    const phoneProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"])({
        "PhoneStage.useScrollStore[phoneProgress]": (s)=>s.phoneProgress
    }["PhoneStage.useScrollStore[phoneProgress]"]);
    const phoneState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycleScreenState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPhoneSequenceState"])(phoneProgress, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOG_ENTRIES"].length, reducedMotion);
    const phoneTransform = getPhoneTransform(phoneProgress, reducedMotion);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full w-full items-center justify-center px-6 md:px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            style: {
                perspective: '1800px'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(224,68,88,0.06)_0%,rgba(142,92,22,0.24)_34%,rgba(10,8,4,0)_72%)] blur-[90px]"
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/PhoneStage.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative aspect-[9/19.2] w-[18.5rem] md:w-[20.5rem]",
                    style: {
                        transform: `translate3d(${phoneTransform.x}px, ${phoneTransform.y}px, 0) rotateY(${phoneTransform.rotateY}deg) rotateX(${phoneTransform.rotateX}deg) scale(${phoneTransform.scale})`,
                        transformStyle: 'preserve-3d',
                        willChange: 'transform'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-x-[15%] bottom-[-3%] h-14 rounded-full bg-black/50 blur-[24px]"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/PhoneStage.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 rounded-[3.5rem] border border-white/10 bg-[#0b0c10] shadow-[0_34px_120px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pointer-events-none absolute inset-[1px] rounded-[3.45rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_18%,rgba(0,0,0,0)_32%,rgba(0,0,0,0.22)_100%)]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-[-0.18rem] top-[5.8rem] h-14 w-[0.18rem] rounded-l-full bg-white/12"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-[-0.14rem] top-[8.9rem] h-10 w-[0.14rem] rounded-l-full bg-white/10"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute right-[-0.14rem] top-[7.4rem] h-16 w-[0.14rem] rounded-r-full bg-white/12"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-1/2 top-[0.7rem] h-8 w-32 -translate-x-1/2 rounded-full border border-white/8 bg-[#111217]/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-[0.42rem] overflow-hidden rounded-[3rem] border border-white/6 bg-[#05060a]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),rgba(255,255,255,0)_32%),radial-gradient(circle_at_50%_18%,rgba(224,68,88,0.06),rgba(224,68,88,0)_36%),linear-gradient(180deg,rgba(3,4,8,0.98),rgba(7,8,12,0.98))]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                            lineNumber: 64,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative z-10 flex items-center justify-between px-6 pt-8 font-mono text-[9px] uppercase tracking-[0.16em] text-white/42",
                                            style: {
                                                opacity: phoneState.statusOpacity
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "5:58 AM"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                                    lineNumber: 70,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "BKK • GMT+7"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                                    lineNumber: 71,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                            lineNumber: 66,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative z-10 mt-5 px-6",
                                            style: {
                                                opacity: phoneState.headerOpacity,
                                                transform: `translateY(${phoneState.headerOffset}px)`
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "relative flex size-2.5 shrink-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "absolute inline-flex size-full animate-ping rounded-full bg-accent/75 opacity-70"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                                                    lineNumber: 83,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "relative inline-flex size-2.5 rounded-full bg-accent"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                                                    lineNumber: 84,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                                            lineNumber: 82,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-mono text-[9px] uppercase tracking-[0.26em] text-accent/85",
                                                            children: "Activity Log"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                                            lineNumber: 86,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2.5 h-px w-full bg-white/7"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-[-1px] h-0.5 bg-accent/80 shadow-[0_0_12px_rgba(224,68,88,0.35)]",
                                                    style: {
                                                        width: `${phoneState.headerRuleProgress * 100}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                            lineNumber: 74,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute bottom-5 left-6 top-[9.15rem] w-px bg-white/6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full bg-accent shadow-[0_0_12px_rgba(224,68,88,0.4)]",
                                                style: {
                                                    height: `${phoneState.lineProgress * 100}%`
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                                lineNumber: 98,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative z-10 grid h-[calc(100%-9rem)] grid-rows-5 gap-2 px-5 pb-5 pt-4",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOG_ENTRIES"].map((entry, index)=>{
                                                const rowState = phoneState.entryStates[index];
                                                const isActive = rowState === 'active';
                                                const isPast = rowState === 'past';
                                                const [lead, bold] = entry.bold ? entry.text.split(entry.bold) : [
                                                    entry.text,
                                                    ''
                                                ];
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `relative flex h-full min-h-0 items-center ${isActive ? 'rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(224,68,88,0.12),rgba(224,68,88,0.06))] px-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.16)]' : 'rounded-[1rem] border border-white/[0.04] bg-white/[0.02] px-2'}`,
                                                    style: {
                                                        opacity: phoneState.entryOpacities[index],
                                                        transform: `translateY(${phoneState.entryOffsets[index]}px) scale(${phoneState.rowScales[index]})`,
                                                        transformOrigin: 'center center'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid h-full w-full grid-cols-[2.35rem_1fr] gap-2.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `pt-2 font-mono text-[0.72rem] leading-none ${isActive ? 'text-accent' : isPast ? 'text-accent/55' : 'text-accent/38'}`,
                                                                children: entry.time
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                                                lineNumber: 128,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex min-w-0 flex-col justify-center py-2 pr-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mb-1.5 flex items-center justify-between gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: `h-[0.34rem] w-[0.34rem] rounded-full ${isActive ? 'bg-accent shadow-[0_0_8px_rgba(224,68,88,0.35)]' : isPast ? 'bg-accent/55' : 'bg-white/22'}`
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                                                                lineNumber: 142,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            isActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-mono text-[0.55rem] uppercase tracking-[0.22em] text-accent/85",
                                                                                children: "handoff ready"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                                                                lineNumber: 152,
                                                                                columnNumber: 31
                                                                            }, this) : null
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                                                        lineNumber: 141,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: `text-[0.79rem] leading-[1.18] ${isActive ? 'text-white' : isPast ? 'text-white/68' : 'text-white/46'}`,
                                                                        children: [
                                                                            lead,
                                                                            entry.bold ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                className: `${isActive ? 'text-white' : 'text-white/84'} font-semibold`,
                                                                                children: entry.bold
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                                                                lineNumber: 170,
                                                                                columnNumber: 31
                                                                            }, this) : null,
                                                                            bold
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                                                        lineNumber: 159,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                                                lineNumber: 140,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                                        lineNumber: 127,
                                                        columnNumber: 23
                                                    }, this)
                                                }, `${entry.time}-${entry.text}`, false, {
                                                    fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                            lineNumber: 104,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/PhoneStage.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/PhoneStage.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/PhoneStage.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/sections/PhoneStage.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/PhoneStage.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(PhoneStage, "3Wx5zUlHi0KnyFmHUrviFyQQ1sU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"]
    ];
});
_c = PhoneStage;
var _c;
__turbopack_context__.k.register(_c, "PhoneStage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useScrollPhase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useScrollPhase",
    ()=>useScrollPhase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/scrollStore.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
function useScrollPhase(triggerRef, options) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useScrollPhase.useEffect": ()=>{
            if (!triggerRef.current) return;
            const st = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].create({
                trigger: triggerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: options?.scrub ?? 0.3,
                onUpdate: {
                    "useScrollPhase.useEffect.st": (self)=>{
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"].getState().setCycleProgress(self.progress);
                    }
                }["useScrollPhase.useEffect.st"]
            });
            // Prime the store immediately so anchored loads and refreshes do not
            // render a blank cycle before the first scroll event fires.
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"].getState().setCycleProgress(st.progress);
            return ({
                "useScrollPhase.useEffect": ()=>{
                    st.kill();
                }
            })["useScrollPhase.useEffect"];
        }
    }["useScrollPhase.useEffect"], [
        triggerRef,
        options?.scrub
    ]);
}
_s(useScrollPhase, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useMediaQuery.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsMobile",
    ()=>useIsMobile,
    "useIsTablet",
    ()=>useIsTablet,
    "useMediaQuery",
    ()=>useMediaQuery,
    "useReducedMotion",
    ()=>useReducedMotion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
'use client';
;
function useMediaQuery(query) {
    _s();
    const [matches, setMatches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMediaQuery.useEffect": ()=>{
            const mql = window.matchMedia(query);
            // Set initial value
            setMatches(mql.matches);
            // Listen for changes
            const handler = {
                "useMediaQuery.useEffect.handler": (e)=>{
                    setMatches(e.matches);
                }
            }["useMediaQuery.useEffect.handler"];
            mql.addEventListener('change', handler);
            return ({
                "useMediaQuery.useEffect": ()=>mql.removeEventListener('change', handler)
            })["useMediaQuery.useEffect"];
        }
    }["useMediaQuery.useEffect"], [
        query
    ]);
    return matches;
}
_s(useMediaQuery, "/aV7jSECvYA0Ea4uAEPK2AzROhs=");
function useIsMobile() {
    _s1();
    return useMediaQuery('(max-width: 768px)');
}
_s1(useIsMobile, "AGUsWXV/IGWEYGrGyhqugaEb9zc=", false, function() {
    return [
        useMediaQuery
    ];
});
function useIsTablet() {
    _s2();
    return useMediaQuery('(max-width: 1024px)');
}
_s2(useIsTablet, "AGUsWXV/IGWEYGrGyhqugaEb9zc=", false, function() {
    return [
        useMediaQuery
    ];
});
function useReducedMotion() {
    _s3();
    return useMediaQuery('(prefers-reduced-motion: reduce)');
}
_s3(useReducedMotion, "AGUsWXV/IGWEYGrGyhqugaEb9zc=", false, function() {
    return [
        useMediaQuery
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/viewerTime.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BANGKOK_TZ",
    ()=>BANGKOK_TZ,
    "DEFAULT_VISITOR_CITY",
    ()=>DEFAULT_VISITOR_CITY,
    "DEFAULT_VISITOR_TZ",
    ()=>DEFAULT_VISITOR_TZ,
    "getCityFromTimezone",
    ()=>getCityFromTimezone,
    "getCycleVisitorCity",
    ()=>getCycleVisitorCity,
    "getCycleVisitorTimeZone",
    ()=>getCycleVisitorTimeZone,
    "getViewerTimeZone",
    ()=>getViewerTimeZone,
    "getVisitorTimeSequence",
    ()=>getVisitorTimeSequence,
    "localizeBangkokTimeString",
    ()=>localizeBangkokTimeString,
    "localizeEmailEntries",
    ()=>localizeEmailEntries
]);
const DEFAULT_VISITOR_TZ = 'America/New_York';
const DEFAULT_VISITOR_CITY = 'New York';
const BANGKOK_TZ = 'Asia/Bangkok';
const TZ_CITY_MAP = {
    'America/New_York': 'New York',
    'America/Chicago': 'Chicago',
    'America/Denver': 'Denver',
    'America/Los_Angeles': 'Los Angeles',
    'America/Anchorage': 'Anchorage',
    'Pacific/Honolulu': 'Honolulu',
    'America/Toronto': 'Toronto',
    'America/Vancouver': 'Vancouver',
    'America/Sao_Paulo': 'Sao Paulo',
    'America/Argentina/Buenos_Aires': 'Buenos Aires',
    'America/Mexico_City': 'Mexico City',
    'America/Bogota': 'Bogota',
    'Europe/London': 'London',
    'Europe/Paris': 'Paris',
    'Europe/Berlin': 'Berlin',
    'Europe/Amsterdam': 'Amsterdam',
    'Europe/Madrid': 'Madrid',
    'Europe/Rome': 'Rome',
    'Europe/Stockholm': 'Stockholm',
    'Europe/Zurich': 'Zurich',
    'Europe/Istanbul': 'Istanbul',
    'Europe/Moscow': 'Moscow',
    'Asia/Dubai': 'Dubai',
    'Asia/Kolkata': 'Mumbai',
    'Asia/Bangkok': 'Bangkok',
    'Asia/Singapore': 'Singapore',
    'Asia/Hong_Kong': 'Hong Kong',
    'Asia/Shanghai': 'Shanghai',
    'Asia/Tokyo': 'Tokyo',
    'Asia/Seoul': 'Seoul',
    'Australia/Sydney': 'Sydney',
    'Australia/Melbourne': 'Melbourne',
    'Pacific/Auckland': 'Auckland',
    'Africa/Johannesburg': 'Johannesburg',
    'Africa/Lagos': 'Lagos',
    'Africa/Cairo': 'Cairo'
};
function formatTimeInZone(date, timeZone) {
    return new Intl.DateTimeFormat('en-US', {
        timeZone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).format(date);
}
function normalizeHour(hour, ampm) {
    if (ampm === 'AM') {
        return hour % 12;
    }
    return hour % 12 + 12;
}
function parseTimeString(timeLabel) {
    const compact = timeLabel.trim().replace(/\s+/g, ' ');
    const match = compact.match(/(\d{1,2}):(\d{2})\s*([AP]M)$/i);
    if (!match) {
        return null;
    }
    return {
        hour: Number(match[1]),
        minute: Number(match[2]),
        ampm: match[3].toUpperCase()
    };
}
function buildBangkokDate(hour24, minute) {
    const date = new Date();
    date.setUTCHours(hour24 - 7, minute, 0, 0);
    return date;
}
function formatToSequenceEntry(date, timeZone) {
    const formatted = formatTimeInZone(date, timeZone);
    const parsed = parseTimeString(formatted);
    if (!parsed) {
        return {
            h: 10,
            m: 0,
            ampm: 'PM'
        };
    }
    return {
        h: parsed.hour,
        m: parsed.minute,
        ampm: parsed.ampm
    };
}
function getViewerTimeZone() {
    if (typeof Intl === 'undefined') {
        return DEFAULT_VISITOR_TZ;
    }
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || DEFAULT_VISITOR_TZ;
    } catch  {
        return DEFAULT_VISITOR_TZ;
    }
}
function getCycleVisitorTimeZone(timeZone) {
    if (!timeZone || timeZone === BANGKOK_TZ) {
        return DEFAULT_VISITOR_TZ;
    }
    return timeZone;
}
function getCityFromTimezone(timeZone) {
    if (!timeZone) {
        return DEFAULT_VISITOR_CITY;
    }
    if (TZ_CITY_MAP[timeZone]) {
        return TZ_CITY_MAP[timeZone];
    }
    const parts = timeZone.split('/');
    const raw = parts[parts.length - 1];
    if (!raw || raw.length < 2) {
        return DEFAULT_VISITOR_CITY;
    }
    return raw.replace(/_/g, ' ');
}
function getCycleVisitorCity(timeZone) {
    return getCityFromTimezone(getCycleVisitorTimeZone(timeZone));
}
function getVisitorTimeSequence(bkkSequence, visitorTimeZone) {
    return bkkSequence.map((entry)=>{
        const hour24 = normalizeHour(entry.h, entry.ampm);
        const date = buildBangkokDate(hour24, entry.m);
        return formatToSequenceEntry(date, visitorTimeZone);
    });
}
function localizeBangkokTimeString(bkkTimeLabel, visitorTimeZone) {
    const parsed = parseTimeString(bkkTimeLabel);
    if (!parsed) {
        return bkkTimeLabel;
    }
    const hour24 = normalizeHour(parsed.hour, parsed.ampm);
    const date = buildBangkokDate(hour24, parsed.minute);
    return formatTimeInZone(date, visitorTimeZone);
}
function localizeEmailEntries(entries, visitorTimeZone) {
    return entries.map((entry)=>({
            ...entry,
            time: localizeBangkokTimeString(entry.time, visitorTimeZone)
        }));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/clockFaceState.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getClockFaceDebugStates",
    ()=>getClockFaceDebugStates,
    "getClockFaceRenderState",
    ()=>getClockFaceRenderState,
    "resolveCardState",
    ()=>resolveCardState
]);
const CARD_DEFS = [
    {
        key: 'hourTens',
        fromDigit: '0',
        toDigit: '0',
        selectProgress: ()=>1
    },
    {
        key: 'hour',
        fromDigit: '6',
        toDigit: '7',
        selectProgress: (state)=>state.flipHourOnes
    },
    {
        key: 'minuteTens',
        fromDigit: '5',
        toDigit: '0',
        selectProgress: (state)=>state.flipMinuteTens
    },
    {
        key: 'minuteOnes',
        fromDigit: '9',
        toDigit: '0',
        selectProgress: (state)=>state.flipMinuteOnes
    }
];
function clamp01(value) {
    return Math.max(0, Math.min(1, value));
}
function smooth(value) {
    const t = clamp01(value);
    return t * t * (3 - 2 * t);
}
const FLIP_PHASE = {
    staticEnd: 0.08,
    topCloseEnd: 0.46,
    seamCrossEnd: 0.56,
    bottomOpenEnd: 0.88
};
function normalizePhase(value, start, end) {
    return clamp01((value - start) / Math.max(end - start, 0.0001));
}
function easeInPhase(value) {
    const t = clamp01(value);
    return t * t;
}
function easeOutPhase(value) {
    const t = clamp01(value);
    return 1 - Math.pow(1 - t, 3);
}
function easeSettlePhase(value) {
    const t = clamp01(value);
    return 1 - Math.pow(1 - t, 2.4);
}
function resolveCardState(rawProgress, key, fromDigit, toDigit) {
    const progress = clamp01(rawProgress);
    if (progress <= 0.001) {
        return {
            key,
            fromDigit,
            toDigit,
            rawProgress: 0,
            phase: 'static',
            phaseProgress: 0
        };
    }
    if (progress >= 0.999) {
        return {
            key,
            fromDigit,
            toDigit,
            rawProgress: 1,
            phase: 'settled',
            phaseProgress: 1
        };
    }
    if (progress < FLIP_PHASE.staticEnd) {
        return {
            key,
            fromDigit,
            toDigit,
            rawProgress: progress,
            phase: 'static',
            phaseProgress: easeOutPhase(normalizePhase(progress, 0, FLIP_PHASE.staticEnd))
        };
    }
    if (progress < FLIP_PHASE.topCloseEnd) {
        return {
            key,
            fromDigit,
            toDigit,
            rawProgress: progress,
            phase: 'topClose',
            phaseProgress: easeInPhase(normalizePhase(progress, FLIP_PHASE.staticEnd, FLIP_PHASE.topCloseEnd))
        };
    }
    if (progress < FLIP_PHASE.seamCrossEnd) {
        return {
            key,
            fromDigit,
            toDigit,
            rawProgress: progress,
            phase: 'seamCross',
            phaseProgress: smooth(normalizePhase(progress, FLIP_PHASE.topCloseEnd, FLIP_PHASE.seamCrossEnd))
        };
    }
    if (progress < FLIP_PHASE.bottomOpenEnd) {
        return {
            key,
            fromDigit,
            toDigit,
            rawProgress: progress,
            phase: 'bottomOpen',
            phaseProgress: easeOutPhase(normalizePhase(progress, FLIP_PHASE.seamCrossEnd, FLIP_PHASE.bottomOpenEnd))
        };
    }
    return {
        key,
        fromDigit,
        toDigit,
        rawProgress: progress,
        phase: 'settle',
        phaseProgress: easeSettlePhase(normalizePhase(progress, FLIP_PHASE.bottomOpenEnd, 1))
    };
}
function getClockFaceRenderState(state) {
    return {
        faceOpacity: 0.55 + state.faceIn * 0.45,
        periodLabel: 'AM',
        cards: CARD_DEFS.map(({ key, fromDigit, toDigit, selectProgress })=>resolveCardState(selectProgress(state), key, fromDigit, toDigit))
    };
}
function createDebugSequenceState(overrides) {
    return {
        displayProgress: 1,
        ringAmount: 0,
        flashAmount: 0,
        faceIn: 1,
        hold0659: 1,
        flipMinuteOnes: 0,
        flipMinuteTens: 0,
        flipHourOnes: 0,
        settle0700: 0,
        ...overrides
    };
}
function getClockFaceDebugStates() {
    return [
        {
            label: 'rest-0659',
            sequence: createDebugSequenceState({})
        },
        {
            label: 'minute-ones-mid',
            sequence: createDebugSequenceState({
                flipMinuteOnes: 0.52
            })
        },
        {
            label: 'minute-tens-mid',
            sequence: createDebugSequenceState({
                flipMinuteOnes: 1,
                flipMinuteTens: 0.52
            })
        },
        {
            label: 'hour-mid',
            sequence: createDebugSequenceState({
                flipMinuteOnes: 1,
                flipMinuteTens: 1,
                flipHourOnes: 0.52
            })
        },
        {
            label: 'rest-0700',
            sequence: createDebugSequenceState({
                flipMinuteOnes: 1,
                flipMinuteTens: 1,
                flipHourOnes: 1,
                settle0700: 1
            })
        }
    ].map((entry)=>({
            ...entry,
            render: getClockFaceRenderState(entry.sequence)
        }));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/flipClockGlyphs.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "drawFlipClockDigit",
    ()=>drawFlipClockDigit
]);
function rrect(ctx, x, y, width, height, radius, ccw = false) {
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
function roundedPolygon(ctx, vertices, radius) {
    const count = vertices.length;
    for(let index = 0; index < count; index += 1){
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
        const p1x = current[0] + dx1 / length1 * r;
        const p1y = current[1] + dy1 / length1 * r;
        const p2x = current[0] + dx2 / length2 * r;
        const p2y = current[1] + dy2 / length2 * r;
        if (index === 0) ctx.moveTo(p1x, p1y);
        else ctx.lineTo(p1x, p1y);
        ctx.quadraticCurveTo(current[0], current[1], p2x, p2y);
    }
    ctx.closePath();
}
function drawFlipClockDigit(ctx, digit, x, y, width, height, color, alpha = 1) {
    const sw = width * 0.23;
    const cr = width * 0.2;
    const icr = cr * 0.55;
    const mid = y + height * 0.5;
    const bottom = y + height;
    ctx.save();
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    switch(digit){
        case '0':
            ctx.beginPath();
            rrect(ctx, x, y, width, height, cr);
            rrect(ctx, x + sw, y + sw, width - sw * 2, height - sw * 2, icr, true);
            ctx.fill('evenodd');
            break;
        case '1':
            {
                const barW = sw * 1.1;
                const flagW = sw * 1.3;
                const cx = x + width * 0.5;
                ctx.beginPath();
                roundedPolygon(ctx, [
                    [
                        cx - barW * 0.5 - flagW,
                        y + sw * 0.9
                    ],
                    [
                        cx - barW * 0.5,
                        y
                    ],
                    [
                        cx + barW * 0.5,
                        y
                    ],
                    [
                        cx + barW * 0.5,
                        bottom
                    ],
                    [
                        cx - barW * 0.5,
                        bottom
                    ],
                    [
                        cx - barW * 0.5,
                        y + sw * 1.6
                    ]
                ], cr * 0.5);
                ctx.fill();
                break;
            }
        case '2':
            {
                const midTop = mid - sw * 0.5;
                const midBottom = mid + sw * 0.5;
                ctx.beginPath();
                roundedPolygon(ctx, [
                    [
                        x,
                        y
                    ],
                    [
                        x + width,
                        y
                    ],
                    [
                        x + width,
                        midBottom
                    ],
                    [
                        x + sw,
                        midBottom
                    ],
                    [
                        x + sw,
                        bottom - sw
                    ],
                    [
                        x + width,
                        bottom - sw
                    ],
                    [
                        x + width,
                        bottom
                    ],
                    [
                        x,
                        bottom
                    ],
                    [
                        x,
                        midTop
                    ],
                    [
                        x + width - sw,
                        midTop
                    ],
                    [
                        x + width - sw,
                        y + sw
                    ],
                    [
                        x,
                        y + sw
                    ]
                ], cr * 0.65);
                ctx.fill();
                break;
            }
        case '3':
            {
                const midTop = mid - sw * 0.5;
                const midBottom = mid + sw * 0.5;
                ctx.beginPath();
                roundedPolygon(ctx, [
                    [
                        x,
                        y
                    ],
                    [
                        x + width,
                        y
                    ],
                    [
                        x + width,
                        bottom
                    ],
                    [
                        x,
                        bottom
                    ],
                    [
                        x,
                        bottom - sw
                    ],
                    [
                        x + width - sw,
                        bottom - sw
                    ],
                    [
                        x + width - sw,
                        midBottom
                    ],
                    [
                        x + sw,
                        midBottom
                    ],
                    [
                        x + sw,
                        midTop
                    ],
                    [
                        x + width - sw,
                        midTop
                    ],
                    [
                        x + width - sw,
                        y + sw
                    ],
                    [
                        x,
                        y + sw
                    ]
                ], cr * 0.65);
                ctx.fill();
                break;
            }
        case '4':
            {
                const midTop = mid - sw * 0.5;
                const midBottom = mid + sw * 0.5;
                ctx.beginPath();
                roundedPolygon(ctx, [
                    [
                        x,
                        y
                    ],
                    [
                        x + sw,
                        y
                    ],
                    [
                        x + sw,
                        midTop
                    ],
                    [
                        x + width - sw,
                        midTop
                    ],
                    [
                        x + width - sw,
                        y
                    ],
                    [
                        x + width,
                        y
                    ],
                    [
                        x + width,
                        bottom
                    ],
                    [
                        x + width - sw,
                        bottom
                    ],
                    [
                        x + width - sw,
                        midBottom
                    ],
                    [
                        x,
                        midBottom
                    ]
                ], cr * 0.5);
                ctx.fill();
                break;
            }
        case '5':
            {
                const midTop = mid - sw * 0.5;
                const midBottom = mid + sw * 0.5;
                ctx.beginPath();
                roundedPolygon(ctx, [
                    [
                        x,
                        y
                    ],
                    [
                        x + width,
                        y
                    ],
                    [
                        x + width,
                        y + sw
                    ],
                    [
                        x + sw,
                        y + sw
                    ],
                    [
                        x + sw,
                        midTop
                    ],
                    [
                        x + width,
                        midTop
                    ],
                    [
                        x + width,
                        bottom
                    ],
                    [
                        x,
                        bottom
                    ],
                    [
                        x,
                        bottom - sw
                    ],
                    [
                        x + width - sw,
                        bottom - sw
                    ],
                    [
                        x + width - sw,
                        midBottom
                    ],
                    [
                        x,
                        midBottom
                    ]
                ], cr * 0.65);
                ctx.fill();
                break;
            }
        case '6':
            {
                const midTop = mid - sw * 0.5;
                const midBottom = mid + sw * 0.5;
                const counterHeight = bottom - sw - midBottom;
                ctx.beginPath();
                roundedPolygon(ctx, [
                    [
                        x,
                        y
                    ],
                    [
                        x + width,
                        y
                    ],
                    [
                        x + width,
                        y + sw
                    ],
                    [
                        x + sw,
                        y + sw
                    ],
                    [
                        x + sw,
                        midTop
                    ],
                    [
                        x + width,
                        midTop
                    ],
                    [
                        x + width,
                        bottom
                    ],
                    [
                        x,
                        bottom
                    ]
                ], cr * 0.7);
                rrect(ctx, x + sw, midBottom, width - sw * 2, counterHeight, icr, true);
                ctx.fill('evenodd');
                break;
            }
        case '7':
            ctx.beginPath();
            roundedPolygon(ctx, [
                [
                    x,
                    y
                ],
                [
                    x + width,
                    y
                ],
                [
                    x + width,
                    bottom
                ],
                [
                    x + width - sw,
                    bottom
                ],
                [
                    x + width - sw,
                    y + sw
                ],
                [
                    x,
                    y + sw
                ]
            ], cr * 0.85);
            ctx.fill();
            break;
        case '8':
            {
                const midTop = mid - sw * 0.5;
                const midBottom = mid + sw * 0.5;
                const topCounterH = midTop - (y + sw);
                const botCounterH = bottom - sw - midBottom;
                ctx.beginPath();
                rrect(ctx, x, y, width, height, cr);
                rrect(ctx, x + sw, y + sw, width - sw * 2, topCounterH, icr, true);
                rrect(ctx, x + sw, midBottom, width - sw * 2, botCounterH, icr, true);
                ctx.fill('evenodd');
                break;
            }
        case '9':
            {
                const midTop = mid - sw * 0.5;
                const midBottom = mid + sw * 0.5;
                const counterHeight = midTop - (y + sw);
                ctx.beginPath();
                roundedPolygon(ctx, [
                    [
                        x,
                        y
                    ],
                    [
                        x + width,
                        y
                    ],
                    [
                        x + width,
                        bottom
                    ],
                    [
                        x,
                        bottom
                    ],
                    [
                        x,
                        bottom - sw
                    ],
                    [
                        x + width - sw,
                        bottom - sw
                    ],
                    [
                        x + width - sw,
                        midBottom
                    ],
                    [
                        x,
                        midBottom
                    ]
                ], cr * 0.7);
                rrect(ctx, x + sw, y + sw, width - sw * 2, counterHeight, icr, true);
                ctx.fill('evenodd');
                break;
            }
    }
    ctx.restore();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/drawClockFace.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CLOCK_TIME_END",
    ()=>CLOCK_TIME_END,
    "CLOCK_TIME_START",
    ()=>CLOCK_TIME_START,
    "drawClockFace",
    ()=>drawClockFace,
    "drawClockFaceFromState",
    ()=>drawClockFaceFromState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clockFaceState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/clockFaceState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flipClockGlyphs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/flipClockGlyphs.ts [app-client] (ecmascript)");
;
;
;
const CLOCK_TIME_START = '6:59';
const CLOCK_TIME_END = '7:00';
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
const digitArtCache = new Map();
let faceSurfacePatternCanvas = null;
const DIGIT_LAYOUT = {
    x: 0.06,
    y: -0.012,
    width: 0.87,
    height: 1.04
};
const FACE_LAYOUT = {
    cardY: 0.13,
    cardHeight: 0.7,
    carrierWidth: 0.88,
    digitWidth: 0.175,
    colonGap: 0.06,
    pairGap: 0.018,
    carrierOffsetX: 20,
    carrierOffsetY: 18,
    carrierRadius: 14,
    cardRadius: 9
};
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
function createWorkingCanvas(width, height) {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
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
        const random = createSeededRandom(0xc10cface);
        for(let y = 0; y < FACE_SURFACE_PATTERN_SIZE; y += 4){
            patternCtx.fillStyle = `rgba(255,255,255,${0.008 + random() * 0.008})`;
            patternCtx.fillRect(0, y, FACE_SURFACE_PATTERN_SIZE, 1);
        }
        for(let y = 2; y < FACE_SURFACE_PATTERN_SIZE; y += 7){
            patternCtx.fillStyle = `rgba(0,0,0,${0.008 + random() * 0.01})`;
            patternCtx.fillRect(0, y, FACE_SURFACE_PATTERN_SIZE, 1);
        }
        for(let x = 0; x < FACE_SURFACE_PATTERN_SIZE; x += 22){
            patternCtx.fillStyle = `rgba(255,255,255,${0.004 + random() * 0.004})`;
            patternCtx.fillRect(x, 0, 1, FACE_SURFACE_PATTERN_SIZE);
        }
        for(let index = 0; index < 900; index += 1){
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
function applySurfaceTexture(ctx, x, y, width, height, radius, opacity) {
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
function getDigitHalfOverlap(digit, half) {
    if (digit === '7') {
        return half === 'top' ? Math.round(DIGIT_OVERLAP * 0.68) : Math.round(DIGIT_OVERLAP * 0.34);
    }
    return DIGIT_OVERLAP;
}
function getDigitArt(digit) {
    const cached = digitArtCache.get(digit);
    if (cached) return cached;
    const topOverlap = getDigitHalfOverlap(digit, 'top');
    const bottomOverlap = getDigitHalfOverlap(digit, 'bottom');
    const full = createWorkingCanvas(DIGIT_ART_WIDTH, DIGIT_ART_HEIGHT);
    const top = createWorkingCanvas(DIGIT_ART_WIDTH, DIGIT_ART_HEIGHT * 0.5 + topOverlap);
    const bottom = createWorkingCanvas(DIGIT_ART_WIDTH, DIGIT_ART_HEIGHT * 0.5 + bottomOverlap);
    if (!full || !top || !bottom) return null;
    const fullCtx = full.getContext('2d');
    const topCtx = top.getContext('2d');
    const bottomCtx = bottom.getContext('2d');
    if (!fullCtx || !topCtx || !bottomCtx) return null;
    fullCtx.clearRect(0, 0, full.width, full.height);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flipClockGlyphs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawFlipClockDigit"])(fullCtx, digit, full.width * DIGIT_LAYOUT.x, full.height * DIGIT_LAYOUT.y, full.width * DIGIT_LAYOUT.width, full.height * DIGIT_LAYOUT.height, '#eae5d6', 0.88);
    topCtx.clearRect(0, 0, top.width, top.height);
    topCtx.drawImage(full, 0, 0, full.width, full.height * 0.5 + topOverlap, 0, 0, top.width, top.height);
    bottomCtx.clearRect(0, 0, bottom.width, bottom.height);
    bottomCtx.drawImage(full, 0, full.height * 0.5 - bottomOverlap, full.width, full.height * 0.5 + bottomOverlap, 0, 0, bottom.width, bottom.height);
    const art = {
        top,
        bottom,
        topOverlap,
        bottomOverlap
    };
    digitArtCache.set(digit, art);
    return art;
}
function getDigitBounds(card, digit) {
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
            height: height * 0.5 + topOverlap
        },
        bottom: {
            x,
            y: y + height * 0.5 - bottomOverlap,
            width,
            height: height * 0.5 + bottomOverlap
        }
    };
}
function lerpValue(start, end, progress) {
    return start + (end - start) * progress;
}
function getFlapInset(card, digit, progress, phase) {
    const maxInset = digit === '7' ? card.width * (phase === 'close' ? 0.022 : 0.014) : card.width * 0.048;
    return phase === 'close' ? lerpValue(0, maxInset, progress) : lerpValue(maxInset, 0, progress);
}
function drawDigitImage(ctx, digit, card, half, alpha = 1, clipPad = 0) {
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
            ctx.rect(card.x, seamY - clipPad - 2, card.width, card.height * 0.5 + clipPad + 4);
        }
        ctx.clip();
    }
    ctx.drawImage(image, bounds.x, bounds.y, bounds.width, bounds.height);
    ctx.restore();
}
function drawCarrier(ctx, x, y, width, height) {
    ctx.save();
    ctx.fillStyle = FACE_BLACK;
    roundRect(ctx, x, y, width, height, FACE_LAYOUT.carrierRadius);
    ctx.fill();
    applySurfaceTexture(ctx, x, y, width, height, FACE_LAYOUT.carrierRadius, 0.58);
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1.2;
    roundRect(ctx, x, y, width, height, FACE_LAYOUT.carrierRadius);
    ctx.stroke();
    ctx.restore();
}
function drawCardShell(ctx, card) {
    const seamY = card.y + card.height * 0.5;
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.34)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 7;
    ctx.fillStyle = FACE_BLACK;
    roundRect(ctx, card.x, card.y, card.width, card.height, FACE_LAYOUT.cardRadius);
    ctx.fill();
    ctx.restore();
    const topGradient = ctx.createLinearGradient(card.x, card.y, card.x, card.y + card.height * 0.5);
    topGradient.addColorStop(0, FACE_BLACK_HIGHLIGHT);
    topGradient.addColorStop(1, FACE_BLACK_MID);
    const bottomGradient = ctx.createLinearGradient(card.x, card.y + card.height * 0.5, card.x, card.y + card.height);
    bottomGradient.addColorStop(0, FACE_BLACK_MID);
    bottomGradient.addColorStop(1, FACE_BLACK);
    ctx.fillStyle = topGradient;
    ctx.fillRect(card.x, card.y, card.width, card.height * 0.5);
    ctx.fillStyle = bottomGradient;
    ctx.fillRect(card.x, card.y + card.height * 0.5, card.width, card.height * 0.5);
    applySurfaceTexture(ctx, card.x, card.y, card.width, card.height, FACE_LAYOUT.cardRadius, 0.54);
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
function drawRestingDigit(ctx, card, digit, alpha = 1) {
    drawDigitImage(ctx, digit, card, 'top', alpha, REST_SEAM_CLIP_PAD);
    drawDigitImage(ctx, digit, card, 'bottom', alpha, REST_SEAM_CLIP_PAD);
    drawSeamOcclusion(ctx, card, 0.12, 0.1);
}
function drawTopFlap(ctx, card, digit, progress) {
    const art = getDigitArt(digit);
    if (!art) return;
    const halfHeight = card.height * 0.5;
    const flapHeight = Math.max(halfHeight * (1 - progress * 0.92), halfHeight * 0.1);
    const inset = getFlapInset(card, digit, progress, 'close');
    const travelY = lerpValue(0, halfHeight * 0.12, progress);
    const flapX = card.x + inset;
    const flapWidth = card.width - inset * 2;
    const flapY = card.y + travelY;
    ctx.save();
    ctx.beginPath();
    ctx.rect(card.x, card.y - 2, card.width, card.height * 0.5 + halfHeight * 0.16);
    ctx.clip();
    const flapGradient = ctx.createLinearGradient(flapX, flapY, flapX, flapY + flapHeight + 6);
    flapGradient.addColorStop(0, FACE_BLACK_HIGHLIGHT);
    flapGradient.addColorStop(0.65, FACE_BLACK_MID);
    flapGradient.addColorStop(1, FACE_BLACK);
    ctx.fillStyle = flapGradient;
    roundRect(ctx, flapX, flapY, flapWidth, flapHeight + 4, Math.max(4, FACE_LAYOUT.cardRadius - progress * 4));
    ctx.fill();
    applySurfaceTexture(ctx, flapX, flapY, flapWidth, flapHeight + 4, Math.max(4, FACE_LAYOUT.cardRadius - progress * 4), 0.46);
    ctx.drawImage(art.top, flapX, flapY + travelY * 0.12, flapWidth, flapHeight + art.topOverlap * 0.32);
    const shadowGradient = ctx.createLinearGradient(flapX, flapY, flapX, flapY + flapHeight + 8);
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
function drawBottomFlap(ctx, card, digit, progress) {
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
    const flapGradient = ctx.createLinearGradient(flapX, seamY - 2, flapX, seamY + flapHeight + 8);
    flapGradient.addColorStop(0, FACE_BLACK_HIGHLIGHT);
    flapGradient.addColorStop(0.3, FACE_BLACK_MID);
    flapGradient.addColorStop(1, FACE_BLACK);
    ctx.fillStyle = flapGradient;
    roundRect(ctx, flapX, seamY - 2, flapWidth, flapHeight + 6, Math.max(4, FACE_LAYOUT.cardRadius - (1 - progress) * 4));
    ctx.fill();
    applySurfaceTexture(ctx, flapX, seamY - 2, flapWidth, flapHeight + 6, Math.max(4, FACE_LAYOUT.cardRadius - (1 - progress) * 4), 0.42);
    ctx.drawImage(art.bottom, flapX, seamY - art.bottomOverlap * 0.08, flapWidth, flapHeight + art.bottomOverlap * 0.28);
    const highlightGradient = ctx.createLinearGradient(flapX, seamY - 2, flapX, seamY + flapHeight);
    highlightGradient.addColorStop(0, `rgba(255,255,255,${0.05 + progress * 0.06})`);
    highlightGradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = highlightGradient;
    ctx.fillRect(flapX, seamY - 2, flapWidth, flapHeight + 8);
    ctx.fillStyle = `rgba(0,0,0,${0.08 + (1 - progress) * 0.14})`;
    ctx.fillRect(flapX + 10, seamY - 1, Math.max(0, flapWidth - 20), 5);
    ctx.restore();
}
function drawSeamOcclusion(ctx, card, strength, compression) {
    const seamY = card.y + card.height * 0.5;
    const bandHeight = lerpValue(card.height * 0.025, card.height * 0.085, compression);
    const innerX = card.x + 10;
    const innerWidth = Math.max(0, card.width - 20);
    const gapHeight = lerpValue(card.height * 0.012, card.height * 0.028, compression);
    ctx.save();
    const seamGradient = ctx.createLinearGradient(innerX, seamY - bandHeight, innerX, seamY + bandHeight);
    seamGradient.addColorStop(0, 'rgba(0,0,0,0)');
    seamGradient.addColorStop(0.35, `rgba(0,0,0,${0.08 + strength * 0.18})`);
    seamGradient.addColorStop(0.5, `rgba(0,0,0,${0.2 + strength * 0.34})`);
    seamGradient.addColorStop(0.65, `rgba(0,0,0,${0.08 + strength * 0.18})`);
    seamGradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = seamGradient;
    ctx.fillRect(innerX, seamY - bandHeight, innerWidth, bandHeight * 2);
    ctx.fillStyle = `rgba(4,4,3,${0.22 + strength * 0.3})`;
    ctx.fillRect(innerX + 4, seamY - gapHeight * 0.5, Math.max(0, innerWidth - 8), gapHeight);
    ctx.fillStyle = `rgba(255,255,255,${0.01 + (1 - compression) * 0.035})`;
    ctx.fillRect(innerX + 12, seamY - bandHeight * 0.6, Math.max(0, innerWidth - 24), 1.2);
    ctx.restore();
}
function drawSettleLighting(ctx, card, progress) {
    const fade = 1 - progress;
    if (fade <= 0) return;
    ctx.save();
    const settleGradient = ctx.createLinearGradient(card.x, card.y, card.x, card.y + card.height);
    settleGradient.addColorStop(0, `rgba(255,255,255,${fade * 0.03})`);
    settleGradient.addColorStop(0.5, 'rgba(255,255,255,0)');
    settleGradient.addColorStop(1, `rgba(0,0,0,${fade * 0.08})`);
    ctx.fillStyle = settleGradient;
    roundRect(ctx, card.x, card.y, card.width, card.height, FACE_LAYOUT.cardRadius);
    ctx.fill();
    ctx.restore();
}
function drawDigitCard(ctx, card, cardState) {
    drawCardShell(ctx, card);
    switch(cardState.phase){
        case 'static':
            drawRestingDigit(ctx, card, cardState.fromDigit);
            return;
        case 'settled':
            drawRestingDigit(ctx, card, cardState.toDigit);
            return;
        case 'topClose':
            drawDigitImage(ctx, cardState.toDigit, card, 'top', 1, ACTIVE_SEAM_CLIP_PAD);
            drawDigitImage(ctx, cardState.fromDigit, card, 'bottom', 1, ACTIVE_SEAM_CLIP_PAD);
            drawTopFlap(ctx, card, cardState.fromDigit, cardState.phaseProgress);
            drawSeamOcclusion(ctx, card, 0.24 + cardState.phaseProgress * 0.42, cardState.phaseProgress * 0.72);
            break;
        case 'seamCross':
            {
                const outgoingBottomAlpha = Math.max(0, 1 - cardState.phaseProgress * 1.05);
                const incomingBottomAlpha = Math.max(0, (cardState.phaseProgress - 0.72) / 0.28) * 0.42;
                drawDigitImage(ctx, cardState.toDigit, card, 'top', 1, ACTIVE_SEAM_CLIP_PAD);
                drawDigitImage(ctx, cardState.fromDigit, card, 'bottom', outgoingBottomAlpha, ACTIVE_SEAM_CLIP_PAD);
                drawDigitImage(ctx, cardState.toDigit, card, 'bottom', incomingBottomAlpha, ACTIVE_SEAM_CLIP_PAD);
                drawSeamOcclusion(ctx, card, 0.66, 1);
                break;
            }
        case 'bottomOpen':
            drawDigitImage(ctx, cardState.toDigit, card, 'top', 1, ACTIVE_SEAM_CLIP_PAD);
            drawDigitImage(ctx, cardState.toDigit, card, 'bottom', 0.05 + cardState.phaseProgress * 0.12, ACTIVE_SEAM_CLIP_PAD);
            drawBottomFlap(ctx, card, cardState.toDigit, cardState.phaseProgress);
            drawSeamOcclusion(ctx, card, 0.16 + (1 - cardState.phaseProgress) * 0.28, 0.9 - cardState.phaseProgress * 0.55);
            break;
        case 'settle':
            drawRestingDigit(ctx, card, cardState.toDigit);
            drawSeamOcclusion(ctx, card, (1 - cardState.phaseProgress) * 0.14, 0.2);
            drawSettleLighting(ctx, card, cardState.phaseProgress);
            break;
    }
}
function drawColon(ctx, centerX, centerY) {
    ctx.save();
    ctx.fillStyle = 'rgba(239,233,211,0.9)';
    ctx.beginPath();
    ctx.roundRect(centerX - 5, centerY - 38, 10, 14, 4);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(centerX - 5, centerY + 24, 10, 14, 4);
    ctx.fill();
    ctx.restore();
}
function drawPeriodLabel(ctx, text, x, y) {
    ctx.save();
    ctx.fillStyle = 'rgba(226,226,216,0.36)';
    ctx.font = '500 24px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
    ctx.restore();
}
function drawClockFaceFromState(ctx, renderState) {
    const { width, height } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLOCK_CANVAS"];
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.globalAlpha = renderState.faceOpacity;
    const cavityGradient = ctx.createLinearGradient(0, 0, 0, height);
    cavityGradient.addColorStop(0, FACE_BLACK_HIGHLIGHT);
    cavityGradient.addColorStop(0.26, FACE_BLACK_MID);
    cavityGradient.addColorStop(0.72, FACE_BLACK_SOFT);
    cavityGradient.addColorStop(1, FACE_BLACK_HIGHLIGHT);
    ctx.fillStyle = cavityGradient;
    roundRect(ctx, 0, 0, width, height, 28);
    ctx.fill();
    applySurfaceTexture(ctx, 0, 0, width, height, 28, 0.62);
    ctx.fillStyle = 'rgba(0,0,0,0.16)';
    ctx.fillRect(0, 0, width, height * 0.24);
    ctx.fillRect(0, height * 0.76, width, height * 0.24);
    ctx.strokeStyle = 'rgba(255,255,255,0.042)';
    ctx.lineWidth = 2;
    roundRect(ctx, 1, 1, width - 2, height - 2, 28);
    ctx.stroke();
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
    const cards = [
        {
            x: hourTensX,
            y: cardY,
            width: digitWidth,
            height: cardHeight
        },
        {
            x: hourOnesX,
            y: cardY,
            width: digitWidth,
            height: cardHeight
        },
        {
            x: minuteTensX,
            y: cardY,
            width: digitWidth,
            height: cardHeight
        },
        {
            x: minuteOnesX,
            y: cardY,
            width: digitWidth,
            height: cardHeight
        }
    ];
    // Hour carrier (wraps hourTens + hourOnes)
    drawCarrier(ctx, hourTensX - FACE_LAYOUT.carrierOffsetX, cardY - FACE_LAYOUT.carrierOffsetY, digitWidth * 2 + pairGap + FACE_LAYOUT.carrierOffsetX * 2, cardHeight + FACE_LAYOUT.carrierOffsetY * 2);
    // Minute carrier (wraps minuteTens + minuteOnes)
    drawCarrier(ctx, minuteTensX - FACE_LAYOUT.carrierOffsetX, cardY - FACE_LAYOUT.carrierOffsetY, digitWidth * 2 + pairGap + FACE_LAYOUT.carrierOffsetX * 2, cardHeight + FACE_LAYOUT.carrierOffsetY * 2);
    // Shine indicators on each card
    ctx.fillStyle = 'rgba(232,227,207,0.18)';
    cards.forEach((card)=>{
        [
            card.x + card.width * 0.24,
            card.x + card.width * 0.76
        ].forEach((x)=>{
            roundRect(ctx, x - 7, cardY - 18, 14, 16, 4);
            ctx.fill();
        });
    });
    cards.forEach((card, index)=>{
        drawDigitCard(ctx, card, renderState.cards[index]);
    });
    drawColon(ctx, hourOnesX + digitWidth + colonGap * 0.5, cardY + cardHeight * 0.5);
    ctx.restore();
}
function drawClockFace(ctx, state) {
    drawClockFaceFromState(ctx, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clockFaceState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClockFaceRenderState"])(state));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/SceneLoader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClockFallback",
    ()=>ClockFallback,
    "LaptopFallback",
    ()=>LaptopFallback,
    "PhoneFallback",
    ()=>PhoneFallback,
    "SceneLoader",
    ()=>SceneLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/scrollStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycleScreenState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cycleScreenState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/content.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$drawClockFace$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/drawClockFace.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/easing.ts [app-client] (ecmascript)");
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
function SceneLoader() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full w-full items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative size-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 animate-ping rounded-full border border-accent/20"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/SceneLoader.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-2 rounded-full border border-accent/40"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/SceneLoader.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary",
                    children: "Loading"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/SceneLoader.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/SceneLoader.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = SceneLoader;
function PhoneFallback({ reducedMotion = false }) {
    _s();
    const phoneProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"])({
        "PhoneFallback.useScrollStore[phoneProgress]": (state)=>state.phoneProgress
    }["PhoneFallback.useScrollStore[phoneProgress]"]);
    const phoneState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycleScreenState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPhoneSequenceState"])(phoneProgress, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOG_ENTRIES"].length, reducedMotion);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full w-full items-center justify-center px-6 md:px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            style: {
                perspective: '1800px'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(224,68,88,0.06)_0%,rgba(142,92,22,0.24)_34%,rgba(10,8,4,0)_72%)] blur-[90px]"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative aspect-[9/19.2] w-[18.5rem] md:w-[20.5rem]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-x-[15%] bottom-[-3%] h-14 rounded-full bg-black/50 blur-[24px]"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/SceneLoader.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 rounded-[3.5rem] border border-white/10 bg-[#0b0c10] shadow-[0_34px_120px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pointer-events-none absolute inset-[1px] rounded-[3.45rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_18%,rgba(0,0,0,0)_32%,rgba(0,0,0,0.22)_100%)]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-[-0.18rem] top-[5.8rem] h-14 w-[0.18rem] rounded-l-full bg-white/12"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-[-0.14rem] top-[8.9rem] h-10 w-[0.14rem] rounded-l-full bg-white/10"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute right-[-0.14rem] top-[7.4rem] h-16 w-[0.14rem] rounded-r-full bg-white/12"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-1/2 top-[0.7rem] h-8 w-32 -translate-x-1/2 rounded-full border border-white/8 bg-[#111217]/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-[0.42rem] overflow-hidden rounded-[3rem] border border-white/6 bg-[#05060a]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),rgba(255,255,255,0)_32%),linear-gradient(180deg,rgba(3,4,8,0.98),rgba(7,8,12,0.98))]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                            lineNumber: 66,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative z-10 flex items-center justify-between px-6 pt-8 font-mono text-[9px] uppercase tracking-[0.16em] text-white/42",
                                            style: {
                                                opacity: phoneState.statusOpacity
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "5:58 AM"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "BKK • GMT+7"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                    lineNumber: 73,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                            lineNumber: 68,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative z-10 mt-5 px-6",
                                            style: {
                                                opacity: phoneState.headerOpacity,
                                                transform: `translateY(${phoneState.headerOffset}px)`
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "relative flex size-2.5 shrink-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "absolute inline-flex size-full animate-ping rounded-full bg-accent/75 opacity-70"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                                    lineNumber: 85,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "relative inline-flex size-2.5 rounded-full bg-accent"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                                    lineNumber: 86,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                            lineNumber: 84,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-mono text-[9px] uppercase tracking-[0.26em] text-accent/85",
                                                            children: "Activity Log"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                            lineNumber: 88,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2.5 h-px w-full bg-white/7"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                    lineNumber: 92,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-[-1px] h-0.5 bg-accent/80 shadow-[0_0_12px_rgba(224,68,88,0.35)]",
                                                    style: {
                                                        width: `${phoneState.headerRuleProgress * 100}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                    lineNumber: 93,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                            lineNumber: 76,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute bottom-6 left-6 top-[9.95rem] w-px bg-white/6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full bg-accent shadow-[0_0_12px_rgba(224,68,88,0.4)]",
                                                style: {
                                                    height: `${phoneState.lineProgress * 100}%`
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                lineNumber: 100,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                            lineNumber: 99,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative z-10 flex flex-col px-7 pb-4 pt-6",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOG_ENTRIES"].map((entry, index)=>{
                                                const rowState = phoneState.entryStates[index];
                                                const isActive = rowState === 'active';
                                                const isPast = rowState === 'past';
                                                const [lead, bold] = entry.bold ? entry.text.split(entry.bold) : [
                                                    entry.text,
                                                    ''
                                                ];
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `rounded-[1.15rem] border p-3 ${isActive ? 'border-accent/25 bg-accent/[0.09] shadow-[0_0_24px_rgba(224,68,88,0.08)]' : 'border-white/7 bg-white/[0.03]'}`,
                                                    style: {
                                                        opacity: phoneState.entryOpacities[index],
                                                        transform: `translateY(${phoneState.entryOffsets[index]}px) scale(${phoneState.rowScales[index]})`,
                                                        transformOrigin: 'center top'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-[2.75rem_1fr] gap-2.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `pt-0.5 font-mono text-[0.8rem] leading-none ${isActive ? 'text-accent' : isPast ? 'text-accent/55' : 'text-accent/38'}`,
                                                                children: entry.time
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                                lineNumber: 130,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "min-w-0",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: `text-[0.86rem] leading-[1.3] ${isActive ? 'text-white' : isPast ? 'text-white/68' : 'text-white/46'}`,
                                                                    children: [
                                                                        lead,
                                                                        entry.bold ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                            className: `${isActive ? 'text-white' : 'text-white/86'} font-semibold`,
                                                                            children: entry.bold
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                                            lineNumber: 154,
                                                                            columnNumber: 31
                                                                        }, this) : null,
                                                                        bold
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                                    lineNumber: 143,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                                lineNumber: 142,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                        lineNumber: 129,
                                                        columnNumber: 23
                                                    }, this)
                                                }, `${entry.time}-${entry.text}`, false, {
                                                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/SceneLoader.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/SceneLoader.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/SceneLoader.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(PhoneFallback, "3Wx5zUlHi0KnyFmHUrviFyQQ1sU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"]
    ];
});
_c1 = PhoneFallback;
function ClockFallback({ reducedMotion = false }) {
    _s1();
    const clockProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"])({
        "ClockFallback.useScrollStore[clockProgress]": (state)=>state.clockProgress
    }["ClockFallback.useScrollStore[clockProgress]"]);
    const clockState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycleScreenState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClockSequenceState"])(clockProgress, reducedMotion);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const stateKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClockFallback.useMemo[stateKey]": ()=>[
                clockState.displayProgress.toFixed(3),
                clockState.faceIn.toFixed(3),
                clockState.hold0659.toFixed(3),
                clockState.flipMinuteOnes.toFixed(3),
                clockState.flipMinuteTens.toFixed(3),
                clockState.flipHourOnes.toFixed(3),
                clockState.settle0700.toFixed(3),
                clockState.flashAmount.toFixed(3)
            ].join('|')
    }["ClockFallback.useMemo[stateKey]"], [
        clockState
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClockFallback.useEffect": ()=>{
            const ctx = canvasRef.current?.getContext('2d');
            if (!ctx) return;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$drawClockFace$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawClockFace"])(ctx, clockState);
        }
    }["ClockFallback.useEffect"], [
        clockState,
        stateKey
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full w-full items-center justify-center px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-[26rem] rounded-[2.2rem] border border-[#5e5328]/25 bg-[#181612] px-8 pb-10 pt-9 shadow-[0_34px_110px_rgba(0,0,0,0.35)]",
            style: {
                transform: reducedMotion ? 'none' : `translateY(${Math.sin(clockProgress * Math.PI * 8) * clockState.ringAmount * 4}px) rotate(${Math.sin(clockProgress * Math.PI * 10) * clockState.ringAmount * 1.8}deg)`
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 rounded-[2.2rem] bg-[radial-gradient(circle_at_50%_20%,rgba(224,68,88,0.10),rgba(120,96,36,0.14)_38%,rgba(0,0,0,0)_78%)]"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                    lineNumber: 215,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative rounded-[1.4rem] border border-white/6 bg-[#11100d] px-5 py-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-[1rem] border border-white/5 bg-black/60 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "pb-3 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-accent/75",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_CLOCK"].lead
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                    ref: canvasRef,
                                    width: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLOCK_CANVAS"].width,
                                    height: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLOCK_CANVAS"].height,
                                    className: "block h-auto w-full rounded-[0.9rem]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                    lineNumber: 221,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/SceneLoader.tsx",
                            lineNumber: 217,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-5 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-white/46",
                            children: "Morning handoff"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/SceneLoader.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                    lineNumber: 216,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/SceneLoader.tsx",
            lineNumber: 207,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/SceneLoader.tsx",
        lineNumber: 206,
        columnNumber: 5
    }, this);
}
_s1(ClockFallback, "nDbtTh4v3UpE0dUlrB1FyGKxq/g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"]
    ];
});
_c2 = ClockFallback;
function getLaptopSequenceProgress(cycleProgress) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((cycleProgress - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].laptop.in) / (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].laptop.out - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].laptop.in), 0, 1);
}
function mixNumber(a, b, t) {
    return Math.round(a + (b - a) * t);
}
function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
}
function LaptopFallback({ emails, reducedMotion = false }) {
    _s2();
    const cycleProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"])({
        "LaptopFallback.useScrollStore[cycleProgress]": (state)=>state.cycleProgress
    }["LaptopFallback.useScrollStore[cycleProgress]"]);
    const laptopProgress = reducedMotion ? 1 : getLaptopSequenceProgress(cycleProgress);
    const laptopState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycleScreenState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLaptopSequenceState"])(laptopProgress, emails.length, reducedMotion);
    const lidOpen = reducedMotion ? 1 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(laptopProgress / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].laptop.openEnd, 0, 1));
    const screenTop = rgb(mixNumber(247, 199, laptopState.screenRedAmount), mixNumber(242, 240, laptopState.screenRedAmount), mixNumber(232, 66, laptopState.screenRedAmount));
    const screenBottom = rgb(mixNumber(239, 166, laptopState.screenRedAmount), mixNumber(233, 213, laptopState.screenRedAmount), mixNumber(223, 44, laptopState.screenRedAmount));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full w-full items-center justify-center px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-[44rem]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-none absolute left-1/2 top-[62%] h-12 w-[60%] -translate-x-1/2 rounded-full bg-black/30 blur-[32px]"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                    lineNumber: 285,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative mx-auto h-[14rem] w-[32rem] origin-bottom",
                    style: {
                        transformStyle: 'preserve-3d',
                        transform: `translateY(${(1 - lidOpen) * 16}px) rotateX(18deg)`
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-x-0 bottom-0 h-[5.4rem] rounded-[1.5rem] border border-black/10 bg-[#8e8f94] shadow-[0_18px_60px_rgba(0,0,0,0.18)]"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/SceneLoader.tsx",
                            lineNumber: 296,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-1/2 top-[3.7rem] h-8 w-[46%] -translate-x-1/2 rounded-full bg-[#fff0de]/65 blur-[22px]",
                            style: {
                                opacity: laptopState.glowAmount * 0.72 + laptopState.screenWake * 0.24
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/SceneLoader.tsx",
                            lineNumber: 298,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute bottom-[4.5rem] left-1/2 h-[9rem] w-[25.5rem] -translate-x-1/2 origin-bottom rounded-[1.25rem] border border-black/10 bg-[#0f1011]",
                            style: {
                                transform: `perspective(1000px) rotateX(${78 - lidOpen * 78}deg) scale(${1 + laptopState.planeMatchProgress * 0.01 + laptopState.takeoverOpacity * 0.01})`,
                                boxShadow: '0 22px 50px rgba(0,0,0,0.18)'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-[0.4rem] overflow-hidden rounded-[0.95rem] border border-white/6",
                                style: {
                                    background: `linear-gradient(180deg, ${screenTop} 0%, ${screenBottom} 100%)`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,240,220,0.18),rgba(224,68,88,0.18)_28%,rgba(0,0,0,0)_58%)]",
                                        style: {
                                            opacity: Math.max(laptopState.glowAmount, laptopState.screenWake * 0.42)
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                        lineNumber: 316,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-[linear-gradient(180deg,rgba(255,244,233,0.96),rgba(180,53,68,0.94)_54%,rgba(118,23,37,0.98))]",
                                        style: {
                                            opacity: 0.16 + laptopState.screenRedAmount * 0.84
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                        lineNumber: 321,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute left-1/2 top-[14%] w-[76%] -translate-x-1/2 px-6 text-center",
                                        style: {
                                            opacity: laptopState.screenMessageOpacity,
                                            transform: `translateX(-50%) translateY(${(1 - laptopState.screenMessageOpacity) * 12}px)`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mx-auto inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-mono text-[10px] uppercase tracking-[0.22em] text-[#fff2e0]",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_LAPTOP"].alertTime
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                    lineNumber: 336,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                lineNumber: 335,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-4 font-heading text-[2.2rem] font-bold text-[#fff4e8]",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_LAPTOP"].alertTitle
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                lineNumber: 340,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mx-auto mt-4 h-px w-40 bg-white/18"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                                lineNumber: 343,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                        lineNumber: 328,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/SceneLoader.tsx",
                                lineNumber: 310,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/SceneLoader.tsx",
                            lineNumber: 303,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/SceneLoader.tsx",
                    lineNumber: 289,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/SceneLoader.tsx",
            lineNumber: 284,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/SceneLoader.tsx",
        lineNumber: 283,
        columnNumber: 5
    }, this);
}
_s2(LaptopFallback, "JizidJxoOJiNxxlQ5IQGSBXc6O4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"]
    ];
});
_c3 = LaptopFallback;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "SceneLoader");
__turbopack_context__.k.register(_c1, "PhoneFallback");
__turbopack_context__.k.register(_c2, "ClockFallback");
__turbopack_context__.k.register(_c3, "LaptopFallback");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/CycleSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CycleSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/ErrorBoundary.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$PhoneStage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/sections/PhoneStage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useScrollPhase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useScrollPhase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLiveClock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useLiveClock.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useGPUCapability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useGPUCapability.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMediaQuery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useMediaQuery.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycleScreenState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cycleScreenState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/easing.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/content.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$viewerTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/viewerTime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SceneLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/SceneLoader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/scrollStore.ts [app-client] (ecmascript)");
;
;
;
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature();
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
;
;
;
;
;
;
const ClockScene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/src/components/three/ClockScene.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/three/ClockScene.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = ClockScene;
const PhoneScene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/src/components/three/PhoneScene.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/three/PhoneScene.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c1 = PhoneScene;
const LaptopScene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/src/components/three/LaptopScene.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/three/LaptopScene.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c2 = LaptopScene;
function toMinutes(entry) {
    let hour = entry.h;
    if (entry.ampm === 'PM' && hour !== 12) hour += 12;
    if (entry.ampm === 'AM' && hour === 12) hour = 0;
    return hour * 60 + entry.m;
}
function interpolateTime(sequence, progress) {
    const count = sequence.length;
    if (count === 0) return {
        h: 0,
        m: 0,
        ampm: 'AM'
    };
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(progress, 0, 1);
    const position = t * (count - 1);
    const low = Math.floor(position);
    const high = Math.min(low + 1, count - 1);
    const fraction = position - low;
    const minsLow = toMinutes(sequence[low]);
    const minsHigh = toMinutes(sequence[high]);
    const totalMinutes = minsLow + (minsHigh - minsLow) * fraction;
    const rounded = Math.floor(totalMinutes);
    const hour24 = Math.floor(rounded / 60) % 24;
    const minute = rounded % 60;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    let hour = hour24 % 12;
    if (hour === 0) hour = 12;
    return {
        h: hour,
        m: minute,
        ampm
    };
}
function formatInterpolatedTime(time) {
    return `${time.h}:${String(time.m).padStart(2, '0')} ${time.ampm}`;
}
function selectTransform(phase) {
    return (state)=>state[`${phase}Transform`];
}
function PhaseLayer({ phase, children, className = '', reducedMotion = false }) {
    _s();
    const transform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"])(selectTransform(phase));
    const is3DPhase = phase === 'phone' || phase === 'clock' || phase === 'laptop';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `absolute inset-0 ${className}`,
        style: {
            opacity: transform.opacity,
            transform: reducedMotion || is3DPhase ? 'none' : `translateY(${transform.yShift}px) scale(${transform.scale})`,
            filter: reducedMotion || is3DPhase || transform.blur <= 0.1 ? 'none' : `blur(${transform.blur}px)`,
            pointerEvents: transform.opacity > 0.01 ? 'auto' : 'none',
            willChange: reducedMotion || is3DPhase ? 'opacity' : 'opacity, transform, filter'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/sections/CycleSection.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s(PhaseLayer, "84f+VFZ+XM+cFDxReAK+lpvuht4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"]
    ];
});
_c3 = PhaseLayer;
function staggerStyle(progress, delay, speed, reducedMotion) {
    if (reducedMotion) return {};
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((progress - delay) * speed, 0, 1));
    return {
        opacity: t,
        transform: `translateY(${(1 - t) * 18}px)`,
        willChange: t > 0 && t < 1 ? 'opacity, transform' : 'auto'
    };
}
function slideXStyle(progress, delay, speed, fromX, reducedMotion) {
    if (reducedMotion) return {};
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((progress - delay) * speed, 0, 1));
    return {
        opacity: t,
        transform: `translateX(${(1 - t) * fromX}px)`,
        willChange: t > 0 && t < 1 ? 'opacity, transform' : 'auto'
    };
}
function ClockDigits({ timeLabel, accent = false }) {
    const [time, ampm = ''] = timeLabel.split(' ');
    const [hour = '', minute = '00'] = time.split(':');
    const hourDigits = hour.length === 1 ? [
        '',
        hour
    ] : hour.split('');
    const minuteDigits = minute.split('');
    const digits = [
        ...hourDigits,
        ...minuteDigits
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-end justify-center gap-2 md:gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1.5 md:gap-2",
                children: digits.slice(0, 2).map((digit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-[4rem] w-[3rem] items-center justify-center rounded-[18px] border border-white/8 bg-[#11120f]/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:h-[5rem] md:w-[4rem]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `font-heading text-[2.4rem] font-bold leading-none md:text-[3.8rem] ${digit ? 'text-text-primary' : 'text-transparent'}`,
                            children: digit || '0'
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/CycleSection.tsx",
                            lineNumber: 190,
                            columnNumber: 13
                        }, this)
                    }, `hour-${index}`, false, {
                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                        lineNumber: 186,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "pb-2 font-heading text-[2.4rem] font-bold leading-none text-text-primary/85 md:text-[4rem]",
                children: ":"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1.5 md:gap-2",
                children: digits.slice(2).map((digit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-[4rem] w-[3rem] items-center justify-center rounded-[18px] border border-white/8 bg-[#11120f]/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:h-[5rem] md:w-[4rem]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-heading text-[2.4rem] font-bold leading-none text-text-primary md:text-[3.8rem]",
                            children: digit
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/CycleSection.tsx",
                            lineNumber: 211,
                            columnNumber: 13
                        }, this)
                    }, `minute-${index}`, false, {
                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `pb-2 font-mono text-[1.25rem] uppercase tracking-[0.2em] md:text-[1.55rem] ${accent ? 'text-accent/80' : 'text-text-primary/60'}`,
                children: ampm
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 218,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/CycleSection.tsx",
        lineNumber: 183,
        columnNumber: 5
    }, this);
}
_c4 = ClockDigits;
function CycleAtmosphere() {
    _s1();
    const cycleProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"])({
        "CycleAtmosphere.useScrollStore[cycleProgress]": (state)=>state.cycleProgress
    }["CycleAtmosphere.useScrollStore[cycleProgress]"]);
    const amberStart = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].handoff.in;
    const amberEnd = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].clock.in;
    const morningStart = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].clock.in + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].clock.out - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].clock.in) * 0.5;
    const morningEnd = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].laptop.in + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].laptop.out - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].laptop.in) * 0.58;
    const resetStart = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].workTransition.in + (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].workTransition.out - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].workTransition.in) * 0.75;
    const resetDuration = Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].workTransition.out - resetStart, 0.001);
    const amber = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((cycleProgress - amberStart) / Math.max(amberEnd - amberStart, 0.001), 0, 1));
    const morning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((cycleProgress - morningStart) / Math.max(morningEnd - morningStart, 0.001), 0, 1));
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((cycleProgress - resetStart) / resetDuration, 0, 1));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute inset-0 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-1/2 top-[18%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full blur-[120px]",
                style: {
                    opacity: 0.18 + amber * 0.3 - reset * 0.18,
                    background: 'radial-gradient(circle, rgba(224,68,88,0.18) 0%, rgba(186,139,44,0.12) 32%, rgba(5,5,5,0) 72%)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-[15%] top-[56%] h-[24rem] w-[24rem] rounded-full blur-[100px]",
                style: {
                    opacity: 0.1 + amber * 0.16,
                    background: 'radial-gradient(circle, rgba(120,90,28,0.26) 0%, rgba(11,10,8,0) 72%)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 262,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-[12%] top-[50%] h-[34rem] w-[34rem] rounded-full blur-[120px]",
                style: {
                    opacity: morning * 0.55,
                    background: 'radial-gradient(circle, rgba(247,242,232,0.75) 0%, rgba(232,220,187,0.28) 38%, rgba(255,255,255,0) 74%)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-x-0 top-0 h-40",
                style: {
                    opacity: 0.6,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0))'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 278,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/CycleSection.tsx",
        lineNumber: 253,
        columnNumber: 5
    }, this);
}
_s1(CycleAtmosphere, "JizidJxoOJiNxxlQ5IQGSBXc6O4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"]
    ];
});
_c5 = CycleAtmosphere;
function StatementContent({ reducedMotion }) {
    _s2();
    const progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"])({
        "StatementContent.useScrollStore[progress]": (state)=>state.statementProgress
    }["StatementContent.useScrollStore[progress]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex h-full flex-col items-center justify-center px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(224,68,88,0.08),rgba(224,68,88,0)_38%)]"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 295,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "relative mb-7 font-mono text-xs uppercase tracking-[0.24em] text-text-tertiary",
                style: staggerStyle(progress, 0, 6, reducedMotion),
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_STATEMENT"].sectionLabel
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 296,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "relative max-w-4xl text-center font-heading text-[clamp(2.4rem,6vw,5.2rem)] font-bold italic leading-[0.96] text-text-primary text-balance",
                style: staggerStyle(progress, 0.06, 4.4, reducedMotion),
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_STATEMENT"].headline
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 302,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "relative mt-8 max-w-2xl text-center text-lg leading-relaxed text-text-secondary md:text-[1.25rem]",
                style: staggerStyle(progress, 0.24, 3.2, reducedMotion),
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_STATEMENT"].subline
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 308,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/CycleSection.tsx",
        lineNumber: 294,
        columnNumber: 5
    }, this);
}
_s2(StatementContent, "ZT2XrvCt0uZbSexmC4yYgur3G9o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"]
    ];
});
_c6 = StatementContent;
function HandoffContent({ reducedMotion, visitorCity, visitorTimeSequence }) {
    _s3();
    const progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"])({
        "HandoffContent.useScrollStore[progress]": (state)=>state.handoffProgress
    }["HandoffContent.useScrollStore[progress]"]);
    const flipT = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((progress - 0.12) / 0.76, 0, 1);
    const bkkTime = formatInterpolatedTime(interpolateTime(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BKK_TIME_SEQUENCE"], flipT));
    const visitorTime = formatInterpolatedTime(interpolateTime(visitorTimeSequence, flipT));
    const narrativeIndex = Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_HANDOFF_STEPS"].length - 1, Math.floor(progress * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_HANDOFF_STEPS"].length));
    const step = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_HANDOFF_STEPS"][narrativeIndex];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full flex-col items-center justify-center px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mb-5 font-mono text-xs uppercase tracking-[0.24em] text-accent/72",
                style: staggerStyle(progress, 0, 6, reducedMotion),
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_HANDOFF"].sectionLabel
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 341,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "max-w-3xl text-center font-heading text-[clamp(2rem,5vw,4.1rem)] font-bold italic leading-[0.98] text-text-primary text-balance",
                style: staggerStyle(progress, 0.05, 4.5, reducedMotion),
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_HANDOFF"].headline
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 347,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 text-center text-lg text-text-secondary md:text-xl",
                style: staggerStyle(progress, 0.16, 3.5, reducedMotion),
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_HANDOFF"].subline
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 353,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mt-10 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#12130f]/88 px-7 py-8 shadow-[0_30px_90px_rgba(0,0,0,0.34)]",
                        style: slideXStyle(progress, 0.16, 4, -38, reducedMotion),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(224,68,88,0.10),rgba(0,0,0,0)_52%)]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/CycleSection.tsx",
                                lineNumber: 365,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[11px] uppercase tracking-[0.28em] text-accent/78",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_HANDOFF"].bkkLabel
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                                        lineNumber: 367,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-8",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClockDigits, {
                                            timeLabel: bkkTime,
                                            accent: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/CycleSection.tsx",
                                            lineNumber: 371,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                                        lineNumber: 370,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-8 max-w-[18ch] text-lg leading-[1.45] text-text-primary/80",
                                        children: step.bkkStatus
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                                        lineNumber: 373,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 inline-flex items-center gap-3 rounded-full border border-accent/15 bg-accent/[0.08] px-4 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative flex size-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "relative inline-flex size-2 rounded-full bg-accent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sections/CycleSection.tsx",
                                                lineNumber: 377,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[10px] uppercase tracking-[0.2em] text-accent",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_HANDOFF"].bkkIndicator
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/CycleSection.tsx",
                                                lineNumber: 381,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                                        lineNumber: 376,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/CycleSection.tsx",
                                lineNumber: 366,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                        lineNumber: 361,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden items-center justify-center md:flex",
                        style: staggerStyle(progress, 0.24, 4, reducedMotion),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-20 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                                    lineNumber: 393,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-full border border-accent/20 bg-accent/[0.09] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-accent/78",
                                    children: "Handoff"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                                    lineNumber: 394,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-20 w-px bg-gradient-to-b from-transparent via-white/12 to-transparent"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                                    lineNumber: 397,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/CycleSection.tsx",
                            lineNumber: 392,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                        lineNumber: 388,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative overflow-hidden rounded-[2rem] border border-white/8 bg-[#101114]/88 px-7 py-8 shadow-[0_30px_90px_rgba(0,0,0,0.32)]",
                        style: slideXStyle(progress, 0.22, 4, 38, reducedMotion),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.05),rgba(0,0,0,0)_52%)]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/CycleSection.tsx",
                                lineNumber: 405,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[11px] uppercase tracking-[0.28em] text-text-primary/62",
                                        children: visitorCity || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_HANDOFF"].visitorLabel
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                                        lineNumber: 407,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-8",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClockDigits, {
                                            timeLabel: visitorTime
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/CycleSection.tsx",
                                            lineNumber: 411,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                                        lineNumber: 410,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-8 max-w-[18ch] text-lg leading-[1.45] text-text-primary/72",
                                        children: step.visitorStatus
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                                        lineNumber: 413,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 inline-flex items-center gap-3 rounded-full border border-white/8 bg-white/[0.04] px-4 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-flex size-2 rounded-full bg-white/22"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/CycleSection.tsx",
                                                lineNumber: 417,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[10px] uppercase tracking-[0.2em] text-text-primary/44",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_HANDOFF"].visitorIndicator
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/CycleSection.tsx",
                                                lineNumber: 418,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                                        lineNumber: 416,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/CycleSection.tsx",
                                lineNumber: 406,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                        lineNumber: 401,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 360,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/CycleSection.tsx",
        lineNumber: 340,
        columnNumber: 5
    }, this);
}
_s3(HandoffContent, "ZT2XrvCt0uZbSexmC4yYgur3G9o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"]
    ];
});
_c7 = HandoffContent;
function LogIntroContent({ reducedMotion }) {
    _s4();
    const progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"])({
        "LogIntroContent.useScrollStore[progress]": (state)=>state.logIntroProgress
    }["LogIntroContent.useScrollStore[progress]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full flex-col items-center justify-center px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-full border border-accent/18 bg-accent/[0.08] px-4 py-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-mono text-[11px] uppercase tracking-[0.22em] text-accent/82",
                    style: staggerStyle(progress, 0, 6, reducedMotion),
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_LOG_INTRO"].sectionLabel
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                    lineNumber: 435,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 434,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "mt-7 max-w-4xl text-center font-heading text-[clamp(2rem,5vw,4.2rem)] font-bold italic leading-[0.96] text-text-primary text-balance",
                style: staggerStyle(progress, 0.08, 4.2, reducedMotion),
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_LOG_INTRO"].headline
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 442,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-6 max-w-2xl text-center text-lg leading-relaxed text-text-secondary md:text-xl",
                style: staggerStyle(progress, 0.2, 3.4, reducedMotion),
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_LOG_INTRO"].subline
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 448,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-10 h-px w-full max-w-xl bg-gradient-to-r from-transparent via-accent/40 to-transparent",
                style: staggerStyle(progress, 0.28, 3.5, reducedMotion)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 454,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/CycleSection.tsx",
        lineNumber: 433,
        columnNumber: 5
    }, this);
}
_s4(LogIntroContent, "ZT2XrvCt0uZbSexmC4yYgur3G9o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"]
    ];
});
_c8 = LogIntroContent;
function PhoneContent({ reducedMotion }) {
    _s5();
    const progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"])({
        "PhoneContent.useScrollStore[progress]": (state)=>state.phoneProgress
    }["PhoneContent.useScrollStore[progress]"]);
    const yieldT = reducedMotion ? 0 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((progress - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].phone.glowYieldStart) / (1 - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].phone.glowYieldStart), 0, 1));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute inset-0 h-full w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pointer-events-none absolute inset-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-1/2 top-[48%] h-[50rem] w-[50rem] max-h-[88vh] max-w-[88vw] rounded-full bg-[radial-gradient(circle,rgba(224,68,88,0.12),rgba(155,108,30,0.18)_34%,rgba(10,9,7,0)_70%)] blur-[110px]",
                style: {
                    opacity: 1 - yieldT * 0.4,
                    transform: `translate(-50%, -50%) scale(${1 - yieldT * 0.035})`
                }
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 478,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/sections/CycleSection.tsx",
            lineNumber: 477,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/CycleSection.tsx",
        lineNumber: 476,
        columnNumber: 5
    }, this);
}
_s5(PhoneContent, "ZT2XrvCt0uZbSexmC4yYgur3G9o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"]
    ];
});
_c9 = PhoneContent;
function ClockContent({ reducedMotion }) {
    _s6();
    const progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"])({
        "ClockContent.useScrollStore[progress]": (state)=>state.clockProgress
    }["ClockContent.useScrollStore[progress]"]);
    const receiveIn = reducedMotion ? 1 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(progress / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].clock.receiveInEnd, 0, 1));
    const pillIn = reducedMotion ? 1 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((progress - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].clock.pillInStart) / (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].clock.pillInEnd - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].clock.pillInStart), 0, 1));
    const yieldT = reducedMotion ? 0 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((progress - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].clock.yieldStart) / (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].clock.yieldEnd - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].clock.yieldStart), 0, 1));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex h-full flex-col items-center justify-center px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute left-1/2 top-[48%] h-[46rem] w-[46rem] max-h-[82vh] max-w-[82vw] rounded-full bg-[radial-gradient(circle,rgba(240,233,210,0.4),rgba(224,68,88,0.12)_28%,rgba(15,11,6,0)_70%)] blur-[120px]",
                    style: {
                        opacity: (0.3 + receiveIn * 0.7) * (1 - yieldT * 0.4),
                        transform: `translate(-50%, -50%) scale(${0.94 + receiveIn * 0.06 - yieldT * 0.03})`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                    lineNumber: 519,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 518,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 rounded-full border border-[#83713c]/18 bg-[#efe6d4]/10 px-4 py-2",
                style: {
                    opacity: pillIn * (1 - yieldT * 0.35),
                    transform: reducedMotion ? 'translateX(-50%)' : `translateX(-50%) translateY(${(1 - pillIn) * 14}px)`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-mono text-[10px] uppercase tracking-[0.24em] text-[#DEB42E]",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_CLOCK"].lead
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                    lineNumber: 536,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 527,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/CycleSection.tsx",
        lineNumber: 517,
        columnNumber: 5
    }, this);
}
_s6(ClockContent, "ZT2XrvCt0uZbSexmC4yYgur3G9o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"]
    ];
});
_c10 = ClockContent;
function LaptopSequenceLayer({ canRender3D, reducedMotion, localizedEmails }) {
    _s7();
    const sequenceProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"])({
        "LaptopSequenceLayer.useScrollStore[sequenceProgress]": (state)=>state.laptopProgress
    }["LaptopSequenceLayer.useScrollStore[sequenceProgress]"]);
    const sequenceState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycleScreenState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLaptopSequenceState"])(sequenceProgress, localizedEmails.length, reducedMotion);
    const labelIn = reducedMotion ? 1 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((sequenceProgress - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].laptop.labelInStart) / (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].laptop.labelInEnd - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].laptop.labelInStart), 0, 1));
    const planeMatch = reducedMotion ? 0 : sequenceState.planeMatchProgress;
    const sceneFade = reducedMotion ? 1 : 0.14 + sequenceState.hardwareFade * 0.86;
    const panelOpacity = reducedMotion ? 0 : sequenceState.takeoverOpacity;
    const panelWidth = 54 + panelOpacity * 46;
    const panelHeight = 34 + panelOpacity * 66;
    const panelRadius = 26 - panelOpacity * 26;
    const panelY = 51 - panelOpacity * 1.5;
    const panelScale = 0.985 + panelOpacity * 0.015;
    const sceneScale = 1 - planeMatch * 0.008 - panelOpacity * 0.012;
    const sceneLift = planeMatch * -3 - panelOpacity * 10;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute left-1/2 top-[50%] h-[60rem] w-[60rem] max-h-[92vh] max-w-[92vw] rounded-full blur-[130px]",
                    style: {
                        background: 'radial-gradient(circle, rgba(255,244,232,0.52) 0%, rgba(226,96,110,0.18) 34%, rgba(255,255,255,0) 70%)',
                        opacity: (0.08 + labelIn * 0.34 + sequenceState.glowAmount * 0.22) * (1 - sequenceState.takeoverOpacity * 0.64),
                        transform: `translate(-50%, -50%) scale(${0.96 + labelIn * 0.04})`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                    lineNumber: 583,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 582,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    opacity: sceneFade,
                    transform: reducedMotion ? 'none' : `scale(${sceneScale}) translateY(${sceneLift}px)`
                },
                children: canRender3D ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SceneLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LaptopFallback"], {
                        emails: localizedEmails,
                        reducedMotion: reducedMotion
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                        lineNumber: 608,
                        columnNumber: 15
                    }, this),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LaptopScene, {
                        emails: localizedEmails,
                        reducedMotion: reducedMotion
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                        lineNumber: 611,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                    lineNumber: 606,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SceneLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LaptopFallback"], {
                    emails: localizedEmails,
                    reducedMotion: reducedMotion
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                    lineNumber: 614,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 596,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-1/2 overflow-hidden border border-white/8 shadow-[0_24px_80px_rgba(20,4,8,0.24)]",
                        style: {
                            opacity: panelOpacity,
                            width: `${panelWidth}%`,
                            height: `${panelHeight}%`,
                            top: `${panelY}%`,
                            background: 'radial-gradient(circle at 50% 24%, rgba(255,236,220,0.14) 0%, rgba(223,54,79,0.22) 20%, rgba(125,13,29,0.56) 52%, rgba(34,4,10,0.98) 100%)',
                            borderRadius: `${panelRadius}px`,
                            transform: `translate(-50%, -50%) scale(${panelScale})`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0",
                            style: {
                                background: 'linear-gradient(180deg, rgba(255,245,235,0.08), rgba(255,255,255,0.01) 18%, rgba(0,0,0,0) 34%, rgba(0,0,0,0.18) 100%)',
                                opacity: 0.48 - panelOpacity * 0.12
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/CycleSection.tsx",
                            lineNumber: 632,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                        lineNumber: 619,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-1/2 overflow-hidden rounded-[2rem] blur-[80px]",
                        style: {
                            opacity: panelOpacity * 0.7,
                            width: `${panelWidth * 0.94}%`,
                            height: `${panelHeight * 0.9}%`,
                            top: `${panelY}%`,
                            background: 'radial-gradient(circle at 50% 30%, rgba(255,240,228,0.12) 0%, rgba(229,74,97,0.18) 30%, rgba(148,20,37,0.08) 65%, rgba(0,0,0,0) 100%)',
                            transform: `translate(-50%, -50%) scale(${0.94 + panelOpacity * 0.08})`
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                        lineNumber: 641,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 618,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/CycleSection.tsx",
        lineNumber: 581,
        columnNumber: 5
    }, this);
}
_s7(LaptopSequenceLayer, "Y/QGwMIOYTASHr6N6nZSMnCNiM4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"]
    ];
});
_c11 = LaptopSequenceLayer;
function WorkTransitionContent({ reducedMotion, localizedEmails }) {
    _s8();
    const progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"])({
        "WorkTransitionContent.useScrollStore[progress]": (state)=>state.workTransitionProgress
    }["WorkTransitionContent.useScrollStore[progress]"]);
    const stackAlign = reducedMotion ? 1 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((progress - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].workTransition.stackAlignStart) / (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].workTransition.stackAlignEnd - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].workTransition.stackAlignStart), 0, 1));
    const cardMorph = reducedMotion ? 1 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((progress - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].workTransition.cardMorphStart) / (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].workTransition.cardMorphEnd - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].workTransition.cardMorphStart), 0, 1));
    const contentSwap = reducedMotion ? 1 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((progress - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].workTransition.contentSwapStart) / (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].workTransition.contentSwapEnd - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].workTransition.contentSwapStart), 0, 1));
    const titleFade = reducedMotion ? 1 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((progress - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].workTransition.titleFadeStart) / (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].workTransition.titleFadeEnd - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].workTransition.titleFadeStart), 0, 1));
    const studies = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CASE_STUDIES"].slice(0, 3);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex h-full flex-col items-center justify-center px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0",
                style: {
                    opacity: 0.88 - contentSwap * 0.72,
                    background: 'radial-gradient(circle at 50% 28%, rgba(255,231,208,0.18) 0%, rgba(190,59,73,0.18) 24%, rgba(97,17,29,0.28) 55%, rgba(0,0,0,0) 78%)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 714,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full max-w-[72rem]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-4",
                    children: studies.map((study, index)=>{
                        const email = localizedEmails[index] ?? localizedEmails[localizedEmails.length - 1];
                        const briefing = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAPTOP_BRIEFING_META"][index] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAPTOP_BRIEFING_META"][__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAPTOP_BRIEFING_META"].length - 1];
                        const stackedY = reducedMotion ? 0 : (1 - stackAlign) * (index * -34);
                        const width = 560 + cardMorph * 240;
                        const height = 92 + cardMorph * 102;
                        const border = contentSwap > 0.5 ? 'rgba(255,255,255,0.08)' : 'rgba(255,231,208,0.12)';
                        const bg = contentSwap > 0.5 ? 'rgba(12,12,13,0.82)' : 'rgba(91,22,34,0.58)';
                        const shadow = contentSwap > 0.5 ? '0_24px_90px_rgba(0,0,0,0.35)' : '0_18px_48px_rgba(54,8,16,0.26)';
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative w-full max-w-[50rem] overflow-hidden rounded-[2rem] px-6 py-5",
                            style: {
                                transform: `translateY(${stackedY}px) scale(${0.965 + cardMorph * 0.035})`,
                                width: `min(100%, ${width}px)`,
                                minHeight: `${height}px`,
                                border: `1px solid ${border}`,
                                background: bg,
                                boxShadow: shadow.replace(/_/g, ' '),
                                backdropFilter: 'blur(12px)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(224,68,88,0.12),rgba(0,0,0,0)_36%)]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                                    lineNumber: 757,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative flex h-full items-start justify-between gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "max-w-[36rem]",
                                            style: {
                                                opacity: 1 - contentSwap,
                                                transform: `translateY(${contentSwap * -10}px)`
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[#ffe2bc]/76",
                                                    children: `${briefing.section} • ${briefing.status}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                                                    lineNumber: 766,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "mt-3 font-heading text-[clamp(1.4rem,3vw,2.4rem)] font-bold leading-[0.95] text-[#fff4e8]",
                                                    children: email.subject
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                                                    lineNumber: 769,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-3 max-w-[34rem] text-sm leading-relaxed text-[#ffe7cf]/72 md:text-base",
                                                    children: email.preview
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                                                    lineNumber: 772,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/CycleSection.tsx",
                                            lineNumber: 759,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "max-w-[36rem]",
                                            style: {
                                                opacity: contentSwap,
                                                transform: `translateY(${(1 - contentSwap) * 12}px)`,
                                                position: contentSwap > 0 ? 'absolute' : 'static',
                                                inset: 0
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-mono text-[11px] uppercase tracking-[0.22em] text-accent/82",
                                                    children: `0${index + 1} • ${study.sector}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                                                    lineNumber: 785,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "mt-3 font-heading text-[clamp(1.4rem,3vw,2.5rem)] font-bold leading-[0.95] text-white",
                                                    children: study.title.replace('\n', ' ')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                                                    lineNumber: 788,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-3 max-w-[34rem] text-sm leading-relaxed text-white/64 md:text-base",
                                                    children: study.tagline
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                                                    lineNumber: 791,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/CycleSection.tsx",
                                            lineNumber: 776,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "shrink-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em]",
                                                    style: {
                                                        borderColor: contentSwap > 0.5 ? 'rgba(224,68,88,0.14)' : 'rgba(255,231,208,0.12)',
                                                        background: contentSwap > 0.5 ? 'rgba(224,68,88,0.08)' : 'rgba(255,255,255,0.06)',
                                                        color: contentSwap > 0.5 ? 'rgba(224,68,88,0.82)' : 'rgba(255,236,214,0.82)'
                                                    },
                                                    children: contentSwap > 0.5 ? study.number : briefing.priority
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                                                    lineNumber: 796,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-3 text-right font-mono text-[10px] uppercase tracking-[0.16em]",
                                                    style: {
                                                        opacity: 0.68,
                                                        color: contentSwap > 0.5 ? 'rgba(255,255,255,0.54)' : 'rgba(255,231,208,0.68)'
                                                    },
                                                    children: contentSwap > 0.5 ? study.shortOutcome : email.time
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                                                    lineNumber: 808,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/CycleSection.tsx",
                                            lineNumber: 795,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                                    lineNumber: 758,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, study.slug, true, {
                            fileName: "[project]/src/components/sections/CycleSection.tsx",
                            lineNumber: 744,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                    lineNumber: 723,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 722,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-12 text-center",
                style: {
                    opacity: titleFade,
                    transform: reducedMotion ? 'none' : `translateY(${(1 - titleFade) * 24}px)`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-xs uppercase tracking-[0.24em] text-text-tertiary",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_WORK_TRANSITION"].sectionLabel
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                        lineNumber: 832,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mt-4 font-heading text-[clamp(2.2rem,5vw,4.4rem)] font-bold leading-[0.96] text-text-primary",
                        children: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_WORK_TRANSITION"].headline,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/src/components/sections/CycleSection.tsx",
                                lineNumber: 837,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "italic text-text-primary/86",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_WORK_TRANSITION"].subline
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/CycleSection.tsx",
                                lineNumber: 838,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                        lineNumber: 835,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/CycleSection.tsx",
                lineNumber: 825,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/CycleSection.tsx",
        lineNumber: 713,
        columnNumber: 5
    }, this);
}
_s8(WorkTransitionContent, "ZT2XrvCt0uZbSexmC4yYgur3G9o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"]
    ];
});
_c12 = WorkTransitionContent;
function CycleSection() {
    _s9();
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cycleBgColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"])({
        "CycleSection.useScrollStore[cycleBgColor]": (state)=>state.cycleBgColor
    }["CycleSection.useScrollStore[cycleBgColor]"]);
    const { canRender3D } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useGPUCapability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGPUCapability"])();
    const reducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMediaQuery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const { visitorCity, visitorTZ } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLiveClock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveClock"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useScrollPhase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollPhase"])(sectionRef);
    const safeVisitorTZ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$viewerTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCycleVisitorTimeZone"])(visitorTZ || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$viewerTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_VISITOR_TZ"]);
    const safeVisitorCity = visitorCity && visitorTZ && visitorTZ !== 'Asia/Bangkok' ? visitorCity : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$viewerTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCycleVisitorCity"])(visitorTZ || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$viewerTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_VISITOR_TZ"]) || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$viewerTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_VISITOR_CITY"];
    const visitorTimeSequence = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CycleSection.useMemo[visitorTimeSequence]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$viewerTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVisitorTimeSequence"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BKK_TIME_SEQUENCE"], safeVisitorTZ)
    }["CycleSection.useMemo[visitorTimeSequence]"], [
        safeVisitorTZ
    ]);
    const localizedEmails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CycleSection.useMemo[localizedEmails]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$viewerTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localizeEmailEntries"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMAIL_ENTRIES"], safeVisitorTZ)
    }["CycleSection.useMemo[localizedEmails]"], [
        safeVisitorTZ
    ]);
    const shouldRenderPhone3D = canRender3D && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHONE_3D_APPROVED"];
    const laptopProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"])({
        "CycleSection.useScrollStore[laptopProgress]": (state)=>state.laptopProgress
    }["CycleSection.useScrollStore[laptopProgress]"]);
    const laptopReceiveIn = reducedMotion ? 1 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ease"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$easing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(laptopProgress / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CYCLE_MOTION"].laptop.labelInEnd, 0, 1));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        "data-cycle-section": true,
        className: "relative",
        id: "timeline",
        "aria-label": "The 24-Hour Cycle",
        "data-concierge-section": "timeline",
        "data-concierge-label": "The 24-Hour Cycle",
        style: {
            height: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCROLL_TRIGGER_DEFAULTS"].cycleScrollDistance * 100}vh`
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "sticky top-0 flex h-dvh items-center justify-center overflow-hidden",
            style: {
                backgroundColor: cycleBgColor,
                willChange: 'background-color'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CycleAtmosphere, {}, void 0, false, {
                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                    lineNumber: 888,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhaseLayer, {
                    phase: "statement",
                    reducedMotion: reducedMotion,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatementContent, {
                        reducedMotion: reducedMotion
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                        lineNumber: 891,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                    lineNumber: 890,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhaseLayer, {
                    phase: "handoff",
                    reducedMotion: reducedMotion,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HandoffContent, {
                        reducedMotion: reducedMotion,
                        visitorCity: safeVisitorCity,
                        visitorTimeSequence: visitorTimeSequence
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                        lineNumber: 895,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                    lineNumber: 894,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhaseLayer, {
                    phase: "logIntro",
                    reducedMotion: reducedMotion,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LogIntroContent, {
                        reducedMotion: reducedMotion
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                        lineNumber: 903,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                    lineNumber: 902,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhaseLayer, {
                    phase: "phone",
                    reducedMotion: reducedMotion,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhoneContent, {
                            reducedMotion: reducedMotion
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/CycleSection.tsx",
                            lineNumber: 907,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative z-10 h-full w-full",
                            children: shouldRenderPhone3D ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$PhoneStage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    reducedMotion: reducedMotion
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                                    lineNumber: 910,
                                    columnNumber: 40
                                }, this),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhoneScene, {
                                    reducedMotion: reducedMotion
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                                    lineNumber: 911,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/CycleSection.tsx",
                                lineNumber: 910,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$PhoneStage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                reducedMotion: reducedMotion
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/CycleSection.tsx",
                                lineNumber: 914,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/CycleSection.tsx",
                            lineNumber: 908,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                    lineNumber: 906,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhaseLayer, {
                    phase: "clock",
                    reducedMotion: reducedMotion,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClockContent, {
                            reducedMotion: reducedMotion
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/CycleSection.tsx",
                            lineNumber: 920,
                            columnNumber: 11
                        }, this),
                        canRender3D ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$ErrorBoundary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SceneLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClockFallback"], {
                                reducedMotion: reducedMotion
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/CycleSection.tsx",
                                lineNumber: 922,
                                columnNumber: 38
                            }, this),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClockScene, {
                                reducedMotion: reducedMotion
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/CycleSection.tsx",
                                lineNumber: 923,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/CycleSection.tsx",
                            lineNumber: 922,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SceneLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClockFallback"], {
                            reducedMotion: reducedMotion
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/CycleSection.tsx",
                            lineNumber: 926,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                    lineNumber: 919,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhaseLayer, {
                    phase: "laptop",
                    reducedMotion: reducedMotion,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 h-full w-full",
                        style: {
                            opacity: laptopReceiveIn,
                            transform: reducedMotion ? 'none' : `translateY(${(1 - laptopReceiveIn) * 22}px) scale(${0.982 + laptopReceiveIn * 0.018})`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LaptopSequenceLayer, {
                            canRender3D: canRender3D,
                            reducedMotion: reducedMotion,
                            localizedEmails: localizedEmails
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/CycleSection.tsx",
                            lineNumber: 940,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                        lineNumber: 931,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                    lineNumber: 930,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhaseLayer, {
                    phase: "workTransition",
                    reducedMotion: reducedMotion,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WorkTransitionContent, {
                        reducedMotion: reducedMotion,
                        localizedEmails: localizedEmails
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/CycleSection.tsx",
                        lineNumber: 949,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/CycleSection.tsx",
                    lineNumber: 948,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/sections/CycleSection.tsx",
            lineNumber: 884,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/CycleSection.tsx",
        lineNumber: 874,
        columnNumber: 5
    }, this);
}
_s9(CycleSection, "U5WxjK7DSJ84yeN8gVCU2UgGAQw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useGPUCapability$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGPUCapability"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMediaQuery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLiveClock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveClock"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useScrollPhase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollPhase"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"]
    ];
});
_c13 = CycleSection;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13;
__turbopack_context__.k.register(_c, "ClockScene");
__turbopack_context__.k.register(_c1, "PhoneScene");
__turbopack_context__.k.register(_c2, "LaptopScene");
__turbopack_context__.k.register(_c3, "PhaseLayer");
__turbopack_context__.k.register(_c4, "ClockDigits");
__turbopack_context__.k.register(_c5, "CycleAtmosphere");
__turbopack_context__.k.register(_c6, "StatementContent");
__turbopack_context__.k.register(_c7, "HandoffContent");
__turbopack_context__.k.register(_c8, "LogIntroContent");
__turbopack_context__.k.register(_c9, "PhoneContent");
__turbopack_context__.k.register(_c10, "ClockContent");
__turbopack_context__.k.register(_c11, "LaptopSequenceLayer");
__turbopack_context__.k.register(_c12, "WorkTransitionContent");
__turbopack_context__.k.register(_c13, "CycleSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/ScrollReveal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollReveal",
    ()=>ScrollReveal,
    "StaggerReveal",
    ()=>StaggerReveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
// ---------------------------------------------------------------------------
// Variant configs
// ---------------------------------------------------------------------------
const VARIANTS = {
    fadeUp: {
        y: 40,
        opacity: 0
    },
    fadeIn: {
        opacity: 0
    },
    scaleUp: {
        scale: 0.95,
        opacity: 0
    }
};
const VARIANT_TO = {
    fadeUp: {
        y: 0,
        opacity: 1
    },
    fadeIn: {
        opacity: 1
    },
    scaleUp: {
        scale: 1,
        opacity: 1
    }
};
function ScrollReveal({ children, variant = 'fadeUp', delay = 0, duration = 0.8, start = 'top 85%', className = '', as: Tag = 'div' }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrollReveal.useEffect": ()=>{
            const el = ref.current;
            if (!el) return;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(el, {
                    opacity: 1,
                    y: 0,
                    scale: 1
                });
                return;
            }
            const fromVars = VARIANTS[variant];
            const toVars = VARIANT_TO[variant];
            const tween = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(el, fromVars, {
                ...toVars,
                duration,
                delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start,
                    toggleActions: 'play none none none'
                }
            });
            return ({
                "ScrollReveal.useEffect": ()=>{
                    tween.scrollTrigger?.kill();
                    tween.kill();
                    // Reset to visible on cleanup so Strict Mode remount starts clean
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(el, {
                        opacity: 1,
                        y: 0,
                        scale: 1
                    });
                }
            })["ScrollReveal.useEffect"];
        }
    }["ScrollReveal.useEffect"], [
        variant,
        delay,
        duration,
        start
    ]);
    return(// @ts-expect-error -- dynamic tag element
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
        ref: ref,
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/ScrollReveal.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, this));
}
_s(ScrollReveal, "8uVE59eA/r6b92xF80p7sH8rXLk=");
_c = ScrollReveal;
function StaggerReveal({ children, stagger = 0.12, duration = 0.7, start = 'top 85%', className = '', as: Tag = 'div' }) {
    _s1();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StaggerReveal.useEffect": ()=>{
            const container = ref.current;
            if (!container) return;
            const items = container.querySelectorAll(':scope > *');
            if (!items.length) return;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(items, {
                    opacity: 1,
                    y: 0
                });
                return;
            }
            const tween = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(items, {
                y: 30,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration,
                stagger,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: container,
                    start,
                    toggleActions: 'play none none none'
                }
            });
            return ({
                "StaggerReveal.useEffect": ()=>{
                    tween.scrollTrigger?.kill();
                    tween.kill();
                    // Reset to visible on cleanup so Strict Mode remount starts clean
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(items, {
                        opacity: 1,
                        y: 0
                    });
                }
            })["StaggerReveal.useEffect"];
        }
    }["StaggerReveal.useEffect"], [
        stagger,
        duration,
        start
    ]);
    return(// @ts-expect-error -- dynamic tag element
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
        ref: ref,
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/ScrollReveal.tsx",
        lineNumber: 187,
        columnNumber: 5
    }, this));
}
_s1(StaggerReveal, "8uVE59eA/r6b92xF80p7sH8rXLk=");
_c1 = StaggerReveal;
var _c, _c1;
__turbopack_context__.k.register(_c, "ScrollReveal");
__turbopack_context__.k.register(_c1, "StaggerReveal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useScrambleOnView.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useScrambleOnView",
    ()=>useScrambleOnView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function seededRandom(seed) {
    let s = seed;
    return ()=>{
        s = s * 1664525 + 1013904223 & 0xffffffff;
        return (s >>> 0) / 0xffffffff;
    };
}
function useScrambleOnView() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useScrambleOnView.useEffect": ()=>{
            const el = ref.current;
            if (!el) return;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            const finalText = el.textContent || '';
            let hasScrambled = false;
            const observer = new IntersectionObserver({
                "useScrambleOnView.useEffect": (entries)=>{
                    entries.forEach({
                        "useScrambleOnView.useEffect": (entry)=>{
                            if (entry.isIntersecting && !hasScrambled) {
                                hasScrambled = true;
                                scrambleText(el, finalText, 400);
                            }
                        }
                    }["useScrambleOnView.useEffect"]);
                }
            }["useScrambleOnView.useEffect"], {
                threshold: 0.2
            });
            observer.observe(el);
            return ({
                "useScrambleOnView.useEffect": ()=>observer.disconnect()
            })["useScrambleOnView.useEffect"];
        }
    }["useScrambleOnView.useEffect"], []);
    return ref;
}
_s(useScrambleOnView, "8uVE59eA/r6b92xF80p7sH8rXLk=");
function scrambleText(element, finalText, duration) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const seed = finalText.split('').reduce((acc, c)=>acc + c.charCodeAt(0), 0);
    const rng = seededRandom(seed);
    const totalFrames = Math.ceil(duration / 30);
    let frame = 0;
    function update() {
        let output = '';
        for(let i = 0; i < finalText.length; i++){
            if (finalText[i] === ' ') {
                output += ' ';
            } else if (frame / totalFrames > i / finalText.length) {
                output += finalText[i];
            } else {
                output += chars[Math.floor(rng() * chars.length)];
            }
        }
        element.textContent = output;
        frame++;
        if (frame <= totalFrames) {
            requestAnimationFrame(update);
        } else {
            element.textContent = finalText;
        }
    }
    update();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/ScrambleLabel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScrambleLabel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useScrambleOnView$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useScrambleOnView.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
function ScrambleLabel({ children, className }) {
    _s();
    const scrambleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useScrambleOnView$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrambleOnView"])();
    const wrapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Slide-in from left (matches v21 section label animation)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrambleLabel.useEffect": ()=>{
            const el = wrapRef.current;
            if (!el) return;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(el, {
                    opacity: 1,
                    x: 0
                });
                return;
            }
            const tween = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(el, {
                opacity: 0,
                x: -40
            }, {
                opacity: 1,
                x: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none reverse'
                }
            });
            return ({
                "ScrambleLabel.useEffect": ()=>{
                    tween.scrollTrigger?.kill();
                    tween.kill();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(el, {
                        opacity: 1,
                        x: 0
                    });
                }
            })["ScrambleLabel.useEffect"];
        }
    }["ScrambleLabel.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: wrapRef,
        className: className,
        "aria-label": children,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            ref: scrambleRef,
            "aria-hidden": "true",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/ui/ScrambleLabel.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/ScrambleLabel.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(ScrambleLabel, "+biy8kk976Al+yE1W+2Db20ZjzI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useScrambleOnView$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrambleOnView"]
    ];
});
_c = ScrambleLabel;
var _c;
__turbopack_context__.k.register(_c, "ScrambleLabel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/StatCounter.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StatCounter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
/**
 * Parse a stat value string like "3.75B", "$750M", "13+", "98%", "381"
 * into numeric target + prefix + suffix for animated counting.
 */ function parseStat(value) {
    const match = value.match(/^([^0-9]*?)([\d,.]+)(.*)$/);
    if (!match) return {
        target: 0,
        prefix: '',
        suffix: value,
        decimals: 0
    };
    const prefix = match[1];
    const numStr = match[2].replace(/,/g, '');
    const target = parseFloat(numStr);
    const suffix = match[3];
    const decimalIdx = numStr.indexOf('.');
    const decimals = decimalIdx >= 0 ? numStr.length - decimalIdx - 1 : 0;
    return {
        target,
        prefix,
        suffix,
        decimals
    };
}
function StatCounter({ value, className }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [display, setDisplay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('\u2014');
    const hasAnimated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StatCounter.useEffect": ()=>{
            const el = ref.current;
            if (!el) return;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                setDisplay(value);
                return;
            }
            const observer = new IntersectionObserver({
                "StatCounter.useEffect": (entries)=>{
                    entries.forEach({
                        "StatCounter.useEffect": (entry)=>{
                            if (entry.isIntersecting && !hasAnimated.current) {
                                hasAnimated.current = true;
                                animateCount();
                            }
                        }
                    }["StatCounter.useEffect"]);
                }
            }["StatCounter.useEffect"], {
                threshold: 0.3
            });
            observer.observe(el);
            return ({
                "StatCounter.useEffect": ()=>observer.disconnect()
            })["StatCounter.useEffect"];
        }
    }["StatCounter.useEffect"], [
        value
    ]);
    function animateCount() {
        const { target, prefix, suffix, decimals } = parseStat(value);
        const duration = 2000;
        const start = performance.now();
        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            if (decimals > 0) {
                setDisplay(prefix + current.toFixed(decimals) + suffix);
            } else {
                setDisplay(prefix + Math.round(current).toLocaleString() + suffix);
            }
            if (progress < 1) requestAnimationFrame(step);
            else setDisplay(value); // Ensure exact final value
        }
        requestAnimationFrame(step);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: className,
        children: display
    }, void 0, false, {
        fileName: "[project]/src/components/ui/StatCounter.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
_s(StatCounter, "QyhZUf66MqQYhLvUulWiJM5cFsg=");
_c = StatCounter;
var _c;
__turbopack_context__.k.register(_c, "StatCounter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/WorkPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorkPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$StatCounter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/StatCounter.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
function WorkPanel({ panel }) {
    _s();
    const panelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pillRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Lazy video play — only play when panel is in viewport
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkPanel.useEffect": ()=>{
            const video = videoRef.current;
            if (!video) return;
            video.pause();
            const obs = new IntersectionObserver({
                "WorkPanel.useEffect": (entries)=>{
                    entries.forEach({
                        "WorkPanel.useEffect": (e)=>{
                            if (e.isIntersecting) video.play().catch({
                                "WorkPanel.useEffect": ()=>{}
                            }["WorkPanel.useEffect"]);
                            else video.pause();
                        }
                    }["WorkPanel.useEffect"]);
                }
            }["WorkPanel.useEffect"], {
                threshold: 0.15
            });
            obs.observe(video);
            return ({
                "WorkPanel.useEffect": ()=>obs.disconnect()
            })["WorkPanel.useEffect"];
        }
    }["WorkPanel.useEffect"], []);
    // GSAP scroll-driven animations
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkPanel.useEffect": ()=>{
            const el = panelRef.current;
            if (!el) return;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) return;
            const video = el.querySelector('[data-work-video]');
            const wrap = el.querySelector('[data-work-wrap]');
            const tweens = [];
            // Video wrapper parallax
            if (wrap) {
                tweens.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(wrap, {
                    y: '-4%'
                }, {
                    y: '4%',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }));
            }
            // Video slow zoom
            if (video) {
                tweens.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(video, {
                    scale: 1.02
                }, {
                    scale: 1.12,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }));
            }
            // Content staggered reveal
            const elements = el.querySelectorAll('[data-work-reveal]');
            elements.forEach({
                "WorkPanel.useEffect": (child, i)=>{
                    tweens.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(child, {
                        opacity: 0,
                        y: 30 + i * 5
                    }, {
                        opacity: child.getAttribute('data-work-reveal') === 'number' ? 0.6 : 1,
                        y: 0,
                        duration: 0.7,
                        ease: 'power3.out',
                        delay: i * 0.08,
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 55%',
                            toggleActions: 'play none none reverse'
                        }
                    }));
                }
            }["WorkPanel.useEffect"]);
            return ({
                "WorkPanel.useEffect": ()=>{
                    tweens.forEach({
                        "WorkPanel.useEffect": (t)=>{
                            t.scrollTrigger?.kill();
                            t.kill();
                        }
                    }["WorkPanel.useEffect"]);
                }
            })["WorkPanel.useEffect"];
        }
    }["WorkPanel.useEffect"], []);
    // Cursor pill position handler — direct DOM mutation to avoid re-renders
    function handleMouseMove(e) {
        const rect = panelRef.current?.getBoundingClientRect();
        if (!rect || !pillRef.current) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        pillRef.current.style.left = `${x}px`;
        pillRef.current.style.top = `${y}px`;
    }
    function handleMouseEnter() {
        if (!pillRef.current) return;
        pillRef.current.style.opacity = '1';
        pillRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
    }
    function handleMouseLeave() {
        if (!pillRef.current) return;
        pillRef.current.style.opacity = '0';
        pillRef.current.style.transform = 'translate(-50%, -50%) scale(0.5)';
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        ref: panelRef,
        href: panel.href,
        target: "_blank",
        rel: "noopener noreferrer",
        "data-work-panel": true,
        "data-work-panel-id": panel.id,
        "data-work-panel-title": panel.title.replace(/\n/g, ' '),
        "data-work-panel-sector": panel.sector,
        "data-concierge-section": "work-panel",
        "data-concierge-label": panel.title.replace(/\n/g, ' '),
        className: "group relative flex min-h-[100svh] w-full items-end overflow-hidden supports-[min-height:100dvh]:min-h-dvh md:cursor-none",
        onMouseMove: handleMouseMove,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        "aria-label": `View ${panel.title.replace('\n', ' ')} case study`,
        children: [
            panel.videoSrc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-work-wrap": true,
                className: "absolute inset-0 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                    ref: videoRef,
                    "data-work-video": true,
                    src: panel.videoSrc,
                    muted: true,
                    loop: true,
                    playsInline: true,
                    preload: "metadata",
                    className: "size-full object-cover"
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/WorkPanel.tsx",
                    lineNumber: 166,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/WorkPanel.tsx",
                lineNumber: 165,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/WorkPanel.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 flex w-full flex-col gap-8 p-8 pb-16 md:flex-row md:items-end md:gap-16 md:p-12 lg:p-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "data-work-reveal": "number",
                                className: "font-mono text-xs uppercase tracking-[0.2em] text-white/70",
                                children: panel.number
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/WorkPanel.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                "data-work-reveal": "title",
                                className: "mt-4 font-heading text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] text-white text-balance",
                                children: panel.title.split('\n').map((line, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/components/sections/WorkPanel.tsx",
                                                lineNumber: 199,
                                                columnNumber: 27
                                            }, this),
                                            line
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/sections/WorkPanel.tsx",
                                        lineNumber: 198,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/WorkPanel.tsx",
                                lineNumber: 193,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                "data-work-reveal": "tagline",
                                className: "mt-4 text-lg text-white/80 md:text-xl",
                                children: panel.tagline
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/WorkPanel.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                "data-work-reveal": "desc",
                                className: "mt-4 max-w-lg text-sm leading-relaxed text-white/70 md:text-base",
                                children: panel.description
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/WorkPanel.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-work-reveal": "tags",
                                className: "mt-6 flex flex-wrap gap-2",
                                children: panel.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full border border-white/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.1em] text-white/70",
                                        children: tag
                                    }, tag, false, {
                                        fileName: "[project]/src/components/sections/WorkPanel.tsx",
                                        lineNumber: 224,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/WorkPanel.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/WorkPanel.tsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-work-reveal": "stats",
                        className: "flex shrink-0 flex-col gap-6 md:min-w-[160px] md:items-end",
                        children: panel.stats.map((stat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$StatCounter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        value: stat.value,
                                        className: "font-heading text-3xl font-bold tabular-nums text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] md:text-4xl"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/WorkPanel.tsx",
                                        lineNumber: 241,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1 font-mono text-xs uppercase tracking-[0.15em] text-white/70",
                                        children: stat.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/WorkPanel.tsx",
                                        lineNumber: 245,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, stat.label, true, {
                                fileName: "[project]/src/components/sections/WorkPanel.tsx",
                                lineNumber: 240,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/WorkPanel.tsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/WorkPanel.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: pillRef,
                className: "pointer-events-none absolute z-20 rounded-full bg-white/90 px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.1em] text-black transition-[transform,opacity] duration-150",
                style: {
                    left: 0,
                    top: 0,
                    transform: 'translate(-50%, -50%) scale(0.5)',
                    opacity: 0
                },
                children: "Open Case Study"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/WorkPanel.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-8 right-8 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-5 py-3 font-mono text-xs uppercase tracking-[0.1em] text-white/80 backdrop-blur-sm transition-all duration-300 group-hover:border-white/30 group-hover:bg-black/60 group-hover:text-white md:bottom-12 md:right-12",
                children: [
                    "Open Case Study",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "size-3.5",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M7 17L17 7"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/WorkPanel.tsx",
                                lineNumber: 271,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M7 7h10v10"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/WorkPanel.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/WorkPanel.tsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/WorkPanel.tsx",
                lineNumber: 268,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/WorkPanel.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
_s(WorkPanel, "I76+39G+hQXRc4kv6+HuypNJrgQ=");
_c = WorkPanel;
var _c;
__turbopack_context__.k.register(_c, "WorkPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/Testimonial.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Testimonial
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
function Testimonial({ testimonial }) {
    _s();
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Testimonial.useEffect": ()=>{
            const el = sectionRef.current;
            if (!el) return;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const quote = el.querySelector('[data-quote]');
            const attr = el.querySelector('[data-attr]');
            const targets = [
                quote,
                attr
            ].filter(Boolean);
            if (prefersReducedMotion) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(targets, {
                    opacity: 1,
                    y: 0
                });
                return;
            }
            const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(targets, {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
            // Parallax drift — quote moves slower than scroll
            let parallaxTween = null;
            if (quote && !prefersReducedMotion) {
                parallaxTween = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(quote, {
                    yPercent: 5
                }, {
                    yPercent: -5,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            }
            return ({
                "Testimonial.useEffect": ()=>{
                    if (Array.isArray(tl)) {
                        tl.forEach({
                            "Testimonial.useEffect": (t)=>{
                                t.scrollTrigger?.kill();
                                t.kill();
                            }
                        }["Testimonial.useEffect"]);
                    } else {
                        tl.scrollTrigger?.kill();
                        tl.kill();
                    }
                    if (parallaxTween) {
                        parallaxTween.scrollTrigger?.kill();
                        parallaxTween.kill();
                    }
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(targets, {
                        opacity: 1,
                        y: 0
                    });
                }
            })["Testimonial.useEffect"];
        }
    }["Testimonial.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        className: "border-y border-border-subtle bg-bg-deep px-6 py-24 md:py-32",
        "aria-label": "Testimonial",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-4xl text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 font-heading text-8xl leading-none text-accent/40",
                    "aria-hidden": "true",
                    children: "“"
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/Testimonial.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                    "data-quote": true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-heading text-[clamp(1.25rem,3vw,2rem)] font-medium italic leading-relaxed text-text-primary",
                        children: testimonial.quote
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/Testimonial.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/Testimonial.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "data-attr": true,
                    className: "mt-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono text-sm text-text-secondary",
                            children: testimonial.attribution
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/Testimonial.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "mx-2 text-text-tertiary",
                            children: "/"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/Testimonial.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono text-sm text-text-tertiary",
                            children: testimonial.company
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/Testimonial.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/Testimonial.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/sections/Testimonial.tsx",
            lineNumber: 109,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/Testimonial.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_s(Testimonial, "O9MYfDkQexHh+zrn37J6HLSAdf8=");
_c = Testimonial;
var _c;
__turbopack_context__.k.register(_c, "Testimonial");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/AdvantageSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdvantageSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/content.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ScrambleLabel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/ScrambleLabel.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
function AdvantageSection() {
    _s();
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdvantageSection.useEffect": ()=>{
            const el = sectionRef.current;
            if (!el) return;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const tweens = [];
            // Word-by-word H2 clip reveal
            const h2Words = el.querySelectorAll('.adv-word-inner');
            if (h2Words.length) {
                if (prefersReducedMotion) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(h2Words, {
                        y: '0%'
                    });
                } else {
                    tweens.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(h2Words, {
                        y: '100%'
                    }, {
                        y: '0%',
                        duration: 0.8,
                        stagger: 0.04,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: el.querySelector('h2'),
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }));
                }
            }
            // Paragraphs stagger fade-up
            const paragraphs = el.querySelectorAll('[data-adv-para]');
            if (paragraphs.length && !prefersReducedMotion) {
                tweens.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(paragraphs, {
                    opacity: 0,
                    y: 30
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el.querySelector('[data-adv-left]'),
                        start: 'top 70%',
                        toggleActions: 'play none none reverse'
                    }
                }));
            }
            // Awards fade up
            const awards = el.querySelector('[data-adv-awards]');
            if (awards && !prefersReducedMotion) {
                tweens.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(awards, {
                    opacity: 0,
                    y: 20
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: awards,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse'
                    }
                }));
            }
            // Items slide from right with icon scale bounce
            const items = el.querySelectorAll('[data-adv-item]');
            items.forEach({
                "AdvantageSection.useEffect": (item, i)=>{
                    if (prefersReducedMotion) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(item, {
                            opacity: 1,
                            x: 0
                        });
                        return;
                    }
                    tweens.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(item, {
                        opacity: 0,
                        x: 60
                    }, {
                        opacity: 1,
                        x: 0,
                        duration: 0.7,
                        delay: i * 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        },
                        onStart: {
                            "AdvantageSection.useEffect": ()=>{
                                const icon = item.querySelector('[data-adv-icon]');
                                if (icon) {
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(icon, {
                                        scale: 1.6
                                    }, {
                                        scale: 1,
                                        duration: 0.5,
                                        ease: 'back.out(2)'
                                    });
                                }
                            }
                        }["AdvantageSection.useEffect"]
                    }));
                }
            }["AdvantageSection.useEffect"]);
            // Parallax — left column drifts slower than right
            const leftCol = el.querySelector('[data-adv-left]');
            const rightCol = el.querySelector('[data-adv-right]');
            if (leftCol && rightCol && !prefersReducedMotion) {
                tweens.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(leftCol, {
                    yPercent: 3
                }, {
                    yPercent: -3,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }));
                tweens.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(rightCol, {
                    yPercent: -2
                }, {
                    yPercent: 2,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }));
            }
            return ({
                "AdvantageSection.useEffect": ()=>{
                    tweens.forEach({
                        "AdvantageSection.useEffect": (t)=>{
                            t.scrollTrigger?.kill();
                            t.kill();
                        }
                    }["AdvantageSection.useEffect"]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set([
                        ...Array.from(h2Words),
                        ...Array.from(paragraphs),
                        awards,
                        ...Array.from(items)
                    ].filter(Boolean), {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        scale: 1
                    });
                }
            })["AdvantageSection.useEffect"];
        }
    }["AdvantageSection.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        className: "relative bg-bg-deep py-32 md:py-48",
        id: "advantage",
        "aria-label": "The Advantage",
        "data-concierge-section": "advantage",
        "data-concierge-label": "The Advantage",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-[1200px] px-6 md:px-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-adv-left": true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ScrambleLabel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "mb-4 block font-mono text-xs uppercase tracking-[0.2em] text-accent",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ADVANTAGE"].sectionLabel
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-heading text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight text-text-primary text-balance",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ADVANTAGE"].headline.split(/\s+/).map((word, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-block overflow-hidden align-top",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "adv-word-inner inline-block",
                                                    children: word
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                                lineNumber: 188,
                                                columnNumber: 19
                                            }, this),
                                            ' '
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                        lineNumber: 187,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                lineNumber: 185,
                                columnNumber: 13
                            }, this),
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ADVANTAGE"].paragraphs.map((paragraph, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    "data-adv-para": true,
                                    className: "mt-6 text-base leading-relaxed text-text-secondary",
                                    children: paragraph
                                }, i, false, {
                                    fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                    lineNumber: 196,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-adv-awards": true,
                                className: "mt-10 flex flex-wrap gap-4",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ADVANTAGE"].awards.map((award)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 rounded-full border border-border-subtle px-4 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "size-4 text-accent-secondary",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "1.5",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                "aria-hidden": "true",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                                        lineNumber: 213,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                                        lineNumber: 214,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M4 22h16"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                                        lineNumber: 215,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                                        lineNumber: 216,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                                        lineNumber: 217,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M18 2H6v7a6 6 0 0 0 12 0V2Z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                                        lineNumber: 218,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                                lineNumber: 212,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-xs uppercase tracking-[0.1em] text-text-secondary",
                                                children: award
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                                lineNumber: 220,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, award, true, {
                                        fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                        lineNumber: 208,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                lineNumber: 206,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-12",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAL_COM_URL"],
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-heading text-base font-semibold text-text-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(224,68,88,0.25)] hover:scale-[1.02] active:scale-[0.98] active:duration-100",
                                    children: "Book a Strategy Call"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                    lineNumber: 228,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                lineNumber: 227,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                        lineNumber: 179,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-adv-right": true,
                        className: "flex flex-col gap-10",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ADVANTAGE_ITEMS"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-adv-item": true,
                                className: "flex gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        "data-adv-icon": true,
                                        className: "shrink-0 font-mono text-sm text-accent/60",
                                        children: [
                                            "+",
                                            item.number
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                        lineNumber: 243,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-heading text-lg font-semibold text-text-primary",
                                                children: item.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                                lineNumber: 250,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-sm leading-relaxed text-text-secondary",
                                                children: item.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                                lineNumber: 253,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                        lineNumber: 249,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, item.number, true, {
                                fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                                lineNumber: 242,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                        lineNumber: 240,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/AdvantageSection.tsx",
                lineNumber: 177,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/sections/AdvantageSection.tsx",
            lineNumber: 176,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/AdvantageSection.tsx",
        lineNumber: 168,
        columnNumber: 5
    }, this);
}
_s(AdvantageSection, "O9MYfDkQexHh+zrn37J6HLSAdf8=");
_c = AdvantageSection;
var _c;
__turbopack_context__.k.register(_c, "AdvantageSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/ContactSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ContactSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/content.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ScrollReveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/ScrollReveal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ScrambleLabel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/ScrambleLabel.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
function ContactSection() {
    _s();
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContactSection.useEffect": ()=>{
            const el = sectionRef.current;
            if (!el) return;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const grid = el.querySelector('[data-contact-grid]');
            let parallaxTween = null;
            if (grid && !prefersReducedMotion) {
                parallaxTween = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(grid, {
                    yPercent: 4
                }, {
                    yPercent: -2,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            }
            return ({
                "ContactSection.useEffect": ()=>{
                    if (parallaxTween) {
                        parallaxTween.scrollTrigger?.kill();
                        parallaxTween.kill();
                    }
                }
            })["ContactSection.useEffect"];
        }
    }["ContactSection.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        className: "relative bg-bg-deep py-32 md:py-48",
        id: "contact",
        "aria-label": "Contact",
        "data-concierge-section": "contact",
        "data-concierge-label": "Contact",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-[1200px] px-6 md:px-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ScrollReveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollReveal"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ScrambleLabel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            className: "mb-4 block font-mono text-xs uppercase tracking-[0.2em] text-accent",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT"].sectionLabel
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "max-w-3xl font-heading text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight text-text-primary text-balance",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT"].headline
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-6 max-w-2xl text-base leading-relaxed text-text-secondary",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT"].subline
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/ContactSection.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "data-contact-grid": true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ScrollReveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StaggerReveal"], {
                        className: "mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
                        stagger: 0.1,
                        start: "top 80%",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT_DETAILS"].map((detail)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg border border-border-subtle bg-bg-card p-6 transition-[transform,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-border-accent",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary",
                                        children: detail.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/ContactSection.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 font-heading text-base font-semibold text-text-primary",
                                        children: detail.value
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/ContactSection.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-sm text-text-secondary",
                                        children: detail.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/ContactSection.tsx",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, detail.label, true, {
                                fileName: "[project]/src/components/sections/ContactSection.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/ContactSection.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/ContactSection.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ScrollReveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollReveal"], {
                    className: "mt-12",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAL_COM_URL"],
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-heading text-base font-semibold text-text-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(224,68,88,0.25)] hover:scale-[1.02] active:scale-[0.98] active:duration-100",
                                children: "Schedule a Conversation"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/ContactSection.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT"].email}`,
                                    className: "text-sm text-text-secondary transition-colors hover:text-accent",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT"].email
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/ContactSection.tsx",
                                    lineNumber: 114,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/ContactSection.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/ContactSection.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/ContactSection.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/sections/ContactSection.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/ContactSection.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(ContactSection, "O9MYfDkQexHh+zrn37J6HLSAdf8=");
_c = ContactSection;
var _c;
__turbopack_context__.k.register(_c, "ContactSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0if3fxy._.js.map