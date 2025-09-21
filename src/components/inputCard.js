import React, { memo, useState, useEffect, useRef } from "react";
import { ChevronDown, Play, Globe, Zap } from "lucide-react";
import WordRelations from "./WordRelations";

// Static accent mapping
const accentMap = {
  "en-US": "American English",
  "en-GB": "British English",
  "en-AU": "Australian English",
  "en-IN": "Indian English",
};

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
    const [suggestions, setSuggestions] = useState([]);
    const [wordList, setWordList] = useState({});
    const [lastLoadedLetter, setLastLoadedLetter] = useState("");
    const [isLoadingDict, setIsLoadingDict] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const [justSelected, setJustSelected] = useState(false);

    const suggestionsRef = useRef(null);
    const inputRef = useRef(null);

    // Load suggestions
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
      const loadAndFilter = (data) => {
        setWordList(data);
        setLastLoadedLetter(firstLetter);
        const matchedWords = Object.keys(data)
          .filter((w) => w.toLowerCase().startsWith(inputValue))
          .slice(0, 5);
        setSuggestions(matchedWords);
        const exactMatch = matchedWords.some(
          (w) => w.toLowerCase() === inputValue
        );
        setShowSuggestions(
          matchedWords.length > 0 &&
            document.activeElement === inputRef.current &&
            !exactMatch
        );
        setSelectedSuggestionIndex(-1);
      };

      if (firstLetter !== lastLoadedLetter) {
        setIsLoadingDict(true);
        fetch(`/data/${firstLetter}.json`)
          .then((res) => res.json())
          .then(loadAndFilter)
          .catch(() => {
            setWordList({});
            setSuggestions([]);
            setShowSuggestions(false);
            setSelectedSuggestionIndex(-1);
          })
          .finally(() => setIsLoadingDict(false));
      } else {
        loadAndFilter(wordList);
      }
    }, [word, wordList, justSelected, lastLoadedLetter]);

    // Close suggestions on outside click
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (
          showSuggestions &&
          suggestionsRef.current &&
          !suggestionsRef.current.contains(e.target) &&
          inputRef.current &&
          !inputRef.current.contains(e.target)
        ) {
          setShowSuggestions(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [showSuggestions]);

    const handleSuggestionKeyDown = (e) => {
      if (handleKeyDown) handleKeyDown(e);

      if (showSuggestions && suggestions.length > 0) {
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            setSelectedSuggestionIndex((prev) =>
              Math.min(prev + 1, suggestions.length - 1)
            );
            break;
          case "ArrowUp":
            e.preventDefault();
            setSelectedSuggestionIndex((prev) => Math.max(prev - 1, -1));
            break;
          case "Enter":
            e.preventDefault();
            if (selectedSuggestionIndex >= 0)
              handleSelectSuggestion(suggestions[selectedSuggestionIndex]);
            break;
          case "Escape":
            setShowSuggestions(false);
            break;
          default:
            break;
        }
      }
    };

    const handleSelectSuggestion = (suggestion) => {
      setJustSelected(true);
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
      setWord(suggestion);
      setTimeout(() => inputRef.current?.focus(), 0);
      if (pronounce) setTimeout(() => pronounce(suggestion), 100);
    };

    const handleToggleGender = () => {
      setIsMale(!isMale);
      if (word) pronounce(word);
    };

    const handleToggleSpeed = (newSpeed) => {
      setSpeed(newSpeed);
      if (word) pronounce(word);
    };

    const handleAccentChange = (e) => {
      setAccent(e.target.value);
      if (word) pronounce(word);
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
                const exactMatch = suggestions.some(
                  (s) => s.toLowerCase() === word.toLowerCase()
                );
                if (!exactMatch) setShowSuggestions(true);
              }
            }}
            placeholder={
              isLoadingDict ? "Loading dictionary..." : "Enter text ..."
            }
            disabled={isLoadingDict}
          />
          {/* Suggestions Dropdown */}
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
              {suggestions.map((s, i) => (
                <div
                  key={s}
                  className={`suggestion-item ${
                    selectedSuggestionIndex === i ? "selected" : ""
                  }`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSelectSuggestion(s);
                  }}
                  onMouseEnter={() => setSelectedSuggestionIndex(i)}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    backgroundColor:
                      selectedSuggestionIndex === i ? "#f0f0f0" : "transparent",
                    transition: "background-color 0.2s",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

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
          {/* Accent Selection */}
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

          {/* Voice Gender */}
          <div className="control-group">
            <label className="control-label">Voice Gender</label>
            <div className="voice-buttons">
              <button
                onClick={handleToggleGender}
                className={`voice-button ${isMale ? "male-active" : ""}`}
              >
                <span>Male</span>
              </button>
              <button
                onClick={handleToggleGender}
                className={`voice-button ${!isMale ? "female-active" : ""}`}
              >
                <span>Female</span>
              </button>
            </div>
          </div>

          {/* Speech Speed */}
          <div className="control-group">
            <label className="control-label">
              <span>Speech Speed</span>
              <Zap size={16} />
            </label>
            <div className="voice-buttons">
              {["slow", "normal", "fast"].map((s) => (
                <button
                  key={s}
                  onClick={() => handleToggleSpeed(s)}
                  className={`voice-button ${speed === s ? `${s}-active` : ""}`}
                >
                  <span>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                </button>
              ))}
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
