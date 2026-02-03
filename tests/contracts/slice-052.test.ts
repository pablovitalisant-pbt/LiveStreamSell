const { getMinimalStableModel } = require("../../src/minimalStableModel");

describe("slice-052: Modelo minimo estable", () => {
  test("returns table and constraint definitions", () => {
    const model = getMinimalStableModel();

    expect(model).toEqual(
      expect.objectContaining({
        tables: expect.any(Array),
        constraints: expect.any(Array),
      })
    );
  });

  test("captures baseline tables and constraints", () => {
    const model = getMinimalStableModel();

    expect(model.tables).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/clientes/i),
        expect.stringMatching(/ventas/i),
      ])
    );

    expect(model.constraints).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/primary key/i),
        expect.stringMatching(/foreign key/i),
      ])
    );
  });
});
