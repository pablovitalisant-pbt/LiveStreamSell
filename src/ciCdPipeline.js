function getCiCdPipeline() {
  return {
    tool: "GitHub Actions",
    stages: [
      { name: "Build", tasks: ["dependencias", "assets Next.js", "Mypy", "TypeScript"] },
      { name: "Lint & Style", tools: ["Flake8", "Black", "ESLint", "Prettier"] },
      { name: "Test", tools: ["Pytest", "Vitest"], parallel: true },
      {
        name: "Security Scan",
        tools: ["Gitleaks"],
        focus: ["vulnerabilidades", "secretos"],
      },
      { name: "Staging Deploy", condition: "previos exitosos" },
      { name: "E2E & Smoke Tests", target: "staging", types: ["E2E", "Smoke"] },
      { name: "Production Deploy", gate: "aprobacion manual o merge a main" },
    ],
    triggers: {
      push: { branches: "any", runs: ["Build", "Lint & Style"] },
      pullRequest: { branches: ["main", "develop"], runs: ["Test", "Security Scan"] },
      scheduled: { cron: "0 3 * * 0", runs: ["security deep scan", "k6 load tests"] },
    },
    artifacts: {
      dockerImages: "Backend en GHCR",
      staticAssets: "CDN de Render o Vercel",
      reports: ["LCOV", "SARIF"],
    },
  };
}

module.exports = { getCiCdPipeline };
