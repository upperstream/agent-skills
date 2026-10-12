---
name: export-conversation
description: >-
  Exports or converts the ongoing conversation history (or a specified
  conversation ID) into a clean, formatted Markdown file.  Use this
  skill when the user asks to export, save, dump, or convert the
  current or ongoing conversation to Markdown.
compatibility: Antigravity
metadata:
  version: "1.0.0"
---

# Export Conversation Skill

This skill exports conversation logs into human-readable Markdown files.  It is primarily designed to capture the ongoing conversation
session whilst it is active, but can also export any historic
conversation recorded in the Antigravity application directory.

## Capabilities

* Automatically identifies and exports the active, ongoing conversation.
* Extracts user requests, tool actions, and assistant responses.
* Formats dialogue cleanly whilst preserving code snippets and tables.
* Supports filtering out internal tool execution diagnostics.

## Usage Procedure

When requested to export or convert the conversation history, follow
these steps:

1. Execute the export helper script to export the ongoing conversation:

   ```bash
   node /workspaces/.agents/skills/export-conversation/scripts/export_conversation.js --output conversation-export.md
   ```

2. If the user specifies a particular conversation identifier, pass the
   `--id` argument explicitly:

   ```bash
   node /workspaces/.agents/skills/export-conversation/scripts/export_conversation.js --id <CONVERSATION_ID> --output <OUTPUT_FILE>
   ```

3. To omit tool call execution details and retain dialogue exclusively,
   supply the `--no-tools` flag:

   ```bash
   node /workspaces/.agents/skills/export-conversation/scripts/export_conversation.js --no-tools --output conversation-clean.md
   ```

4. Verify that the destination file has been written, and report the
   resulting file path and summary to the user.

## Script Reference

The companion helper script is located at:
[export_conversation.js](./scripts/export_conversation.js)

### Available Options

* `--id`, `-i <uuid>`: Target conversation identifier (defaults to the
  most recently updated ongoing conversation).
* `--output`, `-o <path>`: Destination Markdown file path (defaults to
  `./conversation-export.md`).
* `--no-tools`: Excludes tool invocations from the exported document.
* `--list`, `-l`: Lists all discovered conversations along with their
  timestamps.
* `--app-dir <dir>`: Sets custom Antigravity configuration directory
  (defaults to `~/.gemini/antigravity-cli`).
