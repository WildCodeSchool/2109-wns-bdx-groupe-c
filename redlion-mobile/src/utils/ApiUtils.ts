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

  static async signIn (email: string, password: string) : Promise<void> {
    console.log('je rentre dans le signIn')
    customAxios.post(API_URL, {
      query: print(SIGN_IN),
      variables: {
        email: email,
        password: password,
      },
    }).then((response) => {
      console.log('RESULTAT DE LA MUTATION DE LOGIN', response.data.signIn)
      this.myProfile()
    }).catch((error) => {
      console.log('ERREUR DE LA MUTATION DE LOGIN', error.message)
    });
  }

  static async myProfile () : Promise<void> {
    console.log('je rentre dans le fetch myProfile')
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