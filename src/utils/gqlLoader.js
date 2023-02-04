import fs from 'fs';
import path from 'path';
import pluralize from 'pluralize';
import capitalize from 'lodash/capitalize';

const gqlLoader = () => {
  const gqlModelFolderPath = path.join(__dirname, '../gql/models');
  const folders = fs.readdirSync(gqlModelFolderPath);

  const queries = {};
  const lists = {};

  folders.forEach((folder) => {
    const filePath = path.join(gqlModelFolderPath, folder, 'index.js');
    const file = fs.lstatSync(filePath);
    if (!file.isFile()) return;
    const name = pluralize.singular(folder);
    const prefix = capitalize(name);
    const fileModule = require(filePath);

    if (fileModule[`${prefix}Query`])
      queries[name] = fileModule[`${prefix}Query`];

    if (fileModule[`${prefix}ListQuery`])
      lists[folder] = fileModule[`${prefix}ListQuery`];
  });

  return { queries, lists };
};

export default gqlLoader;
