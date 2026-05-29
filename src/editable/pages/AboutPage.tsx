import { BookOpenText, Layers3, Newspaper, Search } from 'lucide-react'
import { globalContent } from '@/editable/content/global.content'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  const stats = [
    { label: 'Editorial lanes', value: '06' },
    { label: 'Reader-first pages', value: 'All' },
    { label: 'Archive focus', value: '24/7' },
  ]

  return (
    <EditableSiteShell>
      <main className="bg-[#f4f4f1] text-[#0b0b0e]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase text-[var(--slot4-accent-fill)]">{pagesContent.about.badge}</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{pagesContent.about.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-black/62">{pagesContent.about.description}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-[1rem] border border-black/10 bg-white p-5">
                  <p className="text-3xl font-black text-[var(--slot4-accent-fill)]">{stat.value}</p>
                  <p className="mt-2 text-xs font-black uppercase text-black/45">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-[1.25rem] border border-black/10 bg-[#0b0b0e] p-7 text-white sm:p-8">
              <Newspaper className="h-8 w-8 text-[var(--slot4-accent-soft)]" />
              <h2 className="mt-6 text-2xl font-black sm:text-3xl">The front page should feel alive.</h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-white/64">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>

            <div className="grid gap-5 md:grid-cols-2">
              {pagesContent.about.values.map((value, index) => {
                const icons = [BookOpenText, Layers3, Search]
                const Icon = icons[index] || BookOpenText
                return (
                  <div key={value.title} className="rounded-[1.1rem] border border-black/10 bg-white p-6 shadow-[0_12px_32px_rgba(0,0,0,0.05)]">
                    <Icon className="h-7 w-7 text-[var(--slot4-accent-fill)]" />
                    <h2 className="mt-6 text-xl font-black">{value.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-black/60">{value.description}</p>
                  </div>
                )
              })}
              <div className="rounded-[1.1rem] border border-black/10 bg-[var(--slot4-accent-soft)] p-6">
                <p className="text-xs font-black uppercase text-black/50">Brand source</p>
                <h2 className="mt-5 text-2xl font-black">{globalContent.site.name}</h2>
                <p className="mt-3 text-sm leading-7 text-black/62">The visible brand is read from the editable env-aware brand config, so the UI can follow environment changes without hardcoded page copy.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
