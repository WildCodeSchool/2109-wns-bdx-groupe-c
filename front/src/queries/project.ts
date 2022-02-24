import { gql } from '@apollo/client'

export const GET_MY_PROJECTS = gql`
  query Query($userId: Int!) {
    myProjects(userId: $userId) {
      id
      user {
        firstName
        lastName
      }
      project {
        name
        shortText
        countAssignee
        languages {
          name
        }
      }
      projectRole {
        name
      }
    }
  }
`
