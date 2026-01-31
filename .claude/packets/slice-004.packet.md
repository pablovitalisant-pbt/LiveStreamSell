# SLICE PACKET 4

## Metadata
- **Slice:** 4
- **Name:** SETUP: 3.5 Infraestructura
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 3. Arquitectura del Sistema > 3.5 Infraestructura (líneas 176-207).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 3. Arquitectura del Sistema > 3.5 Infraestructura
- **Lines:** 176-207
- **Estimated Lines:** 64
- **Priority:** critical

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `1a1326319b9c18b7c5d800606ab1c229effb13ceb52f2892e90f3be86b4c5649`

## PRD Content (exact text for this slice)
```markdown
### 3.5 Infraestructura

- **Cloud Providers**:

	- Cómputo: Render.com (Elegido por su facilidad de despliegue de contenedores y auto-escalado).

	- BaaS (Backend as a Service): Supabase (PostgreSQL, Auth, Edge Functions).

- **Regiones y Latencia**:

	- Ubicación: AWS us-east-1 (Virginia) para Supabase y Render. Mantener ambos servicios en la misma región física reduce la latencia de red a < 10ms.

- **Networking y Disponibilidad**:

	- DNS/CDN/WAF: Cloudflare. Implementación de reglas de firewall para mitigar ataques DDoS y protección contra scraping.

	- Estrategia "Keep-Alive" (El Despertador): Uso de cron-jobs externos (Cron-job.org o GitHub Actions) que realizan pings al endpoint /health cada 5 minutos.

	- Deep Health Checks: El endpoint /health realiza una verificación sintética de conexión a PostgreSQL y Redis antes de devolver un 200 OK.

- **Compute & Scaling**:

	- Web Service: Instancias de Render con Auto-scaling activado (mínimo 1, máximo 10 según uso de CPU).

	- Background Workers: Instancias separadas para el procesamiento de IA, evitando que la latencia del LLM bloquee la recepción de nuevos Webhooks de Meta.

- **Seguridad e Infra**:

	- Gestión de Secretos: Uso de Environment Variables cifradas en Render y Supabase Vault para llaves privadas de clientes.

	- SSL/TLS: Encriptación forzada de extremo a extremo (End-to-End Encryption).

```

## Contract
- **Test File:** `tests/contracts/slice-004.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 3. Arquitectura del Sistema > 3.5 Infraestructura"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-004.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<64 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 4`
