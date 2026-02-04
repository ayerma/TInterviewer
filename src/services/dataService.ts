import { SpacesIndex, QuestionContent } from '../types/schema';

const BASE_DATA_URL = `${import.meta.env.BASE_URL}data`;
const SPACES_INDEX_PATH = `${BASE_DATA_URL}/spaces-index.json`;

// In-memory cache for question files
const questionCache = new Map<string, QuestionContent>();

/**
 * Loads the spaces index JSON file.
 * This should be called once on app initialization.
 * @returns Promise resolving to SpacesIndex
 * @throws Error if loading fails
 */
export async function loadSpacesIndex(): Promise<SpacesIndex> {
  try {
    const response = await fetch(SPACES_INDEX_PATH);
    
    if (!response.ok) {
      throw new Error(`Failed to load spaces index: ${response.status} ${response.statusText}`);
    }
    
    const data: SpacesIndex = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error loading spaces index: ${error.message}`);
    }
    throw new Error('Unknown error loading spaces index');
  }
}

/**
 * Loads a question content JSON file by its file path.
 * Results are cached in memory to avoid redundant fetches.
 * @param filePath - Relative path to the question file (e.g., "spaces/java/oop/what-is-inheritance.json")
 * @returns Promise resolving to QuestionContent
 * @throws Error if loading fails or file not found
 */
export async function loadQuestion(filePath: string): Promise<QuestionContent> {
  // Check cache first
  if (questionCache.has(filePath)) {
    return questionCache.get(filePath)!;
  }
  
  try {
    const url = `${BASE_DATA_URL}/${filePath}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Question file not found: ${filePath}`);
      }
      throw new Error(`Failed to load question: ${response.status} ${response.statusText}`);
    }
    
    const data: QuestionContent = await response.json();
    
    // Cache the result
    questionCache.set(filePath, data);
    
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error loading question from ${filePath}: ${error.message}`);
    }
    throw new Error(`Unknown error loading question from ${filePath}`);
  }
}

/**
 * Clears the question cache.
 * Useful for testing or if memory management is needed.
 */
export function clearQuestionCache(): void {
  questionCache.clear();
}

/**
 * Gets the current size of the question cache.
 * @returns Number of cached questions
 */
export function getQuestionCacheSize(): number {
  return questionCache.size;
}
