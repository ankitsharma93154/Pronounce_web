import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import "./Css/TermsAndConditions.css";

const EditorialPolicy = () => {
  const lastUpdated = "March 22, 2026";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="tc-page-wrapper">
      <Helmet>
        <title>Editorial Policy - QuickPronounce</title>
        <meta
          name="description"
          content="Read QuickPronounce editorial standards for content quality, fact-checking, updates, and corrections."
        />
        <link
          rel="canonical"
          href="https://www.quickpronounce.site/editorial-policy"
        />
      </Helmet>

      <div className="tc-content-container">
        <h1 className="tc-main-title">Editorial Policy</h1>
        <span className="tc-last-updated">Last Updated: {lastUpdated}</span>

        <section className="tc-section">
          <h2 className="tc-section-title">1. Our Mission</h2>
          <p className="tc-text">
            QuickPronounce publishes practical pronunciation content to help
            learners speak clearly and confidently in real conversations.
          </p>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">2. Content Standards</h2>
          <ul className="tc-list">
            <li className="tc-list-item">
              Content must be original, useful, and written for learners first.
            </li>
            <li className="tc-list-item">
              Guides should include practical examples, drills, and clear
              context for everyday communication.
            </li>
            <li className="tc-list-item">
              We avoid deceptive, auto-generated, or low-value pages.
            </li>
          </ul>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">3. Research and Fact Checking</h2>
          <p className="tc-text">
            We review phonetics references, dictionary conventions, and common
            learner patterns before publishing new guides. We update content
            when better examples or clearer explanations become available.
          </p>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">4. Author and Review Process</h2>
          <p className="tc-text">
            QuickPronounce is founder-led by <strong>Ankit Kumar Sharma</strong>
            . Content is written, reviewed, and updated with a learner-first
            process focused on clarity, practical usage, and factual accuracy
            before publication.
          </p>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">5. Updates and Corrections</h2>
          <p className="tc-text">
            If we discover inaccuracies, we revise the page and update the
            content date when needed. You can report a correction request
            through our contact page or by email.
          </p>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">6. AI Use Disclosure</h2>
          <p className="tc-text">
            AI tools may be used to assist brainstorming, drafting, and editing.
            Final content decisions, examples, and publication are
            human-reviewed and controlled by the founder.
          </p>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">7. Contact</h2>
          <p className="tc-text">
            Editorial questions or correction requests:{" "}
            <strong>hello.quickpronounce@gmail.com</strong>
          </p>
        </section>
      </div>
    </div>
  );
};

export default EditorialPolicy;
