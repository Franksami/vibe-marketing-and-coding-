#!/bin/bash

# Vibe Marketing Kit Packaging Script
# Creates a distributable ZIP file of the marketing kit

echo "📦 Packaging Vibe Marketing Kit..."

# Set variables
KIT_NAME="vibe-marketing-kit"
VERSION="1.0.0"
TIMESTAMP=$(date +"%Y%m%d")
OUTPUT_NAME="${KIT_NAME}-${VERSION}-${TIMESTAMP}.zip"

# Create temp directory
TEMP_DIR="temp_marketing_kit"
rm -rf $TEMP_DIR
mkdir -p $TEMP_DIR/$KIT_NAME

# Copy files to temp directory
echo "📁 Copying files..."
cp -r marketing-kit/* $TEMP_DIR/$KIT_NAME/

# Create additional distribution files
echo "📝 Creating distribution files..."

# Create a simple START_HERE.txt
cat > $TEMP_DIR/$KIT_NAME/START_HERE.txt << 'EOF'
Welcome to the Vibe Marketing Kit! 🚀

Quick Start:
1. Read INSTALLATION.md for setup instructions
2. Import cursor-workspace-preset.json into Cursor IDE
3. Open the HTML tools in your browser
4. Follow the learning path in docs/

For support: support@vibe-academy.com

Happy marketing!
EOF

# Create a VERSION.txt
cat > $TEMP_DIR/$KIT_NAME/VERSION.txt << EOF
Vibe Marketing Kit
Version: ${VERSION}
Build Date: ${TIMESTAMP}
EOF

# Create the ZIP file
echo "🗜️ Creating ZIP archive..."
cd $TEMP_DIR
zip -r ../$OUTPUT_NAME $KIT_NAME

# Cleanup
cd ..
rm -rf $TEMP_DIR

# Final message
echo "✅ Marketing kit packaged successfully!"
echo "📦 Output: $OUTPUT_NAME"
echo "📊 File size: $(du -h $OUTPUT_NAME | cut -f1)"
echo ""
echo "Distribution checklist:"
echo "- [ ] Upload to website"
echo "- [ ] Share download link" 
echo "- [ ] Update documentation"
echo "- [ ] Announce in community"

# Make script executable
chmod +x package-marketing-kit.sh