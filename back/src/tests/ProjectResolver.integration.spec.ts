import createTestClient from 'supertest'
import { getExpressServer } from '../express-server'
import { getConnection } from 'typeorm'
import getDatabaseConnection from '../database-connection'

import { projectGenerator } from '../_mock_/projectGenerator'
import { taskGenerator } from '../_mock_/taskGenerator'
import { userGenerator } from '../_mock_/userGenerator'
import { languageGenerator } from '../_mock_/languageGenerator'
import { statusGenerator } from '../_mock_/statusGenerator'

describe('ProjectResolver', () => {
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

  describe('Query all the projects', () => {
    describe('when there are no projects in database', () => {
      it('returns empty array', async () => {
        const result = await testClient.post('/graphql').send({
          query: `{
            projects {
              id
              name
              shortText
              description
              initialTimeSpent
              createdBy {
                firstName
              }
              languages {
                name
              }
              tasks {
                subject
              }
              status {
                name
              }
              countAssignee
            }
          }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.projects).toEqual([])
      })
    })
    describe('when there are projects in database', () => {
      it('returns all projects in database', async () => {
        const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
        const languagePHP = await languageGenerator('PHP')
        const languageJS = await languageGenerator('JS')
        const toDO = await statusGenerator('To Do')
        const projectTest = await projectGenerator(
          'name',
          'description',
          'shortText',
          1,
          [languagePHP, languageJS],
          userTest,
          toDO
        )
        await taskGenerator(
          'Task Text',
          'Short Text',
          'Test',
          projectTest.id,
          100,
          0,
          toDO,
          userTest
        )
        await taskGenerator(
          'Task Text',
          'Short Text',
          'Test',
          projectTest.id,
          100,
          0,
          toDO,
          userTest
        )

        const result = await testClient.post('/graphql').send({
          query: `{
            projects {
              id
              name
              shortText
              description
              initialTimeSpent
              createdBy {
                firstName
              }
              languages {
                name
              }
              tasks {
                subject
              }
              status {
                name
              }
              countAssignee
            }
          }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.projects).toMatchInlineSnapshot(`
          Array [
            Object {
              "countAssignee": 1,
              "createdBy": Object {
                "firstName": "Test",
              },
              "description": "description",
              "id": "1",
              "initialTimeSpent": 1,
              "languages": Array [
                Object {
                  "name": "PHP",
                },
                Object {
                  "name": "JS",
                },
              ],
              "name": "name",
              "shortText": "shortText",
              "status": Object {
                "name": "To Do",
              },
              "tasks": Array [
                Object {
                  "subject": "Task Text",
                },
                Object {
                  "subject": "Task Text",
                },
              ],
            },
          ]
        `)
      })
    })
  }),
    describe('Query One project based on his id', () => {
      it('can fetch one project', async () => {
        const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
        const languagePHP = await languageGenerator('PHP')
        const languageJS = await languageGenerator('JS')
        const toDO = await statusGenerator('To Do')
        const projectTest = await projectGenerator(
          'name',
          'description',
          'shortText',
          1,
          [languagePHP, languageJS],
          userTest,
          toDO
        )
        await taskGenerator(
          'Task Text',
          'Short Text',
          'Test',
          projectTest.id,
          100,
          0,
          toDO,
          userTest
        )
        await taskGenerator(
          'Task Text',
          'Short Text',
          'Test',
          projectTest.id,
          100,
          0,
          toDO,
          userTest
        )

        const result = await testClient.post('/graphql').send({
          query: `{
          project(id: ${projectTest.id}) {
            id
            name
            shortText
            description
            initialTimeSpent
            createdBy {
              firstName
            }
            languages {
              name
            }
            tasks {
              subject
            }
            status {
              name
            }
            countAssignee
          }
        }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.project).toMatchInlineSnapshot(`
          Object {
            "countAssignee": 1,
            "createdBy": Object {
              "firstName": "Test",
            },
            "description": "description",
            "id": "1",
            "initialTimeSpent": 1,
            "languages": Array [
              Object {
                "name": "PHP",
              },
              Object {
                "name": "JS",
              },
            ],
            "name": "name",
            "shortText": "shortText",
            "status": Object {
              "name": "To Do",
            },
            "tasks": Array [
              Object {
                "subject": "Task Text",
              },
              Object {
                "subject": "Task Text",
              },
            ],
          }
        `)
      })
    })
  describe('Query project and have the numbers of assignee', () => {
    it('can give the distinct numbers of assignee', async () => {
      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const userTest1 = await userGenerator('Test1', 'Test1', 'nouveau1@mail.com', 'password')
      const userTest2 = await userGenerator('Test2', 'Test2', 'nouveau2@mail.com', 'password')
      const userTest3 = await userGenerator('Test3', 'Test3', 'nouveau3@mail.com', 'password')
      const languagePHP = await languageGenerator('PHP')
      const languageJS = await languageGenerator('JS')
      const toDO = await statusGenerator('To Do')
      const projectTest = await projectGenerator(
        'name',
        'description',
        'shortText',
        1,
        [languagePHP, languageJS],
        userTest,
        toDO
      )
      await taskGenerator(
        'Task Text1',
        'Short Text',
        'Test',
        projectTest.id,
        100,
        0,
        toDO,
        userTest
      )
      await taskGenerator(
        'Task Text2',
        'Short Text',
        'Test',
        projectTest.id,
        100,
        0,
        toDO,
        userTest
      )
      await taskGenerator(
        'Task Text3',
        'Short Text',
        'Test',
        projectTest.id,
        100,
        0,
        toDO,
        userTest1
      )
      await taskGenerator(
        'Task Text4',
        'Short Text',
        'Test',
        projectTest.id,
        100,
        0,
        toDO,
        userTest2
      )
      await taskGenerator(
        'Task Text5',
        'Short Text',
        'Test',
        projectTest.id,
        100,
        0,
        toDO,
        userTest3
      )

      const result = await testClient.post('/graphql').send({
        query: `{
        project(id: ${projectTest.id}) {
          id
          name
          shortText
          description
          initialTimeSpent
          createdBy {
            firstName
          }
          languages {
            name
          }
          tasks {
            subject
          }
          status {
            name
          }
          countAssignee
        }
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.project).toMatchInlineSnapshot(`
        Object {
          "countAssignee": 4,
          "createdBy": Object {
            "firstName": "Test",
          },
          "description": "description",
          "id": "1",
          "initialTimeSpent": 1,
          "languages": Array [
            Object {
              "name": "PHP",
            },
            Object {
              "name": "JS",
            },
          ],
          "name": "name",
          "shortText": "shortText",
          "status": Object {
            "name": "To Do",
          },
          "tasks": Array [
            Object {
              "subject": "Task Text1",
            },
            Object {
              "subject": "Task Text2",
            },
            Object {
              "subject": "Task Text3",
            },
            Object {
              "subject": "Task Text4",
            },
            Object {
              "subject": "Task Text5",
            },
          ],
        }
      `)
    })
  })
  describe('Mutation update a project', () => {
    it('can update name, description, initial time spent or shortText', async () => {
      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const languagePHP = await languageGenerator('PHP')
      const languageJS = await languageGenerator('JS')
      const toDO = await statusGenerator('To Do')
      const projectTest = await projectGenerator(
        'name',
        'description',
        'shortText',
        1,
        [languagePHP, languageJS],
        userTest,
        toDO
      )
      await taskGenerator('Task Text', 'Short Text', 'Test', projectTest.id, 100, 0, toDO, userTest)
      await taskGenerator('Task Text', 'Short Text', 'Test', projectTest.id, 100, 0, toDO, userTest)

      const result = await testClient.post('/graphql').send({
        query: `mutation {
        updateProject(
          id: ${projectTest.id},
          name: "name updated",
          shortText: "shortText updated",
          description: "description updated",
          initialTimeSpent: 3
        ) {
          name
          shortText
          description
          initialTimeSpent
          createdBy {
            firstName
          }
          languages {
            name
          }
          tasks {
            subject
          }
          status {
            name
          }
          countAssignee
        }
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.updateProject).toMatchInlineSnapshot(`
        Object {
          "countAssignee": 0,
          "createdBy": Object {
            "firstName": "Test",
          },
          "description": "description updated",
          "initialTimeSpent": 3,
          "languages": Array [
            Object {
              "name": "PHP",
            },
            Object {
              "name": "JS",
            },
          ],
          "name": "name updated",
          "shortText": "shortText updated",
          "status": Object {
            "name": "To Do",
          },
          "tasks": Array [
            Object {
              "subject": "Task Text",
            },
            Object {
              "subject": "Task Text",
            },
          ],
        }
      `)
    })
  })
  describe('Mutation update Languages of a project', () => {
    it('can update the languages associated to a project', async () => {
      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const languagePHP = await languageGenerator('PHP')
      const languageJS = await languageGenerator('JS')
      const languageTS = await languageGenerator('TS')
      const languageNode = await languageGenerator('Node')
      const toDO = await statusGenerator('To Do')
      const projectTest = await projectGenerator(
        'name',
        'description',
        'shortText',
        1,
        [languagePHP, languageJS],
        userTest,
        toDO
      )

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          updateProjectLanguages(
            id: ${projectTest.id},
            languagesId: [${[languageTS.id, languageNode.id]}]
        ) {
          id
          name
          shortText
          description
          initialTimeSpent
          languages {
            name
          }
        }
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.updateProjectLanguages).toMatchInlineSnapshot(`
        Object {
          "description": "description",
          "id": "1",
          "initialTimeSpent": 1,
          "languages": Array [
            Object {
              "name": "TS",
            },
            Object {
              "name": "Node",
            },
          ],
          "name": "name",
          "shortText": "shortText",
        }
      `)
    })
  })
  describe('Mutation update Status of a project', () => {
    it('can update the status associated to a project', async () => {
      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const toDO = await statusGenerator('To Do')
      const inProgress = await statusGenerator('In Progress')
      const projectTest = await projectGenerator(
        'name',
        'description',
        'shortText',
        1,
        [],
        userTest,
        toDO
      )

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          updateProjectStatus(
            id: ${projectTest.id},
            statusId: ${inProgress.id}
        ) {
          name
          shortText
          description
          status {
            name
          }
        }
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.updateProjectStatus).toMatchInlineSnapshot(`
        Object {
          "description": "description",
          "name": "name",
          "shortText": "shortText",
          "status": Object {
            "name": "In Progress",
          },
        }
      `)
    })
  })
  describe('Mutation delete a project', () => {
    it('can delete a project and delete the tasks associated', async () => {
      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const languagePHP = await languageGenerator('PHP')
      const languageJS = await languageGenerator('JS')
      const toDO = await statusGenerator('To Do')
      const projectTest = await projectGenerator(
        'name',
        'description',
        'shortText',
        1,
        [languagePHP, languageJS],
        userTest,
        toDO
      )
      await taskGenerator('Task Text', 'Short Text', 'Test', projectTest.id, 100, 0, toDO, userTest)
      await taskGenerator('Task Text', 'Short Text', 'Test', projectTest.id, 100, 0, toDO, userTest)

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          deleteProject(
            id: ${projectTest.id},
        ) {
          name
          shortText
          description
        }
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.deleteProject).toMatchInlineSnapshot(`
        Object {
          "description": "description",
          "name": "name",
          "shortText": "shortText",
        }
      `)

      const resultGetTasks = await testClient.post('/graphql').send({
        query: `{
          allTasks {
            id
            subject
            shortText
            description
          }
        }`,
      })
      expect(JSON.parse(resultGetTasks.text).errors).toBeUndefined()
      expect(JSON.parse(resultGetTasks.text).data.allTasks).toMatchInlineSnapshot(`Array []`)
    })
  })
  describe('Mutation create a project', () => {
    it('can crate a project and return the project created', async () => {
      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      await statusGenerator('To Do')

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          createProject(
            name: "test name",
            shortText: "test shortText",
            description: "test description",
            initialTimeSpent: 100,
            createdBy: ${userTest.id}
        ) {
          id
          name
          shortText
          description
          initialTimeSpent
          createdBy {
            firstName
          }
          status {
            name
          }
        }
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.createProject).toMatchInlineSnapshot(`
        Object {
          "createdBy": Object {
            "firstName": "Test",
          },
          "description": "test description",
          "id": "1",
          "initialTimeSpent": 100,
          "name": "test name",
          "shortText": "test shortText",
          "status": Object {
            "name": "To Do",
          },
        }
      `)
    })
  })
})
