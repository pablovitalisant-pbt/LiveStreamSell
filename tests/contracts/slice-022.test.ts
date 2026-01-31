const { getComponentsAndModules } = require("../../src/componentsModules");

describe("slice-022: Componentes y Modulos", () => {
  test("returns components structure", () => {
    const data = getComponentsAndModules();

    expect(data).toEqual(
      expect.objectContaining({
        frontend: expect.any(Object),
        backend: expect.any(Object),
        domainModules: expect.any(Array),
        dependencies: expect.any(Object),
        infrastructure: expect.any(Object),
      })
    );
  });

  test("captures frontend and backend tech/functions", () => {
    const data = getComponentsAndModules();

    expect(data.frontend).toEqual(
      expect.objectContaining({
        tech: expect.arrayContaining(["Next.js", "Tailwind CSS"]),
        functions: expect.arrayContaining(["catalogo", "metricas live", "pasarelas", "kill switch"]),
      })
    );
    expect(data.backend).toEqual(
      expect.objectContaining({
        api: "FastAPI",
        workers: expect.objectContaining({ name: "TaskIQ", reason: expect.stringMatching(/asyncio/i) }),
      })
    );
  });

  test("captures domain modules and dependencies flow", () => {
    const data = getComponentsAndModules();

    expect(data.domainModules).toEqual(
      expect.arrayContaining([
        "auth",
        "facebook_integration",
        "inventory_manager",
        "ai_localization",
        "payment_gateway",
      ])
    );
    expect(data.dependencies).toEqual(
      expect.objectContaining({
        consistencyFlow: expect.arrayContaining([
          "ai_localization",
          "inventory_manager",
          "payment_gateway",
          "messenger_integration",
        ]),
        compensationModule: expect.stringMatching(/saga/i),
      })
    );
  });

  test("captures infrastructure observability module", () => {
    const data = getComponentsAndModules();

    expect(data.infrastructure).toEqual(
      expect.objectContaining({
        observabilityModule: expect.stringMatching(/opentelemetry/i),
      })
    );
  });
});
