import type { Metadata } from 'next'
import Link from 'next/link'
import { Bookmark, PenLine, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { globalContent } from '@/editable/content/global.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: 'Create a local reader account.' })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#0b0b0e] text-white">
        <section className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-[var(--editable-container)] items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8 lg:py-14">
          <div className="rounded-[1.25rem] border border-white/10 bg-white p-6 text-black shadow-[0_18px_52px_rgba(0,0,0,0.28)] sm:p-8">
            <p className="text-xs font-black uppercase text-[var(--slot4-accent-fill)]">Create profile</p>
            <h1 className="mt-3 text-3xl font-black">Join the article desk</h1>
            <p className="mt-3 text-sm leading-7 text-black/58">Create a profile to personalize the navbar and test the reader journey.</p>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-black/60">Already have an account? <Link href="/login" className="font-black text-[var(--slot4-accent-fill)] underline-offset-4 hover:underline">Login</Link></p>
          </div>
          <div>
            <p className="text-xs font-black uppercase text-[var(--slot4-accent-soft)]">Reader membership</p>
            <h2 className="mt-5 max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">Make the publication feel like yours.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/62">
              {globalContent.site.name} is article-first: quick discovery, confident headlines, and a clean archive. Your account lets the UI respond after sign up without changing backend logic.
            </p>
            <div className="mt-9 grid max-w-2xl gap-4 sm:grid-cols-3">
              {[
                { Icon: PenLine, title: 'Pitch', body: 'Send story ideas through contact.' },
                { Icon: Search, title: 'Search', body: 'Find articles by topic or phrase.' },
                { Icon: Bookmark, title: 'Return', body: 'Keep the reading path familiar.' },
              ].map(({ Icon, title, body }) => (
                <div key={title} className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4">
                  <Icon className="h-5 w-5 text-[var(--slot4-accent-soft)]" />
                  <h3 className="mt-4 text-lg font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/58">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
