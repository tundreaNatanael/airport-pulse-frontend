import type { PropsWithChildren } from 'react'

type QuestionCardProps = PropsWithChildren<{
  title: string
  subtitle?: string
  className?: string
}>

export function QuestionCard({ title, subtitle, children, className }: QuestionCardProps) {
  return (
    <section
      className={`rounded-2xl border border-runway-400/30 bg-slate-900/80 p-6 shadow-glow backdrop-blur ${
        className ?? ''
      }`}
    >
      <h1 className="text-2xl font-semibold tracking-tight text-runway-50">{title}</h1>
      {subtitle ? <p className="mt-2 text-sm text-slate-300">{subtitle}</p> : null}
      <div className="mt-6 space-y-3">{children}</div>
    </section>
  )
}
