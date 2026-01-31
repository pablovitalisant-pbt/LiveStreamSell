const { getAuditAndReports } = require("../../src/auditAndReports");

describe("slice-047: Auditoria y Reportes", () => {
  test("returns audit reporting structure", () => {
    const audit = getAuditAndReports();

    expect(audit).toEqual(
      expect.objectContaining({
        complianceLogs: expect.any(Object),
        securityReports: expect.any(Object),
        auditTrail: expect.any(Object),
      })
    );
  });

  test("captures compliance logs", () => {
    const audit = getAuditAndReports();

    expect(audit.complianceLogs).toEqual(
      expect.objectContaining({
        immutable: true,
        scope: expect.arrayContaining([
          expect.stringMatching(/accesos.*sensibles/i),
          expect.stringMatching(/cambios de permisos/i),
          expect.stringMatching(/eliminaciones/i),
        ]),
      })
    );
  });

  test("captures security reports", () => {
    const audit = getAuditAndReports();

    expect(audit.securityReports).toEqual(
      expect.objectContaining({
        cadence: expect.stringMatching(/trimestral/i),
        sources: expect.arrayContaining([
          expect.stringMatching(/snyk/i),
          expect.stringMatching(/github/i),
        ]),
        audience: expect.stringMatching(/auditorias internas|meta/i),
      })
    );
  });

  test("captures AI decision audit trail", () => {
    const audit = getAuditAndReports();

    expect(audit.auditTrail).toEqual(
      expect.objectContaining({
        traceability: expect.stringMatching(/decisiones.*ia/i),
        fields: expect.arrayContaining([
          expect.stringMatching(/prompt/i),
          expect.stringMatching(/respuesta/i),
        ]),
        purpose: expect.stringMatching(/disputas de ventas/i),
      })
    );
  });
});
