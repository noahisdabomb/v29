'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { CAL_COM_URL, SITE_SETTINGS } from '@/lib/content';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import {
  buildContextualSuggestionSet,
  getConciergeIntroContent,
  getConciergePageKey,
  getContextualLeadCopy,
  type ConciergeSuggestion,
  type ConciergeViewContext,
} from '@/lib/concierge';

const ClippyScene = dynamic(() => import('@/components/three/ClippyModel'), {
  ssr: false,
  loading: () => <div className="size-full" aria-hidden="true" />,
});

const IDLE_MESSAGES = [
  `I know every case study, metric, and process detail on this site.`,
  `15 years of campaigns. Ask me about any of them.`,
  `Coca-Cola, Orangetheory, Delta. I can walk you through the work.`,
  `Your evening brief. His morning priority. That's how it works.`,
  `I outlived Internet Explorer. I have perspective.`,
  `Need the quick version? I've got you.`,
  `Ask me anything — I know where everything is.`,
  `Not sure where to start? That's literally why I'm here.`,
];

const PAGE_MESSAGES: Record<string, string[]> = {
  home: [
    `Skip the scroll. Ask me what you need.`,
    `Bangkok is 12 hours ahead. The overnight cycle is the whole model.`,
    `Agency-level creative. No agency required. That's the pitch.`,
  ],
  work: [
    `Real campaigns. Real numbers. Not concept decks.`,
    `3.75 billion impressions on Orangetheory alone. Ask me about it.`,
    `The case studies show how Noah thinks, not just what he made.`,
  ],
  'case-study': [
    `Every campaign here started with a tension, not a template.`,
    `Actual numbers. Not "increased engagement." Numbers.`,
    `A good case study tells you how someone thinks. This is one.`,
  ],
  'how-i-work': [
    `One person. No layers. Strategy to final files.`,
    `Solo when it's tight. Scaled to 10+ when the brief needs it.`,
    `No handoff chain. The person who thinks is the person who makes.`,
  ],
  contact: [
    `20 minutes. Shorter than an alignment meeting and actually useful.`,
    `Book the call or send the brief. Simple.`,
    `No maze. No gatekeepers. Just the next step.`,
  ],
};

const CONTACT_PANEL_COPY = {
  title: 'Ready to talk? Two ways in.',
  body: 'Book 20 minutes for a strategy call, or send the brief directly and skip the calendar.',
};

const DEFAULT_EMAIL_HREF = `mailto:${SITE_SETTINGS.email}`;

const ACTION_RESPONSES: Record<string, string> = {
  'Where should I start?':
    'Start with the work. The case studies tell you quickly whether Noah can think, make, and land the thing. Strategy to final files.',
  "What's the setup?":
    'One senior creative director in Bangkok, 12 hours ahead of the US. Your evening brief is his morning priority. Strategy to final files, no handoff chain.',
  'Is a call worth it?':
    'If you have a real brief, the call is the fastest way to figure out fit, scope, and timing. 20 minutes. No sales pitch.',
  'Which case study leads?':
    'Orangetheory is the strongest starting point. Five years, 250 to 1,300+ studios, 3.75B impressions. It shows strategic judgment and system thinking at scale.',
  'Can I just email?':
    'Send the brief directly. Noah will review it and come back with an honest read on fit, scope, and timing. No calendar required.',
};

const FOLLOW_UP_LABELS: Record<string, string[]> = {
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

type ClippyState = 'idle' | 'wave' | 'talk' | 'blink' | 'look';
type ConciergeTab = 'chat' | 'contact';
type ConciergeAction = (typeof SITE_SETTINGS.conciergeActions)[number];

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timeLabel: string;
  suggestions?: ConciergeSuggestion[];
};

type ConciergeReply = {
  message: string;
  suggestions?: ConciergeSuggestion[];
};

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-1">
      <span className="size-1.5 animate-[bounce_1s_ease-in-out_infinite] rounded-full bg-white/50" />
      <span className="size-1.5 animate-[bounce_1s_ease-in-out_0.15s_infinite] rounded-full bg-white/50" />
      <span className="size-1.5 animate-[bounce_1s_ease-in-out_0.3s_infinite] rounded-full bg-white/50" />
    </div>
  );
}

function isExternalHref(href: string) {
  return href.startsWith('http') || href.startsWith('mailto:');
}

function createMessageId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createTimeLabel() {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date());
}

function shuffleMessages(messages: string[]) {
  const next = [...messages];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }

  return next;
}

function buildIdleQueue(messages: string[], lastMessage: string | null) {
  const uniqueMessages = [...new Set(messages)];
  const queue = shuffleMessages(uniqueMessages);

  if (lastMessage && queue.length > 1 && queue[0] === lastMessage) {
    const nextIndex = queue.findIndex((message) => message !== lastMessage);

    if (nextIndex > 0) {
      [queue[0], queue[nextIndex]] = [queue[nextIndex], queue[0]];
    }
  }

  return queue;
}

function getActionByLabel(label: string, actions: ConciergeAction[]) {
  return actions.find((action) => action.label === label) ?? null;
}

function getStarterSuggestions(actions: ConciergeAction[]): ConciergeSuggestion[] {
  return actions.slice(0, 3).map((action) => ({
    label: action.label,
    prompt: action.prompt,
  }));
}

function actionToSuggestion(
  action: ConciergeAction | null,
  mode: 'prompt' | 'mixed' = 'mixed',
): ConciergeSuggestion | null {
  if (!action) return null;

  if (mode === 'prompt') {
    return { label: action.label, prompt: action.prompt };
  }

  if (
    action.external ||
    action.href.startsWith('mailto:') ||
    action.label === 'Which case study leads?'
  ) {
    return { label: action.label, href: action.href };
  }

  return { label: action.label, prompt: action.prompt };
}

