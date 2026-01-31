const { getDataModelDesign } = require("../../src/dataModel");

describe("slice-006: Diseno de Datos", () => {
  test("returns conceptual model and schema list", () => {
    const model = getDataModelDesign();

    expect(model).toEqual(
      expect.objectContaining({
        conceptualModel: expect.arrayContaining([
          "vendedor",
          "tiendas",
          "productos",
          "pedidos",
          "clientes",
        ]),
        schemas: expect.any(Array),
        constraints: expect.any(Array),
        versioning: expect.any(String),
      })
    );
  });

  test("captures core tables and key fields", () => {
    const model = getDataModelDesign();

    const tables = model.schemas.map((table) => table.name);
    expect(tables).toEqual(
      expect.arrayContaining([
        "vendedores",
        "tiendas",
        "fb_sessions",
        "productos",
        "live_events",
        "pedidos",
        "pedido_items",
        "config_pagos",
        "ai_logs",
        "subscriptions",
      ])
    );

    const vendedores = model.schemas.find((table) => table.name === "vendedores");
    expect(vendedores.keyFields).toEqual(
      expect.arrayContaining(["id", "email", "full_name", "ui_lang", "timezone", "created_at"])
    );

    const tiendas = model.schemas.find((table) => table.name === "tiendas");
    expect(tiendas.keyFields).toEqual(
      expect.arrayContaining(["id", "vendedor_id", "fb_page_id", "name", "country", "currency", "locale"])
    );

    const productos = model.schemas.find((table) => table.name === "productos");
    expect(productos.keyFields).toEqual(
      expect.arrayContaining(["id", "tienda_id", "sku", "name", "description", "price", "stock", "image_url"])
    );
  });

  test("captures constraints, indexes, and versioning strategy", () => {
    const model = getDataModelDesign();

    expect(model.constraints.join(" ")).toMatch(/unique\\(tienda_id, sku\\)/i);
    expect(model.constraints.join(" ")).toMatch(/idx_live_events_status/i);
    expect(model.constraints.join(" ")).toMatch(/on delete cascade/i);
    expect(model.versioning).toMatch(/supabase cli/i);
    expect(model.versioning).toMatch(/migrations/i);
  });
});
