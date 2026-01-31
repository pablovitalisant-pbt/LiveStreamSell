# SLICE PACKET 21

## Metadata
- **Slice:** 21
- **Name:** FRONTEND: 3.2 Componentes Críticos y Patrones
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 3. Arquitectura del Sistema > 3.2 Componentes Críticos y Patrones (líneas 102-119).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 3. Arquitectura del Sistema > 3.2 Componentes Críticos y Patrones
- **Lines:** 102-119
- **Estimated Lines:** 36
- **Priority:** medium

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `a29147a239364d4b171e9dddb674c55cfb4736b3df3f1c9fb97f0f5779755a0e`

## PRD Content (exact text for this slice)
```markdown
### 3.2 Componentes Críticos y Patrones

- **Patrones de Diseño**:

	- Strategy: Para el módulo de pagos (permite intercambiar entre Flow, PayPal, Mercado Pago sin cambiar el core).

	- Circuit Breaker: Para las llamadas a la IA; si OpenAI falla repetidamente, el sistema entra en modo "Fallback" (respuestas predefinidas o alerta manual).

	- Saga Pattern (Coreografía): Para gestionar la transacción distribuida: Bloquear stock -> Generar pago -> Notificar. Si el pago falla o expira, se dispara la compensación (devolver stock).

- **Fronteras de Contexto (DDD)**:

	- Core Domain (Sales/Inventory): El corazón del negocio (la gestión del pedido y el stock).

	- Generic Subdomains (Identity/Payment): Funcionalidades necesarias pero que pueden delegarse a terceros.

	- Supporting Domain (Analytics): Procesamiento de métricas post-live.

```

## Contract
- **Test File:** `tests/contracts/slice-021.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 3. Arquitectura del Sistema > 3.2 Componentes Críticos y Patrones"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-021.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<36 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 21`
