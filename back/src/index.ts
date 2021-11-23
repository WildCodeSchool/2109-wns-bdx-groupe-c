import dotenv from 'dotenv'

import { ApolloServer } from 'apollo-server'

import { createConnection } from 'typeorm'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'

import ProjectRoleResolver from './resolvers/ProjectRoleResolver'
import StatusResolver from './resolvers/StatusResolver'
import RoleResolver from './resolvers/RoleResolver'
import CommentResolver from './resolvers/CommentResolver'
import UserResolver from './resolvers/UserResolver'
import ProjectResolver from './resolvers/ProjectResolver'
import LanguageResolver from './resolvers/LanguageResolver'

dotenv.config()

const runServer = async () => {
  await createConnection()
  // eslint-disable-next-line no-console
  console.log('Connected to database')

  const schema = await buildSchema({
    resolvers: [ProjectRoleResolver, StatusResolver, RoleResolver, CommentResolver, UserResolver, ProjectResolver, LanguageResolver],
  })
  const server = new ApolloServer({ schema })

  // The `listen` method launches a web server.
  server.listen({ port: 3004 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

runServer()
