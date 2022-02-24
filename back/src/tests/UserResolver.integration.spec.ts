import { ApolloServer } from 'apollo-server'
import { getConnection } from 'typeorm'
import getApolloServer from '../apollo-server'
import getDatabaseConnection from '../database-connection'
import User from '../models/AppUser'

import { roleGenerator } from '../_mock_/roleGenerator'
import { userGenerator } from '../_mock_/userGenerator'

describe('UserResolver', () => {
  let server: ApolloServer

  beforeAll(async () => {
    if (!process.env.TEST_DATABASE_URL) {
      throw Error('TEST_DATABASE_URL must be set in environment.')
    }
    await getDatabaseConnection(process.env.TEST_DATABASE_URL)
    server = await getApolloServer()
  })
  beforeEach(async () => {
    const entities = getConnection().entityMetadatas
    // eslint-disable-next-line no-restricted-syntax
    for (const entity of entities) {
      const repository = getConnection().getRepository(entity.name)
      await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`)
    }
  })
  afterAll(() => getConnection().close())

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
        await userGenerator('Nouveau', 'Nouveau', 'nouveau@mail.com', 'password')
        await userGenerator('Nouvelle', 'Nouvelle', 'nouvelle@mail.fr', 'password')

        const result = await server.executeOperation({
          query: GET_USERS,
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.users).toMatchInlineSnapshot(`
          Array [
            Object {
              "createdAt": "2021-11-23T23:18:00.134Z",
              "email": "nouvelle@mail.fr",
              "firstName": "Nouvelle",
              "id": "2",
              "isActive": true,
              "lastName": "Nouvelle",
            },
            Object {
              "createdAt": "2021-11-23T23:18:00.134Z",
              "email": "nouveau@mail.com",
              "firstName": "Nouveau",
              "id": "1",
              "isActive": true,
              "lastName": "Nouveau",
            },
          ]
        `)
      })
    })

    describe('when there users in database', () => {
      it('returns 1 user if needed in the database', async () => {
        const GET_ONE_USER = `
        query User($userId: Float!) {
          user(id: $userId) {
            firstName
            lastName
            email
          }
        }`

        const test1 = await userGenerator('Nouveau', 'Nouveau', 'nouveau@mail.com', 'password')
        await userGenerator('Nouvelle', 'Nouvelle', 'nouvelle@mail.fr', 'password')

        const result = await server.executeOperation({
          query: GET_ONE_USER,
          variables: {
            userId: test1.id,
          },
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.user).toMatchInlineSnapshot(`
          Object {
            "email": "nouveau@mail.com",
            "firstName": "Nouveau",
            "lastName": "Nouveau",
          }
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
      })
    })
  })

  describe('mutation change Role', () => {
    it('change the role and return the user', async () => {
      const CHANGE_ROLE_USER = `
      mutation UpdateUserRole($userId: Int!, $roleIdentifier: String!) {
        updateUserRole(userId: $userId, roleIdentifier: $roleIdentifier) {
          id
          firstName
          lastName
          email
          isActive
          role {
            name
            identifier
            id
          }
          comments {
            content
          }
          projectsCreated {
            name
          }
          tasks {
            subject
          }
        }
      }
      `
      const role1 = await roleGenerator('test1', 'test1')
      const role2 = await roleGenerator('test2', 'test2')

      const user1 = await userGenerator('Nouveau', 'Nouveau', 'nouveau@mail.com', 'password', role1)
      const result = await server.executeOperation({
        query: CHANGE_ROLE_USER,
        variables: {
          userId: user1.id,
          roleIdentifier: role2.identifier,
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.updateUserRole).toMatchInlineSnapshot(`
        Object {
          "comments": Array [],
          "email": "nouveau@mail.com",
          "firstName": "Nouveau",
          "id": "1",
          "isActive": true,
          "lastName": "Nouveau",
          "projectsCreated": Array [],
          "role": Object {
            "id": "2",
            "identifier": "test2",
            "name": "test2",
          },
          "tasks": Array [],
        }
      `)
    })
  })
})
