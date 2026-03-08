export type LuggageType = 'nothing' | 'in_hand' | 'regular' | 'more'

export type ConnectionChoice =
  | 'boltServices'
  | 'uberServices'
  | 'publicTransport.taxi'
  | 'publicTransport.metro'
  | 'publicTransport.trains'
  | 'rentalCar'
  | null

export interface PassengerIntakePayload {
  flightDesignator: string | null
  luggageType: LuggageType
  luggageCount: number | null
  companionsCount: number | null
  connectionSelected: ConnectionChoice
}

export interface PassengerIntakeDraft {
  flightDesignator: string | null
  luggageType: LuggageType | null
  luggageCount: number | null
  companionsCount: number | null
  connectionSelected: ConnectionChoice
}
