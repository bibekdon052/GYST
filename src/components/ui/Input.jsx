export function Input({
  label,
  error,
  className = '',
  wrapperClassName = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1 ${wrapperClassName}`}>
      {label && (
        <label className="text-xs font-medium text-muted">{label}</label>
      )}
      <input
        className={`
          w-full bg-surface2 border border-border rounded-lg px-3 py-2.5
          text-sm text-text placeholder:text-muted/60
          focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/20
          transition-colors duration-150
          ${error ? 'border-danger/60 focus:border-danger focus:ring-danger/20' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  )
}
