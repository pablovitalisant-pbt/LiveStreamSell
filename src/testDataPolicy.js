function getTestDataPolicy() {
  return {
    fixtures: {
      formats: ["JSON", "YAML"],
      examples: ["catalogo 10 productos", "fanpage vinculada", "pedidos por estado"],
      pytestFixtures: true,
    },
    seeding: {
      generators: ["Factory Boy", "Faker"],
      seedScripts: "Supabase/PostgreSQL",
      ciReset: true,
    },
    anonymization: {
      productionDataForbidden: true,
      sanitization: ["User [ID]", "mask emails and tokens", "adjust transaction amounts"],
    },
    syntheticData: { preferred: true, source: "AI-generated" },
  };
}

module.exports = { getTestDataPolicy };
