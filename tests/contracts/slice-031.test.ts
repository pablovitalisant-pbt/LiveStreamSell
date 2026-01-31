const { getConfigurationPlan } = require("../../src/configurationPlan");

describe("slice-031: Configuracion", () => {
  test("returns configuration management structure", () => {
    const config = getConfigurationPlan();

    expect(config).toEqual(
      expect.objectContaining({
        configurationManagement: expect.any(Object),
        storage: expect.any(Object),
        environments: expect.any(Object),
      })
    );
  });

  test("captures configuration management sources", () => {
    const config = getConfigurationPlan();

    expect(config.configurationManagement).toEqual(
      expect.objectContaining({
        environmentVariables: expect.objectContaining({
          backend: expect.stringMatching(/fastapi/i),
          validation: expect.stringMatching(/pydantic/i),
        }),
        configFiles: expect.objectContaining({
          formats: expect.arrayContaining([".yaml", ".json"]),
          examples: expect.arrayContaining(["limites de tasa", "expiracion de sesion"]),
        }),
      })
    );
  });

  test("captures configuration storage and secrets handling", () => {
    const config = getConfigurationPlan();

    expect(config.storage.git).toMatch(/env.example/i);
    expect(config.storage.renderSecrets).toEqual([
      "OpenAI API Key",
      "passwords DB",
      "Meta App Secret",
    ]);
    expect(config.storage.supabaseVault.secrets).toEqual([
      "Access Tokens Facebook",
      "API Keys pasarelas",
    ]);
    expect(config.storage.supabaseVault.encryption).toMatch(/fila/i);
    expect(config.storage.infrastructure).toMatch(/tfvars|terraform/i);
  });

  test("captures environment differences", () => {
    const config = getConfigurationPlan();

    expect(config.environments).toEqual(
      expect.objectContaining({
        development: expect.objectContaining({
          debug: true,
          logLevel: "DEBUG",
          db: expect.stringMatching(/local|supabase/i),
          mocks: expect.arrayContaining(["Meta", "Pasarelas de Pago"]),
        }),
        staging: expect.objectContaining({
          debug: false,
          logLevel: "INFO",
          db: expect.stringMatching(/replica/i),
          integrations: expect.arrayContaining(["Sandbox Meta", "Sandbox Pasarelas de Pago"]),
        }),
        production: expect.objectContaining({
          debug: false,
          logLevel: expect.stringMatching(/ERROR|WARNING/),
          db: expect.stringMatching(/produccion/i),
          webhooks: expect.stringMatching(/produccion/i),
          security: expect.stringMatching(/HSTS/i),
        }),
      })
    );
  });
});
