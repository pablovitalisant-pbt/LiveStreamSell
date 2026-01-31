const { getArchitectureOverview } = require("../../src/architecture");

describe("slice-003: Arquitectura General", () => {
  test("returns general architecture structure", () => {
    const arch = getArchitectureOverview();

    expect(arch).toEqual(
      expect.objectContaining({
        style: expect.any(String),
        dataPipeline: expect.any(Array),
      })
    );
  });

  test("captures style and resilience intent", () => {
    const arch = getArchitectureOverview();

    expect(arch.style).toMatch(/event-driven/i);
    expect(arch.style).toMatch(/serverless/i);
    expect(arch.style).toMatch(/desacoplamiento/i);
    expect(arch.style).toMatch(/api de ia/i);
    expect(arch.style).toMatch(/meta/i);
  });

  test("captures the data pipeline steps", () => {
    const arch = getArchitectureOverview();

    expect(arch.dataPipeline).toHaveLength(5);
    expect(arch.dataPipeline[0]).toMatch(/meta webhook/i);
    expect(arch.dataPipeline[0]).toMatch(/api gateway/i);
    expect(arch.dataPipeline[0]).toMatch(/fastapi/i);
    expect(arch.dataPipeline[0]).toMatch(/validacion/i);
    expect(arch.dataPipeline[0]).toMatch(/regex/i);

    expect(arch.dataPipeline[1]).toMatch(/redis streams/i);
    expect(arch.dataPipeline[1]).toMatch(/upstash/i);
    expect(arch.dataPipeline[1]).toMatch(/render/i);

    expect(arch.dataPipeline[2]).toMatch(/worker/i);
    expect(arch.dataPipeline[2]).toMatch(/redis/i);
    expect(arch.dataPipeline[2]).toMatch(/ai engine/i);

    expect(arch.dataPipeline[3]).toMatch(/intencion de compra/i);
    expect(arch.dataPipeline[3]).toMatch(/bloqueo de stock/i);
    expect(arch.dataPipeline[3]).toMatch(/supabase/i);
    expect(arch.dataPipeline[3]).toMatch(/payment module/i);

    expect(arch.dataPipeline[4]).toMatch(/meta send api/i);
    expect(arch.dataPipeline[4]).toMatch(/messenger/i);
  });
});
