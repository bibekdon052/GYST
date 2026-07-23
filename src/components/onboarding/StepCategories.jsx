const CATEGORIES = [
  { id: 'work-productivity', icon: '💼', label: 'Work Tools' },
  { id: 'banking-finance', icon: '🏦', label: 'Banking & Finance' },
  { id: 'government', icon: '🏛️', label: 'Government Services' },
  { id: 'health-wellbeing', icon: '🏥', label: 'Health & Wellbeing' },
  { id: 'education', icon: '🎓', label: 'Education' },
  { id: 'shopping-lifestyle', icon: '🛒', label: 'Shopping & Lifestyle' },
  { id: 'entertainment', icon: '🎬', label: 'Entertainment' },
  { id: 'news-info', icon: '📰', label: 'News & Information' },
  { id: 'transport-travel', icon: '🚗', label: 'Transport & Travel' },
  { id: 'social-comms', icon: '💬', label: 'Social & Communication' },
  { id: 'it-developer', icon: '🔧', label: 'IT & Development' },
  { id: 'home-property', icon: '🏠', label: 'Home & Property' },
]

export function StepCategories({ selected, onToggle }) {
  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="text-xl font-bold text-text">What do you want to organise?</h2>
        <p className="text-sm text-muted mt-1">
          Select the areas you'd like quick access to. You can add more anytime.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {CATEGORIES.map(c => {
          const isSelected = selected.includes(c.id)
          return (
            <button
              key={c.id}
              onClick={() => onToggle(c.id)}
              className={`
                flex items-center gap-2.5 px-3 py-3 rounded-xl border text-left transition-all duration-150 active:scale-95
                ${isSelected
                  ? 'border-accent bg-accent/10 ring-1 ring-accent/30'
                  : 'border-border bg-surface hover:border-accent/40 hover:bg-surface2'}
              `}
            >
              <span className="text-xl">{c.icon}</span>
              <span className="text-sm font-medium text-text leading-tight">{c.label}</span>
              {isSelected && (
                <span className="ml-auto text-accent text-xs font-bold">✓</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
