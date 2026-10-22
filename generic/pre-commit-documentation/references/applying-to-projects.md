# Applying pre-commit-documentation to another project

This guide describes how to adopt the reusable
pre-commit-documentation workflow in another repository by writing its
rules directly in AGENTS.md.  The [skill definition](../SKILL.md)
provides the reusable source wording; the target project's AGENTS.md
governs the adopted repository policy.

Do not require the target project to install or maintain a separate
pre-commit-documentation skill.  These short, mandatory rules belong in
its agent instructions, not behind optional skill selection.

## Before applying the skill

Read the target project's agent instructions, documentation standards,
and existing changelog, if any.  Identify any conflicting commit rules
and obtain an explicit decision before changing them.  Preserve
unrelated instructions and existing work.

The workflow requires relevant documentation updates before committing
and automatic updates to an existing changelog for every commit.  It
does not create a missing changelog unless explicitly instructed, and
it does not define commit-message attribution.

## Add the rules to AGENTS.md

1. Add the following section to the target project's AGENTS.md, or
   integrate it into an existing commit section.  Create AGENTS.md if
   needed, without copying this repository's unrelated instructions.

   ```markdown
   ## Before committing

   Before making any commit, review the intended changes and update
   relevant documentation so that it is in line with those changes.
   Leave unaffected documentation unchanged.

   If the project has a changelog, update it automatically for every
   commit to describe the changes, following its existing format and
   conventions.  If no changelog exists, do not create one unless
   explicitly instructed.

   Verify that relevant documentation updates and the update to any
   existing changelog are included in the commit, and that unrelated
   changes are not.  Keep commit-message attribution separate.
   ```

2. If the project uses another agent instruction file instead of
   AGENTS.md, put the same rules in the file that its agent actually
   reads.  Confirm that the chosen agent reads that file rather than
   assuming all agents recognise AGENTS.md.
3. Follow the project's existing documentation standards and changelog
   format when applying the workflow.  An existing changelog need not
   be named CHANGELOG.md.  Do not create one merely to adopt the rules.

## Verify adoption

* Check that the agent's instruction file contains the complete rules,
  including the every-commit changelog requirement and the prohibition
  on creating a missing changelog without explicit instructions.
* Check that no conflicting commit rules remain and that applying the
  policy does not require reading or installing a separate skill.
* Review the next requested commit to confirm that relevant
  documentation and any existing changelog are updated and included.
* If no changelog existed, confirm that adoption and commit preparation
  did not create one without explicit instructions.
* Run the target project's documentation checks and inspect the commit
  contents to exclude unrelated changes.

Adopting these rules does not itself authorise a commit or push.  Obtain
that authorisation separately.  Maintain the adopted rules in the
target project's agent instructions; changes to this repository's
reusable source do not automatically change another project's policy.
