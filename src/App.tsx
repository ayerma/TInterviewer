import { HashRouter, Route } from '@solidjs/router';
import NavigationMenu from './components/NavigationMenu';
import Home from './pages/Home';
import QuestionDetail from './pages/QuestionDetail';

export default function App() {
  return (
    <HashRouter>
      <div class="flex h-screen overflow-hidden">
        <NavigationMenu />
        <main class="flex-1 overflow-auto">
          <Route path="/" component={Home} />
          <Route path="/:spaceId/:topicId/:questionId" component={QuestionDetail} />
        </main>
      </div>
    </HashRouter>
  );
}
