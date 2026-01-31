const { getDisasterRecoveryPlan } = require("../../src/disasterRecoveryPlan");

describe("slice-034: Disaster Recovery", () => {
  test("returns DRP structure", () => {
    const plan = getDisasterRecoveryPlan();

    expect(plan).toEqual(
      expect.objectContaining({
        steps: expect.any(Array),
        backups: expect.any(Object),
        chaosEngineering: expect.any(Array),
      })
    );
  });

  test("captures recovery steps", () => {
    const plan = getDisasterRecoveryPlan();

    expect(plan.steps).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/pagerduty|slack/i),
        expect.stringMatching(/cloudflare.*mantenimiento/i),
        expect.stringMatching(/ghcr|render/i),
        expect.stringMatching(/point-in-time|pitr/i),
        expect.stringMatching(/smoke tests/i),
        expect.stringMatching(/post-mortem|wiki/i),
      ])
    );
  });

  test("captures backup policy", () => {
    const plan = getDisasterRecoveryPlan();

    expect(plan.backups).toEqual(
      expect.objectContaining({
        scope: expect.arrayContaining([
          "Postgres DB",
          "Terraform config",
          "audit logs",
          "order states",
        ]),
        database: expect.objectContaining({
          frequencyHours: 24,
          pitrDays: 7,
        }),
        files: expect.objectContaining({
          target: expect.stringMatching(/s3/i),
          mode: expect.stringMatching(/continua/i),
        }),
        location: expect.stringMatching(/supabase|s3/i),
        restore: expect.stringMatching(/supabase|terraform apply/i),
      })
    );
  });

  test("captures chaos engineering scenarios", () => {
    const plan = getDisasterRecoveryPlan();

    expect(plan.chaosEngineering).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/meta.*webhook/i),
        expect.stringMatching(/openai.*30s/i),
        expect.stringMatching(/flow|paypal.*transferencia/i),
        expect.stringMatching(/5000.*comentarios.*redis|auto-scaling/i),
      ])
    );
  });
});
