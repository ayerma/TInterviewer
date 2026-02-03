# TInterviewer

Java Interview Q&A Application built with SolidJS, TailwindCSS, and Vite.

## Live Demo

🚀 [View Live Application](https://ayerma.github.io/TInterviewer/)

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

### Automatic Deployment

The project is automatically deployed to GitHub Pages on every push to the `main` branch via GitHub Actions.

### Manual Deployment Setup

If deploying for the first time, ensure GitHub Pages is configured in your repository settings:

1. Go to **Settings** → **Pages**
2. Set **Source** to "GitHub Actions"
3. The workflow will automatically deploy on the next push to `main`

### Build Configuration

The project uses Vite with the following configuration for GitHub Pages:

- **Base URL**: `/TInterviewer/` (configured in `vite.config.ts`)
- **Output Directory**: `dist/`
- **Routing**: Hash-based routing via `@solidjs/router` (HashRouter)

### Deployment Workflow

The GitHub Actions workflow (`.github/workflows/deploy.yml`) performs:

1. **Checkout**: Fetches the repository code
2. **Setup Node**: Installs Node.js v20 with npm caching
3. **Install Dependencies**: Runs `npm ci` for clean install
4. **Build**: Executes `npm run build` to generate production assets
5. **Upload Artifact**: Packages the `dist/` folder
6. **Deploy**: Publishes to GitHub Pages

### Local Production Build

To test the production build locally:

```bash
npm run build
npm run preview
```

The preview server will serve the built application with the correct base path.

### Verifying Deployment

After deployment, verify:

- ✅ Application loads at `https://ayerma.github.io/TInterviewer/`
- ✅ Hash-based routing works (URLs contain `#/`)
- ✅ All routes navigate correctly
- ✅ JSON data files load from `public/data/`
- ✅ Assets (CSS, JS) load correctly

## License

ISC
