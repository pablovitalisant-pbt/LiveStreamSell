const { getAppSecurityPolicy } = require("../../src/appSecurity");

describe("slice-016: Seguridad de Aplicacion", () => {
  test("returns application security policy structure", () => {
    const policy = getAppSecurityPolicy();

    expect(policy).toEqual(
      expect.objectContaining({
        inputValidation: expect.any(Object),
        protections: expect.any(Object),
        encryption: expect.any(Object),
        securityHeaders: expect.any(Object),
        audit: expect.any(Object),
      })
    );
  });

  test("captures input validation and common protections", () => {
    const policy = getAppSecurityPolicy();

    expect(policy.inputValidation).toEqual(
      expect.objectContaining({
        sanitization: expect.stringMatching(/bleach/i),
        schemaValidation: expect.stringMatching(/pydantic/i),
      })
    );
    expect(policy.protections).toEqual(
      expect.objectContaining({
        sqlInjection: expect.stringMatching(/sqlalchemy/i),
        xss: expect.stringMatching(/next\\.js/i),
        csrf: expect.stringMatching(/cors/i),
        clickjacking: "X-Frame-Options: DENY",
      })
    );
  });

  test("captures encryption, headers, and audit controls", () => {
    const policy = getAppSecurityPolicy();

    expect(policy.encryption).toEqual(
      expect.objectContaining({
        inTransit: "TLS 1.3",
        atRest: expect.arrayContaining(["AES-256", "AWS/Supabase disk encryption"]),
      })
    );
    expect(policy.securityHeaders).toEqual(
      expect.objectContaining({
        csp: expect.arrayContaining(["Meta", "Sentry", "Cloudflare"]),
        hsts: "1 year",
      })
    );
    expect(policy.audit).toEqual(
      expect.objectContaining({
        accessLogging: expect.arrayContaining(["ip", "user-agent", "timestamp"]),
        auditLog: expect.stringMatching(/precio|pasarela/i),
        securityAlerts: expect.arrayContaining(["Slack", "Email"]),
      })
    );
  });
});
