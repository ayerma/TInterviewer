import { createContext, useContext, ParentComponent } from 'solid-js';
import { createResource, Resource } from 'solid-js';
import { SpacesIndex, QuestionContent } from '../types/schema';
import { loadSpacesIndex, loadQuestion } from '../services/dataService';

interface DataContextValue {
  spacesIndex: Resource<SpacesIndex>;
  loadQuestionContent: (filePath: string) => Resource<QuestionContent>;
}

const DataContext = createContext<DataContextValue>();

/**
 * Provider component that loads and caches the spaces index.
 * Makes spaces index available to all child components via context.
 */
export const DataProvider: ParentComponent = (props) => {
  // Load spaces index once on initialization
  const [spacesIndex] = createResource(loadSpacesIndex);
  
  // Cache for question resources to avoid creating duplicate resources
  const questionResourceCache = new Map<string, Resource<QuestionContent>>();
  
  /**
   * Creates or retrieves a cached resource for loading a question.
   * This ensures we don't create multiple resources for the same question.
   */
  const loadQuestionContent = (filePath: string): Resource<QuestionContent> => {
    if (questionResourceCache.has(filePath)) {
      return questionResourceCache.get(filePath)!;
    }
    
    const [resource] = createResource(() => filePath, loadQuestion);
    questionResourceCache.set(filePath, resource);
    return resource;
  };
  
  return (
    <DataContext.Provider value={{ spacesIndex, loadQuestionContent }}>
      {props.children}
    </DataContext.Provider>
  );
};

/**
 * Hook to access the data context.
 * Provides access to spaces index and question loading functionality.
 * @throws Error if used outside DataProvider
 */
export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
