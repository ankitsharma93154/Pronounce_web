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
  const setWord = useCallback(
    (value) => setState((prev) => ({ ...prev, word: value })),
    []
  );
  const setAccent = useCallback(
    (value) => setState((prev) => ({ ...prev, accent: value })),
    []
  );
  const setIsMale = useCallback(
    (value) => setState((prev) => ({ ...prev, isMale: value })),
    []
  );
  const setIsLoading = useCallback(
    (value) => setState((prev) => ({ ...prev, isLoading: value })),
    []
  );
  const setHasPronounced = useCallback(
    (value) => setState((prev) => ({ ...prev, hasPronounced: value })),
    []
  );
  const setPhonetic = useCallback(
    (value) => setState((prev) => ({ ...prev, phonetic: value })),
    []
  );
  const setMeanings = useCallback(
    (value) => setState((prev) => ({ ...prev, meanings: value })),
    []
  );

  // Use audioRef for audio playback
  const audioRef = useRef(new Audio());

  // Add ref for caching previous results
  const cacheRef = useRef({});

  // Function to get pronunciation with caching
  const getPronunciation = useCallback(async () => {
    if (!word.trim()) return;

    // Create cache key
    const cacheKey = `${word.trim()}-${accent}-${isMale}`;

    try {
      setIsLoading(true);

      // Check cache first
      if (cacheRef.current[cacheKey]) {
        const cachedData = cacheRef.current[cacheKey];
        setPhonetic(cachedData.phonetic);
        setMeanings(cachedData.meanings);

        if (cachedData.audioUrl) {
          audioRef.current.src = cachedData.audioUrl;
          audioRef.current.play();
        }

        setHasPronounced(true);
        setIsLoading(false);
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

      setPhonetic(phonetic);
      setMeanings(meanings);

      let audioUrl = null;

      if (data.audioContent) {
        try {
          // Use more efficient audio processing
          const byteArray = Uint8Array.from(atob(data.audioContent), (c) =>
            c.charCodeAt(0)
          );
          const audioBlob = new Blob([byteArray], { type: "audio/mp3" });
          audioUrl = URL.createObjectURL(audioBlob);

          audioRef.current.src = audioUrl;

          // Preload audio
          audioRef.current.preload = "auto";

          // Play audio after it's loaded
          audioRef.current.oncanplaythrough = () => {
            audioRef.current.play();
          };
        } catch (audioError) {
          console.error("Error processing audio:", audioError);
        }
      }

      // Cache the results
      cacheRef.current[cacheKey] = {
        phonetic,
        meanings,
        audioUrl,
      };

      setHasPronounced(true);
    } catch (error) {
      console.error("Error fetching pronunciation:", error);
    } finally {
      setIsLoading(false);
    }
  }, [
    word,
    accent,
    isMale,
    setIsLoading,
    setPhonetic,
    setMeanings,
    setHasPronounced,
  ]);

  // Add a flag to control when pronunciation should be triggered
  const [shouldPronounce, setShouldPronounce] = useState(false);

  useEffect(() => {
    if (word && shouldPronounce) {
      getPronunciation();
      // Reset the flag after pronunciation
      setShouldPronounce(false);
    }
  }, [word, shouldPronounce, getPronunciation]);

  const pronounce = useCallback(
    (selectedWord) => {
      // Directly set the word and mark for pronunciation
      setWord(selectedWord);
      setShouldPronounce(true);
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    },
    [setWord]
  );

  // Warm up the API on load - moved to a separate effect with lower priority
  const DUMMY_WORD = "hello"; // Preload with a common word

  const warmUpAPI = useCallback(async () => {
    try {
      await fetch("https://backend-8isq.vercel.app/get-pronunciation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: DUMMY_WORD, accent, isMale }),
      }); // Fire a request
    } catch (error) {
      console.error("API warm-up failed:", error);
    }
  }, [accent, isMale]);

  // Use a separate effect with lower priority for API warm-up
  useEffect(() => {
    // Use requestIdleCallback to run this during browser idle time
    const idleCallbackId = requestIdleCallback
      ? requestIdleCallback(() => {
          warmUpAPI();
          console.log("API warmed up!");
        })
      : setTimeout(() => {
          warmUpAPI();
          console.log("API warmed up!");
        }, 2000); // Fallback for browsers not supporting requestIdleCallback

    return () => {
      if (requestIdleCallback) {
        cancelIdleCallback(idleCallbackId);
      } else {
        clearTimeout(idleCallbackId);
      }
    };
  }, [warmUpAPI]);

  // Handle keyboard input with debounce for better performance
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") getPronunciation();
    },
    [getPronunciation]
  );

  // Toggle functions with callback pattern
  const toggleDarkMode = useCallback(
    () => setState((prev) => ({ ...prev, isDarkMode: !prev.isDarkMode })),
    []
  );

  const toggleMobileMenu = useCallback(
    () =>
      setState((prev) => ({
        ...prev,
        isMobileMenuOpen: !prev.isMobileMenuOpen,
      })),
    []
  );

  const toggleFavorite = useCallback(
    () => setState((prev) => ({ ...prev, isFavorite: !prev.isFavorite })),
    []
  );

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
    // Set explicit dimensions for components to prevent layout shifts
    document.documentElement.style.setProperty(
      "--app-height",
      `${window.innerHeight}px`
    );

    // Listen for orientation changes
    const handleResize = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      );
    };

    window.addEventListener("resize", handleResize);

    // Preconnect to API
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://backend-8isq.vercel.app";
    document.head.appendChild(link);

    // Add preload hint for the API
    const preloadLink = document.createElement("link");
    preloadLink.rel = "preload";
    preloadLink.as = "fetch";
    preloadLink.href = "https://backend-8isq.vercel.app/get-pronunciation";
    preloadLink.crossOrigin = "anonymous";
    document.head.appendChild(preloadLink);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(preloadLink);
      window.removeEventListener("resize", handleResize);
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

      <main className="main container" id="home">
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

        <FloatButton
          onClick={getPronunciation}
          disabled={isLoading}
          isLoading={isLoading}
          word={word}
        />
      </main>

      {/* Lazy load non-critical components */}
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
      <hr />

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
      <hr />

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
