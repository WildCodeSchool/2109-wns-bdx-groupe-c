import { ApolloServer } from 'apollo-server'
import { getConnection } from 'typeorm'
import getApolloServer from '../apollo-server'
import getDatabaseConnection from '../database-connection'
import User from '../models/User'

describe('UserResolver', () => {
  let server: ApolloServer

  beforeAll(async () => {
    server = await getApolloServer()
  })
  beforeEach(() => getDatabaseConnection(':memory:'))
  afterEach(() => getConnection().close())

  describe('query users', () => {
    const GET_USERS = `
    query {
      users {
        id
        firstName
        lastName
        email
        createdAt
        isActive
      }
    }`

    describe('when there are no users in database', () => {
      it('returns empty array', async () => {
        const result = await server.executeOperation({
          query: GET_USERS,
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.users).toEqual([])
      })
    })

    describe('when there are users in database', () => {
      it('returns all users in database', async () => {
        const user1 = new User()
        user1.firstName = 'Nouveau'
        user1.lastName = 'Nouveau'
        user1.email = 'nouveau@mail.com'
        user1.password = 'password'
        user1.createdAt = new Date('2021-11-23T23:18:00.134Z');
        user1.updatedAt = new Date('2021-11-23T23:18:00.134Z');
        await user1.save()
        
        const user2 = new User()
        user2.firstName = 'Nouvelle'
        user2.lastName = 'Nouvelle'
        user2.email = 'nouvelle@mail.fr'
        user2.password = 'password'
        user2.createdAt = new Date('2021-11-23T23:18:00.134Z');
        user2.updatedAt = new Date('2021-11-23T23:18:00.134Z');
        await user2.save()

        const result = await server.executeOperation({
          query: GET_USERS,
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.users).toMatchInlineSnapshot(`
          Array [
            Object {
              "createdAt": "2021-11-23T23:18:00.134Z",
              "email": "nouveau@mail.com",
              "firstName": "Nouveau",
              "id": "1",
              "isActive": true,
              "lastName": "Nouveau",
            },
            Object {
              "createdAt": "2021-11-23T23:18:00.134Z",
              "email": "nouvelle@mail.fr",
              "firstName": "Nouvelle",
              "id": "2",
              "isActive": true,
              "lastName": "Nouvelle",
            },
          ]
        `)
      })
    })
  })

  describe('mutation createUser', () => {
    const CREATE_USER = `
    mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
      createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
        id
        firstName
        lastName
        email
        password
      }
    }
    `

    it('creates and returns user', async () => {
      const result = await server.executeOperation({
        query: CREATE_USER,
        variables: {
          firstName: 'Nouveau',
          lastName: 'Nouveau',
          email: 'nouveau@mail.com',
          password: 'password',
        },
      })

      expect(await User.findOne({ firstName: 'Nouveau' })).toHaveProperty(
        'email',
        'nouveau@mail.com'
      )

      expect(result.errors).toBeUndefined()
      expect(result.data?.createUser).toEqual({
        id: '1',
        firstName: 'Nouveau',
        lastName: 'Nouveau',
        email: 'nouveau@mail.com',
        password: expect.anything(),
      })
    })
  })
})
