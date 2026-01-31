# Planificación: LiveStreamSell AI (SaaS Global)


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

## 2. Requerimientos Funcionales y No Funcionales

### 2.1 Funcionalidades (FR)

- **Onboarding Localizado**: Detección de idioma vía headers del navegador y geolocalización por IP. En el flujo de compra, se priorizará los datos en este orden: 

	1. Selección manual del usuario (Override). 
	
	2. Locale de Facebook API. 
	
	3. Geolocalización por IP (Fallback).

- **Webhook de Alta Velocidad**: Procesamiento en tiempo real de comentarios con sistema de colas (Redis) para absorber picos de tráfico de hasta 1,000 comentarios por minuto y evitar pérdidas por los límites de tasa (rate-limiting) de la API de Meta.

- **NLP Avanzado**: Interpretación de modismos, detección de intenciones de compra y extracción de SKUs mediante modelos de lenguaje (LLM). Capacidad de discernir entre preguntas informativas e intenciones reales de adquisición.

- **Cierre de Venta Privado (DM Transition)**: El bot debe responder al comentario público del Live con una confirmación breve e iniciar inmediatamente el cierre de venta por mensaje privado (DM) de forma automática. Este flujo es mandatorio para cumplir con las políticas anti-spam de Meta (v. 2026) y proteger la privacidad financiera del cliente.

- **Generación Dinámica de Links de Pago**: Integración con PayPal, Mercado Pago y Flow. Los enlaces se generan de forma única por pedido y se entregan exclusivamente vía DM para asegurar que la transacción sea personal e intransferible.

- **Gestión de Inventario (Real-time Locking)**: Reserva temporal por 30 minutos. Tras este periodo, el stock se libera, pero el carrito persiste como "interés" sin reserva garantizada.

- **Dashboard de Control del Live**: Panel de monitorización en tiempo real para el vendedor. Permite visualizar pedidos entrantes, intervenir manualmente en conversaciones específicas o activar el "Kill Switch" para detener al bot instantáneamente ante cualquier anomalía.

### 2.2 Requerimientos No Funcionales (NFR)

- **Rendimiento**: Capacidad para procesar hasta 1,000 comentarios por minuto por cada transmisión en vivo.

- **Escalabilidad**: Arquitectura de Contenedores elásticos con auto-scaling basado en demanda (CPU/RAM). Optimización de instancias para responder a picos de tráfico en tiempo real.

- **Idempotencia**: Garantía de que un mismo comentario procesado múltiples veces (reintentos de webhook) no genere pedidos duplicados ni descuente stock erróneamente.

- **Disponibilidad**: Despliegue multi-región con failover automático para asegurar el servicio durante los Lives.

- **Seguridad**: Autenticación JWT, validación estricta de firmas de Webhooks (X-Hub-Signature) y almacenamiento de secretos en Vaults cifrados.

- **Usabilidad**: Interfaz de usuario (UI/UX) con i18n nativa y soporte para RTL (Right-to-Left) si se expande a mercados árabes.

- **Observabilidad**: Implementación de logging centralizado y dashboards de monitoreo (Grafana/Datadog) para visualizar la precisión de la IA en tiempo real.

## 3. Arquitectura del Sistema

### 3.1 Arquitectura General

- **Estilo**: Event-Driven (basado en eventos de Webhook) y Serverless. Se prioriza el desacoplamiento para que el fallo de un componente (ej. la API de IA) no detenga la recepción de eventos de Meta.

- **Flujo de Datos (Data Pipeline)**:

	1. Ingesta: Meta Webhook -> API Gateway (FastAPI) -> Validación de firma y filtrado rápido (Regex).

	2. Mensajería y Colas: Redis Streams para comunicación asíncrona y gestión de eventos en tiempo real (coherente con el stack de Upstash/Render).

	3. Procesamiento: Worker Asíncrono -> Consulta de Caché (Redis) para stock rápido -> AI Engine (Discernimiento de intención).

	4. Acción: Si hay intención de compra -> Bloqueo de Stock en DB (Supabase) -> Generación de Link (Payment Module) -> Response Worker.

	5. Salida: Meta Send API (Messenger).

### 3.2 Componentes Críticos y Patrones

- **Patrones de Diseño**:

	- Strategy: Para el módulo de pagos (permite intercambiar entre Flow, PayPal, Mercado Pago sin cambiar el core).

	- Circuit Breaker: Para las llamadas a la IA; si OpenAI falla repetidamente, el sistema entra en modo "Fallback" (respuestas predefinidas o alerta manual).

	- Saga Pattern (Coreografía): Para gestionar la transacción distribuida: Bloquear stock -> Generar pago -> Notificar. Si el pago falla o expira, se dispara la compensación (devolver stock).

- **Fronteras de Contexto (DDD)**:

	- Core Domain (Sales/Inventory): El corazón del negocio (la gestión del pedido y el stock).

	- Generic Subdomains (Identity/Payment): Funcionalidades necesarias pero que pueden delegarse a terceros.

	- Supporting Domain (Analytics): Procesamiento de métricas post-live.

### 3.3 Gestión de Estado y Persistencia

- **Capa de Datos**: Supabase (PostgreSQL) para datos persistentes.

- **Capa de Velocidad**: Redis para:

	- Rate Limiting: Evitar que Meta bloquee la app por exceso de mensajes.

	- Session State: Almacenar en qué etapa de la conversación está cada usuario de Facebook (ej: WAITING_FOR_PAYMENT_METHOD).

	- Idempotency Keys: Almacenar el mid (Message ID) de Facebook por 24h para no procesar dos veces el mismo comentario.

### 3.4 Componentes y Módulos

- **Frontend (Dashboard & Control)**:

	- Tecnología: Next.js (React) con Tailwind CSS.

	- Funciones: Gestión de catálogo, visualización de métricas del Live, configuración de pasarelas y switch de emergencia (Kill Switch).

- **Backend (Core API & Workers)**:

	- Tecnología: FastAPI (Python) para la API de alta concurrencia.

	- Workers de Procesamiento (TaskIQ): Elegido por su soporte nativo de asyncio, ideal para la naturaleza I/O intensiva de las APIs de Meta y pasarelas de pago.

