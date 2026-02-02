# Data Schema Documentation

## Overview

This document defines the data model schema for the hierarchical structure of Spaces, Topics, and Questions in the TInterviewer application.

## Schema Structure

### Hierarchy

```
SpacesIndex
└── Space[]
    └── Topic[]
        └── Question[]
```

### TypeScript Interfaces

The complete TypeScript interfaces are defined in `src/types/schema.ts`:

- **Question**: Represents a single interview question with reference to its content file
- **Topic**: Groups related questions together
- **Space**: Represents a domain/category containing multiple topics
- **SpacesIndex**: Root structure containing all spaces

### File Path Convention

#### Index File
- **Location**: `/public/data/spaces-index.json`
- **Purpose**: Maps the entire content structure
- **Format**: JSON conforming to `SpacesIndex` interface

#### Question Content Files
- **Pattern**: `spaces/{spaceId}/{topicId}/{questionId}.json`
- **Examples**:
  - `spaces/java/oop/what-is-inheritance.json`
  - `spaces/java/collections/arraylist-vs-linkedlist.json`
  - `spaces/python/basics/data-types.json`

#### ID Conventions
- Use lowercase kebab-case for all IDs
- IDs should be URL-safe (alphanumeric and hyphens only)
- IDs must be unique within their scope:
  - Space IDs: globally unique
  - Topic IDs: unique within a space
  - Question IDs: unique within a topic

## Entity Definitions

### Question
```typescript
interface Question {
  id: string;          // Unique identifier (kebab-case)
  title: string;       // Display title
  filePath: string;    // Path to content file
}
```

**Fields**:
- `id`: Unique identifier for the question (e.g., "what-is-inheritance")
- `title`: Human-readable question title (e.g., "What is inheritance in Java?")
- `filePath`: Relative path from public root to question content JSON

### Topic
```typescript
interface Topic {
  id: string;           // Unique identifier (kebab-case)
  name: string;         // Display name
  description: string;  // Brief description
  questions: Question[];
}
```

**Fields**:
- `id`: Unique identifier for the topic (e.g., "oop")
- `name`: Human-readable topic name (e.g., "Object-Oriented Programming")
- `description`: Brief description of the topic
- `questions`: Array of questions belonging to this topic

### Space
```typescript
interface Space {
  id: string;           // Unique identifier (kebab-case)
  name: string;         // Display name
  description: string;  // Brief description
  topics: Topic[];
}
```

**Fields**:
- `id`: Unique identifier for the space (e.g., "java")
- `name`: Human-readable space name (e.g., "Java")
- `description`: Brief description of the space
- `topics`: Array of topics belonging to this space

### SpacesIndex
```typescript
interface SpacesIndex {
  spaces: Space[];
}
```

**Fields**:
- `spaces`: Array of all available spaces in the application

## Extensibility

The schema is designed to support future metadata fields without breaking changes:

### Potential Future Fields

**Question**:
- `difficulty`: "junior" | "middle" | "senior"
- `tags`: string[]
- `createdAt`: ISO 8601 timestamp
- `updatedAt`: ISO 8601 timestamp

**Topic**:
- `icon`: string (icon identifier)
- `order`: number (display order)

**Space**:
- `icon`: string (icon identifier)
- `color`: string (theme color)
- `order`: number (display order)

Adding these fields to the TypeScript interfaces and JSON data will not affect existing code that doesn't use them.

## Example Data

See `/public/data/spaces-index.json` for a complete example with the Java space containing:
- 2 topics: "Object-Oriented Programming" and "Collections Framework"
- 3 questions total across both topics

## Validation

When implementing data loading, ensure:
1. All required fields are present
2. IDs follow the kebab-case convention
3. File paths are valid and accessible
4. Array fields are never null (use empty arrays instead)
5. IDs are unique within their scope
