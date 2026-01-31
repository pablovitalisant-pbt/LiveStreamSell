const { getStorageTypes } = require("../../src/storageTypes");

describe("slice-007: Tipos de Almacenamiento", () => {
  test("returns storage types structure", () => {
    const storage = getStorageTypes();

    expect(storage).toEqual(
      expect.objectContaining({
        relational: expect.any(Object),
        nosql: expect.any(Object),
        search: expect.any(Object),
        cache: expect.any(Object),
        objectStorage: expect.any(Object),
        dataWarehousing: expect.any(Object),
      })
    );
  });

  test("captures relational and nosql usage", () => {
    const storage = getStorageTypes();

    expect(storage.relational).toEqual(
      expect.objectContaining({
        engine: "PostgreSQL",
        provider: "Supabase",
        sourceOfTruth: true,
        compliance: "ACID",
      })
    );

    expect(storage.nosql).toEqual(
      expect.objectContaining({
        engine: "Redis",
        provider: "Upstash",
        usage: expect.stringMatching(/volatil/i),
        ephemeralOnly: true,
      })
    );
  });

  test("captures search and cache strategy", () => {
    const storage = getStorageTypes();

    expect(storage.search).toEqual(
      expect.objectContaining({
        primary: "PostgreSQL FTS",
        dashboardBoost: expect.objectContaining({
          provider: "Algolia",
          thresholdProducts: 1000,
          mode: "as-you-type",
        }),
      })
    );

    expect(storage.cache).toEqual(
      expect.objectContaining({
        engine: "Redis",
        cacheItems: expect.arrayContaining([
          "catalogos activos",
          "tokens facebook",
          "respuestas ia",
        ]),
        ttlMinutesCatalogs: 15,
        ttlHoursFbSessions: 24,
        strategy: expect.objectContaining({
          products: "cache-aside",
          userSessions: "write-through",
        }),
      })
    );
  });

  test("captures object storage and data warehousing", () => {
    const storage = getStorageTypes();

    expect(storage.objectStorage).toEqual(
      expect.objectContaining({
        provider: "Supabase Storage",
        base: "S3",
        usage: expect.arrayContaining(["imagenes productos", "backups logs"]),
      })
    );

    expect(storage.dataWarehousing).toEqual(
      expect.objectContaining({
        provider: "BigQuery",
        exportsWeekly: true,
        datasets: expect.arrayContaining(["ai_logs", "pedido_items"]),
      })
    );
  });
});
