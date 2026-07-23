import { ClockWidget } from '../widgets/ClockWidget'
import { WeatherWidget } from '../widgets/WeatherWidget'
import { NewsWidget } from '../widgets/NewsWidget'
import { QuoteWidget } from '../widgets/QuoteWidget'
import { CalendarWidget } from '../widgets/CalendarWidget'
import { HtmlWidget } from '../widgets/HtmlWidget'

// Returns Tailwind classes for each widget type's card size
function getWidgetClasses(type) {
  switch (type) {
    case 'clock':    return { card: 'h-32', col: '' }
    case 'quote':    return { card: 'h-32', col: '' }
    case 'weather':  return { card: 'h-36', col: '' }
    case 'news':     return { card: 'h-48', col: 'md:col-span-2' }
    case 'calendar': return { card: 'h-44', col: 'md:col-span-2' }
    case 'html':     return { card: 'h-40', col: '' }
    default:         return { card: 'h-32', col: '' }
  }
}

function WidgetCard({ widget, onRemove }) {
  const { card, col } = getWidgetClasses(widget.type)

  return (
    <div className={`relative group bg-surface border border-border rounded-2xl overflow-hidden ${card} ${col}`}>
      {/* Remove button */}
      <button
        onClick={() => onRemove(widget.id)}
        className="absolute top-1.5 right-1.5 z-10 w-5 h-5 flex items-center justify-center text-muted/50 hover:text-danger hover:bg-surface2/80 rounded-full text-xs transition-all opacity-0 group-hover:opacity-100"
        title="Remove widget"
        aria-label="Remove widget"
      >
        ×
      </button>

      {/* Widget content */}
      <div className="w-full h-full">
        {widget.type === 'clock'    && <ClockWidget />}
        {widget.type === 'weather'  && <WeatherWidget widget={widget} />}
        {widget.type === 'news'     && <NewsWidget widget={widget} />}
        {widget.type === 'quote'    && <QuoteWidget widget={widget} />}
        {widget.type === 'calendar' && <CalendarWidget />}
        {widget.type === 'html'     && (
          <HtmlWidget
            content={widget.config?.html || ''}
            title="HTML Widget"
          />
        )}
      </div>
    </div>
  )
}

export function WidgetRow({ tabId, widgets = [], onManage, onRemoveWidget }) {
  if (widgets.length === 0) {
    return (
      <div className="px-6 pb-4">
        <button
          onClick={onManage}
          className="flex items-center gap-2 px-4 py-2 text-xs border border-dashed border-border text-muted hover:text-accent hover:border-accent/40 hover:bg-surface/30 rounded-xl transition-all"
        >
          <span className="text-base">＋</span>
          Add Widgets
        </button>
      </div>
    )
  }

  return (
    <div className="px-6 pb-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-auto">
        {widgets.map(widget => (
          <WidgetCard
            key={widget.id}
            widget={widget}
            onRemove={onRemoveWidget}
          />
        ))}

        {/* Manage button */}
        <div className="flex items-center justify-center h-32">
          <button
            onClick={onManage}
            className="flex flex-col items-center gap-1.5 px-4 py-3 text-xs border border-dashed border-border text-muted hover:text-accent hover:border-accent/40 hover:bg-surface/30 rounded-2xl transition-all w-full h-full justify-center"
          >
            <span className="text-xl">＋</span>
            <span>Widgets</span>
          </button>
        </div>
      </div>
    </div>
  )
}
