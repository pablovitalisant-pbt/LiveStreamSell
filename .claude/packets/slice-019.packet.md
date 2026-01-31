# SLICE PACKET 19

## Metadata
- **Slice:** 19
- **Name:** OBSERVABILITY: 9.3 Tracing
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 9. Observabilidad y Monitoreo > 9.3 Tracing (líneas 799-816).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 9. Observabilidad y Monitoreo > 9.3 Tracing
- **Lines:** 799-816
- **Estimated Lines:** 36
- **Priority:** high

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `431a5bc571bb507a93adb7cf9aaf379464f7c85323203ee4dac7b5c9f04d07fd`

## PRD Content (exact text for this slice)
```markdown
### 9.3 Tracing

- **Distributed Tracing**:

	- Estándar: Implementación de OpenTelemetry (OTel) para la instrumentación agnóstica del backend.

	- Herramienta: Jaeger (auto-hosteado o vía Grafana Tempo) para visualizar la propagación de las solicitudes entre los distintos servicios (API -> Worker -> OpenAI -> DB).

- **Qué trazar (Requests Críticos y Transacciones)**:

	- Ciclo de Vida del Webhook: Rastreo completo desde que Meta envía el comentario hasta que el bot responde en Messenger. Esto permite identificar si el cuello de botella está en la red, en la lógica de la base de datos o en el tiempo de respuesta del LLM.

	- Flujo de Checkout: Trazabilidad del proceso de pago para detectar en qué punto exacto un comprador abandona el carrito o dónde falla la comunicación con la pasarela.

	- Consultas de IA: Registro de la duración de cada llamada a las APIs de OpenAI/Gemini para optimizar los tiempos de generación de texto.

	- Trace Context: Inyección de un X-Trace-ID en los headers de respuesta y en los logs para correlacionar instantáneamente un error reportado por Sentry con su traza completa en Jaeger.

```

## Contract
- **Test File:** `tests/contracts/slice-019.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 9. Observabilidad y Monitoreo > 9.3 Tracing"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-019.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<36 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 19`
