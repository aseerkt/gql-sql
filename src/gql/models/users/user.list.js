import db from '../../../database/models';
import { createQueryConnection } from '../../../utils/gqlUtils';
import { GraphQLUserType } from './user.type';

export const UserConnection = createQueryConnection(db.userModel, {
  name: 'UserConnection',
  nodeType: GraphQLUserType,
});

export const UserListQuery = {
  list: {
    type: UserConnection.type,
  },
  args: UserConnection.args,
  resolve: UserConnection.resolve,
};
