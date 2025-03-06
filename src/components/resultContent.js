import React, { memo } from "react";
import PhoneticSection from "./phoneticSection";
import MeaningsSection from "./meaningSection";

const ResultsContent = memo(
  ({ phonetic, meanings, getPronunciation, toggleFavorite, isFavorite }) => (
    <div className="results-content">
      <PhoneticSection
        phonetic={phonetic}
        getPronunciation={getPronunciation}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />
      <MeaningsSection meanings={meanings} />
    </div>
  )
);

export default ResultsContent;
