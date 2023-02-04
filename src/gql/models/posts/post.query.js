import { GraphQLInt, GraphQLNonNull } from 'graphql';
import db from '../../../database/models';
import { createQueryResolver } from '../../../utils/gqlUtils';
import { GraphQLPostType } from './post.type';

export const PostQuery = {
  type: GraphQLPostType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: createQueryResolver(db.postModel),
};
