function getTestingStrategy() {
  return {
    pyramid: {
      unit: { percentage: 70, focus: "logica pura" },
      integration: { percentage: 20, tooling: ["Testcontainers"], focus: "Supabase/Meta/Auth" },
      e2e: { percentage: 10, tooling: ["Playwright"], focus: "flujos criticos" },
    },
    coverage: {
      globalMinPercent: 80,
      criticalModulesPercent: 100,
      criticalModules: ["pagos", "inventario"],
    },
    productionTesting: {
      featureFlags: ["PostHog", "LaunchDarkly"],
      canary: { percent: 5, platform: "Render" },
      smokeTests: ["/health", "/api/v1/auth"],
    },
  };
}

module.exports = { getTestingStrategy };
