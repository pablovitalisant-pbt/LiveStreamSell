const { getDeploymentStrategy } = require("../../src/deploymentStrategy");

describe("slice-030: Estrategia de Deployment", () => {
  test("returns deployment strategy structure", () => {
    const strategy = getDeploymentStrategy();

    expect(strategy).toEqual(
      expect.objectContaining({
        environments: expect.any(Object),
        release: expect.any(Object),
        featureFlags: expect.any(Object),
        rollback: expect.any(Object),
      })
    );
  });

  test("captures environments", () => {
    const strategy = getDeploymentStrategy();

    expect(strategy.environments).toEqual(
      expect.objectContaining({
        development: expect.objectContaining({
          tooling: expect.stringMatching(/docker compose/i),
          data: expect.stringMatching(/supabase/i),
        }),
        staging: expect.objectContaining({
          platform: expect.stringMatching(/render/i),
          purpose: expect.arrayContaining(["App Review Meta", "QA"]),
          data: expect.stringMatching(/sinteticos/i),
        }),
        production: expect.objectContaining({
          availability: expect.stringMatching(/alta/i),
          autoscaling: true,
          signedCodeOnly: true,
        }),
      })
    );
  });

  test("captures release strategy", () => {
    const strategy = getDeploymentStrategy();

    expect(strategy.release).toEqual(
      expect.objectContaining({
        canary: expect.objectContaining({
          initialExposurePercent: 5,
          successCriteria: expect.stringMatching(/5xx|latencia/i),
          promoteAfterMinutes: 10,
        }),
        rollingUpdates: expect.objectContaining({
          useCase: expect.stringMatching(/ui|dashboard/i),
          policy: expect.stringMatching(/una a una/i),
        }),
      })
    );
  });

  test("captures feature flags strategy", () => {
    const strategy = getDeploymentStrategy();

    expect(strategy.featureFlags).toEqual(
      expect.objectContaining({
        tool: "PostHog",
        sdk: expect.arrayContaining(["Python", "React"]),
        strategy: expect.objectContaining({
          defaultState: "off",
          audience: expect.stringMatching(/beta/i),
          killSwitch: true,
        }),
      })
    );
    expect(strategy.featureFlags.strategy.example).toMatch(/paypal/i);
  });

  test("captures rollback plan", () => {
    const strategy = getDeploymentStrategy();

    expect(strategy.rollback).toEqual(
      expect.objectContaining({
        automatic: expect.objectContaining({
          renderHealthCheckFails: 3,
          errorSpikePercent: 15,
          errorWindow: expect.stringMatching(/primer minuto/i),
        }),
        manual: expect.objectContaining({
          action: expect.stringMatching(/promote previous build/i),
        }),
        conditions: expect.arrayContaining([
          expect.stringMatching(/inconsistencia/i),
          expect.stringMatching(/latencia.*10s/i),
          expect.stringMatching(/webhook.*meta/i),
        ]),
      })
    );
  });
});
