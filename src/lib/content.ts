import type {
  WorkPanel,
  LogEntry,
  EmailEntry,
  CycleSplitStep,
  AdvantageItem,
  ScaleItem,
  ContactDetail,
  Testimonial,
  NavLink,
  InterstitialSection,
  MarqueeItem,
  ProgressMilestone,
  CaseStudy,
  HowIWorkPageContent,
  ContactPageContent,
  PressLogo,
  SiteSettings,
} from '@/types';

// ---------------------------------------------------------------------------
// Site metadata
// ---------------------------------------------------------------------------
export const SITE_META = {
  title: 'Noah Williams | Freelance Creative Director. Strategy to Final Files.',
  description:
    'Freelance creative director for hire. 15 years on Coca-Cola, Toyota, Delta, Orangetheory. You send a brief at 5pm. By 7am, the campaign\u2019s ready.',
  ogTitle: 'Noah Williams | Freelance Creative Director',
  ogDescription:
    'The creative director who works while your office sleeps. 15 years on Coca-Cola and Toyota, delivering from Bangkok.',
  url: 'https://noahisdabomb.com',
} as const;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
export const NAV_LINKS: NavLink[] = [
  { label: 'The Cycle', href: '/#timeline' },
  { label: 'Work', href: '/work' },
  { label: 'How I Work', href: '/how-i-work' },
  { label: 'Contact', href: '/contact' },
];

// ---------------------------------------------------------------------------
// Hero section
// ---------------------------------------------------------------------------
export const HERO = {
  timezoneLabel: 'Bangkok (GMT+7). Online now',
  headline: "It\u2019s tomorrow here.\nYour work is already started.",
  subline: 'One senior creative director. The strategy, the vision, the final files. All held by one person, 12 hours ahead of you.',
} as const;

// ---------------------------------------------------------------------------
// Progress bar milestones
// ---------------------------------------------------------------------------
export const PROGRESS_MILESTONES: ProgressMilestone[] = [
  { position: 5, label: 'Brief received' },
  { position: 20, label: 'Strategy' },
  { position: 40, label: 'Concepts' },
  { position: 65, label: 'Design' },
  { position: 95, label: 'Final files' },
];

// ---------------------------------------------------------------------------
// Cycle section -- Statement beat
// ---------------------------------------------------------------------------
export const CYCLE_STATEMENT = {
  sectionLabel: 'The Cycle',
  headline: "Your team\u2019s asleep. The deadline isn\u2019t.",
  subline:
    'Strategy, creative direction, and final production. Held by one senior lead who finds the insight, then builds the campaign around it. Overnight.',
} as const;

// ---------------------------------------------------------------------------
// Cycle section -- Handoff beat
// ---------------------------------------------------------------------------
export const CYCLE_HANDOFF = {
  sectionLabel: 'Overnight Handoff',
  headline: 'End of your day. Beginning of mine.',
  subline: 'Your brief is my morning coffee.',
  bkkLabel: 'Bangkok, GMT+7',
  visitorLabel: 'Your city',
  bkkIndicator: 'Working',
  visitorIndicator: 'Offline',
} as const;

export const CYCLE_HANDOFF_STEPS: CycleSplitStep[] = [
  {
    bkkStatus: 'Three tabs open. Brief pulled apart. Already building.',
    visitorStatus: 'Done for the day. Phone on the charger.',
    showWorkIndicator: true,
    showSleepIcon: true,
    showDeliverables: false,
  },
  {
    bkkStatus: 'Rough cuts rendering. Social assets stacking up.',
    visitorStatus: 'Deep sleep. Zero interruptions needed.',
    showWorkIndicator: true,
    showSleepIcon: true,
    showDeliverables: false,
  },
  {
    bkkStatus: 'Everything uploaded. Organized. Annotated.',
    visitorStatus: 'Alarm goes off. Open the inbox.',
    showWorkIndicator: false,
    showSleepIcon: false,
    showDeliverables: true,
  },
];

// ---------------------------------------------------------------------------
// Cycle section -- Log Intro phase
// ---------------------------------------------------------------------------
export const CYCLE_LOG_INTRO = {
  sectionLabel: 'Overnight Proof',
  headline: 'While you slept, the work kept moving.',
  subline:
    'Strategy sharpened. Frames cut. Files lined up before your first coffee.',
} as const;

// ---------------------------------------------------------------------------
// Cycle section -- Clock phase
// ---------------------------------------------------------------------------
export const CYCLE_CLOCK = {
  lead: '7:00 AM',
  headline: '',
  subline: 'Vintage flip clock. Brand-green pulse. Morning starts with momentum.',
} as const;

// ---------------------------------------------------------------------------
// Cycle section -- Laptop phase (closed glow -> centered notification -> inbox)
// ---------------------------------------------------------------------------
export const CYCLE_LAPTOP = {
  alertTime: '7:00 AM',
  alertTitle: 'Campaign Ready',
  alertSub: 'Brief locked. Files are lining up.',
  popupEyebrow: 'Morning briefing',
  popupTitle: 'Campaign Ready',
  popupSubtitle: 'Strategy shaped. Assets staged. Ready before the room logs on.',
  inboxEyebrow: 'Morning briefing',
  inboxTitle: 'Delivered before the first reply.',
} as const;

export const LAPTOP_BRIEFING_META = [
  {
    section: 'Strategy',
    priority: 'Priority A',
    status: 'Launch logic',
  },
  {
    section: 'Film',
    priority: 'Priority B',
    status: 'Hero edit',
  },
  {
    section: 'Social',
    priority: 'Priority C',
    status: 'Channel suite',
  },
  {
    section: 'Delivery',
    priority: 'Ready',
    status: 'Files + notes',
  },
] as const;

// ---------------------------------------------------------------------------
// Cycle section -- Transition beat into work
// ---------------------------------------------------------------------------
export const CYCLE_WORK_TRANSITION = {
  sectionLabel: 'Selected Work',
  headline: 'The work that got me here.',
  subline: 'And out of there.',
} as const;

// ---------------------------------------------------------------------------
// Phone log entries (5 entries from codex logEntries array)
// ---------------------------------------------------------------------------
export const LOG_ENTRIES: LogEntry[] = [
  {
    time: '11:30p',
    text: 'Brief pulled apart. Found the positioning gap your team missed.',
    bold: 'positioning gap',
  },
  {
    time: '1:15a',
    text: 'Three directions built out. Headlines, concepts, channel plans.',
    bold: 'Headlines, concepts, channel plans.',
  },
  {
    time: '3:14a',
    text: 'Hero film cut, graded, sound designed. :60 and :30.',
  },
  {
    time: '4:47a',
    text: '12 social assets built. Every platform sized. Copy done.',
    bold: 'Copy done.',
  },
  {
    time: '5:58a',
    text: 'Everything uploaded, organized, annotated.',
  },
];

// ---------------------------------------------------------------------------
// Laptop email entries (3 entries from codex emails array)
// ---------------------------------------------------------------------------
export const EMAIL_ENTRIES: EmailEntry[] = [
  {
    subject: 'Campaign concepts, Q3 launch',
    preview: '3 directions with positioning, hooks, and rollout logic',
    time: '3:14 AM',
  },
  {
    subject: 'Hero film, rough cut v2',
    preview: ':60 and :30 versions cut, graded, and sound designed',
    time: '4:47 AM',
  },
  {
    subject: 'Social suite, 12 assets',
    preview: 'IG, TikTok, LinkedIn. Sized, captioned, and ready to schedule',
    time: '5:58 AM',
  },
  {
    subject: 'Final files + notes',
    preview: 'Naming clean, links live, annotations queued for the team',
    time: '6:18 AM',
  },
];

export const PHONE_CHECKLIST_ITEMS = EMAIL_ENTRIES.map((entry) => entry.subject);

// ---------------------------------------------------------------------------
// Client trust strip (legacy — kept for backwards compat)
// ---------------------------------------------------------------------------
export const TRUST_BRANDS = [
  'Coca-Cola',
  'Toyota',
  'Delta Air Lines',
  'Orangetheory',
  'Visit the USA',
  'Gila River',
] as const;

export const PRESS_LOGOS: PressLogo[] = [
  { name: 'Adweek' },
  { name: 'Ad Age' },
  { name: 'The Drum' },
  { name: 'MediaPost' },
  { name: 'Shorty Awards' },
];

