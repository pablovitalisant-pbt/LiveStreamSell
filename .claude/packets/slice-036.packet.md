# SLICE PACKET 36

## Metadata
- **Slice:** 36
- **Name:** OPERATIONS: 15.3 Soporte
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 15. Consideraciones Operacionales > 15.3 Soporte (líneas 1331-1368).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 15. Consideraciones Operacionales > 15.3 Soporte
- **Lines:** 1331-1368
- **Estimated Lines:** 76
- **Priority:** low

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `52db4470e568842dfbbacf85e9d81dd922931e840a0db6bf70af1efc2806c012`

## PRD Content (exact text for this slice)
```markdown
### 15.3 Soporte

- **Niveles de Soporte**:

	- L1 (Soporte Funcional/General): Atendido por agentes de Customer Success o un chatbot especializado. Resuelven dudas de configuración de cuenta, problemas de facturación y errores de usuario comunes (ej: "no sé cómo conectar mi página").

	- L2 (Soporte Técnico Especializado): Desarrolladores o analistas técnicos. Se encargan de problemas con webhooks que no llegan, fallos en la lógica de la IA, o discrepancias de stock que requieren consulta en base de datos.

	- L3 (Soporte de Infraestructura/Ingeniería): Lead Dev o DevOps. Intervienen en caídas críticas del sistema, problemas de conectividad con Supabase/Render, ataques DoS o bugs complejos que requieren cambios en el Core del producto.

- **SLAs (Service Level Agreements) de Respuesta**:

	- S1 (Crítica): Caída total del servicio o bot no responde en Lives activos.

		- Respuesta: < 15 min. Resolución: < 2 horas.

	- S2 (Alta): Funcionalidad clave dañada (ej: links de pago no se generan).

		- Respuesta: < 1 hora. Resolución: < 6 horas.

	- S3 (Media): Errores menores de UI o bugs que tienen un "workaround".

		- Respuesta: < 4 horas. Resolución: < 24 horas.

	- S4 (Baja): Consultas generales o sugerencias de mejora.

		- Respuesta: < 24 horas. Resolución: Según Roadmap.

- **Proceso de Escalación**:

	1. Apertura: El ticket entra por Intercom/Zendesk.

	2. Triaje: El sistema categoriza la severidad. Si es S1, dispara alerta a PagerDuty.

	3. Transferencia: Si L1 no resuelve en 20 min, escala a L2. Si L2 detecta fallo de infraestructura, escala a L3.

	4. Contactos de Emergencia: Lista interna de On-call (DevOps y Lead Dev) accesible solo para el equipo de soporte L2/L3.

```

## Contract
- **Test File:** `tests/contracts/slice-036.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 15. Consideraciones Operacionales > 15.3 Soporte"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-036.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<76 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 36`
