import React from "react";
import { Link } from "react-router-dom";
import "./Css/Blog_3.css";
import { Helmet } from "react-helmet";
import im1 from "../images/im1.webp";
import im2 from "../images/im2.webp";
import im3 from "../images/im3.webp";
import im4 from "../images/im4.webp";

const imageMap = {
  "rhotic_vs_nonrhotic.webp": im1,
  "short_vs_broad_a.webp": im2,
  "flap_t_vs_true_t.webp": im3,
  "lot_cloth_vowel.webp": im4,
};

const LazyImage = ({ alt, src }) => (
  <div className="image-container">
    <img
      loading="lazy"
      src={imageMap[src] || src}
      alt={alt}
      className="avb-diff-image"
    />
  </div>
);

const soundDifferences = [
  {
    id: 1,
    title: "The /r/ Sound: Rhotic vs. Non-Rhotic",
    overview:
      "American English is 'rhotic'—the /r/ sound is always pronounced after vowels. British English (especially RP and Southern dialects) is 'non-rhotic'—the /r/ is dropped unless followed by a vowel. This single difference affects hundreds of common words and is the most recognizable distinction between the accents.",
    ipa: "AmE: /kɑːr/ vs. BrE: /kɑː/",
    imageSrc: "rhotic_vs_nonrhotic.webp",
    practicalNote:
      "In connected speech, BrE speakers add a linking 'r' when the next word starts with a vowel: 'car engine' /kɑːr ˈendʒɪn/",
    words: [
      {
        word: "Car",
        am: "kɑːr",
        br: "kɑː",
        tip: "Notice how BrE ends on the open vowel",
      },
      {
        word: "Water",
        am: "ˈwɔːtər",
        br: "ˈwɔːtə",
        tip: "The missing 'r' makes BrE sound softer",
      },
      {
        word: "Mother",
        am: "ˈmʌðər",
        br: "ˈmʌðə",
        tip: "Consistent pattern in all '-er' endings",
      },
      {
        word: "Four",
        am: "fɔːr",
        br: "fɔː",
        tip: "BrE holds the vowel longer to compensate",
      },
    ],
  },
  {
    id: 2,
    title: "The /æ/ vs /ɑː/ Sound: The 'Bath' Split",
    overview:
      "This is called the 'TRAP-BATH split' in linguistics. Before certain consonants (f, s, th, n, m), American English keeps the short /æ/ sound, while British RP uses the broad /ɑː/. This split occurred in Southern British English in the 17th-18th centuries and never reached America.",
    ipa: "AmE: /bæθ/ vs. BrE: /bɑːθ/",
    imageSrc: "short_vs_broad_a.webp",
    practicalNote:
      "The split affects around 150 common words. Northern British accents often use /æ/ like Americans.",
    words: [
      {
        word: "Bath",
        am: "bæθ",
        br: "bɑːθ",
        tip: "The word that names this phenomenon",
      },
      {
        word: "Dance",
        am: "dæns",
        br: "dɑːns",
        tip: "Common in movement and art vocabulary",
      },
      {
        word: "Plant",
        am: "plænt",
        br: "plɑːnt",
        tip: "Applies before 'n' + consonant",
      },
      {
        word: "Glass",
        am: "ɡlæs",
        br: "ɡlɑːs",
        tip: "Before 's' + consonant combinations",
      },
      { word: "Path", am: "pæθ", br: "pɑːθ", tip: "Before 'th' sounds" },
    ],
  },
  {
    id: 3,
    title: "The /t/ Sound: Flapping vs. Full Release",
    overview:
      "In American English, /t/ between vowels becomes a 'flap' or 'tap'—essentially a very quick /d/ sound. This is called 'intervocalic alveolar flapping.' British English maintains a crisp /t/ in most positions. This affects speech rhythm significantly—American English flows faster in casual speech.",
    ipa: "AmE: /ˈwɑːdər/ vs. BrE: /ˈwɒtə/",
    imageSrc: "flap_t_vs_true_t.webp",
    practicalNote:
      "The flap also occurs with /d/ between vowels, making 'ladder' and 'latter' sound identical in AmE.",
    words: [
      {
        word: "Better",
        am: "ˈbɛdər",
        br: "ˈbɛtə",
        tip: "The most common example of this rule",
      },
      {
        word: "City",
        am: "ˈsɪdi",
        br: "ˈsɪti",
        tip: "Creates a three-syllable effect in BrE",
      },
      {
        word: "Butter",
        am: "ˈbʌdər",
        br: "ˈbʌtə",
        tip: "Practice switching between both",
      },
      {
        word: "Matter",
        am: "ˈmædər",
        br: "ˈmætə",
        tip: "In AmE, sounds like 'madder'",
      },
    ],
  },
  {
    id: 4,
    title: "The /ɒ/ vs /ɑː/ Sound: The 'LOT-CLOTH' Split",
    overview:
      "British English has a distinct rounded back vowel /ɒ/ in words like 'hot,' 'top,' and 'dog.' American English merged this with /ɑː/, creating a more open, unrounded sound. This affects hundreds of everyday words and makes American speech sound 'flatter' to British ears.",
    ipa: "AmE: /hɑːt/ vs. BrE: /hɒt/",
    imageSrc: "lot_cloth_vowel.webp",
    practicalNote:
      "In BrE, your lips should be rounded for /ɒ/. In AmE, they remain neutral.",
    words: [
      {
        word: "Hot",
        am: "hɑːt",
        br: "hɒt",
        tip: "Round your lips for British pronunciation",
      },
      {
        word: "Dog",
        am: "dɑːɡ",
        br: "dɒɡ",
        tip: "Notice the lip position difference",
      },
      {
        word: "Boss",
        am: "bɑːs",
        br: "bɒs",
        tip: "Very common in workplace vocabulary",
      },
      {
        word: "Coffee",
        am: "ˈkɑːfi",
        br: "ˈkɒfi",
        tip: "A daily word with clear difference",
      },
    ],
  },
];

