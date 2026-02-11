# Repository Guidelines

## Project Structure & Module Organization
`src/components/` contains component implementations (for example `src/components/slider.ts`). Root `src/*.ts` files are public entrypoints that re-export those components, and `src/index.ts` is the package barrel. Tests live in `test/` (`test/components.test.ts`, `test/setup.ts`). Build output is generated into `dist/` and should not be edited manually.

## Build, Test, and Development Commands
- `bun install`: install dependencies.
- `bun run dev`: watch mode build with Rolldown for local iteration.
- `bun run typecheck`: run strict TypeScript checks with `tsc --noEmit`.
- `bun run build`: emit declarations and bundle package outputs.
- `bun run test`: run Bun DOM unit tests with `test/setup.ts` preload.

Use CI parity before opening a PR: `bun run typecheck && bun run build && bun run test`.

## Coding Style & Naming Conventions
Use strict TypeScript and preserve existing compiler constraints in `tsconfig.json`. Follow current style in `src/components/*`: 2-space indentation, semicolons, double quotes, and explicit return types on public methods. Use:
- `kebab-case` for file names (`toast-notification.ts`)
- `PascalCase` for class/type names (`XToastNotification`)
- `uix-*` custom-element tag names (`uix-toast-notification`)

Keep imports at the top of files. Prefer small, focused components with clear attribute/property sync behavior.

## Testing Guidelines
Tests use `bun:test` with Happy DOM. Add or update tests in `test/components.test.ts` for behavior changes and regressions. Name tests with behavior-oriented descriptions (for example, `it("syncs value attribute on input")`). Reset DOM state between tests to avoid coupling.

## Commit & Pull Request Guidelines
Recent history shows concise imperative subjects, with occasional Conventional Commit prefixes (for example `feat:`). Recommended format:
- `feat: add uix-carousel keyboard navigation`
- `fix: guard null shadow root query`

For PRs, include:
- clear summary of behavior changes
- linked issue (if applicable)
- test evidence (`bun run typecheck`, `bun run build`, `bun run test`)
- screenshots or GIFs for visual component changes
