# 🟣 The Vibe Launch - Brand Assets

## Primary Brand Colors

```css
/* Primary Purple - Our signature color */
--brand-purple: #8B5CF6;
--brand-purple-dark: #7C3AED;
--brand-purple-light: #A78BFA;

/* Supporting Colors */
--brand-white: #FFFFFF;
--brand-black: #0F172A;
--brand-gray: #64748B;

/* Accent Colors */
--brand-success: #10B981;
--brand-warning: #F59E0B;
--brand-error: #EF4444;
```

## Logo & Typography

### Primary Logo (Text-based)
```
🚀 thevibelaunch.ai
```

### Short Version
```
🚀 vibe
```

### Typography
- **Font**: Inter (already in project)
- **Weights**: 400 (regular), 600 (semibold), 700 (bold)
- **Logo text**: Bold (700)
- **Body text**: Regular (400)

## Quick Brand Guidelines

### Voice & Tone
- **Direct**: "Code 10x faster" not "Enhance your development workflow"
- **Confident**: We know this works
- **Friendly**: Not corporate, but professional
- **Action-oriented**: Launch, build, ship, create

### Taglines
- **Primary**: "Code 10x faster with AI. Starting at $47."
- **Short**: "Launch your AI coding speed"
- **Social**: "Cursor rules that save you 20 hrs/week"

### Social Media Bios
- **Twitter/X**: "🚀 Cursor rules to code 10x faster with AI | $47 launch price | Get instant access →"
- **LinkedIn**: "Helping developers leverage AI for 10x productivity. Creator of the Ultimate Cursor Rulebook."
- **GitHub**: "🚀 AI coding rules and resources | thevibelaunch.ai"

## Visual Assets Checklist

### Needed Immediately
- [x] Purple color defined (#8B5CF6)
- [x] Favicon (purple square, white "VL") - `/public/favicon.svg`
- [x] Social media avatar (same as favicon) - `/public/favicon.svg`
- [x] Gumroad product cover (purple bg, white text) - `/public/brand-assets/gumroad-cover.svg`
- [x] Email header (simple text + rocket) - `/public/brand-assets/email-header.svg`

### Can Wait
- [ ] Animated logo
- [ ] Brand guidelines PDF
- [ ] Custom illustrations
- [ ] Gradient explorations

## Usage Examples

### Buttons
```css
.cta-button {
  background: var(--brand-purple);
  color: white;
  font-weight: 600;
}

.cta-button:hover {
  background: var(--brand-purple-dark);
}
```

### Headlines
```html
<h1 style="color: var(--brand-purple);">
  🚀 Launch Your AI Coding Speed
</h1>
```

### Social Posts
```
🚀 Just launched: The Ultimate Cursor Rulebook

50+ battle-tested rules for Cursor + Claude
Save 20 hours per week minimum

Purple launch price: $47 💜
[LINK]
```

## Remember: Ship First, Perfect Later

This is our MVP branding. Once we hit $5K in revenue, we can invest in:
- Professional logo design
- Custom illustrations
- Motion graphics
- Complete brand system

For now: Purple + Rocket + Clear message = Money 💜🚀