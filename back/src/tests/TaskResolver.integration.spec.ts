import { ApolloServer } from 'apollo-server'
import { getConnection } from 'typeorm'
import getApolloServer from '../apollo-server'
import getDatabaseConnection from '../database-connection'

import { projectGenerator } from '../_mock_/projectGenerator'
import { statusGenerator } from '../_mock_/statusGenerator'
import { taskGenerator } from '../_mock_/taskGenerator'
import { userGenerator } from '../_mock_/userGenerator'

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

  describe('query all tasks related to a project or not : alltasks', () => {
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
  describe('query one task', () => {
    it('query one existing task based on his id', async () => {
      const QUERY_ONE_TASK = `
      query Tasks($taskId: Float!) {
        task(id: $taskId) {
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
            firstName
          }
          expectedDuration
          spentTime
          comments {
            content
          }
        }
      }`

      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const statusToDo = await statusGenerator('To Do')
      const projectTest = await projectGenerator('TestProject', 'Test', 'Test', 0)
      const taskTest = await taskGenerator(
        'TestTask',
        'Test',
        'Test',
        projectTest.id,
        100,
        0,
        statusToDo,
        userTest
      )

      const result = await server.executeOperation({
        query: QUERY_ONE_TASK,
        variables: {
          taskId: taskTest.id,
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.task).toMatchInlineSnapshot(`
        Object {
          "assignee": Object {
            "firstName": "Test",
          },
          "comments": Array [],
          "description": "Test",
          "expectedDuration": 100,
          "id": "1",
          "project": Object {
            "id": "1",
            "name": "TestProject",
          },
          "shortText": "Test",
          "spentTime": 0,
          "status": Object {
            "name": "To Do",
          },
          "subject": "TestTask",
        }
      `)
    })
  })
  describe('query the task related to a user : mytasks', () => {
    it('query the tasks related to a specific user', async () => {
      const QUERY_TASK_USER = `
      query Tasks($userId: Int!) {
        myTasks(userId: $userId) {
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

      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const statusToDo = await statusGenerator('To Do')
      const projectTest = await projectGenerator('TestProject', 'Test', 'Test', 0)
      await taskGenerator('TestTask1', 'Test', 'Test', projectTest.id, 100, 0, statusToDo, userTest)
      await taskGenerator('TestTask2', 'Test', 'Test', projectTest.id, 100, 0, statusToDo, userTest)
      await taskGenerator('TestTask3', 'Test', 'Test', projectTest.id, 100, 0, statusToDo, userTest)

      const result = await server.executeOperation({
        query: QUERY_TASK_USER,
        variables: {
          userId: userTest.id,
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.myTasks).toMatchInlineSnapshot(`
        Array [
          Object {
            "comments": Array [],
            "description": "Test",
            "expectedDuration": 100,
            "project": Object {
              "name": "TestProject",
            },
            "shortText": "Test",
            "spentTime": 0,
            "status": Object {
              "name": "To Do",
            },
            "subject": "TestTask2",
          },
          Object {
            "comments": Array [],
            "description": "Test",
            "expectedDuration": 100,
            "project": Object {
              "name": "TestProject",
            },
            "shortText": "Test",
            "spentTime": 0,
            "status": Object {
              "name": "To Do",
            },
            "subject": "TestTask1",
          },
          Object {
            "comments": Array [],
            "description": "Test",
            "expectedDuration": 100,
            "project": Object {
              "name": "TestProject",
            },
            "shortText": "Test",
            "spentTime": 0,
            "status": Object {
              "name": "To Do",
            },
            "subject": "TestTask3",
          },
        ]
      `)
    })
  })
  describe('query the task related to a project: tasks', () => {
    it('query the tasks related to a specific project', async () => {
      const QUERY_TASKS_PROJECT = `
      query Query($projectId: Float!) {
        tasks(projectId: $projectId) {
          id
          subject
          description
          shortText
          assignee {
            firstName
          }
          expectedDuration
          spentTime
          comments {
            content
          }
        }
      }
      `

      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const statusToDo = await statusGenerator('To Do')
      const projectTest = await projectGenerator('TestProject', 'Test', 'Test', 0)
      const projectTest2 = await projectGenerator('TestProject', 'Test', 'Test', 0)
      await taskGenerator('TestTask1', 'Test', 'Test', projectTest.id, 100, 0, statusToDo, userTest)
      await taskGenerator('TestTask2', 'Test', 'Test', projectTest.id, 100, 0, statusToDo, userTest)
      await taskGenerator('TestTask3', 'Test', 'Test', projectTest.id, 100, 0, statusToDo, userTest)
      await taskGenerator(
        'TestTask3',
        'Test',
        'Test',
        projectTest2.id,
        100,
        0,
        statusToDo,
        userTest
      )

      const result = await server.executeOperation({
        query: QUERY_TASKS_PROJECT,
        variables: {
          projectId: projectTest.id,
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.tasks).toMatchInlineSnapshot(`
        Array [
          Object {
            "assignee": Object {
              "firstName": "Test",
            },
            "comments": Array [],
            "description": "Test",
            "expectedDuration": 100,
            "id": "2",
            "shortText": "Test",
            "spentTime": 0,
            "subject": "TestTask2",
          },
          Object {
            "assignee": Object {
              "firstName": "Test",
            },
            "comments": Array [],
            "description": "Test",
            "expectedDuration": 100,
            "id": "1",
            "shortText": "Test",
            "spentTime": 0,
            "subject": "TestTask1",
          },
          Object {
            "assignee": Object {
              "firstName": "Test",
            },
            "comments": Array [],
            "description": "Test",
            "expectedDuration": 100,
            "id": "3",
            "shortText": "Test",
            "spentTime": 0,
            "subject": "TestTask3",
          },
        ]
      `)
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
  describe('mutation update task text and expected duration and due date: updateText', () => {
    it('update the text of a task', async () => {
      const UPDATE_TASK = `
      mutation UpdateTask($updateTaskId: Int!, $description: String!, $shortText: String!, $subject: String!, $expectedDuration: Float!, $dueDate: DateTime!) {
        updateTask(id: $updateTaskId, description: $description, shortText: $shortText, subject: $subject, expectedDuration: $expectedDuration, dueDate: $dueDate) {
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

      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const statusToDo = await statusGenerator('To Do')
      const projectTest = await projectGenerator('TestProject', 'Test', 'Test', 0)
      const task = await taskGenerator(
        'TestTask1',
        'Test',
        'Test',
        projectTest.id,
        100,
        0,
        statusToDo,
        userTest
      )

      const result = await server.executeOperation({
        query: UPDATE_TASK,
        variables: {
          updateTaskId: task.id,
          description: 'description updated',
          expectedDuration: 200,
          shortText: 'shortText updated',
          subject: 'subject updated',
          dueDate: '2022-12-23T23:18:00.134Z',
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.updateTask).toMatchInlineSnapshot(`
        Object {
          "assignee": Object {
            "firstName": "Test",
          },
          "comments": Array [],
          "description": "description updated",
          "dueDate": "2022-12-23T23:18:00.134Z",
          "expectedDuration": 200,
          "id": "1",
          "project": Object {
            "name": "TestProject",
          },
          "shortText": "shortText updated",
          "spentTime": 0,
          "status": Object {
            "name": "To Do",
          },
          "subject": "subject updated",
        }
      `)
    })
  })
  describe('mutation update task status: updateStatus', () => {
    it('update the status of a task', async () => {
      const UPDATE_TASK_STATUS = `
      mutation Mutation($updateStatusId: Int!, $statusId: Int!) {
        updateStatus(id: $updateStatusId, statusId: $statusId) {
          id
          subject
          shortText
          description
          status {
            name
          }
        }
      }
      `

      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const statusToDo = await statusGenerator('To Do')
      const statusInProgress = await statusGenerator('In Progress')
      const projectTest = await projectGenerator('TestProject', 'Test', 'Test', 0)
      const task = await taskGenerator(
        'TestTask1',
        'Test',
        'Test',
        projectTest.id,
        100,
        0,
        statusToDo,
        userTest
      )

      const result = await server.executeOperation({
        query: UPDATE_TASK_STATUS,
        variables: {
          updateStatusId: task.id,
          statusId: statusInProgress.id,
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.updateStatus).toMatchInlineSnapshot(`
        Object {
          "description": "Test",
          "id": "1",
          "shortText": "Test",
          "status": Object {
            "name": "In Progress",
          },
          "subject": "TestTask1",
        }
      `)
    })
  })
  describe('mutation update task time spent: updateTimeSpent', () => {
    it('update the time spent on a task', async () => {
      const UPDATE_TASK_TME_SPENT = `
      mutation Mutation($updateTimeSpentId: Int!, $spentTime: Int!) {
        updateTimeSpent(id: $updateTimeSpentId, spentTime: $spentTime) {
          subject
          shortText
          description
          spentTime
          expectedDuration
        }
      }
      `

      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const statusToDo = await statusGenerator('To Do')
      const projectTest = await projectGenerator('TestProject', 'Test', 'Test', 0)
      const task = await taskGenerator(
        'TestTask1',
        'Test',
        'Test',
        projectTest.id,
        100,
        0,
        statusToDo,
        userTest
      )

      const result = await server.executeOperation({
        query: UPDATE_TASK_TME_SPENT,
        variables: {
          updateTimeSpentId: task.id,
          spentTime: 60,
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.updateTimeSpent).toMatchInlineSnapshot(`
        Object {
          "description": "Test",
          "expectedDuration": 100,
          "shortText": "Test",
          "spentTime": 60,
          "subject": "TestTask1",
        }
      `)
    })
  })
  describe('mutation assign a user to a task :  ', () => {
    it('can assign a user to a task', async () => {
      const ASSIGN_TASK = `
      mutation Mutation($assignUserToTaskId: Int!, $userId: Int!) {
        assignUserToTask(id: $assignUserToTaskId, userId: $userId) {
          subject
          shortText
          assignee {
            firstName
          }
        }
      }
      `

      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const projectTest = await projectGenerator('TestProject', 'Test', 'Test', 0)
      const task = await taskGenerator('TestTask1', 'Test', 'Test', projectTest.id, 100, 0)

      const result = await server.executeOperation({
        query: ASSIGN_TASK,
        variables: {
          assignUserToTaskId: task.id,
          userId: userTest.id,
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.assignUserToTask).toMatchInlineSnapshot(`
        Object {
          "assignee": Object {
            "firstName": "Test",
          },
          "shortText": "Test",
          "subject": "TestTask1",
        }
      `)
    })
  })
  describe('mutation delete a  task :  ', () => {
    it('can delete a task from the database', async () => {
      const DELETE_TASK = `
      mutation Mutation($deleteTaskId: Float!) {
        deleteTask(id: $deleteTaskId) {
          subject
          shortText
          description
          expectedDuration
        }
      }
      `

      const GET_ALL_TASKS = `
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

      const projectTest = await projectGenerator('TestProject', 'Test', 'Test', 0)
      const task = await taskGenerator('TestTask1', 'Test', 'Test', projectTest.id, 100, 0)
      const task2 = await taskGenerator('TestTask2', 'Test', 'Test', projectTest.id, 100, 0)

      const result = await server.executeOperation({
        query: DELETE_TASK,
        variables: {
          deleteTaskId: task2.id,
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.deleteTask).toMatchInlineSnapshot(`
        Object {
          "description": "Test",
          "expectedDuration": 100,
          "shortText": "Test",
          "subject": "TestTask2",
        }
      `)

      const resultTasks = await server.executeOperation({
        query: GET_ALL_TASKS,
      })

      expect(resultTasks.errors).toBeUndefined()
      expect(resultTasks.data?.allTasks).toMatchInlineSnapshot(`
        Array [
          Object {
            "comments": Array [],
            "description": "Test",
            "expectedDuration": 100,
            "id": "1",
            "project": Object {
              "name": "TestProject",
            },
            "shortText": "Test",
            "spentTime": 0,
            "status": null,
            "subject": "TestTask1",
          },
        ]
      `)
    })
  })
})
