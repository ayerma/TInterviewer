import { useParams, useNavigate } from '@solidjs/router';
import { createResource, Show, For } from 'solid-js';
import type { SpacesIndex } from '../types/schema';

async function fetchSpacesIndex(): Promise<SpacesIndex> {
  const response = await fetch('/data/spaces-index.json');
  if (!response.ok) {
    throw new Error(`Failed to load spaces index: ${response.statusText}`);
  }
  return response.json();
}

export default function SpaceView() {
  const params = useParams();
  const navigate = useNavigate();

  const [spacesIndex] = createResource(fetchSpacesIndex);

  const currentSpace = () => {
    const index = spacesIndex();
    if (!index || !params.spaceId) return null;
    return index.spaces.find(s => s.id === params.spaceId);
  };

  return (
    <Show
      when={!spacesIndex.loading}
      fallback={
        <div class="flex items-center justify-center py-20">
          <div class="flex flex-col items-center gap-4">
            <div class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p class="text-gray-600">Loading space...</p>
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
                <h3 class="text-lg font-semibold text-red-900 mb-1">Failed to Load Space</h3>
                <p class="text-red-700">{spacesIndex.error?.message || 'An error occurred while loading the space.'}</p>
              </div>
            </div>
          </div>
        }
      >
        <Show
          when={currentSpace()}
          fallback={
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
              <div class="flex flex-col items-center text-center gap-3">
                <svg class="w-16 h-16 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h2 class="text-2xl font-semibold text-gray-800 mb-2">Space Not Found</h2>
                  <p class="text-gray-600">The space '{params.spaceId}' does not exist.</p>
                </div>
              </div>
            </div>
          }
        >
          {(space) => (
            <div class="space-y-6">
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h1 class="text-4xl font-bold text-gray-900 mb-3">{space().name}</h1>
                <p class="text-lg text-gray-600">{space().description}</p>
              </div>

              <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-gray-800">Topics</h2>
                <div class="grid gap-4">
                  <For each={space().topics}>
                    {(topic) => (
                      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">{topic.name}</h3>
                        <p class="text-gray-600 mb-4">{topic.description}</p>
                        <div class="space-y-2">
                          <p class="text-sm font-medium text-gray-500">Questions ({topic.questions.length}):</p>
                          <ul class="space-y-1">
                            <For each={topic.questions}>
                              {(question) => (
                                <li>
                                  <button
                                    onClick={() => navigate(`/spaces/${space().id}/${topic.id}/${question.id}`)}
                                    class="text-blue-600 hover:text-blue-800 hover:underline text-left"
                                  >
                                    {question.title}
                                  </button>
                                </li>
                              )}
                            </For>
                          </ul>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </div>
          )}
        </Show>
      </Show>
    </Show>
  );
}
