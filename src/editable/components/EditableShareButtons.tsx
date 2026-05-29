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
    <div className="mt-5 inline-flex overflow-hidden rounded-full border border-black/15 bg-white shadow-sm">
      <span className="border-r border-black/10 px-4 py-2 text-[10px] font-black uppercase text-black/55">Share</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on Facebook"
        className="flex h-9 w-9 items-center justify-center border-r border-black/10 text-black hover:bg-black hover:text-white"
      >
        <Facebook className="h-4 w-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on X"
        className="flex h-9 w-9 items-center justify-center border-r border-black/10 text-xs font-black text-black hover:bg-black hover:text-white"
      >
        X
      </a>
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${title}\n\n${shareUrl}`)}`}
        aria-label="Share by email"
        className="flex h-9 w-9 items-center justify-center border-r border-black/10 text-black hover:bg-black hover:text-white"
      >
        <Mail className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className="flex h-9 w-9 items-center justify-center text-black hover:bg-black hover:text-white"
      >
        <Link2 className="h-4 w-4" />
      </button>
    </div>
  )
}
