import createTestClient from 'supertest'
import { getExpressServer } from '../express-server'
import { getConnection } from 'typeorm'
import getDatabaseConnection from '../database-connection'

import { statusGenerator } from '../_mock_/statusGenerator'

describe('StatusResolver', () => {
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

  describe('query status', () => {
    describe('when there are no status in database', () => {
      it('returns empty array', async () => {
        const result = await testClient.post('/graphql').send({
          query: `{
            status {
              id
              name
            }
          }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.status).toMatchInlineSnapshot(`Array []`)
      })
    })

    describe('when there are status in database', () => {
      it('returns all status in database', async () => {
        await statusGenerator('en cours')
        await statusGenerator('terminé')

        const result = await testClient.post('/graphql').send({
          query: `{
            status {
              id
              name
            }
          }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.status).toMatchInlineSnapshot(`
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
  })
  describe('mutation update status', () => {
    it('update an existing status', async () => {
      const statusTest = await statusGenerator('en cours')

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          updateStatusName(
          id: ${statusTest.id},
          name: "test status updated",
        ) {
          id
          name
        }
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.updateStatusName).toMatchInlineSnapshot(`
        Object {
          "id": "1",
          "name": "test status updated",
        }
      `)
    })
  })
  describe('mutation create status', () => {
    it('create a  status and return the status created', async () => {
      const result = await testClient.post('/graphql').send({
        query: `mutation {
          createStatus(
          name: "test status created",
        ) {
          id
          name
        }
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.createStatus).toMatchInlineSnapshot(`
        Object {
          "id": "1",
          "name": "test status created",
        }
      `)
    })
  })
  describe('mutation delete a status', () => {
    it('delete a  status and return the status deleted', async () => {
      const statusTest = await statusGenerator('en cours')

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          deleteStatus(
          id: ${statusTest.id}
        ) {
          id
          name
        }
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.deleteStatus).toMatchInlineSnapshot(`
        Object {
          "id": "1",
          "name": "en cours",
        }
      `)
    })
  })
  describe('mutation create a status with an existing name', () => {
    it('try to create a status with an existing name give an error', async () => {
      const statusTest = await statusGenerator('test')

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          createStatus(
            name: "test"
        ) {
          id
          name
        }
      }`,
      })
      expect(JSON.parse(result.text).errors[0].message).toMatchInlineSnapshot(
        `"duplicate key value violates unique constraint \\"UQ_95ff138b88fdd8a7c9ebdb97a32\\""`
      )
    })
  })
})
