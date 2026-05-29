import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Independent articles, essays, and analysis',
      description: 'Read timely articles, clear analysis, and editor-curated stories through a sharper magazine-style experience.',
      openGraphTitle: 'Independent articles, essays, and analysis',
      openGraphDescription: 'Discover timely articles, thoughtful essays, and clear reporting through a modern reading-first experience.',
      keywords: ['article website', 'news magazine', 'editorial archive', 'independent publication'],
    },
    hero: {
      badge: 'Daily article briefing',
      title: ['Read sharper articles', 'without the noise.'],
      description: 'A fast, image-rich publication layout for essays, explainers, opinion, interviews, and breaking context that readers can scan in seconds and settle into for longer reads.',
      primaryCta: { label: 'Read latest articles', href: '/article' },
      secondaryCta: { label: 'Search the archive', href: '/search' },
      searchPlaceholder: 'Search articles, topics, writers, and categories',
      focusLabel: 'Editor focus',
      featureCardBadge: 'front page rotation',
      featureCardTitle: 'The homepage behaves like a living magazine cover.',
      featureCardDescription: 'Fresh article cards, strong imagery, and compact summaries keep the publication feeling active without changing backend logic.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for article discovery, focused reading, and editorial rhythm.',
      paragraphs: [
        'This site is shaped around article reading first: headlines with weight, summaries that help people choose, and sections that keep the archive easy to move through.',
        'Instead of burying posts in a generic grid, the interface gives each story an editorial role: lead, feature, quick scan, related read, or deep archive entry.',
        'Whether someone arrives for a headline, a research note, or a long essay, they can move through related articles without losing the thread.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Article-first homepage with strong lead stories and compact rails.',
        'Search and archive patterns designed for serious readers.',
        'Cards that balance imagery, headline clarity, and excerpt depth.',
        'Lightweight UI that keeps the reading experience fast and calm.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See visuals', href: '/image' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Explore the latest articles through one focused reading experience.',
      description: 'Move from headline to context to related analysis without leaving the editorial flow.',
      primaryCta: { label: 'Browse Articles', href: '/article' },
      secondaryCta: { label: 'Pitch an Article', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Editorial mission',
    title: 'A publication built for readers who want context, not clutter.',
    description: `${slot4BrandConfig.siteName} turns articles into a focused reading journey: strong covers, useful summaries, calm navigation, and a searchable archive that rewards curiosity.`,
    paragraphs: [
      'Our pages are designed around the way people actually read online: scan the front page, open the strongest headline, check the surrounding context, and keep moving through related ideas.',
      'The publication voice is crisp and reader-friendly. We leave space for imagery, make article hierarchy obvious, and keep each page focused on the story rather than the interface.',
      'From the archive to the article detail page, every section is tuned for browsing, saving, searching, and returning to the next useful read.',
    ],
    values: [
      {
        title: 'Article-first hierarchy',
        description: 'Lead stories, quick reads, and related pieces are visually distinct so readers instantly understand where to start.',
      },
      {
        title: 'Editorial confidence',
        description: 'Large headlines, compact metadata, and clean spacing give the site the authority of a modern independent magazine.',
      },
      {
        title: 'Fast discovery',
        description: 'Search, archive filters, and card layouts help readers find the right article without fighting the page.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Pitch a story, ask a question, or reach the editorial desk.',
    description: 'Send article ideas, corrections, interview leads, partnership notes, or reader feedback. The contact experience is tuned for a publication, not a generic support queue.',
    formTitle: 'Write to the desk',
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
