import { GraphQLNonNull, GraphQLString } from 'graphql';

export const GraphQLTimeStamps = {
  createdAt: {
    type: new GraphQLNonNull(GraphQLString),
  },
  updatedAt: {
    type: new GraphQLNonNull(GraphQLString),
  },
  deletedAt: {
    type: GraphQLString,
  },
};
