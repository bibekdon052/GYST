import { useState, useEffect, useRef } from 'react'

const PRESETS = [
  { label: '25m', sec: 25 * 60 },
  { label: '45m', sec: 45 * 60 },
  { label: '90m', sec: 90 * 60 },
]

export function FocusTimerWidget({ widget, onUpdate }) {
  const config = widget?.config || {}
  const [total, setTotal] = useState(config.preset || PRESETS[0].sec)
  const [remaining, setRemaining] = useState(config.preset || PRESETS[0].sec)
  const [running, setRunning] = useState(false)
  const [task, setTask] = useState(config.task || '')
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining(r => {
          if (r <= 1) {
            clearInterval(intervalRef.current)
            setRunning(false)
            return 0
          }
          return r - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  function pickPreset(sec) {
    clearInterval(intervalRef.current)
    setRunning(false)
    setTotal(sec)
    setRemaining(sec)
  }

  function format(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0')
    const s = (sec % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const circumference = 2 * Math.PI * 32
  const progress = total > 0 ? (total - remaining) / total : 0
  const dashOffset = circumference - progress * circumference
  const done = remaining === 0

  function startLabel() {
    if (done) return 'Done!'
    if (running) return 'Pause'
    if (remaining < total) return 'Resume'
    return 'Start'
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 px-3 py-2">
      {/* Ring */}
      <div className="relative w-[72px] h-[72px] shrink-0">
        <svg viewBox="0 0 72 72" className="w-full h-full -rotate-90">
          <circle cx="36" cy="36" r="32" fill="none" stroke="currentColor" strokeWidth="5" className="text-surface2" />
          <circle
            cx="36" cy="36" r="32" fill="none"
            stroke="currentColor" strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className={done ? 'text-green-400' : 'text-accent'}
            style={{ transition: running ? 'stroke-dashoffset 1s linear' : 'none' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-sm font-mono font-bold tabular-nums ${done ? 'text-green-400' : 'text-text'}`}>
            {done ? '✓' : format(remaining)}
          </span>
        </div>
      </div>

      {/* Presets */}
      <div className="flex gap-1 shrink-0">
        {PRESETS.map(p => (
          <button
            key={p.sec}
            onClick={() => pickPreset(p.sec)}
            className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
              total === p.sec
                ? 'bg-accent text-white border-transparent'
                : 'bg-surface2 text-muted border-border hover:text-text'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Task */}
      <input
        value={task}
        onChange={e => setTask(e.target.value)}
        onBlur={() => onUpdate?.({ task, preset: total })}
        placeholder="What are you working on?"
        className="w-full text-center text-[10px] text-muted bg-transparent border-b border-border/30 focus:outline-none focus:border-accent/40 placeholder:text-muted/40 pb-0.5 shrink-0"
      />

      {/* Controls */}
      <div className="flex gap-1.5 shrink-0">
        <button
          onClick={() => !done && setRunning(r => !r)}
          className={`px-3 py-1 text-[11px] rounded-lg transition-colors ${
            done
              ? 'bg-green-400/15 text-green-400 border border-green-400/30'
              : 'bg-accent text-white hover:opacity-90'
          }`}
        >
          {startLabel()}
        </button>
        <button
          onClick={() => { setRunning(false); setRemaining(total) }}
          className="px-2 py-1 text-[11px] border border-border text-muted rounded-lg hover:text-text transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
