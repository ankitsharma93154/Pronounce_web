import React, { useEffect, useMemo, useState } from "react";
import "../Css/Blog_3.css";
import BlogArticleTemplate from "../../components/BlogArticleTemplate";
import AdcashLeaderboard728x90 from "../../components/ads/AdcashLeaderboard728x90";
import AdcashBanner300x100 from "../../components/ads/AdcashBanner300x100";
import AdcashRectangle336x280 from "../../components/ads/AdcashRectangle336x280";
import AdcashRectangle300x250 from "../../components/ads/AdcashRectangle300x250";
import SponsoredAdBlock from "../../components/ads/SponsoredAdBlock";
import im1 from "../../images/blogs/american-vs-british/im1.webp";
import im2 from "../../images/blogs/american-vs-british/im2.webp";
import im3 from "../../images/blogs/american-vs-british/im3.webp";
import im4 from "../../images/blogs/american-vs-british/im4.webp";
import AmeVsBreThumbnail from "../../images/blogs/american-vs-british/AmeVsBre_thumbnail.webp";

const LEADERBOARD_728_ZONE_ID = "11183662";
const BANNER_300X100_ZONE_ID = "11183682";
const RECTANGLE_336X280_ZONE_ID = "11183690";
const RECTANGLE_300X250_ZONE_ID = "11183698";

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
      width="1200"
      height="800"
    />
  </div>
);

const soundDifferences = [
  {
    id: 1,
    title: "Rhotic vs. non-rhotic /r/",
    overview:
      "American English pronounces every /r/ you see written. British RP drops it after a vowel unless the next word starts with a vowel too. That's it. This one rule cascades across hundreds of words — and it's why British speech has those long, open vowels that Americans mistake for 'posh.'",
    ipa: "AmE: /kɑːr/ vs. BrE: /kɑː/",
    imageSrc: "rhotic_vs_nonrhotic.webp",
    practicalNote:
      "BrE speakers do add a linking /r/ in connected speech: 'car engine' gets its /r/ back because a vowel follows.",
    words: [
      {
        word: "Car",
        am: "kɑːr",
        br: "kɑː",
        tip: "BrE ends on the open vowel — no /r/ in sight.",
      },
      {
        word: "Water",
        am: "ˈwɔːtər",
        br: "ˈwɔːtə",
        tip: "The dropped /r/ makes -er endings feel softer.",
      },
      {
        word: "Mother",
        am: "ˈmʌðər",
        br: "ˈmʌðə",
        tip: "Consistent across all -er endings in RP.",
      },
      {
        word: "Four",
        am: "fɔːr",
        br: "fɔː",
        tip: "BrE compensates with a slightly longer vowel.",
      },
    ],
  },
  {
    id: 2,
    title: "The TRAP-BATH split",
    overview:
      "Sometime in the 17th–18th century, Southern British English started using a long /ɑː/ before certain consonants (f, s, θ, n, m). America had already left by then, so it kept the short /æ/. Northern British accents stayed /æ/ too — which is why a Manchester speaker sounds closer to an American here than to someone from London.",
    ipa: "AmE: /bæθ/ vs. BrE: /bɑːθ/",
    imageSrc: "short_vs_broad_a.webp",
    practicalNote:
      "Roughly 150 common words are affected. The rule applies before /f/, /s/, /θ/, and /n/ or /m/ followed by another consonant.",
    words: [
      {
        word: "Bath",
        am: "bæθ",
        br: "bɑːθ",
        tip: "The word the whole phenomenon is named after.",
      },
      {
        word: "Dance",
        am: "dæns",
        br: "dɑːns",
        tip: "/n/ before another consonant triggers the split.",
      },
      {
        word: "Plant",
        am: "plænt",
        br: "plɑːnt",
        tip: "/n/ + consonant cluster: same rule.",
      },
      {
        word: "Glass",
        am: "ɡlæs",
        br: "ɡlɑːs",
        tip: "Before /s/ at the end of a syllable.",
      },
      {
        word: "Path",
        am: "pæθ",
        br: "pɑːθ",
        tip: "Before /θ/ — same pattern as 'bath'.",
      },
    ],
  },
  {
    id: 3,
    title: "Intervocalic T-flapping",
    overview:
      "In American English, a /t/ sitting between two vowels doesn't get a full release — it taps, sounding almost like a quick /d/. This is called the flap. British English gives that /t/ its full, crisp articulation. The result is that 'water' and 'wader' are near-homophones in casual American speech — and American English naturally flows faster because of it.",
    ipa: "AmE: /ˈwɑːdər/ vs. BrE: /ˈwɒtə/",
    imageSrc: "flap_t_vs_true_t.webp",
    practicalNote:
      "The flap also merges 'ladder' and 'latter' in AmE — both become /ˈlædər/. British listeners find this genuinely confusing.",
    words: [
      {
        word: "Better",
        am: "ˈbɛdər",
        br: "ˈbɛtə",
        tip: "The flap makes it sound like 'bedder'.",
      },
      {
        word: "City",
        am: "ˈsɪdi",
        br: "ˈsɪti",
        tip: "The medial /t/ flaps to /d/ between vowels.",
      },
      {
        word: "Butter",
        am: "ˈbʌdər",
        br: "ˈbʌtə",
        tip: "Try both — the difference is stark.",
      },
      {
        word: "Matter",
        am: "ˈmædər",
        br: "ˈmætə",
        tip: "Sounds like 'madder' in AmE.",
      },
    ],
  },
  {
    id: 4,
    title: "The LOT vowel: /ɒ/ vs /ɑː/",
    overview:
      "British English has a short, rounded back vowel /ɒ/ — lips forward, like you're about to say 'oh' but stop halfway. American English merged this with /ɑː/, the long open vowel used in 'father.' The result: British 'hot' and 'got' sound rounder; American versions sound flatter. It's one of those differences native speakers notice but rarely consciously explain.",
    ipa: "AmE: /hɑːt/ vs. BrE: /hɒt/",
    imageSrc: "lot_cloth_vowel.webp",
    practicalNote:
      "For BrE, push your lips slightly forward for /ɒ/. For AmE, relax them completely — jaw drops, lips stay neutral.",
    words: [
      {
        word: "Hot",
        am: "hɑːt",
        br: "hɒt",
        tip: "Round your lips for the British version.",
      },
      {
        word: "Dog",
        am: "dɑːɡ",
        br: "dɒɡ",
        tip: "Notice the lip position difference.",
      },
      {
        word: "Boss",
        am: "bɑːs",
        br: "bɒs",
        tip: "Very common in workplace vocabulary.",
      },
      {
        word: "Coffee",
        am: "ˈkɑːfi",
        br: "ˈkɒfi",
        tip: "You'll hear this daily — worth drilling.",
      },
    ],
  },
];

