import React from "react";
import { AudioWaveform, Globe, Book, Headphones } from "lucide-react";

const FeaturesPage = () => (
  <section id="features" className="pronunciation-tools-section">
    <div className="page-content">
      <h2 className="page-title">
        Improve Your English Pronunciation & Accent Clarity
      </h2>
      <p className="feature-subtitle">
        Master correct pronunciation with clear audio examples, phonetic
        transcriptions, and multiple accent options.
      </p>

      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <Globe className="feature-icon-svg" />
          </div>
          <h2>
            Pronounce Words in <strong>Different English Accents</strong>
          </h2>
          <p>
            Listen to accurate word pronunciations in <strong>American</strong>,{" "}
            <strong>British</strong>,<strong>Australian</strong>, and{" "}
            <strong>Indian English</strong>. This is perfect for{" "}
            <strong>students</strong>, <strong>professionals</strong>, and{" "}
            <strong>ESL learners </strong>who are looking to improve their
            <strong> spoken English </strong> for everyday conversations,
            business communication, and public speaking.
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
          <h2>
            <strong>Phonetic Transcriptions (IPA)</strong>
          </h2>
          <p>
            You can learn correct <strong>English pronunciation </strong> using
            <strong>
              International Phonetic Alphabet (IPA) transcriptions
            </strong>
            . Understand <strong>word stress</strong>,{" "}
            <strong>vowel sounds</strong>, and <strong>syllable breaks </strong>
            for clearer speech. Great for those who are preparing for{" "}
            <strong>IELTS</strong>, <strong>TOEFL</strong>, and other{" "}
            <strong>English proficiency exams</strong>.
          </p>
          <div className="feature-highlight">
            <span className="accent-tag ">
              <strong>Supports IPA Symbols</strong>
            </span>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <Headphones className="feature-icon-svg" />
          </div>
          <h2>
            <strong>Male & Female Voice Options</strong>
          </h2>
          <p>
            Hear words pronounced by both{" "}
            <strong>male and female voices</strong> for better
            <strong> listening comprehension</strong>. It is ideal for{" "}
            <strong>language learners</strong>,<strong>professionals</strong>,
            and <strong>students</strong> that are aiming for{" "}
            <strong>natural-sounding pronunciation</strong>.
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
          <h2>
            <strong>Word Meaning & Usage Examples</strong>
          </h2>
          <p>
            Expand your <strong>English vocabulary</strong> with{" "}
            <strong>definitions</strong> and
            <strong> real-world example sentences</strong>. Learn how words are
            used in different contexts and situations, improving both{" "}
            <strong>pronunciation</strong> and <strong>fluency</strong>.
          </p>
          <div className="feature-highlight">
            <span className="accent-tag ">
              <strong>Comprehensive Word Database</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="features-cta">
        <h3>Start Improving Your Pronunciation Today</h3>
        <p>
          Listen to correct pronunciations, practice different accents, and
          refine your spoken English skills.
        </p>
      </div>
    </div>
  </section>
);

export default FeaturesPage;
