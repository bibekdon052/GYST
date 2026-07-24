import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function FaviconIcon({ url, emoji }) {
  const [failed, setFailed] = useState(false)

  let hostname = ''
  try { hostname = url ? new URL(url).hostname : '' } catch { /* invalid url */ }

  if (!hostname || failed) {
    return <span className="text-2xl leading-none pl-1">{emoji || '🔗'}</span>
  }

  return (
    <img
      src={`https://www.google.com/s2/favicons?sz=64&domain=${hostname}`}
      alt=""
      onError={() => setFailed(true)}
      className="w-7 h-7 ml-1 rounded-md object-contain"
      loading="lazy"
    />
  )
}

function CompactFavicon({ url, emoji }) {
  const [failed, setFailed] = useState(false)
  let hostname = ''
  try { hostname = url ? new URL(url).hostname : '' } catch { /* invalid */ }
  if (!hostname || failed) return <span className="text-sm leading-none">{emoji || '🔗'}</span>
  return (
    <img
      src={`https://www.google.com/s2/favicons?sz=32&domain=${hostname}`}
      alt=""
      onError={() => setFailed(true)}
      className="w-4 h-4 rounded object-contain shrink-0"
      loading="lazy"
    />
  )
}

export function PlatformCard({ platform, editMode, onRemove, tabId, categoryId, compact = false }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: platform.id, disabled: !editMode })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  function handleClick() {
    if (editMode) return
    window.open(platform.url, '_blank', 'noopener,noreferrer')
  }

  if (compact) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`
          relative group flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-border/60
          transition-all duration-150 select-none
          ${!editMode ? 'cursor-pointer hover:border-accent/50 hover:bg-surface2 active:scale-95' : ''}
          ${editMode ? 'cursor-grab active:cursor-grabbing border-dashed' : ''}
          ${isDragging ? 'z-50 shadow-lg opacity-50' : ''}
        `}
        onClick={handleClick}
        {...(editMode ? { ...attributes, ...listeners } : {})}
      >
        {editMode && (
          <button
            onPointerDown={e => e.stopPropagation()}
            onClick={e => { e.stopPropagation(); onRemove?.() }}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow"
          >
            ×
          </button>
        )}
        <CompactFavicon url={platform.url} emoji={platform.emoji} />
        <span className="text-xs font-medium text-text truncate leading-none">{platform.name}</span>
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative group bg-surface border border-border rounded-xl p-3 flex flex-col gap-1.5
        transition-all duration-150 select-none
        ${!editMode ? 'cursor-pointer hover:border-accent/50 hover:bg-surface2 hover:shadow-md hover:shadow-black/20 active:scale-95' : ''}
        ${editMode ? 'cursor-grab active:cursor-grabbing' : ''}
        ${isDragging ? 'z-50 shadow-2xl shadow-black/40' : ''}
      `}
      onClick={handleClick}
      {...(editMode ? { ...attributes, ...listeners } : {})}
    >
      {platform.color && (
        <div
          className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
          style={{ background: platform.color }}
        />
      )}

      {editMode && (
        <button
          onPointerDown={e => e.stopPropagation()}
          onClick={e => { e.stopPropagation(); onRemove?.() }}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-danger text-white text-[11px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow"
          title={`Remove ${platform.name}`}
        >
          ×
        </button>
      )}

      {editMode && (
        <div className="absolute top-1.5 left-2.5 text-muted/40 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
          ⠿
        </div>
      )}

      <FaviconIcon url={platform.url} emoji={platform.emoji} />
      <div className="text-xs font-semibold text-text leading-tight pl-1 truncate">{platform.name}</div>
    </div>
  )
}

// A ghost placeholder while dragging
export function PlatformCardGhost() {
  return (
    <div className="bg-surface2 border border-dashed border-border rounded-xl p-3 h-[72px] opacity-40" />
  )
}
