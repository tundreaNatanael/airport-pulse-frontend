import type { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

type QuestionCardProps = PropsWithChildren<{
  title: string
  subtitle?: string
}>

export function QuestionCard({ title, subtitle, children }: QuestionCardProps) {
  return (
    <motion.section
      initial={{ x: 24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="rounded-2xl border border-runway-400/30 bg-slate-900/80 p-6 shadow-glow backdrop-blur"
    >
      <h1 className="text-2xl font-semibold tracking-tight text-runway-50">{title}</h1>
      {subtitle ? <p className="mt-2 text-sm text-slate-300">{subtitle}</p> : null}
      <div className="mt-6 space-y-3">{children}</div>
    </motion.section>
  )
}
