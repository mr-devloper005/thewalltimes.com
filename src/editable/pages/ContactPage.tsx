'use client'

import { FileText, Mail, MessageSquareText, PenLine, ShieldCheck, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function ContactPage() {
  const lanes = [
    { icon: PenLine, title: 'Article submissions', body: 'Send analysis pieces, market reports, strategic essays, interviews, and recurring column ideas.' },
    { icon: ShieldCheck, title: 'Corrections desk', body: 'Flag factual issues, source updates, broken references, or context that should be added to an article.' },
    { icon: Sparkles, title: 'Partnerships', body: 'Reach out about editorial sponsorships, newsletter collaborations, interviews, and publication partnerships.' },
  ]

  return (
    <EditableSiteShell>
      <main className="bg-[#0a0a0c] text-[#e8e0d8]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c41e3a]">{pagesContent.contact.eyebrow}</p>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{pagesContent.contact.title}</h1>
              <div className="mt-3 h-px w-32 bg-gradient-to-r from-[#c41e3a]/40 to-transparent" />
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#8a7f75]">{pagesContent.contact.description}</p>
              <div className="mt-8 grid gap-4">
                {lanes.map((lane) => (
                  <div key={lane.title} className="border border-[#c41e3a]/15 bg-[#14141a] p-5">
                    <lane.icon className="h-5 w-5 text-[#c41e3a]" />
                    <h2 className="mt-4 text-xl font-bold">{lane.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-[#8a7f75]">{lane.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#c41e3a]/15 bg-[#14141a] p-6 shadow-[0_16px_44px_rgba(0,0,0,0.4)] sm:p-8">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { Icon: FileText, label: 'Story idea' },
                  { Icon: MessageSquareText, label: 'Reader note' },
                  { Icon: Mail, label: 'Desk reply' },
                ].map(({ Icon, label }) => (
                  <div key={label} className="border border-[#c41e3a]/10 bg-[#0a0a0c] p-4">
                    <Icon className="h-5 w-5 text-[#c41e3a]" />
                    <p className="mt-3 text-sm font-bold">{label}</p>
                  </div>
                ))}
              </div>
              <h2 className="mt-8 text-3xl font-bold">{pagesContent.contact.formTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-[#8a7f75]">Include the article topic, deadline, link, or correction context so the editorial team can route it cleanly.</p>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
