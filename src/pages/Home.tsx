export default function Home() {
  return (
    <div class="flex-1 p-8 overflow-auto bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Java Interview Q&A
        </h1>
        <p class="text-lg text-gray-600 mb-8">
          Welcome! Select a question from the navigation menu to get started.
        </p>
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold text-gray-700 mb-4">
            Getting Started
          </h2>
          <ol class="list-decimal list-inside space-y-2 text-gray-600">
            <li>Browse through the topics in the left sidebar</li>
            <li>Expand a space to see its topics</li>
            <li>Expand a topic to see its questions</li>
            <li>Click on a question to view the answer</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
