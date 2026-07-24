import { useState } from 'react'

export function LinkWidget({ widget, onUpdate }) {
  const cfg = widget.config || {}
  const [editing, setEditing] = useState(!cfg.url)
  const [form, setForm] = useState({
    url:   cfg.url   || '',
    label: cfg.label || '',
    emoji: cfg.emoji || '🔗',
  })

  function save() {
    const url = form.url.trim()
    if (!url) return
    onUpdate?.({ url, label: form.label.trim(), emoji: form.emoji || '🔗' })
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-2.5 p-4 h-full justify-center">
        <div className="flex gap-2">
          <input
            value={form.emoji}
            onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))}
            className="w-10 text-center bg-surface2 border border-border rounded-lg py-2 text-base focus:outline-none focus:border-accent/60"
            maxLength={2}
          />
          <input
            value={form.label}
            onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
            placeholder="Label (optional)"
            className="flex-1 bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/60"
          />
        </div>
        <input
          value={form.url}
          onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
          placeholder="https://…"
          type="url"
          className="w-full bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/60"
          onKeyDown={e => e.key === 'Enter' && save()}
        />
        <button
          onClick={save}
          disabled={!form.url.trim()}
          className="py-2 bg-accent text-white rounded-lg text-xs font-semibold hover:opacity-90 disabled:opacity-40"
        >
          Save
        </button>
      </div>
    )
  }

  let displayHost = cfg.url
  try { displayHost = new URL(cfg.url).hostname.replace('www.', '') } catch {}

  return (
    <a
      href={cfg.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center justify-center gap-2 h-full px-4 hover:bg-surface2/40 transition-colors group rounded-2xl"
    >
      <span className="text-4xl">{cfg.emoji || '🔗'}</span>
      <span className="text-sm font-semibold text-text text-center truncate max-w-full px-2">
        {cfg.label || displayHost}
      </span>
      <span className="text-[10px] text-muted/50 truncate max-w-full">{displayHost}</span>
      <button
        onClick={e => { e.preventDefault(); e.stopPropagation(); setEditing(true) }}
        className="absolute bottom-2 right-2 text-[10px] text-muted/40 hover:text-muted opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 rounded bg-surface2/60"
      >
        edit
      </button>
    </a>
  )
}
