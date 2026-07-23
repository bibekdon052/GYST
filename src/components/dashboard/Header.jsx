import { useState } from 'react'
import { useDashboardStore } from '../../store/dashboardStore'
import { useAuth } from '../../hooks/useAuth'
import { ClockWidget } from '../widgets/ClockWidget'

export function Header({ onOpenCustomise }) {
  const { state, editMode, sidebarOpen, saveStatus, toggleEditMode, toggleSidebar } = useDashboardStore()
  const { user, signOut } = useAuth()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const { logoEmoji, siteTitle } = state.appearance || {}

  const saveLabel = { saved: '✓ Saved', saving: '⏳ Saving…', error: '⚠ Error' }[saveStatus] || ''
  const saveCls = saveStatus === 'error' ? 'text-danger' : 'text-muted/60'

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-bg/90 backdrop-blur-md border-b border-border flex items-center px-4 gap-3">
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-violet-600 flex items-center justify-center text-base shadow shadow-accent/20">
          {logoEmoji || '🛩️'}
        </div>
        <span className="text-sm font-bold text-text hidden sm:block">{siteTitle || 'GYST'}</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Clock */}
      <div className="hidden lg:block">
        <ClockWidget />
      </div>

      {/* Save status */}
      <span className={`text-xs ${saveCls} hidden sm:block`}>{saveLabel}</span>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Customise */}
        <button
          onClick={onOpenCustomise}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-border text-muted hover:text-text hover:border-accent/40 transition-colors"
          title="Customise appearance"
        >
          <span>🎨</span>
          <span className="hidden sm:block">Customise</span>
        </button>

        {/* Edit mode toggle */}
        <button
          onClick={toggleEditMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-colors ${
            editMode
              ? 'border-accent bg-accent/10 text-accent'
              : 'border-border text-muted hover:text-text hover:border-accent/40'
          }`}
          title="Toggle edit mode"
        >
          <span>{editMode ? '✏️' : '✏️'}</span>
          <span className="hidden sm:block">{editMode ? 'Done' : 'Edit'}</span>
        </button>

        {/* Sidebar toggle */}
        <button
          onClick={toggleSidebar}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-colors ${
            sidebarOpen
              ? 'border-accent bg-accent/10 text-accent'
              : 'border-border text-muted hover:text-text hover:border-accent/40'
          }`}
          title="Toggle platform library"
        >
          <span>🔍</span>
          <span className="hidden sm:block">Add</span>
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(o => !o)}
            className="w-8 h-8 rounded-full bg-surface2 border border-border flex items-center justify-center text-sm text-muted hover:border-accent/40 hover:text-text transition-colors"
            title={user?.email}
          >
            {user?.email?.[0]?.toUpperCase() || '?'}
          </button>

          {userMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
              <div className="absolute right-0 top-10 z-50 w-52 bg-surface border border-border rounded-xl shadow-xl shadow-black/30 overflow-hidden">
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-xs text-muted">Signed in as</p>
                  <p className="text-sm font-medium text-text truncate">{user?.email}</p>
                </div>
                <div className="p-1">
                  <button
                    onClick={() => { signOut(); setUserMenuOpen(false) }}
                    className="w-full text-left px-3 py-2 text-sm text-danger hover:bg-danger/10 rounded-lg transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
