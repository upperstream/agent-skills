# Agent Skills

This repository contains reusable instructions for AI coding agents.
Each skill provides focused guidance that an agent can follow when
working on a task.

## Available skills

### `document-standards`

Guidance for writing documentation text files.  It covers sentence
capitalisation, British spelling, line length, Markdown readability, and
emphasis.

Read the reusable skill at
[`document-standards/SKILL.md`](document-standards/SKILL.md).
Repository-specific agent instructions are in
`.agents/document-standards/SKILL.md`.

### `vcs-commit-message-attribution`

Guidance for adding an attribution line to commit messages when
committing changes to a version control system such as Git.  It covers
attribution format and agent-specific considerations.

Read the reusable skill at
[`vcs-commit-message-attribution/SKILL.md`](vcs-commit-message-attribution/SKILL.md).

## Repository layout

```text
.
├── .agents/
│   └── document-standards/
│       └── SKILL.md
├── document-standards/
│   └── SKILL.md
└── vcs-commit-message-attribution/
    └── SKILL.md
```

## Licensing

Copyright (c) 2026 Upperstream.  This repository is licensed under the
terms in [`LICENSE.txt`](LICENSE.txt).
