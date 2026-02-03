import { useParams, useNavigate, A } from '@solidjs/router';
import { createResource, Show, For } from 'solid-js';
import type { SpacesIndex } from '../types/schema';

async function fetchSpacesIndex(): Promise<SpacesIndex> {
  const response = await fetch('/data/spaces-index.json');
  if (!response.ok) {
    throw new Error(`Failed to load spaces index: ${response.statusText}`);
  }
  return response.json();
}

export default function TopicView() {
  const params = useParams();
  const navigate = useNavigate();

  const [spacesIndex] = createResource(fetchSpacesIndex);

  const currentTopic = () => {
    const index = spacesIndex();
    if (!index || !params.spaceId || !params.topicId) return null;
    const space = index.spaces.find(s => s.id === params.spaceId);
    if (!space) return null;
    return space.topics.find(t => t.id === params.topicId);
  };

  const currentSpace = () => {
    const index = spacesIndex();
    if (!index || !params.spaceId) return null;
    return index.spaces.find(s => s.id === params.spaceId);
  };

  return (
    <div class="flex-1 h-full overflow-auto bg-gray-50">
      <div class="max-w-4xl mx-auto p-8">
        <Show
          when={!spacesIndex.loading}
          fallback={
            <div class="flex items-center justify-center py-20">
              <div class="flex flex-col items-center gap-4">
                <div class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p class="text-gray-600">Loading topic...</p>
              </div>
            </div>
          }
        >
          <Show
            when={!spacesIndex.error}
            fallback={
              <div class="bg-red-50 border border-red-200 rounded-lg p-6">
                <div class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 class="text-lg font-semibold text-red-900 mb-1">Failed to Load Topic</h3>
                    <p class="text-red-700">{spacesIndex.error?.message || 'An error occurred while loading the topic.'}</p>
                  </div>
                </div>
              </div>
            }
          >
            <Show
              when={currentTopic() && currentSpace()}
              fallback={
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
                  <div class="flex flex-col items-center text-center gap-3">
                    <svg class="w-16 h-16 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <h2 class="text-2xl font-semibold text-gray-800 mb-2">Topic Not Found</h2>
                      <p class="text-gray-600">The topic '{params.topicId}' does not exist in space '{params.spaceId}'.</p>
                    </div>
                  </div>
                </div>
              }
            >
              {() => {
                const topic = currentTopic()!;
                const space = currentSpace()!;
                return (
                  <div class="space-y-6">
                    <nav class="flex items-center gap-2 text-sm text-gray-600">
                      <A href={`/spaces/${space.id}`} class="hover:text-blue-600">
                        {space.name}
                      </A>
                      <span>/</span>
                      <span class="text-gray-900 font-medium">{topic.name}</span>
                    </nav>

                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                      <h1 class="text-4xl font-bold text-gray-900 mb-3">{topic.name}</h1>
                      <p class="text-lg text-gray-600">{topic.description}</p>
                    </div>

                    <div class="space-y-4">
                      <h2 class="text-2xl font-semibold text-gray-800">Questions ({topic.questions.length})</h2>
                      <div class="grid gap-3">
                        <For each={topic.questions}>
                          {(question) => (
                            <button
                              onClick={() => navigate(`/spaces/${space.id}/${topic.id}/${question.id}`)}
                              class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all text-left"
                            >
                              <h3 class="text-lg font-semibold text-gray-800 hover:text-blue-600">
                                {question.title}
                              </h3>
                            </button>
                          )}
                        </For>
                      </div>
                    </div>
                  </div>
                );
              }}
            </Show>
          </Show>
        </Show>
      </div>
    </div>
  );
}
