---
name: pre-commit-documentation
description: Prepare documentation and changelogs before committing.
metadata:
  version: "0.1.0"
---

# Pre-commit documentation

## When to use

Use this skill when the user asks you to commit changes to a version
control system such as Git.  It covers documentation preparation, not
commit-message attribution.

For adoption in another repository, see the
[project adoption guide](references/applying-to-projects.md).

## Procedure

1. Review the changes intended for the commit and the project's
   documentation and changelog conventions.
2. Update relevant documentation so that it is in line with the changes.
   Leave unaffected documentation unchanged.
3. If the project has a changelog, such as CHANGELOG.md, update it
   automatically for every commit to describe the changes, following
   its existing format and conventions.

## Pitfalls

If the project has no changelog, do not create one unless explicitly
instructed by the user or project instructions.

## Verification

Before committing, verify that relevant documentation updates and the
update to any existing changelog are included in the commit, and that
unrelated changes are not.  If no changelog existed, verify that none
was created without explicit instructions.
