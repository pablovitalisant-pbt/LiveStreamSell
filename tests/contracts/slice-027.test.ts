const { getTestTypes } = require("../../src/testTypes");

describe("slice-027: Tipos de Tests", () => {
  test("returns test types structure", () => {
    const types = getTestTypes();

    expect(types).toEqual(
      expect.objectContaining({
        unit: expect.any(Object),
        integration: expect.any(Object),
        e2e: expect.any(Object),
        performance: expect.any(Object),
        security: expect.any(Object),
        accessibility: expect.any(Object),
      })
    );
  });

  test("captures unit, integration, and e2e details", () => {
    const types = getTestTypes();

    expect(types.unit).toEqual(
      expect.objectContaining({
        frameworks: expect.arrayContaining(["Pytest", "Vitest/Jest"]),
        mocks: expect.arrayContaining(["Meta API", "OpenAI/Gemini", "Email service"]),
      })
    );
    expect(types.integration).toEqual(
      expect.objectContaining({
        includes: expect.arrayContaining(["FastAPI", "Supabase", "Webhooks Meta", "Redis lock"]),
      })
    );
    expect(types.e2e).toEqual(
      expect.objectContaining({
        tool: "Playwright",
        scenarios: expect.arrayContaining(["Onboarding vendedor", "Comentario-DM-Pago", "Dashboard realtime"]),
      })
    );
  });

  test("captures performance, security, and accessibility tests", () => {
    const types = getTestTypes();

    expect(types.performance).toEqual(
      expect.objectContaining({
        tool: "k6",
        loadScenario: expect.stringMatching(/10,000 comentarios/i),
      })
    );
    expect(types.security).toEqual(
      expect.objectContaining({
        sast: expect.arrayContaining(["Bandit", "Snyk"]),
        dast: "OWASP ZAP",
        dependencyScanning: "Dependabot",
      })
    );
    expect(types.accessibility).toEqual(
      expect.objectContaining({
        tools: expect.arrayContaining(["Axe-core", "Lighthouse"]),
        standard: "WCAG 2.1 AA",
      })
    );
  });
});
