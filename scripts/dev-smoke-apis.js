const http = require("http");
const https = require("https");
const { URL } = require("url");

const baseUrl = process.env.SMOKE_BASE_URL || "http://localhost:8000";
const apiKey = process.env.API_INTERNAL_KEY || "localkey";

const requestJson = (path, opts = {}) =>
  new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const lib = url.protocol === "https:" ? https : http;
    const req = lib.request(
      url,
      { method: opts.method || "GET", headers: opts.headers || {} },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            const data = body ? JSON.parse(body) : {};
            resolve({ status: res.statusCode || 0, data });
          } catch (err) {
            reject(err);
          }
        });
      }
    );
    req.on("error", reject);
    if (opts.body) req.write(opts.body);
    req.end();
  });

const ensureOk = (label, response) => {
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`${label} failed with status ${response.status}`);
  }
  return response.data;
};

(async () => {
  try {
    const health = await requestJson("/health");
    ensureOk("health", health);

    const inventory = await requestJson(
      "/api/v1/inventory/products?tienda_id=local&limit=1",
      { headers: { "x-api-key": apiKey } }
    );
    const items = ensureOk("inventory", inventory);
    if (!Array.isArray(items)) throw new Error("inventory not array");

    const orderPayload = JSON.stringify({
      tienda_id: "local",
      customer_fb_id: "dev-smoke",
      items: [{ sku: "POL-ROJ-M", qty: 1 }],
      gateway: "flow",
    });
    const order = await requestJson("/api/v1/orders/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
      body: orderPayload,
    });
    const orderData = ensureOk("order", order);
    if (!orderData.order_id) throw new Error("order_id missing");

    console.log("✅ dev:smoke:apis ok");
  } catch (err) {
    console.error("❌ dev:smoke:apis failed");
    console.error(err.message || err);
    process.exit(1);
  }
})();
