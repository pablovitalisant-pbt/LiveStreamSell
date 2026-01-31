# SLICE PACKET 41

## Metadata
- **Slice:** 41
- **Name:** OTHER: 6.3 Gestión de Tokens
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 6. Autenticación y Autorización > 6.3 Gestión de Tokens (líneas 465-474).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 6. Autenticación y Autorización > 6.3 Gestión de Tokens
- **Lines:** 465-474
- **Estimated Lines:** 20
- **Priority:** medium

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `eaf70586751b43311ad9244c436f5fd4a53684fcf91e7f7bb80153efbb2c5e3e`

## PRD Content (exact text for this slice)
```markdown
### 6.3 Gestión de Tokens

- **Generación**: Supabase genera un access_token (JWT corto) y un refresh_token (larga duración) tras el login exitoso.

- **Refresh**: El cliente (Next.js) refresca el token automáticamente en segundo plano antes de la expiración.

- **Revocación**: Implementada mediante el borrado de la sesión en Supabase y lista negra (blacklist) en Redis para tokens comprometidos si fuera necesario.

- **Expiración**: access_token (1 hora), refresh_token (normalmente 30 días o hasta logout).

```

## Contract
- **Test File:** `tests/contracts/slice-041.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 6. Autenticación y Autorización > 6.3 Gestión de Tokens"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-041.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<20 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 41`
