import React from "react";
import { Mail, Linkedin, Twitter } from "lucide-react";
import "./Css/AboutPage.css";
import { Helmet } from "react-helmet";

const AboutPage = () => {
  return (
    <div className="about-page-container" id="about">
      <Helmet>
        <title>Contact Us | QuickPronounce</title>
        <meta
          name="description"
          content="Get in touch with the QuickPronounce team. We’d love to hear your feedback or questions!"
        />
        <meta
          name="keywords"
          content="QuickPronounce contact, pronunciation app support, reach QuickPronounce"
        />
      </Helmet>
      <div className="about-page-inner">
        {/* About Us Section */}
        <section className="about-page-section">
          <h2 className="about-page-section-title">About Us</h2>
          <div className="about-page-content">
            <p className="about-page-section-text">
              Welcome to <strong>QuickPronounce</strong> — your go-to tool for
              mastering English pronunciation in seconds. Our mission is to
              simplify the way people around the world learn how to pronounce
              English words correctly.
            </p>
            <p className="about-page-section-text">
              Built by a passionate solo dev from India, this platform was born
              out of frustration. I struggled to quickly find how words were
              pronounced online — so I created a tool that solves that, not just
              for me, but for anyone who's ever felt the same.
            </p>
            <p className="about-page-section-text">
              Whether you're an ESL learner, a curious native speaker, a
              teacher, or just a pronunciation nerd — QuickPronounce is designed
              to be fast, reliable, and super easy to use.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <div className="about-page-features-grid">
          {/* What We Do */}
          <section className="about-page-feature">
            <h3 className="about-page-feature-title">
              What QuickPronounce Offers
            </h3>
            <div className="about-page-feature-content">
              <ul className="about-page-feature-list">
                <li>Hear real-time pronunciation of English words</li>
                <li>Learn phonetics and common mispronunciations</li>
                <li>Explore daily word highlights and pronunciation tips</li>
                <li>Improve your speaking skills and build confidence</li>
              </ul>
            </div>
          </section>

          {/* Why It Matters */}
          <section className="about-page-feature">
            <h3 className="about-page-feature-title">
              Why Pronunciation Matters
            </h3>
            <div className="about-page-feature-content">
              <p className="about-page-text">
                Good pronunciation builds confidence and helps you communicate
                clearly. Whether you're preparing for a presentation, a job
                interview, or just everyday conversation, getting it right makes
                a big difference. QuickPronounce makes it simple and accessible.
              </p>
            </div>
          </section>

          {/* How It's Made */}
          <section className="about-page-feature">
            <h3 className="about-page-feature-title">How It's Built</h3>
            <div className="about-page-feature-content">
              <p className="about-page-text">
                QuickPronounce is built using modern web technologies like{" "}
                <strong>React</strong> and powered by speech APIs to deliver
                clear audio instantly. It's fully responsive, optimized for
                mobile, and created with a love for smooth, fast design.
              </p>
            </div>
          </section>
        </div>

        <div className="about-page-divider"></div>

        {/* Contact Section */}
        <section className="about-page-section" id="contact">
          <h2 className="about-page-section-title">Stay Connected</h2>
          <div className="about-page-content">
            <p className="about-page-section-text">
              Got questions? Wanna say hi? Hit me up through email, X, or
              LinkedIn—I'm always around!
            </p>
            <p className="about-page-section-text">
              Whether you have feedback, feature requests, or just want to share
              how QuickPronounce has helped you, I'd love to hear from you. My
              inbox and DMs are always open—so don't be a stranger!
            </p>
            <p className="about-page-section-text">
              Follow me on social media to stay updated with new features,
              pronunciation tips, and language learning content.
            </p>

            <div className="about-page-contact-icons">
              <a
                href="mailto:hello.quickpronounce@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="about-page-icon-link"
                aria-label="Email us at hello.quickpronounce@gmail.com"
              >
                <Mail size={32} className="about-page-icon" />
              </a>
              <a
                href="https://x.com/AnkitKumar11451"
                target="_blank"
                rel="noopener noreferrer"
                className="about-page-icon-link"
                aria-label="Visit our X (formerly Twitter) page"
              >
                <Twitter size={32} className="about-page-icon" />
              </a>
              <a
                href="https://www.linkedin.com/in/ankit-kumar-sharma-99698028a/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-page-icon-link"
                aria-label="Visit our LinkedIn page"
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
