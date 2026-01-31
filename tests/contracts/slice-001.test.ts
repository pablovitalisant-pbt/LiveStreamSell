const { getProjectDefinition } = require("../../src/projectDefinition");

describe("slice-001: Definicion del Proyecto y Negocio", () => {
  test("returns the project definition structure", () => {
    const def = getProjectDefinition();

    expect(def).toEqual(
      expect.objectContaining({
        visionObjectives: expect.any(String),
        uniqueValueProposition: expect.any(String),
        useCases: expect.any(Object),
        monetization: expect.any(Object),
        successMetrics: expect.any(Object),
        constraints: expect.any(Object),
        risks: expect.any(Object),
      })
    );
  });

  test("captures vision, uvp, and primary use cases", () => {
    const def = getProjectDefinition();

    expect(def.visionObjectives).toMatch(/global-first/i);
    expect(def.visionObjectives).toMatch(/facebook\s*live/i);
    expect(def.visionObjectives).toMatch(/ai/i);
    expect(def.uniqueValueProposition).toMatch(/elimina/i);
    expect(def.uniqueValueProposition).toMatch(/error humano/i);
    expect(def.uniqueValueProposition).toMatch(/mercados internacionales/i);

    expect(def.useCases).toEqual(
      expect.objectContaining({
        vendor: expect.any(String),
        buyer: expect.any(String),
        stakeholders: expect.any(Array),
      })
    );
    expect(def.useCases.vendor).toMatch(/fanpage/i);
    expect(def.useCases.vendor).toMatch(/catalogo/i);
    expect(def.useCases.buyer).toMatch(/comenta/i);
    expect(def.useCases.buyer).toMatch(/idioma/i);
    expect(def.useCases.buyer).toMatch(/pago/i);
    expect(def.useCases.stakeholders).toEqual(
      expect.arrayContaining(["SMEs/PYMES", "Compradores Globales", "Administradores de la Plataforma"])
    );
  });

  test("defines monetization model and success metrics", () => {
    const def = getProjectDefinition();

    expect(def.monetization).toEqual(
      expect.objectContaining({
        model: "hybrid",
        subscription: expect.objectContaining({
          frequency: "monthly",
          plans: expect.arrayContaining(["Starter", "Pro"]),
        }),
        variableCommissionOptional: true,
      })
    );

    expect(def.successMetrics).toEqual(
      expect.objectContaining({
        conversionMetric: expect.any(String),
        performanceLatencySecondsMax: 3,
        availabilityUptimePercent: 99.95,
        reliabilityStrategy: expect.stringContaining("multi-region"),
      })
    );
  });

  test("captures constraints and risks", () => {
    const def = getProjectDefinition();

    expect(def.constraints.metaApi).toEqual(
      expect.objectContaining({
        messagingWindowHours: 24,
        appReviewRequired: true,
      })
    );
    expect(def.constraints.security).toEqual(
      expect.objectContaining({
        pciDssCompliant: true,
        saqType: "SAQ-A",
        tokenizationExternal: true,
        noCardDataStored: true,
      })
    );
    expect(def.constraints.legal).toEqual(
      expect.objectContaining({
        localTaxes: true,
        fxControls: true,
      })
    );

    expect(def.risks.technical.join(" ")).toMatch(/graph api/i);
    expect(def.risks.technical.join(" ")).toMatch(/falsos positivos/i);
    expect(def.risks.operational.join(" ")).toMatch(/bloqueos de cuenta/i);
    expect(def.risks.financial.join(" ")).toMatch(/tipos de cambio/i);
  });
});
