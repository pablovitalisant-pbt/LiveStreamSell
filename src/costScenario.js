function getCostScenario() {
  return {
    fixedMonthly: {
      supabaseProUsd: 25,
      backendUsdRange: [10, 15],
      frontendUsdRange: [0, 20],
      totalUsdRange: [45, 60],
    },
    variableCosts: {
      provider: "OpenAI/Gemini API",
      costPerThousandCommentsUsd: 0.3,
      projection: { monthlyComments: 100000, projectedUsd: 30 },
    },
    annualProjection: {
      usdRange: [900, 1200],
      notes: "Considera crecimiento moderado y dominios",
    },
  };
}

module.exports = { getCostScenario };
