# CHANGELOG

## [Unreleased][]

### Added

- Add reusable `vcs-commit-message-attribution` skill for commit
  message attribution.
- Add `export-conversation` skill and companion helper script for
  Antigravity.

### Changed

- Move the following agent-independent skills into `generic` directory:
  - `document-standards`
  - `vcs-commit-message-attribution`
- Update `vcs-commit-message-attribution` skill so that Antigravity uses
  the attribution line "Assisted-By: Harness name (Model name)" rather
  than "Co-Authored-By:", and increment its minor version to 0.1.0.

## [20260927][] - 2026-09-27

### Added

- Initial commit
- Add reusable `document-standards` skill and repository-specific agent
  instructions.
- Add README with project overview and licensing information.

[Unreleased]: https://github.com/upperstream/agent-skills/compare/20260927...HEAD
[20260927]: https://github.com/upperstream/agent-skills/releases/tag/20260927
