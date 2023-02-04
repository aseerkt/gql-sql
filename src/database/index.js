import process from 'node:process';
import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];

/**
 * @type {import('sequelize').Sequelize}
 */
let sequelize;

export const getDBClient = () => {
  if (sequelize) return sequelize;
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );
  }

  return sequelize;
};

export const connectDB = async () => {
  try {
    sequelize = getDBClient();
    await sequelize.authenticate();
    console.log('DB connected successfullly');
  } catch (error) {
    console.info(error.message);
    console.error('DB connection failed');
    process.exit(1);
  }
};

export const syncDB = async (force = false) => {
  try {
    sequelize = getDBClient();
    await sequelize.sync({ force });
    console.log('DB synced successfullly');
  } catch (error) {
    console.info(error.message);
    console.error('DB connection failed');
    process.exit(1);
  }
};
