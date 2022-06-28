import { gql } from '@apollo/client'

export const GET_ONE_PROJECT = gql`
  query Query($projectId: Float!) {
    project(id: $projectId) {
      id
      name
      shortText
      initialTimeSpent
      description
      createdAt
      countAssignee
      languages {
        name
      }
    }
  }
`

export const GET_ALL_PROJECTS = gql`
  query Query {
    projects {
      id
      name
      shortText
      description
      initialTimeSpent
      createdAt
      countAssignee
      languages {
        name
      }
    }
  }
`

export const GET_MY_PROJECTS = gql`
  query Query {
    myProjects {
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

export const MUTATION_CREATE_PROJECT = gql`
mutation CreateProject($name: String!, $shortText: String!, $description: String!, $initialTimeSpent: Float!) {
  createProject(name: $name, shortText: $shortText, description: $description, initialTimeSpent: $initialTimeSpent) {
    name
    shortText
    description
  }
}
`