# Agent instructions

## Documentation

Follow the repository-specific guidance in
`.agents/document-standards/SKILL.md` when creating or editing
documentation, including this file.

The reusable `document-standards` skill is maintained at
`generic/document-standards/SKILL.md`.  Keep that skill distinct from
the repository-specific agent instructions.

## Skills

Maintain reusable, agent-independent skills in the `generic/`
directory, and agent-specific skills in directories designated for each
agent (such as `antigravity/`).

## Before committing

When asked to commit changes, update relevant documentation so that it
is in line with the changes.  If the project has a changelog, such as
CHANGELOG.md, update it automatically for every commit, following its
existing format and conventions.  If no changelog exists, do not create
one unless explicitly instructed.

The reusable workflow is maintained at
`generic/pre-commit-documentation/SKILL.md`.
Keep commit-message attribution separate from documentation preparation.
