# Slice 049 — Runtime local production-like (Docker Compose + FastAPI /health)

## Objetivo
Agregar un runtime local “production-like” para que el sistema se pueda ejecutar en tu máquina de forma muy parecida a producción:
- contenedores
- configuración por env vars
- healthcheck real
- comando único para levantar/bajar
Sin inventar features de negocio.

## Fuente (PRD)
Usar SOLO lo que el PRD define sobre:
- Development environment: Docker Compose
- Backend: FastAPI
- Containerización: Docker multi-stage
- Health endpoint: /health

NO tocar PRD_EXHAUSTIVO.md.

## Alcance permitido (files-to-touch)
Se permite CREAR/MODIFICAR solo:
- backend/** (nuevo)
- docker-compose.yml (nuevo)
- backend/Dockerfile (nuevo)
- backend/requirements.txt (nuevo)
- backend/app/main.py (nuevo)
- package.json (modificar scripts solamente)
- README.md (opcional: sección “Local run”)
- tests/contracts/slice-049.test.ts (nuevo)  (solo si se puede testear sin flakiness)

Prohibido:
- modificar cualquier archivo en src/**
- modificar scripts/ai-agent-orchestrator.js
- modificar scripts/analyze-prd.js
- modificar PRD_EXHAUSTIVO.md

## Diseño mínimo (no negociable)
### Backend (FastAPI)
- app en `backend/app/main.py`
- endpoint `GET /health`
- respuesta JSON:
  - `{ "ok": true, "service": "api", "env": "<ENV>", "timestamp": "<iso>" }`
- healthcheck debe ser rápido y no depender de DB todavía (si DB/Redis no están implementados como runtime real, no inventarlos).

### Docker
- `backend/Dockerfile` multi-stage (simple pero correcto)
- imagen final liviana
- `uvicorn` como command
- expone puerto 8000

### Docker Compose
- `docker-compose.yml` levanta al menos:
  - service: `api`
    - build: ./backend
    - ports: "8000:8000"
    - env_file: .env.local (crear si hace falta; puede ser ejemplo)
    - healthcheck que pegue a `http://localhost:8000/health`
- NO agregar DB/Redis a menos que ya exista runtime real para ellos (no inventar).

### Scripts (package.json)
Agregar scripts (sin romper los existentes):
- "dev:up": "docker compose up --build -d"
- "dev:down": "docker compose down -v"
- "dev:logs": "docker compose logs -f --tail=200"
- "dev:smoke": "node scripts/smoke-health.js" (crear si hace falta) o "curl -fsS http://localhost:8000/health"
- "prod:local": "docker compose up --build" (foreground)

## Evidencia requerida
- Comando:
  - `npm run dev:up`
  - `npm run dev:smoke`  (debe mostrar JSON ok=true)
  - `npm run dev:down`
- Adjuntar en el resultado:
  - salida de `curl http://localhost:8000/health`
  - listado de archivos creados/modificados

## Criterios de aceptación (pass/fail)
- Existe backend FastAPI ejecutable en contenedor.
- `GET /health` responde 200 con JSON requerido.
- `npm run dev:up` levanta el sistema sin intervención manual.
- `npm run dev:down` apaga y limpia.
- No se modificó nada fuera del alcance permitido.

## NOTAS
Este slice es “Runtime Assembly”. No agrega features de negocio ni UI.
El objetivo es que el deployment real sea directo: mismos contenedores, mismas env vars, misma healthcheck.
