# SLICE PACKET 46

## Metadata
- **Slice:** 46
- **Name:** OTHER: 16.2.1 Protocolo de Recuperación de Carrito y Message Tags
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 16. Compliance y Legal > 16.2.1 Protocolo de Recuperación de Carrito y Message Tags (líneas 1391-1420).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 16. Compliance y Legal > 16.2.1 Protocolo de Recuperación de Carrito y Message Tags
- **Lines:** 1391-1420
- **Estimated Lines:** 60
- **Priority:** medium

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `88bffd4ff0cfb9914c6ad091aca2536486695d8b22f0c5b4bbe500026a131ebc`

## PRD Content (exact text for this slice)
```markdown
### 16.2.1 Protocolo de Recuperación de Carrito y Message Tags

- Para interactuar con usuarios fuera de la ventana estándar de 24 horas, el sistema implementará los siguientes tags oficiales de Meta (Messenger Platform API):

	1. Tag: POST_PURCHASE_UPDATE (Actualización Post-Compra)

		- Uso: Confirmación de pago exitoso, envío de recibos o actualizaciones de estado de envío (Tracking).

		- Restricción: No puede contener contenido promocional ni ofertas de "up-selling".

		- Aplicación: Se usará automáticamente cuando el webhook de la pasarela de pago (Flow, PayPal, Mercado Pago) confirme la transacción, incluso si han pasado días desde el comentario inicial.

	2. Tag: CONFIRMED_EVENT_UPDATE (Actualización de Evento Confirmado)

		- Se usará exclusivamente para notificar al usuario sobre el inicio de un nuevo Live Shopping para el cual se registró previamente.

- **Lógica de Implementación Técnica (Estrategia de Mensajería Ventana 24h)**:

		1. T+0h: Mensaje de bienvenida con link de pago (Reserva de stock activa).

		2. T+20min: Recordatorio de cortesía (10 min antes de liberar stock).

		3. T+12h: Recordatorio de persistencia de carrito (sin reserva de stock).

		4. T+23h: Mensaje de "Última oportunidad" antes de cierre de ventana técnica.

- Si el sistema necesita contactar al usuario (ej. el producto volvió a tener stock), se utilizará un One-Time Notification (OTN).

- El flujo de OTN requerirá un botón de "Avísame cuando haya stock" en el chat. Al hacer clic, el usuario otorga un token de un solo uso para recibir una notificación específica fuera de las 24h cuando el inventario se actualice.

```

## Contract
- **Test File:** `tests/contracts/slice-046.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 16. Compliance y Legal > 16.2.1 Protocolo de Recuperación de Carrito y Message Tags"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-046.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<60 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 46`
