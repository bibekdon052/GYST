import { useState } from 'react'

export function LinkPreviewPanel({ url, onClose }) {
  const [loading, setLoading] = useState(true)

  let hostname = ''
  try { hostname = new URL(url).hostname } catch {}

  return (
    <div
      className="fixed right-0 bottom-0 z-40 flex flex-col bg-surface border-l border-border shadow-2xl shadow-black/50"
      style={{ top: '100px', width: 'min(600px, 50vw)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border shrink-0">
        {hostname && (
          <img
            src={`https://www.google.com/s2/favicons?sz=32&domain=${hostname}`}
            className="w-4 h-4 rounded shrink-0"
            alt=""
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        )}
        <span className="text-xs text-muted font-mono truncate flex-1 min-w-0">{url}</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-1 px-2 py-1 text-xs text-accent border border-accent/30 rounded-lg hover:bg-accent hover:text-white transition-colors"
          title="Open in new tab"
        >
          <span>↗</span>
          <span className="hidden sm:inline">New tab</span>
        </a>
        <button
          onClick={onClose}
          className="shrink-0 w-6 h-6 flex items-center justify-center text-xl text-muted hover:text-text hover:bg-surface2 rounded transition-colors"
          title="Close preview"
        >
          ×
        </button>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="h-0.5 bg-border overflow-hidden shrink-0">
          <div className="h-full w-3/5 bg-accent/70 animate-pulse" />
        </div>
      )}

      {/* iframe */}
      <iframe
        key={url}
        src={url}
        title={hostname}
        className="flex-1 border-none bg-white"
        onLoad={() => setLoading(false)}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals"
      />

      {/* Footer */}
      <div className="shrink-0 px-3 py-1.5 border-t border-border flex items-center justify-between">
        <span className="text-[10px] text-muted/50">
          Some sites block preview — use <strong className="font-medium text-muted/70">New tab</strong> if blank.
        </span>
      </div>
    </div>
  )
}
