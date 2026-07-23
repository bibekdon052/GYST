import { useState } from 'react'

const SLIDES = [
  {
    icon: '📂',
    title: 'Tabs & Categories',
    desc: 'Organise your platforms into tabs (e.g. Work, Personal) and categories within each tab. Create as many as you need.',
    visual: (
      <div className="bg-bg rounded-xl border border-border p-3 space-y-2">
        <div className="flex gap-2">
          {['💼 Work', '🏠 Personal', '🎬 Fun'].map((t, i) => (
            <div key={i} className={`px-3 py-1 rounded-lg text-xs font-medium ${i === 0 ? 'bg-accent text-white' : 'bg-surface text-muted border border-border'}`}>
              {t}
            </div>
          ))}
        </div>
        <div className="bg-surface rounded-lg border border-border p-2">
          <div className="text-xs text-muted font-medium mb-1.5">💬 Communication</div>
          <div className="flex gap-1.5 flex-wrap">
            {['📬 Gmail', '👥 Teams', '📹 Zoom'].map((p, i) => (
              <div key={i} className="bg-surface2 border border-border rounded-lg px-2 py-1 text-xs text-text">{p}</div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: '🔍',
    title: 'Platform Library',
    desc: 'Browse hundreds of Australian platforms and apps. Search by name, use the sidebar to add any platform to any category in one click.',
    visual: (
      <div className="bg-bg rounded-xl border border-border p-3 space-y-2">
        <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-2">
          <span className="text-muted text-sm">🔍</span>
          <span className="text-xs text-muted">Search platforms…</span>
        </div>
        {['🏦 Commonwealth Bank', '🏛️ myGov', '📡 ABC News', '🎬 Stan'].map((p, i) => (
          <div key={i} className="flex items-center justify-between bg-surface border border-border rounded-lg px-3 py-2">
            <span className="text-xs text-text">{p}</span>
            <span className="text-xs text-accent font-medium">+ Add</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: '✏️',
    title: 'Customise Everything',
    desc: 'Toggle Edit Mode to drag-and-drop platforms and categories, rename them, change the accent colour, and make GYST truly yours.',
    visual: (
      <div className="bg-bg rounded-xl border border-border p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-text font-medium">🎨 Appearance</span>
          <div className="flex gap-1">
            {['#4f8ef7', '#7c3aed', '#22c55e', '#f59e0b', '#ef4444'].map(c => (
              <div key={c} className="w-4 h-4 rounded-full border-2 border-transparent hover:border-white cursor-pointer" style={{ background: c }} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-2">
          <span className="text-xs text-muted">Edit Mode</span>
          <div className="ml-auto w-8 h-4 rounded-full bg-accent relative">
            <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
          </div>
        </div>
        <div className="text-xs text-muted text-center pt-1">Drag to reorder · Click × to remove</div>
      </div>
    ),
  },
]

export function StepTutorial({ onDone }) {
  const [slide, setSlide] = useState(0)
  const current = SLIDES[slide]

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="text-xl font-bold text-text">Here's how GYST works</h2>
        <p className="text-sm text-muted mt-1">A quick tour before you dive in</p>
      </div>

      {/* Slide */}
      <div className="bg-surface border border-border rounded-2xl p-5 space-y-4 min-h-[280px]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-xl">
            {current.icon}
          </div>
          <div>
            <div className="text-sm font-semibold text-text">{current.title}</div>
            <div className="text-xs text-muted mt-0.5 max-w-xs">{current.desc}</div>
          </div>
        </div>

        {current.visual}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {/* Dots */}
        <div className="flex gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === slide ? 'bg-accent w-5' : 'bg-border'}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          {slide > 0 && (
            <button
              onClick={() => setSlide(s => s - 1)}
              className="px-4 py-2 text-sm border border-border rounded-lg text-muted hover:text-text hover:border-accent/40 transition-colors"
            >
              Back
            </button>
          )}
          {slide < SLIDES.length - 1 ? (
            <button
              onClick={() => setSlide(s => s + 1)}
              className="px-5 py-2 text-sm bg-accent text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onDone}
              className="px-5 py-2 text-sm bg-accent text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
            >
              Let's go! 🚀
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
