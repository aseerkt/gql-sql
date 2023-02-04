import { GraphQLInt, GraphQLNonNull } from 'graphql';
import db from '../../../database/models';
import { createQueryResolver } from '../../../utils/gqlUtils';
import { GraphQLUserType } from './user.type';

export const UserQuery = {
  type: GraphQLUserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: createQueryResolver(db.userModel),
};
