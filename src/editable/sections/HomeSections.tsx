import Link from 'next/link'
import { ArrowRight, BookOpenText, Clock3, Newspaper, Search, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { globalContent } from '@/editable/content/global.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { getEditableCategory, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function OrnateCorner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const base = 'absolute w-4 h-4 border-[#c41e3a]/30'
  const pos = {
    tl: 'top-0 left-0 border-t border-l',
    tr: 'top-0 right-0 border-t border-r',
    bl: 'bottom-0 left-0 border-b border-l',
    br: 'bottom-0 right-0 border-b border-r',
  }
  return <span className={`${base} ${pos[position]}`} />
}

function OrnateFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <OrnateCorner position="tl" />
      <OrnateCorner position="tr" />
      <OrnateCorner position="bl" />
      <OrnateCorner position="br" />
      {children}
    </div>
  )
}

function DiamondDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c41e3a]/20" />
      <div className="h-2 w-2 rotate-45 border border-[#c41e3a]/40 bg-[#c41e3a]/10" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c41e3a]/20" />
    </div>
  )
}

function MiniPoster({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group block w-[190px] shrink-0 transition duration-300 hover:opacity-90">
      <article className="relative overflow-hidden border border-[#c41e3a]/15 bg-[#14141a] p-1.5 transition duration-300 group-hover:border-[#c41e3a]/30 group-hover:shadow-[0_0_20px_rgba(196,30,58,0.1)]">
        <OrnateCorner position="tl" />
        <OrnateCorner position="tr" />
        <OrnateCorner position="bl" />
        <OrnateCorner position="br" />
        <div className="relative aspect-[4/5] overflow-hidden bg-[#1a1a20]">
          <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-85" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(10,10,12,0.88)_100%)]" />
          <span className="absolute left-3 top-3 border border-[#c41e3a]/30 bg-[#0a0a0c]/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#c41e3a]">
            Read
          </span>
          <h3 className="absolute bottom-3 left-3 right-3 line-clamp-3 text-sm font-bold leading-tight text-[#e8e0d8] drop-shadow-sm">
            {post.title}
          </h3>
        </div>
      </article>
    </Link>
  )
}

function FeatureTile({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const style = index % 3
  if (style === 0) {
    return (
      <Link href={href} className="group relative min-h-[300px] overflow-hidden border border-[#c41e3a]/20 bg-[#0a0a0c] text-[#e8e0d8] transition duration-300 hover:border-[#c41e3a]/40 hover:shadow-[0_0_30px_rgba(196,30,58,0.12)]">
        <OrnateCorner position="tl" />
        <OrnateCorner position="tr" />
        <OrnateCorner position="bl" />
        <OrnateCorner position="br" />
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-700 group-hover:scale-105 group-hover:opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,0.3),rgba(10,10,12,0.9))]" />
        <div className="relative z-10 flex min-h-[260px] flex-col justify-end p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c41e3a]">Featured</p>
          <h3 className="mt-3 line-clamp-3 text-2xl font-bold leading-tight">{post.title}</h3>
          <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#8a7f75]">{getExcerpt(post, 110)}</p>
        </div>
      </Link>
    )
  }
  if (style === 1) {
    return (
      <Link href={href} className="group grid overflow-hidden border border-[#c41e3a]/15 bg-[#14141a] transition duration-300 hover:border-[#c41e3a]/30 hover:shadow-[0_0_30px_rgba(196,30,58,0.1)] md:grid-cols-[0.82fr_1fr]">
        <div className="relative min-h-[190px] bg-[#1a1a20]">
          <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105 group-hover:opacity-75" />
        </div>
        <div className="p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#c41e3a]">Spotlight {index + 1}</p>
          <h3 className="mt-4 line-clamp-3 text-xl font-bold leading-tight text-[#e8e0d8]">{post.title}</h3>
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#8a7f75]">{getExcerpt(post, 135)}</p>
        </div>
      </Link>
    )
  }
  return (
    <Link href={href} className="group relative overflow-hidden border border-[#c41e3a]/15 bg-[#14141a] p-6 transition duration-300 hover:border-[#c41e3a]/30 hover:shadow-[0_0_30px_rgba(196,30,58,0.1)]">
      <OrnateCorner position="tl" />
      <OrnateCorner position="tr" />
      <OrnateCorner position="bl" />
      <OrnateCorner position="br" />
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#c41e3a]/5" />
      <div className="relative h-20 w-20 overflow-hidden border border-[#c41e3a]/20">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-110" />
      </div>
      <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.26em] text-[#c41e3a]">Deep read</p>
      <h3 className="mt-3 line-clamp-4 text-xl font-bold leading-tight text-[#e8e0d8]">{post.title}</h3>
      <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#8a7f75]">{getExcerpt(post, 125)}</p>
    </Link>
  )
}

function WideStoryCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid gap-4 overflow-hidden border border-[#c41e3a]/15 bg-[#14141a] p-3 transition duration-300 hover:border-[#c41e3a]/30 hover:shadow-[0_0_24px_rgba(196,30,58,0.1)] sm:grid-cols-[130px_minmax(0,1fr)]">
      <div className="relative aspect-[5/4] overflow-hidden bg-[#1a1a20] sm:aspect-square">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105 group-hover:opacity-75" />
        <span className="absolute bottom-2 left-2 border border-[#c41e3a]/30 bg-[#0a0a0c]/80 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#c41e3a]">
          No. {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="min-w-0 py-2 pr-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#c41e3a]">Analysis</p>
        <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-tight text-[#e8e0d8]">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#8a7f75]">{getExcerpt(post, 145)}</p>
      </div>
    </Link>
  )
}

function IndexPill({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group relative overflow-hidden border border-[#c41e3a]/15 bg-[#14141a] p-5 transition duration-300 hover:border-[#c41e3a]/30 hover:shadow-[0_0_24px_rgba(196,30,58,0.1)]">
      <OrnateCorner position="tl" />
      <OrnateCorner position="tr" />
      <OrnateCorner position="bl" />
      <OrnateCorner position="br" />
      <span className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-[#c41e3a]/5 transition group-hover:scale-125" />
      <p className="relative text-[10px] font-bold uppercase tracking-[0.26em] text-[#c41e3a]">No. {String(index + 1).padStart(2, '0')}</p>
      <h3 className="relative mt-3 line-clamp-3 text-lg font-bold leading-tight text-[#e8e0d8]">{post.title}</h3>
      <p className="relative mt-4 line-clamp-3 text-sm leading-7 text-[#8a7f75]">{getExcerpt(post, 120)}</p>
      <span className="relative mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#c41e3a]">
        Open <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
      </span>
    </Link>
  )
}

function Rail({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`${dc.layout.rail} ${className}`}>{children}</div>
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const heroTitle = pagesContent.home.hero.title.join(' ') || `Come for the ${taskLabel(primaryTask).toLowerCase()}. Stay for the connection.`
  const heroPosts = posts.slice(0, 4)
  const leadPost = heroPosts[0]
  const sidePosts = heroPosts.slice(1, 4)
  return (
    <section className="relative overflow-hidden bg-[#0a0a0c] text-[#e8e0d8]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,30,58,0.06)_0%,transparent_60%)]" />
      <div className="absolute inset-x-4 inset-y-4 border border-[#c41e3a]/10 sm:inset-x-8 sm:inset-y-8" />
      <div className="relative mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:py-20">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-3">
            <div className="h-px w-8 bg-[#c41e3a]/40" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c41e3a]">{pagesContent.home.hero.badge}</p>
            <div className="h-px w-8 bg-[#c41e3a]/40" />
          </div>
          <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">{heroTitle}</h1>
          <div className="mt-2 h-px w-40 bg-gradient-to-r from-[#c41e3a]/50 to-transparent" />
          <p className="mt-5 max-w-xl text-base leading-7 text-[#8a7f75]">{pagesContent.home.hero.description}</p>
          <form action="/search" className="mt-8 flex max-w-xl border border-[#c41e3a]/20 bg-[#14141a] p-1">
            <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="min-w-0 flex-1 bg-transparent px-5 text-sm font-medium text-[#e8e0d8] outline-none placeholder:text-[#6b6058]" />
            <button className="inline-flex items-center gap-2 border border-[#c41e3a]/30 bg-[#c41e3a]/10 px-5 py-3 text-sm font-bold text-[#c41e3a] transition hover:bg-[#c41e3a]/20"><Search className="h-4 w-4" /> Search</button>
          </form>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link href={primaryRoute} className={dc.button.accent}>{pagesContent.home.hero.primaryCta.label} <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/contact" className={dc.button.secondary}>Submit a story</Link>
          </div>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              { Icon: Newspaper, label: 'Market analysis' },
              { Icon: BookOpenText, label: 'Strategic depth' },
              { Icon: Clock3, label: 'Daily briefings' },
            ].map(({ Icon, label }) => (
              <OrnateFrame key={label} className="border border-[#c41e3a]/10 bg-[#14141a]/60 p-4">
                <Icon className="h-5 w-5 text-[#c41e3a]" />
                <p className="mt-3 text-sm font-bold text-[#e8e0d8]/80">{label}</p>
              </OrnateFrame>
            ))}
          </div>
        </div>
        <div className="relative min-h-[420px]">
          <div className="absolute right-0 top-0 w-[88%] overflow-hidden border border-[#c41e3a]/20 bg-[#14141a] p-2 shadow-[0_34px_90px_rgba(196,30,58,0.08)]">
            <OrnateCorner position="tl" />
            <OrnateCorner position="tr" />
            <OrnateCorner position="bl" />
            <OrnateCorner position="br" />
            <div className="grid aspect-[1.25/1] gap-2 bg-[#0e0e12] p-3 sm:grid-cols-[1.2fr_0.8fr]">
              {leadPost ? (
                <Link href={postHref(primaryTask, leadPost, primaryRoute)} className="group relative overflow-hidden bg-[#0a0a0c]">
                  <img src={getEditablePostImage(leadPost)} alt={leadPost.title} className="h-full w-full object-cover opacity-50 transition duration-500 group-hover:scale-105 group-hover:opacity-65" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(10,10,12,0.92))]" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c41e3a]">{getEditableCategory(leadPost)}</p>
                    <h2 className="mt-2 line-clamp-3 text-xl font-bold leading-tight">{leadPost.title}</h2>
                  </div>
                </Link>
              ) : (
                <div className="relative overflow-hidden bg-[#0a0a0c]" />
              )}
              <div className="grid gap-2">
                {sidePosts.map((post) => (
                  <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group grid grid-cols-[68px_minmax(0,1fr)] gap-3 border border-[#c41e3a]/10 bg-[#14141a] p-2">
                    <div className="relative overflow-hidden bg-[#1a1a20]">
                      <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-500 group-hover:scale-105 group-hover:opacity-70" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#c41e3a]">{getEditableCategory(post)}</p>
                      <p className="mt-1 line-clamp-3 text-xs font-bold leading-tight text-[#e8e0d8]">{post.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-0 w-[58%] border border-[#c41e3a]/15 bg-[#0e0e12] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
            <OrnateCorner position="tl" />
            <OrnateCorner position="tr" />
            <OrnateCorner position="bl" />
            <OrnateCorner position="br" />
            <Sparkles className="h-5 w-5 text-[#c41e3a]" />
            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a7f75]">Publication note</p>
            <h3 className="mt-3 text-xl font-bold leading-tight">{globalContent.site.name} delivers business intelligence.</h3>
          </div>
          <div className="absolute bottom-16 right-8 border border-[#c41e3a]/40 bg-[#c41e3a]/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-[#c41e3a] shadow-[0_0_16px_rgba(196,30,58,0.15)]">
            Analysis first
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 12)
  if (!railPosts.length) return null
  return (
    <section className="relative border-t border-[#c41e3a]/10 bg-[#0e0e12]">
      <div className="relative mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#c41e3a]">Current edition</p>
            <h2 className="mt-2 text-3xl font-bold text-[#e8e0d8] sm:text-4xl">Trending articles</h2>
          </div>
          <Link href={primaryRoute} className="border border-[#c41e3a]/30 bg-[#c41e3a]/10 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-[#c41e3a] transition hover:bg-[#c41e3a]/20">See all</Link>
        </div>
        <DiamondDivider />
        <Rail className="mt-4">
          {railPosts.map((post) => <MiniPoster key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
        </Rail>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const featured = posts.slice(0, 8)
  if (!featured.length) return null
  return (
    <section className="relative overflow-hidden bg-[#0a0a0c]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(196,30,58,0.04)_0%,transparent_50%)]" />
      <div className="relative mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3">
            <div className="h-2 w-2 rotate-45 bg-[#c41e3a]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#c41e3a]">Editor selection</p>
          </div>
          <h2 className="mt-3 text-3xl font-bold text-[#e8e0d8] sm:text-4xl">Must-read {taskLabel(primaryTask).toLowerCase()}</h2>
        </div>
        <DiamondDivider />
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.slice(0, 6).map((post, index) => (
            <FeatureTile key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const categoryPosts = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts.slice(8)
  const feature = categoryPosts[0] || posts[0]
  const picks = categoryPosts.slice(1, 5)
  const indexPosts = categoryPosts.slice(5, 13)
  return (
    <section className="bg-[#0e0e12]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <div className="inline-flex items-center gap-3">
            <div className="h-2 w-2 rotate-45 border border-[#c41e3a]/40" />
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#c41e3a]">Archive flow</p>
          </div>
          <h2 className="mt-3 text-3xl font-bold text-[#e8e0d8] sm:text-4xl">All the topics. One reading path.</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[#8a7f75]">Find your next article faster. Browse structured sections, strong cards, and useful summaries without losing focus.</p>
          <form action="/search" className="mt-8 flex max-w-md border border-[#c41e3a]/15 bg-[#14141a] p-1.5">
            <input name="q" placeholder="Search posts" className="min-w-0 flex-1 bg-transparent px-4 text-sm text-[#e8e0d8] outline-none placeholder:text-[#6b6058]" />
            <button className="inline-flex items-center gap-2 border border-[#c41e3a]/30 bg-[#c41e3a]/10 px-5 py-2.5 text-sm font-bold text-[#c41e3a]"><Search className="h-4 w-4" /> Search</button>
          </form>
        </div>
        <div className="grid gap-4">
          {picks.map((post, index) => <WideStoryCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
        </div>
      </div>
      {feature ? (
        <div className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:px-8">
          <Link href={postHref(primaryTask, feature, primaryRoute)} className="group relative min-h-[340px] overflow-hidden border border-[#c41e3a]/20 bg-[#0a0a0c] text-[#e8e0d8] shadow-[0_14px_44px_rgba(0,0,0,0.4)] transition hover:border-[#c41e3a]/35">
            <OrnateCorner position="tl" />
            <OrnateCorner position="tr" />
            <OrnateCorner position="bl" />
            <OrnateCorner position="br" />
            <img src={getEditablePostImage(feature)} alt={feature.title} className="absolute inset-0 h-full w-full object-cover opacity-35 transition duration-500 group-hover:scale-105 group-hover:opacity-45" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,0.2),rgba(10,10,12,0.85))]" />
            <div className="relative z-10 flex min-h-[340px] flex-col justify-end p-7 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#c41e3a]">Featured analysis</p>
              <h3 className="mt-4 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">{feature.title}</h3>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#8a7f75]">{getExcerpt(feature, 180)}</p>
            </div>
          </Link>
          <div className="grid gap-4 sm:grid-cols-2">
            {indexPosts.map((post, index) => <IndexPill key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className="relative scroll-mt-24 overflow-hidden bg-[#08080a] text-[#e8e0d8]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,30,58,0.06)_0%,transparent_50%)]" />
      <div className="absolute inset-x-8 inset-y-6 border border-[#c41e3a]/8" />
      <div className="relative mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#c41e3a]/30" />
            <div className="h-2 w-2 rotate-45 bg-[#c41e3a]" />
            <div className="h-px w-12 bg-[#c41e3a]/30" />
          </div>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c41e3a]">Contribute</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">Have analysis that deserves attention?</h2>
          <p className="mt-5 text-base text-[#8a7f75]">Submit market analysis, strategic perspectives, or business intelligence to the editorial desk.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className={dc.button.accent}>Submit analysis</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
