import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "./Css/AdvertisePage.css";
import SEO from "../components/SEO";

const stats = [
  { value: "75,000+", label: "Monthly Users" },
  { value: "90,000+", label: "Monthly Page Views" },
  { value: "2,500+", label: "Daily Users" },
  { value: "50%+", label: "Audience from the United States" },
  { value: "Majority", label: "Traffic from Organic Search" },
  { value: "~1.5 min", label: "Average Session Duration" },
  { value: "100+", label: "Countries Reached" },
];

const opportunities = [
  "Featured placement below search results",
  "Inline placement within pronunciation results",
  "Sponsored mentions within blog content",
];

const reasons = [
  "High-intent users actively searching for pronunciation help",
  "Strong US-based audience",
  "Clean, focused user experience",
  "Consistent organic traffic presence",
];

const audienceGroups = [
  "Students and exam learners",
  "Professionals improving spoken English",
  "Global users searching pronunciation help",
];

const faqItems = [
  {
    question: "What types of sponsorships are available?",
    answer:
      "We currently offer featured placements below search results, inline placements within pronunciation results, and sponsored mentions in selected blog content.",
  },
  {
    question: "Can I request performance details?",
    answer:
      "Yes. Detailed analytics and traffic insights can be shared upon request during the sponsorship discussion.",
  },
  {
    question: "Do you offer custom placements?",
    answer:
      "Yes. Custom placements can be discussed based on campaign goals, fit, and timeline.",
  },
];

const Advertise = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="advertise-page" id="advertise-page">
      <SEO
        title="Advertise With Us - QuickPronounce"
        description="Explore sponsorship opportunities with QuickPronounce and reach a global English-learning audience through clean, high-intent placements."
        path="/advertise"
        ogType="website"
        ogTitle="Advertise With Us | QuickPronounce"
        ogDescription="Partner with QuickPronounce to reach students, professionals, and global learners focused on improving English pronunciation."
      />

      <Helmet>
        <meta property="og:site_name" content="QuickPronounce" />
      </Helmet>

      <div className="container advertise-page__container">
        <section className="advertise-section advertise-section--hero">
          <span className="advertise-section__label">Sponsorship</span>
          <h1>Advertise With Us</h1>
          <p>
            QuickPronounce helps thousands of users improve their English
            pronunciation every day. We offer sponsorship opportunities for
            brands looking to reach a global, English-learning audience.
          </p>
          <p className="advertise-section__support-line">
            Best suited for education tools, writing tools, and learning-focused
            products.
          </p>
        </section>

        <section
          className="advertise-section"
          aria-labelledby="traffic-and-audience"
        >
          <span className="advertise-section__label">Traffic and Audience</span>
          <h2 id="traffic-and-audience">QuickPronounce at a Glance</h2>
          <div className="advertise-stats-grid" role="list">
            {stats.map((stat) => (
              <article
                className="advertise-card advertise-stat-card"
                key={stat.label}
                role="listitem"
              >
                <p className="advertise-stat-card__value">{stat.value}</p>
                <p className="advertise-stat-card__label">{stat.label}</p>
              </article>
            ))}
          </div>

          <div className="advertise-audience-layout">
            <article
              className="advertise-subblock"
              aria-labelledby="who-you-reach"
            >
              <h3 id="who-you-reach">Who You Reach</h3>
              <p className="advertise-section__text">
                Our users include students, professionals, and global learners
                actively working to improve their English pronunciation and
                communication skills.
              </p>
              <div className="advertise-audience-grid" role="list">
                {audienceGroups.map((group) => (
                  <article
                    className="advertise-card"
                    key={group}
                    role="listitem"
                  >
                    <p>{group}</p>
                  </article>
                ))}
              </div>
            </article>

            <article
              className="advertise-subblock"
              aria-labelledby="traffic-quality"
            >
              <h3 id="traffic-quality">Traffic Quality</h3>
              <ul className="advertise-list advertise-list--compact">
                <li>Majority organic search traffic</li>
                <li>
                  High-intent queries focused on pronunciation and language
                  learning
                </li>
                <li>Strong US and global audience</li>
              </ul>
            </article>
          </div>
        </section>

        <section
          className="advertise-section"
          aria-labelledby="partnership-options"
        >
          <span className="advertise-section__label">Partnership Options</span>
          <h2 id="partnership-options">Opportunities and Sponsorship Fit</h2>
          <div className="advertise-partnership-layout">
            <article
              className="advertise-subblock"
              aria-labelledby="opportunities"
            >
              <h3 id="opportunities">Sponsorship Opportunities</h3>
              <div className="advertise-opportunities-grid">
                {opportunities.map((item) => (
                  <article className="advertise-card" key={item}>
                    <p>{item}</p>
                  </article>
                ))}
              </div>
            </article>

            <article
              className="advertise-subblock"
              aria-labelledby="why-sponsor"
            >
              <h3 id="why-sponsor">Why Sponsor QuickPronounce</h3>
              <ul className="advertise-list">
                {reasons.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section
          className="advertise-section advertise-section--cta"
          aria-labelledby="pricing-contact"
        >
          <span className="advertise-section__label">Pricing and Contact</span>
          <h2 id="pricing-contact">Simple Pricing and Direct Contact</h2>
          <div className="advertise-card advertise-card--pricing">
            <p>Flexible pricing based on placement and duration</p>
            <p>Plans typically start from $50/week</p>
            <p className="advertise-section__text advertise-section__text--small">
              For sponsorship inquiries, contact:
            </p>
            <a
              className="advertise-contact-link"
              href="mailto:hello@quickpronounce.site"
            >
              hello@quickpronounce.site
            </a>
            <p className="advertise-section__text advertise-section__text--small">
              Detailed analytics and traffic insights can be shared upon
              request.
            </p>
          </div>
        </section>

        <section className="advertise-section" aria-labelledby="advertise-faq">
          <span className="advertise-section__label">FAQ</span>
          <h2 id="advertise-faq">Sponsor FAQ</h2>
          <div className="advertise-faq-grid">
            {faqItems.map((item) => (
              <article className="advertise-card" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Advertise;
