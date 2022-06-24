import { useEffect, useState } from 'react';
import { print } from 'graphql';
import { API_URL } from '@env';
import customAxios from '../../utils/CustomAxios';
import gql from 'graphql-tag';
import { User } from '../../entities/user';

const MY_PROFILE = gql`
  query MyProfile {
      myProfile {
          firstName
          lastName
          email
          role {
            name
            identifier
          }
          comments {
            id
          }
      }
  }
`;

const useMyProfile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

      setLoading(true);
      customAxios
          .post(
              API_URL, {
              query: print(MY_PROFILE)
            }
          )
          .then((response) => {
              if (response.data === null) {
                setUser(null)
                setLoading(false)
              } else {
                setUser(response.data.myProfile)
                setLoading(false)
              }
            })
          .catch(() => {
            setUser(null)
            setLoading(false)
            });
      }, [])

return [user, loading];
}

export default useMyProfile;