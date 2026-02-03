const { getAlembicMigrateScaffold } = require("../../src/alembicMigrateScaffold");

describe("slice-051: Scaffold Alembic + comando migrate", () => {
  test("returns alembic scaffold definition", () => {
    const scaffold = getAlembicMigrateScaffold();

    expect(scaffold).toEqual(
      expect.objectContaining({
        scaffold: expect.stringMatching(/alembic/i),
        command: expect.stringMatching(/migrate/i),
      })
    );
  });
});
