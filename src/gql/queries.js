import { GraphQLObjectType } from 'graphql';
import gqlLoader from '../utils/gqlLoader';

const { queries, lists } = gqlLoader();

const gqlQueries = {
  ...queries,
  ...lists,
};

const QueryRoot = new GraphQLObjectType({
  name: 'QueryRoot',
  fields: {
    ...gqlQueries,
  },
});

export default QueryRoot;
