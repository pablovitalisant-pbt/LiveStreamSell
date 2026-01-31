function getConfigurationPlan() {
  return {
    configurationManagement: {
      environmentVariables: {
        backend: "FastAPI usa variables de entorno",
        validation: "Pydantic Settings para validacion runtime",
      },
      configFiles: {
        formats: [".yaml", ".json"],
        examples: ["limites de tasa", "expiracion de sesion"],
      },
    },
    storage: {
      git: "plantillas .env.example versionadas",
      renderSecrets: ["OpenAI API Key", "passwords DB", "Meta App Secret"],
      supabaseVault: {
        secrets: ["Access Tokens Facebook", "API Keys pasarelas"],
        encryption: "cifrado a nivel de fila",
      },
      infrastructure: "tfvars en Terraform Cloud o S3 cifrado",
    },
    environments: {
      development: {
        debug: true,
        logLevel: "DEBUG",
        db: "local o Supabase Dev Project",
        mocks: ["Meta", "Pasarelas de Pago"],
      },
      staging: {
        debug: false,
        logLevel: "INFO",
        db: "replica de produccion",
        integrations: ["Sandbox Meta", "Sandbox Pasarelas de Pago"],
      },
      production: {
        debug: false,
        logLevel: "ERROR/WARNING",
        db: "produccion con lectura escalada",
        webhooks: "URLs de produccion para Meta",
        security: "SSL forzado HSTS",
      },
    },
  };
}

module.exports = { getConfigurationPlan };
