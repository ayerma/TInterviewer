import { HashRouter, Route, Navigate } from '@solidjs/router';
import { lazy } from 'solid-js';
import NavigationMenu from './components/NavigationMenu';
import SpaceSelector from './components/SpaceSelector';

const Home = lazy(() => import('./pages/Home'));
const SpaceView = lazy(() => import('./pages/SpaceView'));
const TopicView = lazy(() => import('./pages/TopicView'));
const QuestionDetail = lazy(() => import('./pages/QuestionDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <HashRouter>
      <div class="flex h-screen overflow-hidden">
        <NavigationMenu />
        <div class="flex-1 flex flex-col overflow-hidden">
          <header class="flex items-center justify-end px-6 py-4 bg-white border-b border-gray-200">
            <SpaceSelector />
          </header>
          <main class="flex-1 overflow-auto">
            <Route path="/" component={() => <Navigate href="/spaces/java" />} />
            <Route path="/spaces/:spaceId" component={SpaceView} />
            <Route path="/spaces/:spaceId/:topicId" component={TopicView} />
            <Route path="/spaces/:spaceId/:topicId/:questionId" component={QuestionDetail} />
            <Route path="/*" component={NotFound} />
          </main>
        </div>
      </div>
    </HashRouter>
  );
}
