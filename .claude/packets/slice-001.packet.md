# SLICE PACKET 1

## Metadata
- **Slice:** 1
- **Name:** SETUP: 1. Definición del Proyecto y Negocio
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 1. Definición del Proyecto y Negocio (líneas 4-43).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 1. Definición del Proyecto y Negocio
- **Lines:** 4-43
- **Estimated Lines:** 80
- **Priority:** critical

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `e2bc5d872a83727dc1e24f68ce82fe2c51d04a3d3b3297368996e87f9e122ba9`

## PRD Content (exact text for this slice)
```markdown
## 1. Definición del Proyecto y Negocio

- **Visión y objetivos**: Plataforma SaaS "Global-First" para automatizar ventas en Facebook Live. Resuelve la gestión manual de pedidos mediante una IA que detecta intenciones de compra en múltiples idiomas, gestiona inventario y procesa pagos internacionales.

- **Propuesta de Valor Única (UVP)**: Eliminación del error humano en la toma de pedidos durante eventos de alto estrés (Lives) y democratización del acceso a mercados internacionales para PyMES

- **Casos de uso principales**:

	- Vendedor: Vincula Fanpage, configura país/moneda, carga catálogo (CSV/ERP) y recibe alertas de pago en tiempo real.

	- Comprador: Comenta en el Live; el bot detecta su idioma/geolocalización, confirma stock y ofrece medios de pago dinámicos (Link de Pago local, PayPal o Datos de Transferencia).

	- Stakeholders: Vendedores independientes (SMEs/PYMES), Compradores Globales, Administradores de la Plataforma.

- **Modelo de Monetización**: Modelo híbrido. Suscripción mensual por niveles (Starter/Pro) + comisión variable por transacción exitosa (opcional según el plan).

- **Métricas de éxito**:

	- Conversión: Tasa de comentarios que terminan en checkout exitoso.

	- Rendimiento: Latencia de respuesta < 3s para mantener el "momentum" del Live.

	- Disponibilidad: Uptime del 99.95% (garantizado por despliegue multi-región y failover activo entre instancias de Render/AWS).

- **Restricciones**:

	- Meta API: Ventana de 24h para mensajería y necesidad de App Review aprobado.

	- Seguridad: Cumplimiento de PCI-DSS mediante arquitectura delegada (SAQ-A), utilizando tokenización externa para evitar el procesamiento/almacenamiento de datos de tarjetas en servidores propios.

	- Legal: Normativas locales de impuestos (IVA en Chile, etc.) y divisas para giros internacionales.

- **Riesgos**:

	- Técnicos: Cambios repentinos en Meta Graph API, falsos positivos de la IA en detección de sarcasmo o dudas vs. compras.

	- Operativos: Bloqueos de cuenta de Meta por reportes de spam si el bot es demasiado agresivo.

	- Financieros: Volatilidad de tipos de cambio en pagos transfronterizos.

```

## Contract
- **Test File:** `tests/contracts/slice-001.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 1. Definición del Proyecto y Negocio"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-001.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<80 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 1`
