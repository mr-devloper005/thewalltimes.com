'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, Menu, Search, UserCircle2, UserPlus, LogIn, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const brandName = globalContent.site.name
  const navVars = { '--editable-nav-bg': '#0b0b0e', '--editable-nav-text': '#ffffff', '--editable-nav-active': '#8b00ff', '--editable-nav-active-text': '#ffffff', '--editable-cta-bg': '#8b00ff', '--editable-cta-text': '#ffffff', '--editable-search-bg': '#18181d', '--editable-border': 'rgba(255,255,255,0.12)', '--editable-container': '1180px' } as CSSProperties
  const navItems = useMemo(
    () => [
      { label: 'Home', href: '/' },
      ...SITE_CONFIG.tasks.filter((task) => task.enabled).slice(0, 3).map((task) => ({ label: task.key === 'article' ? 'Articles' : task.label, href: task.route })),
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    []
  )

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/92 text-[var(--editable-nav-text)] backdrop-blur-2xl">
      <nav className="mx-auto flex min-h-[76px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[var(--editable-border)] bg-white transition-transform group-hover:-rotate-2">
            <img src="/favicon.png?v=20260413" alt={brandName} className="h-9 w-9 object-contain" />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block max-w-[220px] truncate text-xl font-black uppercase">{brandName}</span>
            <span className="block max-w-[220px] truncate text-[10px] font-black uppercase opacity-55">{globalContent.nav?.tagline || SITE_CONFIG.tagline}</span>
          </span>
        </Link>

        <form action="/search" className="mx-auto hidden min-w-0 flex-1 justify-center md:flex">
          <label className="relative flex w-full max-w-xl items-center rounded-full border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-4 py-2.5 shadow-sm">
            <Search className="h-4 w-4 opacity-55" />
            <input name="q" type="search" placeholder={pagesPlaceholder()} className="min-w-0 flex-1 bg-transparent px-3 text-sm font-semibold outline-none placeholder:text-current/45" />
          </label>
        </form>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.slice(0, 6).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`rounded-full px-4 py-2 text-sm font-black transition ${active ? 'bg-[var(--editable-nav-active)] text-[var(--editable-nav-active-text)]' : 'text-white/82 hover:bg-white/[0.08] hover:text-white'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <span className="hidden max-w-[160px] items-center gap-2 truncate rounded-full border border-[var(--editable-border)] bg-white/[0.08] px-3 py-2 text-sm font-black sm:inline-flex"><UserCircle2 className="h-4 w-4 shrink-0" /> {session.name}</span>
              <button type="button" onClick={logout} className="hidden items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-black text-[var(--editable-cta-text)] shadow-sm sm:inline-flex"><LogOut className="h-4 w-4" /> Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-black text-white/82 hover:bg-white/[0.08] hover:text-white sm:inline-flex"><LogIn className="h-4 w-4" /> Login</Link>
              <Link href="/signup" className="hidden items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-black text-[var(--editable-cta-text)] shadow-sm sm:inline-flex"><UserPlus className="h-4 w-4" /> Sign up</Link>
            </>
          )}
          <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-full border border-[var(--editable-border)] bg-white/[0.10] p-2 text-white lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-4 lg:hidden">
          <form action="/search" className="mb-4 flex rounded-2xl border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-3 py-2">
            <Search className="mt-1 h-4 w-4 opacity-55" />
            <input name="q" type="search" placeholder={pagesPlaceholder()} className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" />
          </form>
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl border border-[var(--editable-border)] bg-white/[0.08] px-4 py-3 text-sm font-black text-white">
                {item.label}
              </Link>
            ))}
            {session ? (
              <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-2xl bg-[var(--editable-cta-bg)] px-4 py-3 text-left text-sm font-black text-white">Logout {session.name}</button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-2xl border border-[var(--editable-border)] bg-white/[0.08] px-4 py-3 text-sm font-black text-white">Login</Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="rounded-2xl bg-[var(--editable-cta-bg)] px-4 py-3 text-sm font-black text-white">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}

function pagesPlaceholder() {
  return 'Search articles, topics, writers...'
}
