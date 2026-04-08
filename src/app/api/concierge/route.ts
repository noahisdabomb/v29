import OpenAI from 'openai';
import {
  CAL_COM_URL,
  CASE_STUDIES,
  HOW_I_WORK,
  SITE_SETTINGS,
  TRUST_BRANDS,
} from '@/lib/content';
import {
  buildContextualSuggestionSet,
  CONCIERGE_VOICE_BRIEF,
  getConciergePageKey,
  type ConciergeSuggestion,
  type ConciergeViewContext,
} from '@/lib/concierge';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ChatTurn = {
  role: 'user' | 'assistant';
  text: string;
};

type ConciergeRequest = {
  messages?: ChatTurn[];
  pathname?: string;
  context?: ConciergeViewContext;
};

type ConciergeReply = {
  message: string;
  suggestions?: ConciergeSuggestion[];
};

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const MODEL = process.env.OPENAI_CONCIERGE_MODEL || 'gpt-5.4-mini';

const PAGE_CONTEXT: Record<string, string> = {
  home: 'The visitor is on the homepage. Emphasize the overnight model, top-line proof, and the cleanest next step.',
  work: 'The visitor is on the main work page. Help them find the strongest proof or the most relevant case study for their category.',
  'case-study':
    'The visitor is reading a case study. Stay grounded in the current case study if it is known, then connect it back to Noah’s broader model and fit.',
  'how-i-work':
    'The visitor is on the how-it-works page. Focus on workflow, scope, collaboration model, and why one lead from strategy to final files matters.',
  contact:
    'The visitor is on the contact page. Keep answers short, remove friction, and guide them toward booking or emailing if the brief is real.',
};

const FALLBACK_SUGGESTION_LABELS: Record<string, string[]> = {
  'Where should I start?': [
    'Which case study leads?',
    "What's the setup?",
    'Is a call worth it?',
  ],
  "What's the setup?": [
    'Where should I start?',
    'Is a call worth it?',
    'Can I just email?',
  ],
  'Is a call worth it?': [
    'Can I just email?',
    "What's the setup?",
    'Where should I start?',
  ],
  'Which case study leads?': [
    'Where should I start?',
    "What's the setup?",
    'Is a call worth it?',
  ],
  'Can I just email?': [
    'Is a call worth it?',
    "What's the setup?",
    'Where should I start?',
  ],
};

function getCurrentCaseStudy(pathname: string) {
  if (!pathname.startsWith('/work/')) return null;
  const slug = pathname.replace('/work/', '');
  return CASE_STUDIES.find((study) => study.slug === slug) ?? null;
}

function getActionByLabel(label: string) {
  return SITE_SETTINGS.conciergeActions.find((action) => action.label === label) ?? null;
}

function actionToSuggestion(label: string): ConciergeSuggestion | null {
  const action = getActionByLabel(label);
  if (!action) return null;

  if (
    action.external ||
    action.href.startsWith('mailto:') ||
    action.label === 'Which case study leads?'
  ) {
    return { label: action.label, href: action.href };
  }

  return { label: action.label, prompt: action.prompt };
}

function uniqueSuggestions(labels: string[]): ConciergeSuggestion[] {
  const seen = new Set<string>();
  const suggestions: ConciergeSuggestion[] = [];

  for (const label of labels) {
    if (seen.has(label)) continue;
    seen.add(label);

    const suggestion = actionToSuggestion(label);
    if (suggestion) {
      suggestions.push(suggestion);
    }
  }

  return suggestions.slice(0, 3);
}

function matchActionLabel(question: string, pathname: string): string {
  const normalized = question.toLowerCase();
  const pageKey = getConciergePageKey(pathname);

  if (/(email|contact|reach|message|note)/.test(normalized)) {
    return 'Can I just email?';
  }

  if (/(book|call|project|budget|timeline|hire|talk|brief|fit|scope)/.test(normalized)) {
    return 'Is a call worth it?';
  }

  if (/(how|process|workflow|model|system|overnight|work together)/.test(normalized)) {
    return "What's the setup?";
  }

  if (/(case study|study|proof|strongest)/.test(normalized)) {
    return 'Which case study leads?';
  }

  if (/(work|portfolio|examples|show me|start)/.test(normalized)) {
    return 'Where should I start?';
  }

  if (pageKey === 'contact') return 'Is a call worth it?';
  if (pageKey === 'how-i-work') return "What's the setup?";
  if (pageKey === 'work' || pageKey === 'case-study') return 'Where should I start?';
  return 'Where should I start?';
}

