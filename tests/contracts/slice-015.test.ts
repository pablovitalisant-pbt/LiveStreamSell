const { getMfaPolicy } = require("../../src/mfaPolicy");

describe("slice-015: Seguridad Adicional (MFA)", () => {
  test("returns MFA policy structure", () => {
    const policy = getMfaPolicy();

    expect(policy).toEqual(
      expect.objectContaining({
        requiredForOwnerAboveThreshold: true,
        methods: expect.any(Object),
      })
    );
  });

  test("captures methods and backup code behavior", () => {
    const policy = getMfaPolicy();

    expect(policy.methods).toEqual(
      expect.objectContaining({
        totp: expect.objectContaining({ recommendedFor: "Dashboard" }),
        backupCodes: expect.objectContaining({ generatedOnce: true }),
      })
    );
  });
});
