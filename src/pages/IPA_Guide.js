import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "./Css/IPA_Guide.css";
import IPA_img from "../images/IPA_GUIDE_img.webp";

// Helper component for the IPA symbols grid
const IPASymbolCard = ({ symbol, example, description }) => (
  <div className="ipa-symbol-card">
    <span className="ipa-symbol">{symbol}</span>
    <span className="ipa-example">{example}</span>
    <span className="ipa-description">{description}</span>
  </div>
);

const IPAGuide = () => {
  // Data for Consonants (Revised with more examples)
  const consonants = [
    {
      symbol: "/θ/",
      example: "thin, math",
      description: "Voiceless 'th' sound",
    },
    {
      symbol: "/ð/",
      example: "this, mother",
      description: "Voiced 'th' sound",
    },
    { symbol: "/ʃ/", example: "shoe, nation", description: "'sh' sound" },
    { symbol: "/ʒ/", example: "measure, vision", description: "'zh' sound" },
    { symbol: "/ŋ/", example: "sing, finger", description: "'ng' sound" },
    { symbol: "/tʃ/", example: "church, feature", description: "'ch' sound" },
    {
      symbol: "/dʒ/",
      example: "judge, giraffe",
      description: "'j' or 'soft g' sound",
    },
  ];

  // Data for Vowels (Revised with more examples)
  const vowels = [
    { symbol: "/iː/", example: "beat, key", description: "Long 'ee' sound" },
    { symbol: "/ɪ/", example: "bit, women", description: "Short 'i' sound" },
    {
      symbol: "/æ/",
      example: "cat, hand",
      description: "Short 'a' sound (AmE)",
    },
    { symbol: "/ʌ/", example: "cut, blood", description: "Short 'u' sound" },
    {
      symbol: "/ə/",
      example: "about, banana",
      description: "The Schwa (most common sound)",
    },
    {
      symbol: "/aɪ/",
      example: "my, buy",
      description: "Diphthong (two sounds: /a/ + /ɪ/)",
    },
    {
      symbol: "/eɪ/",
      example: "say, great",
      description: "Diphthong (two sounds: /e/ + /ɪ/)",
    },
  ];

  return (
    <div className="ipa-guide">
      <Helmet>
        {/* OPTIMIZED TITLE TAG */}
        <title>
          The Ultimate Guide to IPA: Read Phonetic Transcriptions & Master
          English Pronunciation
        </title>

        {/* OPTIMIZED META DESCRIPTION */}
        <meta
          name="description"
          content="Decode the International Phonetic Alphabet (IPA) for English. Learn the key symbols, master vowel and consonant sounds, and use QuickPronounce to instantly check any word's IPA."
        />

        <link
          rel="canonical"
          href="https://www.quickpronounce.site/blog/ultimate-guide-to-ipa"
        />

        {/* OPEN GRAPH & TWITTER CARD - Placeholder for image */}
        <meta
          property="og:image"
          content="https://www.quickpronounce.site/images/ipa-guide-banner.jpg"
        />
        <meta
          name="twitter:image"
          content="https://www.quickpronounce.site/images/ipa-guide-banner.jpg"
        />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "The Ultimate Guide to IPA: How to Read Phonetic Transcriptions and Master Any English Word",
            description:
              "This expert guide decodes the International Phonetic Alphabet (IPA) for English learners, covering key symbols, stress marks, and how to use QuickPronounce for practice.",
            url: "https://www.quickpronounce.site/blog/ultimate-guide-to-ipa",
            author: {
              "@type": "Person",
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
          })}
        </script>
      </Helmet>

      <header className="ipa-guide-header">
        <div className="container">
          <h1>
            The Ultimate Guide to IPA: How to Read Phonetic Transcriptions and
            Master Any English Word
          </h1>
          <p className="ipa-subtitle">
            Unlock the secret language of dictionaries and achieve pronunciation
            independence.
          </p>
          <div className="ipa-header-gradient"></div>
        </div>
      </header>

      <main className="container ipa-guide-content">
        <section className="ipa-intro-section">
          <div className="ipa-image-placeholder">
            {/* Image Suggestion: A simple graphic showing the contrast: Spelling: P-H-O-N-E-T-I-C vs. Sound: /fəˈnɛtɪk/ */}
            <img src={IPA_img} alt="IPA vs. Spelling Contrast" />
            {/* <p>
              <strong>[Image Placeholder: ]</strong>
            </p> */}
          </div>
          <p>
            <strong>English pronunciation can be a minefield.</strong> Unlike
            languages where spelling closely matches sound, English is notorious
            for its inconsistencies. Think of the different sounds the letters
            'ough' make in words like <em>though</em>, <em>through</em>,{" "}
            <em>tough</em>, and <em>plough</em>. It’s a nightmare for learners
            and a source of confusion for everyone.
          </p>
          <p>
            Fortunately, there is a universal, reliable map for English sounds:
            the <strong>International Phonetic Alphabet (IPA)</strong>.
            Mastering the IPA is the single most powerful skill you can acquire
            to achieve pronunciation independence. It allows you to look up any
            word in any dictionary and know exactly how to say it, regardless of
            its confusing spelling.
          </p>
          <p>
            At QuickPronounce, we believe in giving you the tools to succeed.
            That’s why we provide the IPA transcription for every word in all
            four of our supported accents. This guide will decode the most
            important symbols, turning you from a confused learner into a
            confident phonetic master.
          </p>
        </section>

        <section className="ipa-why-section">
          <h2>What is the IPA and Why Should You Care?</h2>
          <p>
            The IPA is an alphabetic system of phonetic notation. Its core
            principle is simple:{" "}
            <strong>one symbol represents one sound.</strong> This eliminates
            the guesswork inherent in English spelling.
          </p>
          <div className="ipa-rich-box">
            <h3>Why IPA is Your Pronunciation Superpower:</h3>
            <ul>
              <li>
                <strong>Consistency:</strong> It bypasses the chaotic rules of
                English spelling. The sound for /iː/ is always the same, whether
                it's spelled 'ee' (<em>meet</em>), 'ea' (<em>meat</em>), or 'ie'
                (<em>chief</em>).
              </li>
              <li>
                <strong>Accuracy:</strong> It helps you reproduce sounds
                precisely, training your mouth muscles to make the correct shape
                and placement for each sound.
              </li>
              <li>
                <strong>Independence:</strong> Once you know the symbols, you no
                longer need audio. You can confidently pronounce any word you
                encounter in a dictionary or textbook.
              </li>
            </ul>
          </div>
        </section>

        <section className="ipa-decoding-section">
          <h2>Decoding the English IPA Chart: The Key Symbols</h2>
          <p>
            You don't need to memorize the entire global IPA chart. For English,
            you only need to focus on a few dozen symbols. We've broken down the
            most essential ones you'll see in QuickPronounce.
          </p>

          <div className="ipa-consonants">
            <h3>C.1. Consonants: The Familiar and the Foreign</h3>
            <p>
              Many English consonant sounds use symbols that look just like
              their corresponding letters (e.g., /p/, /b/, /m/, /t/). However, a
              few key symbols represent sounds that are often confusing or don't
              have a single letter equivalent.
            </p>
            <div className="ipa-symbol-grid">
              {consonants.map((item, index) => (
                <IPASymbolCard key={index} {...item} />
              ))}
            </div>
          </div>

          <div className="ipa-vowels">
            <h3>C.2. Vowels: Monophthongs and Diphthongs</h3>
            <p>
              Vowels are the biggest difference between accents. Pay close
              attention to these symbols, as they are key to sounding like a
              native speaker of your target accent.
            </p>
            <div className="ipa-symbol-grid">
              {vowels.map((item, index) => (
                <IPASymbolCard key={index} {...item} />
              ))}
            </div>
            <div className="ipa-schwa-explanation">
              <h4>The Schwa (/ə/): The Most Important Sound</h4>
              <p>
                The schwa is the unstressed, neutral vowel sound in English,
                like the 'a' in <em>about</em> /əˈbaʊt/. It is the most common
                sound in the language and is key to sounding natural. When a
                syllable is unstressed, its vowel often reduces to the schwa.
                Learning to spot the schwa in the IPA is the first step to
                mastering word stress and rhythm.
              </p>
            </div>
          </div>
        </section>

        {/* NEW ACCENT SPOTLIGHT SECTION */}
        <section className="ipa-accent-spotlight">
          <h3>Accent Spotlight: The Word "Water"</h3>
          <p>
            The IPA is essential for understanding accent differences. Look at
            how the word "water" changes between American and British English:
          </p>
          <div className="ipa-accent-comparison">
            <div className="ipa-accent-card">
              <h4>🇺🇸 American English (AmE)</h4>
              <span className="ipa-transcription">/ˈwɑːtər/</span>
              <p>
                Notice the <strong>r-sound</strong> at the end (rhotic) and the{" "}
                <strong>'t' sound</strong> often becoming a flap /ɾ/ (sounding
                like a soft 'd').
              </p>
            </div>
            <div className="ipa-accent-card">
              <h4>🇬🇧 British English (BrE)</h4>
              <span className="ipa-transcription">/ˈwɔːtə/</span>
              <p>
                Notice the <strong>lack of an r-sound</strong> at the end
                (non-rhotic) and the <strong>different vowel sound</strong> /ɔː/
                (like the 'aw' in saw).
              </p>
            </div>
          </div>
          <p className="ipa-accent-link">
            <Link to="/" className="ipa-link-text">
              Use QuickPronounce to hear the difference instantly!
            </Link>
          </p>
        </section>

        <section className="ipa-marks-section">
          <h2>The Marks That Matter: Stress and Syllables</h2>
          <p>
            IPA is more than just sounds; it tells you where to put the
            emphasis. These marks are critical for rhythm and clarity.
          </p>
          <div className="ipa-stress-table">
            <table>
              <thead>
                <tr>
                  <th>Mark</th>
                  <th>Name</th>
                  <th>Function</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>ˈ</strong>
                  </td>
                  <td>Primary Stress</td>
                  <td>
                    Placed <strong>before</strong> the syllable that receives
                    the strongest emphasis.
                  </td>
                  <td>
                    <strong>ˈ</strong>pho-to-graph-y
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>ˌ</strong>
                  </td>
                  <td>Secondary Stress</td>
                  <td>
                    Placed <strong>before</strong> a syllable with a medium
                    level of emphasis (less than primary).
                  </td>
                  <td>
                    pho-to-<strong>ˌ</strong>graph-ic
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>.</strong>
                  </td>
                  <td>Syllable Break</td>
                  <td>Separates syllables for easy reading.</td>
                  <td>/ɪn.trə.prə.ˈnɜːr/</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>Quick Tip:</strong> The primary stress mark (ˈ) is your best
            friend. If you only get one thing right, make it the word stress!
            QuickPronounce's IPA always includes these stress marks.
          </p>
        </section>

        <section className="ipa-practice-section">
          <h2>Putting It All Together: Practice with QuickPronounce</h2>
          <p>
            Now that you know the basics, it's time to put your knowledge to the
            test. Use QuickPronounce as your personal IPA decoder.
          </p>
          <div className="ipa-steps-grid">
            <div className="ipa-step-card">
              <h4>1. Find the IPA</h4>
              <p>
                Enter a tricky word like <em>entrepreneur</em> and view the IPA
                transcription: /ˌɒn.trə.prə.ˈnɜːr/ (BrE).
              </p>
            </div>
            <div className="ipa-step-card">
              <h4>2. Identify the Stress</h4>
              <p>
                Spot the primary stress mark (ˈ) before the last syllable:
                /nɜːr/. This is where you put the emphasis: entrepre**NEUR**.
              </p>
            </div>
            <div className="ipa-step-card">
              <h4>3. Decode the Sounds</h4>
              <p>
                Break down the sounds: /ɒ/ (short 'o'), /ə/ (schwa), /nɜːr/
                (long 'er' sound). Notice how the unstressed syllables reduce to
                the schwa /ə/.
              </p>
            </div>
            <div className="ipa-step-card">
              <h4>4. Listen and Compare</h4>
              <p>
                Use the audio feature to hear the word in all four accents.
                Compare the sound to the IPA. This trains your ear and
                reinforces your phonetic reading skills.
              </p>
            </div>
          </div>
          <div className="ipa-cta-box">
            <h3>Ready to Decode Your First Word?</h3>
            <p>
              Stop guessing and start mastering. Click below to head to the
              QuickPronounce tool and put your new IPA knowledge to the test!
            </p>
            <Link to="/" className="ipa-cta-button">
              Go to QuickPronounce Tool
            </Link>
          </div>
        </section>

        <section className="ipa-conclusion">
          <h2>Conclusion: Your Journey to Pronunciation Independence</h2>
          <p>
            The International Phonetic Alphabet is the key to unlocking the
            secrets of English pronunciation. By learning just a few dozen
            symbols, you gain the power to accurately pronounce any word,
            anywhere, anytime. Use QuickPronounce as your daily practice partner
            to make IPA second nature.
          </p>
          <p>
            Stay tuned for our next guides, where we'll tackle other common
            challenges like **Silent Letters** and the detailed rules of **Word
            Stress**!
          </p>
        </section>
      </main>
    </div>
  );
};

export default IPAGuide;
