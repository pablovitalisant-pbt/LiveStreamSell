const { getPrivacyConsentManagementV2 } = require("../../src/privacyConsentManagementV2");

describe("slice-050: Privacy y Consent Management", () => {
  test("returns privacy and consent structure", () => {
    const privacy = getPrivacyConsentManagementV2();

    expect(privacy).toEqual(
      expect.objectContaining({
        privacyPolicy: expect.any(Object),
        consentManagement: expect.any(Object),
        optOut: expect.any(Object),
      })
    );
  });

  test("captures privacy policy details", () => {
    const privacy = getPrivacyConsentManagementV2();

    expect(privacy.privacyPolicy).toEqual(
      expect.objectContaining({
        access: expect.arrayContaining([
          expect.stringMatching(/dashboard/i),
          expect.stringMatching(/landing/i),
        ]),
        dataCollected: expect.arrayContaining([
          expect.stringMatching(/id de facebook/i),
          expect.stringMatching(/comentarios/i),
          expect.stringMatching(/email/i),
        ]),
      })
    );
  });

  test("captures consent management", () => {
    const privacy = getPrivacyConsentManagementV2();

    expect(privacy.consentManagement).toEqual(
      expect.objectContaining({
        cookiesBanner: true,
        granularity: expect.arrayContaining([
          expect.stringMatching(/marketing/i),
          expect.stringMatching(/funcionalidad/i),
        ]),
      })
    );
  });

  test("captures direct opt-out commands", () => {
    const privacy = getPrivacyConsentManagementV2();

    expect(privacy.optOut).toEqual(
      expect.objectContaining({
        commands: expect.arrayContaining(["STOP", "ELIMINAR MIS DATOS"]),
        immediate: true,
      })
    );
  });
});
