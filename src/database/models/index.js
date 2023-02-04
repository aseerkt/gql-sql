import { Sequelize, DataTypes } from 'sequelize';
import { getDBClient } from '..';
import postModelDefiner from './posts';
import userModelDefiner from './users';

const sequelize = getDBClient();

const db = {
  userModel: userModelDefiner(sequelize, DataTypes),
  postModel: postModelDefiner(sequelize, DataTypes),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
