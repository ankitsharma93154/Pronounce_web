import { Link } from "react-router-dom";
import "../Css/SilentLetters.css";
import BlogArticleTemplate from "../../components/BlogArticleTemplate";

import introImage from "../../images/silent_letters_intro.webp";
import vowelShift from "../../images/vowel_shift.webp";
import silentRules from "../../images/silent_letters_rules.webp";
import quickpronounceScreenshot from "../../images/screenshot_quickpronounce.webp";
import rightPronuncation from "../../images/Correct_pronunciation.webp";
// Helper component for the Silent Word List
const SilentWordItem = ({ word, ipa }) => (
  <div className="sk-silent-word-item">
    <span className="sk-word">{word}</span>
    <span className="sk-ipa">{ipa}</span>
  </div>
);

// Helper component for the Silent Letter Card
const SilentLetterCard = ({ letter, rule, words }) => (
  <div className="sk-silent-letter-card">
    <h3>Silent {letter}</h3>
    <p className="sk-silent-rule">{rule}</p>
    <div className="sk-silent-word-list">
      {words.map((item, index) => (
        <SilentWordItem key={index} word={item.word} ipa={item.ipa} />
      ))}
    </div>
  </div>
);

const SilentKillers = () => {
  // Data for Silent Letters
  const silentLettersData = [
    {
      letter: "B",
      rule: "The 'B' is usually silent after 'M' at the end of a word, or before 'T'.",
      words: [
        { word: "Debt", ipa: "/dɛt/" },
        { word: "Doubt", ipa: "/daʊt/" },
        { word: "Thumb", ipa: "/θʌm/" },
        { word: "Climb", ipa: "/klaɪm/" },
        { word: "Lamb", ipa: "/læm/" },
        { word: "Comb", ipa: "/koʊm/" },
      ],
    },
    {
      letter: "K",
      rule: "The 'K' is always silent before 'N' at the beginning of a word.",
      words: [
        { word: "Know", ipa: "/noʊ/" },
        { word: "Knife", ipa: "/naɪf/" },
        { word: "Knee", ipa: "/niː/" },
        { word: "Knowledge", ipa: "/ˈnɒlɪdʒ/" },
        { word: "Knight", ipa: "/naɪt/" },
        { word: "Knock", ipa: "/nɒk/" },
      ],
    },
    {
      letter: "L",
      rule: "The 'L' is often silent after the vowels 'A', 'O', and 'U'.",
      words: [
        { word: "Calm", ipa: "/kɑːm/" },
        { word: "Talk", ipa: "/tɔːk/" },
        { word: "Should", ipa: "/ʃʊd/" },
        { word: "Salmon", ipa: "/ˈsæmən/" },
        { word: "Walk", ipa: "/wɔːk/" },
        { word: "Would", ipa: "/wʊd/" },
      ],
    },
    {
      letter: "P",
      rule: "The 'P' is usually silent at the beginning of words before 'S', 'T', or 'N'.",
      words: [
        { word: "Psychology", ipa: "/saɪˈkɒlədʒi/" },
        { word: "Pneumonia", ipa: "/njuːˈmoʊniə/" },
        { word: "Receipt", ipa: "/rɪˈsiːt/" },
        { word: "Pseudonym", ipa: "/ˈsuːdənɪm/" },
      ],
    },
    {
      letter: "G",
      rule: "The 'G' is silent before 'N' at the beginning or end of words.",
      words: [
        { word: "Gnome", ipa: "/noʊm/" },
        { word: "Sign", ipa: "/saɪn/" },
        { word: "Foreign", ipa: "/ˈfɒrɪn/" },
        { word: "Design", ipa: "/dɪˈzaɪn/" },
      ],
    },
    {
      letter: "H",
      rule: "The 'H' is silent in some words, especially after 'W' or at the beginning.",
      words: [
        { word: "Hour", ipa: "/aʊər/" },
        { word: "Honest", ipa: "/ˈɒnɪst/" },
        { word: "Heir", ipa: "/ɛər/" },
        { word: "Vehicle", ipa: "/ˈviːəkəl/" },
      ],
    },
    {
      letter: "T",
      rule: "The 'T' is silent in many common words, especially in the middle of a word.",
      words: [
        { word: "Listen", ipa: "/ˈlɪsən/" },
        { word: "Castle", ipa: "/ˈkɑːsəl/" },
        { word: "Whistle", ipa: "/ˈwɪsəl/" },
        { word: "Christmas", ipa: "/ˈkrɪsməs/" },
        { word: "Fasten", ipa: "/ˈfæsən/" },
      ],
    },
    {
      letter: "W",
      rule: "The 'W' is silent at the beginning of a word before 'R'.",
      words: [
        { word: "Write", ipa: "/raɪt/" },
        { word: "Wrong", ipa: "/rɒŋ/" },
        { word: "Answer", ipa: "/ˈɑːnsər/" },
        { word: "Sword", ipa: "/sɔːrd/" },
        { word: "Wreck", ipa: "/rɛk/" },
      ],
    },
  ];

  const commonMistakes = [
    {
      word: "February",
      wrong: "Feb-roo-ary",
      correct: "/ˈfɛbruəri/",
      tip: "The first 'r' is often dropped in casual speech",
    },
    {
      word: "Wednesday",
      wrong: "Wed-nes-day",
      correct: "/ˈwɛnzdeɪ/",
      tip: "The 'd' after 'n' is silent",
    },
    {
      word: "Colonel",
      wrong: "Col-o-nel",
      correct: "/ˈkɜːrnəl/",
      tip: "Pronounced like 'kernel' - silent 'l' and 'o'",
    },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Silent Letters in English: Complete Guide to Pronunciation Rules & Common Words",
    description:
      "A comprehensive guide to mastering silent letters in English pronunciation, including IPA transcriptions, pronunciation rules, and practical examples for over 50 common words.",
    image:
      "https://www.quickpronounce.site/images/silent-letters-guide-banner.jpg",
    datePublished: "2025-01-05",
    dateModified: "2025-01-05",
    url: "https://www.quickpronounce.site/blog/silent-letters-pronunciation-guide",
    author: {
      "@type": "Organization",
      name: "QuickPronounce Team",
    },
    publisher: {
      "@type": "Organization",
      name: "QuickPronounce",
      logo: {
        "@type": "ImageObject",
        url: "https://www.quickpronounce.site/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":
        "https://www.quickpronounce.site/blog/silent-letters-pronunciation-guide",
    },
    keywords:
      "silent letters, english pronunciation, IPA, phonetics, pronunciation guide",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are silent letters in English?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Silent letters are letters in words that are written but not pronounced. Examples include the 'k' in 'knife', the 'b' in 'debt', and the 'l' in 'salmon'. They exist primarily due to the historical evolution of English and borrowing from other languages.",
        },
      },
      {
        "@type": "Question",
        name: "How do I know which letters are silent in English words?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The best way to identify silent letters is to check the International Phonetic Alphabet (IPA) transcription of a word. If a letter doesn't appear in the IPA, it's silent. Common patterns include: silent 'k' before 'n', silent 'b' after 'm', and silent 'w' before 'r'.",
        },
      },
    ],
  };

  const seo = {
    pageTitle:
      "Silent Letters in English: Complete Guide to Pronunciation Rules & Common Words (2025)",
    description:
      "Master silent letters in English pronunciation! Learn rules for silent B, K, L, P, G, H, T, W with IPA examples. Stop mispronouncing debt, island, knife & more. Free pronunciation checker included.",
    canonicalUrl:
      "https://www.quickpronounce.site/blog/silent-letters-pronunciation-guide",
    ogTitle: "Silent Letters in English: Complete Pronunciation Guide",
    ogDescription:
      "Master silent letters with our comprehensive guide. Learn pronunciation rules for 50+ common words with silent B, K, L, P, and more.",
    ogImage:
      "https://www.quickpronounce.site/images/silent-letters-guide-banner.jpg",
    extraMeta: [
      {
        name: "keywords",
        content:
          "silent letters in english, pronunciation guide, IPA pronunciation, silent b words, silent k words, english pronunciation rules, how to pronounce silent letters, pronunciation checker, phonetic alphabet, learn english pronunciation",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content:
          "https://www.quickpronounce.site/images/silent-letters-guide-banner.jpg",
      },
    ],
    structuredData: [articleSchema, faqSchema],
  };

  return (
    <BlogArticleTemplate
      seo={seo}
      category="Pronunciation Guide"
      title="Silent Letters in English: Complete Pronunciation Guide for Learners & Native Speakers"
      author="By QuickPronounce Team"
      readTime="10 min read"
      date="January 2026"
      heroImage={introImage}
      heroImageAlt="Silent letters in English illustration"
      cta={{
        title: "Ready to Stop Guessing?",
        description:
          "Use QuickPronounce's free pronunciation checker to instantly verify any word with IPA and audio in multiple accents.",
        buttonLabel: "Check Your Pronunciation Now",
        buttonHref: "/",
      }}
    >
      <div className="sk-silent-killers-guide">
        <main className="container sk-silent-guide-content">
          {/* Table of Contents */}
          <nav className="sk-toc-section">
            <h2>Table of Contents</h2>
            <ul className="sk-toc-list">
              <li>
                <a href="#what-are-silent-letters">What Are Silent Letters?</a>
              </li>
              <li>
                <a href="#why-silent-letters">
                  Why Does English Have Silent Letters?
                </a>
              </li>
              <li>
                <a href="#silent-letter-rules">
                  8 Silent Letter Rules You Must Know
                </a>
              </li>
              <li>
                <a href="#common-mistakes">Top 3 Most Mispronounced Words</a>
              </li>
              <li>
                <a href="#how-to-master">How to Master Silent Letters</a>
              </li>
              <li>
                <a href="#practice-tips">Practice Tips & Resources</a>
              </li>
            </ul>
          </nav>

          {/* Introduction Section */}
          <section
            id="what-are-silent-letters"
            className="sk-silent-intro-section"
          >
            <h2>What Are Silent Letters in English?</h2>
            <p>
              Are you pronouncing <strong>'deb-t'</strong> with a hard 'b'
              sound? Walking on an <strong>'is-land'</strong> with an 's'? If
              you've ever struggled with words where a letter is written but not
              spoken, you've encountered one of English's most frustrating
              quirks: <strong>silent letters</strong>.
            </p>
            <p>
              Silent letters are{" "}
              <strong>
                letters that appear in the spelling of a word but produce no
                sound when spoken
              </strong>
              . They're invisible to the ear but visible to the eye, creating a
              disconnect between written and spoken English that trips up both
              learners and native speakers.
            </p>

            <div className="sk-highlight-box">
              <h4>Quick Facts About Silent Letters:</h4>
              <ul>
                <li>
                  Over 60% of English words contain at least one silent letter
                </li>
                <li>
                  The most common silent letters are: E, B, K, L, P, G, H, T, W
                </li>
                <li>
                  Silent letters are remnants of Old English and borrowed
                  languages
                </li>
                <li>
                  Learning IPA (International Phonetic Alphabet) is the key to
                  mastering them
                </li>
              </ul>
            </div>

            <p>
              This comprehensive guide will explain <em>why</em> these silent
              letters exist, teach you the 8 most important pronunciation rules,
              and show you <em>how</em> to use QuickPronounce's IPA-based
              pronunciation checker to never mispronounce a word again.
            </p>
          </section>

          {/* History Section */}
          <section
            id="why-silent-letters"
            className="sk-silent-history-section"
          >
            <h2>Why Does English Have Silent Letters?</h2>
            <p>
              The existence of silent letters isn't a random quirk—it's a
              fascinating story rooted in the{" "}
              <strong>historical evolution of the English language</strong>.
              Understanding the "why" helps you remember the "how."
            </p>

            <div className="sk-silent-history-box">
              <h3>1. Etymology: Borrowing from Other Languages</h3>
              <p>
                English is a linguistic melting pot. Many silent letters are
                remnants of words borrowed from Latin, Greek, French, and other
                languages. When English adopted these words, it often kept the
                original spelling even after pronunciation changed.
              </p>
              <ul className="sk-history-list">
                <li>
                  <strong>'Psychology'</strong> (silent P): From Greek{" "}
                  <em>psyche</em> (ψυχή)
                </li>
                <li>
                  <strong>'Debt'</strong> (silent B): From Latin{" "}
                  <em>debitum</em>
                </li>
                <li>
                  <strong>'Receipt'</strong> (silent P): From Latin{" "}
                  <em>receptum</em>
                </li>
                <li>
                  <strong>'Island'</strong> (silent S): Actually an Old English
                  word <em>igland</em>, but the 's' was added later to make it
                  look more like Latin <em>insula</em>
                </li>
              </ul>
            </div>

            <div className="sk-silent-history-box">
              <h3>2. The Great Vowel Shift (1400-1700)</h3>
              <p>
                Between the 15th and 18th centuries, English pronunciation
                underwent massive changes called the{" "}
                <strong>Great Vowel Shift</strong>. Vowel sounds changed
                dramatically, but spelling largely stayed the same. This left
                behind many consonants that were once pronounced but are now
                silent.
              </p>
              <ul className="sk-history-list">
                <li>
                  <strong>'Knight'</strong>: In Old English (<em>cniht</em>),
                  both the 'k' and 'gh' were pronounced
                </li>
                <li>
                  <strong>'Knife'</strong>: Originally pronounced with a hard
                  'k' sound
                </li>
                <li>
                  <strong>'Gnome'</strong>: The 'g' was once pronounced in Greek
                </li>
              </ul>
            </div>

            <img
              src={vowelShift}
              alt="Great Vowel Shift Illustration"
              className="sk-vowel-shift-image"
            />

            <div className="sk-key-takeaway">
              <strong>Key Takeaway:</strong> English spelling is a historical
              record of where words came from. The IPA (International Phonetic
              Alphabet) is the current sound record of how they're pronounced
              today. This is why relying on IPA transcription is the only
              foolproof way to know correct pronunciation.
            </div>
          </section>

          {/* Silent Letter Rules Section */}
          <section id="silent-letter-rules" className="sk-silent-words-section">
            <h2>8 Silent Letter Rules Every English Speaker Must Know</h2>
            <p>
              While English pronunciation can seem chaotic, there are{" "}
              <strong>predictable patterns</strong> for silent letters. Master
              these 8 rules, and you'll be able to pronounce thousands of words
              correctly.
            </p>

            <img
              src={silentRules}
              alt="Silent Letter Rules Illustration"
              className="sk-silent-rules-image"
            />

            <div className="sk-silent-letter-card-grid">
              {silentLettersData.map((data, index) => (
                <SilentLetterCard key={index} {...data} />
              ))}
            </div>

            <div className="sk-pro-tip-box">
              <h3>Pro Tip: The "Doubt Test"</h3>
              <p>
                When you encounter unfamiliar words with these letter
                combinations, always suspect a silent letter:
              </p>
              <ul>
                <li>
                  <strong>KN-</strong> at the start (knife, know)
                </li>
                <li>
                  <strong>-MB</strong> at the end (climb, thumb)
                </li>
                <li>
                  <strong>PS-</strong> at the start (psychology, psalm)
                </li>
                <li>
                  <strong>GN-</strong> at the start or <strong>-GN</strong> at
                  the end (gnome, sign)
                </li>
                <li>
                  <strong>WR-</strong> at the start (write, wrong)
                </li>
              </ul>
            </div>
          </section>

          {/* Common Mistakes Section */}
          <section id="common-mistakes" className="sk-common-mistakes-section">
            <h2>Top 3 Most Mispronounced Words with Silent Letters</h2>
            <p>
              Even native English speakers struggle with these tricky words.
              Here are the most common pronunciation mistakes and how to avoid
              them:
            </p>

            <div className="sk-mistakes-grid">
              {commonMistakes.map((mistake, index) => (
                <div key={index} className="sk-mistake-card">
                  <h4>{mistake.word}</h4>
                  <div className="sk-mistake-comparison">
                    <div className="sk-wrong">
                      <span className="sk-label">❌ Common Mistake:</span>
                      <span className="sk-pronunciation">{mistake.wrong}</span>
                    </div>
                    <div className="sk-correct">
                      <span className="sk-label">✅ Correct IPA:</span>
                      <span className="sk-pronunciation">
                        {mistake.correct}
                      </span>
                    </div>
                  </div>
                  <p className="sk-tip">
                    <strong>Tip:</strong> {mistake.tip}
                  </p>
                </div>
              ))}
            </div>

            <img
              src={rightPronuncation}
              alt="Correct Pronunciation Illustration"
              className="sk-pronunciation-image"
            />
          </section>

          {/* Practice Section */}
          <section id="how-to-master" className="sk-silent-practice-section">
            <h2>How to Master Silent Letters with QuickPronounce</h2>
            <p>
              The best way to defeat silent letters is to{" "}
              <strong>stop trusting the spelling</strong> and{" "}
              <strong>start trusting the sound</strong>. Here's your 4-step
              system to master any word with silent letters:
            </p>

            <div className="sk-silent-steps-grid">
              <div className="sk-silent-step-card">
                <div className="sk-step-number">1</div>
                <h4>Identify Suspicious Patterns</h4>
                <p>
                  When you see letter combinations like 'KN', 'MB', 'PS', 'GN',
                  or 'WR', immediately suspect a silent letter. Words borrowed
                  from Greek (psychology, pneumonia) and French (debris, ballet)
                  are also prime suspects.
                </p>
              </div>

              <div className="sk-silent-step-card">
                <div className="sk-step-number">2</div>
                <h4>Check the IPA Transcription</h4>
                <p>
                  Enter the word into <strong>QuickPronounce</strong>. Look at
                  the IPA transcription carefully. If the sound you expect is
                  missing, you've found your silent letter! For example,{" "}
                  <em>receipt</em> shows /rɪˈsiːt/ with no /p/ sound anywhere.
                </p>
              </div>

              <div className="sk-silent-step-card">
                <div className="sk-step-number">3</div>
                <h4>Listen to Multiple Accents</h4>
                <p>
                  Use QuickPronounce's audio feature to hear the correct
                  pronunciation in American, British, Australian, and other
                  accents. Silent letters remain silent across all English
                  dialects, which makes this rule very reliable.
                </p>
              </div>

              <div className="sk-silent-step-card">
                <div className="sk-step-number">4</div>
                <h4>Practice with Context Sentences</h4>
                <p>
                  Don't just repeat the word in isolation. Use it in full
                  sentences: "I <strong>doubt</strong> I will{" "}
                  <strong>climb</strong> that mountain." This trains your mouth
                  muscles and makes the correct pronunciation automatic in
                  natural speech.
                </p>
              </div>
            </div>

            <img
              src={quickpronounceScreenshot}
              alt="QuickPronounce Screenshot"
              className="sk-quickpronounce-image"
            />
          </section>

          {/* Practice Tips Section */}
          <section id="practice-tips" className="sk-practice-tips-section">
            <h2>5 Daily Practice Tips to Master Silent Letters</h2>

            <div className="sk-tips-grid">
              <div className="sk-tip-card">
                <h4>📚 Create a Silent Letter Journal</h4>
                <p>
                  Keep a list of words you encounter with silent letters. Write
                  the word, its IPA transcription, and use it in a sentence.
                  Review this journal weekly.
                </p>
              </div>

              <div className="sk-tip-card">
                <h4>🎯 Practice Minimal Pairs</h4>
                <p>
                  Compare words like "knight" vs "night" or "know" vs "no". This
                  helps your brain distinguish between spellings while
                  recognizing identical sounds.
                </p>
              </div>

              <div className="sk-tip-card">
                <h4>🔊 Record Yourself</h4>
                <p>
                  Use your phone to record yourself pronouncing challenging
                  words. Compare your recording with the audio from
                  QuickPronounce to identify differences.
                </p>
              </div>

              <div className="sk-tip-card">
                <h4>👥 Find a Practice Partner</h4>
                <p>
                  Practice with a friend or language exchange partner. Quiz each
                  other on silent letter words and provide feedback on
                  pronunciation.
                </p>
              </div>

              <div className="sk-tip-card">
                <h4>📖 Read Aloud Daily</h4>
                <p>
                  Spend 10 minutes reading English text aloud every day. When
                  you encounter a word with a silent letter, pause and verify
                  its pronunciation.
                </p>
              </div>
            </div>
          </section>

          {/* Additional Resources Section */}
          <section className="sk-resources-section">
            <h2>Additional Resources for Pronunciation Mastery</h2>

            <div className="sk-resource-box">
              <h4>🎓 Want to Learn More About English Pronunciation?</h4>
              <p>
                Silent letters are just the beginning. Check out these related
                guides:
              </p>
              <ul className="sk-resource-list">
                <li>
                  <Link to="/blog/pronunciation-tips">
                    10 Proven Tips to Perfect Your English Pronunciation
                  </Link>
                </li>
                <li>
                  <Link to="/blog/IPA-guide">
                    IPA for Beginners: Your Complete Guide to the International
                    Phonetic Alphabet
                  </Link>
                </li>
                <li>
                  <Link to="/blog/american-vs-british">
                    American vs. British Pronunciation: The 4 Sound Rules That
                    Explain Everything
                  </Link>
                </li>
                <li>
                  <Link to="/blog/pronunciation-guide">
                    50 Most Mispronounced English Words (and How to Say Them
                    Right)
                  </Link>
                </li>
              </ul>
            </div>
          </section>

          {/* Conclusion */}
          <section className="sk-silent-conclusion">
            <h2>Final Thoughts: Confidence Through Clarity</h2>
            <p>
              Silent letters are a unique challenge in English pronunciation,
              but they're not insurmountable. By understanding the historical
              reasons behind them, learning the 8 core pronunciation rules, and
              consistently using the{" "}
              <strong>International Phonetic Alphabet (IPA)</strong> as your
              guide, you can confidently navigate even the trickiest words in
              the English language.
            </p>

            <p>
              Remember:{" "}
              <strong>
                English spelling tells you where a word came from; IPA tells you
                how it sounds today.
              </strong>{" "}
              Whenever you're in doubt, trust the IPA transcription, not the
              spelling.
            </p>

            <div className="sk-next-steps-box">
              <h3>Your Next Steps:</h3>
              <ol className="sk-next-steps-list">
                <li>Bookmark this guide for future reference</li>
                <li>Try QuickPronounce on 5 words you've been unsure about</li>
                <li>Practice one silent letter rule per day this week</li>
                <li>Share this guide with anyone learning English</li>
              </ol>
            </div>

            <p className="sk-closing">
              Stay tuned for our next guide, where we'll dive deep into{" "}
              <strong>Word Stress Patterns</strong>—the key to sounding natural
              and fluent in English conversation!
            </p>
          </section>
        </main>
      </div>
    </BlogArticleTemplate>
  );
};

export default SilentKillers;
