function getTokenManagement() {
  return {
    generation: {
      provider: "Supabase",
      accessToken: "JWT corto",
      refreshToken: "refresh_token largo",
    },
    refresh: {
      client: "Next.js",
      mode: "segundo plano",
      timing: "antes de la expiracion",
    },
    revocation: {
      supabaseSessionDelete: true,
      redisBlacklist: true,
      condition: "tokens comprometidos",
    },
    expiration: {
      accessTokenHours: 1,
      refreshTokenDays: 30,
      refreshEndsOnLogout: true,
    },
  };
}

module.exports = { getTokenManagement };
