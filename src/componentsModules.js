function getComponentsAndModules() {
  return {
    frontend: {
      tech: ["Next.js", "Tailwind CSS"],
      functions: ["catalogo", "metricas live", "pasarelas", "kill switch"],
    },
    backend: { api: "FastAPI", workers: { name: "TaskIQ", reason: "Soporte nativo de asyncio" } },
    domainModules: ["auth", "facebook_integration", "inventory_manager", "ai_localization", "payment_gateway"],
    dependencies: {
      consistencyFlow: ["ai_localization", "inventory_manager", "payment_gateway", "messenger_integration"],
      compensationModule: "Saga para liberar stock en inventory_manager",
    },
    infrastructure: { observabilityModule: "Centraliza logs y trazas (OpenTelemetry)" },
  };
}

module.exports = { getComponentsAndModules };
