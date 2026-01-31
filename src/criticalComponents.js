function getCriticalComponentsAndPatterns() {
  return {
    patterns: {
      strategy: "Modulo de pagos intercambiable (Flow/PayPal/Mercado Pago)",
      circuitBreaker: "Circuit breaker para llamadas a IA (OpenAI) con modo fallback",
      saga: "Saga coreografia: bloquear stock -> generar pago -> notificar con compensacion",
    },
    boundedContexts: {
      core: ["Sales/Inventory"],
      generic: ["Identity/Payment"],
      supporting: ["Analytics"],
    },
  };
}

module.exports = { getCriticalComponentsAndPatterns };
