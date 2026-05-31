import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Independent article newsroom',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: slot4BrandConfig.tagline || 'Article newsroom',
    primaryLinks: [
      { label: 'Articles', href: '/article' },
      { label: 'Search', href: '/search' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Read latest', href: '/article' },
      secondary: { label: 'Pitch a story', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Articles, analysis, essays, and useful context',
    description: 'A modern article-first publication for readers who want sharp headlines, calm layouts, useful context, and an archive that stays easy to scan.',
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
    bottomNote: 'Built for clean reading, fast discovery, and editorial trust.',
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
