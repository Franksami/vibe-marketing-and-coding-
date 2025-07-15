# Vibe Marketing Kit - Installation Guide

## 📦 What's Included

Your marketing kit contains everything you need to transform your marketing workflow:

```
marketing-kit/
├── README.md                      # Complete guide and overview
├── INSTALLATION.md               # This file
├── cursor-workspace-preset.json  # Cursor IDE configuration
├── .cursorrules                  # Marketing-optimized AI rules
├── visual-roadmap.md            # 8-week learning path with diagrams
├── templates/
│   ├── utm-builder-pro.html     # Advanced UTM tracking tool
│   ├── headline-analyzer.html    # AI-powered headline optimizer
│   └── blog-post-advanced.md    # SEO-optimized blog template
└── docs/
    └── marketing-learning-path.md # Detailed curriculum
```

## 🚀 Quick Start (5 Minutes)

### Step 1: Extract the Marketing Kit
1. Download the marketing kit ZIP file
2. Extract to your desired location
3. Open the `marketing-kit` folder

### Step 2: Install Cursor IDE (if needed)
1. Visit [cursor.com](https://cursor.com)
2. Download for your operating system
3. Install and open Cursor

### Step 3: Import Workspace Configuration
1. Copy `cursor-workspace-preset.json` to your project root
2. In Cursor: `File → Preferences → Import Workspace Settings`
3. Select the `cursor-workspace-preset.json` file
4. Restart Cursor to apply settings

### Step 4: Set Up Your Marketing Project
```bash
# Create your marketing project structure
mkdir my-marketing-project
cd my-marketing-project

# Copy the marketing kit files
cp -r path/to/marketing-kit/* .

# Create the recommended folder structure
mkdir -p content research templates campaigns assets
```

### Step 5: Configure AI Agents
1. Open Cursor in your project directory
2. The three AI agents are pre-configured:
   - `@content` - Content creation specialist
   - `@seo` - SEO and keyword research expert  
   - `@campaign` - Marketing strategy planner

### Step 6: Test Your Setup
1. Create a new file: `test-content.md`
2. Type: `@content Write a compelling headline about AI marketing`
3. If you see AI suggestions, you're ready to go!

## 📚 Using the Tools

### UTM Builder Pro
1. Open `templates/utm-builder-pro.html` in your browser
2. No installation required - works offline
3. Features:
   - Smart campaign naming suggestions
   - Bulk URL generation
   - QR code creation
   - CSV export

### Headline Analyzer
1. Open `templates/headline-analyzer.html` in your browser
2. Analyzes headlines for:
   - Emotional impact
   - SEO optimization
   - Readability
   - Word balance
3. Provides AI-generated alternatives

### Blog Post Template
1. Copy `templates/blog-post-advanced.md` to your content folder
2. Fill in the template sections
3. Use the AI prompts provided for each section
4. Follow the SEO checklist for optimization

## 🎓 Following the Learning Path

### Week-by-Week Progress
1. Start with `docs/marketing-learning-path.md`
2. Complete modules in order
3. Submit projects for community feedback
4. Track progress with the visual roadmap

### Visual Roadmap
- Open `visual-roadmap.md` in any Markdown viewer that supports Mermaid
- VS Code with Mermaid extension recommended
- Or use online viewers like mermaid.live

## 🛠️ Troubleshooting

### Cursor AI Agents Not Working
1. Ensure Cursor is updated to latest version
2. Check that workspace settings were imported
3. Try restarting Cursor
4. Verify you're using @ symbol for agents

### Templates Not Displaying Correctly
1. Use a modern browser (Chrome, Firefox, Safari)
2. Enable JavaScript if disabled
3. Check that files weren't corrupted during download

### Can't Import Workspace Settings
1. Ensure JSON file is valid (no syntax errors)
2. Place file in project root directory
3. Use absolute file path if relative doesn't work
4. Check Cursor permissions

## 🔧 Advanced Configuration

### Customizing AI Agents
Edit the `ai_agents` section in `cursor-workspace-preset.json`:
```json
{
  "name": "Your Agent Name",
  "alias": "@youragent",
  "system_prompt": "Your custom instructions...",
  "temperature": 0.7
}
```

### Adding Custom Snippets
Add to the `snippets` section:
```json
"your-snippet": {
  "prefix": "trigger",
  "body": ["Your snippet content"],
  "description": "What it does"
}
```

### Modifying .cursorrules
Edit `.cursorrules` to adjust:
- Writing style preferences
- Industry-specific terminology
- Brand voice guidelines
- Compliance requirements

## 📞 Support & Community

### Get Help
- **Discord**: [Join Vibe Marketing Community](#)
- **Email**: support@vibe-academy.com
- **Docs**: See README.md for detailed guides

### Share Your Success
- Tag us on social media: @thevibelaunch
- Share your projects in Discord
- Contribute templates back to the community

## ✅ Installation Checklist

- [ ] Downloaded and extracted marketing kit
- [ ] Installed Cursor IDE
- [ ] Imported workspace configuration
- [ ] Created project folder structure
- [ ] Tested AI agents
- [ ] Opened UTM Builder in browser
- [ ] Opened Headline Analyzer in browser
- [ ] Reviewed learning path document
- [ ] Joined Discord community

## 🎉 You're Ready!

Congratulations! Your AI-powered marketing workspace is set up. 

**Next Steps:**
1. Start with Module 1 in the learning path
2. Create your first AI-assisted blog post
3. Build your first automated campaign
4. Share your progress in the community

Remember: The journey of a thousand sales begins with a single headline. Let's create something amazing together!

---

*Version 1.0.0 | Last Updated: January 2025*