const confusingWords = [
  {
    word: "Aluminum/Aluminium",
    am: "ə-ˈluː-mə-nəm",
    br: "ˌæl-jə-ˈmɪn-i-əm",
    tip: "Different spelling AND pronunciation — BrE adds a whole extra syllable.",
    category: "Different words",
  },
  {
    word: "Schedule",
    am: "ˈskedʒ-uːl",
    br: "ˈʃedʒ-uːl",
    tip: "AmE uses /sk/, BrE uses /ʃ/ (the 'sh' sound).",
    category: "Initial consonant",
  },
  {
    word: "Tomato",
    am: "tə-ˈmeɪ-toʊ",
    br: "tə-ˈmɑː-təʊ",
    tip: "The vowel in the second syllable is completely different.",
    category: "Vowel quality",
  },
  {
    word: "Herb",
    am: "ɜːrb",
    br: "hɜːb",
    tip: "AmE drops the /h/; BrE pronounces it clearly.",
    category: "Initial consonant",
  },
  {
    word: "Route",
    am: "ruːt / raʊt",
    br: "ruːt",
    tip: "AmE allows two pronunciations; BrE uses only one.",
    category: "Vowel quality",
  },
  {
    word: "Lieutenant",
    am: "luː-ˈten-ənt",
    br: "lef-ˈten-ənt",
    tip: "The first syllable is completely different in BrE — 'lef' not 'loo'.",
    category: "Different words",
  },
  {
    word: "Advertisement",
    am: "ˌæd-vər-ˈtaɪz-mənt",
    br: "əd-ˈvɜː-tɪs-mənt",
    tip: "Stress falls on different syllables entirely.",
    category: "Stress pattern",
  },
  {
    word: "Privacy",
    am: "ˈpraɪ-və-si",
    br: "ˈprɪv-ə-si",
    tip: "Long 'i' vs short 'i' in the first syllable.",
    category: "Vowel quality",
  },
  {
    word: "Garage",
    am: "ɡə-ˈrɑːʒ",
    br: "ˈɡær-ɑːʒ",
    tip: "AmE stresses the second syllable; BrE stresses the first.",
    category: "Stress pattern",
  },
  {
    word: "Figure",
    am: "ˈfɪɡ-jər",
    br: "ˈfɪɡ-ə",
    tip: "Classic rhotic vs non-rhotic difference.",
    category: "Rhotic 'r'",
  },
  {
    word: "Leisure",
    am: "ˈliː-ʒər",
    br: "ˈleʒ-ə",
    tip: "Different vowel sounds in the first syllable.",
    category: "Vowel quality",
  },
  {
    word: "Vase",
    am: "veɪs",
    br: "vɑːz",
    tip: "Long 'a' vs 'ah' — and AmE uses /s/ where BrE uses /z/.",
    category: "Different words",
  },
];

