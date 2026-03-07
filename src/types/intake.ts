export type TransportIntentOption =
  | 'taxi'
  | 'rideshare'
  | 'public-transport'
  | 'parking'
  | 'other'

export interface IntakeDraft {
  flightDesignator?: string
  transportIntent?: TransportIntentOption
  passengerCount?: number
}
