# SLICE PACKET 33

## Metadata
- **Slice:** 33
- **Name:** CICD: 12. Gestión de Versiones y Código
- **Description:** Implementar lo descrito en: Planificación: LiveStreamSell AI (SaaS Global) > 12. Gestión de Versiones y Código (líneas 1125-1168).
- **Heading Path:** Planificación: LiveStreamSell AI (SaaS Global) > 12. Gestión de Versiones y Código
- **Lines:** 1125-1168
- **Estimated Lines:** 88
- **Priority:** high

## Hashes (immutability proof)
- **PRD SHA256:** `62c396bb1963049fddb3da32d2d9116a6207941f516e0d43a938d8086d7f066d`
- **Block SHA256:** `252278e83e8b9a4ca3e182826c111c0c574abef4edf062d650a70190c2a7852b`

## PRD Content (exact text for this slice)
```markdown
## 12. Gestión de Versiones y Código

- **Branching Strategy**:

	- GitHub Flow: Se adopta un modelo ágil basado en ramas de características (feature/*) que nacen de main.

	- Protección de Rama: La rama main está protegida; requiere paso de CI y al menos una aprobación manual (Review) para realizar el merge.

	- Hotfixes: Ramas hotfix/* para correcciones críticas en producción que se integran inmediatamente tras validar.

- **Convenciones de Commits**:

	- Conventional Commits: Formato obligatorio tipo(alcance): descripción (ej: feat(api): add paypal integration).

	- Tipos Permitidos: feat (nueva funcionalidad), fix (corrección de error), docs, style, refactor, test, chore.

- **Code Review**:

	- Proceso: Cada Pull Request (PR) debe incluir una descripción clara del "Qué" y "Por qué".

- **Checklist**:

	[ ] ¿El código cumple con el coverage de tests definido?

	[ ] ¿Se han actualizado las variables de entorno en Staging/Prod si aplica?

	[ ] ¿Se han evitado "n+1 queries" en las llamadas a Supabase?

	[ ] ¿La lógica de la IA maneja correctamente los casos de error/timeout?

- **Versionamiento Semántico (SemVer)**:

	- Major (X.0.0): Cambios que rompen la compatibilidad (ej: cambio masivo en la API de Webhooks).

	- Minor (0.X.0): Nuevas funcionalidades compatibles (ej: nueva pasarela de pago).

	- Patch (0.0.X): Correcciones de errores y parches de seguridad.

- **Changelog**:

	- Automatización: Uso de standard-version o release-please para generar automáticamente el archivo CHANGELOG.md basado en los mensajes de los commits.

	- Visibilidad: Publicación de las notas de versión en el Panel de Control para que los vendedores conozcan las mejoras.

```

## Contract
- **Test File:** `tests/contracts/slice-033.test.ts`
- **Requirement:** Cubrir comportamiento descrito en "Planificación: LiveStreamSell AI (SaaS Global) > 12. Gestión de Versiones y Código"
- **RED then GREEN:** YES

## Instructions for Agent

1. Create test in `tests/contracts/slice-033.test.ts`
2. Run `npm run red` → MUST FAIL
3. Implement code (<88 lines)
4. Run `npm run green` → MUST PASS
5. Run `npm run complete 33`
