const { getCriticalComponentsAndPatterns } = require("../../src/criticalComponents");

describe("slice-021: Componentes Criticos y Patrones", () => {
  test("returns patterns and bounded contexts", () => {
    const data = getCriticalComponentsAndPatterns();

    expect(data).toEqual(
      expect.objectContaining({
        patterns: expect.any(Object),
        boundedContexts: expect.any(Object),
      })
    );
  });

  test("captures design patterns", () => {
    const data = getCriticalComponentsAndPatterns();

    expect(data.patterns).toEqual(
      expect.objectContaining({
        strategy: expect.stringMatching(/pagos/i),
        circuitBreaker: expect.stringMatching(/openai/i),
        saga: expect.stringMatching(/bloquear stock/i),
      })
    );
  });

  test("captures DDD context boundaries", () => {
    const data = getCriticalComponentsAndPatterns();

    expect(data.boundedContexts).toEqual(
      expect.objectContaining({
        core: expect.arrayContaining(["Sales/Inventory"]),
        generic: expect.arrayContaining(["Identity/Payment"]),
        supporting: expect.arrayContaining(["Analytics"]),
      })
    );
  });
});
