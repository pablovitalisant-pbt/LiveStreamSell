const { getApplicableRegulations } = require("../../src/applicableRegulations");

describe("slice-045: Regulaciones Aplicables", () => {
  test("returns regulations structure", () => {
    const regs = getApplicableRegulations();

    expect(regs).toEqual(
      expect.objectContaining({
        gdpr: expect.any(Object),
        ccpa: expect.any(Object),
        pciDss: expect.any(Object),
        metaMessenger: expect.any(Object),
        hipaa: expect.any(Object),
      })
    );
  });

  test("captures GDPR and CCPA", () => {
    const regs = getApplicableRegulations();

    expect(regs.gdpr).toEqual(
      expect.objectContaining({
        region: expect.stringMatching(/ue/i),
        rights: expect.arrayContaining([
          expect.stringMatching(/acceso/i),
          expect.stringMatching(/rectificacion/i),
          expect.stringMatching(/supresion|olvido/i),
        ]),
      })
    );

    expect(regs.ccpa).toEqual(
      expect.objectContaining({
        region: expect.stringMatching(/california/i),
        requirements: expect.arrayContaining([
          expect.stringMatching(/transparencia/i),
          expect.stringMatching(/exclusion/i),
        ]),
      })
    );
  });

  test("captures PCI-DSS delegation", () => {
    const regs = getApplicableRegulations();

    expect(regs.pciDss).toEqual(
      expect.objectContaining({
        saq: "SAQ-A",
        platformStoresCardData: false,
        responsibility: expect.stringMatching(/pasarelas|flow|paypal|mercado pago/i),
      })
    );
  });

  test("captures Meta Messenger policy", () => {
    const regs = getApplicableRegulations();

    expect(regs.metaMessenger).toEqual(
      expect.objectContaining({
        windowHours: 24,
        tags: expect.arrayContaining(["POST_PURCHASE_UPDATE"]),
        otn: expect.stringMatching(/one-time notification|otn/i),
        purpose: expect.stringMatching(/spam|cumplimiento/i),
      })
    );
  });

  test("captures HIPAA not applicable", () => {
    const regs = getApplicableRegulations();

    expect(regs.hipaa).toEqual(
      expect.objectContaining({
        applicable: false,
        condition: expect.stringMatching(/salud|recetas|datos medicos/i),
      })
    );
  });
});