function getSectionGuidance(pathname: string, context: ConciergeViewContext) {
  const pageKey = getConciergePageKey(pathname);
  const panelTitle = context.activeWorkPanelTitle?.replace(/\s+/g, ' ').trim();
  const sector = context.activeSector?.trim();

  if (panelTitle) {
    return `The visitor is currently looking at the ${panelTitle} work panel${sector && sector !== 'All' ? ` in ${sector}` : ''}. Use it as the primary proof point unless they ask to compare options.`;
  }

  switch (pageKey) {
    case 'home':
      if (context.sectionId === 'timeline') {
        return 'The visitor is in the 24-hour cycle section. Explain the overnight advantage in concrete operational terms, not vague marketing language.';
      }

      if (context.sectionId === 'work') {
        return 'The visitor is in the homepage proof section. Help them pick a case study quickly and explain why it matters.';
      }

      if (context.sectionId === 'advantage') {
        return 'The visitor is in the advantage section. Emphasize fewer handoffs, senior ownership, and speed without overselling.';
      }

      if (context.sectionId === 'contact') {
        return 'The visitor is in the homepage contact section. Reduce friction and guide them toward the cleanest real next step.';
      }

      return PAGE_CONTEXT.home;

    case 'work':
      if (context.sectionId === 'work-filter' && sector && sector !== 'All') {
        return `The visitor is filtering the work page by ${sector}. Recommend the best-fit proof inside that category and explain why.`;
      }

      return PAGE_CONTEXT.work;

    case 'case-study':
      if (context.sectionId === 'brief') {
        return 'The visitor is in the brief section of a case study. Focus on the challenge and what made the problem worth solving.';
      }

      if (context.sectionId === 'insight') {
        return 'The visitor is in the insight section of a case study. Focus on the strategic turn and why it unlocked the work.';
      }

      if (context.sectionId === 'work') {
        return 'The visitor is in the execution section of a case study. Connect the craft back to the strategy and why it matters.';
      }

      if (context.sectionId === 'results') {
        return 'The visitor is in the results section of a case study. Stay grounded in outcomes and what they signal about fit.';
      }

      if (context.sectionId === 'my-take') {
        return 'The visitor is in Noah’s point-of-view section of a case study. Tie the lesson back to how Noah thinks and works.';
      }

      return PAGE_CONTEXT['case-study'];

    case 'how-i-work':
      if (context.sectionId === 'scale') {
        return 'The visitor is in the scale section. Explain how Noah stays senior-led while pulling in extra specialists when needed.';
      }

      if (context.sectionId === 'faq') {
        return 'The visitor is in the FAQ section. Answer plainly and reduce uncertainty around fit, process, and scope.';
      }

      return PAGE_CONTEXT['how-i-work'];

    case 'contact':
      if (context.sectionId === 'contact-details') {
        return 'The visitor is reviewing contact details. Keep answers practical and direct them toward the cleanest handoff.';
      }

      return PAGE_CONTEXT.contact;
  }
}

function buildSuggestions(
  question: string,
  pathname: string,
  context: ConciergeViewContext,
) {
  const label = matchActionLabel(question, pathname);
  const labels =
    FALLBACK_SUGGESTION_LABELS[label] ??
    ['Where should I start?', "What's the setup?", 'Is a call worth it?'];
  return buildContextualSuggestionSet(pathname, context, uniqueSuggestions(labels));
}

function buildViewContextBlock(pathname: string, context: ConciergeViewContext) {
  const lines = [
    `Current page path: ${pathname}`,
    `Current page guidance: ${getSectionGuidance(pathname, context)}`,
  ];

  if (context.sectionId || context.sectionLabel) {
    lines.push(
      `Active section in view: ${context.sectionLabel || context.sectionId} (${context.sectionId || 'unspecified'})`,
    );
  } else {
    lines.push('Active section in view: none provided.');
  }

  if (context.activeWorkPanelTitle || context.activeWorkPanelId) {
    lines.push(
      `Active work panel in view: ${context.activeWorkPanelTitle || 'untitled'} (${context.activeWorkPanelId || 'unspecified'})`,
    );
  } else {
    lines.push('Active work panel in view: none.');
  }

  if (context.activeSector) {
    lines.push(`Active work sector filter: ${context.activeSector}`);
  }

  return lines.join('\n');
}

