function getExternalIntegrations() {
  return {
    thirdPartyApis: [
      { name: "Meta Graph API", purpose: "Ingesta de comentarios, DMs, analitica Live", credentials: ["App ID", "App Secret", "Page Access Token"] },
      { name: "OpenAI/Gemini/OpenRouter", purpose: "NLP e intencion de compra", credentials: ["API Key"] },
      { name: "Flow/Mercado Pago", purpose: "Links de pago y conciliacion", credentials: ["API Key", "Secret Key", "Merchant ID"] },
      { name: "PayPal SDK", purpose: "Pagos internacionales", credentials: ["Client ID", "Secret Key"] },
      { name: "Google Cloud", purpose: "Exportacion a BigQuery", credentials: ["Service Account Key"] },
    ],
    webhooks: {
      eventsIn: ["feed_comment", "payment_success", "payment_failure"],
      payloadBase: { event: "string", timestamp: "ISO8601", data: "object" },
      retry: { strategy: "exponential-backoff", attempts: 5, schedule: ["10s", "1m", "5m", "15m", "1h"] },
      idempotency: { header: "X-Idempotency-Key", keys: ["comment_id", "transaction_id"] },
    },
    messagingQueues: {
      technology: ["Redis Streams", "FastAPI Background Tasks"],
      names: ["incoming_comments", "ai_processing", "notification_delivery"],
      schemaExample: { comment_id: "str", text: "quiero la roja", context: { tienda_id: "uuid", live_id: "uuid" }, schema_version: "1.0" },
    },
  };
}

module.exports = { getExternalIntegrations };
