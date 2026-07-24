import { useState, useRef, useMemo, useEffect } from 'react'
import { useDashboardStore } from '../../store/dashboardStore'

export function SearchBar() {
  const { state } = useDashboardStore()
  const [query, setQuery]   = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef    = useRef(null)
  const containerRef = useRef(null)

  // Collect all platforms across all tabs (deduplicated by id+url)
  const allPlatforms = useMemo(() => {
    const seen = new Set()
    const out = []
    for (const tab of state.tabs || []) {
      for (const cat of tab.categories || []) {
        for (const p of cat.platforms || []) {
          const key = `${p.id}-${cat.id}-${tab.id}`
          if (!seen.has(key)) {
            seen.add(key)
            out.push({ ...p, tabName: tab.name, catName: cat.name })
          }
        }
      }
    }
    return out
  }, [state.tabs])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return allPlatforms
      .filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.url?.toLowerCase().includes(q)
      )
      .slice(0, 8)
  }, [query, allPlatforms])

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (!containerRef.current?.contains(e.target)) setFocused(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const showDropdown = focused && query.trim().length > 0

  function openFirst(e) {
    e.preventDefault()
    if (results.length === 0) return
    window.open(results[0].url, '_blank', 'noopener,noreferrer')
    setQuery('')
    setFocused(false)
  }

  return (
    <div className="px-6 pb-3" ref={containerRef}>
      <form onSubmit={openFirst} className="relative max-w-2xl">
        <div className={`flex items-center gap-2.5 bg-surface border rounded-2xl px-4 py-2.5 transition-all ${
          focused ? 'border-accent/60 shadow-lg shadow-accent/5' : 'border-border'
        }`}>
          <span className="text-sm shrink-0 leading-none text-muted select-none">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="Search your links…"
            className="flex-1 bg-transparent text-sm text-text focus:outline-none placeholder:text-muted min-w-0"
            onKeyDown={e => {
              if (e.key === 'Escape') { setQuery(''); setFocused(false) }
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); inputRef.current?.focus() }}
              className="text-muted/50 hover:text-muted text-base leading-none shrink-0"
            >
              ×
            </button>
          )}
        </div>

        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-surface border border-border rounded-2xl shadow-2xl shadow-black/30 overflow-hidden z-[200]">
            {results.length === 0 ? (
              <div className="px-4 py-3 text-xs text-muted">
                No links match "{query}" — try adding it via the library
              </div>
            ) : (
              <div className="py-1.5">
                {results.map((p, i) => (
                  <a
                    key={i}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseDown={() => { setQuery(''); setFocused(false) }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface2 transition-colors"
                  >
                    <span className="text-xl shrink-0">{p.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-text truncate">{p.name}</div>
                      <div className="text-[11px] text-muted truncate">{p.catName} · {p.tabName}</div>
                    </div>
                    <span className="text-[10px] text-muted/50 shrink-0">↗</span>
                  </a>
                ))}
                <div className="px-4 py-2 border-t border-border/50">
                  <p className="text-[10px] text-muted/50">
                    Searching {allPlatforms.length} saved links · Press Enter to open first result
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  )
}
