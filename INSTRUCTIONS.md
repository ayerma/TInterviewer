# TInterviewer - Java Interview Preparation App

## Project Overview

TInterviewer is a SolidJS-based web application designed to help developers prepare for technical interviews. The application features a hierarchical topic structure organized by spaces, topics, and questions, with detailed content including explanations, code examples, and key points.

## Features

- **Hierarchical Topic Navigation**: Organized topics and subtopics for easy browsing
- **Multi-level Complexity**: Content available at Basic, Middle, and In-Depth levels
- **Theme Support**: Light and dark mode toggle
- **Responsive Design**: Clean, sidebar-based layout
- **GitHub Pages Deployment**: Ready for static hosting

## Technology Stack

- **Frontend**: SolidJS 1.9.11
- **Routing**: @solidjs/router 0.15.4
- **Build Tool**: Vite 7.3.1
- **Styling**: Tailwind CSS 4.1.18
- **Deployment**: GitHub Pages
- **Package Manager**: npm

## Project Structure

```
TInterviewer/
├── README.md                          # This file
├── package.json                       # Dependencies and scripts
├── index.html                         # HTML template
├── vite.config.ts                     # Vite configuration
├── tsconfig.json                      # TypeScript configuration
├── public/                            # Static assets
│   └── data/                          # JSON data files
│       ├── spaces-index.json          # Space index
│       └── spaces/                    # Space-specific data
│           └── java/                  # Java interview questions
└── src/                               # Source code
    ├── App.tsx                        # Main application component
    ├── index.tsx                      # Application entry point
    ├── index.css                      # Global styles
    ├── components/                    # Solid components
    │   ├── MainLayout.tsx             # Main layout
    │   ├── NavigationMenu.tsx         # Navigation
    │   ├── SpaceSelector.tsx          # Space selector
    │   └── QuestionNavigation.tsx     # Question navigation
    ├── pages/                         # Page components
    │   ├── Home.tsx                   # Home page
    │   ├── SpaceView.tsx              # Space view
    │   ├── TopicView.tsx              # Topic view
    │   └── QuestionDetail.tsx         # Question detail
    ├── contexts/                      # Context providers
    │   └── DataContext.tsx            # Data context
    ├── services/                      # Services
    │   └── dataService.ts             # Data loading service
    └── types/                         # TypeScript types
        └── schema.ts                  # Type definitions
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ayerma/TInterviewer.git
   cd TInterviewer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- **Development**: `npm run dev` - Runs the app in development mode with Vite
- **Production Build**: `npm run build` - Builds the app for production
- **Preview**: `npm run preview` - Preview the production build locally

## Application Architecture

### Component Hierarchy

```
App
├── Header
│   ├── Title
│   └── ThemeSwitch
└── MainContent
    ├── Sidebar
    │   └── TopicNav
    └── Content
        ├── ComplexitySwitch
        └── TopicContent
```

### Data Structure

Topics are organized hierarchically in `src/data/topics.js`:

```javascript
{
  id: 'unique-identifier',
  name: 'Display Name',
  subtopics: [...], // Optional nested topics
  content: {        // Optional content for leaf nodes
    basic: 'Basic explanation...',
    middle: 'Intermediate explanation...',
    inDepth: 'Advanced explanation...'
  }
}
```

### State Management

The application uses React hooks for state management:

- **selectedTopic**: Currently displayed topic
- **complexity**: Active complexity level (basic/middle/inDepth)
- **theme**: Current theme (light/dark)

## Customization Guide

### Adding New Topics

1. Open `src/data/topics.js`
2. Add new topic objects following the existing structure
3. Ensure leaf nodes have `content` objects with all three complexity levels

### Styling Customization

#### Theme Variables

Modify CSS custom properties in `src/index.css`:

```css
body.light {
  --background-color: #ffffff;
  --text-color: #282c34;
  /* ... other variables */
}

body.dark {
  --background-color: #282c34;
  --text-color: #ffffff;
  /* ... other variables */
}
```

#### Component Styles

Individual component styles are in `src/App.css`

### Adding New Complexity Levels

1. Update the `complexity` state initialization in `App.js`
2. Add new buttons in `ComplexitySwitch.js`
3. Add corresponding content fields in topic data
4. Update `TopicContent.js` if needed

## Deployment

### GitHub Pages Deployment

The application is configured for GitHub Pages deployment:

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

The app will be available at: `https://ayerma.github.io/TInterviewer`

### Other Deployment Options

For other hosting platforms:

1. Run `npm run build`
2. Upload the `build/` folder contents to your web server

## Development Guidelines

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use CSS custom properties for theming
- Keep components small and focused

### File Organization

- Components in `src/components/`
- Data files in `src/data/`
- Styles co-located with components when possible

### Performance Considerations

- Topics are loaded synchronously (consider lazy loading for large datasets)
- CSS transitions for smooth theme switching
- Responsive design for mobile compatibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add new topics or improve existing content
4. Test thoroughly
5. Submit a pull request

## Future Enhancements

Potential improvements to consider:

- Search functionality
- Bookmarking favorite topics
- Progress tracking
- Code examples with syntax highlighting
- Interactive quizzes
- Export functionality
- Mobile app version

## Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version compatibility
2. **Deployment issues**: Verify GitHub Pages configuration
3. **Theme not switching**: Check CSS custom property support

### Support

For issues or questions:

- Check existing GitHub issues
- Create a new issue with detailed description
- Include browser and Node.js version information

## License

This project is open source. Check the repository for license details.
