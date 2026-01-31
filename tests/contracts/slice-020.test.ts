const { getAlertingPolicy } = require("../../src/alertingPolicy");

describe("slice-020: Alerting", () => {
  test("returns alerting policy structure", () => {
    const policy = getAlertingPolicy();

    expect(policy).toEqual(
      expect.objectContaining({
        criticalConditions: expect.any(Array),
        channels: expect.any(Object),
        escalation: expect.any(Array),
        runbooks: expect.any(Array),
      })
    );
  });

  test("captures critical conditions", () => {
    const policy = getAlertingPolicy();

    expect(policy.criticalConditions).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/5xx/i),
        expect.stringMatching(/p95/i),
        expect.stringMatching(/meta graph/i),
        expect.stringMatching(/supabase/i),
        expect.stringMatching(/llm/i),
      ])
    );
  });

  test("captures channels and escalation", () => {
    const policy = getAlertingPolicy();

    expect(policy.channels).toEqual(
      expect.objectContaining({
        high: expect.arrayContaining(["Slack #alerts-critical", "PagerDuty"]),
        medium: expect.arrayContaining(["Email", "Dashboard admin"]),
      })
    );
    expect(policy.escalation).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ level: 1, windowMinutes: 15 }),
        expect.objectContaining({ level: 2, afterMinutes: 15 }),
        expect.objectContaining({ level: 3, afterMinutes: 30 }),
      ])
    );
  });

  test("captures runbooks", () => {
    const policy = getAlertingPolicy();

    expect(policy.runbooks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "RB-001", title: expect.stringMatching(/Meta Token Expired/i) }),
        expect.objectContaining({ id: "RB-002", title: expect.stringMatching(/OpenAI Timeout/i) }),
        expect.objectContaining({ id: "RB-003", title: expect.stringMatching(/DB Deadlock/i) }),
      ])
    );
  });
});
