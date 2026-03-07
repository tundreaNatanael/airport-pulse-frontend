export type LuggageType = 'nothing' | 'in_hand' | 'regular' | 'more'

export interface PassengerIntakePayload {
  flightDesignator: string | null
  luggageType: LuggageType
  luggageCount: number | null
  companionsCount: number | null
}

export interface PassengerIntakeDraft {
  flightDesignator: string | null
  luggageType: LuggageType | null
  luggageCount: number | null
  companionsCount: number | null
}
