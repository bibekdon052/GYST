import { TEMPLATES } from '../../data/templates'

export function StepProfession({ selected, onSelect }) {
  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="text-xl font-bold text-text">Who are you?</h2>
        <p className="text-sm text-muted mt-1">
          We'll set up your dashboard with the right tools for your role.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`
              p-4 rounded-xl border text-left transition-all duration-150 active:scale-95
              ${selected === t.id
                ? 'border-accent bg-accent/10 ring-1 ring-accent/30'
                : 'border-border bg-surface hover:border-accent/40 hover:bg-surface2'}
            `}
          >
            <div className="text-2xl mb-2">{t.icon}</div>
            <div className="text-sm font-semibold text-text leading-tight">{t.name}</div>
            <div className="text-xs text-muted mt-0.5 leading-tight">{t.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
