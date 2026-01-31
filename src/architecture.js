function getArchitectureOverview() {
  return {
    style:
      "Event-driven y serverless con desacoplamiento para que un fallo de la API de IA no detenga eventos de Meta.",
    dataPipeline: [
      "Meta Webhook -> API Gateway (FastAPI) -> Validacion de firma y filtro Regex.",
      "Redis Streams para mensajeria asincrona en Upstash/Render.",
      "Worker asincrono -> cache Redis para stock -> AI Engine.",
      "Intencion de compra -> bloqueo de stock en Supabase -> Payment Module.",
      "Meta Send API (Messenger).",
    ],
  };
}

module.exports = { getArchitectureOverview };
