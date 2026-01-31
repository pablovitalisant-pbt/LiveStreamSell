# SLICE PACKET 13

## Metadata
- **Slice:** 13
- **Name:** APIS: 5.2 Endpoints Detallados
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 5. APIs y Contratos de Interfaz > 5.2 Endpoints Detallados (líneas 300-381).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 5. APIs y Contratos de Interfaz > 5.2 Endpoints Detallados
- **Lines:** 300-381
- **Estimated Lines:** 164
- **Priority:** high

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `bdacebf6ef83f62fd221e81552bbe92f8c75203d90218dc4bc63a1f10d0549ae`

## PRD Content (exact text for this slice)
```markdown
### 5.2 Endpoints Detallados

- **A. Webhook de Facebook (Ingesta de Comentarios)**

	- Método y Ruta: POST /api/v1/webhooks/facebook

	- Autenticación: Validación de firma X-Hub-Signature-256 (SHA256 del body con el App Secret).

	- Body (JSON):

{
  "object": "page",
  "entry": [{
    "id": "PAGE_ID",
    "messaging": [{
      "sender": { "id": "PSID" },
      "message": { "text": "Quiero 2 de la polera roja" }
    }]
  }]
}


	- Respuestas: 200 OK (procesado), 403 Forbidden (firma inválida).

	- Rate Limiting: Según límites de Meta (600 calls/person/minute).

- **B. Gestión de Inventario (CRUD Productos)**

	- Método y Ruta: GET /api/v1/inventory/products

	- Auth: Bearer Token (Supabase JWT).

	- Query Params: tienda_id (uuid), limit (int), offset (int).

	- Response (200):

[{
  "id": "uuid",
  "sku": "POL-ROJ-M",
  "name": "Polera Roja M",
  "stock": 15,
  "price": 15000
}]


	- Errores: 401 Unauthorized, 404 Not Found.

- **C. Creación de Pedido y Link de Pago**

	- Método y Ruta: POST /api/v1/orders/create

	- Auth: Interna (API Key entre módulos) o Bearer para Dashboard.

	- Body (JSON):

{
  "tienda_id": "uuid",
  "customer_fb_id": "string",
  "items": [{ "sku": "string", "qty": 1 }],
  "gateway": "flow"
}


	- Response (201):

{
  "order_id": "uuid",
  "payment_url": "[https://flow.cl/pay/](https://flow.cl/pay/)...",
  "status": "pending"
}


	- Errores: 400 Bad Request (Sin stock), 422 Unprocessable Entity (Esquema inválido).

- **D. Health Check (El Despertador)**

	- Método y Ruta: GET /health

	- Propósito: Mantener la instancia de Render despierta vía Cron-job.org.

	- Response: 200 OK {"status": "alive", "timestamp": "..."}.

```

## Contract
- **Test File:** `tests/contracts/slice-013.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 5. APIs y Contratos de Interfaz > 5.2 Endpoints Detallados"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-013.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<164 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 13`
