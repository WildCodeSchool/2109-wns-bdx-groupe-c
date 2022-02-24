import { ApolloServer } from 'apollo-server'
import { getConnection } from 'typeorm'
import getApolloServer from '../apollo-server'
import getDatabaseConnection from '../database-connection'

import { statusGenerator } from '../_mock_/statusGenerator'

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

  describe('query status', () => {
    const GET_Status = `
    query Status {
      status {
        id
        name
      }
    }
    `

    describe('when there are no status in database', () => {
      it('returns empty array', async () => {
        const result = await server.executeOperation({
          query: GET_Status,
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.status).toEqual([])
      })
    })

    describe('when there are status in database', () => {
      it('returns all status in database', async () => {
        await statusGenerator('en cours')
        await statusGenerator('terminé')

        const result = await server.executeOperation({
          query: GET_Status,
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.status).toMatchInlineSnapshot(`
          Array [
            Object {
              "id": "1",
              "name": "en cours",
            },
            Object {
              "id": "2",
              "name": "terminé",
            },
          ]
        `)
      })
    })

    describe('mutation status', () => {
      it('update an existing status', async () => {
        const UPDATE_STATUS = `
        mutation UpdateStatusName($updateStatusNameId: Int!, $name: String!) {
          updateStatusName(id: $updateStatusNameId, name: $name) {
            id
            name
          }
        }`

        const statusTest = await statusGenerator('en cours')

        const result = await server.executeOperation({
          query: UPDATE_STATUS,
          variables: {
            updateStatusNameId: statusTest.id,
            name: 'test status updated',
          },
        })

        expect(result.errors).toBeUndefined()
        expect(result.data?.updateStatusName).toEqual({
          id: '1',
          name: 'test status updated',
        })
      })
    })

    describe('mutation status', () => {
      it('create a  status and return the status created', async () => {
        const CREATE_STATUS = `
        mutation CreateStatus($name: String!) {
          createStatus(name: $name) {
            id
            name
          }
        }
        `
        const result = await server.executeOperation({
          query: CREATE_STATUS,
          variables: {
            name: 'test status created',
          },
        })

        expect(result.errors).toBeUndefined()
        expect(result.data?.createStatus).toMatchInlineSnapshot(`
          Object {
            "id": "1",
            "name": "test status created",
          }
        `)
      })
    })

    describe('mutation status', () => {
      it('try to create a status with an existing name give an error', async () => {
        const CREATE_STATUS = `
        mutation CreateStatus($name: String!) {
          createStatus(name: $name) {
            id
            name
          }
        }
        `
        const statusTest = await statusGenerator('test')

        const result = await server.executeOperation({
          query: CREATE_STATUS,
          variables: {
            name: 'test',
          },
        })

        expect(result.errors).toMatchInlineSnapshot(`
          Array [
            [GraphQLError: duplicate key value violates unique constraint "UQ_95ff138b88fdd8a7c9ebdb97a32"],
          ]
        `)
      })
    })
  })
})
