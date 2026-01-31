# SLICE PACKET 18

## Metadata
- **Slice:** 18
- **Name:** OBSERVABILITY: 9.2 Métricas
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 9. Observabilidad y Monitoreo > 9.2 Métricas (líneas 765-798).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 9. Observabilidad y Monitoreo > 9.2 Métricas
- **Lines:** 765-798
- **Estimated Lines:** 68
- **Priority:** high

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `c62c88bf4141131b7c0bd89beb3d1b59fbfe64c85e4e1429ea16bff7ba47b9de`

## PRD Content (exact text for this slice)
```markdown
### 9.2 Métricas

- **Herramientas**:

	- Prometheus: Para la recolección de métricas de series temporales del backend (FastAPI).

	- Grafana: Para la visualización de dashboards técnicos y de negocio.

	- Render Metrics: Para monitoreo nativo de CPU/RAM de la infraestructura.

- **Métricas Clave (Golden Signals)**:

	- Latency (Latencia): Tiempo que tarda el bot en responder a un comentario (Target: P95 < 2.5s).

	- Error Rate (Tasa de Errores): % de webhooks de Facebook que devuelven un código != 200 o excepciones internas.

	- Throughput (Caudal): Número de comentarios procesados por minuto (CPM) durante un Live.

	- Saturation (Saturación): Uso de conexiones en el pool de base de datos y memoria del worker de IA.

- **Dashboards**:

	- Para Devs: Gráficos de salud del sistema, consumo de API de OpenAI y tiempos de respuesta de DB.

	- Para Business: Tasa de conversión de comentarios a carritos, volumen transaccionado por hora y retención de vendedores.

- **SLIs/SLOs (Service Level Indicators & Objectives)**:

	- SLO de Disponibilidad: 99.9% de uptime mensual de la API de Webhooks.

	- SLO de Latencia: 90% de los mensajes de confirmación deben enviarse en menos de 3 segundos desde la recepción del comentario.

	- SLO de Integridad: 100% de los pedidos pagados deben verse reflejados en el Dashboard en menos de 10 segundos.

```

## Contract
- **Test File:** `tests/contracts/slice-018.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 9. Observabilidad y Monitoreo > 9.2 Métricas"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-018.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<68 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 18`
