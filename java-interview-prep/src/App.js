import React, { useState, useEffect } from 'react';
import './App.css';
import { topics } from './data/topics';
import TopicNav from './components/TopicNav';
import TopicContent from './components/TopicContent';
import ComplexitySwitch from './components/ComplexitySwitch';
import ThemeSwitch from './components/ThemeSwitch';

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [complexity, setComplexity] = useState('basic'); // 'basic', 'middle', 'inDepth'
  const [theme, setTheme] = useState('light'); // 'light', 'dark'

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleSelectTopic = (topic) => {
    if (topic.content) {
      setSelectedTopic(topic);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Java Interview Prep</h1>
        <ThemeSwitch theme={theme} setTheme={setTheme} />
      </header>
      <div className="main-content">
        <aside className="sidebar">
          <TopicNav topics={topics} onSelectTopic={handleSelectTopic} />
        </aside>
        <main className="content">
          {selectedTopic && (
            <ComplexitySwitch
              complexity={complexity}
              setComplexity={setComplexity}
            />
          )}
          <TopicContent topic={selectedTopic} complexity={complexity} />
        </main>
      </div>
    </div>
  );
}

export default App;
