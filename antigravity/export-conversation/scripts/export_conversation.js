#!/usr/bin/env node

/**
 * export_conversation.js
 *
 * Converts an Antigravity conversation transcript (JSONL) into a formatted
 * Markdown document.  Supports auto-detecting the ongoing conversation
 * or specifying a conversation ID explicitly.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Parse command line arguments
const args = process.argv.slice(2);
let targetId = null;
let outputPath = null;
let includeTools = true;
let listOnly = false;
let appDir = path.join(os.homedir(), '.gemini/antigravity-cli');

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--id' || arg === '-i') {
    targetId = args[++i];
  } else if (arg === '--output' || arg === '-o') {
    outputPath = args[++i];
  } else if (arg === '--no-tools') {
    includeTools = false;
  } else if (arg === '--tools' || arg === '--include-tools') {
    includeTools = true;
  } else if (arg === '--list' || arg === '-l') {
    listOnly = true;
  } else if (arg === '--app-dir') {
    appDir = args[++i];
  } else if (arg === '--help' || arg === '-h') {
    console.log(`Usage: export_conversation.js [options]

Options:
  --id, -i <uuid>       Specify conversation ID to export (default: auto-detect ongoing)
  --output, -o <file>   Output Markdown file path (default: ./conversation-export.md)
  --no-tools            Exclude tool execution details from export
  --list, -l            List all discovered conversations
  --app-dir <dir>       Path to Antigravity directory (default: ~/.gemini/antigravity-cli)
  --help, -h            Show this help message
`);
    process.exit(0);
  } else if (!arg.startsWith('-') && !targetId) {
    targetId = arg;
  }
}

const brainDir = path.join(appDir, 'brain');
if (!fs.existsSync(brainDir)) {
  console.error(`Error: Brain directory not found at ${brainDir}`);
  process.exit(1);
}

// Discover and sort conversations by latest update
function getConversations() {
  return fs.readdirSync(brainDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.'))
    .map(d => {
      const convId = d.name;
      const logsDir = path.join(brainDir, convId, '.system_generated/logs');
      const fullPath = path.join(logsDir, 'transcript_full.jsonl');
      const compactPath = path.join(logsDir, 'transcript.jsonl');
      let transcriptPath = null;
      let mtime = 0;
      if (fs.existsSync(fullPath)) {
        transcriptPath = fullPath;
        mtime = fs.statSync(fullPath).mtimeMs;
      } else if (fs.existsSync(compactPath)) {
        transcriptPath = compactPath;
        mtime = fs.statSync(compactPath).mtimeMs;
      }
      return { id: convId, mtime, transcriptPath };
    })
    .filter(c => c.transcriptPath !== null)
    .sort((a, b) => b.mtime - a.mtime);
}

if (listOnly) {
  const convs = getConversations();
  console.log(`Discovered ${convs.length} conversation(s) in ${brainDir}:\n`);
  for (const c of convs) {
    let promptSnippet = '';
    try {
      const firstLine = fs.readFileSync(c.transcriptPath, 'utf-8').split('\n')[0];
      if (firstLine) {
        const parsed = JSON.parse(firstLine);
        if (parsed.content) {
          const match = parsed.content.match(/<USER_REQUEST>([\s\S]*?)<\/USER_REQUEST>/);
          promptSnippet = (match ? match[1] : parsed.content).trim().slice(0, 80).replace(/\n/g, ' ');
        }
      }
    } catch { }
    console.log(`- ID: ${c.id}`);
    console.log(`  Last modified: ${new Date(c.mtime).toISOString()}`);
    if (promptSnippet) {
      console.log(`  Initial prompt: "${promptSnippet}"`);
    }
    console.log();
  }
  process.exit(0);
}

// Select target conversation
if (!targetId) {
  if (process.env.CONVERSATION_ID) {
    targetId = process.env.CONVERSATION_ID;
  } else {
    const convs = getConversations();
    if (convs.length === 0) {
      console.error('Error: No conversation transcripts found in brain directory.');
      process.exit(1);
    }
    targetId = convs[0].id;
  }
}

// Locate transcript file
const targetLogsDir = path.join(brainDir, targetId, '.system_generated/logs');
let targetFile = path.join(targetLogsDir, 'transcript_full.jsonl');
if (!fs.existsSync(targetFile)) {
  targetFile = path.join(targetLogsDir, 'transcript.jsonl');
}
if (!fs.existsSync(targetFile)) {
  console.error(`Error: Transcript file not found for conversation ${targetId} in ${targetLogsDir}`);
  process.exit(1);
}

// Parse transcript items into conversational turns
const fileContent = fs.readFileSync(targetFile, 'utf-8').trim();
const lines = fileContent ? fileContent.split('\n') : [];
const turns = [];
let currentTurn = null;

for (const line of lines) {
  let item;
  try {
    item = JSON.parse(line);
  } catch {
    continue;
  }

  if (item.type === 'USER_INPUT' && item.source === 'USER_EXPLICIT') {
    let userText = item.content || '';
    const match = userText.match(/<USER_REQUEST>([\s\S]*?)<\/USER_REQUEST>/);
    if (match) {
      userText = match[1].trim();
    } else {
      userText = userText
        .replace(/<ADDITIONAL_METADATA>[\s\S]*?<\/ADDITIONAL_METADATA>/g, '')
        .replace(/<USER_SETTINGS_CHANGE>[\s\S]*?<\/USER_SETTINGS_CHANGE>/g, '')
        .trim();
    }
    currentTurn = {
      userText,
      userTime: item.created_at || '',
      responses: [],
      tools: []
    };
    turns.push(currentTurn);
  } else if (item.type === 'PLANNER_RESPONSE') {
    if (!currentTurn) {
      currentTurn = {
        userText: '(Initial prompt not recorded)',
        userTime: item.created_at || '',
        responses: [],
        tools: []
      };
      turns.push(currentTurn);
    }
    if (item.content) {
      currentTurn.responses.push({
        content: item.content,
        time: item.created_at || ''
      });
    }
    if (item.tool_calls && Array.isArray(item.tool_calls)) {
      for (const tc of item.tool_calls) {
        const toolArgs = tc.args || {};
        currentTurn.tools.push({
          name: tc.name || 'tool_call',
          action: toolArgs.toolAction || '',
          summary: toolArgs.toolSummary || toolArgs.Description || ''
        });
      }
    }
  }
}

// Build formatted Markdown
let md = `# Conversation Export\n\n`;
md += `| Field | Value |\n`;
md += `| :--- | :--- |\n`;
md += `| **Conversation ID** | \`${targetId}\` |\n`;
md += `| **Exported At** | ${new Date().toISOString()} |\n`;
md += `| **Total Turns** | ${turns.length} |\n`;
md += `| **Source Log** | \`${targetFile}\` |\n\n`;
md += `---\n\n`;

for (let i = 0; i < turns.length; i++) {
  const turn = turns[i];
  const turnNum = i + 1;
  md += `## Turn ${turnNum} - User\n\n`;
  if (turn.userTime) {
    md += `*Timestamp: ${turn.userTime}*\n\n`;
  }
  md += `${turn.userText}\n\n`;

  if (includeTools && turn.tools.length > 0) {
    md += `<details>\n<summary><b>Tool Actions (${turn.tools.length})</b></summary>\n\n`;
    for (const t of turn.tools) {
      const desc = t.summary ? (t.action ? `${t.summary} (${t.action})` : t.summary) : t.action;
      md += `- **\`${t.name}\`**: ${desc || 'Executed'}\n`;
    }
    md += `\n</details>\n\n`;
  }

  if (turn.responses.length > 0) {
    md += `### Assistant (Antigravity)\n\n`;
    for (const r of turn.responses) {
      md += `${r.content}\n\n`;
    }
  } else {
    md += `*(Turn in progress or concluded with tool executions only)*\n\n`;
  }

  md += `---\n\n`;
}

// Resolve destination path
if (!outputPath) {
  outputPath = path.resolve(process.cwd(), 'conversation-export.md');
} else {
  outputPath = path.resolve(process.cwd(), outputPath);
}

fs.writeFileSync(outputPath, md, 'utf-8');
console.log(`Successfully exported conversation ${targetId} (${turns.length} turn(s)) to:`);
console.log(`  ${outputPath}`);
