import React from "react";
import { AudioWaveform, Globe, Book, Mic2 } from "lucide-react";

const FeaturesPage = () => (
  <section id="features" className="pronunciation-features-section">
    <div className="features-container">
      <header className="features-header">
        <h2 className="features-title">
          Improve Your English Pronunciation <br />
          <span>with Audio, IPA, and Real Voices</span>
        </h2>

        <p className="features-subtitle">
          Improve your English pronunciation with clear audio, phonetic guides,
          and multiple accents. Whether you want to learn how to pronounce a
          word correctly, practice difficult sounds, or build confidence
          speaking English, our pronunciation tool makes learning easier.
        </p>
      </header>

      <div className="features-grid">
        <div className="feature-card-modern">
          <div className="feature-icon-wrapper">
            <Globe className="feature-icon-svg" />
          </div>

          <div className="feature-content">
            <h3>Listen to Multiple English Accents</h3>

            <p>
              Hear words spoken in American, British, Australian, and Indian
              English. Comparing accents helps you understand pronunciation
              differences and learn how words sound in real conversations around
              the world.
            </p>

            <div className="feature-tags">
              <span className="feature-tag">US Accent</span>
              <span className="feature-tag">UK Accent</span>
              <span className="feature-tag">AU Accent</span>
              <span className="feature-tag">IN Accent</span>
            </div>
          </div>
        </div>

        <div className="feature-card-modern">
          <div className="feature-icon-wrapper">
            <AudioWaveform className="feature-icon-svg" />
          </div>

          <div className="feature-content">
            <h3>Understand IPA and Word Stress</h3>

            <p>
              Learn the correct pronunciation of words using IPA symbols,
              syllable stress, and phonetic guides. These tools help learners
              improve speaking skills and prepare for exams like IELTS and
              TOEFL.
            </p>

            <div className="feature-tags">
              <span className="feature-tag">IPA Symbols</span>
              <span className="feature-tag">Word Stress</span>
            </div>
          </div>
        </div>

        <div className="feature-card-modern">
          <div className="feature-icon-wrapper">
            <Mic2 className="feature-icon-svg" />
          </div>

          <div className="feature-content">
            <h3>Natural Audio Pronunciation</h3>

            <p>
              Listen to clear male and female voices to hear exactly how a word
              is pronounced. The audio pronunciation feature helps you practice
              difficult words and improve your speaking confidence.
            </p>

            <div className="feature-tags">
              <span className="feature-tag">Real Voices</span>
              <span className="feature-tag">Clear Audio</span>
            </div>
          </div>
        </div>

        <div className="feature-card-modern">
          <div className="feature-icon-wrapper">
            <Book className="feature-icon-svg" />
          </div>

          <div className="feature-content">
            <h3>Learn Meanings and Usage Examples</h3>

            <p>
              Understanding a word goes beyond pronunciation. Explore meanings,
              definitions, and example sentences so you can use new vocabulary
              naturally while improving your English speaking skills.
            </p>

            <div className="feature-tags">
              <span className="feature-tag">Definitions</span>
              <span className="feature-tag">Examples</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="features-footer-cta">
        <div className="cta-content">
          <h3>Ready to improve your pronunciation?</h3>

          <p>
            Practice difficult words, explore different accents, and build
            confidence speaking English with our online pronunciation tool.
          </p>

          <button
            className="features-main-cta"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Practicing Now
          </button>
        </div>
      </footer>
    </div>
  </section>
);

export default FeaturesPage;
