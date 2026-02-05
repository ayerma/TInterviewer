# Adding New Content Guide

This guide explains how to add new spaces, topics, and questions to the TInterviewer application.

## Overview

The content structure follows a **three-level hierarchical tree**:

```
SpacesIndex (Root)
└── Spaces (e.g., Java, Python, JavaScript)
    └── Topics (e.g., Java Core, Exceptions, Collections)
        └── Questions (e.g., What is JVM?, ArrayList vs LinkedList?)
            └── Answers (junior, middle, senior, tricky)
```

### Hierarchy Levels

1. **Spaces**: Top-level categories representing programming languages or domains
2. **Topics**: Subject areas within a space that group related concepts
3. **Questions**: Individual interview questions within a topic
4. **Answers**: Four expertise levels for each question (junior, middle, senior, tricky)

## File Structure

```
public/data/
├── spaces-index.json              # Root index mapping entire content tree
└── spaces/                        # Content directory
    └── {spaceId}/                # Space directory (e.g., java/)
        └── {topicId}/            # Topic directory (e.g., java-core/)
            └── {questionId}.json # Question content file
```

**Example:**

```
public/data/
├── spaces-index.json
└── spaces/
    └── java/
        ├── java-core/
        │   ├── what-is-jvm.json
        │   ├── string-immutability.json
        │   └── equals-vs-hashcode.json
        ├── collections/
        │   └── arraylist-vs-linkedlist.json
        └── spring-core/
            └── dependency-injection.json
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

A **Space** represents a top-level domain (e.g., programming language, framework).

### Step 1: Update spaces-index.json

Add a new space object to the `spaces` array in `public/data/spaces-index.json`:

```json
{
  "spaces": [
    {
      "id": "python",
      "name": "Python",
      "description": "Python programming concepts and interview questions",
      "topics": []
    }
  ]
}
```

### Step 2: Create Directory Structure

```bash
mkdir -p public/data/spaces/python
```

The space is now ready to contain topics!

---

## Adding a New Topic

A **Topic** groups related questions within a space (e.g., "Basics", "Data Structures").

### Step 1: Update spaces-index.json

Add a new topic object to the appropriate space's `topics` array:

```json
{
  "id": "python",
  "name": "Python",
  "description": "Python programming concepts and interview questions",
  "topics": [
    {
      "id": "basics",
      "name": "Python Basics",
      "description": "Fundamental Python concepts and syntax",
      "questions": []
    }
  ]
}
```

### Step 2: Create Topic Directory

```bash
mkdir -p public/data/spaces/python/basics
```

The topic is now ready to contain questions!

---

## Adding a New Question

A **Question** represents an interview question with answers at four expertise levels.

### Step 1: Update spaces-index.json

Add a question reference to the appropriate topic's `questions` array:

```json
{
  "id": "what-is-list-comprehension",
  "title": "What is list comprehension in Python?",
  "filePath": "spaces/python/basics/what-is-list-comprehension.json"
}
```

**Important:** The `filePath` must match the actual file location relative to `public/data/`.

### Step 2: Create Question Content File

Create a JSON file at: `public/data/spaces/python/basics/what-is-list-comprehension.json`

```json
{
  "id": "what-is-list-comprehension",
  "title": "What is list comprehension in Python?",
  "answers": {
    "junior": "A concise way to create lists in Python. Instead of using a for loop, you can write [x for x in range(10)] to create a list of numbers from 0 to 9.",
    "middle": "List comprehension provides a compact syntax for creating lists by iterating over sequences and optionally applying conditions. Syntax: [expression for item in iterable if condition]. More readable than map/filter and typically faster than equivalent for-loops due to optimized implementation.",
    "senior": "List comprehensions are syntactic sugar for the underlying iterator protocol, compiled to optimized bytecode. They create a new list in memory, so use generator expressions for large datasets. Support nested comprehensions and multiple conditions. Should be limited to 2-3 lines for readability; complex logic should use traditional loops. Can replace map/filter chains for better Pythonic code.",
    "tricky": "Comprehensions execute in their own scope (Python 3+), preventing variable leakage. The iterator variable doesn't pollute the enclosing scope. Performance: comprehensions avoid LOAD_ATTR overhead by caching method references. Memory concerns: creates entire list upfront vs generators. Walrus operator (:=) enables complex transformations. Nested comprehensions flatten differently: [[x for x in row] for row in matrix] vs [x for row in matrix for x in row]. String concatenation in comprehensions is slower than join()."
  }
}
```

### Question Content Structure

Each question file must follow this schema:

```typescript
{
  id: string; // Must match ID in spaces-index.json
  title: string; // Must match title in spaces-index.json
  answers: {
    junior: string; // Beginner-friendly explanation
    middle: string; // Intermediate depth with examples
    senior: string; // Advanced concepts and best practices
    tricky: string; // Expert insights and edge cases
  }
}
```

---

## Answer Level Guidelines

Each question must include **four answer levels** representing different expertise:

### 1. Junior (Entry-Level)

**Target Audience:** Beginners, fresh graduates, 0-2 years of experience

**Characteristics:**

- Simple, beginner-friendly language
- Focus on "what" rather than "why"
- Basic definitions and concepts
- Simple examples without complexity
- 1-3 sentences typically

**Example:**

> "ArrayList stores elements in a resizable array, while LinkedList stores elements as connected nodes with pointers."

### 2. Middle (Intermediate)

**Target Audience:** Mid-level developers, 2-5 years of experience

**Characteristics:**

- More detailed explanations
- Include "how" and "when" to use
- Practical examples and use cases
- Common patterns and scenarios
- Performance basics (Big-O notation)
- 3-5 sentences with numbered points

**Example:**

> "ArrayList uses a resizable array (default capacity 10) while LinkedList uses a doubly-linked list. Performance: ArrayList O(1) for random access but O(n) for insertions in middle; LinkedList O(n) for access but O(1) for insertions at ends. Use ArrayList for frequent access, LinkedList for frequent insertions/deletions."

### 3. Senior (Advanced)

**Target Audience:** Senior developers, 5-10 years of experience

**Characteristics:**

- Advanced concepts and edge cases
- Architectural considerations
- Best practices and design patterns
- Performance implications
- Real-world scenarios and trade-offs
- Internal workings overview
- 5-8 sentences with detailed analysis

**Example:**

> "ArrayList maintains a backing array with 1.5x growth factor (newCapacity = oldCapacity + (oldCapacity >> 1)). LinkedList is doubly-linked implementing List and Deque interfaces. Memory locality gives ArrayList better cache performance despite theoretical time complexities. Iterator performance differs: ArrayList's is lightweight and fail-fast, LinkedList maintains node references. Consider ArrayList for iteration-heavy operations due to CPU cache optimization."

### 4. Tricky (Expert)

**Target Audience:** Expert developers, architects, 10+ years of experience

**Characteristics:**

- Deep implementation details
- Advanced optimization techniques
- Subtle gotchas and edge cases
- Internal JVM/compiler behavior
- Production considerations
- Thread-safety and concurrency
- Memory management details
- Framework-specific optimizations
- 8-12 sentences with comprehensive analysis

**Example:**

> "ArrayList's remove() doesn't shrink capacity automatically (manual trimToSize() needed), causing potential memory leaks. LinkedList maintains size counter and head/tail references for O(1) size(). ArrayList.subList() returns a backed view requiring synchronization. Neither is thread-safe; use CopyOnWriteArrayList for concurrent writes. ArrayList serialization is optimized (only used portion), LinkedList serializes all nodes. Random access performance can be 10-100x faster for ArrayList even on small datasets due to CPU cache lines and prefetching."

---

## Content Format Guidelines

### Writing Best Practices

- **Use plain text** (no markdown formatting in answer text)
- **Keep answers focused** and progressively detailed across levels
- **Ensure consistency** in technical terminology
- **Verify accuracy** of all technical details
- **Avoid redundancy** between levels (each should add value)
- **Use concrete examples** especially in middle/senior levels
- **Include numbers/metrics** for performance discussions

### Progressive Depth

Each level should build upon the previous:

- Junior → Basic definition
- Middle → Practical usage + Junior
- Senior → Advanced concepts + Best practices + Middle
- Tricky → Expert insights + Edge cases + Implementation details + Senior

---

## Validation Checklist

Before committing changes, ensure:

### Structure Validation

- [ ] All IDs follow **kebab-case** convention (lowercase with hyphens)
- [ ] All IDs are **unique** within their scope:
  - [ ] Space IDs are globally unique
  - [ ] Topic IDs are unique within each space
  - [ ] Question IDs are unique within each topic
- [ ] Directory structure follows pattern: `spaces/{spaceId}/{topicId}/`

### Data Integrity

- [ ] `filePath` in spaces-index.json matches actual file location
- [ ] All referenced JSON files exist at specified paths
- [ ] All JSON files have valid syntax (use `jq` to validate)
- [ ] Question file `id` matches `id` in spaces-index.json
- [ ] Question file `title` matches `title` in spaces-index.json

### Content Completeness

- [ ] Each question has **all four answer levels** (junior, middle, senior, tricky)
- [ ] Each answer level has meaningful, non-placeholder content
- [ ] Answers progress in depth and complexity across levels
- [ ] Topic descriptions are clear and concise
- [ ] Space descriptions accurately reflect content

### Navigation

- [ ] Questions are ordered logically (basic → advanced) within topics
- [ ] Topics are grouped logically within spaces
- [ ] No broken references in navigation structure

---

## Testing New Content

After adding content, validate thoroughly:

### 1. Validate JSON Syntax

```bash
# Validate spaces-index.json
jq . public/data/spaces-index.json

