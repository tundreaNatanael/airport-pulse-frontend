type ProgressHeaderProps = {
  currentStep: number
  totalSteps: number
}

export function ProgressHeader({ currentStep, totalSteps }: ProgressHeaderProps) {
  const clampedStep = Math.min(Math.max(currentStep, 1), totalSteps)
  const percent = Math.round((clampedStep / totalSteps) * 100)

  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex-1 overflow-hidden rounded-full bg-slate-800/80">
        <div
          className="h-2 rounded-full bg-runway-500 transition-[width]"
          style={{ width: `${percent}%` }}
          aria-hidden
        />
      </div>
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-300">
        Step {clampedStep}/{totalSteps}
      </div>
    </div>
  )
}
