import { useState, useMemo } from 'react'
import { useDashboardStore } from '../../store/dashboardStore'
import { PLATFORM_CATEGORIES, searchPlatforms } from '../../data/platforms'

export function PlatformSidebar() {
  const { sidebarOpen, toggleSidebar, state, currentTabId, addPlatform, addCategory, movePlatform } = useDashboardStore()
  const [query, setQuery]       = useState('')
  const [filterCat, setFilterCat] = useState('all')
  const [addTarget, setAddTarget] = useState(null)
  const [targetCatId, setTargetCatId] = useState('')
  const [customUrl, setCustomUrl] = useState('')

  const results = useMemo(() => {
    let list = query ? searchPlatforms(query) : PLATFORM_CATEGORIES.flatMap(c => c.platforms)
    if (filterCat !== 'all') list = list.filter(p => p.category === filterCat)
    return list.slice(0, 80)
  }, [query, filterCat])

  const tabs = state.tabs || []
  const currentTab = tabs.find(t => t.id === (currentTabId || tabs[0]?.id))
  const categories = currentTab?.categories || []

  function handleAdd(platform) {
    if (!currentTab) return

    // No categories — auto-create one so the link has somewhere to go
    if (categories.length === 0) {
      addCategory(currentTab.id, {
        id: `cat-general-${Date.now()}`,
        name: 'General',
        icon: '📌',
        platforms: [platform],
        widgets: [],
      })
      return
    }

    // Single category — add directly
    if (categories.length === 1) {
      addPlatform(currentTab.id, categories[0].id, platform)
      return
    }

    // Multiple categories — show picker
    setAddTarget(platform)
    setTargetCatId(categories[0]?.id || '')
  }

  function confirmAdd() {
    if (!addTarget || !targetCatId) return
    addPlatform(currentTab.id, targetCatId, addTarget)
    setAddTarget(null)
  }

  function handleCustomUrl() {
    let url = customUrl.trim()
    if (!url) return
    if (!/^https?:\/\//i.test(url)) url = `https://${url}`
    let name = url
    try {
      const hostname = new URL(url).hostname.replace(/^www\./, '')
      const firstPart = hostname.split('.')[0]
      name = firstPart.charAt(0).toUpperCase() + firstPart.slice(1)
    } catch {}
    handleAdd({
      id: `custom-${Date.now()}`,
      name,
      url,
      emoji: '🔗',
      color: '#6b7280',
      description: 'Custom link',
      tags: ['custom'],
      category: 'custom',
    })
    setCustomUrl('')
  }

  if (!sidebarOpen) return null

  return (
    <>
      {/* Backdrop on mobile */}
      <div
        className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        onClick={toggleSidebar}
      />

      {/* Sidebar panel */}
      <aside
        className="fixed right-0 bottom-0 z-30 w-72 bg-surface border-l border-border flex flex-col overflow-hidden shadow-2xl shadow-black/30"
        style={{ top: '100px' }}
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-border shrink-0 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-text">Platform Library</h2>
            <button
              onClick={toggleSidebar}
              className="text-muted hover:text-text text-lg px-1"
            >
              ×
            </button>
          </div>
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">🔍</span>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search platforms…"
              className="w-full bg-surface2 border border-border rounded-lg pl-8 pr-3 py-2 text-sm text-text placeholder:text-muted/60 focus:outline-none focus:border-accent/60"
            />
          </div>
          {/* Category filter */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-thin pb-0.5">
            <button
              onClick={() => setFilterCat('all')}
              className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${filterCat === 'all' ? 'bg-accent text-white' : 'bg-surface2 text-muted hover:text-text'}`}
            >
              All
            </button>
            {PLATFORM_CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => setFilterCat(c.id)}
                className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${filterCat === c.id ? 'bg-accent text-white' : 'bg-surface2 text-muted hover:text-text'}`}
                title={c.name}
              >
                {c.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Custom URL quick-add */}
        <div className="px-3 pt-3 pb-2 border-b border-border shrink-0">
          <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1.5">Quick Add URL</p>
          <div className="flex gap-1.5">
            <input
              type="url"
              value={customUrl}
              onChange={e => setCustomUrl(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleCustomUrl() }}
              placeholder="Paste any URL…"
              className="flex-1 min-w-0 bg-surface2 border border-border rounded-lg px-2.5 py-1.5 text-xs text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/60"
            />
            <button
              onClick={handleCustomUrl}
              disabled={!customUrl.trim()}
              className="shrink-0 px-2.5 py-1.5 text-xs bg-accent text-white rounded-lg hover:opacity-90 disabled:opacity-40 transition-opacity"
              title="Add URL"
            >
              +
            </button>
          </div>
        </div>

        {/* Platform list */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-1">
          {results.length === 0 && (
            <div className="text-center text-sm text-muted py-8">No results for "{query}"</div>
          )}
          {results.map(platform => (
            <div
              key={platform.id}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface2 transition-colors group"
            >
              <span className="text-xl shrink-0">{platform.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text truncate">{platform.name}</div>
                <div className="text-xs text-muted truncate">{platform.description}</div>
              </div>
              <button
                onClick={() => handleAdd(platform)}
                className="shrink-0 px-2 py-1 text-xs text-accent border border-accent/30 rounded-lg hover:bg-accent hover:text-white transition-colors opacity-0 group-hover:opacity-100"
              >
                + Add
              </button>
            </div>
          ))}
        </div>

        {/* Category picker overlay */}
        {addTarget && categories.length > 1 && (
          <div className="absolute inset-0 bg-surface/95 backdrop-blur-sm flex flex-col p-5 gap-4">
            <div>
              <h3 className="text-sm font-bold text-text">Add to which category?</h3>
              <p className="text-xs text-muted mt-1">
                Adding <strong className="text-text">{addTarget.name}</strong>
              </p>
            </div>
            <select
              value={targetCatId}
              onChange={e => setTargetCatId(e.target.value)}
              className="bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/60"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                onClick={() => setAddTarget(null)}
                className="flex-1 py-2 text-sm border border-border text-muted rounded-lg hover:text-text"
              >
                Cancel
              </button>
              <button
                onClick={confirmAdd}
                className="flex-1 py-2 text-sm bg-accent text-white rounded-lg hover:opacity-90"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
