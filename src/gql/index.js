import { GraphQLSchema } from 'graphql';
import QueryRoot from './queries';

const gqlSchema = new GraphQLSchema({
  query: QueryRoot,
});

export default gqlSchema;
