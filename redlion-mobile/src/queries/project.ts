import { gql } from '@apollo/client'

export const GET_PROJECT_PART = gql`
    query Project($projectId: Float!) {
        project(id: $projectId) {
            id
            name
            languages {
                id
                name
            }
        }
    }
`;

export const GET_PROJECT_MORE = gql`
    query Project($projectId: Float!) {
        project(id: $projectId) {
            id
            name
            shortText
            description
            initialTimeSpent
            createdAt
            updatedAt
            createdBy {
                firstName
                lastName
            }
            status {
                name
            }
        }
    }
`;

export const GET_PROJECT_ALL = gql`
    query Project($projectId: Float!) {
        project(id: $projectId) {
            id
            name
            shortText
            description
            initialTimeSpent
            createdAt
            updatedAt
            createdBy {
                firstName
                lastName
            }
            languages {
                id
                name
            }
            tasks {
                id
                subject
                shortText
                description
            }
            status {
                name
            }
        }
    }
`;

export const GET_PROJECTS = gql`
    query Projects {
        projects {
            id
            name
            shortText
            description
            initialTimeSpent
            createdAt
            updatedAt
        }
    }
`;
<<<<<<< HEAD

export const GET_PROJECTS_BY_USER = gql`
    query Query($userId: Int!) {
        myProjects(userId: $userId) {
            user {
                id
            }
            project {
                id
                name
                shortText
                description
                initialTimeSpent
                createdAt
                updatedAt
                createdBy {
                firstName
                lastName
                }
                languages {
                    id
                    name
                }
                tasks {
                    subject
                    id
                    shortText
                    description
                }
                status {
                    name
                }
            }
            id
        }
    }
`;

export const GET_PROJECTS_BY_STATUS_AND_USER = gql`
    query Query($userId: Int!, $statusName: String) {
        myProjects(userId: $userId, statusName: $statusName) {
            user {
                id
            }
            project {
                id
                name
                shortText
                description
                initialTimeSpent
                createdAt
                updatedAt
                createdBy {
                firstName
                lastName
                }
                languages {
                id
                name
                }
                tasks {
                subject
                id
                shortText
                description
                }
                status {
                name
                }
            }
            id
        }
    }
`;
=======
>>>>>>> [MOBILE] setting up the pages
