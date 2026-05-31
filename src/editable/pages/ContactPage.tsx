'use client'

import { FileText, Mail, MessageSquareText, PenLine, ShieldCheck, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function ContactPage() {
  const lanes = [
    { icon: PenLine, title: 'Article pitches', body: 'Send reported pieces, explainers, opinion drafts, interviews, and recurring column ideas.' },
    { icon: ShieldCheck, title: 'Corrections desk', body: 'Flag factual issues, source updates, broken references, or context that should be added to a story.' },
    { icon: Sparkles, title: 'Partnerships', body: 'Reach out about editorial sponsorships, newsletter swaps, interviews, and publication collaborations.' },
  ]

  return (
    <EditableSiteShell>
      <main className="bg-[#f4f4f1] text-[#0b0b0e]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase text-[var(--slot4-accent-fill)]">{pagesContent.contact.eyebrow}</p>
              <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{pagesContent.contact.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-black/62">{pagesContent.contact.description}</p>
              <div className="mt-8 grid gap-4">
                {lanes.map((lane) => (
                  <div key={lane.title} className="rounded-[1rem] border border-black/10 bg-white p-5">
                    <lane.icon className="h-5 w-5 text-[var(--slot4-accent-fill)]" />
                    <h2 className="mt-4 text-xl font-black">{lane.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-black/60">{lane.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-black/10 bg-white p-6 shadow-[0_16px_44px_rgba(0,0,0,0.07)] sm:p-8">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { Icon: FileText, label: 'Story idea' },
                  { Icon: MessageSquareText, label: 'Reader note' },
                  { Icon: Mail, label: 'Desk reply' },
                ].map(({ Icon, label }) => (
                  <div key={label} className="rounded-[1.15rem] bg-[#f4f4f1] p-4">
                    <Icon className="h-5 w-5 text-[var(--slot4-accent-fill)]" />
                    <p className="mt-3 text-sm font-black">{label}</p>
                  </div>
                ))}
              </div>
              <h2 className="mt-8 text-3xl font-black">{pagesContent.contact.formTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-black/58">Include the article topic, deadline, link, or correction context so the editorial team can route it cleanly.</p>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
