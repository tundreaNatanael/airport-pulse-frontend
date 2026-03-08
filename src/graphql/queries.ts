import { gql } from '@apollo/client'

export const GET_FLIGHT_DETAILS = gql`
  query GetFlightDetails($flightDesignator: String!) {
    flightDetails(flightDesignator: $flightDesignator) {
      flight_number
      aircraft_type
      expected_departure_time
      expected_arrival_time
      actual_departure_time
      actual_arrival_time
      flight_duration
      departure_airport
      arrival_airport
      connections {
        boltServices
        uberServices
        publicTransport {
          taxi
          buses
          metro
          trains
          rental_car
        }
      }
    }
  }
`
