const { getTokenManagement } = require("../../src/tokenManagement");

describe("slice-041: Gestion de Tokens", () => {
  test("returns token management structure", () => {
    const tokens = getTokenManagement();

    expect(tokens).toEqual(
      expect.objectContaining({
        generation: expect.any(Object),
        refresh: expect.any(Object),
        revocation: expect.any(Object),
        expiration: expect.any(Object),
      })
    );
  });

  test("captures generation and refresh flow", () => {
    const tokens = getTokenManagement();

    expect(tokens.generation).toEqual(
      expect.objectContaining({
        provider: expect.stringMatching(/supabase/i),
        accessToken: expect.stringMatching(/jwt/i),
        refreshToken: expect.stringMatching(/refresh/i),
      })
    );

    expect(tokens.refresh).toEqual(
      expect.objectContaining({
        client: expect.stringMatching(/next\.js/i),
        mode: expect.stringMatching(/segundo plano|background/i),
        timing: expect.stringMatching(/antes de la expiracion/i),
      })
    );
  });

  test("captures revocation and expiration", () => {
    const tokens = getTokenManagement();

    expect(tokens.revocation).toEqual(
      expect.objectContaining({
        supabaseSessionDelete: true,
        redisBlacklist: true,
        condition: expect.stringMatching(/comprometidos/i),
      })
    );

    expect(tokens.expiration).toEqual(
      expect.objectContaining({
        accessTokenHours: 1,
        refreshTokenDays: 30,
        refreshEndsOnLogout: true,
      })
    );
  });
});
