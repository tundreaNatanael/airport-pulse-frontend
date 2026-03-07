import { QuestionCard } from '../../components/QuestionCard'

type ConfirmationScreenProps = {
  onRestart?: () => void
}

export function ConfirmationScreen({ onRestart }: ConfirmationScreenProps) {
  return (
    <QuestionCard title="Response sent" subtitle="Thanks. Your response was sent. Transport providers can now better prepare for your arrival.">
      <div className="flex flex-col gap-3 text-sm text-slate-200">
        <p className="text-base font-semibold text-runway-50">
          You&apos;re all set.
        </p>
        <p className="text-sm text-slate-300">
          If you need to change something, you can go back and resubmit.
        </p>
        {onRestart ? (
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center justify-center rounded-xl border border-runway-400 px-4 py-3 text-sm font-semibold text-runway-100 transition hover:bg-runway-500/10"
          >
            Send another response
          </button>
        ) : null}
      </div>
    </QuestionCard>
  )
}
