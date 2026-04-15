import React from "react";
import "./Css/AboutPage.css";
import { Helmet } from "react-helmet";

const AboutUs = () => {
  return (
    <div className="about-page-container" id="about">
      <Helmet>
        {/* OPTIMIZED TITLE TAG */}
        <title>About QuickPronounce: English Pronunciation Tool</title>

        {/* OPTIMIZED META DESCRIPTION */}
        <meta
          name="description"
          content="Learn about QuickPronounce, a free tool for mastering English pronunciation with audio in 4 accents and IPA transcriptions."
        />

        <link rel="canonical" href="https://www.quickpronounce.site/about" />

        {/* OPEN GRAPH */}
        <meta property="og:title" content="About QuickPronounce" />
        <meta
          property="og:description"
          content="Discover how QuickPronounce helps learners master English pronunciation with instant audio and phonetic transcriptions."
        />
        <meta
          property="og:image"
          content="https://www.quickpronounce.site/images/quickpronounce-about-banner.jpg"
        />
        <meta
          property="og:url"
          content="https://www.quickpronounce.site/about"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="QuickPronounce" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url: "https://www.quickpronounce.site/about",
            name: "About QuickPronounce",
            description:
              "Learn about QuickPronounce, a pronunciation tool offering audio in American, British, Indian, and Australian accents with IPA transcriptions.",
            mainEntity: {
              "@type": "Organization",
              name: "QuickPronounce",
              description:
                "A free web tool for English pronunciation learning.",
            },
          })}
        </script>
      </Helmet>

      <div className="about-page-inner">
        {/* About Us Section */}
        <section className="about-page-section">
          <h2 className="about-page-section-title">
            About Our Pronunciation Tool
          </h2>
          <div className="about-page-content">
            <p className="about-page-section-text">
              Welcome to <strong>QuickPronounce.</strong> I am a Computer
              Science student pursuing B.Tech. My name is
              <strong> Ankit Kumar Sharma</strong>, and I am the founder of this
              project. This was my first project, and I started it to solve my
              own pronunciation problem while learning and communicating in
              English.
            </p>
            <p className="about-page-section-text">
              Over time, it grew into something much bigger than I expected. I
              started building QuickPronounce in February last year, and it has
              now been more than a year of continuous work and improvement. I
              have personally handled everything in this project, including
              code, design, SEO, and growth. To move faster and make better
              decisions, I also used ChatGPT as a step-by-step guide during the
              journey.
            </p>
            <p className="about-page-section-text">
              There were days when I wanted to shut it down and try something
              else, but I stayed with it and it was worth it. If QuickPronounce
              has helped you in any way, feel free to email me directly at{" "}
              <strong>hello@quickpronounce.site</strong>. Any feedback is truly
              appreciated.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <div className="about-page-features-grid">
          {/* SEO Optimized List */}
          <section className="about-page-feature">
            <h3 className="about-page-feature-title">Pronunciation Features</h3>
            <div className="about-page-feature-content">
              <ul className="about-page-feature-list">
                <li>
                  Instant audio in <strong>4 major English accents</strong>
                </li>
                <li>
                  Accurate <strong>IPA (Phonetic) transcriptions</strong>
                </li>
                <li>Daily common mispronounced words highlights</li>
                <li>Free online dictionary with meanings and examples</li>
              </ul>
            </div>
          </section>

          {/* Why It Matters */}
          <section className="about-page-feature">
            <h3 className="about-page-feature-title">
              Why Audio Accents Matter
            </h3>
            <div className="about-page-feature-content">
              <ul className="about-page-feature-list">
                <li>
                  Understand regional variations with
                  <strong>
                    {" "}
                    American, British, Indian, and Australian
                  </strong>{" "}
                  accents
                </li>
                <li>Adapt to global communication standards</li>
                <li>
                  Build conversational confidence in any professional setting
                </li>
              </ul>
            </div>
          </section>

          {/* How It's Made */}
          <section className="about-page-feature">
            <h3 className="about-page-feature-title">Modern Technology</h3>
            <div className="about-page-feature-content">
              <ul className="about-page-feature-list">
                <li>
                  High-performance <strong>React application</strong> for fast
                  responsiveness
                </li>
                <li>
                  Advanced <strong>Speech Synthesis APIs</strong> for
                  high-fidelity audio
                </li>
                <li>
                  Optimized for <strong>fast loading speeds</strong> on slow
                  mobile networks
                </li>
              </ul>
            </div>
          </section>
        </div>

        <div className="about-page-divider"></div>

        {/* Editorial Policy Section */}
        <section className="about-page-section about-page-section--policy">
          <h2 className="about-page-section-title">Editorial Policy</h2>

          <div className="about-page-features-grid">
            <section className="about-page-feature">
              <h3 className="about-page-feature-title">Our Mission</h3>
              <div className="about-page-feature-content">
                <p className="about-page-section-text">
                  QuickPronounce publishes practical pronunciation content to
                  help learners speak clearly and confidently in real
                  conversations.
                </p>
              </div>
            </section>

            <section className="about-page-feature">
              <h3 className="about-page-feature-title">Content Standards</h3>
              <div className="about-page-feature-content">
                <ul className="about-page-feature-list">
                  <li>
                    Content must be original, useful, and written for learners
                    first.
                  </li>
                  <li>
                    Guides should include practical examples, drills, and clear
                    context for everyday communication.
                  </li>
                  <li>
                    We avoid deceptive, auto-generated, or low-value pages.
                  </li>
                </ul>
              </div>
            </section>

            <section className="about-page-feature">
              <h3 className="about-page-feature-title">
                Research and Fact Checking
              </h3>
              <div className="about-page-feature-content">
                <p className="about-page-section-text">
                  We review phonetics references, dictionary conventions, and
                  common learner patterns before publishing new guides. We
                  update content when better examples or clearer explanations
                  become available.
                </p>
              </div>
            </section>

            <section className="about-page-feature">
              <h3 className="about-page-feature-title">
                Author and Review Process
              </h3>
              <div className="about-page-feature-content">
                <p className="about-page-section-text">
                  QuickPronounce is founder-led by{" "}
                  <strong>Ankit Kumar Sharma</strong>. Content is written,
                  reviewed, and updated with a learner-first process focused on
                  clarity, practical usage, and factual accuracy before
                  publication.
                </p>
              </div>
            </section>

            <section className="about-page-feature">
              <h3 className="about-page-feature-title">
                Updates and Corrections
              </h3>
              <div className="about-page-feature-content">
                <p className="about-page-section-text">
                  If we discover inaccuracies, we revise the page and update the
                  content date when needed. You can report a correction request
                  through our contact page or by email.
                </p>
              </div>
            </section>

            <section className="about-page-feature">
              <h3 className="about-page-feature-title">AI Use Disclosure</h3>
              <div className="about-page-feature-content">
                <p className="about-page-section-text">
                  AI tools may be used to assist brainstorming, drafting, and
                  editing. Final content decisions, examples, and publication
                  are human-reviewed and controlled by the founder.
                </p>
              </div>
            </section>

            <section className="about-page-feature">
              <h3 className="about-page-feature-title">Contact</h3>
              <div className="about-page-feature-content">
                <p className="about-page-section-text">
                  Editorial questions or correction requests:{" "}
                  <strong>hello@quickpronounce.site</strong>
                </p>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
