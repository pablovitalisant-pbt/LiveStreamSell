const { getSupportPlan } = require("../../src/supportPlan");

describe("slice-036: Soporte", () => {
  test("returns support structure", () => {
    const plan = getSupportPlan();

    expect(plan).toEqual(
      expect.objectContaining({
        levels: expect.any(Object),
        slas: expect.any(Object),
        escalation: expect.any(Object),
      })
    );
  });

  test("defines L1/L2/L3 responsibilities", () => {
    const plan = getSupportPlan();

    expect(plan.levels).toEqual(
      expect.objectContaining({
        L1: expect.objectContaining({
          handledBy: expect.arrayContaining([
            expect.stringMatching(/customer success/i),
            expect.stringMatching(/chatbot/i),
          ]),
          scope: expect.arrayContaining([
            expect.stringMatching(/configuracion|cuenta/i),
            expect.stringMatching(/facturacion/i),
            expect.stringMatching(/errores de usuario|dudas/i),
          ]),
          examples: expect.arrayContaining([
            expect.stringMatching(/conectar mi pagina/i),
          ]),
        }),
        L2: expect.objectContaining({
          handledBy: expect.arrayContaining([
            expect.stringMatching(/desarrolladores|analistas/i),
          ]),
          issues: expect.arrayContaining([
            expect.stringMatching(/webhooks/i),
            expect.stringMatching(/ia/i),
            expect.stringMatching(/stock|inventario/i),
          ]),
        }),
        L3: expect.objectContaining({
          handledBy: expect.arrayContaining([
            expect.stringMatching(/lead dev/i),
            expect.stringMatching(/devops/i),
          ]),
          issues: expect.arrayContaining([
            expect.stringMatching(/caidas|criticas|caida total/i),
            expect.stringMatching(/supabase|render/i),
            expect.stringMatching(/dos/i),
            expect.stringMatching(/core|producto/i),
          ]),
        }),
      })
    );
  });

  test("defines SLA response and resolution targets", () => {
    const plan = getSupportPlan();

    expect(plan.slas).toEqual(
      expect.objectContaining({
        S1: expect.objectContaining({
          severity: expect.stringMatching(/critica/i),
          responseMinutes: 15,
          resolutionHours: 2,
          description: expect.stringMatching(/caida|bot no responde/i),
        }),
        S2: expect.objectContaining({
          severity: expect.stringMatching(/alta/i),
          responseMinutes: 60,
          resolutionHours: 6,
          description: expect.stringMatching(/links de pago|funcionalidad clave/i),
        }),
        S3: expect.objectContaining({
          severity: expect.stringMatching(/media/i),
          responseMinutes: 240,
          resolutionHours: 24,
          description: expect.stringMatching(/ui|workaround|errores menores/i),
        }),
        S4: expect.objectContaining({
          severity: expect.stringMatching(/baja/i),
          responseMinutes: 1440,
          resolutionNote: expect.stringMatching(/roadmap/i),
          description: expect.stringMatching(/consultas generales|sugerencias/i),
        }),
      })
    );
  });

  test("captures escalation process", () => {
    const plan = getSupportPlan();

    expect(plan.escalation).toEqual(
      expect.objectContaining({
        intake: expect.stringMatching(/intercom|zendesk/i),
        triage: expect.objectContaining({
          classification: expect.stringMatching(/severidad/i),
          s1Alert: expect.stringMatching(/pagerduty/i),
        }),
        transfer: expect.objectContaining({
          l1ToL2Minutes: 20,
          l2ToL3Condition: expect.stringMatching(/infraestructura/i),
        }),
        emergencyContacts: expect.objectContaining({
          roles: expect.arrayContaining([
            expect.stringMatching(/devops/i),
            expect.stringMatching(/lead dev/i),
          ]),
          access: expect.stringMatching(/solo.*l2.*l3/i),
        }),
      })
    );
  });
});
