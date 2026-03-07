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
    'w-full rounded-2xl border px-4 py-4 text-left transition focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:cursor-not-allowed disabled:opacity-60 flex items-center gap-3'
  const tone = selected
    ? 'border-primary bg-primary/10 text-text shadow-glow'
    : 'border-secondary/60 bg-background/90 text-text hover:border-accent hover:bg-secondary/18'
  const classes = [base, tone, className].filter(Boolean).join(' ')

  return (
    <button
      type="button"
      aria-pressed={selected}
      className={classes}
      {...buttonProps}
    >
      {leading ? <span className="text-lg text-accent">{leading}</span> : null}
      <span className="flex flex-col">
        <span className="text-base font-semibold leading-tight">{label}</span>
        {description ? (
          <span className="mt-1 text-xs text-text/65">{description}</span>
        ) : null}
      </span>
    </button>
  )
}
