# SLICE PACKET 22

## Metadata
- **Slice:** 22
- **Name:** FRONTEND: 3.4 Componentes y Módulos
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 3. Arquitectura del Sistema > 3.4 Componentes y Módulos (líneas 132-175).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 3. Arquitectura del Sistema > 3.4 Componentes y Módulos
- **Lines:** 132-175
- **Estimated Lines:** 88
- **Priority:** medium

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `cede30759a8d304deca158b845bd5052dc46160707c97e6230e14af03cc19d65`

## PRD Content (exact text for this slice)
```markdown
### 3.4 Componentes y Módulos

- **Frontend (Dashboard & Control)**:

	- Tecnología: Next.js (React) con Tailwind CSS.

	- Funciones: Gestión de catálogo, visualización de métricas del Live, configuración de pasarelas y switch de emergencia (Kill Switch).

- **Backend (Core API & Workers)**:

	- Tecnología: FastAPI (Python) para la API de alta concurrencia.

	- Workers de Procesamiento (TaskIQ): Elegido por su soporte nativo de asyncio, ideal para la naturaleza I/O intensiva de las APIs de Meta y pasarelas de pago.

- **Módulos / Slices de Dominio**:

	- auth: Gestión de JWT y permisos de Facebook Business.

	- facebook_integration: Manejo de Webhooks entrantes y la API de envío de Messenger. Incluye validación de firmas X-Hub-Signature.

	- inventory_manager: Fuente de verdad atómica. Gestiona el "Locking" (reserva temporal) y decremento final de stock.

	- ai_localization: Orquestación de LLMs (GPT-4o/Gemini). Traduce el contexto de la tienda al idioma del cliente y extrae SKUs.

	- payment_gateway: Abstracción de pasarelas (Flow, PayPal, Mercado Pago). Maneja tanto la generación de links como los Webhooks de confirmación (Inbound).

- **Dependencias e Interdependencia**:

	- Flujo Circular de Consistencia:

		1. ai_localization interpreta la intención.

		2. inventory_manager reserva el SKU por X minutos.

		3. payment_gateway genera el cobro asociado a esa reserva.

		4. messenger_integration entrega la solución al cliente.

	- Módulo de Compensación (Saga): Encargado de liberar el stock en inventory_manager si el payment_gateway no recibe una confirmación de pago exitosa tras el tiempo de expiración.

- **Capa Transversal (Infrastructure)**:

	- observability_module: Centraliza logs y trazas (OpenTelemetry) para auditar errores en la cadena (ej. por qué falló un pago o por qué la IA no detectó un SKU).

```

## Contract
- **Test File:** `tests/contracts/slice-022.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 3. Arquitectura del Sistema > 3.4 Componentes y Módulos"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-022.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<88 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 22`
