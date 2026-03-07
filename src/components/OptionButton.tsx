import type { ButtonHTMLAttributes } from 'react'

type OptionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  description?: string
}

export function OptionButton({
  label,
  description,
  className,
  ...buttonProps
}: OptionButtonProps) {
  return (
    <button
      type="button"
      className={`w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-left transition hover:border-runway-400 hover:bg-slate-800/90 focus:outline-none focus:ring-2 focus:ring-runway-400 disabled:cursor-not-allowed disabled:opacity-60 ${
        className ?? ''
      }`}
      {...buttonProps}
    >
      <span className="block text-sm font-medium text-slate-100">{label}</span>
      {description ? (
        <span className="mt-1 block text-xs text-slate-400">{description}</span>
      ) : null}
    </button>
  )
}
