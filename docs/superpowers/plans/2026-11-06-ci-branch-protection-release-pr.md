# CI, Master Protection and Release PR Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Gate every change to `master` behind a green `ci` check (ESLint,
Prettier, build, type check, tests, dist SSR check, Storybook build), protect
`master` with a committed ruleset, and add a `/release-pr` skill that prepares
the changesets release pull request.

**Architecture:** Two pull requests.

- **PR A** (branch `chore/ci-and-quality-gate`, which already has the spec
  commit) makes the repo pass every new check, adds the checks as root scripts,
  and adds `.github/workflows/ci.yml` plus the ruleset file and its apply
  script. After it merges, the ruleset is applied.
- **PR B** (branch `chore/release-pr`, cut from `master` after that) adds
  `scripts/release-pr.sh`, the skill, and the docs, and is the first PR to
  pass through the gate.

**Tech Stack:** pnpm 10.32.1 workspaces, Turborepo, Vite, vue-tsc 3.2.4,
Vitest 4, Prettier 3 with `prettier-plugin-tailwindcss`, ESLint 10 flat config,
GitHub Actions, GitHub rulesets, Changesets 2, bash with `jq` and `gh`.

**Spec:** `docs/superpowers/specs/2026-11-06-ci-branch-protection-release-pr-design.md`.
Read it first. Section numbers below (§4.2 and so on) point into it.

**Reference project (read-only):** `/mnt/projects/manguito-cms`. The files to
port are `eslint.config.mjs`, `.github/workflows/ci.yml`,
`.github/rulesets/master.json`, `scripts/apply-ruleset.sh`,
`scripts/release-pr.sh`, `.claude/skills/release-pr/SKILL.md` and
`RELEASE.md`.

## Global Constraints

- **No published API change:** no prop, slot, emit, export or CSS-entry
  change. Every `src/components/*/dist/**/*.d.ts` stays byte-identical to
  `master`'s build.
- **Allowed JS changes:** only the behavior-neutral rewrites listed in spec
  §4.1 and §4.2. Every bundle difference must be accounted for in the task
  report.
- **No changeset in either PR,** unless a fix provably changes shipped
  behavior. In that case add a patch changeset and say why.
- **Rule disables need reasons.** Fix violations. A rule turned off in the
  config gets a one-line reason comment; a per-line `eslint-disable` needs a
  reason too. `@typescript-eslint/no-explicit-any` is off, with the reason in
  §4.2.
- **`.agents/` is never reformatted.** It is vendored and tracked by hash in
  `skills-lock.json`.
- **The job name stays `ci`.** The CI job id and name are both `ci`, the
  workflow `name:` is `CI`, there is no `paths` filter, and the ruleset's
  required context is `ci`.
- **Node 24 in CI;** pnpm comes from `packageManager`, with no version input.
- **Commits** use `git commit -m "type(scope): subject"` (conventional) and end
  with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- **Owner checkpoints:** pushing a branch, opening a PR, applying the ruleset
  and merging each wait for the owner's explicit yes in the session. Never
  run `changeset publish`.

## Review Focus

1. **The release branch must pass `ci`.** `changeset version` rewrites
   `package.json` and `CHANGELOG.md` files, so `pnpm format:check` and
   `pnpm install --frozen-lockfile` must still pass on that branch.
   (Pinned in Task 7, Step 4.)
2. **Clean checkout:** `pnpm typecheck` must pass even when no package has a
   `dist/`, because consumer packages read theme types from `dist`.
   (Pinned in Task 3, Step 4.)
3. **Finding the last release commit:**
   - It must still be found when the last release PR was squash-merged. The
     squash subject is `chore(release): version packages (<date>)`.
   - When no `chore(release)` commit exists, the check must skip with a note,
     not fail. (Pinned in Task 7, Step 5.)
4. **The required check has to report.** The ruleset's required check and the
   workflow job must agree on `ci`. A mismatch blocks every PR forever.
   (Pinned in Task 5, Step 3.)
5. **Private packages stay out of release lists.** `@mcl/test-utils` must never
   appear in the commit body, the PR body, or the coverage warnings, even
   when a dependency bump touches it. (Pinned in Task 7, Step 4.)

---

## PR A: branch `chore/ci-and-quality-gate`

Before Task 1, build `master` once and save every package's `dist/` to the
scratchpad, as in `cp -r src/components/<p>/dist <scratch>/base/<p>`. Each
task's dist checks diff against this baseline.

