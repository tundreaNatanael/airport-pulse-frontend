import type { FlightConnections, FlightDetails } from '../../types/flight'

type FlightDetailsBadgeProps = {
  flightDesignator: string
  loading: boolean
  details: FlightDetails | null
  errorMessage?: string | null
  showConnections?: boolean
}

const formatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const formatTime = (value?: string | null) =>
  value ? formatter.format(new Date(value)) : 'N/A'

const buildTimeBlock = (
  actual: string | null | undefined,
  expected: string | null | undefined,
) => {
  const primaryLabel = actual ? 'Actual' : 'Expected'
  const primaryValue = formatTime(actual ?? expected)
  const secondary =
    actual && expected
      ? {
          label: 'Expected',
          value: formatTime(expected),
        }
      : null

  return { primaryLabel, primaryValue, secondary }
}

const buildConnections = (connections: FlightConnections | null | undefined) => {
  if (!connections) return []

  const items: { label: string; href: string }[] = []

  if (connections.boltServices) items.push({ label: 'Bolt', href: connections.boltServices })
  if (connections.uberServices) items.push({ label: 'Uber', href: connections.uberServices })

  const publicTransport = connections.publicTransport ?? connections.public_transport
  if (publicTransport?.taxi) items.push({ label: 'Taxi', href: publicTransport.taxi })
  if (publicTransport?.buses) items.push({ label: 'Buses', href: publicTransport.buses })
  if (publicTransport?.metro) items.push({ label: 'Metro', href: publicTransport.metro })
  if (publicTransport?.trains) items.push({ label: 'Trains', href: publicTransport.trains })
  if (publicTransport?.rental_car)
    items.push({ label: 'Rental car', href: publicTransport.rental_car })

  return items
}

export function FlightDetailsBadge({
  flightDesignator,
  details,
  loading,
  errorMessage,
  showConnections = false,
}: FlightDetailsBadgeProps) {
  const connections = buildConnections(details?.connections)
  const departureTimes = buildTimeBlock(
    details?.actual_departure_time,
    details?.expected_departure_time,
  )
  const arrivalTimes = buildTimeBlock(
    details?.actual_arrival_time,
    details?.expected_arrival_time,
  )

  return (
    <aside className="mb-3 rounded-2xl border border-primary/25 bg-primary/5 px-4 py-3 text-sm shadow-glow">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-text/60">Flight</p>
          <p className="text-base font-semibold text-primary">
            {details?.flight_number || flightDesignator.toUpperCase()}
          </p>
          {details?.aircraft_type ? (
            <p className="text-[12px] text-text/70">Aircraft {details.aircraft_type}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-2 text-[12px] text-text/70">
          {loading ? (
            <span className="animate-pulse rounded-full bg-primary/40 px-3 py-1 text-background">
              Fetching...
            </span>
          ) : details ? (
            <span className="rounded-full bg-secondary/50 px-3 py-1 text-xs font-semibold text-text">
              Identified
            </span>
          ) : errorMessage ? (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
              Retry later
            </span>
          ) : null}
        </div>
      </div>

      {errorMessage && !details ? (
        <p className="mt-2 text-[12px] text-amber-800">{errorMessage}</p>
      ) : null}

      {details ? (
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wide text-text/60">Departure</p>
            {details.departure_airport ? (
              <p className="text-sm font-semibold text-text">{details.departure_airport}</p>
            ) : null}
            <p className="text-[12px] font-semibold text-text">
              {departureTimes.primaryLabel}: {departureTimes.primaryValue}
            </p>
            {departureTimes.secondary ? (
              <p className="text-[12px] text-text/70">
                {departureTimes.secondary.label}: {departureTimes.secondary.value}
              </p>
            ) : null}
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wide text-text/60">Arrival</p>
            {details.arrival_airport ? (
              <p className="text-sm font-semibold text-text">{details.arrival_airport}</p>
            ) : null}
            <p className="text-[12px] font-semibold text-text">
              {arrivalTimes.primaryLabel}: {arrivalTimes.primaryValue}
            </p>
            {arrivalTimes.secondary ? (
              <p className="text-[12px] text-text/70">
                {arrivalTimes.secondary.label}: {arrivalTimes.secondary.value}
              </p>
            ) : null}
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wide text-text/60">Duration</p>
            <p className="text-sm font-semibold text-text">{details.flight_duration || 'N/A'}</p>
          </div>
        </div>
      ) : null}

      {showConnections && connections.length > 0 ? (
        <div className="mt-3 border-t border-secondary/60 pt-3">
          <p className="text-[11px] uppercase tracking-wide text-text/60">Connections</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {connections.map((item) => (
              <a
                key={`${item.label}-${item.href}`}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background px-3 py-1 text-[12px] font-semibold text-primary transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10"
              >
                <span>{item.label}</span>
                <span aria-hidden="true">-&gt;</span>
              </a>
            ))}
          </div>
          <p className="mt-1 text-[12px] text-text/65">
            Selecting an option will open the provider link.
          </p>
        </div>
      ) : null}
    </aside>
  )
}
