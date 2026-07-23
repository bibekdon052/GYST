import { useState, useRef, useEffect } from 'react'

export function NotesWidget({ widget, onUpdate }) {
  const [note, setNote] = useState(widget.config?.note || '')
  const [saved, setSaved] = useState(true)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  function handleChange(val) {
    setNote(val)
    setSaved(false)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      onUpdate({ note: val })
      setSaved(true)
    }, 600)
  }

  return (
    <div className="p-3 h-full flex flex-col gap-2">
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-base leading-none">📝</span>
        <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Quick Note</span>
        <span className={`ml-auto text-[10px] transition-opacity ${saved && note ? 'text-muted/40' : 'text-muted/0'}`}>
          saved
        </span>
      </div>
      <textarea
        value={note}
        onChange={e => handleChange(e.target.value)}
        placeholder="Jot something down… it auto-saves."
        className="flex-1 min-h-0 bg-transparent text-xs text-text resize-none focus:outline-none placeholder:text-muted/50 leading-relaxed"
      />
    </div>
  )
}
