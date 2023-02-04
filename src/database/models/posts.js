/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
const postModelDefiner = (sequelize, DataTypes) => {
  const postModel = sequelize.define(
    'posts',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: true,
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
    { tableName: 'posts', paranoid: true, timestamps: true, underscored: true }
  );

  postModel.associate = (db) => {
    postModel.hasOne(db.userModel, { as: 'user' });
  };

  return postModel;
};

export default postModelDefiner;
