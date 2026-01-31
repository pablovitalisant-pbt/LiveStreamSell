const { getFrontendPerformancePlan } = require("../../src/frontendPerformance");

describe("slice-025: Performance Frontend", () => {
  test("returns performance plan structure", () => {
    const plan = getFrontendPerformancePlan();

    expect(plan).toEqual(
      expect.objectContaining({
        codeSplitting: expect.any(Object),
        assetOptimization: expect.any(Object),
        caching: expect.any(Object),
      })
    );
  });

  test("captures code splitting strategies", () => {
    const plan = getFrontendPerformancePlan();

    expect(plan.codeSplitting).toEqual(
      expect.objectContaining({
        routeBased: "Next.js App Router",
        lazyLoading: expect.stringContaining("dynamic"),
      })
    );
  });

  test("captures asset optimization details", () => {
    const plan = getFrontendPerformancePlan();

    expect(plan.assetOptimization).toEqual(
      expect.objectContaining({
        images: expect.arrayContaining(["next/image", "WebP/AVIF", "srcset", "lazy loading"]),
        fonts: expect.arrayContaining(["next/font", "no CLS"]),
        bundling: expect.arrayContaining(["Tailwind tree-shaking", "Gzip/Brotli"]),
      })
    );
  });

  test("captures caching strategy", () => {
    const plan = getFrontendPerformancePlan();

    expect(plan.caching).toEqual(
      expect.objectContaining({
        serviceWorker: expect.stringMatching(/pwa/i),
        cdn: expect.arrayContaining(["Vercel", "Cloudflare"]),
        staleWhileRevalidate: expect.stringMatching(/react query/i),
      })
    );
  });
});
