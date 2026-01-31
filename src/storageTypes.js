function getStorageTypes() {
  return {
    relational: { engine: "PostgreSQL", provider: "Supabase", sourceOfTruth: true, compliance: "ACID" },
    nosql: { engine: "Redis", provider: "Upstash", usage: "Datos volatil y alta velocidad", ephemeralOnly: true },
    search: {
      primary: "PostgreSQL FTS",
      dashboardBoost: { provider: "Algolia", thresholdProducts: 1000, mode: "as-you-type" },
    },
    cache: {
      engine: "Redis",
      cacheItems: ["catalogos activos", "tokens facebook", "respuestas ia"],
      ttlMinutesCatalogs: 15,
      ttlHoursFbSessions: 24,
      strategy: { products: "cache-aside", userSessions: "write-through" },
    },
    objectStorage: { provider: "Supabase Storage", base: "S3", usage: ["imagenes productos", "backups logs"] },
    dataWarehousing: { provider: "BigQuery", exportsWeekly: true, datasets: ["ai_logs", "pedido_items"] },
  };
}

module.exports = { getStorageTypes };
