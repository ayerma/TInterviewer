# Component Documentation

This document provides detailed documentation for all React components in the TInterviewer application.

## Component Overview

The TInterviewer application consists of five main components organized in a hierarchical structure:

```
App (Root Component)
├── ThemeSwitch (Header)
├── TopicNav (Sidebar)
├── ComplexitySwitch (Content Area)
└── TopicContent (Content Area)
```

## App Component

**File**: `src/App.js`  
**Purpose**: Root component that manages global state and layout

### Props

None (root component)

### State

```javascript
const [selectedTopic, setSelectedTopic] = useState(null);
const [complexity, setComplexity] = useState("basic");
const [theme, setTheme] = useState("light");
```

### Key Features

- **Global State Management**: Handles theme, complexity, and selected topic
- **Layout Structure**: Defines the overall application layout
- **Theme Application**: Applies theme class to document body
- **Component Coordination**: Passes state and handlers to child components

### Methods

```javascript
handleSelectTopic(topic); // Handles topic selection from navigation
```

### Usage Example

```javascript
// App.js is the root component, rendered in index.js
ReactDOM.render(<App />, document.getElementById("root"));
```

### CSS Classes

- `.App` - Main container with flexbox layout
- `.App-header` - Header section with title and theme switch
- `.main-content` - Main content area with sidebar and content
- `.sidebar` - Navigation sidebar
- `.content` - Main content area

---

## TopicNav Component

**File**: `src/components/TopicNav.js`  
**Purpose**: Renders hierarchical navigation menu for topics

### Props

```javascript
{
  topics: Array,           // Array of topic objects
  onSelectTopic: Function  // Callback for topic selection
}
```

### Key Features

- **Recursive Navigation**: Handles nested topic structures
- **Click Handling**: Manages topic selection with callback
- **Hierarchical Display**: Shows topics and subtopics in tree structure

### Methods

```javascript
renderSubtopics(subtopics); // Recursively renders nested topics
```

### Topic Data Structure

```javascript
{
  id: 'unique-id',
  name: 'Display Name',
  subtopics: [...],  // Optional nested topics
  content: {...}     // Optional content object
}
```

### Usage Example

```javascript
<TopicNav topics={topics} onSelectTopic={handleSelectTopic} />
```

### CSS Classes

- `.topic-nav` - Navigation container
- `.topic-nav ul` - Topic lists (nested)
- `.topic-nav li` - Individual topic items
- `.topic-nav a` - Topic links

### Accessibility Features

- Semantic navigation structure
- Keyboard accessible links
- Clear visual hierarchy

---

## TopicContent Component

**File**: `src/components/TopicContent.js`  
**Purpose**: Displays content for selected topic at chosen complexity level

### Props

```javascript
{
  topic: Object,      // Selected topic object
  complexity: String  // Current complexity level ('basic', 'middle', 'inDepth')
}
```

### Key Features

- **Content Filtering**: Shows content based on complexity level
- **Empty State Handling**: Displays placeholder when no topic selected
- **Dynamic Content**: Updates when topic or complexity changes

### Content Structure

```javascript
topic.content = {
  basic: "Basic explanation...",
  middle: "Intermediate explanation...",
  inDepth: "Advanced explanation...",
};
```

### Usage Example

```javascript
<TopicContent topic={selectedTopic} complexity={complexity} />
```

### CSS Classes

- `.topic-content` - Content container
- Dynamic heading and paragraph styling

### Error Handling

- Gracefully handles missing topics
- Shows fallback message for invalid content

---

## ComplexitySwitch Component

**File**: `src/components/ComplexitySwitch.js`  
**Purpose**: Provides interface for switching between complexity levels

### Props

```javascript
{
  complexity: String,     // Current complexity level
  setComplexity: Function // Callback to change complexity
}
```

### Key Features

- **Three-Level Toggle**: Basic, Middle, In-Depth options
- **Visual State**: Active button highlighting
- **Instant Switching**: Immediate content updates

### Complexity Levels

- **basic**: Entry-level explanations
- **middle**: Intermediate detail level
- **inDepth**: Advanced, comprehensive explanations

### Usage Example

```javascript
<ComplexitySwitch complexity={complexity} setComplexity={setComplexity} />
```

### CSS Classes

- `.complexity-switch` - Container for buttons
- `.complexity-switch button` - Individual buttons
- `.complexity-switch button.active` - Active button state

