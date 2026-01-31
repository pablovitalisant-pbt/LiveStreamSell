const { getLoggingPolicy } = require("../../src/loggingPolicy");

describe("slice-017: Logging", () => {
  test("returns logging policy structure", () => {
    const policy = getLoggingPolicy();

    expect(policy).toEqual(
      expect.objectContaining({
        strategy: expect.any(Object),
        levels: expect.any(Array),
        format: expect.any(Object),
        centralization: expect.any(Object),
        retention: expect.any(Object),
      })
    );
  });

  test("captures what to log and levels", () => {
    const policy = getLoggingPolicy();

    expect(policy.strategy).toEqual(
      expect.objectContaining({
        businessTransactions: expect.arrayContaining(["creacion pedidos", "cambios stock", "confirmaciones pago"]),
        aiEvents: expect.arrayContaining(["texto entrada", "intencion detectada", "confianza modelo"]),
        integrationErrors: expect.arrayContaining(["webhooks meta", "timeouts pasarelas"]),
      })
    );
    expect(policy.levels).toEqual(
      expect.arrayContaining(["DEBUG", "INFO", "WARN", "ERROR"])
    );
  });

  test("captures format, centralization, and retention", () => {
    const policy = getLoggingPolicy();

    expect(policy.format).toEqual(
      expect.objectContaining({
        structured: "json",
        library: "structlog",
        fields: expect.arrayContaining(["user_id", "live_id", "trace_id"]),
      })
    );
    expect(policy.centralization).toEqual(
      expect.objectContaining({
        stack: "Logtail (Better Stack)",
        integration: "Render",
        alerts: expect.arrayContaining(["Slack", "ERROR"]),
      })
    );
    expect(policy.retention).toEqual(
      expect.objectContaining({
        appLogsDays: 30,
        auditLogs: expect.objectContaining({
          duration: "1 year",
          storage: expect.arrayContaining(["Supabase cold table", "BigQuery"]),
        }),
      })
    );
  });
});