- **Módulos / Slices de Dominio**:

	- auth: Gestión de JWT y permisos de Facebook Business.

	- facebook_integration: Manejo de Webhooks entrantes y la API de envío de Messenger. Incluye validación de firmas X-Hub-Signature.

	- inventory_manager: Fuente de verdad atómica. Gestiona el "Locking" (reserva temporal) y decremento final de stock.

	- ai_localization: Orquestación de LLMs (GPT-4o/Gemini). Traduce el contexto de la tienda al idioma del cliente y extrae SKUs.

	- payment_gateway: Abstracción de pasarelas (Flow, PayPal, Mercado Pago). Maneja tanto la generación de links como los Webhooks de confirmación (Inbound).

- **Dependencias e Interdependencia**:

	- Flujo Circular de Consistencia:

		1. ai_localization interpreta la intención.

		2. inventory_manager reserva el SKU por X minutos.

		3. payment_gateway genera el cobro asociado a esa reserva.

		4. messenger_integration entrega la solución al cliente.

	- Módulo de Compensación (Saga): Encargado de liberar el stock en inventory_manager si el payment_gateway no recibe una confirmación de pago exitosa tras el tiempo de expiración.

- **Capa Transversal (Infrastructure)**:

	- observability_module: Centraliza logs y trazas (OpenTelemetry) para auditar errores en la cadena (ej. por qué falló un pago o por qué la IA no detectó un SKU).

### 3.5 Infraestructura

- **Cloud Providers**:

	- Cómputo: Render.com (Elegido por su facilidad de despliegue de contenedores y auto-escalado).

	- BaaS (Backend as a Service): Supabase (PostgreSQL, Auth, Edge Functions).

- **Regiones y Latencia**:

	- Ubicación: AWS us-east-1 (Virginia) para Supabase y Render. Mantener ambos servicios en la misma región física reduce la latencia de red a < 10ms.

- **Networking y Disponibilidad**:

	- DNS/CDN/WAF: Cloudflare. Implementación de reglas de firewall para mitigar ataques DDoS y protección contra scraping.

	- Estrategia "Keep-Alive" (El Despertador): Uso de cron-jobs externos (Cron-job.org o GitHub Actions) que realizan pings al endpoint /health cada 5 minutos.

	- Deep Health Checks: El endpoint /health realiza una verificación sintética de conexión a PostgreSQL y Redis antes de devolver un 200 OK.

- **Compute & Scaling**:

	- Web Service: Instancias de Render con Auto-scaling activado (mínimo 1, máximo 10 según uso de CPU).

	- Background Workers: Instancias separadas para el procesamiento de IA, evitando que la latencia del LLM bloquee la recepción de nuevos Webhooks de Meta.

- **Seguridad e Infra**:

	- Gestión de Secretos: Uso de Environment Variables cifradas en Render y Supabase Vault para llaves privadas de clientes.

	- SSL/TLS: Encriptación forzada de extremo a extremo (End-to-End Encryption).

## 4. Bases de Datos y Almacenamiento

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

### 4.3 Estrategias de Datos

- **Backup y recuperación**: Diarios automáticos en Supabase (Plan Pro). RPO 24h / RTO 2h.

- **Replicación**: 

	- Read Replicas: Uso de réplicas de lectura en Supabase para el Dashboard de analíticas, descargando la base de datos primaria de las escrituras intensivas de los Webhooks.

	- Multi-region: Réplica asíncrona en una región secundaria (ej. sa-east-1) para Disaster Recovery y lectura local para clientes en Latinoamérica.

- **Consistencia**: Fuerte (Strong) para Inventario y Pagos (para evitar sobreventa); Eventual para ai_logs, analíticas y métricas del Dashboard.

## 5. APIs y Contratos de Interfaz

### 5.1 API Design

- **Estilo**: 

	- REST: Arquitectura principal para la comunicación entre el Frontend (Dashboard) y el Backend (FastAPI). Uso de métodos estándar (GET, POST, PUT, DELETE).

	- WebSockets: Implementado para el Dashboard del vendedor. Permite la actualización en tiempo real de "Nuevos Comentarios" y "Ventas Confirmadas" sin necesidad de refrescar la página durante un Live.

	- Webhooks: Recepción de eventos asíncronos desde Meta (comentarios) y Pasarelas de Pago (confirmaciones de transacciones).

- **Versionamiento**: Estrategia por URL: /api/v1/.... Permite mantener compatibilidad con versiones anteriores mientras se despliegan mejoras disruptivas.

- **Documentación**: 

	- OpenAPI/Swagger: Generación automática de documentación técnica interactiva accesible en /docs. Incluye esquemas de modelos, ejemplos de request/response y validación de tipos mediante Pydantic.

	- Postman Collection: Exportable para pruebas rápidas de integración.

### 5.2 Endpoints Detallados

- **A. Webhook de Facebook (Ingesta de Comentarios)**

	- Método y Ruta: POST /api/v1/webhooks/facebook

	- Autenticación: Validación de firma X-Hub-Signature-256 (SHA256 del body con el App Secret).

	- Body (JSON):

{
  "object": "page",
  "entry": [{
    "id": "PAGE_ID",
    "messaging": [{
      "sender": { "id": "PSID" },
      "message": { "text": "Quiero 2 de la polera roja" }
    }]
  }]
}


	- Respuestas: 200 OK (procesado), 403 Forbidden (firma inválida).

	- Rate Limiting: Según límites de Meta (600 calls/person/minute).

- **B. Gestión de Inventario (CRUD Productos)**

	- Método y Ruta: GET /api/v1/inventory/products

	- Auth: Bearer Token (Supabase JWT).

	- Query Params: tienda_id (uuid), limit (int), offset (int).

	- Response (200):

[{
  "id": "uuid",
  "sku": "POL-ROJ-M",
  "name": "Polera Roja M",
  "stock": 15,
  "price": 15000
}]


	- Errores: 401 Unauthorized, 404 Not Found.

- **C. Creación de Pedido y Link de Pago**

	- Método y Ruta: POST /api/v1/orders/create

	- Auth: Interna (API Key entre módulos) o Bearer para Dashboard.

	- Body (JSON):

{
  "tienda_id": "uuid",
  "customer_fb_id": "string",
  "items": [{ "sku": "string", "qty": 1 }],
  "gateway": "flow"
}


	- Response (201):

{
  "order_id": "uuid",
  "payment_url": "[https://flow.cl/pay/](https://flow.cl/pay/)...",
  "status": "pending"
}


	- Errores: 400 Bad Request (Sin stock), 422 Unprocessable Entity (Esquema inválido).

- **D. Health Check (El Despertador)**

	- Método y Ruta: GET /health

	- Propósito: Mantener la instancia de Render despierta vía Cron-job.org.

	- Response: 200 OK {"status": "alive", "timestamp": "..."}.

