# TInterviewer

Java Interview Q&A Application built with SolidJS, TailwindCSS, and Vite.

## Features

- **Collapsible Navigation Menu**: Browse through a hierarchical structure of Spaces, Topics, and Questions
- **Split-Screen Layout**: Navigation sidebar on the left, content area on the right
- **Responsive Design**: Mobile-friendly with overlay menu
- **Hash-based Routing**: Optimized for GitHub Pages deployment
- **State Persistence**: Expand/collapse states are maintained during navigation

## Tech Stack

- **Framework**: SolidJS with Vite
- **Styling**: TailwindCSS
- **Routing**: @solidjs/router (Hash mode)
- **Hosting**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
TInterviewer/
├── src/
│   ├── components/
│   │   └── NavigationMenu.tsx    # Collapsible navigation component
│   ├── pages/
│   │   ├── Home.tsx               # Home page
│   │   └── QuestionDetail.tsx    # Question detail view
│   ├── types/
│   │   └── schema.ts              # TypeScript interfaces
│   ├── App.tsx                    # Main app component with routing
│   ├── index.tsx                  # Entry point
│   └── index.css                  # Global styles with Tailwind
├── public/
│   └── data/
│       └── spaces-index.json      # Data structure for spaces/topics/questions
└── index.html                     # HTML template
```

## Navigation Menu

The navigation menu component implements:

- Three-level hierarchy: Spaces > Topics > Questions
- Expand/collapse functionality with chevron icons
- Active item highlighting based on current route
- Responsive behavior for mobile devices
- Independent scrolling
- Session-based state persistence

## Deployment

The project is automatically deployed to GitHub Pages on push to the main branch via GitHub Actions.

## License

ISC
