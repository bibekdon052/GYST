import { useState } from 'react'

const AU_PRESETS = [
  { label: 'End of Financial Year', emoji: '💰', month: 6,  day: 30 },
  { label: 'Tax Return Deadline',   emoji: '📋', month: 10, day: 31 },
  { label: 'Christmas',             emoji: '🎄', month: 12, day: 25 },
  { label: 'New Year\'s Day',       emoji: '🎆', month: 1,  day: 1  },
  { label: 'Australia Day',         emoji: '🇦🇺', month: 1,  day: 26 },
  { label: 'ANZAC Day',             emoji: '🌺', month: 4,  day: 25 },
  { label: 'Valentine\'s Day',      emoji: '💕', month: 2,  day: 14 },
  { label: 'Mother\'s Day',         emoji: '🌸', month: 5,  day: 11 }, // 2nd Sun in May — approx
  { label: 'Father\'s Day',         emoji: '👔', month: 9,  day: 7  }, // 1st Sun in Sep — approx
  { label: 'Halloween',             emoji: '🎃', month: 10, day: 31 },
  { label: 'Melbourne Cup',         emoji: '🏇', month: 11, day: 4  }, // approx first Tue Nov
]

function nextDate(month, day) {
  const now = new Date()
  const y = now.getFullYear()
  let d = new Date(y, month - 1, day)
  if (d < now) d = new Date(y + 1, month - 1, day)
  return d.toISOString().split('T')[0]
}

function daysUntil(dateStr) {
  const target = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.ceil((target - today) / 86400000)
}

function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-AU', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

export function CountdownWidget({ widget, onUpdate }) {
  const [adding, setAdding] = useState(false)
  const [mode, setMode] = useState('preset')
  const [label, setLabel] = useState('')
  const [date, setDate] = useState('')
  const [emoji, setEmoji] = useState('📅')

  const raw = widget.config?.countdowns || []
  const upcoming = raw
    .map(c => ({ ...c, days: daysUntil(c.date) }))
    .filter(c => c.days >= 0)
    .sort((a, b) => a.days - b.days)

  function addPreset(p) {
    const newEntry = { id: `cd-${Date.now()}`, label: p.label, date: nextDate(p.month, p.day), emoji: p.emoji }
    onUpdate({ countdowns: [...raw, newEntry] })
    setAdding(false)
  }

  function addCustom() {
    if (!label.trim() || !date) return
    const newEntry = { id: `cd-${Date.now()}`, label: label.trim(), date, emoji }
    onUpdate({ countdowns: [...raw, newEntry] })
    setLabel(''); setDate(''); setEmoji('📅')
    setAdding(false)
  }

  function remove(id) {
    onUpdate({ countdowns: raw.filter(c => c.id !== id) })
  }

  const nearest = upcoming[0]

  if (adding) {
    return (
      <div className="p-3 h-full flex flex-col gap-2">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-base leading-none">⏳</span>
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Add Countdown</span>
          <button onClick={() => setAdding(false)} className="ml-auto text-muted/50 hover:text-text text-lg leading-none">×</button>
        </div>

        <div className="flex gap-0.5 bg-surface2 rounded-lg p-0.5 shrink-0">
          <button
            onClick={() => setMode('preset')}
            className={`flex-1 py-1 text-xs rounded-md transition-colors ${mode === 'preset' ? 'bg-accent text-white' : 'text-muted hover:text-text'}`}
          >
            AU Events
          </button>
          <button
            onClick={() => setMode('custom')}
            className={`flex-1 py-1 text-xs rounded-md transition-colors ${mode === 'custom' ? 'bg-accent text-white' : 'text-muted hover:text-text'}`}
          >
            Custom Date
          </button>
        </div>

        {mode === 'preset' ? (
          <div className="flex-1 overflow-y-auto min-h-0 space-y-0.5">
            {AU_PRESETS.map(p => (
              <button
                key={p.label}
                onClick={() => addPreset(p)}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-left text-xs text-text hover:bg-surface2 rounded-lg transition-colors"
              >
                <span className="text-sm">{p.emoji}</span>
                <span className="flex-1">{p.label}</span>
                <span className="text-muted/50 shrink-0">{formatDate(nextDate(p.month, p.day))}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex gap-1.5">
              <input
                value={emoji}
                onChange={e => setEmoji(e.target.value)}
                maxLength={2}
                className="w-9 bg-surface2 border border-border rounded-lg text-center text-sm focus:outline-none focus:border-accent/60 py-1.5"
              />
              <input
                value={label}
                onChange={e => setLabel(e.target.value)}
                placeholder="Event name…"
                className="flex-1 bg-surface2 border border-border rounded-lg px-2 py-1.5 text-xs text-text focus:outline-none focus:border-accent/60"
              />
            </div>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full bg-surface2 border border-border rounded-lg px-2 py-1.5 text-xs text-text focus:outline-none focus:border-accent/60"
            />
            <button
              onClick={addCustom}
              disabled={!label.trim() || !date}
              className="py-1.5 bg-accent text-white text-xs rounded-lg disabled:opacity-30 hover:opacity-90"
            >
              Add Countdown
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-3 h-full flex flex-col gap-2">
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-base leading-none">⏳</span>
        <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Countdowns</span>
        <button
          onClick={() => setAdding(true)}
          className="ml-auto text-[11px] text-muted/60 hover:text-accent transition-colors"
        >
          + Add
        </button>
      </div>

      {upcoming.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <span className="text-3xl">⏳</span>
          <p className="text-xs text-muted/60 text-center">Add an upcoming date to count down to</p>
          <button onClick={() => setAdding(true)} className="text-xs text-accent hover:opacity-80 transition-opacity">+ Add one</button>
        </div>
      ) : (
        <>
          {/* Featured — nearest event */}
          <div className="bg-surface2 border border-border rounded-xl p-3 text-center shrink-0">
            <div className="text-2xl mb-1">{nearest.emoji}</div>
            <div className={`font-bold text-text tabular-nums ${nearest.days <= 7 ? 'text-4xl text-accent' : 'text-3xl'}`}>
              {nearest.days === 0 ? '🎉' : nearest.days}
            </div>
            <div className="text-[11px] text-muted mt-0.5">
              {nearest.days === 0 ? 'Today!' : nearest.days === 1 ? 'day to go' : 'days to go'}
            </div>
            <div className="text-xs font-semibold text-text mt-1 truncate">{nearest.label}</div>
            <div className="text-[10px] text-muted/60 mt-0.5">{formatDate(nearest.date)}</div>
          </div>

          {/* Rest of list */}
          <div className="flex-1 overflow-y-auto min-h-0 space-y-1">
            {upcoming.slice(1).map(cd => (
              <div key={cd.id} className="flex items-center gap-2 group py-0.5">
                <span className="text-sm shrink-0">{cd.emoji}</span>
                <span className="text-xs text-muted flex-1 truncate">{cd.label}</span>
                <span className="text-xs font-semibold text-text tabular-nums shrink-0">{cd.days}d</span>
                <button
                  onClick={() => remove(cd.id)}
                  className="text-muted/30 hover:text-danger text-sm leading-none opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