// ---------------------------------------------------------------------------
// Credibility Grid — expanded brand / awards / press / stats
// ---------------------------------------------------------------------------
export interface CredibilityBrand {
  name: string;
  logo: string;
  accent: 'magenta' | 'gold' | 'cerulean';
}

export const CREDIBILITY_BRANDS: CredibilityBrand[] = [
  { name: 'Coca-Cola', logo: '/logos/brands/coca-cola.svg', accent: 'magenta' },
  { name: 'Toyota', logo: '/logos/brands/toyota.svg', accent: 'gold' },
  { name: 'Delta Air Lines', logo: '/logos/brands/delta.svg', accent: 'cerulean' },
  { name: 'Orangetheory Fitness', logo: '/logos/brands/orangetheory.svg', accent: 'magenta' },
  { name: 'Brand USA', logo: '/logos/brands/brand-usa.svg', accent: 'cerulean' },
  { name: 'NHTSA', logo: '/logos/brands/nhtsa.svg', accent: 'gold' },
  { name: 'Tombras', logo: '/logos/brands/tombras.svg', accent: 'gold' },
  { name: 'BarkleyOKRP', logo: '/logos/brands/barkleyokrp.svg', accent: 'cerulean' },
  { name: 'Dept Agency', logo: '/logos/brands/dept.svg', accent: 'magenta' },
  { name: 'Possible', logo: '/logos/brands/possible.svg', accent: 'cerulean' },
  { name: 'Digitas', logo: '/logos/brands/digitas.svg', accent: 'gold' },
];

export const CREDIBILITY_AWARDS = [
  { name: 'Cannes Lions', detail: 'Shortlisted' },
  { name: 'Clio Awards', detail: 'Winner' },
  { name: 'D&AD', detail: 'Pencil' },
  { name: 'The One Show', detail: 'Merit' },
] as const;

export const CREDIBILITY_PRESS = [
  { name: 'Adweek', logo: '/logos/press/adweek.svg' },
  { name: 'Ad Age', logo: '/logos/press/ad-age.svg' },
  { name: 'The Drum', logo: '/logos/press/the-drum.svg' },
  { name: 'MediaPost', logo: '/logos/press/mediapost.svg' },
  { name: 'Shorty Awards', logo: '/logos/press/shorty-awards.svg' },
] as const;

export const CREDIBILITY_STATS = [
  { value: '15+', label: 'Years' },
  { value: '50+', label: 'Campaigns' },
  { value: '3.75B', label: 'Impressions' },
  { value: '6', label: 'Countries' },
] as const;

// ---------------------------------------------------------------------------
// Work panels (6 panels)
// ---------------------------------------------------------------------------
export const WORK_PANELS: WorkPanel[] = [
  {
    id: 'orangetheory',
    number: '01',
    title: 'Orangetheory\nFitness',
    tagline:
      "Everyone said they didn\u2019t have time. So we stopped selling workouts.",
    description:
      'Every hour already belongs to someone else. The 25th Hour campaign gave people permission to take one back. Broadcast, digital, social, in-studio.',
    sector: 'Fitness',
    tags: ['Fitness', 'Integrated', 'Film', 'Brand Identity'],
    stats: [
      { label: 'Impressions', value: '3.75B' },
      { label: 'Aided Awareness', value: '40%+' },
    ],
    videoSrc: 'https://videos.noahisdabomb.com/orangetheory_25hour.mp4',
    href: '/work/orangetheory-fitness',
  },
  {
    id: 'gila-river',
    number: '02',
    title: 'Gila River\nResorts & Casinos',
    tagline:
      'Casinos talk to gamblers. We talked to everyone else.',
    description:
      '\u201CYou Do You\u201D gave an entire brand permission to be inclusive without ever saying the word. Four campaign chapters, $750M property expansion, audience getting younger every quarter.',
    sector: 'Resorts & Casinos',
    tags: ['Resorts & Casinos', 'Brand Campaign', 'Film', '3D OOH'],
    stats: [
      { label: 'Campaign Chapters', value: '4' },
      { label: 'Annual Revenue', value: '$750M' },
    ],
    videoSrc: 'https://videos.noahisdabomb.com/gila_river_you_do_you.mp4',
    href: '/work/gila-river',
  },
  {
    id: 'coca-cola',
    number: '03',
    title: 'Coca-Cola',
    tagline:
      'From a film about first dates to running social for the most recognized brand on earth.',
    description:
      'Short film for Coke x Carmike, then a 55-person real-time newsroom across Coke, Diet Coke, Fanta, Sprite. The bigger the brand, the more craft matters in the smallest places.',
    sector: 'Beverage',
    tags: ['Global', 'Film', 'Social', 'Real-time'],
    stats: [
      { label: 'Platforms', value: '5' },
      { label: 'Brands', value: '4' },
    ],
    videoSrc: 'https://videos.noahisdabomb.com/coke_date_night_cover_v1.mp4',
    href: '/work/coca-cola',
  },
  {
    id: 'visit-the-usa',
    number: '04',
    title: 'Visit the\nUSA',
    tagline:
      "Everyone thinks they\u2019ve already seen America. We proved them wrong.",
    description:
      'The postcard version of America is the enemy. Split-screen pairing iconic imagery with unexpected discoveries, transcreated across 13+ languages without ever feeling diluted.',
    sector: 'Tourism',
    tags: ['Tourism', 'Integrated', 'Film', 'Social'],
    stats: [
      { label: 'Languages', value: '13+' },
      { label: 'Assets', value: '100+' },
    ],
    videoSrc: 'https://videos.noahisdabomb.com/visitusa_hero.mp4',
    href: '/work/visit-the-usa',
  },
  {
    id: 'toyota',
    number: '05',
    title: 'Toyota',
    tagline:
      '381 horses under the hood. Zero limits on how we told the story.',
    description:
      "Ford, Chevy, Ram. American truck loyalty runs deep. We stopped apologizing for where it\u2019s built and started showing what it can do. Same energy across the full lineup: \u201CGo Anywhere, Imagine Everything.\u201D",
    sector: 'Automotive',
    tags: ['Automotive', 'Film', 'Digital', 'Social'],
    stats: [
      { label: 'Vehicle Lines', value: '3' },
      { label: 'Channels', value: 'Film + Digital + Social' },
    ],
    videoSrc: 'https://videos.noahisdabomb.com/toyota_tundra.mp4',
    href: '/work/toyota',
  },
  {
    id: 'delta',
    number: '06',
    title: 'Delta\nAir Lines',
    tagline:
      "We took Delta\u2019s most iconic symbol off the plane and rolled it into the streets.",
    description:
      'The beverage cart is the most human moment in air travel. We gave it a stage. \u201CCheer Carts\u201D deployed across five cities. Real pilots, real flight attendants, Biscoff cookies. 98% positive sentiment.',
    sector: 'Travel',
    tags: ['Aviation', 'Experiential', 'Film', 'Social'],
    stats: [
      { label: 'Positive Sentiment', value: '98%' },
      { label: 'Social Chatter YoY', value: '3X' },
    ],
    videoSrc:
      'https://videos.noahisdabomb.com/starbucks_%23cheercart.mp4',
    href: '/work/delta-air-lines',
  },
];

// ---------------------------------------------------------------------------
// Work section header
// ---------------------------------------------------------------------------
export const WORK_HEADER = {
  sectionLabel: 'Selected Work',
  headline: 'The work that got me here.\nAnd out of there.',
} as const;

