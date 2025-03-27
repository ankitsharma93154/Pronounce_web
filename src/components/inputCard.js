import React, { memo } from "react";
import { ChevronDown, Play, Globe, Zap } from "lucide-react";
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
    pronounce,
    isLoading,
    accent,
    setAccent,
    isMale,
    setIsMale,
    speed,
    setSpeed,
    hasPronounced,
    synonyms,
    synonymStatus,
    antonyms,
    antonymStatus,
    handleRelationToggle,
  }) => {
    // Modify toggle functions to trigger pronunciation
    const handleToggleGender = () => {
      setIsMale(!isMale);
      if (word) {
        pronounce(word);
      }
    };

    const handleToggleSpeed = (newSpeed) => {
      setSpeed(newSpeed);
      if (word) {
        pronounce(word);
      }
    };

    return (
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
          {/* Accent selection remains the same */}
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

          {/* Voice Gender Toggle */}
          <div className="control-group">
            <label className="control-label">Voice Gender</label>
            <div className="voice-buttons">
              <button
                onClick={handleToggleGender}
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
                onClick={handleToggleGender}
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

          {/* Speech Speed Toggle */}
          <div className="control-group">
            <label className="control-label">
              <span>Speech Speed</span>
              <Zap size={16} />
            </label>
            <div className="voice-buttons">
              <button
                onClick={() => handleToggleSpeed("slow")}
                className={`voice-button ${speed === "slow" ? "active" : ""}`}
              >
                <svg
                  className="icon-sm"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M6 8L10 12L6 16"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 8L16 12L12 16"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                  <path
                    d="M18 8L22 12L18 16"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.3"
                  />
                </svg>
                <span>Slow</span>
              </button>
              <button
                onClick={() => handleToggleSpeed("normal")}
                className={`voice-button ${speed === "normal" ? "active" : ""}`}
              >
                <svg
                  className="icon-sm"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M6 12L10 12" strokeWidth="2" strokeLinecap="round" />
                  <path
                    d="M14 12L18 12"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="12" r="2" strokeWidth="2" />
                </svg>
                <span>Normal</span>
              </button>
              <button
                onClick={() => handleToggleSpeed("fast")}
                className={`voice-button ${speed === "fast" ? "active" : ""}`}
              >
                <svg
                  className="icon-sm"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M6 16L10 12L6 8"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 16L16 12L12 8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                  <path
                    d="M18 16L22 12L18 8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.3"
                  />
                </svg>
                <span>Fast</span>
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
    );
  }
);

export default InputCard;
