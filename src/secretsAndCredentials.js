function getSecretsAndCredentials() {
  return {
    management: {
      runtime: {
        tools: ["Render Secret Files", "Environment Groups"],
        gitPersistence: false,
      },
      longTerm: {
        provider: "Supabase Vault (pgrst_vault)",
        data: "tokens de acceso de paginas de Facebook",
        encryptedAtDb: true,
      },
    },
    requiredSecrets: {
      infrastructure: [
        "DATABASE_URL",
        "SUPABASE_SERVICE_ROLE_KEY",
        "REDIS_URL",
      ],
      integrations: [
        "FB_APP_SECRET",
        "FB_WEBHOOK_VERIFY_TOKEN",
        "OPENAI_API_KEY",
      ],
      encryption: ["ENCRYPTION_KEY_AES256"],
    },
    rotation: {
      policy: "Rotacion cada 90 dias o ante sospecha de leak",
      automation: {
        target: "FB_PAGE_ACCESS_TOKENS",
        cadenceDays: 60,
      },
    },
    access: {
      backgroundWorker: ["llaves de IA", "pagos"],
      webhookApi: ["validacion de Meta"],
      human: "Supabase Dashboard MFA para administradores",
    },
  };
}

module.exports = { getSecretsAndCredentials };
