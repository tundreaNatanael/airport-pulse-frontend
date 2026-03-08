export interface PublicTransportOptions {
  taxi: string | null
  buses: string | null
  metro: string | null
  trains: string | null
  rental_car: string | null
}

export interface FlightConnections {
  boltServices: string | null
  uberServices: string | null
  public_transport: PublicTransportOptions | null
}

export interface FlightDetails {
  flight_number: string | null
  aircraft_type: string | null
  expected_departure_time: string | null
  expected_arrival_time: string | null
  actual_departure_time: string | null
  actual_arrival_time: string | null
  flight_duration: string | null
  departure_airport: string | null
  arrival_airport: string | null
  connections: FlightConnections | null
}
