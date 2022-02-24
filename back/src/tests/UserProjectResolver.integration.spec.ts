import { ApolloServer } from 'apollo-server'
import { getConnection } from 'typeorm'
import getApolloServer from '../apollo-server'
import getDatabaseConnection from '../database-connection'

import { projectGenerator } from '../_mock_/projectGenerator'
import { userGenerator } from '../_mock_/userGenerator'
import { userProjectGenerator } from '../_mock_/userProjectGenerator'
import { projectRoleGenerator } from '../_mock_/projectRoleGenerator'

describe('StatusResolver', () => {
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

  describe('query the project associated to a user : myProjects', () => {
    const GET_MY_PROJECTS = `
    query Query($userId: Int!) {
      myProjects(userId: $userId) {
        project {
          name
        }
        projectRole {
          name
        }
      }
    }
    `

    describe('when the user is no associated to any projects', () => {
      it('returns empty array', async () => {
        const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')

        const result = await server.executeOperation({
          query: GET_MY_PROJECTS,
          variables: {
            userId: userTest.id,
          },
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.myProjects).toEqual([])
      })
    })
    describe('when the user is associated to projects', () => {
      it('returns all projects', async () => {
        const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
        const projectTest1 = await projectGenerator('TestProject', 'Test', 'Test', 0)
        const projectTest2 = await projectGenerator('TestProject', 'Test', 'Test', 0)
        const projectTest3 = await projectGenerator('TestProject', 'Test', 'Test', 0)
        const developpeur = await projectRoleGenerator('Developpeur')
        await userProjectGenerator(userTest, projectTest1, developpeur)
        await userProjectGenerator(userTest, projectTest2, developpeur)
        await userProjectGenerator(userTest, projectTest3, developpeur)

        const result = await server.executeOperation({
          query: GET_MY_PROJECTS,
          variables: {
            userId: userTest.id,
          },
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.myProjects).toMatchInlineSnapshot(`
          Array [
            Object {
              "project": Object {
                "name": "TestProject",
              },
              "projectRole": Object {
                "name": "Developpeur",
              },
            },
            Object {
              "project": Object {
                "name": "TestProject",
              },
              "projectRole": Object {
                "name": "Developpeur",
              },
            },
            Object {
              "project": Object {
                "name": "TestProject",
              },
              "projectRole": Object {
                "name": "Developpeur",
              },
            },
          ]
        `)
      })
    })
  })
  describe('mutation associate user to a project', () => {
    it('add a user to a project', async () => {
      const ADD_USER_TO_PROJECT = `
      mutation AssociateUserToProject($userId: Int!, $projectId: Int!, $roleId: Int!) {
        associateUserToProject(userId: $userId, projectId: $projectId, roleId: $roleId) {
          project {
            name
          }
          projectRole {
            name
          }
          user {
            firstName
          }
        }
      }
      `
      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const projectTest1 = await projectGenerator('TestProject', 'Test', 'Test', 0)
      const developpeur = await projectRoleGenerator('Developpeur')

      const result = await server.executeOperation({
        query: ADD_USER_TO_PROJECT,
        variables: {
          userId: userTest.id,
          projectId: projectTest1.id,
          roleId: developpeur.id,
        },
      })
      expect(result.errors).toBeUndefined()
      expect(result.data?.associateUserToProject).toMatchInlineSnapshot(`
        Object {
          "project": Object {
            "name": "TestProject",
          },
          "projectRole": Object {
            "name": "Developpeur",
          },
          "user": Object {
            "firstName": "Test",
          },
        }
      `)
    })
  })
  describe('mutation update the user role from a project', () => {
    it('update the role', async () => {
      const UPDATE_USER_ROLE = `
      mutation UpdateUserRoleToProject($userProjectId: Int!, $roleId: Int!) {
        updateUserRoleToProject(userProjectId: $userProjectId, roleId: $roleId) {
          user {
            firstName
          }
          project {
            name
          }
          projectRole {
            name
          }
        }
      }
      `
      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const projectTest1 = await projectGenerator('TestProject', 'Test', 'Test', 0)
      const developpeur = await projectRoleGenerator('Developpeur')
      const userProject = await userProjectGenerator(userTest, projectTest1, developpeur)
      const test = await projectRoleGenerator('test')

      const result = await server.executeOperation({
        query: UPDATE_USER_ROLE,
        variables: {
          userProjectId: userProject.id,
          roleId: test.id,
        },
      })
      expect(result.errors).toBeUndefined()
      expect(result.data?.updateUserRoleToProject).toMatchInlineSnapshot(`
        Object {
          "project": Object {
            "name": "TestProject",
          },
          "projectRole": Object {
            "name": "test",
          },
          "user": Object {
            "firstName": "Test",
          },
        }
      `)
    })
  })
  describe('mutation delete a user from a project', () => {
    it('delete the user from the project', async () => {
      const DELETE_USER_FROM_PROJECT = `
      mutation DeleteUserFromProject($userProjectId: Int!) {
        deleteUserFromProject(userProjectId: $userProjectId) {
          user {
            firstName
          }
          project {
            name
          }
          projectRole {
            name
          }
        }
      }
      `
      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const projectTest1 = await projectGenerator('TestProject', 'Test', 'Test', 0)
      const developpeur = await projectRoleGenerator('Developpeur')
      const userProject = await userProjectGenerator(userTest, projectTest1, developpeur)

      const result = await server.executeOperation({
        query: DELETE_USER_FROM_PROJECT,
        variables: {
          userProjectId: userProject.id,
        },
      })
      expect(result.errors).toBeUndefined()
      expect(result.data?.deleteUserFromProject).toMatchInlineSnapshot(`
        Object {
          "project": Object {
            "name": "TestProject",
          },
          "projectRole": Object {
            "name": "Developpeur",
          },
          "user": Object {
            "firstName": "Test",
          },
        }
      `)
    })
  })
})
