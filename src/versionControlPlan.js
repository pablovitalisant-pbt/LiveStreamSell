function getVersionControlPlan() {
  return {
    branching: {
      model: "GitHub Flow",
      featureBranches: "feature/*",
      mainProtection: { ciRequired: true, approvalsRequired: 1 },
      hotfixBranches: "hotfix/*",
    },
    commits: {
      format: "Conventional Commits",
      example: "feat(api): add paypal integration",
      allowedTypes: ["feat", "fix", "docs", "style", "refactor", "test", "chore"],
    },
    codeReview: { prDescriptionRequired: true, requiredFields: ["Que", "Por que"] },
    checklist: [
      "coverage de tests definido",
      "variables de entorno en Staging/Prod",
      "evitar n+1 queries en Supabase",
      "IA maneja error/timeout",
    ],
    semver: {
      major: "rompen compatibilidad API",
      minor: "funcionalidades compatibles (pasarela)",
      patch: "errores y parches de seguridad",
    },
    changelog: {
      tools: ["standard-version", "release-please"],
      visibility: "Panel de Control para vendedores",
    },
  };
}

module.exports = { getVersionControlPlan };