# Validate individual question file
jq . public/data/spaces/java/java-core/what-is-jvm.json

# Validate all question files in a topic
jq . public/data/spaces/java/java-core/*.json
```

### 2. Test in Application

```bash
# Start development server
npm run dev
```

Then verify:

- [ ] Navigate to new space → shows in space selector
- [ ] Navigate to new topic → shows in topic list
- [ ] Navigate to new question → displays correctly
- [ ] All four level toggles work (Junior, Middle, Senior, Tricky)
- [ ] Next/Previous navigation works correctly
- [ ] Breadcrumbs display full path correctly
- [ ] No console errors in browser DevTools

### 3. Verify File Paths

```bash
# Check that all referenced files exist
# Compare filePath values in spaces-index.json with actual files
find public/data/spaces -name "*.json" -type f
```

---

## Complete Workflow Example

Here's a **complete end-to-end example** of adding a new question to the Java space:

### Visual Representation

```
SpacesIndex
└── java (Space)
    └── java-core (Topic)
        ├── what-is-jvm.json
        ├── string-immutability.json
        └── what-is-interface.json  ← NEW QUESTION
```

### Step 1: Update spaces-index.json

Locate the Java space and java-core topic, then add the question reference:

```json
{
  "spaces": [
    {
      "id": "java",
      "name": "Java",
      "description": "Core Java programming concepts and interview questions",
      "topics": [
        {
          "id": "java-core",
          "name": "Java Core",
          "description": "Fundamental Java language features and concepts",
          "questions": [
            {
              "id": "what-is-jvm",
              "title": "What is JVM and how does it work?",
              "filePath": "spaces/java/java-core/what-is-jvm.json"
            },
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

### Step 2: Create Question Content File

Create file: `public/data/spaces/java/java-core/what-is-interface.json`

```json
{
  "id": "what-is-interface",
  "title": "What is an interface in Java?",
  "answers": {
    "junior": "An interface is a contract that defines methods a class must implement. It contains method signatures without implementations.",
    "middle": "Interfaces define abstract methods and constants that implementing classes must provide. Classes can implement multiple interfaces (multiple inheritance). Interfaces cannot be instantiated directly and use 'implements' keyword. Common for defining contracts and achieving abstraction.",
    "senior": "Interfaces provide abstraction and enable multiple inheritance in Java. Java 8 added default and static methods. Interfaces are used for defining contracts, achieving loose coupling, and enabling polymorphism. Marker interfaces (e.g., Serializable) have no methods. Functional interfaces (@FunctionalInterface) have exactly one abstract method and enable lambda expressions. All methods are implicitly public abstract, fields are public static final.",
    "tricky": "Interface evolution: Java 8 default methods solved the interface evolution problem (adding methods without breaking implementations). Private methods (Java 9) enable code reuse within interfaces. Multiple inheritance diamond problem resolved via default method resolution rules: class wins over interface, specific interface wins over parent. Interfaces don't participate in instance initialization. Static interface methods aren't inherited. Design patterns: Strategy, Command, Observer heavily use interfaces. Performance: invokeinterface is slightly slower than invokevirtual due to multiple dispatch."
  }
}
```

### Step 3: Validate and Test

```bash
# Validate JSON syntax
jq . public/data/spaces/java/java-core/what-is-interface.json

# Start dev server and test
npm run dev
```

Navigate to: Java → Java Core → What is an interface in Java?

Test all four answer levels display correctly.

---

## Common Mistakes to Avoid

### Structure & IDs

1. **❌ ID mismatch**: Question file `id` doesn't match `id` in spaces-index.json
   - **✓ Fix**: Ensure IDs are identical in both places
2. **❌ Spaces in IDs**: Using `"java core"` instead of `"java-core"`
   - **✓ Fix**: Always use kebab-case (lowercase with hyphens)

3. **❌ Wrong file path**: `filePath` doesn't match actual file location
   - **✓ Fix**: Path must be relative to `public/data/` and match exactly

### Content Issues

4. **❌ Missing answer levels**: Only 2-3 levels provided instead of 4
   - **✓ Fix**: Always include junior, middle, senior, AND tricky

5. **❌ Duplicate content**: All levels have the same or similar text
   - **✓ Fix**: Each level should provide progressively more detail

6. **❌ Invalid JSON**: Syntax errors, missing commas, unescaped quotes
   - **✓ Fix**: Validate with `jq` before committing

### File System

7. **❌ Missing directories**: Creating file without parent directories
   - **✓ Fix**: Use `mkdir -p path/to/directory` first

8. **❌ Case sensitivity**: Mismatched case in paths (Windows vs Linux)
   - **✓ Fix**: Always use lowercase for IDs and paths

9. **❌ Orphaned files**: Question file exists but not referenced in index
   - **✓ Fix**: Always update spaces-index.json first

### Navigation

10. **❌ Broken references**: Dead links due to typos in filePath
    - **✓ Fix**: Test navigation after adding content

---

## Best Practices & Tips

### Content Organization

- **Group logically**: Place related questions in the same topic
- **Order thoughtfully**: Start with foundational concepts, progress to advanced
- **Name descriptively**: Use question-like titles: "What is...?" "How does...?" "When to use...?"
- **Keep IDs concise**: But still meaningful (e.g., `what-is-jvm` not `what-is-the-java-virtual-machine`)

### Writing Answers

- **Be specific**: Use concrete examples, especially for middle/senior levels
- **Include metrics**: Mention Big-O notation, actual numbers when relevant
- **Reference versions**: Specify "Java 8+", "Python 3.10+" when features are version-specific
- **Avoid marketing**: Focus on technical facts, not opinions
- **Progressive detail**: Each level should build on previous, not repeat

### Quality Assurance

- **Review existing content**: Match tone and style of similar questions
- **Use spell check**: Proofread all content before committing
- **Test all paths**: Navigate through the entire hierarchy after changes
- **Validate JSON**: Always run `jq` validation before committing
- **Check console**: Look for errors in browser DevTools

### Collaboration

- **Consistent terminology**: Use the same technical terms across related questions
- **Cross-reference**: Consider how questions relate to each other
- **Document sources**: Keep track of where information comes from (for future updates)

---

## Quick Reference

### File Paths Cheatsheet

| Element  | ID Example    | File Path Example                        |
| -------- | ------------- | ---------------------------------------- |
| Space    | `java`        | `spaces/java/`                           |
| Topic    | `java-core`   | `spaces/java/java-core/`                 |
| Question | `what-is-jvm` | `spaces/java/java-core/what-is-jvm.json` |

### JSON Validation Commands

```bash
# Validate main index
jq empty public/data/spaces-index.json && echo "✓ Valid JSON"

# Validate specific question
jq empty public/data/spaces/java/java-core/what-is-jvm.json && echo "✓ Valid JSON"

# Validate all questions in a topic
for file in public/data/spaces/java/java-core/*.json; do
  jq empty "$file" && echo "✓ $file"
done
```

### TypeScript Interfaces Reference

```typescript
// Root structure
interface SpacesIndex {
  spaces: Space[];
}

// Space level
interface Space {
  id: string; // e.g., "java"
  name: string; // e.g., "Java"
  description: string;
  topics: Topic[];
}

// Topic level
interface Topic {
  id: string; // e.g., "java-core"
  name: string; // e.g., "Java Core"
  description: string;
  questions: Question[];
}

// Question reference (in index)
interface Question {
  id: string; // e.g., "what-is-jvm"
  title: string; // e.g., "What is JVM?"
  filePath: string; // e.g., "spaces/java/java-core/what-is-jvm.json"
}

// Question content (in file)
interface QuestionContent {
  id: string;
  title: string;
  answers: {
    junior: string;
    middle: string;
    senior: string;
    tricky: string;
  };
}
```

---

## Need Help?

- **Schema documentation**: See `/SCHEMA.md` for complete data model details
- **Component docs**: See `/COMPONENTS.md` for UI component information
- **Development guide**: See `/DEVELOPMENT.md` for setup and development workflow
- **TypeScript types**: See `/src/types/schema.ts` for interface definitions

---

**Remember**: The hierarchical tree structure is:  
**SpacesIndex** → **Spaces** → **Topics** → **Questions** → **Answers (4 levels)**

Every addition must maintain this structure with complete metadata and proper references!
