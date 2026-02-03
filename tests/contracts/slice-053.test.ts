const { getStockLockTransaction } = require("../../src/stockLockTransaction");

describe("slice-053: Transaccion atomica + lock de stock", () => {
  test("returns atomic transaction configuration", () => {
    const tx = getStockLockTransaction();

    expect(tx).toEqual(
      expect.objectContaining({
        atomic: true,
        lock: expect.stringMatching(/for update/i),
      })
    );
  });
});
