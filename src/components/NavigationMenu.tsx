import { createSignal, createResource, For, Show } from 'solid-js';
import { A, useLocation } from '@solidjs/router';
import type { SpacesIndex, Space, Topic, Question } from '../types/schema';

interface ExpandedState {
  [key: string]: boolean;
}

async function fetchSpacesIndex(): Promise<SpacesIndex> {
  const response = await fetch('/data/spaces-index.json');
  if (!response.ok) {
    throw new Error('Failed to load spaces index');
  }
  return response.json();
}

export default function NavigationMenu() {
  const [expanded, setExpanded] = createSignal<ExpandedState>({});
  const [menuOpen, setMenuOpen] = createSignal(true);
  const [spacesData] = createResource(fetchSpacesIndex);
  const location = useLocation();

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isActive = (spaceId: string, topicId: string, questionId: string) => {
    const pathname = location.pathname;
    return pathname.includes(`/${spaceId}/${topicId}/${questionId}`);
  };

  const ChevronIcon = (props: { isExpanded: boolean }) => (
    <svg
      class={`w-4 h-4 transition-transform duration-200 ${
        props.isExpanded ? 'rotate-90' : ''
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMenuOpen(!menuOpen())}
        class="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-lg hover:bg-blue-700"
        aria-label="Toggle menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Navigation sidebar */}
      <aside
        class={`fixed lg:sticky top-0 left-0 h-screen w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto transition-transform duration-300 z-40 ${
          menuOpen() ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div class="sticky top-0 bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 class="text-xl font-bold text-gray-800">Topics</h2>
          <button
            onClick={() => setMenuOpen(false)}
            class="lg:hidden text-gray-600 hover:text-gray-800"
            aria-label="Close menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation content */}
        <nav class="p-4">
          <Show when={!spacesData.loading} fallback={<div class="text-gray-500">Loading...</div>}>
            <Show when={spacesData()}>
              {(data) => (
                <ul class="space-y-2">
                  <For each={data().spaces}>
                    {(space: Space) => {
                      const spaceKey = `space-${space.id}`;
                      const isSpaceExpanded = () => expanded()[spaceKey] || false;

                      return (
                        <li>
                          {/* Space header */}
                          <button
                            onClick={() => toggleExpand(spaceKey)}
                            class="w-full flex items-center justify-between px-3 py-2 text-left font-semibold text-gray-700 hover:bg-gray-100 rounded-md"
                          >
                            <span>{space.name}</span>
                            <ChevronIcon isExpanded={isSpaceExpanded()} />
                          </button>

                          {/* Topics list */}
                          <Show when={isSpaceExpanded()}>
                            <ul class="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                              <For each={space.topics}>
                                {(topic: Topic) => {
                                  const topicKey = `topic-${space.id}-${topic.id}`;
                                  const isTopicExpanded = () => expanded()[topicKey] || false;

                                  return (
                                    <li>
                                      {/* Topic header */}
                                      <button
                                        onClick={() => toggleExpand(topicKey)}
                                        class="w-full flex items-center justify-between px-3 py-2 text-left text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
                                      >
                                        <span>{topic.name}</span>
                                        <ChevronIcon isExpanded={isTopicExpanded()} />
                                      </button>

                                      {/* Questions list */}
                                      <Show when={isTopicExpanded()}>
                                        <ul class="ml-4 mt-1 space-y-1">
                                          <For each={topic.questions}>
                                            {(question: Question) => {
                                              const questionPath = `/${space.id}/${topic.id}/${question.id}`;
                                              const active = isActive(space.id, topic.id, question.id);

                                              return (
                                                <li>
                                                  <A
                                                    href={questionPath}
                                                    class={`block px-3 py-2 text-sm rounded-md transition-colors ${
                                                      active
                                                        ? 'bg-blue-100 text-blue-700 font-medium'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                    }`}
                                                    onClick={() => {
                                                      // Close menu on mobile after selecting
                                                      if (window.innerWidth < 1024) {
                                                        setMenuOpen(false);
                                                      }
                                                    }}
                                                  >
                                                    {question.title}
                                                  </A>
                                                </li>
                                              );
                                            }}
                                          </For>
                                        </ul>
                                      </Show>
                                    </li>
                                  );
                                }}
                              </For>
                            </ul>
                          </Show>
                        </li>
                      );
                    }}
                  </For>
                </ul>
              )}
            </Show>
          </Show>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      <Show when={menuOpen() && window.innerWidth < 1024}>
        <div
          class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      </Show>
    </>
  );
}
