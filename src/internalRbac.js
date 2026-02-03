const getInternalRbac = () => ({
  roles: ["Owner", "Staff", "System"],
  source: "DB interna",
});

module.exports = { getInternalRbac };
