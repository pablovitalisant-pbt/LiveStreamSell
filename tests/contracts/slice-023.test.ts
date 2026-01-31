const { getFrontendArchitecture } = require("../../src/frontendArchitecture");

describe("slice-023: Arquitectura Frontend", () => {
  test("returns frontend architecture structure", () => {
    const arch = getFrontendArchitecture();

    expect(arch).toEqual(
      expect.objectContaining({
        framework: expect.any(Object),
        stateManagement: expect.any(Object),
        routing: expect.any(Object),
        componentStructure: expect.any(Object),
        reusableComponents: expect.any(Object),
      })
    );
  });

  test("captures framework, state management, and routing", () => {
    const arch = getFrontendArchitecture();

    expect(arch.framework).toEqual(
      expect.objectContaining({
        name: "Next.js",
        version: "14+",
        router: "App Router",
        ssr: true,
      })
    );
    expect(arch.stateManagement).toEqual(
      expect.objectContaining({
        zustand: expect.stringMatching(/estado global/i),
        reactQuery: expect.stringMatching(/caching/i),
      })
    );
    expect(arch.routing).toEqual(
      expect.objectContaining({
        strategy: "file-based",
        paths: expect.arrayContaining([
          "/dashboard",
          "/dashboard/inventory",
          "/dashboard/live",
          "/checkout/[order_id]",
          "/auth",
        ]),
      })
    );
  });

  test("captures component structure and reusable library", () => {
    const arch = getFrontendArchitecture();

    expect(arch.componentStructure).toEqual(
      expect.objectContaining({
        atomicDesign: expect.objectContaining({
          atoms: expect.arrayContaining(["Botones", "inputs", "badges de stock"]),
          molecules: expect.arrayContaining(["ProductCard", "OrderSummary", "SearchBar"]),
          organisms: expect.arrayContaining(["LiveMonitor", "InventoryTable", "PaymentForm"]),
          templates: expect.arrayContaining(["DashboardLayout", "AuthLayout"]),
        }),
      })
    );
    expect(arch.reusableComponents).toEqual(
      expect.objectContaining({
        base: "Shadcn/UI",
        styling: "Tailwind CSS",
        accessibility: "ARIA",
      })
    );
  });
});
