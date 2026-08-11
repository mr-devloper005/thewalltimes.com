import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight, Bookmark, BriefcaseBusiness, Building2, Camera, Download, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { globalContent } from '@/editable/content/global.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const image = asText(content.image) || asText(content.featuredImage) || asText(content.thumbnail)
  const logo = asText(content.logo)
  return [...media, ...images, ...(isUrl(image) ? [image] : []), ...(isUrl(logo) ? [logo] : [])].filter(Boolean).slice(0, 8)
}

const placeholder = '/placeholder.svg?height=900&width=1200'
const getImage = (post: SitePost) => getImages(post)[0] || placeholder
const getCategory = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const stripHtml = (value: string) => value.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const getSummary = (post: SitePost) => stripHtml(post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || asText(getContent(post).body))
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; promise: string; badge: string }> = {
  article: { icon: FileText, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Readable editorial cards with room for headlines, images, and excerpts.', badge: 'Read' },
  listing: { icon: Building2, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Reference cards support article context with credibility and source details.', badge: 'Source' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Brief cards prioritize urgent article updates and quick summary scanning.', badge: 'Brief' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3', promise: 'Photo essay cards lead with visuals and compact article captions.', badge: 'Essay' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', promise: 'Saved-read cards stay mostly text-based so references scan quickly.', badge: 'Saved' },
  pdf: { icon: Download, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Report cards surface source context, download intent, and article relevance.', badge: 'Report' },
  profile: { icon: UserRound, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-4', promise: 'Author cards focus on identity, byline context, and direct discovery.', badge: 'Writer' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = { '--archive-bg': '#0a0a0c', '--archive-text': '#e8e0d8', '--archive-surface': '#14141a', '--archive-accent': '#c41e3a' } as CSSProperties
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[#0a0a0c] text-[#e8e0d8]">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.72fr] lg:px-8 lg:py-14">
          <div className="border border-[#c41e3a]/20 bg-[#08080a] p-6 text-[#e8e0d8] shadow-[0_18px_48px_rgba(0,0,0,0.4)] sm:p-8">
            <div className="inline-flex items-center gap-2 border border-[#c41e3a]/30 bg-[#c41e3a]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#c41e3a]"><Icon className="h-4 w-4" /> {label}</div>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">{voice?.headline || `Browse ${label}`}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#8a7f75]">{voice?.description || globalContent.footer.description}</p>
            <div className="mt-5 border border-[#c41e3a]/10 bg-[#14141a] p-4 text-sm font-medium leading-6 text-[#8a7f75]">{deck.promise}</div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={basePath} className="border border-[#c41e3a] bg-[#c41e3a] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#c41e3a]/90">Browse all</Link>
              <Link href="/search" className="border border-[#c41e3a]/20 bg-[#c41e3a]/5 px-5 py-2.5 text-sm font-bold text-[#c41e3a] transition hover:bg-[#c41e3a]/10">Search articles</Link>
            </div>
          </div>

          <form action={basePath} className="self-end border border-[#c41e3a]/15 bg-[#14141a] p-5">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c41e3a]"><Filter className="h-4 w-4" /> Filter</div>
            <select name="category" defaultValue={category} className="mt-4 h-12 w-full border border-[#c41e3a]/15 bg-[#0a0a0c] px-4 text-sm font-medium text-[#e8e0d8] outline-none">
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
            <button className="mt-3 h-12 w-full border border-[#c41e3a] bg-[#c41e3a] text-sm font-bold text-white transition hover:bg-[#c41e3a]/90">Apply</button>
            <p className="mt-3 text-xs font-medium text-[#8a7f75]">Showing: {categoryLabel}</p>
          </form>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 pb-14 sm:px-6 lg:px-8">
          {posts.length ? (
            <div className={deck.archiveClass}>
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="border border-dashed border-[#c41e3a]/15 bg-[#14141a]/60 p-10 text-center">
              <Search className="mx-auto h-8 w-8 text-[#c41e3a]/40" />
              <h2 className="mt-4 text-3xl font-bold">No posts found</h2>
              <p className="mt-2 text-sm text-[#8a7f75]">Try another category or refresh this page after publishing new content.</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="border border-[#c41e3a]/20 bg-[#14141a] px-5 py-3 text-sm font-bold text-[#e8e0d8] transition hover:border-[#c41e3a]/40">Previous</Link> : null}
            <span className="border border-[#c41e3a]/30 bg-[#c41e3a]/10 px-5 py-3 text-sm font-bold text-[#c41e3a]">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="border border-[#c41e3a]/20 bg-[#14141a] px-5 py-3 text-sm font-bold text-[#e8e0d8] transition hover:border-[#c41e3a]/40">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  const category = getCategory(post, 'Article')
  return (
    <Link href={href} className="group overflow-hidden border border-[#c41e3a]/15 bg-[#14141a] transition hover:-translate-y-1 hover:border-[#c41e3a]/30 hover:shadow-[0_18px_55px_rgba(196,30,58,0.1)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#1a1a20]">
        <img src={image} alt="" className="h-full w-full object-cover opacity-55 transition duration-500 group-hover:scale-105 group-hover:opacity-70" />
        <span className="absolute left-3 top-3 border border-[#c41e3a]/30 bg-[#0a0a0c]/80 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#c41e3a]">{category}</span>
      </div>
      <div className="p-5">
        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#c41e3a]">Story {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-2 text-lg font-bold leading-tight text-[#e8e0d8]">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#8a7f75]">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const logo = getImages(post)[0]
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const website = getField(post, ['website', 'url'])
  return (
    <Link href={href} className="group grid gap-5 border border-[#c41e3a]/15 bg-[#14141a] p-5 transition hover:-translate-y-1 hover:border-[#c41e3a]/30 hover:shadow-[0_18px_55px_rgba(196,30,58,0.1)] sm:grid-cols-[120px_1fr]">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden border border-[#c41e3a]/15 bg-[#0a0a0c]">
        {logo ? <img src={logo} alt="" className="h-full w-full object-cover opacity-70" /> : <BriefcaseBusiness className="h-10 w-10 text-[#c41e3a]/30" />}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <span className="border border-[#c41e3a]/30 bg-[#c41e3a]/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#c41e3a]">Directory</span>
          {location ? <span className="inline-flex items-center gap-1 border border-[#c41e3a]/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#8a7f75]"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
        <h2 className="mt-4 text-2xl font-bold leading-tight text-[#e8e0d8]">{post.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#8a7f75]">{getSummary(post)}</p>
        <div className="mt-4 grid gap-2 text-xs font-medium text-[#8a7f75] sm:grid-cols-2">
          {phone ? <span>Phone: {phone}</span> : null}
          {website ? <span>Website available</span> : null}
        </div>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'type', 'availability'])
  return (
    <Link href={href} className="group overflow-hidden border border-[#c41e3a]/15 bg-[#14141a] transition hover:-translate-y-1 hover:border-[#c41e3a]/30 hover:shadow-[0_18px_55px_rgba(196,30,58,0.1)]">
      <div className="grid min-h-64 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative bg-[#08080a] p-5 text-[#e8e0d8]">
          <span className="border border-[#c41e3a]/30 bg-[#c41e3a]/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#c41e3a]">Classified</span>
          <h2 className="mt-10 text-3xl font-bold leading-[1]">{price || 'Open offer'}</h2>
          <p className="mt-4 text-sm font-medium text-[#8a7f75]">{location || condition || 'Details inside'}</p>
          {image ? <img src={image} alt="" className="absolute bottom-4 right-4 h-20 w-20 object-cover opacity-50" /> : null}
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold leading-tight text-[#e8e0d8]">{post.title}</h2>
          <p className="mt-4 line-clamp-4 text-sm leading-6 text-[#8a7f75]">{getSummary(post)}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#c41e3a]">View listing <ArrowRight className="h-4 w-4" /></p>
        </div>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  return (
    <Link href={href} className="group mb-5 block break-inside-avoid overflow-hidden border border-[#c41e3a]/15 bg-[#14141a] transition hover:-translate-y-1 hover:border-[#c41e3a]/30 hover:shadow-[0_18px_55px_rgba(196,30,58,0.1)]">
      <div className={index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
        <img src={image} alt="" className="h-full w-full object-cover opacity-55 transition duration-500 group-hover:scale-105 group-hover:opacity-70" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 border border-[#c41e3a]/15 bg-[#0a0a0c] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#c41e3a]"><ImageIcon className="h-3 w-3" /> Visual</div>
        <h2 className="mt-4 line-clamp-3 text-xl font-bold leading-tight text-[#e8e0d8]">{post.title}</h2>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block border border-[#c41e3a]/15 bg-[#14141a] p-6 transition hover:-translate-y-1 hover:border-[#c41e3a]/30 hover:shadow-[0_18px_55px_rgba(196,30,58,0.1)]">
      <div className="flex items-center justify-between gap-3">
        <span className="border border-[#c41e3a]/20 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#c41e3a]">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5 text-[#c41e3a]/40" />
      </div>
      <h2 className="mt-6 text-2xl font-bold leading-tight text-[#e8e0d8]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 text-[#8a7f75]">{getSummary(post)}</p>
      {website ? <p className="mt-5 truncate text-xs font-bold uppercase tracking-[0.16em] text-[#c41e3a]/50">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const category = getCategory(post, 'PDF')
  return (
    <Link href={href} className="group border border-[#c41e3a]/15 bg-[#14141a] p-6 transition hover:-translate-y-1 hover:border-[#c41e3a]/30 hover:shadow-[0_18px_55px_rgba(196,30,58,0.1)]">
      <div className="flex items-start justify-between gap-4">
        <div className="border border-[#c41e3a]/20 bg-[#c41e3a]/5 p-4"><FileText className="h-8 w-8 text-[#c41e3a]" /></div>
        <span className="border border-[#c41e3a]/15 bg-[#0a0a0c] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#c41e3a]">{category}</span>
      </div>
      <h2 className="mt-6 text-2xl font-bold leading-tight text-[#e8e0d8]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 text-[#8a7f75]">{getSummary(post)}</p>
      <p className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#c41e3a]">Open document <Download className="h-4 w-4" /></p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const avatar = getImages(post)[0]
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group border border-[#c41e3a]/15 bg-[#14141a] p-6 text-center transition hover:-translate-y-1 hover:border-[#c41e3a]/30 hover:shadow-[0_18px_55px_rgba(196,30,58,0.1)]">
      <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden border border-[#c41e3a]/15 bg-[#0a0a0c]">
        {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover opacity-70" /> : <UserRound className="h-10 w-10 text-[#c41e3a]/30" />}
      </div>
      <h2 className="mt-5 text-xl font-bold leading-tight text-[#e8e0d8]">{post.title}</h2>
      {role ? <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-[#c41e3a]">{role}</p> : null}
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#8a7f75]">{getSummary(post)}</p>
    </Link>
  )
}