const confusingWords = [
  {
    word: "Aluminum/Aluminium",
    am: "ə-ˈluː-mə-nəm",
    br: "ˌæl-jə-ˈmɪn-i-əm",
    tip: "Different spelling AND pronunciation—BrE has extra syllable",
    category: "Different words",
  },
  {
    word: "Schedule",
    am: "ˈskedʒ-uːl",
    br: "ˈʃedʒ-uːl",
    tip: "AmE uses /sk/, BrE uses /ʃ/ (sh sound)",
    category: "Initial consonant",
  },
  {
    word: "Tomato",
    am: "tə-ˈmeɪ-toʊ",
    br: "tə-ˈmɑː-təʊ",
    tip: "The vowel in the second syllable is completely different",
    category: "Vowel quality",
  },
  {
    word: "Herb",
    am: "ɜːrb",
    br: "hɜːb",
    tip: "AmE drops the 'h', BrE pronounces it clearly",
    category: "Initial consonant",
  },
  {
    word: "Route",
    am: "ruːt / raʊt",
    br: "ruːt",
    tip: "AmE has two pronunciations; BrE uses only one",
    category: "Vowel quality",
  },
  {
    word: "Lieutenant",
    am: "luː-ˈten-ənt",
    br: "lef-ˈten-ənt",
    tip: "Completely different first syllable in BrE",
    category: "Different words",
  },
  {
    word: "Advertisement",
    am: "ˌæd-vər-ˈtaɪz-mənt",
    br: "əd-ˈvɜː-tɪs-mənt",
    tip: "Stress falls on different syllables",
    category: "Stress pattern",
  },
  {
    word: "Privacy",
    am: "ˈpraɪ-və-si",
    br: "ˈprɪv-ə-si",
    tip: "First vowel differs: long 'i' vs short 'i'",
    category: "Vowel quality",
  },
  {
    word: "Garage",
    am: "ɡə-ˈrɑːʒ",
    br: "ˈɡær-ɑːʒ",
    tip: "Stress on second syllable (AmE) vs first (BrE)",
    category: "Stress pattern",
  },
  {
    word: "Figure",
    am: "ˈfɪɡ-jər",
    br: "ˈfɪɡ-ə",
    tip: "Classic rhotic vs non-rhotic difference",
    category: "Rhotic 'r'",
  },
  {
    word: "Leisure",
    am: "ˈliː-ʒər",
    br: "ˈleʒ-ə",
    tip: "Different vowel sounds in first syllable",
    category: "Vowel quality",
  },
  {
    word: "Vase",
    am: "veɪs",
    br: "vɑːz",
    tip: "Completely different—long 'a' sound vs 'ah' with 'z'",
    category: "Different words",
  },
];

