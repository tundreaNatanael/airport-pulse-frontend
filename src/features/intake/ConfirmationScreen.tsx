import { QuestionCard } from '../../components/QuestionCard'

type ConfirmationScreenProps = {
  onRestart?: () => void
}

export function ConfirmationScreen({ onRestart }: ConfirmationScreenProps) {
  return (
    <QuestionCard title="Response sent" subtitle="Thanks. Your response was sent. Transport providers can now better prepare for your arrival.">
      <div className="flex flex-col gap-3 text-sm text-text">
        <p className="text-base font-semibold text-primary">
          You&apos;re all set.
        </p>
        <p className="text-sm text-text/70">
          If you need to change something, you can go back and resubmit.
        </p>
        {onRestart ? (
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center justify-center rounded-xl border border-secondary px-4 py-3 text-sm font-semibold text-text transition hover:border-accent hover:bg-secondary/15"
          >
            Send another response
          </button>
        ) : null}
      </div>
    </QuestionCard>
  )
}
