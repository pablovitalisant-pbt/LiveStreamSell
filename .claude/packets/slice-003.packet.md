# SLICE PACKET 3

## Metadata
- **Slice:** 3
- **Name:** SETUP: 3.1 Arquitectura General
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 3. Arquitectura del Sistema > 3.1 Arquitectura General (líneas 86-101).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 3. Arquitectura del Sistema > 3.1 Arquitectura General
- **Lines:** 86-101
- **Estimated Lines:** 32
- **Priority:** critical

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `ca442159597ce0059b62ca0640e06548b94de13fdba4a386c42e105de30752af`

## PRD Content (exact text for this slice)
```markdown
### 3.1 Arquitectura General

- **Estilo**: Event-Driven (basado en eventos de Webhook) y Serverless. Se prioriza el desacoplamiento para que el fallo de un componente (ej. la API de IA) no detenga la recepción de eventos de Meta.

- **Flujo de Datos (Data Pipeline)**:

	1. Ingesta: Meta Webhook -> API Gateway (FastAPI) -> Validación de firma y filtrado rápido (Regex).

	2. Mensajería y Colas: Redis Streams para comunicación asíncrona y gestión de eventos en tiempo real (coherente con el stack de Upstash/Render).

	3. Procesamiento: Worker Asíncrono -> Consulta de Caché (Redis) para stock rápido -> AI Engine (Discernimiento de intención).

	4. Acción: Si hay intención de compra -> Bloqueo de Stock en DB (Supabase) -> Generación de Link (Payment Module) -> Response Worker.

	5. Salida: Meta Send API (Messenger).

```

## Contract
- **Test File:** `tests/contracts/slice-003.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 3. Arquitectura del Sistema > 3.1 Arquitectura General"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-003.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<32 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 3`
