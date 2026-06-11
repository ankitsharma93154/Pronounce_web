// import React, { memo, useMemo } from "react";

// const ExamplesList = ({ examples }) => {
//   const formattedExamples = useMemo(() => {
//     if (!examples || examples.length === 0) {
//       return [{ text: "No examples available for this word." }];
//     }
//     return examples;
//   }, [examples]);

//   return (
//     <div className="examples-container">
//       <h3 className="examples-title">Example Sentences</h3>
//       <ul className="examples-list">
//         {formattedExamples.map((example, index) => (
//           <li key={index} className="example-item">
//             {example.text}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default memo(ExamplesList);
import React, { memo, useMemo, useState } from "react";

const INITIAL_SHOW = 3;

const ExamplesList = memo(({ entries, activePos }) => {
  const [showAll, setShowAll] = useState(false);

  const examples = useMemo(() => {
    if (!entries || entries.length === 0) return [];
    const activeEntry = entries.find((e) => e.pos === activePos) || entries[0];
    return activeEntry?.examples || [];
  }, [entries, activePos]);

  // reset show more when pos changes
  const visibleExamples = showAll ? examples : examples.slice(0, INITIAL_SHOW);
  const hasMore = examples.length > INITIAL_SHOW;

  if (examples.length === 0) return null;

  return (
    <div className="examples-container">
      <h3 className="examples-title">
        Examples
        {activePos && (
          <span className="examples-pos-label"> - used as {activePos}</span>
        )}
      </h3>
      <ul className="examples-list">
        {visibleExamples.map((example, index) => (
          <li key={index} className="example-item">
            {example}
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          className="examples-show-more"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Show less" : `Show more`}
        </button>
      )}
    </div>
  );
});

export default ExamplesList;
