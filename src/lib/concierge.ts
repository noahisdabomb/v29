export type ConciergePageKey =
  | 'home'
  | 'work'
  | 'case-study'
  | 'how-i-work'
  | 'contact';

export type ConciergeSuggestion = {
  label: string;
  href?: string;
  prompt?: string;
};

export type ConciergeViewContext = {
  sectionId?: string;
  sectionLabel?: string;
  activeWorkPanelId?: string;
  activeWorkPanelTitle?: string;
  activeSector?: string;
};

// Voice guide: conversational authority with a dry edge. Direct, useful, opinionated.
export const CONCIERGE_VOICE_BRIEF = [
  'Talk like a senior creative who has seen everything. Direct, useful, with a dry edge. Not a novelty chatbot.',
  'Short declarative sentences. Sentence fragments for emphasis. No filler, no corporate polish.',
  'Be opinionated about vague thinking. Be generous with real answers.',
  'Use specific names, numbers, and details. Never say "great work" when you can say "3.75 billion impressions."',
  'Useful first, personality second. The answer still has to help.',
  'Stay grounded in the site: case studies, workflow, results, and next steps.',
  'Never impersonate or mention any real-world voice reference.',
] as const;

type ConciergeIntroContent = {
  eyebrow: string;
  title: string;
  question: string;
  body: string;
  suggestions: ConciergeSuggestion[];
};

function compactText(value?: string) {
  return value?.replace(/\s+/g, ' ').trim();
}

function dedupeSuggestions(suggestions: ConciergeSuggestion[]) {
  const seen = new Set<string>();
  return suggestions.filter((suggestion) => {
    if (!suggestion.label || seen.has(suggestion.label)) {
      return false;
    }

    seen.add(suggestion.label);
    return true;
  });
}

function normalizeSector(sector?: string) {
  const value = compactText(sector);
  if (!value || value.toLowerCase() === 'all') {
    return null;
  }

  return value;
}

function getWorkPanelTitle(context: ConciergeViewContext) {
  return compactText(context.activeWorkPanelTitle);
}

export function getConciergePageKey(pathname: string): ConciergePageKey {
  if (pathname === '/') return 'home';
  if (pathname === '/work') return 'work';
  if (pathname.startsWith('/work/')) return 'case-study';
  if (pathname === '/how-i-work') return 'how-i-work';
  if (pathname === '/contact') return 'contact';
  return 'home';
}

export function buildContextualSuggestionSet(
  pathname: string,
  context: ConciergeViewContext,
  baseSuggestions: ConciergeSuggestion[],
) {
  const panelTitle = getWorkPanelTitle(context);
  const sector = normalizeSector(context.activeSector);
  const pageKey = getConciergePageKey(pathname);
  const sectionId = compactText(context.sectionId);

  let leadSuggestion: ConciergeSuggestion | null = null;

  if (panelTitle) {
    leadSuggestion = {
      label: 'Why this one?',
      prompt: `Why is ${panelTitle} a strong proof point for a project like mine?`,
    };
  } else if (pageKey === 'work' && sector) {
    leadSuggestion = {
      label: 'Best place to start?',
      prompt: `Which ${sector} case study should I start with, and why?`,
    };
  } else if (sectionId === 'timeline') {
    leadSuggestion = {
      label: 'Short version?',
      prompt: 'Explain the overnight workflow in plain English.',
    };
  } else if (sectionId === 'advantage') {
    leadSuggestion = {
      label: 'Why no agency?',
      prompt: 'Why is this model stronger than a traditional agency setup for the right project?',
    };
  } else if (pageKey === 'how-i-work' || sectionId === 'principles') {
    leadSuggestion = {
      label: 'Day to day?',
      prompt: 'How would working together actually feel day to day?',
    };
  } else if (sectionId === 'scale') {
    leadSuggestion = {
      label: 'Solo or team?',
      prompt: 'When does Noah stay solo, and when does he scale up the team?',
    };
  } else if (sectionId === 'faq') {
    leadSuggestion = {
      label: 'Key question?',
      prompt: 'What is the most important thing to understand about this model before I reach out?',
    };
  } else if (pageKey === 'case-study' && sectionId === 'brief') {
    leadSuggestion = {
      label: 'What was the real challenge?',
      prompt: 'What was the real challenge behind this brief?',
    };
  } else if (pageKey === 'case-study' && sectionId === 'insight') {
    leadSuggestion = {
      label: 'What changed here?',
      prompt: 'What was the strategic insight that changed the work here?',
    };
  } else if (pageKey === 'case-study' && sectionId === 'results') {
    leadSuggestion = {
      label: 'What matters here?',
      prompt: 'What results in this case study matter most for a prospective client?',
    };
  } else if (pageKey === 'case-study' && sectionId === 'my-take') {
    leadSuggestion = {
      label: 'So what is the takeaway?',
      prompt: 'What should a prospective client take away from this case study?',
    };
  } else if (pageKey === 'contact' || sectionId === 'contact' || sectionId === 'contact-overview') {
    leadSuggestion = {
      label: 'Call or email?',
      prompt: 'How should I decide between booking a call and sending an email?',
    };
  }

  return dedupeSuggestions(
    [leadSuggestion, ...baseSuggestions].filter(Boolean) as ConciergeSuggestion[],
  ).slice(0, 3);
}

