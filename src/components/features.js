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
        transcriptions, and multiple accent options. Perfect for learners and
        professionals looking to improve their spoken English.
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
            Learn how to pronounce difficult words in English by listening to
            accurate pronunciations in <strong>American</strong>,{" "}
            <strong>British</strong>, <strong>Australian</strong>, and{" "}
            <strong>Indian English</strong>. This is ideal for{" "}
            <strong>students</strong>, <strong>professionals</strong>, and{" "}
            <strong>ESL learners</strong> who want to master{" "}
            <strong>correct English pronunciation</strong> and enhance their
            accent clarity. Perfect for those looking to refine their spoken
            English for everyday conversations, business communication, and
            public speaking.
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
            Use <strong>phonetic transcriptions</strong> with the International
            Phonetic Alphabet (IPA) to learn how to pronounce difficult words in
            English. Gain a deeper understanding of <strong>word stress</strong>
            , <strong>vowel sounds</strong>, and{" "}
            <strong>syllable breaks</strong> for clearer and more accurate
            speech. This feature is perfect for non-native speakers looking to
            learn <strong>correct English pronunciation</strong> and preparing
            for <strong>IELTS</strong>, <strong>TOEFL</strong>, and other
            English proficiency exams.
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
          <h2>
            <strong>Male & Female Voice Options</strong>
          </h2>
          <p>
            Hear clear pronunciations from both{" "}
            <strong>male and female voices</strong>, allowing you to practice
            listening and pronunciation skills with different tones and styles.
            Ideal for those looking for a{" "}
            <strong>free pronunciation audio for English learners</strong> to
            improve their listening comprehension. This feature helps language
            learners and professionals perfect their{" "}
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
            Expand your vocabulary and refine your pronunciation by learning the
            meanings and proper usage of words. This feature provides real-world
            examples to help you better understand word context and usage, which
            can assist in learning the{" "}
            <strong>
              correct English pronunciation for non-native speakers
            </strong>{" "}
            and improve your overall fluency.
          </p>
          <div className="feature-highlight">
            <span className="accent-tag">
              <strong>Comprehensive Word Database</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="features-cta">
        <h3>Start Improving Your Pronunciation Today</h3>
        <p>
          Listen to accurate pronunciations, practice different accents, and
          refine your spoken English skills. With our{" "}
          <strong>instant pronunciation guide</strong> and clear{" "}
          <strong>phonetic transcription</strong>, you'll be able to easily
          learn how to pronounce difficult words in English and enhance your
          language skills.
        </p>
      </div>
    </div>
  </section>
);

export default FeaturesPage;
