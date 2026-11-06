# CI, Master Protection and Release PR Design

**Date:** 2026-11-06
**Status:** Design, pending owner approval of this document
**Scope:** repository tooling only. No published package's runtime code or
types change, apart from lint fixes that must not change behavior.
**Reference implementation:** `/mnt/projects/manguito-cms`, which already has
all of this working. Its files are named below wherever this repo should copy
them. Where this document and the reference differ, this document wins.

---

## 1. Intent

Today nothing checks a change before it reaches `master`. Tests, the build and
formatting all depend on the maintainer remembering to run them, and anyone
with push rights, including the owner, can push straight to `master`.
Releases are run by hand from `RELEASING.md`, including committing the version
bump directly on `master`.

The owner wants the same safety net the manguito-cms repo has:

1. **A `ci` check on every pull request** that installs, lints, checks
   formatting, builds, type checks and tests, so broken code is caught before
   merge.
2. **A protected `master`** that accepts changes only through a pull request
   whose `ci` check passed.
3. **A `/release-pr` skill** that prepares the release pull request: version
   bumps from changesets, changelogs, and a commit and PR describing the
   release, waiting for the owner's yes before anything is pushed.

## 2. Goals, non-goals, anti-goals

**Goals**

- One required GitHub Actions check, named `ci`, on every pull request and
  every push to `master`.
- "Code quality" means ESLint (new to this repo), Prettier, and a TypeScript
  type check of every package.
- The first `ci` run on the PR that introduces it is green. That means
  fixing what the new checks find today, in the same work.
- `master` protection is committed as a file and applied by a script, so it can
  be reviewed, restored after a hand edit, and reproduced.
- `/release-pr` turns the pending changesets into a reviewed release pull
  request in one step.
- `RELEASING.md` documents the new flow end to end.

**Non-goals**

- Publishing from CI. Publishing stays manual on the owner's machine, because it
  needs their npm OTP. Neither the skill nor CI ever runs `changeset publish`.
- Automating the Vercel Storybook deploy, which is unchanged.
- Required human approvals on pull requests. This is a single-maintainer repo.
- Changing `.changeset/config.json` or the versioning model.

**Anti-goals: these count as failures even if everything else works**

- A required check that never reports. Pull requests would wait forever. For
  example, the ruleset requiring `ci` before the workflow exists, or the job
  being renamed without updating the ruleset.
- Lint fixes that change component behavior, props, slots, emits or exports.
- Reformatting the vendored skills in `.agents/`. They are installed from
  `mattpocock/skills` and tracked by content hash in `skills-lock.json`.
- A release flow that still tells the owner to push to `master` directly. Once
  the ruleset is active, that push is rejected.

## 3. What exists today (checked 2026-11-06 on `8a5daf2`)

- No `.github/` directory. `master` has no rulesets and no branch protection.
  The repo is public, so GitHub Actions minutes are free. All three merge
  methods are enabled.
- No ESLint. Prettier `^3.8.1` with `prettier-plugin-tailwindcss`, configured
  in `.prettierrc`. There's no `.prettierignore`.
- `prettier --list-different .` lists 218 files:
  - most of them under `deprecated/`;
  - 16 under `docs/mcl-82/`;
  - about 30 elsewhere: `.agents/**`, `.claude/skills/**`,
    `CODE_OF_CONDUCT.md`, `.storybook/preview-head.html`, three package
    READMEs, `turbo.json`, `vitest.shared.ts`,
    `manguito-theme/scripts/check-dist-ssr.mjs`,
    `manguito-theme/lib/theme/__tests__/generateClass.test.ts`, and
    `pnpm-lock.yaml`.
- `vue-tsc --noEmit -p tsconfig.json` passes in every package except
  `manguito-theme`, which has one error: `TS6133 'slideRef' is declared but its
value is never read` in `lib/carousel/CarouselContent.vue`.
- `deprecated/` (1.7 MB: old components, stories, `mclTheme.ts`, its own
  `tsconfig.json`) is referenced by nothing. The owner confirmed it is no
  longer used.
