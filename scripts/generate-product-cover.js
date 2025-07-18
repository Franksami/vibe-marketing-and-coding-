const fs = require('fs');
const path = require('path');

// Simple SVG product cover with purple gradient background
const productCoverSVG = `<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
  <!-- Purple gradient background -->
  <defs>
    <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="1200" height="675" fill="url(#purpleGradient)"/>
  
  <!-- Product Title -->
  <text x="600" y="200" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">
    Ultimate Cursor Rulebook
  </text>
  
  <!-- Subtitle -->
  <text x="600" y="280" font-family="Arial, sans-serif" font-size="36" fill="white" opacity="0.9" text-anchor="middle">
    50+ Battle-Tested Rules for 10x Faster Coding
  </text>
  
  <!-- Value Prop -->
  <text x="600" y="380" font-family="Arial, sans-serif" font-size="28" fill="white" opacity="0.8" text-anchor="middle">
    Save 20+ Hours Per Week with AI
  </text>
  
  <!-- Price Badge -->
  <rect x="450" y="440" width="300" height="80" rx="40" fill="white" opacity="0.2"/>
  <text x="600" y="490" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">
    Launch Price: $47
  </text>
  
  <!-- Logo -->
  <text x="600" y="600" font-family="Arial, sans-serif" font-size="24" fill="white" opacity="0.7" text-anchor="middle">
    🚀 thevibelaunch.ai
  </text>
</svg>`;

// Simple email header SVG
const emailHeaderSVG = `<svg width="600" height="200" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Purple gradient background -->
  <defs>
    <linearGradient id="purpleGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#A78BFA;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="600" height="200" fill="url(#purpleGradient2)"/>
  
  <!-- Logo -->
  <text x="300" y="110" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">
    🚀 thevibelaunch.ai
  </text>
</svg>`;

// Write the files
const assetsDir = path.join(__dirname, '..', 'public', 'brand-assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

fs.writeFileSync(path.join(assetsDir, 'gumroad-cover.svg'), productCoverSVG);
fs.writeFileSync(path.join(assetsDir, 'email-header.svg'), emailHeaderSVG);

console.log('✅ Brand assets generated in:', assetsDir);
console.log('📁 Files created:');
console.log('   - gumroad-cover.svg (1200x675)');
console.log('   - email-header.svg (600x200)');
console.log('\n💡 Convert to PNG for production use:');
console.log('   - https://convertio.co/svg-png/');
console.log('   - Or use a design tool like Canva/Figma for refinement');