### Accessibility Features

- Button semantics for screen readers
- Keyboard navigation support
- Clear visual feedback

---

## ThemeSwitch Component

**File**: `src/components/ThemeSwitch.js`  
**Purpose**: Toggles between light and dark themes

### Props

```javascript
{
  theme: String,      // Current theme ('light' or 'dark')
  setTheme: Function  // Callback to change theme
}
```

### Key Features

- **Binary Toggle**: Switches between light and dark modes
- **Dynamic Label**: Button text reflects next action
- **Global Theme**: Affects entire application styling

### Theme System

Uses CSS custom properties defined in `src/index.css`:

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

### Usage Example

```javascript
<ThemeSwitch theme={theme} setTheme={setTheme} />
```

### CSS Classes

- `.theme-switch` - Theme toggle button

### Methods

```javascript
toggleTheme(); // Internal method to switch themes
```

---

## Component Interaction Flow

### Topic Selection Flow

1. User clicks topic in `TopicNav`
2. `onSelectTopic` callback fired
3. `App` updates `selectedTopic` state
4. `TopicContent` re-renders with new topic
5. `ComplexitySwitch` becomes visible

### Complexity Change Flow

1. User clicks complexity button in `ComplexitySwitch`
2. `setComplexity` callback fired
3. `App` updates `complexity` state
4. `TopicContent` re-renders with new complexity level

### Theme Change Flow

1. User clicks theme button in `ThemeSwitch`
2. `setTheme` callback fired
3. `App` updates `theme` state
4. `useEffect` applies theme class to document body
5. CSS custom properties update entire interface

## Styling Architecture

### CSS Custom Properties

All components use CSS custom properties for consistent theming:

```css
color: var(--text-color);
background-color: var(--background-color);
border-color: var(--border-color);
```

### Responsive Design

Components use flexbox for responsive layouts:

- Header: `justify-content: space-between`
- Main: `display: flex` with sidebar and content
- Navigation: Vertical scrolling when needed

### Component-Specific Styles

#### Navigation Styles

```css
.topic-nav ul {
  list-style: none;
  padding: 0;
}

.topic-nav a:hover {
  background-color: var(--nav-hover-background-color);
}
```

#### Button Styles

```css
.complexity-switch button {
  opacity: 0.7;
  transition: opacity 0.3s;
}

.complexity-switch button.active {
  opacity: 1;
  font-weight: bold;
}
```

## Performance Considerations

### Optimization Strategies

- **Minimal Re-renders**: Components only update when props change
- **Efficient Updates**: State changes are batched by React
- **CSS Transitions**: Smooth animations without JavaScript

### Memory Management

- No memory leaks from event listeners
- Proper cleanup in useEffect hooks
- Efficient DOM updates

## Testing Strategy

### Unit Testing Approach

```javascript
// Example test structure
describe("TopicNav Component", () => {
  test("renders topics correctly", () => {
    // Test topic rendering
  });

  test("handles topic selection", () => {
    // Test click handlers
  });
});
```

### Component Testing Checklist

- [ ] Props are passed correctly
- [ ] State updates trigger re-renders
- [ ] Event handlers work as expected
- [ ] CSS classes are applied properly
- [ ] Accessibility features function

## Common Issues and Solutions

### Topic Selection Not Working

**Issue**: Topics don't display content when clicked
**Solution**: Ensure topic objects have `content` property with all complexity levels

### Theme Not Switching

**Issue**: Theme toggle doesn't change appearance
**Solution**: Check CSS custom properties are defined for both themes

### Navigation Hierarchy Issues

**Issue**: Nested topics not displaying correctly
**Solution**: Verify `subtopics` array structure and recursive rendering

### Styling Inconsistencies

**Issue**: Components look different across themes
**Solution**: Use CSS custom properties instead of hardcoded colors

## Extension Guidelines

### Adding New Components

1. Create component file in `src/components/`
2. Follow existing naming patterns
3. Use CSS custom properties for theming
4. Add prop validation with PropTypes
5. Include accessibility features

### Modifying Existing Components

1. Maintain backward compatibility
2. Update documentation
3. Test all themes and complexity levels
4. Verify responsive behavior

### State Management

- Keep state as close to usage as possible
- Use callback props for child-to-parent communication
- Consider React Context for deeply nested props

This documentation provides a comprehensive guide for understanding, maintaining, and extending the TInterviewer component architecture.
