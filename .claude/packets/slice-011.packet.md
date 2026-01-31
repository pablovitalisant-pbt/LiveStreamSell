# SLICE PACKET 11

## Metadata
- **Slice:** 11
- **Name:** AUTH: 14.4 Equipo (Team Roles)
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 14. Costos y Recursos > 14.4 Equipo (Team Roles) (líneas 1251-1262).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 14. Costos y Recursos > 14.4 Equipo (Team Roles)
- **Lines:** 1251-1262
- **Estimated Lines:** 24
- **Priority:** critical

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `49475a62f5589480f1ba6f03404318bb60a73b88552de83ebbad40f3fbccc788`

## PRD Content (exact text for this slice)
```markdown
### 14.4 Equipo (Team Roles)

- **Product Owner / Lead Dev**: Definición de roadmap, arquitectura de la IA y conexión con la API de Meta.

- **Fullstack Developer**: Mantenimiento del Dashboard en Next.js y endpoints de gestión en FastAPI.

- **DevOps / Infra**: Gestión de Terraform, pipelines de CI/CD y monitoreo de salud del sistema.

- **Soporte Técnico / Customer Success**: Gestión de tickets, ayuda en el App Review de los clientes y configuración inicial de Fanpages.

- **Legal/Compliance (Outsourced)**: Revisión de términos y condiciones, y cumplimiento de normativas GDPR/PCI.

```

## Contract
- **Test File:** `tests/contracts/slice-011.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 14. Costos y Recursos > 14.4 Equipo (Team Roles)"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-011.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<24 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 11`
