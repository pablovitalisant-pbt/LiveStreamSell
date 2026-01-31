function getDataModelDesign() {
  return {
    conceptualModel: ["vendedor", "tiendas", "productos", "pedidos", "clientes"],
    schemas: [
      { name: "vendedores", keyFields: ["id", "email", "full_name", "ui_lang", "timezone", "created_at"] },
      { name: "tiendas", keyFields: ["id", "vendedor_id", "fb_page_id", "name", "country", "currency", "locale"] },
      { name: "fb_sessions", keyFields: ["id", "tienda_id", "page_access_token_enc", "user_access_token_enc", "expires_at"] },
      { name: "productos", keyFields: ["id", "tienda_id", "sku", "name", "description", "price", "stock", "image_url"] },
      { name: "live_events", keyFields: ["id", "tienda_id", "fb_live_id", "title", "status", "started_at"] },
      { name: "pedidos", keyFields: ["id", "tienda_id", "live_id", "customer_fb_id", "total", "status"] },
      { name: "pedido_items", keyFields: ["id", "pedido_id", "producto_id", "quantity", "unit_price"] },
      { name: "config_pagos", keyFields: ["id", "tienda_id", "gateway", "settings"] },
      { name: "ai_logs", keyFields: ["id", "live_id", "raw_comment", "detected_sku", "detected_intent", "confidence_score"] },
      { name: "subscriptions", keyFields: ["id", "vendedor_id", "plan_type", "status", "period_end"] },
    ],
    constraints: [
      "UNIQUE" + "\\" + "tienda_id, sku" + "\\",
      "idx_live_events_status",
      "FK con ON DELETE CASCADE en sesiones y logs vinculados a tiendas",
    ],
    versioning: "Migraciones gestionadas via Supabase CLI (archivos SQL en /migrations).",
  };
}

module.exports = { getDataModelDesign };
