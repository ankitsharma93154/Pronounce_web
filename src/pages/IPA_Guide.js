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
    {
      symbol: "/j/",
      example: "yes, yellow",
      description: "'y' consonant sound",
    },
    {
      symbol: "/w/",
      example: "we, quick",
      description: "'w' sound",
    },
  ];

  // Data for Vowels - EXPANDED
  const vowels = [
    {
      symbol: "/iː/",
      example: "beat, key, see",
      description: "Long 'ee' sound",
    },
    {
      symbol: "/ɪ/",
      example: "bit, women, gym",
      description: "Short 'i' sound",
    },
    {
      symbol: "/e/",
      example: "bed, head, said",
      description: "Short 'e' sound",
    },
    {
      symbol: "/æ/",
      example: "cat, hand, bad",
      description: "Short 'a' sound (AmE)",
    },
    {
      symbol: "/ɑː/",
      example: "father, car, palm",
      description: "Long 'ah' sound (AmE)",
    },
    {
      symbol: "/ɒ/",
      example: "hot, box, lot",
      description: "Short 'o' sound (BrE)",
    },
    {
      symbol: "/ɔː/",
      example: "thought, law, saw",
      description: "Long 'aw' sound",
    },
    {
      symbol: "/ʊ/",
      example: "put, book, could",
      description: "Short 'oo' sound",
    },
    {
      symbol: "/uː/",
      example: "food, blue, true",
      description: "Long 'oo' sound",
    },
    {
      symbol: "/ʌ/",
      example: "cut, blood, come",
      description: "Short 'u' sound",
    },
    {
      symbol: "/ɜː/",
      example: "bird, her, learn",
      description: "Long 'er' sound",
    },
    {
      symbol: "/ə/",
      example: "about, banana, the",
      description: "The Schwa (most common sound)",
    },
  ];

  // Diphthongs
  const diphthongs = [
    {
      symbol: "/aɪ/",
      example: "my, buy, light",
      description: "Diphthong: /a/ + /ɪ/",
    },
    {
      symbol: "/eɪ/",
      example: "say, great, day",
      description: "Diphthong: /e/ + /ɪ/",
    },
    {
      symbol: "/ɔɪ/",
      example: "boy, coin, voice",
      description: "Diphthong: /ɔ/ + /ɪ/",
    },
    {
      symbol: "/aʊ/",
      example: "now, house, loud",
      description: "Diphthong: /a/ + /ʊ/",
    },
    {
      symbol: "/əʊ/",
      example: "go, boat, know (BrE)",
      description: "Diphthong: /ə/ + /ʊ/",
    },
    {
      symbol: "/oʊ/",
      example: "go, boat, know (AmE)",
      description: "Diphthong: /o/ + /ʊ/",
    },
    {
      symbol: "/ɪə/",
      example: "here, ear, fear (BrE)",
      description: "Diphthong: /ɪ/ + /ə/",
    },
    {
      symbol: "/eə/",
      example: "hair, care, where (BrE)",
      description: "Diphthong: /e/ + /ə/",
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

        {/* OPEN GRAPH & TWITTER CARD */}
        <meta
          property="og:image"
          content="https://www.quickpronounce.site/images/ipa-guide-banner.jpg"
        />
        <meta
          name="twitter:image"
          content="https://www.quickpronounce.site/images/ipa-guide-banner.jpg"
        />

        {/* JSON-LD Structured Data - ENHANCED */}
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
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id":
                "https://www.quickpronounce.site/blog/ultimate-guide-to-ipa",
            },
            datePublished: "2024-01-15",
            dateModified: "2024-01-15",
          })}
        </script>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the International Phonetic Alphabet (IPA)?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The IPA is an alphabetic system of phonetic notation where one symbol represents one sound. It eliminates the guesswork inherent in English spelling and allows you to pronounce any word accurately.",
                },
              },
              {
                "@type": "Question",
                name: "How many IPA symbols do I need to learn for English?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For English pronunciation, you only need to learn about 44 sounds (phonemes), which is much more manageable than memorizing the entire global IPA chart.",
                },
              },
              {
                "@type": "Question",
                name: "What is the schwa sound?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The schwa /ə/ is the unstressed, neutral vowel sound in English, like the 'a' in 'about'. It is the most common sound in English and appears in unstressed syllables.",
                },
              },
              {
                "@type": "Question",
                name: "Why does the same word have different IPA transcriptions?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Different accents pronounce words differently. For example, 'water' is /ˈwɑːtər/ in American English but /ˈwɔːtə/ in British English, reflecting differences in vowel sounds and r-pronunciation.",
                },
              },
            ],
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
            <img
              src={IPA_img}
              alt="IPA phonetic transcription vs traditional spelling showing the difference between written and spoken English"
            />
          </div>
          <p>
            <strong>English pronunciation can be a minefield.</strong> Unlike
            languages where spelling closely matches sound, English is notorious
            for its inconsistencies. Think of the different sounds the letters
            'ough' make in words like <em>though</em>, <em>through</em>,{" "}
            <em>tough</em>, and <em>plough</em>. It's a nightmare for learners
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
            That's why we provide the IPA transcription for every word in all
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
            you only need to focus on about 44 sounds (phonemes). We've broken
            down all the essential symbols you'll see in QuickPronounce.
          </p>

          <div className="ipa-consonants">
            <h3>Consonants: The Familiar and the Foreign</h3>
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
            <h3>Vowels: Monophthongs (Pure Vowels)</h3>
            <p>
              Vowels are the biggest difference between accents. Pay close
              attention to these symbols, as they are key to sounding like a
              native speaker of your target accent. Monophthongs are single,
              pure vowel sounds.
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

          <div className="ipa-diphthongs">
            <h3>Diphthongs: Two Vowels in One</h3>
            <p>
              Diphthongs are vowel sounds that glide from one vowel to another
              within the same syllable. They're essential for natural-sounding
              English.
            </p>
            <div className="ipa-symbol-grid">
              {diphthongs.map((item, index) => (
                <IPASymbolCard key={index} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* NEW: Common Pronunciation Mistakes Section */}
        <section className="ipa-mistakes-section">
          <h2>Common Pronunciation Mistakes (And How to Fix Them)</h2>
          <p>
            Understanding these common errors will help you avoid them and
            accelerate your learning.
          </p>

          <div className="ipa-mistake-card">
            <h4>Mistake #1: Confusing /iː/ and /ɪ/</h4>
            <p>
              <strong>The Problem:</strong> Many learners struggle to
              differentiate between the long /iː/ sound in <em>sheep</em> and
              the short /ɪ/ sound in <em>ship</em>.
            </p>
            <p>
              <strong>The Fix:</strong> /iː/ is longer and more tense. Hold it
              for a full beat. /ɪ/ is shorter and more relaxed. Practice minimal
              pairs: <em>beat/bit</em>, <em>heat/hit</em>, <em>seat/sit</em>.
            </p>
          </div>

          <div className="ipa-mistake-card">
            <h4>Mistake #2: Not Using the Schwa /ə/</h4>
            <p>
              <strong>The Problem:</strong> Pronouncing every vowel with its
              full value makes you sound robotic and non-native.
            </p>
            <p>
              <strong>The Fix:</strong> In unstressed syllables, reduce vowels
              to /ə/. For example, <em>about</em> should be /əˈbaʊt/, not
              /æˈbaʊt/. The schwa makes English flow naturally.
            </p>
          </div>

          <div className="ipa-mistake-card">
            <h4>Mistake #3: Misplacing Word Stress</h4>
            <p>
              <strong>The Problem:</strong> Putting stress on the wrong syllable
              can completely change meaning or make you unintelligible. Compare{" "}
              <em>REcord</em> (noun) vs. <em>reCORD</em> (verb).
            </p>
            <p>
              <strong>The Fix:</strong> Always check the IPA for the stress mark
              (ˈ). Practice words with shifting stress patterns. Use
              QuickPronounce to verify correct stress placement.
            </p>
          </div>

          <div className="ipa-mistake-card">
            <h4>Mistake #4: Confusing /θ/ and /s/ or /ð/ and /z/</h4>
            <p>
              <strong>The Problem:</strong> Many languages don't have the 'th'
              sounds, leading speakers to replace /θ/ with /s/ (<em>think</em> →{" "}
              <em>sink</em>) or /ð/ with /z/ (<em>this</em> → <em>zis</em>).
            </p>
            <p>
              <strong>The Fix:</strong> Place your tongue between your teeth.
              For /θ/, blow air without vibrating your vocal cords. For /ð/, add
              voice. Practice: <em>thin/sin</em>, <em>this/zis</em>.
            </p>
          </div>

          <div className="ipa-mistake-card">
            <h4>Mistake #5: Adding Extra Vowels</h4>
            <p>
              <strong>The Problem:</strong> Some language speakers add vowel
              sounds between consonant clusters, making <em>street</em> sound
              like "suh-tree-t".
            </p>
            <p>
              <strong>The Fix:</strong> Practice consonant clusters (/str/,
              /spl/, /thr/) without inserting extra vowels. English allows many
              consonant combinations at the start and end of syllables.
            </p>
          </div>
        </section>

        {/* NEW: Visual Mouth Position Guide Section */}
        <section className="ipa-mouth-position">
          <h2>Visual Guide: Mouth Positions for Difficult Sounds</h2>
          <p>
            Understanding where to place your tongue and how to shape your mouth
            is crucial for accurate pronunciation.
          </p>

          <div className="ipa-position-grid">
            <div className="ipa-position-card">
              <h4>/θ/ and /ð/ - The 'th' Sounds</h4>
              <div className="position-description">
                <p>
                  <strong>Tongue Position:</strong> Place the tip of your tongue
                  between your upper and lower front teeth.
                </p>
                <p>
                  <strong>Airflow:</strong> For /θ/ (thin), blow air without
                  voice. For /ð/ (this), add voice vibration.
                </p>
                <p>
                  <strong>Visual Cue:</strong> Your tongue should be slightly
                  visible between your teeth.
                </p>
                <p>
                  <strong>Common Words:</strong> think, thank, three, that,
                  these, mother
                </p>
              </div>
            </div>

            <div className="ipa-position-card">
              <h4>/ɜː/ - The 'er' Sound</h4>
              <div className="position-description">
                <p>
                  <strong>Tongue Position:</strong> Mid-central position,
                  slightly raised and tense.
                </p>
                <p>
                  <strong>Lips:</strong> Slightly rounded or neutral, not
                  spread.
                </p>
                <p>
                  <strong>Key Point:</strong> This is neither a pure 'e' nor an
                  'r' sound but a unique vowel.
                </p>
                <p>
                  <strong>Common Words:</strong> bird, her, world, learn, turn
                </p>
              </div>
            </div>

            <div className="ipa-position-card">
              <h4>/æ/ - The Short 'a' Sound</h4>
              <div className="position-description">
                <p>
                  <strong>Tongue Position:</strong> Front of mouth, low and
                  flat.
                </p>
                <p>
                  <strong>Jaw:</strong> Drop your jaw more than for /e/,
                  creating a wider mouth opening.
                </p>
                <p>
                  <strong>Sound Quality:</strong> Brighter and more open than in
                  many other languages.
                </p>
                <p>
                  <strong>Common Words:</strong> cat, bad, hand, apple, man
                </p>
              </div>
            </div>

            <div className="ipa-position-card">
              <h4>/w/ - The 'w' Sound</h4>
              <div className="position-description">
                <p>
                  <strong>Lips:</strong> Round your lips tightly (like saying
                  "oo").
                </p>
                <p>
                  <strong>Movement:</strong> Quickly release into the following
                  vowel.
                </p>
                <p>
                  <strong>Key Point:</strong> It's a glide, not a vowel. Your
                  lips should move.
                </p>
                <p>
                  <strong>Common Words:</strong> we, water, quick, queen, win
                </p>
              </div>
            </div>

            <div className="ipa-position-card">
              <h4>/r/ - The 'r' Sound (American)</h4>
              <div className="position-description">
                <p>
                  <strong>Tongue Position:</strong> Curl the tongue back
                  slightly without touching the roof.
                </p>
                <p>
                  <strong>Lips:</strong> Slightly rounded.
                </p>
                <p>
                  <strong>Key Difference:</strong> American /r/ is retroflex;
                  British English often drops final /r/.
                </p>
                <p>
                  <strong>Common Words:</strong> red, carry, car (AmE), bird
                </p>
              </div>
            </div>

            <div className="ipa-position-card">
              <h4>/ŋ/ - The 'ng' Sound</h4>
              <div className="position-description">
                <p>
                  <strong>Tongue Position:</strong> Back of tongue touches the
                  soft palate (velum).
                </p>
                <p>
                  <strong>Air:</strong> Flows through the nose (nasal sound).
                </p>
                <p>
                  <strong>Key Point:</strong> No 'g' sound after it in words
                  like "sing" - it's just /sɪŋ/.
                </p>
                <p>
                  <strong>Common Words:</strong> sing, ring, long, finger, thank
                </p>
              </div>
            </div>
          </div>

          <div className="ipa-tip-box">
            <p>
              <strong>Pro Tip:</strong> Use a mirror when practicing these
              sounds! Watching your mouth and tongue position helps build muscle
              memory faster. Record yourself and compare with native speakers
              using QuickPronounce.
            </p>
          </div>
        </section>

        {/* ACCENT SPOTLIGHT SECTION */}
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

        {/* NEW: Connected Speech Section */}
        <section className="ipa-connected-speech">
          <h2>Beyond Individual Sounds: Connected Speech in English</h2>
          <p>
            Once you've mastered individual IPA symbols, the next level is
            understanding how sounds change when words are spoken together in
            natural conversation. This is called{" "}
            <strong>connected speech</strong>.
          </p>

          <div className="ipa-connected-card">
            <h4>Linking: Connecting Final Consonants to Initial Vowels</h4>
            <p>
              When a word ends in a consonant and the next word begins with a
              vowel, native speakers link them together smoothly.
            </p>
            <div className="example-box">
              <p>
                <strong>Example:</strong> "an apple" → /ən‿ˈæpəl/ (sounds like
                "a-napple")
              </p>
              <p>
                <strong>Example:</strong> "take it" → /teɪk‿ɪt/ (sounds like
                "tay-kit")
              </p>
            </div>
          </div>

          <div className="ipa-connected-card">
            <h4>Intrusive /r/ (British English)</h4>
            <p>
              In non-rhotic accents (like British English), an /r/ sound often
              appears between words when one ends in a vowel and the next begins
              with a vowel.
            </p>
            <div className="example-box">
              <p>
                <strong>Example:</strong> "the idea of" → /ðiː aɪˈdɪər‿əv/
                ("idea-r-of")
              </p>
              <p>
                <strong>Example:</strong> "law and order" → /lɔːr‿ən‿ˈɔːdə/
                ("law-r-and order")
              </p>
            </div>
          </div>

          <div className="ipa-connected-card">
            <h4>Elision: Disappearing Sounds</h4>
            <p>
              In fast speech, certain sounds disappear entirely, especially /t/
              and /d/ between consonants.
            </p>
            <div className="example-box">
              <p>
                <strong>Example:</strong> "next day" → /neksdeɪ/ (the /t/
                disappears)
              </p>
              <p>
                <strong>Example:</strong> "handbag" → /hænbæɡ/ (the /d/
                disappears)
              </p>
            </div>
          </div>

          <div className="ipa-connected-card">
            <h4>Assimilation: Sounds Influencing Each Other</h4>
            <p>
              Adjacent sounds can influence each other, changing their
              articulation to make speech smoother.
            </p>
            <div className="example-box">
              <p>
                <strong>Example:</strong> "ten people" → /ˈtem piːpəl/ (/n/
                becomes /m/ before /p/)
              </p>
              <p>
                <strong>Example:</strong> "good boy" → /ˈɡʊb bɔɪ/ (/d/ becomes
                /b/ before /b/)
              </p>
            </div>
          </div>

          <div className="ipa-connected-card">
            <h4>Weak Forms: Reducing Function Words</h4>
            <p>
              Small grammatical words (articles, prepositions, auxiliaries) are
              often reduced in natural speech, with vowels becoming the schwa
              /ə/.
            </p>
            <div className="example-box">
              <p>
                <strong>Strong form:</strong> "can" /kæn/ →{" "}
                <strong>Weak form:</strong> /kən/
              </p>
              <p>
                <strong>Strong form:</strong> "to" /tuː/ →{" "}
                <strong>Weak form:</strong> /tə/
              </p>
              <p>
                <strong>Example:</strong> "I can go" → /aɪ kən ɡəʊ/ (not /aɪ kæn
                ɡəʊ/)
              </p>
            </div>
          </div>

          <div className="ipa-tip-box">
            <p>
              <strong>Why This Matters:</strong> Understanding connected speech
              is the difference between textbook pronunciation and sounding
              natural. Listen to native speakers on QuickPronounce and notice
              how words flow together rather than being pronounced in isolation.
            </p>
          </div>
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
                    <strong>ˈ</strong>pho-to-graph-y /fəˈtɒɡrəfi/
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
                    pho-to-<strong>ˌ</strong>graph-ic /ˌfəʊtəˈɡræfɪk/
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

        {/* NEW: Tips for Different Native Language Speakers */}
        <section className="ipa-language-tips">
          <h2>IPA Tips for Different Native Language Speakers</h2>
          <p>
            Every language has its own sound system, which means different
            speakers face different challenges when learning English
            pronunciation. Here's what to focus on based on your native
            language:
          </p>

          <div className="ipa-language-grid">
            <div className="ipa-language-card">
              <h4>🇪🇸 Spanish Speakers</h4>
              <div className="challenges">
                <p>
                  <strong>Main Challenges:</strong>
                </p>
                <ul>
                  <li>
                    The vowel sounds /ɪ/ vs. /iː/ and /ʊ/ vs. /uː/ (Spanish has
                    only 5 pure vowels)
                  </li>
                  <li>
                    Final consonants (Spanish words rarely end in most
                    consonants)
                  </li>
                  <li>The schwa /ə/ (doesn't exist in Spanish)</li>
                  <li>Consonant clusters like /str/, /spl/, /skr/</li>
                </ul>
                <p>
                  <strong>Focus Practice:</strong> ship/sheep, pull/pool, about
                  (with schwa), stress
                </p>
              </div>
            </div>

            <div className="ipa-language-card">
              <h4>🇨🇳 Mandarin Speakers</h4>
              <div className="challenges">
                <p>
                  <strong>Main Challenges:</strong>
                </p>
                <ul>
                  <li>The /r/ and /l/ distinction</li>
                  <li>
                    Final consonant clusters (Mandarin syllables are simpler)
                  </li>
                  <li>The /v/ sound (often replaced with /w/)</li>
                  <li>The 'th' sounds /θ/ and /ð/</li>
                </ul>
                <p>
                  <strong>Focus Practice:</strong> right/light, very/wery,
                  think/sink, this/dis, texts, asked
                </p>
              </div>
            </div>

            <div className="ipa-language-card">
              <h4>🇯🇵 Japanese Speakers</h4>
              <div className="challenges">
                <p>
                  <strong>Main Challenges:</strong>
                </p>
                <ul>
                  <li>
                    The /r/ vs. /l/ sounds (Japanese has one sound between them)
                  </li>
                  <li>Consonant clusters without inserting vowels</li>
                  <li>The /v/ sound (often becomes /b/)</li>
                  <li>
                    Final consonants (Japanese syllables almost always end in
                    vowels)
                  </li>
                </ul>
                <p>
                  <strong>Focus Practice:</strong> arrive/alive, street (not
                  su-tree-to), very/berry, cat (not catto)
                </p>
              </div>
            </div>

            <div className="ipa-language-card">
              <h4>🇫🇷 French Speakers</h4>
              <div className="challenges">
                <p>
                  <strong>Main Challenges:</strong>
                </p>
                <ul>
                  <li>The 'th' sounds /θ/ and /ð/ (don't exist in French)</li>
                  <li>The /h/ sound (silent in French)</li>
                  <li>
                    Word-final stress (French stresses the last syllable;
                    English varies)
                  </li>
                  <li>The distinction between /ɪ/ and /iː/</li>
                </ul>
                <p>
                  <strong>Focus Practice:</strong> think (not sink), house (with
                  /h/), PHOtograph vs. phoTOgraphy, ship/sheep
                </p>
              </div>
            </div>

            <div className="ipa-language-card">
              <h4>🇩🇪 German Speakers</h4>
              <div className="challenges">
                <p>
                  <strong>Main Challenges:</strong>
                </p>
                <ul>
                  <li>The 'th' sounds /θ/ and /ð/</li>
                  <li>
                    The /w/ sound (German 'w' is pronounced like English /v/)
                  </li>
                  <li>Final voiced consonants (German devoices them)</li>
                  <li>The vowel /æ/ (doesn't exist in German)</li>
                </ul>
                <p>
                  <strong>Focus Practice:</strong> this/dis, west/vest, bad/bat
                  (final /d/ stays voiced), cat/cut
                </p>
              </div>
            </div>

            <div className="ipa-language-card">
              <h4>🇮🇳 Hindi/Urdu Speakers</h4>
              <div className="challenges">
                <p>
                  <strong>Main Challenges:</strong>
                </p>
                <ul>
                  <li>The schwa /ə/ vs. /ʌ/ distinction</li>
                  <li>The /v/ and /w/ distinction (often merged)</li>
                  <li>
                    Aspirated vs. unaspirated stops (English doesn't distinguish
                    these)
                  </li>
                  <li>Retroflex sounds (Hindi has them; English doesn't)</li>
                </ul>
                <p>
                  <strong>Focus Practice:</strong> cut/cot, wine/vine, pen
                  (simple /p/, not aspirated), park (American /r/, not
                  retroflex)
                </p>
              </div>
            </div>

            <div className="ipa-language-card">
              <h4>🇷🇺 Russian Speakers</h4>
              <div className="challenges">
                <p>
                  <strong>Main Challenges:</strong>
                </p>
                <ul>
                  <li>
                    The 'th' sounds /θ/ and /ð/ (replaced with /s/ and /z/)
                  </li>
                  <li>The /h/ sound (often becomes /x/ or /g/)</li>
                  <li>The /w/ sound (Russian has only /v/)</li>
                  <li>Vowel reduction patterns (different from English)</li>
                </ul>
                <p>
                  <strong>Focus Practice:</strong> three/tree, this/zis, have
                  (soft /h/), wine/vine, about (with schwa)
                </p>
              </div>
            </div>

            <div className="ipa-language-card">
              <h4>🇰🇷 Korean Speakers</h4>
              <div className="challenges">
                <p>
                  <strong>Main Challenges:</strong>
                </p>
                <ul>
                  <li>The /f/ and /p/ distinction (Korean lacks /f/)</li>
                  <li>The /r/ and /l/ in different positions</li>
                  <li>Final consonant clusters (Korean simplifies these)</li>
                  <li>The /z/ sound (doesn't exist in Korean)</li>
                </ul>
                <p>
                  <strong>Focus Practice:</strong> fan/pan, right/light (initial
                  vs. final), asked/ask, zoo (not joo)
                </p>
              </div>
            </div>
          </div>

          <div className="ipa-tip-box">
            <p>
              <strong>Universal Tip:</strong> Don't try to fix everything at
              once! Choose 2-3 sounds that cause the most confusion in your
              communication, master those first, then move on to the next
              challenges. Use QuickPronounce to compare your accent with native
              speakers.
            </p>
          </div>
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
                /nɜːr/. This is where you put the emphasis: entrepre
                <strong>NEUR</strong>.
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

        {/* NEW: FAQ Section */}
        <section className="ipa-faq-section">
          <h2>Frequently Asked Questions About IPA</h2>

          <div className="ipa-faq-item">
            <h4>How long does it take to learn IPA?</h4>
            <p>
              Most learners can recognize and use the basic IPA symbols for
              English within 2-4 weeks of consistent practice. Mastering the
              sounds themselves takes longer, but understanding the symbols
              gives you immediate benefits when looking up new words.
            </p>
          </div>

          <div className="ipa-faq-item">
            <h4>Do I need to learn IPA for all languages?</h4>
            <p>
              No! Each language uses only a subset of IPA symbols. For English
              pronunciation, you only need about 44 symbols (phonemes). The IPA
              exists for nearly every language, but you only learn the symbols
              relevant to your target language.
            </p>
          </div>

          <div className="ipa-faq-item">
            <h4>Why do different dictionaries show slightly different IPA?</h4>
            <p>
              Different dictionaries may use slightly different conventions or
              target different accents. For example, British dictionaries
              typically show British pronunciation, while American dictionaries
              show American pronunciation. The core symbols remain the same, but
              vowel symbols especially may vary.
            </p>
          </div>

          <div className="ipa-faq-item">
            <h4>Can I type IPA symbols on my keyboard?</h4>
            <p>
              Yes! You can use IPA keyboards available online, copy and paste
              from IPA charts, or install IPA keyboard layouts on your computer.
              Many linguistic websites and tools (including QuickPronounce)
              display IPA for you, so you don't always need to type it yourself.
            </p>
          </div>

          <div className="ipa-faq-item">
            <h4>Is IPA the same as phonics?</h4>
            <p>
              No. Phonics teaches the relationship between English letters and
              sounds (useful for reading and spelling). IPA is a universal
              notation system that represents the actual sounds of speech,
              independent of spelling. IPA is more precise and works across all
              languages.
            </p>
          </div>

          <div className="ipa-faq-item">
            <h4>Should I learn British or American IPA?</h4>
            <p>
              Learn the IPA for the accent you want to speak! The symbols are
              the same, but the transcriptions differ to reflect pronunciation
              differences. QuickPronounce shows you IPA for multiple accents
              (American, British, Australian, and Indian English), so you can
              compare and choose.
            </p>
          </div>

          <div className="ipa-faq-item">
            <h4>What's the most difficult IPA symbol to master?</h4>
            <p>
              It depends on your native language! For many learners, the 'th'
              sounds (/θ/ and /ð/) are challenging because they don't exist in
              most languages. The schwa /ə/ is also tricky because learners
              often want to give every vowel its full value, but English reduces
              unstressed vowels to this neutral sound.
            </p>
          </div>
        </section>

        <section className="ipa-conclusion">
          <h2>Conclusion: Your Journey to Pronunciation Independence</h2>
          <p>
            The International Phonetic Alphabet is the key to unlocking the
            secrets of English pronunciation. By learning just a few dozen
            symbols, you gain the power to accurately pronounce any word,
            anywhere, anytime. You now understand:
          </p>
          <ul>
            <li>
              The complete set of English consonants, vowels, and diphthongs
            </li>
            <li>How to avoid common pronunciation mistakes</li>
            <li>Mouth positions for the most challenging sounds</li>
            <li>
              How connected speech changes pronunciation in natural conversation
            </li>
            <li>
              Specific challenges based on your native language background
            </li>
          </ul>
          <p>
            Use QuickPronounce as your daily practice partner to make IPA second
            nature. With consistent practice, you'll soon find yourself reading
            IPA as naturally as you read regular text.
          </p>
          <p>
            <strong>Your Next Steps:</strong> Start with 5 new words per day,
            focusing on their IPA transcriptions. Use QuickPronounce to verify
            your pronunciation, and record yourself to track your progress.
            Within a month, you'll notice a dramatic improvement in your
            pronunciation accuracy!
          </p>
          <p>
            Stay tuned for our next guides, where we'll tackle other common
            challenges like <strong>Silent Letters</strong>,{" "}
            <strong>Word Stress Patterns</strong>, and{" "}
            <strong>American vs. British Pronunciation</strong>!
          </p>
        </section>
      </main>
    </div>
  );
};

export default IPAGuide;
