function getDisasterRecoveryPlan() {
  return {
    steps: [
      "Alerta automatica via PagerDuty/Slack > 5 min",
      "Cloudflare a pagina de Mantenimiento Programado",
      "Restaurar imagen estable desde GHCR o reinicio en Render",
      "Restaurar DB al ultimo Point-in-Time (PITR)",
      "Smoke Tests automaticos post-recuperacion",
      "Post-mortem documentado en Wiki",
    ],
    backups: {
      scope: ["Postgres DB", "Terraform config", "audit logs", "order states"],
      database: { frequencyHours: 24, pitrDays: 7 },
      files: { target: "S3", mode: "sincronizacion continua" },
      location: "Supabase PITR + exportacion semanal a S3",
      restore: "Consola Supabase o terraform apply",
    },
    chaosEngineering: [
      "Fallo API Meta: desconectar Webhook, cola eventos o aviso al vendedor",
      "Latencia OpenAI 30s sin bloquear otros usuarios",
      "Caida Flow/PayPal y sugerir Transferencia",
      "Pico 5000 comentarios en 1 minuto, Redis + auto-scaling",
    ],
  };
}

module.exports = { getDisasterRecoveryPlan };
