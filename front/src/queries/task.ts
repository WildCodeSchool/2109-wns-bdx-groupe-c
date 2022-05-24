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

export const MUTATION_UPDATE_STATUS_TASK = gql`
  mutation UpdateStatus($updateStatusId: Int!, $statusId: Int!) {
    updateStatus(id: $updateStatusId, statusId: $statusId) {
      subject
      shortText
    }
  }
`

export const MUTATION_CREATE_TASK = gql`
mutation CreateTask($subject: String!, $shortText: String!, $description: String!, $projectId: Int!, $dueDate: DateTime!, $expectedDuration: Int!) {
  createTask(subject: $subject, shortText: $shortText, description: $description, projectId: $projectId, dueDate: $dueDate, expectedDuration: $expectedDuration) {
    subject
    shortText
    description
  }
}
`

export const MUTATION_DELETE_TASK = gql`
mutation UpdateStatus($deleteTaskId: Float!) {
  deleteTask(id: $deleteTaskId) {
    subject
    shortText
  }
}
`