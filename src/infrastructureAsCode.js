function getInfrastructureAsCode() {
  return {
    tool: {
      name: "Terraform",
      reasons: ["Multi-cloud", "gran comunidad", "infra declarativa"],
    },
    organization: {
      modules: {
        networking: "VPCs, subredes y reglas de firewall",
        compute: "Servicios en Render (Web Services y Background Workers)",
        database: "Supabase y extensiones de Postgres",
        storage: "Buckets S3 para backups e imagenes",
      },
    },
    workspaces: {
      environments: ["staging", "production"],
      purpose: "Separar estados y evitar colisiones",
    },
    stateManagement: {
      backend: "S3",
      locking: "DynamoDB o Terraform Cloud",
      file: "terraform.tfstate",
    },
    managedResources: {
      networking: "Dominios, SSL via Cloudflare/Render y redirecciones",
      compute: "Variables de entorno, autoscaling min/max, CPU/RAM",
      databases: "Tablas, roles y politicas RLS en Supabase",
      monitoring: "Dashboards Grafana y alertas Prometheus",
      secrets: "Vault o gestor de secretos para llaves API",
    },
  };
}

module.exports = { getInfrastructureAsCode };
