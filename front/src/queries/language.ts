import { gql } from '@apollo/client'

export const ALL_LANGUAGES = gql`
    query Query {
        languages {
            id
            name
        }
    }
`;

export const MY_LANGUAGES = gql`
  query MyLanguages {
    myLanguages {
      id
      rating
      language {
        name
      }
      user {
        firstName
        lastName
        email
        createdAt
        projectsCreated {
          id
        }
      }
    }
  }
`;

export const ADD_LANGUAGE_TO_ME = gql`
mutation Mutation($languageId: Int!, $rating: Float!) {
  addLanguageToMe(languageId: $languageId, rating: $rating) {
    rating
    id
  }
}
`;
