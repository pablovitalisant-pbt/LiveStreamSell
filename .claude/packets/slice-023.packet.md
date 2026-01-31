# SLICE PACKET 23

## Metadata
- **Slice:** 23
- **Name:** FRONTEND: 8.1 Arquitectura Frontend
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 8. Frontend (si aplica) > 8.1 Arquitectura Frontend (líneas 585-620).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 8. Frontend (si aplica) > 8.1 Arquitectura Frontend
- **Lines:** 585-620
- **Estimated Lines:** 72
- **Priority:** medium

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `a24ea630dfbd2baa7d59cb60d1a11b7a7aa866605308f73a43cd23d791194a50`

## PRD Content (exact text for this slice)
```markdown
### 8.1 Arquitectura Frontend

- **Framework/biblioteca**: Next.js 14+ utilizando el App Router. Se elige por su soporte nativo para Server-Side Rendering (SSR) que optimiza el SEO de las landings y el rendimiento del Dashboard.

- **State Management**:

	- Zustand: Para el estado global ligero (preferencias de UI, datos básicos del usuario).

	- React Query (TanStack Query): Para el manejo de estado asíncrono, caching de inventario y sincronización con la base de datos de Supabase.

- **Routing**: Estrategia de File-based Routing (App Router).

	- /dashboard: Panel principal del vendedor.

	- /dashboard/inventory: Gestión de SKUs.

	- /dashboard/live: Monitorización del Live activo en tiempo real.

	- /checkout/[order_id]: Interfaz de pago para el comprador (optimizada para móviles).

	- /auth: Flujos de Login/Registro.

- **Estructura de Componentes**:

- Atomic Design:

	- atoms: Botones, inputs, badges de stock.

	- molecules: ProductCard, OrderSummary, SearchBar.

	- organisms: LiveMonitor (WebSocket log), InventoryTable, PaymentForm.

	- templates: DashboardLayout, AuthLayout.

- **Componentes Reutilizables**: Implementación de una librería de componentes interna basada en Shadcn/UI y Tailwind CSS para consistencia visual y accesibilidad (ARIA).

```

## Contract
- **Test File:** `tests/contracts/slice-023.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 8. Frontend (si aplica) > 8.1 Arquitectura Frontend"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-023.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<72 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 23`
