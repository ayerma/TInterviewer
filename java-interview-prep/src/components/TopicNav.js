import React from 'react';

const TopicNav = ({ topics, onSelectTopic }) => {
  const renderSubtopics = (subtopics) => {
    return (
      <ul>
        {subtopics.map((topic) => (
          <li key={topic.id}>
            <a href="#" onClick={() => onSelectTopic(topic)}>
              {topic.name}
            </a>
            {topic.subtopics && renderSubtopics(topic.subtopics)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav className="topic-nav">
      {renderSubtopics(topics)}
    </nav>
  );
};

export default TopicNav;
