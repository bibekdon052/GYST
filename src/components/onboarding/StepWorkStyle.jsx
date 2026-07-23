const STYLES = [
  { id: 'office', icon: '🏢', label: 'In the office', desc: 'Mostly work at a fixed desk' },
  { id: 'home', icon: '🏡', label: 'Working from home', desc: 'Remote work is your norm' },
  { id: 'hybrid', icon: '🔄', label: 'Hybrid', desc: 'Mix of office and home' },
  { id: 'onthego', icon: '🚀', label: 'On the go', desc: 'Always moving, always connected' },
]

export function StepWorkStyle({ selected, onSelect }) {
  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="text-xl font-bold text-text">How do you work?</h2>
        <p className="text-sm text-muted mt-1">
          This helps us arrange your dashboard for your working style.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {STYLES.map(s => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`
              p-5 rounded-xl border text-left transition-all duration-150 active:scale-95
              ${selected === s.id
                ? 'border-accent bg-accent/10 ring-1 ring-accent/30'
                : 'border-border bg-surface hover:border-accent/40 hover:bg-surface2'}
            `}
          >
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-sm font-semibold text-text">{s.label}</div>
            <div className="text-xs text-muted mt-0.5">{s.desc}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
