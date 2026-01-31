function getDeploymentStrategy() {
  return {
    environments: {
      development: {
        tooling: "Docker Compose local",
        data: "Supabase DB de pruebas",
      },
      staging: {
        platform: "Render.com",
        purpose: ["App Review Meta", "QA"],
        data: "datos sinteticos",
      },
      production: {
        availability: "alta disponibilidad",
        autoscaling: true,
        signedCodeOnly: true,
      },
    },
    release: {
      canary: {
        initialExposurePercent: 5,
        successCriteria: "5xx y latencia del bot estables",
        promoteAfterMinutes: 10,
      },
      rollingUpdates: {
        useCase: "UI Dashboard",
        policy: "reemplazo una a una",
      },
    },
    featureFlags: {
      tool: "PostHog",
      sdk: ["Python", "React"],
      strategy: {
        defaultState: "off",
        audience: "Beta Testers",
        killSwitch: true,
        example: "PayPal internacional",
      },
    },
    rollback: {
      automatic: {
        renderHealthCheckFails: 3,
        errorSpikePercent: 15,
        errorWindow: "primer minuto",
      },
      manual: { action: "Promote Previous Build" },
      conditions: [
        "Inconsistencia de datos en BD",
        "latencia de la IA > 10s post-release",
        "fallos criticos en el webhook de Meta",
      ],
    },
  };
}

module.exports = { getDeploymentStrategy };
