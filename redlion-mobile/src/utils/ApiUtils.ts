import { API_URL } from '@env';
import { print } from 'graphql';
import customAxios from './CustomAxios';
import gql from 'graphql-tag';
import { User } from '../entities/user';

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const MY_PROFILE = gql`
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

export const MY_PROJECTS = gql`
  query MyProjects {
    myProjects {
      project {
        name
        shortText
      }
      projectRole {
        name
      }
    }
  }
`;

export const MY_PROJECTS = gql`
  query MyProjects {
    myProjects {
      project {
        name
        shortText
      }
      projectRole {
        name
      }
    }
  }
`;

// insider my login handler
class ApiUtils {

  static async signIn (email: string, password: string) : Promise<Boolean> {
    return customAxios.post(API_URL, {
      query: print(SIGN_IN),
      variables: {
        email: email,
        password: password,
      },
    }).then((response) => {
      if (response.data === null) {
        return false
      } else {
        return true
      }
    }).catch((error) => {
      return false;
    });
  }


  // PLUTOT QUE DE RENVOYER TRUE ==> Renvoyer un USER | null  puisque response.data.myProfile ==> User
  static async myProfile () : Promise< User | null> {
    return customAxios.post(API_URL, {
      query: print(MY_PROFILE)
    }).then((response) => {
      if (response.data === null) {
        return null
      } else {
        return response.data.myProfile
      }
    }).catch((error) => {
      return null
      console.log('ERREUR DE LA MUTATION SUR MON PROFIL', error.message)
    });
  }

  static async myProjects () : Promise<Boolean | null> {
    return customAxios.post(API_URL, {
      query: print(MY_PROJECTS)
    }).then((response) => {
      console.log('************ response', response)
      if (response.data === null) {
        return false
      } else {
        console.log('***************response.data', response.data.myProjects)
        return true
      }
    }).catch((error) => {
      return null
      console.log('ERREUR DE LA MUTATION SUR MY PROFIL', error.message)
    });
  }


}

export default ApiUtils;