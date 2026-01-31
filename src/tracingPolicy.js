function getTracingPolicy() {
  return {
    standard: "OpenTelemetry",
    tool: "Jaeger/Tempo",
    traces: {
      webhookLifecycle: "Rastreo desde Meta hasta respuesta en Messenger",
      checkoutFlow: "Trazabilidad del checkout/pago y abandono de carrito",
      aiQueries: "Duracion de llamadas OpenAI/Gemini",
    },
    traceContext: { header: "X-Trace-ID", correlatedWith: ["logs", "Sentry", "Jaeger"] },
  };
}

module.exports = { getTracingPolicy };
