import { createSignal, createResource, For, Show } from 'solid-js';
import { A, useLocation } from '@solidjs/router';
import type { SpacesIndex, Space, Topic, Question } from '../types/schema';

interface ExpandedState {
  [key: string]: boolean;
}

interface NavigationMenuProps {
  onNavigate?: () => void;
}

async function fetchSpacesIndex(): Promise<SpacesIndex> {
  const response = await fetch('/data/spaces-index.json');
  if (!response.ok) {
    throw new Error('Failed to load spaces index');
  }
  return response.json();
}

export default function NavigationMenu(props: NavigationMenuProps) {
  const [expanded, setExpanded] = createSignal<ExpandedState>({});
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
                                                onClick={props.onNavigate}
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
  );
}