// Interactive sound rule explorer
const SoundRuleExplorer = () => {
  const [activeRule, setActiveRule] = useState(0);
  const [activeWord, setActiveWord] = useState(null);

  const rule = soundDifferences[activeRule];

  const handleTabClick = (i) => {
    setActiveRule(i);
    setActiveWord(null);
  };

  const handleWordClick = (i) => {
    setActiveWord(activeWord === i ? null : i);
  };

  return (
    <div className="avb-explorer">
      <div className="avb-explorer-tabs">
        {soundDifferences.map((r, i) => (
          <button
            key={r.id}
            className={`avb-explorer-tab${activeRule === i ? " active" : ""}`}
            onClick={() => handleTabClick(i)}
          >
            {i + 1} —{" "}
            {r.title
              .split(":")[0]
              .replace("Rhotic vs. non-rhotic", "The /r/")
              .replace("The TRAP-BATH split", "Bath vowel")
              .replace("Intervocalic T-flapping", "Flap /t/")
              .replace("The LOT vowel", "LOT vowel")}
          </button>
        ))}
      </div>

      <div className="avb-explorer-card">
        <LazyImage alt={rule.title} src={rule.imageSrc} />
        <h3 className="avb-explorer-rule-title">{rule.title}</h3>
        <p className="avb-explorer-overview">{rule.overview}</p>

        <div className="avb-ipa-pair">
          <div className="avb-ipa-chip">
            <span className="avb-ipa-label am">AmE</span>
            <span className="avb-ipa-val">
              {rule.ipa.split(" vs. ")[0].replace("AmE: ", "")}
            </span>
          </div>
          <div className="avb-ipa-chip">
            <span className="avb-ipa-label br">BrE</span>
            <span className="avb-ipa-val">
              {rule.ipa.split(" vs. ")[1].replace("BrE: ", "")}
            </span>
          </div>
        </div>

        {rule.practicalNote && (
          <div className="avb-practical-note">
            <strong>Note:</strong> {rule.practicalNote}
          </div>
        )}

        <p className="avb-words-prompt">Tap a word to see the breakdown</p>
        <div className="avb-words-row">
          {rule.words.map((w, i) => (
            <button
              key={i}
              className={`avb-word-pill${activeWord === i ? " selected" : ""}`}
              onClick={() => handleWordClick(i)}
            >
              {w.word}
            </button>
          ))}
        </div>

        {activeWord !== null && rule.words[activeWord] && (
          <div className="avb-word-detail">
            <span className="avb-word-detail-name">
              {rule.words[activeWord].word}
            </span>
            <div className="avb-word-detail-prons">
              <div className="avb-word-detail-pron">
                <span className="avb-ipa-label am">AmE</span>
                <span className="avb-word-detail-ipa">
                  /{rule.words[activeWord].am}/
                </span>
              </div>
              <div className="avb-word-detail-pron">
                <span className="avb-ipa-label br">BrE</span>
                <span className="avb-word-detail-ipa">
                  /{rule.words[activeWord].br}/
                </span>
              </div>
            </div>
            <p className="avb-word-detail-tip">{rule.words[activeWord].tip}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const PronunciationComparison = () => {
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === "undefined" ? 0 : window.innerWidth,
  );

  const topBannerZoneId = useMemo(() => {
    if (viewportWidth >= 1024) return LEADERBOARD_728_ZONE_ID;
    if (viewportWidth < 768 && viewportWidth > 0) return BANNER_300X100_ZONE_ID;
    return "";
  }, [viewportWidth]);

  const rectangleZoneId = useMemo(() => {
    if (viewportWidth >= 1200) return RECTANGLE_336X280_ZONE_ID;
    if (viewportWidth >= 768) return RECTANGLE_300X250_ZONE_ID;
    return "";
  }, [viewportWidth]);

  const mobileRectangleZoneId = useMemo(() => {
    if (viewportWidth > 0 && viewportWidth < 768) {
      return RECTANGLE_300X250_ZONE_ID;
    }
    return "";
  }, [viewportWidth]);

  const renderTopBannerAd = () => {
    if (!topBannerZoneId) return null;
    if (viewportWidth >= 1024) {
      return (
        <AdcashLeaderboard728x90
          zoneId={topBannerZoneId}
          className="blog-inline-ad"
        />
      );
    }
    return (
      <AdcashBanner300x100
        zoneId={topBannerZoneId}
        className="blog-inline-ad"
      />
    );
  };

  const renderRectangleAd = () => {
    if (!rectangleZoneId) return null;
    if (viewportWidth >= 1200) {
      return (
        <AdcashRectangle336x280
          zoneId={rectangleZoneId}
          className="blog-rectangle-ad"
        />
      );
    }
    return (
      <AdcashRectangle300x250
        zoneId={rectangleZoneId}
        className="blog-rectangle-ad"
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the main difference between American and British pronunciation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The most recognizable difference is rhoticity. American English is rhotic (pronounces the 'r' after vowels), while standard British English is non-rhotic (drops the 'r' sound unless followed by a vowel).",
        },
      },
      {
        "@type": "Question",
        name: "What is the TRAP-BATH split in English accents?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The TRAP-BATH split is a vowel difference where words like 'bath' or 'dance' use a short /ae/ in American English but a broad /a:/ in standard British English.",
        },
      },
    ],
  };

  const seo = {
    pageTitle: "How to Pronounce American vs British English: Audio + IPA",
    description:
      "Compare American vs British pronunciation audio side by side. Learn how to pronounce key differences with 4 sound rules, IPA symbols, and examples.",
    canonicalUrl: "https://www.quickpronounce.site/blog/american-vs-british",
    ogTitle: "American vs. British Pronunciation: Audio Guide to 4 Key Rules",
    ogDescription:
      "Struggling to hear the difference? Master these 4 English pronunciation audio rules to distinguish between American and British accents instantly.",
    ogImage: "https://www.quickpronounce.site/images/AmeVsBre_thumbnail.webp",
    extraMeta: [
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "AmE vs. BrE Pronunciation: Master the 4 Key Differences",
      },
      {
        name: "twitter:description",
        content:
          "Master English accents with real audio examples and IPA phonetic guides.",
      },
    ],
    structuredData: faqSchema,
  };

  return (
    <BlogArticleTemplate
      seo={seo}
      category="Accent Training"
      title="How to Pronounce American vs British English: 4 Core Sound Rules"
      author="By QuickPronounce Team"
      readTime="12 min read"
      date="October 2025"
      heroImage={AmeVsBreThumbnail}
      heroImageAlt="American and British pronunciation comparison"
      authorProfile={{
        name: "Ankit Kumar Sharma",
        role: "Founder, QuickPronounce",
        bio: "Publishes pronunciation explainers that turn accent theory into practical listening and speaking drills.",
      }}
      relatedArticles={[
        {
          to: "/blog/ipa-guide",
          label: "Use IPA to decode accent differences",
        },
        {
          to: "/blog/the-vs-thee-pronunciation",
          label: "Improve rhythm with article pronunciation rules",
        },
        {
          to: "/blog/minimal-pairs-training-plan",
          label: "Strengthen clarity in fast speech",
        },
      ]}
      cta={{
        title: "Ready to Master Both Accents?",
        description:
          "Use QuickPronounce to hear side-by-side comparisons in American, British, Australian, and Indian English with IPA transcriptions.",
        buttonLabel: "Try QuickPronounce Now",
        buttonHref: "/",
      }}
    >
      <div className="avb-comparison-blog">
        <main className="container avb-content">
          {/* Intro */}
          <section className="avb-intro-section">
            <p>
              The funny thing about American and British English is that the gap
              between them is <em>smaller</em> than most learners think — and
              also stranger. It's not random drift. Four phonetic shifts, most
              of them datable to specific centuries, account for the vast
              majority of what your ear notices. Once you see the pattern, you
              stop memorizing exceptions and start predicting them.
            </p>
            <p>
              This guide focuses on <strong>General American (GenAm)</strong>{" "}
              and <strong>Received Pronunciation (RP)</strong> — the reference
              accents used in international business, broadcast media, and
              language education. If someone's from Boston or Glasgow, different
              rules may apply, but these two are the baseline the rest of the
              world navigates from.
            </p>

            <div className="avb-tip-box">
              <span className="avb-tip-icon">🎯</span>
              <p>
                <strong>How to use this guide:</strong> Don't try to memorize
                individual words. Understand the 4 rules below and you'll be
                able to predict how thousands of words differ — including ones
                you've never seen before.
              </p>
            </div>
          </section>

          {topBannerZoneId && (
            <SponsoredAdBlock
              className="blog-inline-ad-wrap"
              placement="inline"
            >
              {renderTopBannerAd()}
            </SponsoredAdBlock>
          )}

          {/* Interactive Rule Explorer */}
          <section className="avb-difference-section">
            <h2 className="avb-section-title">
              🗣️ The 4 Fundamental Sound Differences
            </h2>
            <p className="avb-section-description">
              About 90% of the pronunciation differences between American and
              British English trace back to just four phonetic rules. Tap
              through each one below, then drill the example words.
            </p>

            <SoundRuleExplorer />
          </section>

          {mobileRectangleAdNode && (
            <SponsoredAdBlock
              className="blog-mobile-rectangle-ad-wrap"
              placement="inline"
            >
              {mobileRectangleAdNode}
            </SponsoredAdBlock>
          )}

          {/* Confusing words table */}
          <section className="confusing-section">
            <h2 className="section-title">
              📚 12 Words That Change Dramatically
            </h2>
            <p className="section-description">
              These words demonstrate multiple sound differences at once — which
              is exactly what makes them hard. They're grouped by the type of
              change so patterns are easier to spot.
            </p>

            <div className="confusing-words-table">
              <div className="table-header">
                <span className="col-word">Word</span>
                <span className="col-am">American (AmE)</span>
                <span className="col-br">British (BrE)</span>
                <span className="col-tip">What changed</span>
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

          {rectangleZoneId && (
            <SponsoredAdBlock
              className="blog-rectangle-ad-wrap"
              placement="bottom"
            >
              {renderRectangleAd()}
            </SponsoredAdBlock>
          )}

          {/* Practice section */}
          <section className="conclusion-section">
            <h2 className="section-title">🎯 How to Practice Effectively</h2>

            <div className="practice-tips-grid">
              <div className="practice-tip-card">
                <h4>Step 1: One rule at a time</h4>
                <p>
                  Spend a full week on just the rhotic /r/ before touching
                  anything else. Listen to 20–30 words with that pattern daily.
                  The goal isn't to know it exists — it's to recognize it
                  automatically without thinking.
                </p>
              </div>
              <div className="practice-tip-card">
                <h4>Step 2: Use minimal pairs</h4>
                <p>
                  Compare words that differ in one sound only. This trains your
                  ear to hear distinctions your brain currently treats as noise.
                  Flashcards with IPA are useful here — seeing the difference
                  written out reinforces what you're hearing.
                </p>
              </div>
              <div className="practice-tip-card">
                <h4>Step 3: Shadow native speakers</h4>
                <p>
                  Play a short clip of a native speaker, then immediately repeat
                  it — not word by word, but the whole phrase. Shadowing forces
                  you to internalize rhythm and intonation alongside individual
                  sounds. Ten minutes daily beats an hour once a week.
                </p>
              </div>
              <div className="practice-tip-card">
                <h4>Step 4: Record yourself</h4>
                <p>
                  Say "water," "better," and "schedule" in both accents, then
                  compare the recording to native speakers on QuickPronounce.
                  It's uncomfortable at first — but hearing your own voice
                  reveals things a teacher's correction never quite lands.
                </p>
              </div>
            </div>

            <div className="avb-tip-box">
              <span className="avb-tip-icon">⏱️</span>
              <p>
                <strong>Realistic timeline:</strong> With 15–20 minutes of
                focused daily practice, most learners can reliably distinguish
                and produce both accents within 2–3 months. Prioritize
                recognition first — production follows naturally once your ear
                catches up.
              </p>
            </div>
          </section>

          {/* Regional variation */}
          <section className="avb-regional-section">
            <h2 className="avb-section-title">
              🌍 Beyond the Standard Accents
            </h2>
            <p className="avb-section-description">
              English has been fragmenting regionally for centuries. The two
              standard accents in this guide are reference points, not the whole
              picture. A few variations worth knowing about:
            </p>

            <div className="avb-regional-grid">
              <div className="avb-region-card">
                <h3>Notable American variations</h3>
                <ul className="avb-region-list">
                  <li>
                    <strong>New York City:</strong> Older speakers are
                    non-rhotic — the "pahk the cah" stereotype actually belongs
                    here as much as Boston. Distinctive vowel shifts in words
                    like "coffee."
                  </li>
                  <li>
                    <strong>Southern States:</strong> Vowel lengthening,
                    distinctive diphthongs, and the pin-pen merger (/ɪ/ and /ɛ/
                    collapse before nasal consonants).
                  </li>
                  <li>
                    <strong>Boston:</strong> Non-rhotic like RP — one of the few
                    American dialects that dropped the /r/.
                  </li>
                  <li>
                    <strong>AAVE:</strong> Systematic grammatical and
                    phonological features with significant cultural influence on
                    mainstream American English.
                  </li>
                </ul>
              </div>
              <div className="avb-region-card">
                <h3>Notable British variations</h3>
                <ul className="avb-region-list">
                  <li>
                    <strong>Cockney (East London):</strong> Th-fronting (/θ/ →
                    /f/), glottal stops replacing /t/, rhyming slang. "Water"
                    becomes "wa'er."
                  </li>
                  <li>
                    <strong>Scottish English:</strong> Rhotic — like General
                    American, Scottish speakers keep their /r/ after vowels.
                  </li>
                  <li>
                    <strong>Northern England:</strong> Uses /æ/ in BATH words,
                    just like Americans. The TRAP-BATH split is a Southern
                    English phenomenon, not a British one.
                  </li>
                  <li>
                    <strong>Welsh English:</strong> Distinctive intonation
                    patterns and some consonant differences influenced by Welsh.
                  </li>
                </ul>
              </div>
            </div>

            <div className="avb-tip-box avb-regional-tip">
              <span className="avb-tip-icon">📖</span>
              <p>
                <strong>For learners:</strong> Start with GenAm or RP — they're
                the most widely intelligible internationally. Regional varieties
                get easier once you have a reference point to compare against.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="faq-section">
            <h2 className="section-title">❓ Common Questions</h2>

            <div className="faq-item">
              <h4>Which accent should I learn as a non-native speaker?</h4>
              <p>
                Follow your input. If you watch mostly American TV and plan to
                work in the US, American English is the obvious choice — you'll
                already be absorbing it passively. For British, Australian, or
                much of European professional contexts, RP is more useful. Both
                are globally understood; consistency matters more than which one
                you pick.
              </p>
            </div>

            <div className="faq-item">
              <h4>Can I mix American and British pronunciation?</h4>
              <p>
                It happens, especially with learners — but it creates friction.
                The issue isn't correctness, it's predictability: listeners
                calibrate to your accent in the first few seconds. Switching
                mid-conversation makes them work harder. Aim for consistency
                within whichever accent you're practicing.
              </p>
            </div>

            <div className="faq-item">
              <h4>Why does spelling differ (color/colour, realize/realise)?</h4>
              <p>
                Noah Webster deliberately reformed American spelling in the
                early 1800s to make it more phonetic and to give the new country
                a distinct linguistic identity. British spelling had already
                started standardizing in a different direction. The two systems
                then hardened separately — pronunciation and spelling evolved
                independently from that point.
              </p>
            </div>

            <div className="faq-item">
              <h4>Do native speakers always follow these rules?</h4>
              <p>
                The rules describe standard accents — they hold for the vast
                majority of speakers in each variety. But region, age,
                education, and social context all create variation. Think of
                them as reliable defaults with predictable exceptions, not
                universal laws.
              </p>
            </div>
          </section>
        </main>
      </div>
    </BlogArticleTemplate>
  );
};

export default PronunciationComparison;
