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
import { Helmet } from "react-helmet";

// Keep critical components for initial render
// Header is now removed as it's handled by App.js
import MobileMenu from "../components/mobileMenu";
import Hero from "../components/hero";
import InputCard from "../components/inputCard";
import ResultsCard from "../components/resultCard";
import ExamplesList from "../components/exampleList";

// Lazy load all components that aren't needed for initial render
const FeaturesPage = lazy(() => import("../components/features"));
const MispronouncedWords = lazy(() => import("../components/mispronounce"));
const WordOfDay = lazy(() => import("../components/wordOfDay"));
const QuickPronounceTips = lazy(() => import("../components/tips"));

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

// Main Home component
const Home = () => {
  // Use useState for state management with initial state object
  const [state, setState] = useState({
    word: "",
    accent: "en-US",
    isMale: true,
    phonetic: "",
    speed: "normal", // Add speed with default value
    hasPronounced: false,
    isLoading: false,
    meanings: [],
    examples: [],
    isDarkMode: false,
    isMobileMenuOpen: false,
    isFavorite: false,
    synonyms: [],
    synonymStatus: { loading: false, error: null },
    antonyms: [], // Added for word relations toggle
    antonymStatus: { loading: false, error: null }, // Added for word relations toggle
    showSynonyms: true, // Added to track which relation type to show
  });

  // Create refs
  const audioRef = useRef(new Audio());
  const cacheRef = useRef({});
  const synonymCacheRef = useRef(new Map());
  const synonymAbortControllerRef = useRef(null);
  const antonymCacheRef = useRef(new Map()); // Added for antonyms
  const antonymAbortControllerRef = useRef(null); // Added for antonyms

  // Destructure state for cleaner code
  const {
    word,
    accent,
    isMale,
    phonetic,
    speed, // Add speed to destructured variables
    hasPronounced,
    isLoading,
    meanings,
    examples,
    isDarkMode,
    isMobileMenuOpen,
    isFavorite,
    synonyms,
    synonymStatus,
    antonyms,
    antonymStatus,
  } = state;

  // Unified state updater
  const updateState = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  // Add a flag to control when pronunciation should be triggered
  const [shouldPronounce, setShouldPronounce] = useState(false);

  // Function to fetch word relations (synonyms and antonyms)
  const fetchWordRelations = useCallback(
    async (relationType) => {
      if (!word?.trim()) return;

      const isAntonym = relationType === "antonyms";
      const apiRelType = isAntonym ? "rel_ant" : "rel_syn";
      const cacheRef = isAntonym ? antonymCacheRef : synonymCacheRef;
      const abortControllerRef = isAntonym
        ? antonymAbortControllerRef
        : synonymAbortControllerRef;
      const statusKey = isAntonym ? "antonymStatus" : "synonymStatus";
      const resultKey = isAntonym ? "antonyms" : "synonyms";

      // Check cache first
      const cacheKey = word.toLowerCase();
      if (cacheRef.current.has(cacheKey)) {
        updateState({ [resultKey]: cacheRef.current.get(cacheKey) });
        return;
      }

      // Cancel previous request if it exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();

      updateState({ [statusKey]: { loading: true, error: null } });

      try {
        const response = await fetch(
          `https://api.datamuse.com/words?${apiRelType}=${encodeURIComponent(
            word
          )}&max=10`,
          { signal: abortControllerRef.current.signal }
        );

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        const wordList = data.slice(0, 5).map((item) => item.word);

        // Update cache
        cacheRef.current.set(cacheKey, wordList);
        updateState({ [resultKey]: wordList });
      } catch (err) {
        // Only set error if not aborted
        if (err.name !== "AbortError") {
          updateState({
            [statusKey]: {
              loading: false,
              error: `Failed to fetch ${
                isAntonym ? "antonyms" : "synonyms"
              }. Please try again later.`,
            },
          });
        }
      } finally {
        if (abortControllerRef.current?.signal.aborted === false) {
          updateState({ [statusKey]: { loading: false, error: null } });
        }
      }
    },
    [word, updateState]
  );

  // Helper functions for specific relation types
  const fetchSynonyms = useCallback(() => {
    fetchWordRelations("synonyms");
  }, [fetchWordRelations]);

  const fetchAntonyms = useCallback(() => {
    fetchWordRelations("antonyms");
  }, [fetchWordRelations]);

  // Function to handle toggle between synonyms and antonyms
  const handleRelationToggle = useCallback(
    (type) => {
      updateState({ showSynonyms: type === "synonyms" });
    },
    [updateState]
  );

  // Function to get pronunciation with caching
  const getPronunciation = useCallback(async () => {
    if (!word.trim()) return;

    // Fetch both synonyms and antonyms
    fetchSynonyms();
    fetchAntonyms();

    // Create cache key - include speed in cache key
    const cacheKey = `${word.trim()}-${accent}-${isMale}-${speed}`;

    try {
      updateState({ isLoading: true });

      // Check cache first
      if (cacheRef.current[cacheKey]) {
        const cachedData = cacheRef.current[cacheKey];
        updateState({
          phonetic: cachedData.phonetic,
          meanings: cachedData.meanings,
          examples: cachedData.examples, // Add examples from cache
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
          body: JSON.stringify({
            word: word.trim(),
            accent,
            isMale,
            speed, // Include speed in the request
          }),
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

      // Extract examples or set default message
      const examples =
        Array.isArray(data.examples) && data.examples.length > 0
          ? data.examples
          : [{ text: "No examples available for this word." }];

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

      // Cache the results including examples
      cacheRef.current[cacheKey] = { phonetic, meanings, examples, audioUrl };

      updateState({
        phonetic,
        meanings,
        examples, // Add examples to state update
        hasPronounced: true,
      });
    } catch (error) {
      console.error("Error fetching pronunciation:", error);
    } finally {
      updateState({ isLoading: false });
    }
  }, [word, accent, isMale, speed, updateState, fetchSynonyms, fetchAntonyms]);

  useEffect(() => {
    if (word && shouldPronounce) {
      getPronunciation();
      setShouldPronounce(false);
    }
  }, [word, shouldPronounce, hasPronounced, getPronunciation]);

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

  // Warm up the API - update to include speed
  const warmUpAPI = useCallback(async () => {
    try {
      await fetch("https://backend-8isq.vercel.app/get-pronunciation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: "hello",
          accent,
          isMale,
          speed,
        }),
      });
    } catch (error) {
      console.error("API warm-up failed:", error);
    }
  }, [accent, isMale, speed]);

  // API warm-up effect
  useEffect(() => {
    const idleCallbackId =
      typeof window !== "undefined" && "requestIdleCallback" in window
        ? requestIdleCallback(() => warmUpAPI())
        : setTimeout(() => warmUpAPI(), 2000);

    return () => {
      if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
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

  // Mobile menu is still handled within Home.js if needed
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
      <Helmet>
        <title>
          QuickPronounce – Free English Pronunciation Tool | American & British
          Accents
        </title>
        <meta
          name="description"
          content="Master English pronunciation with QuickPronounce. Instantly hear any word in American or British accent, get phonetic transcriptions, and improve your spoken English for free."
        />
        <meta
          name="keywords"
          content="English pronunciation, pronunciation tool, American accent, British accent, phonetic transcription, speak English, pronunciation app, language learning, ESL, QuickPronounce"
        />
        <link rel="canonical" href="https://www.quickpronounce.site/" />
        {/* Open Graph */}
        <meta
          property="og:title"
          content="QuickPronounce – Free English Pronunciation Tool | American & British Accents"
        />
        <meta
          property="og:description"
          content="Master English pronunciation with QuickPronounce. Instantly hear any word in American or British accent, get phonetic transcriptions, and improve your spoken English for free."
        />
        <meta
          property="og:image"
          content="https://www.quickpronounce.site/og-preview.png"
        />
        <meta property="og:url" content="https://www.quickpronounce.site/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="QuickPronounce" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="QuickPronounce – Free English Pronunciation Tool | American & British Accents"
        />
        <meta
          name="twitter:description"
          content="Master English pronunciation with QuickPronounce. Instantly hear any word in American or British accent, get phonetic transcriptions, and improve your spoken English for free."
        />
        <meta
          name="twitter:image"
          content="https://www.quickpronounce.site/images/quickpronounce-twitter.jpg"
        />
        <meta name="twitter:site" content="@quickpronounce" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://www.quickpronounce.site/",
            name: "QuickPronounce",
            description:
              "QuickPronounce helps you master American and British English pronunciation instantly. Type any word and hear it pronounced correctly!",
          })}
        </script>
      </Helmet>

      {process.env.NODE_ENV === "production" && (
        <Suspense fallback={null}>
          <Analytics />
          <SpeedInsights />
        </Suspense>
      )}

      {/* Header removed - now in App.js */}

      {isMobileMenuOpen && <MobileMenu />}

      <main className="main container" id="home">
        {!hasPronounced && <Hero />}

        <div className="interface-grid">
          <InputCard
            word={word}
            setWord={(word) => updateState({ word })}
            handleKeyDown={handleKeyDown}
            getPronunciation={getPronunciation}
            pronounce={pronounce}
            isLoading={isLoading}
            accent={accent}
            setAccent={(accent) => updateState({ accent })}
            isMale={isMale}
            setIsMale={(isMale) => updateState({ isMale })}
            speed={speed}
            setSpeed={(speed) => updateState({ speed })}
            hasPronounced={hasPronounced}
            synonyms={synonyms}
            synonymStatus={synonymStatus}
            antonyms={antonyms}
            antonymStatus={antonymStatus}
            handleRelationToggle={handleRelationToggle}
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
      <Suspense fallback={null}>
        {hasPronounced && <ExamplesList examples={examples} />}
      </Suspense>

      {/* Lazy loaded components with placeholders */}
      <Suspense fallback={null}>
        <WordOfDay pronounce={pronounce} />
      </Suspense>

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
        <QuickPronounceTips />
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
    </>
  );
};

export default Home;
