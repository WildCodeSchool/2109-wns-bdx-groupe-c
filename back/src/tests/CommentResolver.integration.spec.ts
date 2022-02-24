import { ApolloServer } from 'apollo-server'
import { getConnection } from 'typeorm'
import getApolloServer from '../apollo-server'
import getDatabaseConnection from '../database-connection'

import { userGenerator } from '../_mock_/userGenerator'
import { projectGenerator } from '../_mock_/projectGenerator'
import { taskGenerator } from '../_mock_/taskGenerator'
import { commentGenerator } from '../_mock_/commentGenerator'

describe('TaskResolverResolver', () => {
  let server: ApolloServer

  beforeAll(async () => {
    server = await getApolloServer()

    if (!process.env.TEST_DATABASE_URL) {
      throw Error('TEST_DATABASE_URL must be set in environment.')
    }

    return getDatabaseConnection(process.env.TEST_DATABASE_URL)
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

  describe('query comments', () => {
    const GET_Comments = `
    query Comments($taskId: Float!) {
      comments(taskId: $taskId) {
        content
        task {
          subject
        }
        user {
          firstName
        }
      }
    }`

    describe('when there are no comments in database', () => {
      it('returns empty array', async () => {
        const projectTest = await projectGenerator('Test', 'Test', 'Test', 0)
        const taskTest = await taskGenerator('Task Text', 'Short Text', 'Test', projectTest.id, 100, 0)

        const result = await server.executeOperation({
          query: GET_Comments,
          variables: {
            taskId: taskTest.id,
          },
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.comments).toEqual([])
      })
    })
    describe('when there are comments in database', () => {
      it('returns all comments in database', async () => {
        const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
        const projectTest = await projectGenerator('Test', 'Test', 'Test', 0)
        const taskTest = await taskGenerator('Task Text', 'Short Text', 'Test', projectTest.id, 100, 0)
        const taskTest2 = await taskGenerator('Task Text', 'Short Text', 'Test', projectTest.id, 100, 0)
        await commentGenerator('Test', userTest.id, taskTest.id)
        await commentGenerator('Test2', userTest.id, taskTest.id)
        await commentGenerator('Test3', userTest.id, taskTest2.id)

        const result = await server.executeOperation({
          query: GET_Comments,
          variables: {
            taskId: taskTest.id,
          },
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.comments).toMatchInlineSnapshot(`
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

  describe('mutation createComment', () => {
    it('create a comment and return the new comment', async () => {
      const CREATE_COMMENT = `
      mutation CreateComment($content: String!, $userId: Int!, $taskId: Int!) {
        createComment(content: $content, userId: $userId, taskId: $taskId) {
          id
          content
          user {
            firstName
          }
          task {
            subject
          }
        }
      }`

      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const projectTest = await projectGenerator('Test', 'Test', 'Test', 0)
      const taskTest = await taskGenerator('Task Text', 'Short Text', 'Description', projectTest.id, 100, 0)

      const result = await server.executeOperation({
        query: CREATE_COMMENT,
        variables: {
          content: 'Test nouveau commentaire',
          userId: userTest.id,
          taskId: taskTest.id,
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.createComment).toEqual({
        content: 'Test nouveau commentaire',
        id: '1',
        task: {
          subject: 'Task Text',
        },
        user: {
          firstName: 'Test',
        },
      })
    })
  })
  describe('mutation updateComment', () => {
    it('update an existing comment', async () => {
      const UPDATE_COMMENT = `
      mutation UpdateComment($updateCommentId: Int!, $content: String!) {
        updateComment(id: $updateCommentId, content: $content) {
          content
          id
        }
      }`

      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const projectTest = await projectGenerator('Test', 'Test', 'Test', 0)
      const taskTest = await taskGenerator('Task Text', 'Short Text', 'Description', projectTest.id, 100, 0)
      const commentTest = await commentGenerator('Test', userTest.id, taskTest.id)

      const result = await server.executeOperation({
        query: UPDATE_COMMENT,
        variables: {
          updateCommentId: commentTest.id,
          content: 'test modification of content',
        },
      })
      expect(result.errors).toBeUndefined()
      expect(result.data?.updateComment).toEqual({
        content: 'test modification of content',
        id: '1',
      })
    })
  })
  describe('mutation deleteComment', () => {
    it('delete an existing comment', async () => {
      const DELETE_COMMENT = `
      mutation DeleteComment($deleteCommentId: Float!) {
        deleteComment(id: $deleteCommentId) {
          id
          content
        }
      }`

      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const projectTest = await projectGenerator('Test', 'Test', 'Test', 0)
      const taskTest = await taskGenerator('Task Text', 'Short Text', 'Description', projectTest.id, 100, 0)
      const commentTest = await commentGenerator(
        'Test commentaire à supprimer',
        userTest.id,
        taskTest.id
      )

      const result = await server.executeOperation({
        query: DELETE_COMMENT,
        variables: {
          deleteCommentId: commentTest.id,
        },
      })
      expect(result.errors).toBeUndefined()
      expect(result.data?.deleteComment).toEqual({
        content: 'Test commentaire à supprimer',
        id: '1',
      })
    })
  })
})
