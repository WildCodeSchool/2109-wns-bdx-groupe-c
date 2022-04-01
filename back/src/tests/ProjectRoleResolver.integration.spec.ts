import createTestClient from 'supertest'
import { getExpressServer } from '../express-server'
import { getConnection } from 'typeorm'
import getDatabaseConnection from '../database-connection'

import { projectRoleGenerator } from '../_mock_/projectRoleGenerator'

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

  describe('query roles of projects', () => {
    describe('when there are no project role in database', () => {
      it('returns empty array', async () => {
        const result = await testClient.post('/graphql').send({
          query: `{
            projectRoles {
              id
              name
            }
          }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.projectRoles).toMatchInlineSnapshot(`Array []`)
      })
    })

    describe('when there are project roles in database', () => {
      it('returns all roles', async () => {
        await projectRoleGenerator('test1')
        await projectRoleGenerator('test2')

        const result = await testClient.post('/graphql').send({
          query: `{
            projectRoles {
              id
              name
            }
          }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.projectRoles).toMatchInlineSnapshot(`
          Array [
            Object {
              "id": "1",
              "name": "test1",
            },
            Object {
              "id": "2",
              "name": "test2",
            },
          ]
        `)
      })
    })
  })
  describe('mutation update project roles', () => {
    it('update an existing project role', async () => {
      const projectRole = await projectRoleGenerator('test1')

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          updateProjectRole(
          id: ${projectRole.id},
          name: "test updated",
        ) {
          id
          name
        }
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.updateProjectRole).toMatchInlineSnapshot(`
        Object {
          "id": "1",
          "name": "test updated",
        }
      `)
    })
  })
  describe('mutation create project roles', () => {
    it('create a  project role and return the role created', async () => {
      const result = await testClient.post('/graphql').send({
        query: `mutation {
          createProjectRole(
          name: "test role created",
        ) {
          id
          name
        }
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.createProjectRole).toMatchInlineSnapshot(`
        Object {
          "id": "1",
          "name": "test role created",
        }
      `)
    })
  })
  describe('mutation delete project roles', () => {
    it('delete an existing project role and return the deleted project role', async () => {
      const projectRole = await projectRoleGenerator('test1')

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          deleteProjectRole(
          id: ${projectRole.id}
        ) {
          id
          name
        }
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.deleteProjectRole).toMatchInlineSnapshot(`
        Object {
          "id": "1",
          "name": "test1",
        }
      `)
    })
  })
})
