import { Link } from 'react-router-dom'
import { ScreenContainer } from '../../components/ScreenContainer'
import { ConfirmationScreen } from './ConfirmationScreen'

export function ConfirmationPage() {
  return (
    <ScreenContainer>
      <ConfirmationScreen
        onRestart={() => {
          window.location.href = '/'
        }}
      />
      <Link
        to="/"
        className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-secondary px-4 py-3 text-sm font-semibold text-text transition hover:border-accent hover:bg-secondary/15"
      >
        Back to intake
      </Link>
    </ScreenContainer>
  )
}
