const { PaneltyRule } = require("../models");

const createPaneltyRule = async ({ paneltyId, panelty, ruleId }) => {
  return await PaneltyRule.create({
    paneltyId,
    panelty,
    ruleId,
  });
};

module.exports = {
  createPaneltyRule,
};
