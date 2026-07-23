import { useState } from 'react'
import { useDashboardStore } from '../../store/dashboardStore'

const ACCENT_PRESETS = [
  '#4f8ef7', '#7c3aed', '#ec4899', '#22c55e', '#f59e0b', '#ef4444',
  '#06b6d4', '#f97316', '#a3e635', '#e879f9',
]

const THEME_PRESETS = [
  { id: 'dark-default', name: 'Dark Default', bg: '#0f1117', surface: '#1a1d27', accent: '#4f8ef7' },
  { id: 'dark-deep', name: 'Deep Ocean', bg: '#070e1a', surface: '#0d1f35', accent: '#38bdf8' },
  { id: 'dark-slate', name: 'Slate', bg: '#0c0c0f', surface: '#18181b', accent: '#a78bfa' },
  { id: 'dark-forest', name: 'Forest', bg: '#0a120e', surface: '#141d18', accent: '#4ade80' },
  { id: 'dark-ember', name: 'Ember', bg: '#130a0a', surface: '#1e1010', accent: '#fb923c' },
  { id: 'dark-rose', name: 'Rose Noir', bg: '#110a10', surface: '#1c1020', accent: '#f472b6' },
]

const FONT_OPTIONS = [
  { label: 'System Default', value: 'system-ui, sans-serif' },
  { label: 'Inter', value: 'Inter, system-ui, sans-serif' },
  { label: 'Monospace', value: 'ui-monospace, Menlo, monospace' },
  { label: 'Georgia', value: 'Georgia, serif' },
]

export function CustomisePanel({ isOpen, onClose }) {
  const { state, updateAppearance } = useDashboardStore()
  const appearance = state.appearance || {}

  if (!isOpen) return null

  function setAccent(color) {
    updateAppearance({ accentColor: color })
    document.documentElement.style.setProperty('--accent', color)
  }

  function applyTheme(preset) {
    updateAppearance({
      accentColor: preset.accent,
      background: { type: 'color', value: preset.bg },
    })
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-surface border-l border-border shadow-2xl shadow-black/40 flex flex-col overflow-y-auto">
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

        <div className="flex-1 px-5 py-4 space-y-6 overflow-y-auto scrollbar-thin">
          {/* Site title */}
          <section className="space-y-2">
            <label className="text-xs font-semibold text-muted uppercase tracking-wider">Site Title</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={appearance.logoEmoji || '🛩️'}
                onChange={e => updateAppearance({ logoEmoji: e.target.value })}
                className="w-12 bg-surface2 border border-border rounded-lg text-center text-sm focus:outline-none focus:border-accent/60 py-2"
                maxLength={2}
              />
              <input
                type="text"
                value={appearance.siteTitle || 'GYST'}
                onChange={e => updateAppearance({ siteTitle: e.target.value })}
                className="flex-1 bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/60"
                placeholder="Site title"
              />
            </div>
          </section>

          {/* Accent colour */}
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

          {/* Theme presets */}
          <section className="space-y-2">
            <label className="text-xs font-semibold text-muted uppercase tracking-wider">Theme Presets</label>
            <div className="grid grid-cols-2 gap-2">
              {THEME_PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => applyTheme(preset)}
                  className="flex items-center gap-2 p-2 rounded-xl border border-border hover:border-accent/40 transition-colors text-left"
                  style={{ background: preset.bg }}
                >
                  <div className="w-4 h-4 rounded-full shrink-0" style={{ background: preset.accent }} />
                  <span className="text-xs font-medium truncate" style={{ color: '#e2e5f0' }}>
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Background */}
          <section className="space-y-2">
            <label className="text-xs font-semibold text-muted uppercase tracking-wider">Background</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={appearance.background?.value || '#0f1117'}
                onChange={e => updateAppearance({ background: { type: 'color', value: e.target.value } })}
                className="w-10 h-10 rounded-lg cursor-pointer border border-border bg-transparent"
              />
              <input
                type="text"
                value={appearance.background?.value || '#0f1117'}
                onChange={e => updateAppearance({ background: { type: 'color', value: e.target.value } })}
                className="flex-1 bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-text font-mono focus:outline-none focus:border-accent/60"
                placeholder="#0f1117"
              />
            </div>
          </section>

          {/* Font */}
          <section className="space-y-2">
            <label className="text-xs font-semibold text-muted uppercase tracking-wider">Font Family</label>
            <select
              value={appearance.fontFamily || 'system-ui, sans-serif'}
              onChange={e => updateAppearance({ fontFamily: e.target.value })}
              className="w-full bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/60"
            >
              {FONT_OPTIONS.map(f => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </section>
        </div>
      </div>
    </>
  )
}
