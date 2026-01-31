const { getStatePersistence } = require("../../src/statePersistence");

describe("slice-039: Gestion de Estado y Persistencia", () => {
  test("returns data and speed layers", () => {
    const state = getStatePersistence();

    expect(state).toEqual(
      expect.objectContaining({
        dataLayer: expect.any(Object),
        speedLayer: expect.any(Object),
      })
    );
  });

  test("defines data layer with Supabase Postgres", () => {
    const state = getStatePersistence();

    expect(state.dataLayer).toEqual(
      expect.objectContaining({
        provider: expect.stringMatching(/supabase/i),
        engine: expect.stringMatching(/postgres/i),
      })
    );
  });

  test("defines speed layer with Redis responsibilities", () => {
    const state = getStatePersistence();

    expect(state.speedLayer).toEqual(
      expect.objectContaining({
        provider: expect.stringMatching(/redis/i),
        purposes: expect.arrayContaining([
          expect.stringMatching(/rate limiting/i),
          expect.stringMatching(/session state/i),
          expect.stringMatching(/idempotency/i),
        ]),
        sessionExample: expect.stringMatching(/waiting_for_payment_method/i),
        idempotencyTtlHours: 24,
      })
    );
  });
});
