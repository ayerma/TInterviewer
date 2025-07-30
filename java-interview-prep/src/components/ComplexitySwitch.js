import React from 'react';

const ComplexitySwitch = ({ complexity, setComplexity }) => {
  return (
    <div className="complexity-switch">
      <button onClick={() => setComplexity('basic')} className={complexity === 'basic' ? 'active' : ''}>
        Basic
      </button>
      <button onClick={() => setComplexity('middle')} className={complexity === 'middle' ? 'active' : ''}>
        Middle
      </button>
      <button onClick={() => setComplexity('inDepth')} className={complexity === 'inDepth' ? 'active' : ''}>
        In-Depth
      </button>
    </div>
  );
};

export default ComplexitySwitch;
