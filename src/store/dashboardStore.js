import { create } from 'zustand'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import { ALL_PLATFORMS, getPlatformById } from '../data/platforms'
import { TEMPLATES } from '../data/templates'

// ─── Default appearance ─────────────────────────────────
const DEFAULT_APPEARANCE = {
  accentColor: '#4f8ef7',
  fontFamily: 'system-ui, sans-serif',
  siteTitle: 'GYST',
  siteSubtitle: 'Get Your Stuff Together',
  logoEmoji: '🛩️',
  background: { type: 'color', value: '#0f1117' },
  theme: 'dark',
}

// ─── Build initial state from template ──────────────────
export function buildStateFromTemplate(templateId) {
  const template = TEMPLATES.find(t => t.id === templateId)
  if (!template) return buildDefaultState()

  const tabs = template.tabs.map(tab => ({
    id: tab.id,
    name: tab.name,
    icon: tab.icon,
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
    set(s => ({
      state: { ...s.state, tabs: s.state.tabs.filter(t => t.id !== tabId) },
      currentTabId: s.currentTabId === tabId
        ? (s.state.tabs.find(t => t.id !== tabId)?.id || null)
        : s.currentTabId,
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

  // ─── Widget mutations ──────────────────────────────────
  addWidget(tabId, categoryId, widget) {
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

  removeWidget(tabId, categoryId, widgetId) {
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

  async completeOnboarding(uid, templateId) {
    const newState = buildStateFromTemplate(templateId)
    set({
      state: newState,
      onboardingComplete: true,
      currentTabId: newState.tabs[0]?.id || null,
    })
    try {
      await setDoc(
        doc(db, 'users', uid),
        {
          state: JSON.stringify(newState),
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
