function getStatePersistence() {
  return {
    dataLayer: { provider: "Supabase", engine: "PostgreSQL" },
    speedLayer: {
      provider: "Redis",
      purposes: ["Rate Limiting", "Session State", "Idempotency Keys"],
      sessionExample: "WAITING_FOR_PAYMENT_METHOD",
      idempotencyTtlHours: 24,
    },
  };
}

module.exports = { getStatePersistence };
