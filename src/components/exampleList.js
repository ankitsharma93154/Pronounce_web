import React, { memo, useMemo } from "react";

const ExamplesList = ({ examples }) => {
  const formattedExamples = useMemo(() => {
    if (!examples || examples.length === 0) {
      return [{ text: "No examples available for this word." }];
    }
    return examples;
  }, [examples]);

  return (
    <div className="examples-container">
      <h3 className="examples-title">Example Sentences</h3>
      <ul className="examples-list">
        {formattedExamples.map((example, index) => (
          <li key={index} className="example-item">
            {example.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(ExamplesList);
