# SLICE PACKET 26

## Metadata
- **Slice:** 26
- **Name:** TESTING: 10.1 Estrategia de Testing
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 10. Testing > 10.1 Estrategia de Testing (líneas 855-878).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 10. Testing > 10.1 Estrategia de Testing
- **Lines:** 855-878
- **Estimated Lines:** 48
- **Priority:** high

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `780aa973ca124ca432d0b8938211a90c1a59befcea805ac0e11d94cb541b78ce`

## PRD Content (exact text for this slice)
```markdown
### 10.1 Estrategia de Testing

- **Pirámide de Testing**:

	- Unit Tests (70%): Foco en lógica pura (ej: cálculo de impuestos, parsing de comentarios, validación de stock). Ejecución rápida en cada commit.

	- Integration Tests (20%): Pruebas de interacción con Supabase (vía contenedores de Testcontainers), llamadas a la API de Meta mockeadas y flujos de autenticación.

	- E2E Tests (10%): Flujos críticos de negocio (Onboarding completo, Comentario -> DM -> Pago aprobado). Uso de Playwright para simular el navegador y la interacción del usuario.

- **Coverage Objetivo**:

	- Mínimo Global: 80% de cobertura de código.

	- Crítico (Lógica de Pagos e Inventario): 100% de cobertura obligatoria para poder hacer merge a main.

- **Testing en Producción**:

	- Feature Flags: Uso de PostHog o LaunchDarkly para habilitar nuevas pasarelas de pago o modelos de IA gradualmente. Permite "apagar" una funcionalidad al instante si causa errores.

	- Canary Deployments: Despliegue del nuevo código al 5% de las instancias en Render para monitorizar errores en tiempo real antes de completar el despliegue global.

	- Smoke Tests: Pruebas automatizadas post-despliegue que verifican que los endpoints base (/health, /api/v1/auth) respondan correctamente.

```

## Contract
- **Test File:** `tests/contracts/slice-026.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 10. Testing > 10.1 Estrategia de Testing"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-026.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<48 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 26`
