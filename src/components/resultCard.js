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
    isPlaying,
    syllables,
  }) => (
    <div className="card">
      {isLoading ? (
        <div className="results-empty">
          <div className="loading-spinner icon-lg" />
          <p>Fetching pronunciation...</p>
        </div>
      ) : !hasPronounced ? (
        <div className="results-empty">
          <Volume2 className="icon-lg main-icon" />
          <p className="cta-text">
            Enter a word and click Pronounce to hear it.
          </p>
          <div className="social-cred-subtle">
            🌍 Over <strong>10,000 learners</strong> from 100+ countries
            improved their pronunciation here last month.
          </div>
        </div>
      ) : (
        <ResultsContent
          phonetic={phonetic}
          meanings={meanings}
          getPronunciation={getPronunciation}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          isPlaying={isPlaying}
          syllables={syllables}
        />
      )}
    </div>
  ),
);

export default ResultsCard;
