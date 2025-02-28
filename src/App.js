import React, {
  useState,
  useRef,
  useEffect,
  lazy,
  Suspense,
  useCallback,
  useDeferredValue,
  useTransition,
} from "react";
import {
  Volume2,
  Moon,
  Sun,
  ChevronDown,
  Play,
  AudioWaveform,
  Globe,
  Heart,
  Share2,
  Menu,
  X,
} from "lucide-react";

// Import analytics only in production
const Analytics =
  process.env.NODE_ENV === "production"
    ? lazy(() =>
        import("@vercel/analytics/react").then((mod) => ({
          default: mod.Analytics,
        }))
      )
    : () => null;
const SpeedInsights =
  process.env.NODE_ENV === "production"
    ? lazy(() =>
        import("@vercel/speed-insights/react").then((mod) => ({
          default: mod.SpeedInsights,
        }))
      )
    : () => null;

// Move static data outside the component
const accentMap = {
  "en-US": "American English",
  "en-GB": "British English",
  "en-AU": "Australian English",
  "en-IN": "Indian English",
};

// Debounce utility function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Lazy load the ResultsContent component
const LazyResultsContent = lazy(() =>
  Promise.resolve({
    default: ({
      phonetic,
      meanings,
      getPronunciation,
      toggleFavorite,
      isFavorite,
    }) => (
      <div className="results-content">
        <div className="phonetic-section">
          <div className="section-header">
            <h3 className="section-title">Phonetic Transcription</h3>
            <div className="header-actions">
              <button onClick={toggleFavorite} className="icon-button">
                <Heart
                  className="icon-sm"
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </button>
              <button className="icon-button">
                <Share2 className="icon-sm" />
              </button>
            </div>
          </div>
          <div className="phonetic-display">
            <button onClick={getPronunciation} className="icon-button">
              <AudioWaveform className="icon" />
            </button>
            <span className="phonetic-text">{phonetic || "/ _ /"}</span>
          </div>
        </div>

        <div>
          <h3 className="section-title">Meanings</h3>
          <div className="meanings-list">
            {meanings.map((meaning, index) => (
              <div key={index} className="meaning-item">
                {meaning}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  })
);

// Loading skeleton component
const ResultsSkeleton = () => (
  <div className="results-skeleton">
    <div className="skeleton-line skeleton-title"></div>
    <div className="skeleton-line skeleton-phonetic"></div>
    <div className="skeleton-line"></div>
    <div className="skeleton-line"></div>
    <div className="skeleton-line skeleton-short"></div>
  </div>
);

const App = () => {
  const [word, setWord] = useState("");
  const [accent, setAccent] = useState("en-US");
  const [isMale, setIsMale] = useState(true);
  const [phonetic, setPhonetic] = useState("");
  const [hasPronounced, setHasPronounced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [meanings, setMeanings] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Use deferred value for word to avoid blocking UI
  const deferredWord = useDeferredValue(word);

  const audioRef = useRef(new Audio());

  // Memoize event handlers
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const toggleFavorite = useCallback(() => {
    setIsFavorite((prev) => !prev);
  }, []);

  const getPronunciation = useCallback(async () => {
    if (!deferredWord.trim()) return;

    // Set loading state immediately for UI feedback
    setIsLoading(true);

    // Defer API call to next tick to avoid blocking the UI
    setTimeout(async () => {
      try {
        const response = await fetch(
          "https://backend-8isq.vercel.app/get-pronunciation",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ word: deferredWord.trim(), accent, isMale }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Server error: ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();

        // Batch state updates to reduce renders
        startTransition(() => {
          setPhonetic(data.phonetic || "Phonetic transcription not available.");
          setMeanings(
            Array.isArray(data.meanings) && data.meanings.length > 0
              ? data.meanings
              : ["Meaning not available."]
          );
          setHasPronounced(true);
        });

        if (data.audioContent) {
          try {
            const byteCharacters = atob(data.audioContent);
            const byteNumbers = new Uint8Array(
              [...byteCharacters].map((char) => char.charCodeAt(0))
            );
            const audioBlob = new Blob([byteNumbers], { type: "audio/mp3" });
            const audioUrl = URL.createObjectURL(audioBlob);

            audioRef.current.src = audioUrl;
            audioRef.current.play();

            audioRef.current.onloadeddata = () => URL.revokeObjectURL(audioUrl);
          } catch (audioError) {
            console.error("Error processing audio:", audioError);
          }
        }
      } catch (error) {
        console.error("Error fetching pronunciation:", error);
      } finally {
        setIsLoading(false);
      }
    }, 0);
  }, [deferredWord, accent, isMale]);

  // Debounced input handler
  const debouncedHandleChange = useCallback(
    debounce((value) => {
      setWord(value);
    }, 150),
    []
  );

  // Handle keyboard input - memoized
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") getPronunciation();
    },
    [getPronunciation]
  );

  // Dark mode effect with requestAnimationFrame
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      document.body.classList.toggle("dark", isDarkMode);
    });

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(frameId);
      if (isDarkMode) document.body.classList.remove("dark");
    };
  }, [isDarkMode]);

  return (
    <>
      {process.env.NODE_ENV === "production" && (
        <Suspense fallback={null}>
          <Analytics />
          <SpeedInsights />
        </Suspense>
      )}

      <header className="header">
        <div className="container header-content">
          <a href="/" className="logo">
            <div className="logo-icon">
              <Volume2 size={24} color="#2563eb" />
              <div className="logo-dot"></div>
            </div>
            <span className="logo-text">QuickPronounce</span>
          </a>

          <div className="header-actions">
            <button
              onClick={toggleDarkMode}
              className="icon-button"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="icon-button"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <a href="#" className="mobile-nav-link">
            Features
          </a>
          <a href="#" className="mobile-nav-link">
            About
          </a>
          <a href="#" className="mobile-nav-link">
            Contact
          </a>
        </div>
      )}

      <main className="main container">
        {!hasPronounced && (
          <div className="hero">
            <h1 className="hero-title">Master Any Word's Pronunciation</h1>
            <p className="hero-subtitle">
              Get crystal-clear pronunciations in multiple accents and voices.
              Perfect for language learners and professionals.
            </p>
          </div>
        )}

        <div className="interface-grid">
          <div className="card">
            <div className="input-group">
              <input
                type="text"
                className="word-input"
                defaultValue={word}
                onChange={(e) => debouncedHandleChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter a word..."
              />
              <button
                onClick={getPronunciation}
                disabled={isLoading || !deferredWord.trim()}
                className="pronounce-button"
              >
                {isLoading ? (
                  <div className="loading-spinner" />
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
                    <span>{Object.keys(accentMap).length} available</span>
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
            </div>
          </div>

          <div className="card">
            {isLoading ? (
              <Suspense fallback={<ResultsSkeleton />}>
                <div className="results-empty">
                  <div className="loading-spinner icon-lg" />
                  <p>Fetching pronunciation...</p>
                </div>
              </Suspense>
            ) : !hasPronounced ? (
              <div className="results-empty">
                <Volume2 className="icon-lg" />
                <p>
                  Enter a word and click Pronounce to hear the pronunciation
                </p>
              </div>
            ) : (
              <Suspense fallback={<ResultsSkeleton />}>
                <LazyResultsContent
                  phonetic={phonetic}
                  meanings={meanings}
                  getPronunciation={getPronunciation}
                  toggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                />
              </Suspense>
            )}
          </div>
        </div>

        <button
          onClick={getPronunciation}
          disabled={isLoading || !deferredWord.trim()}
          className="float-button"
          aria-label="Pronounce word"
        >
          <Volume2 className="icon" />
        </button>
      </main>
      <footer className="footer">
        <div className="container">
          <p>© 2025 QuickPronounce. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default App;
