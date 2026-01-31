const { getSecretsAndCredentials } = require("../../src/secretsAndCredentials");

describe("slice-042: Secretos y Credenciales", () => {
  test("returns secrets management structure", () => {
    const secrets = getSecretsAndCredentials();

    expect(secrets).toEqual(
      expect.objectContaining({
        management: expect.any(Object),
        requiredSecrets: expect.any(Object),
        rotation: expect.any(Object),
        access: expect.any(Object),
      })
    );
  });

  test("captures secret management layers", () => {
    const secrets = getSecretsAndCredentials();

    expect(secrets.management).toEqual(
      expect.objectContaining({
        runtime: expect.objectContaining({
          tools: expect.arrayContaining([
            expect.stringMatching(/render secret files/i),
            expect.stringMatching(/environment groups/i),
          ]),
          gitPersistence: false,
        }),
        longTerm: expect.objectContaining({
          provider: expect.stringMatching(/supabase vault|pgrst_vault/i),
          data: expect.stringMatching(/tokens.*facebook/i),
          encryptedAtDb: true,
        }),
      })
    );
  });

  test("captures required secrets list", () => {
    const secrets = getSecretsAndCredentials();

    expect(secrets.requiredSecrets).toEqual(
      expect.objectContaining({
        infrastructure: expect.arrayContaining([
          "DATABASE_URL",
          "SUPABASE_SERVICE_ROLE_KEY",
          "REDIS_URL",
        ]),
        integrations: expect.arrayContaining([
          "FB_APP_SECRET",
          "FB_WEBHOOK_VERIFY_TOKEN",
          "OPENAI_API_KEY",
        ]),
        encryption: expect.arrayContaining(["ENCRYPTION_KEY_AES256"]),
      })
    );
  });

  test("captures rotation policy", () => {
    const secrets = getSecretsAndCredentials();

    expect(secrets.rotation).toEqual(
      expect.objectContaining({
        policy: expect.stringMatching(/90 dias|sospecha/i),
        automation: expect.objectContaining({
          target: expect.stringMatching(/fb_page_access_tokens/i),
          cadenceDays: 60,
        }),
      })
    );
  });

  test("captures access controls", () => {
    const secrets = getSecretsAndCredentials();

    expect(secrets.access).toEqual(
      expect.objectContaining({
        backgroundWorker: expect.arrayContaining([
          expect.stringMatching(/ia/i),
          expect.stringMatching(/pagos/i),
        ]),
        webhookApi: expect.arrayContaining([
          expect.stringMatching(/meta/i),
          expect.stringMatching(/validacion/i),
        ]),
        human: expect.stringMatching(/mfa|supabase dashboard/i),
      })
    );
  });
});
