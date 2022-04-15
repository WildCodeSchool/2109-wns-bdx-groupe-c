import { getConnection } from 'typeorm'
import createTestClient from 'supertest'

import AppUserSessionRepository from '../repository/UserSessionRepository'
import { getExpressServer } from '../express-server'
import getDatabaseConnection from '../database-connection'

import { projectGenerator } from '../_mock_/projectGenerator'
import { taskGenerator } from '../_mock_/taskGenerator'
import { commentGenerator } from '../_mock_/commentGenerator'
import { roleGenerator } from '../_mock_/roleGenerator'
import { userGenerator } from '../_mock_/userGenerator'

describe('CommentResolver', () => {
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

  describe('query comments', () => {
    describe('when there are no comments in database', () => {
      it('returns empty array', async () => {
        const projectTest = await projectGenerator('Test', 'Test', 'Test', 0)
        const task = await taskGenerator('Task Text', 'Short Text', 'Test', projectTest.id, 100, 0)

        const result = await testClient.post('/graphql').send({
          query: `{
            comments(taskId: ${task.id}) {
              content
              task {
                subject
              }
              user {
                firstName
              }
            }
          }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.comments).toEqual([])
      })
    })
    describe('when there are comments in database', () => {
      it('returns all comments in database', async () => {
        const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
        const projectTest = await projectGenerator('Test', 'Test', 'Test', 0)
        const taskTest = await taskGenerator(
          'Task Text',
          'Short Text',
          'Test',
          projectTest.id,
          100,
          0
        )
        const taskTest2 = await taskGenerator(
          'Task Text',
          'Short Text',
          'Test',
          projectTest.id,
          100,
          0
        )
        await commentGenerator('Test', userTest.id, taskTest.id)
        await commentGenerator('Test2', userTest.id, taskTest.id)
        await commentGenerator('Test3', userTest.id, taskTest2.id)

        const result = await testClient.post('/graphql').send({
          query: `{
            comments(taskId: ${taskTest.id}) {
              content
              task {
                subject
              }
              user {
                firstName
              }
            }
          }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.comments).toMatchInlineSnapshot(`
          Array [
            Object {
              "content": "Test2",
              "task": Object {
                "subject": "Task Text",
              },
              "user": Object {
                "firstName": "Test",
              },
            },
            Object {
              "content": "Test",
              "task": Object {
                "subject": "Task Text",
              },
              "user": Object {
                "firstName": "Test",
              },
            },
          ]
        `)
      })
    })
  })
  describe('mutation create comment', () => {
    it('create a comment and return the new comment', async () => {
      const role1 = await roleGenerator('test1', 'test1')
      const user1 = await userGenerator('test', 'test', 'test@mail.com', 'test', role1)
      const session = await AppUserSessionRepository.createSession(user1)
      const projectTest = await projectGenerator('Test', 'Test', 'Test', 0)
      const taskTest = await taskGenerator(
        'Task Text',
        'Short Text',
        'Description',
        projectTest.id,
        100,
        0
      )

      const contentTest = 'test content'
      const result = await testClient
        .post('/graphql')
        .set('Cookie', `sessionId=${session.id}`)
        .send({
          query: `mutation {
          createComment(
              content: "${contentTest}",
              taskId: ${taskTest.id},
          ){
              id
              content
              user {
                firstName
              }
              task {
                subject
              }
            }
          }`,
        })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.createComment).toMatchInlineSnapshot(`
        Object {
          "content": "test content",
          "id": "1",
          "task": Object {
            "subject": "Task Text",
          },
          "user": Object {
            "firstName": "test",
          },
        }
      `)
    })
  })
  describe('mutation update comment', () => {
    it('update an existing comment', async () => {
      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const projectTest = await projectGenerator('Test', 'Test', 'Test', 0)
      const taskTest = await taskGenerator(
        'Task Text',
        'Short Text',
        'Description',
        projectTest.id,
        100,
        0
      )
      const commentTest = await commentGenerator('Test', userTest.id, taskTest.id)
      const contentTest = 'test content'

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          updateComment(
              content: "${contentTest}",
              id: ${commentTest.id},
          ){
              id
              content
            }
          }`,
      })

      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.updateComment).toMatchInlineSnapshot(`
        Object {
          "content": "test content",
          "id": "1",
        }
      `)
    })
  })
  describe('mutation delete comment', () => {
    it('delete an existing comment', async () => {
      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const projectTest = await projectGenerator('Test', 'Test', 'Test', 0)
      const taskTest = await taskGenerator(
        'Task Text',
        'Short Text',
        'Description',
        projectTest.id,
        100,
        0
      )
      const commentTest = await commentGenerator(
        'Test commentaire à supprimer',
        userTest.id,
        taskTest.id
      )

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          deleteComment(
              id: ${commentTest.id},
          ){
              id
              content
            }
          }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.deleteComment).toMatchInlineSnapshot(`
        Object {
          "content": "Test commentaire à supprimer",
          "id": "1",
        }
      `)
    })
  })
})
