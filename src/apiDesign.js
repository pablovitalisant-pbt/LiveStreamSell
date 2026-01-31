function getApiDesign() {
  return {
    styles: {
      rest: { primary: true, methods: ["GET", "POST", "PUT", "DELETE"], frontend: "Dashboard", backend: "FastAPI" },
      websockets: { enabled: true, audience: "Dashboard", realtime: ["Nuevos Comentarios", "Ventas Confirmadas"] },
      webhooks: { sources: ["Meta", "Pasarelas de Pago"], events: ["comentarios", "confirmaciones de transacciones"] },
    },
    versioning: { strategy: "url", basePath: "/api/v1/", backwardCompatible: true },
    documentation: {
      openApi: { path: "/docs", includes: ["schemas", "examples", "pydantic validation"] },
      postmanCollectionExportable: true,
    },
  };
}

module.exports = { getApiDesign };
