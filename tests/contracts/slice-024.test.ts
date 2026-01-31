const { getUiUxSpec } = require("../../src/uiUxSpec");

describe("slice-024: UI/UX", () => {
  test("returns UI/UX spec structure", () => {
    const spec = getUiUxSpec();

    expect(spec).toEqual(
      expect.objectContaining({
        designSystem: expect.any(Object),
        screens: expect.any(Object),
        userFlows: expect.any(Object),
        responsive: expect.any(Object),
      })
    );
  });

  test("captures design system", () => {
    const spec = getUiUxSpec();

    expect(spec.designSystem).toEqual(
      expect.objectContaining({
        colors: expect.objectContaining({
          primary: "#0866ff",
          background: "#09090b",
          success: "#67FF08",
        }),
        typography: expect.arrayContaining(["Inter", "Geist"]),
        spacing: "4px grid",
      })
    );
  });

  test("captures key screens and modules", () => {
    const spec = getUiUxSpec();

    expect(spec.screens.onboarding.steps).toEqual(
      expect.arrayContaining([
        "Perfil de Negocio",
        "Integracion Meta",
        "Configuracion de Pagos",
        "Importacion de Catalogo",
      ])
    );
    expect(spec.screens.dashboard.subscreens).toEqual(
      expect.arrayContaining(["Resumen de Ventas", "Historial de Lives"])
    );
    expect(spec.screens.liveControlCenter.modules).toEqual(
      expect.arrayContaining(["Stream de Comentarios", "Gestion de Ventas", "Inventario Rapido"])
    );
    expect(spec.screens.inventory.subscreens).toEqual(
      expect.arrayContaining(["Lista de Productos", "Editor de Producto"])
    );
    expect(spec.screens.orders.subscreens).toEqual(
      expect.arrayContaining(["Listado de Pedidos", "Detalle del Pedido"])
    );
    expect(spec.screens.mobileCheckout.screens).toEqual(
      expect.arrayContaining(["Carrito Confirmado", "Seleccion de Pago", "Confirmacion de Exito"])
    );
  });

  test("captures user flows and responsive behavior", () => {
    const spec = getUiUxSpec();

    expect(spec.userFlows).toEqual(
      expect.objectContaining({
        seller: expect.arrayContaining(["Login FB", "Sync Page", "Upload CSV/Manual", "Start Live Monitor"]),
        buyer: expect.arrayContaining(["Comenta en FB", "Recibe DM", "Click en Link", "Seleccion de Pago", "Confirmacion"]),
      })
    );
    expect(spec.responsive).toEqual(
      expect.objectContaining({
        breakpoints: expect.objectContaining({
          mobile: "<640px",
          tablet: "640-1024px",
          desktop: ">1024px",
        }),
        behavior: expect.arrayContaining(["tablas a cards", "menu lateral a drawer"]),
      })
    );
  });
});