### 5.3 Integraciones Externas

- **A. APIs de Terceros**

API	|	Propósito	|	Credenciales Necesarias

Meta Graph API	|	Ingesta de comentarios, envío de DMs, analítica de Live.	|	App ID, App Secret, Page Access Token (Long-lived).

OpenAI / Gemini / OpenRouter	|	Procesamiento de lenguaje natural (NLP) e intención de compra.	|	API Key (almacenada en Secret Manager).

Flow / Mercado Pago	|	Generación de links de pago y conciliación.	|	API Key, Secret Key, Merchant ID.

PayPal SDK	|	Pagos internacionales.	|	Client ID, Secret Key.

Google Cloud	|	Exportación de datos a BigQuery para analítica.	|	Service Account Key (JSON).

- **B. Webhooks (Entrada y Salida)**

- Eventos de entrada:

	- feed_comment: Comentario nuevo en el Live (Meta).

	- payment_success: Confirmación de pago (Pasarelas).

	- payment_failure: Intento de pago fallido o expirado.

- **Payload Base**:

{ "event": "string", "timestamp": "ISO8601", "data": { ... } }


- **Retry Logic**:

	- Exponencial Backoff: 5 reintentos (10s, 1m, 5m, 15m, 1h).

	- Idempotencia: Uso de X-Idempotency-Key (basada en el comment_id o transaction_id) para evitar procesar dos veces el mismo evento.

- **C. Mensajería y Colas (Event Schemas)**

	- Tecnología: Redis Streams o FastAPI Background Tasks (para el MVP).

	- Queues:

		- incoming_comments: Cola de alta prioridad para ingesta de Webhooks.

		- ai_processing: Tareas pesadas de análisis de lenguaje.

		- notification_delivery: Envío de mensajes de respuesta a Messenger.

- **Event Schema (Ejemplo ai_processing)**:

{
  "comment_id": "str",
  "text": "quiero la roja",
  "context": { "tienda_id": "uuid", "live_id": "uuid" },
  "schema_version": "1.0"
}


## 6. Autenticación y Autorización

### 6.1 Estrategia de Identidad

- **Método de autenticación**: Basado en JWT (JSON Web Tokens) para sesiones sin estado y OAuth2 específicamente para la integración con Facebook Login.

- **Providers**: Supabase Auth como orquestador principal, actuando como puente para el Social Login de Facebook.

### 6.2 Modelo de Permisos

- **Modelo**: RBAC (Role-Based Access Control).

- **Roles y Matriz de Permisos**:

Rol	|	Descripción	|	Permisos Clave

Owner (Vendedor)	|	Dueño de la tienda	|	CRUD Productos, Vincular FB Page, Ver Ventas, Configurar Pagos, Gestionar Suscripción.

Staff (Vendedor)	|	Empleado de la tienda	|	Ver inventario, marcar pedidos como entregados, ver dashboard de Live activo. (No puede cambiar pasarelas).

SuperAdmin (SaaS)	|	Operador del sistema	|	Ver métricas globales, gestionar planes, soporte técnico, acceso a ai_logs.

System (Internal)	|	Bot/Service Account	|	Escribir en ai_logs, actualizar stock, crear pedidos vía Webhook.

### 6.3 Gestión de Tokens

- **Generación**: Supabase genera un access_token (JWT corto) y un refresh_token (larga duración) tras el login exitoso.

- **Refresh**: El cliente (Next.js) refresca el token automáticamente en segundo plano antes de la expiración.

- **Revocación**: Implementada mediante el borrado de la sesión en Supabase y lista negra (blacklist) en Redis para tokens comprometidos si fuera necesario.

- **Expiración**: access_token (1 hora), refresh_token (normalmente 30 días o hasta logout).

### 6.4 Seguridad Adicional (MFA)

- **Multi-Factor Authentication (MFA)**: Obligatorio para el rol de Owner si el volumen de ventas supera un umbral de seguridad.

- **Métodos**:

	- TOTP (Authenticator Apps): Recomendado para el Dashboard.

	- Backup Codes: Generados una única vez durante el enrolamiento de MFA.

## 7. Seguridad

### 7.1 Secretos y Credenciales

- **Gestión de secretos**:

	- Entorno de Ejecución: Uso de Render Secret Files y Environment Groups para inyectar llaves en caliente sin persistirlas en Git.

	- Persistencia de Larga Duración: Uso de Supabase Vault (pgrst_vault) para almacenar los tokens de acceso de las páginas de Facebook de los clientes de forma cifrada a nivel de base de datos.

- **Qué secretos se necesitan**:

	- Infraestructura: DATABASE_URL, SUPABASE_SERVICE_ROLE_KEY, REDIS_URL.

	- Integraciones: FB_APP_SECRET, FB_WEBHOOK_VERIFY_TOKEN, OPENAI_API_KEY.

	- Cifrado: ENCRYPTION_KEY_AES256 (para los tokens de los clientes).

- **Rotación**:

	- Política: Rotación de API Keys de proveedores cada 90 días o inmediatamente ante sospecha de leak.

	- Automatización: Uso de scripts internos para actualizar FB_PAGE_ACCESS_TOKENS antes de su expiración (Long-lived tokens de 60 días).

- **Acceso**:

	- El servicio de Background Worker tiene acceso exclusivo a las llaves de IA y Pagos.

	- El servicio de Webhook API solo accede a las llaves de validación de Meta.

	- Acceso humano restringido mediante Supabase Dashboard MFA para administradores.

### 7.2 Seguridad de Aplicación

- **Validación de Input**:

	- Sanitización: Uso de librerías como bleach para limpiar HTML/JS malicioso en campos de texto de productos.

	- Validación de Schemas: Implementación estricta de Pydantic en FastAPI para asegurar que todos los payloads de entrada cumplan con los tipos y rangos definidos.

- **Protección contra ataques comunes**:

	- SQL Injection: Uso mandatorio de SQLAlchemy ORM y consultas parametrizadas; prohibición de queries "raw" concatenadas.

	- XSS (Cross-Site Scripting): Escapado automático de caracteres en Next.js y políticas de seguridad de cookies.

	- CSRF (Cross-Site Request Forgery): Protección mediante validación de origen (CORS) y tokens CSRF en formularios críticos del Dashboard.

	- Clickjacking: Header X-Frame-Options: DENY para evitar que el Dashboard sea embebido en sitios maliciosos.

