import Link from 'next/link'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import type { SitePost, SiteFeedPagination } from '@/lib/site-connector'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { ArticleListCard, postHref } from '@/editable/cards/PostCards'

export function EditableArticleArchive({ posts, pagination, category = 'all', basePath = '/article' }: { posts: SitePost[]; pagination: SiteFeedPagination; category?: string; basePath?: string }) {
  const voice = taskPageVoices.article
  const page = pagination.page || 1
  const pageHref = (nextPage: number) => `${basePath}?${new URLSearchParams({ ...(category && category !== 'all' ? { category } : {}), page: String(nextPage) }).toString()}`
  return (
    <main className={dc.shell.page}>
      <section className={`${dc.shell.section} pt-12 sm:pt-16 lg:pt-20`}>
        <div className="border border-[#c41e3a]/20 bg-[#08080a] p-7 text-[#e8e0d8] shadow-[0_24px_80px_rgba(0,0,0,0.5)] sm:p-10 lg:p-14">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#c41e3a]">{voice.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{voice.headline}</h1>
          <div className="mt-3 h-px w-32 bg-gradient-to-r from-[#c41e3a]/40 to-transparent" />
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#8a7f75] sm:text-lg">{voice.description}</p>
          <form action={basePath} className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <select name="category" defaultValue={category || 'all'} className="min-w-0 flex-1 border border-[#c41e3a]/15 bg-[#14141a] px-5 py-3 text-sm font-medium text-[#e8e0d8] outline-none">
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
            <button className="border border-[#c41e3a] bg-[#c41e3a] px-6 py-3 text-sm font-bold text-white">Filter</button>
          </form>
        </div>
      </section>

      <section className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        {posts.length ? (
          <div className="grid gap-5">
            {posts.map((post, index) => <ArticleListCard key={post.id} post={post} href={postHref('article', post, basePath)} index={index + (page - 1) * pagination.limit} />)}
          </div>
        ) : (
          <div className="border border-dashed border-[#c41e3a]/15 bg-[#14141a]/60 p-8 text-center">
            <h2 className="text-3xl font-bold">No articles found</h2>
            <p className="mt-3 text-sm leading-7 text-[#8a7f75]">Try another category or return to all articles.</p>
          </div>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {pagination.hasPrevPage ? <Link href={pageHref(page - 1)} className="border border-[#c41e3a]/20 bg-[#14141a] px-5 py-3 text-sm font-bold text-[#e8e0d8]">Previous</Link> : null}
          <span className="border border-[#c41e3a]/30 bg-[#c41e3a]/10 px-5 py-3 text-sm font-bold text-[#c41e3a]">Page {page} of {pagination.totalPages || 1}</span>
          {pagination.hasNextPage ? <Link href={pageHref(page + 1)} className="border border-[#c41e3a]/20 bg-[#14141a] px-5 py-3 text-sm font-bold text-[#e8e0d8]">Next</Link> : null}
        </div>
      </section>
    </main>
  )
}

export function EditableArticleDetailShell({ slug, post }: { slug: string; post: SitePost | null }) {
  const voice = taskPageVoices.article
  return (
    <main className={dc.shell.page}>
      <section className={`${dc.shell.section} pt-10 sm:pt-14 lg:pt-16`}>
        <div className="grid gap-6 border border-[#c41e3a]/15 bg-[#14141a] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] lg:grid-cols-[minmax(0,1fr)_320px] lg:p-10">
          <div className="min-w-0">
            <Link href="/article" className="inline-flex items-center gap-2 border border-[#c41e3a]/20 bg-[#c41e3a]/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#c41e3a]"><ChevronLeft className="h-4 w-4" /> Articles</Link>
            <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.24em] text-[#c41e3a]">{voice.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[0.98] sm:text-5xl lg:text-6xl">{post?.title || pagesContent.detailPages.article.fallbackTitle}</h1>
            <div className="mt-3 h-px w-32 bg-gradient-to-r from-[#c41e3a]/40 to-transparent" />
          </div>
          <aside className="min-w-0 border border-[#c41e3a]/15 bg-[#08080a] p-6 text-[#e8e0d8]">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#c41e3a]">Reading note</p>
            <p className="mt-4 text-sm leading-7 text-[#8a7f75]">{voice.secondaryNote}</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 border border-[#c41e3a]/30 bg-[#c41e3a]/10 px-5 py-3 text-sm font-bold text-[#c41e3a]">Contact <ArrowRight className="h-4 w-4" /></Link>
          </aside>
        </div>
      </section>
      <section className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
        <div className="border border-[#c41e3a]/15 bg-[#14141a] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] sm:p-8 lg:p-10">
          <p className="text-sm leading-8 text-[#8a7f75]">{(post?.summary || `Article detail content for ${slug} will render through the editable detail page.`).replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()}</p>
        </div>
      </section>
    </main>
  )
}
