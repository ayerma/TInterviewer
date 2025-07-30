import React from 'react';

const TopicContent = ({ topic, complexity }) => {
  if (!topic || !topic.content) {
    return <div className="topic-content">Select a topic to start.</div>;
  }

  const content = topic.content[complexity];

  return (
    <div className="topic-content">
      <h2>{topic.name}</h2>
      <p>{content}</p>
    </div>
  );
};

export default TopicContent;
