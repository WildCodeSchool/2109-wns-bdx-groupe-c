import { useEffect, useState } from 'react';
import { print } from 'graphql';
import { API_URL } from '@env';
import customAxios from '../../utils/CustomAxios';
import gql from 'graphql-tag';
import { User } from '../../entities/user';

const MY_TASKS = gql`
    query Query($statusName: String) {
        myTasks(statusName: $statusName) {
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
`;

const useMyTasks = (statusName: String) => {
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
                setUser(response.data.myTasks.filter((task: any) => task.status.name === statusName))
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

export default useMyTasks;