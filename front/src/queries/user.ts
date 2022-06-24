import { gql } from '@apollo/client'

export const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      firstName
      lastName
      email
      createdAt
      role {
        name
        identifier
      }
    }
  }
`;

export const MY_LANGUAGES = gql`
  query MyLanguages {
    myLanguages {
      id
      rating
      language {
        name
      }
      user {
        firstName
        lastName
        email
        createdAt
        projectsCreated {
          id
        }
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

export const USER_MY_PROJECTS = gql`
  query MyProjects($statusName: String) {
    myProjects(statusName: $statusName) {
      id
      user {
        lastName
        firstName
      }
      project {
        name
      }
    }
  }
`;

export const ADD_LANGUAGE = gql`
  mutation Mutation($languageId: Int!, $rating: Float!) {
    addLanguageToMe(languageId: $languageId, rating: $rating) {
      rating
      language {
        name
      }
    }
  }
`;
