import { gql } from '@apollo/client'

export const GET_ALL_STATUS = gql`
  query Query {
    status {
      name
    }
  }
`


export const GET_TASKS_BY_STATUS_BY_PROJECTID = gql`
query TaskByStatusByProject($projectId: Int!) {
  taskByStatusByProject(projectId: $projectId) {
    id
    name
    tasks {
      subject
      shortText
    }
  }
}
`
