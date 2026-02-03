const getMinimalStableModel = () => ({
  tables: ["clientes", "ventas"],
  constraints: ["primary key", "foreign key"],
});

module.exports = { getMinimalStableModel };
