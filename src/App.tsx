import { HashRouter, Route } from '@solidjs/router';
import NavigationMenu from './components/NavigationMenu';
import SpaceSelector from './components/SpaceSelector';
import Home from './pages/Home';
import QuestionDetail from './pages/QuestionDetail';

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
            <Route path="/" component={Home} />
            <Route path="/:spaceId/:topicId/:questionId" component={QuestionDetail} />
          </main>
        </div>
      </div>
    </HashRouter>
  );
}
