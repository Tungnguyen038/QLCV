import React from "react";
import "./Progress.scss";
const Progress = ({ done }) => {
  const [style, setStyle] = React.useState({});

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${done || 0}%`,
    };

    setStyle(newStyle);
  }, 100);
  return (
    <div data-tut='tut-roadmap-progress' className="progress">
      <div className="text-xs progress-done" style={style}>
        {done || 0}%
      </div>
    </div>
  );
};

export default Progress;
