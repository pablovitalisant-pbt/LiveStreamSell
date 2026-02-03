const { getReproducibleSeedPolicy } = require("../../src/reproducibleSeedPolicy");

describe("slice-054: Seed reproducible", () => {
  test("returns reproducible seed policy", () => {
    const seed = getReproducibleSeedPolicy();

    expect(seed).toEqual(
      expect.objectContaining({
        policy: expect.stringMatching(/pol-roj-m/i),
        deterministic: true,
      })
    );
  });
});
