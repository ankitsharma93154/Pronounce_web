import React, {
  useState,
  useRef,
  useEffect,
  memo,
  useMemo,
  useCallback,
} from "react";
import { Link } from "react-router-dom";

// Define constant data outside the component to prevent recreation on each render
const SECTIONS = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "🚀",
    hasSubsections: false,
  },
  {
    id: "advanced-features",
    title: "Advanced Features",
    icon: "⚙️",
    hasSubsections: true,
    subsections: [
      { id: "accents", title: "Exploring Different Accents" },
      { id: "voices", title: "Voice Options" },
    ],
  },
  {
    id: "learning-strategies",
    title: "Learning Strategies",
    icon: "📚",
    hasSubsections: true,
    subsections: [
      { id: "esl-learners", title: "For English Language Learners" },
      { id: "speakers", title: "For Public Speakers and Presenters" },
      { id: "vocab-building", title: "For Vocabulary Building" },
    ],
  },
  {
    id: "phonetics",
    title: "Using Phonetics",
    icon: "🔍",
    hasSubsections: false,
  },
  {
    id: "daily-practice",
    title: "Daily Practice",
    icon: "📅",
    hasSubsections: false,
  },
  {
    id: "technical-tips",
    title: "Technical Tips",
    icon: "🔧",
    hasSubsections: false,
  },
  {
    id: "for-teachers",
    title: "For Teachers",
    icon: "👩‍🏫",
    hasSubsections: false,
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: "🔧",
    hasSubsections: false,
  },
];

// Memoized tab navigation component
const TabNavigation = memo(
  ({ activeTab, setActiveTab, tabsContainerRef, activeTabRef }) => {
    return (
      <div className="tabs-container" ref={tabsContainerRef}>
        <div className="tabs-wrapper">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              ref={activeTab === section.id ? activeTabRef : null}
              onClick={() => setActiveTab(section.id)}
              className={`listen-button ${
                activeTab === section.id ? "active" : ""
              }`}
            >
              <span className="tab-icon">{section.icon}</span>
              {section.title}
            </button>
          ))}
        </div>
      </div>
    );
  },
);

// Memoized content for each tab to prevent unnecessary re-renders
const GettingStartedContent = memo(() => (
  <ol className="tips-list">
    <li>
      <strong>Search for any word</strong> to hear its pronunciation and learn
      how it sounds in spoken English.
    </li>
    <li>
      <strong>Listen to the pronunciation audio</strong> using the default
      American English voice.
    </li>
    <li>
      <strong>View the IPA transcription</strong> to understand syllables,
      sounds, and word stress.
    </li>
    <li>
      <strong>Read meanings, synonyms, and examples</strong> to learn how the
      word is used in real situations.
    </li>
  </ol>
));

const AccentsContent = memo(() => (
  <>
    <>
      <p>Compare how words are pronounced across four major English accents:</p>

      <ul className="tips-list">
        <li>
          <strong>American English</strong> — Standard US pronunciation
        </li>
        <li>
          <strong>British English</strong> — Standard UK pronunciation
        </li>
        <li>
          <strong>Australian English</strong> — Australian pronunciation
        </li>
        <li>
          <strong>Indian English</strong> — Indian pronunciation patterns
        </li>
      </ul>

      <p className="meaning-item">
        <strong>Tip:</strong> Listening to multiple accents helps you understand
        pronunciation differences and improves listening skills.
      </p>
    </>
  </>
));

const VoicesContent = memo(() => (
  <>
    <>
      <p>
        Switch between male and female voices to hear different pronunciation
        styles.
      </p>

      <ul className="tips-list">
        <li>Use the voice toggle to compare different speakers.</li>
        <li>
          Listen multiple times to understand difficult sounds and stress
          patterns.
        </li>
      </ul>

      <p className="meaning-item">
        <strong>Tip:</strong> Some learners find certain voices easier to
        imitate while practicing pronunciation.
      </p>
    </>
  </>
));

const ESLLearnersContent = memo(() => (
  <ol className="tips-list">
    <li>
      <strong>Shadow Practice</strong> - Play the pronunciation, then
      immediately try to repeat it exactly.
    </li>
    <li>
      <strong>Focus on Problematic Sounds</strong> - Use QuickPronounce to
      master specific sounds that are challenging in your native language.
    </li>
    <li>
      <strong>Create Pronunciation Lists</strong> - Bookmark difficult words and
      practice them daily.
    </li>
    <li>
      <strong>Accent Training</strong> - If you're targeting a specific accent
      for work or travel, use that accent option consistently.
    </li>
  </ol>
));

