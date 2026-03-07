import { Link } from 'react-router-dom'
import { QuestionCard } from '../../components/QuestionCard'
import { ScreenContainer } from '../../components/ScreenContainer'

export function ConfirmationPage() {
  return (
    <ScreenContainer>
      <QuestionCard
        title="Submission Received"
        subtitle="Confirmation screen placeholder for post-submit success state."
      >
        <p className="text-sm text-slate-300">
          Your response flow will land here after GraphQL submission is wired
          into the intake form.
        </p>
        <Link
          to="/"
          className="inline-flex w-full items-center justify-center rounded-xl border border-runway-400 px-4 py-3 text-sm font-semibold text-runway-100 transition hover:bg-runway-500/10"
        >
          Back To Intake Placeholder
        </Link>
      </QuestionCard>
    </ScreenContainer>
  )
}
