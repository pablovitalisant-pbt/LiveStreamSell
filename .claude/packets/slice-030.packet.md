# SLICE PACKET 30

## Metadata
- **Slice:** 30
- **Name:** CICD: 11.2 Estrategia de Deployment
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 11. CI/CD y Deployment > 11.2 Estrategia de Deployment (líneas 983-1012).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 11. CI/CD y Deployment > 11.2 Estrategia de Deployment
- **Lines:** 983-1012
- **Estimated Lines:** 60
- **Priority:** high

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `a43e94a19e77fee2ef86606c9c745e332c80aa353a330617b9828864a1cf5604`

## PRD Content (exact text for this slice)
```markdown
### 11.2 Estrategia de Deployment

- **Ambientes**:

	- Development: Entorno local de cada desarrollador (Docker Compose) conectado a una base de datos de pruebas en Supabase.

	- Staging: Réplica exacta de producción en Render.com. Se utiliza para el "App Review" de Meta y para que el equipo de QA valide funcionalidades antes del paso final. Usa datos sintéticos.

	- Production: Entorno de alta disponibilidad con auto-scaling habilitado. Solo se despliega código firmado y validado.

- **Estrategia de Release**:

	- Canary Deployment: Se despliega la nueva versión al 5% de los usuarios/vendedores. Si las métricas de error 5xx y latencia del bot se mantienen estables durante 10 minutos, se escala al 100%.

	- Rolling Updates: Para actualizaciones menores de la UI del Dashboard, se reemplazan las instancias una a una para asegurar que el servicio nunca se interrumpa.

- **Feature Flags**:

	- Herramienta: PostHog (integrado con el SDK de Python y React).

	- Estrategia: Despliegue de nuevas integraciones de pago (ej: PayPal internacional) apagadas por defecto. Se habilitan por ID de usuario para "Beta Testers" antes del lanzamiento general. Permite el "Kill Switch" inmediato si una pasarela falla.

- **Rollback Plan**:

	- Automático: El pipeline de CI/CD dispara un rollback automático si el Health Check de Render falla 3 veces seguidas tras el despliegue o si los errores 5xx aumentan un 15% en el primer minuto.

	- Manual: Botón de "Promote Previous Build" en el panel de control de despliegue.

	- Condiciones: Inconsistencia de datos en BD (requiere revertir migración), latencia de la IA > 10s post-release, o fallos críticos en el webhook de Meta.

```

## Contract
- **Test File:** `tests/contracts/slice-030.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 11. CI/CD y Deployment > 11.2 Estrategia de Deployment"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-030.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<60 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 30`
