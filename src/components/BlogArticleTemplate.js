import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./Css/BlogArticleTemplate.css";

const BlogArticleTemplate = ({
  seo = {},
  category,
  title,
  author,
  readTime,
  date,
  heroImage,
  heroImageAlt,
  cta,
  authorProfile,
  relatedArticles,
  showLearningWorkbook = true,
  children,
}) => {
  const location = useLocation();
  const defaultAuthorProfile = {
    name: "Ankit Kumar Sharma",
    role: "Founder, QuickPronounce",
    bio: "Builds practical English pronunciation resources focused on clarity, real-world speaking, and repeatable daily drills.",
  };

  const relatedMap = {
    "/blog/pronunciation-guide": [
      { to: "/blog/IPA-guide", label: "Read IPA symbols clearly" },
      {
        to: "/blog/american-vs-british",
        label: "Compare American and British sounds",
      },
      {
        to: "/blog/word-stress-rules-guide",
        label: "Train word stress patterns",
      },
    ],
    "/blog/pronunciation-tips": [
      {
        to: "/blog/connected-speech-guide",
        label: "Understand connected speech",
      },
      {
        to: "/blog/schwa-sound-guide",
        label: "Master the schwa sound",
      },
      {
        to: "/blog/minimal-pairs-training-plan",
        label: "Use minimal pairs training",
      },
    ],
    "/blog/american-vs-british": [
      { to: "/blog/IPA-guide", label: "Use IPA for accent comparison" },
      {
        to: "/blog/the-vs-thee-pronunciation",
        label: "Practice rhythm-based pronunciation",
      },
      {
        to: "/blog/can-vs-cant-pronunciation",
        label: "Fix high-impact listening confusions",
      },
    ],
  };

  const fallbackRelatedArticles = [
    { to: "/blog/IPA-guide", label: "Read IPA symbols with confidence" },
    {
      to: "/blog/connected-speech-guide",
      label: "Improve real conversation listening",
    },
    {
      to: "/blog/word-stress-rules-guide",
      label: "Practice stress for clearer speech",
    },
  ];

  const {
    pageTitle,
    description,
    canonicalUrl,
    ogTitle,
    ogDescription,
    ogImage,
    ogType = "article",
    extraMeta = [],
    structuredData,
  } = seo;
  const schemaBlocks = Array.isArray(structuredData)
    ? structuredData
    : structuredData
      ? [structuredData]
      : [];

  const breadcrumbItems = React.useMemo(() => {
    const items = [{ name: "Home", href: "/" }];
    const path = location.pathname;

    if (path.startsWith("/blog")) {
      items.push({ name: "Blog", href: "/blog" });
    }

    if (path !== "/" && path !== "/blog") {
      items.push({
        name: title || pageTitle || "Article",
        href: path,
      });
    }

    return items;
  }, [location.pathname, title, pageTitle]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://www.quickpronounce.site${item.href}`,
    })),
  };

  const metaParts = [author, readTime, date].filter(Boolean);
  const hasHeaderContent = Boolean(category || title || metaParts.length > 0);
  const ctaData =
    cta === false
      ? null
      : cta || {
          title: "Start Practicing",
          description:
            "Use QuickPronounce to check IPA, compare accents, and improve clarity.",
          buttonLabel: "Open QuickPronounce",
          buttonHref: "/",
        };

  const authorData = {
    ...defaultAuthorProfile,
    ...(authorProfile || {}),
  };

  const relatedGuides =
    Array.isArray(relatedArticles) && relatedArticles.length > 0
      ? relatedArticles
      : relatedMap[location.pathname] || fallbackRelatedArticles;

  return (
    <article className="bt-page-wrapper">
      <Helmet>
        {pageTitle ? <title>{pageTitle}</title> : null}
        {description ? <meta name="description" content={description} /> : null}
        {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}

        {ogTitle ? <meta property="og:title" content={ogTitle} /> : null}
        {ogDescription ? (
          <meta property="og:description" content={ogDescription} />
        ) : null}
        {canonicalUrl ? (
          <meta property="og:url" content={canonicalUrl} />
        ) : null}
        {ogType ? <meta property="og:type" content={ogType} /> : null}
        {ogImage ? <meta property="og:image" content={ogImage} /> : null}

        {extraMeta.map((metaTag, index) => {
          if (metaTag?.name) {
            return (
              <meta
                key={`name-${metaTag.name}-${index}`}
                name={metaTag.name}
                content={metaTag.content}
              />
            );
          }

          if (metaTag?.property) {
            return (
              <meta
                key={`property-${metaTag.property}-${index}`}
                property={metaTag.property}
                content={metaTag.content}
              />
            );
          }

          return null;
        })}

        {schemaBlocks.map((schema, index) => (
          <script key={`schema-${index}`} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}

        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="bt-article-container">
        <nav className="bt-breadcrumbs" aria-label="Breadcrumb">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;

            return isLast ? (
              <span key={item.href} className="bt-breadcrumb-current">
                {item.name}
              </span>
            ) : (
              <React.Fragment key={item.href}>
                <Link to={item.href} className="bt-breadcrumb-link">
                  {item.name}
                </Link>
                <span className="bt-breadcrumb-separator" aria-hidden="true">
                  /
                </span>
              </React.Fragment>
            );
          })}
        </nav>

        {hasHeaderContent ? (
          <header className="bt-header">
            {category ? <span className="bt-category">{category}</span> : null}
            {title ? <h1 className="bt-main-title">{title}</h1> : null}
            {metaParts.length > 0 ? (
              <div className="bt-meta">
                {metaParts.map((part, index) => (
                  <React.Fragment key={part}>
                    {index > 0 ? <span aria-hidden="true">|</span> : null}
                    <span>{part}</span>
                  </React.Fragment>
                ))}
              </div>
            ) : null}
          </header>
        ) : null}

        {heroImage ? (
          <img
            src={heroImage}
            alt={heroImageAlt || title}
            className="bt-hero-image"
          />
        ) : null}

        {children}

        {showLearningWorkbook ? (
          <section
            className="bt-workbook-box"
            aria-label="Extended practice workbook"
          >
            <h2 className="bt-workbook-title">
              Extended Pronunciation Practice Workbook
            </h2>
            <p>
              If you want long-term improvement, use this article as a training
              module instead of reading it once and moving on. Most learners
              improve when they combine focused listening, guided repetition,
              and weekly self-review. The key is consistency and transfer:
              practice should move from isolated words to real conversation
              tasks such as meetings, interviews, presentations, and everyday
              problem-solving.
            </p>

            <h3 className="bt-workbook-subtitle">
              How to use this article in 20 minutes
            </h3>
            <ol>
              <li>
                <strong>Minutes 1-5:</strong> skim section titles and choose one
                primary focus (for example stress, rhythm, or sound contrasts).
              </li>
              <li>
                <strong>Minutes 6-10:</strong> listen to target words or phrases
                and note what changes between slow and natural-speed speech.
              </li>
              <li>
                <strong>Minutes 11-15:</strong> practice aloud in short sentence
                chunks, not isolated tokens.
              </li>
              <li>
                <strong>Minutes 16-20:</strong> record a short sample and review
                one improvement point for tomorrow.
              </li>
            </ol>

            <h3 className="bt-workbook-subtitle">
              Weekly progression framework
            </h3>
            <p>
              A strong weekly plan includes one theme per day and one review
              day. Example structure: Monday (vowel contrasts), Tuesday
              (consonant accuracy), Wednesday (stress and rhythm), Thursday
              (connected speech), Friday (accent comparison), Saturday
              (conversation transfer), Sunday (recording review and reset). This
              approach prevents random practice and makes progress measurable.
            </p>

            <h3 className="bt-workbook-subtitle">
              Coach-style self-assessment rubric
            </h3>
            <ul>
              <li>
                <strong>Clarity:</strong> can listeners understand you on first
                hearing without repeated requests?
              </li>
              <li>
                <strong>Stress control:</strong> do multi-syllable words keep
                the correct primary stress in natural speech?
              </li>
              <li>
                <strong>Rhythm and pacing:</strong> does your speech avoid a
                flat syllable-by-syllable pattern?
              </li>
              <li>
                <strong>Sound contrasts:</strong> are key pairs (such as /iː/ vs
                /ɪ/, /v/ vs /w/, /θ/ vs /s/) consistently distinct?
              </li>
              <li>
                <strong>Transfer:</strong> can you apply improved pronunciation
                during live speaking, not only drills?
              </li>
            </ul>

            <h3 className="bt-workbook-subtitle">
              Troubleshooting when progress stalls
            </h3>
            <p>
              If your progress plateaus, reduce scope before increasing effort.
              Train fewer targets with higher precision. Common fixes include:
              slowing down recordings to identify hidden linking patterns,
              drilling one sentence family for three days, and replacing passive
              listening with active shadowing plus immediate playback. Many
              learners also improve by focusing on "high-cost errors"—the words
              that cause the most listener confusion in their own work or study
              context.
            </p>

            <h3 className="bt-workbook-subtitle">
              Evidence-informed practice principles
            </h3>
            <p>
              Effective pronunciation training usually follows four principles:
              repeated exposure, immediate feedback, spaced review, and
              meaningful context. In practice, that means hearing the target
              often, checking output with recordings, revisiting items over
              multiple days, and using words in communicative sentences. You do
              not need perfect native-like speech to communicate professionally.
              Intelligibility, consistency, and confidence are stronger goals
              for most learners.
            </p>

            <h3 className="bt-workbook-subtitle">
              Suggested resources to pair with this guide
            </h3>
            <ul>
              <li>IPA chart practice for visual sound mapping</li>
              <li>Short native audio clips for shadowing and timing control</li>
              <li>Weekly speaking journal with self-recorded samples</li>
              <li>Peer or teacher feedback on recurring error patterns</li>
            </ul>

            <h3 className="bt-workbook-subtitle">
              Teacher and self-study adaptation
            </h3>
            <p>
              You can use this workbook in two ways. For self-study, keep one
              notebook page per target pattern and track your weekly recordings.
              For classroom or coaching use, convert each subsection into a
              mini-lesson: model, guided repetition, communicative task, and
              feedback. This sequence works well in mixed-level groups because
              every learner can focus on different high-priority errors while
              practicing the same structure.
            </p>
            <p>
              In pair-work settings, one learner can act as the speaker and the
              other as a clarity checker. The checker listens for stress,
              endings, and contrast sounds, then gives one correction at a time.
              Limiting feedback to one or two points per cycle prevents overload
              and makes improvement easier to sustain. After two rounds, switch
              roles and repeat with new phrases.
            </p>

            <h3 className="bt-workbook-subtitle">
              High-impact sentence drills
            </h3>
            <p>
              Word-level drills are useful, but sentence-level drills create
              stronger speaking transfer. Try ten short patterns and rotate
              vocabulary each day. Examples: "I can confirm that...", "The main
              issue is...", "Could you repeat that?", "I&apos;ll send the update
              by...", "Let&apos;s compare both options." Practice each line
              slowly first, then at natural speed, then inside a brief role
              play. This mirrors real conversation pressure better than isolated
              repetition.
            </p>
            <ul>
              <li>Round 1: slow clarity (precise sounds and endings)</li>
              <li>Round 2: natural rhythm (linking and stress control)</li>
              <li>Round 3: spontaneous variation (new words, same frame)</li>
              <li>Round 4: recording and reflection (one correction target)</li>
            </ul>

            <h3 className="bt-workbook-subtitle">
              When to move to advanced practice
            </h3>
            <p>
              Move forward only after stable clarity appears in weekly samples.
              A practical signal is consistency across three recordings: if your
              target pattern remains clear in all three, advance to faster
              speech, longer turns, and more complex vocabulary. If clarity
              drops under speed, return to shorter chunks for two or three days
              before scaling again. Progress is rarely linear, and strategic
              resets are normal.
            </p>

            <p>
              Revisit this workbook section every week and track one metric:
              fewer repeats requested by listeners. That single outcome usually
              reflects real pronunciation improvement better than perfectionist
              accent goals.
            </p>

            <h3 className="bt-workbook-subtitle">
              Advanced extension for upper-intermediate learners
            </h3>
            <p>
              Once baseline clarity is stable, add task pressure. Practice with
              timed responses, topic shifts, and follow-up questions that force
              you to maintain pronunciation quality while thinking quickly.
              Examples include one-minute summaries, roleplay objections,
              customer-support problem solving, and interview-style behavioral
              answers. The goal is automaticity: keeping clear stress, endings,
              and key contrasts even when cognitive load increases.
            </p>
            <p>
              Use a simple three-round cycle. Round one: deliver the answer at
              comfortable speed while monitoring sound accuracy. Round two:
              increase speed by 10 to 15 percent and keep clarity stable. Round
              three: add spontaneity by changing examples or vocabulary without
              pausing. If clarity drops, return to round one and rebuild.
              Repeating this cycle over several weeks helps your improved
              pronunciation survive real conversation pressure.
            </p>
          </section>
        ) : null}

        <section className="bt-author-box" aria-label="Author information">
          <h2 className="bt-author-title">About the author</h2>
          <p className="bt-author-name">{authorData.name}</p>
          <p className="bt-author-role">{authorData.role}</p>
          <p className="bt-author-bio">{authorData.bio}</p>
          <p className="bt-author-links">
            <Link to="/about">About</Link>
            <span aria-hidden="true">|</span>
            <Link to="/editorial-policy">Editorial Policy</Link>
            <span aria-hidden="true">|</span>
            <Link to="/contact">Contact</Link>
          </p>
        </section>

        <section className="bt-related-box" aria-label="Related guides">
          <h2 className="bt-related-title">Related pronunciation guides</h2>
          <ul className="bt-related-list">
            {relatedGuides.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </section>

        {ctaData ? (
          <div className="bt-cta-box">
            <h2 className="bt-cta-title">{ctaData.title}</h2>
            {ctaData.description ? <p>{ctaData.description}</p> : null}
            {ctaData.buttonHref ? (
              <Link to={ctaData.buttonHref} className="bt-cta-btn">
                {ctaData.buttonLabel || "Read More"}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
};

export const BlogSection = ({ title, children }) => (
  <section
    className={`bt-section ${(() => {
      const normalizedTitle = (title || "").toLowerCase();
      if (normalizedTitle.includes("table of contents"))
        return "bt-section--toc";
      if (normalizedTitle.includes("common mistake"))
        return "bt-section--mistakes";
      if (
        normalizedTitle.includes("pro tip") ||
        normalizedTitle.includes("expert insight")
      )
        return "bt-section--pro";
      if (normalizedTitle.includes("faq")) return "bt-section--faq";
      return "";
    })()}`.trim()}
  >
    {title ? <h2 className="bt-section-title">{title}</h2> : null}
    {children}
  </section>
);

export default BlogArticleTemplate;
