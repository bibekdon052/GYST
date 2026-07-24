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

function randomFrom(arr, seed) {
  return arr[seed % arr.length]
}

export function MagnetBoardWidget({ widget, onUpdate }) {
  const magnets = widget.config?.magnets || []
  const [adding, setAdding] = useState(false)
  const [newText, setNewText] = useState('')
  const [newColor, setNewColor] = useState(MAGNET_COLORS[0].id)
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  function addMagnet() {
    if (!newText.trim()) return
    const id = `m-${Date.now()}`
    const colorIdx = MAGNET_COLORS.findIndex(c => c.id === newColor)
    const seedVal = magnets.length
    const newMagnet = {
      id,
      text: newText.trim(),
      colorId: newColor,
      rotation: ROTATIONS[seedVal % ROTATIONS.length],
      emoji: EMOJIS[seedVal % EMOJIS.length],
    }
    onUpdate({ magnets: [...magnets, newMagnet] })
    setNewText('')
    setAdding(false)
  }

  function deleteMagnet(id) {
    onUpdate({ magnets: magnets.filter(m => m.id !== id) })
  }

  function startEdit(magnet) {
    setEditId(magnet.id)
    setEditText(magnet.text)
  }

  function saveEdit(id) {
    if (!editText.trim()) return
    onUpdate({
      magnets: magnets.map(m => m.id === id ? { ...m, text: editText.trim() } : m)
    })
    setEditId(null)
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-3 pb-1 shrink-0">
        <span className="text-xs font-semibold text-muted uppercase tracking-wider">Fridge Board</span>
        <button
          onClick={() => setAdding(a => !a)}
          className="text-xs px-2 py-1 rounded-lg bg-surface2 text-muted hover:text-accent border border-border hover:border-accent/40 transition-colors"
        >
          {adding ? 'Cancel' : '+ Note'}
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="px-3 pb-2 shrink-0 space-y-2">
          <textarea
            autoFocus
            value={newText}
            onChange={e => setNewText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addMagnet() } }}
            placeholder="What's on your mind?"
            rows={2}
            className="w-full bg-surface2 border border-border rounded-lg px-2 py-1.5 text-xs text-text resize-none focus:outline-none focus:border-accent/60"
          />
          <div className="flex items-center gap-2">
            <div className="flex gap-1 flex-1">
              {MAGNET_COLORS.map(c => (
                <button
                  key={c.id}
                  onClick={() => setNewColor(c.id)}
                  className="w-5 h-5 rounded-full border-2 transition-all"
                  style={{
                    background: c.bg,
                    borderColor: newColor === c.id ? c.text : c.border,
                    transform: newColor === c.id ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
            <button
              onClick={addMagnet}
              disabled={!newText.trim()}
              className="px-3 py-1 text-xs bg-accent text-white rounded-lg hover:opacity-90 disabled:opacity-40"
            >
              Pin it
            </button>
          </div>
        </div>
      )}

      {/* Magnets */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {magnets.length === 0 && !adding ? (
          <div className="flex items-center justify-center h-full pb-4">
            <button
              onClick={() => setAdding(true)}
              className="text-center text-xs text-muted hover:text-accent transition-colors"
            >
              <div className="text-3xl mb-1">📌</div>
              <div>Pin a note to the board</div>
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 p-3 pb-4 items-start content-start">
            {magnets.map((magnet, i) => {
              const color = MAGNET_COLORS.find(c => c.id === magnet.colorId) || MAGNET_COLORS[0]
              return (
                <div
                  key={magnet.id}
                  className="magnet-note relative group cursor-pointer rounded select-none"
                  style={{
                    background: color.bg,
                    border: `1px solid ${color.border}`,
                    transform: `rotate(${magnet.rotation || 0}deg)`,
                    minWidth: '100px',
                    maxWidth: '150px',
                    padding: '8px 10px 10px',
                  }}
                  onDoubleClick={() => startEdit(magnet)}
                >
                  {/* Delete button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteMagnet(magnet.id) }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white text-gray-500 hover:text-red-500 text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                  >
                    ×
                  </button>

                  {/* Magnet pin */}
                  <div className="text-[10px] mb-1 opacity-60">{magnet.emoji || '📌'}</div>

                  {editId === magnet.id ? (
                    <textarea
                      autoFocus
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveEdit(magnet.id) } if (e.key === 'Escape') setEditId(null) }}
                      onBlur={() => saveEdit(magnet.id)}
                      rows={3}
                      className="w-full text-xs resize-none focus:outline-none rounded bg-transparent"
                      style={{ color: color.text }}
                    />
                  ) : (
                    <p
                      className="text-xs leading-snug break-words font-handwriting"
                      style={{ color: color.text, fontSize: '13px' }}
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
