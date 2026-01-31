# SLICE PACKET 45

## Metadata
- **Slice:** 45
- **Name:** OTHER: 16.1 Regulaciones Aplicables
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 16. Compliance y Legal > 16.1 Regulaciones Aplicables (líneas 1371-1382).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 16. Compliance y Legal > 16.1 Regulaciones Aplicables
- **Lines:** 1371-1382
- **Estimated Lines:** 24
- **Priority:** medium

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `b0262a87cc10a1b83624ebe81d785f54c939b757f7f167051332f60fbf0ea94b`

## PRD Content (exact text for this slice)
```markdown
### 16.1 Regulaciones Aplicables

- **GDPR (General Data Protection Regulation)**: Obligatorio para usuarios de la UE. Incluye el derecho al acceso, rectificación y supresión de datos ("derecho al olvido").

- **CCPA (California Consumer Privacy Act)**: Cumplimiento de transparencia y opción de exclusión para usuarios en California, EE. UU.

- **PCI-DSS (Payment Card Industry Data Security Standard)**: Cumplimiento delegado via SAQ-A. La plataforma no procesa, transmite ni almacena datos de titulares de tarjetas; la responsabilidad recae en las pasarelas (Flow, PayPal, Mercado Pago) mediante el uso de campos de pago embebidos o redirecciones.

- **Meta Messenger Policy**: Gestión híbrida de mensajería. Uso de ventana estándar de 24h para flujos de venta activos. Para interacciones fuera de ventana, se implementará el Tag 'POST_PURCHASE_UPDATE' para transacciones y el sistema de 'One-Time Notification' (OTN) para alertas de re-stock, asegurando cumplimiento total con las políticas de SPAM de Meta.

- **HIPAA**: No aplicable inicialmente, a menos que el SaaS se expanda al sector salud (gestión de recetas o datos médicos).

```

## Contract
- **Test File:** `tests/contracts/slice-045.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 16. Compliance y Legal > 16.1 Regulaciones Aplicables"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-045.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<24 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 45`
