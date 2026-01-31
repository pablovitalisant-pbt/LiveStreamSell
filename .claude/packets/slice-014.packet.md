# SLICE PACKET 14

## Metadata
- **Slice:** 14
- **Name:** INTEGRATIONS: 5.3 Integraciones Externas
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 5. APIs y Contratos de Interfaz > 5.3 Integraciones Externas (líneas 382-440).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 5. APIs y Contratos de Interfaz > 5.3 Integraciones Externas
- **Lines:** 382-440
- **Estimated Lines:** 118
- **Priority:** medium

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `52b6d34a44f364b0b5a2916f8352cd4997e7ab466b8d6a7f49831486dd5a74ec`

## PRD Content (exact text for this slice)
```markdown
### 5.3 Integraciones Externas

- **A. APIs de Terceros**

API	|	Propósito	|	Credenciales Necesarias

Meta Graph API	|	Ingesta de comentarios, envío de DMs, analítica de Live.	|	App ID, App Secret, Page Access Token (Long-lived).

OpenAI / Gemini / OpenRouter	|	Procesamiento de lenguaje natural (NLP) e intención de compra.	|	API Key (almacenada en Secret Manager).

Flow / Mercado Pago	|	Generación de links de pago y conciliación.	|	API Key, Secret Key, Merchant ID.

PayPal SDK	|	Pagos internacionales.	|	Client ID, Secret Key.

Google Cloud	|	Exportación de datos a BigQuery para analítica.	|	Service Account Key (JSON).

- **B. Webhooks (Entrada y Salida)**

- Eventos de entrada:

	- feed_comment: Comentario nuevo en el Live (Meta).

	- payment_success: Confirmación de pago (Pasarelas).

	- payment_failure: Intento de pago fallido o expirado.

- **Payload Base**:

{ "event": "string", "timestamp": "ISO8601", "data": { ... } }


- **Retry Logic**:

	- Exponencial Backoff: 5 reintentos (10s, 1m, 5m, 15m, 1h).

	- Idempotencia: Uso de X-Idempotency-Key (basada en el comment_id o transaction_id) para evitar procesar dos veces el mismo evento.

- **C. Mensajería y Colas (Event Schemas)**

	- Tecnología: Redis Streams o FastAPI Background Tasks (para el MVP).

	- Queues:

		- incoming_comments: Cola de alta prioridad para ingesta de Webhooks.

		- ai_processing: Tareas pesadas de análisis de lenguaje.

		- notification_delivery: Envío de mensajes de respuesta a Messenger.

- **Event Schema (Ejemplo ai_processing)**:

{
  "comment_id": "str",
  "text": "quiero la roja",
  "context": { "tienda_id": "uuid", "live_id": "uuid" },
  "schema_version": "1.0"
}


```

## Contract
- **Test File:** `tests/contracts/slice-014.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 5. APIs y Contratos de Interfaz > 5.3 Integraciones Externas"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-014.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<118 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 14`
