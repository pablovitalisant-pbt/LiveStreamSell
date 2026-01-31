# SLICE PACKET 32

## Metadata
- **Slice:** 32
- **Name:** CICD: 11.5 Containerización
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 11. CI/CD y Deployment > 11.5 Containerización (líneas 1089-1124).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 11. CI/CD y Deployment > 11.5 Containerización
- **Lines:** 1089-1124
- **Estimated Lines:** 72
- **Priority:** high

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `ba7eac71e54ef5de7431d1ef23513f82935ab49b9b6be4de092e7388c1adbe0f`

## PRD Content (exact text for this slice)
```markdown
### 11.5 Containerización

- **Dockerfiles**:

	- Estructura Multi-stage: Se utilizarán Dockerfiles de múltiples etapas para minimizar el tamaño de las imágenes finales.

		- Etapa 1 (Build): Instalación de dependencias de compilación y compilación de assets.

		- Etapa 2 (Runtime): Copia solo de los binarios/artefactos necesarios para la ejecución.

	- Servicios: Dockerfiles específicos para el API Backend (FastAPI), el Background Worker (Celery/TaskIQ) y el Frontend (Next.js - si se despliega como contenedor).

- **Base Images**:

	- Backend: python:3.12-slim o python:3.12-alpine para reducir la superficie de ataque y mejorar la velocidad de descarga.

	- Frontend: node:20-alpine para optimizar el despliegue de los archivos estáticos y el servidor de SSR.

- **Registry**:

	- GitHub Container Registry (GHCR): Se utilizará como repositorio privado de imágenes. Está integrado directamente con GitHub Actions, facilitando el versionado de imágenes vinculado a los commits y tags de Git.

- **Orquestación**:

	- Contexto Inicial: Dado que el despliegue inicial es en Render.com, se utilizará su orquestador nativo basado en Kubernetes (abstraído) mediante archivos de configuración render.yaml (Infrastructure as Code).

	- Escalabilidad (Kubernetes Ready): Se mantienen preparados los Kubernetes Manifests y Helm Charts para una migración futura a un entorno autogestionado (EKS/GKE) si la carga de usuarios lo requiere. Los manifiestos incluyen:

		- Deployments con HPA (Horizontal Pod Autoscaler) basado en CPU y latencia.

		- Services de tipo ClusterIP y LoadBalancer.

		- Ingress para manejo de TLS y rutas.

		- ConfigMaps y Secrets para la inyección de configuraciones dinámicas.

```

## Contract
- **Test File:** `tests/contracts/slice-032.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 11. CI/CD y Deployment > 11.5 Containerización"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-032.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<72 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 32`
