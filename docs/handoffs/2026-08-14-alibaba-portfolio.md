# Alibaba portfolio page handoff

Date: 2026-08-14

Repository: `RellFu/pengwei-portfolio`

Codex handoff branch: `codex/2026-08-13-alibaba-portfolio-experience`

Target route: `/projects/alibaba-creative-ai-quality-system`

The starting point is the commit that contains this handoff file. The final handoff message supplies its exact SHA.

## Purpose of the page

This is an interview presentation surface, not a conventional long-form case study. Pengwei opens the page while speaking with an interviewer. It must establish the product quickly, support a clear story, and demonstrate both AI product judgment and technical execution.

The narrative has two responsibilities:

1. Explain the anonymized creative AI product and its professional film and television workflow.
2. Show Pengwei's ownership of the quality system built around that product.

## Current product definition

Public name: `Alpha`

Current headline:

> An AI workspace for film and TV story development.

Current supporting copy:

> Built for writers and production teams, Alpha brings task-running Agents, reusable storytelling Skills, structured IP knowledge, and project files into one desktop workspace. It supports the full workflow from script analysis to production-ready artifacts.

Do not restore the real product name or mark.

## Current implementation

### Product context and simulator

- The page introduces Alpha before explaining the quality problem.
- The desktop simulator uses a fixed shell height so Chat, Bot, and Knowledge modes do not move the page below it.
- The left navigation width and bottom mode dock are fixed across modes.
- The public navigation modes are Chat, Bot, and Knowledge.
- Chat demonstrates an executable story-development task with files, a reusable Skill, knowledge lookup, validation steps, generated artifacts, and a scheduled task.
- Bot demonstrates specialist Agents and a shared rewrite room.
- Knowledge demonstrates the structured IP library and a detailed English reconstruction of `The Devil Wears Prada` source material.
- The top-right product tools expose model selection, clipboard history, and Skill management.
- GSAP animates mode and tool transitions. Motion should remain restrained and interruptible.

### Knowledge detail

The detailed knowledge view currently includes:

- Story overview
- Plot structure
- Selectable character profiles
- World structure
- Episode content and Creative analysis labels that remain visible but unavailable

The English content was reconstructed from the supplied Chinese knowledge-base document. Do not replace it with a short generic movie summary.

### Page structure

- The experimental capability carousel and the later four-card capability grid were removed at the user's request.
- Do not restore those sections without explicit approval.
- The page proceeds from product context into the quality problem and Pengwei's work.

## Verified ownership represented on the page

- Independently audited all 55 Skills and built `skill-evaluator`.
- Owned product design, Prompt and Skill authoring, testing, and iteration for the Three-Act and Bible Skills.
- Designed and configured the instrumentation list, patrol Skill, and scheduled task that were used in the work group.
- Proposed the knowledge-base Schema and advanced it through review.
- Labeled 91 query-response pairs across five sessions.
- Decomposed the evaluated workflow into 34 tasks.

Do not weaken these supported ownership statements into vague team participation. Do not invent additional metrics or outcomes.

## Source boundary

Private source materials are stored in a separate local career evidence workspace. Their path is supplied to the next agent outside this public repository.

They may be read only when the user has authorized local evidence review. They must not be copied into this public repository, attached to an external project library, or included in a public commit.

## Design direction

- Match the visual quality and hierarchy of the ByteDance and DiDi experience pages without copying their narrative structure.
- Favor an Apple-like editorial hierarchy: generous whitespace, strong typography, carefully cropped product UI, and physical but restrained motion.
- The simulator should feel like one coherent desktop product.
- Avoid ornamental UI that does not improve the interview story.
- Keep visitor-facing English direct and human. Never use the em dash character.

## Known implementation details

- Visitor-facing branding is Alpha, but some internal identifiers remain `PhaiProductSimulator`, `PhaiProductDemoLegacy`, and `phai-product-simulator.tsx`.
- Renaming those identifiers is optional cleanup. It must not be mixed into a visual change unless imports and build output are verified.
- The deleted `src/components/phai-capability-carousel.tsx` is intentional.

## Recommended next-agent procedure

1. Create a clean worktree and a new branch from the handoff SHA.
2. Run the existing build before editing.
3. Open the route at desktop and mobile widths.
4. State the proposed design change and files before implementation.
5. Keep changes limited to the Alibaba experience unless the user expands the scope.
6. Validate lint, production build, and whitespace before committing.

## Open work

- Continue only from the user's next concrete design request.
- Perform a fresh visual regression review after any simulator layout change.
- Preserve the fixed shell geometry across Chat, Bot, and Knowledge modes.
- Confirm that any new public copy remains anonymized and contains no em dash character.

## Validation at handoff

- Target-file ESLint passed for the Alibaba case-study component, product simulator, and project data.
- The production Next.js build passed and generated the Alibaba route as static content.
- `git diff --check` passed.
- Repository-wide ESLint still reports three pre-existing errors outside this task: one unescaped apostrophe in `agent-architecture-section.tsx` and two `Math.random()` purity violations in `merchant-onboarding-case-study.tsx`.
