const { getDataResidencyPolicy } = require("../../src/dataResidency");

describe("slice-009: Data Residency", () => {
  test("returns data residency policy structure", () => {
    const policy = getDataResidencyPolicy();

    expect(policy).toEqual(
      expect.objectContaining({
        primaryRegion: expect.any(String),
        sovereignty: expect.any(Object),
        internationalTransfer: expect.any(Object),
      })
    );
  });

  test("captures localization, sovereignty, and transfers", () => {
    const policy = getDataResidencyPolicy();

    expect(policy.primaryRegion).toBe("us-east-1");
    expect(policy.sovereignty).toEqual(
      expect.objectContaining({
        supported: true,
        tooling: "Terraform",
        exampleRegion: "eu-central-1",
        exampleLocation: "AWS Frankfurt",
      })
    );
    expect(policy.internationalTransfer).toEqual(
      expect.objectContaining({
        mechanism: "SCC",
        corridor: "LATAM-US",
      })
    );
  });
});
