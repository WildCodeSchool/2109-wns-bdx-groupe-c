import { gql } from '@apollo/client'

export const ALL_LANGUAGES = gql`
    query Query {
        languages {
            id
            name
        }
    }
`;
