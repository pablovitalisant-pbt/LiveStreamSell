const { getMaintenancePlan } = require("../../src/maintenancePlan");

describe("slice-035: Mantenimiento", () => {
  test("returns maintenance structure", () => {
    const plan = getMaintenancePlan();

    expect(plan).toEqual(
      expect.objectContaining({
        updates: expect.any(Object),
        sunsetPlan: expect.any(Object),
        dataRetention: expect.any(Object),
      })
    );
  });

  test("captures update policies", () => {
    const plan = getMaintenancePlan();

    expect(plan.updates).toEqual(
      expect.objectContaining({
        dependencies: expect.objectContaining({
          tools: expect.arrayContaining(["Dependabot", "Renovate"]),
          cadence: expect.stringMatching(/semanal/i),
          autoMinor: true,
          manualMajor: true,
        }),
        os: expect.stringMatching(/slim|alpine/i),
        runtime: expect.objectContaining({
          cadence: expect.stringMatching(/semestral/i),
          eolMigration: true,
        }),
      })
    );
  });

  test("captures sunset plan for deprecated features", () => {
    const plan = getMaintenancePlan();

    expect(plan.sunsetPlan).toEqual(
      expect.objectContaining({
        identification: expect.stringMatching(/posthog/i),
        communication: expect.stringMatching(/dashboard|email|3 meses/i),
        transition: expect.stringMatching(/guia|alternativas/i),
      })
    );
  });

  test("captures data retention rules", () => {
    const plan = getMaintenancePlan();

    expect(plan.dataRetention).toEqual(
      expect.objectContaining({
        commentLogs: expect.objectContaining({
          deleteAfterDays: 90,
          anonymizeIfOrdered: true,
        }),
        transactions: expect.objectContaining({
          retainYears: 5,
          reduceMetadataAfterYears: 1,
        }),
        inactiveAccounts: expect.objectContaining({
          purgeAfterMonths: 18,
          noticeDays: 30,
        }),
      })
    );
  });
});
