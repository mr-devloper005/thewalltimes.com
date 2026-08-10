import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured read' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group block min-w-0 overflow-hidden border border-[#c41e3a]/20 bg-[#0a0a0c] transition duration-300 hover:border-[#c41e3a]/40 hover:shadow-[0_18px_55px_rgba(196,30,58,0.12)]">
      <div className="relative min-h-[520px] p-6 sm:p-8 lg:min-h-[620px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-35 transition duration-500 group-hover:scale-105 group-hover:opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,0.2),rgba(10,10,12,0.9))]" />
        <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-[#c41e3a]/30" />
        <span className="absolute right-4 top-4 h-4 w-4 border-r border-t border-[#c41e3a]/30" />
        <span className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-[#c41e3a]/30" />
        <span className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-[#c41e3a]/30" />
        <div className="relative z-10 flex h-full min-h-[460px] flex-col justify-end text-[#e8e0d8] lg:min-h-[560px]">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c41e3a]">{label}</span>
          <h3 className="mt-5 max-w-3xl text-4xl font-bold leading-[0.95] tracking-[-0.03em] sm:text-5xl lg:text-6xl">{post.title}</h3>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-[#8a7f75] sm:text-base">{getEditableExcerpt(post, 190)}</p>
          <span className="mt-8 inline-flex w-fit items-center gap-2 border border-[#c41e3a]/40 bg-[#c41e3a]/10 px-5 py-3 text-sm font-bold text-[#c41e3a]">
            Read story <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block w-[140px] shrink-0 snap-start overflow-hidden border border-[#c41e3a]/15 bg-[#14141a] transition duration-300 hover:-translate-y-1 hover:border-[#c41e3a]/30 hover:shadow-[0_18px_55px_rgba(196,30,58,0.12)] sm:w-[160px]">
      <div className="relative aspect-[2/3] overflow-hidden bg-[#1a1a20]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-75" />
        <span className="absolute left-3 top-3 border border-[#c41e3a]/30 bg-[#0a0a0c]/80 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#c41e3a]">No. {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c41e3a]">{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-3 text-base font-bold leading-tight text-[#e8e0d8]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#8a7f75]">{getEditableExcerpt(post, 100)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block min-w-0 border border-[#c41e3a]/15 bg-[#14141a] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#c41e3a]/30 hover:shadow-[0_18px_55px_rgba(196,30,58,0.12)]">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#c41e3a]/30 bg-[#c41e3a]/10 text-xs font-bold text-[#c41e3a]">{index + 1}</span>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c41e3a]"><Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}</p>
          <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-tight text-[#e8e0d8]">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#8a7f75]">{getEditableExcerpt(post, 105)}</p>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 gap-5 overflow-hidden border border-[#c41e3a]/15 bg-[#14141a] p-3 transition duration-300 hover:-translate-y-1 hover:border-[#c41e3a]/30 hover:shadow-[0_18px_55px_rgba(196,30,58,0.12)] sm:grid-cols-[220px_minmax(0,1fr)]">
      <div className="relative aspect-[16/12] overflow-hidden bg-[#1a1a20] sm:aspect-auto sm:min-h-[190px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-75" />
      </div>
      <div className="min-w-0 p-2 sm:py-4 sm:pr-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c41e3a]">Read {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-3 line-clamp-3 text-2xl font-bold leading-tight text-[#e8e0d8] sm:text-3xl">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#8a7f75]">{getEditableExcerpt(post, 180)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#c41e3a]">Open article <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}