export function getContextualLeadCopy(
  pathname: string,
  context: ConciergeViewContext,
) {
  const pageKey = getConciergePageKey(pathname);
  const sectionId = compactText(context.sectionId);
  const sectionLabel = compactText(context.sectionLabel);
  const panelTitle = getWorkPanelTitle(context);
  const sector = normalizeSector(context.activeSector);

  if (panelTitle) {
    return `You're looking at ${panelTitle}.`;
  }

  if (pageKey === 'work' && sector) {
    return `Filtered to ${sector} work.`;
  }

  switch (sectionId) {
    case 'timeline':
      return 'This is the overnight cycle. The core of the model.';
    case 'work':
      return 'This is the work. Coca-Cola, Orangetheory, Delta. The real campaigns.';
    case 'advantage':
      return 'This is why the model works. No handoffs, senior-led, overnight delivery.';
    case 'contact':
    case 'contact-overview':
      return 'Next step. Book the call or send the brief.';
    case 'brief':
      return 'The brief. What the client asked for and what was actually going on.';
    case 'insight':
      return 'The strategic turn. Where the real brief surfaced.';
    case 'results':
      return 'The results. Numbers that earned their place.';
    case 'my-take':
      return `Noah's take \u2014 the lesson behind the campaign.`;
    case 'scale':
      return `How the model scales \u2014 solo when it's tight, team when it's not.`;
    case 'faq':
      return 'The practical stuff. Fit, scope, speed.';
    default:
      return sectionLabel ? `You're in ${sectionLabel}.` : null;
  }
}

