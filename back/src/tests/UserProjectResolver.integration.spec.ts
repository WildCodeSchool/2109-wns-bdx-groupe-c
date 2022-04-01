import createTestClient from 'supertest'
import { getExpressServer } from '../express-server'
import { getConnection } from 'typeorm'
import getDatabaseConnection from '../database-connection'

import { projectGenerator } from '../_mock_/projectGenerator'
import { userGenerator } from '../_mock_/userGenerator'
import { userProjectGenerator } from '../_mock_/userProjectGenerator'
import { projectRoleGenerator } from '../_mock_/projectRoleGenerator'
import { statusGenerator } from '../_mock_/statusGenerator'

describe('StatusResolver', () => {
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

  describe('query the project associated to a user : myProjects', () => {
    describe('when the user is no associated to any projects', () => {
      it('returns empty array', async () => {
        const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')

        const result = await testClient.post('/graphql').send({
          query: `{
            myProjects(userId: ${userTest.id}) {
              project {
                name
              }
              projectRole {
                name
              }
          }
        }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.myProjects).toMatchInlineSnapshot(`Array []`)
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

        const result = await testClient.post('/graphql').send({
          query: `{
            myProjects(userId: ${userTest.id}) {
              project {
                name
              }
              projectRole {
                name
              }
          }
        }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.myProjects).toMatchInlineSnapshot(`
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
    describe('Query projects in TO DO associated to a user', () => {
      it('returns projects in To do', async () => {
        const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
        const statusToDo = await statusGenerator('To Do')
        const statusTest = await statusGenerator('Test')
        const projectTest1 = await projectGenerator(
          'TestProject1',
          'Test',
          'Test',
          0,
          [],
          userTest,
          statusToDo
        )
        const projectTest2 = await projectGenerator(
          'TestProject2',
          'Test',
          'Test',
          0,
          [],
          userTest,
          statusToDo
        )
        const projectTest3 = await projectGenerator(
          'TestProject3',
          'Test',
          'Test',
          0,
          [],
          userTest,
          statusTest
        )
        const developpeur = await projectRoleGenerator('Developpeur')
        await userProjectGenerator(userTest, projectTest1, developpeur)
        await userProjectGenerator(userTest, projectTest2, developpeur)
        await userProjectGenerator(userTest, projectTest3, developpeur)

        const result = await testClient.post('/graphql').send({
          query: `{
            myProjects(userId: ${userTest.id}, statusName: "To Do") {
              project {
                name
                status {
                  name
                }
            }
          }
        }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.myProjects).toMatchInlineSnapshot(`
          Array [
            Object {
              "project": Object {
                "name": "TestProject2",
                "status": Object {
                  "name": "To Do",
                },
              },
            },
            Object {
              "project": Object {
                "name": "TestProject1",
                "status": Object {
                  "name": "To Do",
                },
              },
            },
          ]
        `)
      })
    })
  })
  describe('mutation associate user to a project', () => {
    it('add a user to a project', async () => {
      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const projectTest1 = await projectGenerator('TestProject', 'Test', 'Test', 0)
      const developpeur = await projectRoleGenerator('Developpeur')

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          associateUserToProject(
            userId: ${userTest.id},
            projectId: ${projectTest1.id},
            roleId: ${developpeur.id}
        ) {
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
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.associateUserToProject).toMatchInlineSnapshot(`
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
      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const projectTest1 = await projectGenerator('TestProject', 'Test', 'Test', 0)
      const developpeur = await projectRoleGenerator('Developpeur')
      const userProject = await userProjectGenerator(userTest, projectTest1, developpeur)
      const test = await projectRoleGenerator('test')

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          updateUserRoleToProject(
            userProjectId: ${userTest.id},
            roleId: ${test.id}
        ) {
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
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.updateUserRoleToProject).toMatchInlineSnapshot(`
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
      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const projectTest1 = await projectGenerator('TestProject', 'Test', 'Test', 0)
      const developpeur = await projectRoleGenerator('Developpeur')
      const userProject = await userProjectGenerator(userTest, projectTest1, developpeur)

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          deleteUserFromProject(
            userProjectId: ${userTest.id},
        ) {
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
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.deleteUserFromProject).toMatchInlineSnapshot(`
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
