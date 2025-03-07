import React from "react";
import { Mail } from "lucide-react";

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
            the challenges of pronouncing unfamiliar words. This platform was
            born from a personal need to improve pronunciation skills. Whether
            you're learning a new language or just want to improve your
            pronunciation, we're here to support your journey.
          </p>
        </div>
      </section>

      <div className="about-page-divider"></div>

      <section className="about-page-section" id="contact">
        <h2 className="about-page-section-title">Get In Touch</h2>
        <div className="about-page-content">
          <p className="about-page-text">
            Have questions or feedback? We'd love to hear from you! The easiest
            way to reach us is through email. Drop us a message, and we'll get
            back to you as soon as possible.
          </p>

          <div className="about-page-contact-card">
            <div className="about-page-icon-container">
              <Mail size={24} className="about-page-mail-icon" />
            </div>
            <div className="about-page-contact-info">
              <p className="about-page-contact-label">Email us at:</p>
              <a
                href="mailto:hello.quickpronounce@gmail.com"
                className="about-page-email-link"
              >
                hello.quickpronounce@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
