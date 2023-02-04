import db from '../../../database/models';
import { createQueryConnection } from '../../../utils/gqlUtils';
import { GraphQLPostType } from './post.type';

export const PostConnection = createQueryConnection(db.postModel, {
  name: 'PostConnection',
  nodeType: GraphQLPostType,
});

export const PostListQuery = {
  list: {
    type: PostConnection.type,
  },
  args: PostConnection.args,
  resolve: PostConnection.resolve,
};
