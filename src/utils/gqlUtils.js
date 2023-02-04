import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

const PageInfoType = new GraphQLObjectType({
  name: 'pageInfo',
  fields: () => ({
    hasNextPage: { type: new GraphQLNonNull(GraphQLBoolean) },
    hasPreviousPage: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
});

const getSelectionsAttributes = (info) => {
  const querySelections =
    info.operation.selectionSet.selections[0].selectionSet.selections;
  const attributes = [];
  querySelections.forEach((selection) => {
    if (!selection.selectionSet) {
      attributes.push(selection.name.value);
    }
  });
  return attributes;
};

/**
 *
 * @param {import('sequelize').ModelCtor<import('sequelize').Model} model
 * @returns
 */
export const createQueryResolver = (model) => {
  console.log('MODEL_START');
  console.log(model);
  console.log(JSON.stringify(model, null, 2));
  console.log('MODEL_END');
  return async (source, args, context, info) => {
    const findOptions = {
      where: { id: args.id },
      raw: true,
      nest: true,
    };
    const attributes = getSelectionsAttributes(info);
    findOptions.attributes = attributes;
    const result = await model.findOne(findOptions);
    return result;
  };
};

/**
 * Function to create connection for model
 * @param {import('sequelize').ModelCtor<import('sequelize').Model>} model
 * @param {{name: string, nodeType: import('graphql').GraphQLObjectType}} options
 * @returns
 */
export const createQueryConnection = (model, options) => {
  const { name, nodeType } = options;
  const EdgeType = new GraphQLObjectType({
    name: `${name}Edge`,
    fields: () => ({
      node: { type: nodeType },
    }),
  });

  const connectionType = new GraphQLObjectType({
    name,
    fields: () => ({
      pageInfo: { type: PageInfoType },
      edges: { type: new GraphQLList(EdgeType) },
    }),
  });

  const connectionResolver = async (source, args, _context, _info) => {
    const findOptions = {
      limit: args.limit,
      offset: args.offset,
      raw: true,
      nest: true,
    };
    const result = await model.findAll(findOptions);
    const pageInfo = {
      hasNextPage: false,
      hasPreviousPage: false,
    };
    if (result?.length === args.limit + 1) pageInfo.hasNextPage = true;
    if (result?.length && args.offset > 0) pageInfo.hasPreviousPage = true;
    return {
      pageInfo,
      edges: (result || []).map((node) => ({ node })),
    };
  };

  const connectionArgs = {
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt },
  };

  return {
    resolve: connectionResolver,
    type: connectionType,
    args: connectionArgs,
  };
};
