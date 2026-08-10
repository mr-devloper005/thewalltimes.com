'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navVars = { '--editable-nav-bg': '#0a0a0c', '--editable-nav-text': '#e8e0d8', '--editable-nav-active': '#c41e3a', '--editable-nav-active-text': '#fff', '--editable-cta-bg': '#c41e3a', '--editable-cta-text': '#fff', '--editable-search-bg': '#14141a', '--editable-border': 'rgba(196,30,58,0.15)', '--editable-container': '1440px' } as CSSProperties
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-[#c41e3a]/20 bg-[#0a0a0c]/95 text-[#e8e0d8] backdrop-blur-2xl">
      <nav className="mx-auto flex min-h-[72px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
          <span className="hidden min-w-0 sm:block">
            <span className="block max-w-[180px] truncate text-sm font-bold tracking-[0.08em] uppercase text-[#c41e3a]">{SITE_CONFIG.name}</span>
            <span className="block max-w-[180px] truncate text-[10px] font-medium uppercase tracking-[0.22em] text-[#8a7f75]">{globalContent.nav?.tagline || SITE_CONFIG.tagline}</span>
          </span>
        </Link>

        <form action="/search" className="mx-auto hidden min-w-0 flex-1 justify-center md:flex">
          <label className="relative flex w-full max-w-md items-center rounded-sm border border-[#c41e3a]/15 bg-[#14141a] px-4 py-2.5">
            <Search className="h-4 w-4 text-[#c41e3a]/50" />
            <input name="q" type="search" placeholder="Search articles..." className="min-w-0 flex-1 bg-transparent px-3 text-sm font-medium text-[#e8e0d8] outline-none placeholder:text-[#8a7f75]" />
          </label>
        </form>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.slice(0, 4).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`rounded-sm px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition ${active ? 'border border-[#c41e3a]/30 bg-[#c41e3a]/10 text-[#c41e3a]' : 'text-[#8a7f75] hover:text-[#c41e3a]'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <Link href="/create" className="hidden items-center gap-2 rounded-sm border border-[#c41e3a]/30 bg-[#c41e3a]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#c41e3a] sm:inline-flex"><PlusCircle className="h-3.5 w-3.5" /> Create</Link>
              <button type="button" onClick={logout} className="hidden items-center gap-2 rounded-sm px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#8a7f75] hover:text-[#c41e3a] sm:inline-flex">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden items-center gap-2 rounded-sm px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#8a7f75] hover:text-[#c41e3a] sm:inline-flex"><LogIn className="h-3.5 w-3.5" /> Login</Link>
              <Link href="/signup" className="hidden items-center gap-2 rounded-sm border border-[#c41e3a]/40 bg-[#c41e3a]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#c41e3a] sm:inline-flex"><UserPlus className="h-3.5 w-3.5" /> Sign up</Link>
            </>
          )}
          <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-sm border border-[#c41e3a]/20 bg-[#14141a] p-2 text-[#c41e3a] lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[#c41e3a]/15 bg-[#0a0a0c] px-4 py-4 lg:hidden">
          <form action="/search" className="mb-4 flex rounded-sm border border-[#c41e3a]/15 bg-[#14141a] px-3 py-2">
            <Search className="mt-1 h-4 w-4 text-[#c41e3a]/50" />
            <input name="q" type="search" placeholder="Search articles..." className="min-w-0 flex-1 bg-transparent px-3 text-sm text-[#e8e0d8] outline-none" />
          </form>
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-sm border border-[#c41e3a]/15 bg-[#14141a] px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-[#e8e0d8] hover:border-[#c41e3a]/30 hover:text-[#c41e3a]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
