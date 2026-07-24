import { useState } from 'react'

const MAGNET_COLORS = [
  { id: 'yellow', bg: '#fef08a', text: '#713f12', border: '#fde047' },
  { id: 'pink',   bg: '#fbcfe8', text: '#831843', border: '#f9a8d4' },
  { id: 'sky',    bg: '#bae6fd', text: '#0c4a6e', border: '#7dd3fc' },
  { id: 'green',  bg: '#bbf7d0', text: '#14532d', border: '#86efac' },
  { id: 'purple', bg: '#e9d5ff', text: '#581c87', border: '#d8b4fe' },
  { id: 'orange', bg: '#fed7aa', text: '#7c2d12', border: '#fdba74' },
  { id: 'red',    bg: '#fecaca', text: '#7f1d1d', border: '#fca5a5' },
  { id: 'teal',   bg: '#99f6e4', text: '#134e4a', border: '#5eead4' },
]

const EMOJIS = ['📌', '📎', '⭐', '💡', '🎯', '📝', '🔖', '🏷️', '💬', '✨']
const ROTATIONS = [-3, -2, -1, 0, 1, 2, 3]

export function MagnetBoardWidget({ widget, onUpdate }) {
  const magnets = widget.config?.magnets || []
  const [adding, setAdding]   = useState(false)
  const [newText, setNewText] = useState('')
  const [newColor, setNewColor] = useState(MAGNET_COLORS[0].id)
  const [editId, setEditId]   = useState(null)
  const [editText, setEditText] = useState('')

  function addMagnet() {
    if (!newText.trim()) return
    const seedVal = magnets.length
    onUpdate({
      magnets: [...magnets, {
        id: `m-${Date.now()}`,
        text: newText.trim(),
        colorId: newColor,
        rotation: ROTATIONS[seedVal % ROTATIONS.length],
        emoji: EMOJIS[seedVal % EMOJIS.length],
      }],
    })
    setNewText('')
    setAdding(false)
  }

  function deleteMagnet(id) {
    onUpdate({ magnets: magnets.filter(m => m.id !== id) })
  }

  function startEdit(magnet) { setEditId(magnet.id); setEditText(magnet.text) }

  function saveEdit(id) {
    if (!editText.trim()) return
    onUpdate({ magnets: magnets.map(m => m.id === id ? { ...m, text: editText.trim() } : m) })
    setEditId(null)
  }

  return (
    /* Fridge door */
    <div
      className="w-full h-full flex flex-col overflow-hidden rounded-2xl relative"
      style={{
        background: 'linear-gradient(160deg, #e8e8e8 0%, #d0d0d0 50%, #c0c0c0 100%)',
        boxShadow: 'inset 2px 2px 6px rgba(255,255,255,0.6), inset -2px -2px 6px rgba(0,0,0,0.15)',
      }}
    >
      {/* Door handle strip */}
      <div
        className="absolute left-2.5 top-4 bottom-4 w-1.5 rounded-full"
        style={{
          background: 'linear-gradient(to right, #b0b0b0, #e0e0e0, #b0b0b0)',
          boxShadow: '1px 0 3px rgba(0,0,0,0.3)',
        }}
      />

      {/* Top bar */}
      <div className="flex items-center justify-between pl-7 pr-3 pt-2.5 pb-1.5 shrink-0">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Fridge Board</span>
        <button
          onClick={() => setAdding(a => !a)}
          className="text-[10px] px-2 py-0.5 rounded-full bg-white/50 text-gray-600 hover:bg-white/70 border border-white/40 transition-all shadow-sm"
        >
          {adding ? 'Cancel' : '+ Note'}
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="px-3 pl-7 pb-2 shrink-0 space-y-1.5">
          <textarea
            autoFocus
            value={newText}
            onChange={e => setNewText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addMagnet() } }}
            placeholder="What's on your mind?"
            rows={2}
            className="w-full bg-white/70 border border-white/50 rounded-lg px-2 py-1.5 text-xs text-gray-700 resize-none focus:outline-none focus:border-blue-300 placeholder:text-gray-400"
          />
          <div className="flex items-center gap-1.5">
            <div className="flex gap-1 flex-1">
              {MAGNET_COLORS.map(c => (
                <button
                  key={c.id}
                  onClick={() => setNewColor(c.id)}
                  className="w-4 h-4 rounded-full border-2 transition-all"
                  style={{
                    background: c.bg,
                    borderColor: newColor === c.id ? c.text : 'transparent',
                    transform: newColor === c.id ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
            <button
              onClick={addMagnet}
              disabled={!newText.trim()}
              className="px-2.5 py-0.5 text-[10px] bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-40 shadow-sm"
            >
              Pin it
            </button>
          </div>
        </div>
      )}

      {/* Magnets area */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {magnets.length === 0 && !adding ? (
          <div className="flex items-center justify-center h-full pb-4">
            <button
              onClick={() => setAdding(true)}
              className="text-center text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              <div className="text-2xl mb-1">📌</div>
              <div>Pin a note</div>
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 p-2 pl-7 pb-3 items-start content-start">
            {magnets.map((magnet) => {
              const color = MAGNET_COLORS.find(c => c.id === magnet.colorId) || MAGNET_COLORS[0]
              return (
                <div
                  key={magnet.id}
                  className="relative group cursor-pointer rounded select-none"
                  style={{
                    background: color.bg,
                    border: `1px solid ${color.border}`,
                    transform: `rotate(${magnet.rotation || 0}deg)`,
                    minWidth: '90px',
                    maxWidth: '140px',
                    padding: '6px 8px 10px',
                    boxShadow: '2px 4px 10px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.1)',
                  }}
                  onDoubleClick={() => startEdit(magnet)}
                >
                  {/* Magnet dot at top */}
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border border-gray-300"
                    style={{ background: 'linear-gradient(135deg, #e0e0e0, #a0a0a0)', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
                  />

                  {/* Delete */}
                  <button
                    onClick={e => { e.stopPropagation(); deleteMagnet(magnet.id) }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white text-gray-400 hover:text-red-500 text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                  >
                    ×
                  </button>

                  <div className="text-[9px] mb-0.5 opacity-50">{magnet.emoji || '📌'}</div>

                  {editId === magnet.id ? (
                    <textarea
                      autoFocus
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveEdit(magnet.id) }
                        if (e.key === 'Escape') setEditId(null)
                      }}
                      onBlur={() => saveEdit(magnet.id)}
                      rows={3}
                      className="w-full text-xs resize-none focus:outline-none rounded bg-transparent"
                      style={{ color: color.text }}
                    />
                  ) : (
                    <p
                      className="text-xs leading-snug break-words font-handwriting"
                      style={{ color: color.text, fontSize: '12px' }}
                    >
                      {magnet.text}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
