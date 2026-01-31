# SLICE PACKET 35

## Metadata
- **Slice:** 35
- **Name:** OPERATIONS: 15.2 Mantenimiento
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 15. Consideraciones Operacionales > 15.2 Mantenimiento (líneas 1305-1330).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 15. Consideraciones Operacionales > 15.2 Mantenimiento
- **Lines:** 1305-1330
- **Estimated Lines:** 52
- **Priority:** low

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `5d222cbdb470fee4069146bb1238fc4c5a16071bf1d654c247018134bb5ccbc2`

## PRD Content (exact text for this slice)
```markdown
### 15.2 Mantenimiento

- **Actualizaciones**:

	- Dependencias: Uso de Dependabot o Renovate para escaneo semanal de paquetes. Las actualizaciones menores se integran automáticamente si pasan los tests; las mayores requieren aprobación manual.

	- Sistema Operativo (OS): Al usar imágenes slim/alpine, las actualizaciones de parches de seguridad se aplican en cada nuevo build del pipeline de CI/CD.

	- Runtime (Python/Node): Revisión semestral de versiones de lenguaje. Migración obligatoria ante el fin de soporte (EOL) de la versión utilizada.

- **Deprecated Features (Plan de Sunset)**:

	- Identificación: Monitoreo de uso de funciones mediante PostHog para detectar características infrautilizadas.

	- Comunicación: Notificación vía Dashboard y Email con 3 meses de antelación antes de retirar una funcionalidad.

	- Transición: Provisión de guías de migración o alternativas si la función retirada es reemplazada por una superior.

- **Data Retention (Políticas de Eliminación)**:

	- Logs de Comentarios: Eliminación de comentarios sin intención de compra tras 90 días. Los comentarios vinculados a un pedido se anonimizan pero se conservan como referencia del registro de venta.

	- Datos de Transacciones: Retención íntegra de facturas, montos y estados de pago por 5 años (exigencia legal tributaria). La metadata de la conversación asociada se reduce al mínimo legal tras el primer año.

	- Cuentas Inactivas: Purga de datos de usuarios que no han iniciado sesión ni realizado pagos en 18 meses, previo aviso de 30 días.

```

## Contract
- **Test File:** `tests/contracts/slice-035.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 15. Consideraciones Operacionales > 15.2 Mantenimiento"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-035.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<52 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 35`
