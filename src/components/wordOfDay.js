import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { Volume2 } from "lucide-react";

const API_URL = "https://word-of-day.vercel.app/";

// Memoized difficulty class function
const getDifficultyClass = (difficulty) => {
  switch (difficulty) {
    case "beginner":
      return "difficulty-beginner";
    case "intermediate":
      return "difficulty-intermediate";
    case "advanced":
      return "difficulty-advanced";
    default:
      return "difficulty-default";
  }
};

// Memoized date formatter
const formatDate = (dateString) => {
  const options = { month: "long", day: "numeric", year: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Memoized loading component
const LoadingSpinner = memo(() => (
  <div className="word-of-day-container word-of-day-container--placeholder">
    <div className="word-of-day-loading">
      <div className="loading-spinner"></div>
    </div>
  </div>
));

// Memoized error component
const ErrorDisplay = memo(({ message }) => (
  <div className="word-of-day-container word-of-day-container--placeholder">
    <div className="word-of-day-error">{message}</div>
  </div>
));

// Memoized empty state component
const EmptyState = memo(() => (
  <div className="word-of-day-container word-of-day-container--placeholder">
    <div className="word-of-day-empty">No word of the day available.</div>
  </div>
));

// Main component
const WordOfDay = memo(({ pronounce }) => {
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cache key is today's date — automatically invalidates at midnight
  const fetchWordOfDay = useCallback(async () => {
    const todayKey = `wod_${new Date().toISOString().slice(0, 10)}`;

    // Serve from localStorage if we already fetched today
    try {
      const cached = localStorage.getItem(todayKey);
      if (cached) {
        setWordData(JSON.parse(cached));
        setLoading(false);
        return;
      }
    } catch (_) {
      /* ignore parse / storage errors */
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}get-wordofday`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setWordData(data);
      setError(null);

      try {
        localStorage.setItem(todayKey, JSON.stringify(data));
      } catch (_) {
        /* ignore storage quota errors */
      }
    } catch (err) {
      setError("Failed to load word of the day");
      // Error handled and displayed to user
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWordOfDay();
  }, [fetchWordOfDay]);

  // Memoized handlePronounce function
  const handlePronounce = useCallback(() => {
    if (wordData?.word) {
      pronounce(wordData.word);
    }
  }, [wordData?.word, pronounce]);

  // Memoized difficulty class
  const difficultyClass = useMemo(() => {
    if (!wordData) return "";
    return getDifficultyClass(wordData.difficulty);
  }, [wordData]);

  // Memoized formatted date
  const formattedDate = useMemo(() => {
    if (!wordData?.display_date) return "";
    return formatDate(wordData.display_date);
  }, [wordData?.display_date]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!wordData) return <EmptyState />;

  return (
    <div className="word-of-day-container">
      <div className="word-of-day-badge">NEW</div>
      <div className="word-of-day-header">
        <div className="word-of-day-title">
          <span>📅 Word of the Day</span>
        </div>
        <div className="word-of-day-date">{formattedDate}</div>
      </div>

      <div className="word-of-day-content">
        <div className="word-of-day-left">
          <div className="word-main">
            <span className="word-of-day-word">{wordData.word}</span>
            <span className="word-of-day-pos">{wordData.part_of_speech}</span>
            <span className={`difficulty-badge ${difficultyClass}`}>
              {wordData.difficulty}
            </span>
          </div>
          <div className="word-of-day-phonetic">{wordData.phonetic}</div>
          <div className="word-of-day-definition">{wordData.definition}</div>
          <div className="word-of-day-example">
            "{wordData.example_sentence}"
          </div>
          {(() => {
            const synonyms = Array.isArray(wordData.synonyms)
              ? wordData.synonyms
              : typeof wordData.synonyms === "string"
                ? wordData.synonyms
                    .split(",")
                    .map((s) => s.trim())
                    .filter((s) => s)
                : [];
            return (
              synonyms.length > 0 && (
                <div className="word-of-day-synonyms">
                  <strong>Synonyms:</strong> {synonyms.join(", ")}
                </div>
              )
            );
          })()}
        </div>

        <div className="word-of-day-right">
          <button
            onClick={handlePronounce}
            className="listen-button"
            aria-label="Listen to pronunciation"
          >
            <Volume2 className="icon" />
            <span>Listen</span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default WordOfDay;