- **Encriptación**:

	- En Tránsito: TLS 1.3 forzado en todos los endpoints mediante Render y Cloudflare.

	- En Reposo: Cifrado AES-256 para tokens de terceros en DB y cifrado nativo de disco de AWS/Supabase para el resto de la base de datos.

- **Headers de Seguridad**:

	- Content Security Policy (CSP): Restricción de scripts externos para que solo se ejecuten desde dominios confiables (Meta, Sentry, Cloudflare).

	- HSTS (HTTP Strict Transport Security): Instrucción al navegador para usar solo HTTPS durante 1 año.

- **Auditoría**:

	- Logging de Accesos: Registro de IPs, User-agents y timestamps de cada login y fallo de auth.

	- Registro de Cambios (Audit Log): Tabla de auditoría en DB que registra quién cambió el precio de un producto o modificó una pasarela de pago.

	- Eventos de Seguridad: Alertas automáticas en Slack/Email ante múltiples fallos de login desde una misma IP.

### 7.3 Infraestructura

- **Firewall Rules**:

	- Puertos: Solo puertos 443 (HTTPS) y 80 (redirección a 443) abiertos al público. Puertos internos como 5432 (Postgres) y 6379 (Redis) cerrados al tráfico externo.

	- IP Whitelisting: Restricción de acceso al endpoint de Webhook para aceptar tráfico únicamente desde los rangos de IP oficiales de Meta (Facebook).

- **Security Groups**:

	- Web Service (FastAPI): Permite tráfico entrante desde Cloudflare/Render Load Balancer.

	- Database (Supabase): Permite tráfico entrante únicamente desde las IPs estáticas de la instancia de backend en Render.

	- Internal Workers: Sin acceso entrante desde el exterior; solo salida para llamadas a APIs de IA y Pagos.

- **Penetration Testing**:

	- Frecuencia: Una vez al año por una empresa externa certificada.

	- Alcance: Pruebas de "Caja Negra" en la API pública y el Dashboard para identificar fallos en la lógica de permisos (IDOR) y escalamiento de privilegios.

- **Vulnerability Scanning**:

	- Herramientas: Snyk para escaneo de vulnerabilidades en dependencias de Python/Node.js; GitHub Dependabot para parches de seguridad críticos.

	- Frecuencia: Escaneo continuo en cada Push a la rama main y semanalmente de forma programada.

## 8. Frontend (si aplica)

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

## 9. Observabilidad y Monitoreo

### 9.1 Logging

- **Estrategia (Qué loggear)**:

	- Transacciones de Negocio: Creación de pedidos, cambios de stock, confirmaciones de pago.

	- Eventos de IA: Texto de entrada, intención detectada por el LLM y confianza del modelo.

	- Errores de Integración: Fallos en Webhooks de Meta, timeouts de pasarelas de pago.

- **Niveles**:

	- DEBUG: Detalles de payloads de entrada/salida (solo en Staging).

	- INFO: Flujos normales (ej: "Link de pago enviado a usuario X").

	- WARN: Problemas recuperables (ej: "Intento de pago fallido, reintentando").

	- ERROR: Fallos críticos que requieren intervención (ej: "Error 500 en Meta API").

- **Formato**:

	- Estructurado (JSON): Implementación obligatoria mediante la librería structlog en Python. Permite filtrar por campos como user_id, live_id o trace_id sin necesidad de parsing complejo.

- **Centralización**:

	- Stack: Logtail (Better Stack) integrado con Render para la agregación de logs en tiempo real.

	- Alerting: Configuración de alertas en Slack para logs de nivel ERROR.

- **Retención**:

	- Logs de Aplicación: 30 días para diagnóstico rápido.

	- Audit Logs (Seguridad/Pagos): 1 año (almacenados en una tabla fría de Supabase o BigQuery) para cumplimiento legal y resolución de disputas.

### 9.2 Métricas

- **Herramientas**:

	- Prometheus: Para la recolección de métricas de series temporales del backend (FastAPI).

	- Grafana: Para la visualización de dashboards técnicos y de negocio.

	- Render Metrics: Para monitoreo nativo de CPU/RAM de la infraestructura.

- **Métricas Clave (Golden Signals)**:

	- Latency (Latencia): Tiempo que tarda el bot en responder a un comentario (Target: P95 < 2.5s).

	- Error Rate (Tasa de Errores): % de webhooks de Facebook que devuelven un código != 200 o excepciones internas.

	- Throughput (Caudal): Número de comentarios procesados por minuto (CPM) durante un Live.

	- Saturation (Saturación): Uso de conexiones en el pool de base de datos y memoria del worker de IA.

- **Dashboards**:

	- Para Devs: Gráficos de salud del sistema, consumo de API de OpenAI y tiempos de respuesta de DB.

	- Para Business: Tasa de conversión de comentarios a carritos, volumen transaccionado por hora y retención de vendedores.

- **SLIs/SLOs (Service Level Indicators & Objectives)**:

	- SLO de Disponibilidad: 99.9% de uptime mensual de la API de Webhooks.

	- SLO de Latencia: 90% de los mensajes de confirmación deben enviarse en menos de 3 segundos desde la recepción del comentario.

	- SLO de Integridad: 100% de los pedidos pagados deben verse reflejados en el Dashboard en menos de 10 segundos.

### 9.3 Tracing

- **Distributed Tracing**:

	- Estándar: Implementación de OpenTelemetry (OTel) para la instrumentación agnóstica del backend.

	- Herramienta: Jaeger (auto-hosteado o vía Grafana Tempo) para visualizar la propagación de las solicitudes entre los distintos servicios (API -> Worker -> OpenAI -> DB).

- **Qué trazar (Requests Críticos y Transacciones)**:

	- Ciclo de Vida del Webhook: Rastreo completo desde que Meta envía el comentario hasta que el bot responde en Messenger. Esto permite identificar si el cuello de botella está en la red, en la lógica de la base de datos o en el tiempo de respuesta del LLM.

	- Flujo de Checkout: Trazabilidad del proceso de pago para detectar en qué punto exacto un comprador abandona el carrito o dónde falla la comunicación con la pasarela.

	- Consultas de IA: Registro de la duración de cada llamada a las APIs de OpenAI/Gemini para optimizar los tiempos de generación de texto.

	- Trace Context: Inyección de un X-Trace-ID en los headers de respuesta y en los logs para correlacionar instantáneamente un error reportado por Sentry con su traza completa en Jaeger.

### 9.4 Alerting

