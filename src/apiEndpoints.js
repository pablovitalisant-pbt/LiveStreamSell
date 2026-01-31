function getDetailedEndpoints() {
  return {
    webhookFacebook: {
      method: "POST",
      path: "/api/v1/webhooks/facebook",
      auth: "Validacion X-Hub-Signature-256 (SHA256 body + App Secret)",
      responses: { ok: 200, forbidden: 403 },
      rateLimit: "600 calls/person/minute",
    },
    inventoryProducts: {
      method: "GET",
      path: "/api/v1/inventory/products",
      auth: "Bearer Supabase JWT",
      queryParams: ["tienda_id", "limit", "offset"],
      responseExample: [{ id: "uuid", sku: "POL-ROJ-M", name: "Polera Roja M", stock: 15, price: 15000 }],
      errors: [401, 404],
    },
    orderCreate: {
      method: "POST",
      path: "/api/v1/orders/create",
      auth: ["internal-api-key", "bearer-dashboard"],
      responseStatus: 201,
      responseExample: { order_id: "uuid", payment_url: "https://flow.cl/pay/...", status: "pending" },
      errors: [400, 422],
    },
    healthCheck: {
      method: "GET",
      path: "/health",
      purpose: "Mantener Render despierto via cron",
      response: { status: "alive", timestamp: "...", code: 200 },
    },
  };
}

module.exports = { getDetailedEndpoints };
