const { getNfrDefinition } = require("../../src/nfr");

describe("slice-002: Requerimientos No Funcionales (NFR)", () => {
  test("returns the NFR structure", () => {
    const nfr = getNfrDefinition();

    expect(nfr).toEqual(
      expect.objectContaining({
        performance: expect.any(Object),
        scalability: expect.any(String),
        idempotency: expect.any(String),
        availability: expect.any(String),
        security: expect.any(String),
        usability: expect.any(String),
        observability: expect.any(String),
      })
    );
  });

  test("captures performance and scalability requirements", () => {
    const nfr = getNfrDefinition();

    expect(nfr.performance).toEqual(
      expect.objectContaining({
        commentsPerMinute: 1000,
        scope: "perLive",
      })
    );
    expect(nfr.scalability).toMatch(/contenedores/i);
    expect(nfr.scalability).toMatch(/auto-scaling/i);
    expect(nfr.scalability).toMatch(/cpu/i);
    expect(nfr.scalability).toMatch(/ram/i);
    expect(nfr.scalability).toMatch(/picos de trafico/i);
  });

  test("captures idempotency and availability requirements", () => {
    const nfr = getNfrDefinition();

    expect(nfr.idempotency).toMatch(/reintentos/i);
    expect(nfr.idempotency).toMatch(/no genere pedidos duplicados/i);
    expect(nfr.idempotency).toMatch(/stock/i);
    expect(nfr.availability).toMatch(/multi-region/i);
    expect(nfr.availability).toMatch(/failover/i);
  });

  test("captures security, usability, and observability requirements", () => {
    const nfr = getNfrDefinition();

    expect(nfr.security).toMatch(/jwt/i);
    expect(nfr.security).toMatch(/x-hub-signature/i);
    expect(nfr.security).toMatch(/vaults/i);
    expect(nfr.usability).toMatch(/i18n/i);
    expect(nfr.usability).toMatch(/rtl/i);
    expect(nfr.observability).toMatch(/logging/i);
    expect(nfr.observability).toMatch(/grafana|datadog/i);
    expect(nfr.observability).toMatch(/precision de la ia/i);
  });
});
