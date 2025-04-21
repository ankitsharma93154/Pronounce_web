import React from "react";
import { AudioWaveform, Globe, Book, Headphones } from "lucide-react";

const FeaturesPage = () => (
  <section id="features" className="pronunciation-tools-section">
    <div className="page-content">
      <h2 className="page-title">
        Improve Your English Pronunciation & Accent Clarity
      </h2>
      <p className="feature-subtitle">
        Our English pronunciation tool helps you master correct word
        pronunciation with clear audio, phonetic guides, and multiple accents.
        Perfect for pronunciation practice and learning how to pronounce words
        clearly and correctly.
      </p>

      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <Globe className="feature-icon-svg" />
          </div>
          <h3>Pronounce Words in Different English Accents</h3>
          <p>
            Learn how to pronounce difficult words in English with our
            pronunciation practice tool that offers accurate audio in{" "}
            <strong>American</strong>, <strong>British</strong>,
            <strong>Australian</strong>, and <strong>Indian English</strong>.
            Ideal for ESL learners who want to master correct English
            pronunciation and enhance their accent clarity for business
            communication and everyday conversations.
          </p>
          <div className="feature-highlight">
            <span className="accent-tag">
              <strong>American English</strong>
            </span>
            <span className="accent-tag">
              <strong>British English</strong>
            </span>
            <span className="accent-tag">
              <strong>Australian English</strong>
            </span>
            <span className="accent-tag">
              <strong>Indian English</strong>
            </span>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <AudioWaveform className="feature-icon-svg" />
          </div>
          <h3>Phonetic Transcriptions (IPA)</h3>
          <p>
            Use <strong>phonetic transcriptions</strong> with the International
            Phonetic Alphabet (IPA) to understand word sounds better. Gain clear
            insights into word stress, vowel sounds, and syllable breaks for
            more accurate speech. Particularly helpful for those preparing for
            IELTS, TOEFL, and other English proficiency exams.
          </p>
          <div className="feature-highlight">
            <span className="accent-tag">
              <strong>Supports IPA Symbols</strong>
            </span>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <Headphones className="feature-icon-svg" />
          </div>
          <h3>Male & Female Voice Options</h3>
          <p>
            This tool to pronounce words includes clear audio from both
            <strong> male and female voices</strong>, allowing you to practice
            with different tones and speaking styles. Our English pronunciation
            tool delivers high-quality audio examples to improve your listening
            comprehension and help you develop natural-sounding pronunciation.
          </p>
          <div className="feature-highlight">
            <span className="accent-tag">
              <strong>Clear & Natural Audio</strong>
            </span>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <Book className="feature-icon-svg" />
          </div>
          <h3>Word Meaning & Usage Examples</h3>
          <p>
            Expand your vocabulary while improving pronunciation by learning
            word meanings and proper usage. Get real-world examples to better
            understand context, which helps non-native speakers achieve more
            accurate pronunciation and improved overall fluency.
          </p>
          <div className="feature-highlight">
            <span className="accent-tag">
              <strong>Comprehensive Word Database</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="features-cta">
        <h3>Try Our Free English Pronunciation Tool Today</h3>
        <p>
          Practice how to pronounce words in different accents, listen to real
          voice audio, and get instant feedback using our free tool to pronounce
          words clearly and confidently. With phonetic transcriptions and
          multiple accent options, our pronounce words tool makes it easy to
          enhance your English speaking skills.
        </p>
      </div>
    </div>
  </section>
);

export default FeaturesPage;
