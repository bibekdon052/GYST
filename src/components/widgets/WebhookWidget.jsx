import { useState } from 'react'

export function WebhookWidget({ widget, onUpdate }) {
  const cfg = widget.config || {}
  const [editing, setEditing]   = useState(!cfg.url)
  const [form, setForm]         = useState({
    url:    cfg.url    || '',
    label:  cfg.label  || '',
    method: cfg.method || 'POST',
  })
  const [status, setStatus]     = useState(null) // null | 'firing' | 'done' | 'error'

  function save() {
    const url = form.url.trim()
    if (!url || !url.startsWith('https://')) return
    onUpdate?.({ url, label: form.label.trim(), method: form.method })
    setEditing(false)
  }

  async function fire() {
    if (!cfg.url) return
    setStatus('firing')
    try {
      await fetch(cfg.url, { method: cfg.method || 'POST', mode: 'no-cors' })
      setStatus('done')
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus(null), 2500)
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-2.5 p-4 h-full justify-center">
        <p className="text-[10px] font-semibold text-muted uppercase tracking-wider">Webhook Button</p>
        <input
          value={form.label}
          onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
          placeholder="Button label (e.g. Deploy, Notify team)"
          className="w-full bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/60"
        />
        <input
          value={form.url}
          onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
          placeholder="https://hooks.example.com/…"
          type="url"
          className="w-full bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/60"
          onKeyDown={e => e.key === 'Enter' && save()}
        />
        {form.url.trim() && !form.url.trim().startsWith('https://') && (
          <p className="text-[11px] text-amber-500">URL must start with https://</p>
        )}
        <select
          value={form.method}
          onChange={e => setForm(f => ({ ...f, method: e.target.value }))}
          className="w-full bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/60"
        >
          <option value="POST">POST</option>
          <option value="GET">GET</option>
        </select>
        <button
          onClick={save}
          disabled={!form.url.trim() || !form.url.trim().startsWith('https://')}
          className="py-2 bg-accent text-white rounded-lg text-xs font-semibold hover:opacity-90 disabled:opacity-40"
        >
          Save
        </button>
      </div>
    )
  }

  const statusCls = {
    done:   'bg-green-500 text-white',
    error:  'bg-red-500 text-white',
    firing: 'bg-muted/40 text-bg cursor-wait',
  }
  const statusLabel = {
    done:   '✓ Sent',
    error:  '✗ Failed',
    firing: 'Sending…',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 h-full px-4 group">
      <span className="text-3xl">🪝</span>
      <p className="text-sm font-semibold text-text text-center">{cfg.label || 'Send Webhook'}</p>
      <button
        onClick={fire}
        disabled={status === 'firing'}
        className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
          status ? statusCls[status] : 'bg-accent text-white hover:opacity-90'
        }`}
      >
        {status ? statusLabel[status] : 'Fire'}
      </button>
      <p className="text-[10px] text-muted/40 font-mono truncate max-w-full px-2">
        {cfg.method || 'POST'} · {cfg.url}
      </p>
      <button
        onClick={() => setEditing(true)}
        className="absolute bottom-2 right-2 text-[10px] text-muted/40 hover:text-muted opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 rounded bg-surface2/60"
      >
        configure
      </button>
    </div>
  )
}
