type NumericStepperProps = {
  value: number
  min?: number
  onChange: (next: number) => void
  disabled?: boolean
  label?: string
}

export function NumericStepper({
  value,
  min = 1,
  onChange,
  disabled = false,
  label,
}: NumericStepperProps) {
  const clamp = (next: number) => Math.max(min, next)

  const handleChange = (delta: number) => {
    onChange(clamp(value + delta))
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-secondary/60 bg-background/90 px-3 py-2">
      {label ? <span className="text-xs uppercase tracking-wide text-text/60">{label}</span> : null}
      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-secondary/70 bg-background text-lg font-semibold text-text transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() => handleChange(-1)}
          disabled={disabled || value <= min}
          aria-label="Decrease"
        >
          –
        </button>
        <span className="min-w-[2.5rem] text-center text-lg font-semibold tabular-nums text-primary">
          {value}
        </span>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary bg-primary text-lg font-semibold text-background transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() => handleChange(1)}
          disabled={disabled}
          aria-label="Increase"
        >
          +
        </button>
      </div>
    </div>
  )
}
