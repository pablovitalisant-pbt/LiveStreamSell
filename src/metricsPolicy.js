function getMetricsPolicy() {
  return {
    tools: ["Prometheus", "Grafana", "Render Metrics"],
    goldenSignals: {
      latency: { p95SecondsMax: 2.5 },
      errorRate: "Tasa de errores en webhooks != 200",
      throughput: "CPM comentarios por minuto",
      saturation: "Uso de pool DB y memoria worker IA",
    },
    dashboards: {
      devs: ["salud sistema", "openai", "db"],
      business: ["conversion", "volumen", "retencion"],
    },
    slos: {
      availabilityUptimeMonthly: 99.9,
      latencyConfirmationSecondsMax: 3,
      integrityPaidOrdersSecondsMax: 10,
    },
  };
}

module.exports = { getMetricsPolicy };
