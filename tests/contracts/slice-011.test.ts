const { getTeamRoles } = require("../../src/teamRoles");

describe("slice-011: Equipo (Team Roles)", () => {
  test("returns team roles list", () => {
    const roles = getTeamRoles();

    expect(roles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "Product Owner / Lead Dev" }),
        expect.objectContaining({ title: "Fullstack Developer" }),
        expect.objectContaining({ title: "DevOps / Infra" }),
        expect.objectContaining({ title: "Soporte Técnico / Customer Success" }),
        expect.objectContaining({ title: "Legal/Compliance (Outsourced)" }),
      ])
    );
  });

  test("captures responsibilities for each role", () => {
    const roles = getTeamRoles();

    const owner = roles.find((role) => role.title === "Product Owner / Lead Dev");
    expect(owner.responsibilities.join(" ")).toMatch(/roadmap/i);
    expect(owner.responsibilities.join(" ")).toMatch(/arquitectura de la ia/i);
    expect(owner.responsibilities.join(" ")).toMatch(/api de meta/i);

    const fullstack = roles.find((role) => role.title === "Fullstack Developer");
    expect(fullstack.responsibilities.join(" ")).toMatch(/next\.js/i);
    expect(fullstack.responsibilities.join(" ")).toMatch(/fastapi/i);

    const devops = roles.find((role) => role.title === "DevOps / Infra");
    expect(devops.responsibilities.join(" ")).toMatch(/terraform/i);
    expect(devops.responsibilities.join(" ")).toMatch(/ci\/cd/i);
    expect(devops.responsibilities.join(" ")).toMatch(/monitoreo/i);

    const support = roles.find((role) => role.title === "Soporte Técnico / Customer Success");
    expect(support.responsibilities.join(" ")).toMatch(/tickets/i);
    expect(support.responsibilities.join(" ")).toMatch(/app review/i);
    expect(support.responsibilities.join(" ")).toMatch(/fanpages/i);

    const legal = roles.find((role) => role.title === "Legal/Compliance (Outsourced)");
    expect(legal.responsibilities.join(" ")).toMatch(/terminos/i);
    expect(legal.responsibilities.join(" ")).toMatch(/gdpr/i);
    expect(legal.responsibilities.join(" ")).toMatch(/pci/i);
  });
});
