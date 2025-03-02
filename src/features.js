// Features page content with icons
import React from "react";
import { AudioWaveform, Globe, Book, Headphones, Section } from "lucide-react";

const FeaturesPage = () => (
  <section id="features">
    <div className="page-content">
      <h1 className="page-title">Powerful Pronunciation Features</h1>

      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <Globe className="feature-icon-svg" />
          </div>
          <h2>Multiple Accents</h2>
          <p>
            Access precise pronunciations in American, British, Australian, and
            Indian English accents, helping you master regional variations and
            nuances.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <Headphones className="feature-icon-svg" />
          </div>
          <h2>Voice Selection</h2>
          <p>
            Choose between male and female voice options to hear different vocal
            patterns and tones, providing a comprehensive understanding of how
            words sound.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <AudioWaveform className="feature-icon-svg" />
          </div>
          <h2>Phonetic Transcriptions</h2>
          <p>
            See detailed phonetic transcriptions alongside audio pronunciations,
            making it easier to understand the exact sounds and stress patterns
            in each word.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <Book className="feature-icon-svg" />
          </div>
          <h2>Word Meanings</h2>
          <p>
            Get comprehensive definitions alongside pronunciations, providing
            context for better vocabulary retention and usage.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturesPage;
