import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { ClockWidget }        from '../widgets/ClockWidget'
import { WeatherWidget }      from '../widgets/WeatherWidget'
import { NewsWidget }         from '../widgets/NewsWidget'
import { QuoteWidget }        from '../widgets/QuoteWidget'
import { CalendarWidget }     from '../widgets/CalendarWidget'
import { HtmlWidget }         from '../widgets/HtmlWidget'
import { TasksWidget }        from '../widgets/TasksWidget'
import { NotesWidget }        from '../widgets/NotesWidget'
import { CountdownWidget }    from '../widgets/CountdownWidget'
import { MagnetBoardWidget }  from '../widgets/MagnetBoardWidget'
import { TodayWidget }        from '../widgets/TodayWidget'
import { LinkWidget }         from '../widgets/LinkWidget'
import { WebhookWidget }      from '../widgets/WebhookWidget'
import { HabitWidget }        from '../widgets/HabitWidget'
import { FocusTimerWidget }   from '../widgets/FocusTimerWidget'

function getWidgetMeta(type) {
  switch (type) {
    case 'clock':     return { h: 'h-36', wide: false }
    case 'weather':   return { h: 'h-36', wide: false }
    case 'quote':     return { h: 'h-36', wide: false }
    case 'notes':     return { h: 'h-36', wide: false }
    case 'link':      return { h: 'h-36', wide: false }
    case 'countdown': return { h: 'h-36', wide: false }
    case 'focus':     return { h: 'h-36', wide: false }
    case 'html':      return { h: 'h-44', wide: false }
    case 'webhook':   return { h: 'h-44', wide: false }
    case 'news':      return { h: 'h-52', wide: true  }
    case 'calendar':  return { h: 'h-44', wide: true  }
    case 'tasks':     return { h: 'h-56', wide: true  }
    case 'magnets':   return { h: 'h-56', wide: true  }
    case 'habits':    return { h: 'h-52', wide: true  }
    case 'today':     return { h: 'h-64', wide: true  }
    default:          return { h: 'h-36', wide: false }
  }
}

// Cycle: undefined → 'wide' → 'full' → undefined
function nextSize(current) {
  if (!current)         return 'wide'
  if (current === 'wide') return 'full'
  return undefined
}

function colSpanClass(widget) {
  const { wide } = getWidgetMeta(widget.type)
  if (widget.size === 'full') return 'md:col-span-4'
  if (widget.size === 'wide') return 'md:col-span-2'
  if (wide)                   return 'md:col-span-2'
  return ''
}

const EMOJI_MAP = {
  clock: '🕐', weather: '🌤️', news: '📰', quote: '💭',
  calendar: '📅', tasks: '✅', notes: '📝', countdown: '⏳',
  magnets: '📌', today: '📋', link: '🔗', webhook: '🪝',
  html: '🧩', habits: '✅', focus: '⏱️',
}

