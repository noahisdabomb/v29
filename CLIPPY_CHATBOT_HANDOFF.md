# Clippy Chatbot Handoff

## Project
- Path: `/Users/noahwilliams/Library/CloudStorage/GoogleDrive-noah@noahisdabomb.com/My Drive/Noah Self Promotion System/noahisdabomb-v24`
- Current review URL: `http://localhost:3001`

## Goal
Turn the current Clippy helper from a deterministic quick-action assistant into a real AI chatbot you can actually talk to, while preserving the current visual direction:
- bottom-left Clippy launcher
- expandable assistant card
- `Chat` and `Contact` tabs
- quick-action chips
- Clippy 3D model as the personality/launcher

## Current State
### UI shell
The concierge UI already exists and is functioning as a deterministic assistant.

Primary file:
- `/Users/noahwilliams/Library/CloudStorage/GoogleDrive-noah@noahisdabomb.com/My Drive/Noah Self Promotion System/noahisdabomb-v24/src/components/layout/Concierge.tsx`

Important current behavior in that file:
- idle speech-bubble rotation and page-aware joke/status lines
- expandable assistant card
- quick-action chips
- fake "thinking" state
- bottom input field
- right now, typed questions are routed through regex into canned actions instead of a real model

Useful sections:
- idle/page messages: lines 17-54
- deterministic action responses: lines 66-99
- current state and helper logic: lines 128-290
- expanded assistant UI: lines 437-677
- collapsed Clippy + bubble cluster: lines 679-720

### 3D Clippy
Primary file:
- `/Users/noahwilliams/Library/CloudStorage/GoogleDrive-noah@noahisdabomb.com/My Drive/Noah Self Promotion System/noahisdabomb-v24/src/components/three/ClippyModel.tsx`

Current notes:
- uses `Clippy.glb` from `/public/models/clippy-user-zip/source/Clippy.glb`
- has separate `launcher` and `panel` framing variants
- paper prop is removed
- materials, lighting, and framing are already tuned enough for this phase

Useful sections:
- material tuning: lines 20-66
- model normalization and setup: lines 132-220
- idle motion and scale behavior: lines 222-261
- variant-aware camera/lights: lines 266-320

### Existing deterministic actions
Source:
- `/Users/noahwilliams/Library/CloudStorage/GoogleDrive-noah@noahisdabomb.com/My Drive/Noah Self Promotion System/noahisdabomb-v24/src/lib/content.ts`

Useful section:
- `SITE_SETTINGS.conciergeActions`: lines 970-977

These should remain as:
- starter chips
- fallback suggested actions
- optional suggested next steps from AI replies

## Important Constraints
- Do not redesign the entire concierge again.
- Preserve the current bottom-left launcher and expanded card pattern.
- Keep Clippy as the visual/interactive personality.
- Keep `Contact` tab deterministic for now unless there is a strong reason to unify it later.
- Do not break the current quick actions while adding AI.
- Keep the assistant scoped to Noah's site, services, work, process, and conversion flow.

## Current Technical Reality
- There is no AI SDK in `package.json` yet.
- There is no `app/api/...` route for concierge chat yet.
- Dependencies currently do not include `openai`, `ai`, `anthropic`, etc.

That means the next session should add the AI path from scratch, cleanly.

## Recommended Build Plan
### 1. Add backend chat endpoint
Create:
- `/Users/noahwilliams/Library/CloudStorage/GoogleDrive-noah@noahisdabomb.com/My Drive/Noah Self Promotion System/noahisdabomb-v24/src/app/api/concierge/route.ts`

Recommended first pass:
- use OpenAI Responses API
- keep the response JSON simple and deterministic

Suggested response shape:
```ts
type ConciergeReply = {
  message: string;
  suggestions?: Array<{
    label: string;
    href?: string;
    prompt?: string;
  }>;
};
```

### 2. Install AI dependency
Recommended:
- `openai`

Environment variable:
- `OPENAI_API_KEY`

