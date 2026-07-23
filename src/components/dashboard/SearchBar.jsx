import { useState, useRef } from 'react'

const ENGINES = [
  { id: 'google',  label: 'Google',     emoji: '🔍', url: 'https://www.google.com/search?q=' },
  { id: 'ddg',     label: 'DuckDuckGo', emoji: '🦆', url: 'https://duckduckgo.com/?q=' },
  { id: 'youtube', label: 'YouTube',    emoji: '▶️',  url: 'https://www.youtube.com/results?search_query=' },
  { id: 'abc',     label: 'ABC News',   emoji: '📺', url: 'https://www.abc.net.au/search?q=' },
]

export function SearchBar() {
  const [query, setQuery]   = useState('')
  const [engine, setEngine] = useState('google')
  const inputRef = useRef(null)

  const active = ENGINES.find(e => e.id === engine) || ENGINES[0]

  function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    window.open(active.url + encodeURIComponent(query.trim()), '_blank', 'noopener,noreferrer')
    setQuery('')
    inputRef.current?.blur()
  }

  return (
    <div className="px-6 pb-3">
      <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-2xl">
        <div className="flex-1 flex items-center gap-2.5 bg-surface border border-border rounded-2xl px-4 py-2.5 focus-within:border-accent/60 focus-within:shadow-lg focus-within:shadow-accent/5 transition-all">
          <span className="text-base shrink-0 leading-none select-none">{active.emoji}</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={`Search ${active.label}…`}
            className="flex-1 bg-transparent text-sm text-text focus:outline-none placeholder:text-muted min-w-0"
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
        <select
          value={engine}
          onChange={e => setEngine(e.target.value)}
          className="bg-surface border border-border rounded-xl px-2.5 py-2.5 text-xs text-muted focus:outline-none focus:border-accent/60 transition-colors shrink-0 cursor-pointer"
        >
          {ENGINES.map(e => (
            <option key={e.id} value={e.id}>{e.label}</option>
          ))}
        </select>
      </form>
    </div>
  )
}
