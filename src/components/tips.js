import React, {
  useState,
  useRef,
  useEffect,
  memo,
  useMemo,
  useCallback,
} from "react";

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
  }
);

// Memoized content for each tab to prevent unnecessary re-renders
const GettingStartedContent = memo(() => (
  <ol className="tips-list">
    <li>
      <strong>Enter any word</strong> in the search box and hit enter or click
      the pronunciation button.
    </li>
    <li>
      <strong>Listen to the default pronunciation</strong> (American English,
      male voice).
    </li>
    <li>
      <strong>View the phonetic transcription</strong> (IPA) to understand the
      sound components of the word.
    </li>
    <li>
      <strong>Read the meaning, synonyms, and antonyms</strong> to fully
      understand the word's usage.
    </li>
  </ol>
));

const AccentsContent = memo(() => (
  <>
    <p>QuickPronounce offers pronunciation in four major English accents:</p>
    <ul className="tips-list">
      <li>
        <strong>American English</strong> - Standard US pronunciation
      </li>
      <li>
        <strong>British English</strong> - Standard UK pronunciation
      </li>
      <li>
        <strong>Australian English</strong> - Standard Australian pronunciation
      </li>
      <li>
        <strong>Indian English</strong> - Standard Indian pronunciation
      </li>
    </ul>
    <p className="meaning-item">
      <strong>Pro Tip:</strong> Compare pronunciations across different accents
      to train your ear for global communication.
    </p>
  </>
));

const VoicesContent = memo(() => (
  <>
    <p>Toggle between male and female voices for each accent:</p>
    <ul className="tips-list">
      <li>Use the interactive toggle to switch between voice types</li>
      <li>
        Listen to the same word pronounced by different voices to catch subtle
        variations
      </li>
    </ul>
    <p className="meaning-item">
      <strong>Pro Tip:</strong> Some learners find certain voice types easier to
      understand or mimic.
    </p>
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
      The International Phonetic Alphabet (IPA) transcription provides a
      universal way to represent pronunciation:
    </p>
    <ol className="tips-list">
      <li>
        <strong>Learn Basic IPA Symbols</strong> - Familiarize yourself with
        common English phonetic symbols.
      </li>
      <li>
        <strong>Connect Symbols to Sounds</strong> - Listen to the pronunciation
        while following along with the IPA.
      </li>
      <li>
        <strong>Notice Patterns</strong> - The same sounds are always
        represented by the same symbols, helping you recognize patterns.
      </li>
    </ol>
    <p className="meaning-item">
      <strong>Pro Tip:</strong> Understanding IPA can help you pronounce words
      correctly even without hearing them!
    </p>
  </div>
));

const DailyPracticeContent = memo(() => (
  <ol className="tips-list">
    <li>
      <strong>Word of the Day</strong> - Learn one new word's pronunciation
      daily.
    </li>
    <li>
      <strong>Accent Challenge</strong> - Practice the same set of words across
      all four accents.
    </li>
    <li>
      <strong>Minimal Pairs Practice</strong> - Use QuickPronounce to master
      similar-sounding words (like "ship" vs. "sheep").
    </li>
    <li>
      <strong>Recording Sessions</strong> - Record yourself pronouncing words
      after listening to QuickPronounce, then compare.
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
  )
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
  useEffect(() => {
    if (tabsContainerRef.current && activeTabRef.current) {
      const container = tabsContainerRef.current;
      const activeTabElement = activeTabRef.current;

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
          <h2 className="tips-title">Get the Most Out of QuickPronounce</h2>
          <p className="tips-subtitle">
            Your complete guide to mastering word pronunciation across different
            English accents
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

          {/* Call to Action */}
          <div className="cta-section">
            <p className="cta-text">
              We're constantly improving QuickPronounce to enhance your learning
              experience.
            </p>
            <p className="cta-highlight">Happy learning!</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default QuickPronounceTips;
