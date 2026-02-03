const { getObservabilityBaseline } = require("../../src/observabilityBaseline");

describe("slice-058: request_id + logs estructurados", () => {
  test("returns observability baseline", () => {
    const baseline = getObservabilityBaseline();

    expect(baseline).toEqual(
      expect.objectContaining({
        requestId: true,
        structuredLogs: true,
      })
    );
  });
});
