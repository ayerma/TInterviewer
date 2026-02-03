import { useNavigate, useParams } from '@solidjs/router';
import { createResource, createSignal, onMount, onCleanup, Show } from 'solid-js';
import type { SpacesIndex } from '../types/schema';

interface NavigationInfo {
  prevRoute: string | null;
  nextRoute: string | null;
  isFirst: boolean;
  isLast: boolean;
}

async function fetchSpacesIndex(): Promise<SpacesIndex> {
  const response = await fetch('/data/spaces-index.json');
  if (!response.ok) {
    throw new Error('Failed to load spaces index');
  }
  return response.json();
}

function calculateNavigation(
  spacesIndex: SpacesIndex | undefined,
  spaceId: string,
  topicId: string,
  questionId: string
): NavigationInfo {
  if (!spacesIndex) {
    return { prevRoute: null, nextRoute: null, isFirst: true, isLast: true };
  }

  const space = spacesIndex.spaces.find(s => s.id === spaceId);
  if (!space) {
    return { prevRoute: null, nextRoute: null, isFirst: true, isLast: true };
  }

  const topicIndex = space.topics.findIndex(t => t.id === topicId);
  if (topicIndex === -1) {
    return { prevRoute: null, nextRoute: null, isFirst: true, isLast: true };
  }

  const topic = space.topics[topicIndex];
  const questionIndex = topic.questions.findIndex(q => q.id === questionId);
  if (questionIndex === -1) {
    return { prevRoute: null, nextRoute: null, isFirst: true, isLast: true };
  }

  let prevRoute: string | null = null;
  let nextRoute: string | null = null;
  let isFirst = false;
  let isLast = false;

  // Calculate previous
  if (questionIndex > 0) {
    const prevQuestion = topic.questions[questionIndex - 1];
    prevRoute = `/${spaceId}/${topicId}/${prevQuestion.id}`;
  } else if (topicIndex > 0) {
    // Wrap to previous topic's last question
    const prevTopic = space.topics[topicIndex - 1];
    const lastQuestion = prevTopic.questions[prevTopic.questions.length - 1];
    prevRoute = `/${spaceId}/${prevTopic.id}/${lastQuestion.id}`;
  } else {
    isFirst = true;
  }

  // Calculate next
  if (questionIndex < topic.questions.length - 1) {
    const nextQuestion = topic.questions[questionIndex + 1];
    nextRoute = `/${spaceId}/${topicId}/${nextQuestion.id}`;
  } else if (topicIndex < space.topics.length - 1) {
    // Wrap to next topic's first question
    const nextTopic = space.topics[topicIndex + 1];
    const firstQuestion = nextTopic.questions[0];
    nextRoute = `/${spaceId}/${nextTopic.id}/${firstQuestion.id}`;
  } else {
    isLast = true;
  }

  return { prevRoute, nextRoute, isFirst, isLast };
}

export default function QuestionNavigation() {
  const params = useParams();
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = createSignal(false);

  const [spacesIndex] = createResource(fetchSpacesIndex);

  const navigationInfo = () => {
    if (!params.spaceId || !params.topicId || !params.questionId) {
      return { prevRoute: null, nextRoute: null, isFirst: true, isLast: true };
    }
    return calculateNavigation(
      spacesIndex(),
      params.spaceId,
      params.topicId,
      params.questionId
    );
  };

  const handlePrevious = () => {
    const info = navigationInfo();
    if (info.prevRoute && !isNavigating()) {
      setIsNavigating(true);
      navigate(info.prevRoute);
      setTimeout(() => setIsNavigating(false), 300);
    }
  };

  const handleNext = () => {
    const info = navigationInfo();
    if (info.nextRoute && !isNavigating()) {
      setIsNavigating(true);
      navigate(info.nextRoute);
      setTimeout(() => setIsNavigating(false), 300);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      handlePrevious();
    } else if (e.key === 'ArrowRight' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  onCleanup(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <Show when={!spacesIndex.loading && params.questionId}>
      <div class="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handlePrevious}
          disabled={navigationInfo().isFirst || isNavigating()}
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
          aria-label="Previous question"
        >
          <svg 
            class="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          <span>Previous</span>
        </button>

        <div class="flex items-center gap-2 text-sm text-gray-500">
          <Show when={isNavigating()}>
            <div class="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading...</span>
          </Show>
        </div>

        <button
          onClick={handleNext}
          disabled={navigationInfo().isLast || isNavigating()}
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
          aria-label="Next question"
        >
          <span>Next</span>
          <svg 
            class="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </button>
      </div>
    </Show>
  );
}
