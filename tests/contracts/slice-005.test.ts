const { getSecurityInfrastructurePlan } = require("../../src/securityInfrastructure");

describe("slice-005: Seguridad Infraestructura", () => {
  test("returns security infrastructure structure", () => {
    const plan = getSecurityInfrastructurePlan();

    expect(plan).toEqual(
      expect.objectContaining({
        firewallRules: expect.any(Object),
        securityGroups: expect.any(Object),
        penetrationTesting: expect.any(Object),
        vulnerabilityScanning: expect.any(Object),
      })
    );
  });

  test("captures firewall rules and IP whitelisting", () => {
    const plan = getSecurityInfrastructurePlan();

    expect(plan.firewallRules).toEqual(
      expect.objectContaining({
        publicPorts: expect.arrayContaining([80, 443]),
        internalPortsClosed: expect.arrayContaining([5432, 6379]),
        webhookIpWhitelist: "meta-official-ranges",
      })
    );
  });

  test("captures security groups rules", () => {
    const plan = getSecurityInfrastructurePlan();

    expect(plan.securityGroups).toEqual(
      expect.objectContaining({
        webService: expect.stringMatching(/cloudflare/i),
        database: expect.stringMatching(/render/i),
        internalWorkers: expect.stringMatching(/sin acceso entrante/i),
      })
    );
  });

  test("captures penetration testing scope and cadence", () => {
    const plan = getSecurityInfrastructurePlan();

    expect(plan.penetrationTesting).toEqual(
      expect.objectContaining({
        frequency: "annual",
        performedBy: "external-certified",
        scope: expect.stringContaining("caja negra"),
        focus: expect.arrayContaining(["IDOR", "privilege escalation"]),
      })
    );
  });

  test("captures vulnerability scanning tools and cadence", () => {
    const plan = getSecurityInfrastructurePlan();

    expect(plan.vulnerabilityScanning).toEqual(
      expect.objectContaining({
        tools: expect.arrayContaining(["Snyk", "GitHub Dependabot"]),
        continuousOnMainPush: true,
        scheduledWeekly: true,
      })
    );
  });
});
