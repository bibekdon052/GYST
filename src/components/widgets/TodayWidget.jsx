import { useState, useEffect } from 'react'

const TODAY = new Date().toISOString().slice(0, 10)

const SLOTS = [
  { key: 'morning', label: 'Morning',   emoji: '☀️' },
  { key: 'arvo',    label: 'Afternoon', emoji: '🌤️' },
  { key: 'evening', label: 'Evening',   emoji: '🌙' },
]

function makeEmptySlots() {
  return { morning: [], arvo: [], evening: [] }
}

export function TodayWidget({ widget, onUpdate }) {
  const config = widget.config || {}
  const savedDate = config.date
  const slots = (savedDate === TODAY && config.slots) ? config.slots : makeEmptySlots()

  const [newTexts, setNewTexts] = useState({ morning: '', arvo: '', evening: '' })

  // Auto-reset when day changes
  useEffect(() => {
    if (savedDate && savedDate !== TODAY) {
      onUpdate({ date: TODAY, slots: makeEmptySlots() })
    }
  }, [])

  function addItem(slotKey) {
    const text = newTexts[slotKey].trim()
    if (!text) return
    const item = { id: `t-${Date.now()}`, text, done: false }
    const updated = { ...slots, [slotKey]: [...(slots[slotKey] || []), item] }
    onUpdate({ date: TODAY, slots: updated })
    setNewTexts(p => ({ ...p, [slotKey]: '' }))
  }

  function toggleItem(slotKey, itemId) {
    const updated = {
      ...slots,
      [slotKey]: slots[slotKey].map(it =>
        it.id === itemId ? { ...it, done: !it.done } : it
      ),
    }
    onUpdate({ date: TODAY, slots: updated })
  }

  function deleteItem(slotKey, itemId) {
    const updated = {
      ...slots,
      [slotKey]: slots[slotKey].filter(it => it.id !== itemId),
    }
    onUpdate({ date: TODAY, slots: updated })
  }

  const dateLabel = new Date().toLocaleDateString('en-AU', {
    weekday: 'short', day: 'numeric', month: 'short'
  })

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-3 pt-3 pb-2 shrink-0 border-b border-border/50">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-text">What's On</span>
          <span className="text-xs text-muted">{dateLabel}</span>
        </div>
      </div>

      {/* Slots */}
      <div className="flex-1 overflow-y-auto scrollbar-thin divide-y divide-border/30">
        {SLOTS.map(slot => {
          const items = slots[slot.key] || []
          return (
            <div key={slot.key} className="px-3 py-2">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-xs">{slot.emoji}</span>
                <span className="text-[11px] font-semibold text-muted uppercase tracking-wide">{slot.label}</span>
              </div>

              {/* Items */}
              <div className="space-y-0.5 mb-1">
                {items.map(item => (
                  <div key={item.id} className="flex items-start gap-1.5 group">
                    <button
                      onClick={() => toggleItem(slot.key, item.id)}
                      className={`mt-0.5 w-3.5 h-3.5 rounded-sm border shrink-0 flex items-center justify-center transition-colors ${
                        item.done
                          ? 'bg-accent/80 border-accent/80'
                          : 'border-border hover:border-accent/60'
                      }`}
                    >
                      {item.done && (
                        <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                        </svg>
                      )}
                    </button>
                    <span className={`text-xs flex-1 leading-tight font-handwriting ${item.done ? 'line-through text-muted' : 'text-text'}`} style={{ fontSize: '13px' }}>
                      {item.text}
                    </span>
                    <button
                      onClick={() => deleteItem(slot.key, item.id)}
                      className="opacity-0 group-hover:opacity-100 text-muted hover:text-danger text-[10px] shrink-0 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* Add item input */}
              <div className="flex gap-1">
                <input
                  type="text"
                  value={newTexts[slot.key]}
                  onChange={e => setNewTexts(p => ({ ...p, [slot.key]: e.target.value }))}
                  onKeyDown={e => { if (e.key === 'Enter') addItem(slot.key) }}
                  placeholder={`Add to ${slot.label.toLowerCase()}…`}
                  className="flex-1 text-[11px] bg-transparent text-muted placeholder:text-muted/50 focus:outline-none focus:text-text border-b border-transparent focus:border-border/60 transition-colors pb-0.5"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
