---
name: vcs-commit-message-attribution
description: Add an attribution line to commit message
metadata:
  version: "0.1.0"
---

<!-- Except for Aider -- Aider automatically do this -->
When you are asked to make a commit to version control system such as
git, add an attribution to the tail of the commit message.  Its format
should be "Co-Authored-By: Harness name (Model name) <Harness's email address>".

Antigravity should use the attribution line "Assisted-By: Harness name
(Model name)" rather than "Co-Authored-By:".  Hermes Agent should drop
the email address part, though, as particularly its email address
currently used on GitHub is unintentionally mapped to irrelevant users.