function buildSuggestionsFromLabels(
  labels: string[],
  actions: ConciergeAction[],
  mode: 'prompt' | 'mixed' = 'mixed',
) {
  const seen = new Set<string>();
  const suggestions: ConciergeSuggestion[] = [];

  for (const label of labels) {
    if (seen.has(label)) continue;
    seen.add(label);

    const suggestion = actionToSuggestion(getActionByLabel(label, actions), mode);
    if (suggestion) {
      suggestions.push(suggestion);
    }
  }

  return suggestions.slice(0, 3);
}

function getIntroMessage(
  pathname: string,
  context: ConciergeViewContext,
  actions: ConciergeAction[],
): ChatMessage {
  const intro = getConciergeIntroContent(pathname, context, getStarterSuggestions(actions));

  return {
    id: createMessageId(),
    role: 'assistant',
    text: intro.body,
    timeLabel: createTimeLabel(),
    suggestions: intro.suggestions,
  };
}

function pickTopObservedElement(entries: Iterable<Element>) {
  let winner: HTMLElement | null = null;
  let bestScore = -1;

  for (const entry of entries) {
    if (!(entry instanceof HTMLElement)) continue;

    const rect = entry.getBoundingClientRect();
    const visibleTop = Math.max(rect.top, 0);
    const visibleBottom = Math.min(rect.bottom, window.innerHeight);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    const ratio = visibleHeight / Math.max(rect.height, 1);
    const center = rect.top + rect.height / 2;
    const distancePenalty = Math.abs(center - window.innerHeight * 0.42) / window.innerHeight;
    const score = ratio - distancePenalty * 0.15;

    if (score > bestScore) {
      bestScore = score;
      winner = entry;
    }
  }

  return winner;
}

function AssistantGlyph({ className = '' }: { className?: string }) {
  const dots = [
    'translate-y-2.5',
    'translate-y-1',
    'translate-y-2.5',
    'translate-x-1',
    '',
    '-translate-x-1',
    'translate-x-1',
    '',
    '-translate-x-1',
    'translate-y-[-0.2rem]',
    'translate-y-[-1rem]',
    'translate-y-[-0.2rem]',
  ];

  return (
    <div
      aria-hidden="true"
      className={`grid grid-cols-3 gap-1.5 text-white/90 ${className}`}
    >
      {dots.map((transformClass, index) => (
        <span
          key={index}
          className={`size-1.5 rounded-full bg-current ${transformClass}`}
        />
      ))}
    </div>
  );
}

