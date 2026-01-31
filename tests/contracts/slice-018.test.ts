const { getMetricsPolicy } = require("../../src/metricsPolicy");

describe("slice-018: Metricas", () => {
  test("returns metrics policy structure", () => {
    const policy = getMetricsPolicy();

    expect(policy).toEqual(
      expect.objectContaining({
        tools: expect.any(Array),
        goldenSignals: expect.any(Object),
        dashboards: expect.any(Object),
        slos: expect.any(Object),
      })
    );
  });

  test("captures tools and golden signals", () => {
    const policy = getMetricsPolicy();

    expect(policy.tools).toEqual(
      expect.arrayContaining(["Prometheus", "Grafana", "Render Metrics"])
    );
    expect(policy.goldenSignals).toEqual(
      expect.objectContaining({
        latency: expect.objectContaining({ p95SecondsMax: 2.5 }),
        errorRate: expect.stringMatching(/webhooks/i),
        throughput: expect.stringMatching(/cpm/i),
        saturation: expect.stringMatching(/pool/i),
      })
    );
  });

  test("captures dashboards and SLOs", () => {
    const policy = getMetricsPolicy();

    expect(policy.dashboards).toEqual(
      expect.objectContaining({
        devs: expect.arrayContaining(["salud sistema", "openai", "db"]),
        business: expect.arrayContaining(["conversion", "volumen", "retencion"]),
      })
    );
    expect(policy.slos).toEqual(
      expect.objectContaining({
        availabilityUptimeMonthly: 99.9,
        latencyConfirmationSecondsMax: 3,
        integrityPaidOrdersSecondsMax: 10,
      })
    );
  });
});
