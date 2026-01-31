function getInfrastructurePlan() {
  return {
    cloudProviders: { compute: "Render.com", baas: "Supabase (PostgreSQL/Auth/Edge)" },
    regions: { primaryRegion: "aws-us-east-1", latencyMsMax: 10 },
    networking: {
      dnsCdnWaf: "Cloudflare",
      ddosProtection: true,
      scrapingProtection: true,
      keepAlive: { endpoint: "/health", intervalMinutes: 5, providers: ["Cron-job.org", "GitHub Actions"] },
      deepHealthChecks: { checksPostgres: true, checksRedis: true },
    },
    computeScaling: {
      webService: { provider: "Render", autoScaling: true, minInstances: 1, maxInstances: 10, scalingMetric: "CPU" },
      backgroundWorkers: { separateInstances: true, isolatesLlmLatency: true, purpose: "Recepcion de Meta Webhooks" },
    },
    security: { secretsManagement: { renderEncryptedEnv: true, supabaseVault: true }, sslTls: "end-to-end" },
  };
}

module.exports = { getInfrastructurePlan };
