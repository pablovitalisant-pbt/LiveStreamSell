const { getInfrastructureAsCode } = require("../../src/infrastructureAsCode");

describe("slice-043: Infrastructure as Code", () => {
  test("returns IaC structure", () => {
    const iac = getInfrastructureAsCode();

    expect(iac).toEqual(
      expect.objectContaining({
        tool: expect.any(Object),
        organization: expect.any(Object),
        workspaces: expect.any(Object),
        stateManagement: expect.any(Object),
        managedResources: expect.any(Object),
      })
    );
  });

  test("captures Terraform tool choice", () => {
    const iac = getInfrastructureAsCode();

    expect(iac.tool).toEqual(
      expect.objectContaining({
        name: expect.stringMatching(/terraform/i),
        reasons: expect.arrayContaining([
          expect.stringMatching(/multi-cloud|multi cloud/i),
          expect.stringMatching(/comunidad/i),
          expect.stringMatching(/declarativa/i),
        ]),
      })
    );
  });

  test("captures module organization", () => {
    const iac = getInfrastructureAsCode();

    expect(iac.organization.modules).toEqual(
      expect.objectContaining({
        networking: expect.stringMatching(/vpcs|subredes|firewall/i),
        compute: expect.stringMatching(/render/i),
        database: expect.stringMatching(/supabase|postgres/i),
        storage: expect.stringMatching(/s3|backups|imagenes/i),
      })
    );
  });

  test("captures workspaces and state management", () => {
    const iac = getInfrastructureAsCode();

    expect(iac.workspaces).toEqual(
      expect.objectContaining({
        environments: expect.arrayContaining(["staging", "production"]),
        purpose: expect.stringMatching(/separar estados|evitar colisiones/i),
      })
    );

    expect(iac.stateManagement).toEqual(
      expect.objectContaining({
        backend: expect.stringMatching(/s3/i),
        locking: expect.stringMatching(/dynamodb|terraform cloud/i),
        file: expect.stringMatching(/terraform\.tfstate/i),
      })
    );
  });

  test("captures managed resources", () => {
    const iac = getInfrastructureAsCode();

    expect(iac.managedResources).toEqual(
      expect.objectContaining({
        networking: expect.stringMatching(/dominios|ssl|cloudflare|render/i),
        compute: expect.stringMatching(/variables de entorno|auto|cpu|ram/i),
        databases: expect.stringMatching(/tablas|roles|rls/i),
        monitoring: expect.stringMatching(/grafana|prometheus/i),
        secrets: expect.stringMatching(/vault|secretos/i),
      })
    );
  });
});
