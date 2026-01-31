function getIdentityStrategy() {
  return {
    authentication: {
      session: "JWT",
      socialLogin: "OAuth2",
      socialProvider: "Facebook Login",
    },
    providers: {
      primary: "Supabase Auth",
      role: "orquestador y puente para social login",
    },
  };
}

module.exports = { getIdentityStrategy };
