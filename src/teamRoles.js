function getTeamRoles() {
  return [
    { title: "Product Owner / Lead Dev", responsibilities: ["Definicion de roadmap", "Arquitectura de la IA", "Conexion con la API de Meta"] },
    { title: "Fullstack Developer", responsibilities: ["Mantenimiento del Dashboard en Next.js", "Endpoints de gestion en FastAPI"] },
    { title: "DevOps / Infra", responsibilities: ["Gestion de Terraform", "Pipelines de CI/CD", "Monitoreo de salud del sistema"] },
    { title: "Soporte Técnico / Customer Success", responsibilities: ["Gestion de tickets", "Ayuda en el App Review", "Configuracion inicial de Fanpages"] },
    { title: "Legal/Compliance (Outsourced)", responsibilities: ["Revision de terminos y condiciones", "Cumplimiento GDPR/PCI"] },
  ];
}

module.exports = { getTeamRoles };