const SpeakersContent = memo(() => (
  <ol className="tips-list">
    <li>
      <strong>Check Unfamiliar Terms</strong> - Ensure you're correctly
      pronouncing technical terms or names in your presentations.
    </li>
    <li>
      <strong>Compare Accent Options</strong> - Choose the most appropriate
      pronunciation for your audience.
    </li>
    <li>
      <strong>Practice with IPA</strong> - Understanding phonetic symbols helps
      you pronounce new words correctly the first time.
    </li>
  </ol>
));

const VocabBuildingContent = memo(() => (
  <ol className="tips-list">
    <li>
      <strong>Word Families</strong> - When looking up a word, also check the
      pronunciation of related words.
    </li>
    <li>
      <strong>Synonym Exploration</strong> - Use the synonyms feature to
      discover and learn new words with similar meanings.
    </li>
    <li>
      <strong>Antonym Understanding</strong> - Explore opposite meanings to
      strengthen your vocabulary network.
    </li>
  </ol>
));

const PhoneticsContent = memo(() => (
  <div className="section-content">
    <p>
      The International Phonetic Alphabet (IPA) provides a universal way to
      understand English pronunciation.
    </p>

    <ol className="tips-list">
      <li>
        <strong>Learn common IPA symbols</strong> used in English words.
      </li>

      <li>
        <strong>Match symbols with sounds</strong> while listening to the audio
        pronunciation.
      </li>

      <li>
        <strong>Recognize pronunciation patterns</strong> that appear in many
        words.
      </li>
    </ol>

    <p className="meaning-item">
      <strong>Tip:</strong> Understanding IPA helps you pronounce unfamiliar
      words correctly even before hearing them.
    </p>
  </div>
));

const DailyPracticeContent = memo(() => (
  <ol className="tips-list">
    <li>
      <strong>Learn one new word each day</strong> to improve English
      pronunciation gradually.
    </li>

    <li>
      <strong>Practice different accents</strong> to hear pronunciation
      variations.
    </li>

    <li>
      <strong>Compare similar words</strong> such as "ship" and "sheep" to
      improve listening skills.
    </li>

    <li>
      <strong>Record yourself speaking</strong> and compare your pronunciation
      with the audio.
    </li>
  </ol>
));

const TechnicalTipsContent = memo(() => (
  <ol className="tips-list">
    <li>
      <strong>Use Headphones</strong> - For better audio clarity, especially
      when learning subtle pronunciation differences.
    </li>
    <li>
      <strong>Adjust Volume</strong> - Ensure you can hear both quiet consonants
      and louder vowel sounds.
    </li>
    <li>
      <strong>Bookmark Functionality</strong> - Save frequently used or
      difficult words for quick access.
    </li>
    <li>
      <strong>Mobile Usage</strong> - QuickPronounce works on mobile devices,
      allowing for practice anywhere.
    </li>
  </ol>
));

const ForTeachersContent = memo(() => (
  <ol className="tips-list">
    <li>
      <strong>Classroom Integration</strong> - Display QuickPronounce on a
      projector for group pronunciation practice.
    </li>
    <li>
      <strong>Pronunciation Quizzes</strong> - Create listening exercises based
      on different accent options.
    </li>
    <li>
      <strong>Vocabulary Expansion</strong> - Use the synonyms and antonyms
      features for vocabulary building exercises.
    </li>
  </ol>
));

const TroubleshootingContent = memo(() => (
  <ol className="tips-list">
    <li>
      <strong>Audio Not Playing</strong> - Ensure your device's sound is turned
      on and try refreshing the page.
    </li>
    <li>
      <strong>Word Not Found</strong> - Check spelling or try a similar word.
    </li>
    <li>
      <strong>Slow Loading</strong> - A stable internet connection is required
      for optimal performance.
    </li>
  </ol>
));

// Memoized subsection component
const Subsection = memo(
  ({ id, title, isExpanded, toggleSubsection, children }) => (
    <div className="subsection-item">
      <button
        onClick={() => toggleSubsection(id)}
        className="subsection-toggle"
      >
        <span>{title}</span>
        <span className="toggle-icon">{isExpanded ? "−" : "+"}</span>
      </button>
      {isExpanded && <div className="subsection-content">{children}</div>}
    </div>
  ),
);

