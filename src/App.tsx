import { HashRouter, Route, Navigate } from '@solidjs/router';
import { lazy } from 'solid-js';
import MainLayout from './components/MainLayout';

const Home = lazy(() => import('./pages/Home'));
const SpaceView = lazy(() => import('./pages/SpaceView'));
const TopicView = lazy(() => import('./pages/TopicView'));
const QuestionDetail = lazy(() => import('./pages/QuestionDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <HashRouter root={MainLayout}>
      <Route path="/" component={() => <Navigate href="/spaces/java" />} />
      <Route path="/spaces/:spaceId" component={SpaceView} />
      <Route path="/spaces/:spaceId/:topicId" component={TopicView} />
      <Route path="/spaces/:spaceId/:topicId/:questionId" component={QuestionDetail} />
      <Route path="/*" component={NotFound} />
    </HashRouter>
  );
}
