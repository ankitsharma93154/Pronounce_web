import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../Css/IPA_Guide.css";
import BlogArticleTemplate from "../../components/BlogArticleTemplate";
import AdcashLeaderboard728x90 from "../../components/ads/AdcashLeaderboard728x90";
import AdcashBanner300x100 from "../../components/ads/AdcashBanner300x100";
import AdcashRectangle300x250 from "../../components/ads/AdcashRectangle300x250";
import SponsoredAdBlock from "../../components/ads/SponsoredAdBlock";
import IPA_img from "../../images/blogs/ipa-guide/IPA_GUIDE_img.webp";

const LEADERBOARD_728_ZONE_ID = "11183662";
const BANNER_300X100_ZONE_ID = "11183682";
const RECTANGLE_300X250_ZONE_ID = "11183698";

const IPASymbolCard = ({ symbol, example, description }) => (
  <div className="ipa-symbol-card">
    <span className="ipa-symbol">{symbol}</span>
    <span className="ipa-example">{example}</span>
    <span className="ipa-description">{description}</span>
  </div>
);

const IPAGuide = () => {
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === "undefined" ? 0 : window.innerWidth,
  );

  const topBannerZoneId = useMemo(() => {
    if (viewportWidth >= 1024) return LEADERBOARD_728_ZONE_ID;
    if (viewportWidth < 768 && viewportWidth > 0) return BANNER_300X100_ZONE_ID;
    return "";
  }, [viewportWidth]);

  const mobileRectangleZoneId = useMemo(() => {
    if (viewportWidth > 0 && viewportWidth < 768)
      return RECTANGLE_300X250_ZONE_ID;
    return "";
  }, [viewportWidth]);

  const renderTopBannerAd = () => {
    if (!topBannerZoneId) return null;
    if (viewportWidth >= 1024)
      return (
        <AdcashLeaderboard728x90
          zoneId={topBannerZoneId}
          className="blog-inline-ad"
        />
      );
    return (
      <AdcashBanner300x100
        zoneId={topBannerZoneId}
        className="blog-inline-ad"
      />
    );
  };

  const renderMobileRectangleAd = () => {
    if (!mobileRectangleZoneId) return null;
    return (
      <AdcashRectangle300x250
        zoneId={mobileRectangleZoneId}
        className="blog-mobile-rectangle-ad"
      />
    );
  };

  const mobileRectangleAdNode = renderMobileRectangleAd();

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Only the symbols people actually get wrong — not an exhaustive chart
  const trickyConsonants = [
    {
      symbol: "/θ/",
      example: "thin, math, three",
      description: "Voiceless 'th' — tongue between teeth, no voice",
    },
    {
      symbol: "/ð/",
      example: "this, mother, breathe",
      description: "Voiced 'th' — same position, add vibration",
    },
    {
      symbol: "/ŋ/",
      example: "sing, finger, think",
      description: "'ng' — no hard G after it in 'sing'",
    },
    {
      symbol: "/ʃ/",
      example: "shoe, nation, sure",
      description: "The 'sh' — appears in unexpected spellings",
    },
    {
      symbol: "/ʒ/",
      example: "measure, vision, beige",
      description: "The middle of 'measure' — rare but real",
    },
    {
      symbol: "/dʒ/",
      example: "judge, giraffe, age",
      description: "'j' sound — also spelled g, dg, ge",
    },
    {
      symbol: "/tʃ/",
      example: "church, future, catch",
      description: "'ch' sound — also spelled t, tch",
    },
  ];

  const vowelsThatConfuse = [
    {
      symbol: "/iː/",
      example: "beat, key, see, people",
      description: "Long tense 'ee' — hold it",
    },
    {
      symbol: "/ɪ/",
      example: "bit, women, gym, pretty",
      description: "Short lax 'i' — shorter and more relaxed than /iː/",
    },
    {
      symbol: "/e/",
      example: "bed, head, said, friend",
      description: "Short 'e' — mid-front, not as open as /æ/",
    },
    {
      symbol: "/æ/",
      example: "cat, hand, bad, laugh (AmE)",
      description: "Bright open 'a' — drop your jaw more than you think",
    },
    {
      symbol: "/ɑː/",
      example: "father, car, palm, spa",
      description: "Back open 'ah' — further back than /æ/",
    },
    {
      symbol: "/ʊ/",
      example: "put, book, could, wolf",
      description: "Short 'oo' — lax, like you almost gave up saying 'oo'",
    },
    {
      symbol: "/uː/",
      example: "food, blue, true, move",
      description: "Long 'oo' — fully rounded lips, pushed forward",
    },
    {
      symbol: "/ɜː/",
      example: "bird, her, learn, world",
      description: "The 'er' vowel — unique sound, not a vowel + r",
    },
    {
      symbol: "/ə/",
      example: "about, banana, the, sofa",
      description:
        "Schwa — the most common sound in English. Unstressed, neutral 'uh'",
    },
    {
      symbol: "/ʌ/",
      example: "cut, blood, come, enough",
      description: "Stressed version of the schwa — slightly more open",
    },
  ];

  const diphthongs = [
    {
      symbol: "/aɪ/",
      example: "my, buy, light, sky",
      description: "Glide from open 'a' toward 'ee'",
    },
    {
      symbol: "/eɪ/",
      example: "say, great, day, weight",
      description: "Glide from 'e' toward 'ee'",
    },
    {
      symbol: "/ɔɪ/",
      example: "boy, coin, voice, noise",
      description: "Glide from 'aw' toward 'ee'",
    },
    {
      symbol: "/aʊ/",
      example: "now, house, loud, doubt",
      description: "Glide from open 'a' toward 'oo'",
    },
    {
      symbol: "/əʊ/",
      example: "go, boat, know, soul (BrE)",
      description: "British: glide from schwa toward 'oo'",
    },
    {
      symbol: "/oʊ/",
      example: "go, boat, know, soul (AmE)",
      description: "American: glide from 'o' toward 'oo'",
    },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "How to Read IPA Symbols and Actually Pronounce English Words Correctly",
    description:
      "A practical guide to reading IPA transcriptions for English pronunciation — what the symbols mean, which ones trip people up, and how to use them alongside audio.",
    url: "https://www.quickpronounce.site/blog/ipa-guide",
    author: { "@type": "Person", name: "QuickPronounce Team" },
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
      "@id": "https://www.quickpronounce.site/blog/ipa-guide",
    },
    datePublished: "2025-01-10",
    dateModified: "2025-01-10",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do I need to learn every IPA symbol to improve my pronunciation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. For English, you only need about 44 sounds. Focus on the ones that don't exist in your native language — those are the ones causing your accent.",
        },
      },
      {
        "@type": "Question",
        name: "Is IPA different for British and American English?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The symbols are the same, but the transcriptions differ because the accents genuinely sound different. 'Dance' is /dɑːns/ in British English and /dæns/ in American English — a real vowel difference, not just a spelling convention.",
        },
      },
      {
        "@type": "Question",
        name: "What is the schwa and why does it matter so much?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The schwa /ə/ is the neutral unstressed vowel — the sound in the first syllable of 'about' or the last syllable of 'sofa'. It's the most common sound in English and the one most learners over-pronounce. Getting it right is the difference between sounding careful and sounding natural.",
        },
      },
      {
        "@type": "Question",
        name: "Can IPA replace listening to audio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Partly. IPA tells you exactly what sounds to make — it won't lie to you the way spelling does. But it can't replace your ears entirely. Use IPA to understand what you're aiming for, then use audio to calibrate. They work best together.",
        },
      },
    ],
  };

  const seo = {
    pageTitle: "How to Read IPA for English Pronunciation (With Real Examples)",
    description:
      "Learn what IPA symbols actually mean for English pronunciation. Understand vowels, consonants, stress marks, and the schwa — without memorising a linguistics textbook.",
    canonicalUrl: "https://www.quickpronounce.site/blog/ipa-guide",
    ogImage: "https://www.quickpronounce.site/images/ipa-guide-banner.jpg",
    extraMeta: [
      {
        name: "twitter:image",
        content: "https://www.quickpronounce.site/images/ipa-guide-banner.jpg",
      },
    ],
    structuredData: [articleSchema, faqSchema],
  };

  return (
    <BlogArticleTemplate
      seo={seo}
      category="Phonetics"
      title="How to Read IPA and Pronounce English Words Correctly"
      author="By QuickPronounce Team"
      readTime="7 min read"
      date="January 2025"
      heroImage={IPA_img}
      heroImageAlt="IPA phonetic transcription next to standard English spelling"
      cta={{
        title: "See IPA in action",
        description:
          "Type any word into QuickPronounce and get the IPA transcription for four English accents, with audio.",
        buttonLabel: "Try QuickPronounce",
        buttonHref: "/",
      }}
    >
      <div className="ipa-guide">
        <main className="container ipa-guide-content">
          {/* ── INTRO ─────────────────────────────────────────────── */}
          <section className="ipa-intro-section">
            <p>
              How do you pronounce the word <em>wind</em>? Does it rhyme with
              "blind" or with "sinned"? Without more context, you genuinely
              can't tell. That's not a trick question — it's just English
              spelling being English spelling.
            </p>
            <p>
              Now try <em>read</em>, <em>live</em>, <em>tear</em>, or{" "}
              <em>row</em>. Each one has two completely different pronunciations
              depending on meaning, and the spelling gives you nothing to go on.
              This isn't a quirk of a few unusual words — it's the default state
              of English. The language borrowed so heavily from French, Latin,
              Old Norse, and Greek that its spelling is essentially a historical
              archive, not a pronunciation guide.
            </p>
            <p>
              The <strong>International Phonetic Alphabet (IPA)</strong> was
              built specifically to fix this. Each symbol maps to one sound,
              without exception. When you see /wɪnd/ you know it rhymes with
              "sinned." When you see /waɪnd/ you know it rhymes with "blind." No
              guessing. That's the whole point.
            </p>
            <p>
              This guide covers the symbols you'll actually encounter when
              looking up English words — not the full global IPA chart, which
              represents sounds from hundreds of languages and is genuinely not
              something you need to memorise.
            </p>
          </section>

          {topBannerZoneId && (
            <SponsoredAdBlock
              className="blog-inline-ad-wrap"
              placement="inline"
            >
              {renderTopBannerAd()}
            </SponsoredAdBlock>
          )}

          {/* ── WHY BOTHER ────────────────────────────────────────── */}
          <section className="ipa-why-section">
            <h2>Why bother learning IPA?</h2>
            <p>
              The honest answer: you don't have to. You can improve your
              pronunciation by listening carefully, mimicking native speakers,
              and building up intuition over time. Plenty of people do.
            </p>
            <p>
              But IPA gives you something listening alone can't — a way to
              verify what you heard. When you're not sure if a word ends in /s/
              or /z/, or whether a vowel is /ɪ/ or /iː/, a dictionary entry
              settles it immediately. You're no longer guessing from spelling or
              trying to remember if a native speaker swallowed that syllable.
            </p>
            <p>
              Once you can read IPA, any dictionary becomes genuinely useful for
              pronunciation. You stop needing audio for every single word. And
              when you look up the same word in its British and American
              transcriptions, you can see exactly what's different and why — not
              just that they "sound a bit different."
            </p>

            <div className="ipa-honest-note">
              <p>
                <strong>One caveat worth knowing:</strong> IPA transcriptions in
                dictionaries are simplified. They show you the target sounds of
                a "standard" accent, not how any real person actually speaks. In
                connected natural speech, sounds blur, disappear, and influence
                each other constantly. IPA is the map, not the territory. Use it
                alongside audio, not instead of it.
              </p>
            </div>
          </section>

          {/* ── HOW TO READ A TRANSCRIPTION ───────────────────────── */}
          <section className="ipa-reading-section">
            <h2>How to read a transcription before touching the symbols</h2>
            <p>
              Before you learn any symbols, understand what the marks around and
              between them mean. Most people skip this and then get confused.
            </p>

            <div className="ipa-stress-table">
              <table>
                <thead>
                  <tr>
                    <th>Mark</th>
                    <th>Name</th>
                    <th>What it means</th>
                    <th>Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>ˈ</strong>
                    </td>
                    <td>Primary stress</td>
                    <td>
                      The syllable immediately after this gets the main emphasis
                    </td>
                    <td>
                      <em>photograph</em> /ˈfəʊtəɡrɑːf/ — stress on FOE
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ˌ</strong>
                    </td>
                    <td>Secondary stress</td>
                    <td>
                      Medium emphasis — less than primary, more than unstressed
                    </td>
                    <td>
                      <em>photographic</em> /ˌfəʊtəˈɡræfɪk/ — stress on GRAF
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ː</strong>
                    </td>
                    <td>Length mark</td>
                    <td>The vowel before it is held longer</td>
                    <td>
                      /iː/ in <em>beat</em> vs /ɪ/ in <em>bit</em>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>.</strong>
                    </td>
                    <td>Syllable break</td>
                    <td>Separates syllables in longer words</td>
                    <td>
                      <em>information</em> /ˌɪn.fəˈmeɪ.ʃən/
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              The stress mark is the one that actually changes meaning in
              English. <em>REcord</em> (noun) vs <em>reCORD</em> (verb).{" "}
              <em>PROtest</em> vs <em>proTEST</em>. <em>PERmit</em> vs{" "}
              <em>perMIT</em>. Getting stress wrong is the single biggest cause
              of miscommunication — more than individual sounds. Always find the
              ˈ first.
            </p>
          </section>

          {/* ── CONSONANTS ────────────────────────────────────────── */}
          <section className="ipa-decoding-section">
            <h2>The consonants worth learning</h2>
            <p>
              Most English consonants use symbols that look like their
              corresponding letters — /p/, /b/, /m/, /t/, /d/, /k/, /g/, /f/,
              /v/, /s/, /z/, /h/, /l/, /n/, /r/, /w/, /j/. You already know
              these. The ones below are the exceptions — symbols that look
              unfamiliar, or sounds that don't have a single letter in standard
              spelling.
            </p>

            <div className="ipa-consonants">
              <div className="ipa-symbol-grid">
                {trickyConsonants.map((item, index) => (
                  <IPASymbolCard key={index} {...item} />
                ))}
              </div>
            </div>

            <div className="ipa-inline-note">
              <p>
                Notice that <strong>/ŋ/</strong> never has a /g/ after it in
                words like <em>sing</em> /sɪŋ/ or <em>ring</em> /rɪŋ/. But in{" "}
                <em>finger</em> /ˈfɪŋɡər/, there is a /g/. The IPA spells it out
                exactly — no ambiguity.
              </p>
            </div>
          </section>

          {/* ── VOWELS ────────────────────────────────────────────── */}
          <section className="ipa-vowels-section">
            <h2>Vowels: where most pronunciation problems live</h2>
            <p>
              English has around 20 vowel sounds depending on the accent. Most
              languages have 5 to 7. That gap is why vowel errors are so
              persistent — your native language simply doesn't have slots for
              many of these sounds, so your brain maps them onto the nearest
              equivalent it knows.
            </p>
            <p>
              The good news: you don't need to perfect all 20. Most
              communication breakdowns come from a handful of distinctions. The
              /iː/ vs /ɪ/ pair causes real confusion (<em>leave</em> vs{" "}
              <em>live</em>). So does /æ/ vs /ɑː/ in different accents. Focus
              there first.
            </p>

            <div className="ipa-vowels">
              <h3>Pure vowels (monophthongs)</h3>
              <div className="ipa-symbol-grid">
                {vowelsThatConfuse.map((item, index) => (
                  <IPASymbolCard key={index} {...item} />
                ))}
              </div>
            </div>

            {/* SCHWA DEEP DIVE */}
            <div className="ipa-schwa-spotlight">
              <h3>The schwa /ə/ — English's most misunderstood sound</h3>
              <p>
                The schwa is the single most common sound in English. It appears
                in the first syllable of <em>about</em>, the second syllable of{" "}
                <em>garden</em>, both unstressed syllables of <em>banana</em>.
                It's a completely neutral, lazy vowel — the sound your mouth
                makes when it's not trying.
              </p>
              <p>
                Most learners avoid it. They give every vowel its "full" value
                because that feels more careful and correct. In practice, it
                makes you sound robotic. English rhythm is built on the contrast
                between stressed syllables (which carry the real vowel sounds)
                and unstressed ones (which collapse to /ə/). When you pronounce
                every syllable fully, that rhythm disappears.
              </p>
              <div className="ipa-schwa-examples">
                <div className="schwa-example-row">
                  <span className="schwa-word">about</span>
                  <span className="schwa-wrong">/æbaʊt/ ✗</span>
                  <span className="schwa-right">/əˈbaʊt/ ✓</span>
                </div>
                <div className="schwa-example-row">
                  <span className="schwa-word">photograph</span>
                  <span className="schwa-wrong">/ˈfoʊtoʊɡræf/ ✗</span>
                  <span className="schwa-right">/ˈfəʊtəɡrɑːf/ ✓</span>
                </div>
                <div className="schwa-example-row">
                  <span className="schwa-word">banana</span>
                  <span className="schwa-wrong">/bæˈnænæ/ ✗</span>
                  <span className="schwa-right">/bəˈnɑːnə/ ✓</span>
                </div>
                <div className="schwa-example-row">
                  <span className="schwa-word">parliament</span>
                  <span className="schwa-wrong">/ˈpɑːrliæment/ ✗</span>
                  <span className="schwa-right">/ˈpɑːləmənt/ ✓</span>
                </div>
              </div>
              <p>
                In IPA, every /ə/ is a signal:{" "}
                <em>don't stress this, don't fully pronounce this</em>. Once you
                train yourself to see it that way, your rhythm improves almost
                immediately.
              </p>
            </div>

            {/* DIPHTHONGS */}
            <div className="ipa-diphthongs">
              <h3>Diphthongs — the vowels that move</h3>
              <p>
                A diphthong is a vowel sound that glides from one position to
                another within the same syllable. When you say <em>my</em>, your
                tongue starts in a low open position and moves toward the /ɪ/
                position. That movement is the vowel — not a single steady
                sound.
              </p>
              <p>
                The most common error with diphthongs is turning them into pure
                vowels. In some accents and learner varieties of English,
                <em>day</em> /deɪ/ gets pronounced as a flat /deː/. It sounds
                close but slightly off — native speakers notice it even when
                they can't explain why.
              </p>
              <div className="ipa-symbol-grid">
                {diphthongs.map((item, index) => (
                  <IPASymbolCard key={index} {...item} />
                ))}
              </div>
            </div>
          </section>

          {viewportWidth >= 768 && (
            <SponsoredAdBlock
              className="leaderboard-ad-wrap container"
              placement="inline"
            >
              <AdcashLeaderboard728x90
                zoneId={LEADERBOARD_728_ZONE_ID}
                className="blog-inline-ad"
              />
            </SponsoredAdBlock>
          )}

          {viewportWidth > 0 &&
            viewportWidth < 768 &&
            mobileRectangleAdNode && (
              <SponsoredAdBlock
                className="mobile-results-rectangle-ad-wrap"
                placement="inline"
              >
                {mobileRectangleAdNode}
              </SponsoredAdBlock>
            )}

          {/* ── ACCENT COMPARISON ─────────────────────────────────── */}
          <section className="ipa-accent-section">
            <h2>What accent differences actually look like in IPA</h2>
            <p>
              One of the most useful things IPA does is show you exactly why two
              accents sound different — not just that they do. Here are three
              words that illustrate the most common systematic differences
              between American and British English.
            </p>

            <div className="ipa-accent-grid">
              <div className="ipa-accent-block">
                <div className="accent-word">dance</div>
                <div className="accent-row">
                  <span className="accent-label ame">AmE</span>
                  <span className="accent-ipa">/dæns/</span>
                  <span className="accent-note">
                    short front vowel /æ/ — bright and nasal
                  </span>
                </div>
                <div className="accent-row">
                  <span className="accent-label bre">BrE</span>
                  <span className="accent-ipa">/dɑːns/</span>
                  <span className="accent-note">
                    long back vowel /ɑː/ — open and rounded
                  </span>
                </div>
                <p className="accent-commentary">
                  This is the trap/bath split — one of the most systematic vowel
                  differences between the two accents. Words like <em>ask</em>,{" "}
                  <em>path</em>, <em>can't</em>, <em>laugh</em> all follow the
                  same pattern.
                </p>
              </div>

              <div className="ipa-accent-block">
                <div className="accent-word">car</div>
                <div className="accent-row">
                  <span className="accent-label ame">AmE</span>
                  <span className="accent-ipa">/kɑːr/</span>
                  <span className="accent-note">
                    rhotic — the /r/ is fully pronounced
                  </span>
                </div>
                <div className="accent-row">
                  <span className="accent-label bre">BrE</span>
                  <span className="accent-ipa">/kɑː/</span>
                  <span className="accent-note">
                    non-rhotic — the /r/ disappears before a consonant or pause
                  </span>
                </div>
                <p className="accent-commentary">
                  American English is rhotic — /r/ is pronounced wherever it's
                  written. Most British, Australian, and New Zealand accents are
                  non-rhotic. This single difference explains a huge chunk of
                  what makes the accents sound different.
                </p>
              </div>

              <div className="ipa-accent-block">
                <div className="accent-word">go</div>
                <div className="accent-row">
                  <span className="accent-label ame">AmE</span>
                  <span className="accent-ipa">/ɡoʊ/</span>
                  <span className="accent-note">
                    starts on a rounded mid back /o/
                  </span>
                </div>
                <div className="accent-row">
                  <span className="accent-label bre">BrE</span>
                  <span className="accent-ipa">/ɡəʊ/</span>
                  <span className="accent-note">
                    starts on a schwa /ə/ — a more central starting point
                  </span>
                </div>
                <p className="accent-commentary">
                  The same diphthong, but with different starting positions.
                  This affects words like <em>home</em>, <em>phone</em>,{" "}
                  <em>coat</em>, <em>road</em> — most of the "long o" words in
                  English.
                </p>
              </div>
            </div>

            <p className="ipa-accent-cta">
              <Link to="/" className="ipa-link-text">
                Check any word across all four accents on QuickPronounce →
              </Link>
            </p>
          </section>

          {/* ── COMMON MISTAKES ───────────────────────────────────── */}
          <section className="ipa-mistakes-section">
            <h2>The mistakes IPA actually helps you fix</h2>
            <p>
              These aren't abstract errors from a textbook. They're the specific
              sound confusions that IPA makes visible — and fixable.
            </p>

            <div className="ipa-mistake-card">
              <h4>/iː/ vs /ɪ/ — not just length</h4>
              <p>
                Most learners know /iː/ is "longer" than /ɪ/. What they miss is
                the tension difference. /iː/ is tense — the tongue is raised and
                the muscles in your face are engaged. /ɪ/ is lax — your face is
                neutral, you barely tried. <em>Sheep/ship</em>,{" "}
                <em>leave/live</em>, <em>feet/fit</em>. The meaning difference
                is real in all three pairs. IPA shows you they're different
                symbols, which prompts you to treat them as different targets —
                not just "the same sound, shorter."
              </p>
            </div>

            <div className="ipa-mistake-card">
              <h4>/θ/ and /ð/ — the physical problem</h4>
              <p>
                These sounds don't exist in most languages, so most learners
                replace them with the nearest thing they have. The result is{" "}
                <em>think</em> → "sink" (/θɪŋk/ → /sɪŋk/) and <em>this</em> →
                "dis" (/ðɪs/ → /dɪs/). The IPA makes clear these are separate
                symbols, not variants of /s/ or /d/. The physical fix: tongue
                between your teeth. For /θ/, blow air — no voice. For /ð/, same
                position, add voice. Practice
                <em> thin/sin</em> and <em>than/Dan</em> as pairs until your
                mouth finds the position automatically.
              </p>
            </div>

            <div className="ipa-mistake-card">
              <h4>Stress: the mistake that actually breaks communication</h4>
              <p>
                Individual sound errors are often forgiven by context. Stress
                errors are harder to recover from — misplace the stress and the
                word can become literally unrecognisable. "DEsert" is a dry
                landscape; "deSERT" means to abandon someone. "PROgress" is a
                noun; "proGRESS" is a verb. The IPA ˈ mark is sitting right
                there in every dictionary entry. Before you practise a new
                word's sounds, find the stress mark first.
              </p>
            </div>

            <div className="ipa-mistake-card">
              <h4>Fully pronouncing function words</h4>
              <p>
                Native English speakers reduce small grammatical words — "to",
                "and", "can", "of", "for" — to their weak forms in natural
                speech. "Can" /kæn/ becomes /kən/. "To" /tuː/ becomes /tə/. "Of"
                /ɒv/ becomes /əv/. When learners give these words their full
                pronunciation, the sentence sounds unnatural and the rhythm
                breaks down. If a word's IPA shows a schwa in the unstressed
                position, that's not a shortcut — it's the correct pronunciation
                in that context.
              </p>
            </div>
          </section>

          {/* ── CONNECTED SPEECH (condensed, honest) ─────────────── */}
          <section className="ipa-connected-speech">
            <h2>Why individual words aren't the whole picture</h2>
            <p>
              IPA transcriptions in dictionaries show words in isolation. Real
              speech doesn't work that way. When words run together, sounds at
              word boundaries change, disappear, or influence each other. This
              is called connected speech and it's why fast native speech sounds
              so different from the individual words you've been practising.
            </p>

            <div className="ipa-connected-grid">
              <div className="ipa-connected-card">
                <h4>Linking</h4>
                <p>
                  A consonant at the end of one word joins to the vowel starting
                  the next. <em>An apple</em> → "a-napple." <em>Take it</em> →
                  "tay-kit." This is why fast speech sounds like one long word.
                </p>
              </div>
              <div className="ipa-connected-card">
                <h4>Elision</h4>
                <p>
                  Sounds drop entirely in fast speech. The /t/ in{" "}
                  <em>next day</em> → /neksdeɪ/. The /d/ in <em>handbag</em> →
                  /hænbæɡ/. IPA for isolated words won't show you this — but
                  knowing the symbols helps you hear it when it happens.
                </p>
              </div>
              <div className="ipa-connected-card">
                <h4>Assimilation</h4>
                <p>
                  One sound changes to match its neighbour. <em>Ten people</em>→
                  /tem piːpəl/ — the /n/ shifts to /m/ because it's anticipating
                  the /p/. <em>Good boy</em> → /ɡʊb bɔɪ/. Natural, not sloppy.
                </p>
              </div>
              <div className="ipa-connected-card">
                <h4>Weak forms</h4>
                <p>
                  Articles, prepositions, and auxiliaries reduce in natural
                  speech. <em>I can go</em> → /aɪ kən ɡəʊ/ not /aɪ kæn ɡoʊ/. The
                  full forms exist — you'll hear them when the word is being
                  emphasised. Otherwise, expect /ə/.
                </p>
              </div>
            </div>
          </section>

          {/* ── HOW TO USE QP ─────────────────────────────────────── */}
          <section className="ipa-practice-section">
            <h2>How to actually use this</h2>
            <p>
              The goal isn't to memorise the IPA chart. It's to be able to look
              up any word and extract useful information from its transcription.
              That takes about a week of regular practice to get comfortable
              with.
            </p>
            <div className="ipa-steps-grid">
              <div className="ipa-step-card">
                <span className="step-number">1</span>
                <h4>Find the stress mark first</h4>
                <p>
                  Before you decode any vowels, locate ˈ. That syllable is your
                  anchor — everything else in the word is lighter.
                </p>
              </div>
              <div className="ipa-step-card">
                <span className="step-number">2</span>
                <h4>Count the schwas</h4>
                <p>
                  Every /ə/ in the transcription is a syllable you should be
                  reducing. How many does the word have? More than you expected
                  is usually the honest answer.
                </p>
              </div>
              <div className="ipa-step-card">
                <span className="step-number">3</span>
                <h4>Compare accents side by side</h4>
                <p>
                  Use QuickPronounce to see the IPA for AmE and BrE at the same
                  time. The differences are visible, not just audible — you can
                  see exactly which vowel changed.
                </p>
              </div>
              <div className="ipa-step-card">
                <span className="step-number">4</span>
                <h4>Say it once with the IPA in front of you</h4>
                <p>
                  Then play the audio. If what you said and what you heard
                  match, the symbols worked. If they don't, the symbol you got
                  wrong is the one to focus on.
                </p>
              </div>
            </div>
          </section>

          {/* ── FAQ ───────────────────────────────────────────────── */}
          <section className="ipa-faq-section">
            <h2>Common questions</h2>

            <div className="ipa-faq-item">
              <h4>Do I need to learn every IPA symbol?</h4>
              <p>
                No. For English, focus on the symbols you'll actually encounter.
                Start with the ones that don't exist in your native language —
                those are the gaps causing your accent. The rest you'll learn
                passively as you look up words.
              </p>
            </div>

            <div className="ipa-faq-item">
              <h4>
                Different dictionaries show different IPA for the same word.
                Which is right?
              </h4>
              <p>
                Both, usually. They're targeting different accents, or using
                slightly different conventions. Cambridge typically transcribes
                British RP. Merriam-Webster transcribes General American.
                Neither is more "correct" — they're just different accents.
                QuickPronounce shows you both, with audio, so you can decide
                which accent you're aiming for.
              </p>
            </div>

            <div className="ipa-faq-item">
              <h4>Can IPA replace listening to native speakers?</h4>
              <p>
                No, and it shouldn't try to. IPA tells you what sounds to aim
                for. Audio tells you what those sounds actually feel like and
                how they shift in real speech. One Ace Linguist post put it
                well: "write what you heard, not what you think you heard." Use
                IPA to understand what you're aiming for, use audio to
                calibrate.
              </p>
            </div>

            <div className="ipa-faq-item">
              <h4>How long before IPA stops feeling slow and effortful?</h4>
              <p>
                For most people, 2–3 weeks of regular use. The vowel symbols
                take longest — the consonants click into place faster because
                many look like regular letters. The schwa /ə/ is usually the
                last thing to become automatic, because it appears so often and
                the temptation to over-pronounce it never fully goes away.
              </p>
            </div>
          </section>

          {/* ── CONCLUSION ────────────────────────────────────────── */}
          <section className="ipa-conclusion">
            <h2>The short version</h2>
            <p>
              English spelling will not help you pronounce English words. IPA
              will. The symbols are not mysterious once you know that most of
              them look exactly like regular letters, and the ones that don't
              are there precisely because no existing letter could do the job.
            </p>
            <p>
              Find the stress mark first. Look for the schwas. Notice where your
              accent's transcription differs from the target. Listen to the
              audio to calibrate. Repeat with the next word.
            </p>
            <p>That's the loop. It gets faster quickly.</p>
          </section>
        </main>
      </div>
    </BlogArticleTemplate>
  );
};

export default IPAGuide;
