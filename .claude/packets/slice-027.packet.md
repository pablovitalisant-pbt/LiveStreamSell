# SLICE PACKET 27

## Metadata
- **Slice:** 27
- **Name:** TESTING: 10.2 Tipos de Tests
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 10. Testing > 10.2 Tipos de Tests (líneas 879-916).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 10. Testing > 10.2 Tipos de Tests
- **Lines:** 879-916
- **Estimated Lines:** 76
- **Priority:** high

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `d5d5f1ace436a662747fe25707d48576e374872a84731d98c0f44feaa9e4d52b`

## PRD Content (exact text for this slice)
```markdown
### 10.2 Tipos de Tests

- **Unit Tests**:

	- Frameworks: Pytest (Backend) y Vitest/Jest (Frontend).

	- Qué Mockear: Respuestas de la API de Meta, llamadas a OpenAI/Gemini, y servicios de envío de correos. Se busca testear la lógica de negocio sin latencia de red.

- **Integration Tests**:

	- Integraciones: Flujos completos entre FastAPI y Supabase (usando una DB de prueba), validación de Webhooks (simulando el payload de Meta) y comunicación con Redis para el bloqueo de stock.

- **E2E Tests**:

	- Herramientas: Playwright (preferido por su velocidad y soporte nativo de emulación móvil).

- Escenarios Críticos: Onboarding de nuevo vendedor, flujo completo de compra (Comentario -> DM -> Pago) y actualización en tiempo real del Dashboard tras una venta.

- **Performance Tests**:

	- Herramientas: k6 (basado en JS, ideal para pipelines de CI/CD).

	- Escenarios de Carga: Simulación de un "Flash Sale" con 10,000 comentarios concurrentes en 1 minuto. Verificación de saturación de la base de datos y tiempos de respuesta del bot bajo presión.

- **Security Tests**:

	- SAST (Static Application Security Testing): Uso de Bandit para Python y Snyk para detectar vulnerabilidades en el código fuente.

	- DAST (Dynamic Application Security Testing): Escaneos automáticos con OWASP ZAP sobre los endpoints públicos.

	- Dependency Scanning: GitHub Dependabot para asegurar que las librerías (FastAPI, Next.js, etc.) no tengan vulnerabilidades conocidas.

- **Accessibility Tests**:

	- Herramientas: Axe-core integrado en Playwright y Lighthouse para auditorías automáticas.

	- Estándares: Cumplimiento de WCAG 2.1 Nivel AA, asegurando que los vendedores puedan operar el dashboard con lectores de pantalla y que el Checkout sea usable para personas con discapacidades visuales o motoras.

```

## Contract
- **Test File:** `tests/contracts/slice-027.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 10. Testing > 10.2 Tipos de Tests"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-027.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<76 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 27`
