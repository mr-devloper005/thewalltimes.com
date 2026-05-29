import Link from 'next/link'
import { ArrowRight, BookOpenText, Clock3, Newspaper, Search, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { globalContent } from '@/editable/content/global.content'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
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
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function MiniPoster({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className={`group block w-[190px] shrink-0 ${dc.motion.fade}`}>
      <article className="relative overflow-hidden rounded-[1rem] border border-black/[0.07] bg-white p-2 shadow-[0_12px_32px_rgba(47,29,22,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(47,29,22,0.12)]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[0.8rem] bg-[var(--slot4-media-bg)]">
          <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(0,0,0,0.72)_100%)]" />
          <span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)] shadow-sm">
            Read
          </span>
          <h3 className="absolute bottom-3 left-3 right-3 line-clamp-3 text-base font-black leading-tight tracking-[-0.03em] text-white drop-shadow-sm">
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
      <Link href={href} className="group relative min-h-[300px] overflow-hidden rounded-[1.25rem] bg-[#24150f] p-5 text-white shadow-[0_18px_48px_rgba(47,29,22,0.14)] transition duration-300 hover:-translate-y-1">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.78))]" />
        <div className="relative z-10 flex min-h-[260px] flex-col justify-end">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/70">Featured</p>
          <h3 className="mt-3 line-clamp-3 text-2xl font-black leading-tight">{post.title}</h3>
          <p className="mt-4 line-clamp-2 text-sm leading-6 text-white/76">{getExcerpt(post, 110)}</p>
        </div>
      </Link>
    )
  }
  if (style === 1) {
    return (
      <Link href={href} className={`group grid overflow-hidden rounded-[1.25rem] border ${pal.border} bg-white shadow-[0_12px_34px_rgba(47,29,22,0.08)] transition duration-300 hover:-translate-y-1 md:grid-cols-[0.82fr_1fr]`}>
        <div className="relative min-h-[190px] bg-[var(--slot4-media-bg)]">
          <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </div>
        <div className="p-6">
          <p className={`text-[11px] font-black uppercase tracking-[0.26em] ${pal.accentText}`}>Spotlight {index + 1}</p>
          <h3 className="mt-4 line-clamp-3 text-xl font-black leading-tight text-[var(--slot4-page-text)]">{post.title}</h3>
          <p className={`mt-4 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getExcerpt(post, 135)}</p>
        </div>
      </Link>
    )
  }
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-[1.25rem] border ${pal.border} bg-[var(--slot4-accent-soft)] p-6 shadow-[0_12px_34px_rgba(47,29,22,0.08)] transition duration-300 hover:-translate-y-1`}>
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/55" />
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-sm">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
      </div>
      <p className={`mt-8 text-[11px] font-black uppercase tracking-[0.26em] ${pal.accentText}`}>Deep read</p>
      <h3 className="mt-3 line-clamp-4 text-xl font-black leading-tight text-[var(--slot4-page-text)]">{post.title}</h3>
      <p className={`mt-4 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getExcerpt(post, 125)}</p>
    </Link>
  )
}

function WideStoryCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group grid gap-4 overflow-hidden rounded-[1.15rem] border ${pal.border} bg-white p-3 shadow-[0_10px_28px_rgba(47,29,22,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_42px_rgba(47,29,22,0.12)] sm:grid-cols-[130px_minmax(0,1fr)]`}>
      <div className="relative aspect-[5/4] overflow-hidden rounded-[1.25rem] bg-[var(--slot4-media-bg)] sm:aspect-square">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute bottom-3 left-3 rounded-full bg-black/72 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white backdrop-blur">
          Pick {index + 1}
        </span>
      </div>
      <div className="min-w-0 py-2 pr-2">
        <p className={`text-[11px] font-extrabold uppercase tracking-[0.24em] ${pal.accentText}`}>Editor's lane</p>
        <h3 className="mt-2 line-clamp-2 text-xl font-black leading-tight text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className={`mt-3 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getExcerpt(post, 145)}</p>
      </div>
    </Link>
  )
}

