# SLICE PACKET 39

## Metadata
- **Slice:** 39
- **Name:** OTHER: 3.3 Gestión de Estado y Persistencia
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 3. Arquitectura del Sistema > 3.3 Gestión de Estado y Persistencia (líneas 120-131).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 3. Arquitectura del Sistema > 3.3 Gestión de Estado y Persistencia
- **Lines:** 120-131
- **Estimated Lines:** 24
- **Priority:** medium

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `c8a8a4fbd63869e16e1f70cc70b39fefb4a821ba4d4e61c7df4f189dc2b42a09`

## PRD Content (exact text for this slice)
```markdown
### 3.3 Gestión de Estado y Persistencia

- **Capa de Datos**: Supabase (PostgreSQL) para datos persistentes.

- **Capa de Velocidad**: Redis para:

	- Rate Limiting: Evitar que Meta bloquee la app por exceso de mensajes.

	- Session State: Almacenar en qué etapa de la conversación está cada usuario de Facebook (ej: WAITING_FOR_PAYMENT_METHOD).

	- Idempotency Keys: Almacenar el mid (Message ID) de Facebook por 24h para no procesar dos veces el mismo comentario.

```

## Contract
- **Test File:** `tests/contracts/slice-039.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 3. Arquitectura del Sistema > 3.3 Gestión de Estado y Persistencia"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-039.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<24 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 39`
