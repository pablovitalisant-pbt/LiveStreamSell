function getApplicableRegulations() {
  return {
    gdpr: {
      region: "UE",
      rights: ["acceso", "rectificacion", "supresion/derecho al olvido"],
    },
    ccpa: {
      region: "California (EE.UU.)",
      requirements: ["transparencia", "opcion de exclusion"],
    },
    pciDss: {
      saq: "SAQ-A",
      platformStoresCardData: false,
      responsibility: "Pasarelas (Flow, PayPal, Mercado Pago)",
    },
    metaMessenger: {
      windowHours: 24,
      tags: ["POST_PURCHASE_UPDATE"],
      otn: "One-Time Notification",
      purpose: "cumplimiento anti-spam de Meta",
    },
    hipaa: {
      applicable: false,
      condition: "si se expande al sector salud o datos medicos",
    },
  };
}

module.exports = { getApplicableRegulations };
