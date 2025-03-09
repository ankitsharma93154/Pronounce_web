import React from "react";

// Modified to accept props from parent instead of managing its own state
const WordSynonyms = ({ synonyms, status }) => {
  const { loading, error } = status;

  // Memoizing the render content
  const renderContent = () => {
    if (loading) return <p className="synonyms-loading">Loading synonyms...</p>;
    if (error) return <p className="synonyms-error">{error}</p>;
    if (synonyms.length === 0)
      return <p className="synonyms-loading">No synonyms found.</p>;

    return (
      <div className="synonyms-list">
        {synonyms.map((synonym) => (
          <span key={synonym} className="synonym-chip">
            {synonym}
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <h3 className="synonyms-title">Synonyms</h3>
      <div className="synonyms-container">{renderContent()}</div>
    </>
  );
};

export default React.memo(WordSynonyms);
