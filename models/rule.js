"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Rule, PaneltyRule }) {
      this.belongsToMany(Rule, {
        through: PaneltyRule,
        foreignKey: "rule",
        as: "rules",
      });
    }
  }
  Rule.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Rule must have a rule name" },
          notEmpty: { msg: "Rule name must not be empty" },
        },
      },
      penalty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Rule must have a penelty" },
          notEmpty: { msg: "Penelty must not be empty" },
        },
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Rule must have a score" },
          notEmpty: { msg: "Score must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "rules",
      modelName: "Rule",
    }
  );
  return Rule;
};
