# SLICE PACKET 29

## Metadata
- **Slice:** 29
- **Name:** CICD: 11.1 Pipeline CI/CD
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 11. CI/CD y Deployment > 11.1 Pipeline CI/CD (líneas 947-982).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 11. CI/CD y Deployment > 11.1 Pipeline CI/CD
- **Lines:** 947-982
- **Estimated Lines:** 72
- **Priority:** high

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `bad1abd4ab70b6ab1f44d66d762db5a8196e653afd6bcd2eb823bb3a1b65d5a4`

## PRD Content (exact text for this slice)
```markdown
### 11.1 Pipeline CI/CD

- **Herramienta Principal**: GitHub Actions. Se elige por su integración nativa con el repositorio y su ecosistema de "Actions" para seguridad y despliegue.

- **Stages (Etapas)**:

	1. Build: Instalación de dependencias, compilación de assets de Next.js y verificación de tipos (Mypy/TypeScript).

	2. Lint & Style: Ejecución de Flake8/Black (Python) y ESLint/Prettier (JS) para mantener la consistencia del código.

	3. Test: Ejecución en paralelo de la suite de Pytest y Vitest.

	4. Security Scan: Escaneo de vulnerabilidades en dependencias y búsqueda de secretos expuestos (Gitleaks).

	5. Staging Deploy: Despliegue automático a un entorno de pruebas si los pasos anteriores son exitosos.

	6. E2E & Smoke Tests: Pruebas de integración final sobre el entorno de Staging.

	7. Production Deploy: Despliegue a producción (vía aprobación manual o merge a main).

- **Triggers (Disparadores)**:

	- On Push: En cualquier rama para ejecutar Build y Lint.

	- On Pull Request: Ejecución completa de Tests y Security Scans hacia main o develop.

	- Scheduled (Cron): Escaneos de seguridad profundos y pruebas de carga (k6) ejecutadas cada domingo a las 03:00.

- **Artifacts (Artefactos)**:

	- Imágenes Docker: Almacenadas en GitHub Container Registry (GHCR) para el backend.

	- Static Assets: Optimizados y servidos vía CDN de Render o Vercel.

	- Reportes: Cobertura de test (LCOV) y resultados de seguridad (SARIF) adjuntos a cada ejecución del pipeline para auditoría.

```

## Contract
- **Test File:** `tests/contracts/slice-029.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 11. CI/CD y Deployment > 11.1 Pipeline CI/CD"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-029.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<72 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 29`
