import { useState } from 'react'
import { useDashboardStore } from '../../store/dashboardStore'
import { TAB_TEMPLATES, CATEGORY_TEMPLATES } from '../../data/tabTemplates'
import { Modal } from '../ui/Modal'

export function TabTemplateGallery({ isOpen, onClose }) {
  const [mode, setMode] = useState('tabs') // 'tabs' | 'categories'
  const [added, setAdded] = useState(new Set())
  const { state, currentTabId, addTabFromTemplate, addCategoryFromTemplate } = useDashboardStore()

  const existingTabNames = new Set((state.tabs || []).map(t => t.name.toLowerCase()))
  const activeTabId = currentTabId || state.tabs?.[0]?.id

  function handleAddTab(template) {
    addTabFromTemplate(template)
    setAdded(prev => new Set(prev).add(template.id))
  }

  function handleAddCategory(catTemplate) {
    if (!activeTabId) return
    addCategoryFromTemplate(activeTabId, catTemplate)
    setAdded(prev => new Set(prev).add(catTemplate.id))
  }

  function countPlatforms(template) {
    return template.categories.reduce((n, c) => n + c.platformIds.length, 0)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="📋 Template Library" width="max-w-2xl">
      {/* Mode switcher */}
      <div className="flex gap-1 bg-surface2 rounded-xl p-1 mb-5">
        <button
          onClick={() => setMode('tabs')}
          className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            mode === 'tabs'
              ? 'bg-accent text-white shadow-sm'
              : 'text-muted hover:text-text'
          }`}
        >
          Full Tabs
        </button>
        <button
          onClick={() => setMode('categories')}
          className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            mode === 'categories'
              ? 'bg-accent text-white shadow-sm'
              : 'text-muted hover:text-text'
          }`}
        >
          Add a Category
        </button>
      </div>

      {mode === 'tabs' ? (
        <>
          <p className="text-xs text-muted mb-4">
            Each template adds a fully populated tab with Australian-relevant links ready to go.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
            {TAB_TEMPLATES.map(template => {
              const alreadyAdded = added.has(template.id) || existingTabNames.has(template.name.toLowerCase())
              return (
                <div
                  key={template.id}
                  className="flex flex-col gap-3 p-4 bg-surface2 border border-border rounded-xl hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center text-xl shadow-sm`}>
                      {template.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-text">{template.name}</p>
                      <p className="text-xs text-muted leading-relaxed">{template.description}</p>
                    </div>
                  </div>

                  {/* Category preview */}
                  <div className="flex flex-wrap gap-1">
                    {template.categories.map(cat => (
                      <span
                        key={cat.name}
                        className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-surface border border-border rounded-full text-[11px] text-muted"
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted/60">
                      {template.categories.length} categories · {countPlatforms(template)} links
                    </span>
                    <button
                      onClick={() => !alreadyAdded && handleAddTab(template)}
                      disabled={alreadyAdded}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        alreadyAdded
                          ? 'bg-surface border border-border text-muted cursor-default'
                          : 'bg-accent text-white hover:opacity-90'
                      }`}
                    >
                      {alreadyAdded ? '✓ Added' : '+ Add Tab'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <>
          <p className="text-xs text-muted mb-4">
            Add a pre-built category to your current tab. Links are already loaded and ready.
          </p>
          {!activeTabId ? (
            <div className="py-10 text-center text-sm text-muted">No tab selected.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
              {CATEGORY_TEMPLATES.map(cat => {
                const wasAdded = added.has(cat.id)
                return (
                  <div
                    key={cat.id}
                    className="flex items-center gap-3 p-3 bg-surface2 border border-border rounded-xl hover:border-accent/40 transition-colors"
                  >
                    <div className="w-9 h-9 shrink-0 rounded-xl bg-surface border border-border flex items-center justify-center text-lg">
                      {cat.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text">{cat.name}</p>
                      <p className="text-xs text-muted">{cat.description} · {cat.platformIds.length} links</p>
                    </div>
                    <button
                      onClick={() => !wasAdded && handleAddCategory(cat)}
                      disabled={wasAdded}
                      className={`shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        wasAdded
                          ? 'bg-surface border border-border text-muted cursor-default'
                          : 'bg-accent text-white hover:opacity-90'
                      }`}
                    >
                      {wasAdded ? '✓ Added' : 'Add'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </Modal>
  )
}
