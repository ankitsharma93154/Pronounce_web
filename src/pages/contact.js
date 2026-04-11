import React from "react";
import { Link } from "react-router-dom";
import { Mail, Linkedin, Twitter } from "lucide-react";
import "./Css/AboutPage.css";
import { Helmet } from "react-helmet";

const Contact = () => {
  return (
    <div className="about-page-container" id="contact-page">
      <Helmet>
        {/* OPTIMIZED TITLE TAG */}
        <title>Contact QuickPronounce | Support & English Accent Help</title>

        {/* OPTIMIZED META DESCRIPTION */}
        <meta
          name="description"
          content="Reach QuickPronounce for help with English pronunciation, audio accents, or IPA tips. Free support for learners worldwide."
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
          property="og:image:alt"
          content="QuickPronounce contact support page banner"
        />
        <meta
          property="og:url"
          content="https://www.quickpronounce.site/contact"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="QuickPronounce" />

        {/* JSON-LD Structured Data */}
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
              url: "https://www.quickpronounce.site",
              email: "hello.quickpronounce@gmail.com",
              contactType: "customer support",
              sameAs: [
                "https://twitter.com/AnkitKumar11451",
                "https://www.linkedin.com/in/ankit-kumar-sharma-99698028a/",
              ],
            },
          })}
        </script>
      </Helmet>

      <div className="about-page-inner">
        {/* Contact Section */}
        <section className="about-page-section" id="contact">
          <h1 className="about-page-section-title">Contact QuickPronounce</h1>
          <div className="about-page-content">
            <p className="about-page-section-text">
              Hey ! It's me Ankit, the person behind QuickPronounce. I’m always
              looking for ways to improve QuickPronounce for the learning
              community. Have a feature request or need help with a specific
              pronunciation? Reach out to me directly. I typically respond
              within 24 hours.
            </p>
            <p className="about-page-section-text">
              <strong>Founder:</strong> Ankit Kumar Sharma (B.Tech Computer
              Science student) <br />
              <strong>Project started:</strong> February 2025 <br />
              <strong>
                Primary contact:
              </strong> hello.quickpronounce@gmail.com <br />
              <strong>Typical reply window:</strong> within 24-48 hours
            </p>
            <p className="about-page-section-text">
              Your feedback helps make QuickPronounce the best free resource for
              English learners worldwide.
            </p>
            <p className="about-page-section-text">
              If you email, sharing your target accent, sample word list, or the
              exact issue you faced helps me give faster and more useful
              support.
            </p>
            <p className="about-page-section-text">
              Have other questions? Check out our{" "}
              <Link to="/faq" className="faq-page-link">
                FAQ page
              </Link>{" "}
              for quick answers before reaching out.
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

        {/* Support Section */}
        <section className="about-page-section" id="support">
          <h2 className="about-page-section-title">Support QuickPronounce</h2>
          <div className="about-page-content">
            <p className="about-page-section-text">
              QuickPronounce is a free tool built with passion for English
              learners worldwide. Your support helps us maintain and improve the
              service for everyone.
            </p>
            <p className="about-page-section-text">
              If you find this tool helpful, consider supporting us through
              Ko-fi. Every contribution, no matter how small, helps us continue
              developing new features and maintaining the platform.
            </p>
            <p className="about-page-section-text">
              Support is completely optional and does not affect access to any
              QuickPronounce features.
            </p>

            <div className="kofi-support-container">
              <a
                href="https://ko-fi.com/quickpronounce/tip"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="kofi-support-link"
                aria-label="Support QuickPronounce on Ko-fi"
              >
                <img
                  src="https://storage.ko-fi.com/cdn/cup-border.png"
                  alt="Ko-fi"
                  className="kofi-image"
                  width="36"
                  height="36"
                />
                <span className="kofi-text">Support on Ko-fi</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
