import { ApolloServer } from 'apollo-server'
import { getConnection } from 'typeorm'
import getApolloServer from '../apollo-server'
import getDatabaseConnection from '../database-connection'

import { projectRoleGenerator } from '../_mock_/projectRoleGenerator'

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

  describe('query roles of projects', () => {
    const GET_PROJECT_ROLES = `
    query Roles {
      projectRoles {
        id
        name
      }
    }
    `

    describe('when there are no project role in database', () => {
      it('returns empty array', async () => {
        const result = await server.executeOperation({
          query: GET_PROJECT_ROLES,
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.projectRoles).toEqual([])
      })
    })

    describe('when there are project roles in database', () => {
      it('returns all roles', async () => {
        await projectRoleGenerator('test1')
        await projectRoleGenerator('test2')

        const result = await server.executeOperation({
          query: GET_PROJECT_ROLES,
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.projectRoles).toMatchInlineSnapshot(`
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
      const UPDATE_PROJECT_ROLE = `
      mutation UpdateProjectRole($updateProjectRoleId: Int!, $name: String!) {
        updateProjectRole(id: $updateProjectRoleId, name: $name) {
          id
          name
        }
      }
      `

      const projectRole = await projectRoleGenerator('test1')

      const result = await server.executeOperation({
        query: UPDATE_PROJECT_ROLE,
        variables: {
          updateProjectRoleId: projectRole.id,
          name: 'test updated',
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.updateProjectRole).toMatchInlineSnapshot(`
        Object {
          "id": "1",
          "name": "test updated",
        }
      `)
    })
  })
  describe('mutation create project roles', () => {
    it('create a  project role and return the role created', async () => {
      const CREATE_PROJECT_ROLE = `
      mutation CreateProjectRole($name: String!) {
        createProjectRole(name: $name) {
          id
          name
        }
      }
      `
      const result = await server.executeOperation({
        query: CREATE_PROJECT_ROLE,
        variables: {
          name: 'test role created',
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.createProjectRole).toMatchInlineSnapshot(`
        Object {
          "id": "1",
          "name": "test role created",
        }
      `)
    })
  })
  describe('mutation delete project roles', () => {
    it('delete an existing project role and return the deleted project role', async () => {
      const DELETE_PROJECT_ROLE = `
      mutation DeleteProjectRole($deleteProjectRoleId: Float!) {
        deleteProjectRole(id: $deleteProjectRoleId) {
          id
          name
        }
      }
      `
      const projectRole = await projectRoleGenerator('test1')

      const result = await server.executeOperation({
        query: DELETE_PROJECT_ROLE,
        variables: {
          deleteProjectRoleId: projectRole.id,
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.deleteProjectRole).toMatchInlineSnapshot(`
        Object {
          "id": "1",
          "name": "test1",
        }
      `)
    })
  })
})
