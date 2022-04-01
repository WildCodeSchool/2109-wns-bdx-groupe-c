import createTestClient from 'supertest'
import { getExpressServer } from '../express-server'
import dotenv from 'dotenv'
import { getConnection } from 'typeorm'
import getDatabaseConnection from '../database-connection'

import { roleGenerator } from '../_mock_/roleGenerator'

dotenv.config()

describe('RoleResolver', () => {
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

  describe('query roles', () => {
    describe('when there are no roles in database', () => {
      it('returns empty array', async () => {
        const result = await testClient.post('/graphql').send({
          query: `{
            roles {
              id
              name
              identifier
            }
          }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.roles).toMatchInlineSnapshot(`Array []`)
      })
    })

    describe('when there are roles in database', () => {
      it('returns all roles in database', async () => {
        await roleGenerator('test1', 'test1')
        await roleGenerator('test2', 'test2')

        const result = await testClient.post('/graphql').send({
          query: `{
            roles {
              id
              name
              identifier
            }
          }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.roles).toMatchInlineSnapshot(`
          Array [
            Object {
              "id": "1",
              "identifier": "test1",
              "name": "test1",
            },
            Object {
              "id": "2",
              "identifier": "test2",
              "name": "test2",
            },
          ]
        `)
      })
    })
  })
  describe('mutation update roles', () => {
    it('update an existing roles', async () => {
      const roleTest = await roleGenerator('test1', 'test1')

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          updateRole(
          id: ${roleTest.id},
          name: "test role_name updated",
          identifier: "test role_identifier updated"
        ) {
          id
          name
          identifier
        }
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.updateRole).toMatchInlineSnapshot(`
        Object {
          "id": "1",
          "identifier": "test role_identifier updated",
          "name": "test role_name updated",
        }
      `)
    })
  })
  describe('mutation create role', () => {
    it('crate a role and return the role', async () => {
      const result = await testClient.post('/graphql').send({
        query: `mutation {
          createRole(
          name: "test name",
          identifier: "test_identifier"
        ) {
          id
          name
          identifier
        }
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.createRole).toMatchInlineSnapshot(`
        Object {
          "id": "1",
          "identifier": "test_identifier",
          "name": "test name",
        }
      `)
    })
  })
})
