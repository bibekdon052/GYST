import { ClockWidget }       from '../widgets/ClockWidget'
import { WeatherWidget }     from '../widgets/WeatherWidget'
import { NewsWidget }        from '../widgets/NewsWidget'
import { QuoteWidget }       from '../widgets/QuoteWidget'
import { CalendarWidget }    from '../widgets/CalendarWidget'
import { HtmlWidget }        from '../widgets/HtmlWidget'
import { TasksWidget }       from '../widgets/TasksWidget'
import { NotesWidget }       from '../widgets/NotesWidget'
import { CountdownWidget }   from '../widgets/CountdownWidget'
import { MagnetBoardWidget } from '../widgets/MagnetBoardWidget'
import { TodayWidget }       from '../widgets/TodayWidget'
import { LinkWidget }        from '../widgets/LinkWidget'
import { WebhookWidget }     from '../widgets/WebhookWidget'

// All small (1-col) widgets: h-36 = 144 px
// All wide (2-col) widgets:  h-44 = 176 px   (taller ones: h-56/h-64)
function getWidgetMeta(type) {
  switch (type) {
    case 'clock':     return { h: 'h-36', wide: false }
    case 'weather':   return { h: 'h-36', wide: false }
    case 'quote':     return { h: 'h-36', wide: false }
    case 'notes':     return { h: 'h-36', wide: false }
    case 'link':      return { h: 'h-36', wide: false }
    case 'countdown': return { h: 'h-36', wide: false }
    case 'html':      return { h: 'h-44', wide: false }
    case 'webhook':   return { h: 'h-44', wide: false }
    case 'news':      return { h: 'h-44', wide: true  }
    case 'calendar':  return { h: 'h-44', wide: true  }
    case 'tasks':     return { h: 'h-56', wide: true  }
    case 'magnets':   return { h: 'h-56', wide: true  }
    case 'today':     return { h: 'h-64', wide: true  }
    default:          return { h: 'h-36', wide: false }
  }
}

function WidgetCard({ widget, onRemove, onUpdate }) {
  const { h, wide } = getWidgetMeta(widget.type)
  const handleUpdate = (config) => onUpdate?.(widget.id, config)
  const colSpan = wide ? 'md:col-span-2' : ''

  return (
    <div className={`relative group bg-surface border border-border rounded-2xl overflow-hidden ${h} ${colSpan}`}>
      <button
        onClick={() => onRemove(widget.id)}
        className="absolute top-1.5 right-1.5 z-10 w-5 h-5 flex items-center justify-center text-muted/40 hover:text-danger hover:bg-surface2/80 rounded-full text-xs transition-all opacity-0 group-hover:opacity-100"
        title="Remove widget"
      >
        ×
      </button>

      <div className="w-full h-full">
        {widget.type === 'clock'    && <ClockWidget />}
        {widget.type === 'weather'  && <WeatherWidget widget={widget} />}
        {widget.type === 'news'     && <NewsWidget widget={widget} />}
        {widget.type === 'quote'    && <QuoteWidget widget={widget} />}
        {widget.type === 'calendar' && <CalendarWidget />}
        {widget.type === 'tasks'    && <TasksWidget widget={widget} onUpdate={handleUpdate} />}
        {widget.type === 'notes'    && <NotesWidget widget={widget} onUpdate={handleUpdate} />}
        {widget.type === 'countdown'&& <CountdownWidget widget={widget} onUpdate={handleUpdate} />}
        {widget.type === 'magnets'  && <MagnetBoardWidget widget={widget} onUpdate={handleUpdate} />}
        {widget.type === 'today'    && <TodayWidget widget={widget} onUpdate={handleUpdate} />}
        {widget.type === 'link'     && <LinkWidget widget={widget} onUpdate={handleUpdate} />}
        {widget.type === 'webhook'  && <WebhookWidget widget={widget} onUpdate={handleUpdate} />}
        {widget.type === 'html'     && (
          <HtmlWidget content={widget.config?.html || ''} title="HTML Widget" />
        )}
      </div>
    </div>
  )
}

export function WidgetRow({ tabId, widgets = [], onManage, onRemoveWidget, onUpdateWidget }) {
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {widgets.map(widget => (
          <WidgetCard
            key={widget.id}
            widget={widget}
            onRemove={onRemoveWidget}
            onUpdate={onUpdateWidget}
          />
        ))}

        {/* Always-visible add button */}
        <div className="h-36 flex items-center justify-center">
          <button
            onClick={onManage}
            className="flex flex-col items-center gap-1.5 text-xs border border-dashed border-border text-muted hover:text-accent hover:border-accent/40 hover:bg-surface/30 rounded-2xl transition-all w-full h-full justify-center"
          >
            <span className="text-xl">＋</span>
            <span>Add Widget</span>
          </button>
        </div>
      </div>
    </div>
  )
}
