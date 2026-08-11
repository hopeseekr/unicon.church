# AGENTS.md

Instructions for AI coding agents working in this repository.

## Commit messages

Use **past-tense**, sentence-style subjects that match this repository’s history
(e.g. “Added …”, “Fixed …”, “Updated …”, “Promoted …”).

- Prefer past tense over imperative (“Added HTML port” not “Add HTML port”).
- Keep the subject line concise; put detail in the body when needed.
- End the subject with a period when following existing history style.

## Dual-site porting: `trunk` → `ai`

This repo serves **two websites** from two branches:

| Branch  | Site                 | Role                                      |
|---------|----------------------|-------------------------------------------|
| `trunk` | www.unicon.church    | Main UNICON site                          |
| `ai`    | ai.unicon.church     | Sanctioned AI-Native fork of the same site |

**Rule:** For every change made on `trunk`, also port it to the `ai` branch — **usually verbatim**, via **`git cherry-pick`**.

### Required workflow

1. Finish and commit the change on `trunk` (or on a branch based on `trunk` that will land on `trunk`).
2. Switch to `ai` (or a branch based on `ai`).
3. Port with cherry-pick:

   ```bash
   git checkout ai
   git cherry-pick <commit-sha>   # or a range: <oldest>^..<newest>
   ```

4. Resolve conflicts only where the AI fork intentionally diverges (branding, principle numbering, AI-specific copy, `ai.unicon.church` URLs, GitHub `blob/ai/` links). Prefer keeping trunk content when the divergence is accidental or stale.
5. Do not leave `trunk`-only work unfinished: the port to `ai` is part of the same task unless the user explicitly scopes the change to one site.

### What “usually verbatim” means

- Shared doctrine, legal pages, CSS layout, structure, and most HTML ports should match `trunk`.
- Expect small, deliberate differences on `ai` (e.g. “UNICON · AI”, extra AI principles, human-only oath language). Preserve those; still apply the substance of the `trunk` change.
- If a change is **only** meaningful on one site (rare), say so in the commit message and skip or adapt the cherry-pick with an explicit note to the user.

### Do not

- Ship a feature or content fix only on `trunk` and forget `ai`.
- Re-implement the change by hand on `ai` when a clean cherry-pick would work.
- Force-push or rewrite published history on either branch unless the user asks.
