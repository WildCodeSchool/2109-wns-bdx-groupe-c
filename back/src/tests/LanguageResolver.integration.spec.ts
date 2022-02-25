import { ApolloServer } from 'apollo-server'
import { getConnection } from 'typeorm'
import getApolloServer from '../apollo-server'
import getDatabaseConnection from '../database-connection'
import { languageGenerator } from '../_mock_/languageGenerator'
import { projectGenerator } from '../_mock_/projectGenerator'

describe('Language Resolver', () => {
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

  describe('query languages', () => {
    const GET_Languages = `
    query Languages {
      languages {
        id
        name
      }
    }`

    describe('when there are no languages in database', () => {
      it('returns empty array', async () => {
        const result = await server.executeOperation({
          query: GET_Languages,
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.languages).toEqual([])
      })
    })
    describe('when there are languages in database', () => {
      it('returns all languages in database', async () => {
        await languageGenerator('PHP')
        await languageGenerator('JS')
        await languageGenerator('TS')

        const result = await server.executeOperation({
          query: GET_Languages,
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.languages).toMatchInlineSnapshot(`
          Array [
            Object {
              "id": "1",
              "name": "PHP",
            },
            Object {
              "id": "2",
              "name": "JS",
            },
            Object {
              "id": "3",
              "name": "TS",
            },
          ]
        `)
      })
    })
  })
  describe('mutation create a language', () => {
    it('create a laguage and return the new language', async () => {
      const CREATE_LANGUAGE = `
      mutation Mutation($name: String!) {
        createLanguage(name: $name) {
          id
          name
        }
      }`

      const result = await server.executeOperation({
        query: CREATE_LANGUAGE,
        variables: {
          name: 'Test',
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.createLanguage).toMatchInlineSnapshot(`
        Object {
          "id": "1",
          "name": "Test",
        }
      `)
    })
  })
  describe('mutation update an existing language', () => {
    it('update an existing language', async () => {
      const UPDATE_LANGUAGE = `
      mutation Mutation($updateLanguageId: Int!, $name: String!) {
        updateLanguage(id: $updateLanguageId, name: $name) {
          id
          name
        }
      }`

      const languagePHP = await languageGenerator('PHP')

      const result = await server.executeOperation({
        query: UPDATE_LANGUAGE,
        variables: {
          updateLanguageId: languagePHP.id,
          name: 'test update',
        },
      })
      expect(result.errors).toBeUndefined()
      expect(result.data?.updateLanguage).toMatchInlineSnapshot(`
        Object {
          "id": "1",
          "name": "test update",
        }
      `)
    })
  })
  describe('mutation delete an existing language', () => {
    it('delete an existing language', async () => {
      const DELETE_LANGUAGE = `
      mutation Mutation($deleteLanguageId: Int!) {
        deleteLanguage(id: $deleteLanguageId) {
          id
          name
        }
      }`

      const languagePHP = await languageGenerator('PHP')
      await projectGenerator('Project1', 'description1', 'shortText1', 0, [languagePHP])

      const result = await server.executeOperation({
        query: DELETE_LANGUAGE,
        variables: {
          deleteLanguageId: languagePHP.id,
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.deleteLanguage).toMatchInlineSnapshot(`
        Object {
          "id": "1",
          "name": "PHP",
        }
      `)
    })
  })
})
