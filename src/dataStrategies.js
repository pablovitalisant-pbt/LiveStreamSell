function getDataStrategies() {
  return {
    backupRecovery: { provider: "Supabase", cadence: "daily", plan: "Pro", rpoHours: 24, rtoHours: 2 },
    replication: {
      readReplicas: { enabled: true, purpose: "dashboard analiticas", relievesPrimary: true },
      multiRegion: {
        enabled: true,
        mode: "async",
        secondaryRegionExample: "sa-east-1",
        benefits: ["disaster recovery", "latam reads"],
      },
    },
    consistency: {
      strong: ["inventario", "pagos"],
      eventual: ["ai_logs", "analiticas", "metricas dashboard"],
    },
  };
}

module.exports = { getDataStrategies };
