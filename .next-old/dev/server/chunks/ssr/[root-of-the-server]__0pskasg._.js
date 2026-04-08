module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/hooks/useLenis.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLenis",
    ()=>useLenis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lenis/dist/lenis.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
function useLenis() {
    const lenisRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;
        const lenis = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]({
            duration: 1.0,
            easing: (t)=>Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2
        });
        lenisRef.current = lenis;
        // Sync Lenis scroll position with GSAP ScrollTrigger
        lenis.on('scroll', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"].update);
        // Drive Lenis from GSAP's unified ticker
        const tickerCallback = (time)=>{
            lenis.raf(time * 1000);
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].ticker.add(tickerCallback);
        // Disable GSAP lag smoothing so scroll feels instantaneous
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].ticker.lagSmoothing(0);
        return ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].ticker.remove(tickerCallback);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);
    return lenisRef;
}
}),
"[project]/src/components/layout/LenisProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LenisProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLenis$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useLenis.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function LenisProvider({ children }) {
    const lenisRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLenis$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLenis"])();
    // Gentle WorkPanel-only snap: after user stops scrolling near a panel edge,
    // nudge to the nearest panel top. Direction-aware, CycleSection-exempt.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;
        let isSnapping = false;
        let snapTimer = null;
        let lastScrollY = window.scrollY;
        let scrollDirection = 'down';
        function trackDirection() {
            const currentY = window.scrollY;
            if (currentY > lastScrollY + 2) scrollDirection = 'down';
            else if (currentY < lastScrollY - 2) scrollDirection = 'up';
            lastScrollY = currentY;
        }
        function isInsideCycleSection() {
            const cycle = document.querySelector('[data-cycle-section]');
            if (!cycle) return false;
            const rect = cycle.getBoundingClientRect();
            const vh = window.innerHeight;
            // Inside if the cycle section spans the viewport
            return rect.top < vh * 0.5 && rect.bottom > vh * 0.5;
        }
        function attemptSnap() {
            if (isSnapping || !lenisRef.current) return;
            // Don't snap inside the CycleSection scroll-driven area
            if (isInsideCycleSection()) return;
            const vh = window.innerHeight;
            const panels = Array.from(document.querySelectorAll('[data-work-panel]'));
            if (!panels.length) return;
            // Find the panel whose top edge is closest to viewport top,
            // but only if it's within 15% of viewport height (the "snap zone")
            const snapZone = vh * 0.15;
            let bestPanel = null;
            let bestDist = Infinity;
            for (const panel of panels){
                const top = panel.getBoundingClientRect().top;
                // Only consider panels in the snap zone
                if (Math.abs(top) > snapZone) continue;
                // Respect scroll direction: don't snap backwards
                if (scrollDirection === 'down' && top > 5) continue;
                if (scrollDirection === 'up' && top < -5) continue;
                const dist = Math.abs(top);
                if (dist < bestDist) {
                    bestDist = dist;
                    bestPanel = panel;
                }
            }
            if (bestPanel && bestDist > 3) {
                isSnapping = true;
                lenisRef.current.scrollTo(bestPanel, {
                    duration: 0.4
                });
                setTimeout(()=>{
                    isSnapping = false;
                }, 450);
            }
        }
        function clearSnap() {
            if (snapTimer) {
                clearTimeout(snapTimer);
                snapTimer = null;
            }
        }
        function scheduleSnap(delay) {
            clearSnap();
            snapTimer = setTimeout(attemptSnap, delay);
        }
        function onWheel() {
            trackDirection();
            clearSnap();
            // 150ms to detect wheel stop, then 150ms before snap = 300ms total
            snapTimer = setTimeout(()=>{
                scheduleSnap(150);
            }, 150);
        }
        function onTouchStart() {
            trackDirection();
            clearSnap();
        }
        function onTouchEnd() {
            clearSnap();
            // Slightly longer grace for touch momentum
            snapTimer = setTimeout(()=>{
                scheduleSnap(200);
            }, 250);
        }
        window.addEventListener('wheel', onWheel, {
            passive: true
        });
        window.addEventListener('touchstart', onTouchStart, {
            passive: true
        });
        window.addEventListener('touchend', onTouchEnd, {
            passive: true
        });
        return ()=>{
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchend', onTouchEnd);
            clearSnap();
        };
    }, [
        lenisRef
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),
"[project]/src/components/layout/Loader.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
});
}),
"[project]/src/components/layout/Loader.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Loader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/layout/Loader.module.css [app-ssr] (css module)");
'use client';
;
;
;
/* ── SVG path data (shared with LogoIcon) ── */ const PATH_1 = 'M140.3,73.5c3.39,6.2,6.56,12.07,9.79,18,16.41,30.29,32.76,60.58,49.17,90.81.62,1.12,1.36,2.19,2.21,3.1,4.47,4.86,11.6,3.9,14.32-2.03.62-1.33,1.02-2.94,1.02-4.43.05-17.31.05-34.67,0-51.98,0-6.62-4.3-10.68-11.32-10.68-9.28-.05-18.61,0-27.89,0h-4.41s-6.45-11-11.49-21.26h45.49c17.31.05,30.95,11.59,32.99,27.89.11,1.12.28,2.29.28,3.42,0,17.73.17,35.42-.06,53.15-.11,9.88-4.24,18.22-12.56,24.41-13.64,10.15-34.57,7.69-44.93-5.13-.96-1.17-1.76-2.4-2.49-3.74-17.37-31.95-34.69-63.89-52.05-95.78-.91-1.6-.96-2.78,0-4.43,3.96-6.95,7.81-14,11.94-21.32';
const PATH_2 = 'M159.7,226.5c-3.39-6.2-6.56-12.07-9.79-18-16.41-30.29-32.76-60.58-49.17-90.81-.56-1.12-1.36-2.19-2.21-3.1-4.47-4.86-11.6-3.9-14.32,2.03-.62,1.33-1.02,2.94-1.02,4.43-.05,17.31-.05,34.67,0,51.98,0,6.62,4.3,10.68,11.32,10.68,9.28.05,18.61,0,27.89,0h4.41s6.45,11,11.49,21.26h-45.49c-17.31-.05-30.95-11.59-32.99-27.89-.11-1.12-.28-2.29-.28-3.42,0-17.73-.17-35.42.06-53.15.11-9.88,4.24-18.22,12.56-24.41,13.64-10.15,34.57-7.69,44.93,5.13.96,1.17,1.76,2.4,2.49,3.74,17.37,31.95,34.69,63.89,52.05,95.78.91,1.6.96,2.78,0,4.43-3.96,6.95-7.87,13.94-11.94,21.32';
const VIEWBOX = '59.49 73.5 181.01 153';
/* ── Logo SVG (reusable inline) ── */ function LogoSVG({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: VIEWBOX,
        className: className,
        width: 80,
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: PATH_1
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Loader.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: PATH_2
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Loader.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Loader.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
/* ── Scramble text effect ── */ function scrambleText(element, finalText, duration) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const framesPerChar = Math.ceil(duration / 16 / finalText.length);
    let frame = 0;
    const totalFrames = framesPerChar * finalText.length;
    function tick() {
        let out = '';
        for(let i = 0; i < finalText.length; i++){
            if (finalText[i] === ' ') {
                out += ' ';
            } else if (frame / totalFrames > i / finalText.length) {
                out += finalText[i];
            } else {
                out += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        element.textContent = out;
        frame++;
        if (frame <= totalFrames) {
            requestAnimationFrame(tick);
        } else {
            element.textContent = finalText;
        }
    }
    tick();
}
function Loader() {
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('drawing');
    const [percent, setPercent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [filled, setFilled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const statusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    // Skip loader on repeat visits — check after hydration
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (sessionStorage.getItem('loaderSeen') === '1') {
            setPhase('done');
            document.body.style.overflow = '';
        }
    }, []);
    /* Animate percentage 0→100 over ~400ms with cubic ease-out */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        const startTime = performance.now();
        const duration = 400;
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }
        let lastMilestone = 0;
        function tick(now) {
            if (cancelled) return;
            const elapsed = now - startTime;
            const raw = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(raw);
            const value = Math.round(eased * 100);
            setPercent(value);
            // Scramble text at milestones
            if (statusRef.current) {
                if (value >= 25 && lastMilestone < 25) {
                    lastMilestone = 25;
                    scrambleText(statusRef.current, 'LOADING', 200);
                } else if (value >= 60 && lastMilestone < 60) {
                    lastMilestone = 60;
                    scrambleText(statusRef.current, 'BUILDING', 200);
                } else if (value >= 85 && lastMilestone < 85) {
                    lastMilestone = 85;
                    scrambleText(statusRef.current, 'RENDERING', 200);
                }
            }
            if (raw < 1) {
                animFrameRef.current = requestAnimationFrame(tick);
            }
        }
        animFrameRef.current = requestAnimationFrame(tick);
        return ()=>{
            cancelled = true;
            cancelAnimationFrame(animFrameRef.current);
        };
    }, []);
    /* Main animation sequence */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        // Prevent scroll during loading
        document.body.style.overflow = 'hidden';
        // Wait for fonts + minimum delay
        const fontsReady = document.fonts?.ready ?? Promise.resolve();
        const timeouts = [];
        function safeTimeout(fn, ms) {
            const id = setTimeout(()=>{
                if (!cancelled) fn();
            }, ms);
            timeouts.push(id);
            return id;
        }
        fontsReady.then(()=>{
            if (cancelled) return;
            // After fonts loaded + 400ms: fill logo, show READY
            safeTimeout(()=>{
                setFilled(true);
                setPercent(100);
                if (statusRef.current) {
                    scrambleText(statusRef.current, 'READY', 100);
                }
                // After 50ms: glitching state
                safeTimeout(()=>{
                    setPhase('glitching');
                    // After 100ms: settled state
                    safeTimeout(()=>{
                        setPhase('settled');
                        // After 80ms: done — fade out
                        safeTimeout(()=>{
                            setPhase('done');
                            sessionStorage.setItem('loaderSeen', '1');
                            safeTimeout(()=>{
                                document.body.style.overflow = '';
                            }, 400);
                        }, 80);
                    }, 100);
                }, 50);
            }, 400);
        });
        // Safety timeout: force done after 900ms max
        safeTimeout(()=>{
            setPhase('done');
            document.body.style.overflow = '';
            sessionStorage.setItem('loaderSeen', '1');
        }, 900);
        return ()=>{
            cancelled = true;
            timeouts.forEach(clearTimeout);
            document.body.style.overflow = '';
        };
    }, []);
    /* Reduced motion: skip animation entirely */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mq.matches) {
            setPercent(100);
            setFilled(true);
            // Brief show then dismiss
            const t = setTimeout(()=>{
                setPhase('done');
                document.body.style.overflow = '';
                sessionStorage.setItem('loaderSeen', '1');
            }, 400);
            return ()=>clearTimeout(t);
        }
    }, []);
    /* Build class list */ const loaderClasses = [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].loader,
        phase === 'drawing' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].drawing : '',
        phase === 'glitching' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].glitching : '',
        phase === 'settled' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].settled : '',
        phase === 'done' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].done : ''
    ].filter(Boolean).join(' ');
    const logoMainClasses = [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].logoMain,
        filled ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].logoFilled : ''
    ].filter(Boolean).join(' ');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: loaderClasses,
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cornerTL,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blinkDot
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Loader.tsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this),
                    "SYS.INIT // NW-2026"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Loader.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cornerBR,
                children: "GMT+7 // BKK"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Loader.tsx",
                lineNumber: 235,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].center,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].logoWrap,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LogoSVG, {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].plate} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].plateCyan}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Loader.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LogoSVG, {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].plate} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].plateMagenta}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Loader.tsx",
                                lineNumber: 244,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LogoSVG, {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].plate} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].plateYellow}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Loader.tsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LogoSVG, {
                                className: logoMainClasses
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Loader.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Loader.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].percent,
                        children: String(percent).padStart(3, '0')
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Loader.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].progressWrap,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].progressBar,
                            style: {
                                width: `${percent}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Loader.tsx",
                            lineNumber: 256,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Loader.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        ref: statusRef,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Loader$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].status,
                        children: "INITIALIZING"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Loader.tsx",
                        lineNumber: 260,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Loader.tsx",
                lineNumber: 238,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "sr-only focus:not-sr-only focus:absolute focus:bottom-8 focus:left-1/2 focus:-translate-x-1/2 focus:bg-accent focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium focus:z-10",
                onClick: ()=>{
                    setPhase('done');
                    sessionStorage.setItem('loaderSeen', '1');
                    document.body.style.overflow = '';
                },
                children: "Skip"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Loader.tsx",
                lineNumber: 266,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Loader.tsx",
        lineNumber: 229,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/SpotlightLayer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SpotlightLayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function SpotlightLayer() {
    const velocityRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lastScrollY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const rafId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (window.innerWidth <= 768) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const root = document.documentElement;
        function handleMouseMove(e) {
            root.style.setProperty('--mouse-x', e.clientX + 'px');
            root.style.setProperty('--mouse-y', e.clientY + 'px');
        }
        function handleScroll() {
            const currentY = window.scrollY;
            const delta = Math.abs(currentY - lastScrollY.current);
            lastScrollY.current = currentY;
            // Map scroll delta to a spotlight size multiplier (1.0 - 1.6)
            velocityRef.current = Math.min(delta / 40, 1);
            cancelAnimationFrame(rafId.current);
            rafId.current = requestAnimationFrame(()=>{
                const scale = 1 + velocityRef.current * 0.6;
                root.style.setProperty('--spotlight-scale', String(scale));
            });
        }
        // Decay velocity when scrolling stops
        const decayInterval = setInterval(()=>{
            if (velocityRef.current > 0.01) {
                velocityRef.current *= 0.85;
                root.style.setProperty('--spotlight-scale', String(1 + velocityRef.current * 0.6));
            }
        }, 50);
        document.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });
        return ()=>{
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId.current);
            clearInterval(decayInterval);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "spotlight-layer hidden md:block"
    }, void 0, false, {
        fileName: "[project]/src/components/layout/SpotlightLayer.tsx",
        lineNumber: 55,
        columnNumber: 10
    }, this);
}
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0pskasg._.js.map