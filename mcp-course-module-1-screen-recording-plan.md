# Module 1: Screen Recording Plan

## Recording Setup

### Software Options:
- **OBS Studio** (Free, professional) - Recommended
- **Loom** (Easy, cloud-based)
- **QuickTime** (Mac built-in)
- **Camtasia** (Paid, lots of editing features)

### Recording Settings:
- Resolution: 1920x1080 (minimum)
- Frame rate: 30fps
- Audio: External mic preferred, test levels first
- Format: MP4 H.264

### Screen Preparation:
1. Clean desktop (hide personal files)
2. Browser bookmarks hidden
3. Notifications disabled
4. Standard zoom level (100-125%)
5. Dark mode if possible (easier on eyes)

---

## Screen-by-Screen Recording Flow

### INTRO SCREEN (0:00-1:00)
```
+---------------------------------+
|    MCP Marketing Course         |
|    Module 1: MCP Setup          |
|                                 |
|    [Your smiling face in corner]|
|                                 |
|    "Let's build something       |
|     incredible together"        |
+---------------------------------+
```
**Actions:** 
- Webcam overlay in corner
- Animated title entrance
- Excited, welcoming tone

### CONCEPT SCREEN (1:00-3:00)
```
+------------------+------------------+
|     OLD WAY      |    MCP WAY       |
|                  |                  |
| API → Data dump  | MCP → Intelligence|
| No context       | Full context     |
| Manual work      | Automated        |
| Click interfaces | Conversational   |
+------------------+------------------+
```
**Actions:**
- Draw arrows while explaining
- Highlight differences
- Show real examples

### N8N SETUP SCREENS (3:00-8:00)

**Screen 1: n8n.cloud homepage**
- Highlight "Start for free" button
- Show pricing briefly (free tier is enough)

**Screen 2: n8n Dashboard**
```
+----------------------------------+
| n8n Dashboard                    |
| +--------+  +--------+           |
| |Workflow|  |Workflow|           |
| |   1    |  |   2    |           |
| +--------+  +--------+           |
|                                  |
| [+ Create New Workflow]          |
+----------------------------------+
```

**Screen 3: Workflow Editor**
```
+----------------------------------+
| n8n Workflow Editor              |
|                                  |
|   [MCP Server]→[Respond]         |
|       ↓                          |
|   (SSE URL shown here)           |
|                                  |
+----------------------------------+
```
**Actions:**
- Slowly add each node
- Highlight SSE URL
- Show copy button

### TERMINAL SCREENS (8:00-10:00)
```
+----------------------------------+
| Terminal                         |
| $ npx -y supergateway --sse \    |
|   https://your.n8n.cloud/mcp/... |
|                                  |
| ✓ Gateway running on port 3000   |
| ✓ Connected to n8n               |
+----------------------------------+
```
**Actions:**
- Type slowly
- Highlight successful connection
- Explain each part of command

### CLAUDE CODE SCREENS (10:00-13:00)

**Screen 1: Creating .mcp.json**
```
+----------------------------------+
| VS Code / Claude Code            |
| project-root/                    |
| ├── .mcp.json  ← Creating this   |
| ├── src/                         |
| └── package.json                 |
+----------------------------------+
```

**Screen 2: MCP Config Content**
```json
{
  "mcpServers": {
    "n8n": {
      "command": "npx",
      "args": [...] ← Highlight changes
    }
  }
}
```

**Screen 3: Connection Status**
```
+----------------------------------+
| Claude Code                      |
|                                  |
| [Editor Area]                    |
|                                  |
| Bottom bar: [● MCP Connected]    |
+----------------------------------+
```
**Actions:**
- Show green indicator
- Hover to show details

### TEST COMMAND SCREEN (13:00-14:00)
```
+----------------------------------+
| Claude Code Chat                 |
|                                  |
| You: "Test the MCP connection"   |
|                                  |
| Claude: Testing MCP...           |
| Response: "Hello from n8n!"      |
|                                  |
+----------------------------------+
```
**Actions:**
- Type command naturally
- Show thinking indicator
- Celebrate success!

### OUTRO SCREEN (14:00-15:00)
```
+----------------------------------+
|   ✅ You Did It!                 |
|                                  |
|   Next: Module 2                 |
|   Keyword Research Automation    |
|                                  |
|   Share: #Module1Done            |
+----------------------------------+
```

---

## Recording Tips

### DO:
- **Speak clearly and enthusiastically**
- **Mouse movements:** Slow and deliberate
- **Highlight important areas:** Use zoom or draw
- **Pause on important screens:** Give viewers time
- **Make mistakes:** Show how to fix them

### DON'T:
- Rush through terminal commands
- Assume knowledge (explain everything)
- Show sensitive information
- Use technical jargon without explaining
- Forget to test audio levels

### Editing Checklist:
- [ ] Remove long pauses
- [ ] Add zoom effects on small text
- [ ] Insert callout boxes for important notes
- [ ] Add background music (soft, -20db)
- [ ] Color code: Green = success, Red = error
- [ ] Add intro/outro animations
- [ ] Export at 1080p minimum

---

## Platform-Specific Upload Settings

### Skool:
- Course: Vibe Coding Masterclass
- Section: MCP Marketing Course
- Module: 1 - MCP Setup
- Visibility: Vibe Coder tier and above
- Enable comments and discussions

### Alternative Platforms:
- **Vimeo:** Privacy settings, password protect
- **YouTube:** Unlisted, add to playlist
- **Direct S3:** Generate signed URLs

---

## Student Resources to Include:

1. **Downloadable MCP Config Template**
2. **Troubleshooting Guide PDF**
3. **Community Discussion Thread**
4. **Office Hours Calendar Link**

Remember: This is the first impression of your course. Take time to make it excellent!