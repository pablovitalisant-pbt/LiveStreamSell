const getWebhookIdempotency = () => ({
  idempotent: true,
  dedupe: true,
});

module.exports = { getWebhookIdempotency };
