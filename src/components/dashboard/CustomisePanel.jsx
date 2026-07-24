import { useState } from 'react'
import { useDashboardStore } from '../../store/dashboardStore'

const ACCENT_PRESETS = [
  '#4f8ef7', '#7c3aed', '#ec4899', '#22c55e', '#f59e0b', '#ef4444',
  '#06b6d4', '#f97316', '#a3e635', '#e879f9', '#14b8a6', '#fb7185',
]

const THEMES = [
  {
    id: 'dark',
    name: 'Midnight',
    desc: 'Dark default',
    bg: '#0f1117',
    surface: '#1a1d27',
    text: '#e2e5f0',
    accent: '#4f8ef7',
    light: false,
  },
  {
    id: 'slate',
    name: 'Slate',
    desc: 'Pure dark',
    bg: '#0c0c0f',
    surface: '#18181b',
    text: '#f4f4f5',
    accent: '#a78bfa',
    light: false,
  },
  {
    id: 'ocean',
    name: 'Ocean',
    desc: 'Coastal blue',
    bg: '#061222',
    surface: '#0a1c34',
    text: '#c8e1f8',
    accent: '#38bdf8',
    light: false,
  },
  {
    id: 'bush',
    name: 'Bush',
    desc: 'Outback warm',
    bg: '#1c160a',
    surface: '#282010',
    text: '#f0e0bc',
    accent: '#d97706',
    light: false,
  },
  {
    id: 'rose',
    name: 'Rose Noir',
    desc: 'Moody pink',
    bg: '#110a10',
    surface: '#1c1020',
    text: '#f8e0f0',
    accent: '#f472b6',
    light: false,
  },
  {
    id: 'light',
    name: 'Cloud',
    desc: 'Clean light',
    bg: '#f7f8fc',
    surface: '#ffffff',
    text: '#0f1117',
    accent: '#4f8ef7',
    light: true,
  },
  {
    id: 'paper',
    name: 'Paper',
    desc: 'Diary cream',
    bg: '#fdf8eb',
    surface: '#fffdf5',
    text: '#2d1e0c',
    accent: '#d97706',
    light: true,
  },
]

const FONT_OPTIONS = [
  { label: 'System Default',    value: 'system-ui, sans-serif' },
  { label: 'Inter',             value: 'Inter, system-ui, sans-serif' },
  { label: 'Handwriting',       value: 'Caveat, cursive' },
  { label: 'Monospace',         value: 'ui-monospace, Menlo, monospace' },
  { label: 'Georgia (Serif)',   value: 'Georgia, serif' },
]

