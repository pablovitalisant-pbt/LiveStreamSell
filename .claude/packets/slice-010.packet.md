# SLICE PACKET 10

## Metadata
- **Slice:** 10
- **Name:** AUTH: 6.2 Modelo de Permisos
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 6. Autenticación y Autorización > 6.2 Modelo de Permisos (líneas 449-464).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 6. Autenticación y Autorización > 6.2 Modelo de Permisos
- **Lines:** 449-464
- **Estimated Lines:** 32
- **Priority:** critical

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `5696deb9bdc5991a049c9cb325ff061a0e08eb1ec5e3ca4d3a422c81a8eee1c4`

## PRD Content (exact text for this slice)
```markdown
### 6.2 Modelo de Permisos

- **Modelo**: RBAC (Role-Based Access Control).

- **Roles y Matriz de Permisos**:

Rol	|	Descripción	|	Permisos Clave

Owner (Vendedor)	|	Dueño de la tienda	|	CRUD Productos, Vincular FB Page, Ver Ventas, Configurar Pagos, Gestionar Suscripción.

Staff (Vendedor)	|	Empleado de la tienda	|	Ver inventario, marcar pedidos como entregados, ver dashboard de Live activo. (No puede cambiar pasarelas).

SuperAdmin (SaaS)	|	Operador del sistema	|	Ver métricas globales, gestionar planes, soporte técnico, acceso a ai_logs.

System (Internal)	|	Bot/Service Account	|	Escribir en ai_logs, actualizar stock, crear pedidos vía Webhook.

```

## Contract
- **Test File:** `tests/contracts/slice-010.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 6. Autenticación y Autorización > 6.2 Modelo de Permisos"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-010.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<32 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 10`
