import { useEffect, useState } from 'react';
import { print } from 'graphql';
import { API_URL } from '@env';
import customAxios from '../../utils/CustomAxios';
import gql from 'graphql-tag';
import { User } from '../../entities/user';

const MY_PROJECTS = gql`
    query MyProjects {
        myProjects {
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

const useMyProjects = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

      setLoading(true);
      customAxios
          .post(
              API_URL, {
              query: print(MY_PROJECTS)
            }
          )
          .then((response) => {
              if (response.data === null) {
                setUser(null)
                setLoading(false)
              } else {
                setUser(response.data.myProjects)
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

export default useMyProjects;