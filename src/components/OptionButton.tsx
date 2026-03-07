import type { ButtonHTMLAttributes, ReactNode } from 'react'

type OptionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  description?: string
  leading?: ReactNode
  selected?: boolean
}

export function OptionButton({
  label,
  description,
  leading,
  selected = false,
  className,
  ...buttonProps
}: OptionButtonProps) {
  const base =
    'w-full rounded-2xl border px-4 py-4 text-left transition focus:outline-none focus:ring-2 focus:ring-runway-400 disabled:cursor-not-allowed disabled:opacity-60 flex items-center gap-3'
  const tone = selected
    ? 'border-runway-400 bg-runway-400/10 text-runway-50 shadow-glow'
    : 'border-slate-700 bg-slate-900/70 text-slate-100 hover:border-runway-400 hover:bg-slate-800/90'
  const classes = [base, tone, className].filter(Boolean).join(' ')

  return (
    <button
      type="button"
      aria-pressed={selected}
      className={classes}
      {...buttonProps}
    >
      {leading ? <span className="text-lg text-runway-100">{leading}</span> : null}
      <span className="flex flex-col">
        <span className="text-base font-semibold leading-tight">{label}</span>
        {description ? (
          <span className="mt-1 text-xs text-slate-300">{description}</span>
        ) : null}
      </span>
    </button>
  )
}
