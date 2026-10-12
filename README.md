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
[`generic/document-standards/SKILL.md`](generic/document-standards/SKILL.md).
Repository-specific agent instructions are in
`.agents/document-standards/SKILL.md`.

### `export-conversation`

Guidance and a companion script for exporting Antigravity conversation
history into a formatted Markdown document.  It supports exporting the
active ongoing conversation or a specified conversation identifier,
and can optionally omit tool execution details.

Read the skill at
[`antigravity/export-conversation/SKILL.md`](antigravity/export-conversation/SKILL.md).

### `vcs-commit-message-attribution`

Guidance for adding an attribution line to commit messages when
committing changes to a version control system such as Git.  It covers
attribution format and agent-specific considerations.

Read the reusable skill at
[`generic/vcs-commit-message-attribution/SKILL.md`](generic/vcs-commit-message-attribution/SKILL.md).

## Repository layout

Skills in the `generic/` directory are agent-independent, whilst
skills in other top-level directories are specific to a certain agent
(for example, `antigravity/`).

```text
.
├── .agents/
│   └── document-standards/
│       └── SKILL.md
├── antigravity/
│   └── export-conversation/
│       ├── scripts/
│       │   └── export_conversation.js
│       └── SKILL.md
└── generic/
    ├── document-standards/
    │   └── SKILL.md
    └── vcs-commit-message-attribution/
        └── SKILL.md
```

## Licensing

Copyright (c) 2026 Upperstream.  This repository is licensed under the
terms in [`LICENSE.txt`](LICENSE.txt).
