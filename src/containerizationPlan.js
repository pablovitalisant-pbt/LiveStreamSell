function getContainerizationPlan() {
  return {
    dockerfiles: {
      multiStage: true,
      stages: ["Build", "Runtime"],
      stageDetails: {
        build: "dependencias de compilacion y assets",
        runtime: "solo binarios/artefactos necesarios",
      },
      services: ["FastAPI", "Celery/TaskIQ", "Next.js"],
    },
    baseImages: {
      backend: ["python:3.12-slim", "python:3.12-alpine"],
      frontend: ["node:20-alpine"],
    },
    registry: {
      provider: "GHCR",
      integration: "GitHub Actions integrado",
      versioning: "imagenes ligadas a commits y tags",
    },
    orchestration: {
      initial: {
        platform: "Render.com",
        config: "render.yaml",
      },
      kubernetesReady: {
        targets: ["EKS", "GKE"],
        manifests: [
          "Deployments with HPA",
          "Services ClusterIP/LoadBalancer",
          "Ingress TLS",
          "ConfigMaps & Secrets",
        ],
      },
    },
  };
}

module.exports = { getContainerizationPlan };
