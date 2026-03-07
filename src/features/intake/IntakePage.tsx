import { Link, useLocation } from 'react-router-dom'
import { OptionButton } from '../../components/OptionButton'
import { QuestionCard } from '../../components/QuestionCard'
import { ScreenContainer } from '../../components/ScreenContainer'
import { getOptionalQueryParam } from '../../lib/queryParams'

export function IntakePage() {
  const location = useLocation()
  const flightDesignator = getOptionalQueryParam(
    location.search,
    'flightDesignator',
  )

  return (
    <ScreenContainer>
      <QuestionCard
        title="AirportPulse Intake"
        subtitle="Passenger transport intent capture (MVP scaffold). Form logic will be connected next."
      >
        <div className="rounded-lg bg-slate-800/70 p-3 text-xs text-slate-300">
          Flight designator:{' '}
          <span className="font-semibold text-runway-100">
            {flightDesignator ?? 'not provided'}
          </span>
        </div>

        <OptionButton label="Taxi" description="Placeholder option shell" />
        <OptionButton label="Rideshare" description="Placeholder option shell" />
        <OptionButton
          label="Public Transport"
          description="Placeholder option shell"
        />

        <p className="pt-2 text-xs text-slate-400">
          This screen is intentionally non-functional while backend contract and
          questionnaire details are finalized.
        </p>

        <Link
          to="/confirmation"
          className="inline-flex w-full items-center justify-center rounded-xl bg-runway-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-runway-400"
        >
          View Confirmation Placeholder
        </Link>
      </QuestionCard>
    </ScreenContainer>
  )
}
