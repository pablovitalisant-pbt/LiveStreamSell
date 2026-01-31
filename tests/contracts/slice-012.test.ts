const { getApiDesign } = require("../../src/apiDesign");

describe("slice-012: API Design", () => {
  test("returns api design structure", () => {
    const api = getApiDesign();

    expect(api).toEqual(
      expect.objectContaining({
        styles: expect.any(Object),
        versioning: expect.any(Object),
        documentation: expect.any(Object),
      })
    );
  });

  test("captures styles for REST, WebSockets, and Webhooks", () => {
    const api = getApiDesign();

    expect(api.styles.rest).toEqual(
      expect.objectContaining({
        primary: true,
        methods: expect.arrayContaining(["GET", "POST", "PUT", "DELETE"]),
        frontend: "Dashboard",
        backend: "FastAPI",
      })
    );
    expect(api.styles.websockets).toEqual(
      expect.objectContaining({
        enabled: true,
        audience: "Dashboard",
        realtime: expect.arrayContaining(["Nuevos Comentarios", "Ventas Confirmadas"]),
      })
    );
    expect(api.styles.webhooks).toEqual(
      expect.objectContaining({
        sources: expect.arrayContaining(["Meta", "Pasarelas de Pago"]),
        events: expect.arrayContaining(["comentarios", "confirmaciones de transacciones"]),
      })
    );
  });

  test("captures versioning and documentation", () => {
    const api = getApiDesign();

    expect(api.versioning).toEqual(
      expect.objectContaining({
        strategy: "url",
        basePath: "/api/v1/",
        backwardCompatible: true,
      })
    );
    expect(api.documentation).toEqual(
      expect.objectContaining({
        openApi: expect.objectContaining({
          path: "/docs",
          includes: expect.arrayContaining(["schemas", "examples", "pydantic validation"]),
        }),
        postmanCollectionExportable: true,
      })
    );
  });
});
