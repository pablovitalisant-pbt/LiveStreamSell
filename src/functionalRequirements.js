function getFunctionalRequirements() {
  return {
    onboarding: {
      languageDetection: ["browser headers", "geolocalizacion por IP"],
      localePriority: ["seleccion manual", "locale Facebook API", "IP fallback"],
    },
    highSpeedWebhook: {
      queue: "Redis",
      commentsPerMinute: 1000,
      purpose: "absorber picos y evitar rate-limiting de Meta",
    },
    nlp: {
      models: ["LLM"],
      capabilities: [
        "interpretacion de modismos",
        "deteccion de intenciones de compra",
        "extraccion de SKUs",
        "distinguir preguntas informativas vs adquisicion",
      ],
    },
    dmTransition: {
      publicReply: "confirmacion breve en comentario publico",
      dmAutoStart: true,
      reason: "anti-spam Meta 2026 y privacidad financiera",
    },
    paymentLinks: {
      providers: ["PayPal", "Mercado Pago", "Flow"],
      uniquePerOrder: true,
      delivery: "exclusivo via DM",
    },
    inventoryLocking: {
      reserveMinutes: 30,
      releaseAfterMinutes: 30,
      postReleaseState: "carrito persiste como interes sin reserva",
    },
    liveDashboard: {
      realtime: true,
      sellerControls: [
        "visualizar pedidos entrantes",
        "intervenir conversaciones",
        "activar kill switch",
      ],
    },
  };
}

module.exports = { getFunctionalRequirements };
