const getStockLockTransaction = () => ({
  atomic: true,
  lock: "FOR UPDATE",
});

module.exports = { getStockLockTransaction };
