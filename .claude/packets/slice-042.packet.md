# SLICE PACKET 42

## Metadata
- **Slice:** 42
- **Name:** OTHER: 7.1 Secretos y Credenciales
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 7. Seguridad > 7.1 Secretos y Credenciales (líneas 487-516).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 7. Seguridad > 7.1 Secretos y Credenciales
- **Lines:** 487-516
- **Estimated Lines:** 60
- **Priority:** medium

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `25f9af81ca125fdabd0111bdd869328ce455935419a7d6aaf4710090d801c5c1`

## PRD Content (exact text for this slice)
```markdown
### 7.1 Secretos y Credenciales

- **Gestión de secretos**:

	- Entorno de Ejecución: Uso de Render Secret Files y Environment Groups para inyectar llaves en caliente sin persistirlas en Git.

	- Persistencia de Larga Duración: Uso de Supabase Vault (pgrst_vault) para almacenar los tokens de acceso de las páginas de Facebook de los clientes de forma cifrada a nivel de base de datos.

- **Qué secretos se necesitan**:

	- Infraestructura: DATABASE_URL, SUPABASE_SERVICE_ROLE_KEY, REDIS_URL.

	- Integraciones: FB_APP_SECRET, FB_WEBHOOK_VERIFY_TOKEN, OPENAI_API_KEY.

	- Cifrado: ENCRYPTION_KEY_AES256 (para los tokens de los clientes).

- **Rotación**:

	- Política: Rotación de API Keys de proveedores cada 90 días o inmediatamente ante sospecha de leak.

	- Automatización: Uso de scripts internos para actualizar FB_PAGE_ACCESS_TOKENS antes de su expiración (Long-lived tokens de 60 días).

- **Acceso**:

	- El servicio de Background Worker tiene acceso exclusivo a las llaves de IA y Pagos.

	- El servicio de Webhook API solo accede a las llaves de validación de Meta.

	- Acceso humano restringido mediante Supabase Dashboard MFA para administradores.

```

## Contract
- **Test File:** `tests/contracts/slice-042.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 7. Seguridad > 7.1 Secretos y Credenciales"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-042.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<60 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 42`
