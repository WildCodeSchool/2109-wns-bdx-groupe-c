import { gql } from '@apollo/client'

export const GET_TASK = gql`
    query Task($taskId: Float!) {
        task(id: $taskId) {
            id
            subject
            shortText
            description
            status {
                name
            } 
            assignee {
                firstName
            }
            createdAt
            updatedAt
            dueDate
            expectedDuration
            spentTime
        }
    }
`;

export const GET_TASKS_BY_PROJECT = gql`
    query Tasks($projectId: Float!) {
        tasks(projectId: $projectId) {
            id
            subject
            shortText
            description
            status {
                name
            }
            createdAt
            updatedAt
            dueDate
            expectedDuration
            spentTime
            comments {
                content
                createdAt
                updatedAt
            }
        }
    }
`;

export const GET_TASKS_BY_STATUS = gql`
    query Tasks($statusName: String!) {
        tasksByStatus(statusName: $statusName) {
            id
            shortText
            subject
            status {
                name
            }
            description
            project {
                name
                shortText
            }
            assignee {
                id
                firstName
                lastName
            }
            createdAt
            updatedAt
            dueDate
            expectedDuration
            spentTime
            comments {
                content
                createdAt
                updatedAt
                user {
                firstName
                lastName
                }
            }
        }
    }
`

export const GET_TASKS_BY_USER = gql`
    query MyTasks($userId: Int!) {
        myTasks(userId: $userId) {
            id
            subject
            shortText
            description
            status {
                name
            }
            project {
                id
                name
            }
            assignee {
                id
                firstName
                lastName
            }
            createdAt
            updatedAt
            dueDate
            expectedDuration
            spentTime
        }
    }
`

export const GET_TASKS_BY_STATUS_AND_USER = gql`
    query Query($statusName: String) {
        myTasks(statusName: $statusName) {
            id
            subject
            shortText
            description
        }
    }
`;

// export const GET_TASKS_BY_STATUS_AND_USER = gql`
//     query MyTasks($userId: Int!, $statusName: String) {
//         myTasks(userId: $userId, statusName: $statusName) {
//             id
//             subject
//             shortText
//             description
//             status {
//                 name
//             }
//             project {
//                 id
//                 name
//             }
//             assignee {
//                 id
//                 firstName
//                 lastName
//             }
//             createdAt
//             updatedAt
//             dueDate
//             expectedDuration
//             spentTime
//         }
//     }
// `;

export const GET_TASKS_BY_STATUS_AND_PROJECT = gql`
    query TaskByStatusByProject($projectId: Int!) {
        taskByStatusByProject(projectId: $projectId) {
            name
            tasks {
                subject
                shortText
                description
                status {
                    name
                }
            }
        }
    }
`;
