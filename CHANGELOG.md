# CHANGELOG

## [Unreleased][]

### Added

- Add a project adoption guide for `pre-commit-documentation`, covering
  direct rules in AGENTS.md and verification without installing a
  separate skill.
- Add reusable `pre-commit-documentation` skill version 0.1.0 and
  corresponding repository instructions in AGENTS.md for
  documentation preparation before committing.  Update an existing
  changelog automatically for every commit; do not create a missing
  changelog unless explicitly instructed.
- Add reusable `vcs-commit-message-attribution` skill for commit
  message attribution.
- Add `export-conversation` skill and companion helper script for
  Antigravity.

### Changed

- Move the following agent-independent skills into `generic` directory:
  - `document-standards`
  - `vcs-commit-message-attribution`
- Update `vcs-commit-message-attribution` skill to use `Co-Authored-By:`
  only for agents with an authorised email address and `Assisted-By:`
  otherwise.  Require Antigravity and Hermes Agent to use `Assisted-By:`
  to avoid unrelated GitHub user mappings, and increment the skill
  version to 1.0.0.

## [20260927][] - 2026-09-27

### Added

- Initial commit
- Add reusable `document-standards` skill and repository-specific agent
  instructions.
- Add README with project overview and licensing information.

[Unreleased]: https://github.com/upperstream/agent-skills/compare/20260927...HEAD
[20260927]: https://github.com/upperstream/agent-skills/releases/tag/20260927