function IndexPill({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-[1.1rem] border ${pal.border} bg-white p-5 shadow-[0_10px_28px_rgba(47,29,22,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(47,29,22,0.12)]`}>
      <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[var(--slot4-accent-soft)] opacity-70 transition group-hover:scale-125" />
      <p className={`relative text-[11px] font-black uppercase tracking-[0.26em] ${pal.accentText}`}>No. {String(index + 1).padStart(2, '0')}</p>
      <h3 className="relative mt-3 line-clamp-3 text-lg font-black leading-tight text-[var(--slot4-page-text)]">{post.title}</h3>
      <p className={`relative mt-4 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getExcerpt(post, 120)}</p>
      <span className="relative mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)] opacity-70">
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
    <section className="relative overflow-hidden bg-[#0b0b0e] text-white">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:py-16">
        <div className="relative z-10">
          <p className="text-xs font-black uppercase text-[var(--slot4-accent-soft)]">{pagesContent.home.hero.badge}</p>
          <h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{heroTitle}</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/64">{pagesContent.home.hero.description}</p>
          <form action="/search" className="mt-8 flex max-w-xl rounded-full border border-white/10 bg-white/[0.08] p-1.5">
            <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="min-w-0 flex-1 bg-transparent px-5 text-sm font-bold text-white outline-none placeholder:text-white/40" />
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-black"><Search className="h-4 w-4" /> Search</button>
          </form>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link href={primaryRoute} className={dc.button.primary}>{pagesContent.home.hero.primaryCta.label} <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.08] px-8 py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5">Pitch an article</Link>
          </div>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              { Icon: Newspaper, label: 'Front-page rhythm' },
              { Icon: BookOpenText, label: 'Long-form clarity' },
              { Icon: Clock3, label: 'Fast daily scans' },
            ].map(({ Icon, label }) => (
              <div key={label} className="rounded-[1.15rem] border border-white/10 bg-white/[0.06] p-4">
                <Icon className="h-5 w-5 text-[var(--slot4-accent-soft)]" />
                <p className="mt-3 text-sm font-black text-white/82">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[420px]">
          <div className="absolute right-0 top-0 w-[88%] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white p-2 shadow-[0_34px_90px_rgba(0,0,0,0.42)]">
            <div className="grid aspect-[1.25/1] gap-2 bg-[#f4f4f1] p-3 sm:grid-cols-[1.2fr_0.8fr]">
              {leadPost ? (
                <Link href={postHref(primaryTask, leadPost, primaryRoute)} className="group relative overflow-hidden bg-black">
                  <img src={getEditablePostImage(leadPost)} alt={leadPost.title} className="h-full w-full object-cover opacity-78 transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(0,0,0,0.86))]" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-[10px] font-black uppercase text-[var(--slot4-accent-soft)]">{getEditableCategory(leadPost)}</p>
                    <h2 className="mt-2 line-clamp-3 text-2xl font-black leading-tight">{leadPost.title}</h2>
                  </div>
                </Link>
              ) : (
                <div className="relative overflow-hidden bg-black" />
              )}
              <div className="grid gap-2">
                {sidePosts.map((post) => (
                  <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group grid grid-cols-[76px_minmax(0,1fr)] gap-3 border border-black/10 bg-white p-3">
                    <div className="relative overflow-hidden bg-black/5">
                      <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase text-[var(--slot4-accent-fill)]">{getEditableCategory(post)}</p>
                      <p className="mt-2 line-clamp-3 text-sm font-black leading-tight text-black">{post.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-0 w-[58%] rounded-[1.35rem] border border-white/10 bg-[#17171d] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.34)]">
            <Sparkles className="h-5 w-5 text-[var(--slot4-accent-soft)]" />
            <p className="mt-8 text-xs font-black uppercase text-white/42">Publication note</p>
            <h3 className="mt-3 text-2xl font-black leading-tight">{globalContent.site.name} is tuned for articles.</h3>
          </div>
          <div className="absolute bottom-16 right-8 rounded-full bg-[var(--slot4-accent-soft)] px-5 py-3 text-sm font-black text-black">
            Articles first
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
    <section className="relative border-t border-black/[0.06] bg-white">
      <div className="relative mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase text-[var(--slot4-accent-fill)]">Current edition</p>
            <h2 className={dc.type.sectionTitle}>Trending articles</h2>
          </div>
          <Link href={primaryRoute} className="hidden rounded-full bg-black px-5 py-3 text-sm font-black text-white sm:inline-flex">See all</Link>
        </div>
        <Rail className="mt-8">
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
    <section className="relative overflow-hidden bg-[#f4f4f1]">
      <div className="relative mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase text-[var(--slot4-accent-fill)]">Editor selection</p>
          <h2 className={dc.type.sectionTitle}>Must-read {taskLabel(primaryTask).toLowerCase()}</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
    <section className="bg-white">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-black uppercase text-[var(--slot4-accent-fill)]">Archive flow</p>
          <h2 className={dc.type.sectionTitle}>All the topics. One reading path.</h2>
          <p className={`mt-4 max-w-md text-base leading-relaxed ${pal.mutedText}`}>Find your next article faster. Browse clean sections, strong cards, and useful summaries without losing the publication rhythm.</p>
          <form action="/search" className="mt-8 flex max-w-md rounded-full border border-black/[0.08] bg-white p-2 shadow-sm">
            <input name="q" placeholder="Search posts" className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none" />
            <button className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white"><Search className="h-4 w-4" /> Search</button>
          </form>
        </div>
        <div className="grid gap-4">
          {picks.map((post, index) => <WideStoryCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
        </div>
      </div>
      {feature ? (
        <div className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:px-8">
          <Link href={postHref(primaryTask, feature, primaryRoute)} className="group relative min-h-[340px] overflow-hidden rounded-[1.25rem] bg-black text-white shadow-[0_14px_44px_rgba(0,0,0,0.14)]">
            <img src={getEditablePostImage(feature)} alt={feature.title} className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.74))]" />
            <div className="relative z-10 flex min-h-[340px] flex-col justify-end p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/75">Featured stream</p>
              <h3 className="mt-4 max-w-2xl text-3xl font-black leading-tight sm:text-4xl">{feature.title}</h3>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/78">{getExcerpt(feature, 180)}</p>
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
    <section id="get-app" className="relative scroll-mt-24 overflow-hidden bg-[#0b0b0e] text-white">
      <div className="relative mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase text-[var(--slot4-accent-soft)]">Article desk</p>
          <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Have a story readers should see?</h2>
          <p className="mt-5 text-lg text-white/62">Send a pitch, correction, interview idea, or reader note to the publication team.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4"><Link href="/contact" className={dc.button.primary}>Pitch an article</Link></div>
        </div>
      </div>
    </section>
  )
}
