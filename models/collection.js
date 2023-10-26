'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Collection.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
    GamesId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    short_description: DataTypes.STRING,
    game_url: DataTypes.STRING,
    genre: DataTypes.STRING,
    platform: DataTypes.STRING,
    publisher: DataTypes.STRING,
    developer: DataTypes.STRING,
    release_date: DataTypes.DATE,
    freetogame_profile_url: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Collection',
  });
  return Collection;
};