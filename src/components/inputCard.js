import React, { memo, useState, useEffect, useRef } from "react";
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
    antonyms,
    handleRelationToggle,
  }) => {
    // State for auto-suggestions
    const [suggestions, setSuggestions] = useState([]);
    const [wordList, setWordList] = useState([]);
    const [isLoadingDict, setIsLoadingDict] = useState(false);
    const [wordListLoaded, setWordListLoaded] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const [justSelected, setJustSelected] = useState(false);
    const suggestionsRef = useRef(null);
    const inputRef = useRef(null);

    // Load wordlist lazily - only when needed
    const loadWordList = async () => {
      if (wordListLoaded || isLoadingDict) return;

      try {
        setIsLoadingDict(true);
        const response = await fetch("/wordlist.txt");
        const text = await response.text();
        const words = text
          .split("\n")
          .map((word) => word.trim().toLowerCase())
          .filter((word) => word);
        setWordList(words);
        setWordListLoaded(true);
      } catch (error) {
        console.error("Failed to load wordlist:", error);
        setWordList([]);
      } finally {
        setIsLoadingDict(false);
      }
    };

    // Generate suggestions based on input - now using local wordlist
    useEffect(() => {
      if (justSelected) {
        setJustSelected(false);
        return;
      }

      const inputValue = word.trim().toLowerCase();
      if (!inputValue || wordList.length === 0) {
        setSuggestions([]);
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        return;
      }

      // Filter words locally - much faster and no backend requests!
      const matchedWords = wordList
        .filter((w) => w.startsWith(inputValue))
        .slice(0, 4); // Limit to 4 suggestions

      setSuggestions(matchedWords);
      const exactMatch = matchedWords.some((w) => w === inputValue);

      if (
        matchedWords.length > 0 &&
        document.activeElement === inputRef.current &&
        !exactMatch
      ) {
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
      setSelectedSuggestionIndex(-1);
    }, [word, wordList, justSelected]);

    // Handle clicking outside to close suggestions
    useEffect(() => {
      const handleClickOutside = (event) => {
        // Check if click is outside both the input and suggestions
        if (
          showSuggestions &&
          suggestionsRef.current &&
          !suggestionsRef.current.contains(event.target) &&
          inputRef.current &&
          !inputRef.current.contains(event.target)
        ) {
          setShowSuggestions(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showSuggestions]);

    // Handle suggestion selection with keyboard
    const handleSuggestionKeyDown = (e) => {
      // Original key handling logic
      if (handleKeyDown) {
        handleKeyDown(e);
      }

      // Autosuggest navigation
      if (showSuggestions && suggestions.length > 0) {
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            setSelectedSuggestionIndex((prev) =>
              prev < suggestions.length - 1 ? prev + 1 : prev
            );
            break;
          case "ArrowUp":
            e.preventDefault();
            setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
            break;
          case "Enter":
            e.preventDefault();
            if (selectedSuggestionIndex >= 0) {
              handleSelectSuggestion(suggestions[selectedSuggestionIndex]);
            }
            break;
          case "Escape":
            setShowSuggestions(false);
            break;
          default:
            break;
        }
      }
    };

    // Select a suggestion - Fixed version
    const handleSelectSuggestion = (suggestion) => {
      // Set flag to prevent suggestions from showing again immediately
      setJustSelected(true);

      // Hide suggestions first
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);

      // Set the word
      setWord(suggestion);

      // Maintain focus on the input field
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);

      // Pronounce the word if the function is available
      if (pronounce) {
        setTimeout(() => {
          pronounce(suggestion);
        }, 100);
      }
    };

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

    const handleAccentChange = (e) => {
      setAccent(e.target.value);
      if (word) {
        pronounce(word);
      }
    };

    return (
      <div className="card">
        <div className="input-group" style={{ position: "relative" }}>
          <input
            ref={inputRef}
            type="text"
            className="word-input"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={handleSuggestionKeyDown}
            onFocus={() => {
              // Lazy load wordlist on first focus
              if (!wordListLoaded && !isLoadingDict) {
                loadWordList();
              }

              if (word && suggestions.length > 0) {
                // Only show suggestions if the word doesn't exactly match any suggestion
                const exactMatch = suggestions.some(
                  (s) => s.toLowerCase() === word.toLowerCase()
                );
                if (!exactMatch) {
                  setShowSuggestions(true);
                }
              }
            }}
            placeholder={
              isLoadingDict ? "Loading dictionary..." : "Enter text ..."
            }
          />

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="suggestions-dropdown"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                maxHeight: "150px",
                overflowY: "auto",
                zIndex: 1000,
                backgroundColor: "var(--bg-primary)",
                border: "1px solid var(--border-color)",
                borderTop: "none",
                borderRadius: "0 0 0.5rem 0.5rem",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                marginTop: "-1px",
              }}
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className="suggestion-item"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSelectSuggestion(suggestion);
                  }}
                  onMouseEnter={() => setSelectedSuggestionIndex(index)}
                  style={{
                    padding: "0.75rem 1rem",
                    cursor: "pointer",
                    backgroundColor:
                      selectedSuggestionIndex === index
                        ? "var(--bg-secondary)"
                        : "transparent",
                    color: "var(--text-primary)",
                    transition: "background-color 0.15s ease",
                    borderBottom:
                      index === suggestions.length - 1
                        ? "none"
                        : "1px solid var(--border-color)",
                    fontSize: "0.95rem",
                    fontWeight: "400",
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pronounce button now below the input with full width */}
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
                onChange={handleAccentChange}
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
                className={`voice-button ${isMale ? "male-active" : ""}`}
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
                className={`voice-button ${!isMale ? "female-active" : ""}`}
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
                className={`voice-button ${
                  speed === "slow" ? "slow-active" : ""
                }`}
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
                className={`voice-button ${
                  speed === "normal" ? "normal-active" : ""
                }`}
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
                className={`voice-button ${
                  speed === "fast" ? "fast-active" : ""
                }`}
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
              onToggle={handleRelationToggle}
              pronounce={pronounce}
            />
          )}
        </div>
      </div>
    );
  }
);

export default InputCard;
