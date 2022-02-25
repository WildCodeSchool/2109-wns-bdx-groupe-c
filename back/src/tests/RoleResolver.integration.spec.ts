import dotenv from 'dotenv'
import { ApolloServer } from 'apollo-server'
import { getConnection } from 'typeorm'
import getApolloServer from '../apollo-server'
import getDatabaseConnection from '../database-connection'

import { roleGenerator } from '../_mock_/roleGenerator'

dotenv.config()

describe('RoleResolver', () => {
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

  describe('query roles', () => {
    const GET_Roles = `
    query Roles {
      roles {
        id
        name
        identifier
      }
    }
    `

    describe('when there are no roles in database', () => {
      it('returns empty array', async () => {
        const result = await server.executeOperation({
          query: GET_Roles,
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.roles).toEqual([])
      })
    })

    describe('when there are roles in database', () => {
      it('returns all roles in database', async () => {
        await roleGenerator('test1', 'test1')
        await roleGenerator('test2', 'test2')

        const result = await server.executeOperation({
          query: GET_Roles,
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.roles).toMatchInlineSnapshot(`
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
      const UPDATE_ROLE = `
      mutation Mutation($updateRoleId: Int!, $name: String!, $identifier: String!) {
        updateRole(id: $updateRoleId, name: $name, identifier: $identifier) {
          id
          name
          identifier
        }
      }`

      const roleTest = await roleGenerator('test1', 'test1')

      const result = await server.executeOperation({
        query: UPDATE_ROLE,
        variables: {
          updateRoleId: roleTest.id,
          name: 'test role_name updated',
          identifier: 'test role_identifier updated',
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.updateRole).toEqual({
        id: '1',
        name: 'test role_name updated',
        identifier: 'test role_identifier updated',
      })
    })
  })
  describe('mutation create role', () => {
    it('crate a role and return the role', async () => {
      const CREATE_ROLE = `
      mutation CreateRole($name: String!, $identifier: String!) {
        createRole(name: $name, identifier: $identifier) {
          id
          name
          identifier
        }
      }`

      const result = await server.executeOperation({
        query: CREATE_ROLE,
        variables: {
          name: 'test name',
          identifier: 'test_identifier',
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.createRole).toMatchInlineSnapshot(`
        Object {
          "id": "1",
          "identifier": "test_identifier",
          "name": "test name",
        }
      `)
    })
  })
})