// Main component - memoized to prevent unnecessary re-renders
const QuickPronounceTips = memo(() => {
  const [activeTab, setActiveTab] = useState("getting-started");
  const [expandedSubsections, setExpandedSubsections] = useState({});
  const tabsContainerRef = useRef(null);
  const activeTabRef = useRef(null);

  // Memoized toggle subsection handler
  const toggleSubsection = useCallback((sectionId) => {
    setExpandedSubsections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  }, []);

  // Effect to scroll to active tab
  // Use requestAnimationFrame to avoid forced reflows
  useEffect(() => {
    if (tabsContainerRef.current && activeTabRef.current) {
      // RequestAnimationFrame batches DOM reads/writes to prevent forced reflows
      requestAnimationFrame(() => {
        const container = tabsContainerRef.current;
        const activeTabElement = activeTabRef.current;

        if (!container || !activeTabElement) return;

        // Calculate the scroll position to center the active tab
        const scrollPosition =
          activeTabElement.offsetLeft -
          container.offsetWidth / 2 +
          activeTabElement.offsetWidth / 2;

        // Scroll smoothly to the active tab
        container.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: "smooth",
        });
      });
    }
  }, [activeTab]);

  // Memoize the content for each section to prevent recreating on each render
  const renderSectionContent = useMemo(() => {
    return {
      "getting-started": <GettingStartedContent />,
      "advanced-features": (
        <div className="subsections-container">
          <Subsection
            id="accents"
            title="Exploring Different Accents"
            isExpanded={expandedSubsections["accents"]}
            toggleSubsection={toggleSubsection}
          >
            <AccentsContent />
          </Subsection>
          <Subsection
            id="voices"
            title="Voice Options"
            isExpanded={expandedSubsections["voices"]}
            toggleSubsection={toggleSubsection}
          >
            <VoicesContent />
          </Subsection>
        </div>
      ),
      "learning-strategies": (
        <div className="subsections-container">
          <Subsection
            id="esl-learners"
            title="For English Language Learners"
            isExpanded={expandedSubsections["esl-learners"]}
            toggleSubsection={toggleSubsection}
          >
            <ESLLearnersContent />
          </Subsection>
          <Subsection
            id="speakers"
            title="For Public Speakers and Presenters"
            isExpanded={expandedSubsections["speakers"]}
            toggleSubsection={toggleSubsection}
          >
            <SpeakersContent />
          </Subsection>
          <Subsection
            id="vocab-building"
            title="For Vocabulary Building"
            isExpanded={expandedSubsections["vocab-building"]}
            toggleSubsection={toggleSubsection}
          >
            <VocabBuildingContent />
          </Subsection>
        </div>
      ),
      phonetics: <PhoneticsContent />,
      "daily-practice": <DailyPracticeContent />,
      "technical-tips": <TechnicalTipsContent />,
      "for-teachers": <ForTeachersContent />,
      troubleshooting: <TroubleshootingContent />,
    };
  }, [expandedSubsections, toggleSubsection]);

  return (
    <div className="tips-container">
      <div className="tips-wrapper">
        <div className="tips-content">
          <h2 className="tips-title">
            Learn English Pronunciation Step by Step
          </h2>

          <p className="tips-subtitle">
            Learn how to pronounce English words, explore different accents,
            understand IPA symbols, and practice pronunciation with real audio.
          </p>

          {/* Tab Navigation - Memoized Component */}
          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabsContainerRef={tabsContainerRef}
            activeTabRef={activeTabRef}
          />

          {/* Content Area */}
          <div className="content-area">
            {SECTIONS.map((section) => (
              <div
                key={section.id}
                className={`content-section ${
                  activeTab === section.id ? "visible" : "hidden"
                }`}
              >
                <h2 className="section-title">
                  <span className="section-icon">{section.icon}</span>
                  {section.title}
                </h2>

                <div className="section-content-wrapper">
                  {renderSectionContent[section.id]}
                </div>
              </div>
            ))}
          </div>

          {/* From the Blog */}
          <div className="tips-blog-links">
            <p className="tips-blog-heading">From the Blog</p>
            <div className="tips-blog-grid">
              <Link to="/blog/ipa-guide" className="tips-blog-card">
                <span className="tips-blog-card__emoji">🔤</span>
                <span className="tips-blog-card__label">
                  IPA Symbols Explained
                </span>
              </Link>
              <Link to="/blog/american-vs-british" className="tips-blog-card">
                <span className="tips-blog-card__emoji">🌍</span>
                <span className="tips-blog-card__label">
                  American vs British Accents
                </span>
              </Link>
              <Link
                to="/blog/word-stress-rules-guide"
                className="tips-blog-card"
              >
                <span className="tips-blog-card__emoji">🎯</span>
                <span className="tips-blog-card__label">Word Stress Rules</span>
              </Link>
              <Link to="/blog/schwa-sound-guide" className="tips-blog-card">
                <span className="tips-blog-card__emoji">🔊</span>
                <span className="tips-blog-card__label">The Schwa Sound</span>
              </Link>
            </div>
          </div>

          {/* Call to Action */}
          <div className="cta-section">
            <p className="cta-text">
              Practice pronunciation regularly, explore different English
              accents, and build confidence speaking English.
            </p>

            <p className="cta-highlight">
              Keep listening, practicing, and improving every day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default QuickPronounceTips;
