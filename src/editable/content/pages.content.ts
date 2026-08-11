import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Business intelligence, market analysis, and strategic insights',
      description: 'Discover sharp business analysis, market intelligence, and strategic perspectives through a premium reading experience.',
      openGraphTitle: 'Business intelligence, market analysis, and strategic insights',
      openGraphDescription: 'Premium business articles, market analysis, and strategic perspectives for decision makers.',
      keywords: ['business news', 'market analysis', 'business intelligence', 'strategic insights'],
    },
    hero: {
      badge: 'The chronicle',
      title: ['Business intelligence', 'for decision makers.'],
      description: 'Sharp analysis, market insights, and strategic perspectives delivered through a premium reading experience built for business leaders who demand depth.',
      primaryCta: { label: 'Enter the archive', href: '/article' },
      secondaryCta: { label: 'Search stories', href: '/search' },
      searchPlaceholder: 'Search articles, markets, strategies, and analysis',
      focusLabel: 'Editorial focus',
      featureCardBadge: 'front page rotation',
      featureCardTitle: 'The chronicle delivers business intelligence that matters.',
      featureCardDescription: 'Fresh analysis, market cards, and compact insights keep the publication sharp and current.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for business discovery, strategic reading, and market intelligence.',
      paragraphs: [
        'This publication is built around business reading first: headlines with authority, analysis that helps leaders decide, and sections that surface the right insight at the right time.',
        'Every article gets editorial weight: lead analysis, market brief, strategic deep dive, or sector overview.',
        'Whether you arrive for a market update or a strategic essay, the archive keeps you moving through connected insights.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Analysis-first homepage with strong lead stories.',
        'Search and archive designed for business professionals.',
        'Cards that balance data, clarity, and strategic depth.',
        'Fast, focused reading without distractions.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See visuals', href: '/image' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Explore the latest business intelligence and strategic analysis.',
      description: 'From market overview to deep strategic analysis — one focused reading experience.',
      primaryCta: { label: 'Browse Articles', href: '/article' },
      secondaryCta: { label: 'Submit Analysis', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our mission',
    title: 'A publication built for leaders who value depth over noise.',
    description: `${slot4BrandConfig.siteName} delivers premium business intelligence: sharp analysis, market context, strategic perspectives, and an archive that rewards serious readers.`,
    paragraphs: [
      'We design every page around how business professionals actually consume information: scan the front page for what matters, open the strongest analysis, absorb the context, and follow connected threads.',
      'The editorial voice is precise and authoritative. We prioritize clarity, make information hierarchy obvious, and keep each page focused on substance.',
      'From the archive to the detail page, every section is built for efficient discovery, deep reading, and strategic thinking.',
    ],
    values: [
      {
        title: 'Analysis-first hierarchy',
        description: 'Lead stories, market briefs, and strategic pieces are visually distinct so readers find what matters instantly.',
      },
      {
        title: 'Editorial authority',
        description: 'Strong headlines, precise metadata, and disciplined spacing give the publication the weight of a premium business journal.',
      },
      {
        title: 'Efficient discovery',
        description: 'Search, filters, and structured layouts help professionals find the right analysis without wasting time.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Submit analysis, reach the editorial desk, or start a conversation.',
    description: 'Send article ideas, market analysis, corrections, partnership proposals, or reader feedback. Built for professional communication.',
    formTitle: 'Write to the desk',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search articles, analysis, categories, and content across the archive.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find the analysis that matters.',
      description: 'Use keywords, categories, and content types to discover articles from every section of the publication.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest from the archive',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the publication.',
    },
    locked: {
      badge: 'Contributor access',
      title: 'Login to submit new content.',
      description: 'Use your account to access the publishing workspace and create posts for the active sections.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for the publication.',
      description: 'Choose the content type, add details, and prepare a polished submission.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login to the publication.',
      badge: 'Member access',
      title: 'Welcome back.',
      description: 'Login to continue browsing, managing submissions, and creating new content.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched. Create an account first.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Create an account.',
      badge: 'Join',
      title: 'Create your account.',
      description: 'Create an account to access the publishing workspace and submit content.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters.',
      success: 'Account created. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
