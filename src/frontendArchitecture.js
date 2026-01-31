function getFrontendArchitecture() {
  return {
    framework: { name: "Next.js", version: "14+", router: "App Router", ssr: true },
    stateManagement: {
      zustand: "Estado global ligero (preferencias UI, usuario)",
      reactQuery: "Estado asincrono y caching de inventario con Supabase",
    },
    routing: {
      strategy: "file-based",
      paths: ["/dashboard", "/dashboard/inventory", "/dashboard/live", "/checkout/[order_id]", "/auth"],
    },
    componentStructure: {
      atomicDesign: {
        atoms: ["Botones", "inputs", "badges de stock"],
        molecules: ["ProductCard", "OrderSummary", "SearchBar"],
        organisms: ["LiveMonitor", "InventoryTable", "PaymentForm"],
        templates: ["DashboardLayout", "AuthLayout"],
      },
    },
    reusableComponents: { base: "Shadcn/UI", styling: "Tailwind CSS", accessibility: "ARIA" },
  };
}

module.exports = { getFrontendArchitecture };
