import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  lazy,
  Suspense,
  memo,
} from "react";
import { Link } from "react-router-dom";
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
const SupportBanner = lazy(() => import("../components/SupportBanner"));

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

const BACKEND_PRONUNCIATION_URL =
  "https://backend-8isq.vercel.app/get-pronunciation";
const REQUEST_TIMEOUT_MS = 10000;
const MAX_WORD_LENGTH = 60;

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

const featuredGuides = [
  {
    to: "/blog/pronunciation-guide",
    title: "How to pronounce difficult English words",
    description:
      "Review 50 high-frequency words learners mispronounce and hear the right sound pattern faster.",
  },
  {
    to: "/blog/IPA-guide",
    title: "Read IPA phonetic pronunciation clearly",
    description:
      "Use the IPA guide when you want to understand symbols, stress marks, and syllable breaks.",
  },
  {
    to: "/blog/american-vs-british",
    title: "Compare American vs British pronunciation audio",
    description:
      "Train your ear with the sound rules that explain accent differences across common words.",
  },
  {
    to: "/faq",
    title: "Get quick answers about pronunciation practice",
    description:
      "Find short answers on word pronunciation audio, accents, IPA, and how to practice daily.",
  },
];

const homeFaqs = [
  {
    question: "How do I pronounce a word correctly?",
    answer:
      "Type the word, play the pronunciation audio, then repeat it while checking the IPA and syllable stress. Practicing with two accents helps you hear the sound pattern more clearly.",
  },
  {
    question: "How do you pronounce words in English?",
    answer:
      "Type any word to hear its pronunciation in English instantly. QuickPronounce gives you free audio, IPA, and accent options so you can check the pronunciation of words across American, British, Australian, and Indian English.",
  },
  {
    question: "Can I compare American and British pronunciation?",
    answer:
      "Yes. You can switch between American, British, Australian, and Indian English to compare vowel sounds, stress, and rhythm for the same word.",
  },
];

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
    syllables: [],
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
    syllables,
  } = state;

  const updateState = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const [shouldPronounce, setShouldPronounce] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBelowFoldVisible, setIsBelowFoldVisible] = useState(false);
  const belowFoldRef = useRef(null);

  const handleRelationToggle = useCallback(
    (type) => {
      updateState({ showSynonyms: type === "synonyms" });
    },
    [updateState],
  );

  const sanitizeWord = useCallback(
    (value) => String(value ?? "").slice(0, MAX_WORD_LENGTH),
    [],
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
          syllables: cachedData.syllables,
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

      const requestBody = {
        word: word.trim(),
        accent,
        isMale,
        speed,
      };

      const queryString = new URLSearchParams({
        word: requestBody.word,
        accent: requestBody.accent,
        isMale: String(requestBody.isMale),
        speed: requestBody.speed,
      }).toString();

      let response;

      try {
        const getController = new AbortController();
        const getTimeoutId = setTimeout(
          () => getController.abort(),
          REQUEST_TIMEOUT_MS,
        );

        response = await fetch(`${BACKEND_PRONUNCIATION_URL}?${queryString}`, {
          method: "GET",
          signal: getController.signal,
        });

        clearTimeout(getTimeoutId);
      } catch (getError) {
        response = null;
      }

      if (!response || !response.ok) {
        const postController = new AbortController();
        const postTimeoutId = setTimeout(
          () => postController.abort(),
          REQUEST_TIMEOUT_MS,
        );

        response = await fetch(BACKEND_PRONUNCIATION_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
          signal: postController.signal,
        });

        clearTimeout(postTimeoutId);
      }

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
      const syllables = Array.isArray(data.syllables) ? data.syllables : [];

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
          // Audio processing error handled gracefully
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
        syllables,
        audioUrl,
      };

      updateState({
        phonetic,
        meanings,
        examples,
        synonyms,
        antonyms,
        syllables,
        hasPronounced: true,
      });
    } catch (error) {
      setIsPlaying(false);
      // API error handled gracefully - user still sees app
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
      updateState({ word: sanitizeWord(selectedWord) });
      setShouldPronounce(true);
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: "smooth" }),
      );
    },
    [updateState, sanitizeWord],
  );

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setIsBelowFoldVisible(true);
      return;
    }
    const sentinel = belowFoldRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsBelowFoldVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

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

    return () => {
      if (link.parentNode) {
        document.head.removeChild(link);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Pronounce Words Audio | Word Pronouncer &amp; Pronunciation Tool
        </title>
        <meta
          name="description"
          content="Pronounce words with free audio in American, British, Australian, and Indian English. Use our word pronouncer tool with IPA to hear any word instantly."
        />
        <link rel="canonical" href="https://www.quickpronounce.site/" />

        <meta
          property="og:title"
          content="Pronounce Words with Free Audio in 4 English Accents"
        />
        <meta
          property="og:description"
          content="Hear word pronunciation audio instantly, compare accents, and check IPA phonetics with one free pronunciation tool."
        />
        <meta property="og:url" content="https://www.quickpronounce.site/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.quickpronounce.site/og-preview.png"
        />

        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://www.quickpronounce.site/",
              name: "QuickPronounce",
            },
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "QuickPronounce",
              operatingSystem: "Any",
              applicationCategory: "EducationalApplication",
              featureList:
                "Word pronunciation audio, Multiple accents (American, British, Australian, Indian), IPA phonetics, meanings and examples",
              description:
                "A free word pronouncer tool for hearing pronunciation audio, comparing English accents, and checking IPA.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: homeFaqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
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
        {hasPronounced && <SupportBanner show={true} />}

        <div className="interface-grid">
          <InputCard
            word={word}
            setWord={(nextWord) =>
              updateState({ word: sanitizeWord(nextWord) })
            }
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
            maxWordLength={MAX_WORD_LENGTH}
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
            syllables={syllables}
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

      {/* Sentinel: below-fold content loads once this enters the viewport */}
      <div ref={belowFoldRef} />

      {isBelowFoldVisible && (
        <>
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

          <section
            className="home-seo-section container"
            aria-labelledby="home-intent-title"
          >
            <p className="home-seo-anchor">
              Practice clear pronunciation with audio in{" "}
              <strong>American</strong>, <strong>British</strong>,{" "}
              <strong>Indian</strong>, and <strong>Australian</strong> English,
              then use IPA and examples to reinforce each word.
            </p>

            <div className="home-seo-stack">
              <div className="home-seo-panel home-seo-intent-panel">
                <h2 className="about-page-section-title" id="home-intent-title">
                  How to pronounce a word correctly
                </h2>
                <div className="home-intent-grid">
                  <div className="home-seo-card">
                    <p>
                      Start with audio, then check IPA, then repeat aloud while
                      matching stress and rhythm. This simple sequence helps you
                      hear the target sound first and reproduce it more
                      naturally.
                    </p>
                    <ol className="home-intent-steps">
                      <li>Enter the word or phrase you want to pronounce.</li>
                      <li>
                        Play the pronunciation audio in your target accent.
                      </li>
                      <li>
                        Check the IPA and examples, then repeat the word
                        naturally.
                      </li>
                    </ol>
                  </div>

                  <div className="home-seo-card">
                    <h3>Why learners use this pronunciation tool</h3>
                    <p>
                      QuickPronounce is built for fast daily practice: hear the
                      word, compare accents, and use phonetic support without
                      switching between multiple websites.
                    </p>
                    <ul className="home-intent-points">
                      <li>
                        Free pronunciation audio for common, academic, and
                        tricky words
                      </li>
                      <li>
                        IPA phonetic transcription to support pronunciation in
                        English
                      </li>
                      <li>
                        Accent switching for American, British, Australian, and
                        Indian English
                      </li>
                      <li>
                        Word meanings and examples that make pronunciation
                        easier to remember
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className="home-seo-panel"
                aria-labelledby="home-guides-title"
              >
                <h2 className="about-page-section-title" id="home-guides-title">
                  Popular pronunciation guides
                </h2>
                <p className="home-guides-subtitle">
                  Go deeper with practical guides on pronunciation, accent
                  differences, and sound-focused practice routines.
                </p>
                <div className="home-guides-grid">
                  {featuredGuides.map((guide) => (
                    <Link
                      key={guide.to}
                      to={guide.to}
                      className="home-guide-link"
                    >
                      <h3>{guide.title}</h3>
                      <p>{guide.description}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="home-seo-panel" aria-labelledby="home-faq-title">
                <h2 className="about-page-section-title" id="home-faq-title">
                  Common pronunciation questions
                </h2>
                <div className="home-faq-grid">
                  {homeFaqs.map((faq) => (
                    <article key={faq.question} className="home-faq-card">
                      <h3>{faq.question}</h3>
                      <p>{faq.answer}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

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
      )}
    </>
  );
};

export default Home;
