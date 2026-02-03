import { createSignal, createResource, For, Show, onMount, onCleanup } from 'solid-js';
import { useNavigate, useLocation } from '@solidjs/router';
import type { SpacesIndex, Space } from '../types/schema';

async function fetchSpacesIndex(): Promise<SpacesIndex> {
  const response = await fetch('/data/spaces-index.json');
  if (!response.ok) {
    throw new Error('Failed to load spaces index');
  }
  return response.json();
}

export default function SpaceSelector() {
  const [isOpen, setIsOpen] = createSignal(false);
  const [spacesData] = createResource(fetchSpacesIndex);
  const navigate = useNavigate();
  const location = useLocation();
  let dropdownRef: HTMLDivElement | undefined;

  const getCurrentSpace = (): Space | undefined => {
    const data = spacesData();
    if (!data) return undefined;

    const pathParts = location.pathname.split('/').filter(Boolean);
    const spaceId = pathParts[0] || 'java';
    
    return data.spaces.find((s) => s.id === spaceId) || data.spaces[0];
  };

  const handleSpaceSelect = (space: Space) => {
    setIsOpen(false);
    
    const firstTopic = space.topics[0];
    const firstQuestion = firstTopic?.questions[0];
    
    if (firstQuestion) {
      navigate(`/${space.id}/${firstTopic.id}/${firstQuestion.id}`);
    } else {
      navigate('/');
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <div class="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen())}
        class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Select space"
        aria-expanded={isOpen()}
      >
        <Show when={getCurrentSpace()} fallback={<span class="text-gray-700">Select Space</span>}>
          {(space) => (
            <>
              <span class="text-gray-800 font-medium">{space().name}</span>
              <svg
                class={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                  isOpen() ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </>
          )}
        </Show>
      </button>

      <Show when={isOpen()}>
        <div
          class="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-fade-in"
          style={{
            animation: 'fadeIn 0.15s ease-out',
          }}
        >
          <Show when={!spacesData.loading} fallback={<div class="px-4 py-3 text-sm text-gray-500">Loading...</div>}>
            <Show when={spacesData()}>
              {(data) => (
                <ul class="py-1">
                  <For each={data().spaces}>
                    {(space: Space) => {
                      const currentSpace = getCurrentSpace();
                      const isSelected = currentSpace?.id === space.id;

                      return (
                        <li>
                          <button
                            onClick={() => handleSpaceSelect(space)}
                            class={`w-full text-left px-4 py-2 text-sm transition-colors ${
                              isSelected
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <div class="flex items-center justify-between">
                              <div>
                                <div class="font-medium">{space.name}</div>
                                <div class="text-xs text-gray-500 mt-0.5">{space.description}</div>
                              </div>
                              <Show when={isSelected}>
                                <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </Show>
                            </div>
                          </button>
                        </li>
                      );
                    }}
                  </For>
                </ul>
              )}
            </Show>
          </Show>
        </div>
      </Show>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
