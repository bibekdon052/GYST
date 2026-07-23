import { useDashboardStore } from '../../store/dashboardStore'
import { Modal } from '../ui/Modal'

export function RecycleBin({ isOpen, onClose }) {
  const { state, restoreTab, permanentlyDeleteTab } = useDashboardStore()
  const deleted = state.deletedTabs || []

  function formatAge(ts) {
    const mins = Math.floor((Date.now() - ts) / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🗑️ Recently Deleted Tabs">
      {deleted.length === 0 ? (
        <div className="py-10 text-center">
          <div className="text-4xl mb-3">✨</div>
          <p className="text-sm text-muted">Nothing in the bin — all good!</p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-xs text-muted mb-4">
            Deleted tabs and all their contents are kept here. Restore them any time.
          </p>
          {deleted.map(tab => (
            <div
              key={tab.id}
              className="flex items-center gap-3 p-3 bg-surface2 border border-border rounded-xl"
            >
              <span className="text-xl">{tab.icon || '📂'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text truncate">{tab.name}</p>
                <p className="text-xs text-muted">
                  {tab.categories?.reduce((n, c) => n + (c.platforms?.length || 0), 0)} links ·{' '}
                  {tab.categories?.length || 0} categories · deleted {formatAge(tab.deletedAt)}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => { restoreTab(tab.id); if (deleted.length === 1) onClose() }}
                  className="px-3 py-1.5 text-xs bg-accent text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  ↩ Restore
                </button>
                <button
                  onClick={() => permanentlyDeleteTab(tab.id)}
                  className="px-3 py-1.5 text-xs border border-danger/40 text-danger rounded-lg hover:bg-danger/10 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          <p className="text-xs text-muted/60 pt-2 text-center">
            Up to 20 deleted tabs are remembered.
          </p>
        </div>
      )}
    </Modal>
  )
}
