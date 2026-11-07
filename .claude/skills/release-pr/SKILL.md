---
name: release-pr
description: Prepare and open the version-packages release pull request with scripts/release-pr.sh, checking each changeset's bump level and waiting for the maintainer's yes before anything is pushed.
disable-model-invocation: true
---

# Release PR

Runs RELEASING.md section "2. Open the release pull request" through `scripts/release-pr.sh`. The script does the mechanical work; your job is the judgment it cannot make: whether each bump level fits its change, and getting the maintainer's explicit yes before the branch leaves this machine. Publishing to npm is the maintainer's step (it needs their npm OTP): you guide it and never run it.

## Steps

1. **Prepare.** From the repo root, on an up-to-date `master` with a clean tree, run `scripts/release-pr.sh prepare`. If it refuses, relay its message and stop. Each refusal names its own fix: wrong branch, uncommitted changes, `master` behind or ahead of origin, no pending changesets.

2. **Review the bump levels.** The script prints the release branch, the commit body (packages under _Changed_ versus _Bumped because a dependency changed_), each changeset's id, packages, bump type and summary, and any coverage warnings. Read every summary against its bump type. A **breaking** change is a removed or renamed prop, slot, emit, export or CSS entry, or changed behaviour a consumer must adapt to. The level it needs depends on the package's version **before** the bump:
   - **At 1.0 or above** (currently only `@bobbykim/manguito-theme`): breaking needs `major`, a new backward-compatible capability needs `minor`, and a fix or a change with no API surface needs `patch`.
   - **At 0.x** (the ten `mcl-*` packages): breaking needs `minor`; everything else may be `patch`. Name every breaking change to the maintainer regardless of its label, because consumers on `^0.y` ranges do not receive a new minor automatically.

   A **mismatch** is a summary whose described change needs a higher bump than its label: a breaking 0.x change labeled `patch`, or a breaking `manguito-theme` change labeled `minor`. Check every changeset. Open its original file with `git show HEAD~1:.changeset/<id>.md` when the summary is too terse to judge.

3. **Ask.** Show the maintainer the commit body, the `git diff --stat` the script printed, every breaking change, every mismatch with a one-line reason (or "no mismatches"), and every coverage warning the script printed (`warning: <package> changed since <sha> but has no pending release`). A warning may be fine (a change that does not ship) or a missing changeset. Ask whether to push the branch and open the pull request. Wait for an explicit yes.
   - **Mismatch to fix, or a changeset to add:** discard the branch (`git checkout master && git branch -D <branch>`). Fix it on a feature branch, merge that, and re-run this skill. A changeset is never edited on the release branch, where it has already been consumed.
   - **No:** leave the branch local and resume with `scripts/release-pr.sh open`, discard with `git checkout master && git branch -D <branch>`.

4. **Open.** On a yes, run `scripts/release-pr.sh open` and give the maintainer the PR URL. The `ci` check must pass before it can merge.

5. **Hand over publishing.** Once the maintainer has merged it, walk them through RELEASING.md sections "4. Publish from master" and "5. Push tags", quoting the commands from that file:
   - confirm `ci` succeeded on the merge commit (`gh run list --branch master --workflow CI --commit "$(git rev-parse HEAD)" --limit 1`);
   - `pnpm install --frozen-lockfile`, then `pnpm run package:build`;
   - `pnpm changeset publish` (with `--otp=<code>` if their npm account enforces 2FA);
   - `git push --follow-tags`.

   They run the publish themselves, because it needs their OTP.
