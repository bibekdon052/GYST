import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useDashboardStore } from '../store/dashboardStore'
import { TAB_TEMPLATES } from '../data/tabTemplates'
import { StepProfession } from '../components/onboarding/StepProfession'
import { StepWorkStyle } from '../components/onboarding/StepWorkStyle'
import { StepCategories } from '../components/onboarding/StepCategories'
import { StepTutorial } from '../components/onboarding/StepTutorial'
import { StepTemplates } from '../components/onboarding/StepTemplates'

const STEPS = [
  { id: 'welcome',   label: 'Welcome' },
  { id: 'profession', label: 'Role' },
  { id: 'workstyle', label: 'Style' },
  { id: 'categories', label: 'Areas' },
  { id: 'tutorial',  label: 'Tour' },
  { id: 'templates', label: 'Templates' },
]

// Steps with their own navigation — hide the shared Back/Continue bar
const SELF_NAV_STEPS = new Set(['tutorial', 'templates'])

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { completeOnboarding } = useDashboardStore()

  const [step, setStep] = useState(0)
  const [profession, setProfession] = useState(null)
  const [workStyle, setWorkStyle] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedTemplateIds, setSelectedTemplateIds] = useState(new Set())
  const [loading, setLoading] = useState(false)

  function toggleCategory(id) {
    setCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  function toggleTemplate(id) {
    setSelectedTemplateIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function next() {
    if (step < STEPS.length - 1) setStep(s => s + 1)
  }

  function prev() {
    if (step > 0) setStep(s => s - 1)
  }

  async function finish() {
    if (!user) return
    setLoading(true)
    try {
      const extraTemplates = [...selectedTemplateIds]
        .map(id => TAB_TEMPLATES.find(t => t.id === id))
        .filter(Boolean)
      await completeOnboarding(user.uid, profession || 'remote-worker', extraTemplates)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      console.error('Onboarding error:', err)
    } finally {
      setLoading(false)
    }
  }

  const canNext = () => {
    if (STEPS[step].id === 'profession') return !!profession
    if (STEPS[step].id === 'workstyle')  return !!workStyle
    return true
  }

  const currentStepId = STEPS[step].id

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-lg">
        {/* Branding */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-violet-600 flex items-center justify-center text-2xl shadow-lg shadow-accent/20">
            🛩️
          </div>
          <span className="text-xl font-bold text-text">GYST</span>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-1.5 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i <= step ? 'bg-accent' : 'bg-surface2'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Step labels */}
        <div className="flex justify-between mb-6">
          {STEPS.map((s, i) => (
            <span
              key={s.id}
              className={`text-[11px] font-medium transition-colors ${
                i === step ? 'text-accent' : i < step ? 'text-muted' : 'text-muted/40'
              }`}
            >
              {s.label}
            </span>
          ))}
        </div>

        {/* Card */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-2xl shadow-black/30">
          {/* Welcome step */}
          {currentStepId === 'welcome' && (
            <div className="text-center space-y-4 py-4">
              <div className="text-5xl">👋</div>
              <h2 className="text-2xl font-bold text-text">Welcome to GYST</h2>
              <p className="text-muted max-w-xs mx-auto leading-relaxed">
                Let's set up your personal dashboard. We'll organise all your links and platforms in one place — your way.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { icon: '🔗', label: 'All your links' },
                  { icon: '📂', label: 'Organised by you' },
                  { icon: '🔒', label: 'Private & secure' },
                ].map(f => (
                  <div key={f.label} className="bg-surface2 rounded-xl p-3 text-center">
                    <div className="text-xl mb-1">{f.icon}</div>
                    <div className="text-xs text-muted">{f.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStepId === 'profession' && (
            <StepProfession selected={profession} onSelect={setProfession} />
          )}

          {currentStepId === 'workstyle' && (
            <StepWorkStyle selected={workStyle} onSelect={setWorkStyle} />
          )}

          {currentStepId === 'categories' && (
            <StepCategories selected={categories} onToggle={toggleCategory} />
          )}

          {/* Tutorial advances to Templates step instead of finishing */}
          {currentStepId === 'tutorial' && (
            <StepTutorial onDone={next} />
          )}

          {currentStepId === 'templates' && (
            <StepTemplates
              selectedIds={selectedTemplateIds}
              onToggle={toggleTemplate}
              onDone={finish}
              onBack={prev}
              loading={loading}
            />
          )}

          {/* Shared nav — hidden for self-navigating steps */}
          {!SELF_NAV_STEPS.has(currentStepId) && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
              <button
                onClick={prev}
                disabled={step === 0}
                className="px-4 py-2 text-sm text-muted border border-border rounded-lg hover:text-text hover:border-accent/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Back
              </button>
              <button
                onClick={next}
                disabled={!canNext()}
                className="px-5 py-2 text-sm bg-accent text-white rounded-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              >
                Continue
              </button>
            </div>
          )}
        </div>

        {/* Skip link — not shown on the final Templates step */}
        {step < STEPS.length - 1 && (
          <div className="text-center mt-4">
            <button
              onClick={finish}
              disabled={loading}
              className="text-xs text-muted/60 hover:text-muted transition-colors"
            >
              Skip setup and go to dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
