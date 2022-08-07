import React from "react";

const Progress: React.FC = () => {
  return (
    <div className="progress-cover">
      <progress className="progress is-small is-primary" max="100">
        Loading
      </progress>
    </div>
  );
};

export default Progress;
