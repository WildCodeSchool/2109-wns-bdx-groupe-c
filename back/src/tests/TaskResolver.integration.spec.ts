import { ApolloServer } from 'apollo-server'
import { getConnection } from 'typeorm'
import getApolloServer from '../apollo-server'
import getDatabaseConnection from '../database-connection'

import { projectGenerator } from '../_mock_/projectGenerator'
import { statusGenerator } from '../_mock_/statusGenerator'
import { taskGenerator } from '../_mock_/taskGenerator'

describe('TaskResolverResolver', () => {
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

  describe('query tasks', () => {
    const GET_Tasks = `
    query AllTasks {
      allTasks {
        id
        subject
        shortText
        description
        status {
          name
        }
        project {
          name
        }
        expectedDuration
        spentTime
        comments {
          content
        }
      }
    }`

    describe('when there are no tasks in database', () => {
      it('returns empty array', async () => {
        const result = await server.executeOperation({
          query: GET_Tasks,
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.allTasks).toEqual([])
      })
    })

    describe('when there are tasks in database', () => {
      it('returns all tasks in database', async () => {
        const projectTest = await projectGenerator('Project Test', 'Short Text', 'Description', 0)
        await taskGenerator('Task Test 1', 'Short Text', 'Description', projectTest.id, 100, 0)
        await taskGenerator('Task Test 2', 'Short Text', 'Description', projectTest.id, 100, 0)

        const result = await server.executeOperation({
          query: GET_Tasks,
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.allTasks).toMatchInlineSnapshot(`
          Array [
            Object {
              "comments": Array [],
              "description": "Description",
              "expectedDuration": 100,
              "id": "1",
              "project": Object {
                "name": "Project Test",
              },
              "shortText": "Short Text",
              "spentTime": 0,
              "status": null,
              "subject": "Task Test 1",
            },
            Object {
              "comments": Array [],
              "description": "Description",
              "expectedDuration": 100,
              "id": "2",
              "project": Object {
                "name": "Project Test",
              },
              "shortText": "Short Text",
              "spentTime": 0,
              "status": null,
              "subject": "Task Test 2",
            },
          ]
        `)
      })
    })
  })
  describe('mutation create task', () => {
    it('create a task and return the new task', async () => {
      const CREATE_TASK = `
      mutation CreateTask($subject: String!, $shortText: String!, $description: String!, $projectId: Int!, $dueDate: DateTime!, $expectedDuration: Int!) {
        createTask(subject: $subject, shortText: $shortText, description: $description, projectId: $projectId, dueDate: $dueDate, expectedDuration: $expectedDuration) {
          id
          subject
          shortText
          description
          status {
            name
          }
          project {
            name
          }
          assignee {
            firstName
          }
          dueDate
          expectedDuration
          spentTime
          comments {
            content
          }
        }
      }`

      const projectTest = await projectGenerator('TestProject', 'Test', 'Test', 0)
      const statusToDo = await statusGenerator('To Do')
      const result = await server.executeOperation({
        query: CREATE_TASK,
        variables: {
          subject: 'Test Subject',
          shortText: 'Test ShortTest',
          description: 'Test description',
          projectId: projectTest.id,
          dueDate: '2021-11-23T23:18:00.134Z',
          expectedDuration: 100,
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.createTask).toEqual({
        assignee: null,
        comments: [],
        description: 'Test description',
        dueDate: '2021-11-23T23:18:00.134Z',
        expectedDuration: 100,
        id: '1',
        project: {
          name: 'TestProject',
        },
        shortText: 'Test ShortTest',
        spentTime: 0,
        status: {
          name: 'To Do',
        },
        subject: 'Test Subject',
      })
    })
  })
})
