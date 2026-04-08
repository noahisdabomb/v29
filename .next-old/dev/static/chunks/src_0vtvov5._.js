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
"[project]/src/lib/drawPhoneScreen.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "drawPhoneScreen",
    ()=>drawPhoneScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
;
function roundedRectPath(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
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
function splitEntryText(entry) {
    if (!entry.bold) {
        return [
            entry.text,
            '',
            ''
        ];
    }
    const [lead = '', tail = ''] = entry.text.split(entry.bold);
    return [
        lead,
        entry.bold,
        tail
    ];
}
function createRichTokens(lead, bold, tail) {
    const tokens = [];
    const pushWords = (text, strong)=>{
        text.split(/\s+/).map((word)=>word.trim()).filter(Boolean).forEach((word)=>{
            tokens.push({
                text: word,
                strong
            });
        });
    };
    pushWords(lead, false);
    pushWords(bold, true);
    pushWords(tail, false);
    return tokens;
}
function measureRichLine(ctx, tokens, regularFont, strongFont) {
    let width = 0;
    for(let index = 0; index < tokens.length; index += 1){
        const token = tokens[index];
        ctx.font = token.strong ? strongFont : regularFont;
        const prefix = index > 0 ? ' ' : '';
        width += ctx.measureText(prefix + token.text).width;
    }
    return width;
}
function wrapRichText(ctx, tokens, maxWidth, regularFont, strongFont, maxLines = 2) {
    const lines = [];
    let currentLine = [];
    for (const token of tokens){
        const candidate = [
            ...currentLine,
            token
        ];
        const candidateWidth = measureRichLine(ctx, candidate, regularFont, strongFont);
        if (candidateWidth <= maxWidth || currentLine.length === 0) {
            currentLine = candidate;
            continue;
        }
        lines.push(currentLine);
        currentLine = [
            token
        ];
        if (lines.length === maxLines - 1) {
            break;
        }
    }
    if (currentLine.length > 0) {
        if (lines.length === maxLines - 1) {
            const consumedCount = lines.reduce((sum, line)=>sum + line.length, 0);
            lines.push(tokens.slice(consumedCount));
        } else {
            lines.push(currentLine);
        }
    }
    return lines.slice(0, maxLines);
}
function drawRichLine(ctx, tokens, x, y, regularFont, strongFont, regularColor, strongColor) {
    let cursorX = x;
    for(let index = 0; index < tokens.length; index += 1){
        const token = tokens[index];
        const prefix = index > 0 ? ' ' : '';
        const text = prefix + token.text;
        ctx.font = token.strong ? strongFont : regularFont;
        ctx.fillStyle = token.strong ? strongColor : regularColor;
        ctx.fillText(text, cursorX, y);
        cursorX += ctx.measureText(text).width;
    }
}
function wrapPlainText(ctx, text, maxWidth) {
    const words = text.split(/\s+/);
    const lines = [];
    let current = '';
    for (const word of words){
        const test = current ? `${current} ${word}` : word;
        if (ctx.measureText(test).width <= maxWidth || current.length === 0) {
            current = test;
            continue;
        }
        lines.push(current);
        current = word;
        if (lines.length === 1) break;
    }
    if (current) {
        lines.push(current);
    }
    return lines.slice(0, 2);
}
function drawPhoneScreen(ctx, state, items) {
    const { statusOpacity, headerOpacity, headerOffset, headerRuleProgress, entryOpacities, entryOffsets, rowScales, entryStates, activeIndex, lineProgress } = state;
    const w = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHONE_CANVAS"].width;
    const h = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHONE_CANVAS"].height;
    ctx.clearRect(0, 0, w, h);
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#030408');
    bg.addColorStop(0.58, '#07080c');
    bg.addColorStop(1, '#090b10');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    const topGlow = ctx.createRadialGradient(w * 0.5, 0, 0, w * 0.5, 0, h * 0.36);
    topGlow.addColorStop(0, 'rgba(255,255,255,0.04)');
    topGlow.addColorStop(0.32, 'rgba(255,255,255,0)');
    ctx.fillStyle = topGlow;
    ctx.fillRect(0, 0, w, h);
    const accentGlow = ctx.createRadialGradient(w * 0.5, h * 0.18, 0, w * 0.5, h * 0.18, h * 0.3);
    accentGlow.addColorStop(0, 'rgba(224,68,88,0.07)');
    accentGlow.addColorStop(0.4, 'rgba(224,68,88,0.02)');
    accentGlow.addColorStop(1, 'rgba(224,68,88,0)');
    ctx.fillStyle = accentGlow;
    ctx.fillRect(0, 0, w, h);
    const vignette = ctx.createRadialGradient(w * 0.5, h * 0.42, h * 0.12, w * 0.5, h * 0.42, h * 0.78);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.24)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);
    if (statusOpacity > 0.01) {
        ctx.save();
        ctx.globalAlpha = statusOpacity;
        ctx.fillStyle = 'rgba(255,255,255,0.36)';
        ctx.font = `400 16px ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FONTS"].mono}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('5:58 AM', 36, 42);
        ctx.textAlign = 'right';
        ctx.fillText('BKK  •  GMT+7', w - 36, 42);
        ctx.restore();
    }
    if (headerOpacity > 0.01) {
        ctx.save();
        ctx.globalAlpha = headerOpacity;
        const dotX = 46;
        const dotY = 112 + headerOffset;
        ctx.fillStyle = 'rgba(224,68,88,0.78)';
        ctx.beginPath();
        ctx.arc(dotX, dotY, 7.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(224,68,88,0.84)';
        ctx.font = `400 18px ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FONTS"].mono}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        if ('letterSpacing' in ctx) {
            ctx.letterSpacing = '4px';
        }
        ctx.fillText('ACTIVITY LOG', 72, dotY);
        if ('letterSpacing' in ctx) {
            ctx.letterSpacing = '0px';
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.07)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(36, 146 + headerOffset);
        ctx.lineTo(w - 36, 146 + headerOffset);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(224,68,88,0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(36, 146 + headerOffset);
        ctx.lineTo(36 + (w - 72) * headerRuleProgress, 146 + headerOffset);
        ctx.stroke();
        ctx.restore();
    }
    const rowStartY = 168;
    const rowBottom = h - 74;
    const rowGap = 14;
    const cardX = 58;
    const cardWidth = w - cardX - 20;
    const cardHeight = (rowBottom - rowStartY - rowGap * (items.length - 1)) / items.length;
    const cardRadius = 24;
    const timeX = cardX + 18;
    const copyX = cardX + 92;
    const regularFont = `400 25px ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FONTS"].body}`;
    const strongFont = `600 25px ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FONTS"].body}`;
    const metaFont = `400 12px ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FONTS"].mono}`;
    const lineX = 42;
    const lineTop = rowStartY + 10;
    const lineBottom = rowBottom - 8;
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(lineX, lineTop);
    ctx.lineTo(lineX, lineBottom);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(224,68,88,0.9)';
    ctx.shadowColor = 'rgba(224,68,88,0.35)';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(lineX, lineTop);
    ctx.lineTo(lineX, lineTop + (lineBottom - lineTop) * lineProgress);
    ctx.stroke();
    ctx.restore();
    for(let index = 0; index < items.length; index += 1){
        if (entryOpacities[index] < 0.01) continue;
        const entry = items[index];
        const rowState = entryStates[index];
        const isActive = index === activeIndex;
        const isPast = rowState === 'past';
        const y = rowStartY + index * (cardHeight + rowGap) + entryOffsets[index];
        const [lead, bold, tail] = splitEntryText(entry);
        const richTokens = createRichTokens(lead, bold, tail);
        ctx.save();
        ctx.globalAlpha = entryOpacities[index];
        ctx.translate(cardX + cardWidth / 2, y + cardHeight / 2);
        ctx.scale(rowScales[index], rowScales[index]);
        ctx.translate(-(cardX + cardWidth / 2), -(y + cardHeight / 2));
        if (isActive) {
            const fill = ctx.createLinearGradient(cardX, y, cardX, y + cardHeight);
            fill.addColorStop(0, 'rgba(224,68,88,0.14)');
            fill.addColorStop(1, 'rgba(224,68,88,0.07)');
            ctx.fillStyle = fill;
            roundedRectPath(ctx, cardX, y, cardWidth, cardHeight, cardRadius);
            ctx.fill();
            ctx.shadowColor = 'rgba(0,0,0,0.18)';
            ctx.shadowBlur = 24;
            ctx.shadowOffsetY = 8;
            roundedRectPath(ctx, cardX, y, cardWidth, cardHeight, cardRadius);
            ctx.strokeStyle = 'rgba(224,68,88,0.1)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetY = 0;
        } else {
            ctx.fillStyle = 'rgba(255,255,255,0.018)';
            ctx.strokeStyle = 'rgba(255,255,255,0.04)';
            ctx.lineWidth = 1;
            roundedRectPath(ctx, cardX, y, cardWidth, cardHeight, 20);
            ctx.fill();
            roundedRectPath(ctx, cardX, y, cardWidth, cardHeight, 20);
            ctx.stroke();
        }
        ctx.fillStyle = isActive ? '#E04458' : isPast ? 'rgba(224,68,88,0.55)' : 'rgba(224,68,88,0.38)';
        ctx.font = `400 21px ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FONTS"].mono}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(entry.time, timeX, y + 18);
        if (isActive) {
            ctx.fillStyle = 'rgba(224,68,88,0.85)';
            ctx.font = metaFont;
            if ('letterSpacing' in ctx) {
                ctx.letterSpacing = '2px';
            }
            ctx.textAlign = 'right';
            ctx.fillText('HANDOFF READY', cardX + cardWidth - 18, y + 18);
            if ('letterSpacing' in ctx) {
                ctx.letterSpacing = '0px';
            }
        }
        ctx.textAlign = 'left';
        ctx.fillStyle = isActive ? '#E04458' : isPast ? 'rgba(224,68,88,0.55)' : 'rgba(255,255,255,0.22)';
        ctx.beginPath();
        ctx.arc(copyX - 14, y + 20, 3.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = isActive ? '#ffffff' : isPast ? 'rgba(255,255,255,0.68)' : 'rgba(255,255,255,0.46)';
        ctx.font = regularFont;
        const maxWidth = cardX + cardWidth - copyX - 18;
        const lineHeight = 32;
        const regularColor = isActive ? '#ffffff' : isPast ? 'rgba(255,255,255,0.64)' : 'rgba(255,255,255,0.5)';
        const strongColor = isActive ? '#ffffff' : 'rgba(255,255,255,0.86)';
        const bodyTop = y + Math.max(54, cardHeight * 0.43);
        if (!bold) {
            const wrapped = wrapPlainText(ctx, lead, maxWidth);
            wrapped.forEach((line, lineIndex)=>{
                ctx.fillText(line, copyX, bodyTop + lineIndex * lineHeight);
            });
        } else {
            const wrappedLines = wrapRichText(ctx, richTokens, maxWidth, regularFont, strongFont);
            wrappedLines.forEach((line, lineIndex)=>{
                drawRichLine(ctx, line, copyX, bodyTop + lineIndex * lineHeight, regularFont, strongFont, regularColor, strongColor);
            });
        }
        ctx.restore();
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/three/PhoneModel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PhoneModel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Gltf.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/scrollStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$drawPhoneScreen$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/drawPhoneScreen.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/content.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycleScreenState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cycleScreenState.ts [app-client] (ecmascript)");
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
;
;
;
;
;
const ENV_MAP_INTENSITY = 1.35;
function createScreenGeometry(width, height) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](width, height, 1, 1);
}
function createRoundedMaskTexture(cornerRadiusRatio) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) * cornerRadiusRatio;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(width - radius, 0);
    ctx.quadraticCurveTo(width, 0, width, radius);
    ctx.lineTo(width, height - radius);
    ctx.quadraticCurveTo(width, height, width - radius, height);
    ctx.lineTo(radius, height);
    ctx.quadraticCurveTo(0, height, 0, height - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.fill();
    const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
    texture.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NoColorSpace"];
    texture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"];
    texture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"];
    texture.needsUpdate = true;
    return texture;
}
function getBoundsInLocalSpace(object, relativeTo) {
    const bounds = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().makeEmpty();
    const inverse = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().copy(relativeTo.matrixWorld).invert();
    object.updateWorldMatrix(true, true);
    object.traverse((child)=>{
        if (!(child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"])) return;
        const geometry = child.geometry;
        if (!geometry.boundingBox) {
            geometry.computeBoundingBox();
        }
        if (!geometry.boundingBox) return;
        const localBox = geometry.boundingBox.clone();
        const relativeMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().multiplyMatrices(inverse, child.matrixWorld);
        localBox.applyMatrix4(relativeMatrix);
        bounds.union(localBox);
    });
    return bounds;
}
function selectPrimaryPhoneBody(scene) {
    const explicitBody = scene.getObjectByName('iphone17promax.001');
    if (explicitBody) return explicitBody.clone(true);
    const rootChildren = scene.children.filter((child)=>child.type !== 'AmbientLight');
    if (rootChildren.length > 1) {
        return rootChildren[rootChildren.length - 1].clone(true);
    }
    return scene.clone(true);
}
function PhoneModel({ reducedMotion = false }) {
    _s();
    const motionGroupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const anchorGroupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const normalizedGroupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const screenMatRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ctxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textureRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastStateKeyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('');
    const { scene: sourceScene } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MODEL_ASSETS"].phone.glb);
    const model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PhoneModel.useMemo[model]": ()=>selectPrimaryPhoneBody(sourceScene)
    }["PhoneModel.useMemo[model]"], [
        sourceScene
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PhoneModel.useEffect": ()=>{
            const canvas = document.createElement('canvas');
            canvas.width = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHONE_CANVAS"].width;
            canvas.height = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHONE_CANVAS"].height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
            texture.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            texture.anisotropy = 4;
            texture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"];
            texture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"];
            texture.repeat.set(1, 1);
            texture.offset.set(0, 0);
            texture.center.set(0.5, 0.5);
            texture.rotation = 0;
            texture.needsUpdate = true;
            ctxRef.current = ctx;
            textureRef.current = texture;
            if (screenMatRef.current) {
                screenMatRef.current.map = texture;
                screenMatRef.current.needsUpdate = true;
            }
            return ({
                "PhoneModel.useEffect": ()=>{
                    texture.dispose();
                    ctxRef.current = null;
                    textureRef.current = null;
                    lastStateKeyRef.current = '';
                }
            })["PhoneModel.useEffect"];
        }
    }["PhoneModel.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PhoneModel.useEffect": ()=>{
            const anchorGroup = anchorGroupRef.current;
            const normalizedGroup = normalizedGroupRef.current;
            if (!anchorGroup || !normalizedGroup) return;
            const { normalization, bodyFrame, screenFrame, targetHeight } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHONE_MODEL_LAYOUT"];
            anchorGroup.position.set(0, 0, 0);
            anchorGroup.rotation.set(0, 0, 0);
            anchorGroup.scale.set(1, 1, 1);
            normalizedGroup.position.set(normalization.position.x, normalization.position.y, normalization.position.z);
            normalizedGroup.rotation.set(normalization.rotation.x, normalization.rotation.y, normalization.rotation.z);
            normalizedGroup.scale.set(1, 1, 1);
            model.traverse({
                "PhoneModel.useEffect": (child)=>{
                    if (!(child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"])) return;
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.frustumCulled = false;
                    if (Array.isArray(child.material)) {
                        child.material = child.material.map({
                            "PhoneModel.useEffect": (material)=>material.clone()
                        }["PhoneModel.useEffect"]);
                    } else {
                        child.material = child.material.clone();
                    }
                    const materials = Array.isArray(child.material) ? child.material : [
                        child.material
                    ];
                    materials.forEach({
                        "PhoneModel.useEffect": (material)=>{
                            if (material instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"] || material instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]) {
                                if (material.name === 'iphone17pro-textures') {
                                    material.map = null;
                                    material.emissiveMap = null;
                                    material.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#05060a');
                                    material.emissive = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]('#000000');
                                    material.metalness = 0.02;
                                    material.roughness = 0.96;
                                    material.transparent = false;
                                    material.opacity = 1;
                                    material.alphaTest = 0;
                                    material.depthWrite = true;
                                }
                                if (material.map) {
                                    material.map.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
                                    material.map.needsUpdate = true;
                                }
                                if (material.emissiveMap) {
                                    material.emissiveMap.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
                                    material.emissiveMap.needsUpdate = true;
                                }
                                material.envMapIntensity = ENV_MAP_INTENSITY;
                                if (material.transparent) {
                                    material.transparent = true;
                                    material.depthWrite = false;
                                }
                                material.needsUpdate = true;
                            }
                        }
                    }["PhoneModel.useEffect"]);
                }
            }["PhoneModel.useEffect"]);
            anchorGroup.updateWorldMatrix(true, true);
            let bodyBox = getBoundsInLocalSpace(model, normalizedGroup);
            const initialSize = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            bodyBox.getSize(initialSize);
            const scaleFactor = targetHeight / Math.max(initialSize.y, 0.0001);
            normalizedGroup.scale.setScalar(scaleFactor);
            anchorGroup.updateWorldMatrix(true, true);
            bodyBox = getBoundsInLocalSpace(model, normalizedGroup);
            const bodySize = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            const bodyCenter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            bodyBox.getSize(bodySize);
            bodyBox.getCenter(bodyCenter);
            const centeredBodyPoint = bodyCenter.clone().applyMatrix4(normalizedGroup.matrix);
            anchorGroup.position.set(bodyFrame.centerOffset.x - centeredBodyPoint.x, bodyFrame.centerOffset.y - centeredBodyPoint.y, bodyFrame.centerOffset.z - centeredBodyPoint.z);
            anchorGroup.updateWorldMatrix(true, true);
            const screenWidth = bodySize.x * screenFrame.widthRatio;
            const screenHeight = bodySize.y * screenFrame.heightRatio;
            const screenCenter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](bodyCenter.x + bodySize.x * screenFrame.centerOffsetRatio.x, bodyCenter.y + bodySize.y * screenFrame.centerOffsetRatio.y, bodyCenter.z);
            const screenFace = screenFrame.face;
            const faceZ = screenFace === 'min' ? bodyBox.min.z : bodyBox.max.z;
            const depthDirection = screenFace === 'min' ? -1 : 1;
            const screenRotation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"](screenFrame.rotation.x, screenFrame.rotation.y + (screenFace === 'min' ? Math.PI : 0), screenFrame.rotation.z);
            const maskTexture = createRoundedMaskTexture(screenFrame.cornerRadiusRatio);
            const screenGeometry = createScreenGeometry(screenWidth, screenHeight);
            const screenMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                toneMapped: false,
                transparent: true,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FrontSide"],
                polygonOffset: true,
                polygonOffsetFactor: -2,
                polygonOffsetUnits: -2,
                depthWrite: false,
                alphaMap: maskTexture,
                alphaTest: 0.5,
                map: textureRef.current
            });
            const screenMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](screenGeometry, screenMaterial);
            screenMesh.position.set(screenCenter.x, screenCenter.y, faceZ + depthDirection * screenFrame.depthOffset);
            screenMesh.rotation.copy(screenRotation);
            screenMesh.renderOrder = 5;
            screenMesh.frustumCulled = false;
            const glassGeometry = createScreenGeometry(screenWidth, screenHeight);
            const glassMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]({
                color: '#f8fbff',
                transparent: true,
                opacity: 0.18,
                alphaMap: maskTexture,
                alphaTest: 0.5,
                transmission: 0.24,
                ior: 1.42,
                roughness: 0.08,
                metalness: 0.02,
                clearcoat: 1,
                clearcoatRoughness: 0.08,
                thickness: 0.01,
                depthWrite: false,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FrontSide"]
            });
            const glassMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](glassGeometry, glassMaterial);
            glassMesh.position.set(screenCenter.x, screenCenter.y, faceZ + depthDirection * (screenFrame.depthOffset + screenFrame.glassOffset));
            glassMesh.rotation.copy(screenRotation);
            glassMesh.renderOrder = 6;
            glassMesh.frustumCulled = false;
            normalizedGroup.add(screenMesh);
            normalizedGroup.add(glassMesh);
            screenMatRef.current = screenMaterial;
            return ({
                "PhoneModel.useEffect": ()=>{
                    normalizedGroup.remove(screenMesh);
                    normalizedGroup.remove(glassMesh);
                    screenGeometry.dispose();
                    glassGeometry.dispose();
                    maskTexture?.dispose();
                    screenMaterial.dispose();
                    glassMaterial.dispose();
                }
            })["PhoneModel.useEffect"];
        }
    }["PhoneModel.useEffect"], [
        model
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "PhoneModel.useFrame": ()=>{
            const group = motionGroupRef.current;
            if (!group) return;
            const { phoneProgress: progress } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$scrollStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollStore"].getState();
            const motion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$phoneMotion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPhoneMotionTransform"])(progress, reducedMotion);
            group.rotation.set(motion.rotX, motion.rotY, 0);
            group.scale.setScalar(motion.scale);
            group.position.set(motion.posX, motion.posY, motion.posZ);
            const screenMat = screenMatRef.current;
            if (screenMat && !screenMat.map && textureRef.current) {
                screenMat.map = textureRef.current;
                screenMat.needsUpdate = true;
            }
            const phoneState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycleScreenState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPhoneSequenceState"])(progress, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOG_ENTRIES"].length, reducedMotion);
            const ctx = ctxRef.current;
            const texture = textureRef.current;
            if (!ctx || !texture) return;
            const stateKey = [
                phoneState.statusOpacity.toFixed(2),
                phoneState.headerOpacity.toFixed(2),
                phoneState.headerOffset.toFixed(1),
                phoneState.headerRuleProgress.toFixed(2),
                phoneState.entryOpacities.map({
                    "PhoneModel.useFrame.stateKey": (value)=>value.toFixed(2)
                }["PhoneModel.useFrame.stateKey"]).join(','),
                phoneState.entryOffsets.map({
                    "PhoneModel.useFrame.stateKey": (value)=>value.toFixed(1)
                }["PhoneModel.useFrame.stateKey"]).join(','),
                phoneState.rowScales.map({
                    "PhoneModel.useFrame.stateKey": (value)=>value.toFixed(3)
                }["PhoneModel.useFrame.stateKey"]).join(','),
                phoneState.iconScales.map({
                    "PhoneModel.useFrame.stateKey": (value)=>value.toFixed(3)
                }["PhoneModel.useFrame.stateKey"]).join(','),
                phoneState.entryStates.join(','),
                phoneState.activeIndex,
                phoneState.lineProgress.toFixed(3)
            ].join('|');
            if (stateKey !== lastStateKeyRef.current) {
                lastStateKeyRef.current = stateKey;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$drawPhoneScreen$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawPhoneScreen"])(ctx, phoneState, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOG_ENTRIES"]);
                texture.needsUpdate = true;
            }
        }
    }["PhoneModel.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: motionGroupRef,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
            ref: anchorGroupRef,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: normalizedGroupRef,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
                    object: model
                }, void 0, false, {
                    fileName: "[project]/src/components/three/PhoneModel.tsx",
                    lineNumber: 385,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/three/PhoneModel.tsx",
                lineNumber: 384,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/three/PhoneModel.tsx",
            lineNumber: 383,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/three/PhoneModel.tsx",
        lineNumber: 382,
        columnNumber: 5
    }, this);
}
_s(PhoneModel, "BW1urWw5e4GEdH2rUOXjsQWe/VQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = PhoneModel;
var _c;
__turbopack_context__.k.register(_c, "PhoneModel");
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
"[project]/src/components/three/PhoneScene.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PhoneScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Gltf.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$SceneContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/three/SceneContainer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$PhoneModel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/three/PhoneModel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$createEnvMap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/createEnvMap.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
// Start downloading the GLB model early (before component mounts)
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"].preload(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MODEL_ASSETS"].phone.glb);
function PhoneScene({ reducedMotion = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$SceneContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        camera: {
            fov: 35,
            near: 0.01,
            far: 100,
            position: [
                0,
                0,
                0.8
            ]
        },
        toneMappingExposure: 1.02,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.5
            }, void 0, false, {
                fileName: "[project]/src/components/three/PhoneScene.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    2,
                    3,
                    4
                ],
                intensity: 1.5,
                color: "#f3f1e7"
            }, void 0, false, {
                fileName: "[project]/src/components/three/PhoneScene.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    -3,
                    1,
                    2
                ],
                intensity: 0.4,
                color: "#d7cfb1"
            }, void 0, false, {
                fileName: "[project]/src/components/three/PhoneScene.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    0,
                    0,
                    -3
                ],
                intensity: 0.3,
                color: "#ffffff"
            }, void 0, false, {
                fileName: "[project]/src/components/three/PhoneScene.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$createEnvMap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudioEnvironment"], {}, void 0, false, {
                fileName: "[project]/src/components/three/PhoneScene.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$three$2f$PhoneModel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    reducedMotion: reducedMotion
                }, void 0, false, {
                    fileName: "[project]/src/components/three/PhoneScene.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/three/PhoneScene.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/three/PhoneScene.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = PhoneScene;
var _c;
__turbopack_context__.k.register(_c, "PhoneScene");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/three/PhoneScene.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/three/PhoneScene.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_0vtvov5._.js.map