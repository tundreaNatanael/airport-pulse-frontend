import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useLazyQuery, useMutation } from '@apollo/client/react'
import { OptionButton } from '../../components/OptionButton'
import { QuestionCard } from '../../components/QuestionCard'
import { ScreenContainer } from '../../components/ScreenContainer'
import { getOptionalQueryParam } from '../../lib/queryParams'
import { NumericStepper } from '../../components/NumericStepper'
import { ProgressHeader } from '../../components/ProgressHeader'
import { ConfirmationScreen } from './ConfirmationScreen'
import { SUBMIT_PASSENGER_INTAKE } from '../../graphql/mutations'
import { GET_FLIGHT_DETAILS } from '../../graphql/queries'
import { FlightDetailsBadge } from './FlightDetailsBadge'
import type { FlightDetails } from '../../types/flight'
import type {
  ConnectionChoice,
  LuggageType,
  PassengerIntakeDraft,
  PassengerIntakePayload,
} from '../../types/intake'

type Step = 0 | 1 | 2 | 3

type SubmitResponse = {
  submitPassengerIntake: {
    ok: boolean
    message?: string | null
  }
}

type SubmitVariables = {
  input: PassengerIntakePayload
}

type FlightDetailsResponse = {
  flightDetails: FlightDetails | null
}

type FlightDetailsVariables = {
  flightDesignator: string
}

type ConnectionOption = {
  label: string
  href: string
  icon: string
  value: ConnectionChoice
}

const TOTAL_STEPS = 4

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
}

