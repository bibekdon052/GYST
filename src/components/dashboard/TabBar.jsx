import { useState } from 'react'
import { useDashboardStore } from '../../store/dashboardStore'
import { RecycleBin } from './RecycleBin'
import { TabTemplateGallery } from './TabTemplateGallery'

export function TabBar() {
  const { state, currentTabId, setCurrentTab, addTab, removeTab, editMode } = useDashboardStore()
  const [adding, setAdding] = useState(false)
  const [newTabName, setNewTabName] = useState('')
  const [newTabIcon, setNewTabIcon] = useState('📁')
  const [confirmDelete, setConfirmDelete] = useState(null) // tab to confirm deletion

  const [galleryOpen, setGalleryOpen] = useState(false)

  const tabs = state.tabs || []

  function handleAddTab() {
    if (!newTabName.trim()) return
    addTab({
      id: `tab-${Date.now()}`,
      name: newTabName.trim(),
      icon: newTabIcon,
      categories: [],
    })
    setNewTabName('')
    setNewTabIcon('📁')
    setAdding(false)
  }

  return (
    <div className="fixed top-14 left-0 right-0 z-30 h-11 bg-bg/90 backdrop-blur-md border-b border-border flex items-center px-4 gap-1 overflow-x-auto scrollbar-thin">
      {tabs.map(tab => {
        const isActive = tab.id === (currentTabId || tabs[0]?.id)
        return (
          <div key={tab.id} className="relative group shrink-0">
            <button
              onClick={() => setCurrentTab(tab.id)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                ${isActive
                  ? 'bg-accent text-white shadow-sm shadow-accent/30'
                  : 'text-muted hover:text-text hover:bg-surface2'}
              `}
            >
              <span className="text-base leading-none">{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
            {editMode && tabs.length > 1 && (
              <button
                onClick={() => setConfirmDelete(tab)}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                title="Remove tab"
              >
                ×
              </button>
            )}
          </div>
        )
      })}

      {/* Add tab */}
      {editMode && !adding && (
        <>
          <button
            onClick={() => setAdding(true)}
            className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-muted hover:text-accent hover:bg-surface2 border border-dashed border-border transition-colors"
          >
            + Tab
          </button>
          <button
            onClick={() => setGalleryOpen(true)}
            className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-muted hover:text-accent hover:bg-surface2 border border-dashed border-border transition-colors"
            title="Browse tab & category templates"
          >
            📋 Templates
          </button>
        </>
      )}

      {adding && (
        <div className="flex items-center gap-1.5 shrink-0">
          <input
            type="text"
            value={newTabIcon}
            onChange={e => setNewTabIcon(e.target.value)}
            className="w-9 bg-surface2 border border-border rounded-lg text-center text-sm focus:outline-none focus:border-accent/60 py-1"
            placeholder="📁"
            maxLength={2}
          />
          <input
            type="text"
            value={newTabName}
            onChange={e => setNewTabName(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleAddTab()
              if (e.key === 'Escape') setAdding(false)
            }}
            autoFocus
            placeholder="Tab name…"
            className="w-28 bg-surface2 border border-border rounded-lg px-2 py-1 text-sm text-text focus:outline-none focus:border-accent/60"
          />
          <button
            onClick={handleAddTab}
            className="px-2 py-1 bg-accent text-white text-xs rounded-lg"
          >
            Add
          </button>
          <button
            onClick={() => setAdding(false)}
            className="px-2 py-1 text-muted text-xs hover:text-text"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Recycle bin button — shown in edit mode when there are deleted tabs */}
      {editMode && (state.deletedTabs?.length > 0) && (
        <RecycleBinButton />
      )}

      {/* Template gallery modal */}
      <TabTemplateGallery isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} />

      {/* Confirmation dialog */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-surface border border-border rounded-2xl p-6 w-80 shadow-2xl">
            <div className="text-3xl mb-3 text-center">🗑️</div>
            <h3 className="text-base font-semibold text-text text-center mb-1">
              Delete "{confirmDelete.name}"?
            </h3>
            <p className="text-xs text-muted text-center mb-5">
              This tab and its {confirmDelete.categories?.reduce((n, c) => n + (c.platforms?.length || 0), 0) || 0} links will be moved to the recycle bin. You can restore it any time.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2 text-sm border border-border text-muted rounded-xl hover:text-text transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { removeTab(confirmDelete.id); setConfirmDelete(null) }}
                className="flex-1 py-2 text-sm bg-danger text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                Move to Bin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function RecycleBinButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-muted hover:text-danger hover:bg-danger/10 border border-dashed border-border transition-colors ml-auto"
        title="Recycle bin"
      >
        🗑️
      </button>
      <RecycleBin isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
