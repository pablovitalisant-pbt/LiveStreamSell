# SLICE PACKET 24

## Metadata
- **Slice:** 24
- **Name:** FRONTEND: 8.2 UI/UX
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 8. Frontend (si aplica) > 8.2 UI/UX (líneas 621-702).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 8. Frontend (si aplica) > 8.2 UI/UX
- **Lines:** 621-702
- **Estimated Lines:** 164
- **Priority:** medium

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `10d483a04ce2de2c38671e2935ea0d195872ac2bc63d7e17cd3b64f6aa31a087`

## PRD Content (exact text for this slice)
```markdown
### 8.2 UI/UX

- **Design System**:

	- Paleta de Colores:

		- Primario: #0866ff (Indigo) para acciones principales.

		- Fondo: #09090b (Zinc-950) para un Dark Mode sofisticado.

		- Éxito: #67FF08 (Emerald) para confirmaciones de pago.

	- Tipografía: Inter o Geist (Sans-serif) para máxima legibilidad en dashboards densos en datos.

	- Espaciado: Sistema de grilla basado en 4px (Tailwind spacing scale) para mantener consistencia.

- **Wireframes y Pantallas**:

- Detalle de Pantallas y Subpantallas:

	1. Onboarding Wizard (Flujo Inicial):

		- Paso 1: Perfil de Negocio: Selección de país, moneda base e idioma de atención.

		- Paso 2: Integración Meta: Botón de login con FB, selección de Fanpage y validación de permisos de Messenger.

		- Paso 3: Configuración de Pagos: Activación de pasarelas (Flow, MP, PayPal) o ingreso de datos para transferencia manual.

		- Paso 4: Importación de Catálogo: Carga masiva vía CSV o vinculación con catálogo de Facebook.

	2. Dashboard Principal (Vista General):

		- Subpantalla: Resumen de Ventas: Kpis de ingresos totales, pedidos pendientes y tasa de conversión del mes.

		- Subpantalla: Historial de Lives: Listado de transmisiones pasadas con métricas de comentarios procesados y ventas generadas.

	3. Live Control Center (Pantalla de Operación):

		- Módulo: Stream de Comentarios: Feed en tiempo real con tags de IA (Interés de compra, Duda, Saludo).

		- Módulo: Gestión de Ventas: Lista de carritos creados, links enviados y estado de pago (Pendiente/Aprobado).

		- Módulo: Inventario Rápido: Buscador de SKUs y ajuste de stock "on-the-fly" durante la transmisión.

	4. Gestión de Inventario:

		- Subpantalla: Lista de Productos: CRUD completo con filtros por categoría y alertas de stock bajo.

		- Subpantalla: Editor de Producto: Carga de imágenes, variantes (talla/color) y palabras clave para la detección de la IA.

	5. Pedidos y Logística:

		- Subpantalla: Listado de Pedidos: Filtros por estado (Por despachar, Pagado, Cancelado).

		- Subpantalla: Detalle del Pedido: Información del cliente (PSID de FB), desglose de productos y logs de interacción de la IA.

	6. Mobile Checkout (Vista del Comprador):

		- Pantalla: Carrito Confirmado: Resumen de productos detectados por el bot.

		- Pantalla: Selección de Pago: Botones directos a pasarelas o copia de datos bancarios.

		- Pantalla: Confirmación de Éxito: Pantalla de agradecimiento con instrucciones de seguimiento.

- **Flujos de Usuario**:

	- Vendedor: Login FB -> Sync Page -> Upload CSV/Manual -> Start Live Monitor.

	- Comprador: Comenta en FB -> Recibe DM -> Click en Link -> Selección de Pago -> Confirmación.

- **Responsive Design**:

- Breakpoints:

	- Mobile (< 640px): Enfoque 100% en el Checkout y alertas de ventas para el vendedor.

	- Tablet (640px - 1024px): Vista de inventario y gestión de pedidos.

	- Desktop (> 1024px): Panel de control completo (Live Control Center) diseñado para ser usado en una segunda pantalla mientras se transmite.

- Comportamiento: Las tablas de inventario se convierten en "Cards" en mobile. El menú lateral se transforma en un "Drawer" inferior.

```

## Contract
- **Test File:** `tests/contracts/slice-024.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 8. Frontend (si aplica) > 8.2 UI/UX"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-024.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<164 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 24`
