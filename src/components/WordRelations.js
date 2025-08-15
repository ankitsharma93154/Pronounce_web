import React, { useState } from "react";

const WordRelations = ({
  synonyms,
  antonyms,
  synonymStatus,
  antonymStatus,
  onToggle,
  pronounce,
}) => {
  const [showSynonyms, setShowSynonyms] = useState(true);

  const handleToggle = (isSynonym) => {
    setShowSynonyms(isSynonym);
    if (onToggle) {
      onToggle(isSynonym ? "synonyms" : "antonyms");
    }
  };

  const renderContent = () => {
    const words = showSynonyms ? synonyms : antonyms;
    const status = showSynonyms ? synonymStatus : antonymStatus;
    const type = showSynonyms ? "synonyms" : "antonyms";

    if (status.loading)
      return <p className="relations-loading">Loading {type}...</p>;
    if (status.error) return <p className="relations-error">{status.error}</p>;
    if (words.length === 0)
      return <p className="relations-loading">No direct {type} found.</p>;

    return (
      <div className="relations-list">
        {words.map((word) => (
          <span
            key={word}
            className="relation-chip"
            onClick={() => pronounce(word)}
          >
            {word}
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="control-group">
        <label className="control-label">Word Relations</label>
        <div className="voice-buttons">
          <button
            onClick={() => handleToggle(true)}
            className={`voice-button ${showSynonyms ? "synonyms-active" : ""}`}
          >
            <svg
              className="icon-sm"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M7 8l5-5 5 5M12 3v12M8 17h8"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>Synonyms</span>
          </button>
          <button
            onClick={() => handleToggle(false)}
            className={`voice-button ${!showSynonyms ? "antonyms-active" : ""}`}
          >
            <svg
              className="icon-sm"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M7 16l5 5 5-5M12 21V9M8 5h8"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>Antonyms</span>
          </button>
        </div>
      </div>
      <div className="relations-container">{renderContent()}</div>
    </>
  );
};

export default React.memo(WordRelations);