### Task 1: Remove `deprecated/` and make Prettier pass

**Files:**

- Delete: `deprecated/` (the whole tree)
- Create: `.prettierignore`
- Modify: every file `prettier --write .` changes (formatting only)

**Interfaces:**

- Produces: root scripts `"format": "prettier --write ."` and
  `"format:check": "prettier --check ."`.

- [ ] **Step 1:** `git rm -r -q deprecated`, then confirm nothing references
      it: `grep -rn "deprecated/" --exclude-dir={node_modules,dist,.git} .`
      prints nothing outside `docs/`.
- [ ] **Step 2: Create `.prettierignore`.** It lists `.agents/`,
      `pnpm-lock.yaml`, `**/dist/`, `**/CHANGELOG.md`, `storybook-static/` and
      `.turbo/`.
- [ ] **Step 3:** Add the two scripts to the root `package.json`. Run
      `pnpm format`.
- [ ] **Step 4: Verify.**
  - `pnpm format:check` exits 0.
  - `git diff --stat -- .agents` is empty.
  - `pnpm test` reports `431 passed`.
  - `pnpm run package:build --force`, then diff every `dist/` against the
    baseline. All must be identical: formatting doesn't change the output.
- [ ] **Step 5:** Commit, with the deletion and the formatting as separate
      commits so review can skip the formatting:
      `chore: remove the unused deprecated/ tree` and
      `style: format the repo with prettier`.

### Task 2: ESLint config and scripts

**Files:**

- Create: `eslint.config.mjs`
- Modify: root `package.json` (the `lint` script and devDependencies),
  `pnpm-lock.yaml`

**Interfaces:**

- Produces: `"lint": "eslint ."`.

- [ ] **Step 1: Add root devDependencies.** Add `eslint@^10.6.0`,
      `@eslint/js@^10.0.1`, `typescript-eslint@^8.63.0`,
      `eslint-plugin-vue@^10.11.1`, `vue-eslint-parser@^10.4.1` and `globals`,
      using `pnpm add -D -w`.
- [ ] **Step 2: Write `eslint.config.mjs`.** Port the CMS file and change it as
      follows:
  - **Ignores:** `**/dist/**`, `**/node_modules/**`, `.agents/**`,
    `public/**`, `storybook-static/**` and `.turbo/**`.
  - **Node globals** (`globals.node`) for `**/*.{mjs,cjs,js}` and
    `scripts/**`.
  - **`@typescript-eslint/no-explicit-any`: `'off'`,** with this reason
    comment: "public prop and slot types use `any`; retyping them changes
    published .d.ts and is a separate, changeset-carrying release".
  - Keep the CMS `no-unused-vars` `^_` patterns and its `.vue` block,
    including the reason comments.
- [ ] **Step 3: Run it.** Run `pnpm lint -f json -o <scratch>/lint.json`. The
      output should contain no `no-explicit-any` and no `no-undef`. The rest
      roughly matches the builder check: `no-unused-vars` about 20,
      `no-unused-expressions` about 19, `vue/valid-v-for` 5, `prefer-const` 3,
      `vue/require-v-for-key` 3, `vue/no-unused-vars` 2, plus one each of
      `no-empty-object-type`, `return-in-computed-property`,
      `multi-word-component-names` and `no-v-text-v-html-on-component`.
      Record the counts in the task report.
- [ ] **Step 4:** Commit `build: add eslint with the manguito-cms flat config`.

### Task 3: Fix lint violations and add `typecheck`

**Files:**

- Modify: the files reported in Task 2, Step 3, and
  `src/components/manguito-theme/lib/carousel/CarouselContent.vue` (`slideRef`).
- Modify: `turbo.json`, every `src/components/*/package.json`,
  `src/utils/test/package.json`, `scripts/templates/_package.md` and the root
  `package.json`.

**Interfaces:**

- Consumes: `pnpm lint` from Task 2.
- Produces: root `"typecheck": "turbo run typecheck"`, and in each package
  `"typecheck": "vue-tsc --noEmit -p tsconfig.json"`. The turbo task is
  `"typecheck": { "dependsOn": ["^build"], "outputs": [] }`.

