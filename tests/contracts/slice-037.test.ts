const { getPlanningHeader } = require("../../src/planningHeader");

describe("slice-037: Planificacion base", () => {
  test("returns the planning heading", () => {
    const header = getPlanningHeader();

    expect(header).toMatch(/Planificaci[oó]n: LiveStreamSell AI/i);
    expect(header).toMatch(/SaaS Global/i);
  });
});
