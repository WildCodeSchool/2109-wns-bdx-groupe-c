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
        id
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

export const MUTATION_UPDATE_PROJECT_INFORMATIONS = gql`
mutation UpdateProject($updateProjectId: Int!, $name: String, $shortText: String, $description: String, $initialTimeSpent: Float) {
  updateProject(id: $updateProjectId, name: $name, shortText: $shortText, description: $description, initialTimeSpent: $initialTimeSpent) {
    name
    shortText
    description
  }
}
`

export const MUTATION_UPDATE_PROJECT_LANGUAGES = gql`
mutation UpdateProjectLanguages($updateProjectLanguagesId: Int!, $languagesId: [Int!]!) {
  updateProjectLanguages(id: $updateProjectLanguagesId, languagesId: $languagesId) {
    name
    shortText
    description
  }
}
`
export const MUTATION_DELETE_PROJECT = gql`
mutation UpdateProjectLanguages($deleteProjectId: Float!) {
  deleteProject(id: $deleteProjectId) {
    name
    shortText
  }
}
`

export const MUTATION_RESET_TASKS_PROJECT = gql`
mutation ResetAllTasks($resetAllTasksId: Float!) {
  resetAllTasks(id: $resetAllTasksId) {
    name
    shortText
  }
}
`