- [ ] **Step 1: Fix every violation.** Use the rules in spec §4.2:
  - `void el.offsetHeight` for the forced reflows;
  - an explicit `return undefined` in `DropdownContent.vue`'s computed;
  - a per-line disable, with its reason, for `MclHeroC.vue`'s `v-html` on
    `<component :is>`;
  - `let` → `const` for `prefer-const`;
  - keys for `v-for` (stories);
  - unused variables removed or `_`-prefixed.

  For `vue/multi-word-component-names`, rename only if the component isn't
  exported; otherwise disable it per line with a reason. For `slideRef`,
  check the template and `defineExpose` first (§4.1). Then `pnpm lint` exits 0.

- [ ] **Step 2: Add the `typecheck` scripts and turbo task.** Add the scripts
      listed in Interfaces to every package, including `src/utils/test`, and
      the task to `turbo.json`. Add the same script line to
      `scripts/templates/_package.md`.
- [ ] **Step 3:** Run `pnpm typecheck`; it exits 0 across 12 packages.
- [ ] **Step 4 (Review Focus 2):** Run
      `rm -rf src/components/*/dist && pnpm turbo run typecheck --force`.
      It exits 0, because turbo builds the theme first.
- [ ] **Step 5: Verify behavior and output.**
  - `pnpm test` reports `431 passed`.
  - `pnpm test:dist` exits 0.
  - Rebuild with `--force`. Every `dist/**/*.d.ts` must be identical to the
    baseline.
  - For each differing `.js`/`.cjs`, run `diff` and list every hunk in the
    report, each mapped to its fix in Step 1. Any other hunk means the fix was
    not behavior-neutral: revert it and redo it.
- [ ] **Step 6:** Commit `fix: resolve eslint findings without behavior
changes` and `build: add a turbo typecheck task with vue-tsc`.

### Task 4: Storybook build check

**Files:**

- Modify: `eslint.config.mjs` (ignore) and `.prettierignore`, only if
  `storybook-static` isn't already covered.

- [ ] **Step 1:** Run `pnpm exec storybook build -o storybook-static --quiet`.
      It exits 0, and `git status --short` shows nothing new, because
      `.gitignore` already lists `storybook-static`.
- [ ] **Step 2:** `pnpm lint` and `pnpm format:check` still exit 0 with
      `storybook-static/` present. Delete the folder afterwards.
- [ ] **Step 3:** Commit, only if Step 2 needed a change.

### Task 5: CI workflow, ruleset file and apply script

**Files:**

- Create: `.github/workflows/ci.yml`, `.github/rulesets/master.json`,
  `scripts/apply-ruleset.sh` (mode 755).

**Interfaces:**

- Produces: the check context `ci`, which the ruleset requires. Running
  `scripts/apply-ruleset.sh [--dry-run]` applies the ruleset.

- [ ] **Step 1: Write `ci.yml`.** Port the CMS workflow (§4.4).
  - Keep: `name: CI`, the triggers, the concurrency block and its comment,
    `permissions`, the `ci` job with its coupling comment, the timeout, and
    the action major versions.
  - Drop: `services`, `env` and the smoke step.
  - Steps, in this order:
    1. checkout;
    2. pnpm setup;
    3. setup-node 24 with `cache: pnpm`;
    4. `pnpm install --frozen-lockfile`;
    5. `pnpm lint`;
    6. `pnpm format:check`;
    7. `pnpm run package:build`;
    8. `pnpm typecheck`;
    9. `pnpm test`;
    10. `pnpm --filter @bobbykim/manguito-theme run test:dist`;
    11. `pnpm exec storybook build -o storybook-static --quiet`.
- [ ] **Step 2:** Copy `master.json` and `apply-ruleset.sh` from the CMS
      unchanged. The script's header comment points to the `RELEASING.md`
      section "When CI or the ruleset blocks you" instead of the CMS ADR.
- [ ] **Step 3 (Review Focus 4): Check the two files agree.**
      `node -e` loads the workflow with the `yaml` package if present, or uses
      `grep`, and asserts all three of these:
  - the job key is `ci` and its `name` is `ci`;
  - `jq -r '.rules[]|select(.type=="required_status_checks").parameters.required_status_checks[].context' .github/rulesets/master.json`
    prints `ci`;
  - there is no `paths:` under `on:`.
- [ ] **Step 4:** Run `bash -n scripts/apply-ruleset.sh`, then
      `scripts/apply-ruleset.sh --dry-run`. It prints
      `dry run: would POST repos/bobbykim89/manguito-component-library/rulesets ...`.
      It only reads from GitHub.