const GRADIENT_PRESETS = [
  { label: 'None',          value: '' },
  { label: 'Sunrise',       value: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { label: 'Ocean Breeze',  value: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { label: 'Outback Dusk',  value: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
  { label: 'Midnight Blue', value: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' },
  { label: 'Bush Gold',     value: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
  { label: 'Southern Sky',  value: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' },
]

export function CustomisePanel({ isOpen, onClose }) {
  const { state, updateAppearance } = useDashboardStore()
  const appearance = state.appearance || {}
  const [section, setSection] = useState('look')

  if (!isOpen) return null

  function setAccent(color) {
    updateAppearance({ accentColor: color })
    const hex = color.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    if (!isNaN(r)) document.documentElement.style.setProperty('--color-accent', `${r} ${g} ${b}`)
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme.id
    updateAppearance({ theme: theme.id, accentColor: theme.accent })
    setAccent(theme.accent)
  }

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-surface border-l border-border shadow-2xl shadow-black/40 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <h2 className="text-sm font-bold text-text">Customise</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-text p-1 rounded-lg hover:bg-surface2 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border shrink-0">
          {[
            { id: 'look',  label: 'Look' },
            { id: 'feel',  label: 'Feel' },
            { id: 'brand', label: 'Brand' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSection(tab.id)}
              className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                section === tab.id
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-muted hover:text-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4 space-y-6">
          {/* ─── LOOK ─── */}
          {section === 'look' && (
            <>
              {/* Theme */}
              <section className="space-y-3">
                <label className="text-xs font-semibold text-muted uppercase tracking-wider">Theme</label>
                <div className="grid grid-cols-2 gap-2">
                  {THEMES.map(theme => {
                    const active = (appearance.theme || 'dark') === theme.id
                    return (
                      <button
                        key={theme.id}
                        onClick={() => applyTheme(theme)}
                        className={`relative rounded-xl p-3 text-left transition-all border-2 ${
                          active ? 'border-accent' : 'border-transparent hover:border-border'
                        }`}
                        style={{ background: theme.bg }}
                      >
                        {/* Mini preview */}
                        <div
                          className="rounded-lg mb-2 p-2 flex gap-1"
                          style={{ background: theme.surface }}
                        >
                          <div className="w-2 h-2 rounded-full" style={{ background: theme.accent }} />
                          <div className="flex flex-col gap-0.5 flex-1">
                            <div className="h-1.5 rounded-full opacity-60" style={{ background: theme.text, width: '70%' }} />
                            <div className="h-1 rounded-full opacity-30" style={{ background: theme.text, width: '50%' }} />
                          </div>
                        </div>
                        <div className="text-[11px] font-semibold" style={{ color: theme.text }}>
                          {theme.name}
                        </div>
                        <div className="text-[10px] opacity-60" style={{ color: theme.text }}>
                          {theme.desc}
                        </div>
                        {active && (
                          <div className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-accent flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                            </svg>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* Accent */}
              <section className="space-y-2">
                <label className="text-xs font-semibold text-muted uppercase tracking-wider">Accent Colour</label>
                <div className="flex flex-wrap gap-2">
                  {ACCENT_PRESETS.map(c => (
                    <button
                      key={c}
                      onClick={() => setAccent(c)}
                      className={`w-7 h-7 rounded-full transition-all active:scale-90 ${
                        appearance.accentColor === c ? 'ring-2 ring-white ring-offset-2 ring-offset-surface' : ''
                      }`}
                      style={{ background: c }}
                      title={c}
                    />
                  ))}
                  <input
                    type="color"
                    value={appearance.accentColor || '#4f8ef7'}
                    onChange={e => setAccent(e.target.value)}
                    className="w-7 h-7 rounded-full cursor-pointer border-0 bg-transparent"
                    title="Custom colour"
                  />
                </div>
              </section>

              {/* Background gradient */}
              <section className="space-y-2">
                <label className="text-xs font-semibold text-muted uppercase tracking-wider">Background</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {GRADIENT_PRESETS.map(g => (
                    <button
                      key={g.label}
                      onClick={() => updateAppearance({ background: { type: 'gradient', value: g.value } })}
                      className={`h-10 rounded-xl border-2 text-xs font-medium transition-all ${
                        (appearance.background?.value || '') === g.value
                          ? 'border-accent'
                          : 'border-border hover:border-accent/40'
                      }`}
                      style={{ background: g.value || 'rgb(var(--color-bg))' }}
                    >
                      {!g.value && (
                        <span className="text-muted text-[11px]">Default</span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 items-center pt-1">
                  <input
                    type="color"
                    value={
                      appearance.background?.value?.startsWith('#')
                        ? appearance.background.value
                        : '#0f1117'
                    }
                    onChange={e => updateAppearance({ background: { type: 'color', value: e.target.value } })}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-border bg-transparent shrink-0"
                    title="Custom solid colour"
                  />
                  <span className="text-xs text-muted">Custom solid colour</span>
                </div>
              </section>
            </>
          )}

          {/* ─── FEEL ─── */}
          {section === 'feel' && (
            <>
              {/* Font */}
              <section className="space-y-2">
                <label className="text-xs font-semibold text-muted uppercase tracking-wider">Font</label>
                <div className="space-y-1.5">
                  {FONT_OPTIONS.map(f => {
                    const active = (appearance.fontFamily || 'system-ui, sans-serif') === f.value
                    return (
                      <button
                        key={f.value}
                        onClick={() => updateAppearance({ fontFamily: f.value })}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm transition-all ${
                          active
                            ? 'border-accent/60 bg-accent/5 text-text'
                            : 'border-border text-muted hover:text-text hover:border-accent/30'
                        }`}
                        style={{ fontFamily: f.value }}
                      >
                        <span>{f.label}</span>
                        <span className="text-xs opacity-60" style={{ fontFamily: f.value }}>
                          Aa Bb
                        </span>
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* Layout */}
              <section className="space-y-2">
                <label className="text-xs font-semibold text-muted uppercase tracking-wider">Link Layout</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'grid',    label: 'Grid',    icon: '⊞' },
                    { value: 'compact', label: 'Compact', icon: '☰' },
                  ].map(opt => {
                    const active = (appearance.linkLayout || 'grid') === opt.value
                    return (
                      <button
                        key={opt.value}
                        onClick={() => updateAppearance({ linkLayout: opt.value })}
                        className={`flex flex-col items-center gap-2 py-4 rounded-xl border-2 transition-all ${
                          active ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/30'
                        }`}
                      >
                        <span className="text-xl">{opt.icon}</span>
                        <span className={`text-xs font-medium ${active ? 'text-accent' : 'text-muted'}`}>{opt.label}</span>
                      </button>
                    )
                  })}
                </div>
              </section>
            </>
          )}

          {/* ─── BRAND ─── */}
          {section === 'brand' && (
            <>
              {/* Your name */}
              <section className="space-y-2">
                <label className="text-xs font-semibold text-muted uppercase tracking-wider">Your Name</label>
                <p className="text-[11px] text-muted leading-snug">
                  This appears in the greeting on your dashboard.
                </p>
                <input
                  type="text"
                  value={appearance.displayName || ''}
                  onChange={e => updateAppearance({ displayName: e.target.value })}
                  placeholder="e.g. Sarah, Mum, Coach…"
                  className="w-full bg-surface2 border border-border rounded-xl px-3 py-2.5 text-sm text-text focus:outline-none focus:border-accent/60 placeholder:text-muted/50"
                />
              </section>

              {/* Logo + title */}
              <section className="space-y-2">
                <label className="text-xs font-semibold text-muted uppercase tracking-wider">Dashboard Name</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={appearance.logoEmoji || '🛩️'}
                    onChange={e => updateAppearance({ logoEmoji: e.target.value })}
                    className="w-12 bg-surface2 border border-border rounded-xl text-center text-sm focus:outline-none focus:border-accent/60 py-2.5"
                    maxLength={2}
                  />
                  <input
                    type="text"
                    value={appearance.siteTitle || 'GYST'}
                    onChange={e => updateAppearance({ siteTitle: e.target.value })}
                    className="flex-1 bg-surface2 border border-border rounded-xl px-3 py-2.5 text-sm text-text focus:outline-none focus:border-accent/60"
                    placeholder="Dashboard name"
                  />
                </div>
              </section>

              {/* Subtitle */}
              <section className="space-y-2">
                <label className="text-xs font-semibold text-muted uppercase tracking-wider">Tagline</label>
                <input
                  type="text"
                  value={appearance.siteSubtitle || ''}
                  onChange={e => updateAppearance({ siteSubtitle: e.target.value })}
                  placeholder="Get Your Stuff Together"
                  className="w-full bg-surface2 border border-border rounded-xl px-3 py-2.5 text-sm text-text focus:outline-none focus:border-accent/60 placeholder:text-muted/50"
                />
              </section>
            </>
          )}
        </div>
      </div>
    </>
  )
}
