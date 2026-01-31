# SLICE PACKET 16

## Metadata
- **Slice:** 16
- **Name:** SECURITY: 7.2 Seguridad de Aplicación
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 7. Seguridad > 7.2 Seguridad de Aplicación (líneas 517-554).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 7. Seguridad > 7.2 Seguridad de Aplicación
- **Lines:** 517-554
- **Estimated Lines:** 76
- **Priority:** high

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `7484494a5b673312b6cb186907efbf83df24db9e61a6f19783914a97923c0d4a`

## PRD Content (exact text for this slice)
```markdown
### 7.2 Seguridad de Aplicación

- **Validación de Input**:

	- Sanitización: Uso de librerías como bleach para limpiar HTML/JS malicioso en campos de texto de productos.

	- Validación de Schemas: Implementación estricta de Pydantic en FastAPI para asegurar que todos los payloads de entrada cumplan con los tipos y rangos definidos.

- **Protección contra ataques comunes**:

	- SQL Injection: Uso mandatorio de SQLAlchemy ORM y consultas parametrizadas; prohibición de queries "raw" concatenadas.

	- XSS (Cross-Site Scripting): Escapado automático de caracteres en Next.js y políticas de seguridad de cookies.

	- CSRF (Cross-Site Request Forgery): Protección mediante validación de origen (CORS) y tokens CSRF en formularios críticos del Dashboard.

	- Clickjacking: Header X-Frame-Options: DENY para evitar que el Dashboard sea embebido en sitios maliciosos.

- **Encriptación**:

	- En Tránsito: TLS 1.3 forzado en todos los endpoints mediante Render y Cloudflare.

	- En Reposo: Cifrado AES-256 para tokens de terceros en DB y cifrado nativo de disco de AWS/Supabase para el resto de la base de datos.

- **Headers de Seguridad**:

	- Content Security Policy (CSP): Restricción de scripts externos para que solo se ejecuten desde dominios confiables (Meta, Sentry, Cloudflare).

	- HSTS (HTTP Strict Transport Security): Instrucción al navegador para usar solo HTTPS durante 1 año.

- **Auditoría**:

	- Logging de Accesos: Registro de IPs, User-agents y timestamps de cada login y fallo de auth.

	- Registro de Cambios (Audit Log): Tabla de auditoría en DB que registra quién cambió el precio de un producto o modificó una pasarela de pago.

	- Eventos de Seguridad: Alertas automáticas en Slack/Email ante múltiples fallos de login desde una misma IP.

```

## Contract
- **Test File:** `tests/contracts/slice-016.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 7. Seguridad > 7.2 Seguridad de Aplicación"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-016.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<76 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 16`
