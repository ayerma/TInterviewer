# Adding New Content Guide

This guide explains how to add new spaces, topics, and questions to the TInterviewer application.

## Overview

The content structure follows a three-level hierarchy:
- **Spaces**: Top-level categories (e.g., Java, Python, JavaScript)
- **Topics**: Subject areas within a space (e.g., Java Core, Exceptions, Spring Core)
- **Questions**: Individual interview questions within a topic

## File Structure

```
public/data/
├── spaces-index.json           # Main index file
└── spaces/
    └── {spaceId}/             # Space directory
        └── {topicId}/         # Topic directory
            └── {questionId}.json  # Question content file
```

## ID Conventions

- Use lowercase kebab-case for all IDs
- IDs must be URL-safe (alphanumeric and hyphens only)
- IDs must be unique within their scope:
  - Space IDs: globally unique
  - Topic IDs: unique within a space
  - Question IDs: unique within a topic

**Examples:**
- Space ID: `java`, `python`, `javascript`
- Topic ID: `java-core`, `spring-core`, `exceptions`
- Question ID: `what-is-jvm`, `dependency-injection`

## Adding a New Space

### 1. Update spaces-index.json

Add a new space object to the `spaces` array:

```json
{
  "id": "python",
  "name": "Python",
  "description": "Python programming concepts and interview questions",
  "topics": []
}
```

### 2. Create Directory Structure

```bash
mkdir -p public/data/spaces/python
```

## Adding a New Topic

### 1. Update spaces-index.json

Add a new topic object to the appropriate space's `topics` array:

```json
{
  "id": "basics",
  "name": "Python Basics",
  "description": "Fundamental Python concepts and syntax",
  "questions": []
}
```

### 2. Create Topic Directory

```bash
mkdir -p public/data/spaces/python/basics
```

## Adding a New Question

### 1. Update spaces-index.json

Add a new question object to the appropriate topic's `questions` array:

```json
{
  "id": "what-is-list-comprehension",
  "title": "What is list comprehension in Python?",
  "filePath": "spaces/python/basics/what-is-list-comprehension.json"
}
```

**Important:** The `filePath` must match the actual file location relative to `public/data/`.

### 2. Create Question Content File

Create a JSON file at the path specified in `filePath`:

```json
{
  "id": "what-is-list-comprehension",
  "title": "What is list comprehension in Python?",
  "answers": {
    "junior": "Your junior-level answer here. This should be a simple explanation suitable for beginners.",
    "middle": "Your middle-level answer here. This should include more details and practical examples.",
    "senior": "Your senior-level answer here. This should cover advanced concepts, edge cases, and best practices.",
    "tricky": "Your tricky-level answer here. This should discuss advanced scenarios, performance considerations, and deep technical details."
  }
}
```

## Question Content Guidelines

### Answer Levels

Each question must include four answer levels:

1. **Junior**: Simple, beginner-friendly explanation
   - Focus on basic concepts
   - Use simple language
   - Provide clear examples

2. **Middle**: Intermediate-level explanation
   - Include practical details
   - Explain how and why
   - Mention common use cases

3. **Senior**: Advanced explanation
   - Cover edge cases and best practices
   - Discuss architectural considerations
   - Include performance and design implications

4. **Tricky**: Expert-level insights
   - Deep technical details
   - Advanced scenarios and gotchas
   - Performance optimization
   - Internal implementation details

### Content Format

- Use plain text (no markdown)
- Keep each answer focused and concise
- Ensure consistency in tone across levels
- Verify technical accuracy

## Validation Checklist

Before committing changes:

- [ ] All IDs follow kebab-case convention
- [ ] All IDs are unique within their scope
- [ ] File paths in spaces-index.json match actual file locations
- [ ] All question JSON files exist at specified paths
- [ ] All question files have valid JSON structure
- [ ] Each question has all four answer levels (junior, middle, senior, tricky)
- [ ] Topic descriptions are clear and concise
- [ ] Directory structure follows the pattern: `spaces/{spaceId}/{topicId}/`

## Testing New Content

After adding content:

1. **Validate JSON syntax:**
   ```bash
   # Check spaces-index.json
   cat public/data/spaces-index.json | jq .
   
   # Check individual question file
   cat public/data/spaces/{space}/{topic}/{question}.json | jq .
   ```

2. **Test navigation flows:**
   - Open the application
   - Navigate to the new space/topic/question
   - Test next/previous navigation
   - Verify breadcrumbs display correctly
   - Test level toggle buttons (Junior, Middle, Senior, Tricky)

3. **Verify file paths:**
   - Ensure all referenced files exist
   - Check that file paths are relative to `public/data/`

## Example: Complete Workflow

Here's a complete example of adding a new question:

### Step 1: Update spaces-index.json

```json
{
  "spaces": [
    {
      "id": "java",
      "name": "Java",
      "description": "Core Java programming concepts",
      "topics": [
        {
          "id": "java-core",
          "name": "Java Core",
          "description": "Fundamental Java concepts",
          "questions": [
            {
              "id": "what-is-interface",
              "title": "What is an interface in Java?",
              "filePath": "spaces/java/java-core/what-is-interface.json"
            }
          ]
        }
      ]
    }
  ]
}
```

### Step 2: Create question file

```bash
# Create the file
cat > public/data/spaces/java/java-core/what-is-interface.json << 'EOF'
{
  "id": "what-is-interface",
  "title": "What is an interface in Java?",
  "answers": {
    "junior": "An interface is a contract that defines methods a class must implement.",
    "middle": "An interface defines abstract methods and constants. Classes implement interfaces to provide method implementations. Supports multiple inheritance.",
    "senior": "Interfaces provide abstraction and multiple inheritance. Default and static methods added in Java 8. Used for defining contracts, achieving loose coupling, and enabling polymorphism.",
    "tricky": "Discuss interface evolution (default methods, private methods), functional interfaces, marker interfaces, and design patterns using interfaces."
  }
}
EOF
```

### Step 3: Validate

```bash
# Validate JSON
jq . public/data/spaces/java/java-core/what-is-interface.json

# Test in browser
npm run dev
```

## Common Mistakes to Avoid

1. **ID mismatch**: Ensure the `id` in the question file matches the `id` in spaces-index.json
2. **Wrong file path**: The `filePath` in spaces-index.json must match the actual file location
3. **Missing answer levels**: All four levels must be present
4. **Invalid JSON**: Use a JSON validator before committing
5. **Spaces in IDs**: Use hyphens, not spaces: `java-core`, not `java core`
6. **Missing directories**: Create directories before creating files

## Tips

- Use descriptive, question-like titles: "What is...?" or "How does...?"
- Keep IDs concise but meaningful
- Group related questions in the same topic
- Order questions from basic to advanced within a topic
- Review existing questions for consistency in style and format
