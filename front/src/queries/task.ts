import { gql } from '@apollo/client'

export const GET_ALL_TASKS = gql`
  query Query {
    allTasks {
      id
      subject
      shortText
      status {
        name
      }
    }
  }
`

export const GET_TASKS_BY_PROJECT = gql`
  query Query($projectId: Float!) {
    tasks(projectId: $projectId) {
      id
      subject
      shortText
      description
      assignee {
        id
      }
      status {
        name
      }
      updatedAt
      createdAt
      dueDate
      comments {
        id
      }
    }
  }
`
