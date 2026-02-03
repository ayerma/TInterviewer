import { useParams } from '@solidjs/router';

export default function QuestionDetail() {
  const params = useParams();

  return (
    <div class="flex-1 p-8 overflow-auto">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">
          Question Detail
        </h1>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-gray-600">
            Space: <span class="font-medium">{params.spaceId}</span>
          </p>
          <p class="text-gray-600">
            Topic: <span class="font-medium">{params.topicId}</span>
          </p>
          <p class="text-gray-600">
            Question: <span class="font-medium">{params.questionId}</span>
          </p>
          <div class="mt-6 p-4 bg-blue-50 rounded-md">
            <p class="text-sm text-blue-800">
              This is a placeholder for the question detail view. 
              The actual question content and level toggles will be implemented in a future ticket.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
