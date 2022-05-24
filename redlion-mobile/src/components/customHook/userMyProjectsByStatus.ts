import { useEffect, useState } from 'react';
import { print } from 'graphql';
import { API_URL } from '@env';
import customAxios from '../../utils/CustomAxios';
import gql from 'graphql-tag';
import { User } from '../../entities/user';

const MY_TASKS = gql`
  query MyProjects($statusName: String) {
    myProjects(statusName: $statusName) {
      id
      user {
        id
        firstName
        lastName
      }
      projectRole {
        name
      }
      project {
        id
        name
        shortText
        description
        status {
          name
        }
      }
    }
  }
`;

const useMyProjectsByStatus = (statusName: String) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

      setLoading(true);
      customAxios
          .post(
              API_URL, {
              query: print(MY_TASKS)
            }
          )
          .then((response) => {
              if (response.data === null) {
                setUser(null)
                setLoading(false)
              } else {
                setUser(response.data.myProjects.filter((project) => project.project.status.name === statusName))
                setLoading(false)
              }
            })
          .catch((error) => {
            setUser(null)
              console.log('ERREUR DE LA MUTATION SUR MON PROFIL', error.message)
              setLoading(false)
            });
      }, [])

    return [user, loading];
}

export default useMyProjectsByStatus;