import React, { memo } from "react";
import { ChevronDown, Play, Globe } from "lucide-react";
import WordRelations from "./WordRelations";

// Move static data outside the component
const accentMap = {
  "en-US": "American English",
  "en-GB": "British English",
  "en-AU": "Australian English",
  "en-IN": "Indian English",
};

// Pre-compute accent count
const ACCENT_COUNT = Object.keys(accentMap).length;

const InputCard = memo(
  ({
    word,
    setWord,
    handleKeyDown,
    getPronunciation,
    isLoading,
    accent,
    setAccent,
    isMale,
    setIsMale,
    hasPronounced,
    synonyms,
    synonymStatus,
    antonyms,
    antonymStatus,
    handleRelationToggle,
  }) => (
    <div className="card">
      <div className="input-group">
        <input
          type="text"
          className="word-input"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter text ..."
        />
        <button
          onClick={getPronunciation}
          disabled={isLoading}
          className="pronounce-button"
        >
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <>
              <Play size={16} />
              <span>Pronounce</span>
            </>
          )}
        </button>
      </div>

      <div className="controls-section">
        <div className="control-group">
          <label className="control-label">
            <span>Accent</span>
            <span className="accent-count">
              <Globe size={16} />
              <span>{ACCENT_COUNT} available</span>
            </span>
          </label>
          <div className="select-wrapper">
            <select
              value={accent}
              onChange={(e) => setAccent(e.target.value)}
              className="accent-select"
            >
              {Object.entries(accentMap).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown className="select-icon" size={16} />
          </div>
        </div>
        <div className="control-group">
          <label className="control-label">Voice Gender</label>
          <div className="voice-buttons">
            <button
              onClick={() => setIsMale(true)}
              className={`voice-button ${isMale ? "active" : ""}`}
            >
              <svg
                className="icon-sm"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="8" r="4" strokeWidth="2" />
                <path
                  d="M12 12v8M8 16h8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span>Male</span>
            </button>
            <button
              onClick={() => setIsMale(false)}
              className={`voice-button ${!isMale ? "active" : ""}`}
            >
              <svg
                className="icon-sm"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="8" r="4" strokeWidth="2" />
                <path
                  d="M12 12v8M9 18c0-1.5 1.5-3 3-3s3 1.5 3 3"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span>Female</span>
            </button>
          </div>
        </div>
        {hasPronounced && (
          <WordRelations
            synonyms={synonyms}
            antonyms={antonyms}
            synonymStatus={synonymStatus}
            antonymStatus={antonymStatus}
            onToggle={handleRelationToggle}
          />
        )}
      </div>
    </div>
  )
);

export default InputCard;
