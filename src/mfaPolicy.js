function getMfaPolicy() {
  return {
    requiredForOwnerAboveThreshold: true,
    methods: {
      totp: { recommendedFor: "Dashboard" },
      backupCodes: { generatedOnce: true },
    },
  };
}

module.exports = { getMfaPolicy };
