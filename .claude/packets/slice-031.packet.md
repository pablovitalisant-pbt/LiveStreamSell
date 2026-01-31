# SLICE PACKET 31

## Metadata
- **Slice:** 31
- **Name:** CICD: 11.4 Configuración
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 11. CI/CD y Deployment > 11.4 Configuración (líneas 1045-1088).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 11. CI/CD y Deployment > 11.4 Configuración
- **Lines:** 1045-1088
- **Estimated Lines:** 88
- **Priority:** high

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `679f0917516bc3963c95d286f93d6a9b5027a2a9966af6fc7d98c91a52c1c4d9`

## PRD Content (exact text for this slice)
```markdown
### 11.4 Configuración

- **Configuration Management**:

	- Environment Variables: Uso de variables de entorno para configuraciones dinámicas. En el backend (FastAPI), se gestionan mediante Pydantic Settings para validación en tiempo de ejecución.

	- Config Files: Archivos .yaml o .json para configuraciones estáticas no sensibles (ej: límites de tasa de la API, tiempos de expiración de sesión).

- **Almacenamiento**:

	- Git (Configuración No Sensible): Solo se versionan los archivos de configuración base y plantillas .env.example.

	- Render Secrets: Para secretos de infraestructura propia (OpenAI API Key, passwords de base de datos, Meta App Secret). Se inyectan como variables de entorno.
	
	- Supabase Vault: Para secretos dinámicos de clientes (Access Tokens de Facebook de cada vendedor, API Keys de sus pasarelas de pago). Permite cifrado a nivel de fila y aislamiento por usuario.

	- Infraestructura: Los parámetros de infraestructura se gestionan en los archivos .tfvars de Terraform, los cuales nunca se suben a Git (se guardan en Terraform Cloud o S3 cifrado).

- **Diferencias por Ambiente**:

- **Development**:

	- DEBUG=True, LOG_LEVEL=DEBUG.

	- Conexión a DB local o Supabase "Dev Project".

	- Mocks habilitados para Meta y Pasarelas de Pago.

- **Staging**:

	- DEBUG=False, LOG_LEVEL=INFO.

	- Conexión a réplica de DB de producción.

	- Integración con Sandbox de Meta y Sandbox de Pasarelas de Pago.

- **Production**:

	- DEBUG=False, LOG_LEVEL=ERROR/WARNING.

	- Conexión a DB de producción con escalado de lectura habilitado.

	- URLs de producción para Webhooks y API de Meta. SSL forzado HSTS.

```

## Contract
- **Test File:** `tests/contracts/slice-031.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 11. CI/CD y Deployment > 11.4 Configuración"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-031.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<88 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 31`
