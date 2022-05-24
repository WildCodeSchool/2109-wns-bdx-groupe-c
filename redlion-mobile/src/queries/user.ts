import { gql } from "@apollo/client";

export const GET_USER_PROFIL = gql`
    query MyProfile {
        myProfile {
            firstName
            lastName
            email
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

export const GET_USER = gql`
    query User($userId: Float!) {
        user(id: $userId) {
            id
            lastName
            firstName
            email
            createdAt
            role {
                id
                name
            }
            projectsCreated {
                id
                name
            }
        }
    } 
`;
