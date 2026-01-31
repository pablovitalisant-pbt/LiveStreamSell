function getProjectDefinition() {
  return {
    visionObjectives:
      "Plataforma SaaS global-first para automatizar ventas en Facebook Live con AI/IA multilingue, gestion de inventario y pagos internacionales.",
    uniqueValueProposition:
      "Elimina el error humano en la toma de pedidos durante Lives y democratiza el acceso a mercados internacionales para PYMES.",
    useCases: {
      vendor:
        "Vendedor vincula Fanpage, configura pais/moneda, carga catalogo (CSV/ERP) y recibe alertas de pago en tiempo real.",
      buyer:
        "Comprador comenta en el Live; el bot detecta idioma/geolocalizacion, confirma stock y ofrece pagos dinamicos (link local, PayPal o transferencia).",
      stakeholders: [
        "SMEs/PYMES",
        "Compradores Globales",
        "Administradores de la Plataforma",
      ],
    },
    monetization: {
      model: "hybrid",
      subscription: {
        frequency: "monthly",
        plans: ["Starter", "Pro"],
      },
      variableCommissionOptional: true,
    },
    successMetrics: {
      conversionMetric:
        "Tasa de comentarios que terminan en checkout exitoso.",
      performanceLatencySecondsMax: 3,
      availabilityUptimePercent: 99.95,
      reliabilityStrategy:
        "Uptime garantizado con despliegue multi-region y failover activo entre instancias.",
    },
    constraints: {
      metaApi: {
        messagingWindowHours: 24,
        appReviewRequired: true,
      },
      security: {
        pciDssCompliant: true,
        saqType: "SAQ-A",
        tokenizationExternal: true,
        noCardDataStored: true,
      },
      legal: {
        localTaxes: true,
        fxControls: true,
      },
    },
    risks: {
      technical: [
        "Cambios repentinos en Meta Graph API.",
        "Falsos positivos de la IA ante sarcasmo o dudas vs compras.",
      ],
      operational: [
        "Bloqueos de cuenta de Meta por reportes de spam si el bot es demasiado agresivo.",
      ],
      financial: [
        "Volatilidad de tipos de cambio en pagos transfronterizos.",
      ],
    },
  };
}

module.exports = { getProjectDefinition };
