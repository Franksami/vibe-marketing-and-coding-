# Module 1: MCP Server Setup - Recording Script

**Duration:** 15 minutes  
**Tools Needed:** Claude Code, n8n (cloud or self-hosted), Terminal

---

## Pre-Recording Checklist

- [ ] Claude Code installed and working
- [ ] n8n account ready (show both cloud and self-hosted options)
- [ ] Terminal/Command Prompt open
- [ ] Test domain ready for demo (or use n8n cloud URL)
- [ ] Screen recording software ready (OBS/Loom/QuickTime)

---

## INTRO (1 minute)

**[SCREEN: Show course title slide]**

"Welcome to Module 1 of the MCP Marketing Course. I'm Franklin, and in the next 15 minutes, you're going to set up something incredible - a system that lets you control all your marketing tools just by talking to Claude.

No more clicking through dozens of tabs. No more copy-pasting between tools. Just conversational commands that get work done.

By the end of this module, you'll type something like 'Claude, analyze keywords for my competitor' and watch it happen automatically. Let's dive in!"

---

## SECTION 1: Understanding MCP vs APIs (3 minutes)

**[SCREEN: Show diagram comparing API vs MCP]**

"First, let's understand what makes MCP special. 

Traditional APIs are like messengers - they carry data between tools but have no intelligence. You get raw data dumps with no context.

MCP - Model Context Protocol - is different. It's an intelligence layer designed specifically for AI models like Claude. 

**[SCREEN: Show example comparison]**

Here's a real example:
- API approach: 'Here's 500 keywords with search volumes'
- MCP approach: 'Here are the 10 keywords most likely to convert based on your business goals, with content strategies for each'

See the difference? MCP provides context about your goals, your audience, and your past actions. It's like giving Claude a brain that remembers and understands your business.

**[SCREEN: Show benefits list]**

With MCP you get:
- Unified context across all tools
- Intelligent decision-making, not just data
- Conversational control - no more clicking through UIs
- A system that learns and improves"

---

## SECTION 2: Setting Up Your MCP Server (5 minutes)

**[SCREEN: Open terminal]**

"Now let's set up your MCP server. I'll show you two ways - the cloud version which is easier, and self-hosted for more control.

### Option 1: n8n Cloud (Recommended for beginners)

**[SCREEN: Navigate to n8n.cloud]**

1. Go to n8n.cloud and sign up for a free account
2. Once logged in, create a new workflow
3. Add the 'MCP Server' trigger node

**[SCREEN: Show node configuration]**

4. In the node settings, you'll see your SSE endpoint URL
5. Copy this URL - we'll need it in a moment

### Option 2: Self-Hosted (More control)

**[SCREEN: Show terminal commands]**

```bash
# Install n8n globally
npm install -g n8n

# Start n8n
n8n start
```

**[SCREEN: Show localhost:5678]**

Same process - create workflow, add MCP Server trigger, get your URL.

### Installing the MCP Gateway

**[SCREEN: Show terminal]**

Now we need to connect Claude to your n8n instance. In your terminal:

```bash
npx -y supergateway --sse https://your-domain.app.n8n.cloud/mcp/your-path/sse
```

**[SCREEN: Show successful connection]**

You'll see 'Gateway running' - that means Claude can now talk to your n8n!"

---

## SECTION 3: Connecting Claude Code (3 minutes)

**[SCREEN: Open Claude Code]**

"Now let's configure Claude Code to use your MCP server.

**[SCREEN: Create .mcp.json file]**

Create a file called `.mcp.json` in your project root:

```json
{
  "mcpServers": {
    "n8n": {
      "command": "npx",
      "args": [
        "-y",
        "supergateway",
        "--sse",
        "https://YOUR-DOMAIN.app.n8n.cloud/mcp/YOUR-PATH/sse"
      ]
    }
  }
}
```

**[SCREEN: Show file being saved]**

Replace YOUR-DOMAIN and YOUR-PATH with your actual values from n8n.

**[SCREEN: Restart Claude Code]**

Now restart Claude Code, and you'll see the MCP connection icon in the bottom bar.

If it's green, you're connected!"

---

## SECTION 4: Your First MCP Command (3 minutes)

**[SCREEN: Create test workflow in n8n]**

"Let's create a simple test to make sure everything works.

In n8n:
1. After your MCP Server trigger, add a 'Respond to Webhook' node
2. Set the response to: 'Hello from n8n! MCP is working!'
3. Save and activate the workflow

**[SCREEN: Back to Claude Code]**

Now in Claude Code, let's test it:

```
Claude, can you test the MCP connection?
```

**[SCREEN: Show successful response]**

Boom! You just sent your first command through MCP. 

But this is just the beginning. In the next modules, we'll connect real marketing tools and build automation that will blow your mind."

---

## SECTION 5: Troubleshooting & Next Steps (2 minutes)

**[SCREEN: Show common issues]**

"Quick troubleshooting tips:

1. **Red connection icon?** Check your SSE URL is correct
2. **No response?** Make sure your n8n workflow is active
3. **Permission errors?** Run terminal as administrator

**[SCREEN: Show what's coming next]**

In Module 2, we'll connect DataForSEO and turn Claude into your personal keyword researcher. You'll be able to say things like 'find keywords my competitor ranks for' and get actionable insights instantly.

Your homework:
1. Get your MCP connection working
2. Create a simple test workflow
3. Share your success in our Skool community with #Module1Done

Congratulations! You've just taken the first step toward marketing automation that actually works. See you in Module 2!"

---

## POST-RECORDING NOTES

### Edit Points:
- Add zoom effects on terminal commands
- Insert animated diagram for API vs MCP explanation  
- Add captions for all terminal commands
- Include error message examples with solutions

### Additional Resources to Include:
- PDF: MCP Setup Checklist
- Link: n8n workflow template for Module 1
- Video: Extended troubleshooting guide (separate video)

### Upload Instructions:
1. Export as MP4 (1080p minimum)
2. Create thumbnail using provided template
3. Upload to Skool > Vibe Coding Course > Module 1
4. Set visibility to appropriate membership tiers