export function IntakePage() {
  const location = useLocation()
  const initialFlight = useMemo(
    () => getOptionalQueryParam(location.search, 'flightDesignator'),
    [location.search],
  )

  const [draft, setDraft] = useState<PassengerIntakeDraft>({
    flightDesignator: initialFlight,
    luggageType: null,
    luggageCount: null,
    companionsCount: null,
    connectionSelected: null,
  })
  const [flightInput, setFlightInput] = useState(initialFlight ?? '')
  const [luggageCount, setLuggageCount] = useState<number>(2)
  const [companionsCount, setCompanionsCount] = useState<number>(1)
  const [step, setStep] = useState<Step>(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [status, setStatus] = useState<'filling' | 'submitting' | 'error' | 'done'>(
    'filling',
  )
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [lastPayload, setLastPayload] = useState<PassengerIntakePayload | null>(null)

  const [submitIntake, { loading }] = useMutation<SubmitResponse, SubmitVariables>(
    SUBMIT_PASSENGER_INTAKE,
  )
  const [loadFlightDetails, { data: flightData, loading: flightLoading, error: flightError }] =
    useLazyQuery<FlightDetailsResponse, FlightDetailsVariables>(GET_FLIGHT_DETAILS, {
      fetchPolicy: 'network-only',
    })

  const goToStep = (next: Step, dir: 1 | -1) => {
    setDirection(dir)
    setStep(next)
  }

  const goForward = () => {
    setDirection(1)
    setStep((prev) => (prev < TOTAL_STEPS - 1 ? ((prev + 1) as Step) : prev))
  }

  const goBack = () => {
    setDirection(-1)
    setStep((prev) => (prev > 0 ? ((prev - 1) as Step) : prev))
  }

  const confirmFlight = () => {
    const trimmed = flightInput.trim()
    setDraft((prev) => ({
      ...prev,
      flightDesignator: trimmed.length > 0 ? trimmed : null,
    }))
    goForward()
  }

  const skipFlight = () => {
    setFlightInput('')
    setDraft((prev) => ({ ...prev, flightDesignator: null }))
    goForward()
  }

  const selectLuggage = (luggageType: LuggageType) => {
    if (luggageType === 'more') {
      setDraft((prev) => ({
        ...prev,
        luggageType,
        luggageCount: Math.max(1, luggageCount),
      }))
      return
    }

    const count = luggageType === 'nothing' ? 0 : 1
    setDraft((prev) => ({
      ...prev,
      luggageType,
      luggageCount: count,
    }))
    goForward()
  }

  const confirmLuggageCount = () => {
    setDraft((prev) => ({
      ...prev,
      luggageType: 'more',
      luggageCount: Math.max(1, luggageCount),
    }))
    goForward()
  }

  const handleAlone = () => {
    setDraft((prev) => ({ ...prev, companionsCount: 0, connectionSelected: null }))
    goForward()
  }

  const handleCompanionCount = () => {
    setDraft((prev) => ({
      ...prev,
      companionsCount: Math.max(1, companionsCount),
      connectionSelected: null,
    }))
    goForward()
  }

  const buildPayload = (
    overrides?: Partial<PassengerIntakeDraft>,
  ): PassengerIntakePayload | null => {
    const merged: PassengerIntakeDraft = { ...draft, ...overrides }

    if (!merged.luggageType || merged.companionsCount === null) {
      return null
    }

    const normalizedFlight =
      merged.flightDesignator && merged.flightDesignator.trim().length > 0
        ? merged.flightDesignator.trim()
        : null

    return {
      flightDesignator: normalizedFlight,
      luggageType: merged.luggageType,
      luggageCount: merged.luggageCount,
      companionsCount: merged.companionsCount,
      connectionSelected: merged.connectionSelected ?? null,
    }
  }

  const submitPayload = async (payload: PassengerIntakePayload) => {
    setStatus('submitting')
    setErrorMessage(null)
    setLastPayload(payload)

    try {
      const { data } = await submitIntake({
        variables: { input: payload },
      })
      const ok = data?.submitPassengerIntake?.ok ?? true
      if (ok) {
        setStatus('done')
      } else {
        setStatus('error')
        setErrorMessage(data?.submitPassengerIntake?.message ?? 'Unable to send right now.')
      }
    } catch (err) {
      const fallback = err instanceof Error ? err.message : 'Network error'
      setErrorMessage(fallback)
      setStatus('error')
    }
  }

  const retrySubmit = () => {
    if (!lastPayload) return
    submitPayload(lastPayload)
  }

  const normalizedFlightInput = flightInput.trim()
  const flightDetails = normalizedFlightInput ? flightData?.flightDetails ?? null : null

  useEffect(() => {
    if (!normalizedFlightInput) return

    const handle = setTimeout(() => {
      loadFlightDetails({ variables: { flightDesignator: normalizedFlightInput } })
    }, 400)

    return () => clearTimeout(handle)
  }, [loadFlightDetails, normalizedFlightInput])

  const connectionOptions: ConnectionOption[] = useMemo(() => {
    if (!flightDetails?.connections) return []
    const options: ConnectionOption[] = []
    const addOption = (
      label: string,
      value: ConnectionChoice,
      href?: string | null,
      icon?: string,
    ) => {
      if (!href || href.trim().length === 0) return
      options.push({ label, href, value, icon: icon ?? '🚗' })
    }

    const links = flightDetails.connections
    const publicTransport = links.publicTransport ?? links.public_transport

    addOption('Bolt', 'boltServices', links.boltServices, '🚗')
    addOption('Uber', 'uberServices', links.uberServices, '🚕')
    addOption('Taxi', 'publicTransport.taxi', publicTransport?.taxi, '🚖')
    addOption('Metro', 'publicTransport.metro', publicTransport?.metro, '🚇')
    addOption('Trains', 'publicTransport.trains', publicTransport?.trains, '🚆')
    addOption('Rental car', 'rentalCar', publicTransport?.rental_car ?? publicTransport?.rentalCar, '🚘')

    return options
  }, [flightDetails])

  const handleConnectionSelect = (option: ConnectionOption | null) => {
    const selection = option?.value ?? null
    setDraft((prev) => ({ ...prev, connectionSelected: selection }))
    const payload = buildPayload({
      connectionSelected: selection,
    })
    if (!payload) return

    if (option?.href) {
      window.open(option.href, '_blank', 'noreferrer')
    }
    submitPayload(payload)
  }

  const restart = () => {
    setDraft({
      flightDesignator: initialFlight,
      luggageType: null,
      luggageCount: null,
      companionsCount: null,
      connectionSelected: null,
    })
    setFlightInput(initialFlight ?? '')
    setLuggageCount(Math.max(2, 1))
    setCompanionsCount(1)
    setStatus('filling')
    setErrorMessage(null)
    setDirection(1)
    goToStep(0, 1)
  }

  const renderBack = () =>
    step > 0 ? (
      <button
        type="button"
        onClick={goBack}
        className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-primary"
      >
        <span aria-hidden>←</span> Back
      </button>
    ) : null

  const renderFlightCard = () => {
    const isPrefilled = Boolean(initialFlight)
    const canContinue = flightInput.trim().length > 0

    return (
      <QuestionCard
        title="What flight are you on?"
        subtitle="Enter your flight tracker so ground teams can align."
      >
        {renderBack()}
        <label className="block text-sm text-text/90">
          Flight tracker
          <input
            type="text"
            inputMode="text"
            autoFocus
            className="mt-2 w-full rounded-xl border border-secondary/70 bg-background/90 px-4 py-3 text-base font-semibold text-text placeholder:text-text/45 focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
            placeholder="e.g. QR 132, DL 404"
            value={flightInput}
            onChange={(e) => setFlightInput(e.target.value)}
          />
        </label>
        <div className="flex flex-col gap-2 pt-2">
          <button
            type="button"
            onClick={confirmFlight}
            disabled={!canContinue}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-base font-semibold text-background transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue
          </button>
          {!isPrefilled ? (
            <button
              type="button"
              onClick={skipFlight}
              className="inline-flex items-center justify-center rounded-xl border border-secondary px-4 py-3 text-sm font-semibold text-text transition hover:border-accent hover:bg-secondary/15 hover:text-accent"
            >
              Skip for now
            </button>
          ) : null}
        </div>
      </QuestionCard>
    )
  }

  const renderLuggageCard = () => {
    const luggageChoice = draft.luggageType
    const moreSelected = luggageChoice === 'more'

    return (
      <QuestionCard
        title="How much luggage do you have?"
        subtitle="Pick the closest fit. If you have many bags, set a count."
      >
        {renderBack()}
        <div className="space-y-2">
          <OptionButton
            label="Nothing"
            description="Traveling light"
            selected={luggageChoice === 'nothing'}
            onClick={() => selectLuggage('nothing')}
          />
          <OptionButton
            label="Carry-on"
            description="Small bag or backpack"
            selected={luggageChoice === 'in_hand'}
            onClick={() => selectLuggage('in_hand')}
          />
          <OptionButton
            label="Regular"
            description="One checked-size suitcase"
            selected={luggageChoice === 'regular'}
            onClick={() => selectLuggage('regular')}
          />
          <OptionButton
            label="More"
            description="Multiple checked bags"
            selected={moreSelected}
            onClick={() => selectLuggage('more')}
          />
        </div>

        {moreSelected ? (
          <div className="space-y-2 rounded-xl border border-secondary/70 bg-secondary/15 p-3">
            <NumericStepper
              value={luggageCount}
              min={1}
              onChange={setLuggageCount}
              label="How many bags?"
            />
            <button
              type="button"
              onClick={confirmLuggageCount}
              className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-base font-semibold text-background transition hover:bg-accent"
            >
              Continue
            </button>
          </div>
        ) : null}
      </QuestionCard>
    )
  }

  const renderCompanionsCard = () => {
    const withGroup = draft.companionsCount !== null && draft.companionsCount > 0

    return (
      <QuestionCard
        title="Who are you traveling with?"
        subtitle="Tell us if you have companions so transport can scale."
      >
        {renderBack()}
        <div className="space-y-2">
          <OptionButton
            label="Just me"
            description="No travel companions"
            selected={!withGroup && draft.companionsCount === 0}
            onClick={handleAlone}
          />
          <OptionButton
            label="I have companions"
            description="Set how many people"
            selected={withGroup}
            onClick={() => {
              setDraft((prev) => ({ ...prev, companionsCount: companionsCount }))
            }}
          />
        </div>

        {withGroup ? (
          <div className="space-y-2 rounded-xl border border-secondary/70 bg-secondary/15 p-3">
            <NumericStepper
              value={companionsCount}
              min={1}
              onChange={(value) => {
                setCompanionsCount(value)
                setDraft((prev) => ({ ...prev, companionsCount: value }))
              }}
              label="How many people total (besides you)?"
            />
            <button
              type="button"
              onClick={handleCompanionCount}
              className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-base font-semibold text-background transition hover:bg-accent"
            >
              Continue
            </button>
          </div>
        ) : null}
      </QuestionCard>
    )
  }

  const renderConnectionsCard = () => {
    const hasOptions = connectionOptions.length > 0

    return (
      <QuestionCard
        title="Pick your ride"
        subtitle="Choose how you plan to leave the airport so teams can route you."
      >
        {renderBack()}
        {hasOptions ? (
          <div className="grid gap-2 md:grid-cols-2">
            {connectionOptions.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => handleConnectionSelect(option)}
                className="flex w-full items-start gap-3 rounded-xl border border-secondary/70 bg-secondary/15 px-4 py-3 text-left transition hover:border-accent hover:bg-secondary/25"
              >
                <span className="text-xl">{option.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text">{option.label}</p>
                  <p className="text-[12px] text-text/70 truncate" title={option.href}>
                    {option.href}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text/70">
            We do not have transport links for this flight yet. You can still submit your details.
          </p>
        )}
        <div className="pt-3">
          <button
            type="button"
            onClick={() => handleConnectionSelect(null)}
            className="inline-flex w-full items-center justify-center rounded-xl border border-secondary px-4 py-3 text-sm font-semibold text-text transition hover:border-accent hover:bg-secondary/15 hover:text-accent"
          >
            Submit without selecting transport
          </button>
        </div>
      </QuestionCard>
    )
  }

  const renderSubmitting = () => (
    <QuestionCard title="Sending..." subtitle="Just a moment while we deliver your intake.">
      <p className="text-sm text-text/70">Hang tight, this should only take a second.</p>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary/35">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
      </div>
    </QuestionCard>
  )

  const renderError = () => (
    <QuestionCard title="Didn’t go through" subtitle="We hit a snag delivering your response.">
      <p className="text-sm text-text/70">{errorMessage ?? 'Unknown error'}</p>
      <div className="flex flex-col gap-2 pt-2">
        <button
          type="button"
          onClick={retrySubmit}
          className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-base font-semibold text-background transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
        >
          Retry
        </button>
        <button
          type="button"
          onClick={restart}
          className="inline-flex items-center justify-center rounded-xl border border-secondary px-4 py-3 text-sm font-semibold text-text transition hover:border-accent hover:bg-secondary/15 hover:text-accent"
        >
          Start over
        </button>
      </div>
    </QuestionCard>
  )

  const currentCard =
    status === 'done'
      ? 'done'
      : status === 'error'
        ? 'error'
        : status === 'submitting'
          ? 'submitting'
          : `step-${step}`

  const cardContent = () => {
    if (status === 'done') return <ConfirmationScreen onRestart={restart} />
    if (status === 'error') return renderError()
    if (status === 'submitting') return renderSubmitting()

    if (step === 0) return renderFlightCard()
    if (step === 1) return renderLuggageCard()
    if (step === 2) return renderCompanionsCard()
    return renderConnectionsCard()
  }

  return (
    <ScreenContainer>
      <div className="flex flex-col">
        <div className="mb-3">
          <h1 className="text-sm font-semibold tracking-wide text-primary">
            AeroPulse for Passengers
          </h1>
        </div>
        {normalizedFlightInput.length > 0 ? (
          <FlightDetailsBadge
            flightDesignator={normalizedFlightInput}
            details={flightDetails}
            loading={flightLoading}
            errorMessage={flightError?.message}
            showConnections={status === 'done'}
          />
        ) : null}
        <ProgressHeader
          currentStep={status === 'done' ? TOTAL_STEPS : step + 1}
          totalSteps={TOTAL_STEPS}
        />
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentCard}
            variants={slideVariants}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {cardContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </ScreenContainer>
  )
}
