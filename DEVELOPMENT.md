# Development Setup Guide

This guide provides step-by-step instructions for setting up the TInterviewer development environment.

## Prerequisites

### Required Software

1. **Node.js** (v14.0.0 or higher)

   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)

   - Verify installation: `npm --version`

3. **Git**

   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

4. **Code Editor** (recommended)
   - Visual Studio Code: https://code.visualstudio.com/
   - With React/JavaScript extensions

## Initial Setup

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/ayerma/TInterviewer.git

# Navigate to the project directory
cd TInterviewer
```

### 2. Install Dependencies

```bash
# Install all npm dependencies
npm install

# This will install:
# - React and React DOM
# - Testing libraries
# - Build tools
# - GitHub Pages deployment tools
```

### 3. Verify Installation

```bash
# Start the development server
npm start

# The application should open automatically at:
# http://localhost:3000
```

## Development Workflow

### Starting Development

```bash
# Start the development server
npm run dev
```

### Building for Production

```bash
# Create a production build
npm run build

# The build output will be in the 'build' directory
```

### Running Tests

```bash
# Run tests in interactive mode
npm test

# Run tests once
npm test -- --coverage
```

### Deploying to GitHub Pages

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

## Project Configuration

### Environment Variables

Create a `.env` file in the project root for local environment variables:

```env
# Example environment variables
VITE_APP_VERSION=1.0.0
VITE_APP_TITLE=TInterviewer
```

### IDE Configuration

#### Visual Studio Code

Recommended extensions:

- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Bracket Pair Colorizer
- Prettier - Code formatter
- ESLint

#### Settings.json (VS Code)

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

## File Structure Deep Dive

### Source Code Organization

```
src/
├── App.js              # Main application component
├── App.css             # Application-wide styles
├── index.js            # React entry point
├── index.css           # Global styles and CSS variables
├── components/         # Reusable components
│   ├── TopicNav.js     # Navigation sidebar component
│   ├── TopicContent.js # Content display component
│   ├── ComplexitySwitch.js # Complexity level selector
│   └── ThemeSwitch.js  # Theme toggle component
└── data/               # Application data
    └── topics.js       # Topic content and structure
```

### Component Architecture

#### App.js (Main Component)

- Manages global state (theme, complexity, selected topic)
- Handles routing between topics
- Coordinates child components

#### TopicNav.js (Navigation)

- Renders hierarchical topic tree
- Handles topic selection
- Recursive rendering for nested topics

#### TopicContent.js (Content Display)

- Displays selected topic content
- Filters content by complexity level
- Handles empty states

#### ComplexitySwitch.js (Level Selector)

- Manages complexity level switching
- Visual indicators for active level
- Button-based interface

#### ThemeSwitch.js (Theme Toggle)

- Toggles between light and dark themes
- Updates global CSS variables
- Persistent theme state

### Data Structure

#### topics.js Format

```javascript
export const topics = [
  {
    id: "unique-id", // Unique identifier
    name: "Display Name", // Human-readable name
    subtopics: [
      // Optional nested topics
      {
        id: "sub-topic-id",
        name: "Sub Topic Name",
        content: {
          // Leaf nodes have content
          basic: "Basic explanation...",
          middle: "Intermediate explanation...",
          inDepth: "Advanced explanation...",
        },
      },
    ],
  },
];
```

## Styling System

### CSS Custom Properties (Variables)

The application uses CSS custom properties for theming:

```css
:root {
  /* Light theme */
  --background-color: #ffffff;
  --text-color: #282c34;
  --nav-background-color: #f7f7f7;

  /* Dark theme overrides */
  [data-theme="dark"] & {
    --background-color: #282c34;
    --text-color: #ffffff;
    --nav-background-color: #3c4048;
  }
}
```

### Component Styling

- Each component has dedicated CSS classes
- BEM methodology for class naming
- Responsive design with flexbox
- Smooth transitions for theme switching

## Common Development Tasks

### Adding New Topics

1. Open `src/data/topics.js`
2. Add new topic object to appropriate section
3. Include all three complexity levels
4. Test navigation and content display

### Modifying Styles

1. For global changes: edit `src/index.css`
2. For component-specific changes: edit `src/App.css`
3. Use CSS custom properties for themeable values
4. Test in both light and dark themes

### Adding New Components

1. Create new file in `src/components/`
2. Follow existing naming conventions
3. Import and use in parent components
4. Add corresponding styles to `App.css`

## Testing Strategy

### Unit Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test TopicNav.test.js
```

### Manual Testing Checklist

- [ ] All topics are clickable and display content
- [ ] Complexity switching works for all topics
- [ ] Theme switching affects all UI elements
- [ ] Responsive design works on mobile
- [ ] No console errors or warnings

## Deployment Configuration

### GitHub Pages Setup

The project is configured for GitHub Pages deployment:

1. **package.json** includes homepage URL
2. **gh-pages** package handles deployment
3. **deploy** script builds and publishes

### Build Optimization

The production build includes:

- Code minification
- Asset optimization
- Bundle splitting
- Source map generation

## Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or start on different port
PORT=3001 npm start
```

#### Module Not Found

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

#### Build Failures

```bash
# Check Node.js version
node --version

# Update npm
npm install -g npm@latest
```

### Performance Issues

- Use React DevTools for profiling
- Check bundle size with webpack-bundle-analyzer
- Optimize images and assets
- Consider code splitting for large applications

## Best Practices

### Code Quality

- Use ESLint for code consistency
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

### Performance

- Avoid unnecessary re-renders
- Use React.memo for expensive components
- Optimize CSS for smooth animations
- Minimize bundle size

### Accessibility

- Use semantic HTML elements
- Provide keyboard navigation
- Include ARIA labels where needed
- Test with screen readers

## Resources

### Documentation

- [React Documentation](https://reactjs.org/docs)
- [Create React App](https://create-react-app.dev/docs)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

### Tools

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [VS Code React Snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

### Community

- [React Community Discord](https://reactjs.org/community/support.html)
- [Stack Overflow React Tag](https://stackoverflow.com/questions/tagged/reactjs)
