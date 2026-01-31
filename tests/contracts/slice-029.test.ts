const { getCiCdPipeline } = require("../../src/ciCdPipeline");

describe("slice-029: CI/CD Pipeline", () => {
  test("returns pipeline structure", () => {
    const pipeline = getCiCdPipeline();

    expect(pipeline).toEqual(
      expect.objectContaining({
        tool: "GitHub Actions",
        stages: expect.any(Array),
        triggers: expect.any(Object),
        artifacts: expect.any(Object),
      })
    );
  });

  test("captures pipeline stages", () => {
    const pipeline = getCiCdPipeline();
    const stageNames = pipeline.stages.map((stage) => stage.name);

    expect(stageNames).toEqual(
      expect.arrayContaining([
        "Build",
        "Lint & Style",
        "Test",
        "Security Scan",
        "Staging Deploy",
        "E2E & Smoke Tests",
        "Production Deploy",
      ])
    );

    const build = pipeline.stages.find((stage) => stage.name === "Build");
    expect(build).toEqual(
      expect.objectContaining({
        tasks: expect.arrayContaining(["dependencias", "assets Next.js", "Mypy", "TypeScript"]),
      })
    );

    const lint = pipeline.stages.find((stage) => stage.name === "Lint & Style");
    expect(lint).toEqual(
      expect.objectContaining({
        tools: expect.arrayContaining(["Flake8", "Black", "ESLint", "Prettier"]),
      })
    );

    const tests = pipeline.stages.find((stage) => stage.name === "Test");
    expect(tests).toEqual(
      expect.objectContaining({
        parallel: true,
        tools: expect.arrayContaining(["Pytest", "Vitest"]),
      })
    );

    const security = pipeline.stages.find((stage) => stage.name === "Security Scan");
    expect(security).toEqual(
      expect.objectContaining({
        tools: expect.arrayContaining(["Gitleaks"]),
        focus: expect.arrayContaining(["vulnerabilidades", "secretos"]),
      })
    );

    const staging = pipeline.stages.find((stage) => stage.name === "Staging Deploy");
    expect(staging).toEqual(
      expect.objectContaining({
        condition: expect.stringMatching(/exitosos|success/i),
      })
    );

    const e2e = pipeline.stages.find((stage) => stage.name === "E2E & Smoke Tests");
    expect(e2e).toEqual(
      expect.objectContaining({
        target: "staging",
        types: expect.arrayContaining(["E2E", "Smoke"]),
      })
    );

    const prod = pipeline.stages.find((stage) => stage.name === "Production Deploy");
    expect(prod).toEqual(
      expect.objectContaining({
        gate: expect.stringMatching(/aprobacion|approval|merge/i),
      })
    );
  });

  test("captures triggers", () => {
    const pipeline = getCiCdPipeline();

    expect(pipeline.triggers).toEqual(
      expect.objectContaining({
        push: expect.objectContaining({
          branches: "any",
          runs: expect.arrayContaining(["Build", "Lint & Style"]),
        }),
        pullRequest: expect.objectContaining({
          branches: expect.arrayContaining(["main", "develop"]),
          runs: expect.arrayContaining(["Test", "Security Scan"]),
        }),
        scheduled: expect.objectContaining({
          cron: "0 3 * * 0",
          runs: expect.arrayContaining(["security deep scan", "k6 load tests"]),
        }),
      })
    );
  });

  test("captures pipeline artifacts", () => {
    const pipeline = getCiCdPipeline();

    expect(pipeline.artifacts).toEqual(
      expect.objectContaining({
        dockerImages: expect.stringMatching(/GHCR/i),
        staticAssets: expect.stringMatching(/Render|Vercel/i),
        reports: expect.arrayContaining(["LCOV", "SARIF"]),
      })
    );
  });
});
