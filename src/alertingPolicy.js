function getAlertingPolicy() {
  return {
    criticalConditions: [
      "Uptime: Error 5xx persistente > 1 min en Webhooks",
      "Latencia: P95 > 5s en comentarios",
      "Integracion: Meta Graph API auth error masivo",
      "Base de Datos: Supabase CPU/RAM > 80%",
      "IA: Fallos consecutivos en proveedor LLM",
    ],
    channels: {
      high: ["Slack #alerts-critical", "PagerDuty"],
      medium: ["Email", "Dashboard admin"],
    },
    escalation: [
      { level: 1, windowMinutes: 15, actions: ["Respuesta automatica", "Aviso DevOps guardia"] },
      { level: 2, afterMinutes: 15, actions: ["Escalar a CTO/Lider tecnico"] },
      { level: 3, afterMinutes: 30, actions: ["Comunicacion en pagina de estado/redes"] },
    ],
    runbooks: [
      { id: "RB-001", title: "Meta Token Expired", action: "Refrescar System User Token" },
      { id: "RB-002", title: "OpenAI Timeout", action: "Failover de OpenAI a Gemini" },
      { id: "RB-003", title: "DB Deadlock", action: "Terminar procesos bloqueantes" },
    ],
  };
}

module.exports = { getAlertingPolicy };
