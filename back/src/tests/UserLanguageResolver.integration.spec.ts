import { ApolloServer } from 'apollo-server'
import { getConnection } from 'typeorm'
import getApolloServer from '../apollo-server'
import getDatabaseConnection from '../database-connection'

import { userGenerator } from '../_mock_/userGenerator'
import { languageGenerator } from '../_mock_/languageGenerator'
import { userLanguageGenerator } from '../_mock_/userLanguageGenerator'

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

  describe('query the language of users: myLanguages', () => {
    const GET_LANGUAGE = `
    query Query($userId: Int!) {
      myLanguages(userId: $userId) {
        id
        rating
        language {
          name
        }
      }
    }
    `
    describe('when there are no languages associated to the user in database', () => {
      it('returns empty array', async () => {
        const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')

        const result = await server.executeOperation({
          query: GET_LANGUAGE,
          variables: {
            userId: userTest.id,
          },
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.myLanguages).toEqual([])
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

        const result = await server.executeOperation({
          query: GET_LANGUAGE,
          variables: {
            userId: userTest.id,
          },
        })
        expect(result.errors).toBeUndefined()
        expect(result.data?.myLanguages).toMatchInlineSnapshot(`
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
      const UPDATE_LANGUAGE = `
      mutation Mutation($userLanguageId: Int!, $rating: Float!) {
        updateRatingLanguage(userLanguageId: $userLanguageId, rating: $rating) {
          rating
        }
      }`

      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const languagePHP = await languageGenerator('PHP')
      const userLanguage = await userLanguageGenerator(userTest, languagePHP, 5)

      const result = await server.executeOperation({
        query: UPDATE_LANGUAGE,
        variables: {
          userLanguageId: userLanguage.id,
          rating: 10,
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.updateRatingLanguage).toMatchInlineSnapshot(`
        Object {
          "rating": 10,
        }
      `)
    })
  })
  describe('mutation add language to user', () => {
    it('can add a language associated to a user', async () => {
      const CREATE_LANGUAGE = `
      mutation Mutation($userId: Int!, $languageId: Int!, $rating: Float!) {
        addLanguageToUser(userId: $userId, languageId: $languageId, rating: $rating) {
          rating
        }
      }`

      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const languagePHP = await languageGenerator('PHP')

      const result = await server.executeOperation({
        query: CREATE_LANGUAGE,
        variables: {
          userId: userTest.id,
          languageId: languagePHP.id,
          rating: 5,
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.addLanguageToUser).toMatchInlineSnapshot(`
        Object {
          "rating": 5,
        }
      `)
    })
  })
  describe('mutation delete a language associated to a user', () => {
    it('can delete a language associated to a user', async () => {
      const DELETE_LANGUAGE = `
      mutation Mutation($userLanguageId: Int!) {
        deleteLanguageFromUser(userLanguageId: $userLanguageId) {
          rating
        }
      }`

      const GET_LANGUAGE = `
      query Query($userId: Int!) {
        myLanguages(userId: $userId) {
          id
          rating
          language {
            name
          }
        }
      }
      `

      const userTest = await userGenerator('Test', 'Test', 'nouveau@mail.com', 'password')
      const languagePHP = await languageGenerator('PHP')
      const userLanguage = await userLanguageGenerator(userTest, languagePHP, 5)

      const result = await server.executeOperation({
        query: DELETE_LANGUAGE,
        variables: {
          userLanguageId: userLanguage.id,
        },
      })

      expect(result.errors).toBeUndefined()
      expect(result.data?.deleteLanguageFromUser).toMatchInlineSnapshot(`
        Object {
          "rating": 5,
        }
      `)

      const resultFetch = await server.executeOperation({
        query: GET_LANGUAGE,
        variables: {
          userId: userTest.id,
        },
      })
      expect(resultFetch.errors).toBeUndefined()
      expect(resultFetch.data?.myLanguages).toEqual([])
    })
  })
})
