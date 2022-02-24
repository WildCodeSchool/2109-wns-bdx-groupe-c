import { gql } from '@apollo/client'

export const GET_ALL_STATUS = gql`
  query Query {
    status {
      name
    }
  }
`