// ---------------------------------------------------------------------------
// Scroll interstitials
// ---------------------------------------------------------------------------
export const INTERSTITIALS: InterstitialSection[] = [
  {
    label: 'The Philosophy',
    lines: [
      "The best briefs aren\u2019t about the product.",
      'They\u2019re about the tension in the customer\u2019s life that the product resolves.',
    ],
  },
  {
    label: 'The Shift',
    lines: [
      'All of that happened inside agencies. Big ones. Teams of hundreds.',
      'The idea always got smaller as more people touched it.',
      'What if one person held the whole thing?',
    ],
  },
  {
    label: 'The Question',
    lines: [
      '\u201CBut what happens when the brief gets bigger than one person?\u201D',
      'Fair question.',
      "That\u2019s already built in.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Inline testimonial
// ---------------------------------------------------------------------------
export const INLINE_TESTIMONIAL: Testimonial = {
  quote:
    "We needed three campaigns in six weeks. Noah delivered all three. Strategy, scripts, edits, social cuts. One person. We didn\u2019t brief an agency. We briefed him.",
  attribution: 'VP Marketing',
  company: 'Gila River Resorts & Casinos',
};

// ---------------------------------------------------------------------------
// Closing testimonial
// ---------------------------------------------------------------------------
export const CLOSING_TESTIMONIAL: Testimonial = {
  quote:
    'Noah held the creative thread across every channel on a $3.75B-impression campaign. One person. Strategy through delivery. The work stayed cohesive because he never let go of it.',
  attribution: 'Dooley Tombras, President',
  company: 'Tombras',
};

// ---------------------------------------------------------------------------
// Overnight testimonial (used on How I Work page)
// ---------------------------------------------------------------------------
export const OVERNIGHT_TESTIMONIAL: Testimonial = {
  quote:
    'We sent the brief at 5pm. By the time we opened our laptops the next morning, there were three campaign directions waiting \u2014 fully built, not just concepts. That had never happened before.',
  attribution: 'Marketing Director',
  company: 'National brand (NDA)',
};

export const STRATEGY_TESTIMONIAL: Testimonial = {
  quote:
    'Most freelancers hand you tactics. Noah handed us a strategy that repositioned the entire brand \u2014 then produced every asset to bring it to life. We stopped looking for an agency after that.',
  attribution: 'CMO',
  company: 'Orangetheory Fitness',
};

export const CRAFT_TESTIMONIAL: Testimonial = {
  quote:
    'The level of finish on every deliverable \u2014 scripts, edits, social \u2014 was agency-quality without the agency overhead. He thinks like a strategist and executes like a production house.',
  attribution: 'Brand Director',
  company: 'Visit Lauderdale',
};

// ---------------------------------------------------------------------------
// Advantage section
// ---------------------------------------------------------------------------
export const ADVANTAGE = {
  sectionLabel: 'The Advantage',
  headline:
    "I didn\u2019t leave agencies because I was tired of the work. I left to do more of it.",
  paragraphs: [
    '15 years inside agencies like Tombras, Digitas, SPARK, and O.H. Partners. Directing campaigns for Coca-Cola, Toyota, Delta, Orangetheory, and Gila River. Cannes, Clio, D&AD, the One Show. The training happened at the best shops in the business.',
    'Now it\u2019s the same thinking, the same standards, the same production instincts \u2014 without the layers between the idea and the output. No handoff. No brief-to-brief telephone game. One person accountable for the whole thing, working 12 hours ahead of you.',
  ],
  awards: ['Cannes Lions', 'Clio Awards', 'D&AD', 'The One Show'],
  pullQuote: "The best briefs aren\u2019t about the product. They\u2019re about the tension in the customer\u2019s life that the product resolves.",
} as const;

export const ADVANTAGE_ITEMS: AdvantageItem[] = [
  {
    number: '01',
    title: 'One brain. Your whole pipeline.',
    description:
      "The person who finds your insight is the person who builds the campaign. No handoffs diluting the idea. That\u2019s how your work stays honest.",
  },
  {
    number: '02',
    title: 'Your overnight advantage',
    description:
      "Send notes at 9am your time, get revisions by lunch. Bangkok\u2019s 12-hour offset means your creative director works while your office sleeps. Every morning starts with progress, not a standup.",
  },
  {
    number: '03',
    title: 'One toolkit. No vendor chain.',
    description:
      "DaVinci for film and color. Fusion for motion. Adobe for everything else. Smaller briefs get handled end to end. Bigger ones get the same tools with specialist partners plugged in where it counts. Either way, fewer handoffs and faster turnaround.",
  },
  {
    number: '04',
    title: 'AI does the distance. I do the thinking.',
    description:
      "Category composites that reveal the Sea of Sameness in an afternoon. Mood boards that used to take a week, done before lunch. Transcreation proofs across 13 languages in a single session. AI compresses production time. It doesn\u2019t replace the judgment that decides what to make.",
  },
];

// ---------------------------------------------------------------------------
// Scale section
// ---------------------------------------------------------------------------
export const SCALE = {
  sectionLabel: 'Built to Scale',
  headline: 'One person is the default. Not the limit.',
  paragraphs: [
    'Your creative director is based in Bangkok. One of the deepest creative talent pools in Southeast Asia. Designers, editors, animators, producers, developers. World-class people who\u2019ve worked on global brands, available at a fraction of what you\u2019d pay stateside.',
    "When your scope grows, the team scales around the brief. Not around some agency org chart. You still get one point of contact. One creative vision. One person accountable for the output. But behind that, exactly the firepower your project needs.",
    "The good freelancers know when to bring in backup. This isn\u2019t about being a hero. It\u2019s about getting your work right.",
  ],
} as const;

export const SCALE_ITEMS: ScaleItem[] = [
  {
    icon: '+1',
    title: 'Small brief? One person.',
    description:
      "Brand strategy, a campaign deck, a brand identity refresh. Handled end to end. No overhead. No layers. You\u2019re paying for a senior creative, and that\u2019s exactly what shows up.",
  },
  {
    icon: '+5',
    title: 'Bigger brief? The team builds around it.',
    description:
      'A full integrated campaign needs more hands. Your creative director taps into a local network of designers, editors, motion artists and assembles a team purpose-built for your project. They work under one direction. You talk to one person.',
  },
  {
    icon: '+10',
    title: 'Full production? Already proven.',
    description:
      'Multi-market campaigns with production teams across Southeast Asia. Film shoots, post-production, localization. The infrastructure is here, the talent is proven, and your cost is a fraction of what you\u2019re used to.',
  },
  {
    icon: '$$',
    title: 'The math works in your favor.',
    description:
      'Bangkok rates for world-class talent. You get the output quality of a top-tier agency without the top-tier agency overhead. No corners cut. Just middlemen removed.',
  },
];

// ---------------------------------------------------------------------------
// Contact / Calendly section
// ---------------------------------------------------------------------------
export const CONTACT = {
  sectionLabel: 'Book a Call',
  headline: "Let\u2019s talk about what you\u2019re building.",
  subline:
    "I\u2019m not hard to reach. I\u2019m just 12 hours ahead. Tell me what you\u2019re working on \u2014 the best projects start with a 20-minute call.",
  calendlyUrl: 'https://calendly.com/noah-noahisdabomb',
  email: 'noah@noahisdabomb.com',
} as const;

export const CONTACT_DETAILS: ContactDetail[] = [
  {
    label: 'Location',
    value: 'Bangkok, Thailand (GMT+7)',
    description:
      '12 hours ahead of New York. Your end-of-day is my start.',
  },
  {
    label: 'Rate',
    value: 'Project-based',
    description:
      'Pricing depends on scope. Happy to discuss what makes sense for your project.',
  },
  {
    label: 'Model',
    value: 'One creative director. The whole pipeline.',
    description:
      'Strategy, creative, production, delivery. No handoffs.',
  },
  {
    label: 'Turnaround',
    value: 'First concepts: 3-5 days',
    description:
      'Campaign decks: 2 weeks. Full build-out: 4-6 weeks.',
  },
];

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
export const FOOTER = {
  brandDescription:
    'Creative Director. Bangkok-based, globally connected. 15 years turning briefs into campaigns that move people.',
  email: 'noah@noahisdabomb.com',
  copyright: '\u00A9 2026 Noah Williams',
  linkedIn: 'https://linkedin.com/in/noahisdabomb',
  timezones: [
    { city: 'Bangkok', id: 'ccTzBkk', tz: 'Asia/Bangkok' },
    { city: 'New York', id: 'ccTzNyc', tz: 'America/New_York' },
    { city: 'London', id: 'ccTzLdn', tz: 'Europe/London' },
  ],
} as const;

export const FOOTER_NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'How I Work', href: '/how-i-work' },
  { label: 'Contact', href: '/contact' },
];

export const MARQUEE_ITEMS: MarqueeItem[] = [
  { text: 'Strategy', accent: true },
  { text: 'Creative Direction', accent: false },
  { text: 'Film', accent: true },
  { text: 'Brand Identity', accent: false },
  { text: 'DaVinci Resolve', accent: true },
  { text: 'Motion Graphics', accent: false },
  { text: 'Figma', accent: true },
  { text: 'Color Grading', accent: false },
  { text: 'AI-Augmented', accent: true },
  { text: 'Integrated 360', accent: false },
  { text: 'Bangkok GMT+7', accent: true },
  { text: '15 Years', accent: false },
];

// ---------------------------------------------------------------------------
// Cal.com URL
// ---------------------------------------------------------------------------
export const CAL_COM_URL = process.env.NEXT_PUBLIC_CAL_COM_URL || 'https://cal.com/noahisdabomb';

// ---------------------------------------------------------------------------
// Case Studies (full detail for /work/[slug] pages)
// ---------------------------------------------------------------------------
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'orangetheory-fitness',
    client: 'Orangetheory Fitness',
    sector: 'Fitness',
    number: '01',
    title: 'Orangetheory Fitness',
    tagline: "Everyone said they didn\u2019t have time. So we stopped selling workouts.",
    description: 'Everyone said they didn\u2019t have time. So we stopped selling workouts and started giving people permission to take one hour back. 3.75B impressions. 40%+ aided awareness.',
    shortOutcome: '3.75B impressions, 40%+ aided awareness, and a brand platform strong enough to scale across broadcast, social, in-studio, and performance work.',
    challenge: 'The category was crowded with interchangeable fitness promises. Orangetheory needed a platform that felt culturally honest instead of motivational wallpaper.',
    insight: 'Nobody was avoiding the gym because they doubted exercise. They felt owned \u2014 by work, by family, by the scroll. The job wasn\u2019t to sell fitness. It was to give people permission to take one hour back.',
    execution: [
      'The campaign gave Orangetheory something they\u2019d never had \u2014 a point of view that wasn\u2019t about reps or calories. A platform flexible enough to run as a brand film or a local studio activation without losing the thread. Strategy and execution held in the same hands, start to finish.',
    ],
    outcomes: [],
    metrics: [
      { label: 'Impressions', value: '3.75B' },
      { label: 'Aided Awareness', value: '40%+' },
    ],
    services: ['Positioning', 'Campaign Platform', 'Film', 'Social'],
    videoSrc: 'https://videos.noahisdabomb.com/orangetheory_25hour.mp4',
    featured: true,
    cta: { label: 'Book a Strategy Call', href: CAL_COM_URL, external: true },
    briefHeadline: '\u201cI don\u2019t have time.\u201d We heard it so often it became the idea.',
    brief: 'Orangetheory had a great workout and an empty parking lot. The excuse was always the same: \u201cI don\u2019t have time.\u201d Every fitness brand hears that and pushes harder. We went the other way.',
    insightHeadline: 'People don\u2019t lack time. They feel like every hour already belongs to someone else.',
    pullQuote: 'We found the tension in people\u2019s lives and built everything around it.',
    workHeadline: 'One idea. Every surface.',
    work: 'The 25th Hour wasn\u2019t a tagline. It was the operating system. Broadcast spots played like short films about reclaimed time. Digital shifted messaging based on time of day \u2014 morning guilt, afternoon restlessness, evening collapse. Social walked people through the math of their own schedule. In-studio, the clocks ran at different speeds. One insight held together from the hero film down to the studio floor because one person directed all of it.',
    resultsHeadline: '3.75B impressions. 40%+ aided awareness.',
    myTake: 'The best briefs aren\u2019t about the product. They\u2019re about the tension in someone\u2019s life that the product resolves. \u201cI don\u2019t have time\u201d wasn\u2019t an objection to overcome. It was the entire emotional landscape.\n\nI found that tension and then I stayed in the room. Edit suite for the hero film. On set for the social shoots. Reviewing clock mockups for the studios. Not because I don\u2019t trust teams \u2014 because the gap between a great insight and a great execution is where most campaigns quietly die.\n\nThe one thing I\u2019d change? I held too tight in the early rounds. Gave the team less room than they deserved. The work got better when I learned to direct the vision and let people surprise me.',
    agency: 'Tombras',
    role: 'Creative Director',
    year: '2022\u20132024',
    industry: 'Fitness',
    media: {
      hero: { src: '/images/work/orangetheory/aMpF4cfIQKLat41qWRBC9Skqhk.jpeg', type: 'image', alt: 'Cinematic film still — cliff jump' },
      fullBleed1: { src: '/images/work/orangetheory/2yVPT8HW0qiU0QCCFxWu4ZeWqTU-1.jpeg', type: 'image', alt: 'Orangetheory class on rowers' },
      pair: {
        left: { src: '/images/work/orangetheory/gOMwU65tBna8zhvF6IjMhsAkhY.jpeg', type: 'image', alt: 'OOH street billboard' },
        right: { src: '/images/work/orangetheory/DP9bYS6pEPZsJFs3cse3LTvCto.jpeg', type: 'image', alt: 'Laptop and phone mockup' },
      },
      grid: [
        { src: '/images/work/orangetheory/78c82JevZtdNKlIVvRlZ5OWBNzQ.jpeg', type: 'image', alt: 'TRX billboard — More Heart More Life' },
        { src: '/images/work/orangetheory/qYngPoEYvYFr02liEDGEbAFhGjo.jpeg', type: 'image', alt: 'Social media tiles collage' },
        { src: '/images/work/orangetheory/KQul1Asf77hiuj9LC3nvclHZQ.jpeg', type: 'image', alt: 'Print magazine spread' },
        { src: '/images/work/orangetheory/ofcHtK12QgtJ6hH5tLgGR0MVE8.jpeg', type: 'image', alt: 'A-frame sign — Heart of Fitness' },
        { src: '/images/work/orangetheory/o7TJS1P0l0fZvIB4dN51pJKn0mQ.jpeg', type: 'image', alt: 'Behind the scenes — monitor on set' },
        { src: '/images/work/orangetheory/rcu1qHgNqXXW1ZXPto3XN9zBgQI.jpeg', type: 'image', alt: 'Behind the scenes — crane shot in studio' },
      ],
      fullBleed2: { src: '/images/work/orangetheory/9hTUg71eFP9XdwMXJ3NxHCgBHuc.jpeg', type: 'image', alt: 'Sunlight through trees' },
      vimeoIds: ['286342897', '357563595'],
    },
  },
  {
    slug: 'gila-river',
    client: 'Gila River Resorts & Casinos',
    sector: 'Resorts & Casinos',
    number: '02',
    title: 'Gila River Resorts & Casinos',
    tagline: 'Casinos talk to gamblers. We talked to everyone else.',
    description: '\u201CYou Do You\u201D gave the brand permission to be inclusive without ever saying the word. Four campaign chapters, custom animation, and a platform that kept skewing younger every quarter.',
    shortOutcome: 'Four campaign chapters, an audience that kept getting younger, and a $750M property expansion launched on a platform built from three words.',
    challenge: 'Every casino in the desert was screaming the same thing \u2014 jackpots, buffets, pool parties. A whole generation looked at that and said \u201Cnot for me.\u201D We had to make the brand feel like a place for everyone without losing the people already walking in the door.',
    insight: 'We stopped trying to out-casino the category. Instead of selling the casino, we sold permission. Come as you are. Do what you want. Three words that opened the door wider than any jackpot ever could.',
    execution: [
      'Three words turned into four campaign chapters, each one raising the bar while the property transformed underneath us. Custom animation from Scholar, 750MPH, and Company3 layered onto live-action film \u2014 something the gaming industry had never done. By the final chapter, the $180M resort was open and the campaign had earned the right to announce it.',
    ],
    outcomes: [],
    metrics: [
      { label: 'Campaign Chapters', value: '4' },
      { label: 'Expansion Value', value: '$750M' },
      { label: 'New Property Launch', value: '$180M' },
      { label: 'The Whole Point', value: 'You' },
    ],
    services: ['Brand Strategy', 'Campaign Development', 'Film', 'Social'],
    videoSrc: 'https://videos.noahisdabomb.com/gila_river_you_do_you.mp4',
    cta: { label: 'Talk Through Your Brief', href: CAL_COM_URL, external: true },
    briefHeadline: 'Millennials don\u2019t go to casinos. That was the problem. And the opportunity.',
    brief: 'Gila River sat in one of the highest-income zip codes in the country with a new luxury tower going up, but an entire generation saw casinos as places their parents go. We needed to change that without losing the core audience.',
    insightHeadline: 'Come as you are. Be who you want.',
    pullQuote: 'Put aside the polarized world of judgment and labels. Just come be yourself.',
    workHeadline: 'Four chapters. Each one raised the bar.',
    work: 'Four campaign chapters evolved the platform while the property transformed underneath us. We brought in Scholar, 750MPH, and Company3 to create custom animated accents layered onto live-action film \u2014 something the gaming industry had never done. By the final chapter the resort was open and the campaign had earned the right to announce it.',
    resultsHeadline: '$750M expansion. Audience getting younger every quarter.',
    myTake: 'The simplicity of "You Do You" gave an entire brand permission to be inclusive without ever saying the word. Three words that opened the door. The animation was the creative risk that paid off \u2014 it only works when the strategy is airtight underneath it.',
    agency: 'O.H. Partners',
    role: 'Creative Director',
    year: '2022\u20132024',
    industry: 'Resorts & Casinos',
    media: {
      hero: { src: '/images/work/gila-river/2yVPT8HW0qiU0QCCFxWu4ZeWqTU.jpg', type: 'image', alt: 'You Do You campaign hero' },
      fullBleed1: { src: '/images/work/gila-river/XQCGPv6wgcuRu8vwVvEz5zFfn8.png', type: 'image', alt: 'Custom 3D animated billboard OOH' },
      pair: {
        left: { src: '/images/work/gila-river/lWukEqcTACu8ERIc6tMdcoTf9k.png', type: 'image', alt: 'You Do You brand campaign' },
        right: { src: '/images/work/gila-river/3KUOBQcl54OxydlT7186lHUzkfU.png', type: 'image', alt: 'Own Your Moment campaign season' },
      },
      grid: [
        { src: '/images/work/gila-river/4pvqxwP74aCOvvNXleiVRpBemE.png', type: 'image', alt: 'Gila River Resorts campaign creative' },
      ],
    },
  },
  {
    slug: 'coca-cola',
    client: 'Coca-Cola',
    sector: 'Beverage',
    number: '03',
    title: 'Coca-Cola',
    tagline: 'From a film about first dates to running social for the most recognized brand on earth.',
    description: 'A short film about first dates at the movies. Then a 55-person real-time newsroom across Coke, Diet Coke, Fanta, and Sprite. Two chapters, same lesson: the brand isn\u2019t the story.',
    shortOutcome: 'A short film that earned Carmike\u2019s first brand integration, a 55-person newsroom that doubled social engagement, and the proof that craft matters most when the brand is already the most famous thing in the room.',
    challenge: 'Coca-Cola doesn\u2019t need awareness. It needs to feel human. That\u2019s harder than it sounds when you\u2019re the most recognized brand on earth and every piece of content has to move at the speed of culture.',
    insight: 'Coke doesn\u2019t sell a beverage. It sells the feeling in the room. The bigger the brand, the more craft matters in the smallest places \u2014 a food pairing post at 7 AM, a Spanish-language reply during a football game, a film about the armrest at a first date.',
    execution: [
      'The Date Night film ran in Carmike theaters nationwide \u2014 a genuine short about the raw awkwardness of a first date at the movies. On the social side, a 55-person newsroom covered Coke, Diet Coke, Fanta, and Sprite across five platforms daily. Food pairings, college football Saturdays, real-time responses in English and Spanish. Every post had to earn its spot in the feed.',
    ],
    outcomes: [],
    metrics: [
      { label: 'Platforms', value: '5' },
      { label: 'Brands', value: '4' },
      { label: 'Person Newsroom', value: '55' },
    ],
    services: ['Film', 'Social Systems', 'Creative Direction', 'Editorial'],
    videoSrc: 'https://videos.noahisdabomb.com/coke_date_night_cover_v1.mp4',
    featured: true,
    cta: { label: 'Book a Strategy Call', href: CAL_COM_URL, external: true },
    briefHeadline: 'Two different jobs. Same impossible question: how do you make the world\u2019s most famous brand feel human?',
    brief: 'Two different jobs, same impossible question: how do you make the world\u2019s most famous brand feel human? First, a short film for Coke x Carmike Cinemas about the raw awkwardness of a first date at the movies. Then, a 55-person real-time newsroom covering Coke, Diet Coke, Fanta, and Sprite across every major platform.',
    insightHeadline: 'The bigger the brand, the more the smallest details matter.',
    pullQuote: 'The hardest creative job isn\u2019t a Super Bowl spot. It\u2019s making something worth stopping for at 7 AM on a Tuesday.',
    workHeadline: 'A film about first dates. A newsroom that never sleeps.',
    work: 'The Date Night film ran in Carmike theaters nationwide. On the social side, we built content around food pairings and cultural moments \u2014 college football Saturdays with real-time responses, Spanish-language fan replies, daily rhythm that turned social from a broadcast megaphone into a conversation. Every post had to earn its spot in the feed.',
    resultsHeadline: '5 platforms. 4 brands. 55 people. 1 creative thread.',
    myTake: 'The bigger the brand, the more craft matters in the smallest places. Two chapters, same lesson: the brand isn\u2019t the story. The brand is what\u2019s in the room when the story happens. That\u2019s the difference between content people scroll past and content people feel.\n\nThe newsroom taught me that speed kills perfectionism \u2014 in a good way. Five platforms, daily deadlines, no time to overthink. Some of the best work I\u2019ve ever been part of happened because there was no room to second-guess it.',
    agency: 'Fitzco (Film) / Social Center (In-House)',
    role: 'Creative Lead',
    year: '2015\u20132017',
    industry: 'Beverage',
    media: {
      hero: { src: '/images/work/coca-cola/Xe9YdWcIAU6iXkGpV642ru0yyw.png', type: 'image', alt: 'Coca-Cola campaign hero' },
      fullBleed1: { src: '/images/work/coca-cola/9PdMBREAyjGchNb72FRUDS07E8.jpg', type: 'image', alt: 'Real-time newsroom operations' },
      pair: {
        left: { src: '/images/work/coca-cola/o7TJS1P0l0fZvIB4dN51pJKn0mQ.jpg', type: 'image', alt: 'Date Night cinema content' },
        right: { src: '/images/work/coca-cola/rcu1qHgNqXXW1ZXPto3XN9zBgQI.jpg', type: 'image', alt: 'Social content college football Saturday' },
      },
      grid: [],
    },
  },
  {
    slug: 'visit-the-usa',
    client: 'Brand USA / Visit The USA',
    sector: 'Tourism',
    number: '04',
    title: 'Visit The USA',
    tagline: 'Everyone thinks they\u2019ve already seen America. We proved them wrong.',
    description: 'More to Discover used split-screen contrasts to pair the iconic with the unexpected, transcreated across 13+ languages without ever feeling diluted.',
    shortOutcome: 'Record international visitation year, 100+ assets across 13 languages, and a creative platform that repositioned the U.S. as a destination of discovery, not just landmarks.',
    challenge: '\u201CBeen there, done that.\u201D International travelers thought they already knew America. New York, LA, the Grand Canyon \u2014 check, check, check. The postcard version of America was the enemy. Our job was to crack open the gap between assumption and reality.',
    insight: 'The gap between what people assume about America and what\u2019s actually there is enormous. A speakeasy under a bridge in Brooklyn. A food cart in Queens that changes your life. A tiny desert town that\u2019s secretly an art colony. Frame it as contrasts and you\u2019ve got a creative engine that never runs out of fuel.',
    execution: [
      'Anthemic split-screen films using match cuts to dramatize contrasts \u2014 the Golden Gate next to a hidden speakeasy, midtown skyscrapers dissolving into a mountain stream. Built for transcreation from day one with Scholar. A 15-person team across 100+ assets \u2014 film, social, digital, outdoor, influencer, print \u2014 every channel carried the same split-screen language. One idea adapted across 13+ languages without feeling diluted.',
    ],
    outcomes: [],
    metrics: [
      { label: 'Languages', value: '13+' },
      { label: 'Assets Produced', value: '100+' },
      { label: 'Team Directed', value: '15' },
      { label: 'Markets Reached', value: '30+' },
    ],
    services: ['Integrated', 'Film', 'Social', 'OOH', 'Digital', 'Transcreation'],
    videoSrc: 'https://videos.noahisdabomb.com/visitusa_hero.mp4',
    featured: true,
    cta: { label: 'Let\u2019s Talk About Scale', href: CAL_COM_URL, external: true },
    briefHeadline: '\u201cBeen there, done that.\u201d The most dangerous sentence in tourism marketing.',
    brief: 'International travelers thought they already knew the United States. New York, LA, the Grand Canyon \u2014 check, check, check. Our job was to crack open the gap between assumption and reality and make people feel something about a place they\u2019d already figured out.',
    insightHeadline: 'The postcard version of America is the enemy.',
    pullQuote: 'We stopped selling landmarks and started selling contrasts.',
    workHeadline: 'More to Discover. In every language.',
    work: 'We shot anthemic split-screen films using match cuts to dramatize contrasts \u2014 the Golden Gate next to a hidden speakeasy, midtown skyscrapers dissolving into a mountain stream. Built for transcreation from day one with Scholar. Social, digital, outdoor, influencer, print \u2014 every channel carried the same split-screen language. One idea adapted everywhere without feeling diluted.',
    resultsHeadline: '13+ languages. 100+ assets. Zero dilution.',
    myTake: 'The hardest brief is the one where people think they already know the answer. Most global campaigns lose their soul by the third translation. This one didn\u2019t, because the idea was built on images and feeling, not language. That\u2019s the kind of idea that travels.',
    agency: 'SPARK',
    role: 'Creative Director',
    year: '2024',
    industry: 'Tourism',
    media: {
      hero: { src: '/images/work/visit-the-usa/OD5QZlKjw2h6tjpes4zvW4gVmSs.png', type: 'image', alt: 'More to Discover campaign hero' },
      fullBleed1: { src: '/images/work/visit-the-usa/mCOcyZaqHk6e42MCMIrH8Lb048.png', type: 'image', alt: 'Split-screen film frame — iconic vs unexpected' },
      pair: {
        left: { src: '/images/work/visit-the-usa/JJK0FLlG9Ew0TGZy2LMeJDJp7g.webp', type: 'image', alt: 'Split-screen transition Golden Gate' },
        right: { src: '/images/work/visit-the-usa/vjcQdZjs7fH8L30qZYZOf8OQbQ.webp', type: 'image', alt: 'Transcreated social assets multi-language' },
      },
      grid: [
        { src: '/images/work/visit-the-usa/tqXco11bX0RmCVOe0GhwTXSEy3U.png', type: 'image', alt: 'More to Discover outdoor and print' },
      ],
    },
  },
  {
    slug: 'toyota',
    client: 'Toyota',
    sector: 'Automotive',
    number: '05',
    title: 'Toyota',
    tagline: '381 horses under the hood. Zero limits on how we told the story.',
    description: 'We stopped apologizing for where the Tundra was built and started showing what it could do. Then extended that confidence across the whole lineup with \u201CGo Anywhere, Imagine Everything.\u201D',
    shortOutcome: 'Tundra repositioned from underdog to contender, three vehicle lines unified under one creative platform, and a dealership confidence shift that changed how the Southeast sold Toyota trucks.',
    challenge: 'Ford, Chevy, Ram \u2014 American trucks are a religion and Toyota was the outsider. They had 381 horses and ridiculous towing capacity, but none of that mattered if truck buyers wouldn\u2019t even give it a look.',
    insight: 'Don\u2019t try to out-American the American trucks. Just out-work them. Stop apologizing for where it\u2019s built and start showing what it can do.',
    execution: [
      'The Tundra work leaned into raw capability with zero apologies \u2014 no origin-story defensiveness, just the truck doing what it does. Then we extended that creative confidence across the whole lineup. \u201CGo Anywhere, Imagine Everything\u201D tied the Tundra, Prius, and 4Runner into one belief system: your vehicle should never be the reason you don\u2019t go.',
    ],
    outcomes: [],
    metrics: [
      { label: 'Vehicle Lines', value: '3' },
      { label: 'Campaign Platforms', value: 'Film + Digital + Social' },
    ],
    services: ['Campaign Development', 'Film', 'Digital', 'Social'],
    videoSrc: 'https://videos.noahisdabomb.com/toyota_tundra.mp4',
    cta: { label: 'Book a Strategy Call', href: CAL_COM_URL, external: true },
    briefHeadline: 'American trucks are a religion. Toyota was the outsider trying to join the congregation.',
    brief: 'The full-size truck market is the most emotionally charged category in automotive. Ford, Chevy, and Ram own the conversation. Toyota had a beast of a truck \u2014 381 horses, ridiculous towing capacity \u2014 but none of that mattered if truck buyers wouldn\u2019t even consider it.',
    insightHeadline: 'Stop apologizing for where it\u2019s built. Start showing what it can do.',
    pullQuote: 'We didn\u2019t try to out-American the American trucks. We just out-worked them.',
    workHeadline: 'Zero limits. Then the whole lineup.',
    work: 'The Tundra work leaned into raw capability with zero apologies. Then we extended that creative confidence across the lineup. "Go Anywhere, Imagine Everything" tied the Tundra, Prius, and 4Runner into one belief system: your vehicle should never be the reason you don\u2019t go.',
    resultsHeadline: '381 horses. 3 vehicle lines. Full funnel.',
    myTake: 'Truck buyers don\u2019t want your clever ad. They want proof. We stopped trying to make the Tundra feel American and started making it feel undeniable. Respect the buyer, show them what the vehicle does, and trust that\u2019s enough.',
    agency: 'Tombras',
    role: 'Creative Director',
    year: '2019\u20132021',
    industry: 'Automotive',
    media: {
      hero: { src: '', type: 'image' as const, alt: 'Toyota Tundra hero film still' },
      fullBleed1: { src: '', type: 'image' as const, alt: 'Tundra capability shot off-road' },
      pair: {
        left: { src: '', type: 'image' as const, alt: 'Go Anywhere Imagine Everything :30 film' },
        right: { src: '', type: 'image' as const, alt: '4Runner and Prius lineup creative' },
      },
      grid: [],
    },
  },
  {
    slug: 'delta-air-lines',
    client: 'Delta Air Lines',
    sector: 'Travel',
    number: '06',
    title: 'Delta Air Lines',
    tagline: "We took Delta\u2019s most iconic symbol off the plane and rolled it into the streets.",
    description: 'We took the beverage cart off the plane and rolled it into five cities. Real pilots, real flight attendants, Biscoff cookies, and in-flight items turned into percussion instruments. 98% positive sentiment. Zero paid push.',
    shortOutcome: 'Five cities, three weeks, 98% positive sentiment, 141K new followers, and a holiday campaign that felt like a gift instead of a promotion.',
    challenge: 'Every airline sends holiday emails. Fare deals, frequent flyer bonuses, the usual. Delta wanted something different \u2014 not a promotion, but a genuine thank-you. How do you make a global airline feel personal during the most impersonal time of the year?',
    insight: 'The beverage cart is the most personal touchpoint at 35,000 feet. It\u2019s the one moment where a human being looks you in the eye and asks what you\u2019d like. We gave it a stage.',
    execution: [
      'We took the cart off the plane and rolled it into five cities over three weeks. Real Delta pilots and flight attendants in uniform \u2014 not actors. We turned carts and in-flight items into percussion instruments for a full musical performance. The #CheerCart hashtag took on a life of its own: 84% organic adoption, 141K new followers, zero paid push.',
    ],
    outcomes: [],
    metrics: [
      { label: 'Positive Sentiment', value: '98%' },
      { label: 'Cities Activated', value: '5' },
      { label: 'New Social Followers', value: '141K' },
      { label: 'Hashtag Adoption', value: '84%' },
    ],
    services: ['Experiential', 'Campaign Development', 'Film', 'Social'],
    videoSrc: 'https://videos.noahisdabomb.com/starbucks_%23cheercart.mp4',
    cta: { label: 'Talk Through Your Brief', href: CAL_COM_URL, external: true },
    briefHeadline: 'Airlines send holiday emails. We wanted to send holiday feelings.',
    brief: 'Every carrier floods inboxes with fare deals during the holidays. Delta wanted something different \u2014 not a promotion, but a genuine thank-you to the people who fly with them. How do you make a global airline feel personal during the most impersonal time of the year?',
    insightHeadline: 'The beverage cart is the most personal touchpoint at 35,000 feet.',
    pullQuote: 'The beverage cart is the most human moment in air travel. We gave it a stage.',
    workHeadline: 'Off the plane. Into the streets. Five cities. Three weeks.',
    work: 'We took the beverage cart off the plane and rolled it into five cities over three weeks. Real Delta pilots and flight attendants in uniform \u2014 not actors. We turned carts and in-flight items into percussion instruments for a full musical performance. The #CheerCart hashtag took on a life of its own: 84% organic hashtag adoption, zero paid push.',
    resultsHeadline: '98% positive sentiment. Zero paid hashtag push.',
    myTake: 'The best brand moments don\u2019t feel like marketing. We used real employees, not talent. The music was the creative risk \u2014 turning in-flight items into instruments could have been corny, but the performances were legitimately good. Holiday campaigns are a minefield of cliches. We dodged all of them by showing up in person.',
    agency: 'Digitas',
    role: 'Art Director',
    year: '2013',
    industry: 'Aviation',
    media: {
      hero: { src: '', type: 'image' as const, alt: 'Delta Cheer Cart street activation hero' },
      fullBleed1: { src: '', type: 'image' as const, alt: 'Real Delta pilots and flight attendants with Cheer Cart' },
      pair: {
        left: { src: '', type: 'image' as const, alt: 'Cheer Cart musical performance in NYC' },
        right: { src: '', type: 'image' as const, alt: '#CheerCart social media highlights' },
      },
      grid: [],
    },
  },
  {
    slug: 'visit-lauderdale',
    client: 'Visit Lauderdale / Greater Fort Lauderdale',
    sector: 'Tourism',
    number: '07',
    title: 'Visit Lauderdale',
    tagline: 'We won the account in August. Moved the entire world by November. Then earned the right to reposition the whole brand.',
    description: 'Break Free launched a winter campaign with 3D billboards and heated pop-ups that made people physically feel warmth. Then Never Lose Your Splash repositioned the entire destination around the one asset nobody else could claim.',
    shortOutcome: '2.5x likelihood to visit, 85% brand love increase, 152% visitation lift, and a category-of-one positioning built on water.',
    challenge: 'We won the account in August. By November, production partners were moving across three continents. No six-month brand audit. The first campaign was a winter push that had to break through in weeks against every destination selling the same frozen-escape fantasy.',
    insight: 'Every competitor sold the beach. When we stripped the category back, the thing that gave Lauderdale its pulse was the water underneath it all \u2014 the canals, the boats, the movement. That\u2019s the territory nobody else can claim.',
    execution: [
      'Break Free launched with a 3D anamorphic billboard in Times Square \u2014 \u201CThe Cube\u201D \u2014 and a heated pop-up in Chicago\u2019s Pioneer Court where people physically shattered winter. 150K people stopped. Then we earned the keys to the brand. AI-mapped category composites proved the Sea of Sameness. The answer was the water. \u201CNever Lose Your Splash\u201D launched on New Year\u2019s Eve in Times Square during NYE Live with Anderson Cooper and Andy Cohen.',
    ],
    outcomes: [],
    metrics: [
      { label: 'Likelihood to Visit', value: '2.5x' },
      { label: 'Brand Love Increase', value: '85%' },
      { label: 'Visitation Lift', value: '152%' },
      { label: 'Category of One', value: 'Water' },
    ],
    services: ['Brand Platform', 'Film', '3D OOH', 'Experiential', 'Social', 'Digital'],
    cta: { label: 'Talk Through Your Brief', href: CAL_COM_URL, external: true },
    briefHeadline: 'We won the account in August. By November we were moving production partners across three continents.',
    brief: 'We won the account in August and had to prove ourselves immediately. No six-month brand audit. The first project was a winter push that had to break through in weeks, followed by a full brand repositioning built on the one asset nobody else could claim.',
    insightHeadline: 'Every competitor sold the beach. We found the water underneath.',
    pullQuote: 'We didn\u2019t sell a destination. We delivered the brand promise in real life.',
    workHeadline: 'Break Free proved we could deliver. Then we repositioned the whole brand.',
    work: 'Break Free launched with a 3D anamorphic billboard in Times Square and a heated pop-up in Chicago where people physically shattered winter. Then we earned the keys to the brand. AI-mapped category composites proved the Sea of Sameness. The answer was the water \u2014 the canals, the boats, the movement. "Never Lose Your Splash" launched on New Year\u2019s Eve in Times Square.',
    resultsHeadline: '2.5x likelihood to visit. A category of one.',
    myTake: 'The Sea of Sameness is real. The only way out is to find what\u2019s already yours. AI helped us see the pattern, strategy helped us name it, but instinct found the current running underneath. Win the account, prove yourself with the work, then earn the keys to the brand.',
    agency: 'SPARK',
    role: 'Creative Director',
    year: '2024\u20132025',
    industry: 'Tourism',
    media: {
      hero: { src: '', type: 'image' as const, alt: 'Never Lose Your Splash brand campaign hero' },
      fullBleed1: { src: '', type: 'image' as const, alt: 'Break Free 3D anamorphic Times Square billboard' },
      pair: {
        left: { src: '', type: 'image' as const, alt: 'Heated pop-up Chicago activation' },
        right: { src: '', type: 'image' as const, alt: 'Never Lose Your Splash NYE Times Square launch' },
      },
      grid: [],
    },
  },
  {
    slug: 'orangetheory-more-life',
    client: 'Orangetheory Fitness',
    sector: 'Fitness',
    number: '08',
    title: 'Orangetheory More Life',
    tagline: 'The fitness category was obsessed with muscles. We made the entire world care about the one that actually matters.',
    description: 'More Life shifted Orangetheory from workout brand to lifestyle platform by building every message around the heart \u2014 the muscle that keeps you alive \u2014 instead of the ones you see in the mirror.',
    shortOutcome: '1,300+ studios worldwide, $1B systemwide sales, 67% increase in leads, and five consecutive years of double-digit growth on a single platform.',
    challenge: 'Every fitness brand was flexing abs in a mirror and calling it a campaign. Orangetheory had real science \u2014 heart rate zones, splat points, EPOC \u2014 but the brand was talking to people like they were already members. The brief: make Orangetheory mean something bigger than a workout.',
    insight: 'Deltoids, pecs, biceps, obliques, glutes, quads, calves. We ignored all of them. People don\u2019t work out to get abs. They work out to live longer, feel better, and show up differently in the world. The heart is the only muscle that matters.',
    execution: [
      'More Life launched the first national campaign that didn\u2019t look like a fitness ad. We evolved it through multiple phases \u2014 Krewella\u2019s \u201CGreenlights,\u201D Matt Baron\u2019s music-video energy, Dave Meyers\u2019 cinematic science film at Popsicle Studios (the same team behind Missy Elliott and Drake). Five years, one platform. From 250 studios to 1,300+ worldwide. The creative held because it was built on something real.',
    ],
    outcomes: [],
    metrics: [
      { label: 'Studios Worldwide', value: '1,300+' },
      { label: 'Systemwide Sales', value: '$1B' },
      { label: 'Lead Increase', value: '67%' },
      { label: 'Consecutive Growth', value: '5 Yrs' },
    ],
    services: ['Brand Platform', 'Film', 'Broadcast', 'OOH', 'Social', 'Digital'],
    cta: { label: 'Book a Strategy Call', href: CAL_COM_URL, external: true },
    briefHeadline: 'Every fitness brand was selling six-packs. We sold something they couldn\u2019t see.',
    brief: 'Orangetheory had real science \u2014 heart rate zones, splat points, EPOC \u2014 but the brand was talking to people like they were already members. Meanwhile every competitor was flexing abs in a mirror and calling it a campaign. The brief: make Orangetheory mean something bigger than a workout.',
    insightHeadline: 'The heart is the only muscle that matters.',
    pullQuote: 'Five years. One platform. The campaign kept evolving because the truth never changed.',
    workHeadline: 'More Life wasn\u2019t a campaign. It was a platform that kept growing.',
    work: 'More Life launched the first national campaign that didn\u2019t look like a fitness ad. We evolved it through multiple phases \u2014 Krewella\u2019s Greenlights, Matt Baron\u2019s music-video energy, Dave Meyers\u2019 cinematic science film \u2014 without ever replacing the core truth. From 250 studios to 1,300+, the creative platform held because it was built on something real.',
    resultsHeadline: '1,300+ studios. $1B systemwide. Five years running.',
    myTake: 'The best campaigns don\u2019t sell what you do. They sell what people get. More Life kept evolving because it was built on a genuine human truth, not a marketing insight. People don\u2019t work out to get abs. They work out to live longer, feel better, and show up differently in the world.',
    agency: 'Tombras',
    role: 'Creative Director',
    year: '2017\u20132022',
    industry: 'Fitness',
    media: {
      hero: { src: '', type: 'image' as const, alt: 'More Life campaign hero — heartbeat visual' },
      fullBleed1: { src: '', type: 'image' as const, alt: 'Krewella Greenlights music video collaboration' },
      pair: {
        left: { src: '', type: 'image' as const, alt: 'Dave Meyers cinematic science film still' },
        right: { src: '', type: 'image' as const, alt: 'More Heart More Life OOH billboard' },
      },
      grid: [],
    },
  },
];

