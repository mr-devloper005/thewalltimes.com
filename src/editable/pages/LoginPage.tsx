import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Clock3, ShieldCheck } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { globalContent } from '@/editable/content/global.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: 'Sign in to your reader profile.' })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#f4f4f1] text-[#0b0b0e]">
        <section className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-[var(--editable-container)] items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.88fr] lg:px-8 lg:py-14">
          <div>
            <p className="text-xs font-black uppercase text-[var(--slot4-accent-fill)]">Reader access</p>
            <h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">Pick up where your reading left off.</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-black/62">
              Sign in to your reader profile for {globalContent.site.name}. Your session updates the navbar instantly so the experience feels personal while staying lightweight for this build.
            </p>
            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                { Icon: BookOpen, label: 'Saved reading flow' },
                { Icon: Clock3, label: 'Fast local access' },
                { Icon: ShieldCheck, label: 'No backend changes' },
              ].map(({ Icon, label }) => (
                <div key={label} className="rounded-[1.25rem] border border-black/10 bg-white p-4">
                  <Icon className="h-5 w-5 text-[var(--slot4-accent-fill)]" />
                  <p className="mt-3 text-sm font-black">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.25rem] border border-black/10 bg-white p-6 shadow-[0_16px_44px_rgba(0,0,0,0.08)] sm:p-8">
            <p className="text-xs font-black uppercase text-black/45">Member login</p>
            <h2 className="mt-3 text-3xl font-black">Enter the newsroom</h2>
            <p className="mt-3 text-sm leading-7 text-black/58">Use the account created on this browser to continue into the article experience.</p>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm text-black/60">New reader? <Link href="/signup" className="font-black text-[var(--slot4-accent-fill)] underline-offset-4 hover:underline">Create an account</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
