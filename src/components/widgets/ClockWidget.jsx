import { useState, useEffect } from 'react'

function hand(cx, cy, angle, len) {
  const rad = (angle - 90) * Math.PI / 180
  return { x: cx + len * Math.cos(rad), y: cy + len * Math.sin(rad) }
}

export function ClockWidget({ use24h = false }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const h = now.getHours()
  const m = now.getMinutes()
  const s = now.getSeconds()

  const hourAngle = (h % 12) * 30 + m * 0.5
  const minAngle  = m * 6 + s * 0.1
  const secAngle  = s * 6

  const cx = 50, cy = 50

  const hourTip = hand(cx, cy, hourAngle, 26)
  const minTip  = hand(cx, cy, minAngle,  35)
  const secTip  = hand(cx, cy, secAngle,  38)
  const secTail = hand(cx, cy, secAngle + 180, 10)

  const timeStr = now.toLocaleTimeString('en-AU', {
    hour: '2-digit', minute: '2-digit', hour12: !use24h,
  })
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/').pop().replace('_', ' ')

  return (
    <div className="flex items-center justify-center h-full gap-4 px-3">
      {/* Analog face */}
      <svg viewBox="0 0 100 100" className="w-24 h-24 shrink-0" aria-label={timeStr}>
        {/* Outer ring */}
        <circle cx={cx} cy={cy} r="47" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-border" />
        {/* Face fill */}
        <circle cx={cx} cy={cy} r="45" fill="currentColor" className="text-surface2" />

        {/* Hour marks */}
        {[...Array(12)].map((_, i) => {
          const a = i * 30
          const inner = i % 3 === 0 ? 36 : 39
          const p1 = hand(cx, cy, a, inner)
          const p2 = hand(cx, cy, a, 43)
          return (
            <line
              key={i}
              x1={p1.x} y1={p1.y}
              x2={p2.x} y2={p2.y}
              stroke="currentColor"
              strokeWidth={i % 3 === 0 ? 2 : 1}
              strokeLinecap="round"
              className="text-muted/60"
            />
          )
        })}

        {/* Hour hand */}
        <line
          x1={cx} y1={cy}
          x2={hourTip.x} y2={hourTip.y}
          stroke="currentColor" strokeWidth="4" strokeLinecap="round"
          className="text-text"
        />
        {/* Minute hand */}
        <line
          x1={cx} y1={cy}
          x2={minTip.x} y2={minTip.y}
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          className="text-text"
        />
        {/* Second hand */}
        <line
          x1={secTail.x} y1={secTail.y}
          x2={secTip.x}  y2={secTip.y}
          stroke="currentColor" strokeWidth="1" strokeLinecap="round"
          className="text-accent"
        />
        {/* Centre cap */}
        <circle cx={cx} cy={cy} r="3" fill="currentColor" className="text-accent" />
        <circle cx={cx} cy={cy} r="1.5" fill="currentColor" className="text-surface2" />
      </svg>

      {/* Digital + tz */}
      <div className="flex flex-col gap-0.5">
        <span className="text-xl font-mono font-bold text-text tabular-nums leading-none">
          {timeStr}
        </span>
        <span className="text-[10px] text-muted/60 font-mono">{tz}</span>
      </div>
    </div>
  )
}
