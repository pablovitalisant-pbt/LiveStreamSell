# Skill: pbt-ultra-run-slice

## Purpose
Ejecutar un slice completo bajo la metodología PBT-ULTRA, sin improvisaciones, respetando
RED → GREEN → COMPLETE → NEXT, con trazabilidad y enforcement duro.

Esta skill NO decide qué implementar.
Solo ejecuta lo que el sistema ya definió en:
- .claude/SLICES_PLAN.json
- .claude/STATE.json
- .claude/packets/slice-XXX.packet.md
- .claude/EVOLUTION_LOG.md

## Mandatory Pre-Read (DO NOT SKIP)
Before doing anything, ALWAYS read:
1. .claude/STATE.json
2. .claude/EVOLUTION_LOG.md
3. The packet of the current slice:
   .claude/packets/slice-XXX.packet.md

If any of these files are missing or inconsistent, STOP and report the error.

## Execution Protocol (STRICT ORDER)

1. Show current status:
   - Run: npm run status
   - Identify current slice number and state.

2. RED phase (mandatory):
   - Run: npm run red
   - Ensure tests FAIL for the current slice.
   - Store evidence automatically (handled by orchestrator).
   - If tests do not fail, STOP and report.

3. Implementation phase:
   - Implement ONLY what is required by:
     - The slice contract
     - The packet scope
     - The PRD section referenced by source
   - DO NOT:
     - Touch PRD_EXHAUSTIVO.md
     - Touch other slices
     - Add features not explicitly required
   - Keep changes minimal.

4. Verification:
   - Run: npm test
   - All tests for the slice must pass.

5. GREEN phase:
   - Run: npm run green
   - If green fails, analyze test output and fix implementation.
   - Repeat steps 3–5 until green passes.

6. Completion:
   - Run: npm run complete
   - Append a clear entry to .claude/EVOLUTION_LOG.md including:
     - Slice number
     - What was implemented
     - Files touched
     - Confirmation of RED/GREEN evidence

7. Advance:
   - Run: npm run next
   - Do NOT start the next slice automatically unless explicitly instructed.

## Guardrails (NON-NEGOTIABLE)

- Never assume intent.
- Never invent features.
- Never refactor outside the slice.
- Never skip RED.
- Never skip logging.
- If context is unclear, re-read EVOLUTION_LOG.md and the packet.

## Output Expectation
At the end of execution:
- Slice is marked complete in STATE.json
- Tests are green
- EVOLUTION_LOG.md has a new entry
- System is ready for the next slice

## Failure Handling
If any step fails:
- Stop immediately
- Report exact reason and file
- Do not attempt creative fixes
