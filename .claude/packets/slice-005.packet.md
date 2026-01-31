# SLICE PACKET 5

## Metadata
- **Slice:** 5
- **Name:** SETUP: 7.3 Infraestructura
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 7. Seguridad > 7.3 Infraestructura (líneas 555-582).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 7. Seguridad > 7.3 Infraestructura
- **Lines:** 555-582
- **Estimated Lines:** 56
- **Priority:** critical

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `f7392256cd740e65f0e6dde2f0ed1621a9d2af7be44d64cb83f998ba683a5c5e`

## PRD Content (exact text for this slice)
```markdown
### 7.3 Infraestructura

- **Firewall Rules**:

	- Puertos: Solo puertos 443 (HTTPS) y 80 (redirección a 443) abiertos al público. Puertos internos como 5432 (Postgres) y 6379 (Redis) cerrados al tráfico externo.

	- IP Whitelisting: Restricción de acceso al endpoint de Webhook para aceptar tráfico únicamente desde los rangos de IP oficiales de Meta (Facebook).

- **Security Groups**:

	- Web Service (FastAPI): Permite tráfico entrante desde Cloudflare/Render Load Balancer.

	- Database (Supabase): Permite tráfico entrante únicamente desde las IPs estáticas de la instancia de backend en Render.

	- Internal Workers: Sin acceso entrante desde el exterior; solo salida para llamadas a APIs de IA y Pagos.

- **Penetration Testing**:

	- Frecuencia: Una vez al año por una empresa externa certificada.

	- Alcance: Pruebas de "Caja Negra" en la API pública y el Dashboard para identificar fallos en la lógica de permisos (IDOR) y escalamiento de privilegios.

- **Vulnerability Scanning**:

	- Herramientas: Snyk para escaneo de vulnerabilidades en dependencias de Python/Node.js; GitHub Dependabot para parches de seguridad críticos.

	- Frecuencia: Escaneo continuo en cada Push a la rama main y semanalmente de forma programada.

```

## Contract
- **Test File:** `tests/contracts/slice-005.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 7. Seguridad > 7.3 Infraestructura"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-005.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<56 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 5`
