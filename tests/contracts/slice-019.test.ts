const { getTracingPolicy } = require("../../src/tracingPolicy");

describe("slice-019: Tracing", () => {
  test("returns tracing policy structure", () => {
    const policy = getTracingPolicy();

    expect(policy).toEqual(
      expect.objectContaining({
        standard: expect.any(String),
        tool: expect.any(String),
        traces: expect.any(Object),
        traceContext: expect.any(Object),
      })
    );
  });

  test("captures tracing tools and critical flows", () => {
    const policy = getTracingPolicy();

    expect(policy.standard).toMatch(/opentelemetry/i);
    expect(policy.tool).toMatch(/jaeger|tempo/i);
    expect(policy.traces).toEqual(
      expect.objectContaining({
        webhookLifecycle: expect.stringMatching(/meta/i),
        checkoutFlow: expect.stringMatching(/checkout|pago/i),
        aiQueries: expect.stringMatching(/openai|gemini/i),
      })
    );
  });

  test("captures trace context headers and log correlation", () => {
    const policy = getTracingPolicy();

    expect(policy.traceContext).toEqual(
      expect.objectContaining({
        header: "X-Trace-ID",
        correlatedWith: expect.arrayContaining(["logs", "Sentry", "Jaeger"]),
      })
    );
  });
});
