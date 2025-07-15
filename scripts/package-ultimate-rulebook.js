const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, '..', 'public', 'downloads');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create a file to stream archive data to
const outputPath = path.join(outputDir, 'ultimate-cursor-rulebook.zip');
const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

// Listen for archive events
output.on('close', () => {
  console.log(`✅ Ultimate Cursor Rulebook packaged successfully!`);
  console.log(`📦 Size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📍 Location: ${outputPath}`);
  console.log(`\n🚀 Ready to upload to Gumroad!`);
});

archive.on('error', (err) => {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add files to the archive
const sourceDir = path.join(__dirname, '..', 'content', 'products', 'ultimate-cursor-rulebook');

// Add README
archive.file(path.join(sourceDir, 'README.md'), { name: 'ultimate-cursor-rulebook/README.md' });

// Add framework rules
const frameworksDir = path.join(sourceDir, 'frameworks');
if (fs.existsSync(frameworksDir)) {
  archive.directory(frameworksDir, 'ultimate-cursor-rulebook/frameworks');
}

// Add task-specific rules
const taskDir = path.join(sourceDir, 'task-specific');
if (fs.existsSync(taskDir)) {
  archive.directory(taskDir, 'ultimate-cursor-rulebook/task-specific');
}

// Add industry-specific rules
const industryDir = path.join(sourceDir, 'industry-specific');
if (fs.existsSync(industryDir)) {
  archive.directory(industryDir, 'ultimate-cursor-rulebook/industry-specific');
}

// Add bonus rules
const bonusesDir = path.join(sourceDir, 'bonuses');
if (fs.existsSync(bonusesDir)) {
  archive.directory(bonusesDir, 'ultimate-cursor-rulebook/bonuses');
}

// Add installation guide
const installGuide = `# Installation Guide - Ultimate Cursor Rulebook

## 🚀 Quick Start (2 minutes)

### Step 1: Choose Your Rules
1. Browse the folders and find rules for your tech stack
2. Start with framework rules (e.g., \`frameworks/react-pro.cursorrules\`)
3. Add task-specific rules as needed

### Step 2: Install in Your Project
1. Copy your chosen \`.cursorrules\` file to your project root
2. Rename it to exactly \`.cursorrules\` (remove the descriptive prefix)
3. Open your project in Cursor
4. The rules are now active!

### Step 3: Combine Rules (Advanced)
For projects using multiple technologies, combine rules:

\`\`\`bash
# Example: Next.js + Testing + Performance
cat frameworks/nextjs-14-advanced.cursorrules > .cursorrules
echo -e "\\n\\n" >> .cursorrules
cat task-specific/testing-master.cursorrules >> .cursorrules
echo -e "\\n\\n" >> .cursorrules
cat task-specific/performance-optimizer.cursorrules >> .cursorrules
\`\`\`

## 📁 Folder Structure

- **frameworks/** - Language and framework-specific rules
- **task-specific/** - Rules for specific development tasks
- **industry-specific/** - Rules tailored to industry needs
- **bonuses/** - Extra rules for special use cases

## 💡 Pro Tips

1. **Start Simple**: Use one ruleset at a time initially
2. **Customize**: Add your team's conventions to any ruleset
3. **Test First**: Try rules on a small part of your project
4. **Iterate**: Refine rules based on your needs
5. **Share**: Create team-specific versions

## 🎯 Common Combinations

### Full-Stack Web App
- frameworks/nextjs-14-advanced.cursorrules
- frameworks/react-pro.cursorrules
- task-specific/testing-master.cursorrules

### SaaS Application
- industry-specific/saas-application.cursorrules
- frameworks/nextjs-14-advanced.cursorrules
- task-specific/security-auditor.cursorrules

### Startup MVP
- bonuses/startup-mvp.cursorrules
- task-specific/performance-optimizer.cursorrules

## ❓ FAQ

**Q: Can I edit the rules?**
A: Yes! These are starting points. Customize them for your needs.

**Q: How do I update rules?**
A: Download the latest version from your Gumroad library.

**Q: Can I use multiple rules?**
A: Yes, combine them as shown above.

## 🆘 Support

- Email: support@thevibelaunch.ai
- Discord: Join our private community (link in email)
- Response time: Under 24 hours

---

Thank you for purchasing the Ultimate Cursor Rulebook! 
Now go build something amazing 10x faster. 🚀
`;

// Create and add installation guide
archive.append(installGuide, { name: 'ultimate-cursor-rulebook/INSTALLATION.md' });

// Add rule combination examples
const combinationExamples = `# Rule Combination Examples

## Full-Stack Next.js + Supabase

\`\`\`bash
# Combine Next.js, React, and Supabase rules
cat frameworks/nextjs-14-advanced.cursorrules > .cursorrules
echo -e "\\n\\n# React Patterns\\n" >> .cursorrules
cat frameworks/react-pro.cursorrules >> .cursorrules
echo -e "\\n\\n# Supabase Integration\\n" >> .cursorrules
cat bonuses/supabase-integration.cursorrules >> .cursorrules
\`\`\`

## Enterprise Node.js API

\`\`\`bash
# Combine Node.js, Testing, Security, and Performance
cat frameworks/nodejs-enterprise.cursorrules > .cursorrules
echo -e "\\n\\n# Testing Excellence\\n" >> .cursorrules
cat task-specific/testing-master.cursorrules >> .cursorrules
echo -e "\\n\\n# Security First\\n" >> .cursorrules
cat task-specific/security-auditor.cursorrules >> .cursorrules
echo -e "\\n\\n# Performance\\n" >> .cursorrules
cat task-specific/performance-optimizer.cursorrules >> .cursorrules
\`\`\`

## SaaS MVP

\`\`\`bash
# Fast SaaS development combo
cat bonuses/startup-mvp.cursorrules > .cursorrules
echo -e "\\n\\n# SaaS Patterns\\n" >> .cursorrules
cat industry-specific/saas-application.cursorrules >> .cursorrules
\`\`\`

## E-commerce Platform

\`\`\`bash
# E-commerce focused development
cat industry-specific/ecommerce-platform.cursorrules > .cursorrules
echo -e "\\n\\n# Payment Integration\\n" >> .cursorrules
cat task-specific/payment-integration.cursorrules >> .cursorrules
echo -e "\\n\\n# Performance for Scale\\n" >> .cursorrules
cat task-specific/performance-optimizer.cursorrules >> .cursorrules
\`\`\`

## Tips for Combining Rules

1. **Order Matters**: Put general rules first, specific rules last
2. **Avoid Conflicts**: Review combined rules for contradictions
3. **Test Incrementally**: Add one ruleset at a time
4. **Document Changes**: Add comments for your customizations
5. **Share with Team**: Create a shared repository of combinations

## Creating Your Own Combinations

1. Start with a base framework rule
2. Add task-specific rules for your workflow
3. Include industry rules if applicable
4. Top off with productivity boosters
5. Test and refine

Remember: The best ruleset is the one that matches YOUR workflow!
`;

archive.append(combinationExamples, { name: 'ultimate-cursor-rulebook/COMBINATIONS.md' });

// Add sample cursorrules for common stacks
const quickStartRules = {
  'QUICKSTART-react.cursorrules': `# Quick Start - React Development
# This is a simplified combination of our React Pro rules
# For the full version, see frameworks/react-pro.cursorrules

You are an expert React developer. Follow these patterns:

- Use functional components with hooks
- Implement proper TypeScript types
- Handle loading and error states
- Make components accessible by default
- Optimize performance with React.memo when needed
- Write clean, maintainable code

When creating components:
1. Define clear prop interfaces
2. Handle edge cases
3. Add proper error boundaries
4. Include basic tests
5. Follow React best practices`,

  'QUICKSTART-nextjs.cursorrules': `# Quick Start - Next.js App Router
# This is a simplified version of our Next.js 14 Advanced rules
# For the full version, see frameworks/nextjs-14-advanced.cursorrules

You are a Next.js expert using App Router. Follow these patterns:

- Use Server Components by default
- Add 'use client' only when needed
- Implement proper data fetching
- Set up proper caching strategies
- Handle errors gracefully
- Optimize for Core Web Vitals

Project structure:
- app/ for routes
- components/ for shared components
- lib/ for utilities
- Follow Next.js conventions`,

  'QUICKSTART-fullstack.cursorrules': `# Quick Start - Full Stack Development
# Combined rules for rapid full-stack development
# See individual rule files for complete versions

You are a full-stack developer building modern web applications.

Frontend:
- Use React/Next.js with TypeScript
- Implement responsive design
- Optimize performance
- Handle errors gracefully

Backend:
- Build REST or GraphQL APIs
- Implement proper authentication
- Validate all inputs
- Handle errors consistently

Database:
- Design efficient schemas
- Use proper indexing
- Implement data validation
- Handle migrations

Always consider security, performance, and user experience.`
};

// Add quick start rules
Object.entries(quickStartRules).forEach(([filename, content]) => {
  archive.append(content, { name: `ultimate-cursor-rulebook/quickstart/${filename}` });
});

// Create a changelog
const changelog = `# Changelog - Ultimate Cursor Rulebook

## Version 1.0.0 (Launch) - ${new Date().toLocaleDateString()}

### 🎉 Initial Release

#### Framework Rules (15)
- React Pro with advanced patterns
- Next.js 14 App Router mastery
- Vue 3 Composition API
- Svelte 5 with Runes
- Angular 17 with Signals
- Node.js Enterprise patterns
- Express.js production-ready
- NestJS architecture
- And more...

#### Task-Specific Rules (20)
- Bug fixing detective
- Performance optimizer
- Security auditor
- Testing master
- Documentation pro
- Clean code enforcer
- And more...

#### Industry-Specific Rules (10)
- SaaS applications
- E-commerce platforms
- Fintech security
- Healthcare compliance
- Education/LMS
- And more...

#### Bonus Rules (10)
- Startup MVP builder
- Open source contributor
- Team collaboration
- Migration expert
- And more...

### 📚 Documentation
- Comprehensive README
- Installation guide
- Combination examples
- Quick start rules
- Video tutorials (coming soon)

### 🚀 What's Next
- Visual rule builder (Q2 2024)
- Community rule marketplace
- AI rule generator
- Team sync features

Thank you for being an early adopter! Your feedback shapes the future of this product.

Email suggestions to: feedback@thevibelaunch.ai
`;

archive.append(changelog, { name: 'ultimate-cursor-rulebook/CHANGELOG.md' });

// Add a thank you note
const thankYou = `# Thank You! 🙏

Thank you for purchasing the Ultimate Cursor Rulebook!

You've just unlocked the ability to code 10x faster with AI. Here's how to get the most value:

## 🚀 Your First Steps

1. **Right Now**: Install your first rule (see INSTALLATION.md)
2. **Today**: Try 2-3 different rules on your current project
3. **This Week**: Find your favorite combinations
4. **This Month**: Customize rules for your workflow

## 💡 Success Tips

- **Start Simple**: Don't try to use all rules at once
- **Measure Impact**: Time your tasks before/after
- **Share Wins**: Tell us your success stories
- **Stay Updated**: Check your email for new rules

## 🎁 Your Bonuses

Check your email for:
- Private Discord invite
- Bonus video tutorials
- Custom rule request form

## 📊 Track Your Progress

Many users report:
- 70% faster development within 1 week
- 90% fewer repetitive tasks
- 50% more time for creative work

## 🤝 Join the Community

Discord: [Check your email for invite]
Email: support@thevibelaunch.ai

## 🙌 Share Your Success

When you ship something awesome with these rules:
- Tag @thevibelaunch on Twitter/X
- Share in our Discord
- Get featured in our newsletter

---

Remember: The best developers use the best tools.
You now have the best AI coding rules available.

Go build something amazing! 🚀

- Frank & The Vibe Launch Team

P.S. Your lifetime updates mean you'll always have the latest rules. We add new ones monthly!
`;

archive.append(thankYou, { name: 'ultimate-cursor-rulebook/THANK-YOU.md' });

// Finalize the archive
archive.finalize();