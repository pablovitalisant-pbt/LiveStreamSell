function getTestTypes() {
  return {
    unit: {
      frameworks: ["Pytest", "Vitest/Jest"],
      mocks: ["Meta API", "OpenAI/Gemini", "Email service"],
    },
    integration: {
      includes: ["FastAPI", "Supabase", "Webhooks Meta", "Redis lock"],
    },
    e2e: {
      tool: "Playwright",
      scenarios: ["Onboarding vendedor", "Comentario-DM-Pago", "Dashboard realtime"],
    },
    performance: {
      tool: "k6",
      loadScenario: "Flash Sale con 10,000 comentarios concurrentes en 1 minuto",
    },
    security: {
      sast: ["Bandit", "Snyk"],
      dast: "OWASP ZAP",
      dependencyScanning: "Dependabot",
    },
    accessibility: {
      tools: ["Axe-core", "Lighthouse"],
      standard: "WCAG 2.1 AA",
    },
  };
}

module.exports = { getTestTypes };
