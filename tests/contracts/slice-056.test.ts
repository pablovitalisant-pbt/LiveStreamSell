const { getWebhookIdempotency } = require("../../src/webhookIdempotency");

describe("slice-056: Webhook idempotente + dedupe", () => {
  test("returns idempotency configuration", () => {
    const config = getWebhookIdempotency();

    expect(config).toEqual(
      expect.objectContaining({
        idempotent: true,
        dedupe: true,
      })
    );
  });
});
