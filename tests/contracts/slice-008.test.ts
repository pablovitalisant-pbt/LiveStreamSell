const { getDataStrategies } = require("../../src/dataStrategies");

describe("slice-008: Estrategias de Datos", () => {
  test("returns data strategy structure", () => {
    const strategy = getDataStrategies();

    expect(strategy).toEqual(
      expect.objectContaining({
        backupRecovery: expect.any(Object),
        replication: expect.any(Object),
        consistency: expect.any(Object),
      })
    );
  });

  test("captures backup and recovery targets", () => {
    const strategy = getDataStrategies();

    expect(strategy.backupRecovery).toEqual(
      expect.objectContaining({
        provider: "Supabase",
        cadence: "daily",
        plan: "Pro",
        rpoHours: 24,
        rtoHours: 2,
      })
    );
  });

  test("captures replication and consistency policies", () => {
    const strategy = getDataStrategies();

    expect(strategy.replication).toEqual(
      expect.objectContaining({
        readReplicas: expect.objectContaining({
          enabled: true,
          purpose: expect.stringContaining("dashboard"),
          relievesPrimary: true,
        }),
        multiRegion: expect.objectContaining({
          enabled: true,
          mode: "async",
          secondaryRegionExample: "sa-east-1",
          benefits: expect.arrayContaining(["disaster recovery", "latam reads"]),
        }),
      })
    );

    expect(strategy.consistency).toEqual(
      expect.objectContaining({
        strong: expect.arrayContaining(["inventario", "pagos"]),
        eventual: expect.arrayContaining(["ai_logs", "analiticas", "metricas dashboard"]),
      })
    );
  });
});