const PronunciationComparison = () => {
  return (
    <div className="avb-comparison-blog">
      <Helmet>
        <title>
          American vs. British Pronunciation: 4 Key Differences + 25 Confusing
          Words
        </title>
        <meta
          name="description"
          content="Master the 4 fundamental sound differences between American and British English. Complete guide with IPA, audio examples, and practice strategies for learners."
        />
        <link
          rel="canonical"
          href="https://www.quickpronounce.site/blog/american-vs-british"
        />
        <meta
          property="og:title"
          content="AmE vs. BrE Pronunciation: Master the 4 Key Differences"
        />
      </Helmet>

      <header className="avb-header">
        <div className="avb-wrapper">
          <h1>
            American vs. British Pronunciation: The 4 Sound Rules That Explain
            Everything
          </h1>
          <p className="avb-subtitle">
            Why do Americans say "aluminum" while Brits say "aluminium"?
            Understanding 4 simple phonetic rules will help you navigate both
            accents with confidence.
          </p>
          <div className="avb-header-gradient"></div>
        </div>
      </header>

      <main className="container avb-content">
        <section className="avb-intro-section">
          <p>
            If you've ever been confused by why the same English word sounds
            completely different in American and British accents, you're not
            alone. The differences aren't random—they follow predictable
            phonetic patterns that emerged over centuries of linguistic
            evolution.
          </p>
          <p>
            This guide focuses on <strong>standard pronunciations</strong>:
            General American (GenAm) and Received Pronunciation (RP) British
            English. These are the accents you'll hear in international
            business, news media, and educational content.
          </p>

          <div className="avb-tip-box">
            <span className="avb-tip-icon">🎯</span>
            <p>
              <strong>Learning Strategy:</strong> Don't try to memorize
              individual words. Instead, learn the 4 sound rules below. Once you
              understand these patterns, you'll be able to predict how thousands
              of words differ between accents.
            </p>
          </div>
        </section>

        <section className="avb-difference-section">
          <h2 className="avb-section-title">
            🗣️ The 4 Fundamental Sound Differences
          </h2>
          <p className="avb-section-description">
            These four phonetic rules account for approximately 90% of the
            pronunciation differences between American and British English.
            Master these, and you'll understand both accents.
          </p>

          <div className="avb-differences-grid">
            {soundDifferences.map((diff) => (
              <div
                id={`diff-${diff.id}`}
                key={diff.id}
                className="avb-diff-card"
              >
                <h3>{diff.title}</h3>
                <LazyImage alt={diff.title} src={diff.imageSrc} />
                <p className="overview-text">{diff.overview}</p>

                <div className="ipa-row">
                  <strong>IPA Example:</strong>{" "}
                  <span className="ipa-text">{diff.ipa}</span>
                </div>

                {diff.practicalNote && (
                  <div className="practical-note">
                    <strong>Practical Note:</strong> {diff.practicalNote}
                  </div>
                )}

                <h4>Practice Words:</h4>
                <div className="example-words-list">
                  {diff.words.map((word, index) => (
                    <div key={index} className="word-example">
                      <span className="word-term">{word.word}</span>
                      <div className="pron-pair">
                        <span className="accent am">AmE: /{word.am}/</span>
                        <span className="accent br">BrE: /{word.br}/</span>
                      </div>
                      <span className="tip-small">{word.tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="confusing-section">
          <h2 className="section-title">
            📚 12 Words That Change Dramatically
          </h2>
          <p className="section-description">
            These common words demonstrate multiple sound differences at once,
            making them particularly challenging for learners. They're organized
            by the type of change for easier pattern recognition.
          </p>

          <div className="confusing-words-table">
            <div className="table-header">
              <span className="col-word">Word</span>
              <span className="col-am">American (AmE)</span>
              <span className="col-br">British (BrE)</span>
              <span className="col-tip">What Changed</span>
            </div>
            {confusingWords.map((word, index) => (
              <div key={index} className="table-row">
                <span className="col-word word-to-search">{word.word}</span>
                <span className="col-am">{word.am}</span>
                <span className="col-br">{word.br}</span>
                <span className="col-tip">{word.tip}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="conclusion-section">
          <h2 className="section-title">🎯 How to Practice Effectively</h2>

          <div className="practice-tips-grid">
            <div className="practice-tip-card">
              <h4>Step 1: Focus on One Sound Rule</h4>
              <p>
                Don't try to learn everything at once. Spend a week focusing
                only on the rhotic 'r' difference. Listen to 20-30 words with
                this pattern daily using QuickPronounce. Your brain will start
                to recognize the pattern automatically.
              </p>
            </div>
            <div className="practice-tip-card">
              <h4>Step 2: Use Minimal Pairs</h4>
              <p>
                Practice words that only differ in one sound. Compare "car" in
                both accents repeatedly. This trains your ear to hear subtle
                distinctions. Create flashcards with IPA transcriptions to see
                the exact difference visually.
              </p>
            </div>
            <div className="practice-tip-card">
              <h4>Step 3: Shadow Native Speakers</h4>
              <p>
                Play a native speaker audio, then immediately repeat what you
                heard. This technique, called "shadowing," helps you internalize
                rhythm, intonation, and sound patterns simultaneously. Do this
                for 10 minutes daily.
              </p>
            </div>
            <div className="practice-tip-card">
              <h4>Step 4: Record Yourself</h4>
              <p>
                Record yourself saying challenging words like "water," "better,"
                and "schedule" in both accents. Compare your recording to native
                speakers on QuickPronounce. This reveals exactly where you need
                improvement.
              </p>
            </div>
          </div>

          <div className="avb-tip-box">
            <span className="avb-tip-icon">⏱️</span>
            <p>
              <strong>Time Investment:</strong> With consistent practice (15-20
              minutes daily), most learners can distinguish and produce both
              accents within 2-3 months. Focus on understanding first, then
              production.
            </p>
          </div>
        </section>

        <section className="avb-regional-section">
          <h2 className="avb-section-title">🌍 Beyond Standard Accents</h2>
          <p className="avb-section-description">
            Both American and British English have rich regional variations.
            While this guide focuses on standard pronunciations, understanding
            regional diversity is important for real-world communication.
          </p>

          <div className="avb-regional-grid">
            <div className="avb-region-card">
              <h3>Notable American Variations</h3>
              <ul className="avb-region-list">
                <li>
                  <strong>New York City:</strong> Non-rhotic in older speakers,
                  distinctive vowel shifts in words like "coffee" /ˈkɔəfi/
                </li>
                <li>
                  <strong>Southern States:</strong> Vowel lengthening,
                  distinctive diphthongs, "pin-pen merger" (/ɪ/ and /ɛ/ before
                  nasals)
                </li>
                <li>
                  <strong>Boston:</strong> Non-rhotic like British English,
                  "pahk the cah" phenomenon
                </li>
                <li>
                  <strong>African American Vernacular English (AAVE):</strong>{" "}
                  Systematic grammatical and phonological features, significant
                  cultural influence
                </li>
              </ul>
            </div>
            <div className="avb-region-card">
              <h3>Notable British Variations</h3>
              <ul className="avb-region-list">
                <li>
                  <strong>Cockney (East London):</strong> Th-fronting (/θ/ →
                  /f/), glottal stops replacing /t/, distinctive rhyming slang
                </li>
                <li>
                  <strong>Scottish English:</strong> Rhotic like American
                  English, distinctive vowel length rules, rolled 'r' in some
                  speakers
                </li>
                <li>
                  <strong>Northern England:</strong> Maintains /æ/ in BATH words
                  (like Americans), distinctive short vowels
                </li>
                <li>
                  <strong>Welsh English:</strong> Distinctive intonation
                  patterns, some consonant differences influenced by Welsh
                  language
                </li>
              </ul>
            </div>
          </div>

          <div className="avb-tip-box avb-regional-tip">
            <span className="avb-tip-icon">📖</span>
            <p>
              <strong>For Learners:</strong> Start with General American or RP
              British—they're widely understood internationally. Once you're
              comfortable with one standard accent, exploring regional
              variations becomes much easier because you'll have a reference
              point.
            </p>
          </div>
        </section>

        <section className="faq-section">
          <h2 className="section-title">❓ Common Questions</h2>

          <div className="faq-item">
            <h4>Which accent should I learn as a non-native speaker?</h4>
            <p>
              Choose based on your goals and exposure. If you consume mostly
              American media or plan to work in the US, focus on American
              English. For British, Australian, or European contexts, learn
              British English. Both are equally valid and globally understood.
            </p>
          </div>

          <div className="faq-item">
            <h4>Can I mix American and British pronunciation?</h4>
            <p>
              While it's common for learners to mix accents, consistency helps
              with clarity. Native speakers generally don't mix—an American
              won't suddenly use British 'r'-dropping. Aim for consistency
              within your chosen accent to sound more natural.
            </p>
          </div>

          <div className="faq-item">
            <h4>Why does spelling differ (color/colour, realize/realise)?</h4>
            <p>
              Spelling differences arose from different standardization
              processes. Noah Webster deliberately changed American spellings in
              the early 1800s to make them more phonetic and distinct from
              British English. Pronunciation and spelling evolved separately.
            </p>
          </div>

          <div className="faq-item">
            <h4>Do native speakers always follow these rules?</h4>
            <p>
              These rules describe standard accents, but variation exists even
              among native speakers. Factors like region, age, education, and
              social context all influence pronunciation. The rules give you a
              solid foundation to understand the majority of speakers.
            </p>
          </div>
        </section>

        <div className="cta-box">
          <h3>Ready to Master Both Accents?</h3>
          <p>
            Stop guessing! Use QuickPronounce to hear side-by-side comparisons
            of any word in American, British, Australian, and Indian English.
            Practice with real native speaker audio and IPA transcriptions.
          </p>
          <Link to="/" className="cta-button">
            Try QuickPronounce Now — Free!
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PronunciationComparison;
