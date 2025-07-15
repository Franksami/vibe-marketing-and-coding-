# @vibe/ui-kit Storybook Documentation

## Overview

We've successfully set up Storybook for the @vibe/ui-kit package. Storybook provides an interactive component explorer and documentation system.

## What's Been Implemented

### 1. Storybook Configuration
- ✅ Installed Storybook 9.0.16 with React + Vite support
- ✅ Configured global styles and theme switching
- ✅ Set up light/dark mode backgrounds
- ✅ Added proper TypeScript support

### 2. Component Stories Created

#### Workflow Components
- **WorkflowStatus.stories.tsx**
  - All status states (idle, running, success, error, warning, paused, scheduled, loading)
  - WorkflowStatusCard variations
  - Animated states demonstration

- **WorkflowTrigger.stories.tsx**
  - Basic workflow triggers
  - Webhook triggers with endpoint display
  - Batch trigger for multiple workflows
  - All button variants and sizes

- **WorkflowHistory.stories.tsx**
  - Execution history table
  - Filtering and export options
  - Real-time updates simulation
  - Loading and empty states

#### Data Components
- **MetricCard.stories.tsx**
  - All metric formats (number, currency, percentage)
  - Trend indicators
  - MetricCardGroup responsive grids
  - Real-time metric updates

## Running Storybook

```bash
# From the ui-kit directory
cd packages/ui-kit

# Install dependencies (with legacy peer deps)
npm install --legacy-peer-deps

# Start Storybook dev server
npm run storybook

# Build static Storybook
npm run build-storybook
```

## Features Demonstrated

### Interactive Controls
- All component props are controllable via Storybook controls
- Live prop editing for rapid prototyping
- Actions logged for event handlers

### Documentation
- Auto-generated docs from TypeScript types
- JSDoc comments integrated
- Usage examples in each story

### Visual Testing
- Multiple story variants for each component
- Edge cases covered (loading, error, empty states)
- Responsive design testing

## Story Organization

```
src/
├── components/
│   ├── workflow/
│   │   ├── WorkflowStatus.tsx
│   │   ├── WorkflowStatus.stories.tsx
│   │   ├── WorkflowTrigger.tsx
│   │   ├── WorkflowTrigger.stories.tsx
│   │   ├── WorkflowHistory.tsx
│   │   └── WorkflowHistory.stories.tsx
│   └── data/
│       ├── MetricCard.tsx
│       └── MetricCard.stories.tsx
```

## Best Practices Implemented

1. **Type Safety**: All stories use TypeScript with proper Meta and Story types
2. **Component Isolation**: Each story focuses on specific component features
3. **Real-World Examples**: Stories include practical use cases
4. **Accessibility**: Components tested with different states and interactions
5. **Performance**: Loading states and animations demonstrated

## Next Steps for Full Distribution

1. **Fix npm install issues**
   - Resolve peer dependency conflicts
   - Consider using pnpm or yarn for better dependency management

2. **Add remaining stories**
   - Create stories for any new components
   - Add more edge case scenarios

3. **Publish to npm**
   ```bash
   npm login
   npm publish --access public
   ```

4. **Deploy Storybook**
   - Build static Storybook: `npm run build-storybook`
   - Deploy to GitHub Pages, Netlify, or Vercel
   - Add link to README

## Known Issues

- npm install requires `--legacy-peer-deps` flag due to dependency conflicts
- Some devDependencies may need version adjustments

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Component Story Format](https://storybook.js.org/docs/api/csf)
- [Storybook + TypeScript](https://storybook.js.org/docs/configure/typescript)