import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'

import CommentResolver from './resolvers/CommentResolver'
import LanguageResolver from './resolvers/LanguageResolver'
import ProjectResolver from './resolvers/ProjectResolver'
import ProjectRoleResolver from './resolvers/ProjectRoleResolver'
import RoleResolver from './resolvers/RoleResolver'
import StatusResolver from './resolvers/StatusResolver'
import TaskResolver from './resolvers/TaskResolver'
import UserResolver from './resolvers/UserResolver'
import UserLanguageResolver from './resolvers/UserLanguageResolver'
import UserProjectResolver from './resolvers/UserProjectResolver'

export default async () => {
  const schema = await buildSchema({
    resolvers: [
      CommentResolver,
      LanguageResolver,
      ProjectResolver,
      ProjectRoleResolver,
      RoleResolver,
      StatusResolver,
      TaskResolver,
      UserResolver,
      UserLanguageResolver,
      UserProjectResolver,
    ],
  })
  const server = new ApolloServer({ schema })
  return server
}
