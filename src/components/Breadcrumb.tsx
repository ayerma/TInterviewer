import { createResource, For, Show } from 'solid-js';
import { A, useLocation, useParams } from '@solidjs/router';
import type { SpacesIndex } from '../types/schema';

interface BreadcrumbSegment {
  label: string;
  path: string;
  isLast: boolean;
}

async function fetchSpacesIndex(): Promise<SpacesIndex> {
  const response = await fetch('/data/spaces-index.json');
  if (!response.ok) {
    throw new Error('Failed to load spaces index');
  }
  return response.json();
}

export default function Breadcrumb() {
  const location = useLocation();
  const params = useParams();
  const [spacesData] = createResource(fetchSpacesIndex);

  const breadcrumbs = (): BreadcrumbSegment[] => {
    const segments: BreadcrumbSegment[] = [];
    const data = spacesData();
    
    if (!data) return segments;

    const { spaceId, topicId, questionId } = params;

    // Find space
    const space = data.spaces.find(s => s.id === spaceId);
    if (!space) return segments;

    // Add space segment
    segments.push({
      label: space.name,
      path: `/${spaceId}`,
      isLast: !topicId
    });

    // Find and add topic segment if present
    if (topicId) {
      const topic = space.topics.find(t => t.id === topicId);
      if (topic) {
        segments.push({
          label: topic.name,
          path: `/${spaceId}/${topicId}`,
          isLast: !questionId
        });

        // Find and add question segment if present
        if (questionId) {
          const question = topic.questions.find(q => q.id === questionId);
          if (question) {
            segments.push({
              label: question.title,
              path: `/${spaceId}/${topicId}/${questionId}`,
              isLast: true
            });
          }
        }
      }
    }

    return segments;
  };

  return (
    <Show when={!spacesData.loading && breadcrumbs().length > 0}>
      <nav class="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
        <For each={breadcrumbs()}>
          {(segment, index) => (
            <>
              <Show when={index() > 0}>
                <svg 
                  class="w-4 h-4 text-gray-400 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </Show>
              <Show
                when={!segment.isLast}
                fallback={
                  <span 
                    class="text-gray-600 font-medium truncate max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
                    aria-current="page"
                  >
                    {segment.label}
                  </span>
                }
              >
                <A
                  href={segment.path}
                  class="text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
                >
                  {segment.label}
                </A>
              </Show>
            </>
          )}
        </For>
      </nav>
    </Show>
  );
}