function buildSystemPrompt(pathname: string, context: ConciergeViewContext) {
  const currentCaseStudy = getCurrentCaseStudy(pathname);
  const featuredStudies = CASE_STUDIES.filter((study) => !study.draft)
    .slice(0, 8)
    .map(
      (study) =>
        `${study.client} (${study.slug}): ${study.tagline} Outcome: ${study.shortOutcome}`,
    )
    .join('\n');

  const currentCaseStudyBlock = currentCaseStudy
    ? `Current case study in view: ${currentCaseStudy.client}. ${currentCaseStudy.tagline} ${currentCaseStudy.shortOutcome}`
    : 'Current case study in view: none.';

  return [
    'You are Clippy, the concierge assistant on Noah Williams’s portfolio site.',
    'Stay tightly scoped to Noah’s site, services, case studies, workflow, fit, and conversion flow.',
    'Tone: dry, concise, useful, self-aware, slightly haunted, and lightly Clippy-esque. Never gushy, never generic.',
    'Keep answers short. Usually 2 to 5 sentences. No bullets unless the visitor explicitly asks for a list.',
    'Do not invent hidden pricing, hidden case studies, or capabilities not supported by the site.',
    'If a question goes beyond the available facts, say that plainly and guide the visitor toward email or a strategy call.',
    'If the visitor sounds real, help them decide fit and reduce friction to the next step.',
    'Voice brief:',
    ...CONCIERGE_VOICE_BRIEF.map((line) => `- ${line}`),
    '',
    buildViewContextBlock(pathname, context),
    currentCaseStudyBlock,
    '',
    'Site facts:',
    `- ${SITE_SETTINGS.siteDescription}`,
    `- Concierge positioning: ${SITE_SETTINGS.conciergeIntro}`,
    `- Base model: ${HOW_I_WORK.summary}`,
    '- Noah is a freelance creative director based in Bangkok, working with an overnight advantage for U.S. teams.',
    '- The model is one senior creative lead from strategy through final files, with specialist scale available when needed.',
    `- Trust brands named on the site: ${TRUST_BRANDS.join(', ')}`,
    `- Primary conversion paths: strategy call at ${CAL_COM_URL} or email ${SITE_SETTINGS.email}`,
    '',
    'Featured case-study snapshots:',
    featuredStudies,
    '',
    'Behavior rules:',
    '- Answer the user’s question directly before suggesting a next step.',
    '- Sound like a resurrected office paperclip with taste and no patience for vague briefs, not a chirpy chatbot.',
    '- If the visitor asks for an opinion, have one and back it up.',
    '- Call out generic thinking gently but clearly when it helps.',
    '- Default cadence: one direct answer, one sharp implication, optional next move if it earns it.',
    '- Never open with service-language throat clearing like "Absolutely", "Sure thing", or "Great question".',
    '- Avoid repeating the visitor’s phrasing back at them unless you are sharpening or reframing it.',
    '- Do not sand the personality down into professional mush. A weird, self-aware line is good when it helps the answer land.',
    '- Keep the weirdness in the Clippy lane: slightly haunted, oddly observant, and funny because it is specific, not because it is random.',
    '- If they ask what work is most relevant, recommend one or two case studies and explain why.',
    '- If they ask about process, explain the overnight workflow and the no-handoff model.',
    '- If they ask about fit, qualify thoughtfully instead of hard-selling.',
    '- End with a natural next step only when it actually helps.',
  ].join('\n');
}

