import { API_URL } from '@env';
import { print } from 'graphql';
import customAxios from './CustomAxios';
import gql from 'graphql-tag';


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
      // this.myProfile()
    }).catch((error) => {
      return false;
    });
  }

  static async myProfile () : Promise<void> {
    customAxios.post(API_URL, {
      query: print(MY_PROFILE)
    }).then((response) => {
      console.log('RESULTAT SUR MON PROFIL', response.data.myProfile)
    }).catch((error) => {
      console.log('ERREUR DE LA MUTATION SUR MON PROFIL', error.message)
    });
  }

}

export default ApiUtils;