import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { NEWS_FEEDS } from '../../data/newsFeeds'

const WIDGET_TYPES = [
  { type: 'tasks',    name: 'Tasks',          emoji: '✅', description: 'A checklist for today — tick things off as you go' },
  { type: 'notes',    name: 'Quick Note',     emoji: '📝', description: 'Sticky note that auto-saves to your dashboard' },
  { type: 'clock',    name: 'Clock',          emoji: '🕐', description: 'Live time and date display' },
  { type: 'weather',  name: 'Weather',        emoji: '🌤️', description: 'Current conditions via Open-Meteo (no API key needed)' },
  { type: 'news',     name: 'News Headlines', emoji: '📰', description: 'Top headlines from Australian news sources' },
  { type: 'quote',    name: 'Daily Quote',    emoji: '💭', description: 'A new motivational quote every day' },
  { type: 'calendar', name: 'Calendar',       emoji: '📅', description: 'Monthly calendar view' },
  { type: 'html',     name: 'Custom HTML',    emoji: '🧩', description: 'Embed anything with HTML & JavaScript' },
]

export function WidgetGallery({ isOpen, onClose, activeWidgets = [], onToggle }) {
  const [selectedFeedId, setSelectedFeedId] = useState(NEWS_FEEDS[0].id)
  const [htmlContent, setHtmlContent] = useState('')
  const [pendingType, setPendingType] = useState(null)

  function isActive(type) {
    return activeWidgets.some(w => w.type === type)
  }

  function handleToggle(type) {
    if (isActive(type)) {
      onToggle(type, null)
      return
    }

    if (type === 'news') {
      setPendingType('news')
      return
    }
    if (type === 'html') {
      setPendingType('html')
      return
    }
    onToggle(type, null)
  }

  function confirmNews() {
    const feed = NEWS_FEEDS.find(f => f.id === selectedFeedId) || NEWS_FEEDS[0]
    onToggle('news', { feedUrl: feed.url, feedName: feed.name })
    setPendingType(null)
  }

  function confirmHtml() {
    onToggle('html', { html: htmlContent })
    setHtmlContent('')
    setPendingType(null)
  }

  function cancelPending() {
    setPendingType(null)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Widget Gallery" width="max-w-lg">
      <div className="space-y-4">
        <p className="text-xs text-muted">
          Choose widgets to display above your categories. All default widgets are free and require no API keys.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {WIDGET_TYPES.map(wt => {
            const active = isActive(wt.type)
            return (
              <div
                key={wt.type}
                className={`rounded-xl border p-4 flex flex-col gap-2 transition-all ${
                  active
                    ? 'border-accent/60 bg-accent/5'
                    : 'border-border bg-surface hover:border-accent/30'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-2xl mb-1">{wt.emoji}</div>
                    <div className="text-sm font-semibold text-text">{wt.name}</div>
                    <div className="text-[11px] text-muted leading-snug mt-0.5">{wt.description}</div>
                  </div>
                </div>

                {/* Sub-form for news (pending) */}
                {pendingType === 'news' && wt.type === 'news' && (
                  <div className="mt-1 space-y-2">
                    <select
                      value={selectedFeedId}
                      onChange={e => setSelectedFeedId(e.target.value)}
                      className="w-full bg-surface2 border border-border rounded-lg px-2 py-1.5 text-xs text-text focus:outline-none focus:border-accent/60"
                    >
                      {NEWS_FEEDS.map(f => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={cancelPending}
                        className="flex-1 py-1 text-xs border border-border text-muted rounded-lg hover:text-text"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={confirmNews}
                        className="flex-1 py-1 text-xs bg-accent text-white rounded-lg hover:opacity-90"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}

                {/* Sub-form for HTML (pending) */}
                {pendingType === 'html' && wt.type === 'html' && (
                  <div className="mt-1 space-y-2">
                    <textarea
                      value={htmlContent}
                      onChange={e => setHtmlContent(e.target.value)}
                      placeholder="<p>Your HTML here…</p>"
                      rows={3}
                      className="w-full bg-surface2 border border-border rounded-lg px-2 py-1.5 text-xs font-mono text-text resize-none focus:outline-none focus:border-accent/60"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={cancelPending}
                        className="flex-1 py-1 text-xs border border-border text-muted rounded-lg hover:text-text"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={confirmHtml}
                        className="flex-1 py-1 text-xs bg-accent text-white rounded-lg hover:opacity-90"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}

                {/* Toggle button (hidden when sub-form is open for this type) */}
                {!(pendingType === wt.type) && (
                  <button
                    onClick={() => handleToggle(wt.type)}
                    className={`mt-auto py-1.5 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? 'bg-accent/15 text-accent border border-accent/30 hover:bg-danger/10 hover:text-danger hover:border-danger/30'
                        : 'bg-surface2 text-muted border border-border hover:text-text hover:border-accent/40'
                    }`}
                  >
                    {active ? '✓ Added' : 'Add'}
                  </button>
                )}
              </div>
            )
          })}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm bg-accent text-white rounded-lg hover:opacity-90"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  )
}