- Root scripts: `pnpm test` (vitest), `pnpm run package:build` (turbo build),
  `pnpm test:dist` (turbo build, then theme `test:dist`), `pnpm run story:build`
  (turbo build, then `storybook build -o dist`). There's no `lint`,
  `format:check` or `typecheck` script.
- `RELEASING.md` describes a manual release that commits `chore(release):
version packages` on `master` and pushes it with `git push origin master
--follow-tags`. Step 0 has a coverage check that compares packages changed
  since the last `chore(release)` commit with `pnpm changeset status`.

## 4. Decisions

Each item is marked **Owner** (they decided it) or **Design call** (decided here,
open to the owner's correction).

### 4.1 One-time cleanup

- **Owner:** delete `deprecated/` entirely.
- **Owner:** fix whatever the new checks report, so the first run is green.
- **Design call:** add `.prettierignore` covering `.agents/`, `pnpm-lock.yaml`
  (generated by pnpm), `**/dist/`, and `**/CHANGELOG.md` (generated by
  changesets). Then run `prettier --write .` once and commit the result.
  `docs/` is formatted, not ignored.
- **Design call:** remove the unused `slideRef` in `CarouselContent.vue` only if
  it is truly dead. Check the template and any exposed API first. If it is
  used through a template ref, name it so the checker accepts it rather than
  deleting it.
- The formatting-only commit stays separate from logic fixes, so review can
  skip it.

### 4.2 ESLint

- **Owner:** add ESLint.
- **Design call:** copy `manguito-cms/eslint.config.mjs` (flat config):
  - `@eslint/js` recommended and `typescript-eslint` recommended;
  - `eslint-plugin-vue` `flat/essential`, which catches bugs and leaves
    template style to Prettier;
  - for `.vue` files: the TypeScript parser, `no-undef` off, and
    `vue/multi-word-component-names` off;
  - `@typescript-eslint/no-unused-vars` with the `^_` ignore patterns.

  Ignore `**/dist/**`, `**/node_modules/**`, `.agents/**`, `public/**` and
  `storybook-static/**` if present. Use the same major versions as the CMS
  (`eslint` 10, `@eslint/js` 10, `typescript-eslint` 8, `eslint-plugin-vue` 10,
  `vue-eslint-parser` 10), as root devDependencies.

- **Design call:** lint scope is the whole repo minus the ignores: `src/**`
  (packages, `src/utils`, stories), `scripts/`, `.storybook/`, and root config
  files.
- **Design call:** fix violations rather than disabling rules. A rule may be
  turned off only with a one-line comment in the config giving the reason, as
  the CMS does. Per-line `eslint-disable` comments need a reason too.
- Add `eslint-config-prettier` only if a formatting rule actually conflicts.
  `flat/essential` shouldn't need it.
- **What the CMS config finds today.** The builder check ran it with these
  ignores and found about 170 errors, about 95 of them `no-explicit-any`. The
  following are **Design calls** for the non-`any` hits:
  - **`no-unused-expressions`** (about 19, mostly `el.offsetHeight // force
repaint` in transition hooks): write them as `void el.offsetHeight`. The
    property read, and so the forced reflow, still happens.
  - **`no-undef` for `console`/`process` in `.mjs` scripts:** give the `.mjs` and
    `.js` script files Node globals through the config, from the `globals`
    package, rather than per-file comments.
  - **`vue/return-in-computed-property`** in
    `manguito-theme/lib/dropdown/DropdownContent.vue`: add the explicit final
    `return undefined`. The computed already returns `undefined` on that path.
  - **`vue/no-v-text-v-html-on-component`** in `mcl-hero/lib/mcl-hero-c/MclHeroC.vue`:
    the `<component :is="titleLevel">` always renders a native heading tag, so
    `v-html` works. Changing the markup risks behavior, so use a per-line
    disable with that reason.
  - **Remaining `no-unused-vars` and other hits:** fix them, behavior-neutral
    only.
- **Owner:** turn `@typescript-eslint/no-explicit-any` off in the config, with a
  one-line comment along these lines: "the public prop and slot types use
  `any`; retyping them changes published `.d.ts` and is a separate,
  changeset-carrying release". This covers about 95 hits, most of them in
  published prop and slot types (`content: any`, `cards: any[]`,
  `defineSlots<{ default: any }>`). Fixing them would change the published
  `.d.ts` files and could break consumers' type checks. Retyping the public API
  is out of scope here and can be planned as its own release later.

### 4.3 Scripts and Turborepo

Root `package.json`:

| Script         | Runs                  |
| -------------- | --------------------- |
| `lint`         | `eslint .`            |
| `format`       | `prettier --write .`  |
| `format:check` | `prettier --check .`  |
| `typecheck`    | `turbo run typecheck` |

- **Design call:** each package under `src/components/*` and `src/utils/test`
  gets `"typecheck": "vue-tsc --noEmit -p tsconfig.json"`. `turbo.json` gets a
  `typecheck` task with `dependsOn: ["^build"]`, because consumer packages
  resolve `@bobbykim/manguito-theme` types from its `dist/`.
- **Design call:** the type check covers packages only. Stories and
  `.storybook/` are covered by ESLint and the Storybook build, not `vue-tsc`.
- Existing scripts keep their names. `package:create`'s templates in
  `scripts/templates/` should gain the `typecheck` script, so new packages are
  covered automatically.

### 4.4 The `ci` workflow (`.github/workflows/ci.yml`)

Modeled on `manguito-cms/.github/workflows/ci.yml`, without its Postgres
service, `DB_URL` and smoke step.

- **Triggers:** `pull_request` and `push` to `master`.
- **Concurrency:** copy the CMS block exactly. PR runs cancel older runs of the
  same PR; each push to `master` gets its own group, so quick successive merges
  each get a result. Keep its explanatory comment.
- **Permissions:** `contents: read`.
- **Job:** one job, id and name both `ci`, `ubuntu-latest`, `timeout-minutes:
30`. Keep the comment saying the name is coupled to the ruleset.
- **Steps, in order:**
  1. `actions/checkout`, `pnpm/action-setup` (no version input; it reads
     `packageManager`), and `actions/setup-node` with Node 22 and `cache: pnpm`.
     Use the same action major versions as the CMS file.
  2. `pnpm install --frozen-lockfile`
  3. `pnpm lint`
  4. `pnpm format:check`
  5. `pnpm run package:build`
  6. `pnpm typecheck`, after the build, for the reason in 4.3.
  7. `pnpm test`
  8. `pnpm --filter @bobbykim/manguito-theme run test:dist`. Call the package
     script directly, since the root `test:dist` would rebuild. Turbo would
     cache the rebuild, but the direct call is clearer.
  9. `pnpm exec storybook build -o storybook-static`. This is the owner-agreed
     Storybook build. It writes outside `dist/` so it never collides with
     anything, and `storybook-static/` goes in `.gitignore` and in the
     ESLint and Prettier ignores.
- No `paths` filter. A filter would leave `ci` unreported on some pull
  requests, which blocks them forever.

### 4.5 Master protection

- **Owner:** protect `master` the way the CMS does.
- `.github/rulesets/master.json`: copy the CMS file unchanged.
  - Name `master-protection`, targeting `refs/heads/master`, with no bypass
    actors, so it applies to the owner too.
  - Rules: no deletion and no force push. A pull request is required, with 0
    approvals and merge, squash and rebase all allowed.
  - The required status check is `ci` from GitHub Actions
    (`integration_id: 15368`).
- `scripts/apply-ruleset.sh`: copy the CMS script unchanged, including
  `--dry-run`. It finds the ruleset by name and creates or updates it.
- **Design call, the rollout order** (it prevents the stuck-check anti-goal):
  1. Merge the PR that adds CI and the cleanup, after its `ci` run is green.
  2. Confirm `ci` reported on the resulting `master` commit.
  3. Run `scripts/apply-ruleset.sh --dry-run`, then the real run. Both happen
     only after the owner says yes in the session: this changes GitHub
     settings.
  4. Every later PR, including the release tooling PR, goes through the gate.
     That proves the gate works.
- **Design call:** no ADR directory exists in this repo, so the rationale goes
  in `RELEASING.md` under a "When CI or the ruleset blocks you" section,
  adapted from the CMS `RELEASE.md`. That section covers the stuck check,
  disabling enforcement during a GitHub outage, and restoring with
  `apply-ruleset.sh`.

### 4.6 The release PR: `scripts/release-pr.sh` and `/release-pr`

Modeled on `manguito-cms/scripts/release-pr.sh` and
`manguito-cms/.claude/skills/release-pr/SKILL.md`. Read both in full before
writing these.

**Script: `scripts/release-pr.sh [prepare|open] [--dry-run]`.** With no
argument it does `prepare`, then asks `Push and open the PR? [y/N]`, then
`open`.

- **prepare** refuses, with a message naming the fix, unless all of these
  hold: the current branch is `master`, the tree is clean, `master` equals
  `origin/master` after a fetch, and `pnpm changeset status` reports at least
  one package to bump. Then it:
  1. Runs the **coverage check** (**Design call**, from the RELEASING.md Step 0
     check the owner pointed to). It lists packages under `src/components/`
     that changed since the last `chore(release)` commit
     (`git log --grep "chore(release)" -1`) but are not in `changeset status`.
     It prints them as a warning; it does not refuse. Some changes, such as
     tests or README edits that don't ship, legitimately need no changeset.
  2. Creates `release/<YYYY-MM-DD>`, adding `-2`, `-3` and so on if that name
     exists locally or on `origin`.
  3. Runs `pnpm run package:version`, then `pnpm install`. The lockfile is
     normally unchanged; if it changes, it goes into the commit, or CI's
     frozen install fails.
  4. Commits `chore(release): version packages` with a body that lists:
     - **Changed:** each package with its own changeset, as
       `name old → new (bump)`;
     - **Bumped because a dependency changed:** packages bumped only through
       `updateInternalDependencies`.

     Private packages (`@mcl/test-utils`) are left out of the list. The commit
     is made with `git commit -m`, not `pnpm commit`, which is interactive.
     Keeping the `chore(release)` subject preserves the coverage check for the
     next release.

  5. Prints the release branch, the commit body, each consumed changeset (id,
     packages, bump, summary), and `git diff --stat`.

- **open** pushes the branch and runs `gh pr create --base master` with:
  - title: `chore(release): version packages (<date>)`;
  - body: the commit body, then each published package's new `CHANGELOG.md`
    section.

  `--dry-run` prints the push command and the PR body without running
  anything.

- The script uses `bash`, `git`, `gh`, `jq` and `node` only, the same as the
  CMS.

**Skill: `.claude/skills/release-pr/SKILL.md`** with
`disable-model-invocation: true`, so it runs only when the owner types
`/release-pr`.

1. Run `scripts/release-pr.sh prepare`. On a refusal, relay it and stop.
2. Review every consumed changeset's summary against its bump level. A
   **breaking** change is a removed or renamed prop, slot, emit, export or CSS
   entry, or changed behavior a consumer must adapt to. The required level
   depends on the package's version **before** the bump (**Owner**: this
   follows the repo's practice; `mcl-forms` 0.12.0 shipped breaking changes as
   a minor):
   - **At 1.0 or above** (currently only `manguito-theme`): breaking needs
     `major`, a new backward-compatible capability needs `minor`, and a fix
     or a change with no API surface needs `patch`.
   - **At 0.x** (the ten `mcl-*` packages): breaking needs `minor`, and
     everything else may be `patch`. Every breaking change is still called out
     by name in what the skill shows the owner, whatever its label. Consumers
     on `^0.y` ranges don't receive a new minor automatically, so it deserves
     a mention.

   A **mismatch** is a summary that needs a higher bump than its label. For
   example, a breaking 0.x change labeled `patch`, or a breaking
   `manguito-theme` change labeled `minor`. Read the original changeset with
   `git show HEAD~1:.changeset/<id>.md` when the summary is too terse. Also
   relay the coverage warnings.

