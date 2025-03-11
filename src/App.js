import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  lazy,
  Suspense,
  memo,
} from "react";
import { Volume2 } from "lucide-react";

// Keep critical components for initial render
import Header from "./components/header";
import MobileMenu from "./components/mobileMenu";
import Hero from "./components/hero";
import InputCard from "./components/inputCard";
import ResultsCard from "./components/resultCard";

// Lazy load all components that aren't needed for initial render
const FeaturesPage = lazy(() => import("./components/features"));
const MispronouncedWords = lazy(() => import("./components/mispronounce"));
const ContactPage = lazy(() => import("./components/contact"));
const Footer = lazy(() => import("./components/footer"));

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

// Create and memoize static components
const FloatButton = memo(({ onClick, disabled, isLoading, word }) => (
  <button
    onClick={onClick}
    disabled={isLoading || !word.trim()}
    className="float-button"
    aria-label="Pronounce word"
  >
    <Volume2 className="icon" />
  </button>
));

// Main App component
const App = () => {
  // Use useState for state management with initial state object
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
    synonyms: [],
    synonymStatus: { loading: false, error: null },
  });

  // Create refs
  const audioRef = useRef(new Audio());
  const cacheRef = useRef({});
  const synonymCacheRef = useRef(new Map());
  const synonymAbortControllerRef = useRef(null);

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
    synonyms,
    synonymStatus,
  } = state;

  // Unified state updater
  const updateState = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  // Add a flag to control when pronunciation should be triggered
  const [shouldPronounce, setShouldPronounce] = useState(false);

  // Function to fetch synonyms
  const fetchSynonyms = useCallback(async () => {
    if (!word?.trim()) return;

    // Check cache first
    const cacheKey = word.toLowerCase();
    if (synonymCacheRef.current.has(cacheKey)) {
      updateState({ synonyms: synonymCacheRef.current.get(cacheKey) });
      return;
    }

    // Cancel previous request if it exists
    if (synonymAbortControllerRef.current) {
      synonymAbortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    synonymAbortControllerRef.current = new AbortController();

    updateState({ synonymStatus: { loading: true, error: null } });

    try {
      const response = await fetch(
        `https://api.datamuse.com/words?rel_syn=${encodeURIComponent(
          word
        )}&max=10`,
        { signal: synonymAbortControllerRef.current.signal }
      );

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      const wordList = data.slice(0, 5).map((item) => item.word);

      // Update cache
      synonymCacheRef.current.set(cacheKey, wordList);
      updateState({ synonyms: wordList });
    } catch (err) {
      // Only set error if not aborted
      if (err.name !== "AbortError") {
        updateState({
          synonymStatus: {
            loading: false,
            error: "Failed to fetch synonyms. Please try again later.",
          },
        });
      }
    } finally {
      if (synonymAbortControllerRef.current?.signal.aborted === false) {
        updateState({ synonymStatus: { loading: false, error: null } });
      }
    }
  }, [word, updateState]);

  // Function to get pronunciation with caching
  const getPronunciation = useCallback(async () => {
    if (!word.trim()) return;

    fetchSynonyms();

    // Create cache key
    const cacheKey = `${word.trim()}-${accent}-${isMale}`;

    try {
      updateState({ isLoading: true });

      // Check cache first
      if (cacheRef.current[cacheKey]) {
        const cachedData = cacheRef.current[cacheKey];
        updateState({
          phonetic: cachedData.phonetic,
          meanings: cachedData.meanings,
          hasPronounced: true,
          isLoading: false,
        });

        if (cachedData.audioUrl) {
          audioRef.current.src = cachedData.audioUrl;
          audioRef.current.play();
        }
        return;
      }

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
      const phonetic = data.phonetic || "Phonetic transcription not available.";
      const meanings =
        Array.isArray(data.meanings) && data.meanings.length > 0
          ? data.meanings
          : [
              `${
                /^[A-Z][a-z]+$/.test(word) ? "This looks like a name! " : ""
              }Hmm... we couldn't find a meaning for this word. Try another word!`,
            ];

      let audioUrl = null;

      if (data.audioContent) {
        try {
          const byteArray = Uint8Array.from(atob(data.audioContent), (c) =>
            c.charCodeAt(0)
          );
          const audioBlob = new Blob([byteArray], { type: "audio/mp3" });
          audioUrl = URL.createObjectURL(audioBlob);

          audioRef.current.src = audioUrl;
          audioRef.current.preload = "auto";
          audioRef.current.oncanplaythrough = () => audioRef.current.play();
        } catch (audioError) {
          console.error("Error processing audio:", audioError);
        }
      }

      // Cache the results
      cacheRef.current[cacheKey] = { phonetic, meanings, audioUrl };

      updateState({
        phonetic,
        meanings,
        hasPronounced: true,
      });
    } catch (error) {
      console.error("Error fetching pronunciation:", error);
    } finally {
      updateState({ isLoading: false });
    }
  }, [word, accent, isMale, updateState, fetchSynonyms]);

  useEffect(() => {
    if (word && shouldPronounce) {
      getPronunciation();
      setShouldPronounce(false);
    }
  }, [word, shouldPronounce, getPronunciation]);

  const pronounce = useCallback(
    (selectedWord) => {
      updateState({ word: selectedWord });
      setShouldPronounce(true);
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      );
    },
    [updateState]
  );

  // Warm up the API
  const warmUpAPI = useCallback(async () => {
    try {
      await fetch("https://backend-8isq.vercel.app/get-pronunciation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: "hello", accent, isMale }),
      });
    } catch (error) {
      console.error("API warm-up failed:", error);
    }
  }, [accent, isMale]);

  // API warm-up effect
  useEffect(() => {
    const idleCallbackId = requestIdleCallback
      ? requestIdleCallback(() => warmUpAPI())
      : setTimeout(() => warmUpAPI(), 2000);

    return () => {
      if (requestIdleCallback) {
        cancelIdleCallback(idleCallbackId);
      } else {
        clearTimeout(idleCallbackId);
      }
    };
  }, [warmUpAPI]);

  // Event handlers
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") getPronunciation();
    },
    [getPronunciation]
  );

  // Toggle functions
  const togglers = {
    darkMode: useCallback(
      () => updateState({ isDarkMode: !isDarkMode }),
      [updateState, isDarkMode]
    ),
    mobileMenu: useCallback(
      () => updateState({ isMobileMenuOpen: !isMobileMenuOpen }),
      [updateState, isMobileMenuOpen]
    ),
    favorite: useCallback(
      () => updateState({ isFavorite: !isFavorite }),
      [updateState, isFavorite]
    ),
  };

  // Dark mode effect
  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        isDarkMode ? "#1a1a1a" : "#ffffff"
      );
    }
    return () => document.body.classList.remove("dark");
  }, [isDarkMode]);

  // Page setup effect - Modified to fix preload issues
  useEffect(() => {
    // Set dimensions to prevent layout shifts
    const handleResize = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Only preconnect to API (removed problematic preload)
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://backend-8isq.vercel.app";
    document.head.appendChild(link);

    // Immediately fetch a small request to warm up connection instead of using preload
    setTimeout(() => {
      warmUpAPI();
    }, 300);

    return () => {
      if (link.parentNode) {
        document.head.removeChild(link);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [warmUpAPI]);

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
        toggleDarkMode={togglers.darkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={togglers.mobileMenu}
      />

      {isMobileMenuOpen && <MobileMenu />}

      <main className="main container" id="home">
        {!hasPronounced && <Hero />}

        <div className="interface-grid">
          <InputCard
            word={word}
            setWord={(word) => updateState({ word })}
            handleKeyDown={handleKeyDown}
            getPronunciation={getPronunciation}
            isLoading={isLoading}
            accent={accent}
            setAccent={(accent) => updateState({ accent })}
            isMale={isMale}
            setIsMale={(isMale) => updateState({ isMale })}
            hasPronounced={hasPronounced}
            synonyms={synonyms}
            synonymStatus={synonymStatus}
          />

          <ResultsCard
            isLoading={isLoading}
            hasPronounced={hasPronounced}
            phonetic={phonetic}
            meanings={meanings}
            getPronunciation={getPronunciation}
            toggleFavorite={togglers.favorite}
            isFavorite={isFavorite}
          />
        </div>

        <FloatButton
          onClick={getPronunciation}
          disabled={isLoading}
          isLoading={isLoading}
          word={word}
        />
      </main>

      {/* Lazy loaded components with placeholders */}
      <Suspense
        fallback={
          <div
            className="loading-placeholder"
            style={{ height: "200px" }}
          ></div>
        }
      >
        <MispronouncedWords pronounce={pronounce} />
      </Suspense>
      <div className="about-page-divider"></div>

      <Suspense
        fallback={
          <div
            className="loading-placeholder"
            style={{ height: "300px" }}
          ></div>
        }
      >
        <FeaturesPage id="features" />
      </Suspense>
      <div className="about-page-divider"></div>

      <Suspense
        fallback={
          <div
            className="loading-placeholder"
            style={{ height: "200px" }}
          ></div>
        }
      >
        <ContactPage id="contact" />
      </Suspense>

      <Suspense
        fallback={
          <div
            className="loading-placeholder"
            style={{ height: "100px" }}
          ></div>
        }
      >
        <Footer />
      </Suspense>
    </>
  );
};

export default App;
