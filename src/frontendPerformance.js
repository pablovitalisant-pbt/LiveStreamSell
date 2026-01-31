function getFrontendPerformancePlan() {
  return {
    codeSplitting: {
      routeBased: "Next.js App Router",
      lazyLoading: "dynamic()",
    },
    assetOptimization: {
      images: ["next/image", "WebP/AVIF", "srcset", "lazy loading"],
      fonts: ["next/font", "no CLS"],
      bundling: ["Tailwind tree-shaking", "Gzip/Brotli"],
    },
    caching: {
      serviceWorker: "PWA con cache offline",
      cdn: ["Vercel", "Cloudflare"],
      staleWhileRevalidate: "React Query para datos instantaneos",
    },
  };
}

module.exports = { getFrontendPerformancePlan };
