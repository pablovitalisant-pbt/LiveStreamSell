const { getTestDataPolicy } = require("../../src/testDataPolicy");

describe("slice-028: Test Data", () => {
  test("returns test data policy structure", () => {
    const policy = getTestDataPolicy();

    expect(policy).toEqual(
      expect.objectContaining({
        fixtures: expect.any(Object),
        seeding: expect.any(Object),
        anonymization: expect.any(Object),
        syntheticData: expect.any(Object),
      })
    );
  });

  test("captures fixtures and seeding strategy", () => {
    const policy = getTestDataPolicy();

    expect(policy.fixtures).toEqual(
      expect.objectContaining({
        formats: expect.arrayContaining(["JSON", "YAML"]),
        examples: expect.arrayContaining(["catalogo 10 productos", "fanpage vinculada", "pedidos por estado"]),
        pytestFixtures: true,
      })
    );
    expect(policy.seeding).toEqual(
      expect.objectContaining({
        generators: expect.arrayContaining(["Factory Boy", "Faker"]),
        seedScripts: expect.stringMatching(/supabase|postgresql/i),
        ciReset: true,
      })
    );
  });

  test("captures anonymization rules and synthetic data preference", () => {
    const policy = getTestDataPolicy();

    expect(policy.anonymization).toEqual(
      expect.objectContaining({
        productionDataForbidden: true,
        sanitization: expect.arrayContaining([
          "User [ID]",
          "mask emails and tokens",
          "adjust transaction amounts",
        ]),
      })
    );
    expect(policy.syntheticData).toEqual(
      expect.objectContaining({
        preferred: true,
        source: "AI-generated",
      })
    );
  });
});