function ClippyFallbackMark({
  className = '',
  subdued = false,
}: {
  className?: string;
  subdued?: boolean;
}) {
  const lineGradientId = useId();
  const glowGradientId = useId();
  const eyeGradientId = useId();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 280 360"
      className={className}
      fill="none"
    >
      <defs>
        <radialGradient id={glowGradientId} cx="0" cy="0" r="1" gradientTransform="translate(160 220) rotate(90) scale(152 126)" gradientUnits="userSpaceOnUse">
          <stop stopColor={subdued ? 'rgba(224, 68, 88, 0.24)' : 'rgba(224, 68, 88, 0.34)'} />
          <stop offset="1" stopColor="rgba(224, 68, 88, 0)" />
        </radialGradient>
        <linearGradient id={lineGradientId} x1="82" y1="72" x2="220" y2="304" gradientUnits="userSpaceOnUse">
          <stop stopColor={subdued ? '#efe9e0' : '#f6f1e6'} stopOpacity={subdued ? '0.34' : '0.76'} />
          <stop offset="0.52" stopColor={subdued ? '#d9c6cf' : '#dccad2'} stopOpacity={subdued ? '0.48' : '0.9'} />
          <stop offset="1" stopColor={subdued ? '#c7b2bc' : '#c9b2bc'} stopOpacity={subdued ? '0.34' : '0.8'} />
        </linearGradient>
        <linearGradient id={eyeGradientId} x1="122" y1="122" x2="170" y2="154" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff7ef" />
          <stop offset="1" stopColor="#dcc7bc" />
        </linearGradient>
      </defs>

      <ellipse cx="164" cy="232" rx="108" ry="90" fill={`url(#${glowGradientId})`} />

      <path
        d="M192 46c43 0 78 35 78 78v108c0 58-47 105-105 105S60 290 60 232V116c0-36 29-65 65-65s65 29 65 65v122c0 17 14 31 31 31s31-14 31-31V124c0-25-20-45-45-45s-45 20-45 45v120"
        stroke={`url(#${lineGradientId})`}
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M154 118v110c0 30 24 54 54 54s54-24 54-54V126c0-18-15-33-33-33s-33 15-33 33v106c0 10 8 18 18 18s18-8 18-18V144"
        stroke={`url(#${lineGradientId})`}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={subdued ? '0.78' : '0.92'}
      />

      <ellipse cx="134" cy="112" rx="16" ry="20" fill={`url(#${eyeGradientId})`} />
      <ellipse cx="178" cy="132" rx="16" ry="20" fill={`url(#${eyeGradientId})`} />
      <circle cx="138" cy="119" r="5.5" fill="#322d2b" />
      <circle cx="182" cy="139" r="5.5" fill="#322d2b" />
      <path
        d="M120 88c8-7 18-9 29-8"
        stroke="#2d2927"
        strokeOpacity={subdued ? '0.32' : '0.54'}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M163 105c8-7 18-9 29-8"
        stroke="#2d2927"
        strokeOpacity={subdued ? '0.26' : '0.46'}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClippyStage({
  className = '',
  variant,
  talking,
  waving,
  subdued = false,
  scene3dReady = true,
}: {
  className?: string;
  variant: 'launcher' | 'panel';
  talking: boolean;
  waving: boolean;
  subdued?: boolean;
  scene3dReady?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      {variant === 'panel' ? (
        <div
          aria-hidden="true"
          className="absolute inset-x-[10%] bottom-[8%] h-[16%] rounded-full bg-black/35 blur-2xl"
        />
      ) : null}
      <div
        className={`absolute inset-0 ${
          variant === 'panel'
            ? '[mask-image:linear-gradient(90deg,transparent_0%,black_14%,black_86%,transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_14%,black_86%,transparent_100%)]'
            : ''
        }`}
      >
        {scene3dReady ? (
          <ErrorBoundary
            fallback={
              <ClippyFallbackMark
                subdued={subdued}
                className="h-full w-full"
              />
            }
          >
            <ClippyScene
              talking={talking}
              waving={waving}
              variant={variant}
              className="size-full"
            />
          </ErrorBoundary>
        ) : null}
      </div>
    </div>
  );
}

{/* Change 7: Input area simplified — removed AssistantGlyph, simplified container, added active:scale-95 to send */}
function DockedComposer({
  inputRef,
  value,
  onChange,
  onSubmit,
  placeholder,
  canSend,
  isSubmitting,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (nextValue: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  placeholder: string;
  canSend: boolean;
  isSubmitting: boolean;
}) {
  return (
    <form className="mt-4 border-t border-border-subtle pt-4" onSubmit={onSubmit}>
      <div className="rounded-2xl border border-border-subtle bg-bg-surface px-4 py-3 transition-colors duration-200 focus-within:border-text-faint">
        <div className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            aria-label={placeholder}
            className="concierge-input min-w-0 flex-1 appearance-none border-0 bg-transparent text-base text-text-primary shadow-none outline-0 ring-0 placeholder:text-text-faint"
          />
          {isSubmitting ? (
            <div className="flex shrink-0 items-center gap-2 pr-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary">
                Thinking
              </span>
              <span className="size-2 rounded-full bg-white/45 animate-pulse" />
            </div>
          ) : canSend ? (
            <button
              type="submit"
              className="grid size-9 shrink-0 place-items-center rounded-full border border-border-subtle bg-bg-surface text-text-primary transition-all duration-200 hover:border-text-faint hover:bg-white/[0.06] hover:text-white active:scale-95 active:duration-100 focus-visible:outline-none"
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </form>
  );
}

function resolveQuestionToAction(question: string, actions: ConciergeAction[]): ConciergeAction {
  const normalized = question.toLowerCase();
  const allActions = SITE_SETTINGS.conciergeActions;
  const fallbackAction = actions[0] ?? allActions[0];

  const findAction = (label: string) =>
    getActionByLabel(label, actions) ?? getActionByLabel(label, allActions) ?? fallbackAction;

  if (/(email|contact|reach|message|note)/.test(normalized)) {
    return findAction('Can I just email?');
  }

  if (/(book|call|project|budget|timeline|hire|talk|brief|fit|scope)/.test(normalized)) {
    return findAction('Is a call worth it?');
  }

  if (/(how|process|workflow|model|system|overnight|work together)/.test(normalized)) {
    return findAction("What's the setup?");
  }

  if (/(case study|study|proof|strongest)/.test(normalized)) {
    return findAction('Which case study leads?');
  }

  if (/(work|portfolio|examples|show me|start)/.test(normalized)) {
    return findAction('Where should I start?');
  }

  return findAction('Where should I start?');
}

function buildFallbackReply(
  question: string,
  pathname: string,
  context: ConciergeViewContext,
  actions: ConciergeAction[],
): ConciergeReply {
  const action = resolveQuestionToAction(question, actions);
  const labels =
    FOLLOW_UP_LABELS[action.label] ??
    ['Where should I start?', "What's the setup?", 'Is a call worth it?'];
  const lead = getContextualLeadCopy(pathname, context);
  const messageBody =
    ACTION_RESPONSES[action.label] ??
    'I can help with the work, the model, the fit, or the next move. Ask the vague version if you want. I will answer the specific one anyway.';

  return {
    message: lead ? `${lead} ${messageBody}` : messageBody,
    suggestions: buildContextualSuggestionSet(
      pathname,
      context,
      buildSuggestionsFromLabels(labels, SITE_SETTINGS.conciergeActions),
    ),
  };
}

{/* Change 10: SuggestionChip — site tokens for inline variant */}
function SuggestionChip({
  suggestion,
  onPrompt,
  onNavigate,
  variant = 'inline',
}: {
  suggestion: ConciergeSuggestion;
  onPrompt: (prompt: string) => void;
  onNavigate: () => void;
  variant?: 'inline' | 'hero-primary' | 'hero-secondary' | 'contact-primary' | 'stacked';
}) {
  const className =
    variant === 'contact-primary'
      ? 'inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-5 py-3 font-heading text-base font-semibold text-text-primary transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(224,68,88,0.22)]'
      : variant === 'hero-primary'
        ? 'inline-flex min-h-12 max-w-full items-center rounded-full border border-border-subtle bg-transparent px-5 py-3 text-left font-heading text-base font-semibold leading-tight text-text-primary transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_24px_rgba(224,68,88,0.12)]'
      : variant === 'hero-secondary'
        ? 'inline-flex w-fit rounded-full border border-border-subtle bg-transparent px-4 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-text-secondary transition-colors duration-200 hover:border-text-faint hover:text-text-primary'
        : 'inline-flex min-h-11 items-center rounded-full border border-border-subtle bg-bg-surface px-3.5 py-2 text-xs text-text-secondary transition-colors duration-200 hover:border-text-faint hover:text-text-primary';

  if (suggestion.prompt) {
    return (
      <button
        type="button"
        onClick={() => onPrompt(suggestion.prompt!)}
        className={className}
      >
        {suggestion.label}
      </button>
    );
  }

  if (!suggestion.href) return null;

  if (isExternalHref(suggestion.href)) {
    return (
      <a
        href={suggestion.href}
        target={suggestion.href.startsWith('http') ? '_blank' : undefined}
        rel={suggestion.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        onClick={onNavigate}
        className={className}
      >
        {suggestion.label}
      </a>
    );
  }

  return (
    <Link href={suggestion.href} onClick={onNavigate} className={className}>
      {suggestion.label}
    </Link>
  );
}

export default function Concierge() {
  const pathname = usePathname();
  const pageKey = getConciergePageKey(pathname);
  const asideRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const idleQueueRef = useRef<string[]>([]);
  const lastIdleMessageRef = useRef<string | null>(null);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bubbleSwapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestAbortRef = useRef<AbortController | null>(null);

  const [loaderDone, setLoaderDone] = useState(false);
  const [footerOffset, setFooterOffset] = useState(0);
  const [clippyState, setClippyState] = useState<ClippyState>('idle');
  const [displayText, setDisplayText] = useState('');
  const [isBubbleTyping, setIsBubbleTyping] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scene3dReady, setScene3dReady] = useState(false);
  const [activeTab, setActiveTab] = useState<ConciergeTab>('chat');
  const [questionInput, setQuestionInput] = useState('');
  const [viewContext, setViewContext] = useState<ConciergeViewContext>({});
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rotatingMessages = useMemo(
    () => [...(PAGE_MESSAGES[pageKey] || []), ...IDLE_MESSAGES],
    [pageKey],
  );

  const visibleActions = useMemo(() => {
    const scoped = SITE_SETTINGS.conciergeActions.filter(
      (action) => action.page === 'all' || action.page === pageKey,
    );
    const fallback = SITE_SETTINGS.conciergeActions.filter(
      (action) =>
        action.page === 'all' &&
        !scoped.some((scopedAction) => scopedAction.label === action.label),
    );

    return [...scoped, ...fallback].slice(0, 3);
  }, [pageKey]);

  const introContent = useMemo(
    () =>
      getConciergeIntroContent(
        pathname,
        viewContext,
        getStarterSuggestions(visibleActions),
      ),
    [pathname, viewContext, visibleActions],
  );

  // Wait for loader to finish before rendering Concierge
  // (WebGL canvases can escape z-index stacking on some compositing layers)
  useEffect(() => {
    if (sessionStorage.getItem('loaderSeen') === '1') {
      setLoaderDone(true);
      return;
    }
    // Poll briefly — loader sets sessionStorage when done (max ~1.2s)
    const interval = setInterval(() => {
      if (sessionStorage.getItem('loaderSeen') === '1') {
        setLoaderDone(true);
        clearInterval(interval);
      }
    }, 200);
    // Safety: always show after 2s regardless
    const safety = setTimeout(() => { setLoaderDone(true); clearInterval(interval); }, 2000);
    return () => { clearInterval(interval); clearTimeout(safety); };
  }, []);

  // Push Clippy above footer when it scrolls into view
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    let raf = 0;
    const update = () => {
      const rect = footer.getBoundingClientRect();
      const overlap = Math.max(0, window.innerHeight - rect.top);
      setFooterOffset(overlap);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Defer 3D scene: load on expand, hover, or after 3s idle
  useEffect(() => {
    if (scene3dReady) return;
    if (isExpanded) {
      setScene3dReady(true);
      return;
    }
    const timer = setTimeout(() => setScene3dReady(true), 3000);
    return () => clearTimeout(timer);
  }, [isExpanded, scene3dReady]);

  const clearBubbleTyping = useCallback(() => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
  }, []);

  const clearBubbleSwapTimeout = useCallback(() => {
    if (bubbleSwapTimeoutRef.current) {
      clearTimeout(bubbleSwapTimeoutRef.current);
      bubbleSwapTimeoutRef.current = null;
    }
  }, []);

  const getNextIdleMessage = useCallback(() => {
    if (idleQueueRef.current.length === 0) {
      idleQueueRef.current = buildIdleQueue(rotatingMessages, lastIdleMessageRef.current);
    }

    const nextMessage =
      idleQueueRef.current.shift() ?? rotatingMessages[0] ?? IDLE_MESSAGES[0];

    lastIdleMessageRef.current = nextMessage;
    return nextMessage;
  }, [rotatingMessages]);

  const typeMessage = useCallback(
    (text: string) => {
      clearBubbleTyping();
      setIsBubbleTyping(true);
      setBubbleVisible(true);
      setClippyState('talk');
      setDisplayText('');

      let index = 0;
      typingIntervalRef.current = setInterval(() => {
        index += 1;
        setDisplayText(text.slice(0, index));

        if (index >= text.length) {
          clearBubbleTyping();
          setIsBubbleTyping(false);
          setClippyState('idle');
        }
      }, 14);
    },
    [clearBubbleTyping],
  );

  const closeConcierge = useCallback(() => {
    setIsExpanded(false);
    setActiveTab('chat');
    setQuestionInput('');
    setClippyState('idle');
  }, []);

  const setIntroConversation = useCallback(() => {
    setChatMessages([getIntroMessage(pathname, viewContext, visibleActions)]);
  }, [pathname, viewContext, visibleActions]);

  const resetConversation = useCallback(() => {
    requestAbortRef.current?.abort();
    requestAbortRef.current = null;
    setIsSubmitting(false);
    setQuestionInput('');
    setClippyState('wave');
    setIntroConversation();
  }, [setIntroConversation]);

  const requestReply = useCallback(
    async (conversation: ChatMessage[]) => {
      const controller = new AbortController();
      requestAbortRef.current = controller;

      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pathname,
          context: viewContext,
          messages: conversation.map((message) => ({
            role: message.role,
            text: message.text,
          })),
        }),
        signal: controller.signal,
      });

      const payload = (await response.json()) as ConciergeReply & { error?: string };
      if (!response.ok || !payload.message) {
        throw new Error(payload.error || 'The concierge reply failed.');
      }

      return payload;
    },
    [pathname, viewContext],
  );

  const submitPrompt = useCallback(
    async (incomingPrompt: string) => {
      const trimmed = incomingPrompt.trim();
      if (!trimmed || isSubmitting) return;

      const userMessage: ChatMessage = {
        id: createMessageId(),
        role: 'user',
        text: trimmed,
        timeLabel: createTimeLabel(),
      };

      const nextConversation = [...chatMessages, userMessage];
      setActiveTab('chat');
      setChatMessages(nextConversation);
      setQuestionInput('');
      setIsSubmitting(true);
      setClippyState('talk');

      try {
        const reply = await requestReply(nextConversation);

        setChatMessages((current) => [
          ...current,
          {
            id: createMessageId(),
            role: 'assistant',
            text: reply.message,
            timeLabel: createTimeLabel(),
            suggestions: reply.suggestions,
          },
        ]);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        const fallback = buildFallbackReply(trimmed, pathname, viewContext, visibleActions);
        setChatMessages((current) => [
          ...current,
          {
            id: createMessageId(),
            role: 'assistant',
            text: `The live model is being temperamental. So you are getting local Clippy for a minute. ${fallback.message}`,
            timeLabel: createTimeLabel(),
            suggestions: fallback.suggestions,
          },
        ]);
      } finally {
        requestAbortRef.current = null;
        setIsSubmitting(false);
        setClippyState('wave');
      }
    },
    [chatMessages, isSubmitting, pathname, requestReply, viewContext, visibleActions],
  );

  const toggleConcierge = useCallback(() => {
    clearBubbleTyping();
    clearBubbleSwapTimeout();

    setIsExpanded((current) => {
      const next = !current;

      if (next) {
        setActiveTab('chat');
        setBubbleVisible(false);
        setIsBubbleTyping(false);
        setQuestionInput('');
        setClippyState('wave');
      } else {
        setQuestionInput('');
        setClippyState('idle');
      }

      return next;
    });
  }, [clearBubbleSwapTimeout, clearBubbleTyping]);

  useEffect(() => {
    setViewContext({});

    const sectionNodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-concierge-section]'),
    );
    const panelNodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-work-panel]'),
    );
    const activeSections = new Set<Element>();
    const activePanels = new Set<Element>();

    let frameId = 0;

    const readActiveSector = () => {
      const filterNav = document.querySelector<HTMLElement>(
        '[aria-label="Filter work by sector"]',
      );
      const activeFilter = filterNav?.querySelector<HTMLElement>('[aria-pressed="true"]');
      return activeFilter?.textContent?.trim() || undefined;
    };

    const updateContext = () => {
      const activeSection =
        pickTopObservedElement(activeSections.size > 0 ? activeSections : sectionNodes);
      const activePanel =
        activePanels.size > 0 ? pickTopObservedElement(activePanels) : null;

      const nextContext: ConciergeViewContext = {
        sectionId: activeSection?.dataset.conciergeSection,
        sectionLabel: activeSection?.dataset.conciergeLabel,
        activeWorkPanelId: activePanel?.dataset.workPanelId,
        activeWorkPanelTitle: activePanel?.dataset.workPanelTitle,
        activeSector: readActiveSector(),
      };

      setViewContext((current) => {
        if (
          current.sectionId === nextContext.sectionId &&
          current.sectionLabel === nextContext.sectionLabel &&
          current.activeWorkPanelId === nextContext.activeWorkPanelId &&
          current.activeWorkPanelTitle === nextContext.activeWorkPanelTitle &&
          current.activeSector === nextContext.activeSector
        ) {
          return current;
        }

        return nextContext;
      });
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateContext);
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSections.add(entry.target);
          } else {
            activeSections.delete(entry.target);
          }
        });

        scheduleUpdate();
      },
      { threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8] },
    );

    const panelObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activePanels.add(entry.target);
          } else {
            activePanels.delete(entry.target);
          }
        });

        scheduleUpdate();
      },
      { threshold: [0, 0.2, 0.35, 0.5, 0.7, 0.9] },
    );

    sectionNodes.forEach((node) => sectionObserver.observe(node));
    panelNodes.forEach((node) => panelObserver.observe(node));

    const filterNav = document.querySelector<HTMLElement>('[aria-label="Filter work by sector"]');
    const filterObserver = filterNav
      ? new MutationObserver(() => {
          scheduleUpdate();
        })
      : null;

    filterObserver?.observe(filterNav!, {
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-pressed'],
    });

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    scheduleUpdate();

    return () => {
      cancelAnimationFrame(frameId);
      sectionObserver.disconnect();
      panelObserver.disconnect();
      filterObserver?.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [pathname]);

  useEffect(() => {
    setChatMessages((current) => {
      if (current.some((message) => message.role === 'user')) {
        return current;
      }

      return [getIntroMessage(pathname, viewContext, visibleActions)];
    });
  }, [pathname, viewContext, visibleActions]);

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      if (isExpanded) return;
      setClippyState('wave');
      setBubbleVisible(true);
      setIsBubbleTyping(true);

      bubbleSwapTimeoutRef.current = setTimeout(() => {
        typeMessage(getNextIdleMessage());
      }, 800);
    }, 2500);

    const interval = setInterval(() => {
      if (isExpanded) return;

      clearBubbleTyping();
      clearBubbleSwapTimeout();
      setBubbleVisible(false);
      setClippyState('idle');

      bubbleSwapTimeoutRef.current = setTimeout(() => {
        const message = getNextIdleMessage();
        setClippyState('wave');
        setIsBubbleTyping(true);
        setBubbleVisible(true);

        bubbleSwapTimeoutRef.current = setTimeout(() => {
          typeMessage(message);
        }, 600);
      }, 800);
    }, 10000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
      clearBubbleTyping();
      clearBubbleSwapTimeout();
    };
  }, [
    clearBubbleSwapTimeout,
    clearBubbleTyping,
    getNextIdleMessage,
    isExpanded,
    typeMessage,
  ]);

  useEffect(() => {
    idleQueueRef.current = buildIdleQueue(rotatingMessages, lastIdleMessageRef.current);
    clearBubbleTyping();
    clearBubbleSwapTimeout();
    requestAbortRef.current?.abort();
    requestAbortRef.current = null;

    setIsSubmitting(false);
    setIsExpanded(false);
    setActiveTab('chat');
    setQuestionInput('');
    setClippyState('wave');
    setBubbleVisible(true);
    setDisplayText('');
    setIsBubbleTyping(true);
    setIntroConversation();

    bubbleSwapTimeoutRef.current = setTimeout(() => {
      typeMessage(getNextIdleMessage());
    }, 400);
  }, [
    clearBubbleSwapTimeout,
    clearBubbleTyping,
    getNextIdleMessage,
    pathname,
    rotatingMessages,
    setIntroConversation,
    typeMessage,
  ]);

  useEffect(() => {
    if (!isExpanded || activeTab !== 'chat' || isSubmitting) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 260);

    return () => clearTimeout(timer);
  }, [activeTab, isExpanded, isSubmitting]);

  useEffect(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [chatMessages, isSubmitting]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (clippyState === 'idle') {
        setClippyState('blink');
        setTimeout(() => setClippyState('idle'), 150);
      }
    }, 3000 + Math.random() * 2000);

    const lookInterval = setInterval(() => {
      if (clippyState === 'idle') {
        setClippyState('look');
        setTimeout(() => setClippyState('idle'), 1200);
      }
    }, 6000 + Math.random() * 3000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(lookInterval);
    };
  }, [clippyState]);

  useEffect(() => {
    if (!isExpanded) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!asideRef.current?.contains(event.target as Node)) {
        closeConcierge();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeConcierge();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeConcierge, isExpanded]);

  // Focus trap: keep Tab/Shift+Tab within the dialog when expanded
  useEffect(() => {
    if (!isExpanded) return;

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !asideRef.current) return;

      const focusable = asideRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleFocusTrap);
    return () => document.removeEventListener('keydown', handleFocusTrap);
  }, [isExpanded]);

  useEffect(() => {
    return () => {
      clearBubbleTyping();
      clearBubbleSwapTimeout();
      requestAbortRef.current?.abort();
    };
  }, [clearBubbleSwapTimeout, clearBubbleTyping]);

  const inputLabel = isSubmitting ? 'Thinking...' : 'Ask me anything about the work...';
  const canSend = questionInput.trim().length > 0 && !isSubmitting;
  const hasConversationStarted = chatMessages.some((message) => message.role === 'user');
  const isIntroState = activeTab === 'chat' && !hasConversationStarted;
  const introMessage = chatMessages[0];
  const latestAssistantSuggestionMessageId =
    [...chatMessages]
      .reverse()
      .find((message) => message.role === 'assistant' && message.suggestions?.length)?.id ?? null;
  const showBackButton = activeTab === 'chat' && hasConversationStarted;
  const activeThreadLabel =
    viewContext.activeWorkPanelTitle ??
    viewContext.sectionLabel ??
    'Active conversation';
  const contactSuggestions: ConciergeSuggestion[] = [
    { label: 'Book a strategy call', href: CAL_COM_URL },
    { label: 'Email Noah', href: DEFAULT_EMAIL_HREF },
  ];

  return (
    <aside
      ref={asideRef}
      className={`fixed left-2 z-40 sm:left-3 transition-[visibility,opacity] duration-500 ${loaderDone ? 'visible opacity-100' : 'invisible opacity-0'}`}
      style={{ bottom: `${Math.max(8, footerOffset + 8)}px` }}
      {...(isExpanded
        ? { role: 'dialog' as const, 'aria-modal': true, 'aria-label': 'AI Concierge' }
        : { 'aria-hidden': true, 'aria-label': 'Clippy assistant' })}
    >
      {/* Change 8: Card open/close — asymmetric spring for open, quick ease-out for close */}
      <div
        className={`absolute bottom-0 left-0 origin-bottom-left ${
          isExpanded
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100 transition-[transform,opacity] duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]'
            : 'pointer-events-none translate-y-3 scale-[0.96] opacity-0 transition-[transform,opacity] duration-200 ease-out'
        }`}
      >
        {/* Change 1: Card background/border to site tokens */}
        <div
          className={`${
            isIntroState || activeTab === 'contact'
              ? 'h-[min(34rem,calc(100vh-0.8rem))] sm:h-[min(34rem,calc(100vh-1rem))] lg:h-[min(34rem,calc(100vh-1.5rem))]'
              : 'h-[min(45rem,calc(100vh-0.8rem))] sm:h-[min(45rem,calc(100vh-1rem))] lg:h-[min(42.5rem,calc(100vh-1.5rem))]'
          } w-[min(32rem,calc(100vw-0.8rem))] transform-gpu overflow-hidden rounded-[2.15rem] border border-border-subtle bg-bg-card/[0.985] shadow-[0_28px_90px_rgba(0,0,0,0.58),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl transition-[height] duration-300 ease-out [backface-visibility:hidden] sm:w-[min(32rem,calc(100vw-1rem))]`}
        >
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(2.15rem-1px)]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.025)_0%,rgba(255,255,255,0)_18%,rgba(0,0,0,0)_100%)]" />

            <div className="relative z-10 flex h-full min-h-0 flex-col p-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] sm:p-6 sm:pb-[calc(env(safe-area-inset-bottom)+1.5rem)]">
              <div className="flex items-start justify-between gap-3">
                {showBackButton ? (
                  <div className="flex min-w-0 items-center gap-3">
                    {/* Change 3: Back button — site tokens */}
                    <button
                      type="button"
                      onClick={resetConversation}
                      className="grid size-10 shrink-0 place-items-center rounded-full border border-border-subtle bg-bg-surface text-white/90 transition-colors duration-200 hover:bg-white/[0.06]"
                      aria-label="Back to Clippy intro"
                    >
                      <svg viewBox="0 0 24 24" className="size-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <div className="min-w-0">
                      {/* Change 4: Typography sweep */}
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary">
                        Conversation
                      </p>
                      <p className="truncate text-sm text-text-secondary">
                        {activeThreadLabel}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Change 2: Tab bar — underline indicator, naked buttons */
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveTab('chat')}
                      className={`relative font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200 ${
                        activeTab === 'chat'
                          ? 'text-text-primary'
                          : 'text-text-tertiary hover:text-text-secondary'
                      }`}
                    >
                      Chat
                      {activeTab === 'chat' ? (
                        <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-accent" />
                      ) : null}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('contact')}
                      className={`relative font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200 ${
                        activeTab === 'contact'
                          ? 'text-text-primary'
                          : 'text-text-tertiary hover:text-text-secondary'
                      }`}
                    >
                      Contact
                      {activeTab === 'contact' ? (
                        <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-accent" />
                      ) : null}
                    </button>
                  </div>
                )}

                {/* Change 3: Close button — SVG icon with site tokens */}
                <button
                  type="button"
                  onClick={closeConcierge}
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-border-subtle bg-bg-surface text-text-secondary transition-colors duration-200 hover:border-text-faint hover:text-text-primary"
                  aria-label="Close Clippy helper"
                >
                  <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="M6 6l12 12" /></svg>
                </button>
              </div>

              {activeTab === 'contact' ? (
                /* Change 9: animate-concierge-fade-in on contact tab */
                <div key="contact" className="animate-concierge-fade-in mt-4 flex min-h-0 flex-1 flex-col">
                  <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_80%,rgba(224,68,88,0.08),transparent_85%)]" />
                    {/* Change 1: rgba gradient values updated */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,rgba(12,12,12,0)_0%,rgba(12,12,12,0.78)_100%)]" />
                    <div className="relative z-10 flex h-full flex-col pt-4 sm:pt-6">
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary">
                        Contact
                      </p>
                      <p className="mt-3 max-w-[14ch] font-heading text-[2.55rem] leading-[0.95] tracking-[-0.03em] text-text-primary">
                        {CONTACT_PANEL_COPY.title}
                      </p>
                      <p className="mt-4 max-w-[27ch] text-base leading-[1.58] text-text-secondary">
                        {CONTACT_PANEL_COPY.body}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col items-start gap-3 sm:max-w-[18.5rem]">
                    <SuggestionChip
                      suggestion={contactSuggestions[0]}
                      onPrompt={(prompt) => void submitPrompt(prompt)}
                      onNavigate={closeConcierge}
                      variant="contact-primary"
                    />
                    <div className="flex flex-wrap gap-2">
                      <SuggestionChip
                        suggestion={contactSuggestions[1]}
                        onPrompt={(prompt) => void submitPrompt(prompt)}
                        onNavigate={closeConcierge}
                        variant="hero-secondary"
                      />
                    </div>
                  </div>
                </div>
              ) : isIntroState ? (
                /* Change 9: animate-concierge-fade-in on intro state */
                <div key="intro" className="animate-concierge-fade-in mt-4 flex min-h-0 flex-1 flex-col">
                  <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_80%,rgba(224,68,88,0.08),transparent_85%)]" />
                    <div className="relative z-10 flex h-full flex-col pt-4 sm:pt-6">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary">
                          {introContent.eyebrow}
                        </p>
                        <p className="mt-3 max-w-[14ch] font-heading text-[2.55rem] leading-[0.95] tracking-[-0.03em] text-text-primary">
                          {introContent.title}
                        </p>
                        {introMessage ? (
                          <p className="mt-4 max-w-[27ch] text-base leading-[1.58] text-text-secondary">
                            {introMessage.text}
                          </p>
                        ) : null}
                        {introContent.suggestions.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-1.5">
                            {introContent.suggestions.map((suggestion) => (
                              <SuggestionChip
                                key={suggestion.label}
                                suggestion={suggestion}
                                onPrompt={(prompt) => void submitPrompt(prompt)}
                                onNavigate={closeConcierge}
                              />
                            ))}
                          </div>
                        )}
                    </div>
                  </div>

                  <DockedComposer
                    inputRef={inputRef}
                    value={questionInput}
                    onChange={setQuestionInput}
                    placeholder={inputLabel}
                    canSend={canSend}
                    isSubmitting={isSubmitting}
                    onSubmit={(event) => {
                      event.preventDefault();
                      void submitPrompt(questionInput);
                    }}
                  />
                </div>
              ) : (
                /* Change 9: animate-concierge-fade-in on conversation state */
                <div key="conversation" className="animate-concierge-fade-in mt-4 flex min-h-0 flex-1 flex-col">
                  <div ref={messagesRef} className="min-h-0 flex-1 overflow-y-auto" aria-live="polite" aria-relevant="additions">
                    <div className="space-y-6 pb-4 pt-1 pr-1">
                      {chatMessages.map((message) => (
                        <div key={message.id}>
                          {/* Change 6: Right-aligned user bubbles, assistant label header */}
                          {message.role === 'user' ? (
                            <div className="flex justify-end">
                              <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-white/[0.04] px-4 py-3">
                                <p className="text-sm leading-relaxed text-text-secondary">{message.text}</p>
                                <span className="mt-1.5 block font-mono text-[10px] tracking-[0.12em] text-text-faint">
                                  {message.timeLabel}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="mb-1 flex items-center gap-2">
                                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary">Clippy</span>
                                <span className="font-mono text-[10px] tracking-[0.12em] text-text-faint">
                                  {message.timeLabel}
                                </span>
                              </div>
                              <p className="text-base leading-relaxed text-text-primary">{message.text}</p>

                              {message.suggestions?.length &&
                              message.id === latestAssistantSuggestionMessageId ? (
                                <div className="mt-2.5 flex max-w-[26rem] flex-wrap gap-1.5 pt-1">
                                  {message.suggestions.map((suggestion) => (
                                    <SuggestionChip
                                      key={`${message.id}-${suggestion.label}`}
                                      suggestion={suggestion}
                                      onPrompt={(prompt) => void submitPrompt(prompt)}
                                      onNavigate={closeConcierge}
                                      variant="inline"
                                    />
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          )}
                        </div>
                      ))}

                      {isSubmitting ? (
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-primary">
                              Clippy
                            </span>
                            <span className="font-mono text-[10px] tracking-[0.12em] text-text-faint">
                              {createTimeLabel()}
                            </span>
                          </div>
                          <div className="pl-0.5">
                            <TypingIndicator />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <DockedComposer
                    inputRef={inputRef}
                    value={questionInput}
                    onChange={setQuestionInput}
                    placeholder={inputLabel}
                    canSend={canSend}
                    isSubmitting={isSubmitting}
                    onSubmit={(event) => {
                      event.preventDefault();
                      void submitPrompt(questionInput);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Breakout Clippy — outside card overflow for full-bleed effect */}
        <div
          className={`pointer-events-none absolute -bottom-16 -right-6 z-10 transition-opacity duration-300 sm:-bottom-14 sm:-right-8 ${
            isIntroState || activeTab === 'contact'
              ? 'opacity-60 sm:opacity-75'
              : 'opacity-0'
          }`}
        >
          <div className="h-[16rem] w-[10rem] sm:h-[20rem] sm:w-[12.5rem]">
            <ClippyStage
              variant="panel"
              talking={clippyState === 'talk' || isSubmitting}
              waving={clippyState === 'wave'}
              scene3dReady={scene3dReady}
              className="size-full"
            />
          </div>
        </div>
      </div>

      {/* Change 8: Launcher — asymmetric spring */}
      <div
        className={`relative h-[13.25rem] w-[19rem] ${
          isExpanded
            ? 'pointer-events-none translate-y-2 scale-[0.92] opacity-0 transition-[transform,opacity] duration-200 ease-out'
            : 'pointer-events-auto translate-y-0 scale-100 opacity-100 transition-[transform,opacity] duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]'
        }`}
      >
        <div
          className={`absolute bottom-[6.8rem] left-0 max-w-[18rem] rounded-xl border border-border-subtle bg-[#121210] px-3.5 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] ${
            bubbleVisible && !isExpanded
              ? 'animate-bubble-pop pointer-events-auto'
              : 'pointer-events-none translate-y-3 scale-95 opacity-0 transition-all duration-300'
          }`}
        >
          {isBubbleTyping && !displayText ? (
            <TypingIndicator />
          ) : (
            <p className="text-xs leading-[1.5] text-text-secondary">{displayText}</p>
          )}
          <div className="absolute -bottom-[6px] left-[3.85rem] size-3 rotate-45 rounded-[1px] border-r border-b border-border-subtle bg-[#121210]" />
        </div>

        <div className="absolute bottom-0 left-4 flex items-end">
          <button
            type="button"
            onClick={toggleConcierge}
            onPointerEnter={() => { if (!scene3dReady) setScene3dReady(true); }}
            className="group block rounded-full transition-transform duration-300 hover:scale-[1.02]"
            aria-label={isExpanded ? 'Close Clippy helper' : 'Open Clippy helper'}
            aria-expanded={isExpanded}
          >
            <div className="h-[9.4rem] w-[6.2rem] cursor-pointer overflow-visible">
              <ClippyStage
                variant="launcher"
                talking={clippyState === 'talk' || isSubmitting}
                waving={clippyState === 'wave'}
                subdued
                scene3dReady={scene3dReady}
                className="size-full"
              />
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
