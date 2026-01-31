function getNfrDefinition() {
  return {
    performance: { commentsPerMinute: 1000, scope: "perLive" },
    scalability:
      "Arquitectura de contenedores elastica con auto-scaling por CPU/RAM para picos de trafico en tiempo real.",
    idempotency:
      "Reintentos de webhook no genere pedidos duplicados ni descuentan stock erroneamente.",
    availability:
      "Despliegue multi-region con failover automatico durante los Lives.",
    security:
      "Autenticacion JWT, validacion de firmas X-Hub-Signature y secretos en vaults cifrados.",
    usability: "UI/UX con i18n nativa y soporte RTL para mercados arabes.",
    observability:
      "Logging centralizado y dashboards (Grafana/Datadog) para precision de la IA en tiempo real.",
  };
}

module.exports = { getNfrDefinition };