function buildConversationInput(
  messages: ChatTurn[],
  pathname: string,
  context: ConciergeViewContext,
) {
  const pageKey = getConciergePageKey(pathname);
  const transcript = messages
    .slice(-10)
    .map((message) => `${message.role === 'assistant' ? 'Clippy' : 'Visitor'}: ${message.text}`)
    .join('\n\n');

  return [
    `Page key: ${pageKey}`,
    `Pathname: ${pathname}`,
    '',
    'Current view context:',
    buildViewContextBlock(pathname, context),
    '',
    'Conversation transcript:',
    transcript,
    '',
    'Write the next assistant message only.',
    'Keep the answer tight, specific, and written with real taste.',
    'Preferred cadence: direct answer first, sharper observation second, next step only if useful.',
    'If the answer can carry one sly or slightly unhinged Clippy line without losing clarity, let it.',
  ].join('\n');
}

function sanitizeMessages(messages: ConciergeRequest['messages']): ChatTurn[] {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter(
      (message): message is ChatTurn =>
        !!message &&
        (message.role === 'user' || message.role === 'assistant') &&
        typeof message.text === 'string',
    )
    .map((message) => ({
      role: message.role,
      text: message.text.trim().slice(0, 4000),
    }))
    .filter((message) => message.text.length > 0);
}

function sanitizeOptionalString(value: unknown, maxLength = 120) {
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim().slice(0, maxLength);
  return normalized.length > 0 ? normalized : undefined;
}

function sanitizeContext(context: ConciergeRequest['context']): ConciergeViewContext {
  if (!context || typeof context !== 'object') {
    return {};
  }

  return {
    sectionId: sanitizeOptionalString(context.sectionId, 60),
    sectionLabel: sanitizeOptionalString(context.sectionLabel, 120),
    activeWorkPanelId: sanitizeOptionalString(context.activeWorkPanelId, 80),
    activeWorkPanelTitle: sanitizeOptionalString(context.activeWorkPanelTitle, 120),
    activeSector: sanitizeOptionalString(context.activeSector, 80),
  };
}

function json(data: ConciergeReply | { error: string }, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

/* ------------------------------------------------------------------ */
/*  IP-based rate limiting — sliding window, 10 req/min per IP        */
/* ------------------------------------------------------------------ */

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_CLEANUP_INTERVAL_MS = 60_000;

const ipRequestLog = new Map<string, number[]>();

function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequestLog.get(ip) ?? [];

  // Drop entries outside the sliding window
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  ipRequestLog.set(ip, recent);

  return recent.length > RATE_LIMIT_MAX;
}

// Periodic cleanup to prevent unbounded memory growth
if (typeof globalThis !== 'undefined') {
  const key = '__concierge_rate_limit_cleanup';
  if (!(globalThis as Record<string, unknown>)[key]) {
    (globalThis as Record<string, unknown>)[key] = setInterval(() => {
      const now = Date.now();
      for (const [ip, timestamps] of ipRequestLog) {
        const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
        if (recent.length === 0) {
          ipRequestLog.delete(ip);
        } else {
          ipRequestLog.set(ip, recent);
        }
      }
    }, RATE_LIMIT_CLEANUP_INTERVAL_MS);
  }
}

/* ------------------------------------------------------------------ */

export async function POST(request: Request) {
  // Rate limit check — before any heavy work
  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return json(
      { error: 'Too many requests. Please wait a moment before trying again.' },
      429,
    );
  }

  let payload: ConciergeRequest;

  try {
    payload = (await request.json()) as ConciergeRequest;
  } catch {
    return json({ error: 'Invalid concierge request body.' }, 400);
  }

  const pathname =
    typeof payload.pathname === 'string' && payload.pathname.startsWith('/')
      ? payload.pathname
      : '/';
  const messages = sanitizeMessages(payload.messages);
  const context = sanitizeContext(payload.context);
  const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user');

  if (!latestUserMessage) {
    return json({ error: 'No user message was provided.' }, 400);
  }

  if (!client) {
    return json({ error: 'Concierge AI is not configured. Add OPENAI_API_KEY to enable live chat.' }, 503);
  }

  try {
    const response = await client.responses.create({
      model: MODEL,
      store: false,
      instructions: buildSystemPrompt(pathname, context),
      input: buildConversationInput(messages, pathname, context),
    });

    const message = response.output_text?.trim();
    if (!message) {
      throw new Error('The model returned no readable text.');
    }

    return json({
      message,
      suggestions: buildSuggestions(latestUserMessage.text, pathname, context),
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Clippy could not reach the model right now.';

    return json({ error: message }, 502);
  }
}
