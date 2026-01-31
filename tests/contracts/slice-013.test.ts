const { getDetailedEndpoints } = require("../../src/apiEndpoints");

describe("slice-013: Endpoints Detallados", () => {
  test("returns endpoints structure", () => {
    const endpoints = getDetailedEndpoints();

    expect(endpoints).toEqual(
      expect.objectContaining({
        webhookFacebook: expect.any(Object),
        inventoryProducts: expect.any(Object),
        orderCreate: expect.any(Object),
        healthCheck: expect.any(Object),
      })
    );
  });

  test("captures Facebook webhook endpoint", () => {
    const endpoints = getDetailedEndpoints();

    expect(endpoints.webhookFacebook).toEqual(
      expect.objectContaining({
        method: "POST",
        path: "/api/v1/webhooks/facebook",
        auth: expect.stringMatching(/x-hub-signature-256/i),
        responses: expect.objectContaining({
          ok: 200,
          forbidden: 403,
        }),
        rateLimit: "600 calls/person/minute",
      })
    );
  });

  test("captures inventory products endpoint", () => {
    const endpoints = getDetailedEndpoints();

    expect(endpoints.inventoryProducts).toEqual(
      expect.objectContaining({
        method: "GET",
        path: "/api/v1/inventory/products",
        auth: "Bearer Supabase JWT",
        queryParams: expect.arrayContaining(["tienda_id", "limit", "offset"]),
        responseExample: expect.arrayContaining([
          expect.objectContaining({ sku: "POL-ROJ-M", stock: 15, price: 15000 }),
        ]),
        errors: expect.arrayContaining([401, 404]),
      })
    );
  });

  test("captures order creation endpoint", () => {
    const endpoints = getDetailedEndpoints();

    expect(endpoints.orderCreate).toEqual(
      expect.objectContaining({
        method: "POST",
        path: "/api/v1/orders/create",
        auth: expect.arrayContaining(["internal-api-key", "bearer-dashboard"]),
        responseStatus: 201,
        responseExample: expect.objectContaining({
          status: "pending",
        }),
        errors: expect.arrayContaining([400, 422]),
      })
    );
  });

  test("captures health check endpoint", () => {
    const endpoints = getDetailedEndpoints();

    expect(endpoints.healthCheck).toEqual(
      expect.objectContaining({
        method: "GET",
        path: "/health",
        purpose: expect.stringMatching(/render/i),
        response: expect.objectContaining({
          status: "alive",
          code: 200,
        }),
      })
    );
  });
});
