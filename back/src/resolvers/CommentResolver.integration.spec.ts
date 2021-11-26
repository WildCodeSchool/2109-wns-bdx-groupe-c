import { ApolloServer } from 'apollo-server'
import { getConnection } from 'typeorm'
import getApolloServer from '../apollo-server'
import getDatabaseConnection from '../database-connection-test'

import { userGenerator } from '../_mock_/userGenerator'
import { projectGenerator } from '../_mock_/projectGenerator'
import { taskGenetor } from '../_mock_/taskGenerator'
import { commentGenerator } from '../_mock_/commentGenrator'

describe('TaskResolverResolver', () => {
  let server: ApolloServer

  beforeAll(async () => {
    server = await getApolloServer()
  })
  beforeEach(() => getDatabaseConnection(':memory:'))
  afterEach(() => getConnection().close())

  describe('query comments', () => {
    const GET_Comments = `
    query Comments {
      comments {
        id
        content
        updatedAt
        createdAt
        user {
          firstName
          lastName
        }
        task {
          subject
          shortText
        }
      }
    }`

    describe('when there are no comments in database', () => {
      it('returns empty array', async () => {
        const result = await server.executeOperation({
          query: GET_Comments,
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.comments).toEqual([])
      })
    })
    describe('when there are comments in database', () => {
      it('returns all comments in database', async () => {
        const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
        const projectTest = await projectGenerator('Test', 'Test', 'Test', 0)
        const taskTest = await taskGenetor('Task Text', 'Short Text', 'Test', projectTest.id)
        await commentGenerator('Test', userTest.id, taskTest.id)
        await commentGenerator('Test2', userTest.id, taskTest.id)

        const result = await server.executeOperation({
          query: GET_Comments,
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.comments).toMatchInlineSnapshot(`
          Array [
            Object {
              "content": "Test",
              "createdAt": "2021-11-23T23:18:00.134Z",
              "id": "1",
              "task": Object {
                "shortText": "Short Text",
                "subject": "Task Text",
              },
              "updatedAt": "2021-11-23T23:18:00.134Z",
              "user": Object {
                "firstName": "Test",
                "lastName": "Test",
              },
            },
            Object {
              "content": "Test2",
              "createdAt": "2021-11-23T23:18:00.134Z",
              "id": "2",
              "task": Object {
                "shortText": "Short Text",
                "subject": "Task Text",
              },
              "updatedAt": "2021-11-23T23:18:00.134Z",
              "user": Object {
                "firstName": "Test",
                "lastName": "Test",
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
      const taskTest = await taskGenetor('Task Text', 'Short Text', 'Description', projectTest.id)

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
      const taskTest = await taskGenetor('Task Text', 'Short Text', 'Description', projectTest.id)
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
      const taskTest = await taskGenetor('Task Text', 'Short Text', 'Description', projectTest.id)
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
