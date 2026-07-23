import { useState, useEffect, useRef } from 'react'
import { NEWS_FEEDS } from '../../data/newsFeeds'

export { NEWS_FEEDS }

const REFRESH_MS = 900_000 // 15 minutes

async function fetchFeed(feedUrl) {
  const proxy = `https://corsproxy.io/?url=${encodeURIComponent(feedUrl)}`
  const res = await fetch(proxy)
  if (!res.ok) throw new Error('Feed fetch failed')
  const text = await res.text()
  const parser = new DOMParser()
  const xml = parser.parseFromString(text, 'text/xml')
  const items = [...xml.querySelectorAll('item')].slice(0, 5).map(item => ({
    title: item.querySelector('title')?.textContent?.trim() || '',
    link: item.querySelector('link')?.textContent?.trim() || '',
    pubDate: item.querySelector('pubDate')?.textContent?.trim() || '',
  }))
  return items
}

function formatDate(pubDate) {
  if (!pubDate) return ''
  try {
    const d = new Date(pubDate)
    return d.toLocaleDateString('en-AU', { day: '2-digit', month: 'short' })
  } catch {
    return ''
  }
}

export function NewsWidget({ widget }) {
  const config = widget?.config || {}
  const feedUrl = config.feedUrl || NEWS_FEEDS[0].url
  const feedName = config.feedName || NEWS_FEEDS[0].name

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const intervalRef = useRef(null)

  async function load() {
    try {
      setError(false)
      const data = await fetchFeed(feedUrl)
      setItems(data)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    intervalRef.current = setInterval(load, REFRESH_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [feedUrl])

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 pt-3 pb-1 flex items-center gap-1.5">
        <span className="text-xs font-semibold text-text">📰</span>
        <span className="text-xs font-semibold text-text">{feedName}</span>
      </div>

      {loading && (
        <div className="flex-1 flex items-center justify-center text-muted text-xs">
          Loading headlines…
        </div>
      )}

      {error && !loading && (
        <div className="flex-1 flex items-center justify-center text-muted text-xs px-3 text-center">
          Headlines unavailable — check connection 📡
        </div>
      )}

      {!loading && !error && (
        <ol className="flex-1 overflow-hidden px-3 pb-2 space-y-1">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2 items-start min-w-0">
              <span className="text-[10px] font-bold text-muted/60 mt-0.5 shrink-0 w-3">
                {i + 1}
              </span>
              <div className="min-w-0">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-text hover:text-accent transition-colors line-clamp-2 leading-snug"
                >
                  {item.title}
                </a>
                {item.pubDate && (
                  <span className="text-[10px] text-muted/60">{formatDate(item.pubDate)}</span>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