// ---------------------------------------------------------------------------
// How I Work page content
// ---------------------------------------------------------------------------
export const HOW_I_WORK: HowIWorkPageContent = {
  sectionLabel: 'How I Work',
  headline: 'Senior creative thinking. Fewer handoffs. A next-day head start.',
  summary: 'This model is built for brand and agency leads who need strong judgment, fast movement, and one accountable creative lead from strategy through delivery.',
  principles: [
    {
      title: 'Positioning before production',
      body: [
        'The work starts by finding the pressure point in the brief, not by decorating the obvious answer.',
        'That usually means clarifying what the audience tension is, what the brand can credibly own, and what deserves to be amplified.',
      ],
    },
    {
      title: 'One point of view through the whole pipeline',
      body: [
        'The person shaping the strategy is the same person directing the deck, the scripts, the visual system, and the final files.',
        'That continuity is what keeps the work cohesive as it scales across formats.',
      ],
    },
    {
      title: 'Overnight as an operating advantage',
      body: [
        'Bangkok turns end-of-day U.S. notes into next-day progress.',
        'Instead of waiting for the next status meeting, teams wake up to sharper options, better questions, and visible movement.',
      ],
    },
    {
      title: 'Scale only when the brief needs it',
      body: [
        'One person is the default. Not the limit.',
        'If the scope expands, specialist partners can be brought in around the brief without turning the engagement into agency theater.',
      ],
    },
  ],
  scale: {
    headline: SCALE.headline,
    paragraphs: [...SCALE.paragraphs],
    items: SCALE_ITEMS,
  },
  faqs: [
    {
      question: 'What kinds of projects fit best?',
      answer: 'Positioning work, campaign development, pitch decks, launch narratives, brand refreshes, film-led campaigns, and senior-level execution support. Basically anything where a CD-level brain makes the difference between good and right.',
    },
    {
      question: 'How fast can something meaningful happen?',
      answer: 'In many cases the first real movement shows up the next day: reframed thinking, stronger directions, tighter copy, or an early system that gets the team unstuck. The 12-hour timezone gap means your evening brief is my morning priority.',
    },
    {
      question: 'Does this replace an agency?',
      answer: 'Sometimes. More often it removes the gap between strategy and production, or gives a stretched team a senior creative lead who can move faster with less overhead. The goal is filling the gap, not replacing what already works.',
    },
    {
      question: 'Do you work with agencies?',
      answer: 'Regularly. I embed with agency teams as a senior creative resource. Extra CD firepower for a pitch, a second perspective on a rebrand, or steady execution support when the team is stretched thin. White-label, your brand, no ego about the credit.',
    },
    {
      question: 'What does the day-to-day actually look like?',
      answer: 'You brief me like you would a senior creative on your team. I work in your tools: Figma, Slides, Docs, Slack, whatever the team uses. You get work back overnight, review in the morning, and we iterate in real time during overlap hours.',
    },
    {
      question: 'What are the engagement options?',
      answer: 'Three ways in: a single project with a fixed scope and timeline, a monthly retainer for ongoing creative direction, or a short sprint for something specific like a pitch or launch. Most clients start with a project and move to a retainer.',
    },
    {
      question: 'How does the timezone thing actually work?',
      answer: 'Bangkok is 11-12 hours ahead of the US East Coast. So your end-of-day handoff lands at the start of my workday. I deliver overnight, you review fresh in the morning. We overlap for 2-3 hours in the afternoon/evening for real-time calls and iteration.',
    },
    {
      question: 'What if the project needs more than one person?',
      answer: 'I have a bench of trusted specialists. Motion designers, editors, strategists, producers. They come in when the scope calls for it. You still get one point of contact and one standard of quality. I direct the work, same as I did at the agencies.',
    },
  ],
  primaryCta: { label: 'Book a Strategy Call', href: CAL_COM_URL, external: true },
};

