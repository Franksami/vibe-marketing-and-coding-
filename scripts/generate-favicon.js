const fs = require('fs');
const path = require('path');

// Simple SVG favicon with purple background and white "VL" text
const faviconSVG = `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="6" fill="#8B5CF6"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">VL</text>
</svg>`;

// Write the SVG file
const faviconPath = path.join(__dirname, '..', 'public', 'favicon.svg');
fs.writeFileSync(faviconPath, faviconSVG);

console.log('✅ Favicon generated at:', faviconPath);
console.log('💡 For best results, convert this SVG to ICO format using an online converter');
console.log('   Recommended: https://convertio.co/svg-ico/');