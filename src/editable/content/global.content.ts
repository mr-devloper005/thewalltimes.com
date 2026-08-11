import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Business intelligence chronicle',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: slot4BrandConfig.tagline || 'Chronicle',
    primaryLinks: [
      { label: 'Articles', href: '/article' },
      { label: 'Search', href: '/search' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Read latest', href: '/article' },
      secondary: { label: 'Submit a story', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Business insights, market analysis, and strategic thinking',
    description: 'A premium publication delivering sharp business analysis, market insights, and strategic perspectives for decision makers who value depth over noise.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Latest Articles', href: '/article' },
          { label: 'Search Archive', href: '/search' },
          { label: 'Reader Notes', href: '/comments' },
          { label: 'Bookmarks', href: '/sbm' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Premium business intelligence for discerning readers.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
