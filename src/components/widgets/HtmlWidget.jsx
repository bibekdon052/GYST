import { useState } from 'react'

export function HtmlWidget({ content = '', title = 'HTML Widget', onEdit }) {
  const [showEditor, setShowEditor] = useState(false)
  const [draft, setDraft] = useState(content)

  if (showEditor) {
    return (
      <div className="bg-surface border border-border rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text">{title}</span>
          <button
            onClick={() => setShowEditor(false)}
            className="text-xs text-muted hover:text-text"
          >
            Cancel
          </button>
        </div>
        <textarea
          value={draft}
          onChange={e => setDraft(e.target.value)}
          className="w-full h-32 bg-surface2 border border-border rounded-lg p-2 text-xs font-mono text-text resize-none focus:outline-none focus:border-accent/60"
          placeholder="<p>Your HTML here...</p>"
        />
        <button
          onClick={() => { onEdit?.(draft); setShowEditor(false) }}
          className="w-full py-1.5 bg-accent text-white text-sm rounded-lg hover:opacity-90"
        >
          Save
        </button>
      </div>
    )
  }

  if (!content) {
    return (
      <div
        className="bg-surface border border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-accent/40 transition-colors"
        onClick={() => setShowEditor(true)}
      >
        <div className="text-2xl mb-1">📝</div>
        <div className="text-xs text-muted">Click to add HTML content</div>
      </div>
    )
  }

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden group relative">
      <iframe
        srcDoc={content}
        className="w-full h-40 border-none"
        sandbox="allow-scripts"
        title={title}
      />
      <button
        onClick={() => setShowEditor(true)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface/80 backdrop-blur-sm border border-border text-xs text-muted px-2 py-1 rounded"
      >
        Edit
      </button>
    </div>
  )
}
