# SLICE PACKET 25

## Metadata
- **Slice:** 25
- **Name:** FRONTEND: 8.3 Performance Frontend
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 8. Frontend (si aplica) > 8.3 Performance Frontend (líneas 703-726).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 8. Frontend (si aplica) > 8.3 Performance Frontend
- **Lines:** 703-726
- **Estimated Lines:** 48
- **Priority:** medium

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `2365b7b354d28db4ad8340d7d185bec9ce046d057babc5a4b7f94bc570756b68`

## PRD Content (exact text for this slice)
```markdown
### 8.3 Performance Frontend

- **Code Splitting**:

	- Route-based Splitting: Uso nativo de Next.js App Router para cargar solo el JS necesario por ruta.

	- Component Lazy Loading: Uso de dynamic() para cargar componentes pesados (ej: gráficos de analítica en el Dashboard) solo cuando el usuario navega a esa sección.

- **Asset Optimization**:

	- Imágenes: Implementación de next/image para servirlas en formato WebP/AVIF, con tamaños adaptativos (srcset) y lazy loading automático.

	- Fonts: Uso de next/font para auto-hostear Google Fonts sin Layout Shift (CLS) y reducir peticiones externas.

	- Bundling: Minimización de CSS mediante Tailwind (Tree-shaking de clases no usadas) y compresión de assets vía Gzip/Brotli.

- **Caching Strategy**:

	- Service Workers: Implementación de PWA (Progressive Web App) con caché offline para que el vendedor no pierda acceso al inventario si tiene micro-cortes de internet.

	- CDN: Despliegue en Vercel o Cloudflare para servir assets estáticos desde el nodo más cercano al usuario.

	- Stale-While-Revalidate: Configuración de React Query para mostrar datos instantáneos (aunque sean antiguos) mientras se sincroniza el stock real en segundo plano.

```

## Contract
- **Test File:** `tests/contracts/slice-025.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 8. Frontend (si aplica) > 8.3 Performance Frontend"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-025.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<48 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 25`
