import { gql } from '@apollo/client'

export const SUBMIT_PASSENGER_INTAKE = gql`
  mutation SubmitPassengerIntake($input: PassengerIntakeInput!) {
    submitPassengerIntake(input: $input) {
      ok
      message
    }
  }
`
