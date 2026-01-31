function getLoggingPolicy() {
  return {
    strategy: {
      businessTransactions: ["creacion pedidos", "cambios stock", "confirmaciones pago"],
      aiEvents: ["texto entrada", "intencion detectada", "confianza modelo"],
      integrationErrors: ["webhooks meta", "timeouts pasarelas"],
    },
    levels: ["DEBUG", "INFO", "WARN", "ERROR"],
    format: { structured: "json", library: "structlog", fields: ["user_id", "live_id", "trace_id"] },
    centralization: { stack: "Logtail (Better Stack)", integration: "Render", alerts: ["Slack", "ERROR"] },
    retention: { appLogsDays: 30, auditLogs: { duration: "1 year", storage: ["Supabase cold table", "BigQuery"] } },
  };
}

module.exports = { getLoggingPolicy };
