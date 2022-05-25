import createTestClient from 'supertest'
import { getExpressServer } from '../express-server'
import { getConnection } from 'typeorm'
import getDatabaseConnection from '../database-connection'
import { parse } from 'cookie'
import AppUserSession from '../models/AppUserSession'

import { roleGenerator } from '../_mock_/roleGenerator'
import { userGenerator } from '../_mock_/userGenerator'
import AppUserSessionRepository from '../repository/UserSessionRepository'

describe('UserResolver', () => {
  let testClient: createTestClient.SuperTest<createTestClient.Test>

  beforeAll(async () => {
    const { expressServer } = await getExpressServer()
    testClient = createTestClient(expressServer)

    if (!process.env.TEST_DATABASE_URL) {
      throw Error('TEST_DATABASE_URL must be set in environment.')
    }

    return getDatabaseConnection(process.env.TEST_DATABASE_URL)
  })
  beforeEach(async () => {
    const entities = getConnection().entityMetadatas
    for (const entity of entities) {
      const repository = getConnection().getRepository(entity.name)
      await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`)
    }
  })
  afterAll(() => getConnection().close())

  describe('query users', () => {
    describe('when there are no users in database', () => {
      it('returns empty array', async () => {
        const result = await testClient.post('/graphql').send({
          query: `{
            users {
              id
              firstName
              lastName
              email
              createdAt
              isActive
            }
          }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.users).toMatchInlineSnapshot(`Array []`)
      })
    })

    describe('when there are users in database', () => {
      it('returns all users in database', async () => {
        await userGenerator('Nouveau', 'Nouveau', 'nouveau@mail.com', 'password')
        await userGenerator('Nouvelle', 'Nouvelle', 'nouvelle@mail.fr', 'password')

        const result = await testClient.post('/graphql').send({
          query: `{
            users {
              id
              firstName
              lastName
              email
              createdAt
              isActive
            }
          }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.users).toMatchInlineSnapshot(`
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

    describe('when there is users in database', () => {
      it('returns 1 user if needed in the database', async () => {
        const test1 = await userGenerator('Nouveau', 'Nouveau', 'nouveau@mail.com', 'password')
        await userGenerator('Nouvelle', 'Nouvelle', 'nouvelle@mail.fr', 'password')

        const result = await testClient.post('/graphql').send({
          query: `{
            user(id: ${test1.id}) {
              firstName
              lastName
              email
          }
        }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.user).toMatchInlineSnapshot(`
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
    it('creates and returns user', async () => {
      const result = await testClient.post('/graphql').send({
        query: `mutation {
          signUp(
            firstName: "Nouveau",
            lastName: "Nouveau",
            password: "password",
            email: "nouveau@mail.com"
        ) {
          firstName
          lastName
          email
        }
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.signUp).toMatchInlineSnapshot(`
        Object {
          "email": "nouveau@mail.com",
          "firstName": "Nouveau",
          "lastName": "Nouveau",
        }
      `)
    })
  })
  describe('mutation change Role', () => {
    it('change the role and return the user', async () => {
      const ROLE_ADMIN = await roleGenerator('admin', 'ADMIN')
      const userTest = await userGenerator(
        'admin',
        'admin',
        'admin@mail.com',
        'password',
        ROLE_ADMIN
      )
      const sessionAdmin = await AppUserSessionRepository.createSession(userTest)
      const role1 = await roleGenerator('test1', 'test1')
      const role2 = await roleGenerator('test2', 'test2')

      const user1 = await userGenerator('Nouveau', 'Nouveau', 'nouveau@mail.com', 'password', role1)

      const result = await testClient
        .post('/graphql')
        .set('Cookie', `sessionId=${sessionAdmin.id}`)
        .send({
          query: `mutation {
          updateUserRole(
            userId: ${user1.id},
            roleIdentifier: "${role2.identifier}",
        ) {
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
      }`,
        })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.updateUserRole).toMatchInlineSnapshot(`
        Object {
          "comments": null,
          "email": "nouveau@mail.com",
          "firstName": "Nouveau",
          "id": "2",
          "isActive": true,
          "lastName": "Nouveau",
          "projectsCreated": null,
          "role": Object {
            "id": "3",
            "identifier": "test2",
            "name": "test2",
          },
          "tasks": null,
        }
      `)
    })
  })
  describe('mutation change Information', () => {
    it('change the informations user', async () => {
      const role1 = await roleGenerator('test1', 'test1')
      const user1 = await userGenerator('test', 'test', 'test@mail.com', 'test', role1)
      const session = await AppUserSessionRepository.createSession(user1)

      const result = await testClient
        .post('/graphql')
        .set('Cookie', `sessionId=${session.id}`)
        .send({
          query: `mutation {
          updateMyInformations(
            firstName: "test firstname updated",
            lastName: "test lastname updated",
            email: "test email updated",
            password: "password",
        ) {
          firstName
          lastName
          email
        }
      }`,
        })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.updateMyInformations).toMatchInlineSnapshot(`
        Object {
          "email": "test email updated",
          "firstName": "test firstname updated",
          "lastName": "test lastname updated",
        }
      `)
    })
  })
  describe('mutation delete a user', () => {
    it('update the boolean is active to false', async () => {
      const ROLE_ADMIN = await roleGenerator('admin', 'ADMIN')
      const userTest = await userGenerator(
        'admin',
        'admin',
        'admin@mail.com',
        'password',
        ROLE_ADMIN
      )
      const sessionAdmin = await AppUserSessionRepository.createSession(userTest)
      const role1 = await roleGenerator('test1', 'test1')
      const user1 = await userGenerator('Nouveau', 'Nouveau', 'nouveau@mail.com', 'password', role1)

      const result = await testClient
        .post('/graphql')
        .set('Cookie', `sessionId=${sessionAdmin.id}`)
        .send({
          query: `mutation {
          deleteUser(
            id: ${user1.id},
        ) {
          firstName
          lastName
          email
          isActive
        }
      }`,
        })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.deleteUser).toMatchInlineSnapshot(`
        Object {
          "email": "",
          "firstName": "",
          "isActive": false,
          "lastName": "",
        }
      `)
    })
  })
  describe('mutation sign In', () => {
    it('log a user and create a session', async () => {
      const role1 = await roleGenerator('test1', 'test1')
      const user1 = await userGenerator('test', 'test', 'test@mail.com', 'test', role1)

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          signIn(
            email: "${user1.email}",
            password: "test"
        ) {
          firstName
          lastName
          email
        }
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.signIn).toMatchInlineSnapshot(`
        Object {
          "email": "test@mail.com",
          "firstName": "test",
          "lastName": "test",
        }
      `)
      const userSession = await AppUserSession.findOneOrFail({
        user: user1,
      })

      const cookie = parse(result.headers['set-cookie'][0])
      expect(cookie.sessionId).toEqual(userSession.id)
    })
  })

  describe('mutation logOut', () => {
    it('delete the session corresponding to this user', async () => {
      const role1 = await roleGenerator('test1', 'test1')
      const user1 = await userGenerator('test', 'test', 'test@mail.com', 'test', role1)
      const session = await AppUserSessionRepository.createSession(user1)

      const result = await testClient
        .post('/graphql')
        .set('Cookie', `sessionId=${session.id}`)
        .send({
          query: `mutation {
          logOut
      }`,
        })
      expect(JSON.parse(result.text).errors).toBeUndefined()

      const userSession = await AppUserSession.findOne({
        user: user1,
      })

      expect(userSession).toMatchInlineSnapshot(`undefined`)
    })
  })

  describe('fetch my Profile', () => {
    it('if a user is logged with a sessionId in cookie, it give the user information', async () => {
      const role1 = await roleGenerator('test1', 'test1')
      const user1 = await userGenerator('test', 'test', 'test@mail.com', 'test', role1)
      const session = await AppUserSessionRepository.createSession(user1)

      const result = await testClient
        .post('/graphql')
        .set('Cookie', `sessionId=${session.id}`)
        .send({
          query: `{
          myProfile {
            firstName
            lastName
            email
            role {
              name
            }
          }
        }`,
        })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.myProfile).toMatchInlineSnapshot(`
        Object {
          "email": "test@mail.com",
          "firstName": "test",
          "lastName": "test",
          "role": Object {
            "name": "test1",
          },
        }
      `)
    })
  })
})
