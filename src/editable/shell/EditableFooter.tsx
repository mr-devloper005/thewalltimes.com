'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const footerVars = { '--editable-footer-bg': '#08080a', '--editable-footer-text': '#e8e0d8' } as CSSProperties
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer style={footerVars} className="border-t border-[#c41e3a]/15 bg-[#08080a] text-[#e8e0d8]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
            <span className="text-sm font-bold uppercase tracking-[0.08em] text-[#c41e3a]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#8a7f75]">{globalContent.footer?.description || SITE_CONFIG.description}</p>
          <div className="mt-6 h-px bg-gradient-to-r from-[#c41e3a]/30 via-[#c41e3a]/10 to-transparent" />
        </div>

        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c41e3a]">Explore</h3>
          <div className="mt-4 grid gap-2">
            {taskLinks.map((task) => (
              <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm font-medium text-[#8a7f75] transition hover:text-[#c41e3a]">
                {task.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c41e3a]">Site</h3>
          <div className="mt-4 grid gap-2">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
              ...(session ? [['Create', '/create']] : [['Login', '/login'], ['Sign up', '/signup']]),
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-medium text-[#8a7f75] transition hover:text-[#c41e3a]">{label}</Link>
            ))}
            {session ? <button type="button" onClick={logout} className="text-left text-sm font-medium text-[#8a7f75] transition hover:text-[#c41e3a]">Logout</button> : null}
          </div>
        </div>
      </div>
      <div className="border-t border-[#c41e3a]/10 px-4 py-5">
        <div className="mx-auto flex max-w-[var(--editable-container)] items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a7f75]">© {year} {SITE_CONFIG.name}</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c41e3a]/40">{SITE_CONFIG.name}</span>
        </div>
      </div>
    </footer>
  )
}
