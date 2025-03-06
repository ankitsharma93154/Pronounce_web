import React, {
  useState,
  useRef,
  useEffect,
  lazy,
  Suspense,
  memo,
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
import FeaturesPage from "./features";
import MispronouncedWords from "./mispronounce";

// Lazy load analytics components
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

// Pre-compute accent count
const ACCENT_COUNT = Object.keys(accentMap).length;

// Memoized components
const PhoneticSection = memo(
  ({ phonetic, getPronunciation, toggleFavorite, isFavorite }) => (
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
  )
);

const MeaningsSection = memo(({ meanings }) => (
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
));

const ResultsContent = memo(
  ({ phonetic, meanings, getPronunciation, toggleFavorite, isFavorite }) => (
    <div className="results-content">
      <PhoneticSection
        phonetic={phonetic}
        getPronunciation={getPronunciation}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />
      <MeaningsSection meanings={meanings} />
    </div>
  )
);

const Header = memo(
  ({ isDarkMode, toggleDarkMode, isMobileMenuOpen, toggleMobileMenu }) => (
    <header className="header">
      <div className="container header-content">
        <a href="/" className="logo">
          <div className="logo-icon">
            <Volume2 size={24} color="#2563eb" />
            <div className="logo-dot"></div>
          </div>
          <span className="logo-text">QuickPronounce</span>
        </a>

        <nav className="nav-desktop">
          <a href="#features" className="nav-link">
            Features
          </a>
          <a href="#" className="nav-link">
            About
          </a>
          <a href="#" className="nav-link">
            Contact
          </a>
        </nav>

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
  )
);

const MobileMenu = memo(() => (
  <div className="mobile-menu">
    <a href="#features" className="mobile-nav-link">
      Features
    </a>
    <a href="#" className="mobile-nav-link">
      About
    </a>
    <a href="#" className="mobile-nav-link">
      Contact
    </a>
  </div>
));

const Hero = memo(() => (
  <div className="hero">
    <h1 className="hero-title">
      Master Pronunciation with Clear American & British Accents
    </h1>
    <p className="hero-subtitle">
      Get accurate, high-quality word pronunciations in American and British
      English. Perfect for language learners, professionals, and anyone looking
      to improve pronunciation effortlessly.
    </p>
  </div>
));

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
      </div>
    </div>
  )
);

const ResultsCard = memo(
  ({
    isLoading,
    hasPronounced,
    phonetic,
    meanings,
    getPronunciation,
    toggleFavorite,
    isFavorite,
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
        />
      )}
    </div>
  )
);

const Footer = memo(() => (
  <footer className="footer">
    <div className="container">
      <p>© 2025 QuickPronounce. All rights reserved.</p>
    </div>
  </footer>
));

