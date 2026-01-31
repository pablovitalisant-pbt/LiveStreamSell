const { getCartRecoveryProtocol } = require("../../src/cartRecoveryProtocol");

describe("slice-046: Protocolo de Recuperacion de Carrito y Message Tags", () => {
  test("returns protocol structure", () => {
    const protocol = getCartRecoveryProtocol();

    expect(protocol).toEqual(
      expect.objectContaining({
        tags: expect.any(Object),
        messagingWindow: expect.any(Object),
        otn: expect.any(Object),
      })
    );
  });

  test("captures Meta tags usage and restrictions", () => {
    const protocol = getCartRecoveryProtocol();

    expect(protocol.tags).toEqual(
      expect.objectContaining({
        postPurchaseUpdate: expect.objectContaining({
          tag: "POST_PURCHASE_UPDATE",
          use: expect.stringMatching(/confirmacion|recibos|tracking/i),
          restriction: expect.stringMatching(/promocional|up-selling/i),
          trigger: expect.stringMatching(/webhook.*flow|paypal|mercado pago/i),
        }),
        confirmedEventUpdate: expect.objectContaining({
          tag: "CONFIRMED_EVENT_UPDATE",
          use: expect.stringMatching(/nuevo live shopping/i),
        }),
      })
    );
  });

  test("captures 24h messaging strategy", () => {
    const protocol = getCartRecoveryProtocol();

    expect(protocol.messagingWindow).toEqual(
      expect.objectContaining({
        steps: expect.arrayContaining([
          expect.stringMatching(/t\+0h.*link de pago/i),
          expect.stringMatching(/t\+20min.*recordatorio/i),
          expect.stringMatching(/t\+12h.*carrito/i),
          expect.stringMatching(/t\+23h.*ultima oportunidad/i),
        ]),
      })
    );
  });

  test("captures OTN flow", () => {
    const protocol = getCartRecoveryProtocol();

    expect(protocol.otn).toEqual(
      expect.objectContaining({
        useCase: expect.stringMatching(/stock/i),
        button: expect.stringMatching(/avisame/i),
        token: expect.stringMatching(/un solo uso/i),
      })
    );
  });
});
