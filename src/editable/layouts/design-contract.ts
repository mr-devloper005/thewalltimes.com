import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#0a0a0c',
  '--slot4-page-text': '#e8e0d8',
  '--slot4-panel-bg': '#111115',
  '--slot4-surface-bg': '#14141a',
  '--slot4-muted-text': '#8a7f75',
  '--slot4-soft-muted-text': '#6b6058',
  '--slot4-accent': '#c41e3a',
  '--slot4-accent-fill': '#c41e3a',
  '--slot4-accent-soft': '#c41e3a',
  '--slot4-cyan': '#c41e3a',
  '--slot4-dark-bg': '#08080a',
  '--slot4-dark-text': '#e8e0d8',
  '--slot4-media-bg': '#1a1a20',
  '--slot4-cream': '#0e0e12',
  '--slot4-warm': '#111115',
  '--slot4-lavender': '#14141a',
  '--slot4-gray': '#0e0e12',
  '--slot4-body-gradient': 'linear-gradient(180deg, #0a0a0c 0%, #0a0a0c 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[#c41e3a]/20',
  darkBorder: 'border-[#c41e3a]/15',
  shadow: 'shadow-[0_12px_40px_rgba(196,30,58,0.08)]',
  shadowStrong: 'shadow-[0_18px_70px_rgba(196,30,58,0.14)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.82))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-10 sm:py-12 lg:py-14',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[140px] shrink-0 snap-start sm:w-[160px]',
  },
  type: {
    eyebrow: 'text-xs font-bold uppercase tracking-[0.22em]',
    heroTitle: 'text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl',
    sectionTitle: 'text-3xl font-bold leading-tight sm:text-4xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-sm border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-sm border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-sm ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center rounded-sm border border-[#c41e3a]/40 bg-[#c41e3a]/10 px-6 py-3 text-sm font-bold text-[#c41e3a] transition hover:bg-[#c41e3a]/20 hover:shadow-[0_0_20px_rgba(196,30,58,0.2)]`,
    secondary: `inline-flex items-center justify-center rounded-sm border ${editablePalette.border} ${editablePalette.surfaceBg} px-6 py-3 text-sm font-bold ${editablePalette.surfaceText} transition hover:border-[#c41e3a]/40 hover:bg-[#c41e3a]/5`,
    accent: `inline-flex items-center justify-center rounded-sm border border-[#c41e3a] bg-[#c41e3a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#c41e3a]/90 hover:shadow-[0_0_24px_rgba(196,30,58,0.3)]`,
  },
  media: {
    frame: `relative overflow-hidden rounded-sm ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(196,30,58,0.12)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing, like the MysteryCoder reference layout.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