export function getConciergeIntroContent(
  pathname: string,
  context: ConciergeViewContext,
  baseSuggestions: ConciergeSuggestion[],
): ConciergeIntroContent {
  const pageKey = getConciergePageKey(pathname);
  const sectionId = compactText(context.sectionId);
  const sectionLabel = compactText(context.sectionLabel);
  const panelTitle = getWorkPanelTitle(context);
  const sector = normalizeSector(context.activeSector);
  const suggestions = buildContextualSuggestionSet(pathname, context, baseSuggestions);

  if (panelTitle) {
    return {
      eyebrow: sectionLabel ?? (sector ? `${sector} Work` : 'Selected Work'),
      title: `${panelTitle}. Here's what matters.`,
      question: 'Want the short version?',
      body: sector
        ? `I can break down what this ${sector.toLowerCase()} campaign says about fit, range, and how the work actually got made.`
        : `I can walk you through the brief, the strategy, and why this one's worth your time.`,
      suggestions,
    };
  }

  switch (pageKey) {
    case 'home':
      if (sectionId === 'timeline') {
        return {
          eyebrow: 'The 24-Hour Cycle',
          title: 'Your evening brief. His morning priority.',
          question: 'Want to see how the handoff works?',
          body: `I can walk you through the timeline \u2014 what ships overnight, what's waiting by morning, and how the rhythm holds.`,
          suggestions,
        };
      }

      if (sectionId === 'work') {
        return {
          eyebrow: 'Selected Work',
          title: 'Coca-Cola. Orangetheory. Delta. The real stuff.',
          question: 'Where do you want to start?',
          body: `I can steer you to the case study that's most relevant \u2014 by category, by challenge, or by what you're trying to figure out.`,
          suggestions,
        };
      }

      if (sectionId === 'advantage') {
        return {
          eyebrow: 'The Advantage',
          title: 'One senior creative. No handoffs.',
          question: 'Want to know when this beats a team?',
          body: 'I can explain the model: overnight delivery, no account layer, senior-led from brief to final files.',
          suggestions,
        };
      }

      if (sectionId === 'contact') {
        return {
          eyebrow: 'Contact',
          title: 'The next step is simple.',
          question: 'Book or brief?',
          body: '20-minute call or send the brief directly. I can help you figure out which one fits.',
          suggestions,
        };
      }

      return {
        eyebrow: 'Homepage',
        title: 'Skip the scroll. Ask me.',
        question: 'What are you looking for?',
        body: 'I know the work, the model, and the fastest way to whatever you need next.',
        suggestions,
      };

    case 'work':
      if (sectionId === 'work-filter') {
        return {
          eyebrow: sector ? `${sector} Filter` : 'Work Filter',
          title: sector ? `${sector.toLowerCase()} work. Narrowed down.` : `Let's narrow it down.`,
          question: 'Want a recommendation?',
          body: sector
            ? 'I can tell you which one to open first and what to look for.'
            : `Tell me the category or challenge and I'll point you to the strongest example.`,
          suggestions,
        };
      }

      return {
        eyebrow: 'Work',
        title: '15 years of campaigns. Start anywhere.',
        question: 'What kind of work matters to you?',
        body: `I can match you to the right case study \u2014 by sector, by challenge, or by what you're trying to decide.`,
        suggestions,
      };

    case 'case-study':
      if (sectionId === 'brief') {
        return {
          eyebrow: 'The Brief',
          title: 'Every campaign starts with a tension.',
          question: 'Want the real challenge behind this one?',
          body: 'I can explain what the brief said, what was actually going on, and why that gap mattered.',
          suggestions,
        };
      }

      if (sectionId === 'insight') {
        return {
          eyebrow: 'The Insight',
          title: 'This is where the brief got rewritten.',
          question: 'Want to see how the strategy shifted the work?',
          body: 'I can connect the insight to what it unlocked, creatively and commercially.',
          suggestions,
        };
      }

      if (sectionId === 'work') {
        return {
          eyebrow: 'The Work',
          title: 'Craft is strategy made visible.',
          question: 'Want to see what the execution signals?',
          body: 'I can connect the craft back to the problem it solved and the range it demonstrates.',
          suggestions,
        };
      }

      if (sectionId === 'results') {
        return {
          eyebrow: 'The Results',
          title: 'Numbers that earned their place.',
          question: 'Want to know which ones matter most?',
          body: 'I can break down the outcomes and what they say about effectiveness on the right kind of brief.',
          suggestions,
        };
      }

      if (sectionId === 'my-take') {
        return {
          eyebrow: 'My Take',
          title: 'The lesson behind the campaign.',
          question: 'Want the takeaway without rereading everything?',
          body: 'I can summarise what Noah took from this project and what it says about how he works.',
          suggestions,
        };
      }

      return {
        eyebrow: sectionLabel ?? 'Case Study',
        title: 'Worth a closer look.',
        question: 'Want help reading what matters?',
        body: `I can connect this campaign to fit, working style, or whatever you're trying to figure out.`,
        suggestions,
      };

    case 'how-i-work':
      if (sectionId === 'scale') {
        return {
          eyebrow: 'Built to Scale',
          title: `Solo when it's tight. Scaled when it's not.`,
          question: 'Want to know how it stretches?',
          body: 'I can explain when the work stays senior-led solo, and when a team comes in. Without losing the thread.',
          suggestions,
        };
      }

      if (sectionId === 'faq') {
        return {
          eyebrow: 'FAQ',
          title: 'The practical stuff. No fluff.',
          question: 'What do you need to know?',
          body: `Fit, scope, speed, collaboration style. I can pull out the answer you're actually after.`,
          suggestions,
        };
      }

      return {
        eyebrow: 'How I Work',
        title: 'The model in plain English.',
        question: 'What part do you want to pressure-test?',
        body: 'Workflow, scope, communication, when it scales. Ask me anything about how the work actually gets done.',
        suggestions,
      };

    case 'contact':
      if (sectionId === 'contact-details') {
        return {
          eyebrow: 'Contact Details',
          title: `Everything's here. Pick your lane.`,
          question: 'Call or brief?',
          body: 'I can help you figure out whether this is a book-the-call situation or a send-the-brief-and-go one.',
          suggestions,
        };
      }

      return {
        eyebrow: 'Contact',
        title: 'Next step. Simple.',
        question: 'Book, brief, or still deciding?',
        body: 'Book the 20 minutes, send the brief directly, or ask me anything you need to figure out first.',
        suggestions,
      };
  }
}
