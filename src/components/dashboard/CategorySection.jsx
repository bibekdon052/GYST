import { useState } from 'react'
import {
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { useDashboardStore } from '../../store/dashboardStore'
import { PlatformCard } from './PlatformCard'

export function CategorySection({ category, tabId, allCategories = [], onAddPlatform, compact = false }) {
  const { editMode, removePlatform, renameCategory, removeCategory, movePlatform } = useDashboardStore()
  const otherCategories = allCategories.filter(c => c.id !== category.id)
  const [renaming, setRenaming] = useState(false)
  const [draftName, setDraftName] = useState(category.name)
  const [draftIcon, setDraftIcon] = useState(category.icon || '📁')

  function saveRename() {
    renameCategory(tabId, category.id, draftName, draftIcon)
    setRenaming(false)
  }

  return (
    <div className="space-y-3">
      {/* Category header */}
      <div className="flex items-center gap-2 group">
        {renaming ? (
          <div className="flex items-center gap-1.5 flex-1">
            <input
              value={draftIcon}
              onChange={e => setDraftIcon(e.target.value)}
              className="w-9 bg-surface2 border border-border rounded-lg text-center text-sm focus:outline-none focus:border-accent/60 py-1"
              maxLength={2}
            />
            <input
              value={draftName}
              onChange={e => setDraftName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') saveRename()
                if (e.key === 'Escape') setRenaming(false)
              }}
              autoFocus
              className="flex-1 bg-surface2 border border-border rounded-lg px-2 py-1 text-sm text-text focus:outline-none focus:border-accent/60"
            />
            <button onClick={saveRename} className="px-2 py-1 bg-accent text-white text-xs rounded-lg">Save</button>
            <button onClick={() => setRenaming(false)} className="px-2 py-1 text-muted text-xs hover:text-text">Cancel</button>
          </div>
        ) : (
          <>
            <span className="text-base">{category.icon || '📁'}</span>
            <h3 className="text-sm font-semibold text-text">{category.name}</h3>
            {editMode && (
              <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => { setDraftName(category.name); setDraftIcon(category.icon || '📁'); setRenaming(true) }}
                  className="text-xs text-muted hover:text-accent px-2 py-1 rounded-lg hover:bg-surface2 transition-colors"
                >
                  Rename
                </button>
                <button
                  onClick={() => removeCategory(tabId, category.id)}
                  className="text-xs text-danger px-2 py-1 rounded-lg hover:bg-danger/10 transition-colors"
                >
                  Remove
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Platform grid */}
      <SortableContext
        items={category.platforms.map(p => p.id)}
        strategy={rectSortingStrategy}
      >
        <div className={compact
          ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-1.5'
          : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5'
        }>
          {category.platforms.map(platform => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              editMode={editMode}
              tabId={tabId}
              categoryId={category.id}
              compact={compact}
              otherCategories={otherCategories}
              onRemove={() => removePlatform(tabId, category.id, platform.id)}
              onMove={(toCatId) => movePlatform(tabId, category.id, toCatId, platform.id)}
            />
          ))}

          {/* Add platform button */}
          <button
            onClick={() => onAddPlatform(tabId, category.id)}
            className="bg-surface border border-dashed border-border rounded-xl p-3 flex flex-col items-center justify-center gap-1 text-muted hover:text-accent hover:border-accent/40 hover:bg-surface2 transition-all cursor-pointer min-h-[72px]"
          >
            <span className="text-lg">+</span>
            <span className="text-[10px]">Add</span>
          </button>
        </div>
      </SortableContext>
    </div>
  )
}
