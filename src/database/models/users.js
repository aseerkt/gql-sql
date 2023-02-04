/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
const userModelDefiner = (sequelize, DataTypes) => {
  const userModel = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW'),
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW'),
        allowNull: false,
      },
    },
    { tableName: 'users', paranoid: true, timestamps: true, underscored: true }
  );

  userModel.associate = (db) => {
    userModel.hasMany(db.postModel, { foreignKey: 'userId', as: 'posts' });
  };

  return userModel;
};

export default userModelDefiner;
