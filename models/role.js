"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.hasMany(User, { foreignKey: "roleId", as: "users" });
    }

    toJSON() {
      return {
        ...this.get(),

        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  Role.init(
    {
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Role must have a role" },
          notEmpty: { msg: "Role must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "roles",
      modelName: "Role",
    }
  );
  return Role;
};
