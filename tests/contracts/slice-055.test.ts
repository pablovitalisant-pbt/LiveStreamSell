const { getInternalRbac } = require("../../src/internalRbac");

describe("slice-055: RBAC interno", () => {
  test("returns internal roles and data source", () => {
    const rbac = getInternalRbac();

    expect(rbac).toEqual(
      expect.objectContaining({
        roles: expect.arrayContaining(["Owner", "Staff", "System"]),
        source: expect.stringMatching(/db interna/i),
      })
    );
  });
});
