function getSecurityInfrastructurePlan() {
  return {
    firewallRules: {
      publicPorts: [80, 443],
      internalPortsClosed: [5432, 6379],
      webhookIpWhitelist: "meta-official-ranges",
    },
    securityGroups: {
      webService: "Entrante solo desde Cloudflare/Render Load Balancer.",
      database: "Entrante solo desde IPs estaticas de backend Render.",
      internalWorkers: "Sin acceso entrante desde el exterior; solo salida.",
    },
    penetrationTesting: {
      frequency: "annual",
      performedBy: "external-certified",
      scope: "Pruebas de caja negra en API publica y dashboard.",
      focus: ["IDOR", "privilege escalation"],
    },
    vulnerabilityScanning: {
      tools: ["Snyk", "GitHub Dependabot"],
      continuousOnMainPush: true,
      scheduledWeekly: true,
    },
  };
}

module.exports = { getSecurityInfrastructurePlan };
