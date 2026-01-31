# SLICE PACKET 9

## Metadata
- **Slice:** 9
- **Name:** DATABASE: 16.2 Data Residency (Residencia de Datos)
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 16. Compliance y Legal > 16.2 Data Residency (Residencia de Datos) (líneas 1383-1390).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 16. Compliance y Legal > 16.2 Data Residency (Residencia de Datos)
- **Lines:** 1383-1390
- **Estimated Lines:** 16
- **Priority:** critical

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `efab754d4d6bcc0a5a4951fb1ba2388272b1f7b9a6d29bdf156fd9a8df4015da`

## PRD Content (exact text for this slice)
```markdown
### 16.2 Data Residency (Residencia de Datos)

- **Localización**: Los datos se almacenan principalmente en la región us-east-1 (Virginia) a través de Supabase y AWS.

- **Soberanía de Datos**: Capacidad técnica (vía Terraform) para desplegar instancias de base de datos en regiones específicas (ej: AWS Frankfurt) si un cliente corporativo requiere que sus datos no salgan de la jurisdicción de la UE.

- **Transferencia Internacional**: Uso de Cláusulas Contractuales Tipo (SCC) para la transferencia legal de datos entre Latam y los centros de datos en EE. UU.

```

## Contract
- **Test File:** `tests/contracts/slice-009.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 16. Compliance y Legal > 16.2 Data Residency (Residencia de Datos)"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-009.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<16 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 9`