3. Show the owner the commit body, the diff stat, every mismatch and every
   coverage warning, then ask whether to push and open the PR. Wait for an
   explicit yes.
   - **To fix a mismatch or add a missing changeset:** discard the branch
     (`git checkout master && git branch -D <branch>`). Fix it on a feature
     branch, merge that, and re-run. Changesets are never edited on the
     release branch.
   - **On a no:** leave the branch local and print the commands to resume or
     discard it.
4. On a yes, run `scripts/release-pr.sh open` and give the PR URL.
5. After the owner merges, walk them through publishing from `RELEASING.md`,
   quoting its commands. They run the publish themselves, because it needs
   their OTP.

### 4.7 Documentation

- **Owner:** update `RELEASING.md`. Rewrite it around the two-half flow from
  the CMS `RELEASE.md`:
  1. The version bump changes files, so it goes through a release pull request
     (`/release-pr` or `scripts/release-pr.sh`).
  2. Publishing changes no files, so it runs on `master` after the merge:
     - pull, and confirm `ci` succeeded on the merge commit with
       `gh run list --branch master --workflow CI --commit "$(git rev-parse HEAD)" --limit 1`;
     - `pnpm install --frozen-lockfile`;
     - `pnpm run package:build`;
     - `pnpm changeset publish` (with `--otp` if needed);
     - `git push --follow-tags`, which pushes only tags. The ruleset doesn't
       cover tags.

  Keep this repo's existing sections where they still apply: Prerequisites
  (add `gh` and `jq`), Verify, Docs site, What ships, Configuration, and
  Recovery. Rewrite the Recovery rows that assume a direct push to `master`.
  Add a "Doing it by hand" fallback, the "When CI or the ruleset blocks you"
  section (4.5), and a troubleshooting row for `GH013: Repository rule
violations` (committed on `master` by mistake).

