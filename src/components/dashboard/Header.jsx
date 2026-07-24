import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDashboardStore } from '../../store/dashboardStore'
import { useAuth } from '../../hooks/useAuth'

function HeaderClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const time = now.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', hour12: true })
  const date = now.toLocaleDateString('en-AU', { weekday: 'short', day: '2-digit', month: 'short' })
  return (
    <div className="hidden lg:flex flex-col items-end leading-none gap-0.5">
      <span className="text-sm font-mono font-semibold text-text tabular-nums">{time}</span>
      <span className="text-xs text-muted">{date}</span>
    </div>
  )
}

function Toast({ message, type }) {
  if (!message) return null
  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] px-4 py-3 rounded-xl border shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-200 ${
        type === 'error'
          ? 'bg-surface border-danger/40 text-danger'
          : 'bg-surface border-success/40 text-success'
      }`}
    >
      {message}
    </div>
  )
}

export function Header({ onOpenCustomise }) {
  const { state, editMode, sidebarOpen, saveStatus, toggleEditMode, toggleSidebar, exportConfig, importConfig, resetConfig, updateAppearance } = useDashboardStore()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [resetConfirm, setResetConfirm] = useState(false)
  const toastTimerRef = useRef(null)
  const importInputRef = useRef(null)

  const { logoEmoji, siteTitle } = state.appearance || {}

  const saveLabel = { saved: '✓ Saved', saving: '⏳ Saving…', error: '⚠ Error' }[saveStatus] || ''
  const saveCls = saveStatus === 'error' ? 'text-danger' : 'text-muted/60'

  const showToast = useCallback((message, type = 'success') => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setToast({ message, type })
    toastTimerRef.current = setTimeout(() => setToast(null), 3000)
  }, [])

  function handleExport() {
    exportConfig()
    setUserMenuOpen(false)
    showToast('✅ Config exported successfully!')
  }

  function handleImportClick() {
    setUserMenuOpen(false)
    importInputRef.current?.click()
  }

  async function handleReset() {
    setResetConfirm(false)
    await resetConfig()
    navigate('/onboarding')
  }

  async function handleImportFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    // Reset input so same file can be re-selected
    e.target.value = ''
    try {
      await importConfig(file)
      showToast('✅ Config imported successfully!')
    } catch {
      showToast('❌ Import failed — invalid config file', 'error')
    }
  }

  return (
    <>
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
        <HeaderClock />

        {/* Save status */}
        <span className={`text-xs ${saveCls} hidden sm:block`}>{saveLabel}</span>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Compact layout toggle */}
          {(() => {
            const isCompact = state.appearance?.linkLayout === 'compact'
            return (
              <button
                onClick={() => updateAppearance({ linkLayout: isCompact ? 'grid' : 'compact' })}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-border text-muted hover:text-text hover:border-accent/40 transition-colors"
                title={isCompact ? 'Switch to grid layout' : 'Switch to compact layout'}
              >
                {isCompact ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
                    <rect x="1" y="1" width="6" height="6" rx="1" />
                    <rect x="9" y="1" width="6" height="6" rx="1" />
                    <rect x="1" y="9" width="6" height="6" rx="1" />
                    <rect x="9" y="9" width="6" height="6" rx="1" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
                    <line x1="1" y1="4" x2="15" y2="4" />
                    <line x1="1" y1="8" x2="15" y2="8" />
                    <line x1="1" y1="12" x2="15" y2="12" />
                  </svg>
                )}
                <span className="hidden sm:block">{isCompact ? 'Grid' : 'Compact'}</span>
              </button>
            )
          })()}

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
            <span>✏️</span>
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
                <div className="absolute right-0 top-10 z-50 w-56 bg-surface border border-border rounded-xl shadow-xl shadow-black/30 overflow-hidden">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-xs text-muted">Signed in as</p>
                    <p className="text-sm font-medium text-text truncate">{user?.email}</p>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={handleExport}
                      className="w-full text-left px-3 py-2 text-sm text-text hover:bg-surface2 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <span>📥</span>
                      Export Config
                    </button>
                    <button
                      onClick={handleImportClick}
                      className="w-full text-left px-3 py-2 text-sm text-text hover:bg-surface2 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <span>📤</span>
                      Import Config
                    </button>
                    <div className="my-1 border-t border-border" />
                    <button
                      onClick={() => { setResetConfirm(true); setUserMenuOpen(false) }}
                      className="w-full text-left px-3 py-2 text-sm text-text hover:bg-surface2 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <span>🔁</span>
                      Reset to Default
                    </button>
                    <div className="my-1 border-t border-border" />
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

      {/* Reset confirmation dialog */}
      {resetConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-surface border border-border rounded-2xl p-6 w-80 shadow-2xl">
            <div className="text-3xl mb-3 text-center">🔁</div>
            <h3 className="text-base font-semibold text-text text-center mb-2">
              Reset to Default?
            </h3>
            <p className="text-xs text-muted text-center mb-5 leading-relaxed">
              This will clear your entire dashboard and take you back through the setup wizard. Your current layout cannot be recovered — export it first if you'd like to keep it.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setResetConfirm(false)}
                className="flex-1 py-2 text-sm border border-border text-muted rounded-xl hover:text-text transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2 text-sm bg-danger text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                Reset & Restart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input for import */}
      <input
        ref={importInputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={handleImportFile}
      />

      {/* Toast notification */}
      <Toast message={toast?.message} type={toast?.type} />
    </>
  )
}