function SortableWidgetCard({ widget, onRemove, onUpdate, onResize }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: widget.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
    zIndex: isDragging ? 1 : undefined,
  }

  const { h } = getWidgetMeta(widget.type)
  const colSpan = colSpanClass(widget)
  const isQuote = widget.type === 'quote'
  const handleUpdate = (cfg) => onUpdate?.(widget.id, cfg)

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`relative group ${h} ${colSpan} ${
        isQuote
          ? 'flex items-center justify-center'
          : 'bg-surface border border-border rounded-2xl overflow-hidden'
      }`}
    >
      {/* Drag handle */}
      <button
        {...listeners}
        className="absolute top-1.5 left-1.5 z-10 w-5 h-5 flex items-center justify-center text-muted/30 hover:text-muted/70 cursor-grab active:cursor-grabbing rounded text-[9px] opacity-0 group-hover:opacity-100 transition-all select-none"
        title="Drag to reorder"
      >
        ⠿
      </button>

      {/* Resize button */}
      <button
        onClick={() => onResize?.(widget.id, nextSize(widget.size))}
        className="absolute top-1.5 left-7 z-10 w-5 h-5 flex items-center justify-center text-muted/30 hover:text-accent text-[11px] opacity-0 group-hover:opacity-100 transition-all rounded"
        title={`Resize — ${widget.size || 'default'}`}
      >
        ⤢
      </button>

      {/* Remove button */}
      <button
        onClick={() => onRemove?.(widget.id)}
        className="absolute top-1.5 right-1.5 z-10 w-5 h-5 flex items-center justify-center text-muted/40 hover:text-danger hover:bg-surface2/80 rounded-full text-xs transition-all opacity-0 group-hover:opacity-100"
        title="Remove widget"
      >
        ×
      </button>

      <div className="w-full h-full">
        {widget.type === 'clock'     && <ClockWidget />}
        {widget.type === 'weather'   && <WeatherWidget widget={widget} />}
        {widget.type === 'news'      && <NewsWidget widget={widget} />}
        {widget.type === 'quote'     && <QuoteWidget widget={widget} />}
        {widget.type === 'calendar'  && <CalendarWidget />}
        {widget.type === 'tasks'     && <TasksWidget widget={widget} onUpdate={handleUpdate} />}
        {widget.type === 'notes'     && <NotesWidget widget={widget} onUpdate={handleUpdate} />}
        {widget.type === 'countdown' && <CountdownWidget widget={widget} onUpdate={handleUpdate} />}
        {widget.type === 'magnets'   && <MagnetBoardWidget widget={widget} onUpdate={handleUpdate} />}
        {widget.type === 'today'     && <TodayWidget widget={widget} onUpdate={handleUpdate} />}
        {widget.type === 'link'      && <LinkWidget widget={widget} onUpdate={handleUpdate} />}
        {widget.type === 'webhook'   && <WebhookWidget widget={widget} onUpdate={handleUpdate} />}
        {widget.type === 'habits'    && <HabitWidget widget={widget} onUpdate={handleUpdate} />}
        {widget.type === 'focus'     && <FocusTimerWidget widget={widget} onUpdate={handleUpdate} />}
        {widget.type === 'html'      && <HtmlWidget content={widget.config?.html || ''} title="HTML Widget" />}
      </div>
    </div>
  )
}

export function WidgetRow({
  tabId,
  widgets = [],
  onManage,
  onRemoveWidget,
  onUpdateWidget,
  onReorderWidgets,
  onResizeWidget,
}) {
  const [activeId, setActiveId] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  )

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

  function handleDragEnd({ active, over }) {
    setActiveId(null)
    if (!over || active.id === over.id) return
    const oldIndex = widgets.findIndex(w => w.id === active.id)
    const newIndex = widgets.findIndex(w => w.id === over.id)
    if (oldIndex !== -1 && newIndex !== -1) {
      onReorderWidgets?.(arrayMove(widgets, oldIndex, newIndex))
    }
  }

  const activeWidget = widgets.find(w => w.id === activeId)

  return (
    <div className="px-6 pb-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={({ active }) => setActiveId(active.id)}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <SortableContext items={widgets.map(w => w.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {widgets.map(widget => (
              <SortableWidgetCard
                key={widget.id}
                widget={widget}
                onRemove={onRemoveWidget}
                onUpdate={onUpdateWidget}
                onResize={onResizeWidget}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay dropAnimation={null}>
          {activeWidget && (
            <div
              className={`bg-surface border-2 border-accent/60 rounded-2xl shadow-2xl shadow-black/50 flex items-center justify-center ${getWidgetMeta(activeWidget.type).h}`}
              style={{ width: '160px', opacity: 0.85 }}
            >
              <span className="text-3xl">{EMOJI_MAP[activeWidget.type] || '📦'}</span>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {/* Add button lives outside DndContext so sensor events never touch it */}
      <div className="mt-3">
        <button
          onClick={onManage}
          className="flex items-center gap-2 px-4 py-2 text-xs border border-dashed border-border text-muted hover:text-accent hover:border-accent/40 hover:bg-surface/30 rounded-xl transition-all"
        >
          <span className="text-base">＋</span>
          Add Widget
        </button>
      </div>
    </div>
  )
}
