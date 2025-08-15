import React, { memo } from "react";
import PhoneticSection from "./phoneticSection";
import MeaningsSection from "./meaningSection";

const ResultsContent = memo(
  ({
    phonetic,
    meanings,
    getPronunciation,
    toggleFavorite,
    isFavorite,
    isPlaying,
  }) => (
    <div className="results-content">
      <PhoneticSection
        phonetic={phonetic}
        getPronunciation={getPronunciation}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
        isPlaying={isPlaying}
      />
      <MeaningsSection meanings={meanings} />
    </div>
  )
);

export default ResultsContent;
