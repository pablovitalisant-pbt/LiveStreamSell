const { getInfrastructurePlan } = require("../../src/infrastructure");

describe("slice-004: Infraestructura", () => {
  test("returns infrastructure structure", () => {
    const infra = getInfrastructurePlan();

    expect(infra).toEqual(
      expect.objectContaining({
        cloudProviders: expect.any(Object),
        regions: expect.any(Object),
        networking: expect.any(Object),
        computeScaling: expect.any(Object),
        security: expect.any(Object),
      })
    );
  });

  test("captures cloud providers and region latency targets", () => {
    const infra = getInfrastructurePlan();

    expect(infra.cloudProviders).toEqual(
      expect.objectContaining({
        compute: "Render.com",
        baas: expect.stringContaining("Supabase"),
      })
    );
    expect(infra.regions).toEqual(
      expect.objectContaining({
        primaryRegion: "aws-us-east-1",
        latencyMsMax: 10,
      })
    );
  });

  test("captures networking and availability practices", () => {
    const infra = getInfrastructurePlan();

    expect(infra.networking).toEqual(
      expect.objectContaining({
        dnsCdnWaf: "Cloudflare",
        ddosProtection: true,
        scrapingProtection: true,
        keepAlive: expect.objectContaining({
          endpoint: "/health",
          intervalMinutes: 5,
          providers: expect.arrayContaining(["Cron-job.org", "GitHub Actions"]),
        }),
        deepHealthChecks: expect.objectContaining({
          checksPostgres: true,
          checksRedis: true,
        }),
      })
    );
  });

  test("captures compute scaling and security posture", () => {
    const infra = getInfrastructurePlan();

    expect(infra.computeScaling).toEqual(
      expect.objectContaining({
        webService: expect.objectContaining({
          provider: "Render",
          autoScaling: true,
          minInstances: 1,
          maxInstances: 10,
          scalingMetric: "CPU",
        }),
        backgroundWorkers: expect.objectContaining({
          separateInstances: true,
          isolatesLlmLatency: true,
          purpose: expect.stringContaining("Meta Webhooks"),
        }),
      })
    );

    expect(infra.security).toEqual(
      expect.objectContaining({
        secretsManagement: expect.objectContaining({
          renderEncryptedEnv: true,
          supabaseVault: true,
        }),
        sslTls: "end-to-end",
      })
    );
  });
});
