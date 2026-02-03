const { getFlowSandboxPayment } = require("../../src/flowSandboxPayment");

describe("slice-057: Crear pago sandbox + webhook callback", () => {
  test("returns sandbox payment setup", () => {
    const payment = getFlowSandboxPayment();

    expect(payment).toEqual(
      expect.objectContaining({
        sandbox: true,
        webhook: expect.stringMatching(/callback/i),
      })
    );
  });
});
