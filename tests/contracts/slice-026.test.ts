const { getTestingStrategy } = require("../../src/testingStrategy");

describe("slice-026: Estrategia de Testing", () => {
  test("returns testing strategy structure", () => {
    const strategy = getTestingStrategy();

    expect(strategy).toEqual(
      expect.objectContaining({
        pyramid: expect.any(Object),
        coverage: expect.any(Object),
        productionTesting: expect.any(Object),
      })
    );
  });

  test("captures testing pyramid ratios and tools", () => {
    const strategy = getTestingStrategy();

    expect(strategy.pyramid).toEqual(
      expect.objectContaining({
        unit: expect.objectContaining({ percentage: 70 }),
        integration: expect.objectContaining({ percentage: 20, tooling: expect.arrayContaining(["Testcontainers"]) }),
        e2e: expect.objectContaining({ percentage: 10, tooling: expect.arrayContaining(["Playwright"]) }),
      })
    );
  });

  test("captures coverage targets and production testing", () => {
    const strategy = getTestingStrategy();

    expect(strategy.coverage).toEqual(
      expect.objectContaining({
        globalMinPercent: 80,
        criticalModulesPercent: 100,
        criticalModules: expect.arrayContaining(["pagos", "inventario"]),
      })
    );
    expect(strategy.productionTesting).toEqual(
      expect.objectContaining({
        featureFlags: expect.arrayContaining(["PostHog", "LaunchDarkly"]),
        canary: expect.objectContaining({ percent: 5, platform: "Render" }),
        smokeTests: expect.arrayContaining(["/health", "/api/v1/auth"]),
      })
    );
  });
});
