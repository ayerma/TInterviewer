import { A } from '@solidjs/router';

export default function NotFound() {
  return (
    <div class="flex-1 h-full overflow-auto bg-gray-50">
      <div class="max-w-4xl mx-auto p-8">
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
          <div class="flex flex-col items-center text-center gap-4">
            <svg class="w-20 h-20 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h1 class="text-3xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
              <p class="text-gray-600 mb-6">The page you're looking for doesn't exist or has been moved.</p>
              <A
                href="/spaces/java"
                class="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Home
              </A>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
