import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Reading desk',
    headline: 'Long-form articles with a calmer editorial rhythm.',
    description: 'Use this page for essays, guides, explainers, and story-led posts. The layout should feel like a publication, not a directory.',
    filterLabel: 'Choose article topic',
    secondaryNote: 'Reading surfaces need space, hierarchy, and fewer distractions.',
    chips: ['Editorial pacing', 'Topic filters', 'Long-read friendly'],
  },
  classified: {
    eyebrow: 'Article notices',
    headline: 'Brief posts and quick editorial updates.',
    description: 'Short-form article notices should scan quickly while still feeling part of the publication.',
    filterLabel: 'Filter article notice',
    secondaryNote: 'Prioritize urgency, summary clarity, and direct browsing.',
    chips: ['Briefs', 'Updates', 'Quick reads'],
  },
  sbm: {
    eyebrow: 'Saved reads',
    headline: 'Bookmarked articles arranged like curated reading lists.',
    description: 'Saved links should feel like editorial collections, with enough context to decide what to read next.',
    filterLabel: 'Filter reading list',
    secondaryNote: 'Curated reads need grouping and calm metadata.',
    chips: ['Reading lists', 'References', 'Context'],
  },
  profile: {
    eyebrow: 'Writer profiles',
    headline: 'Author pages with identity, trust, and article context.',
    description: 'Profile pages should make writers, editors, and contributors feel discoverable rather than buried in a generic feed.',
    filterLabel: 'Filter writer category',
    secondaryNote: 'Make identity and credibility visible before the article grid begins.',
    chips: ['Writers', 'Trust cues', 'Bylines'],
  },
  pdf: {
    eyebrow: 'Research desk',
    headline: 'Reports and references that support deeper articles.',
    description: 'Document pages should feel like source material, briefings, and reference files attached to the editorial archive.',
    filterLabel: 'Filter reference type',
    secondaryNote: 'Reference surfaces need archive cues, file context, and clear browsing.',
    chips: ['Reports', 'Sources', 'Briefings'],
  },
  listing: {
    eyebrow: 'Source index',
    headline: 'Article sources and references built for discovery.',
    description: 'Index pages should support articles with trust cues, metadata, and a practical search rhythm.',
    filterLabel: 'Filter source category',
    secondaryNote: 'Prioritize context, credibility, and direct reading paths.',
    chips: ['Sources', 'Context', 'Reference index'],
  },
  image: {
    eyebrow: 'Photo essays',
    headline: 'Image-led articles with a gallery-first browsing experience.',
    description: 'Image pages should support article storytelling with visual impact, stronger cards, and a magazine rhythm.',
    filterLabel: 'Filter photo essay category',
    secondaryNote: 'Let images carry the article before long text does.',
    chips: ['Photo essays', 'Visual-first', 'Magazine mood'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
