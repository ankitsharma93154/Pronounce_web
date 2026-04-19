import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Css/TermsAndConditions.css";
import SEO from "../components/SEO";

const TermsAndConditions = () => {
  const lastUpdated = "March 22, 2026";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="tc-page-wrapper">
      <SEO
        title="Terms and Conditions - QuickPronounce"
        description="Read the terms and conditions for using QuickPronounce, your free English pronunciation tool."
        path="/terms-and-conditions"
        ogType="website"
        ogTitle="Terms and Conditions | QuickPronounce"
        ogDescription="Review QuickPronounce service terms, acceptable use rules, intellectual property, and liability limitations."
        keywords="terms and conditions, QuickPronounce terms, acceptable use policy, intellectual property, liability disclaimer"
      />

      <Helmet></Helmet>

      <div className="tc-content-container">
        <h1 className="tc-main-title">Terms and Conditions</h1>
        <span className="tc-last-updated">Last Updated: {lastUpdated}</span>

        <section className="tc-section">
          <h2 className="tc-section-title">
            1. Introduction / Acceptance of Terms
          </h2>
          <p className="tc-text">
            By accessing or using QuickPronounce, users agree to comply with
            these Terms and Conditions. These terms constitute a legal agreement
            between you and QuickPronounce. By using our website, you
            acknowledge that you have read, understood, and agree to be bound by
            these terms.
          </p>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">2. Description of the Service</h2>
          <p className="tc-text">
            QuickPronounce is an educational platform dedicated to helping users
            improve their English pronunciation skills. Our services include:
          </p>
          <ul className="tc-list">
            <li className="tc-list-item">
              Interactive pronunciation tools and guides
            </li>
            <li className="tc-list-item">
              Educational content about English phonetics
            </li>
            <li className="tc-list-item">
              Learning resources for pronunciation improvement
            </li>
            <li className="tc-list-item">
              Free access to pronunciation tips and techniques
            </li>
          </ul>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">3. Educational Disclaimer</h2>
          <div className="tc-highlight-box">
            <p className="tc-highlight-text">
              The content provided on QuickPronounce is for educational and
              informational purposes only. While we strive for accuracy, we
              cannot guarantee the completeness or correctness of all
              information provided.
            </p>
            <p className="tc-highlight-text">
              This content should not be considered as professional linguistic
              advice, medical advice, or a substitute for formal language
              instruction. Users should consult qualified professionals for
              specific pronunciation needs.
            </p>
          </div>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">4. Intellectual Property</h2>
          <p className="tc-text">
            All content on QuickPronounce, including but not limited to text,
            images, website design, audio content, and interactive features, is
            owned by QuickPronounce and protected by copyright, trademark, and
            other intellectual property laws.
          </p>
          <p className="tc-text">
            Users may not copy, reproduce, distribute, modify, or create
            derivative works from our content without prior written permission.
            Any unauthorized use of our intellectual property is strictly
            prohibited.
          </p>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">5. Acceptable Use</h2>
          <p className="tc-text">
            Users agree to use QuickPronounce responsibly and in compliance with
            applicable laws. The following activities are strictly prohibited:
          </p>
          <ul className="tc-list">
            <li className="tc-list-item">
              Scraping or copying large portions of the website content
            </li>
            <li className="tc-list-item">
              Using automated tools, bots, or scripts to access or interact with
              the service
            </li>
            <li className="tc-list-item">
              Attempting to hack, disrupt, or compromise the website's security
            </li>
            <li className="tc-list-item">
              Misusing the content for commercial purposes without permission
            </li>
            <li className="tc-list-item">
              Engaging in any activity that could harm the website or other
              users
            </li>
          </ul>
          <p className="tc-text">
            We reserve the right to suspend or terminate access for users who
            violate these terms.
          </p>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">6. Third-Party Links</h2>
          <p className="tc-text">
            QuickPronounce may contain links to third-party websites or
            resources. These links are provided for convenience and
            informational purposes only. We do not control or endorse the
            content, policies, or practices of these third-party sites.
          </p>
          <p className="tc-text">
            We are not responsible for the availability, accuracy, or content of
            third-party websites, and we encourage users to review the terms and
            privacy policies of any external sites they visit.
          </p>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">7. Advertising and Ad Use</h2>
          <p className="tc-text">
            QuickPronounce may display advertising provided by third-party
            partners, including Google AdSense. Ad delivery may use cookies or
            similar technologies as described in our Privacy Policy.
          </p>
          <p className="tc-text">
            Users must not engage in invalid activity related to ads, including
            automated clicks, incentivized clicks, misleading ad interactions,
            or any attempt to artificially inflate impressions or revenue.
          </p>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">8. Limitation of Liability</h2>
          <p className="tc-text">
            To the maximum extent permitted by law, QuickPronounce and its
            developers, owners, and affiliates shall not be liable for any
            direct, indirect, incidental, special, or consequential damages
            arising out of or in connection with:
          </p>
          <ul className="tc-list">
            <li className="tc-list-item">
              The use or inability to use our service
            </li>
            <li className="tc-list-item">
              Any errors or omissions in the content
            </li>
            <li className="tc-list-item">Interruptions or technical issues</li>
            <li className="tc-list-item">Loss of data or information</li>
          </ul>
          <p className="tc-text">
            Users use QuickPronounce at their own risk and assume full
            responsibility for any consequences of their use.
          </p>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">9. Changes to the Terms</h2>
          <p className="tc-text">
            We reserve the right to modify these Terms and Conditions at any
            time without prior notice. Any changes will be effective immediately
            upon posting on this page. We will update the "Last Updated" date at
            the top of this page to reflect changes.
          </p>
          <p className="tc-text">
            Your continued use of QuickPronounce after any such changes
            constitutes your acceptance of the updated terms. We encourage users
            to review these terms periodically.
          </p>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">10. Contact Information</h2>
          <p className="tc-text">
            If you have any questions, concerns, or inquiries about these Terms
            and Conditions, please contact us:
          </p>
          <p className="tc-text">
            <strong>Email:</strong> hello@quickpronounce.site
          </p>
          <p className="tc-text">
            You can also reach us through our{" "}
            <Link to="/contact" className="tc-link">
              contact page
            </Link>
            .
          </p>
        </section>

        <section className="tc-section">
          <h2 className="tc-section-title">11. Governing Law</h2>
          <p className="tc-text">
            These Terms and Conditions are governed by and construed in
            accordance with the laws of India. Any disputes arising from these
            terms shall be subject to the exclusive jurisdiction of the courts
            in India.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
