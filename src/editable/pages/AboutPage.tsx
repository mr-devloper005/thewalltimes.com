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
      <main className="bg-[#0a0a0c] text-[#e8e0d8]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c41e3a]">{pagesContent.about.badge}</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{pagesContent.about.title}</h1>
              <div className="mt-3 h-px w-32 bg-gradient-to-r from-[#c41e3a]/40 to-transparent" />
              <p className="mt-5 max-w-3xl text-base leading-7 text-[#8a7f75]">{pagesContent.about.description}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {stats.map((stat) => (
                <div key={stat.label} className="border border-[#c41e3a]/15 bg-[#14141a] p-5">
                  <p className="text-3xl font-bold text-[#c41e3a]">{stat.value}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a7f75]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c41e3a]/15" />
            <div className="h-2 w-2 rotate-45 border border-[#c41e3a]/30" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c41e3a]/15" />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="relative border border-[#c41e3a]/20 bg-[#08080a] p-7 text-[#e8e0d8] sm:p-8">
              <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-[#c41e3a]/30" />
              <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-[#c41e3a]/30" />
              <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-[#c41e3a]/30" />
              <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-[#c41e3a]/30" />
              <Newspaper className="h-8 w-8 text-[#c41e3a]" />
              <h2 className="mt-6 text-2xl font-bold sm:text-3xl">The front page should command attention.</h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-[#8a7f75]">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>

            <div className="grid gap-5 md:grid-cols-2">
              {pagesContent.about.values.map((value, index) => {
                const icons = [BookOpenText, Layers3, Search]
                const Icon = icons[index] || BookOpenText
                return (
                  <div key={value.title} className="border border-[#c41e3a]/15 bg-[#14141a] p-6">
                    <Icon className="h-7 w-7 text-[#c41e3a]" />
                    <h2 className="mt-6 text-xl font-bold">{value.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-[#8a7f75]">{value.description}</p>
                  </div>
                )
              })}
              <div className="border border-[#c41e3a]/15 bg-[#c41e3a]/5 p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c41e3a]">Brand source</p>
                <h2 className="mt-5 text-2xl font-bold">{globalContent.site.name}</h2>
                <p className="mt-3 text-sm leading-7 text-[#8a7f75]">The publication identity adapts to the configured brand, ensuring every page reflects the correct voice and visual system.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
