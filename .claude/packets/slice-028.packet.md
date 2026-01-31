# SLICE PACKET 28

## Metadata
- **Slice:** 28
- **Name:** TESTING: 10.3 Test Data
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 10. Testing > 10.3 Test Data (líneas 917-944).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 10. Testing > 10.3 Test Data
- **Lines:** 917-944
- **Estimated Lines:** 56
- **Priority:** high

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `a21f95e4e88b00f771aa37673c5873517f42155a103bb0a8aa5df4a722b49a25`

## PRD Content (exact text for this slice)
```markdown
### 10.3 Test Data

- **Fixtures (Datos de prueba estáticos)**:

	- Uso de archivos JSON/YAML para definir estados conocidos de la base de datos (ej: un catálogo estándar con 10 productos, una Fanpage vinculada y pedidos en diferentes estados).

	- Implementación de pytest-fixtures para inyectar estos estados de forma limpia antes de cada test.

- **Seeding (Población de base de datos)**:

	- Factory Boy / Faker: Generación dinámica de miles de comentarios, nombres de usuarios y transacciones ficticias para las pruebas de carga en el entorno de Staging.

	- Scripts de Seed: Scripts automatizados en Supabase/PostgreSQL para resetear y repoblar la base de datos de test en cada ejecución del pipeline de CI/CD.

- **Anonimización (Uso de datos de producción)**:

	- Política de Privacidad: Queda estrictamente prohibido el uso de datos de producción (nombres reales, PSIDs de Facebook, teléfonos) en entornos de desarrollo o test sin anonimizar.

	- Proceso de Sanitización: Si se requiere un volcado de producción para debugear un caso complejo, se ejecutará un script de ofuscación que:

		- Reemplaza nombres por "User [ID]".

		- Enmascara correos electrónicos y tokens de acceso.

		- Trunca o altera los montos de las transacciones manteniendo la coherencia lógica pero perdiendo la identidad financiera.

	- Synthetic Data: Preferencia por el uso de datos sintéticos generados por IA que imiten el comportamiento de compra real sin comprometer la seguridad de los usuarios.

```

## Contract
- **Test File:** `tests/contracts/slice-028.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 10. Testing > 10.3 Test Data"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-028.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<56 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 28`
