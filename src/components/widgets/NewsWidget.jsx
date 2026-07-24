import { useState, useEffect, useRef } from 'react'
import { NEWS_FEEDS } from '../../data/newsFeeds'

export { NEWS_FEEDS }

const REFRESH_MS = 900_000

async function fetchFeed(feedUrl) {
  const proxy = `https://corsproxy.io/?url=${encodeURIComponent(feedUrl)}`
  const res = await fetch(proxy)
  if (!res.ok) throw new Error('Feed fetch failed')
  const text = await res.text()
  const parser = new DOMParser()
  const xml = parser.parseFromString(text, 'text/xml')
  return [...xml.querySelectorAll('item')].slice(0, 5).map(item => ({
    title: item.querySelector('title')?.textContent?.trim() || '',
    link:  item.querySelector('link')?.textContent?.trim() || '',
    pubDate: item.querySelector('pubDate')?.textContent?.trim() || '',
  }))
}

function formatDate(pubDate) {
  if (!pubDate) return ''
  try {
    return new Date(pubDate).toLocaleDateString('en-AU', { day: '2-digit', month: 'short' })
  } catch { return '' }
}

export function NewsWidget({ widget }) {
  const config   = widget?.config || {}
  const feedUrl  = config.feedUrl  || NEWS_FEEDS[0].url
  const feedName = config.feedName || NEWS_FEEDS[0].name

  const [items, setItems]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(false)
  const intervalRef = useRef(null)

  async function load() {
    try {
      setError(false)
      setItems(await fetchFeed(feedUrl))
    } catch { setError(true) }
    finally { setLoading(false) }
  }

  useEffect(() => {
    load()
    intervalRef.current = setInterval(load, REFRESH_MS)
    return () => clearInterval(intervalRef.current)
  }, [feedUrl])

  return (
    /* Newspaper container */
    <div
      className="flex flex-col h-full overflow-hidden rounded-2xl"
      style={{
        background: 'linear-gradient(180deg, #fdf8ee 0%, #faf4e4 100%)',
        fontFamily: 'Georgia, "Times New Roman", serif',
      }}
    >
      {/* Masthead */}
      <div className="shrink-0 border-b-2 border-gray-800 px-3 pt-2 pb-1">
        <div className="text-[10px] text-gray-500 text-center tracking-widest uppercase border-b border-gray-400 pb-0.5 mb-0.5">
          {new Date().toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <div className="text-center">
          <span
            className="text-base font-black text-gray-900 tracking-tight leading-none"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}
          >
            {feedName}
          </span>
        </div>
        <div className="text-[9px] text-gray-500 text-center tracking-widest uppercase mt-0.5">
          Latest Headlines
        </div>
      </div>

      {loading && (
        <div className="flex-1 flex items-center justify-center text-gray-500 text-xs" style={{ fontFamily: 'Georgia, serif' }}>
          Fetching the latest…
        </div>
      )}
      {error && !loading && (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-xs px-3 text-center">
          Edition unavailable — check connection
        </div>
      )}

      {!loading && !error && (
        <ol className="flex-1 overflow-hidden px-3 py-1.5 divide-y divide-gray-300/60">
          {items.map((item, i) => (
            <li key={i} className="py-1 flex gap-2 items-start min-w-0">
              <span
                className="text-[10px] font-black text-gray-400 mt-0.5 shrink-0 w-4"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {i + 1}.
              </span>
              <div className="min-w-0">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-gray-900 hover:text-blue-800 transition-colors line-clamp-2 leading-snug font-semibold"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {item.title}
                </a>
                {item.pubDate && (
                  <span className="text-[9px] text-gray-400 italic">{formatDate(item.pubDate)}</span>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
