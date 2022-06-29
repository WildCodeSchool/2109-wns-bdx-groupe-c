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

export const MY_LANGUAGES_LIGHT = gql`
  query MyLanguages {
    myLanguages {
      id
      rating
      language {
        name
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
  
  export const UPDATE_USER_LANGUAGE_RATING = gql`
  mutation Mutation($userLanguageId: Int!, $rating: Float!) {
    updateRatingLanguage(userLanguageId: $userLanguageId, rating: $rating) {
      id
      rating
    }
  }
`
