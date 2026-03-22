import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import "./Css/TermsAndConditions.css";

const Disclaimer = () => {
  const lastUpdated = "March 22, 2026";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="tc-page-wrapper">
      <Helmet>
        <title>Disclaimer - QuickPronounce</title>
        <meta
          name="description"
          content="Read the QuickPronounce disclaimer for educational use, content accuracy limits, and third-party link and ad disclosures."
        />
        <link
          rel="canonical"
          href="https://www.quickpronounce.site/disclaimer"
        />
      </Helmet>

      <div className="tc-content-container">
        <h1 className="tc-main-title">Disclaimer</h1>
        <span className="tc-last-updated">Last Updated: {lastUpdated}</span>

        <section className="tc-section">
          <h2 className="tc-section-title">1. Educational Purpose</h2>
          <p className="tc-text">
            QuickPronounce provides educational content and pronunciation tools
            to help learners improve spoken English clarity. The information on
            this website is intended for general learning purposes only.
          </p>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">2. No Professional Advice</h2>
          <p className="tc-text">
            Content on QuickPronounce does not constitute professional language
            therapy, medical advice, legal advice, or any certified instruction.
            You should consult qualified professionals for specialized needs.
          </p>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">3. Accuracy and Completeness</h2>
          <p className="tc-text">
            We work to keep examples, pronunciation guidance, and related
            content accurate and current. However, language usage varies by
            region and context, and we do not guarantee that all content will
            always be complete, error-free, or suitable for every learning
            objective.
          </p>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">4. Third-Party Services</h2>
          <p className="tc-text">
            QuickPronounce may include third-party links, analytics tools, or ad
            services. We do not control third-party websites and are not
            responsible for their content, security, or policies.
          </p>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">5. Advertisement Disclosure</h2>
          <p className="tc-text">
            This website may display third-party advertising, including Google
            AdSense. Ads may be personalized based on cookies and usage signals
            as described in our Privacy Policy.
          </p>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">6. Contact</h2>
          <p className="tc-text">
            For questions about this disclaimer, contact:{" "}
            <strong>hello.quickpronounce@gmail.com</strong>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Disclaimer;
