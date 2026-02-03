import { useParams } from '@solidjs/router';
import { createResource, Show } from 'solid-js';
import type { QuestionContent } from '../types/schema';

async function fetchQuestionContent(spaceId: string, topicId: string, questionId: string): Promise<QuestionContent> {
  const response = await fetch(`/data/spaces/${spaceId}/${topicId}/${questionId}.json`);
  if (!response.ok) {
    throw new Error(`Failed to load question: ${response.statusText}`);
  }
  return response.json();
}

export default function QuestionDetail() {
  const params = useParams();

  const [questionContent] = createResource(
    () => ({ spaceId: params.spaceId, topicId: params.topicId, questionId: params.questionId }),
    async ({ spaceId, topicId, questionId }) => {
      if (!spaceId || !topicId || !questionId) {
        return null;
      }
      return fetchQuestionContent(spaceId, topicId, questionId);
    }
  );

  return (
    <div class="flex-1 h-full overflow-auto bg-gray-50">
      <div class="max-w-4xl mx-auto p-8">
        <Show
          when={!params.questionId}
          fallback={
            <Show
              when={!questionContent.loading}
              fallback={
                <div class="flex items-center justify-center py-20">
                  <div class="flex flex-col items-center gap-4">
                    <div class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p class="text-gray-600">Loading question...</p>
                  </div>
                </div>
              }
            >
              <Show
                when={!questionContent.error}
                fallback={
                  <div class="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div class="flex items-start gap-3">
                      <svg class="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h3 class="text-lg font-semibold text-red-900 mb-1">Failed to Load Question</h3>
                        <p class="text-red-700">{questionContent.error?.message || 'An error occurred while loading the question content.'}</p>
                      </div>
                    </div>
                  </div>
                }
              >
                <Show when={questionContent()}>
                  {(content) => (
                    <div class="space-y-6">
                      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h1 class="text-3xl font-bold text-gray-900 leading-tight">
                          {content().title}
                        </h1>
                      </div>

                      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <div class="prose prose-lg max-w-none">
                          <h2 class="text-xl font-semibold text-gray-800 mb-4">Answer</h2>
                          <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {content().answers.junior}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </Show>
              </Show>
            </Show>
          }
        >
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <div class="flex flex-col items-center text-center gap-3">
              <svg class="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <h2 class="text-2xl font-semibold text-gray-800 mb-2">No Question Selected</h2>
                <p class="text-gray-600">Select a question from the navigation menu to view its content.</p>
              </div>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
}
