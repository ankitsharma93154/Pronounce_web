import React, { memo } from "react";
import { Volume2 } from "lucide-react";
import ResultsContent from "./resultContent";

const ResultsCard = memo(
  ({
    isLoading,
    hasPronounced,
    phonetic,
    meanings,
    getPronunciation,
    toggleFavorite,
    isFavorite,
    isPlaying, // NEW PROP
    pronounce, // NEW PROP
  }) => (
    <div className="card">
      {isLoading ? (
        <div className="results-empty">
          <div className="loading-spinner icon-lg" />
          <p>Fetching pronunciation...</p>
        </div>
      ) : !hasPronounced ? (
        <div className="results-empty">
          <Volume2 className="icon-lg" />
          <p>Enter a word and click Pronounce to hear the pronunciation</p>
        </div>
      ) : (
        <ResultsContent
          phonetic={phonetic}
          meanings={meanings}
          getPronunciation={getPronunciation}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          isPlaying={isPlaying} // PASS DOWN
        />
      )}
    </div>
  )
);

export default ResultsCard;
