import { useNavigate, useParams } from '@solidjs/router';
import { createResource, createSignal, onMount, onCleanup, Show } from 'solid-js';
import { Button, Box, CircularProgress, Divider } from '@suid/material';
import NavigateBeforeIcon from '@suid/icons-material/NavigateBefore';
import NavigateNextIcon from '@suid/icons-material/NavigateNext';
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
    prevRoute = `/spaces/${spaceId}/${topicId}/${prevQuestion.id}`;
  } else if (topicIndex > 0) {
    // Wrap to previous topic's last question
    const prevTopic = space.topics[topicIndex - 1];
    const lastQuestion = prevTopic.questions[prevTopic.questions.length - 1];
    prevRoute = `/spaces/${spaceId}/${prevTopic.id}/${lastQuestion.id}`;
  } else {
    isFirst = true;
  }

  // Calculate next
  if (questionIndex < topic.questions.length - 1) {
    const nextQuestion = topic.questions[questionIndex + 1];
    nextRoute = `/spaces/${spaceId}/${topicId}/${nextQuestion.id}`;
  } else if (topicIndex < space.topics.length - 1) {
    // Wrap to next topic's first question
    const nextTopic = space.topics[topicIndex + 1];
    const firstQuestion = nextTopic.questions[0];
    nextRoute = `/spaces/${spaceId}/${nextTopic.id}/${firstQuestion.id}`;
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
      <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="outlined"
          onClick={handlePrevious}
          disabled={navigationInfo().isFirst || isNavigating()}
          startIcon={<NavigateBeforeIcon />}
        >
          Previous
        </Button>

        <Show when={isNavigating()}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
            <CircularProgress size={16} color="inherit" />
            <span>Loading...</span>
          </Box>
        </Show>

        <Button
          variant="outlined"
          onClick={handleNext}
          disabled={navigationInfo().isLast || isNavigating()}
          endIcon={<NavigateNextIcon />}
        >
          Next
        </Button>
      </Box>
    </Show>
  );
}
