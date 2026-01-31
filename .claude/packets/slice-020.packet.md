# SLICE PACKET 20

## Metadata
- **Slice:** 20
- **Name:** OBSERVABILITY: 9.4 Alerting
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 9. Observabilidad y Monitoreo > 9.4 Alerting (líneas 817-852).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 9. Observabilidad y Monitoreo > 9.4 Alerting
- **Lines:** 817-852
- **Estimated Lines:** 72
- **Priority:** high

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `70ac98cd758b5e933b7739ae129d4dd4ce0eb6013fb18ba09c681ba58e0efbb5`

## PRD Content (exact text for this slice)
```markdown
### 9.4 Alerting

- **Qué alertar (Condiciones Críticas)**:

	- Uptime: Caída del servicio de Webhooks (Error 5xx persistente > 1 min).

	- Latencia: P95 de procesamiento de comentarios > 5s (Bot lento).

	- Integración: Error masivo de autenticación con la Meta Graph API (Token expirado/baneado).

	- Base de Datos: Consumo de CPU/RAM de Supabase > 80%.

	- IA: Fallos consecutivos en el proveedor de LLM (OpenAI/Gemini fuera de servicio).

- **Canales**:

	- Prioridad Alta (P0/P1): Slack (canal #alerts-critical) y PagerDuty (llamada telefónica/notificación push).

	- Prioridad Media (P2): Email y notificaciones en el Dashboard administrativo.

- **Escalación**:

	- Nivel 1 (0-15 min): Respuesta automática del sistema (ej: reintento de conexión) + aviso al DevOps de guardia.

	- Nivel 2 (> 15 min): Si la alerta no se reconoce, escalar al CTO/Líder técnico.

	- Nivel 3 (> 30 min): Comunicación proactiva en redes/página de estado para los clientes afectados.

- **Runbooks (Procedimientos de Respuesta)**:

	- RB-001: Meta Token Expired: Pasos para refrescar manualmente el System User Token desde el Meta Business Suite.

	- RB-002: OpenAI Timeout: Procedimiento para cambiar el puntero de la IA de OpenAI a Gemini (Failover) de forma manual o automática.

	- RB-003: DB Deadlock: Instrucciones para identificar y terminar procesos bloqueantes en PostgreSQL sin afectar la integridad de los pedidos.

```

## Contract
- **Test File:** `tests/contracts/slice-020.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 9. Observabilidad y Monitoreo > 9.4 Alerting"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-020.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<72 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 20`
