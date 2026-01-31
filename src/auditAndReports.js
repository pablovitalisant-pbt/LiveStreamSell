function getAuditAndReports() {
  return {
    complianceLogs: {
      immutable: true,
      scope: [
        "accesos a datos sensibles",
        "cambios de permisos",
        "eliminaciones de registros",
      ],
    },
    securityReports: {
      cadence: "trimestral",
      sources: ["Snyk", "GitHub"],
      audience: "auditorias internas o de Meta",
    },
    auditTrail: {
      traceability: "decisiones de la IA",
      fields: ["prompt enviado", "respuesta generada"],
      purpose: "resolver disputas de ventas",
    },
  };
}

module.exports = { getAuditAndReports };