export const PRICING_TIERS = [
  {
    name: 'Positioning Sprint',
    timeline: '2\u20133 weeks',
    description: 'Brand strategy, positioning, campaign platform. A fraction of what an agency charges for the same caliber of thinking \u2014 without the overhead, the layers, or the three-month timeline.',
  },
  {
    name: 'Campaign Development',
    timeline: '4\u20136 weeks',
    description: 'Strategy through final creative \u2014 decks, scripts, visual systems, social suites. Less than a single agency retainer month for a complete campaign platform.',
  },
  {
    name: 'Ongoing Creative Direction',
    timeline: 'Monthly',
    description: 'Senior creative leadership on retainer. Bangkok rates, global-brand experience. A fraction of a full-time hire with none of the recruiting, onboarding, or overhead.',
  },
] as const;

// ---------------------------------------------------------------------------
// Contact page content
// ---------------------------------------------------------------------------
export const CONTACT_PAGE: ContactPageContent = {
  sectionLabel: 'Contact',
  headline: "Let\u2019s talk about the brief before it gets watered down.",
  subline: "If you\u2019re building a campaign, shaping a launch, or trying to get stronger creative out of less process, this is the right conversation to start.",
  details: CONTACT_DETAILS,
  primaryCta: { label: 'Book a Strategy Call', href: CAL_COM_URL, external: true },
  secondaryCta: { label: 'Email Noah', href: 'mailto:noah@noahisdabomb.com', external: true },
};

