export interface WorkPanel {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  sector: string;
  tags: string[];
  stats: { label: string; value: string }[];
  videoSrc?: string;
  href: string;
}

export interface LogEntry {
  time: string;
  text: string;
  bold?: string;
}

export interface EmailEntry {
  subject: string;
  preview: string;
  time: string;
}

export interface CycleSplitStep {
  bkkStatus: string;
  visitorStatus: string;
  showWorkIndicator: boolean;
  showSleepIcon: boolean;
  showDeliverables: boolean;
}

export interface AdvantageItem {
  number: string;
  title: string;
  description: string;
}

export interface ScaleItem {
  icon: string;
  title: string;
  description: string;
}

export interface ContactDetail {
  label: string;
  value: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  attribution: string;
  company: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface InterstitialSection {
  label: string;
  lines: string[];
}

export interface MarqueeItem {
  text: string;
  accent: boolean;
}

export interface ProgressMilestone {
  position: number;
  label: string;
}

export interface TimeSequenceEntry {
  h: number;
  m: number;
  ampm: 'AM' | 'PM';
}

export interface CaseStudyMedia {
  src: string;
  type: 'image' | 'video';
  alt?: string;
  caption?: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  sector: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  shortOutcome: string;
  challenge: string;
  insight: string;
  execution: string[];
  outcomes: string[];
  metrics: { label: string; value: string }[];
  services: string[];
  videoSrc?: string;
  coverImage?: string;
  featured?: boolean;
  draft?: boolean;
  cta: CtaLink;

  // Expanded narrative (optional — falls back to challenge/description if absent)
  brief?: string;
  briefHeadline?: string;
  insightHeadline?: string;
  workHeadline?: string;
  resultsHeadline?: string;
  pullQuote?: string;
  work?: string;
  myTake?: string;

  // Client metadata
  agency?: string;
  role?: string;
  year?: string;
  industry?: string;

  // Media slots (optional — pages without media render cleanly)
  media?: {
    hero?: CaseStudyMedia;
    fullBleed1?: CaseStudyMedia;
    pair?: { left: CaseStudyMedia; right: CaseStudyMedia };
    grid?: CaseStudyMedia[];
    fullBleed2?: CaseStudyMedia;
    vimeoIds?: string[];
  };
}

export interface CtaLink {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface HowIWorkPrinciple {
  title: string;
  body: string[];
}

export interface HowIWorkFaq {
  question: string;
  answer: string;
}

export interface HowIWorkPageContent {
  sectionLabel: string;
  headline: string;
  summary: string;
  principles: HowIWorkPrinciple[];
  scale: {
    headline: string;
    paragraphs: string[];
    items: ScaleItem[];
  };
  faqs: HowIWorkFaq[];
  primaryCta: CtaLink;
}

export interface ContactPageContent {
  sectionLabel: string;
  headline: string;
  subline: string;
  details: ContactDetail[];
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
}

export interface HeroContent {
  timezoneLabel: string;
  availability: string;
  headline: string;
  subline: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  trustBrands: readonly string[] | string[];
}

export interface ConciergeAction {
  label: string;
  href: string;
  prompt: string;
  page: string;
  external?: boolean;
}

export interface PressLogo {
  name: string;
  url?: string;
}

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  calComUrl: string;
  email: string;
  linkedIn: string;
  footerDescription: string;
  primaryNav: NavLink[];
  footerNav: NavLink[];
  conciergeIntro: string;
  conciergeActions: ConciergeAction[];
}
