const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, '..', 'public', 'downloads');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create a file to stream archive data to
const outputPath = path.join(outputDir, 'cursor-rules-starter-pack.zip');
const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

// Listen for archive events
output.on('close', () => {
  console.log(`✅ Lead magnet packaged successfully!`);
  console.log(`📦 Size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📍 Location: ${outputPath}`);
});

archive.on('error', (err) => {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add files to the archive
const sourceDir = path.join(__dirname, '..', 'content', 'lead-magnets', 'cursor-rules-starter-pack');

// Add README
archive.file(path.join(sourceDir, 'README.md'), { name: 'cursor-rules-starter-pack/README.md' });

// Add all rule files
const rulesDir = path.join(sourceDir, 'rules');
const ruleFiles = fs.readdirSync(rulesDir).filter(file => file.endsWith('.cursorrules'));

ruleFiles.forEach(file => {
  archive.file(
    path.join(rulesDir, file),
    { name: `cursor-rules-starter-pack/rules/${file}` }
  );
});

// Add a quick start guide
const quickStartContent = `# Quick Start Guide

## 🚀 Getting Started in 2 Minutes

1. **Choose Your Framework**
   - Navigate to the \`rules\` folder
   - Find the rule file for your framework (e.g., \`react-typescript.cursorrules\`)

2. **Install in Your Project**
   - Copy the chosen \`.cursorrules\` file to your project root
   - Rename it to \`.cursorrules\` (remove the framework prefix)

3. **Start Coding with AI**
   - Open your project in Cursor
   - The rules will automatically guide AI code generation
   - Try asking Cursor to create a component or fix a bug!

## 📁 What's Included

- **react-typescript.cursorrules** - React + TypeScript patterns
- **nextjs-14.cursorrules** - Next.js App Router patterns
- **node-backend.cursorrules** - Node.js backend patterns
- **python.cursorrules** - Python best practices
- **testing.cursorrules** - Comprehensive testing patterns
- **debugging.cursorrules** - Systematic debugging approach
- **performance.cursorrules** - Performance optimization

## 💡 Pro Tips

1. **Combine Rules**: You can merge multiple rule files for full-stack projects
2. **Customize**: Add your team's specific patterns and conventions
3. **Share**: Create project-specific rules and share with your team

## 🎯 Next Steps

1. Join our community for advanced rules and updates
2. Check out our 7-day email course for more AI coding tips
3. Explore our premium templates and frameworks

---

**Need Help?** Visit [vibeacademy.com](https://vibeacademy.com) or join our Skool community!
`;

// Create and add quick start guide
archive.append(quickStartContent, { name: 'cursor-rules-starter-pack/QUICK_START.md' });

// Add example combinations
const exampleCombinationsContent = `# Example Rule Combinations

## Full-Stack Next.js Project

Combine these rules for a complete Next.js application:

\`\`\`bash
# In your project root, create .cursorrules
cat nextjs-14.cursorrules > .cursorrules
echo "\n\n" >> .cursorrules
cat react-typescript.cursorrules >> .cursorrules
echo "\n\n" >> .cursorrules
cat testing.cursorrules >> .cursorrules
\`\`\`

## Node.js API with Testing

\`\`\`bash
cat node-backend.cursorrules > .cursorrules
echo "\n\n" >> .cursorrules
cat testing.cursorrules >> .cursorrules
echo "\n\n" >> .cursorrules
cat debugging.cursorrules >> .cursorrules
\`\`\`

## Python Data Science Project

\`\`\`bash
cat python.cursorrules > .cursorrules
echo "\n\n" >> .cursorrules
cat performance.cursorrules >> .cursorrules
\`\`\`

## Tips for Combining Rules

1. **No Conflicts**: Our rules are designed to work together
2. **Order Matters**: Put framework-specific rules first
3. **Add Separators**: Use comments to organize sections
4. **Test Incrementally**: Add one rule set at a time

## Custom Project Rules Template

\`\`\`
# Project: [Your Project Name]
# Team: [Your Team]
# Last Updated: [Date]

# === FRAMEWORK RULES ===
[Paste framework rules here]

# === CODING STANDARDS ===
[Paste testing/debugging rules here]

# === PROJECT SPECIFIC ===
# Add your custom patterns here
- Always use our custom auth hook
- Follow our API naming convention
- Use our shared component library
\`\`\`
`;

archive.append(exampleCombinationsContent, { name: 'cursor-rules-starter-pack/COMBINATIONS.md' });

// Finalize the archive
archive.finalize();
