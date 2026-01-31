function getSupportPlan() {
  return {
    levels: {
      L1: {
        handledBy: ["Customer Success", "chatbot especializado"],
        scope: [
          "configuracion de cuenta",
          "facturacion",
          "errores de usuario comunes",
        ],
        examples: ["no se como conectar mi pagina"],
      },
      L2: {
        handledBy: ["Desarrolladores", "Analistas tecnicos"],
        issues: [
          "webhooks que no llegan",
          "fallos en la logica de la IA",
          "discrepancias de stock/inventario (consulta a base de datos)",
        ],
      },
      L3: {
        handledBy: ["Lead Dev", "DevOps"],
        issues: [
          "caidas criticas del sistema",
          "problemas de conectividad con Supabase/Render",
          "ataques DoS",
          "bugs complejos que requieren cambios en el core del producto",
        ],
      },
    },
    slas: {
      S1: {
        severity: "Critica",
        responseMinutes: 15,
        resolutionHours: 2,
        description: "Caida total del servicio o bot no responde en lives activos",
      },
      S2: {
        severity: "Alta",
        responseMinutes: 60,
        resolutionHours: 6,
        description: "Funcionalidad clave danada (links de pago no se generan)",
      },
      S3: {
        severity: "Media",
        responseMinutes: 240,
        resolutionHours: 24,
        description: "Errores menores de UI o bugs con workaround",
      },
      S4: {
        severity: "Baja",
        responseMinutes: 1440,
        resolutionNote: "Segun roadmap",
        description: "Consultas generales o sugerencias de mejora",
      },
    },
    escalation: {
      intake: "Intercom/Zendesk",
      triage: {
        classification: "categoriza la severidad",
        s1Alert: "PagerDuty",
      },
      transfer: {
        l1ToL2Minutes: 20,
        l2ToL3Condition: "si L2 detecta fallo de infraestructura",
      },
      emergencyContacts: {
        roles: ["DevOps", "Lead Dev"],
        access: "lista interna solo para L2/L3",
      },
    },
  };
}

module.exports = { getSupportPlan };
