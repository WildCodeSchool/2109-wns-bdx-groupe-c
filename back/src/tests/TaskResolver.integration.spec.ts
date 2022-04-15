import { getConnection } from 'typeorm'
import createTestClient from 'supertest'

import { getExpressServer } from '../express-server'
import getDatabaseConnection from '../database-connection'
import AppUserSessionRepository from '../repository/UserSessionRepository'

import { roleGenerator } from '../_mock_/roleGenerator'
import { projectGenerator } from '../_mock_/projectGenerator'
import { statusGenerator } from '../_mock_/statusGenerator'
import { taskGenerator } from '../_mock_/taskGenerator'
import { userGenerator } from '../_mock_/userGenerator'

describe('TaskResolverResolver', () => {
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

  describe('query all tasks related to a project or not : alltasks', () => {
    describe('when there are no tasks in database', () => {
      it('returns empty array', async () => {
        const result = await testClient.post('/graphql').send({
          query: `{
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
          }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.allTasks).toMatchInlineSnapshot(`Array []`)
      })

      describe('when there are tasks in database', () => {
        it('returns all tasks in database', async () => {
          const projectTest = await projectGenerator('Project Test', 'Short Text', 'Description', 0)
          await taskGenerator('Task Test 1', 'Short Text', 'Description', projectTest.id, 100, 0)
          await taskGenerator('Task Test 2', 'Short Text', 'Description', projectTest.id, 100, 0)

          const result = await testClient.post('/graphql').send({
            query: `{
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
            }`,
          })
          expect(JSON.parse(result.text).errors).toBeUndefined()
          expect(JSON.parse(result.text).data.allTasks).toMatchInlineSnapshot(`
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

        const result = await testClient.post('/graphql').send({
          query: `{
            task(id: ${taskTest.id}) {
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
        }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.task).toMatchInlineSnapshot(`
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
    describe('query tasks by status', () => {
      it('query task by status name', async () => {
        const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
        const statusToDo = await statusGenerator('To Do')
        const inProgress = await statusGenerator('In Progress')
        const projectTest = await projectGenerator('TestProject', 'Test', 'Test', 0)
        await taskGenerator(
          'TestTask',
          'Test',
          'Test',
          projectTest.id,
          100,
          0,
          statusToDo,
          userTest
        )
        await taskGenerator(
          'TestTask1',
          'Test1',
          'Test1',
          projectTest.id,
          100,
          0,
          statusToDo,
          userTest
        )
        await taskGenerator(
          'TestTask2',
          'Test2',
          'Test2',
          projectTest.id,
          100,
          0,
          statusToDo,
          userTest
        )
        await taskGenerator(
          'TestTask3',
          'Test3',
          'Test3',
          projectTest.id,
          100,
          0,
          inProgress,
          userTest
        )

        const result = await testClient.post('/graphql').send({
          query: `{
            tasksByStatus(statusName: "To Do") {
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
              expectedDuration
              comments {
                content
              }
          }
        }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.tasksByStatus).toMatchInlineSnapshot(`
          Array [
            Object {
              "assignee": Object {
                "firstName": "Test",
              },
              "comments": Array [],
              "description": "Test",
              "expectedDuration": 100,
              "id": "1",
              "project": Object {
                "name": "TestProject",
              },
              "shortText": "Test",
              "status": Object {
                "name": "To Do",
              },
              "subject": "TestTask",
            },
            Object {
              "assignee": Object {
                "firstName": "Test",
              },
              "comments": Array [],
              "description": "Test1",
              "expectedDuration": 100,
              "id": "2",
              "project": Object {
                "name": "TestProject",
              },
              "shortText": "Test1",
              "status": Object {
                "name": "To Do",
              },
              "subject": "TestTask1",
            },
            Object {
              "assignee": Object {
                "firstName": "Test",
              },
              "comments": Array [],
              "description": "Test2",
              "expectedDuration": 100,
              "id": "3",
              "project": Object {
                "name": "TestProject",
              },
              "shortText": "Test2",
              "status": Object {
                "name": "To Do",
              },
              "subject": "TestTask2",
            },
          ]
        `)
      })
    })
    describe('query the task related to a user : myTasks', () => {
      it('query the tasks related to a specific user', async () => {
        const role1 = await roleGenerator('test1', 'test1')
        const userTest = await userGenerator('test', 'test', 'test@mail.com', 'test', role1)
        const session = await AppUserSessionRepository.createSession(userTest)
        const statusToDo = await statusGenerator('To Do')
        const projectTest = await projectGenerator('TestProject', 'Test', 'Test', 0)
        await taskGenerator(
          'TestTask1',
          'Test',
          'Test',
          projectTest.id,
          100,
          0,
          statusToDo,
          userTest
        )
        await taskGenerator(
          'TestTask2',
          'Test',
          'Test',
          projectTest.id,
          100,
          0,
          statusToDo,
          userTest
        )
        await taskGenerator(
          'TestTask3',
          'Test',
          'Test',
          projectTest.id,
          100,
          0,
          statusToDo,
          userTest
        )

        const result = await testClient
          .post('/graphql')
          .set('Cookie', `sessionId=${session.id}`)
          .send({
            query: `{
            myTasks {
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
        }`,
          })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.myTasks).toMatchInlineSnapshot(`
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
              "subject": "TestTask3",
            },
          ]
        `)
      })
    })
    describe('query the task related to a user in toDo', () => {
      it('query the tasks related to a specific user', async () => {
        const role1 = await roleGenerator('test1', 'test1')
        const userTest = await userGenerator('test', 'test', 'test@mail.com', 'test', role1)
        const session = await AppUserSessionRepository.createSession(userTest)
        const statusToDo = await statusGenerator('To Do')
        const statusTest = await statusGenerator('test')
        const projectTest = await projectGenerator('TestProject', 'Test', 'Test', 0)
        await taskGenerator(
          'TestTask1',
          'Test',
          'Test',
          projectTest.id,
          100,
          0,
          statusToDo,
          userTest
        )
        await taskGenerator(
          'TestTask2',
          'Test',
          'Test',
          projectTest.id,
          100,
          0,
          statusToDo,
          userTest
        )
        await taskGenerator(
          'TestTask3',
          'Test',
          'Test',
          projectTest.id,
          100,
          0,
          statusTest,
          userTest
        )

        const result = await testClient
          .post('/graphql')
          .set('Cookie', `sessionId=${session.id}`)
          .send({
            query: `{
            myTasks(statusName: "To Do") {
              subject
              shortText
              description
              status {
                name
              }
          }
        }`,
          })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.myTasks).toMatchInlineSnapshot(`
          Array [
            Object {
              "description": "Test",
              "shortText": "Test",
              "status": Object {
                "name": "To Do",
              },
              "subject": "TestTask1",
            },
            Object {
              "description": "Test",
              "shortText": "Test",
              "status": Object {
                "name": "To Do",
              },
              "subject": "TestTask2",
            },
          ]
        `)
      })
    })
    describe('query the task related to a project: tasks', () => {
      it('query the tasks related to a specific project', async () => {
        const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
        const statusToDo = await statusGenerator('To Do')
        const projectTest = await projectGenerator('TestProject', 'Test', 'Test', 0)
        const projectTest2 = await projectGenerator('TestProject', 'Test', 'Test', 0)
        await taskGenerator(
          'TestTask1',
          'Test',
          'Test',
          projectTest.id,
          100,
          0,
          statusToDo,
          userTest
        )
        await taskGenerator(
          'TestTask2',
          'Test',
          'Test',
          projectTest.id,
          100,
          0,
          statusToDo,
          userTest
        )
        await taskGenerator(
          'TestTask3',
          'Test',
          'Test',
          projectTest.id,
          100,
          0,
          statusToDo,
          userTest
        )
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

        const result = await testClient.post('/graphql').send({
          query: `{
            tasks(projectId: ${projectTest.id}) {
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
        }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.tasks).toMatchInlineSnapshot(`
          Array [
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
        const projectTest = await projectGenerator('TestProject', 'Test', 'Test', 0)
        const statusToDo = await statusGenerator('To Do')

        const result = await testClient.post('/graphql').send({
          query: `mutation {
            createTask(
              subject: "Test Subject",
              shortText: "Test ShortTest",
              description: "Test description",
              projectId: ${projectTest.id},
              dueDate: "2021-11-23T23:18:00.134Z",
              expectedDuration: 100
          ) {
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
        }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.createTask).toMatchInlineSnapshot(`
          Object {
            "assignee": null,
            "comments": Array [],
            "description": "Test description",
            "dueDate": "2021-11-23T23:18:00.134Z",
            "expectedDuration": 100,
            "id": "1",
            "project": Object {
              "name": "TestProject",
            },
            "shortText": "Test ShortTest",
            "spentTime": 0,
            "status": Object {
              "name": "To Do",
            },
            "subject": "Test Subject",
          }
        `)
      })
    })
    describe('mutation update task text and expected duration and due date: updateText', () => {
      it('update the text of a task', async () => {
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

        const result = await testClient.post('/graphql').send({
          query: `mutation {
            updateTask(
              id: ${task.id},
              description: "Test description",
              shortText: "Test ShortTest",
              subject: "Test Subject",
              expectedDuration: 100
              dueDate: "2021-11-23T23:18:00.134Z",
          ) {
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
        }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.updateTask).toMatchInlineSnapshot(`
          Object {
            "assignee": Object {
              "firstName": "Test",
            },
            "comments": Array [],
            "description": "Test description",
            "dueDate": "2021-11-23T23:18:00.134Z",
            "expectedDuration": 100,
            "id": "1",
            "project": Object {
              "name": "TestProject",
            },
            "shortText": "Test ShortTest",
            "spentTime": 0,
            "status": Object {
              "name": "To Do",
            },
            "subject": "Test Subject",
          }
        `)
      })
    })
    describe('mutation update task status: updateStatus', () => {
      it('update the status of a task', async () => {
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

        const result = await testClient.post('/graphql').send({
          query: `mutation {
            updateStatus(
              id: ${task.id},
              statusId: ${statusInProgress.id}
          ) {
            id
            subject
            shortText
            description
            status {
              name
            }
          }
        }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.updateStatus).toMatchInlineSnapshot(`
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

        const result = await testClient.post('/graphql').send({
          query: `mutation {
            updateTimeSpent(
              id: ${task.id},
              spentTime: 60
          ) {
            subject
            shortText
            description
            spentTime
            expectedDuration
          }
        }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.updateTimeSpent).toMatchInlineSnapshot(`
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
        const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
        const projectTest = await projectGenerator('TestProject', 'Test', 'Test', 0)
        const task = await taskGenerator('TestTask1', 'Test', 'Test', projectTest.id, 100, 0)

        const result = await testClient.post('/graphql').send({
          query: `mutation {
            assignUserToTask(
              id: ${task.id},
              userId: ${userTest.id}
          ) {
            subject
            shortText
            assignee {
              firstName
            }
          }
        }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.assignUserToTask).toMatchInlineSnapshot(`
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
    describe('mutation delete a task :  ', () => {
      it('can delete a task from the database', async () => {
        const projectTest = await projectGenerator('TestProject', 'Test', 'Test', 0)
        const task = await taskGenerator('TestTask1', 'Test', 'Test', projectTest.id, 100, 0)
        const task2 = await taskGenerator('TestTask2', 'Test', 'Test', projectTest.id, 100, 0)

        const result = await testClient.post('/graphql').send({
          query: `mutation {
            deleteTask(
              id: ${task.id},
          ) {
            subject
            shortText
            description
            expectedDuration
          }
        }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.deleteTask).toMatchInlineSnapshot(`
          Object {
            "description": "Test",
            "expectedDuration": 100,
            "shortText": "Test",
            "subject": "TestTask1",
          }
        `)

        const resultTasks = await testClient.post('/graphql').send({
          query: `{
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
          }`,
        })
        expect(JSON.parse(resultTasks.text).errors).toBeUndefined()
        expect(JSON.parse(resultTasks.text).data.allTasks).toMatchInlineSnapshot(`
          Array [
            Object {
              "comments": Array [],
              "description": "Test",
              "expectedDuration": 100,
              "id": "2",
              "project": Object {
                "name": "TestProject",
              },
              "shortText": "Test",
              "spentTime": 0,
              "status": null,
              "subject": "TestTask2",
            },
          ]
        `)
      })
    })
  })
})