// Main App component
const App = () => {
  // Use useReducer for complex state management
  const [state, setState] = useState({
    word: "",
    accent: "en-US",
    isMale: true,
    phonetic: "",
    hasPronounced: false,
    isLoading: false,
    meanings: [],
    isDarkMode: false,
    isMobileMenuOpen: false,
    isFavorite: false,
  });

  // Destructure state for cleaner code
  const {
    word,
    accent,
    isMale,
    phonetic,
    hasPronounced,
    isLoading,
    meanings,
    isDarkMode,
    isMobileMenuOpen,
    isFavorite,
  } = state;

  // Create setter functions
  const setWord = (value) => setState((prev) => ({ ...prev, word: value }));
  const setAccent = (value) => setState((prev) => ({ ...prev, accent: value }));
  const setIsMale = (value) => setState((prev) => ({ ...prev, isMale: value }));
  const setIsLoading = (value) =>
    setState((prev) => ({ ...prev, isLoading: value }));
  const setHasPronounced = (value) =>
    setState((prev) => ({ ...prev, hasPronounced: value }));
  const setPhonetic = (value) =>
    setState((prev) => ({ ...prev, phonetic: value }));
  const setMeanings = (value) =>
    setState((prev) => ({ ...prev, meanings: value }));

  // Use audioRef for audio playback
  const audioRef = useRef(new Audio());

  // Function to get pronunciation
  const getPronunciation = async () => {
    if (!word.trim()) return;

    try {
      setIsLoading(true);

      // Use AbortController for fetch timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(
        "https://backend-8isq.vercel.app/get-pronunciation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ word: word.trim(), accent, isMale }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      setPhonetic(data.phonetic || "Phonetic transcription not available.");
      setMeanings(
        Array.isArray(data.meanings) && data.meanings.length > 0
          ? data.meanings
          : [
              `${
                /^[A-Z][a-z]+$/.test(word) ? "This looks like a name! " : ""
              }Hmm... we couldn't find a meaning for this word. Try another word!`,
            ]
      );

      if (data.audioContent) {
        try {
          // Use more efficient audio processing
          const byteArray = Uint8Array.from(atob(data.audioContent), (c) =>
            c.charCodeAt(0)
          );
          const audioBlob = new Blob([byteArray], { type: "audio/mp3" });
          const audioUrl = URL.createObjectURL(audioBlob);

          audioRef.current.src = audioUrl;

          // Preload audio
          audioRef.current.preload = "auto";

          // Play audio after it's loaded
          audioRef.current.oncanplaythrough = () => {
            audioRef.current.play();
          };

          // Clean up object URL when done
          audioRef.current.onended = () => URL.revokeObjectURL(audioUrl);
        } catch (audioError) {
          console.error("Error processing audio:", audioError);
        }
      }

      setHasPronounced(true);
    } catch (error) {
      console.error("Error fetching pronunciation:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // Add a flag to control when pronunciation should be triggered
  const [shouldPronounce, setShouldPronounce] = useState(false);

  useEffect(() => {
    if (word && shouldPronounce) {
      getPronunciation();
      // Reset the flag after pronunciation
      setShouldPronounce(false);
    }
  }, [word, shouldPronounce, getPronunciation]);

  const pronounce = (selectedWord) => {
    // Directly set the word and mark for pronunciation
    setWord(selectedWord);
    setShouldPronounce(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Warm up the API on load
  const DUMMY_WORD = "hello"; // Preload with a common word

  const warmUpAPI = async () => {
    try {
      await fetch("https://backend-8isq.vercel.app/get-pronunciation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: DUMMY_WORD, accent, isMale }),
      }); // Fire a request
    } catch (error) {
      console.error("API warm-up failed:", error);
    }
  };
  useEffect(() => {
    console.log("API warmed up!");
    warmUpAPI(); // Call it on component mount
  }, []);

  // Handle keyboard input with debounce for better performance
  const handleKeyDown = (e) => {
    if (e.key === "Enter") getPronunciation();
  };

  // Toggle functions with callback pattern
  const toggleDarkMode = () =>
    setState((prev) => ({ ...prev, isDarkMode: !prev.isDarkMode }));

  const toggleMobileMenu = () =>
    setState((prev) => ({ ...prev, isMobileMenuOpen: !prev.isMobileMenuOpen }));

  const toggleFavorite = () =>
    setState((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));

  // Dark mode effect with proper cleanup
  useEffect(() => {
    // Apply dark mode
    document.body.classList.toggle("dark", isDarkMode);

    // Set meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        isDarkMode ? "#1a1a1a" : "#ffffff"
      );
    }

    // Clean up on unmount
    return () => {
      document.body.classList.remove("dark");
    };
  }, [isDarkMode]);

  // Preload critical resources
  useEffect(() => {
    // Preconnect to API
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://backend-8isq.vercel.app";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      {process.env.NODE_ENV === "production" && (
        <Suspense fallback={null}>
          <Analytics />
          <SpeedInsights />
        </Suspense>
      )}

      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

      {isMobileMenuOpen && <MobileMenu />}

      <main className="main container">
        {!hasPronounced && <Hero />}

        <div className="interface-grid">
          <InputCard
            word={word}
            setWord={setWord}
            handleKeyDown={handleKeyDown}
            getPronunciation={getPronunciation}
            isLoading={isLoading}
            accent={accent}
            setAccent={setAccent}
            isMale={isMale}
            setIsMale={setIsMale}
          />

          <ResultsCard
            isLoading={isLoading}
            hasPronounced={hasPronounced}
            phonetic={phonetic}
            meanings={meanings}
            getPronunciation={getPronunciation}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        </div>

        <button
          onClick={getPronunciation}
          disabled={isLoading || !word.trim()}
          className="float-button"
          aria-label="Pronounce word"
        >
          <Volume2 className="icon" />
        </button>
      </main>
      <MispronouncedWords pronounce={pronounce} />
      <hr />

      <FeaturesPage id="features" />

      <Footer />
    </>
  );
};

export default App;
