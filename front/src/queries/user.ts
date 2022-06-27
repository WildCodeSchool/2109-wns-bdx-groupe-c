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

export const GET_ALL_USERS = gql`
query Users {
  users {
    id
    firstName
    lastName
  }
}
`;

export const SIGN_UP = gql`
  mutation Mutation($firstName: String!, $lastName: String!, $password: String!, $email: String!) {
    signUp(firstName: $firstName, lastName: $lastName, password: $password, email: $email) {
      firstName
      lastName
      email
      isActive
    }
  }
`;
