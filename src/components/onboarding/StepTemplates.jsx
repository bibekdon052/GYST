import { useState } from 'react'
import { TAB_TEMPLATES, CATEGORY_TEMPLATES } from '../../data/tabTemplates'

function countPlatforms(template) {
  return template.categories.reduce((n, c) => n + c.platformIds.length, 0)
}

export function StepTemplates({ selectedIds, onToggle, onDone, onBack, loading }) {
  const [mode, setMode] = useState('tabs') // 'tabs' | 'categories'
  const count = selectedIds.size

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <div className="text-4xl mb-2">🎯</div>
        <h2 className="text-xl font-bold text-text">Start with a template</h2>
        <p className="text-sm text-muted mt-1">
          Pick pre-built tabs to populate your dashboard. You can always add more later.
        </p>
      </div>

      {/* Mode switcher */}
      <div className="flex gap-1 bg-surface2 rounded-xl p-1">
        <button
          onClick={() => setMode('tabs')}
          className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            mode === 'tabs' ? 'bg-accent text-white shadow-sm' : 'text-muted hover:text-text'
          }`}
        >
          Full Tabs
        </button>
        <button
          onClick={() => setMode('categories')}
          className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            mode === 'categories' ? 'bg-accent text-white shadow-sm' : 'text-muted hover:text-text'
          }`}
        >
          Category Packs
        </button>
      </div>

      {mode === 'tabs' ? (
        <div className="overflow-y-auto space-y-2 pr-0.5" style={{ maxHeight: '38vh', scrollbarWidth: 'thin' }}>
          {TAB_TEMPLATES.map(template => {
            const isSelected = selectedIds.has(template.id)
            return (
              <div
                key={template.id}
                onClick={() => onToggle(template.id)}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-accent/60 bg-accent/5'
                    : 'border-border bg-surface2 hover:border-accent/30'
                }`}
              >
                {/* Icon */}
                <div className={`w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center text-lg shadow-sm`}>
                  {template.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text">{template.name}</p>
                  <p className="text-[11px] text-muted leading-snug">{template.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {template.categories.slice(0, 4).map(cat => (
                      <span
                        key={cat.name}
                        className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-surface border border-border rounded-full text-[10px] text-muted"
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </span>
                    ))}
                    {template.categories.length > 4 && (
                      <span className="text-[10px] text-muted/60 px-1 py-0.5">
                        +{template.categories.length - 4} more
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-muted/60 mt-1">
                    {template.categories.length} categories · {countPlatforms(template)} links
                  </p>
                </div>

                {/* Checkbox */}
                <div
                  className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all mt-0.5 ${
                    isSelected
                      ? 'bg-accent border-accent text-white'
                      : 'border-border'
                  }`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="py-6 text-center">
          <div className="text-2xl mb-2">📁</div>
          <p className="text-sm text-muted max-w-xs mx-auto">
            Category packs can be added from the dashboard once you're set up. Check out the Template Library in your dashboard.
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm text-muted border border-border rounded-lg hover:text-text hover:border-accent/40 transition-colors"
        >
          Back
        </button>

        <button
          onClick={onDone}
          disabled={loading}
          className="px-5 py-2 text-sm bg-accent text-white rounded-lg hover:opacity-90 disabled:opacity-60 transition-opacity font-semibold"
        >
          {loading
            ? 'Setting up…'
            : count > 0
              ? `Get Started with ${count} tab${count > 1 ? 's' : ''} 🚀`
              : 'Skip & Go to Dashboard 🚀'
          }
        </button>
      </div>
    </div>
  )
}
