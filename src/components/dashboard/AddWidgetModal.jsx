import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { useDashboardStore } from '../../store/dashboardStore'

export function AddWidgetModal({ isOpen, onClose, targetTabId, targetCategoryId }) {
  const { addCategoryWidget: addWidget } = useDashboardStore()
  const [type, setType] = useState('clock')

  const WIDGET_TYPES = [
    { id: 'clock', icon: '🕐', name: 'Clock', desc: 'Live time and date' },
    { id: 'calendar', icon: '📅', name: 'Calendar', desc: 'Mini month calendar' },
    { id: 'html', icon: '📝', name: 'HTML Widget', desc: 'Custom HTML content' },
  ]

  function handleAdd() {
    addWidget(targetTabId, targetCategoryId, {
      id: `widget-${Date.now()}`,
      type,
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Widget">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {WIDGET_TYPES.map(w => (
            <button
              key={w.id}
              onClick={() => setType(w.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                type === w.id
                  ? 'border-accent bg-accent/10'
                  : 'border-border bg-surface hover:border-accent/40'
              }`}
            >
              <div className="text-2xl mb-1">{w.icon}</div>
              <div className="text-xs font-semibold text-text">{w.name}</div>
              <div className="text-[10px] text-muted">{w.desc}</div>
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-muted border border-border rounded-lg hover:text-text hover:border-accent/40"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 text-sm bg-accent text-white rounded-lg hover:opacity-90"
          >
            Add Widget
          </button>
        </div>
      </div>
    </Modal>
  )
}
