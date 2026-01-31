const { getPermissionModel } = require("../../src/permissionModel");

describe("slice-010: Modelo de Permisos", () => {
  test("returns RBAC model with role matrix", () => {
    const model = getPermissionModel();

    expect(model).toEqual(
      expect.objectContaining({
        model: "RBAC",
        roles: expect.any(Array),
      })
    );
  });

  test("captures roles and key permissions", () => {
    const model = getPermissionModel();
    const roles = model.roles;

    const owner = roles.find((role) => role.name === "Owner");
    expect(owner).toEqual(
      expect.objectContaining({
        scope: "Vendedor",
        description: expect.stringContaining("Dueño"),
        permissions: expect.arrayContaining([
          "CRUD Productos",
          "Vincular FB Page",
          "Ver Ventas",
          "Configurar Pagos",
          "Gestionar Suscripción",
        ]),
      })
    );

    const staff = roles.find((role) => role.name === "Staff");
    expect(staff).toEqual(
      expect.objectContaining({
        scope: "Vendedor",
        permissions: expect.arrayContaining([
          "Ver inventario",
          "Marcar pedidos como entregados",
          "Ver dashboard de Live activo",
        ]),
        restrictions: expect.arrayContaining(["No puede cambiar pasarelas"]),
      })
    );

    const superAdmin = roles.find((role) => role.name === "SuperAdmin");
    expect(superAdmin).toEqual(
      expect.objectContaining({
        scope: "SaaS",
        permissions: expect.arrayContaining([
          "Ver métricas globales",
          "Gestionar planes",
          "Soporte técnico",
          "Acceso a ai_logs",
        ]),
      })
    );

    const system = roles.find((role) => role.name === "System");
    expect(system).toEqual(
      expect.objectContaining({
        scope: "Internal",
        permissions: expect.arrayContaining([
          "Escribir en ai_logs",
          "Actualizar stock",
          "Crear pedidos vía Webhook",
        ]),
      })
    );
  });
});
