import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'editorial-paper'
  | 'luxury-atelier'
  | 'brutalist-index'
  | 'organic-journal'
  | 'tech-directory'
  | 'retro-bulletin'
  | 'visual-gallery'

export const visualPresets = {
  'editorial-paper': {
    label: 'Gothic Chronicle',
    mood: 'dark dramatic gothic editorial authority',
    fontDirection: 'bold serif headlines with sharp uppercase labels',
    colors: {
      background: '#0a0a0c',
      foreground: '#e8e0d8',
      muted: '#8a7f75',
      primary: '#c41e3a',
      accent: '#c41e3a',
      surface: '#14141a',
    },
    shape: 'sharp edges, red accent borders, ornate decorative elements',
  },
  'luxury-atelier': {
    label: 'Luxury Atelier',
    mood: 'premium, restrained, polished',
    fontDirection: 'high-contrast display headings with spacious tracking',
    colors: {
      background: '#0a0a0c',
      foreground: '#e8e0d8',
      muted: '#8a7f75',
      primary: '#c41e3a',
      accent: '#c41e3a',
      surface: '#14141a',
    },
    shape: 'large dark panels, red hairlines, generous negative space',
  },
  'brutalist-index': {
    label: 'Brutalist Index',
    mood: 'bold, raw, memorable',
    fontDirection: 'condensed headings, mono labels, hard rhythm',
    colors: {
      background: '#0a0a0c',
      foreground: '#e8e0d8',
      muted: '#8a7f75',
      primary: '#c41e3a',
      accent: '#c41e3a',
      surface: '#14141a',
    },
    shape: 'sharp edges, thick borders, offset blocks',
  },
  'organic-journal': {
    label: 'Organic Journal',
    mood: 'warm, natural, trustworthy',
    fontDirection: 'rounded serif or humanist sans with soft captions',
    colors: {
      background: '#0a0a0c',
      foreground: '#e8e0d8',
      muted: '#8a7f75',
      primary: '#c41e3a',
      accent: '#c41e3a',
      surface: '#14141a',
    },
    shape: 'rounded cards, natural spacing, calm texture',
  },
  'tech-directory': {
    label: 'Tech Directory',
    mood: 'clean, fast, useful',
    fontDirection: 'modern sans with crisp mono data accents',
    colors: {
      background: '#0a0a0c',
      foreground: '#e8e0d8',
      muted: '#8a7f75',
      primary: '#c41e3a',
      accent: '#c41e3a',
      surface: '#14141a',
    },
    shape: 'clean grids, pill filters, sharp information hierarchy',
  },
  'retro-bulletin': {
    label: 'Retro Bulletin',
    mood: 'playful, local, energetic',
    fontDirection: 'chunky headings with friendly body type',
    colors: {
      background: '#0a0a0c',
      foreground: '#e8e0d8',
      muted: '#8a7f75',
      primary: '#c41e3a',
      accent: '#c41e3a',
      surface: '#14141a',
    },
    shape: 'stickers, tabs, framed modules, playful dividers',
  },
  'visual-gallery': {
    label: 'Visual Gallery',
    mood: 'cinematic, image-led, immersive',
    fontDirection: 'minimal sans with oversized display moments',
    colors: {
      background: '#0a0a0c',
      foreground: '#e8e0d8',
      muted: '#8a7f75',
      primary: '#c41e3a',
      accent: '#c41e3a',
      surface: '#14141a',
    },
    shape: 'dark cards, large media, glass overlays',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset:
    slot4BrandConfig.productKind === 'visual'
      ? 'visual-gallery'
      : 'editorial-paper',
  radius: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.375rem',
    xl: '0.5rem',
  },
  motion: {
    pageLoad: 'animate-in fade-in slide-in-from-bottom-4 duration-700',
    cardHover: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(196,30,58,0.12)]',
    softHover: 'transition duration-300 hover:opacity-85',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-xs font-bold uppercase tracking-[0.24em]',
    heroTitle: 'text-5xl font-bold tracking-[-0.02em] sm:text-6xl lg:text-7xl',
    sectionTitle: 'text-3xl font-bold tracking-[-0.02em] sm:text-4xl',
    body: 'text-base leading-8',
    caption: 'text-xs font-medium uppercase tracking-[0.18em]',
  },
  surfaces: {
    glass: 'border border-[#c41e3a]/15 bg-[#14141a]/80 backdrop-blur-xl',
    paper: 'border border-[#c41e3a]/15 bg-[#14141a] shadow-[0_24px_70px_rgba(0,0,0,0.4)]',
    quiet: 'border border-[#c41e3a]/10 bg-[#14141a]/50',
    dark: 'border border-[#c41e3a]/15 bg-[#08080a] shadow-[0_24px_70px_rgba(0,0,0,0.5)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-12 sm:py-16 lg:py-20',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
