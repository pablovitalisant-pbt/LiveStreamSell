function getPrivacyConsentManagement() {
  return {
    privacyPolicy: {
      access: ["Dashboard", "Landing Pages"],
      dataCollected: ["ID de Facebook", "comentarios", "email"],
    },
    consentManagement: {
      cookiesBanner: true,
      granularity: ["marketing", "funcionalidad operativa"],
    },
    optOut: {
      commands: ["STOP", "ELIMINAR MIS DATOS"],
      immediate: true,
    },
  };
}

module.exports = { getPrivacyConsentManagement };
