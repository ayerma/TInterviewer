# Spaces Content Folder Structure

This document describes the physical folder structure convention for storing interview question content in the TInterviewer application.

## Directory Structure

```
/public/data/spaces/
└── {spaceId}/
    └── {topicId}/
        └── {questionId}.json
```

## Path Convention

All content files follow this pattern:
```
/public/data/spaces/{spaceId}/{topicId}/{questionId}.json
```

### Components

- **spaceId**: The unique identifier of the space (e.g., `java`, `python`, `javascript`)
- **topicId**: The unique identifier of the topic within the space (e.g., `oop`, `collections`, `concurrency`)
- **questionId**: The unique identifier of the question within the topic (e.g., `what-is-inheritance`, `arraylist-vs-linkedlist`)

### ID Format

All IDs must follow these rules:
- Use lowercase letters only
- Use kebab-case (hyphen-separated words)
- Be URL-safe (alphanumeric characters and hyphens only)
- Be unique within their scope

## File Structure

Each question JSON file must contain:

```json
{
  "id": "question-id",
  "title": "Question Title?",
  "answers": {
    "junior": "Answer for junior level...",
    "middle": "Answer for middle level...",
    "senior": "Answer for senior level...",
    "tricky": "Answer for tricky/advanced level..."
  }
}
```

### Answer Levels

Each question supports four answer levels to match different experience levels:

- **junior**: Basic explanation suitable for entry-level developers
- **middle**: More detailed explanation with practical considerations
- **senior**: In-depth explanation with architecture and optimization details
- **tricky**: Advanced topics, edge cases, and implementation details

## Examples

### Example Paths

```
/public/data/spaces/java/oop/what-is-inheritance.json
/public/data/spaces/java/collections/arraylist-vs-linkedlist.json
/public/data/spaces/python/basics/data-types.json
/public/data/spaces/javascript/async/promises-vs-async-await.json
```

### Example Directory Tree

```
/public/data/spaces/
├── java/
│   ├── oop/
│   │   ├── what-is-inheritance.json
│   │   └── polymorphism-types.json
│   └── collections/
│       └── arraylist-vs-linkedlist.json
├── python/
│   └── basics/
│       └── data-types.json
└── javascript/
    └── async/
        └── promises-vs-async-await.json
```

## Git Tracking

All directories and files must be tracked in git. Ensure:

1. Question JSON files are committed (not .gitkeep files once content exists)
2. Empty directories include a placeholder file or sample question
3. File paths in `/public/data/spaces-index.json` match the actual filesystem structure

## Web Accessibility

These files are served statically from GitHub Pages. Ensure:

1. All paths are relative to the `/public` directory
2. File names are web-safe (no spaces, special characters)
3. JSON files are valid and properly formatted
4. Paths referenced in `spaces-index.json` must exist

## Adding New Content

To add a new question:

1. Create the directory structure if it doesn't exist: `/public/data/spaces/{spaceId}/{topicId}/`
2. Create the question JSON file following the schema: `{questionId}.json`
3. Update `/public/data/spaces-index.json` to reference the new question
4. Commit both the question file and the updated index

## Validation

Before committing, verify:

- [ ] Question JSON is valid
- [ ] All four answer levels are present (junior, middle, senior, tricky)
- [ ] File path matches the pattern: `spaces/{spaceId}/{topicId}/{questionId}.json`
- [ ] Question is referenced in `/public/data/spaces-index.json`
- [ ] IDs use kebab-case format
- [ ] File is accessible from the web root
