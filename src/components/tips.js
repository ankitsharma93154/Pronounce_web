import React, { useState } from "react";

const QuickPronounceTips = () => {
  const [activeTab, setActiveTab] = useState("getting-started");
  const [expandedSubsections, setExpandedSubsections] = useState({});

  const toggleSubsection = (sectionId) => {
    setExpandedSubsections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: "🚀",
      content: (
        <ol className="tips-list">
          <li>
            <strong>Enter any word</strong> in the search box and hit enter or
            click the pronunciation button.
          </li>
          <li>
            <strong>Listen to the default pronunciation</strong> (American
            English, male voice).
          </li>
          <li>
            <strong>View the phonetic transcription</strong> (IPA) to understand
            the sound components of the word.
          </li>
          <li>
            <strong>Read the meaning, synonyms, and antonyms</strong> to fully
            understand the word's usage.
          </li>
        </ol>
      ),
    },
    {
      id: "advanced-features",
      title: "Advanced Features",
      icon: "⚙️",
      subsections: [
        {
          id: "accents",
          title: "Exploring Different Accents",
          content: (
            <>
              <p>
                QuickPronounce offers pronunciation in four major English
                accents:
              </p>
              <ul className="tips-list">
                <li>
                  <strong>American English</strong> - Standard US pronunciation
                </li>
                <li>
                  <strong>British English</strong> - Standard UK pronunciation
                </li>
                <li>
                  <strong>Australian English</strong> - Standard Australian
                  pronunciation
                </li>
                <li>
                  <strong>Indian English</strong> - Standard Indian
                  pronunciation
                </li>
              </ul>
              <p className="pro-tip">
                <strong>Pro Tip:</strong> Compare pronunciations across
                different accents to train your ear for global communication.
              </p>
            </>
          ),
        },
        {
          id: "voices",
          title: "Voice Options",
          content: (
            <>
              <p>Toggle between male and female voices for each accent:</p>
              <ul className="tips-list">
                <li>
                  Use the interactive toggle to switch between voice types
                </li>
                <li>
                  Listen to the same word pronounced by different voices to
                  catch subtle variations
                </li>
              </ul>
              <p className="pro-tip">
                <strong>Pro Tip:</strong> Some learners find certain voice types
                easier to understand or mimic.
              </p>
            </>
          ),
        },
      ],
    },
    {
      id: "learning-strategies",
      title: "Learning Strategies",
      icon: "📚",
      subsections: [
        {
          id: "esl-learners",
          title: "For English Language Learners",
          content: (
            <ol className="tips-list">
              <li>
                <strong>Shadow Practice</strong> - Play the pronunciation, then
                immediately try to repeat it exactly.
              </li>
              <li>
                <strong>Focus on Problematic Sounds</strong> - Use
                QuickPronounce to master specific sounds that are challenging in
                your native language.
              </li>
              <li>
                <strong>Create Pronunciation Lists</strong> - Bookmark difficult
                words and practice them daily.
              </li>
              <li>
                <strong>Accent Training</strong> - If you're targeting a
                specific accent for work or travel, use that accent option
                consistently.
              </li>
            </ol>
          ),
        },
        {
          id: "speakers",
          title: "For Public Speakers and Presenters",
          content: (
            <ol className="tips-list">
              <li>
                <strong>Check Unfamiliar Terms</strong> - Ensure you're
                correctly pronouncing technical terms or names in your
                presentations.
              </li>
              <li>
                <strong>Compare Accent Options</strong> - Choose the most
                appropriate pronunciation for your audience.
              </li>
              <li>
                <strong>Practice with IPA</strong> - Understanding phonetic
                symbols helps you pronounce new words correctly the first time.
              </li>
            </ol>
          ),
        },
        {
          id: "vocab-building",
          title: "For Vocabulary Building",
          content: (
            <ol className="tips-list">
              <li>
                <strong>Word Families</strong> - When looking up a word, also
                check the pronunciation of related words.
              </li>
              <li>
                <strong>Synonym Exploration</strong> - Use the synonyms feature
                to discover and learn new words with similar meanings.
              </li>
              <li>
                <strong>Antonym Understanding</strong> - Explore opposite
                meanings to strengthen your vocabulary network.
              </li>
            </ol>
          ),
        },
      ],
    },
    {
      id: "phonetics",
      title: "Using Phonetics",
      icon: "🔍",
      content: (
        <div className="section-content">
          <p>
            The International Phonetic Alphabet (IPA) transcription provides a
            universal way to represent pronunciation:
          </p>
          <ol className="tips-list">
            <li>
              <strong>Learn Basic IPA Symbols</strong> - Familiarize yourself
              with common English phonetic symbols.
            </li>
            <li>
              <strong>Connect Symbols to Sounds</strong> - Listen to the
              pronunciation while following along with the IPA.
            </li>
            <li>
              <strong>Notice Patterns</strong> - The same sounds are always
              represented by the same symbols, helping you recognize patterns.
            </li>
          </ol>
          <p className="pro-tip">
            <strong>Pro Tip:</strong> Understanding IPA can help you pronounce
            words correctly even without hearing them!
          </p>
        </div>
      ),
    },
    {
      id: "daily-practice",
      title: "Daily Practice",
      icon: "📅",
      content: (
        <ol className="tips-list">
          <li>
            <strong>Word of the Day</strong> - Learn one new word's
            pronunciation daily.
          </li>
          <li>
            <strong>Accent Challenge</strong> - Practice the same set of words
            across all four accents.
          </li>
          <li>
            <strong>Minimal Pairs Practice</strong> - Use QuickPronounce to
            master similar-sounding words (like "ship" vs. "sheep").
          </li>
          <li>
            <strong>Recording Sessions</strong> - Record yourself pronouncing
            words after listening to QuickPronounce, then compare.
          </li>
        </ol>
      ),
    },
    {
      id: "technical-tips",
      title: "Technical Tips",
      icon: "🔧",
      content: (
        <ol className="tips-list">
          <li>
            <strong>Use Headphones</strong> - For better audio clarity,
            especially when learning subtle pronunciation differences.
          </li>
          <li>
            <strong>Adjust Volume</strong> - Ensure you can hear both quiet
            consonants and louder vowel sounds.
          </li>
          <li>
            <strong>Bookmark Functionality</strong> - Save frequently used or
            difficult words for quick access.
          </li>
          <li>
            <strong>Mobile Usage</strong> - QuickPronounce works on mobile
            devices, allowing for practice anywhere.
          </li>
        </ol>
      ),
    },
    {
      id: "for-teachers",
      title: "For Teachers",
      icon: "👩‍🏫",
      content: (
        <ol className="tips-list">
          <li>
            <strong>Classroom Integration</strong> - Display QuickPronounce on a
            projector for group pronunciation practice.
          </li>
          <li>
            <strong>Pronunciation Quizzes</strong> - Create listening exercises
            based on different accent options.
          </li>
          <li>
            <strong>Vocabulary Expansion</strong> - Use the synonyms and
            antonyms features for vocabulary building exercises.
          </li>
        </ol>
      ),
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: "🔧",
      content: (
        <ol className="tips-list">
          <li>
            <strong>Audio Not Playing</strong> - Ensure your device's sound is
            turned on and try refreshing the page.
          </li>
          <li>
            <strong>Word Not Found</strong> - Check spelling or try a similar
            word.
          </li>
          <li>
            <strong>Slow Loading</strong> - A stable internet connection is
            required for optimal performance.
          </li>
        </ol>
      ),
    },
  ];

  return (
    <div className="tips-container bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">
            Master QuickPronounce
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Your complete guide to mastering word pronunciation across different
            English accents
          </p>

          {/* Tab Navigation */}
          <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
            <div className="flex space-x-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    activeTab === section.id
                      ? "bg-indigo-600 text-white font-medium"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-gray-50 rounded-lg p-6">
            {sections.map((section) => (
              <div
                key={section.id}
                className={`${activeTab === section.id ? "block" : "hidden"}`}
              >
                <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center">
                  <span className="mr-2">{section.icon}</span>
                  {section.title}
                </h2>

                {section.subsections ? (
                  <div className="space-y-4">
                    {section.subsections.map((subsection) => (
                      <div
                        key={subsection.id}
                        className="bg-white rounded-lg shadow-sm overflow-hidden"
                      >
                        <button
                          onClick={() => toggleSubsection(subsection.id)}
                          className="w-full flex justify-between items-center p-4 text-left font-medium hover:bg-gray-50"
                        >
                          <span>{subsection.title}</span>
                          <span className="text-indigo-600">
                            {expandedSubsections[subsection.id] ? "−" : "+"}
                          </span>
                        </button>
                        {expandedSubsections[subsection.id] && (
                          <div className="p-4 border-t border-gray-100">
                            {subsection.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-2">
              We're constantly improving QuickPronounce to enhance your learning
              experience.
            </p>
            <p className="text-indigo-600 font-medium">Happy learning!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickPronounceTips;
