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

## Translating new languages

- **Translations are trunk-only — ignore the `ai` branch.** The `ai` fork has no translation tooling (`tools/translate.php`, `build.sh`), no language picker, and its page copy is not covered by the catalogs. Do not port translation catalogs or generated pages to `ai`, and do not do translation work on `ai`.
- Translation catalogs are JSON templates in `translations/`, one per language, named `<locale>.json` (e.g. `translations/de.json`, `translations/zh.json`).
- To add a language, copy an existing template. `translations/es.json` is the completed reference (every `"target"` filled); the other files are blank templates with empty `"target"` strings.
- Open the template and edit it directly: fill each replacement's `"target"` with the translation, leave `"source"` (the English text) untouched, and set `"locale"` and `"direction"` (`"ltr"` or `"rtl"`) at the top.
- Never edit the generated pages under `public/<locale>/` — they are rebuilt from the templates by `php tools/translate.php` via `./build.sh` (or `./build.sh <locale>` for one). Rebuild after editing to verify; the generator fails loudly on invalid JSON or selectors that no longer match.
- A new language also needs a link in the language picker (`.language-options`) in `public/index.html`, plus matching `aria-current` picker replacements in the template so the new locale's own entry is marked `page`.
