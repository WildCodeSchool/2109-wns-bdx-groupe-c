import createTestClient from 'supertest'
import { getExpressServer } from '../express-server'
import { getConnection } from 'typeorm'
import getDatabaseConnection from '../database-connection'

import { userGenerator } from '../_mock_/userGenerator'
import { languageGenerator } from '../_mock_/languageGenerator'
import { userLanguageGenerator } from '../_mock_/userLanguageGenerator'

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

  describe('query the language of users: myLanguages', () => {
    describe('when there are no languages associated to the user in database', () => {
      it('returns empty array', async () => {
        const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')

        const result = await testClient.post('/graphql').send({
          query: `{
            myLanguages(userId: ${userTest.id}) {
              id
              rating
              language {
                name
              }
          }
        }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.myLanguages).toMatchInlineSnapshot(`Array []`)
      })
    })
    describe('when there are languages associated to the user in database', () => {
      it('returns all the languages associated', async () => {
        const languagePHP = await languageGenerator('PHP')
        const languageJS = await languageGenerator('JS')
        const languageTS = await languageGenerator('TS')
        const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
        await userLanguageGenerator(userTest, languagePHP, 5)
        await userLanguageGenerator(userTest, languageJS, 4)
        await userLanguageGenerator(userTest, languageTS, 3)

        const result = await testClient.post('/graphql').send({
          query: `{
            myLanguages(userId: ${userTest.id}) {
              id
              rating
              language {
                name
              }
          }
        }`,
        })
        expect(JSON.parse(result.text).errors).toBeUndefined()
        expect(JSON.parse(result.text).data.myLanguages).toMatchInlineSnapshot(`
          Array [
            Object {
              "id": "1",
              "language": Object {
                "name": "PHP",
              },
              "rating": 5,
            },
            Object {
              "id": "2",
              "language": Object {
                "name": "JS",
              },
              "rating": 4,
            },
            Object {
              "id": "3",
              "language": Object {
                "name": "TS",
              },
              "rating": 3,
            },
          ]
        `)
      })
    })
  })
  describe('mutation change the rating of a language', () => {
    it('update an existing language to change the rating', async () => {
      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const languagePHP = await languageGenerator('PHP')
      const userLanguage = await userLanguageGenerator(userTest, languagePHP, 5)

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          updateRatingLanguage(
            userLanguageId: ${userLanguage.id},
            rating: 10,
        ) {
          rating
        }
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.updateRatingLanguage).toMatchInlineSnapshot(`
        Object {
          "rating": 10,
        }
      `)
    })
  })
  describe('mutation add language to user', () => {
    it('can add a language associated to a user', async () => {
      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const languagePHP = await languageGenerator('PHP')

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          addLanguageToUser(
            userId: ${userTest.id},
            languageId: ${languagePHP.id},
            rating: 5,
        ) {
          rating
        }
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.addLanguageToUser).toMatchInlineSnapshot(`
        Object {
          "rating": 5,
        }
      `)
    })
  })
  describe('mutation delete a language associated to a user', () => {
    it('can delete a language associated to a user', async () => {
      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const languagePHP = await languageGenerator('PHP')
      const userLanguage = await userLanguageGenerator(userTest, languagePHP, 5)

      const result = await testClient.post('/graphql').send({
        query: `mutation {
          deleteLanguageFromUser(
            userLanguageId: ${userLanguage.id},
        ) {
          rating
        }
      }`,
      })
      expect(JSON.parse(result.text).errors).toBeUndefined()
      expect(JSON.parse(result.text).data.deleteLanguageFromUser).toMatchInlineSnapshot(`
        Object {
          "rating": 5,
        }
      `)

      const resultFetch = await testClient.post('/graphql').send({
        query: `{
          myLanguages(userId: ${userTest.id}) {
            id
            rating
            language {
              name
            }
        }
      }`,
      })
      expect(JSON.parse(resultFetch.text).errors).toBeUndefined()
      expect(JSON.parse(resultFetch.text).data.myLanguages).toMatchInlineSnapshot(`Array []`)
    })
  })
})
