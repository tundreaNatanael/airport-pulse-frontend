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
    <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2">
      {label ? <span className="text-xs uppercase tracking-wide text-slate-400">{label}</span> : null}
      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-lg font-semibold text-slate-100 transition hover:border-runway-400 hover:text-runway-50 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() => handleChange(-1)}
          disabled={disabled || value <= min}
          aria-label="Decrease"
        >
          –
        </button>
        <span className="min-w-[2.5rem] text-center text-lg font-semibold tabular-nums text-runway-50">
          {value}
        </span>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-runway-500 bg-runway-500 text-lg font-semibold text-white transition hover:bg-runway-400 disabled:cursor-not-allowed disabled:opacity-60"
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