// ---------------------------------------------------------------------------
// Site settings (nav, footer, concierge)
// ---------------------------------------------------------------------------
export const SITE_SETTINGS: SiteSettings = {
  siteTitle: 'Noah Williams | Freelance Creative Director. Strategy to Final Files.',
  siteDescription: 'Freelance creative director for hire. Bangkok-based, working overnight for brand and agency teams that need senior thinking, fast execution, and no handoffs.',
  calComUrl: CAL_COM_URL,
  email: 'noah@noahisdabomb.com',
  linkedIn: 'https://linkedin.com/in/noahisdabomb',
  footerDescription: 'Creative director for brands and agencies that need senior thinking, proof-forward storytelling, and an overnight production edge.',
  primaryNav: [
    { label: 'The Cycle', href: '/#timeline' },
    { label: 'Work', href: '/work' },
    { label: 'How I Work', href: '/how-i-work' },
    { label: 'Contact', href: '/contact' },
  ],
  footerNav: [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'How I Work', href: '/how-i-work' },
    { label: 'Contact', href: '/contact' },
  ],
  conciergeIntro: 'Need the fast version? I can point you to the right proof, process, or next step.',
  conciergeActions: [
    { label: 'Where should I start?', href: '/work', prompt: 'Point me to the work that makes the clearest case fastest.', page: 'all' },
    { label: "What's the setup?", href: '/how-i-work', prompt: 'Give me the short version of the overnight model and how the work actually runs.', page: 'home' },
    { label: 'Is a call worth it?', href: CAL_COM_URL, external: true, prompt: 'Tell me whether this sounds like a call or an email situation.', page: 'all' },
    { label: 'Which case study leads?', href: '/work/orangetheory-fitness', prompt: 'Show me the case study that best proves range, judgment, and results.', page: 'work' },
    { label: 'Can I just email?', href: 'mailto:noah@noahisdabomb.com', external: true, prompt: 'Skip the scheduler and tell me when email is the smarter move.', page: 'contact' },
  ],
};

// ---------------------------------------------------------------------------
// Helper: extract unique sectors from case studies (preserves source order)
// ---------------------------------------------------------------------------
export function getUniqueSectors(caseStudies: CaseStudy[]): string[] {
  const seen = new Set<string>();
  const sectors: string[] = [];
  for (const cs of caseStudies) {
    if (!cs.draft && !seen.has(cs.sector)) {
      seen.add(cs.sector);
      sectors.push(cs.sector);
    }
  }
  return sectors;
}

// ---------------------------------------------------------------------------
// Helper: convert CaseStudy[] to WorkPanel[] for homepage
// ---------------------------------------------------------------------------
export function toWorkPanels(
  caseStudies: CaseStudy[],
  { featured }: { featured?: boolean } = {},
): WorkPanel[] {
  let filtered = caseStudies.filter((s) => !s.draft);
  if (featured) {
    filtered = filtered.filter((s) => s.featured);
  }
  return filtered.map((study) => ({
    id: study.slug,
    number: study.number,
    title: study.title,
    tagline: study.tagline,
    description: study.description,
    sector: study.sector,
    tags: study.services,
    stats: study.metrics,
    videoSrc: study.videoSrc,
    href: `/work/${study.slug}`,
  }));
}
