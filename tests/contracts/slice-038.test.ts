const { getFunctionalRequirements } = require("../../src/functionalRequirements");

describe("slice-038: Funcionalidades (FR)", () => {
  test("returns functional requirements structure", () => {
    const fr = getFunctionalRequirements();

    expect(fr).toEqual(
      expect.objectContaining({
        onboarding: expect.any(Object),
        highSpeedWebhook: expect.any(Object),
        nlp: expect.any(Object),
        dmTransition: expect.any(Object),
        paymentLinks: expect.any(Object),
        inventoryLocking: expect.any(Object),
        liveDashboard: expect.any(Object),
      })
    );
  });

  test("defines localized onboarding priority", () => {
    const fr = getFunctionalRequirements();

    expect(fr.onboarding).toEqual(
      expect.objectContaining({
        languageDetection: expect.arrayContaining([
          expect.stringMatching(/headers/i),
          expect.stringMatching(/ip/i),
        ]),
        localePriority: expect.arrayContaining([
          expect.stringMatching(/manual/i),
          expect.stringMatching(/facebook/i),
          expect.stringMatching(/ip/i),
        ]),
      })
    );
  });

  test("captures realtime webhook throughput and queueing", () => {
    const fr = getFunctionalRequirements();

    expect(fr.highSpeedWebhook).toEqual(
      expect.objectContaining({
        queue: expect.stringMatching(/redis/i),
        commentsPerMinute: 1000,
        purpose: expect.stringMatching(/rate|picos|limites/i),
      })
    );
  });

  test("captures advanced NLP responsibilities", () => {
    const fr = getFunctionalRequirements();

    expect(fr.nlp).toEqual(
      expect.objectContaining({
        models: expect.arrayContaining([expect.stringMatching(/llm/i)]),
        capabilities: expect.arrayContaining([
          expect.stringMatching(/modismos/i),
          expect.stringMatching(/intenciones/i),
          expect.stringMatching(/skus?/i),
          expect.stringMatching(/preguntas.*adquisicion/i),
        ]),
      })
    );
  });

  test("captures DM transition flow", () => {
    const fr = getFunctionalRequirements();

    expect(fr.dmTransition).toEqual(
      expect.objectContaining({
        publicReply: expect.stringMatching(/confirmacion/i),
        dmAutoStart: true,
        reason: expect.stringMatching(/anti-spam|meta|privacidad/i),
      })
    );
  });

  test("captures dynamic payment links", () => {
    const fr = getFunctionalRequirements();

    expect(fr.paymentLinks).toEqual(
      expect.objectContaining({
        providers: expect.arrayContaining([
          "PayPal",
          "Mercado Pago",
          "Flow",
        ]),
        uniquePerOrder: true,
        delivery: expect.stringMatching(/dm|privad/i),
      })
    );
  });

  test("captures inventory locking rules", () => {
    const fr = getFunctionalRequirements();

    expect(fr.inventoryLocking).toEqual(
      expect.objectContaining({
        reserveMinutes: 30,
        releaseAfterMinutes: 30,
        postReleaseState: expect.stringMatching(/interes/i),
      })
    );
  });

  test("captures live dashboard controls", () => {
    const fr = getFunctionalRequirements();

    expect(fr.liveDashboard).toEqual(
      expect.objectContaining({
        realtime: true,
        sellerControls: expect.arrayContaining([
          expect.stringMatching(/pedidos/i),
          expect.stringMatching(/intervenir/i),
          expect.stringMatching(/kill switch/i),
        ]),
      })
    );
  });
});
