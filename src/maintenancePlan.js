function getMaintenancePlan() {
  return {
    updates: {
      dependencies: {
        tools: ["Dependabot", "Renovate"],
        cadence: "semanal",
        autoMinor: true,
        manualMajor: true,
      },
      os: "imagenes slim/alpine con parches en cada build",
      runtime: { cadence: "revision semestral", eolMigration: true },
    },
    sunsetPlan: {
      identification: "PostHog para detectar baja adopcion",
      communication: "Dashboard y Email con 3 meses de antelacion",
      transition: "guia de migracion o alternativas",
    },
    dataRetention: {
      commentLogs: { deleteAfterDays: 90, anonymizeIfOrdered: true },
      transactions: { retainYears: 5, reduceMetadataAfterYears: 1 },
      inactiveAccounts: { purgeAfterMonths: 18, noticeDays: 30 },
    },
  };
}

module.exports = { getMaintenancePlan };
