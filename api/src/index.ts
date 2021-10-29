import dotenv from "dotenv";

import { ApolloServer } from "apollo-server";

import { createConnection } from "typeorm";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import ProjectRoleResolver from "./resolvers/ProjectRoleResolver";

dotenv.config();


const runServer = async () => {
    await createConnection();
    // eslint-disable-next-line no-console
    console.log("Connected to database");
  
    const schema = await buildSchema({ resolvers: [ProjectRoleResolver] });
    const server = new ApolloServer({ schema });
  
    // The `listen` method launches a web server.
    server.listen({ port: 3004 }).then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  };
  
  runServer();
  