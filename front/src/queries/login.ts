import { gql } from '@apollo/client'

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const SIGN_UP = gql`
  mutation Mutation($firstName: String!, $lastName: String!, $password: String!, $email: String!) {
    signUp(firstName: $firstName, lastName: $lastName, password: $password, email: $email) {
      firstName
      lastName
      email
    }
  }
`;