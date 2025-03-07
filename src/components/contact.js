import React from "react";
import { Mail, LucideInstagram } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="about-page-container" id="about">
      <section className="about-page-section">
        <h2 className="about-page-section-title">About Us</h2>
        <div className="about-page-content">
          <p className="about-page-text">
            Welcome to QuickPronounce! We're on a mission to help people around
            the world master pronunciation with simple, effective learning
            tools.
          </p>
          <p className="about-page-text">
            QuickPronounce was founded by a language enthusiast who understands
            the challenges of pronouncing unfamiliar words. Whether you're
            learning a new language or just want to improve your pronunciation,
            we're here to support your journey.
          </p>
        </div>
      </section>

      <div className="about-page-divider"></div>

      <section className="about-page-section" id="contact">
        <h2 className="about-page-section-title">Stay Connected</h2>
        <div className="about-page-content">
          <p className="about-page-text">
            Got questions? Wanna say hi? Hit us up through email or Instagram—
            we’re always around!
          </p>
          <p className="about-page-text">
            Whether you have feedback, feature requests, or just want to share
            how QuickPronounce has helped you, we'd love to hear from you. Our
            inbox and DMs are always open—so don’t be a stranger!
          </p>
          <p className="about-page-text">
            Follow us on Instagram to stay updated with the latest features,
            tips, and updates. We’re building something awesome, and you’re a
            part of it!
          </p>

          <div className="about-page-contact-icons">
            <a
              href="mailto:hello.quickpronounce@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="about-page-icon-link"
            >
              <Mail size={32} className="about-page-icon" />
            </a>
            <a
              href="https://www.instagram.com/quickpronounce/"
              target="_blank"
              rel="noopener noreferrer"
              className="about-page-icon-link"
            >
              <LucideInstagram size={32} className="about-page-icon" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
