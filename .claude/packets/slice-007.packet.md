# SLICE PACKET 7

## Metadata
- **Slice:** 7
- **Name:** DATABASE: 4.2 Tipos de Almacenamiento
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 4. Bases de Datos y Almacenamiento > 4.2 Tipos de Almacenamiento (líneas 248-267).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 4. Bases de Datos y Almacenamiento > 4.2 Tipos de Almacenamiento
- **Lines:** 248-267
- **Estimated Lines:** 40
- **Priority:** critical

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `a5b5dfb32d65eee02e3bd793e552ad23ce120dbdf3e080dd75df000aa93ff2e5`

## PRD Content (exact text for this slice)
```markdown
### 4.2 Tipos de Almacenamiento

- **Bases de datos relacionales**: PostgreSQL (vía Supabase). Se utiliza para todos los datos transaccionales, configuración de tiendas, gestión de inventario, pedidos y perfiles de usuario. Es la fuente de verdad principal debido a su cumplimiento ACID.

- **NoSQL (Key-Value)**: Redis (vía Upstash). Utilizado exclusivamente para datos volátiles y de alta velocidad que no requieren persistencia a largo plazo, como estados de sesión efímeros.

- **Búsqueda**: PostgreSQL Full-Text Search para búsquedas básicas de catálogo. Proyección a Algolia para el Dashboard del vendedor si el catálogo supera los 1,000 productos para ofrecer búsqueda instantánea "as-you-type".

- **Cache**: Redis.
	
	- Qué cachear: Catálogos de productos activos durante un Live, tokens de acceso de Facebook validados, y respuestas frecuentes de la IA.

	- TTL: 15 minutos para catálogos; 24h para sesiones de FB.

	- Estrategia: Cache-aside para productos y Write-through para sesiones de usuario.

- **Object storage**: Supabase Storage (basado en S3). Almacenamiento de imágenes de productos subidas por vendedores y backups comprimidos de logs antiguos.

- **Data warehousing**: BigQuery. Se exportan semanalmente los ai_logs y pedido_items para análisis de tendencias de mercado globales, efectividad de la IA y reportes financieros complejos.

```

## Contract
- **Test File:** `tests/contracts/slice-007.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 4. Bases de Datos y Almacenamiento > 4.2 Tipos de Almacenamiento"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-007.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<40 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 7`
