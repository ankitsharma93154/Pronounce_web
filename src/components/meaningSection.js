// import React, { memo } from "react";

// const MeaningsSection = memo(({ meanings }) => (
//   <div>
//     <h3 className="section-title">Meanings</h3>
//     <div className="meanings-list">
//       {meanings.map((meaning, index) => (
//         <div key={index} className="meaning-item">
//           {meaning}
//         </div>
//       ))}
//     </div>
//   </div>
// ));

// export default MeaningsSection;
import React, { memo, useMemo } from "react";

const MeaningsSection = memo(({ entries, activePos, setActivePos }) => {
  const activeEntry = useMemo(
    () => entries.find((e) => e.pos === activePos) || entries[0],
    [entries, activePos],
  );

  if (!entries || entries.length === 0) return null;

  return (
    <div className="meanings-section">
      <h3 className="section-title">Meanings</h3>
      <div className="pos-tabs">
        {entries.map((entry) => (
          <button
            key={entry.pos}
            className={`pos-tab ${activePos === entry.pos ? "pos-tab--active" : ""}`}
            onClick={() => setActivePos(entry.pos)}
          >
            {entry.pos}
          </button>
        ))}
      </div>

      {activeEntry && (
        <div className="meanings-list">
          {activeEntry.definitions.map((definition, index) => (
            <div key={index} className="meaning-item">
              {definition}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default MeaningsSection;
