import { create } from 'zustand'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import { ALL_PLATFORMS, getPlatformById } from '../data/platforms'
import { TEMPLATES } from '../data/templates'
import { NEWS_FEEDS } from '../data/newsFeeds'

// ─── Default appearance ─────────────────────────────────
const DEFAULT_APPEARANCE = {
  accentColor: '#4f8ef7',
  fontFamily: 'system-ui, sans-serif',
  siteTitle: 'GYST',
  siteSubtitle: 'Get Your Stuff Together',
  logoEmoji: '🛩️',
  background: { type: 'color', value: '' },
  theme: 'dark',
  linkLayout: 'grid', // 'grid' | 'compact'
  displayName: '',   // greeting name override
}

// ─── Default tab-level widgets ──────────────────────────
const DEFAULT_TAB_WIDGETS = () => [
  { id: 'w-clock',   type: 'clock' },
  { id: 'w-weather', type: 'weather' },
  {
    id: 'w-news',
    type: 'news',
    config: { feedUrl: NEWS_FEEDS[0].url, feedName: NEWS_FEEDS[0].name },
  },
  { id: 'w-quote', type: 'quote' },
]

// ─── Build initial state from template ──────────────────
export function buildStateFromTemplate(templateId) {
  const template = TEMPLATES.find(t => t.id === templateId)
  if (!template) return buildDefaultState()

  const tabs = template.tabs.map(tab => ({
    id: tab.id,
    name: tab.name,
    icon: tab.icon,
    widgets: DEFAULT_TAB_WIDGETS(),
    categories: tab.categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      icon: cat.icon || '📁',
      platforms: cat.platformIds
        .map(pid => getPlatformById(pid))
        .filter(Boolean),
      widgets: [],
    })),
  }))

  return {
    tabs,
    appearance: { ...DEFAULT_APPEARANCE },
  }
}

function buildDefaultState() {
  return {
    tabs: [
      {
        id: 'home',
        name: 'Home',
        icon: '🏠',
        widgets: DEFAULT_TAB_WIDGETS(),
        categories: [
          {
            id: 'cat-essentials',
            name: 'Essentials',
            icon: '⭐',
            platforms: [
              getPlatformById('gmail'),
              getPlatformById('google-calendar'),
              getPlatformById('mygov'),
            ].filter(Boolean),
            widgets: [],
          },
        ],
      },
    ],
    appearance: { ...DEFAULT_APPEARANCE },
  }
}

