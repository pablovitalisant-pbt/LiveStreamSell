const http = require("http");
const https = require("https");
const { URL } = require("url");

const baseUrl = process.env.SMOKE_BASE_URL || "http://localhost:8000";

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

(async () => {
  try {
    const health = await requestJson("/health");
    if (health.status !== 200 || !health.data.ok) {
      throw new Error("Health check failed");
    }
    console.log("✅ dev:smoke ok");
  } catch (err) {
    console.error("❌ dev:smoke failed");
    console.error(err.message || err);
    process.exit(1);
  }
})();
