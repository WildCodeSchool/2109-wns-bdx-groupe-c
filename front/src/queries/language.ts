import { gql } from '@apollo/client'

export const GET_ALL_LANGUAGES = gql`
query Query {
  languages {
    id
    name
  }
}
`