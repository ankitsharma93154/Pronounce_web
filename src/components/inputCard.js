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
    const [wordList, setWordList] = useState({});
    const [lastLoadedLetter, setLastLoadedLetter] = useState("");
    const [isLoadingDict, setIsLoadingDict] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const [justSelected, setJustSelected] = useState(false);
    const suggestionsRef = useRef(null);
    const inputRef = useRef(null);

    // Generate suggestions based on input
    useEffect(() => {
      if (justSelected) {
        setJustSelected(false);
        return;
      }

      const inputValue = word.trim().toLowerCase();
      if (!inputValue) {
        setSuggestions([]);
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        return;
      }

      const firstLetter = inputValue[0];
      if (firstLetter !== lastLoadedLetter) {
        setIsLoadingDict(true);
        const storageKey = `qp_dict_${firstLetter}`;
        const cached = localStorage.getItem(storageKey);
        if (cached) {
          try {
            const data = JSON.parse(cached);
            setWordList(data);
            setLastLoadedLetter(firstLetter);
            const matchedWords = Object.keys(data)
              .filter((w) => w.toLowerCase().startsWith(inputValue))
              .slice(0, 5);
            setSuggestions(matchedWords);
            const exactMatch = matchedWords.some(
              (w) => w.toLowerCase() === inputValue
            );
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
          } catch (e) {
            localStorage.removeItem(storageKey);
          } finally {
            setIsLoadingDict(false);
          }
        } else {
          // fetch from our server proxy which sets strong cache headers
          fetch(`/data/${firstLetter}.json`)
            .then((res) => res.json())
            .then((data) => {
              setWordList(data);
              try {
                localStorage.setItem(storageKey, JSON.stringify(data));
              } catch (e) {
                // ignore localStorage write errors (quota, private mode)
              }
              setLastLoadedLetter(firstLetter);
              const matchedWords = Object.keys(data)
                .filter((w) => w.toLowerCase().startsWith(inputValue))
                .slice(0, 5);
              setSuggestions(matchedWords);
              const exactMatch = matchedWords.some(
                (w) => w.toLowerCase() === inputValue
              );
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
            })
            .catch(() => {
              setWordList({});
              setSuggestions([]);
              setShowSuggestions(false);
              setSelectedSuggestionIndex(-1);
            })
            .finally(() => setIsLoadingDict(false));
        }
      } else {
        // Use already loaded wordList
        const matchedWords = Object.keys(wordList)
          .filter((w) => w.toLowerCase().startsWith(inputValue))
          .slice(0, 5);
        setSuggestions(matchedWords);
        const exactMatch = matchedWords.some(
          (w) => w.toLowerCase() === inputValue
        );
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
      }
    }, [word, wordList, justSelected, lastLoadedLetter]);

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
            disabled={isLoadingDict}
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
                width: "100%",
                maxHeight: "200px",
                overflowY: "auto",
                zIndex: 10,
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className={`suggestion-item ${
                    selectedSuggestionIndex === index ? "selected" : ""
                  }`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSelectSuggestion(suggestion);
                  }}
                  onMouseEnter={() => setSelectedSuggestionIndex(index)}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    backgroundColor:
                      selectedSuggestionIndex === index
                        ? "#f0f0f0"
                        : "transparent",
                    transition: "background-color 0.2s",
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