// ─── Zustand store ──────────────────────────────────────
export const useDashboardStore = create((set, get) => ({
  // State from Firestore
  state: buildDefaultState(),

  // UI state
  currentTabId: null,
  editMode: false,
  sidebarOpen: false,
  onboardingComplete: false,
  saveStatus: 'saved', // 'saved' | 'saving' | 'error'
  uid: null,

  // ─── Computed helpers ──────────────────────────────────
  getCurrentTab() {
    const { state, currentTabId } = get()
    if (!state.tabs.length) return null
    return (
      state.tabs.find(t => t.id === currentTabId) || state.tabs[0]
    )
  },

  // ─── Actions ───────────────────────────────────────────
  setUid(uid) {
    set({ uid })
  },

  setCurrentTab(tabId) {
    set({ currentTabId: tabId })
  },

  toggleEditMode() {
    set(s => ({ editMode: !s.editMode }))
  },

  toggleSidebar() {
    set(s => ({ sidebarOpen: !s.sidebarOpen }))
  },

  setOnboardingComplete(val) {
    set({ onboardingComplete: val })
  },

  updateState(newState) {
    set({ state: newState })
  },

  // ─── Platform mutations ────────────────────────────────
  addPlatform(tabId, categoryId, platform) {
    set(s => {
      const tabs = s.state.tabs.map(tab => {
        if (tab.id !== tabId) return tab
        return {
          ...tab,
          categories: tab.categories.map(cat => {
            if (cat.id !== categoryId) return cat
            // Avoid duplicates
            if (cat.platforms.some(p => p.id === platform.id)) return cat
            return { ...cat, platforms: [...cat.platforms, platform] }
          }),
        }
      })
      return { state: { ...s.state, tabs } }
    })
    get().saveToFirestore()
  },

  removePlatform(tabId, categoryId, platformId) {
    set(s => {
      const tabs = s.state.tabs.map(tab => {
        if (tab.id !== tabId) return tab
        return {
          ...tab,
          categories: tab.categories.map(cat => {
            if (cat.id !== categoryId) return cat
            return { ...cat, platforms: cat.platforms.filter(p => p.id !== platformId) }
          }),
        }
      })
      return { state: { ...s.state, tabs } }
    })
    get().saveToFirestore()
  },

  reorderPlatforms(tabId, categoryId, platforms) {
    set(s => {
      const tabs = s.state.tabs.map(tab => {
        if (tab.id !== tabId) return tab
        return {
          ...tab,
          categories: tab.categories.map(cat => {
            if (cat.id !== categoryId) return cat
            return { ...cat, platforms }
          }),
        }
      })
      return { state: { ...s.state, tabs } }
    })
    get().saveToFirestore()
  },

  // ─── Category mutations ────────────────────────────────
  addCategory(tabId, category) {
    set(s => {
      const tabs = s.state.tabs.map(tab => {
        if (tab.id !== tabId) return tab
        return { ...tab, categories: [...tab.categories, category] }
      })
      return { state: { ...s.state, tabs } }
    })
    get().saveToFirestore()
  },

  removeCategory(tabId, categoryId) {
    set(s => {
      const tabs = s.state.tabs.map(tab => {
        if (tab.id !== tabId) return tab
        return { ...tab, categories: tab.categories.filter(c => c.id !== categoryId) }
      })
      return { state: { ...s.state, tabs } }
    })
    get().saveToFirestore()
  },

  renameCategory(tabId, categoryId, name, icon) {
    set(s => {
      const tabs = s.state.tabs.map(tab => {
        if (tab.id !== tabId) return tab
        return {
          ...tab,
          categories: tab.categories.map(cat => {
            if (cat.id !== categoryId) return cat
            return { ...cat, name: name ?? cat.name, icon: icon ?? cat.icon }
          }),
        }
      })
      return { state: { ...s.state, tabs } }
    })
    get().saveToFirestore()
  },

  reorderCategories(tabId, categories) {
    set(s => {
      const tabs = s.state.tabs.map(tab => {
        if (tab.id !== tabId) return tab
        return { ...tab, categories }
      })
      return { state: { ...s.state, tabs } }
    })
    get().saveToFirestore()
  },

  // ─── Tab mutations ─────────────────────────────────────
  addTab(tab) {
    set(s => ({ state: { ...s.state, tabs: [...s.state.tabs, tab] } }))
    get().saveToFirestore()
  },

  removeTab(tabId) {
    set(s => {
      const tab = s.state.tabs.find(t => t.id === tabId)
      if (!tab) return s
      const deletedTabs = [
        { ...tab, deletedAt: Date.now() },
        ...(s.state.deletedTabs || []),
      ].slice(0, 20) // keep last 20 deleted tabs
      return {
        state: {
          ...s.state,
          tabs: s.state.tabs.filter(t => t.id !== tabId),
          deletedTabs,
        },
        currentTabId: s.currentTabId === tabId
          ? (s.state.tabs.find(t => t.id !== tabId)?.id || null)
          : s.currentTabId,
      }
    })
    get().saveToFirestore()
  },

  restoreTab(tabId) {
    set(s => {
      const tab = (s.state.deletedTabs || []).find(t => t.id === tabId)
      if (!tab) return s
      const { deletedAt, ...restored } = tab
      return {
        state: {
          ...s.state,
          tabs: [...s.state.tabs, restored],
          deletedTabs: (s.state.deletedTabs || []).filter(t => t.id !== tabId),
        },
      }
    })
    get().saveToFirestore()
  },

  permanentlyDeleteTab(tabId) {
    set(s => ({
      state: {
        ...s.state,
        deletedTabs: (s.state.deletedTabs || []).filter(t => t.id !== tabId),
      },
    }))
    get().saveToFirestore()
  },

  // ─── Appearance ────────────────────────────────────────
  updateAppearance(updates) {
    set(s => ({
      state: {
        ...s.state,
        appearance: { ...s.state.appearance, ...updates },
      },
    }))
    get().saveToFirestore()
  },

  // ─── Tab-level widget mutations ────────────────────────
  addWidget(tabId, widget) {
    set(s => {
      const tabs = s.state.tabs.map(tab => {
        if (tab.id !== tabId) return tab
        const existing = tab.widgets || []
        return { ...tab, widgets: [...existing, widget] }
      })
      return { state: { ...s.state, tabs } }
    })
    get().saveToFirestore()
  },

  removeWidget(tabId, widgetId) {
    set(s => {
      const tabs = s.state.tabs.map(tab => {
        if (tab.id !== tabId) return tab
        return { ...tab, widgets: (tab.widgets || []).filter(w => w.id !== widgetId) }
      })
      return { state: { ...s.state, tabs } }
    })
    get().saveToFirestore()
  },

  updateWidget(tabId, widgetId, config) {
    set(s => {
      const tabs = s.state.tabs.map(tab => {
        if (tab.id !== tabId) return tab
        return {
          ...tab,
          widgets: (tab.widgets || []).map(w =>
            w.id === widgetId ? { ...w, config: { ...(w.config || {}), ...config } } : w
          ),
        }
      })
      return { state: { ...s.state, tabs } }
    })
    get().saveToFirestore()
  },

  // Move a platform from one category to another within the same tab
  movePlatform(tabId, fromCatId, toCatId, platformId) {
    set(s => {
      let movedPlatform = null
      const tabs = s.state.tabs.map(tab => {
        if (tab.id !== tabId) return tab
        // Extract the platform from the source category
        const categories = tab.categories.map(cat => {
          if (cat.id === fromCatId) {
            movedPlatform = cat.platforms.find(p => p.id === platformId) || movedPlatform
            return { ...cat, platforms: cat.platforms.filter(p => p.id !== platformId) }
          }
          return cat
        })
        // Add it to the destination category
        return {
          ...tab,
          categories: categories.map(cat => {
            if (cat.id === toCatId && movedPlatform) {
              if (cat.platforms.some(p => p.id === platformId)) return cat
              return { ...cat, platforms: [...cat.platforms, movedPlatform] }
            }
            return cat
          }),
        }
      })
      return { state: { ...s.state, tabs } }
    })
    get().saveToFirestore()
  },

  // Reorder widgets within a tab
  reorderWidgets(tabId, widgets) {
    set(s => {
      const tabs = s.state.tabs.map(tab => {
        if (tab.id !== tabId) return tab
        return { ...tab, widgets }
      })
      return { state: { ...s.state, tabs } }
    })
    get().saveToFirestore()
  },

  // Set a widget's column size override
  setWidgetSize(tabId, widgetId, size) {
    set(s => {
      const tabs = s.state.tabs.map(tab => {
        if (tab.id !== tabId) return tab
        return {
          ...tab,
          widgets: (tab.widgets || []).map(w =>
            w.id === widgetId ? { ...w, size } : w
          ),
        }
      })
      return { state: { ...s.state, tabs } }
    })
    get().saveToFirestore()
  },

  // ─── Category-level widget mutations ──────────────────
  addCategoryWidget(tabId, categoryId, widget) {
    set(s => {
      const tabs = s.state.tabs.map(tab => {
        if (tab.id !== tabId) return tab
        return {
          ...tab,
          categories: tab.categories.map(cat => {
            if (cat.id !== categoryId) return cat
            return { ...cat, widgets: [...(cat.widgets || []), widget] }
          }),
        }
      })
      return { state: { ...s.state, tabs } }
    })
    get().saveToFirestore()
  },

  removeCategoryWidget(tabId, categoryId, widgetId) {
    set(s => {
      const tabs = s.state.tabs.map(tab => {
        if (tab.id !== tabId) return tab
        return {
          ...tab,
          categories: tab.categories.map(cat => {
            if (cat.id !== categoryId) return cat
            return { ...cat, widgets: (cat.widgets || []).filter(w => w.id !== widgetId) }
          }),
        }
      })
      return { state: { ...s.state, tabs } }
    })
    get().saveToFirestore()
  },

  // ─── Template-based additions ─────────────────────────
  addTabFromTemplate(template) {
    const newTab = {
      id: `tab-${Date.now()}`,
      name: template.name,
      icon: template.icon,
      widgets: DEFAULT_TAB_WIDGETS(),
      categories: template.categories.map((cat, i) => ({
        id: `cat-${Date.now()}-${i}`,
        name: cat.name,
        icon: cat.icon,
        platforms: cat.platformIds.map(pid => getPlatformById(pid)).filter(Boolean),
        widgets: [],
      })),
    }
    set(s => ({ state: { ...s.state, tabs: [...s.state.tabs, newTab] } }))
    get().saveToFirestore()
  },

  addCategoryFromTemplate(tabId, categoryTemplate) {
    const newCat = {
      id: `cat-${Date.now()}`,
      name: categoryTemplate.name,
      icon: categoryTemplate.icon,
      platforms: categoryTemplate.platformIds.map(pid => getPlatformById(pid)).filter(Boolean),
      widgets: [],
    }
    set(s => {
      const tabs = s.state.tabs.map(tab => {
        if (tab.id !== tabId) return tab
        // Skip if category name already exists
        if (tab.categories.some(c => c.name.toLowerCase() === categoryTemplate.name.toLowerCase())) return tab
        return { ...tab, categories: [...tab.categories, newCat] }
      })
      return { state: { ...s.state, tabs } }
    })
    get().saveToFirestore()
  },

  // ─── Reset to default ──────────────────────────────────
  async resetConfig() {
    const { uid } = get()
    const defaultState = buildDefaultState()
    set({
      state: defaultState,
      onboardingComplete: false,
      currentTabId: defaultState.tabs[0]?.id || null,
    })
    if (uid) {
      try {
        await setDoc(
          doc(db, 'users', uid),
          {
            state: JSON.stringify(defaultState),
            onboardingComplete: false,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        )
      } catch (err) {
        console.error('Failed to reset config:', err)
      }
    }
  },

  // ─── Export / Import config ────────────────────────────
  exportConfig() {
    const { state } = get()
    const json = JSON.stringify(state, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const date = new Date().toLocaleDateString('en-AU').replace(/\//g, '-')
    a.download = `gyst-config-${date}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 2000)
  },

  importConfig(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const parsed = JSON.parse(e.target.result)
          if (!parsed.tabs) throw new Error('Invalid config file')
          const { uid } = get()
          set({ state: parsed })
          if (uid) {
            await setDoc(
              doc(db, 'users', uid),
              {
                state: JSON.stringify(parsed),
                updatedAt: serverTimestamp(),
              },
              { merge: true }
            )
          }
          resolve()
        } catch (err) {
          reject(err)
        }
      }
      reader.onerror = () => reject(new Error('File read error'))
      reader.readAsText(file)
    })
  },

  // ─── Firestore persistence ─────────────────────────────
  async loadFromFirestore(uid) {
    set({ uid })
    try {
      const snap = await getDoc(doc(db, 'users', uid))
      if (snap.exists()) {
        const data = snap.data()
        const loaded = typeof data.state === 'string'
          ? JSON.parse(data.state)
          : data.state
        set({
          state: loaded || buildDefaultState(),
          onboardingComplete: data.onboardingComplete || false,
          currentTabId: loaded?.tabs?.[0]?.id || null,
        })
      } else {
        set({ currentTabId: get().state.tabs[0]?.id || null })
      }
    } catch (err) {
      console.error('Failed to load from Firestore:', err)
    }
  },

  async saveToFirestore() {
    const { uid, state } = get()
    if (!uid) return

    set({ saveStatus: 'saving' })
    try {
      await setDoc(
        doc(db, 'users', uid),
        {
          state: JSON.stringify(state),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      )
      set({ saveStatus: 'saved' })
    } catch (err) {
      console.error('Failed to save to Firestore:', err)
      set({ saveStatus: 'error' })
    }
  },

  async completeOnboarding(uid, templateId, additionalTabTemplates = []) {
    const newState = buildStateFromTemplate(templateId)

    // Merge any templates the user selected during onboarding
    const now = Date.now()
    const extraTabs = additionalTabTemplates.map((tmpl, idx) => ({
      id: `tab-tmpl-${now}-${idx}`,
      name: tmpl.name,
      icon: tmpl.icon,
      widgets: DEFAULT_TAB_WIDGETS(),
      categories: tmpl.categories.map((cat, ci) => ({
        id: `cat-tmpl-${now}-${idx}-${ci}`,
        name: cat.name,
        icon: cat.icon,
        platforms: cat.platformIds.map(pid => getPlatformById(pid)).filter(Boolean),
        widgets: [],
      })),
    }))

    const finalState = extraTabs.length
      ? { ...newState, tabs: [...newState.tabs, ...extraTabs] }
      : newState

    set({
      state: finalState,
      onboardingComplete: true,
      currentTabId: finalState.tabs[0]?.id || null,
    })
    try {
      await setDoc(
        doc(db, 'users', uid),
        {
          state: JSON.stringify(finalState),
          onboardingComplete: true,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      )
    } catch (err) {
      console.error('Failed to save onboarding state:', err)
    }
  },
}))
