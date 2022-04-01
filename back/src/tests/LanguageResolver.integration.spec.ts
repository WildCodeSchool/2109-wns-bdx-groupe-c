import createTestClient from 'supertest'
import { getExpressServer } from '../express-server'
import { getConnection } from 'typeorm'
import getDatabaseConnection from '../database-connection'
import { languageGenerator } from '../_mock_/languageGenerator'
import { projectGenerator } from '../_mock_/projectGenerator'

describe('Language Resolver', () => {
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

  describe('query languages', () => {
    describe('when there are no languages in database', () => {
      it('returns empty array', async () => {
        const result = await testClient.post('/graphql').send({
          query: `{
            languages {
              id
              name
            }
          }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.languages).toEqual([])
      })
    })
    describe('when there are languages in database', () => {
      it('returns all languages in database', async () => {
        await languageGenerator('PHP')
        await languageGenerator('JS')
        await languageGenerator('TS')

        const result = await testClient.post('/graphql').send({
          query: `{
            languages {
              id
              name
            }
          }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.languages).toMatchInlineSnapshot(`
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
      const name = 'Test'
      const result = await testClient.post('/graphql').send({
        query: `mutation {
          createLanguage(
              name: "${name}",
          ){
              id
              name
            }
          }`,
      })

      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.createLanguage).toMatchInlineSnapshot(`
        Object {
          "id": "1",
          "name": "Test",
        }
      `)
    })
  })
  describe('mutation update an existing language', () => {
    it('update an existing language', async () => {
      const languagePHP = await languageGenerator('PHP')

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          updateLanguage(
            id: ${languagePHP.id},
            name: "test update",
          ){
              id
              name
            }
          }`,
      })

      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.updateLanguage).toMatchInlineSnapshot(`
        Object {
          "id": "1",
          "name": "test update",
        }
      `)
    })
  })
  describe('mutation delete an existing language', () => {
    it('delete an existing language', async () => {
      const languagePHP = await languageGenerator('PHP')
      await projectGenerator('Project1', 'description1', 'shortText1', 0, [languagePHP])

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          deleteLanguage(
            id: ${languagePHP.id},
          ){
              id
              name
            }
          }`,
      })

      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.deleteLanguage).toMatchInlineSnapshot(`
        Object {
          "id": "1",
          "name": "PHP",
        }
      `)
    })
  })
})