### 3. Replace fake routing with real chat
In `Concierge.tsx`:
- keep chips, but make them submit prompts to the API
- replace `resolveQuestionToAction(...)` as the main engine
- keep deterministic fallback if the API fails

### 4. Add lightweight chat history
In `Concierge.tsx`:
- track turns as user/assistant messages
- keep the current visual style, but let multiple turns exist
- the existing selected/pending action flow can be simplified into a real message list

Suggested local shape:
```ts
type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  suggestions?: Array<{
    label: string;
    href?: string;
    prompt?: string;
  }>;
};
```

### 5. Keep quick actions as chip starters
The chips should not disappear.
They should become:
- conversation starters
- route-specific prompts
- suggested follow-ups

### 6. Scope the assistant properly
The system prompt should make Clippy:
- funny, dry, concise
- useful, not gimmicky
- grounded in Noah's actual positioning
- able to answer questions about:
  - work
  - case studies
  - process
  - overnight workflow
  - booking/contact

The assistant should not:
- invent capabilities not present on the site
- pretend to have hidden case studies or custom pricing data
- wander into general-purpose AI assistant behavior

### 7. Good first-pass fallback behavior
If the API errors:
- show a concise assistant message
- keep chips available
- provide deterministic CTA suggestions like:
  - `Show me the right work`
  - `How does this model work?`
  - `Book a strategy call`

## Recommended Prompting Contract
The AI should be given:
- a short system prompt defining Clippy's tone and boundaries
- current page context from `pathname`
- curated site facts, not the entire codebase
- optional action inventory from `SITE_SETTINGS.conciergeActions`

Recommended site facts to include:
- Noah is a freelance creative director in Bangkok
- overnight model: brief tonight, progress by morning
- one senior partner, strategy to final files
- major proof areas: work, case studies, how-i-work, contact
- primary conversion path: strategy call or email

## UX Recommendation
Do not try to ship full free-form streaming first.
Best first implementation:
- submit prompt
- show thinking state
- render assistant reply
- optional suggested action chips under the reply

Once that works:
- add message history persistence while the card is open
- optionally add streaming

## Suggested First Deliverable For The Next Session
The next session should aim to complete this exact scope:
1. install `openai`
2. create `src/app/api/concierge/route.ts`
3. make `Concierge.tsx` submit typed prompts to the API
4. convert quick-action chips into real chat starters
5. render user + assistant messages in the card
6. keep `Contact` tab deterministic
7. preserve the current Clippy visuals

## Ready-To-Paste Prompt For The Next Session
Use this prompt in the next session:

```text
Project path:
/Users/noahwilliams/Library/CloudStorage/GoogleDrive-noah@noahisdabomb.com/My Drive/Noah Self Promotion System/noahisdabomb-v24

Current review URL:
http://localhost:3001

Read this handoff first:
/Users/noahwilliams/Library/CloudStorage/GoogleDrive-noah@noahisdabomb.com/My Drive/Noah Self Promotion System/noahisdabomb-v24/CLIPPY_CHATBOT_HANDOFF.md

Task:
Turn the current Clippy helper into a real AI chatbot you can talk to.

Requirements:
- Keep the current bottom-left launcher and expanded card design.
- Keep Clippy as the 3D personality/launcher.
- Preserve the Chat and Contact tabs.
- Keep Contact deterministic for now.
- Replace the current regex/canned-response flow with a real backend chat route.
- Use quick-action chips as chat starters and suggested follow-ups.
- Add multi-turn message history inside the card.
- Keep the assistant scoped to Noah's site, work, process, and conversion flow.
- Add clean fallback behavior if the AI call fails.

Technical starting points:
- Concierge UI: src/components/layout/Concierge.tsx
- Clippy model: src/components/three/ClippyModel.tsx
- starter chip inventory: src/lib/content.ts

Recommended implementation:
- install openai
- add src/app/api/concierge/route.ts
- use OpenAI Responses API
- return assistant text plus optional suggested actions

Please implement end-to-end, run lint/build if possible, and leave the UI visually intact.
```
