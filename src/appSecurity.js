function getAppSecurityPolicy() {
  return {
    inputValidation: { sanitization: "Sanitizacion con bleach", schemaValidation: "Pydantic estricto en FastAPI" },
    protections: {
      sqlInjection: "SQLALCHEMY ORM y queries parametrizadas",
      xss: "next\\.js auto-escape y politicas de cookies",
      csrf: "CORS y tokens CSRF",
      clickjacking: "X-Frame-Options: DENY",
    },
    encryption: { inTransit: "TLS 1.3", atRest: ["AES-256", "AWS/Supabase disk encryption"] },
    securityHeaders: { csp: ["Meta", "Sentry", "Cloudflare"], hsts: "1 year" },
    audit: {
      accessLogging: ["ip", "user-agent", "timestamp"],
      auditLog: "Registro de cambios de precio de producto o pasarela de pago",
      securityAlerts: ["Slack", "Email"],
    },
  };
}

module.exports = { getAppSecurityPolicy };
