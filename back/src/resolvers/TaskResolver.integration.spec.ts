import { ApolloServer } from 'apollo-server'
import { getConnection } from 'typeorm'
import getApolloServer from '../apollo-server'
import getDatabaseConnection from '../database-connection-test'

import Project from '../models/Project'
import Task from '../models/Task'

describe('TaskResolverResolver', () => {
  let server: ApolloServer

  beforeAll(async () => {
    server = await getApolloServer()
  })
  beforeEach(() => getDatabaseConnection(':memory:'))
  afterEach(() => getConnection().close())

  describe('query tasks', () => {
    const GET_Tasks = `
    query Tasks {
      tasks {
        id
        subject
        shortText
        description
        createdAt
        updatedAt
        dueDate
        expectedDuration
        spentTime
        status {
          name
        }
        assignee {
          firstName
        }
        project {
          name
        }
      }
    }`

    describe('when there are no tasks in database', () => {
      it('returns empty array', async () => {
        const result = await server.executeOperation({
          query: GET_Tasks,
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.tasks).toEqual([])
      })
    })

    describe('when there are users in database', () => {
      it('returns all tasks in database', async () => {
        const projectTest = new Project()
        projectTest.name = 'Project Test'
        projectTest.shortText = 'Short Text'
        projectTest.description = 'Description'
        projectTest.initialTimeSpent = 0
        projectTest.createdAt = new Date('2021-11-23T23:18:00.134Z')
        projectTest.updatedAt = new Date('2021-11-23T23:18:00.134Z')
        await projectTest.save()

        const taskTest1 = new Task()
        taskTest1.subject = 'Task Test 1'
        taskTest1.shortText = 'Short Text'
        taskTest1.description = 'Description'
        taskTest1.project = projectTest
        taskTest1.createdAt = new Date('2021-11-23T23:18:00.134Z')
        taskTest1.updatedAt = new Date('2021-11-23T23:18:00.134Z')
        taskTest1.dueDate = new Date('2021-11-23T23:18:00.134Z')
        taskTest1.expectedDuration = 100
        taskTest1.spentTime = 0
        await taskTest1.save()

        const taskTest2 = new Task()
        taskTest2.subject = 'Task Test 2'
        taskTest2.shortText = 'Short Text'
        taskTest2.description = 'Description'
        taskTest2.project = projectTest
        taskTest2.createdAt = new Date('2021-11-23T23:18:00.134Z')
        taskTest2.updatedAt = new Date('2021-11-23T23:18:00.134Z')
        taskTest2.dueDate = new Date('2021-11-23T23:18:00.134Z')
        taskTest2.expectedDuration = 100
        taskTest2.spentTime = 0
        await taskTest2.save()

        const result = await server.executeOperation({
          query: GET_Tasks,
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.tasks).toMatchInlineSnapshot(`
          Array [
            Object {
              "assignee": null,
              "createdAt": "2021-11-23T23:18:00.134Z",
              "description": "Description",
              "dueDate": "2021-11-23T23:18:00.134Z",
              "expectedDuration": 100,
              "id": "1",
              "project": Object {
                "name": "Project Test",
              },
              "shortText": "Short Text",
              "spentTime": 0,
              "status": null,
              "subject": "Task Test 1",
              "updatedAt": "2021-11-23T23:18:00.134Z",
            },
            Object {
              "assignee": null,
              "createdAt": "2021-11-23T23:18:00.134Z",
              "description": "Description",
              "dueDate": "2021-11-23T23:18:00.134Z",
              "expectedDuration": 100,
              "id": "2",
              "project": Object {
                "name": "Project Test",
              },
              "shortText": "Short Text",
              "spentTime": 0,
              "status": null,
              "subject": "Task Test 2",
              "updatedAt": "2021-11-23T23:18:00.134Z",
            },
          ]
        `)
      })
    })
  })
})
