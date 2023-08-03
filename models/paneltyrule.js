"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaneltyRule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Panelty, Rule }) {
      this.belongsTo(Panelty, { foreignKey: "panelty", as: "panelties" });
      this.belongsTo(Rule, { foreignKey: "rule", as: "rules" });
    }
  }
  PaneltyRule.init(
    {
      paneltyId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Panelty rule must have a panelty id" },
          notEmpty: { msg: "Panelty id must not be empty" },
        },
      },
      panelty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Panelty rule must have a panelty" },
          notEmpty: { msg: "Panelty must not be empty" },
        },
      },
      rule: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Panelty rule must have a rule" },
          notEmpty: { msg: "Rule must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "panelty_rule",
      modelName: "PaneltyRule",
    }
  );
  return PaneltyRule;
};
