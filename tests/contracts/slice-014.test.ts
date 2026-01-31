const { getExternalIntegrations } = require("../../src/integrations");

describe("slice-014: Integraciones Externas", () => {
  test("returns integrations structure", () => {
    const integrations = getExternalIntegrations();

    expect(integrations).toEqual(
      expect.objectContaining({
        thirdPartyApis: expect.any(Array),
        webhooks: expect.any(Object),
        messagingQueues: expect.any(Object),
      })
    );
  });

  test("captures third-party APIs and required credentials", () => {
    const integrations = getExternalIntegrations();
    const apis = integrations.thirdPartyApis;

    expect(apis).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Meta Graph API", credentials: expect.arrayContaining(["App ID", "App Secret", "Page Access Token"]) }),
        expect.objectContaining({ name: "OpenAI/Gemini/OpenRouter", credentials: expect.arrayContaining(["API Key"]) }),
        expect.objectContaining({ name: "Flow/Mercado Pago", credentials: expect.arrayContaining(["API Key", "Secret Key", "Merchant ID"]) }),
        expect.objectContaining({ name: "PayPal SDK", credentials: expect.arrayContaining(["Client ID", "Secret Key"]) }),
        expect.objectContaining({ name: "Google Cloud", credentials: expect.arrayContaining(["Service Account Key"]) }),
      ])
    );
  });

  test("captures webhook events, payload, and retry logic", () => {
    const integrations = getExternalIntegrations();
    const webhooks = integrations.webhooks;

    expect(webhooks.eventsIn).toEqual(
      expect.arrayContaining(["feed_comment", "payment_success", "payment_failure"])
    );
    expect(webhooks.payloadBase).toEqual(
      expect.objectContaining({ event: "string", timestamp: "ISO8601", data: "object" })
    );
    expect(webhooks.retry).toEqual(
      expect.objectContaining({
        strategy: "exponential-backoff",
        attempts: 5,
        schedule: ["10s", "1m", "5m", "15m", "1h"],
      })
    );
    expect(webhooks.idempotency).toEqual(
      expect.objectContaining({
        header: "X-Idempotency-Key",
        keys: expect.arrayContaining(["comment_id", "transaction_id"]),
      })
    );
  });

  test("captures messaging/queue schema", () => {
    const integrations = getExternalIntegrations();
    const queues = integrations.messagingQueues;

    expect(queues).toEqual(
      expect.objectContaining({
        technology: expect.arrayContaining(["Redis Streams", "FastAPI Background Tasks"]),
        names: expect.arrayContaining(["incoming_comments", "ai_processing", "notification_delivery"]),
        schemaExample: expect.objectContaining({
          comment_id: "str",
          text: "quiero la roja",
          context: expect.objectContaining({ tienda_id: "uuid", live_id: "uuid" }),
          schema_version: "1.0",
        }),
      })
    );
  });
});
