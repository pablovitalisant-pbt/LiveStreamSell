# SLICE PACKET 17

## Metadata
- **Slice:** 17
- **Name:** OBSERVABILITY: 9.1 Logging
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 9. Observabilidad y Monitoreo > 9.1 Logging (líneas 729-764).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 9. Observabilidad y Monitoreo > 9.1 Logging
- **Lines:** 729-764
- **Estimated Lines:** 72
- **Priority:** high

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `68ba08825bf5fab95e2fd51a0b32d74a86c22378ae40df7527e358c3661f05b6`

## PRD Content (exact text for this slice)
```markdown
### 9.1 Logging

- **Estrategia (Qué loggear)**:

	- Transacciones de Negocio: Creación de pedidos, cambios de stock, confirmaciones de pago.

	- Eventos de IA: Texto de entrada, intención detectada por el LLM y confianza del modelo.

	- Errores de Integración: Fallos en Webhooks de Meta, timeouts de pasarelas de pago.

- **Niveles**:

	- DEBUG: Detalles de payloads de entrada/salida (solo en Staging).

	- INFO: Flujos normales (ej: "Link de pago enviado a usuario X").

	- WARN: Problemas recuperables (ej: "Intento de pago fallido, reintentando").

	- ERROR: Fallos críticos que requieren intervención (ej: "Error 500 en Meta API").

- **Formato**:

	- Estructurado (JSON): Implementación obligatoria mediante la librería structlog en Python. Permite filtrar por campos como user_id, live_id o trace_id sin necesidad de parsing complejo.

- **Centralización**:

	- Stack: Logtail (Better Stack) integrado con Render para la agregación de logs en tiempo real.

	- Alerting: Configuración de alertas en Slack para logs de nivel ERROR.

- **Retención**:

	- Logs de Aplicación: 30 días para diagnóstico rápido.

	- Audit Logs (Seguridad/Pagos): 1 año (almacenados en una tabla fría de Supabase o BigQuery) para cumplimiento legal y resolución de disputas.

```

## Contract
- **Test File:** `tests/contracts/slice-017.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 9. Observabilidad y Monitoreo > 9.1 Logging"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-017.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<72 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 17`
