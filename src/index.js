import cors from 'cors';
import http from 'node:http';
import express from 'express';
import { syncDB } from './database';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import gqlSchema from './gql';

const init = async () => {
  await syncDB();

  const app = express();
  app.use(express.json());
  app.use(cors());

  const httpServer = http.createServer(app);

  const gqlServer = new ApolloServer({
    schema: gqlSchema,
    logger: console.log,
    // eslint-disable-next-line new-cap
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await gqlServer.start();

  app.use(
    '/graphql',
    expressMiddleware(gqlServer, { context: async () => ({}) })
  );

  httpServer.listen(7000, () => {
    console.log('Server running in http://localhost:7000/graphql');
  });
};

init();
