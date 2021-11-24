import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import ProjectResolver from './resolvers/ProjectResolver'
import ProjectRoleResolver from './resolvers/ProjectRoleResolver'
import StatusResolver from './resolvers/StatusResolver'
import RoleResolver from './resolvers/RoleResolver'
import CommentResolver from './resolvers/CommentResolver'
import UserResolver from './resolvers/UserResolver'
import LanguageResolver from './resolvers/LanguageResolver'

export default async () => {
    const schema = await buildSchema({ resolvers: [
        ProjectResolver,
        ProjectRoleResolver,
        StatusResolver,
        RoleResolver,
        CommentResolver,
        UserResolver,
        LanguageResolver
    ] });
    const server = new ApolloServer({ schema });
    return server;
}