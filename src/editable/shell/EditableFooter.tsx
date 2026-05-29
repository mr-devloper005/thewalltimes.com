import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight, Mail, Search } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'

export function EditableFooter() {
  const footerVars = { '--editable-footer-bg': '#0b0b0e', '--editable-footer-text': '#ffffff' } as CSSProperties
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled).slice(0, 5)
  const year = new Date().getFullYear()
  const brandName = globalContent.site.name

  return (
    <footer style={footerVars} className="border-t border-white/10 bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white">
              <img src="/favicon.png?v=20260413" alt={brandName} className="h-9 w-9 object-contain" />
            </span>
            <span>
              <span className="block text-xl font-black uppercase">{brandName}</span>
              <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-white/45">{globalContent.footer.tagline}</span>
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/62">{globalContent.footer?.description || SITE_CONFIG.description}</p>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-white/45">Explore</h3>
          <div className="mt-4 grid gap-2">
            {taskLinks.map((task) => (
              <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white">
                {task.key === 'article' ? 'Articles' : task.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-white/45">Site</h3>
          <div className="mt-4 grid gap-2">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
              ['Search', '/search'],
              ['Login', '/login'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-bold text-white/70 hover:text-white">{label}</Link>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-white/45">Reader tools</h3>
          <form action="/search" className="mt-4 flex rounded-full border border-white/10 bg-black/25 p-1">
            <input name="q" placeholder="Search articles" className="min-w-0 flex-1 bg-transparent px-3 text-sm font-bold outline-none placeholder:text-white/35" />
            <button className="rounded-full bg-white px-3 py-2 text-black" aria-label="Search articles"><Search className="h-4 w-4" /></button>
          </form>
          <Link href="/contact" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-4 py-2.5 text-sm font-black text-white">
            <Mail className="h-4 w-4" /> Pitch an article
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs font-bold text-white/45">
        © {year} {brandName}. {globalContent.footer.bottomNote}
      </div>
    </footer>
  )
}
