const { getContainerizationPlan } = require("../../src/containerizationPlan");

describe("slice-032: Containerizacion", () => {
  test("returns containerization structure", () => {
    const plan = getContainerizationPlan();

    expect(plan).toEqual(
      expect.objectContaining({
        dockerfiles: expect.any(Object),
        baseImages: expect.any(Object),
        registry: expect.any(Object),
        orchestration: expect.any(Object),
      })
    );
  });

  test("captures dockerfile stages and services", () => {
    const plan = getContainerizationPlan();

    expect(plan.dockerfiles).toEqual(
      expect.objectContaining({
        multiStage: true,
        stages: expect.arrayContaining(["Build", "Runtime"]),
        stageDetails: expect.objectContaining({
          build: expect.stringMatching(/dependencias|assets/i),
          runtime: expect.stringMatching(/binarios|artefactos/i),
        }),
        services: expect.arrayContaining(["FastAPI", "Celery/TaskIQ", "Next.js"]),
      })
    );
  });

  test("captures base images and registry", () => {
    const plan = getContainerizationPlan();

    expect(plan.baseImages).toEqual(
      expect.objectContaining({
        backend: expect.arrayContaining(["python:3.12-slim", "python:3.12-alpine"]),
        frontend: expect.arrayContaining(["node:20-alpine"]),
      })
    );
    expect(plan.registry).toEqual(
      expect.objectContaining({
        provider: "GHCR",
        integration: expect.stringMatching(/github actions/i),
        versioning: expect.stringMatching(/commits|tags/i),
      })
    );
  });

  test("captures orchestration and kubernetes readiness", () => {
    const plan = getContainerizationPlan();

    expect(plan.orchestration.initial.platform).toMatch(/render/i);
    expect(plan.orchestration.initial.config).toMatch(/render.yaml/i);
    expect(plan.orchestration.kubernetesReady.manifests).toEqual([
      "Deployments with HPA",
      "Services ClusterIP/LoadBalancer",
      "Ingress TLS",
      "ConfigMaps & Secrets",
    ]);
    expect(plan.orchestration.kubernetesReady.targets).toEqual(["EKS", "GKE"]);
  });
});
