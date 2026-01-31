function getDataResidencyPolicy() {
  return {
    primaryRegion: "us-east-1",
    sovereignty: {
      supported: true,
      tooling: "Terraform",
      exampleRegion: "eu-central-1",
      exampleLocation: "AWS Frankfurt",
    },
    internationalTransfer: { mechanism: "SCC", corridor: "LATAM-US" },
  };
}

module.exports = { getDataResidencyPolicy };
