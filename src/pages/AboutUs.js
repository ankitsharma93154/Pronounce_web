import React from "react";
import { Palette, Type, ExternalLink } from "lucide-react";
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
              <strong>hello.quickpronounce@gmail.com</strong>. Any feedback is
              truly appreciated.
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
              <p className="about-page-text">
                Clear communication relies on understanding regional variations.
                Comparing
                <strong> American, British, Indian, and Australian</strong>{" "}
                audio helps learners adapt to global standards and builds
                conversational confidence in any professional setting.
              </p>
            </div>
          </section>

          {/* How It's Made */}
          <section className="about-page-feature">
            <h3 className="about-page-feature-title">Modern Technology</h3>
            <div className="about-page-feature-content">
              <p className="about-page-text">
                QuickPronounce is a high-performance{" "}
                <strong>React application</strong>. It utilizes advanced Speech
                Synthesis APIs to deliver high-fidelity audio, optimized for
                <strong>fast loading speeds</strong> even on slow mobile
                networks.
              </p>
            </div>
          </section>
        </div>

        <div className="about-page-divider"></div>

        {/* Other Projects Section */}
        <section className="about-page-section">
          <h2 className="about-page-section-title">More Developer Tools</h2>
          <div className="about-page-content">
            <p className="about-page-section-text">
              I build web tools designed to solve specific creative and
              technical problems. Explore my other projects:
            </p>
          </div>

          <div className="about-page-features-grid">
            {/* ColorCura Project */}
            <section className="about-page-feature">
              <h3 className="about-page-feature-title">
                <a
                  href="https://colorcura.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <Palette size={20} />
                  ColorCura
                  <ExternalLink size={18} />
                </a>
              </h3>
              <div className="about-page-feature-content">
                <p className="about-page-text">
                  A visual color palette generator with live UI previews and
                  gradient tools for designers and MERN stack developers.
                </p>
              </div>
            </section>

            {/* LushFonts Project */}
            <section className="about-page-feature">
              <h3 className="about-page-feature-title">
                <a
                  href="https://lushfonts.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <Type size={20} />
                  LushFonts
                  <ExternalLink size={18} />
                </a>
              </h3>
              <div className="about-page-feature-content">
                <p className="about-page-text">
                  Instantly generate fancy text and font styles for social media
                  bios and creative design layouts.
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
