import React from "react";
import {
  Mail,
  Linkedin,
  Twitter,
  Palette,
  Type,
  ExternalLink,
} from "lucide-react";
import "./Css/AboutPage.css";
import { Helmet } from "react-helmet";

const AboutPage = () => {
  return (
    <div className="about-page-container" id="about">
      <Helmet>
        {/* OPTIMIZED TITLE TAG (Targeting 'Support' and 'Accents' keywords) */}
        <title>Contact QuickPronounce: English Accent Support & Feedback</title>

        {/* OPTIMIZED META DESCRIPTION (Including keywords: Audio, IPA, Accents) */}
        <meta
          name="description"
          content="Get support for our English pronunciation tool. Contact us regarding audio in 4 accents, IPA transcriptions, or feedback on how to improve your fluency."
        />

        <link rel="canonical" href="https://www.quickpronounce.site/contact" />

        {/* OPEN GRAPH */}
        <meta
          property="og:title"
          content="QuickPronounce Support: Feedback & Accents"
        />
        <meta
          property="og:description"
          content="Reach out for help with American, British, Indian, and Australian audio pronunciations. We value your feedback on our free learning tool."
        />
        <meta
          property="og:image"
          content="https://www.quickpronounce.site/images/quickpronounce-contact-banner.jpg"
        />
        <meta
          property="og:url"
          content="https://www.quickpronounce.site/contact"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="QuickPronounce" />

        {/* JSON-LD Structured Data: Expanded to help Google understand the contact purpose */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            url: "https://www.quickpronounce.site/contact",
            name: "Contact QuickPronounce",
            description:
              "Contact the QuickPronounce team for help with English pronunciation audio, accent comparisons, and IPA phonetic transcription support.",
            mainEntity: {
              "@type": "Organization",
              name: "QuickPronounce",
              email: "hello.quickpronounce@gmail.com",
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
              Welcome to <strong>QuickPronounce</strong> — a specialized web
              tool designed for mastering{" "}
              <strong>English pronunciation audio</strong> in seconds. Our
              mission is to simplify the way global learners hear and understand
              how to pronounce English words correctly across different regions.
            </p>
            <p className="about-page-section-text">
              Built by a solo developer from India, this project addresses a
              common gap: the need for instant{" "}
              <strong>American vs. British accent comparison</strong>. We
              provide clear audio and{" "}
              <strong>IPA phonetic transcriptions</strong> to help you visualize
              sounds before you speak.
            </p>
            <p className="about-page-section-text">
              Whether you are an ESL student, a teacher, or a professional
              preparing for an interview, QuickPronounce offers a fast,
              reliable, and mobile-friendly solution to pronunciation
              challenges.
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
                <strong>American, British, Indian, and Australian</strong> audio
                helps learners adapt to global standards and builds
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

        {/* Contact Section */}
        <section className="about-page-section" id="contact">
          <h2 className="about-page-section-title">Contact & Support</h2>
          <div className="about-page-content">
            <p className="about-page-section-text">
              Have a feature request or need help with a specific pronunciation?
              I am always looking for ways to improve the tool for the
              community.
            </p>
            <p className="about-page-section-text">
              Reach out via email or social media—I typically respond within 24
              hours. Your feedback helps make QuickPronounce the best free
              resource for English learners.
            </p>

            <div className="about-page-contact-icons">
              <a
                href="mailto:hello.quickpronounce@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="about-page-icon-link"
                aria-label="Send an email to QuickPronounce Support"
              >
                <Mail size={32} className="about-page-icon" />
              </a>
              <a
                href="https://x.com/AnkitKumar11451"
                target="_blank"
                rel="noopener noreferrer"
                className="about-page-icon-link"
                aria-label="Contact us on X / Twitter"
              >
                <Twitter size={32} className="about-page-icon" />
              </a>
              <a
                href="https://www.linkedin.com/in/ankit-kumar-sharma-99698028a/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-page-icon-link"
                aria-label="Connect with the developer on LinkedIn"
              >
                <Linkedin size={32} className="about-page-icon" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
