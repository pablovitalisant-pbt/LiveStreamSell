const { getProductionConfigChecklist } = require("../../src/productionConfigChecklist");

describe("slice-059: Config produccion + checklist", () => {
  test("returns production configuration checklist", () => {
    const config = getProductionConfigChecklist();

    expect(config).toEqual(
      expect.objectContaining({
        config: expect.stringMatching(/production/i),
        checklist: expect.arrayContaining([
          expect.stringMatching(/env/i),
          expect.stringMatching(/secrets/i),
        ]),
      })
    );
  });
});
