/**
 * Represents a question within a topic.
 * Questions reference their content files via filePath.
 */
export interface Question {
  /** Unique identifier for the question */
  id: string;
  /** Display title of the question */
  title: string;
  /** Relative path to the question content JSON file */
  filePath: string;
}

/**
 * Represents a topic within a space.
 * Topics group related questions together.
 */
export interface Topic {
  /** Unique identifier for the topic */
  id: string;
  /** Display name of the topic */
  name: string;
  /** Brief description of the topic */
  description: string;
  /** Array of questions belonging to this topic */
  questions: Question[];
}

/**
 * Represents a space (domain/category).
 * Spaces contain multiple topics.
 */
export interface Space {
  /** Unique identifier for the space */
  id: string;
  /** Display name of the space */
  name: string;
  /** Brief description of the space */
  description: string;
  /** Array of topics belonging to this space */
  topics: Topic[];
}

/**
 * Root structure for the spaces index.
 * Contains all spaces in the application.
 */
export interface SpacesIndex {
  /** Array of all available spaces */
  spaces: Space[];
}
