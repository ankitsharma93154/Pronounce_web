import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "./Css/PrivacyPolicy.css";
import SEO from "../components/SEO";

const PrivacyPolicy = () => {
  const lastUpdated = "March 22, 2026";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pp-page-wrapper">
      <SEO
        title="Privacy Policy - QuickPronounce"
        description="Read the QuickPronounce privacy policy to learn how we collect, use, and protect your data, including our use of cookies and third-party advertising technologies."
        path="/privacy-policy"
        ogType="website"
        ogTitle="Privacy Policy | QuickPronounce"
        ogDescription="Learn how QuickPronounce collects, uses, and protects data, including cookies and advertising partner disclosures."
        keywords="privacy policy, QuickPronounce privacy, cookies policy, data protection, AdSense privacy"
      />

      <Helmet></Helmet>
      <div className="pp-content-container">
        <h1 className="pp-main-title">Privacy Policy</h1>
        <span className="pp-last-updated">Last Updated: {lastUpdated}</span>

        <section className="pp-section">
          <h2 className="pp-section-title">1. Introduction</h2>
          <p className="pp-text">
            Welcome to{" "}
            <a
              href="https://www.quickpronounce.site"
              className="pp-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              QuickPronounce
            </a>
            . We value your privacy and are committed to protecting your data.
            This Privacy Policy explains how we collect, use, and safeguard
            information when you visit our website.
          </p>
        </section>

        <section className="pp-section">
          <h2 className="pp-section-title">2. Information We Collect</h2>
          <p className="pp-text">
            QuickPronounce does not require users to register or provide
            personal information to use the pronunciation tool. However, we may
            collect limited information, some of which may be considered
            personal data under applicable laws, such as:
          </p>
          <ul className="pp-list">
            <li className="pp-list-item">Browser type and version</li>
            <li className="pp-list-item">
              Device type (mobile, tablet, desktop)
            </li>
            <li className="pp-list-item">
              Pages visited and time spent on the site
            </li>
            <li className="pp-list-item">Referring website addresses</li>
            <li className="pp-list-item">IP address (logged automatically)</li>
          </ul>
        </section>

        <section className="pp-section">
          <h2 className="pp-section-title">3. How We Use Your Information</h2>
          <p className="pp-text">
            The information we collect is used for the following purposes:
          </p>
          <ul className="pp-list">
            <li className="pp-list-item">
              To improve website functionality and performance
            </li>
            <li className="pp-list-item">
              To understand how users interact with the site
            </li>
            <li className="pp-list-item">
              To serve relevant advertisements via third-party ad partners
            </li>
          </ul>
        </section>

        <section className="pp-section">
          <h2 className="pp-section-title">
            4. Advertising Partners and Cookies
          </h2>
          <p className="pp-text">
            This website uses third-party advertising partners (including Google
            AdSense) to display advertisements. To ensure transparency and
            compliance with Google policies, please note:
          </p>

          <div className="pp-highlight-box">
            <p className="pp-highlight-text">
              • Third-party vendors, including Google, use cookies to serve ads
              based on a user's prior visits to this website or other websites.
            </p>
            <p className="pp-highlight-text">
              • Google's advertising cookies enable it and its partners to serve
              ads based on your visit to this site and/or other sites on the
              Internet.
            </p>
          </div>

          <p className="pp-text">
            You may opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="pp-link"
            >
              Google Ads Settings
            </a>
            . You can also opt out of some third-party vendors’ uses of cookies
            for personalized advertising by visiting{" "}
            <a
              href="https://www.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
              className="pp-link"
            >
              www.aboutads.info
            </a>
            .
          </p>

          <p className="pp-text">
            To understand how Google may use data from sites that use its
            services, visit{" "}
            <a
              href="https://www.google.com/policies/privacy/partners/"
              target="_blank"
              rel="noopener noreferrer"
              className="pp-link"
            >
              How Google uses information from sites or apps that use our
              services
            </a>
            .
          </p>
        </section>

        <section className="pp-section">
          <h2 className="pp-section-title">5. Analytics</h2>
          <p className="pp-text">
            We use Umami Analytics to understand aggregate site usage (for
            example page visits, device type, and referring sources). This helps
            us improve content and user experience. We do not sell your personal
            data.
          </p>
        </section>

        <section className="pp-section">
          <h2 className="pp-section-title">6. Log Files</h2>
          <p className="pp-text">
            QuickPronounce follows standard procedures for using log files.
            These files log visitors when they visit websites. The information
            collected may include IP addresses, browser type, Internet Service
            Provider (ISP), date and time stamps, referring/exit pages, and
            click counts. This information is not linked to any personally
            identifiable data.
          </p>
        </section>

        <section className="pp-section">
          <h2 className="pp-section-title">7. GDPR & CCPA Rights</h2>
          <p className="pp-text">
            Depending on your location, you may have the following data
            protection rights:
          </p>
          <ul className="pp-list">
            <li className="pp-list-item">
              <strong>Right to access</strong> – Request copies of your data
            </li>
            <li className="pp-list-item">
              <strong>Right to rectification</strong> – Request correction of
              inaccurate data
            </li>
            <li className="pp-list-item">
              <strong>Right to erasure</strong> – Request deletion of your data
              under certain conditions
            </li>
            <li className="pp-list-item">
              <strong>Right to opt out of personalized ads</strong> – Manage ad
              personalization via Google Ads Settings
            </li>
          </ul>
          <p className="pp-text">
            To make a privacy-related request, contact us at
            <strong> hello@quickpronounce.site</strong>. We will review and
            respond within a reasonable time in accordance with applicable law.
          </p>
        </section>

        <section className="pp-section">
          <h2 className="pp-section-title">8. Children's Information</h2>
          <p className="pp-text">
            QuickPronounce does not knowingly collect any Personal Identifiable
            Information from children under the age of 13. If you believe that
            your child has provided personal information on this website, please
            contact us and we will promptly remove such information.
          </p>
        </section>

        <section className="pp-section">
          <h2 className="pp-section-title">9. Contact Us</h2>
          <p className="pp-text">
            If you have any questions or concerns about this Privacy Policy,
            feel free to contact us:
          </p>
          <p className="pp-text">
            <strong>Email:</strong> hello@quickpronounce.site
          </p>
        </section>

        <section className="pp-section">
          <h2 className="pp-section-title">10. Policy Updates</h2>
          <p className="pp-text">
            We may update this Privacy Policy from time to time to reflect
            changes to our services, advertising technology, analytics, legal
            obligations, or Google AdSense requirements. Any updates will be
            posted on this page with a revised "Last Updated" date.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
