import { useState } from 'react'

export function TasksWidget({ widget, onUpdate }) {
  const [newTask, setNewTask] = useState('')
  const tasks = widget.config?.tasks || []
  const doneCount = tasks.filter(t => t.done).length

  function addTask() {
    const text = newTask.trim()
    if (!text) return
    onUpdate({ tasks: [...tasks, { id: String(Date.now()), text, done: false }] })
    setNewTask('')
  }

  function toggleTask(id) {
    onUpdate({ tasks: tasks.map(t => t.id === id ? { ...t, done: !t.done } : t) })
  }

  function deleteTask(id) {
    onUpdate({ tasks: tasks.filter(t => t.id !== id) })
  }

  function clearDone() {
    onUpdate({ tasks: tasks.filter(t => !t.done) })
  }

  return (
    <div className="p-3 h-full flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-base leading-none">✅</span>
        <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">Tasks</span>
        {tasks.length > 0 && (
          <span className="ml-auto text-[11px] text-muted">{doneCount}/{tasks.length}</span>
        )}
        {doneCount > 0 && (
          <button
            onClick={clearDone}
            className="text-[10px] text-muted/50 hover:text-accent transition-colors ml-1"
            title="Clear completed"
          >
            Clear done
          </button>
        )}
      </div>

      {/* Task list */}
      <div className="flex-1 overflow-y-auto min-h-0 space-y-1 pr-0.5">
        {tasks.length === 0 && (
          <p className="text-xs text-muted/50 text-center pt-4">Nothing here yet — add a task below</p>
        )}
        {tasks.map(task => (
          <div key={task.id} className="flex items-start gap-2 group py-0.5">
            <button
              onClick={() => toggleTask(task.id)}
              className={`mt-0.5 w-4 h-4 shrink-0 rounded border flex items-center justify-center transition-colors ${
                task.done
                  ? 'bg-accent border-accent'
                  : 'border-border hover:border-accent/60'
              }`}
            >
              {task.done && <span className="text-[9px] text-white leading-none">✓</span>}
            </button>
            <span className={`text-xs flex-1 leading-snug pt-0.5 ${
              task.done ? 'line-through text-muted/40' : 'text-text'
            }`}>
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-muted/30 hover:text-danger text-sm opacity-0 group-hover:opacity-100 transition-opacity shrink-0 leading-none mt-0.5"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Add input */}
      <form
        onSubmit={e => { e.preventDefault(); addTask() }}
        className="flex gap-1.5 shrink-0"
      >
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Add a task…"
          className="flex-1 min-w-0 bg-surface2 border border-border rounded-lg px-2 py-1.5 text-xs text-text focus:outline-none focus:border-accent/60 placeholder:text-muted/60"
          maxLength={120}
        />
        <button
          type="submit"
          disabled={!newTask.trim()}
          className="px-2.5 bg-accent text-white text-sm font-medium rounded-lg disabled:opacity-30 hover:opacity-90 transition-opacity shrink-0"
        >
          +
        </button>
      </form>
    </div>
  )
}
