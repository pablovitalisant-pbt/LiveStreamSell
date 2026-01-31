const { getCostScenario } = require("../../src/costScenario");

describe("slice-044: Costos escenario 10-20 clientes", () => {
  test("returns cost scenario structure", () => {
    const costs = getCostScenario();

    expect(costs).toEqual(
      expect.objectContaining({
        fixedMonthly: expect.any(Object),
        variableCosts: expect.any(Object),
        annualProjection: expect.any(Object),
      })
    );
  });

  test("captures fixed monthly infrastructure", () => {
    const costs = getCostScenario();

    expect(costs.fixedMonthly).toEqual(
      expect.objectContaining({
        supabaseProUsd: 25,
        backendUsdRange: [10, 15],
        frontendUsdRange: [0, 20],
        totalUsdRange: [45, 60],
      })
    );
  });

  test("captures variable AI/API costs", () => {
    const costs = getCostScenario();

    expect(costs.variableCosts).toEqual(
      expect.objectContaining({
        provider: expect.stringMatching(/openai|gemini/i),
        costPerThousandCommentsUsd: 0.3,
        projection: expect.objectContaining({
          monthlyComments: 100000,
          projectedUsd: 30,
        }),
      })
    );
  });

  test("captures annual projection", () => {
    const costs = getCostScenario();

    expect(costs.annualProjection).toEqual(
      expect.objectContaining({
        usdRange: [900, 1200],
        notes: expect.stringMatching(/crecimiento|dominios/i),
      })
    );
  });
});
