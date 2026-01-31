# SLICE PACKET 43

## Metadata
- **Slice:** 43
- **Name:** OTHER: 11.3 Infrastructure as Code
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 11. CI/CD y Deployment > 11.3 Infrastructure as Code (líneas 1013-1044).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 11. CI/CD y Deployment > 11.3 Infrastructure as Code
- **Lines:** 1013-1044
- **Estimated Lines:** 64
- **Priority:** medium

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `fea77daedccafb1c3d21f83ea7ef2ad23d26da0693b6dbd935e40230f6c5e3de`

## PRD Content (exact text for this slice)
```markdown
### 11.3 Infrastructure as Code

- **Herramienta**: Terraform. Se elige por su capacidad de manejar múltiples proveedores (Multi-cloud) y su gran comunidad. Permite documentar y replicar la infraestructura de forma declarativa.

- **Organización**:

	- Módulos: Separación por componentes lógicos:

		- modules/networking: VPCs, subredes y reglas de firewall.

		- modules/compute: Configuración de servicios en Render (Web Services y Background Workers).

		- modules/database: Configuración de instancias de Supabase y extensiones de Postgres.

		- modules/storage: Buckets de S3 para backups y almacenamiento de imágenes de productos.

- **Workspaces**: Uso de espacios de trabajo para separar estados de staging y production, evitando colisiones y errores de configuración cruzada.

- **State Management**: El archivo de estado (terraform.tfstate) se almacena de forma remota en un bucket de S3 con State Locking (vía DynamoDB o el backend nativo de Terraform Cloud) para permitir el trabajo colaborativo sin corrupción de datos.

- **Recursos Gestionados**:

	- Networking: Configuración de dominios, certificados SSL (via Cloudflare/Render) y redirecciones.

	- Compute: Definición de variables de entorno, escalado automático (min/max instances) y límites de recursos (CPU/RAM).

	- Databases: Provisionamiento de tablas, roles de base de datos y políticas de seguridad (RLS) en Supabase.

	- Monitoring: Configuración automática de Dashboards en Grafana y reglas de alerta en Prometheus a través de código.

	- Secretos: Integración con Vault o el gestor de secretos de la plataforma para inyectar llaves de API sin exponerlas en el código de IaC.

```

## Contract
- **Test File:** `tests/contracts/slice-043.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 11. CI/CD y Deployment > 11.3 Infrastructure as Code"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-043.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<64 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 43`
