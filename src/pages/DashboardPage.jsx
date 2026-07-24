import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
} from '@dnd-kit/sortable'
import { useAuth } from '../hooks/useAuth'
import { applyThemeVars, hexToRgbVars } from '../utils/themeVars'
import { useDashboardStore } from '../store/dashboardStore'
import { Header } from '../components/dashboard/Header'
import { TabBar } from '../components/dashboard/TabBar'
import { CategorySection } from '../components/dashboard/CategorySection'
import { PlatformSidebar } from '../components/sidebar/PlatformSidebar'
import { CustomisePanel } from '../components/dashboard/CustomisePanel'
import { GreetingBar } from '../components/dashboard/GreetingBar'
import { SearchBar } from '../components/dashboard/SearchBar'
import { WidgetRow } from '../components/dashboard/WidgetRow'
import { WidgetGallery } from '../components/dashboard/WidgetGallery'
import { Modal } from '../components/ui/Modal'
import { getPlatformById } from '../data/platforms'
import { InfoBar } from '../components/dashboard/InfoBar'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const {
    state,
    currentTabId,
    editMode,
    sidebarOpen,
    loadFromFirestore,
    addCategory,
    reorderPlatforms,
    toggleSidebar,
    addPlatform,
    addWidget,
    removeWidget,
    updateWidget,
    reorderWidgets,
    setWidgetSize,
  } = useDashboardStore()

  const [customiseOpen, setCustomiseOpen] = useState(false)
  const [addCatOpen, setAddCatOpen] = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const [newCatIcon, setNewCatIcon] = useState('📁')
  const [activeDragId, setActiveDragId] = useState(null)
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const [widgetGalleryOpen, setWidgetGalleryOpen] = useState(false)

  // Load data when user is available
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/', { replace: true })
    }
    if (user) {
      loadFromFirestore(user.uid)
    }
  }, [user, authLoading])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const tabs = state.tabs || []
  const currentTab = tabs.find(t => t.id === (currentTabId || tabs[0]?.id)) || tabs[0]
  const categories = currentTab?.categories || []

  const appearance = state.appearance || {}

  // Apply theme, accent, font to document whenever appearance changes
  useEffect(() => {
    applyThemeVars(appearance.theme || 'dark')
  }, [appearance.theme])

  useEffect(() => {
    if (appearance.accentColor) {
      const rgb = hexToRgbVars(appearance.accentColor)
      if (rgb) document.documentElement.style.setProperty('--color-accent', rgb)
    }
  }, [appearance.accentColor])

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--font-body',
      appearance.fontFamily || 'system-ui, sans-serif'
    )
  }, [appearance.fontFamily])

  useEffect(() => {
    const customBg = appearance.background?.value
    document.body.style.background = customBg || ''
  }, [appearance.background])

  const customBgStyle = appearance.background?.value
    ? { background: appearance.background.value }
    : undefined

  function handleDragStart(event) {
    setActiveDragId(event.active.id)
    // Find which category contains this platform
    for (const cat of categories) {
      if (cat.platforms.some(p => p.id === event.active.id)) {
        setActiveCategoryId(cat.id)
        break
      }
    }
  }

  function handleDragEnd(event) {
    const { active, over } = event
    setActiveDragId(null)
    setActiveCategoryId(null)
    if (!over || active.id === over.id) return

    // Find the category that contains the active item
    for (const cat of categories) {
      const ids = cat.platforms.map(p => p.id)
      if (ids.includes(active.id) && ids.includes(over.id)) {
        const oldIndex = ids.indexOf(active.id)
        const newIndex = ids.indexOf(over.id)
        const newOrder = arrayMove(cat.platforms, oldIndex, newIndex)
        reorderPlatforms(currentTab.id, cat.id, newOrder)
        return
      }
    }
  }

  function handleAddCategory() {
    if (!newCatName.trim() || !currentTab) return
    addCategory(currentTab.id, {
      id: `cat-${Date.now()}`,
      name: newCatName.trim(),
      icon: newCatIcon,
      platforms: [],
      widgets: [],
    })
    setNewCatName('')
    setNewCatIcon('📁')
    setAddCatOpen(false)
  }

  function handleUpdateWidget(widgetId, config) {
    if (!currentTab) return
    updateWidget(currentTab.id, widgetId, config)
  }

  // Toggle a widget type on/off for the current tab
  function handleWidgetToggle(type, config) {
    if (!currentTab) return
    const existing = (currentTab.widgets || []).find(w => w.type === type)
    if (existing) {
      removeWidget(currentTab.id, existing.id)
    } else {
      addWidget(currentTab.id, {
        id: `w-${type}-${Date.now()}`,
        type,
        ...(config ? { config } : {}),
      })
    }
  }

  // Find dragged platform for overlay
  const draggedPlatform = activeDragId
    ? categories.flatMap(c => c.platforms).find(p => p.id === activeDragId)
    : null

  if (authLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-muted text-sm animate-pulse">Loading your dashboard…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg" style={customBgStyle}>
      {/* Fixed header */}
      <Header onOpenCustomise={() => setCustomiseOpen(true)} />

      {/* Fixed tab bar */}
      <TabBar />

      {/* Main content — offset for fixed header (56px) + tab bar (44px) */}
      <main
        className="pt-[100px] transition-all duration-200"
        style={{ paddingRight: sidebarOpen ? '288px' : '0' }}
      >
        <div className="max-w-screen-2xl mx-auto pb-16 pt-2">
          <GreetingBar user={user} />
          <InfoBar />
          <SearchBar />

          <WidgetRow
            tabId={currentTab?.id}
            widgets={currentTab?.widgets || []}
            onManage={() => setWidgetGalleryOpen(true)}
            onRemoveWidget={(wid) => removeWidget(currentTab.id, wid)}
            onUpdateWidget={handleUpdateWidget}
            onReorderWidgets={(ws) => currentTab && reorderWidgets(currentTab.id, ws)}
            onResizeWidget={(wid, size) => currentTab && setWidgetSize(currentTab.id, wid, size)}
          />

          {/* Categories */}
          <div className="px-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div className="space-y-8">
                {categories.map(category => (
                  <CategorySection
                    key={category.id}
                    category={category}
                    tabId={currentTab?.id}
                    allCategories={categories}
                    onAddPlatform={() => toggleSidebar()}
                    compact={appearance.linkLayout === 'compact'}
                  />
                ))}

                {/* Add category button */}
                {currentTab && (
                  <button
                    onClick={() => setAddCatOpen(true)}
                    className="flex items-center gap-2 px-4 py-3 border border-dashed border-border rounded-xl text-muted hover:text-accent hover:border-accent/40 hover:bg-surface/40 transition-all text-sm"
                  >
                    <span className="text-lg">+</span>
                    Add a Category
                  </button>
                )}

                {categories.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="text-5xl mb-4">📂</div>
                    <h3 className="text-lg font-semibold text-text mb-2">
                      This tab is empty
                    </h3>
                    <p className="text-sm text-muted mb-6 max-w-xs">
                      Add a category to start organising your platforms, or browse the library to add links.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setAddCatOpen(true)}
                        className="px-4 py-2 bg-accent text-white rounded-lg text-sm hover:opacity-90"
                      >
                        + Add Category
                      </button>
                      <button
                        onClick={toggleSidebar}
                        className="px-4 py-2 border border-border text-muted rounded-lg text-sm hover:text-text hover:border-accent/40"
                      >
                        Browse Library
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Drag overlay */}
              <DragOverlay>
                {draggedPlatform && (
                  <div className="bg-surface border border-accent/50 rounded-xl p-3 shadow-2xl shadow-black/40 opacity-90 w-28">
                    <div className="text-2xl">{draggedPlatform.emoji}</div>
                    <div className="text-xs font-semibold text-text mt-1 truncate">{draggedPlatform.name}</div>
                  </div>
                )}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </main>

      {/* Platform sidebar */}
      <PlatformSidebar />

      {/* Customise panel */}
      <CustomisePanel
        isOpen={customiseOpen}
        onClose={() => setCustomiseOpen(false)}
      />

      {/* Widget gallery modal */}
      <WidgetGallery
        isOpen={widgetGalleryOpen}
        onClose={() => setWidgetGalleryOpen(false)}
        activeWidgets={currentTab?.widgets || []}
        onToggle={handleWidgetToggle}
      />

      {/* Add category modal */}
      <Modal
        isOpen={addCatOpen}
        onClose={() => setAddCatOpen(false)}
        title="Add Category"
      >
        <div className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={newCatIcon}
              onChange={e => setNewCatIcon(e.target.value)}
              className="w-12 bg-surface2 border border-border rounded-lg text-center text-lg focus:outline-none focus:border-accent/60 py-2.5"
              maxLength={2}
              placeholder="📁"
            />
            <input
              type="text"
              value={newCatName}
              onChange={e => setNewCatName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleAddCategory() }}
              autoFocus
              placeholder="Category name…"
              className="flex-1 bg-surface2 border border-border rounded-lg px-3 py-2.5 text-sm text-text focus:outline-none focus:border-accent/60"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setAddCatOpen(false)}
              className="px-4 py-2 text-sm border border-border text-muted rounded-lg hover:text-text"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCategory}
              disabled={!newCatName.trim()}
              className="px-4 py-2 text-sm bg-accent text-white rounded-lg hover:opacity-90 disabled:opacity-40"
            >
              Add Category
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
