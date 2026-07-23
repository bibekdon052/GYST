import { useState, useEffect } from 'react'

export function ClockWidget({ use24h = false }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const timeStr = now.toLocaleTimeString('en-AU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: !use24h,
  })

  const dateStr = now.toLocaleDateString('en-AU', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

  return (
    <div className="bg-surface border border-border rounded-xl p-4 text-center min-w-[160px]">
      <div className="text-2xl font-mono font-bold text-text tracking-tight">
        {timeStr}
      </div>
      <div className="text-xs text-muted mt-1">{dateStr}</div>
      <div className="text-xs text-muted/60 mt-0.5">{tz}</div>
    </div>
  )
}
