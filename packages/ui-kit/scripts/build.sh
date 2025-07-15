#!/bin/bash

# Build script for @vibe/ui-kit

echo "🔧 Building @vibe/ui-kit..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist

# Create dist directory
mkdir -p dist

# Build TypeScript
echo "📦 Building TypeScript..."
npx tsup src/index.ts --dts --format cjs,esm --external react --external react-dom

# Copy CSS
echo "🎨 Copying styles..."
cp -r src/styles dist/

# Create package.json for dist
echo "📝 Creating dist package.json..."
node -e "
const pkg = require('./package.json');
const distPkg = {
  ...pkg,
  main: 'index.js',
  module: 'index.mjs',
  types: 'index.d.ts',
  scripts: undefined,
  devDependencies: undefined
};
require('fs').writeFileSync('dist/package.json', JSON.stringify(distPkg, null, 2));
"

# Copy README
cp README.md dist/

echo "✅ Build complete! Package ready in dist/"
echo ""
echo "To publish:"
echo "  cd dist"
echo "  npm publish --access public"