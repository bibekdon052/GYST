import { useState } from 'react'

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function firstDayOfMonth(year, month) {
  // 0 = Sunday; we want Monday-first, so shift
  return (new Date(year, month, 1).getDay() + 6) % 7
}

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

const DAY_LABELS = ['Mo','Tu','We','Th','Fr','Sa','Su']

export function CalendarWidget() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())

  function prev() {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  function next() {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const days = daysInMonth(year, month)
  const startOffset = firstDayOfMonth(year, month)
  const cells = []

  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= days; d++) cells.push(d)

  const isToday = (d) =>
    d === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()

  return (
    <div className="bg-surface border border-border rounded-xl p-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prev}
          className="text-muted hover:text-text p-1 rounded hover:bg-surface2 transition-colors"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-text">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          onClick={next}
          className="text-muted hover:text-text p-1 rounded hover:bg-surface2 transition-colors"
        >
          ›
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {DAY_LABELS.map(d => (
          <div key={d} className="text-center text-[10px] text-muted font-medium py-0.5">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => (
          <div
            key={i}
            className={`
              text-center text-xs py-1 rounded-md leading-5
              ${day === null ? '' : 'cursor-default select-none'}
              ${isToday(day)
                ? 'bg-accent text-white font-bold'
                : day
                ? 'text-text hover:bg-surface2 transition-colors'
                : ''}
            `}
          >
            {day ?? ''}
          </div>
        ))}
      </div>
    </div>
  )
}
