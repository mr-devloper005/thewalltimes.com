'use client'

import { Facebook, Link2, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'

export function EditableShareButtons({ title }: { title: string }) {
  const [shareUrl, setShareUrl] = useState('')
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(shareUrl)

  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  const copyLink = async () => {
    const url = shareUrl || window.location.href
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      window.prompt('Copy this link', url)
    }
  }

  return (
    <div className="mt-5 inline-flex overflow-hidden border border-[#c41e3a]/20 bg-[#14141a]">
      <span className="border-r border-[#c41e3a]/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#c41e3a]">Share</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on Facebook"
        className="flex h-9 w-9 items-center justify-center border-r border-[#c41e3a]/15 text-[#8a7f75] hover:bg-[#c41e3a]/10 hover:text-[#c41e3a]"
      >
        <Facebook className="h-4 w-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on X"
        className="flex h-9 w-9 items-center justify-center border-r border-[#c41e3a]/15 text-xs font-bold text-[#8a7f75] hover:bg-[#c41e3a]/10 hover:text-[#c41e3a]"
      >
        X
      </a>
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${title}\n\n${shareUrl}`)}`}
        aria-label="Share by email"
        className="flex h-9 w-9 items-center justify-center border-r border-[#c41e3a]/15 text-[#8a7f75] hover:bg-[#c41e3a]/10 hover:text-[#c41e3a]"
      >
        <Mail className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className="flex h-9 w-9 items-center justify-center text-[#8a7f75] hover:bg-[#c41e3a]/10 hover:text-[#c41e3a]"
      >
        <Link2 className="h-4 w-4" />
      </button>
    </div>
  )
}
