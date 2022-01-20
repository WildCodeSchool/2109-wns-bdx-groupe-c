import { ApolloServer } from 'apollo-server'
import { getConnection } from 'typeorm'
import getApolloServer from '../apollo-server'
import getDatabaseConnection from '../database-connection-test'

import { statusGenerator } from '../_mock_/statusGenerator'


describe('StatusResolver', () => {
  let server: ApolloServer

  beforeAll(async () => {
    server = await getApolloServer()
  })
  beforeEach(() => getDatabaseConnection(':memory:'))
  afterEach(() => getConnection().close())

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

        await statusGenerator('en cours');
        await statusGenerator('terminé');

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

        const statusTest = await statusGenerator('en cours');

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
  })
})