- **Design call:** update `CONTRIBUTING.md` in three places:
  - "Making changes": PRs must pass `ci`; run `pnpm lint`,
    `pnpm format:check`, `pnpm typecheck` and `pnpm test` before pushing.
  - "Releasing": point to `/release-pr` and `RELEASING.md`.
  - The bump table (**Owner**): add the 0.x rule from 4.6. Packages below 1.0
    take breaking changes as `minor`. The summary must start by saying it is
    breaking and list what consumers must change.
  - "Workspace layout": remove `deprecated/` if listed.
- **Design call:** update `CLAUDE.md`'s Commands section with `lint`, `format`,
  `format:check` and `typecheck`. Add one line saying `master` is protected and
  every change goes through a PR with a passing `ci`.

## 5. Delivery

**Design call:** two pull requests, so the gate is in place before the release
tooling depends on it.

1. **PR A: cleanup, ESLint, scripts, CI workflow, ruleset file and apply
   script.** Its own `ci` run proves the workflow and the green baseline. After
   merge, apply the ruleset (4.5).
2. **PR B: `release-pr.sh`, the `/release-pr` skill, and the
   `RELEASING.md`/`CONTRIBUTING.md`/`CLAUDE.md` updates.** It goes through the
   new gate.

There is no changeset in either PR. Nothing published changes behavior, and
lint fixes inside packages are behavior-neutral by the anti-goal above. If a
lint fix does touch shipped code, the builder adds a patch changeset for that
package and says why.

**Verification for each PR:**

- `ci` green on the PR.
- For PR A, every `dist/**/*.d.ts` is byte-identical to `master`'s build. The
  JS bundles may differ only by the behavior-neutral rewrites listed in 4.1 and
  4.2, such as `void el.offsetHeight`, the explicit `return undefined`, and the
  removed `slideRef`. The builder diffs each bundle against `master` and
  accounts for every difference.
- For PR B, `scripts/release-pr.sh prepare` exercised in a scratch git
  worktree against a throwaway changeset, and `open --dry-run` output checked.
  Nothing is pushed.

## 6. Left to the builder

- The exact ESLint violations and their fixes, within the rules in 4.2.
- The script's internal structure and messages, following the CMS script.
- Wording of the docs, within the content listed in 4.7.
- Whether `scripts/templates/_package.md` (or wherever the package template
  scripts live) needs the `typecheck` script.