- [ ] **Step 5: Rehearse CI locally.** Run the workflow's commands in order
      from a fresh clone of the branch in the scratchpad, starting with
      `pnpm install --frozen-lockfile`. All of them exit 0.
- [ ] **Step 6:** Commit `ci: add the ci workflow and master ruleset`.

### Task 6: Land PR A and apply the ruleset (owner checkpoints)

- [ ] **Step 1:** Ask the owner, then push the branch and open PR A. The body
      follows the repo's PR template from earlier PRs (Summary / Evidence /
      Merge Danger) and includes the Task 3 dist-diff accounting.
- [ ] **Step 2:** Watch the run with `gh pr checks --watch`. `ci` must succeed.
      If it fails, fix it on the branch.
- [ ] **Step 3:** The owner merges. Then confirm `ci` succeeded on the merge
      commit:
      `gh run list --branch master --workflow CI --commit "$(git rev-parse origin/master)" --limit 1`.
- [ ] **Step 4:** Ask the owner, then run `scripts/apply-ruleset.sh`. Check it:
      `gh api repos/bobbykim89/manguito-component-library/rulesets --jq '.[].name'`
      prints `master-protection`.

---

## PR B: branch `chore/release-pr`, from the updated `master`

### Task 7: `scripts/release-pr.sh`

**Files:**

- Create: `scripts/release-pr.sh` (mode 755).

**Interfaces:**

- Usage: `scripts/release-pr.sh` (prepare, ask, then open),
  `scripts/release-pr.sh prepare`, and `scripts/release-pr.sh open [--dry-run]`.
- Commit subject: `chore(release): version packages`.
- PR title: `chore(release): version packages (<branch date>)`.

- [ ] **Step 1: Port the CMS script, with these changes.**
  - `published_packages_json` reads `src/components/*/package.json` and
    `src/utils/*/package.json`, keeping `private != true`.
  - The version step runs `pnpm run package:version`.
  - Doc references point to `RELEASING.md`.
  - A new `coverage_warnings <status-file>` function runs after the `[ -n
"$changed" ]` guard and before the branch is created. It prints to stderr
    and never exits non-zero: 1. Find the last release commit with
    `git log --grep '^chore(release)' -1 --format=%H`. If none exists,
    print `note: no previous chore(release) commit; skipping the coverage check`
    and return. 2. List the directory names that changed since then:
    `git diff --name-only <sha>..HEAD -- src/components | cut -d/ -f3 | sort -u`. 3. Map each to its `package.json` `.name`, skipping private packages. 4. Print `warning: <name> changed since <short-sha> but has no pending release`
    for each name absent from the status file's `.releases[] | select(.type != "none") | .name`.
    Keep the result in a variable, and print it again in the summary at the
    end of `prepare`.

- [ ] **Step 2: Refusal checks,** run in a sandbox that cannot touch the real
      repo or GitHub. Do **not** use `git worktree`: worktrees share refs
      with the real checkout. Set up the sandbox like this:
  - `git clone --bare . <scratch>/origin.git`;
  - `git clone <scratch>/origin.git <scratch>/rel`;
  - copy `scripts/release-pr.sh` in;
  - `pnpm install --frozen-lockfile`.

  The sandbox's `origin` is the bare repo, so `prepare`'s fetch and branch
  probes stay local. Each command exits 1 with the message shown:
  - on a branch other than `master` → `You are on`;
  - with an untracked file present → `uncommitted changes`;
  - with no `.changeset/*.md` besides `README.md` →
    `no pending changesets`.

- [ ] **Step 3: Happy path.** In the sandbox, on `master`, commit a throwaway
      changeset `'@bobbykim/manguito-theme': patch`, "probe", and
      `git push origin master` to the bare repo. Then run `prepare`. Expect:
  - a branch `release/<today>`;
  - a commit body whose `Changed:` lists `@bobbykim/manguito-theme 1.2.0 → 1.2.1 (patch)`;
  - the ten `mcl-*` packages under `Bumped because a dependency changed:`.
