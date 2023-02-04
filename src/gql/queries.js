import { GraphQLObjectType } from 'graphql';
import { PostListQuery, PostQuery } from './models/posts';
import { UserQuery, UserListQuery } from './models/users';

const queries = {
  user: {
    ...UserQuery.query,
    args: UserQuery.args,
    resolve: UserQuery.resolve,
  },
  users: {
    ...UserListQuery.list,
    args: UserListQuery.args,
    resolve: UserListQuery.resolve,
  },
  post: {
    ...PostQuery.query,
    args: PostQuery.args,
    resolve: PostQuery.resolve,
  },
  posts: {
    ...PostListQuery.list,
    args: PostListQuery.args,
    resolve: PostListQuery.resolve,
  },
};

const QueryRoot = new GraphQLObjectType({
  name: 'QueryRoot',
  fields: {
    ...queries,
  },
});

export default QueryRoot;
