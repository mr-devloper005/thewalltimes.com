import Link from 'next/link'
import { ArrowRight, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  title = 'Nothing published here yet',
  description = 'Fresh posts will appear here automatically once this section has published content.',
  actionLabel = 'Back to home',
  actionHref = '/',
  className,
}: EmptyStateProps) {
  return (
    <section className={cn('relative border border-[#c41e3a]/15 bg-[#14141a] p-8 text-center', className)}>
      <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-[#c41e3a]/30" />
      <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-[#c41e3a]/30" />
      <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-[#c41e3a]/30" />
      <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-[#c41e3a]/30" />
      <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#c41e3a]/20 bg-[#c41e3a]/5">
        <SearchX className="h-6 w-6 text-[#c41e3a]" />
      </div>
      <h2 className="mt-5 text-2xl font-bold">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#8a7f75]">{description}</p>
      <Link href={actionHref} className="mt-6 inline-flex items-center gap-2 border border-[#c41e3a]/20 bg-[#c41e3a]/5 px-5 py-3 text-sm font-bold text-[#c41e3a] transition hover:bg-[#c41e3a]/10">
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}

export function TaskEmptyState({ taskLabel = 'posts', className }: { taskLabel?: string; className?: string }) {
  return (
    <EmptyState
      className={className}
      title={`No ${taskLabel} available yet`}
      description={`Published ${taskLabel} from the master panel will appear here automatically. The page layout stays ready even when the feed is empty.`}
      actionLabel="Explore the site"
      actionHref="/"
    />
  )
}

export function ContactSuccessState({ className }: { className?: string }) {
  return (
    <EmptyState
      className={className}
      title="Message received"
      description="Thanks for reaching out. Your request has been saved and routed through the contact workflow."
      actionLabel="Return home"
      actionHref="/"
    />
  )
}
