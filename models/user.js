"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi one to many User memiliki banyak Post
      User.hasMany(models.Post, { foreignKey: "user_id", as: "post" });
      // relasi one to many User memiliki banyak PostLikes
      User.hasMany(models.post_likes, {
        foreignKey: "user_id",
        as: "post_likes",
      });
      // relasi one to many User memiliki banyak PostComments
      User.hasMany(models.post_comments, {
        foreignKey: "user_id",
        as: "post_comments",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
