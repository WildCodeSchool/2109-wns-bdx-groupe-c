import { ApolloServer, ExpressContext } from "apollo-server-express";
import { buildSchema } from 'type-graphql'
import { Response } from "express";
import { parse } from "cookie";

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
import { CustomContext } from "./type";
import AppUserSessionRepository from "./repository/UserSessionRepository";

const setSessionIdInCookie = (res: Response) => (sessionId: string) => {
  res.cookie('sessionId', sessionId, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })
}

const setUpContext = async (
  context: ExpressContext
): Promise<CustomContext> => {
  const { sessionId } = parse(context.req.headers.cookie || "");
  return {
    onSessionCreated: setSessionIdInCookie(context.res),
    user: sessionId ? await AppUserSessionRepository.findOneBySessionId(sessionId) : null,
  }
}


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
  const server = new ApolloServer({ schema, context: setUpContext })
  return { server, schema };
}
