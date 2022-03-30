import dotenv from 'dotenv'
import 'reflect-metadata'

import { createServer } from "http";

import getDatabaseConnection from "./database-connection";
import getExpressServer from "./express-server";

dotenv.config()

const runServer = async () => {

  if (!process.env.DATABASE_URL) {
    throw Error("DATABASE_URL must be set in environment.");
  }


  await getDatabaseConnection(process.env.DATABASE_URL);
  // eslint-disable-next-line no-console
  console.log("Connected to database");

  const { expressServer, apolloServer, graphQLSchema } =
  await getExpressServer();

  const server = createServer(expressServer);

  // The `listen` method launches a web server.
  server.listen(3004, () => {
    console.log(
      `🚀 Server ready at http://localhost:3004${apolloServer.graphqlPath}`
    );
  })
};

runServer();
