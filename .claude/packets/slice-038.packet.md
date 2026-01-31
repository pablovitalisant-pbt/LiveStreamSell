# SLICE PACKET 38

## Metadata
- **Slice:** 38
- **Name:** OTHER: 2.1 Funcionalidades (FR)
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 2. Requerimientos Funcionales y No Funcionales > 2.1 Funcionalidades (FR) (líneas 46-67).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 2. Requerimientos Funcionales y No Funcionales > 2.1 Funcionalidades (FR)
- **Lines:** 46-67
- **Estimated Lines:** 44
- **Priority:** medium

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `7f8684ee54860404e6f4f664684fc156dde9817d5ed9f88393a53baf1f6a703c`

## PRD Content (exact text for this slice)
```markdown
### 2.1 Funcionalidades (FR)

- **Onboarding Localizado**: Detección de idioma vía headers del navegador y geolocalización por IP. En el flujo de compra, se priorizará los datos en este orden: 

	1. Selección manual del usuario (Override). 
	
	2. Locale de Facebook API. 
	
	3. Geolocalización por IP (Fallback).

- **Webhook de Alta Velocidad**: Procesamiento en tiempo real de comentarios con sistema de colas (Redis) para absorber picos de tráfico de hasta 1,000 comentarios por minuto y evitar pérdidas por los límites de tasa (rate-limiting) de la API de Meta.

- **NLP Avanzado**: Interpretación de modismos, detección de intenciones de compra y extracción de SKUs mediante modelos de lenguaje (LLM). Capacidad de discernir entre preguntas informativas e intenciones reales de adquisición.

- **Cierre de Venta Privado (DM Transition)**: El bot debe responder al comentario público del Live con una confirmación breve e iniciar inmediatamente el cierre de venta por mensaje privado (DM) de forma automática. Este flujo es mandatorio para cumplir con las políticas anti-spam de Meta (v. 2026) y proteger la privacidad financiera del cliente.

- **Generación Dinámica de Links de Pago**: Integración con PayPal, Mercado Pago y Flow. Los enlaces se generan de forma única por pedido y se entregan exclusivamente vía DM para asegurar que la transacción sea personal e intransferible.

- **Gestión de Inventario (Real-time Locking)**: Reserva temporal por 30 minutos. Tras este periodo, el stock se libera, pero el carrito persiste como "interés" sin reserva garantizada.

- **Dashboard de Control del Live**: Panel de monitorización en tiempo real para el vendedor. Permite visualizar pedidos entrantes, intervenir manualmente en conversaciones específicas o activar el "Kill Switch" para detener al bot instantáneamente ante cualquier anomalía.

```

## Contract
- **Test File:** `tests/contracts/slice-038.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 2. Requerimientos Funcionales y No Funcionales > 2.1 Funcionalidades (FR)"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-038.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<44 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 38`
