const { getVersionControlPlan } = require("../../src/versionControlPlan");

describe("slice-033: Gestion de Versiones y Codigo", () => {
  test("returns version control structure", () => {
    const plan = getVersionControlPlan();

    expect(plan).toEqual(
      expect.objectContaining({
        branching: expect.any(Object),
        commits: expect.any(Object),
        codeReview: expect.any(Object),
        checklist: expect.any(Array),
        semver: expect.any(Object),
        changelog: expect.any(Object),
      })
    );
  });

  test("captures branching strategy", () => {
    const plan = getVersionControlPlan();

    expect(plan.branching).toEqual(
      expect.objectContaining({
        model: "GitHub Flow",
        featureBranches: "feature/*",
        mainProtection: expect.objectContaining({
          ciRequired: true,
          approvalsRequired: 1,
        }),
        hotfixBranches: "hotfix/*",
      })
    );
  });

  test("captures commit conventions", () => {
    const plan = getVersionControlPlan();

    expect(plan.commits.format).toMatch(/conventional/i);
    expect(plan.commits.example).toMatch(/feat\(api\)/i);
    expect(plan.commits.allowedTypes).toEqual(
      expect.arrayContaining(["feat", "fix", "docs", "style", "refactor", "test", "chore"])
    );
  });

  test("captures code review and checklist", () => {
    const plan = getVersionControlPlan();

    expect(plan.codeReview).toEqual(
      expect.objectContaining({
        prDescriptionRequired: true,
        requiredFields: expect.arrayContaining(["Que", "Por que"]),
      })
    );
    expect(plan.checklist.join(" ")).toMatch(/coverage/i);
    expect(plan.checklist.join(" ")).toMatch(/variables de entorno/i);
    expect(plan.checklist.join(" ")).toMatch(/n\+1/i);
    expect(plan.checklist.join(" ")).toMatch(/ia.*error|timeout/i);
  });

  test("captures semver and changelog", () => {
    const plan = getVersionControlPlan();

    expect(plan.semver).toEqual(
      expect.objectContaining({
        major: expect.stringMatching(/rompen|api/i),
        minor: expect.stringMatching(/funcionalidades|pasarela/i),
        patch: expect.stringMatching(/errores|seguridad/i),
      })
    );
    expect(plan.changelog).toEqual(
      expect.objectContaining({
        tools: expect.arrayContaining(["standard-version", "release-please"]),
        visibility: expect.stringMatching(/panel de control/i),
      })
    );
  });
});