- **Qué alertar (Condiciones Críticas)**:

	- Uptime: Caída del servicio de Webhooks (Error 5xx persistente > 1 min).

	- Latencia: P95 de procesamiento de comentarios > 5s (Bot lento).

	- Integración: Error masivo de autenticación con la Meta Graph API (Token expirado/baneado).

	- Base de Datos: Consumo de CPU/RAM de Supabase > 80%.

	- IA: Fallos consecutivos en el proveedor de LLM (OpenAI/Gemini fuera de servicio).

- **Canales**:

	- Prioridad Alta (P0/P1): Slack (canal #alerts-critical) y PagerDuty (llamada telefónica/notificación push).

	- Prioridad Media (P2): Email y notificaciones en el Dashboard administrativo.

- **Escalación**:

	- Nivel 1 (0-15 min): Respuesta automática del sistema (ej: reintento de conexión) + aviso al DevOps de guardia.

	- Nivel 2 (> 15 min): Si la alerta no se reconoce, escalar al CTO/Líder técnico.

	- Nivel 3 (> 30 min): Comunicación proactiva en redes/página de estado para los clientes afectados.

- **Runbooks (Procedimientos de Respuesta)**:

	- RB-001: Meta Token Expired: Pasos para refrescar manualmente el System User Token desde el Meta Business Suite.

	- RB-002: OpenAI Timeout: Procedimiento para cambiar el puntero de la IA de OpenAI a Gemini (Failover) de forma manual o automática.

	- RB-003: DB Deadlock: Instrucciones para identificar y terminar procesos bloqueantes en PostgreSQL sin afectar la integridad de los pedidos.

## 10. Testing

### 10.1 Estrategia de Testing

- **Pirámide de Testing**:

	- Unit Tests (70%): Foco en lógica pura (ej: cálculo de impuestos, parsing de comentarios, validación de stock). Ejecución rápida en cada commit.

	- Integration Tests (20%): Pruebas de interacción con Supabase (vía contenedores de Testcontainers), llamadas a la API de Meta mockeadas y flujos de autenticación.

	- E2E Tests (10%): Flujos críticos de negocio (Onboarding completo, Comentario -> DM -> Pago aprobado). Uso de Playwright para simular el navegador y la interacción del usuario.

- **Coverage Objetivo**:

	- Mínimo Global: 80% de cobertura de código.

	- Crítico (Lógica de Pagos e Inventario): 100% de cobertura obligatoria para poder hacer merge a main.

- **Testing en Producción**:

	- Feature Flags: Uso de PostHog o LaunchDarkly para habilitar nuevas pasarelas de pago o modelos de IA gradualmente. Permite "apagar" una funcionalidad al instante si causa errores.

	- Canary Deployments: Despliegue del nuevo código al 5% de las instancias en Render para monitorizar errores en tiempo real antes de completar el despliegue global.

	- Smoke Tests: Pruebas automatizadas post-despliegue que verifican que los endpoints base (/health, /api/v1/auth) respondan correctamente.

### 10.2 Tipos de Tests

- **Unit Tests**:

	- Frameworks: Pytest (Backend) y Vitest/Jest (Frontend).

	- Qué Mockear: Respuestas de la API de Meta, llamadas a OpenAI/Gemini, y servicios de envío de correos. Se busca testear la lógica de negocio sin latencia de red.

- **Integration Tests**:

	- Integraciones: Flujos completos entre FastAPI y Supabase (usando una DB de prueba), validación de Webhooks (simulando el payload de Meta) y comunicación con Redis para el bloqueo de stock.

- **E2E Tests**:

	- Herramientas: Playwright (preferido por su velocidad y soporte nativo de emulación móvil).

- Escenarios Críticos: Onboarding de nuevo vendedor, flujo completo de compra (Comentario -> DM -> Pago) y actualización en tiempo real del Dashboard tras una venta.

- **Performance Tests**:

	- Herramientas: k6 (basado en JS, ideal para pipelines de CI/CD).

	- Escenarios de Carga: Simulación de un "Flash Sale" con 10,000 comentarios concurrentes en 1 minuto. Verificación de saturación de la base de datos y tiempos de respuesta del bot bajo presión.

- **Security Tests**:

	- SAST (Static Application Security Testing): Uso de Bandit para Python y Snyk para detectar vulnerabilidades en el código fuente.

	- DAST (Dynamic Application Security Testing): Escaneos automáticos con OWASP ZAP sobre los endpoints públicos.

	- Dependency Scanning: GitHub Dependabot para asegurar que las librerías (FastAPI, Next.js, etc.) no tengan vulnerabilidades conocidas.

- **Accessibility Tests**:

	- Herramientas: Axe-core integrado en Playwright y Lighthouse para auditorías automáticas.

	- Estándares: Cumplimiento de WCAG 2.1 Nivel AA, asegurando que los vendedores puedan operar el dashboard con lectores de pantalla y que el Checkout sea usable para personas con discapacidades visuales o motoras.

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

## 11. CI/CD y Deployment

### 11.1 Pipeline CI/CD

- **Herramienta Principal**: GitHub Actions. Se elige por su integración nativa con el repositorio y su ecosistema de "Actions" para seguridad y despliegue.

- **Stages (Etapas)**:

	1. Build: Instalación de dependencias, compilación de assets de Next.js y verificación de tipos (Mypy/TypeScript).

	2. Lint & Style: Ejecución de Flake8/Black (Python) y ESLint/Prettier (JS) para mantener la consistencia del código.

	3. Test: Ejecución en paralelo de la suite de Pytest y Vitest.

	4. Security Scan: Escaneo de vulnerabilidades en dependencias y búsqueda de secretos expuestos (Gitleaks).

	5. Staging Deploy: Despliegue automático a un entorno de pruebas si los pasos anteriores son exitosos.

	6. E2E & Smoke Tests: Pruebas de integración final sobre el entorno de Staging.

	7. Production Deploy: Despliegue a producción (vía aprobación manual o merge a main).

- **Triggers (Disparadores)**:

	- On Push: En cualquier rama para ejecutar Build y Lint.

	- On Pull Request: Ejecución completa de Tests y Security Scans hacia main o develop.

	- Scheduled (Cron): Escaneos de seguridad profundos y pruebas de carga (k6) ejecutadas cada domingo a las 03:00.

- **Artifacts (Artefactos)**:

	- Imágenes Docker: Almacenadas en GitHub Container Registry (GHCR) para el backend.

	- Static Assets: Optimizados y servidos vía CDN de Render o Vercel.

	- Reportes: Cobertura de test (LCOV) y resultados de seguridad (SARIF) adjuntos a cada ejecución del pipeline para auditoría.

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

### 11.5 Containerización

- **Dockerfiles**:

	- Estructura Multi-stage: Se utilizarán Dockerfiles de múltiples etapas para minimizar el tamaño de las imágenes finales.

		- Etapa 1 (Build): Instalación de dependencias de compilación y compilación de assets.

		- Etapa 2 (Runtime): Copia solo de los binarios/artefactos necesarios para la ejecución.

	- Servicios: Dockerfiles específicos para el API Backend (FastAPI), el Background Worker (Celery/TaskIQ) y el Frontend (Next.js - si se despliega como contenedor).

- **Base Images**:

	- Backend: python:3.12-slim o python:3.12-alpine para reducir la superficie de ataque y mejorar la velocidad de descarga.

	- Frontend: node:20-alpine para optimizar el despliegue de los archivos estáticos y el servidor de SSR.

- **Registry**:

	- GitHub Container Registry (GHCR): Se utilizará como repositorio privado de imágenes. Está integrado directamente con GitHub Actions, facilitando el versionado de imágenes vinculado a los commits y tags de Git.

- **Orquestación**:

	- Contexto Inicial: Dado que el despliegue inicial es en Render.com, se utilizará su orquestador nativo basado en Kubernetes (abstraído) mediante archivos de configuración render.yaml (Infrastructure as Code).

	- Escalabilidad (Kubernetes Ready): Se mantienen preparados los Kubernetes Manifests y Helm Charts para una migración futura a un entorno autogestionado (EKS/GKE) si la carga de usuarios lo requiere. Los manifiestos incluyen:

		- Deployments con HPA (Horizontal Pod Autoscaler) basado en CPU y latencia.

		- Services de tipo ClusterIP y LoadBalancer.

		- Ingress para manejo de TLS y rutas.

		- ConfigMaps y Secrets para la inyección de configuraciones dinámicas.

## 12. Gestión de Versiones y Código

- **Branching Strategy**:

	- GitHub Flow: Se adopta un modelo ágil basado en ramas de características (feature/*) que nacen de main.

	- Protección de Rama: La rama main está protegida; requiere paso de CI y al menos una aprobación manual (Review) para realizar el merge.

	- Hotfixes: Ramas hotfix/* para correcciones críticas en producción que se integran inmediatamente tras validar.

- **Convenciones de Commits**:

	- Conventional Commits: Formato obligatorio tipo(alcance): descripción (ej: feat(api): add paypal integration).

	- Tipos Permitidos: feat (nueva funcionalidad), fix (corrección de error), docs, style, refactor, test, chore.

- **Code Review**:

	- Proceso: Cada Pull Request (PR) debe incluir una descripción clara del "Qué" y "Por qué".

- **Checklist**:

	[ ] ¿El código cumple con el coverage de tests definido?

	[ ] ¿Se han actualizado las variables de entorno en Staging/Prod si aplica?

	[ ] ¿Se han evitado "n+1 queries" en las llamadas a Supabase?

	[ ] ¿La lógica de la IA maneja correctamente los casos de error/timeout?

- **Versionamiento Semántico (SemVer)**:

	- Major (X.0.0): Cambios que rompen la compatibilidad (ej: cambio masivo en la API de Webhooks).

	- Minor (0.X.0): Nuevas funcionalidades compatibles (ej: nueva pasarela de pago).

	- Patch (0.0.X): Correcciones de errores y parches de seguridad.

- **Changelog**:

	- Automatización: Uso de standard-version o release-please para generar automáticamente el archivo CHANGELOG.md basado en los mensajes de los commits.

	- Visibilidad: Publicación de las notas de versión en el Panel de Control para que los vendedores conozcan las mejoras.

## 13. Documentación

- **Arquitectura**:

	- ADRs (Architecture Decision Records): Registro histórico de decisiones clave (ej: "¿Por qué usamos FastAPI en lugar de Django?" o "¿Por qué Terraform sobre Pulumi?"). Almacenados en /docs/adr.

	- Diagramas: C4 Model (System, Container, Component) actualizados mediante Mermaid.js en el repositorio.

- **API**:

	- OpenAPI/Swagger: Documentación interactiva autogenerada en /docs o /api/docs.

	- Ejemplos de Consumo: Colecciones de Postman/Bruno y ejemplos de curl para los webhooks de Meta y la API interna.

- **Código**:

	- Inline Comments: Uso de Docstrings siguiendo el estándar de Google para Python y TSDoc para el frontend.

	- READMEs por Módulo: Cada carpeta principal (ej: /services/inventory) debe tener un README.md que explique su responsabilidad y dependencias.

- **Runbooks Operacionales**:

	- Guía de Deployment: Pasos manuales de emergencia en caso de fallo del pipeline de CI/CD.

	- Debugging & Troubleshooting: Guía de "Primeros Auxilios" para errores comunes (ej: 401 Unauthorized de Facebook, Bloqueo de IP por OpenAI).

	- Incidents: Procedimiento de comunicación y escalado durante caídas de servicio.

- **Onboarding**:

	- Guía para Nuevos Desarrolladores: Archivo CONTRIBUTING.md con instrucciones para configurar el entorno local en < 30 minutos (Docker, variables de entorno, acceso a Supabase).

- **Wiki/Knowledge Base**:

	- Problemas Conocidos (Known Issues): Registro de bugs no críticos o comportamientos esperados de la API de Meta que pueden confundir al equipo.

	- FAQs Técnicos: Repositorio de preguntas frecuentes sobre la lógica de la IA y el procesamiento de pagos.

## 14. Costos y Recursos

###  14.1 Estimación de Costos (Proyección Mensual/Anual)

### Basado en un escenario inicial de 10-20 clientes activos.

- **Infraestructura Fija (Mensual)**:

	- Supabase Pro: $25 USD (Base de Datos, Auth, Realtime).

	- Render/Railway: $10 - $15 USD (Backend FastAPI + Workers).

	- Frontend (Vercel/Render): $0 - $20 USD.

	- Total Fijo Mensual: ~$45 - $60 USD.

- **Costos Variables (IA & API)**:

	- OpenAI/Gemini API: ~$0.30 USD por cada 1,000 comentarios procesados.

	- Proyección: Con 100,000 comentarios/mes = ~$30 USD.

- **Proyección Anual (MVP)**: ~$900 - $1,200 USD (considerando crecimiento moderado y dominios).

### 14.2 Presupuesto y Alertas

- **Cloud Budget Alerts**: Configuración de umbrales en Render y Supabase al 50%, 80% y 100% del presupuesto mensual estimado ($60 USD).

- **IA Quotas**: Hard-limit en la API de OpenAI para evitar costos por ataques de denegación de servicio (DoS) o bucles infinitos en el webhook.

- **Alertas de Notificación**: Envío automático a Slack/Discord cuando el consumo diario de tokens excede el promedio histórico en un 40%.

### 14.3 Estrategias de Optimización de Costos

- **Arquitectura de IA Eficiente**:

	- RAG (Retrieval-Augmented Generation): En lugar de enviar todo el catálogo en cada comentario, se envían solo los 5 productos más relevantes recuperados mediante búsqueda semántica.

	- Cache de Respuestas: Almacenamiento en caché de consultas frecuentes (ej: "¿precio?", "¿colores disponibles?") para evitar llamadas recurrentes al LLM.

	- Cold Storage: Mover logs de IA y auditorías de más de 6 meses a un almacenamiento de bajo costo (S3 Glacier) o eliminarlos.

	- Dormancia de Recursos: Escalado a cero de instancias de Staging durante horas no laborables.

### 14.4 Equipo (Team Roles)

- **Product Owner / Lead Dev**: Definición de roadmap, arquitectura de la IA y conexión con la API de Meta.

- **Fullstack Developer**: Mantenimiento del Dashboard en Next.js y endpoints de gestión en FastAPI.

- **DevOps / Infra**: Gestión de Terraform, pipelines de CI/CD y monitoreo de salud del sistema.

- **Soporte Técnico / Customer Success**: Gestión de tickets, ayuda en el App Review de los clientes y configuración inicial de Fanpages.

- **Legal/Compliance (Outsourced)**: Revisión de términos y condiciones, y cumplimiento de normativas GDPR/PCI.

## 15. Consideraciones Operacionales

### 15.1 Disaster Recovery (DRP)

- **Plan de Recuperación (Pasos Detallados)**:

	1. Detección y Notificación: Alerta automática vía PagerDuty/Slack ante caída de salud (Health Check) > 5 min.

	2. Aislamiento: Desvío de tráfico mediante Cloudflare a una página estática de "Mantenimiento Programado" si el fallo es crítico.

	3. Restauración de Servicio: Despliegue de la última imagen Docker estable desde GHCR hacia una región secundaria o reinicio de servicios en Render.

	4. Recuperación de Datos: Si hay corrupción, se restaura la base de datos al último Point-in-Time disponible.

	5. Validación: Ejecución de Smoke Tests automáticos post-recuperación antes de abrir tráfico.

	6. Análisis Post-Mortem: Documentación del incidente en la Wiki para prevenir recurrencia.

- **Backups**:

	- Qué: Base de datos completa (Postgres), configuraciones de Terraform, logs de auditoría y estados de los pedidos.

	- Cuándo:

		- Base de datos: Backups automáticos cada 24 horas y retención de logs de transacciones (PITR) para recuperación de los últimos 7 días minuto a minuto.

		- Archivos/Imágenes: Sincronización continua en S3.

	- Dónde: Backups gestionados de Supabase (Point-in-Time Recovery) + exportación semanal de datos críticos a un bucket de AWS S3 independiente para recuperación ante desastres a nivel de proveedor.

	- Cómo Restaurar: Vía consola de Supabase para la base de datos o mediante el comando terraform apply para recrear la infraestructura de cómputo.

- **Chaos Engineering (Escenarios de Prueba)**:

	- Fallo de API de Meta: Simular la desconexión del Webhook para probar si el sistema encola los eventos o notifica al vendedor que debe gestionar manualmente.

	- Latencia de IA: Simular tiempos de respuesta de 30s en OpenAI para validar que el sistema no bloquee los procesos de otros usuarios.

	- Caída de Pasarela de Pago: Deshabilitar temporalmente Flow/PayPal para verificar que el bot sugiera automáticamente el método de "Transferencia" como respaldo.

	- Pico de Tráfico Extremo: Simular 5,000 comentarios en 1 minuto (5x la capacidad nominal) para validar el auto-scaling, la gestión de colas en Redis y el comportamiento del sistema bajo saturación.

### 15.2 Mantenimiento

- **Actualizaciones**:

	- Dependencias: Uso de Dependabot o Renovate para escaneo semanal de paquetes. Las actualizaciones menores se integran automáticamente si pasan los tests; las mayores requieren aprobación manual.

	- Sistema Operativo (OS): Al usar imágenes slim/alpine, las actualizaciones de parches de seguridad se aplican en cada nuevo build del pipeline de CI/CD.

	- Runtime (Python/Node): Revisión semestral de versiones de lenguaje. Migración obligatoria ante el fin de soporte (EOL) de la versión utilizada.

- **Deprecated Features (Plan de Sunset)**:

	- Identificación: Monitoreo de uso de funciones mediante PostHog para detectar características infrautilizadas.

	- Comunicación: Notificación vía Dashboard y Email con 3 meses de antelación antes de retirar una funcionalidad.

	- Transición: Provisión de guías de migración o alternativas si la función retirada es reemplazada por una superior.

- **Data Retention (Políticas de Eliminación)**:

	- Logs de Comentarios: Eliminación de comentarios sin intención de compra tras 90 días. Los comentarios vinculados a un pedido se anonimizan pero se conservan como referencia del registro de venta.

	- Datos de Transacciones: Retención íntegra de facturas, montos y estados de pago por 5 años (exigencia legal tributaria). La metadata de la conversación asociada se reduce al mínimo legal tras el primer año.

	- Cuentas Inactivas: Purga de datos de usuarios que no han iniciado sesión ni realizado pagos en 18 meses, previo aviso de 30 días.

### 15.3 Soporte

- **Niveles de Soporte**:

	- L1 (Soporte Funcional/General): Atendido por agentes de Customer Success o un chatbot especializado. Resuelven dudas de configuración de cuenta, problemas de facturación y errores de usuario comunes (ej: "no sé cómo conectar mi página").

	- L2 (Soporte Técnico Especializado): Desarrolladores o analistas técnicos. Se encargan de problemas con webhooks que no llegan, fallos en la lógica de la IA, o discrepancias de stock que requieren consulta en base de datos.

	- L3 (Soporte de Infraestructura/Ingeniería): Lead Dev o DevOps. Intervienen en caídas críticas del sistema, problemas de conectividad con Supabase/Render, ataques DoS o bugs complejos que requieren cambios en el Core del producto.

- **SLAs (Service Level Agreements) de Respuesta**:

	- S1 (Crítica): Caída total del servicio o bot no responde en Lives activos.

		- Respuesta: < 15 min. Resolución: < 2 horas.

	- S2 (Alta): Funcionalidad clave dañada (ej: links de pago no se generan).

		- Respuesta: < 1 hora. Resolución: < 6 horas.

	- S3 (Media): Errores menores de UI o bugs que tienen un "workaround".

		- Respuesta: < 4 horas. Resolución: < 24 horas.

	- S4 (Baja): Consultas generales o sugerencias de mejora.

		- Respuesta: < 24 horas. Resolución: Según Roadmap.

- **Proceso de Escalación**:

	1. Apertura: El ticket entra por Intercom/Zendesk.

	2. Triaje: El sistema categoriza la severidad. Si es S1, dispara alerta a PagerDuty.

	3. Transferencia: Si L1 no resuelve en 20 min, escala a L2. Si L2 detecta fallo de infraestructura, escala a L3.

	4. Contactos de Emergencia: Lista interna de On-call (DevOps y Lead Dev) accesible solo para el equipo de soporte L2/L3.

## 16. Compliance y Legal

### 16.1 Regulaciones Aplicables

- **GDPR (General Data Protection Regulation)**: Obligatorio para usuarios de la UE. Incluye el derecho al acceso, rectificación y supresión de datos ("derecho al olvido").

- **CCPA (California Consumer Privacy Act)**: Cumplimiento de transparencia y opción de exclusión para usuarios en California, EE. UU.

- **PCI-DSS (Payment Card Industry Data Security Standard)**: Cumplimiento delegado via SAQ-A. La plataforma no procesa, transmite ni almacena datos de titulares de tarjetas; la responsabilidad recae en las pasarelas (Flow, PayPal, Mercado Pago) mediante el uso de campos de pago embebidos o redirecciones.

- **Meta Messenger Policy**: Gestión híbrida de mensajería. Uso de ventana estándar de 24h para flujos de venta activos. Para interacciones fuera de ventana, se implementará el Tag 'POST_PURCHASE_UPDATE' para transacciones y el sistema de 'One-Time Notification' (OTN) para alertas de re-stock, asegurando cumplimiento total con las políticas de SPAM de Meta.

- **HIPAA**: No aplicable inicialmente, a menos que el SaaS se expanda al sector salud (gestión de recetas o datos médicos).

### 16.2 Data Residency (Residencia de Datos)

- **Localización**: Los datos se almacenan principalmente en la región us-east-1 (Virginia) a través de Supabase y AWS.

- **Soberanía de Datos**: Capacidad técnica (vía Terraform) para desplegar instancias de base de datos en regiones específicas (ej: AWS Frankfurt) si un cliente corporativo requiere que sus datos no salgan de la jurisdicción de la UE.

- **Transferencia Internacional**: Uso de Cláusulas Contractuales Tipo (SCC) para la transferencia legal de datos entre Latam y los centros de datos en EE. UU.

### 16.2.1 Protocolo de Recuperación de Carrito y Message Tags

- Para interactuar con usuarios fuera de la ventana estándar de 24 horas, el sistema implementará los siguientes tags oficiales de Meta (Messenger Platform API):

	1. Tag: POST_PURCHASE_UPDATE (Actualización Post-Compra)

		- Uso: Confirmación de pago exitoso, envío de recibos o actualizaciones de estado de envío (Tracking).

		- Restricción: No puede contener contenido promocional ni ofertas de "up-selling".

		- Aplicación: Se usará automáticamente cuando el webhook de la pasarela de pago (Flow, PayPal, Mercado Pago) confirme la transacción, incluso si han pasado días desde el comentario inicial.

	2. Tag: CONFIRMED_EVENT_UPDATE (Actualización de Evento Confirmado)

		- Se usará exclusivamente para notificar al usuario sobre el inicio de un nuevo Live Shopping para el cual se registró previamente.

- **Lógica de Implementación Técnica (Estrategia de Mensajería Ventana 24h)**:

		1. T+0h: Mensaje de bienvenida con link de pago (Reserva de stock activa).

		2. T+20min: Recordatorio de cortesía (10 min antes de liberar stock).

		3. T+12h: Recordatorio de persistencia de carrito (sin reserva de stock).

		4. T+23h: Mensaje de "Última oportunidad" antes de cierre de ventana técnica.

- Si el sistema necesita contactar al usuario (ej. el producto volvió a tener stock), se utilizará un One-Time Notification (OTN).

- El flujo de OTN requerirá un botón de "Avísame cuando haya stock" en el chat. Al hacer clic, el usuario otorga un token de un solo uso para recibir una notificación específica fuera de las 24h cuando el inventario se actualice.

### 16.3 Auditoría y Reportes

- **Logs de Cumplimiento**: Registro inmutable de accesos a datos sensibles, cambios de permisos y eliminaciones de registros.

- **Reportes de Seguridad**: Generación de informes trimestrales de vulnerabilidades (vía escaneos de Snyk/GitHub) para auditorías internas o de Meta.

- **Trail de Auditoría**: Trazabilidad completa de cada decisión tomada por la IA (prompt enviado vs respuesta generada) para resolver disputas de ventas.

### 16.4 Privacy y Consent Management

- **Políticas de Privacidad**: Documento dinámico accesible desde el Dashboard y las Landing Pages, detallando qué datos se recolectan (ID de Facebook, comentarios, email).

- **Consent Management (CMP)**: Implementación de banners de cookies y gestión de consentimiento granular para marketing vs. funcionalidad operativa.

- **Opt-out Directo**: El bot debe reconocer comandos como "STOP" o "ELIMINAR MIS DATOS" para cesar comunicaciones inmediatamente.

### 16.5 Licencias y Open Source Compliance

- **Software Licensing**: El núcleo del SaaS es propiedad intelectual privada (Proprietary).

- **OSS Compliance**: Uso de herramientas como FOSSA para asegurar que ninguna librería de terceros con licencia GPL o similar obligue a liberar el código fuente del proyecto.

- **Atribución**: Archivo NOTICES o LEGAL en el Dashboard que lista todas las bibliotecas de código abierto utilizadas y sus respectivas licencias (MIT, Apache 2.0).

---

