function getPermissionModel() {
  return {
    model: "RBAC",
    roles: [
      { name: "Owner", scope: "Vendedor", description: "Dueño de la tienda", permissions: ["CRUD Productos", "Vincular FB Page", "Ver Ventas", "Configurar Pagos", "Gestionar Suscripción"] },
      { name: "Staff", scope: "Vendedor", permissions: ["Ver inventario", "Marcar pedidos como entregados", "Ver dashboard de Live activo"], restrictions: ["No puede cambiar pasarelas"] },
      { name: "SuperAdmin", scope: "SaaS", permissions: ["Ver métricas globales", "Gestionar planes", "Soporte técnico", "Acceso a ai_logs"] },
      { name: "System", scope: "Internal", permissions: ["Escribir en ai_logs", "Actualizar stock", "Crear pedidos vía Webhook"] },
    ],
  };
}

module.exports = { getPermissionModel };
