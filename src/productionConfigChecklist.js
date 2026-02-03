const getProductionConfigChecklist = () => ({
  config: "production",
  checklist: ["env", "secrets", "monitoring"],
});

module.exports = { getProductionConfigChecklist };
