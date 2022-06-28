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

export const USER_MY_TASKS = gql`
query MyTasks($statusName: String) {
  myTasks(statusName: $statusName) {
    id
    subject
    shortText
    description
    project {
      name
      id
    }
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
