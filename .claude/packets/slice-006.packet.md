# SLICE PACKET 6

## Metadata
- **Slice:** 6
- **Name:** DATABASE: 4.1 Diseño de Datos
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 4. Bases de Datos y Almacenamiento > 4.1 Diseño de Datos (líneas 210-247).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 4. Bases de Datos y Almacenamiento > 4.1 Diseño de Datos
- **Lines:** 210-247
- **Estimated Lines:** 76
- **Priority:** critical

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `834e3bf02180cd88e951a95a2785848aaec92387f9c6f40c496f593b8aa7fc19`

## PRD Content (exact text for this slice)
```markdown
### 4.1 Diseño de Datos

- **Modelo de datos conceptual**: Vendedor -> Tiendas -> Productos -> Pedidos -> Clientes.

- **Esquemas de bases de datos (PostgreSQL - Supabase)**: 

**Tabla**	|	**Propósito**	|	**Campos Clave**

vendedores	|	Perfil del suscriptor SaaS	|	id, email, full_name, ui_lang, timezone, created_at

tiendas	|	Configuración de la Fanpage	|	id, vendedor_id, fb_page_id, name, country, currency, locale

fb_sessions	|	Gestión de tokens de Meta	|	id, tienda_id, page_access_token_enc, user_access_token_enc, expires_at

productos	|	Catálogo e inventario	|	id, tienda_id, sku (unique), name, description, price, stock, image_url

live_events	|	Sesiones de streaming	|	id, tienda_id, fb_live_id, title, status (active/finished), started_at

pedidos	|	Transacciones de venta	|	id, tienda_id, live_id, customer_fb_id, total, status (pending/paid/expired)

pedido_items	|	Detalle de SKUs en pedido	|	id, pedido_id, producto_id, quantity, unit_price

config_pagos	|	Credenciales de pasarelas	|	id, tienda_id, gateway (paypal/flow/mp), settings (jsonb_enc)

ai_logs	|	Auditoría de decisiones IA	|	id, live_id, raw_comment, detected_sku, detected_intent, confidence_score

subscriptions	|	Plan de pago del vendedor	|	id, vendedor_id, plan_type (starter/pro), status, period_end
  
- **Constraints e Índices**: 

	- UNIQUE(tienda_id, sku): Evita duplicados de SKU dentro de una misma tienda.

	- idx_live_events_status: Para consultas rápidas de transmisiones activas.

	- FK con ON DELETE CASCADE en sesiones y logs vinculados a tiendas.

- **Versionamiento de esquemas**: Migraciones gestionadas vía Supabase CLI (archivos SQL en / migrations).

```

## Contract
- **Test File:** `tests/contracts/slice-006.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 4. Bases de Datos y Almacenamiento > 4.1 Diseño de Datos"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-006.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<76 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 6`
