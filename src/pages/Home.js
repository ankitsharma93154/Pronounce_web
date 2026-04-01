import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useMemo,
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
import useDebouncedCallback from "../hooks/useDebouncedCallback";
import usePersistentCache from "../hooks/usePersistentCache";

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
const SEARCH_DEBOUNCE_MS = 400;
const CACHE_STORAGE_KEY = "quickpronounce_pronunciation_cache_v1";
const CACHE_MAX_ENTRIES = 40;
const RATE_LIMIT_WINDOW_MS = 1000;
const MAX_REQUESTS_PER_WINDOW = 2;
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
      "You can read the article on 50 most mispronounced words by learners and listen to correct pronunciations to understand the right sound pattern.",
  },
  {
    to: "/blog/ipa-guide",
    title: "Read IPA phonetic pronunciation clearly",
    description:
      "You should check out the IPA guide to understand how symbols represent sounds, how stress marks show syllable emphasis, and how syllable breaks indicate word rhythm.",
  },
  {
    to: "/blog/american-vs-british",
    title: "Compare American vs British pronunciation audio",
    description:
      "Explore the key sound differences between American and British English with audio examples that highlight vowel shifts, stress patterns, and common pronunciation variations.",
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
      "Type any word to hear its pronunciation in English instantly. QuickPronounce gives you access to audio, IPA, and accent options so you can check the pronunciation of words across American, British, Australian, and Indian English.",
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
  const activeAudioUrlRef = useRef(null);
  const activeRequestControllerRef = useRef(null);
  const requestTimestampsRef = useRef([]);
  const lastRequestKeyRef = useRef("");
  const cache = usePersistentCache(CACHE_STORAGE_KEY, CACHE_MAX_ENTRIES);

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

  const normalizeWord = useCallback(
    (value) => sanitizeWord(value).trim().toLowerCase(),
    [sanitizeWord],
  );

  const buildRequestKey = useCallback(
    (normalizedWord) => `${normalizedWord}-${accent}-${isMale}-${speed}`,
    [accent, isMale, speed],
  );

  const isRateLimited = useCallback(() => {
    const now = Date.now();
    const validWindow = requestTimestampsRef.current.filter(
      (ts) => now - ts < RATE_LIMIT_WINDOW_MS,
    );
    requestTimestampsRef.current = validWindow;
    return validWindow.length >= MAX_REQUESTS_PER_WINDOW;
  }, []);

  const rememberRequestTimestamp = useCallback(() => {
    requestTimestampsRef.current = [
      ...requestTimestampsRef.current,
      Date.now(),
    ];
  }, []);

  const trackCacheLookup = useCallback(
    (isHit, normalizedWord) => {
      if (typeof window === "undefined" || !window.umami) return;

      try {
        window.umami.track("pronunciation_cache_lookup", {
          cache_hit: isHit,
          query_length: normalizedWord.length,
          accent,
          speed,
          gender: isMale ? "male" : "female",
        });
      } catch (_) {
        // Ignore analytics runtime issues to avoid affecting user flow.
      }
    },
    [accent, speed, isMale],
  );

  const playAudioFromContent = useCallback((audioContent) => {
    if (!audioContent) {
      setIsPlaying(false);
      return;
    }

    try {
      if (activeAudioUrlRef.current) {
        URL.revokeObjectURL(activeAudioUrlRef.current);
        activeAudioUrlRef.current = null;
      }

      const byteArray = Uint8Array.from(atob(audioContent), (c) =>
        c.charCodeAt(0),
      );
      const audioBlob = new Blob([byteArray], { type: "audio/mp3" });
      const audioUrl = URL.createObjectURL(audioBlob);
      activeAudioUrlRef.current = audioUrl;

      audioRef.current.src = audioUrl;
      audioRef.current.preload = "auto";
      audioRef.current.oncanplaythrough = () => audioRef.current.play();
      audioRef.current.onended = () => setIsPlaying(false);
    } catch (_) {
      setIsPlaying(false);
    }
  }, []);

  const applyPronunciationResult = useCallback(
    (data, requestKey, normalizedWord) => {
      const safeMeanings =
        Array.isArray(data.meanings) && data.meanings.length > 0
          ? data.meanings
          : [
              `${
                /^[A-Z][a-z]+$/.test(normalizedWord)
                  ? "This looks like a name! "
                  : ""
              }Hmm... we couldn't find a meaning for this word. Try another word!`,
            ];
      const safeExamples =
        Array.isArray(data.examples) && data.examples.length > 0
          ? data.examples
          : [{ text: "No examples available for this word." }];

      const result = {
        phonetic: data.phonetic || "Phonetic transcription not available.",
        meanings: safeMeanings,
        examples: safeExamples,
        synonyms: Array.isArray(data.synonyms) ? data.synonyms : [],
        antonyms: Array.isArray(data.antonyms) ? data.antonyms : [],
        syllables: Array.isArray(data.syllables) ? data.syllables : [],
        audioContent: data.audioContent || null,
      };

      cache.set(requestKey, result);
      lastRequestKeyRef.current = requestKey;

      updateState({
        phonetic: result.phonetic,
        meanings: result.meanings,
        examples: result.examples,
        synonyms: result.synonyms,
        antonyms: result.antonyms,
        syllables: result.syllables,
        hasPronounced: true,
      });

      playAudioFromContent(result.audioContent);
    },
    [cache, playAudioFromContent, updateState],
  );

  const executePronunciationRequest = useCallback(
    async (rawWord, { bypassRateLimit = false } = {}) => {
      const normalizedWord = normalizeWord(rawWord);
      if (!normalizedWord) return;

      const requestKey = buildRequestKey(normalizedWord);
      const cached = cache.get(requestKey);

      if (cached) {
        trackCacheLookup(true, normalizedWord);
      }

      if (requestKey === lastRequestKeyRef.current) {
        if (cached) {
          updateState({
            phonetic: cached.phonetic,
            meanings: cached.meanings,
            examples: cached.examples,
            synonyms: cached.synonyms,
            antonyms: cached.antonyms,
            syllables: cached.syllables,
            hasPronounced: true,
            isLoading: false,
          });
          playAudioFromContent(cached.audioContent);
        }
        return;
      }

      if (!bypassRateLimit && isRateLimited()) {
        return;
      }

      if (cached) {
        updateState({
          phonetic: cached.phonetic,
          meanings: cached.meanings,
          examples: cached.examples,
          synonyms: cached.synonyms,
          antonyms: cached.antonyms,
          syllables: cached.syllables,
          hasPronounced: true,
          isLoading: false,
        });

        playAudioFromContent(cached.audioContent);
        lastRequestKeyRef.current = requestKey;
        return;
      }

      trackCacheLookup(false, normalizedWord);

      if (activeRequestControllerRef.current) {
        activeRequestControllerRef.current.abort();
      }

      const controller = new AbortController();
      activeRequestControllerRef.current = controller;
      rememberRequestTimestamp();

      try {
        updateState({ isLoading: true });
        setIsPlaying(true);

        const requestBody = {
          word: normalizedWord,
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
          const getTimeoutId = setTimeout(
            () => controller.abort(),
            REQUEST_TIMEOUT_MS,
          );

          response = await fetch(
            `${BACKEND_PRONUNCIATION_URL}?${queryString}`,
            {
              method: "GET",
              signal: controller.signal,
            },
          );

          clearTimeout(getTimeoutId);
        } catch (_) {
          response = null;
        }

        if (!response || !response.ok) {
          const postTimeoutId = setTimeout(
            () => controller.abort(),
            REQUEST_TIMEOUT_MS,
          );

          response = await fetch(BACKEND_PRONUNCIATION_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
            signal: controller.signal,
          });

          clearTimeout(postTimeoutId);
        }

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        applyPronunciationResult(data, requestKey, normalizedWord);
      } catch (error) {
        if (error?.name !== "AbortError") {
          setIsPlaying(false);
        }
      } finally {
        if (activeRequestControllerRef.current === controller) {
          activeRequestControllerRef.current = null;
        }
        updateState({ isLoading: false });
      }
    },
    [
      normalizeWord,
      buildRequestKey,
      isRateLimited,
      cache,
      updateState,
      playAudioFromContent,
      rememberRequestTimestamp,
      accent,
      isMale,
      speed,
      applyPronunciationResult,
      trackCacheLookup,
    ],
  );

  const { debouncedCallback: debouncedSearch, cancel: cancelDebouncedSearch } =
    useDebouncedCallback(executePronunciationRequest, SEARCH_DEBOUNCE_MS);

  const getPronunciation = useCallback(() => {
    cancelDebouncedSearch();
    executePronunciationRequest(word);
  }, [cancelDebouncedSearch, executePronunciationRequest, word]);

  const pronounce = useCallback(
    (selectedWord) => {
      const safeWord = sanitizeWord(selectedWord);
      updateState({ word: safeWord });
      debouncedSearch(safeWord);
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: "smooth" }),
      );
    },
    [updateState, sanitizeWord, debouncedSearch],
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
      if (e.key === "Enter") {
        e.preventDefault();
        getPronunciation();
      }
    },
    [getPronunciation],
  );

  const togglers = useMemo(
    () => ({
      darkMode: () => updateState({ isDarkMode: !isDarkMode }),
      mobileMenu: () => updateState({ isMobileMenuOpen: !isMobileMenuOpen }),
      favorite: () => updateState({ isFavorite: !isFavorite }),
    }),
    [updateState, isDarkMode, isMobileMenuOpen, isFavorite],
  );

  useEffect(
    () => () => {
      cancelDebouncedSearch();
      if (activeRequestControllerRef.current) {
        activeRequestControllerRef.current.abort();
      }
      if (activeAudioUrlRef.current) {
        URL.revokeObjectURL(activeAudioUrlRef.current);
        activeAudioUrlRef.current = null;
      }
    },
    [cancelDebouncedSearch],
  );

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
          <Suspense
            fallback={
              <div
                className="loading-placeholder"
                style={{ height: "260px" }}
              ></div>
            }
          >
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
                  You can explore practical guides on pronunciation, accent
                  differences, and sound-focused practice routines to improve
                  your English pronunciation skills effectively.
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
