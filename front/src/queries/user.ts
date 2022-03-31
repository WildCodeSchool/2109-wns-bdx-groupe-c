import { gql } from '@apollo/client'

export const MY_PROFILE = gql`
query MyProfile {
  myProfile {
    firstName
    lastName
    email
    role {
      name
      identifier
    }
  }
}
`;


export const LOG_OUT = gql`
mutation LogOut {
  logOut
}
`;