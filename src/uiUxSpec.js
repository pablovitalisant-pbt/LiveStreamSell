function getUiUxSpec() {
  return {
    designSystem: {
      colors: { primary: "#0866ff", background: "#09090b", success: "#67FF08" },
      typography: ["Inter", "Geist"],
      spacing: "4px grid",
    },
    screens: {
      onboarding: { steps: ["Perfil de Negocio", "Integracion Meta", "Configuracion de Pagos", "Importacion de Catalogo"] },
      dashboard: { subscreens: ["Resumen de Ventas", "Historial de Lives"] },
      liveControlCenter: { modules: ["Stream de Comentarios", "Gestion de Ventas", "Inventario Rapido"] },
      inventory: { subscreens: ["Lista de Productos", "Editor de Producto"] },
      orders: { subscreens: ["Listado de Pedidos", "Detalle del Pedido"] },
      mobileCheckout: { screens: ["Carrito Confirmado", "Seleccion de Pago", "Confirmacion de Exito"] },
    },
    userFlows: {
      seller: ["Login FB", "Sync Page", "Upload CSV/Manual", "Start Live Monitor"],
      buyer: ["Comenta en FB", "Recibe DM", "Click en Link", "Seleccion de Pago", "Confirmacion"],
    },
    responsive: {
      breakpoints: { mobile: "<640px", tablet: "640-1024px", desktop: ">1024px" },
      behavior: ["tablas a cards", "menu lateral a drawer"],
    },
  };
}

module.exports = { getUiUxSpec };