- [ ] **Step 4 (Review Focus 1 and 5):** On that branch:
  - `pnpm format:check` exits 0;
  - `pnpm install --frozen-lockfile` exits 0;
  - `git status --short` is empty;
  - `git log -1 --format=%b | grep -c test-utils` prints `0`;
  - `scripts/release-pr.sh open --dry-run` prints the push and
    `gh pr create` commands and a body with `## Changelog` sections, with no
    `@mcl/test-utils`.

  If `format:check` fails on a file that `changeset version` rewrote, add
  `pnpm exec prettier --write $(git diff --name-only)` to `prepare`, right
  before its `git add -A`, and re-run. Don't widen `.prettierignore` for this.

- [ ] **Step 5 (Review Focus 3):** In the sandbox, test the coverage check.
      Return to `master` and delete the release branch first.
  - Commit `chore(release): version packages (2026-01-01)` (empty, with
    `--allow-empty`), then a commit touching
    `src/components/mcl-cards/README.md`, then a theme-only changeset. Push to
    the bare origin and run `prepare`. It prints
    `warning: @bobbykim/mcl-cards changed since`, which shows the
    squash-style subject is found.
  - Reset the sandbox: `git checkout --orphan solo && git commit -qm init`,
    then force-push `solo:master` to the bare origin and check out `master`
    from it. Add a theme changeset, push, and run `prepare`. It prints
    `note: no previous chore(release) commit` instead.
- [ ] **Step 6:** Delete `<scratch>/origin.git` and `<scratch>/rel`. Commit
      `feat(scripts): add release-pr.sh to prepare the release pull request`.

### Task 8: `/release-pr` skill

**Files:**

- Create: `.claude/skills/release-pr/SKILL.md`

**Interfaces:**

- Consumes: `scripts/release-pr.sh prepare|open` and its printed sections
  (Task 7).

- [ ] **Step 1: Write the skill.** Port the CMS `SKILL.md` (frontmatter
      `disable-model-invocation: true`). Replace its 0.x paragraph with the
      version-dependent rule from spec §4.6 step 2:
  - packages at 1.0 or above: breaking needs `major`;
  - 0.x packages: breaking needs `minor`, and every breaking change is
    named regardless of label;
  - a mismatch means the summary needs a higher bump than its label.

  Add relaying the script's coverage warnings to step 3. Replace the
  RELEASE.md step numbers with the RELEASING.md section names from Task 9.

- [ ] **Step 2: Check it.** `pnpm format:check` passes. The frontmatter
      `name` is `release-pr`. Every command the skill quotes exists in
      `scripts/release-pr.sh` or `RELEASING.md`; check with `grep`.
- [ ] **Step 3:** Commit `feat(skills): add the release-pr skill`.

### Task 9: Docs

**Files:**

- Modify: `RELEASING.md` (rewrite), `CONTRIBUTING.md` and `CLAUDE.md`.

- [ ] **Step 1: Rewrite `RELEASING.md`** per spec §4.7, with these section
      names, which Task 8 references:
  - "Release model"
  - "Prerequisites" (add `gh` and `jq`)
  - "1. Add a changeset"
  - "2. Open the release pull request" (`/release-pr`, the script, and doing
    it by hand)
  - "3. Merge it"
  - "4. Publish from master" (CI-success check, frozen install,
    `pnpm run package:build`, `pnpm changeset publish [--otp]`)
  - "5. Push tags" (`git push --follow-tags`)
  - "Verify"
  - "Docs site"
  - "Recovery" (drop the rows that assume a direct push; add `GH013`)
  - "When CI or the ruleset blocks you"
  - "Reference"
- [ ] **Step 2: Update `CONTRIBUTING.md`** per §4.7:
  - checks to run before pushing;
  - the bump table's 0.x row;
  - "Releasing" points to `/release-pr`.
- [ ] **Step 3: Update `CLAUDE.md`:**
  - add `lint`, `format`, `format:check` and `typecheck` under Commands;
  - add a line saying `master` is protected and changes need a PR with a
    green `ci`;
  - add the release skill under Releases.
- [ ] **Step 4: Check the docs.**
  - `pnpm format:check` exits 0.
  - Every script named in the three docs exists in `package.json` or
    `scripts/`.
  - `grep -n "push origin master" RELEASING.md CONTRIBUTING.md` prints
    nothing.
- [ ] **Step 5:** Commit `docs: document the protected-master release flow`.

### Task 10: Land PR B (owner checkpoints)

- [ ] **Step 1:** Ask the owner, then push and open PR B.
- [ ] **Step 2:** `ci` must succeed, and the PR shows as blocked until it
      does. That proves the gate works.
- [ ] **Step 3:** The owner merges it.
