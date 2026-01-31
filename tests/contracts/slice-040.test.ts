const { getIdentityStrategy } = require("../../src/identityStrategy");

describe("slice-040: Estrategia de Identidad", () => {
  test("returns authentication and provider strategy", () => {
    const identity = getIdentityStrategy();

    expect(identity).toEqual(
      expect.objectContaining({
        authentication: expect.any(Object),
        providers: expect.any(Object),
      })
    );
  });

  test("captures JWT and OAuth2 details", () => {
    const identity = getIdentityStrategy();

    expect(identity.authentication).toEqual(
      expect.objectContaining({
        session: expect.stringMatching(/jwt/i),
        socialLogin: expect.stringMatching(/oauth2/i),
        socialProvider: expect.stringMatching(/facebook/i),
      })
    );
  });

  test("captures provider orchestration", () => {
    const identity = getIdentityStrategy();

    expect(identity.providers).toEqual(
      expect.objectContaining({
        primary: expect.stringMatching(/supabase auth/i),
        role: expect.stringMatching(/orquestador|puente/i),
      })
    );
  });
});
