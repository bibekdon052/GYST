import { useState } from 'react'

const COLORS = ['#4f8ef7','#22c55e','#f59e0b','#ec4899','#a78bfa','#f97316','#14b8a6','#ef4444']

function todayStr() {
  return new Date().toLocaleDateString('en-CA') // YYYY-MM-DD
}

function last14Days() {
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (13 - i))
    return d.toLocaleDateString('en-CA')
  })
}

export function HabitWidget({ widget, onUpdate }) {
  const habits     = widget.config?.habits     || []
  const completions = widget.config?.completions || {} // { habitId: ['YYYY-MM-DD', ...] }
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [newColor, setNewColor] = useState(COLORS[0])
  const days = last14Days()
  const today = todayStr()

  function toggleDay(habitId, dateStr) {
    const current = completions[habitId] || []
    const next = current.includes(dateStr)
      ? current.filter(d => d !== dateStr)
      : [...current, dateStr]
    onUpdate({ completions: { ...completions, [habitId]: next } })
  }

  function addHabit() {
    if (!newName.trim()) return
    const id = `h-${Date.now()}`
    onUpdate({
      habits: [...habits, { id, name: newName.trim(), color: newColor }],
    })
    setNewName('')
    setAdding(false)
  }

  function removeHabit(id) {
    const { [id]: _, ...rest } = completions
    onUpdate({ habits: habits.filter(h => h.id !== id), completions: rest })
  }

  function streak(habitId) {
    const done = completions[habitId] || []
    let count = 0
    const d = new Date()
    while (true) {
      const s = d.toLocaleDateString('en-CA')
      if (!done.includes(s)) break
      count++
      d.setDate(d.getDate() - 1)
    }
    return count
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between px-3 pt-3 pb-1.5 shrink-0">
        <span className="text-xs font-semibold text-muted uppercase tracking-wider">Habits</span>
        <button
          onClick={() => setAdding(a => !a)}
          className="text-[10px] px-2 py-0.5 rounded-lg bg-surface2 text-muted hover:text-accent border border-border hover:border-accent/40 transition-colors"
        >
          {adding ? 'Cancel' : '+ Habit'}
        </button>
      </div>

      {adding && (
        <div className="px-3 pb-2 space-y-1.5 shrink-0">
          <input
            autoFocus
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addHabit()}
            placeholder="e.g. Exercise, Read, Water…"
            className="w-full bg-surface2 border border-border rounded-lg px-2 py-1.5 text-xs text-text focus:outline-none focus:border-accent/60 placeholder:text-muted/50"
          />
          <div className="flex items-center gap-1.5">
            {COLORS.map(c => (
              <button
                key={c}
                onClick={() => setNewColor(c)}
                className="w-4 h-4 rounded-full border-2 transition-all"
                style={{ background: c, borderColor: newColor === c ? 'white' : 'transparent', transform: newColor === c ? 'scale(1.25)' : 'scale(1)' }}
              />
            ))}
            <button
              onClick={addHabit}
              disabled={!newName.trim()}
              className="ml-auto px-2.5 py-0.5 text-[10px] bg-accent text-white rounded-lg hover:opacity-90 disabled:opacity-40"
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-2 space-y-2">
        {habits.length === 0 && !adding && (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-muted text-xs text-center pb-4">
            <span className="text-2xl">✅</span>
            <span>Track daily habits with streaks</span>
          </div>
        )}

        {habits.map(habit => {
          const done = completions[habit.id] || []
          const s = streak(habit.id)
          return (
            <div key={habit.id} className="flex items-center gap-2 group">
              {/* Name + streak */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: habit.color }} />
                  <span className="text-xs font-medium text-text truncate">{habit.name}</span>
                  {s > 0 && (
                    <span className="text-[10px] text-muted shrink-0">🔥 {s}</span>
                  )}
                </div>
              </div>

              {/* 14-day dots */}
              <div className="flex gap-0.5 shrink-0">
                {days.map(day => {
                  const isDone = done.includes(day)
                  const isToday = day === today
                  return (
                    <button
                      key={day}
                      onClick={() => toggleDay(habit.id, day)}
                      title={day}
                      className={`w-3 h-3 rounded-sm transition-all hover:opacity-80 ${
                        isToday ? 'ring-1 ring-offset-1 ring-accent/50' : ''
                      }`}
                      style={{
                        background: isDone ? habit.color : 'rgb(var(--color-surface2))',
                        opacity: isDone ? 1 : 0.4,
                      }}
                    />
                  )
                })}
              </div>

              {/* Remove */}
              <button
                onClick={() => removeHabit(habit.id)}
                className="text-muted/30 hover:text-danger text-xs opacity-0 group-hover:opacity-100 transition-all shrink-0"
              >
                ×
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
