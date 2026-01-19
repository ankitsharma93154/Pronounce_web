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
        })),
      )
    : () => null;

const SpeedInsights =
  process.env.NODE_ENV === "production"
    ? lazy(() =>
        import("@vercel/speed-insights/react").then((mod) => ({
          default: mod.SpeedInsights,
        })),
      )
    : () => null;

// Create and memoize static components
const FloatButton = memo(({ onClick, disabled, isLoading, word }) => (
  <button
    onClick={onClick}
    disabled={isLoading || !word.trim()}
    className="float-button"
    aria-label="Listen to audio pronunciation" // SEO: Matches high-CTR 'Audio' and 'Listen' keywords
    title="Hear pronunciation"
  >
    <Volume2 className="icon" />
  </button>
));

const Home = () => {
  const [state, setState] = useState({
    word: "",
    accent: "en-US",
    isMale: true,
    phonetic: "",
    speed: "normal",
    hasPronounced: false,
    isLoading: false,
    meanings: [],
    examples: [],
    isDarkMode: false,
    isMobileMenuOpen: false,
    isFavorite: false,
    synonyms: [],
    antonyms: [],
    showSynonyms: true,
  });

  const audioRef = useRef(new Audio());
  const cacheRef = useRef({});

  const {
    word,
    accent,
    isMale,
    phonetic,
    speed,
    hasPronounced,
    isLoading,
    meanings,
    examples,
    isDarkMode,
    isMobileMenuOpen,
    isFavorite,
    synonyms,
    antonyms,
  } = state;

  const updateState = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const [shouldPronounce, setShouldPronounce] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleRelationToggle = useCallback(
    (type) => {
      updateState({ showSynonyms: type === "synonyms" });
    },
    [updateState],
  );

  const getPronunciation = useCallback(async () => {
    if (!word.trim()) return;

    const cacheKey = `${word.trim()}-${accent}-${isMale}-${speed}`;

    try {
      updateState({ isLoading: true });
      setIsPlaying(true);

      if (cacheRef.current[cacheKey]) {
        const cachedData = cacheRef.current[cacheKey];
        updateState({
          phonetic: cachedData.phonetic,
          meanings: cachedData.meanings,
          examples: cachedData.examples,
          synonyms: cachedData.synonyms,
          antonyms: cachedData.antonyms,
          hasPronounced: true,
          isLoading: false,
        });

        if (cachedData.audioUrl) {
          audioRef.current.src = cachedData.audioUrl;
          audioRef.current.play();
          audioRef.current.onended = () => setIsPlaying(false);
        } else {
          setIsPlaying(false);
        }
        return;
      }

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
            speed,
          }),
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
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
      const examples =
        Array.isArray(data.examples) && data.examples.length > 0
          ? data.examples
          : [{ text: "No examples available for this word." }];
      const synonyms = Array.isArray(data.synonyms) ? data.synonyms : [];
      const antonyms = Array.isArray(data.antonyms) ? data.antonyms : [];

      let audioUrl = null;
      if (data.audioContent) {
        try {
          const byteArray = Uint8Array.from(atob(data.audioContent), (c) =>
            c.charCodeAt(0),
          );
          const audioBlob = new Blob([byteArray], { type: "audio/mp3" });
          audioUrl = URL.createObjectURL(audioBlob);
          audioRef.current.src = audioUrl;
          audioRef.current.preload = "auto";
          audioRef.current.oncanplaythrough = () => audioRef.current.play();
          audioRef.current.onended = () => setIsPlaying(false);
        } catch (audioError) {
          setIsPlaying(false);
          console.error("Error processing audio:", audioError);
        }
      } else {
        setIsPlaying(false);
      }

      cacheRef.current[cacheKey] = {
        phonetic,
        meanings,
        examples,
        synonyms,
        antonyms,
        audioUrl,
      };

      updateState({
        phonetic,
        meanings,
        examples,
        synonyms,
        antonyms,
        hasPronounced: true,
      });
    } catch (error) {
      setIsPlaying(false);
      console.error("Error fetching pronunciation:", error);
    } finally {
      updateState({ isLoading: false });
    }
  }, [word, accent, isMale, speed, updateState]);

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
        window.scrollTo({ top: 0, behavior: "smooth" }),
      );
    },
    [updateState],
  );

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

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") getPronunciation();
    },
    [getPronunciation],
  );

  const togglers = {
    darkMode: useCallback(
      () => updateState({ isDarkMode: !isDarkMode }),
      [updateState, isDarkMode],
    ),
    mobileMenu: useCallback(
      () => updateState({ isMobileMenuOpen: !isMobileMenuOpen }),
      [updateState, isMobileMenuOpen],
    ),
    favorite: useCallback(
      () => updateState({ isFavorite: !isFavorite }),
      [updateState, isFavorite],
    ),
  };

  useEffect(() => {
    const handleResize = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`,
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://backend-8isq.vercel.app";
    document.head.appendChild(link);

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
        {/* SEO TARGET: Primary Keywords first */}
        <title>
          Free Audio Pronunciation Tool: American, British & Indian Accents
        </title>
        <meta
          name="description"
          content="Listen to clear audio pronunciation in American, British, Australian, and Indian accents. Get free IPA phonetic transcription for any English word instantly."
        />
        <link rel="canonical" href="https://www.quickpronounce.site/" />

        {/* OPEN GRAPH (SOCIALS) */}
        <meta
          property="og:title"
          content="QuickPronounce: Free Audio in 4 English Accents"
        />
        <meta
          property="og:description"
          content="Instant audio pronunciation for any word. Compare American, British, Indian, and Australian accents for free with IPA phonetics."
        />
        <meta property="og:url" content="https://www.quickpronounce.site/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.quickpronounce.site/og-preview.png"
        />

        {/* JSON-LD: Added SoftwareApplication to target high-CTR "Tool" queries */}
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://www.quickpronounce.site/",
              name: "QuickPronounce",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.quickpronounce.site/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "QuickPronounce",
              operatingSystem: "Any",
              applicationCategory: "EducationalApplication",
              featureList:
                "Audio pronunciation, Multiple accents (AmE, BrE, InE, AuE), IPA Phonetics",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            },
          ])}
        </script>
      </Helmet>

      {process.env.NODE_ENV === "production" && (
        <Suspense fallback={null}>
          <Analytics />
          <SpeedInsights />
        </Suspense>
      )}

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
            antonyms={antonyms}
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
            isPlaying={isPlaying}
          />
        </div>

        <FloatButton
          onClick={getPronunciation}
          disabled={isLoading}
          isLoading={isLoading}
          word={word}
        />
      </main>

      {/* SEO BOOST: Visible keyword anchors for high-impression accent queries */}
      <div
        className="accent-seo-anchor"
        style={{
          textAlign: "center",
          marginTop: "1rem",
          marginBottom: "2rem",
          fontSize: "0.95rem",
          opacity: 0.7,
        }}
      >
        Learn how to pronounce in <strong>American English</strong>,{" "}
        <strong>British English</strong>, <strong>Indian English</strong>, and{" "}
        <strong>Australian accents</strong>.
      </div>

      <Suspense fallback={null}>
        {hasPronounced && <ExamplesList examples={examples} />}
      </Suspense>

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
